## Viewing the list of objects

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) the VK Cloud management console.
1. Select the project that contains the bucket you need.
1. Go to the **Object Storage → Buckets** section.
1. Click the name of the bucket you need.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

      ```console
      aws s3 ls s3://<bucket_name> --endpoint-url <domain>
      ```

      Here:

      - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
         - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
         - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for viewing the list of objects)}

      Command example:

      ```console
      aws s3 ls s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Response example:

      ```console
                                    PRE folder/
      2023-09-27 11:45:05     421326 picture-1.jpg
      2023-09-27 11:47:37       2713 picture-2.png
      2023-09-27 11:48:37       2662 picture-3.png
      2023-09-27 10:31:02      48314 picture-4.png
      2023-09-27 11:48:56        361 delete-picture.png
      ```

   {/cut}

A full description of object viewing operations is available in the [official AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis).

{/tab}

{tab(Golang SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Go if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"

   const defaultRegion = "ru-msk"

   func main() {
	   // Create a session
	   sess, _ := session.NewSession()

	   // Connect to the VK Object Storage service
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   bucket := "gobucket"
	   // get the list of objects in the bucket
	   result, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		   Bucket: aws.String(bucket),
	   })
	   if err != nil {
		   log.Fatalf("Unable to list items in bucket %q, %v", bucket, err)
	   } else {
         // iterate over the objects
		   for _, item := range result.Contents {
			log.Printf("Object: %s, size: %d\n", aws.StringValue(item.Key), aws.Int64Value(item.Size))
		   }
	   }
   }
   ```

   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account's [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.

The `ListObjectsV2` command is described in detail in the [official documentation for the aws-sdk-go library](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2).

{/tab}

{tab(Python SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Python if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```

The value of the `endpoint_url` variable must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

- `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
- `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

The `list_object` command is described in detail in the [official documentation for the boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

{/tab}

{/tabs}

## Downloading an object

{tabs}

{tab(Management console)}

1. [Go](https://msk.cloud.vk.com/app/en) to the VK Cloud management console.
1. Select the project that contains the bucket you need.
1. Go to the **Object Storage → Buckets** section.
1. Click the name of the bucket you need.
1. Do one of the following for the object you need:

   - Select the object using the checkbox, then click the **Download** button.
   - Expand the object's menu and select **Download file**.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and go to the directory where you want to download the object.

1. Run the command:

   ```console
   aws s3api get-object --bucket <bucket_name> --key <object_key> <downloaded_file_name> --endpoint-url <domain>
   ```

   Here:

   - `<object_key>` — the object name and the path to it, including directories, if any.
   - `<downloaded_file_name>` — the name that will be assigned to the downloaded object.
   - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
       - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for downloading an object)}

      Command example:

      ```console
      aws s3api get-object --bucket my-bucket --key folder/my-object.exe uploaded-file.exe --endpoint-url   https://hb.ru-msk.vkcloud-storage.ru
      ```

      Response example:

      ```json
      {
       "LastModified": "2023-10-05T14:38:16+00:00",
       "ContentLength": 13204976,
       "ETag": "\"ab5083fd8cd77246da821f42f90a5761\"",
       "ContentType": "application/x-msdownload",
       "Metadata": {}
       }
      ```
   {/cut}

{/tab}

{tab(Golang SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Go if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
	   "strings"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "ru-msk"
   )

   func main() {
	   // Create a session
	   sess, _ := session.NewSession()

	   // Connect to the VK Object Storage service
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   bucket := "gobucket"
	   key := "test_string.txt"

	   // Retrieve the object from the bucket
	   if result, err := svc.GetObject(&s3.GetObjectInput{
		   Bucket: aws.String(bucket),
		   Key:    aws.String(key),
	   }); err != nil {
		   log.Fatalf("Unable to get object %q from bucket %q, %v\n", key, bucket, err)
	   } else {
		   data := make([]byte, *result.ContentLength)
		   result.Body.Read(data)
		   log.Printf("File with data %q downloaded from bucket %q", data, bucket)
	   }
   }

   ```

   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account's [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.

   The `GetObject` command is described in detail in the [official documentation for the aws-sdk-go library](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject).

{/tab}

{tab(Python SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Python if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```

   The value of the `endpoint_url` variable must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   The `get_object` command is described in detail in the [official documentation for the boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

{/tab}

{/tabs}

## Granting access to an object

Objects uploaded to a bucket have the `private` access level by default, which means they can only be downloaded:

- in the VK Cloud management console;
- via CLI, API, SDK, and file managers, if there are access keys to the bucket or account.

You can change the object's access level to make it available to third-party users. Access levels correspond to [standard ACLs](../../access-management/s3-acl). The following levels are available by default:

- `private` — full access rights if you have access keys to the bucket or account; the object is not available to anyone else;
- `public-read` — full access rights if you have the keys; other VK Cloud users and third-party users have read-only access to the object;
- `authenticated-read` — full access rights if you have the keys; other VK Cloud users have read-only access to the object.

To change an object's access level:

{tabs}

{tab(Management console)}

This is a bulk operation: if needed, you can change access settings for several objects at once by selecting them with the checkboxes.

1. [Go](https://msk.cloud.vk.com/app/en) to the VK Cloud management console.
1. Select the project that contains the bucket you need.
1. Go to the **Object Storage → Buckets** section.
1. Click the name of the bucket you need.
1. Expand the menu of the object you need and select **File access**.
1. In the **ACL settings** field, select the access setting you need and click **Save changes**. If you select `public-read` or `authenticated-read`, a link for accessing the object will appear after you save the changes.
1. Copy the link and close the access settings window.
1. Send the link to users or place it on a third-party resource for direct access to the object.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

      ```console
      aws s3api put-object-acl --bucket <bucket_name> --key <object_key> --acl <acl_setting> --endpoint-url <domain>
      ```

      Here:

      - `<object_key>` — the object name and the path to it, including directories, if any.
      - `<acl_setting>` — the ACL access level. If the specified access level is not configured in the project, the object will be assigned the `private` access level.
      - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
         - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
         - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for viewing the list of objects)}

      Command example:

      ```console
      aws s3api put-object-acl --bucket my-bucket --key picture.png --acl public-read --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   {/cut}

A full description of the object ACL modification operation is available in the [official AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

{/tab}

{/tabs}

## Granting access to an object via a presigned URL

A presigned URL provides full access to an object for a third-party user, but is limited in time.

To generate a presigned URL:

{tabs}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

   ```console
   aws s3 presign s3://<bucket_name>/<object_key> --endpoint-url <domain> --expires-in <validity_period>
   ```

   Here:

   - `<object_key>` — the object name and the path to it, including directories, if any.
   - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
       - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.
   - `<validity_period>` — the access validity period in seconds. If not specified, the link will be valid for 3600 seconds.

   {cut(Example command for generating a presigned URL)}

   Command example:

   ```console
   aws s3 presign s3://my-bucket/my-object.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --expires-in 300000
   ```

   Response example:

   ```http
   https://hb.ru-msk.vkcloud-storage.ru/dd-winscp/usetech.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=4TucX9HhP8RZveR9Cb3vGr%2F20231113%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=20231113T104239Z&X-Amz-Expires=300000&X-Amz-SignedHeaders=host&X-Amz-Signature=5a7c4d87d12dd12f8f420ffaed84328f1d6a79050818fd4c615b219ce7bc18e9
   ```

   {/cut}

{/tab}

{tab(Golang SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Go if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```go
   package main

   import (
	   "context"
	   "fmt"
	   "github.com/aws/aws-sdk-go-v2/aws"
	   "github.com/aws/aws-sdk-go-v2/config"
	   "github.com/aws/aws-sdk-go-v2/service/s3"
	   "log"
	   "os"
	   "time"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "ru-msk"
   )

   func main() {
	   cfg, err := config.LoadDefaultConfig(context.TODO())
	   if err != nil {
		   fmt.Printf("Error loading default config: %v", err)
		   os.Exit(0)
	   }

	   client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		   o.BaseEndpoint = aws.String(vkCloudHotboxEndpoint)
		   o.Region = defaultRegion
	   })

	   presigner := s3.NewPresignClient(client)
	   // the name of the bucket where the object is located
	   bucketName := "my-bucket"
	   // the object name
	   objectKey := "picture.png"
	   lifeTimeSeconds := int64(60)

	   request, err := presigner.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		   Bucket: aws.String(bucketName),
		   Key:    aws.String(objectKey),
	   }, func(opts *s3.PresignOptions) {
		   opts.Expires = time.Duration(lifeTimeSeconds * int64(time.Second))
	   })

	   if err != nil {
		   log.Printf("Couldn't get a presigned request to get %v:%v. Error: %v\n",
			   bucketName, objectKey, err)
	   }

	   fmt.Printf("%s", request.URL)
   }
   ```
   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account's [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.

{/tab}

{tab(Python SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Python if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```python
   import argparse
   import logging
   import boto3
   from botocore.exceptions import ClientError
   import requests

   def create_presigned_url(s3_client, bucket_name, object_name, expiration=60):
      try:
         response = s3_client.generate_presigned_url('get_object',
                                                      Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                      ExpiresIn=expiration)
      except ClientError as e:
         logging.error(e)
         return None

      return response

   logger = logging.getLogger(__name__)
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   request = create_presigned_url(s3_client, "my-bucket", "picture.png")

   if request is not None:
      url = requests.get(request)
      print("url is ", request)
   else:
      print("Error creating link")
   ```

   The value of the `endpoint_url` variable must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

{/tab}

{/tabs}

## Copying an object

This guide is suitable for copying an object within a single bucket or between buckets of the same project.

{tabs}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

   ```console
   aws s3 cp s3://<source_bucket>/<object_key> s3://<destination_bucket>/<object_key> --endpoint-url=<domain>
   ```

   Here:

   - `<source_bucket>` — the name of the bucket the object is copied from.
   - `<destination_bucket>` — the name of the bucket the object is copied to. If the names match, the object is copied within the same bucket.
   - `<object_key>` — the object name and the path to it, including directories, if any.
   - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
       - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for copying an object to another bucket)}

   Command example:

   ```console
   aws s3 cp s3://my-bucket/my-picture.png s3://my-another-bucket/my-picture.png --endpoint-url=https://hb.ru-msk.vkcloud-storage.ru
   ```

   Response example:

   ```console
   copy: s3://my-bucket/my-picture.png to s3://my-another-bucket/my-picture.png
   ```

   {/cut}

{/tab}

{tab(Golang SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Go if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```go
   package main

   import (
	   "fmt"
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
	   "strings"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "ru-msk"
   )

   func main() {
	   // Create a session
	   sess, _ := session.NewSession()

	   // Connect to the VK Object Storage service
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Copy an object from one bucket to another

	   sourceBucket := "gobucket"
	   sourceKey := "test_string.txt"
	   destBucket := "gobucket2"
	   destKey := "test_string.txt"

	   if _, err := svc.CopyObject(&s3.CopyObjectInput{
		   Bucket:     aws.String(destBucket),
		   Key:        aws.String(destKey),
		   CopySource: aws.String(fmt.Sprintf("%s/%s", sourceBucket, sourceKey)),
	   }); err != nil {
		   log.Fatalf("Unable to copy object from %q to %q, %v\n", sourceBucket, destBucket, err)
	   } else {
		   fmt.Printf("Object copied from %q to %q\n", sourceBucket, destBucket)
	   }
   }
   ```

   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account's [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.

   The `CopyObject` command is described in detail in the [official documentation for the aws-sdk-go library](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty).

{/tab}

{tab(Python SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Python if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```python

   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   source_bucket_name = 'boto3-source-bucket-name'
   source_path = 'object_key1.txt'
   target_bucket_name = 'boto3-target-bucket-name'
   target_path = 'backup/copy_object_key1.txt'


   copy_source = {
      'Bucket': source_bucket_name,
      'Key': source_path
   }

   s3_client.copy(copy_source, target_bucket_name, target_path)
   ```
   The value of the `endpoint_url` variable must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   The `copy` command is described in detail in the [official documentation for the boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy).

{/tab}

{/tabs}

## Copying all objects of a bucket

{tabs}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

   ```console
   aws s3 cp --recursive s3://<source_bucket> s3://<destination_bucket> --endpoint-url=<domain>
   ```

   Here:

   - `<source_bucket>` — the name of the bucket the object is copied from.
   - `<destination_bucket>` — the name of the bucket the object is copied to. If the names match, the object is copied within the same bucket.
   - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
       - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for copying all objects of a bucket to another bucket)}

      Command example:

      ```console
      aws s3 cp --recursive s3://my-bucket s3://my-another-bucket --endpoint-url=https://hb.ru-msk.vkcloud-storage.ru
      ```

      Response example:

      ```console
      copy: s3://my-bucket/video.mp4 to s3://my-another-bucket/video.mp4
      copy: s3://my-bucket/pre/scheme.svg to s3://my-another-bucket/pre/scheme.svg
      copy: s3://my-bucket/picture.png to s3://my-another-bucket/picture.png
      copy: s3://my-bucket/example.txt to s3://my-another-bucket/example.txt
      ```

   {/cut}

{/tab}

{/tabs}

## Deleting an object

{tabs}

{tab(Management console)}

This is a bulk operation: if needed, you can delete several objects at once by selecting them with the checkboxes.

To delete an object:

1. [Go](https://msk.cloud.vk.com/app/en) to the VK Cloud management console.
1. Select the project that contains the bucket you need.
1. Go to the **Object Storage → Buckets** section.
1. Click the name of the bucket you need. A page with information about the bucket will open on the **Folders and files** tab.
1. Do one of the following for the object you need:

   - Select the object using the checkbox, then click the **Delete** button.
   - Expand the object's menu and select **Delete file**.

1. Confirm the deletion.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already.

1. Open the console and run the command:

   ```console
   aws s3 rm s3://<bucket_name>/<object_key> --endpoint-url=<domain>
   ```

   Here:

   - `<object_key>` — the object name and the path to it, including directories, if any.
   - `<domain>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):
       - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
       - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for deleting an object)}

      Command example:

      ```console
      aws s3 rm s3://my-bucket/my-picture.png --endpoint-url=https://hb.ru-msk.vkcloud-storage.ru
      ```

      Response example:

      ```console
      delete: s3://my-bucket/my-picture.png
      ```

   {/cut}

{/tab}

{tab(Golang SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Go if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
	   "strings"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion = "ru-msk"
   )

   func main() {
	   // Create a session
	   sess, err := session.NewSession()
	   if err != nil {
		   log.Fatalf("Unable to create session, %v", err)
	   }
	   // Connect to the VK Object Storage service
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Delete an object from the bucket
      bucket := "gobucket"
	   key := "test_string.txt"

	   if _, err := svc.DeleteObject(&s3.DeleteObjectInput{
		   Bucket: aws.String(bucket),
		   Key:    aws.String(key),
	   }); err != nil {
		   log.Fatalf("Unable to delete object %q from bucket %q, %v\n", key, bucket, err)
	   } else {
		   log.Printf("Object %q deleted from bucket %q\n", key, bucket)
	   }

      // Delete multiple objects
	   if _, err := svc.DeleteObjects(&s3.DeleteObjectsInput{
		   Bucket: aws.String(bucket),
		   Delete: &s3.Delete{
			   Objects: []*s3.ObjectIdentifier{
				   {
					   Key: aws.String("test_string1.txt"),
				   },
				   {
					   Key: aws.String("test_string2.txt"),
				   },
			   },
		   },
	   }); err != nil {
		   log.Fatalf("Unable to delete objects from bucket %q, %v\n", bucket, err)
	   } else {
		   log.Printf("Objects deleted from bucket %q\n", bucket)
	   }
   }

   ```
   The values of the `vkCloudHotboxEndpoint` and `defaultRegion` variables must match the account's [region](../../../../../tools-for-using-services/account/concepts/regions):

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — for the Moscow region;
      - `https://hb.kz-ast.vkcloud-storage.ru` — for the Kazakhstan region.

   - `defaultRegion`:

      - `ru-msk` — for the Moscow region;
      - `kz-ast` — for the Kazakhstan region.

   The [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) and [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) commands are described in detail in the official documentation for the aws-sdk-go library.

{/tab}

{tab(Python SDK)}

1. Install and configure the [SDK](../../../connect/s3-sdk) for Python if you haven't done so already.

1. Add the [connection credentials](../../../connect/s3-sdk) for VK Object Storage to environment variables or a configuration file if you haven't done so already.

1. Add the code to your project:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   #Deleting a single object
   s3_client.delete_object(Bucket='boto3-bucket-name-test', Key='object_name.txt',)

   #Deleting multiple objects
   object_to_delete = [{'Key':'objectkey1.txt'}, {'Key':'objectkey2.txt'}]
   s3_client.delete_objects(Bucket=test_bucket_name, Delete={'Objects': object_to_delete})
   ```

   The value of the `endpoint_url` variable must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

   - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
   - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   The `delete_objects` command is described in detail in the [official documentation for the boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects).

{/tab}

{/tabs}

## Deleting parts of an uploaded object

If a [multipart upload](/en/storage/s3/concepts/features#object_uploading) is not completed, the object is not created and cannot be used, but storage of the uploaded parts is [charged](../../../tariffication). To avoid being charged, delete multipart uploads that will not be completed.

You can configure automatic deletion of incomplete uploads via the object lifecycle, or delete the upload manually.

{tabs}

{tab(Management console)}

To find out if you have incomplete multipart uploads:

1. [Go to](https://msk.cloud.vk.com/app/en) the VK Cloud management console.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the bucket you need and go to the **Multipart** tab.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already. Set the output format to JSON or YAML, since text formats are not recognized when running multipart upload or deletion commands.
1. Open the console and run the command:

   ```console
   aws s3api list-multipart-uploads --bucket <bucket_name> --endpoint-url <endpoint-url>
   ```

   Here:

    - `<bucket_name>` — the name of the bucket for which you need to delete incomplete uploads.

    - `<endpoint-url>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
      - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   {cut(Example command for viewing incomplete uploads)}

      Command example:

      ```console
      aws s3api list-multipart-uploads --bucket mybucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Response example:

      ```json
      {
         "Uploads": [
          {
            "UploadId": "example5kqtRsMpLxb1eZoHh8y9wmpjgfGA6mgDRRag",
            "Key": "inupload.avi",
            "Initiated": "2023-10-27T11:54:45.984000+00:00",
            "StorageClass": "STANDARD",
            "Owner": {
               "DisplayName": "project",
               "ID": "XXXXrs3jZaLwhimPAbVEiny"
            },
            "Initiator": {
               "ID": "XXXXrs3jZaLwhimPAbVEiny",
               "DisplayName": "project"
            }
          }
         ],
         "RequestCharged": null
      }
      ```

   {/cut}

{/tab}

{/tabs}

To delete incomplete uploads:

{tabs}

{tab(Management console)}

This is a bulk operation: if needed, you can delete several parts at once by selecting them with the checkboxes.

1. [Go to](https://msk.cloud.vk.com/app/en) the VK Cloud management console.
1. Go to the **Object Storage** → **Buckets** section.
1. Click the name of the bucket you need and go to the **Multipart** tab.
1. Do one of the following for the part you need:

   - Select the part using the checkbox, then click the **Delete** button above the table.
   - Select the part you want to delete and click the ![Delete](assets/delete-icon.svg "inline") icon on the right.
1. Confirm the deletion.

{/tab}

{tab(AWS CLI)}

1. Install and configure [AWS CLI](../../../connect/s3-cli) if you haven't done so already. Set the output format to JSON or YAML, since text formats are not recognized when running multipart upload or deletion commands.
1. Open the console and run the command:

   ```console
   aws s3api abort-multipart-upload --bucket <bucket_name> --key <object_key> --upload-id <UploadId> --endpoint-url <endpoint-url>
   ```

   Here:

    - `<bucket_name>` — the name of the bucket for which you need to delete incomplete uploads.

    - `<object_key>` — the **Name** of the object on the **Multipart** tab in the management console, or the value of the `Key` parameter in the AWS CLI response.

    - `<UploadId>` — the **ID** of the object on the **Multipart** tab in the management console, or the value of the `UploadId` parameter in the AWS CLI response.

    - `<endpoint_url>` — the VK Object Storage domain, which must match the account's [region](/en/tools-for-using-services/account/concepts/regions):

      - `https://hb.vkcloud-storage.ru` or `https://hb.ru-msk.vkcloud-storage.ru` — the Moscow region domain;
      - `https://hb.kz-ast.vkcloud-storage.ru` — the Kazakhstan region domain.

   Command execution example:

   ```console
   aws s3api abort-multipart-upload --bucket mybucket --key inupload.avi --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

As a result, all incomplete uploads will be canceled, and the uploaded parts will be deleted.

{/tab}

{/tabs}
