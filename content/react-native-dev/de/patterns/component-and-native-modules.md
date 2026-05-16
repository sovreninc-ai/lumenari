# Component-Patterns & Native Modules

Drei Patterns, zu denen du ständig greifen wirst: ein Screen-Scaffold, eine performante Liste und eine Native-Module-Bridge.

## 1. Screen-Scaffold — Navigation + State

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

Die Param-Liste des Navigators ist zentral getypt:

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

Der `declare global`-Block macht `useNavigation()` überall getypt, ohne Per-Call-Generics.

## 2. FlatList-Performance-Pattern

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
      removeClippedSubviews={true} /* Android win, iOS no-op */
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({ list: { flex: 1 } });
```

Was dieses Pattern tut:

- `keyExtractor` returnt eine stabile Id, nicht den Index — RN kann korrekt recyceln, wenn Items neu sortieren.
- `renderItem` ist eine stabile `useCallback`-Ref, sodass die FlatList nicht denkt, jede Row habe sich geändert, wenn der Parent re-rendert.
- `MessageRow` ist `memo`'d, sodass es nur re-rendert, wenn sein `message`-Prop sich per Referenz ändert.
- `getItemLayout` lässt RN das Measuring überspringen; Scroll-to-Index ist instant und Scrolling ist smoother.
- `removeClippedSubviews` ist der Android-Win — Off-Screen-Views werden unmounted.

Für image-heavy oder 1000+-Item-Listen, swappe `FlatList` für `@shopify/flash-list`. Die API ist ähnlich, aber Recycling ist real.

## 3. Native-Module-Bridge (Swift + Kotlin + TS)

Du brauchst ein Feature, das React Native nicht exposed — sagen wir, einen Read der iOS-Keychain-Access-Group mit Custom-Flags oder einen Bluetooth-Scan auf einer spezifischen Service-UUID.

### Swift (iOS)

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

Plus die `.m`-Bridge-Datei (oder nutze `@objc(HapticsModule)` mit dem Auto-Link-Header):

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

### Kotlin (Android)

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

Registriere es in einem `ReactPackage`:

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

Dann in `MainApplication.kt`, füge `HapticsPackage()` zur `getPackages()`-Liste hinzu.

### TypeScript-Wrapper

```ts
// src/lib/haptics.ts
import { NativeModules, Platform } from "react-native";

type HapticsNative = {
  playCustom(intensity: number, sharpness: number): Promise<void>;
};

const Native = NativeModules.HapticsModule as HapticsNative | undefined;

export async function playHaptic(intensity = 0.7, sharpness = 0.5): Promise<void> {
  if (!Native) return; /* dev build without the module — silent no-op */
  try {
    await Native.playCustom(intensity, sharpness);
  } catch {
    /* hardware unsupported or transient failure — never throw to UI */
  }
}

export const supportsRichHaptics = Platform.OS === "ios";
```

### Was das benötigt

- iOS: nichts in `Info.plist` für Haptics speziell. Für permissions-gated Module (Camera, Location, Contacts), füge die matching `NS*UsageDescription` hinzu.
- Android: nichts in `AndroidManifest.xml` für Vibration über API 26. Für Dangerous Permissions, deklariere UND requestate zur Runtime.
- Einen Development-Build, kein Expo Go. `npx expo run:ios` und `npx expo run:android` einmal, dann normal iterieren.
- Nach dem Hinzufügen der Swift/Kotlin-Dateien: `cd ios && pod install` für iOS, Gradle-Sync für Android.

Der TS-Wrapper ist der Vertrag, den jede andere Datei in der App sieht. Die Native-Seite kann sich ändern, ohne nach außen zu rippeln.
