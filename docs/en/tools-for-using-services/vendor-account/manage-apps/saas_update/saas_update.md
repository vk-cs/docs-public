# {heading(Updating a SaaS application)[id=saas_update]}

{include(/en/_includes/_translated_by_ai_en.md)}

Updating the configuration of a SaaS application may include:

* Changing the parameters of tariff plans and options.
* Adding tariff plans and options.
* Deleting tariff plans and options.

To update a SaaS application in the marketplace:

1. Edit the service configuration file.

   1. To keep the currently published revision of the service available in the test namespaces of the marketplace, insert a new section describing the new service configuration into the JSON file:

      {caption(null)[align=left;position=above]}
      ```json
      {
        "services": [
          {
          <SERVICE_PARAMETERS>,
          "preview": {
              "parameters": [
              ]
            },
          "plans": [
            ]
          },
          {
          <SERVICE_PARAMETERS>,
          "preview": {
              "parameters": [
              ]
            },
          "plans": [
            ]
          }
        ]
      }
      ```
      {/caption}

      If the current revision of the service does not need to remain available in the test namespace of the marketplace, skip this step.
   1. Describe the new service configuration (for more details, see the section [SaaS application configuration](../saas_add/saas_configure)).
   1. In the new service configuration, specify a new revision of the service.

      {note:warn}

      The service will not be updated if the specified service revision has already been uploaded to the marketplace.

      {/note}
   1. If the parameters of tariff plans have been changed, specify new plan revisions in the new service configuration.

      {note:warn}

      The tariff plans will not be updated if the specified plan revisions have already been uploaded to the marketplace.

      {/note}

1. If tariff plans have been added or deleted, edit the `resources/plan_mapping.json` file in the broker directory (for more details, see the section {linkto(../saas_add/saas_broker_add_configuration#saas_broker_add_configuration)[text=%text]}).
1. The marketplace periodically requests the current service configuration from the broker, so the new configuration will automatically appear in the test namespace of the marketplace.

   {note:err}

   For the marketplace to be able to retrieve the current service configuration, the broker must be available around the clock.

   {/note}
1. Test the new service revision in the test namespace of the marketplace (for more details, see the section {linkto(../saas_add/saas_upload/saas_upload_testmarketplace#saas_upload_testmarketplace)[text=%text]}).
1. Publish the new service revision in the public namespace of the marketplace (for more details, see the section {linkto(../saas_add/saas_upload/saas_upload_publish#saas_upload_publish)[text=%text]}).

   The previously published revision moves to the test namespace of the marketplace if it is preserved in the service configuration file. All unpublished revisions described in the service configuration are preserved in the test namespaces.

   Service revisions removed from the service configuration will not be available in either the test or public namespaces of the marketplace.

   Publishing a new revision does not affect the already existing service instances (tenants/accounts). The revision of these service instances does not change, even if it has been removed from the service configuration and is unavailable in the marketplace.