# コンポーネントパターン & ネイティブモジュール

絶えず手を伸ばす 3 つのパターン: 画面の雛形、パフォーマンスの良いリスト、ネイティブモジュールブリッジ。

## 1. 画面の雛形 — navigation + state

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

ナビゲータのパラメータリストは中央で型付け:

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

`declare global` ブロックは、呼び出しごとのジェネリクスなしで `useNavigation()` をどこでも型付けする。

## 2. FlatList パフォーマンスパターン

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
      removeClippedSubviews={true} /* Android で勝つ、iOS では no-op */
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({ list: { flex: 1 } });
```

このパターンがすること:

- `keyExtractor` はインデックスではなく安定した id を返す — アイテムが並び替わるときに RN が正しくリサイクルできる。
- `renderItem` は安定した `useCallback` ref で、親が再レンダリングするときに FlatList がすべての行が変わったと思わない。
- `MessageRow` は `memo` されており、その `message` prop が参照で変わったときだけ再レンダリングする。
- `getItemLayout` は RN が測定を飛ばせるようにする。scroll-to-index が即時で、スクロールがスムーズになる。
- `removeClippedSubviews` は Android で勝つ — 画面外のビューが unmount される。

画像が多いまたは 1000+ アイテムのリストには、`FlatList` を `@shopify/flash-list` に置き換える。API は似ているが、リサイクルが本物。

## 3. ネイティブモジュールブリッジ（Swift + Kotlin + TS）

React Native が公開しない機能が必要 — 例えば、カスタムフラグ付きの iOS Keychain アクセスグループの読み込みや、特定のサービス UUID での Bluetooth スキャン。

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

加えて `.m` ブリッジファイル（または auto-link ヘッダで `@objc(HapticsModule)` を使う）:

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

`ReactPackage` に登録:

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

その後 `MainApplication.kt` で、`HapticsPackage()` を `getPackages()` リストに追加。

### TypeScript ラッパー

```ts
// src/lib/haptics.ts
import { NativeModules, Platform } from "react-native";

type HapticsNative = {
  playCustom(intensity: number, sharpness: number): Promise<void>;
};

const Native = NativeModules.HapticsModule as HapticsNative | undefined;

export async function playHaptic(intensity = 0.7, sharpness = 0.5): Promise<void> {
  if (!Native) return; /* モジュールなしの dev build — サイレント no-op */
  try {
    await Native.playCustom(intensity, sharpness);
  } catch {
    /* ハードウェアサポートなしまたは一時的な失敗 — UI に throw しない */
  }
}

export const supportsRichHaptics = Platform.OS === "ios";
```

### これに必要なもの

- iOS: haptics 専用の `Info.plist` には何もない。permission ゲート付きモジュール（camera、location、contacts）には、対応する `NS*UsageDescription` を追加。
- Android: API 26 を超える vibration については `AndroidManifest.xml` には何もない。危険な permission には、宣言してランタイムで要求する。
- Expo Go ではなく development build。`npx expo run:ios` と `npx expo run:android` を 1 度、その後通常通りイテレーション。
- Swift / Kotlin ファイル追加後: iOS では `cd ios && pod install`、Android では Gradle 同期。

TS ラッパーがアプリの他のすべてのファイルが見る契約。ネイティブ側は外側に波及せずに変更できる。
