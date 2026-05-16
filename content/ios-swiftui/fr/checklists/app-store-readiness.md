# Checklist de préparation App Store

La liste à dérouler avant de cliquer sur **Submit for Review** dans App Store Connect. Triée selon ce qui fait rejeter les apps le plus souvent, pas selon ce qui est le plus fun à faire.

---

## 1. Privacy manifest (`PrivacyInfo.xcprivacy`)

**Requis depuis mai 2024** pour toute app qui utilise une API à raison requise. Les manifests manquants sont rejetés à la soumission, pas à la review.

Ajoutez `PrivacyInfo.xcprivacy` au target de votre app. La structure :

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
        <!-- un dict par catégorie de données -->
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

Catégories d'API à raison requise dont vous aurez très probablement besoin :

| Si votre app utilise… | Catégorie d'API | Code de raison courant |
| --- | --- | --- |
| `UserDefaults` | `NSPrivacyAccessedAPICategoryUserDefaults` | `CA92.1` (données propres à l'app) |
| Timestamps `FileManager` | `NSPrivacyAccessedAPICategoryFileTimestamp` | `C617.1` (sync/backup), `DDA9.1` (afficher à l'utilisateur) |
| `systemUptime` / boot time | `NSPrivacyAccessedAPICategorySystemBootTime` | `35F9.1` (timestamper des événements app) |
| Requêtes d'espace disque | `NSPrivacyAccessedAPICategoryDiskSpace` | `85F4.1` (afficher à l'utilisateur) |
| Lectures `UIPasteboard` au lancement | `NSPrivacyAccessedAPICategoryActiveKeyboards` | `54BD.1` (traduction) |

Les SDK tiers livrent maintenant leurs propres privacy manifests. Quand vous upgradez une dépendance, vérifiez si elle en a ajouté un. Xcode les agrège à la build.

---

## 2. Détails App Privacy dans App Store Connect

Séparé du manifest. Rempli via l'UI web App Store Connect sous votre app → App Privacy.

Catégories à déclarer honnêtement :

- **Coordonnées** (nom, email) — si vous les collectez à l'inscription
- **Identifiants** (user ID, device ID)
- **Données d'usage** (interactions produit)
- **Diagnostics** (logs de crash, données de perf)
- **Achats** — si vous traitez des paiements
- **Localisation** — grossière vs précise, et si liée à l'identité

Pour chacune : est-ce lié à l'identité de l'utilisateur ? Utilisé pour du tracking ? Utilisé pour fournir la fonctionnalité de l'app ? Mentir ici est un motif de retrait.

---

## 3. Screenshots de devices requis

App Store Connect exige des screenshots pour des tailles d'écran spécifiques. En 2024 :

| Device | Taille requise | Affichage |
| --- | --- | --- |
| iPhone 6.7" (15/16 Pro Max) | 1290 × 2796 | Requis |
| iPhone 6.1" (15/16 Pro) | 1179 × 2556 | Requis si 6.7" non fourni |
| iPhone 5.5" (8 Plus) | 1242 × 2208 | Requis pour les cibles anciennes |
| iPad Pro 12.9" (6e gén) | 2048 × 2732 | Requis si l'app supporte iPad |
| iPad Pro 13" (M4) | 2064 × 2752 | Optionnel |

Vous pouvez utiliser le Screenshot Designer d'Apple dans App Store Connect, mais la plupart des équipes les génèrent avec Fastlane Snapshot ou font des mockups design dans Figma et exportent aux bonnes résolutions.

Minimum : 3 screenshots par device requis. Recommandé : 5-10. Le premier screenshot est celui que les gens voient dans les résultats de recherche — faites-le compter.

---

## 4. Metadata

- **Nom de l'app** : 30 caractères max. Doit matcher le bundle.
- **Sous-titre** : 30 caractères. Visible dans les résultats de recherche.
- **Texte promotionnel** : 170 caractères. Modifiable sans resoumission — utilisez-le pour des messages à durée limitée.
- **Description** : 4 000 caractères. Les 3 premières lignes visibles avant le « more ». Menez avec la valeur, pas avec la liste de features.
- **Mots-clés** : 100 caractères au total, séparés par des virgules. N'incluez pas les mots déjà dans le nom de votre app ou la catégorie — Apple les indexe automatiquement.
- **URL de support** : requise et publique.
- **URL de politique de confidentialité** : requise pour toute app qui collecte des données.
- **What's New** : 4 000 caractères. Requis à chaque update. « Bug fixes and performance improvements » fonctionne encore mais les reviewers préfèrent les détails.

---

## 5. Build settings + capabilities

- [ ] **Cible de déploiement** correctement définie. Plus basse = plus d'utilisateurs, plus de code de compat. iOS 17 est un plancher raisonnable pour les nouvelles apps qui ciblent `@Observable` + SwiftData.
- [ ] **Bundle ID** matche le container CloudKit, le cert de push, les identifiants App Group.
- [ ] **Numéros de version + build** incrémentés. App Store Connect rejette les builds dupliqués.
- [ ] **App Transport Security** : pas de `NSAllowsArbitraryLoads` sauf si vous avez documenté pourquoi.
- [ ] **Background Modes** : uniquement ce que vous utilisez réellement. Les reviewers demandent pourquoi.
- [ ] **Capabilities** : iCloud, Sign in with Apple, Push Notifications — chacune doit être dans le fichier d'entitlements ET configurée dans App Store Connect.

---

## 6. Sign in with Apple

Si votre app propose un login social tiers (Google, Facebook, etc.), Apple exige que vous offriez aussi Sign in with Apple. C'est l'App Store Review Guideline 4.8 et c'est appliqué.

Exemptions :

- Votre propre système de compte (pas de social tiers) → pas d'exigence
- Apps Éducation / Entreprise / Business qui utilisent un auth corporate spécifique → exemptes
- Apps qui utilisent des fournisseurs d'ID comme ID.me ou auth gouvernemental → exemptes

Dans le doute, ajoutez Sign in with Apple. C'est deux jours de travail pour éviter un rejet.

---

## 7. Achats in-app

Si vous vendez des biens numériques consommés à l'intérieur de l'app, ça DOIT être StoreKit. Pas de liens de paiement externes, pas de QR codes pointant vers le checkout de votre site. Guideline 3.1.1.

Exceptions :

- Apps « Reader » (Spotify, Netflix, Kindle) peuvent renvoyer vers l'extérieur — mais nécessitent l'External Link Account Entitlement et un disclaimer spécifique
- Biens physiques, services consommés en dehors de l'app (Uber, listings immobiliers) — Stripe est OK
- Services personne-à-personne (tutorat en ligne, freelance) — Stripe est OK

Sandbox-testez chaque flow d'IAP. Annuler + se réabonner. Le bouton Restore Purchases est requis.

---

## 8. Audit d'accessibilité

Les quatre choses que les reviewers vérifient :

- [ ] **Labels VoiceOver** sur chaque bouton icon-only (`accessibilityLabel`)
- [ ] **Dynamic Type** à AX5 (plus grande taille d'accessibilité) — pas de texte tronqué
- [ ] **Contraste des couleurs** 4,5:1 pour le texte de corps, 3:1 pour le grand texte (WCAG AA)
- [ ] **Reduced motion** : alternative pour les grosses animations

Lancez l'Accessibility Inspector de Xcode contre chaque écran principal.

---

## 9. Crash & performance

- [ ] Aucun chemin `fatalError(...)` atteignable depuis une input utilisateur
- [ ] L'app se lance en moins de 400ms sur un device vieux de 3 ans
- [ ] Pas de `print(...)` laissé dans le code en prod — remplacez par `Logger`
- [ ] Usage mémoire profilé avec Instruments → Allocations
- [ ] Pas de retain cycles (Instruments → Leaks)
- [ ] Les appels réseau ont des timeouts (le timeout par défaut de `URLSession` est 60s — mettez-en des explicites)

Lancez sur un vrai device, pas juste sur le Simulator. Les caractéristiques de perf sont différentes.

---

## 10. TestFlight avant la soumission

Faites toujours au moins un cycle TestFlight avant de soumettre :

1. Archivez le build (Product → Archive dans Xcode)
2. Uploadez via Organizer
3. Attendez le processing (~10 minutes)
4. Ajoutez au groupe Internal Testing (jusqu'à 100 testeurs, pas de review requise)
5. Envoyez à 3-5 personnes en qui vous avez confiance pour vraiment l'essayer
6. Attendez 48 heures pour le feedback
7. Corrigez ce qui est remonté
8. Soumettez à l'App Store Review

External TestFlight (jusqu'à 10 000 testeurs) nécessite une « Beta App Review » — généralement 24 heures, plus légère que la full App Store Review.

---

## 11. Les 24 heures après la soumission

- L'App Store Review prend en général 24-48 heures.
- En cas de rejet, l'email vous dit quel numéro de guideline. Lisez-le deux fois avant de répondre.
- Vous pouvez répondre au rejet via le Resolution Center dans App Store Connect. Soyez poli, soyez spécifique, posez des questions de clarification si le rejet est vague.
- La plupart des rejets qui semblent durs sont des premières passes pilotées par bot. Un humain lira votre appel si vous en écrivez un.

Rejets fréquents la première fois :

- **2.1 (Complétude de l'app)** : screenshots manquants, identifiants de compte de démo, URL de politique de confidentialité manquante
- **4.0 (Design)** : l'app ressemble à une page web, ne suit pas les conventions iOS
- **4.8 (Sign in with Apple)** : login social offert sans Sign in with Apple
- **5.1.1 (Collecte et stockage de données)** : collecte de données sans divulgation dans App Privacy

---

## Passe finale de 5 minutes avant la soumission

- [ ] Archive construit depuis la branche `main` avec version bumpée
- [ ] Privacy manifest présent et qui liste chaque API à raison requise
- [ ] La section App Privacy dans App Store Connect matche ce que l'app fait réellement
- [ ] Screenshots uploadés pour toutes les tailles de device requises
- [ ] Identifiants de compte de démo fournis (si login requis) dans la section App Review Information
- [ ] Build testé sur un vrai device, pas juste sur Simulator
- [ ] Texte What's New écrit (pas « Bug fixes »)
- [ ] Sign in with Apple proposé (si tout autre login social est proposé)
- [ ] Pas de `print()`, pas de `// TODO`, pas de clés d'API de test, pas de menus debug atteignables dans les builds production
