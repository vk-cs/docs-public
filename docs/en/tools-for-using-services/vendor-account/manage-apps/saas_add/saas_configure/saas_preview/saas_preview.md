# {heading(Preview section)[id=saas_preview]}

{include(/en/_includes/_translated_by_ai_en.md)}

The `preview` section defines which tariff options will be displayed in the tariff plan matrix (for more details, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix)[text=%text]}).

The matrix will display all tariff plans specified in the `plans` section and the tariff options specified in the `preview` section.

In the `preview` section, list the tariff options using the following structure:

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

Here:

* The `parameters` section — defines the tariff options for the tariff plan matrix. It can be empty.
* `<OPTION>` — the name of the tariff option in the JSON file.

{note:warn}

In the matrix, the tariff options will be displayed with the names specified in the `description` parameter of these options.

{/note}

{caption(Example of filling in the `preview` section)[align=left;position=above]}
```json
"preview": {
        "parameters": [
          {
            "name": "vms" // Name of the tariff option in the JSON file
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