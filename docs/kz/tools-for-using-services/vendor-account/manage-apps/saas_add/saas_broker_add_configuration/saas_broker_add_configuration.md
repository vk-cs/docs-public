# {heading(Сервис конфигурациясын брокерге жүктеу)[id=saas_broker_add_configuration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Сервис конфигурациясын брокерге жүктеңіз. Егер SaaS-брокер үлгі бойынша жасалған болса, келесі әрекеттерді орындаңыз:

1. Брокер орналасқан каталогқа өтіңіз.
1. Сервис конфигурациясы бар `catalog_<SERVICE_NAME>.json` файлын `resources` каталогына орналастырыңыз.
1. `resources/plan_mapping.json` файлында көрсетіңіз:

   * `<SERVICE_NAME>` — сервис атауы.
   * `<PLAN_ID>` — `catalog_<SERVICE_NAME>.json` файлында көрсетілген тарифтік жоспарлардың ID-сы.
   * `<SAAS_PLAN_ID>` (`string` форматы) — `<PLAN_ID>` тарифтік жоспарларының ID-сына сәйкес келетін сервис жағындағы тарифтік жоспарлардың ID-сы.

      ```json
      {
        "<SERVICE_NAME>": {
          "<PLAN_ID>": <SAAS_PLAN_ID>,
          "<PLAN_ID>": <SAAS_PLAN_ID>
        }
      }
      ```

   {caption(`plan_mapping.json` файлының мазмұны мысалы)[align=left;position=above]}
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
1. Брокер орналасқан каталогта `.env.example` файлының атауын `.env` етіп өзгертіңіз.
1. `.env` файлында сервис атауын `BROKER_MODE` ішінде көрсетіңіз:

   ```json
   BROKER_MODE=<SERVICE_NAME>
   ```