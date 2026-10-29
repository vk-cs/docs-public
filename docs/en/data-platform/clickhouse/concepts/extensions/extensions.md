# {heading(Extensions)[id=clickhouse_extensions_info]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud ClickHouse extensions supplement the basic DBMS functionality without changing the instance configuration. They can be {linkto(../../instructions/manage#clickhouse_extensions)[text=enabled or disabled]} at any time.

## {heading(Country data reference)[id=clickhouse_extension_countries]}

The **Country data reference** extension allows you to:

- Validate country codes in data: check whether a given code exists in the reference to detect incorrect values before they get into analytics.
- Enrich data with country attributes: get the country name, capital, continent, phone code, currency code, and languages by the country code, if only the code is stored in the source data but the report requires full country information.
- Group and aggregate data by countries or continents: build reports with regional breakdown, for example, on sales volume or user distribution.

The following data is stored for each country:

- `alpha_2_code` — two-letter country code;
- `alpha_3_code` — three-letter country code;
- `numeric_code` — numeric country code;
- `name_en`, `name_ru` — country name in English and Russian;
- `continent_en`, `continent_ru` — continent name in English and Russian;
- `capital_en`, `capital_ru` — capital name in English and Russian;
- `phone_prefix` — country phone code;
- `currency_code` — currency code;
- `languages` — languages of the country.