When registering on the VK Cloud platform and activating the account, the user gets full access to the Object Storage service.

Before uploading an object to the storage, you should create a bucket for its placement.

<note>

There is no charge for creating a bucket. The fee is charged only for storing objects in the bucket and for moving objects to and from the bucket. Additional information about the cost of storage and operations can be obtained at [website](https://mcs.mail.ru/pricing/).

</note>

There are several types of buckets that differ in both the purpose and the amount of payment for the objects placed in them:

- Hotbox — designed for storing and quickly distributing a large number of files for media services, online media, sites with multi-user content and mobile applications
- Icebox — cloud storage of rarely used data: backups, logs, media content, scientific, statistical data, as well as working archives
- Backup — placement of backup copies of instances created both automatically and manually. A bucket of this type is not subject to self-creation or deletion, but is managed by the backup service.

You can create a bucket both in the VK Cloud Panel and using the S3 CLI.

<warn>

There is a limit on the number of buckets in one project, for more information, see the article [Quotas and limits](/en/base/account/concepts/quotasandlimits#technical-limits)

</warn>

<tabs>
<tablist>
<tab>VK Cloud panel</tab>
<tab>S3 CLI</tab>
</tablist>
<tabpanel>

## Creation via VK Cloud Panel

To create it, you should:

1. Go to the "Buckets" tab of the Object Storage service in the VK Cloud panel.
2. Click the "Add" button.
3. Select the type of bucket to be created and enter a DNS-compatible name.

<warn>

The bucket name must meet the conditions:

- Be unique for the entire VK Cloud platform
- Contain from 4 to 63 characters
- Do not contain uppercase characters (uppercase)
- Start with a lowercase character (lowercase) or digits

Not recommended in the name:

- Formatting similar to the IP address (i.e. 192.168.5.4)
- Using the underscore character (\_), because it is not DNS-compatible and such a bucket cannot be linked to a DNS name
- Start with the characters xn--

It is recommended to avoid using personal information, such as the project number or user account in the bucket name.

After creating a bucket, its name cannot be changed.

</warn>

</tabpanel>
<tabpanel>

## Creation via S3 CLI

1. Create an authorized account.

Before creating a bucket, you need to create a user who will be granted access to manage operations in the S3 CLI.

To do this, on the "Accounts" tab of the "Object Storage" service, create an account by clicking the "Add Account" button, specify any desired name and save the API keys received.

2. Log in to S3 CLI

Run the AWS S3 configuration

```bash
aws configure
```

Use the following data in the configurator:

- Access Key ID: the key received when creating the account
- Secret Key: the key received when creating the account
- Default region name: ru-msk
- Default output format: json

3. Create a bucket

The bucket is created using the command

```bash
aws s3 mb s3://<unique package name> --endpoint-url <endpoint-url>
```

Where endpoint is the url:

- Common domain (points to the Moscow region): https://hb.vkcs.cloud
- Moscow domain: https://hb.ru-msk.vkcs.cloud
- Kazakhstan domain: https://hb.kz-ast.vkcs.cloud

The following output will appear as a result of the correct execution of the command:

```bash
make_bucket: <make_bucket_name>
```

A bucket with the appropriate storage type will be created. You can change its type in the VK Cloud panel.

</tabpanel>
</tabs>
