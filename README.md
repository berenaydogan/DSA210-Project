# DSA210 Spring 2026 Project: Train Delay Analysis and Prediction in Lausanne

This project studies whether temporal, operational, and weather factors are
associated with train delays in the Lausanne area and whether those factors can
support a supervised model for delay prediction. It combines SBB/CFF Istdaten
train-arrival records with hourly Open-Meteo weather observations, constructs a
90,818-row analysis dataset, runs exploratory analysis and hypothesis tests, and
compares six classifiers.

The strongest statistical differences are linked to scheduled hour, weekday,
season, weekend status, train type, line, station, rain, temperature group, and
wind group. XGBoost is the best-performing tested model, with 0.648 test
accuracy, 0.642 delayed-class F1, and 0.710 ROC-AUC. Error analysis shows that
the model struggles most around specific busy or transition periods: the 19:00
hour has the highest hour-level error rate, rush periods create many false delay
alarms, and midday hours miss a larger share of true delays.

## Motivation

Train delays are small events individually, but they affect daily mobility at a
city scale. A few minutes of delay can change transfer plans, crowd platforms,
and make a timetable feel less reliable to commuters. Lausanne is a useful case
study because it has a mix of local, regional, intercity, and international
train services, and because the station area is exposed to seasonal weather
changes.

The project is also personally relevant because I will start my doctoral studies
in Lausanne next year, so understanding the reliability of the local rail
network connects directly to the city I am about to live and work in.

## Research Question

Which operational, temporal, and weather features are associated with higher
train delay rates in Lausanne, and how well can those features predict whether a
specific arrival will be delayed?

The first part of the question is explanatory: it focuses on patterns that can
be described and tested statistically. The second part is predictive: it asks
whether those same patterns can be used to construct a machine learning model
for predicting delays.

## Project Website

Presentation website: <https://berenaydogan.github.io/DSA210-Project/>

## Data Sources

- SBB/CFF actual transport data: <https://data.opentransportdata.swiss/en/dataset/istdaten>
- SBB monthly archive index: <https://archive.opentransportdata.swiss/istdaten.php>
- Open-Meteo historical weather API: <https://open-meteo.com/en/docs/historical-weather-api>

The train data provides scheduled and real arrival information. The enrichment
data adds hourly temperature, precipitation, snowfall, and wind speed for
Lausanne.

## Dataset Snapshot

- Sampled periods: January 1 to January 30, 2025; April 1 to April 30, 2025;
  July 1 to July 30, 2025; October 1 to October 30, 2025
- Stations: Lausanne, Romanel-sur-Lausanne, Lausanne-Chauderon, and
  Lausanne-Flon
- Final merged arrival-level dataset: `90,818` Lausanne train-arrival rows and
  `21` columns
- Delayed arrivals: `43,058` rows, or about `47.4%`
- Weather data: `2,976` hourly Lausanne weather rows
- Hour-level weather comparison table used in notebook 3: `2,743` matched
  weather hours
- Weather coverage: every row in `dataset_final.csv` is matched to hourly
  weather data

## Repository Structure

```text
DSA210-Project/
+-- notebooks/
|   +-- data_collection.ipynb
|   +-- eda.ipynb
|   +-- hypothesis_testing.ipynb
|   +-- ml_modeling.ipynb
+-- data/
|   +-- processed/
|   |   +-- dataset_final.csv
|   |   +-- ml_stratified_80_20_train.csv
|   |   +-- ml_stratified_80_20_test.csv
|   |   +-- ml_stratified_5folds/
|   +-- weather/
|       +-- lausanne_hourly_weather.csv
+-- outputs/
|   +-- figures/
|   +-- tables/
+-- docs/
|   +-- index.html
|   +-- styles.css
|   +-- script.js
|   +-- .nojekyll
|   +-- assets/
+-- AI_USAGE.md
+-- Final_Report.pdf
+-- Project_Proposal.pdf
+-- README.md
+-- requirements.txt
```

- [notebooks/](notebooks) contains the four main project notebooks in run
  order.
- [notebooks/data_collection.ipynb](notebooks/data_collection.ipynb) collects,
  filters, translates, enriches, and merges the raw train and weather data.
- [notebooks/eda.ipynb](notebooks/eda.ipynb) produces the descriptive analysis
  and saved figures.
- [notebooks/hypothesis_testing.ipynb](notebooks/hypothesis_testing.ipynb) runs
  the formal statistical tests and exports the result tables.
- [notebooks/ml_modeling.ipynb](notebooks/ml_modeling.ipynb) creates the
  stratified train/test split and cross-validation folds, re-runs feature
  selection tests on the training data only, tunes six classifiers, evaluates
  them once on the test set, exports the best-model summary, and performs error
  analysis.
- [data/processed](data/processed) contains the processed train tables, the
  translation table, the final merged dataset, the stratified 80/20 ML split,
  and the five cross-validation folds.
- [data/weather](data/weather) contains the hourly Lausanne weather data used in
  the merge.
- [outputs/figures](outputs/figures) contains saved EDA figures, ML comparison
  figures, hyperparameter plots, and error-analysis figures.
- [outputs/tables](outputs/tables) contains exported hypothesis-test tables, ML
  modeling tables, and error-analysis tables.
- [docs/](docs) contains the static GitHub Pages presentation website and its
  copied chart assets.
- [Final_Report.pdf](Final_Report.pdf) is the final submitted report PDF.
- [AI_USAGE.md](AI_USAGE.md) records AI assistance, representative prompts, and
  review decisions.

## Analysis Workflow

Run the notebooks in this order:

1. [data_collection.ipynb](notebooks/data_collection.ipynb)
   Builds the processed train tables, weather table, and final merged dataset.
2. [eda.ipynb](notebooks/eda.ipynb)
   Profiles the merged dataset and saves the descriptive figures used to
   motivate the formal tests.
3. [hypothesis_testing.ipynb](notebooks/hypothesis_testing.ipynb)
   Tests the strongest temporal, operational, and weather patterns and exports
   the hypothesis results.
4. [ml_modeling.ipynb](notebooks/ml_modeling.ipynb)
   Builds the stratified 80/20 split and the five cross-validation folds,
   re-runs the hypothesis tests on training data only to select features, tunes
   Logistic Regression with SGD, k-Nearest Neighbors, Decision Tree, Random
   Forest, and XGBoost against a majority-class baseline, evaluates each model
   once on the test set, and analyzes model errors by hour, period, rain,
   station, train type, and weekend status.

## Reproduction

1. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start Jupyter from that same environment:

```bash
jupyter lab
```

4. If the raw daily SBB CSV files are not already present locally, set
   `RUN_RAW_DOWNLOAD = True` in
   [data_collection.ipynb](notebooks/data_collection.ipynb).

5. Run the notebooks in the workflow order listed above.

## Outputs

Project artifacts kept in the repo:

- `data/processed/sbb_column_translation.csv`
- `data/processed/lausanne_station_variants.csv`
- `data/processed/lausanne_arrivals_filtered.csv`
- `data/processed/lausanne_arrivals.csv`
- `data/processed/dataset_final.csv`
- `data/processed/ml_stratified_80_20_train.csv`
- `data/processed/ml_stratified_80_20_test.csv`
- `data/processed/ml_stratified_5folds/fold_0X_{train,validation}.csv`
- `data/weather/lausanne_hourly_weather.csv`
- figures under `outputs/figures/`: `eda_*.png` (descriptive analysis figures), `ml_split_distribution.png`, `ml_hp_<model>.png` (one per tuned model), `ml_confusion_matrices.png`, `ml_roc_curves.png`, `ml_decision_tree.png` , `ml_error_analysis_by_hour.png`, and `ml_error_analysis_by_period.png`
- tables under `outputs/tables/`: `hypothesis_catalog.csv`, `hypothesis_test_results.csv`, `ml_split_summary.csv`, `ml_training_hypothesis_test_results.csv`, `ml_selected_features.csv`, `ml_best_hyperparams.csv`, `ml_model_metrics.csv`, `ml_logistic_coefficients.csv`, `ml_best_model.csv` , `ml_error_analysis_overall.csv`, `ml_error_analysis_by_hour.csv`,
`ml_error_analysis_by_period.csv`, `ml_error_analysis_by_rain.csv`,
`ml_error_analysis_by_station.csv`, `ml_error_analysis_by_train_type.csv`,
and `ml_error_analysis_by_weekend.csv`
- website files under `docs/`, including selected copied chart assets under
  `docs/assets/figures/`
- `Final_Report.pdf`

Some rebuildable files are intentionally ignored:

- raw downloaded monthly extracts under `data/20??-??/`
- raw archive downloads under `data/_archives/`
- local virtual environments such as `.venv/`
