# {heading(Uploading service configuration to the broker)[id=saas_broker_add_configuration]}

{include(/en/_includes/_translated_by_ai_en.md)}

Upload the service configuration to the broker. If the SaaS broker was created from a template, follow these steps:

1. Navigate to the broker directory.
1. Place the service configuration file `catalog_<SERVICE_NAME>.json` in the `resources` directory.
1. In the `resources/plan_mapping.json` file, specify:

   * `<SERVICE_NAME>` — the service name.
   * `<PLAN_ID>` — the IDs of the tariff plans specified in the `catalog_<SERVICE_NAME>.json` file.
   * `<SAAS_PLAN_ID>` (`string` format) — the IDs of the tariff plans on the service side, corresponding to the tariff plan IDs `<PLAN_ID>`.

      ```json
      {
        "<SERVICE_NAME>": {
          "<PLAN_ID>": <SAAS_PLAN_ID>,
          "<PLAN_ID>": <SAAS_PLAN_ID>
        }
      }
      ```

   {caption(Example contents of the `plan_mapping.json` file)[align=left;position=above]}
   ```json
   {
     "VKT": {
       "0dc54b75-XXXX-89d5a47eef71": 1,
       "312b628e-XXXX-080ab4ca3acb": 2,
       "e2ae1588-XXXX-3f5081a799a9": 3,
       "b54e7247-XXXX-7a9dccc22e7b": 4
     }
   }
   ```
   {/caption}
1. In the broker directory, rename the `.env.example` file to `.env`.
1. In the `.env` file, specify the service name in `BROKER_MODE`:

   ```json
   BROKER_MODE=<SERVICE_NAME>
   ```