# {heading(Bucket access keys)[id=s3-instructions-bucket-keys]}

{include(/en/_includes/_translated_by_ai_en.md)}

To grant someone access to the objects in a bucket, add {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys-bucket-access-keys)[text=access keys]} to it. Keys associated with a bucket provide access to the entire bucket or to the objects in it that share a common {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=prefix]}.

## {heading(Adding access keys)[id=s3-instructions-bucket-keys-add]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Navigate](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the desired bucket.
1. Go to the **Keys** tab and click the **Add key** button.
1. Enter the key name. Name requirements:

   - it must be from 4 to 74 characters long;
   - it must start and end with a letter or a digit;
   - it must consist only of lowercase Latin letters, digits, and the following characters: `.`, `-`, `_`;
   - it must be unique across the entire {ifdef(public)}{var(cloud)} platform{/ifdef}{ifdef(s3,s3-pdf)}{var(s3)} installation{/ifdef} in all regions.

1. Enable the **Restrict access** option if you need to grant access to only some objects in the bucket. If the option is disabled, the created key will provide access to all objects in the bucket.
1. Enter the object prefix — access will be granted only to the objects whose name contains the specified prefix. If you specify a prefix that does not yet exist in the bucket, an empty directory named after the prefix will be added.
1. Click the **Create** button.
1. A window will open containing the key identifier (**Access Key ID**) and the secret key (**Secret Key**). Copy the value of the **Secret Key** field and save it on your device.

{note:warn}
After the window is closed, the secret key cannot be restored. If the key is lost, create a new one.
{/note}

{/tab}

{/tabs}

## {heading(Deleting access keys)[id=s3-instructions-bucket-keys-delete]}

{tabs}

{tab(Management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

This is a group operation: if necessary, you can delete multiple keys at once by selecting them using the checkboxes.

{ifdef(public)}

1. [Navigate](https://msk.cloud.vk.ru/app) to the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the desired bucket and go to the **Keys** tab.
1. Delete the key in one of the following ways:

   - Click the ![trash-icon](../../../assets/trash-icon.svg "inline") icon next to the key you want to delete.
   - Select the key using a checkbox, then click the ![trash-icon](../../../assets/trash-icon.svg "inline") **Delete** button.

1. Confirm the deletion.

{/tab}

{/tabs}