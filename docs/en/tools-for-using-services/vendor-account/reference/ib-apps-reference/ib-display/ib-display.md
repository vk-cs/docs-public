
{include(/en/_includes/_translated_by_ai_en.md)}

The `display.yaml` configuration file describes how the tariff plan will be displayed in the [tariff plan matrix](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_wizard) of your application.

Main sections of the file:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`pages`
|Describes all [pages](#wizard_pages) of the tariff plan configuration wizard, except the first and last ones.

If the parameter is not specified, the configuration wizard will consist only of automatically generated pages
|Array
|![](/en/assets/no.svg "inline")

|`entities`
|Describes the billable [VK Cloud infrastructure items](#wizard_entities):

* VMs;
* load balancers;
* external IP addresses.

The cost of these items will be displayed in the tariff plan configuration wizard. It is calculated automatically in accordance with VK Cloud tariffs
|Array
|![](/en/assets/check.svg "inline")
|===

## {heading(pages array)[id=wizard_pages]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

Below is an example of how the tariff plan configuration wizard from this example will be displayed.

![pic1](/en/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_page.png){params[width=90%]}

## {heading(entities array)[id=wizard_entities]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

### {heading(VM)[id=IBdisplay_vm]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

Below is an example of how the infrastructure cost information from this example will be displayed in the tariff plan configuration wizard.

![pic1](/en/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/Wizard_IB_price.png){params[width=90%]}

### {heading(Load balancer)[id=IBdisplay_lb]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

### {heading(External IP address)[id=IBdisplay_floating_ip]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

## {heading(when construct)[id=when_construction]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

### {heading(when construct in the pages array)[id=IBdisplay_when_in_pages]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

### {heading(when construct in the entities array)[id=IBdisplay_when_in_entities]}

{include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

![pic1](/en/tools-for-using-services/vendor-account/reference/ib-apps-reference/assets/when_entities.png){params[width=90%]}