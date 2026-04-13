# DSA210 Project: Train Delay Analysis in Lausanne

This project studies how operational, temporal, and weather factors relate to train delays in the Lausanne area and turns raw SBB arrival data into an analysis-ready dataset for exploratory analysis and formal hypothesis testing.

## Motivation

Train delays affect commuter planning, platform usage, and overall service reliability. This project studies train arrivals in the Lausanne area.

## Research Question

Which operational, temporal, and weather features are associated with higher train delay rates in Lausanne, and which of those patterns remain statistically significant under formal hypothesis tests?

## Data Sources

- SBB/CFF actual transport data: <https://data.opentransportdata.swiss/en/dataset/istdaten>
- SBB monthly archive index: <https://archive.opentransportdata.swiss/istdaten.php>
- Open-Meteo historical weather API: <https://open-meteo.com/en/docs/historical-weather-api>

The train data provides scheduled and real arrival information. The enrichment data adds hourly temperature, precipitation, snowfall, and wind speed for Lausanne.

## Dataset Snapshot

- Sampled periods: January 1 to January 30, 2025; April 1 to April 30, 2025; July 1 to July 30, 2025; October 1 to October 30, 2025
- Final merged arrival-level dataset: `90,818` Lausanne train-arrival rows
- Hour-level weather comparison table used in notebook 3: `2,743` matched weather hours
- Weather coverage: every row in `dataset_final.csv` is matched to hourly weather data

## Repository Structure

```text
DSA210-Project/
├── notebooks/
│   ├── data_collection.ipynb
│   ├── eda.ipynb
│   └── hypothesis_testing.ipynb
├── data/
│   ├── processed/
│   └── weather/
├── outputs/
│   ├── figures/
│   └── tables/
├── AI_USAGE.md
├── README.md
├── Project_Proposal.pdf
└── requirements.txt
```

- [notebooks/](notebooks)
  Contains the three main project notebooks in run order.
- [notebooks/data_collection.ipynb](notebooks/data_collection.ipynb)
  Collects, filters, translates, enriches, and merges the raw train and weather data.
- [notebooks/eda.ipynb](notebooks/eda.ipynb)
  Produces the descriptive analysis and saved figures.
- [notebooks/hypothesis_testing.ipynb](notebooks/hypothesis_testing.ipynb)
  Runs the formal statistical tests and exports the result tables.
- [data/](data)
  Stores the project datasets.
- [data/processed](data/processed)
  Contains the processed train tables, the translation table, and the final merged dataset.
- [data/weather](data/weather)
  Contains the hourly Lausanne weather data used in the merge.
- [outputs/](outputs)
  Stores generated analysis artifacts.
- [outputs/figures](outputs/figures)
  Contains saved EDA figures.
- [outputs/tables](outputs/tables)
  Contains the exported hypothesis catalog and hypothesis test results.
- [AI_USAGE.md](AI_USAGE.md)
  Records AI assistance, representative prompts, and review decisions.

## Analysis Workflow

Run the notebooks in this order:

1. [data_collection.ipynb](notebooks/data_collection.ipynb)
   Builds the processed train tables, weather table, and final merged dataset.
2. [eda.ipynb](notebooks/eda.ipynb)
   Profiles the merged dataset and saves the descriptive figures used to motivate the formal tests.
3. [hypothesis_testing.ipynb](notebooks/hypothesis_testing.ipynb)
   Tests the strongest temporal, operational, and weather patterns and exports the final result tables.

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

4. If the raw daily SBB CSV files are not already present locally, set `RUN_RAW_DOWNLOAD = True` in [data_collection.ipynb](notebooks/data_collection.ipynb).

5. Run the notebooks in the workflow order listed above.

## Outputs

Project artifacts kept in the repo:

- `data/processed/sbb_column_translation.csv`
- `data/processed/lausanne_station_variants.csv`
- `data/processed/lausanne_arrivals_filtered.csv`
- `data/processed/lausanne_arrivals.csv`
- `data/processed/dataset_final.csv`
- `data/weather/lausanne_hourly_weather.csv`
- figures under `outputs/figures/`
- tables under `outputs/tables/`

Some rebuildable files are intentionally ignored:

- raw downloaded monthly extracts under `data/20??-??/`
- raw archive downloads under `data/_archives/`
- local virtual environments such as `.venv/`