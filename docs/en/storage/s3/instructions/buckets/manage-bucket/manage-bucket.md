# {heading(Bucket management)[id=s3-instructions-manage-bucket]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing the list of buckets)[id=s3-instructions-manage-bucket-view]}

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select a project.
1. Go to the **Object Storage** → **Buckets** section. The list of buckets in the project will open.
1. (Optional) Sort the list by bucket name using the arrows in the header of the corresponding column.

   - Ascending sort order: `a`–`z` / `-` / `.` / `0`–`9`.
   - Descending sort order: `9`–`0` / `.` / `-` / `z`–`a`.

   {note:warn}
   The sorting applies not to the entire list, but only to the part of it displayed on the screen.
   {/note}

{/tab}

{ifdef(s3,s3-pdf)}

{tab(File manager)}

{note:warn}
Here and below we use the file manager "CloudBerry Explorer for Amazon S3". If you use a different file manager, its interface and element names may differ from those used in this instruction.
{/note}

You can view and configure the properties of {var(s3)} buckets, including versioning settings, tags, default encryption, logging, notifications, and much more.

To view the properties of a bucket using the file manager, follow these steps:

1. On the file manager panel where your project is open, select the desired bucket and open the context menu with the right mouse button. In the context menu, select **Properties**.
1. In the window that opens, the bucket properties are available for viewing.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Install and configure {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} if it is not already installed.
1. Run the command in the console:

   ```console
   aws s3 ls --endpoint-url <ENDPOINT_URL>
   ```

   Here:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Example of a command to view the list of buckets)}

   Example command:

   ```console
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Example response:

   ```console
   2022-12-27 13:55:01 bucket-1
   2024-04-17 12:44:31 bucket-2
   2024-03-11 13:38:27 bucket-3
   2024-03-18 16:00:57 bucket-4
   ```

   {/cut}

A description of all parameters for the bucket list output command is available in the [official AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Install and configure the {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} for Go if it is not already installed.
1. Add the {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=connection credentials]} for {var(s3)} to environment variables or a configuration file if this has not been done previously.
1. Add the code to your project:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion = "ru-msk"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису VK Object Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   if res, err := svc.ListBuckets(nil); err != nil {
           log.Fatalf("Unable to list buckets, %v", err)
	   } else {
	       for _, b := range res.Buckets {
		       log.Printf("* %s created on %s \n", aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
		   }
	   }
   }
   ```
   {ifdef(public)} 
   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.
   {/ifdef}

The `ListBuckets` command is described in detail in the [official aws-sdk-go library documentation](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets).

{/tab}

{tab(Python SDK)}

1. Install and configure the {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} for Python if it is not already installed.
1. Add the {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=connection credentials]} for {var(s3)} to environment variables or a configuration file if this has not been done previously.
1. Add the code to your project:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.list_buckets()
   print(response)

   for key in response['Buckets']:
     print(key['Name'])
   ```
   {ifdef(public)}
   The value of the `endpoint_url` variable must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
   - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
   {/ifdef}

The `list_buckets` command is described in detail in the [official boto3 library documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html).

{/tab}

{/tabs}

## {heading(Domain binding)[id=s3-instructions-manage-bucket-domain]}

Binding a domain to a bucket will allow you to access the bucket objects through your domain, as well as use the bucket as a repository for your website.

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

1. Register a domain with any domain name registrar if this has not been done previously. Only a third-level or higher domain can be bound, for example: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. Go to the bucket settings in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Настройки** (Settings).
   - Click the name of the desired bucket, then on the bucket page click the button ![ ](../../../assets/settings-icon.svg "inline").

1. Go to the **Домен** (Domain) tab and click the button ![plus-icon](../../../assets/plus-icon.svg "inline") **Привязать домен** (Bind domain).
1. In the window that opens, copy the value for the CNAME record of the form `<ИМЯ_БАКЕТА>.<ENDPOINT_ДОМЕН>`. Example record: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Go to the management console of your domain provider. Add any CNAME record for your domain, and as the record value, add the copied text.
1. Wait for the changes to take effect. This usually takes 15–20 minutes.
1. Return to the {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} management console. In the **Домен** (Domain) field, enter the name of your domain.

After binding, the bucket will be available via a link of the form `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>`, for example `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}
If the bucket name contains a dot, it will only be accessible using the HTTP protocol. To use the HTTPS protocol, install an SSL certificate.
{/note}

{ifdef(public)}

## {heading(Using CDN)[id=s3-instructions-manage-bucket-cdn]}

{include(../../../_includes/_s3-create-cdn.md)[tags=s3_create_cdn_all,s3_create_cdn_s3]}

{/ifdef}

## {heading(Synchronizing a local directory with a bucket)[id=s3-instructions-manage-bucket-sync]}

{var(s3)} allows you to synchronize bucket objects and files of a local directory. During synchronization, {var(s3)} checks the presence of the file or object, their size, and the date of the last modification. The comparison occurs at the moment the command or request is executed. Depending on the command or request, the contents of either the bucket or the local directory are updated.

{tabs}

{tab(AWS CLI)}

1. Install and configure {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} if it is not already installed.
1. In the console, go to the local directory that needs to be synchronized with the bucket.
1. Run the command in the console:

   - To update the local directory to match the bucket:

     ```console
     aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <ENDPOINT_URL>
     ```
   - To update the bucket to match the local directory:

     ```console
     aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
     ```
       {ifdef(public)}
     - `<ENDPOINT_URL>` — must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
       - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.
       {/ifdef}
       {ifdef(s3,s3-pdf)}
     - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
       {/ifdef}

   {cut(Example of a command to update the local directory to match the bucket)}

   Example command:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Example response:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Example of a command to update the bucket to match the local directory)}

   Example command:

   ```console
   aws s3 sync . s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Example response:

   ```console
   upload: .\my-file.svg to s3://example-bucket/my-file.svg
   ```

   {/cut}

{/tab}

{/tabs}

## {heading(Deleting a bucket)[id=s3-instructions-manage-bucket-delete]}

{ifdef(public)}

{note:warn}
A bucket with the Backup storage class cannot be deleted. The objects contained in it can be deleted via the backup service.
{/note}

{/ifdef}

{tabs}

{tab(Personal account{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

This is a group operation: if necessary, you can delete several buckets at once by selecting them using checkboxes.

{ifdef(public)}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Log in]} to the IAM Only management console.

{/ifdef}

1. Select the project that contains the desired bucket.
1. Go to the **Object Storage** → **Buckets** section.
1. {linkto(../../objects/manage-object#s3-instructions-manage-object-delete)[text=Delete the objects]} from the bucket you want to delete if this has not been done previously.
1. Delete the bucket in one of the following ways:

   - Click ![ ](../../../assets/more-icon.svg "inline") for the desired bucket and select **Удалить** (Delete).
   - Select the bucket using the checkbox, then click the button ![trash-icon](../../../assets/trash-icon.svg "inline") **Удалить** (Delete).

1. Confirm the deletion.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(File manager)}

{note:warn}
Here and below we use the file manager "CloudBerry Explorer for Amazon S3". If you use a different file manager, its interface and element names may differ from those used in this instruction.
{/note}

1. On the file manager panel where your project is open, select the desired bucket and open the context menu with the right mouse button. In the context menu, select **Delete**.
1. Then confirm the deletion in the dialog box by clicking the **Yes** button.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Install and configure {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} if it is not already installed.
1. Run the command in the console:

   ```console
   aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <ENDPOINT_URL>
   ```

   Here:

   - (Optional) `force` — deletes the bucket and all objects in it. Without this parameter, the bucket will only be deleted if it contains no objects.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — the {var(s3)} service domain, must match the account {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}:

     - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
     - `https://hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.

     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — a link with the domain name used in your {var(s3)} installation. The name format may differ. To find out the exact link format, contact your administrator.
     {/ifdef}

   {cut(Example of a command to delete a bucket and all objects in it)}

   Example command:

   ```console
   aws s3 rb s3://example-bucket --force --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Example response:

   ```console
   delete: s3://example-bucket/images/picture-1.jpg
   delete: s3://example-bucket/images/picture-2.jpg
   delete: s3://example-bucket/input/
   remove_bucket: example-bucket
   ```

   {/cut}

A description of all parameters of the bucket deletion command is available in the [official AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html).

{/tab}

{/tabs}