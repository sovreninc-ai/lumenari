# Checklist de Listeza para App Store

La lista para repasar antes de pegarle a **Submit for Review** en App Store Connect. Ordenada por lo que rechaza apps más seguido, no por lo más divertido de hacer.

---

## 1. Privacy manifest (`PrivacyInfo.xcprivacy`)

**Obligatorio desde mayo 2024** para cualquier app que use una API required-reason. Los manifests faltantes son rechazados en submission, no en review.

Agrega `PrivacyInfo.xcprivacy` a tu app target. La estructura:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- un dict por categoría de data -->
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

Categorías de API required-reason que casi seguramente necesitas:

| Si tu app usa... | Categoría de API | Código de razón común |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (data propia de la app) |
| Timestamps de `FileManager` | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (sync/backup), `DDA9.1` (mostrar al usuario) |
| `systemUptime` / boot time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (timestamps de eventos de la app) |
| Queries de espacio en disco | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (mostrar al usuario) |
| Lecturas de `UIPasteboard` al launch | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (traducción) |

Los SDKs de terceros ahora envían sus propios privacy manifests. Cuando actualices una dependencia, revisa si agregó uno. Xcode los agrega en build time.

---

## 2. Detalles de App Privacy en App Store Connect

Separado del manifest. Se llena vía la UI web de App Store Connect bajo tu app → App Privacy.

Categorías para declarar honestamente:

- **Contact Info** (nombre, email) — si recolectas en sign-up
- **Identifiers** (user ID, device ID)
- **Usage Data** (interacción con el producto)
- **Diagnostics** (crash logs, data de performance)
- **Purchases** — si procesas pagos
- **Location** — coarse vs. precise, y si está linkeado a la identidad

Para cada una: ¿está linkeado a la identidad del usuario? ¿Se usa para tracking? ¿Se usa para proveer funcionalidad de la app? Mentir acá es base para la remoción.

---

## 3. Screenshots de dispositivo obligatorios

App Store Connect requiere screenshots para tamaños de display específicos. A 2024:

| Dispositivo | Tamaño requerido | Display |
| --- | --- | --- |
| iPhone 6.7" (15/16 Pro Max) | 1290 × 2796 | Obligatorio |
| iPhone 6.1" (15/16 Pro) | 1179 × 2556 | Obligatorio si no se provee 6.7" |
| iPhone 5.5" (8 Plus) | 1242 × 2208 | Obligatorio para targets más viejos |
| iPad Pro 12.9" (6ta gen) | 2048 × 2732 | Obligatorio si la app soporta iPad |
| iPad Pro 13" (M4) | 2064 × 2752 | Opcional |

Puedes usar el Screenshot Designer de Apple en App Store Connect, pero la mayoría de los equipos los genera con Fastlane Snapshot o hace mockups de diseño en Figma y los exporta a la resolución correcta.

Mínimo: 3 screenshots por dispositivo obligatorio. Recomendado: 5-10. El primer screenshot es el que la gente ve en los resultados de búsqueda — hazlo contar.

---

## 4. Metadata

- **App name**: máx 30 caracteres. Debe matchear el bundle.
- **Subtitle**: 30 caracteres. Visible en los resultados de búsqueda.
- **Promotional text**: 170 caracteres. Editable sin resubmission — úsalo para messaging por tiempo limitado.
- **Description**: 4,000 caracteres. Las primeras 3 líneas son visibles antes del "more". Lidera con el valor, no con la lista de features.
- **Keywords**: 100 caracteres en total, separados por coma. No incluyas palabras que ya estén en el nombre o la categoría de la app — Apple las indexa automáticamente.
- **Support URL**: obligatorio y de cara al público.
- **Privacy policy URL**: obligatorio para cualquier app que recolecte data.
- **What's New**: 4,000 caracteres. Obligatorio para cada update. "Bug fixes and performance improvements" sigue funcionando pero los reviewers prefieren específicos.

---

## 5. Build settings + capabilities

- [ ] **Deployment target** seteado correctamente. Menor = más usuarios, más código de compat. iOS 17 es un piso razonable para apps nuevas apuntando a `@Observable` + SwiftData.
- [ ] **Bundle ID** matchea el container de CloudKit, el cert de push notifications, los identificadores de App Group.
- [ ] **Version + build numbers** incrementados. App Store Connect rechaza builds duplicados.
- [ ] **App Transport Security**: sin `NSAllowsArbitraryLoads` salvo que hayas documentado por qué.
- [ ] **Background Modes**: solo lo que realmente usas. Los reviewers preguntan por qué.
- [ ] **Capabilities**: iCloud, Sign in with Apple, Push Notifications — cada una necesita estar en el archivo de entitlements Y configurada en App Store Connect.

---

## 6. Sign in with Apple

Si tu app ofrece cualquier login social de terceros (Google, Facebook, etc.), Apple requiere que también ofrezcas Sign in with Apple. Esta es la App Store Review Guideline 4.8 y se hace cumplir.

Exenciones:

- Tu propio sistema de cuentas (sin social de terceros) → sin requisito
- Apps de Education / Enterprise / Business que usan auth corporativa específica → exentas
- Apps que usan proveedores de ID como ID.me o auth gubernamental → exentas

Cuando dudes, agrega Sign in with Apple. Son dos días de trabajo para esquivar un rechazo.

---

## 7. In-app purchase

Si vendes bienes digitales consumidos dentro de la app, DEBE ser StoreKit. Sin links de pago externos, sin códigos QR apuntando al checkout de tu sitio. Guideline 3.1.1.

Excepciones:

- Apps "Reader" (Spotify, Netflix, Kindle) pueden linkear afuera — pero requieren la External Link Account Entitlement y un disclaimer específico
- Bienes físicos, servicios consumidos fuera de la app (Uber, listings de real estate) — Stripe está bien
- Servicios persona-a-persona (tutoría online, trabajo freelance) — Stripe está bien

Sandbox-testea cada flujo de IAP. Cancela + resubscribe. El botón Restore Purchases es obligatorio.

---

## 8. Auditoría de accesibilidad

Las cuatro cosas que los reviewers chequean:

- [ ] **Labels de VoiceOver** en cada botón solo-ícono (`accessibilityLabel`)
- [ ] **Dynamic Type** en AX5 (el tamaño de accesibilidad más grande) — sin texto cortado
- [ ] **Contraste de color** 4.5:1 para body text, 3:1 para large text (WCAG AA)
- [ ] Alternativa de **reduced motion** para animaciones grandes

Corre el Accessibility Inspector de Xcode contra cada pantalla primaria.

---

## 9. Crash & performance

- [ ] Sin caminos `fatalError(...)` alcanzables desde input del usuario
- [ ] La app lanza en menos de 400ms en un dispositivo de 3 años
- [ ] Sin `print(...)` dejado en código de envío — reemplaza con `Logger`
- [ ] Uso de memoria perfilado con Instruments → Allocations
- [ ] Sin ciclos de retain (Instruments → Leaks)
- [ ] Las llamadas de red tienen timeouts (el timeout default de `URLSession` es 60s — setea explícitos)

Corre en un dispositivo real, no solo el Simulator. Las características de performance son diferentes.

---

## 10. TestFlight antes de submission

Siempre haz al menos un ciclo de TestFlight antes de enviar:

1. Archive el build (Product → Archive en Xcode)
2. Upload vía Organizer
3. Esperá el processing (~10 minutos)
4. Agrégalo al grupo de Internal Testing (hasta 100 testers, sin review)
5. Mándalo a 3-5 personas en las que confíes para que realmente lo prueben
6. Espera 48 horas para feedback
7. Arregla lo que salió
8. Envíalo a App Store Review

External TestFlight (hasta 10,000 testers) requiere una "Beta App Review" — usualmente 24 horas, más liviana que la App Store Review completa.

---

## 11. Las 24 horas después de que envías

- App Store Review suele tomar 24-48 horas.
- Si te rechazan, el email te dice qué número de guideline. Léelo dos veces antes de responder.
- Puedes responder al rechazo vía Resolution Center en App Store Connect. Sé educado, sé específico, haz preguntas de clarificación si el rechazo es vago.
- La mayoría de los rechazos que parecen duros son primeras pasadas por bot. Un humano va a leer tu apelación si la escribes.

Rechazos comunes de primera vez:

- **2.1 (App Completeness)**: screenshots faltantes, credenciales de demo account, URL de privacy policy faltante
- **4.0 (Design)**: la app parece una página web, no sigue las convenciones de iOS
- **4.8 (Sign in with Apple)**: ofreciste login social sin Sign in with Apple
- **5.1.1 (Data Collection and Storage)**: recolectando data sin declararla en App Privacy

---

## Pasada final de 5 minutos pre-submit

- [ ] Archive construido desde la branch `main` con la version bumpeada
- [ ] Privacy manifest presente y lista cada API required-reason
- [ ] La sección App Privacy en App Store Connect matchea lo que la app realmente hace
- [ ] Screenshots subidos para todos los tamaños de dispositivo obligatorios
- [ ] Credenciales de demo account provistas (si hay login obligatorio) en la sección App Review Information
- [ ] Build testeado en un dispositivo real, no solo Simulator
- [ ] Texto de What's New escrito (no "Bug fixes")
- [ ] Sign in with Apple ofrecido (si se ofrece cualquier otro social login)
- [ ] Sin `print()`, sin `// TODO`, sin test API keys, sin menús de debug alcanzables en builds de producción
