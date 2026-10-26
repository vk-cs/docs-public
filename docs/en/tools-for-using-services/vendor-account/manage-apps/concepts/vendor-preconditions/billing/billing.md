# {heading(Billing)[id=billing]}

{include(/en/_includes/_translated_by_ai_en.md)}

Marketplace supports the following billing types:

* Free.
* Upfront Commitment.
* Usage Based.
* BYOL (Bring Your Own License).

For more details on billing, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing)[text=%text]}.

Requirements for service billing:

* Each service tariff plan must be billed according to one of the types listed above.
* A tariff plan may include paid tariff options whose cost is added to the cost of the tariff plan.
* The cost of a tariff plan for an image-based application must not include the cloud platform infrastructure. The infrastructure is billed separately according to the cloud platform rules.
* The service must not include:

   * Libraries and modules with a trial period — tariff plans must not have free periods.
   * Libraries and modules with additional billing — tariff plans must not have tariff options that are activated for an additional fee after the service instance is created or updated. All paid options must be configured at the stage of creating or updating a service instance.