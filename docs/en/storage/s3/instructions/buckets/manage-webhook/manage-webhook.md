# {heading(Managing webhooks)[id=s3-instructions-manage-webhook]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows you to configure notifications about adding or deleting an object from a bucket.

{note:info}
Notifications are usually delivered within seconds, but sometimes it may take a minute or more.
{/note}

## {heading(Adding a webhook)[id=s3-instructions-manage-webhook-add]}

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then click the ![ ](../../../assets/settings-icon.svg "inline") button on the bucket page.

1. Go to the **Webhooks** tab and click the ![plus-icon](../../../assets/plus-icon.svg "inline") **Add** button.
1. Specify the webhook parameters:

   - **ID**: the webhook name. The name must be unique within a single bucket.
   - **Event**: events upon which a notification should be sent:

     - `ObjectCreated` — adding an object to the bucket by any method, includes the `PutObject`, `PutObjectCopy`, and `CompleteMultipartUpload` events;
     - `PutObject` — adding an object;
     - `PutObjectCopy` — adding a copy of an object;
     - `CompleteMultipartUpload` — adding an object using the multipart method;
     - `ObjectRemoved` — deleting an object by any method, includes the `DeleteObject` event;
     - `DeleteObject` — deleting an object.

   - **URL**: the address of the webhook receiving server. For example, `http://83.166.234.90/webhook`. To receive webhooks, ports `80` or `443` must be configured on the server.
   - **Filter prefix**: a filter that allows generating webhooks for events only for objects whose names contain the specified prefix. For example, if you enter the value `images`, webhooks will be sent when objects such as `bucket\images\picture.png`, `bucket\images\picture.svg` are modified. In the management console, the prefix is displayed as a directory.
   - **Filter suffix**: a filter that allows generating webhooks for events only for objects whose names contain the specified suffix. For example, if you enter the value `png`, webhooks will be sent when files with the `.png` extension are modified.

1. Click the **Add hook** button.

{/tab}

{/tabs}

You can study the webhook exchange mechanism in {var(s3)} in detail using the [example of creating an event-driven application](https://habr.com/ru/companies/vk/articles/510110).

## {heading(Editing a webhook)[id=s3-instructions-manage-webhook-edit]}

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then click the ![ ](../../../assets/settings-icon.svg "inline") button on the bucket page.

1. Go to the **Webhooks** tab.
1. Click ![ ](../../../assets/more-icon.svg "inline") for the desired webhook and select ![pencil-icon](../../../assets/pencil-icon.svg "inline") **Edit hook**.
1. Edit the webhook {linkto(#s3-instructions-manage-webhook-add)[text=parameters]}.
1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Deleting a webhook)[id=s3-instructions-manage-webhook-delete]}

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

This is a group operation: if necessary, you can delete multiple webhooks by selecting them using checkboxes.

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Open the bucket settings in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Settings**.
   - Click the name of the desired bucket, then click the ![ ](../../../assets/settings-icon.svg "inline") button on the bucket page.

1. Go to the **Webhooks** tab.
1. Delete the webhook in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired webhook and select ![trash-icon](../../../assets/trash-icon.svg "inline") **Delete hook**.
   - Check the checkbox for the desired webhook and click the ![trash-icon](../../../assets/trash-icon.svg "inline") **Delete** button.

1. Confirm the deletion.

{/tab}

{/tabs}