# {heading(Publishing a service image)[id=ibservice_upload_publish_image]}

{include(/en/_includes/_translated_by_ai_en.md)}

To publish a service image in the cloud platform:

1. Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

   In the email, specify the ID of the service image.

   The specified image will be published. A reply email will contain the ID of the public service image.

   {note:info}

   The public service image will be available to all users of the cloud platform.

   {/note}
1. In the `plans/<PLAN_NAME>/deployment/deploy.tf` manifests, replace the service image ID with the public service image ID.
1. In the `service.yaml` file, specify a new service revision.
1. To upload a service package with the public service image ID to the store, make a request to the Infra API service as described in the section {linkto(../ibservice_upload_package#ibservice_upload_package)[text=%text]}.