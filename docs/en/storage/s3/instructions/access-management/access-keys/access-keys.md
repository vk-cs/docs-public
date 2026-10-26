# {heading({var(s3)} Account and Its Access Keys)[id=s3-instructions-access-keys]}

{include(/en/_includes/_translated_by_ai_en.md)}

To work with {var(s3)} via AWS CLI, API, and file managers, you need an access key. To obtain a key, create a {linkto(#s3-instructions-access-keys-new-account-access-key)[text={var(s3)} account]} to which it will be linked.

{note:warn}
Keys linked to an account grant access to all of the account's buckets. If you need to grant access to only one bucket or a portion of the objects in it, {linkto(../bucket-keys#s3-instructions-bucket-keys-add)[text=add]} separate access keys to that bucket.
{/note}

## {heading(Creating an Account and an Access Key)[id=s3-instructions-access-keys-new-account-access-key]}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Go to the **Object Storage** → **Accounts** section.
1. Click **Add**.
1. Enter the account name:

   - it must start and end with a letter or a digit;
   - it can consist only of Latin letters, digits, and special characters: `.`, `-`, `_`;
   - it must be unique within the project.

1. A window will open containing the key identifier (**Access Key ID**) and the secret key (**Secret Key**). Copy the value of the **Secret Key** field and save it on your device.

{note:warn}
After the window is closed, the secret key cannot be recovered. If the key is lost, create a new one.
{/note}

## {heading(Adding an Access Key to an Existing Account)[id=s3-instructions-access-keys-existing-account-access-key]}

If two keys have already been created for an account, adding new ones is unavailable. {linkto(#s3-instructions-access-keys-delete-access-key)[text=Delete]} one of the keys to add a new one.

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Go to the **Object Storage** → **Accounts** section.
1. Add a key in one of the following ways:

   - Click **Add access key** next to the desired account.
   - Click the account name and then click **Add access key**. If no access keys have been created for the account, click **Create key**.

   A window will open containing the key identifier (**Access Key ID**) and the secret key (**Secret Key**).

1. Copy the value of the **Secret Key** field and save it on your device. After the window is closed, the secret key cannot be recovered.

## {heading(Deactivating an Access Key)[id=s3-instructions-access-keys-deactivate-access-key]}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Go to the **Object Storage** → **Accounts** section.
1. Click the name of the account to which the key is linked.
1. On the opened page, deactivate the desired key.

If a key is deactivated, it cannot be used to access the service. Deactivated keys have no expiration date and can be activated at any time.

## {heading(Deleting an Access Key)[id=s3-instructions-access-keys-delete-access-key]}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Go to the **Object Storage** → **Accounts** section.
1. Click the name of the account for which you need to delete the access key.
1. On the opened page, select the key you want to delete and click the ![Delete](../../../assets/delete-icon.svg "inline") **Delete** button on the right.
1. Confirm the deletion.

If a key is deleted, it cannot be used to access the service. Deleted access keys cannot be restored.

## {heading(Deleting an Account)[id=s3-instructions-access-keys-delete-account]}

This is a group operation: if necessary, you can delete multiple accounts at once by selecting them using checkboxes and clicking the **Delete** button above the list of accounts.

To delete an account and its keys:

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Sign in]} to the IAM Only management console.

{/ifdef}

1. Go to the **Object Storage** → **Accounts** section.
1. Select the account you want to delete and click the ![Delete](../../../assets/delete-icon.svg "inline") icon on the right.
1. Confirm the deletion.

If an account is deleted, access to the service via its keys will no longer be possible. A deleted account cannot be restored.