# {heading(Секция preview)[id=saas_preview]}

Секция `preview` определяет, какие тарифные опции будут отображаться в матрице тарифных планов (подробнее — в разделе {linkto(/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about/#xaas_tariff_matrix)[text=%text]}).

В матрице будут отображаться все тарифные планы, указанные в секции `plans`, и тарифные опции, указанные в секции `preview`.

В секции `preview` перечислите тарифные опции по следующей структуре:

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

Здесь:

* Секция `parameters` — определяет тарифные опции для матрицы тарифных планов. Может быть пустой.
* `<OPTION>` — имя тарифной опции в JSON-файле.

<warn>

В матрице тарифные опции будут отображаться с именами, заданными в параметре `description` этих опций.

</warn>

{caption(Пример заполнения секции `preview`)[align=left;position=above]}
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