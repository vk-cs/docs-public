# {heading(Setting log storage time)[id=logging-manage-log-storage-time]}

{include(/en/_includes/_translated_by_ai_en.md)}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to **Monitoring** → **Logging**.
1. Click the **Settings** button.
1. On the **Log storage time** tab, set the parameters:

   - **Unified storage time for logs of all products** — an option to enable/disable unified log storage time. When enabled, it becomes possible to set the same storage time for all logs. If the option is disabled, a separate log storage time must be specified for each object.
   - **All logs** — storage time for all logs in days (filled in when the unified storage time option is enabled).

1. Click the **Save** button.

{/tab}

{/tabs}