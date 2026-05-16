# Component patterns & native modules

तीन patterns जिनके लिए आप constantly reach करेंगे: एक screen scaffold, एक performant list, और एक native module bridge।

## 1. Screen scaffold — navigation + state

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

Navigator की param list centrally typed होती है:

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

`declare global` block `useNavigation()` को हर जगह typed बनाता है per-call generics के बिना।

## 2. FlatList performance pattern

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

यह pattern क्या करता है:

- `keyExtractor` एक stable id return करता है, index नहीं — RN correctly recycle कर सकता है जब items reorder हों।
- `renderItem` एक stable `useCallback` ref है, तो FlatList यह नहीं सोचता कि parent re-render होने पर हर row बदली।
- `MessageRow` `memo`'d है, तो यह केवल तब re-render होती है जब इसकी `message` prop reference से बदलती है।
- `getItemLayout` RN को measurement skip करने देती है; scroll-to-index instant है और scroll smoother है।
- `removeClippedSubviews` Android win है — off-screen views unmount हो जाते हैं।

Images-heavy या 1000+ item lists के लिए, `FlatList` को `@shopify/flash-list` से swap करें। API similar है लेकिन recycling real है।

## 3. Native module bridge (Swift + Kotlin + TS)

आपको एक feature चाहिए जो React Native expose नहीं करता — कहें, custom flags के साथ iOS Keychain access group का एक read, या एक specific service UUID पर एक Bluetooth scan।

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

Plus `.m` bridge file (या `@objc(HapticsModule)` को auto-link header के साथ use करें):

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

इसे एक `ReactPackage` में register करें:

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

फिर `MainApplication.kt` में, `getPackages()` list में `HapticsPackage()` add करें।

### TypeScript wrapper

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

### इसको क्या चाहिए

- iOS: haptics specifically के लिए `Info.plist` में कुछ नहीं। Permissions-gated modules (camera, location, contacts) के लिए, matching `NS*UsageDescription` add करें।
- Android: API 26 के ऊपर vibration के लिए `AndroidManifest.xml` में कुछ नहीं। Dangerous permissions के लिए, declare AND runtime पर request करें।
- एक development build, Expo Go नहीं। `npx expo run:ios` और `npx expo run:android` एक बार, फिर normally iterate करें।
- Swift/Kotlin files add करने के बाद: iOS के लिए `cd ios && pod install`, Android के लिए Gradle sync।

TS wrapper वो contract है जो app की हर दूसरी file देखती है। Native side बिना outward ripple किए बदल सकता है।
