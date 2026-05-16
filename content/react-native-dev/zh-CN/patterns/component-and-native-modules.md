# 组件模式与原生模块

你会经常用到的三种模式：屏幕脚手架、高性能列表、原生模块桥接。

## 1. 屏幕脚手架 —— 导航 + 状态

```tsx
// src/screens/MessageThread/index.tsx
import { useLayoutEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageList } from "./MessageList";
import { useThread } from "./useThread";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "MessageThread">;

export default function MessageThreadScreen({ route, navigation }: Props) {
  const { threadId } = route.params;
  const insets = useSafeAreaInsets();
  const { messages, isLoading, error, sendMessage } = useThread(threadId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerRight: () => (
        <Pressable hitSlop={12} onPress={() => navigation.navigate("ThreadInfo", { threadId })}>
          <Text>Info</Text>
        </Pressable>
      ),
    });
  }, [navigation, threadId, route.params.title]);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <MessageList messages={messages} isLoading={isLoading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});
```

navigator 的 param list 集中类型化：

```ts
// src/navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  MessageThread: { threadId: string; title: string };
  ThreadInfo: { threadId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

`declare global` 块让所有 `useNavigation()` 都自带类型，省去每次写泛型。

## 2. FlatList 性能模式

```tsx
// src/screens/MessageThread/MessageList.tsx
import { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import type { Message } from "@/types";

const ROW_HEIGHT = 72;

const MessageRow = memo(function MessageRow({ message }: { message: Message }) {
  return (
    // ... avatar + text + timestamp ...
    null as any
  );
});

export function MessageList({ messages }: { messages: Message[] }) {
  const keyExtractor = useCallback((m: Message) => m.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Message>) => <MessageRow message={item} />,
    [],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      initialNumToRender={12}
      maxToRenderPerBatch={8}
      windowSize={10}
      removeClippedSubviews={true} /* Android 受益，iOS 无操作 */
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({ list: { flex: 1 } });
```

这种模式做到了什么：

- `keyExtractor` 返回稳定 id，不是 index —— 元素重新排序时 RN 能正确回收。
- `renderItem` 是稳定的 `useCallback` 引用，父级重渲染时 FlatList 不会以为每行变了。
- `MessageRow` 用 `memo` 包裹，仅在 `message` prop 引用变化时重渲染。
- `getItemLayout` 让 RN 跳过测量；scroll-to-index 即时，滚动更平滑。
- `removeClippedSubviews` 是 Android 的 win —— 屏外视图被卸载。

图多或 1000+ 项时把 `FlatList` 换成 `@shopify/flash-list`。API 类似，但回收是真的。

## 3. 原生模块桥接（Swift + Kotlin + TS）

需要 React Native 未暴露的能力 —— 比如带自定义 flag 的 iOS Keychain access group 读取，或对指定 service UUID 的 BLE 扫描。

### Swift（iOS）

```swift
// ios/MyApp/HapticsModule.swift
import Foundation
import React
import CoreHaptics

@objc(HapticsModule)
class HapticsModule: NSObject {
  private var engine: CHHapticEngine?

  @objc static func requiresMainQueueSetup() -> Bool { return false }

  @objc func playCustom(_ intensity: NSNumber,
                        sharpness: NSNumber,
                        resolver resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else {
      reject("UNSUPPORTED", "Haptics not supported on this device", nil)
      return
    }
    do {
      if engine == nil { engine = try CHHapticEngine(); try engine?.start() }
      let event = CHHapticEvent(
        eventType: .hapticTransient,
        parameters: [
          CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity.floatValue),
          CHHapticEventParameter(parameterID: .hapticSharpness, value: sharpness.floatValue),
        ],
        relativeTime: 0
      )
      let pattern = try CHHapticPattern(events: [event], parameters: [])
      let player = try engine?.makePlayer(with: pattern)
      try player?.start(atTime: 0)
      resolve(nil)
    } catch {
      reject("HAPTIC_FAILED", error.localizedDescription, error)
    }
  }
}
```

加上 `.m` 桥接文件（或用 `@objc(HapticsModule)` 配自动 link header）：

```objc
// ios/MyApp/HapticsModule.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HapticsModule, NSObject)
RCT_EXTERN_METHOD(playCustom:(nonnull NSNumber *)intensity
                   sharpness:(nonnull NSNumber *)sharpness
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject)
@end
```

### Kotlin（Android）

```kotlin
// android/app/src/main/java/com/myapp/HapticsModule.kt
package com.myapp

import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.content.Context
import com.facebook.react.bridge.*

class HapticsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "HapticsModule"

  @ReactMethod
  fun playCustom(intensity: Double, sharpness: Double, promise: Promise) {
    val vibrator = reactApplicationContext.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    if (vibrator == null || !vibrator.hasVibrator()) {
      promise.reject("UNSUPPORTED", "Vibration not supported")
      return
    }
    try {
      val amp = (intensity * 255).toInt().coerceIn(1, 255)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        vibrator.vibrate(VibrationEffect.createOneShot(40, amp))
      } else {
        @Suppress("DEPRECATION") vibrator.vibrate(40)
      }
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("HAPTIC_FAILED", e.message, e)
    }
  }
}
```

在 `ReactPackage` 中注册：

```kotlin
// android/app/src/main/java/com/myapp/HapticsPackage.kt
package com.myapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class HapticsPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
    listOf(HapticsModule(reactContext))
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> = emptyList()
}
```

然后在 `MainApplication.kt` 的 `getPackages()` 中加入 `HapticsPackage()`。

### TypeScript 封装

```ts
// src/lib/haptics.ts
import { NativeModules, Platform } from "react-native";

type HapticsNative = {
  playCustom(intensity: number, sharpness: number): Promise<void>;
};

const Native = NativeModules.HapticsModule as HapticsNative | undefined;

export async function playHaptic(intensity = 0.7, sharpness = 0.5): Promise<void> {
  if (!Native) return; /* 开发构建里没该模块 —— 静默 no-op */
  try {
    await Native.playCustom(intensity, sharpness);
  } catch {
    /* 硬件不支持或瞬态失败 —— 决不向 UI 抛出 */
  }
}

export const supportsRichHaptics = Platform.OS === "ios";
```

### 这套要做什么

- iOS：纯 haptics 不需要 `Info.plist` 项。对受权限保护的模块（相机、定位、通讯录），加对应的 `NS*UsageDescription`。
- Android：API 26 以上 vibration 不需要 `AndroidManifest.xml` 声明。危险权限要在 manifest 声明并运行时申请。
- development build，不是 Expo Go。先跑一次 `npx expo run:ios` 与 `npx expo run:android`，之后按常规迭代。
- 加完 Swift/Kotlin 文件后：iOS `cd ios && pod install`；Android 做 Gradle sync。

TS 封装是 app 中其他文件看到的合约。原生侧变化不会向外波及。
