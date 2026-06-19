Конфигурационный файл `plans/<ИМЯ_ПЛАНА>/plan.yaml` содержит следующую информацию:

- [Общие параметры тарифного плана <ИМЯ_ПЛАНА>](#plan_parameters).
- [Секция billing](#plan_billing) с параметрами стоимости тарифного плана `<ИМЯ_ПЛАНА>` без учета платных тарифных опций.
- (Опционально) [Секция parameters_patch](#plan_options), которая выборочно переопределяет параметры тарифных опций для плана `<ИМЯ_ПЛАНА>`.

## {heading(Общие параметры тарифного плана)[id=plan_parameters]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

## {heading(Секция billing тарифного плана)[id=plan_billing]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

Ниже показано, как в мастере конфигурации тарифного плана отображается стоимость тарифного плана из этого примера.

![pic1](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/plan_billing.png){params[width=80%]}

## {heading(Секция parameters_patch)[id=plan_options]}

{include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

## {heading(Примеры файлов plan.yaml)[id=ibexample_plan]}

Пример тарифного плана с переопределением параметров тарифных опций:

{include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

Пример бесплатного тарифного плана с постоплатной тарифной опцией:

{include(/ru/_includes/_xaas_ib_params.md)[tags=plan.yaml-example-free-postpaid]}