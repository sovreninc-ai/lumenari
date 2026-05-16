# Compose + Material 3 patterns

Four patterns you'll reach for every week: a screen scaffold with state hoisting, Material 3 theming with dynamic color, a Room + Flow data layer, and a release-ready R8 setup.

## 1. Compose screen scaffold (state hoisting + side effects)

```kotlin
// ui/searches/SearchesUiState.kt
data class SearchesUiState(
  val isLoading: Boolean = true,
  val items: List<Search> = emptyList(),
  val errorMessage: String? = null,
)

// ui/searches/SearchesViewModel.kt
@HiltViewModel
class SearchesViewModel @Inject constructor(
  private val repo: SearchRepository,
) : ViewModel() {

  val uiState: StateFlow<SearchesUiState> =
    repo.observeRecent(limit = 50)
      .map { SearchesUiState(isLoading = false, items = it) }
      .catch { emit(SearchesUiState(isLoading = false, errorMessage = it.localizedMessage)) }
      .stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(stopTimeoutMillis = 5_000),
        initialValue = SearchesUiState(),
      )

  fun onDelete(id: Long) = viewModelScope.launch { repo.delete(id) }
  fun onClearAll() = viewModelScope.launch { repo.clear() }
}

// ui/searches/SearchesScreen.kt
@Composable
fun SearchesScreen(viewModel: SearchesViewModel = hiltViewModel()) {
  val state by viewModel.uiState.collectAsStateWithLifecycle()
  SearchesContent(
    state = state,
    onDelete = viewModel::onDelete,
    onClearAll = viewModel::onClearAll,
  )
}

@Composable
fun SearchesContent(
  state: SearchesUiState,
  onDelete: (Long) -> Unit,
  onClearAll: () -> Unit,
) {
  Scaffold(
    topBar = {
      TopAppBar(
        title = { Text("Recent searches") },
        actions = {
          TextButton(onClick = onClearAll, enabled = state.items.isNotEmpty()) { Text("Clear") }
        },
      )
    },
  ) { padding ->
    when {
      state.isLoading -> Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
      }
      state.errorMessage != null -> ErrorBlock(message = state.errorMessage, modifier = Modifier.padding(padding))
      state.items.isEmpty() -> EmptyState(modifier = Modifier.padding(padding))
      else -> LazyColumn(
        modifier = Modifier.fillMaxSize().padding(padding),
        contentPadding = PaddingValues(vertical = 8.dp),
      ) {
        items(state.items, key = { it.id }) { search ->
          SearchRow(search = search, onDelete = { onDelete(search.id) })
        }
      }
    }
  }
}

@Preview
@Composable
private fun PreviewSearches() = MyAppTheme {
  SearchesContent(
    state = SearchesUiState(isLoading = false, items = sampleSearches()),
    onDelete = {},
    onClearAll = {},
  )
}
```

Wire it into the NavHost:

```kotlin
// ui/navigation/AppNavHost.kt
@Composable
fun AppNavHost(nav: NavHostController) {
  NavHost(navController = nav, startDestination = Routes.Home) {
    composable<Routes.Home> { HomeScreen(onOpenSearches = { nav.navigate(Routes.Searches) }) }
    composable<Routes.Searches> { SearchesScreen() }
  }
}

@Serializable sealed interface Routes {
  @Serializable data object Home : Routes
  @Serializable data object Searches : Routes
}
```

The `@Serializable` routes are the Kotlin 2.0 type-safe navigation API. No string route parsing, no manual argument extraction.

## 2. Material 3 theme with dynamic color

```kotlin
// ui/theme/Theme.kt
@Composable
fun MyAppTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = true,
  content: @Composable () -> Unit,
) {
  val colorScheme = when {
    dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
      val ctx = LocalContext.current
      if (darkTheme) dynamicDarkColorScheme(ctx) else dynamicLightColorScheme(ctx)
    }
    darkTheme -> DarkColors
    else -> LightColors
  }

  MaterialTheme(
    colorScheme = colorScheme,
    typography = AppTypography,
    shapes = AppShapes,
    content = content,
  )
}

// ui/theme/Color.kt
private val LightColors = lightColorScheme(
  primary = Color(0xFF1B5E20),
  onPrimary = Color.White,
  primaryContainer = Color(0xFFB6F2C7),
  onPrimaryContainer = Color(0xFF002107),
  /* ...secondary, tertiary, surface, error, etc. */
)
private val DarkColors = darkColorScheme(/* mirror tokens */)
```

Dynamic color extracts a palette from the user's wallpaper on Android 12+. The static fallback is your branded palette. Both should be designed.

## 3. Room + Flow data layer

```kotlin
// data/searches/SearchEntity.kt
@Entity(
  tableName = "searches",
  indices = [Index(value = ["query"], unique = false)],
)
data class SearchEntity(
  @PrimaryKey(autoGenerate = true) val id: Long = 0,
  val query: String,
  val createdAt: Long, // epoch millis
)

// data/searches/SearchDao.kt
@Dao
interface SearchDao {
  @Query("SELECT * FROM searches ORDER BY createdAt DESC LIMIT :limit")
  fun observeRecent(limit: Int): Flow<List<SearchEntity>>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insert(entity: SearchEntity): Long

  @Query("DELETE FROM searches WHERE id = :id")
  suspend fun deleteById(id: Long)

  @Query("DELETE FROM searches")
  suspend fun clearAll()
}

// data/AppDatabase.kt
@Database(
  entities = [SearchEntity::class],
  version = 2,
  exportSchema = true,
)
@TypeConverters(InstantConverters::class)
abstract class AppDatabase : RoomDatabase() {
  abstract fun searchDao(): SearchDao
}

val MIGRATION_1_2 = object : Migration(1, 2) {
  override fun migrate(db: SupportSQLiteDatabase) {
    db.execSQL("ALTER TABLE searches ADD COLUMN locale TEXT NOT NULL DEFAULT ''")
  }
}

// di/DataModule.kt
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
  @Provides @Singleton
  fun provideDatabase(@ApplicationContext ctx: Context): AppDatabase =
    Room.databaseBuilder(ctx, AppDatabase::class.java, "app.db")
      .addMigrations(MIGRATION_1_2)
      .build()

  @Provides fun provideSearchDao(db: AppDatabase): SearchDao = db.searchDao()
}
```

Repository turns entities into domain types and exposes `Flow` upward:

```kotlin
class SearchRepository @Inject constructor(private val dao: SearchDao) {
  fun observeRecent(limit: Int = 50): Flow<List<Search>> =
    dao.observeRecent(limit).map { rows -> rows.map { it.toDomain() } }

  suspend fun delete(id: Long) = dao.deleteById(id)
  suspend fun clear() = dao.clearAll()
}
```

The ViewModel never sees `SearchEntity`; it sees `Search`. The boundary stays clean.

## 4. R8 / ProGuard for release

```kotlin
// app/build.gradle.kts
android {
  buildTypes {
    release {
      isMinifyEnabled = true
      isShrinkResources = true
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro",
      )
      signingConfig = signingConfigs.getByName("release")
    }
  }
}
```

`proguard-rules.pro` for a typical Hilt + Room + Retrofit + Moshi app:

```proguard
# Hilt / Dagger generates code via reflection at runtime
-keep class dagger.hilt.** { *; }
-keep class * extends dagger.hilt.android.internal.managers.ViewComponentManager$FragmentContextWrapper { *; }

# Room generates DAO implementations
-keep class * extends androidx.room.RoomDatabase { *; }
-keep @androidx.room.Entity class * { *; }
-keepclassmembers class * { @androidx.room.* <methods>; }

# Retrofit + OkHttp consumer rules ship in the library, but verify:
-keepattributes Signature, InnerClasses, EnclosingMethod
-keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations
-keep,allowobfuscation,allowshrinking interface retrofit2.Call
-keep,allowobfuscation,allowshrinking class retrofit2.Response

# Moshi generated adapters
-keep class **JsonAdapter { *; }
-keepclassmembers class * { @com.squareup.moshi.* <fields>; }

# Your data classes that ship over the wire — Moshi/Gson reflect on these
-keep class com.example.app.network.dto.** { *; }
```

The trick: every library that uses reflection needs a keep rule. Most ship consumer rules in their AAR/JAR — but verify by running the release build and looking for `NoSuchMethodError` or `MissingFieldException` at runtime.

## Play Store internal-track checklist

1. Bump `versionName = "1.4.0"` and `versionCode = 14` (integer, monotonically increasing).
2. `./gradlew bundleRelease` — produces `app/build/outputs/bundle/release/app-release.aab`.
3. Verify the bundle: `bundletool build-apks --bundle=app-release.aab --output=app.apks` and install one APK on a real device.
4. Play Console → Internal testing → Create new release → Upload `app-release.aab`.
5. Add testers by email (or a Google Group), wait minutes, share opt-in link.
6. Promote to closed testing once internal QA passes, then production.

Internal track is your fastest feedback loop — use it before every release, even the small ones.
