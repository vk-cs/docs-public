# {heading(Updating an image-based application)[id=ibservice_update]}

{include(/en/_includes/_translated_by_ai_en.md)}

Updating the configuration of an image-based application may include:

* Changing parameters of tariff plans and options.
* Adding tariff plans and options.
* Deleting tariff plans and options.
* Changing parameters of resources described in Terraform manifests.
* Adding resources to Terraform manifests.

{note:err}

The current version of the marketplace does not support deleting resources from the Terraform manifest configuration. This functionality will be implemented in the next version.

All changes in the manifests must maintain backward compatibility.

{/note}

To update an image-based application in the marketplace:

1. Edit the service package files. The file parameters are described in the section [Adding an image-based application to the marketplace](/en/tools-for-using-services/vendor-account/instructions/manage-ib-apps/ib-add).
1. In the `service.yaml` file, specify a new service revision in the `revision` parameter.

   {note:warn}

   The service will not be updated if the specified service revision has already been uploaded to the marketplace.

   {/note}

1. If the tariff option files (the `parameters` directory) have been changed, then for each tariff plan that uses at least one changed option, specify a new revision.

   If the files describing a tariff plan have been changed, then specify a new revision in the `plans/<PLAN_NAME>/plan.yaml` file.

   {note:warn}

   Tariff plans and options will not be updated if the specified plan revisions have already been uploaded to the marketplace.

   {/note}

1. Upload the updated service package and publish a new service revision in the public namespace of the marketplace (for more details, see the section [Adding an image-based application](/en/tools-for-using-services/vendor-account/instructions/manage-ib-apps/ib-add#upload_package)).

   The previously published revision moves to the test namespace of the marketplace. All unpublished service revisions are retained in the test namespaces.

   Publishing a new revision does not affect the existing service instances. The revision of these service instances does not change.