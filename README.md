# DSA210 Project: Train Delay Analysis in Lausanne

## Motivation

Train delays affect commuter planning, platform usage, and overall service reliability. This project studies train arrivals in the Lausanne area and asks:

- Which operational, temporal, and weather factors are associated with higher delay rates?
- Which of those factors remain statistically meaningful once the descriptive patterns are tested formally?

## Data Sources

- SBB/CFF actual transport data: <https://data.opentransportdata.swiss/en/dataset/istdaten>
- SBB monthly archive index: <https://archive.opentransportdata.swiss/istdaten.php>
- Open-Meteo historical weather API: <https://open-meteo.com/en/docs/historical-weather-api>

The train data provides scheduled and predicted arrival information. The enrichment data adds hourly temperature, precipitation, snowfall, and wind speed for Lausanne.

## Notebooks

1. [data_collection.ipynb](notebooks/data_collection.ipynb)  
   Downloads or reuses SBB source files, filters train arrivals in the Lausanne area, translates retained columns, engineers the delay target, joins hourly weather, and writes the prepared dataset.

2. [eda.ipynb](notebooks/eda.ipynb)  
   Profiles the merged dataset and generates the descriptive figures used for the milestone submission.

3. [hypothesis_testing.ipynb](notebooks/hypothesis_testing.ipynb)  
   Runs chi square tests for arrival-level categorical variables and one way ANOVA for weather-related hourly delay-rate comparisons.

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

4. If raw SBB daily files are not present locally, set `RUN_RAW_DOWNLOAD = True` in notebook `data_collection.ipynb`.

5. Run notebooks in order.

## AI Usage

AI assistance is documented in [AI_USAGE.md](AI_USAGE.md). The disclosure log records representative prompts, outputs produced, affected files, and verification decisions.
