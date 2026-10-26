
{include(/en/_includes/_translated_by_ai_en.md)}

A SaaS application must be updated if changes are made to its tariff plans:

* tariff plan or option parameters are changed;
* tariff plans or options are added;
* tariff plans or options are removed.

In case of such changes, update the SaaS application configuration in Marketplace:

1. Edit the JSON file `catalog_<SERVICE_NAME>.json` with the service configuration description.

   1. To keep access to the currently published service revision in Marketplace test namespaces, insert an additional section into the JSON file to describe the new service configuration.

      {cut(Structure of the additional section)}

      {include(/en/_includes/_saas_add_update.md)[tags=service_config]}

      {/cut}

   1. Make sure that the JSON file retains all sections describing the published service revisions.

      {note:err}

      Deleting such sections will result in the deletion of these revisions. Deletion is allowed only for unpublished service revisions: test ones or those removed from publication.

      {/note}

   1. Make sure that the new service configuration specifies a new [service revision](../../../reference/saas-apps-reference/saas-param). If the specified service revision has already been uploaded to Marketplace, the service will not be updated.

   1. If you have changed the parameters of the current tariff plans, make sure that the new service configuration specifies new [plan revisions](../../../reference/saas-apps-reference/saas-plan). If the specified plan revisions have already been uploaded to Marketplace, the tariff plans will not be updated.

1. If you have added or removed tariff plans, edit the `resources/plan_mapping.json` file in the broker directory.

   {cut(Structure of the resources/plan_mapping.json file)}

   ```json
   {
      "<SERVICE_NAME>": {
         "<PLAN_ID>": <SAAS_PLAN_ID>,
         "<PLAN_ID>": <SAAS_PLAN_ID>
      }
   }
   ```

   Here:

   * `<SERVICE_NAME>` — the service name.
   * `<PLAN_ID>` — the ID of the tariff plans specified in the `catalog_<SERVICE_NAME>.json` file.
   * `<SAAS_PLAN_ID>` (format: `string`) — the ID of the tariff plans on the service side corresponding to the tariff plan IDs `<PLAN_ID>`.

   Example of the `plan_mapping.json` file content:

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

   {/cut}

   Since the broker periodically sends the list of service configurations to Marketplace, the new configuration will automatically appear in the Marketplace test namespace.

   {note:err}

   For Marketplace to be able to receive the current service configuration in a timely manner, the broker must be available around the clock.

   {/note}

1. Test the new service revision in the Marketplace test namespace.

   {include(/en/_includes/_saas_add_update.md)[tags=test_service]}

1. If necessary, make changes to the configuration of the new service revision:

   1. Navigate to the `resources` subdirectory of the broker directory.
   1. Edit the `catalog_<SERVICE_NAME>.json` and `plan_mapping.json` files.
   1. Repeat testing once more.

1. If you specified test cost values in the new revision for the duration of testing and debugging, edit the `catalog_<SERVICE_NAME>.json` file to specify the real values.

1. Publish the new service revision in the open Marketplace namespace. To do this, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). In the email, specify the service ID and its new revision.

   The service configuration will be moderated. After that, the new service revision will move from the Marketplace test namespace to the open namespace specified in the `metadata` parameter in the [service configuration JSON file](../../../reference/saas-apps-reference/saas-param). The new service revision will be available to all users who have access to this open namespace.

   {note:warn}

   Only the latest published service revision is available in open namespaces.

   {/note}

   The previously published revision will move to the Marketplace test namespace. All unpublished revisions described in the service configuration JSON file are retained in the test namespaces.

   Service revisions removed from the service configuration will not be available in either the test or open Marketplace namespaces.

   Publishing a new revision will not affect the already existing service instances (tenants/accounts). The revision of these service instances will not change, even if it has been removed from the service configuration and is no longer available in Marketplace.