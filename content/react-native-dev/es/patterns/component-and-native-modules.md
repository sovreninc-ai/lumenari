# Patrones de componentes y native modules

Tres patrones que vas a usar constantemente: un scaffold de pantalla, una lista performante y un bridge de native module.

## 1. Scaffold de pantalla — navegación + state

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

La param list del navigator está tipada centralmente:

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

El bloque `declare global` hace que `useNavigation()` esté tipado en todos lados sin generics por-llamada.

## 2. Patrón de performance de FlatList

```tsx
// src/screens/MessageThread/MessageList.tsx
import { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import type { Message } from "@/types";

const ROW_HEIGHT = 72;

const MessageRow = memo(function MessageRow({ message }: { message: Message }) {
  return (
    // ... avatar + texto + timestamp ...
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
      removeClippedSubviews={true} /* gana en Android, no-op en iOS */
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({ list: { flex: 1 } });
```

Qué hace este patrón:

- `keyExtractor` devuelve un id estable, no el index — RN puede reciclar correctamente cuando los items reordenan.
- `renderItem` es una ref estable de `useCallback`, así que el FlatList no piensa que cada fila cambió cuando el padre re-renderiza.
- `MessageRow` está `memo`-eado, así que solo re-renderiza cuando su prop `message` cambia por referencia.
- `getItemLayout` deja que RN se salte la medición; el scroll-to-index es instantáneo y el scroll es más fluido.
- `removeClippedSubviews` es la victoria en Android — las views fuera de pantalla se desmontan.

Para listas pesadas en imágenes o de 1000+ items, cambia `FlatList` por `@shopify/flash-list`. La API es similar pero el recycling es real.

## 3. Bridge de native module (Swift + Kotlin + TS)

Necesitas una feature que React Native no expone — digamos, una lectura del access group del Keychain de iOS con flags custom, o un scan de Bluetooth en un UUID de servicio específico.

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

Más el archivo bridge `.m` (o usa `@objc(HapticsModule)` con el header auto-link):

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

Regístralo en un `ReactPackage`:

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

Después en `MainApplication.kt`, agrega `HapticsPackage()` a la lista de `getPackages()`.

### Wrapper de TypeScript

```ts
// src/lib/haptics.ts
import { NativeModules, Platform } from "react-native";

type HapticsNative = {
  playCustom(intensity: number, sharpness: number): Promise<void>;
};

const Native = NativeModules.HapticsModule as HapticsNative | undefined;

export async function playHaptic(intensity = 0.7, sharpness = 0.5): Promise<void> {
  if (!Native) return; /* build de dev sin el módulo — silent no-op */
  try {
    await Native.playCustom(intensity, sharpness);
  } catch {
    /* hardware no soportado o falla transitoria — nunca tirar a la UI */
  }
}

export const supportsRichHaptics = Platform.OS === "ios";
```

### Qué requiere esto

- iOS: nada en `Info.plist` para haptics específicamente. Para módulos con permisos (cámara, ubicación, contactos), agrega el `NS*UsageDescription` correspondiente.
- Android: nada en `AndroidManifest.xml` para vibración arriba de API 26. Para permisos peligrosos, declara Y solicita en runtime.
- Un development build, no Expo Go. `npx expo run:ios` y `npx expo run:android` una vez, después itera normalmente.
- Después de agregar los archivos Swift/Kotlin: `cd ios && pod install` para iOS, Gradle sync para Android.

El wrapper de TS es el contrato que ven todos los demás archivos de la app. El lado nativo puede cambiar sin rippling hacia afuera.
