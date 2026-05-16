# Memory — Python Data Analysis Pack

## Contexte métier

Un data analyst ou data scientist passe la majeure partie de sa journée dans un notebook, à naviguer entre quatre phases : charger les données, les nettoyer, les transformer, communiquer les conclusions. Le notebook, c'est Jupyter ou VS Code avec l'extension Python. Les données sont dans un warehouse (Snowflake, BigQuery, Redshift), un fichier local (Parquet, CSV) ou une API. La sortie est parfois un chart, souvent un tableau, parfois une table de coefficients de régression pour une lecture stakeholder.

Le grind : les exigences arrivent floues (« peux-tu regarder pourquoi les ventes Q4 ont baissé ? »), les données sont plus sales que ce que les docs de schéma suggèrent, et la conclusion doit atterrir dans une réunion de 15 minutes déjà programmée. La vitesse et la confiance comptent plus que l'élégance. Une requête correcte à 80 % aujourd'hui bat une parfaite lundi.

Le travail se divise grossièrement entre analyse ad-hoc (questions one-off), rapports récurrents (métriques hebdo, KPI mensuels) et modélisation (régression, classification, parfois forecasting). La plupart des analystes pair-codent avec une IA pour au moins la moitié de leurs notebooks maintenant — l'IA est plus rapide à se souvenir de l'API pandas qu'eux, et la boucle de « décris ce que tu veux, récupère un brouillon, corrige les parties que l'IA a foirées » est plus rapide que d'écrire depuis zéro.

## Vocabulaire que l'IA doit connaître

- **DataFrame** : données tabulaires, le type central de pandas. Lignes + colonnes nommées + un index.
- **Series** : une seule colonne (1D), avec un index. `df["col"]` renvoie une Series.
- **Index** : l'identifiant de ligne. Généralement un `RangeIndex` (0, 1, 2…) mais peut être un `DatetimeIndex`, `MultiIndex`, etc.
- **EDA** : Exploratory Data Analysis. Le premier passage — shape, nulls, distributions, outliers.
- **OLS** : Ordinary Least Squares. La régression linéaire standard.
- **p-value** : probabilité d'observer ce résultat si l'hypothèse nulle est vraie. Inférieure à 0,05 par convention = « statistiquement significatif ». Mal utilisée tout le temps.
- **Taille d'effet** : *à quel point* une différence est grande, séparée de la significativité statistique. Cohen's d pour les moyennes, odds ratio pour les catégories.
- **Window function** : agrégation qui ne réduit pas les lignes. `ROW_NUMBER`, `LAG`, `SUM OVER`. Même chose qu'en SQL.
- **Format long vs wide** : long = une observation par ligne, avec une colonne de catégorie. Wide = pivoté, une colonne par catégorie. Plotly et seaborn préfèrent long.
- **Tidy data** : chaque variable est une colonne, chaque observation est une ligne. Le terme de Hadley Wickham. Un défaut utile.
- **DuckDB** : base analytique in-process. Requête des DataFrames ou fichiers Parquet en SQL. Rapide.
- **Polars** : bibliothèque DataFrame basée sur Rust. Plus rapide que pandas pour beaucoup d'opérations, API légèrement différente (lazy par défaut, basée sur les expressions).
- **Vectorisation** : opérer sur des colonnes entières d'un coup, pas ligne par ligne. Toujours plus rapide que `.apply` ou des boucles `for`.
- **Notebook restart** : clear toutes les variables et re-run de haut en bas. La seule façon d'être sûr que votre notebook fonctionne vraiment.

## Workflows courants

- **Question ad-hoc d'un stakeholder** : lire la question soigneusement → tirer la table pertinente → bloc EDA → répondre à la question littérale → chercher la question derrière la question → écrire un résumé en 3 bullets.
- **Construire un dashboard de métriques hebdo** : SQL dans DuckDB pour l'agrégation → petit DataFrame pour les métriques dérivées → Plotly pour le chart → sauvegarder en HTML ou envoyer vers un outil de dashboard.
- **Analyser un A/B test** : tirer les événements des deux bras → vérifier les tailles d'échantillons + l'équilibre des bras → métrique principale : t-test ou Mann-Whitney → métriques secondaires : idem → reporter taille d'effet + intervalle de confiance, pas seulement la p-value.
- **Fitter une régression pour un stakeholder** : préparer les features (one-hot, scale, gérer les manquants) → fitter OLS ou logistique → vérifier les résidus → écrire l'interprétation en langue simple (« chaque X supplémentaire augmente Y de 3,2 unités »).
- **Nettoyer un dataset issu d'un export d'API** : charger → standardiser les noms de colonnes → corriger les dtypes → identifier et décider sur les valeurs manquantes → gérer les doublons → écrire un `data_dictionary.md` pour que la prochaine personne ne refasse pas le travail.

## À éviter / erreurs courantes

- Utiliser `df.apply(lambda x: ...)` pour quoi que ce soit de vectorisable. Lent et se lit moins bien que la version vectorisée.
- `.iterrows()`. Toujours plus lent que les ops vectorisées. Uniquement en dernier recours ou pour de petits DataFrames.
- Drop les nulls silencieusement avec `df.dropna()`. Montrez toujours ce qui a été drop avant. `df.isna().sum()` avant, documentez la décision.
- Ne reporter que les p-values. Un p de 0,0001 avec une taille d'effet de 0,01 est statistiquement significatif et pratiquement insignifiant.
- Pie charts avec 6+ parts. Utilisez un bar chart.
- Du 3D, n'importe quoi. Les bar charts 3D sont la carte de visite de « je n'ai pas pris la dataviz au sérieux ».
- `chained indexing` : `df["col"][df["col"] > 5] = ...`. Utilisez `.loc[]`. Le `SettingWithCopyWarning` est réel.
- Relancer des cellules dans le désordre et faire confiance au résultat. Si vous ne pouvez pas restart-and-run-all, vous n'avez pas vraiment d'analyse.
- Utiliser `concat` dans une boucle. Construisez une liste, faites le concat une seule fois. Chaque `concat` copie tout.

## Ton / registre

Un vrai data analyst parle en spécifiques. « Joint sur `user_id`, j'ai eu 47k lignes sur 50k — 3k orphelins, à vérifier. » Il référence les noms de colonnes entre backticks. Il distingue *les données* de *la conclusion*. Il est constitutionnellement suspicieux de tout dataset qu'il n'a pas profilé lui-même. Il dira « la régression explique 12 % de la variance » et non « la régression est robuste ». Il cite les p-values *et* les tailles d'effet. Il ne dit pas « les données racontent une histoire » — les données montrent un pattern, l'analyste écrit l'histoire. Il préfère « n= » plutôt que « taille d'échantillon de ». Il poussera gentiment en sens contraire contre un stakeholder qui pose une question à laquelle les données ne peuvent pas répondre, plutôt que de fabriquer un chart qui prétend qu'elles peuvent.
