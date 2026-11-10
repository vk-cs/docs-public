`plans/<ПЛАН_АТЫ>/plan.yaml` конфигурациялық файлы мынада ақпаратты қамтиды:

- [<ПЛАН_АТЫ> тарифтік жоспарының жалпы параметрлері](#plan_parameters).
- [billing секциясы](#plan_billing) — `<ПЛАН_АТЫ>` тарифтік жоспарының құнын платалы тарифтік опцияларсыз көрсететін параметрлерімен.
- (Қосымша) [parameters_patch секциясы](#plan_options), ол `<ПЛАН_АТЫ>` жоспары үшін тарифтік опциялардың параметрлерін таңдамалы түрде қайта анықтайды.

## {heading(Тарифтік жоспардың жалпы параметрлері)[id=plan_parameters]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

## {heading(Тарифтік жоспардың billing секциясы)[id=plan_billing]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

Төменде тарифтік жоспарды конфигурациялау шеберінде осы мысалдан алынған тарифтік жоспардың құны қалай көрсетілетіні көрсетілген.

![pic1](/kz/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/plan_billing.png){params[width=80%]}

## {heading(parameters_patch секциясы)[id=plan_options]}

{include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

## {heading(plan.yaml файлдарының мысалдары)[id=ibexample_plan]}

Тарифтік опциялардың параметрлерін қайта анықтаумен тарифтік жоспардың мысалы:

{include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

Постоплаталық тарифтік опциясы бар тегін тарифтік жоспардың мысалы:

{include(/kz/_includes/_xaas_ib_params.md)[tags=plan.yaml-example-free-postpaid]}