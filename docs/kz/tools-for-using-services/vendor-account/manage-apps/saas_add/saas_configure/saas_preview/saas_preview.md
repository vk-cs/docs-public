{include(/kz/_includes/_translated_by_ai.md)}

# {heading(preview секциясы)[id=saas_preview]}

`preview` секциясы тарифтік жоспарлар матрицасында қандай тарифтік опциялар көрсетілетінін анықтайды (толығырақ {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]} бөлімінде).

Матрицада `plans` секциясында көрсетілген барлық тарифтік жоспарлар және `preview` секциясында көрсетілген тарифтік опциялар көрсетіледі.

`preview` секциясында тарифтік опцияларды келесі құрылым бойынша тізіп шығыңыз:

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

* `parameters` секциясы — тарифтік жоспарлар матрицасына арналған тарифтік опцияларды анықтайды. Бос болуы мүмкін.
* `<OPTION>` — JSON-файлдағы тарифтік опцияның атауы.

{note:warn}

Матрицада тарифтік опциялар осы опциялардың `description` параметрінде берілген атаулармен көрсетіледі.

{/note}

{caption(`preview` секциясын толтыру мысалы)[align=left;position=above]}
```json
"preview": {
        "parameters": [
          {
            "name": "vms" // Имя тарифной опции в JSON-файле
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
