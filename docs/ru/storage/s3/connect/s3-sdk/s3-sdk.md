Чтобы подключиться к VK Object Storage с помощью SDK:

1. Установите нужные инструменты или SDK:

   - [Инструменты для PowerShell](https://docs.aws.amazon.com/powershell).
   - [SDK для Java](https://docs.aws.amazon.com/sdk-for-java/index.html).
   - [SDK для .NET](https://docs.aws.amazon.com/sdk-for-net/index.html).
   - [SDK для JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/index.html).
   - [SDK для Ruby](https://docs.aws.amazon.com/sdk-for-ruby/index.html).
   - [SDK для Python (Boto)](http://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
   - [SDK для PHP](https://docs.aws.amazon.com/sdk-for-php/index.html).
   - [SDK для Go](https://docs.aws.amazon.com/sdk-for-go).
   - [Mobile SDK для iOS и Android](https://docs.amplify.aws).

1. Создайте [аккаунт](/ru/storage/s3/instructions/access-management/access-keys) и [бакет](../../instructions/buckets/create-bucket), если этого не было сделано ранее. Сохраните реквизиты для подключения:

   {tabs}

   {tab(Регион Москва)}

   - Endpoint URL: `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru`.
   - Access Key ID: полученный при создании аккаунта идентификатор ключа доступа.
   - Secret Key: полученный при создании аккаунта секретный ключ.
   - Default region name: `ru-msk`.

   {/tab}

   {tab(Регион Казахстан)}

   - Endpoint URL: `https://hb.kz-ast.vkcloud-storage.ru`.
   - Access Key ID: полученный при создании аккаунта идентификатор ключа доступа.
   - Secret Key: полученный при создании аккаунта секретный ключ.
   - Default region name: `kz-ast`.

   {/tab}

   {/tabs}

1. Настройте параметры подключения к VK Object Storage одним из способов:

   - Добавьте реквизиты в конфигурационный файл `~/.aws/credentials`.

     Полный список список инструментов и SDK, которые поддерживают такой способ, приведен в [официальной документации AWS](https://docs.aws.amazon.com/sdkref/latest/guide/supported-sdks-tools.html).

   - Укажите реквизиты в переменных окружения:

     {tabs}

     {tab(Linux (bash) / MacOS (zsh))}

     ```console
     export AWS_ACCESS_KEY_ID=<ИДЕНТИФИКАТОР_КЛЮЧА>
     export AWS_SECRET_ACCESS_KEY=<СЕКРЕТНЫЙ_КЛЮЧ>
     export AWS_DEFAULT_REGION=<РЕГИОН>
     ```

     {/tab}

     {tab(Windows (PowerShell))}

     ```console
     $Env:AWS_ACCESS_KEY_ID="<ИДЕНТИФИКАТОР_КЛЮЧА>"
     $Env:AWS_SECRET_ACCESS_KEY="<СЕКРЕТНЫЙ_КЛЮЧ>"
     $Env:AWS_DEFAULT_REGION="<РЕГИОН>"
     ```

     {/tab}

     {/tabs}

     {note:warn}

     Некоторые инструменты и SDK могут не считывать переменную `AWS_DEFAULT_REGION` и требуют указания региона другим способом — проверяйте документацию нужного инструмента.

     {/note}

   - Добавьте реквизиты непосредственно в исходный код.

1. Подключитесь к VK Object Storage через установленный SDK.

   В приведенных ниже примерах при успешном подключении выводится список бакетов хранилища для региона Москва.

   {cut(Пример на Python)}

     Все параметры подключения к объектному хранилищу указаны в исходном коде.

     ```python
     import boto3
     session = boto3.session.Session()
     s3_client = session.client(
         service_name = 's3',
         endpoint_url = 'https://hb.ru-msk.vkcloud-storage.ru',
         aws_access_key_id = '<YOUR_ACCESS_KEY>',
         aws_secret_access_key = '<YOUR_SECRET_KEY>',
         region_name='ru-msk'
     )

     response = s3_client.list_buckets()

     for key in response['Buckets']:
         print(key['Name'])
     ```

   {/cut}

   {cut(Пример на Go)}

     Идентификатор ключа аккаунта и секретный ключ добавлены в переменные среды окружения `AWS_ACCESS_KEY_ID` и `AWS_SECRET_ACCESS_KEY` соответственно. Остальные реквизиты для доступа к объектному хранилищу указаны в исходном коде.

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

   {/cut}
