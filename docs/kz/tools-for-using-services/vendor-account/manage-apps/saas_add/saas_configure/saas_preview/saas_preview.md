# {heading(Preview бөлімі)[id=saas_preview]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

`preview` бөлімі тарифтік жоспарлар матрицасында қандай тарифтік опциялар көрсетілетінін анықтайды (көбірек білу — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]} бөлімінде).

Матрицада `plans` бөлімінде көрсетілген барлық тарифтік жоспарлар және `preview` бөлімінде көрсетілген тарифтік опциялар көрсетіледі.

`preview` бөлімінде тарифтік опцияларды келесі құрылым бойынша тізіңіз:

```json
"preview": {
        "parameters": [
          {
            "name": "<OPTION>"
          },
          ...
        ]
      }
```

Мұнда:

* `parameters` бөлімі — тарифтік жоспарлар матрицасы үшін тарифтік опцияларды анықтайды. Бос болуы мүмкін.
* `<OPTION>` — JSON-файлдағы тарифтік опцияның атауы.

{note:warn}

Матрицада тарифтік опциялар осы опциялардың `description` параметріне берілген атаулармен көрсетіледі.

{/note}

{caption(`preview` бөлімін толтыру мысалы)[align=left;position=above]}
```json
"preview": {
        "parameters": [
          {
            "name": "vms" // JSON-файлдағы тарифтік опцияның атауы
          },
          {
            "name": "servers"
          },
          {
            "name": "storage"
          }
        ]
      }
```
{/caption}