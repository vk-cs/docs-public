To connect to the object storage using the SDK:

1. Install the necessary tools or SDK:

   - [Tools for PowerShell](https://docs.aws.amazon.com/powershell/).
   - [SDK for Java](https://docs.aws.amazon.com/sdk-for-java/index.html).
   - [SDK for .NET](https://docs.aws.amazon.com/sdk-for-net/index.html).
   - [SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/index.html).
   - [SDK for Ruby](https://docs.aws.amazon.com/sdk-for-ruby/index.html).
   - [SDK for Python (Boto)](http://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
   - [SDK for PHP](https://docs.aws.amazon.com/sdk-for-php/index.html).
   - [SDK for Go](https://docs.aws.amazon.com/sdk-for-go/).
   - [Mobile SDK for iOS and Android](https://docs.amplify.aws/).

1. Create [account](../../instructions/account-management/) and [bucket](../../instructions/buckets/create-bucket/) if this has not been done before. Save the connection details:

   <tabs>
   <tablist>
   <tab>Moscow region</tab>
   <tab>Kazakhstan region</tab>
   </tablist>
   <tabpanel>

   - Endpoint URL: `https://hb.vkcs.cloud` or `https://hb.ru-msk.vkcs.cloud`.
   - Access Key ID: the key ID received when creating the account.
   - Secret Key: the secret key received when creating the account.
   - Default region name: `ru-msk`.

   </tabpanel>
   <tabpanel>

   - Endpoint url: `https://hb.kz-ast.vkcs.cloud`.
   - Access Key ID: the key ID received when creating the account.
   - Secret Key: the secret key received when creating the account.
   - Default region name: `kz-ast`.

   </tabpanel>
   </tabs>

1. Configure the connection parameters to the object storage using one of the following methods:

   - Add the details to the `~/.aws/credentials` configuration file.

     For a complete list of tools and SDKs that support this method, see [official AWS documentation](https://docs.aws.amazon.com/sdkref/latest/guide/supported-sdks-tools.html).

   - Specify the details in the environment variables:

     <tabs>
     <tablist>
     <tab>Linux (bash) / MacOS (zsh)</tab>
     <tab>Windows (PowerShell)</tab>
     </tablist>
     <tabpanel>

     ```bash
     export AWS_ACCESS_KEY_ID=<account key ID>
     export AWS_SECRET_ACCESS_KEY=<account secret key>
     export AWS_DEFAULT_REGION=<default region name>
     ```
  
     </tabpanel>
     <tabpanel>

     ```bash
     $Env:AWS_ACCESS_KEY_ID="<account key ID>"
     $Env:AWS_SECRET_ACCESS_KEY="<account secret key>"
     $Env:AWS_DEFAULT_REGION="<default region name>"     
     ```
  
     </tabpanel>
     </tabs>

     <warn>

     Some tools and SDKs may not read the `AWS_DEFAULT_REGION` variable and require specifying the region in a different way — check the documentation of the desired tool.

     </warn>

   - Add the details directly to the source code.

1. Connect to the storage via the installed SDK.

   In the examples below, upon successful connection, a list of storage buckets for the Moscow region is displayed.

   <details>
     <summary>Example on Python</summary>

     All parameters of connection to the object storage are specified in the source code.

     ```python
     import boto3
     session = boto3.session.Session()
     s3_client = session.client(
         service_name = 's3',
         endpoint_url = 'https://hb.vkcs.cloud',
         aws_access_key_id = '<YOUR_ACCESS_KEY>',
         aws_secret_access_key = '<YOUR_SECRET_KEY>',
         region_name='ru-msk'
     )

     response = s3_client.list_buckets()
 
     for key in response['Buckets']:
         print(key['Name'])
     ```

   </details>

   <details>
     <summary>Example on Go</summary>

     The parameters `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are added to the environment variables, the rest are specified in the source code.

     ```go
     package main

     import (
         "github.com/aws/aws-sdk-go/aws"
         "github.com/aws/aws-sdk-go/aws/session"
         "github.com/aws/aws-sdk-go/service/s3"
         "log"
     )
 
     const (
         vkCloudHotboxEndpoint = "https://hb.vkcs.cloud"
         defaultRegion = "ru-msk"
     )
 
     func main() {
     	sess, _ := session.NewSession()

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

   </details>
