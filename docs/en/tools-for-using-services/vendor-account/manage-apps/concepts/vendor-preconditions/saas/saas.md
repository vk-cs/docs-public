# {heading(SaaS application API requirements)[id=saas]}

{include(/en/_includes/_translated_by_ai_en.md)}

For a SaaS application to be added to the marketplace, the SaaS application API must support the following operations:

* Managing the service instance lifecycle:

   * Create. The marketplace must be able to retrieve all tariff plans and options of the SaaS application.
   * Update (change the tariff plan or options).
   * Get information (current tariff plan and options).
   * Delete.

* If service bindings are used to work with the service — manage their lifecycle:

   * Create.
   * Get information.
   * Delete.

* If service instance operations are performed asynchronously — get the status of the following operations:

   * On a service instance:

      * Creation.
      * Update.
      * Deletion.

   * On a service binding (if service bindings are used to work with the service):

      * Creation.
      * Deletion.

* If the SaaS application uses a prepaid billing type and has no free tariff plan — perform the following operations:

   * Suspend the service instance. This helps avoid data deletion in case the service instance is deactivated.
   * Resume the service instance operation.

* If the SaaS application uses a postpaid billing type — perform the following operations:

   * Submit information about service consumption by its instances for the reporting period (for example, per month).
   * Suspend the service instance. This helps avoid data deletion in case the service instance is deactivated.
   * Resume the service instance operation.

{note:warn}

Interaction between the marketplace and the SaaS application must be automated. Manual operations are not allowed.

{/note}