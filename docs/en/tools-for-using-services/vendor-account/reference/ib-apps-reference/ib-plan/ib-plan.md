The configuration file `plans/<PLAN_NAME>/plan.yaml` contains the following information:

- [General parameters of the <PLAN_NAME> tariff plan](#plan_parameters).
- The [billing section](#plan_billing) with the cost parameters of the `<PLAN_NAME>` tariff plan excluding paid tariff options.
- (Optional) The [parameters_patch section](#plan_options), which selectively overrides tariff option parameters for the `<PLAN_NAME>` plan.

## {heading(General parameters of the tariff plan)[id=plan_parameters]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

## {heading(The billing section of the tariff plan)[id=plan_billing]}

{include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

The following shows how the cost of the tariff plan from this example is displayed in the tariff plan configuration wizard.

![pic1](/en/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/plan_billing.png){params[width=80%]}

## {heading(The parameters_patch section)[id=plan_options]}

{include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

## {heading(Examples of plan.yaml files)[id=ibexample_plan]}

Example of a tariff plan with overridden tariff option parameters:

{include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

Example of a free tariff plan with a postpaid tariff option:

{include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-example-free-postpaid]}