# EODHD Data Fetcher

Fetches and processes data from [EOD Historical Data (EODHD)](https://eodhd.com/).

## Data Structure

### Exchange List

- `exchanges-list.json`.

### Symbols

List of symbols organized by exchange and instrument type.

- `symbols` directory.
- One subdirectory per exchange:
  - Named by exchange code, kebab-case, e.g., `us`.
- One file per instrument type within each exchange directory:
  - Named by instrument type, kebab-case.
  - Examples: `common-stock.json`, `etf.json`, `index.json`.

### Symbol Metadata

Additional data for each symbol.

- `meta` directory.
- One subdirectory per exchange.
- One subdirectory per symbol within each exchange directory:
  - Named by symbol code, kebab-case, e.g., `aapl`.
- `splits.json` file for stock split history.
- `dividends.json` file for dividend history.

### Raw Price Data

Raw prices data, as fetched from EODHD.

- `raw` directory.

#### End-of-Day Prices

For historical end-of-day prices, one file contains entire history for a symbol.

- `eod` subdirectory within `raw`.
- One subdirectory per exchange.
- One csv file per symbol within each exchange directory:
  - Named by symbol code, kebab-case, e.g., `aapl.csv`.

#### Intraday Prices

Intraday prices are 1-minute interval data.

The situation here is more complex.

- `intraday` subdirectory within `raw` is the intraday fetched data root.

This is further divided into three subgroups.

##### Intraday - Raw Fetched Data

This contains the raw fetched intraday data files as received from EODHD.

- `fetched` subdirectory within `intraday`.
- One subdirectory per exchange.
- One subdirectory per symbol within each exchange directory.
- A list of csv files, each named `<start-time>_<end-time>.csv`, representing the fetched data for that time range.
  - Example: `2023-01-01-00-00_2023-01-07-23-59.csv`.

##### Intraday - Start Date Tracking

Tracks the start date-time of available intraday data for each symbol.

- `start-dates` subdirectory within `intraday`.
- One subdirectory per exchange.
- One text file per symbol within each exchange directory:
  - Named by symbol code, kebab-case, e.g., `aapl.txt`.
  - Contains the start date-time of the available intraday data.

TODO: Possibly should be expanded to a json that additionally contains hashes of splits and dividends file, to know when and if final adjusted data needs to be recalculated.

##### Intraday - Processed Data

This contains data that it partially processed from the raw fetched intraday data. The data is not yet adjusted for splits and dividends, but better grouped for easier further processing, and easier future updates when new fetched data needs to be added.

- `processed` subdirectory within `intraday`.
- One subdirectory per exchange.
- One subdirectory per symbol within each exchange directory.
- A list of csv files, each named `<year>-<month>.csv`, representing the processed intraday data for that month.
  - Example: `2023-01.csv`.

TODO: Maybe in the future I will want to further divide this into timeframe subdirectories, e.g., 1min, 5min, 15min, etc, which would the hold additonally processed 1m timeframes into higher timeframes.

### Final Price Data

The final adjusted price data, adjusted for splits and dividends, ready for use.

- `data` directory.

#### End-of-Day Prices

For historical end-of-day prices, one file contains entire history for a symbol.

- `eod` subdirectory within `data`.
- One subdirectory per exchange.
- One csv file per symbol within each exchange directory:
  - Named by symbol code, kebab-case, e.g., `aapl.csv`.

#### Intraday Prices

Intraday prices are 1-minute interval data.

- `intraday` subdirectory within `data`.
- One subdirectory per exchange.
- One subdirectory per symbol within each exchange directory.
- A list of csv files, each named `<year>-<month>.csv`, representing the intraday data for that month.
  - Example: `2023-01.csv`.

TODO: Maybe in the future I will want to further divide this into timeframe subdirectories, e.g., 1min, 5min, 15min, etc, which would the hold additonally processed 1m timeframes into higher timeframes.

### Other Data

Logs are stored in the `logs` directory.

## Fetching Commands

### Fetch Exchange List

```bash
fetch exchanges
```
