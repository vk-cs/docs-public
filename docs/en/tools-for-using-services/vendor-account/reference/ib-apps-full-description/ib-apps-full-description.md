
{include(/en/_includes/_translated_by_ai_en.md)}

The full description of the service is displayed on the **Service description** tab of the service page in Marketplace.

The description text is specified in the service configuration:

* For an image-based application — in the `full_description.md` file of the service package.
* For a SaaS application — in the `full_description` parameter in the JSON file.

In general, the full description of the service contains the following sections:

* [Service information](#service_description_info).
* [Tariffication rules](#service_description_tariffication).
* [Useful links](#service_description_links).
* [Technical support](#service_description_support).
* [License agreement](#service_description_license).

## {heading(Service information)[id=service_description_info]}

{tabs}

{tab(Image-based)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-general]}

{/tab}

{tab(SaaS)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-saas-general]}

{/tab}

{/tabs}

## {heading(Tariffication rules)[id=service_description_tariffication]}

{tabs}

{tab(Image-based)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-tariff]}

{/tab}

{tab(SaaS)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-saas-tariff]}

{/tab}

{/tabs}

## {heading(Useful links)[id=service_description_links]}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-links]}

## {heading(Technical support)[id=service_description_support]}

{tabs}

{tab(Image-based)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-support]}

{/tab}

{tab(SaaS)}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-saas-support]}

{/tab}

{/tabs}

## {heading(License agreement)[id=service_description_license]}

{include(/en/_includes/_xaas_ib_params.md)[tags=full_description-legal]}