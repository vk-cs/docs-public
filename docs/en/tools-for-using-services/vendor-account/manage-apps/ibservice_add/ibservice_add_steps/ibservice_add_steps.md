# {heading(Procedure)[id=ibservice_add_steps]}

{include(/en/_includes/_translated_by_ai_en.md)}

To add an image-based application to the store:

1. [Create a service image and upload it to the store](../ib_image_create).

   The recommended method is using Packer.

   {note:err}

   Before the service is published in the store, the image will be published in the cloud platform (for details, see the section {linkto(../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}). Instances of the service for users of the cloud platform will be deployed from the public image. The image data will be publicly available.

   {/note}
1. [Create](../ib_structure) the file structure of the service package.
1. [Prepare](../ibservice_configure) the files describing the service configuration (tariff plans, options).
1. [Prepare](../tf_manifest) the files describing the service infrastructure configuration.
1. [Upload and publish](../ibservice_upload) the service in the store.