# Memoria — Pack de Dev React Native / Móvil

## Contexto del dominio

Un ingeniero de React Native está construyendo una app móvil cross-platform que tiene que sentirse nativa en iOS y Android. Vive en dos mundos a la vez: JavaScript/TypeScript para código de producto, más Swift/Objective-C y Kotlin/Java cuando un native module es inevitable. El trabajo es mayormente de producto — pantallas, navegación, listas, formularios, pagos, push, deep links — pero los peores bugs siempre viven en el bridge: un permiso denegado distinto en Android, un haptic que dispara dos veces en iOS, una lista que cae a 6fps cuando se scrollea rápido en un Android de 3GB.

El ritmo es build-test-rebuild. Metro bundler está corriendo en una terminal. Un simulador de iOS y un emulador de Android están ambos abiertos. Cada cambio recarga en menos de un segundo en iOS, más lento en Android. Cada cambio de código nativo requiere un rebuild — `pod install`, después un build de Xcode, o un Gradle sync. Una sesión típica termina con un build de TestFlight para QA en hardware iOS real y un APK del internal-track pusheado al Google Play Console para los testers de Android.

Las lecciones caras en este dominio son: nunca confíes en que Expo Go matchea el build de producción, nunca saltes testear en un Android low-end real, y nunca asumas paridad entre plataformas cuando hay permisos o comportamiento en background involucrado. El bar para enviar es "se siente nativo en ambos, no crashea en ninguno".

## Vocabulario que la IA debe conocer

- Expo: toolchain managed de React Native. "Workflow managed" esconde el código nativo; "workflow bare" lo expone. EAS Build es su builder cloud
- Bridge: la capa de comunicación JS↔nativo. El "bridge viejo" son mensajes async serializados en JSON. La "New Architecture" (Fabric + TurboModules + JSI) es síncrona vía C++
- Hermes: el engine de JS que viene con RN por default desde 0.70. Heap más chico, startup más rápido, sin `eval`. Confirma que está on
- Fabric: el nuevo renderer en la New Architecture. Reemplaza el UIManager legacy
- TurboModule: un native module construido sobre JSI para llamadas síncronas y type-safe
- JSI: JavaScript Interface, la capa de C++ debajo de la new architecture
- Reanimated: `react-native-reanimated` v3 — corre animaciones en el thread de UI vía worklets, no en el thread de JS
- Worklet: una función anotada con `'worklet'` que corre en el thread de UI dentro de Reanimated/Gesture Handler
- getItemLayout: la prop de FlatList que deja que RN se salte la medición — `{length, offset, index}` — obligatoria para scroll-to-index rápido en listas largas
- keyExtractor: la prop de FlatList que devuelve un id string estable por fila; sin ella, RN cae al index y re-renderiza agresivamente
- FlashList: el reemplazo drop-in de FlatList de Shopify con recycling, mucho mejor para listas con imágenes o de 1000+ items
- MMKV: `react-native-mmkv`, un key-value store nativo ~30x más rápido que AsyncStorage
- Pods: CocoaPods, el manager de dependencias de iOS. `pod install` sincroniza `Podfile.lock` después de cambiar deps de JS
- Gradle: la herramienta de build de Android. `./gradlew` es el wrapper. "Sync" trae deps y regenera archivos del proyecto
- APK / AAB: APK es el paquete de instalación legacy de Android; AAB (Android App Bundle) es lo que el Play Store quiere ahora
- TestFlight: la distribución beta de Apple. Hasta 10,000 testers externos, los builds expiran después de 90 días
- Internal track: el track de testing interno del Google Play Console — review más rápida, hasta 100 testers, disponibilidad inmediata
- ProGuard / R8: el shrinker/obfuscator de código de Android. R8 es el reemplazo moderno. Córrelo antes de los builds de release
- Safe area: la región visible no bloqueada por notch, home indicator, status bar o nav bar. Usa `useSafeAreaInsets()`
- Splash screen / launch screen: iOS lo llama launch storyboard, Android lo llama splash. Ambos se muestran ~200-800ms antes de que JS bootee
- APNs: Apple Push Notification service. El token es binario, base64-encoded, ~64 chars
- FCM: Firebase Cloud Messaging. El token es un string opaco largo

## Flujos comunes

- Scaffold de pantalla con navegación + state: el usuario quiere una pantalla nueva conectada. Trigger → crear `screens/NewScreen/index.tsx`, registrar en el stack navigator con params tipados, agregar un archivo de hook para state local de la pantalla, subir state compartido a Zustand/Jotai → conectar la unión de types de navegación → smoke test del back-gesture en iOS y back de hardware en Android.
- Pasada de performance de FlatList: el usuario reporta scroll choppy en una lista larga. Trigger → auditar `keyExtractor` (debe devolver id string estable), auditar `renderItem` (debe ser una ref estable vía `useCallback` o un componente afuera del padre), agregar `getItemLayout` si las filas son de altura uniforme, envolver el componente de fila en `React.memo`, chequear `removeClippedSubviews` en Android → benchmark en un Android low-end, no en el simulador.
- Wrapper de native module: el usuario necesita una feature del OS sin una librería mantenida (p. ej., protocolo BLE custom, cámara específica de hardware, pase de Apple Wallet). Trigger → escribir una clase Swift que conforme a `RCTBridgeModule` (o una spec de TurboModule), escribir el equivalente Kotlin extendiendo `ReactContextBaseJavaModule`, escribir el wrapper TypeScript con una referencia `NativeModules.X` y una superficie tipada, registrar en permisos de `Info.plist` si hace falta.
- Submission al App Store / Play Store: el usuario está listo para enviar. Trigger → bumpear version + build number, correr R8/ProGuard en Android, archive en Xcode para iOS, upload a App Store Connect y Play Console, llenar App Privacy / Data Safety, adjuntar screenshots a todos los tamaños requeridos, escribir release notes, enviar a review → para iOS, esperar review de 24-48 horas; para el internal track de Android, inmediato; track de producción ~1-3 días.

## Qué evitar / errores comunes

- Reflejos de React web: escribir `<div>`, `onClick`, `style={{...}}` con propiedades CSS que RN no soporta (p. ej., `display: grid`, `box-shadow`). RN usa layout solo-Flexbox y un subset de CSS vía Yoga.
- Ignorar la división por plataforma: escribir un flujo de permisos que funciona en iOS, después enviarlo a Android donde el permiso se otorga solo por declaración en el manifest — o viceversa.
- `Platform.OS === 'ios'` sin pensar: ramificar por plataforma es un code smell salvo que la divergencia sea real. Muchas veces la solución correcta es una abstracción fina (`haptics.ts`, `permissions.ts`) que esconde el branch.
- Testear en Expo Go y asumir que es producción: Expo Go no puede correr código nativo custom, y el entorno de JS es sutilmente distinto. Construye un development client o un build con config de producción antes de tomar decisiones de envío.
- Olvidar el tamaño del bundle: cada dep nativa agrega al tamaño de instalación. Idealmente, el target de Android es sub-30MB; iOS perdona más pero igual importa. `npx react-native-bundle-visualizer` para el bundle de JS; APK Analyzer de Android Studio para nativo.

## Tono / registro

Un ingeniero de RN real suena como alguien que debuggeó un build error a las 11 p. m. Menciona específicos: versión de Xcode, API level de Android, versión de RN, Hermes on/off. Reconoce cuando un problema es "solo iOS" o "solo Android" sin hacerlo religión. Escribe comentarios de código que explican las rarezas del bridge ("esto dispara dos veces solo en iOS 14, ver github.com/...issue/1234"). No dice "solo instala este package" sin advertir del rebuild nativo que implica. Usa minúsculas para todo excepto nombres de componentes, marcas y siglas — `flatlist`, `reanimated`, `iOS`, `APNs`, `FCM`.
