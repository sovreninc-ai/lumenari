# SwiftUI Idioms

वे patterns जो हर SwiftUI codebase में show up होते हैं, और वे gotchas जो हर release पर bite करते हैं। Swift 5.9+ और iOS 17+ को floor मानकर लिखा गया।

---

## State, observation, और binding — क्या reach करें

| Situation | Reach for |
| --- | --- |
| एक view एक छोटी piece of state own करता है जिसकी और किसी को ज़रूरत नहीं | `@State` |
| एक child view को एक parent का `@State` mutate करना है | `$value` को एक `Binding` के रूप में pass करें |
| Computed properties या methods के साथ एक view-model | `@Observable final class` + `@State private var vm = VM()` |
| Parent द्वारा owned, child द्वारा two-way binding के लिए use किया गया view-model | Parent: `@State var vm = VM()`। Child: `@Bindable var vm: VM` |
| Ambient dependency (e.g. एक session, एक theme) | `@Environment(\.thing)` + `EnvironmentValues` extension |
| SwiftData rows read करना | `@Query(sort: \Model.field, order: .reverse) var items: [Model]` |
| Reactive UserDefaults | `@AppStorage("key") var thing: String = "default"` |
| एक parent से pass किए गए SwiftData object को read करना | Property: `var item: Item` (read) या `@Bindable var item: Item` (write) |

Common mistake: iOS 17+ में `@StateObject` use करना। `@Observable` के साथ, correct pairing `@State` (ownership के लिए) + `@Bindable` (child में two-way binding के लिए) है। `@StateObject` पुराने `ObservableObject` world के लिए है।

---

## Navigation — value-driven, view-driven नहीं

```swift
struct RootView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List {
                NavigationLink("Settings", value: Route.settings)
                NavigationLink("Profile", value: Route.profile(userID: currentUser.id))
            }
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .settings: SettingsView()
                case .profile(let id): ProfileView(userID: id)
                }
            }
        }
    }
}

enum Route: Hashable {
    case settings
    case profile(userID: UUID)
}
```

क्यों: programmatic navigation trivial हो जाता है (`path.append(Route.profile(...))`), deep linking बस एक `NavigationPath` decoder है, और deprecated `NavigationLink(destination:)` चला गया है।

Sheets और full-screen covers के लिए: एक optional Identifiable के साथ `.sheet(item:)` use करें, item के लिए एक side `@State` plus `.sheet(isPresented:)` नहीं।

```swift
@State private var editing: Workout?

// ...
.sheet(item: $editing) { workout in
    WorkoutEditor(workout: workout)
}
```

---

## Sheets जिन्हें parent mutate करना है

```swift
struct ParentView: View {
    @State private var name = ""
    @State private var showingEditor = false

    var body: some View {
        VStack {
            Text(name)
            Button("Edit") { showingEditor = true }
        }
        .sheet(isPresented: $showingEditor) {
            NameEditor(name: $name)
        }
    }
}

struct NameEditor: View {
    @Binding var name: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            TextField("Name", text: $name)
        }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") { dismiss() }
            }
        }
    }
}
```

`onSave: (String) -> Void` जैसी एक closure callback pass न करें। Bindings SwiftUI way हैं।

---

## Lists — performance + UX

```swift
List {
    ForEach(workouts) { workout in
        WorkoutRow(workout: workout)
    }
    .onDelete { offsets in
        for i in offsets { context.delete(workouts[i]) }
    }
}
.listStyle(.insetGrouped)
.refreshable {
    await viewModel.reload()
}
.searchable(text: $query)
```

Gotchas:

- **Row के अंदर expensive computations न रखें।** Model में एक बार compute करें।
- **`Identifiable` matter करता है।** अगर items में stable IDs नहीं हैं, `ForEach` सब कुछ redraw करता है।
- **`.refreshable` async है।** एक `Task { }` kick off न करें — directly `await` करें।
- **`ScrollView` के अंदर `LazyVStack`** alternative है जब आपको `List` provide करने वाले से अधिक layout control चाहिए। List default में faster और prettier है — reason हो तब use करें।

---

## Forms — सही primitives

```swift
Form {
    Section("Basics") {
        TextField("Title", text: $title)
        DatePicker("Date", selection: $date, displayedComponents: .date)
        Toggle("Reminder", isOn: $reminder)
    }
    Section("Notes") {
        TextField("Notes", text: $notes, axis: .vertical)
            .lineLimit(3...8)
    }
    if !isValid {
        Section { } footer: {
            Text("Title is required.")
                .foregroundStyle(.red)
        }
    }
}
.scrollDismissesKeyboard(.interactively)
.toolbar {
    ToolbarItemGroup(placement: .keyboard) {
        Spacer()
        Button("Done") { focusedField = nil }
    }
}
```

`Form` आपको inset grouped look free देता है। Hints और validation messages के लिए `Section` headers और footers use करें। `.scrollDismissesKeyboard(.interactively)` के साथ keyboard hide करें।

---

## Animations — चार modifiers जिन्हें जानना worth है

| Modifier | कब use करें |
| --- | --- |
| `.animation(.smooth, value: state)` | जब `state` change हो animate करें (iOS 17 से preferred) |
| `withAnimation { state = ... }` | एक specific state mutation animate करें |
| `.transition(.move(edge: .bottom))` | एक conditional view के लिए insert/remove animation |
| `.matchedGeometryEffect(id:in:)` | दो views के बीच hero animations |

Reduced motion respect करें:

```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// ...
.animation(reduceMotion ? .none : .smooth, value: state)
```

---

## हर release पर ship होने वाले Gotchas

1. **View body कई बार run होता है।** वहाँ `print(...)` debugging न रखें — इसके बजाय `let _ = Self._printChanges()` use करें, जो log करता है *क्यों* एक redraw हुआ।

2. **`@State` initializers एक बार run होते हैं, per redraw नहीं।** `@State private var thing = expensiveCompute()` fine है। लेकिन अगर `expensiveCompute()` view में pass किए prop पर depend करता है, यह prop change होने पर re-run नहीं होगा — `.onChange(of: prop)` use करें या एक view-model में move करें।

3. **View bodies में `if let` unwrapping syntax है, एक binding shortcut नहीं।** एक optional को bind करने के लिए, `Binding(get:set:)` या custom property wrappers के through new `$value.unwrapped` patterns use करें।

4. **`@Environment` reads को type से exactly match होना चाहिए।** `@Environment(\.modelContext)` `ModelContext` return करता है। `@Environment(\.dismiss)` `DismissAction` return करता है। Custom environment values को key और value type दोनों को align करना है।

5. **`Task` cancellation cooperative है।** एक async function के अंदर, iteration points पर `try Task.checkCancellation()` call करें। SwiftUI का `.task` modifier view disappear होने पर आपके लिए cancel करता है, लेकिन केवल अगर आप check करें।

6. **`axis: .vertical` के साथ TextField को actually grow करने के लिए `lineLimit(_...:)` चाहिए।** Default single-line है।

7. **`onAppear` एक बार run होता है। `onChange` हर change पर run होता है।** अगर आपको दोनों चाहिए, `.task(id:)` use करें — यह appear पर run होता है और id change होने पर re-run होता है।

8. **Children sizing के लिए `GeometryReader` avoid करें।** यह available space fill करने के लिए expand होता है और frequently layout तोड़ता है। Custom layout के लिए `Layout` protocol या alignment guides prefer करें।

---

## Toolbar placement cheat sheet

| Placement | क्या करता है |
| --- | --- |
| `.primaryAction` | Top-right primary button (Add, Save) |
| `.confirmationAction` | Sheet/modal confirmation (Done, Save) |
| `.cancellationAction` | Sheet/modal cancel |
| `.navigation` | Back-button area, left side |
| `.topBarLeading` / `.topBarTrailing` | ज़रूरत होने पर explicit positioning |
| `.keyboard` | Keyboard के ऊपर (text fields के लिए Done button) |
| `.bottomBar` | Bottom toolbar (iOS) |

अगर एक button primary action है तो उसे `.navigation` में न डालें। `.primaryAction` use करें।

---

## जब SwiftUI पर्याप्त नहीं है

UIKit के bridges कभी-कभी सही call हैं। `UIViewRepresentable` या `UIViewControllerRepresentable` use करें:

- एक custom text view attributed string rendering के साथ जिसे SwiftUI में कोई match नहीं कर सकता
- Camera या photo picker (हालाँकि `PhotosPicker` + `AVCaptureSession` SwiftUI wrappers ज़्यादातर cases cover करते हैं)
- एक third-party SDK जो एक `UIView` या `UIViewController` expose करता है और replace होने से refuse करता है

उन चीज़ों के लिए bridge न करें जिन्हें SwiftUI अब natively handle करता है: maps (`Map`), web views (`WebView` आ रहा है, तब तक `WKWebView` bridge), photo picker (`PhotosPicker`), share sheet (`ShareLink`)।
