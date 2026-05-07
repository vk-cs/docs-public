# {heading(Сервис конфигурациясын брокерге жүктеу)[id=saas_broker_add_configuration]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервис конфигурациясын брокерге жүктеңіз. Егер SaaS-брокер шаблон бойынша жасалған болса, келесі әрекеттерді орындаңыз:

1. Брокер орналасқан директорияға өтіңіз.
1. `catalog_<SERVICE_NAME>.json` сервис конфигурациясы файлын `resources` директориясына орналастырыңыз.
1. `resources/plan_mapping.json` файлында мыналарды көрсетіңіз:

   * `<SERVICE_NAME>` — сервис атауы.
   * `<PLAN_ID>` — `catalog_<SERVICE_NAME>.json` файлында көрсетілген тарифтік жоспарлардың ID идентификаторлары.
   * `<SAAS_PLAN_ID>` (`string` форматы) — сервис жағындағы `<PLAN_ID>` тарифтік жоспарларының ID идентификаторларына сәйкес келетін тарифтік жоспарлардың ID идентификаторлары.

      ```json
      {
        "<SERVICE_NAME>": {
          "<PLAN_ID>": <SAAS_PLAN_ID>,
          "<PLAN_ID>": <SAAS_PLAN_ID>
        }
      }
      ```

   {caption(`plan_mapping.json` файлы мазмұнының мысалы)[align=left;position=above]}
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
1. Брокер орналасқан директорияда `.env.example` файлының атауын `.env` деп өзгертіңіз.
1. `.env` файлында `BROKER_MODE` ішінде сервис атауын көрсетіңіз:

   ```json
   BROKER_MODE=<SERVICE_NAME>
   ```
