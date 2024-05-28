You can delete a CDN resource in two ways:

- [Through the CDN service interface](#deleting_resource_via_cdn_service_interface).

- [Through the bucket interface](#deleting_resource_via_bucket_interface) in the [Cloud Storage](/en/base/s3) service. Use this if the CDN resource [was created trough the bucket interface](../create-resource#creating_resource_via_bucket_interface).

## Deleting resource via CDN service interface

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: you can delete several CDN resources at once by setting the checkboxes.

To delete a CDN resource:

{include(/en/_includes/_open-cdn.md)[tags=resources]}

1. Delete the resource in one of the following ways:

   - Set the checkbox for the required resource, then click **Delete** above the table.
   - Click ![menu-icon](/en/assets/menu-icon.svg "inline") for the resource you need and select **Delete**.

1. Confirm the deletion.

</tabpanel>
</tabs>

## Deleting resource via bucket interface

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en) you VK Cloud personal account.
1. Select the project with the bucket you need.
1. Go to the **Cloud Storage → Buckets** section.
1. Click the name of the bucket you need.
1. Go to the **CDN** tab.
1. Disable the **Use CDN for this bucket** option.

</tabpanel>
</tabs>
