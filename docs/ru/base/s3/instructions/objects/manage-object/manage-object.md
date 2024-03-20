## Просмотр списка объектов

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

      ```bash
      aws s3 ls s3://<имя_бакета> --endpoint-url <домен>
      ```

      Здесь:
  
      - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
         - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
         - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды просмотра списка объектов</summary>

      Пример команды:

      ```bash
      aws s3 ls s3://my-bucket --endpoint-url https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```bash
                                    PRE folder/
      2023-09-27 11:45:05     421326 picture-1.jpg
      2023-09-27 11:47:37       2713 picture-2.png
      2023-09-27 11:48:37       2662 picture-3.png
      2023-09-27 10:31:02      48314 picture-4.png
      2023-09-27 11:48:56        361 delete-picture.png
      ```

   </details>

Полное описание операций просмотра объектов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"

   const defaultRegion = "us-east-1"

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Cloud Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   bucket := "gobucket"
	   // получение списка объектов в бакете
	   result, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		   Bucket: aws.String(bucket),
	   })
	   if err != nil {
		   log.Fatalf("Unable to list items in bucket %q, %v", bucket, err)
	   } else {
         // итерирование по объектам
		   for _, item := range result.Contents {
			log.Printf("Object: %s, size: %d\n", aws.StringValue(item.Key), aws.Int64Value(item.Size))
		   }
	   }
   }
   ```

Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](../../../../account/concepts/regions) аккаунта:

- `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
- `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

Команда `ListObjectsV2` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcs.cloud')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```

Значение переменной `endpoint_url` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

- `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
- `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

Команда `list_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

</tabpanel>
</tabs>

## Скачивание объекта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета.
1. Выполните одно из действий для нужного объекта:

   - Выберите с помощью флажка объект, затем нажмите кнопку **Скачать**.
   - Раскройте меню объекта и выберите пункт **Скачать файл**.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и перейдите в директорию, в которую нужно скачать объект.

1. Выполните команду:

   ```bash
   aws s3api get-object --bucket <имя_бакета> --key <ключ_объекта> <имя_загруженного файла> --endpoint-url <домен>
   ```

   Здесь:

   - `<ключ_объекта>` — имя объекта и путь до него, включая папки, если они есть.
   - `<имя_загруженного файла>` — имя, которое будет присвоено скаченному объекту.
   - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
       - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
       - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды скачивания объекта</summary>

      Пример команды:

      ```bash
      aws s3api get-object --bucket my-bucket --key folder/my-object.exe uploaded-file.exe --endpoint-url   https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```json
      {
       "LastModified": "2023-10-05T14:38:16+00:00",
       "ContentLength": 13204976,
       "ETag": "\"ab5083fd8cd77246da821f42f90a5761\"",
       "ContentType": "application/x-msdownload",
       "Metadata": {}
       }
      ```
   </details>

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Cloud Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   bucket := "gobucket"
	   key := "test_string.txt"

	   // Извлечение объекта из бакета
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

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команда `GetObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcs.cloud')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команда `get_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects).

</tabpanel>
</tabs>

## Предоставление доступа к объекту

Загруженные в бакет объекты по умолчанию имеют уровень доступа `private`, то есть их можно скачать только:

- в личном кабинете VK Cloud;
- через CLI, API, SDK и файловые менеджеры, если есть ключи доступа к бакету или аккаунту.

Вы можете изменить уровень доступа объекта, чтобы сделать его доступным сторонним пользователям. Уровни доступа соответствуют [фиксированным ACL](../../access-management/s3-acl). По умолчанию доступны уровни:

- `private` — полные права доступа при наличии ключей доступа к бакету или аккаунту, всем остальным объект не доступен;
- `public-read` — полные права доступа при наличии ключей, остальным пользователям VK Cloud и сторонним пользователям объект доступен только для чтения;
- `authenticated-read` — полные права доступа при наличии ключей, остальным пользователям VK Cloud объект доступен только для чтения.

Чтобы изменить уровень доступа к объекту:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно изменить настройки доступа сразу для нескольких объектов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета.
1. Раскройте меню нужного объекта и выберите **Доступ к файлу**.
1. В поле **Настройка ACL** выберите нужную настройку доступа и нажмите **Сохранить изменения**. При выборе `public-read` или `authenticated-read` после сохранения изменений появится ссылка на доступ к объекту.
1. Скопируйте ссылку и закройте окно настройки доступа.
1. Отправьте ссылку пользователям или разместите ее на стороннем ресурсе для прямого доступа к объекту.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

      ```bash
      aws s3api put-object-acl --bucket <имя_бакета> --key <ключ_объекта> --acl <настройка_acl> --endpoint-url <домен>
      ```

      Здесь:
  
      - `<ключ_объекта>` — имя объекта и путь до него, включая папки, если они есть.
      - `<настройка_acl>` — уровень доступа ACL. Если указанный уровень доступа не настроен в проекте, то объекту будет присвоен уровень доступа `private`.
      - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
         - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
         - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды просмотра списка объектов</summary>

      Пример команды:

      ```bash
      aws s3api put-object-acl --bucket my-bucket --key picture.png --acl public-read --endpoint-url https://hb.ru-msk.vkcs.cloud
      ```

   </details>

Полное описание операции изменения ACL объекта доступно в [официальной документации AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

</tabpanel>
</tabs>

## Предоставление доступа к объекту по подписанному URL

[Подписанный URL](../../../references/signed-url) предоставляет полный доступ к объекту стороннему пользователю, но ограничен по времени.

Для генерации подписанного URL:

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

   ```bash
   aws s3 presign s3://<имя_бакета>/<ключ_объекта> --endpoint-url <домен> --expires-in <время_действия>
   ```

   Здесь:

   - `<ключ_объекта>` — имя объекта и путь до него, включая папки, если они есть.
   - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
       - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
       - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.
   - `<время_действия>` — время действия доступа в секундах. Если не указано, ссылка будет действовать 3600 секунд.

   <details>
      <summary>Пример команды формирования подписанного URL</summary>

   Пример команды :

   ```bash
   aws s3 presign s3://my-bucket/my-object.png --endpoint-url https://hb.ru-msk.vkcs.cloud --expires-in 300000
   ```

   Пример ответа:

   ```bash
   https://hb.vkcs.cloud/dd-winscp/usetech.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=4TucX9HhP8RZveR9Cb3vGr%2F20231113%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=20231113T104239Z&X-Amz-Expires=300000&X-Amz-SignedHeaders=host&X-Amz-Signature=5a7c4d87d12dd12f8f420ffaed84328f1d6a79050818fd4c615b219ce7bc18e9
   ```

   </details>

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"
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
	   // имя бакета, где находится объект
	   bucketName := "my-bucket"
	   // имя объекта
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
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcs.cloud')

   request = create_presigned_url(s3_client, "my-bucket", "picture.png")

   if request is not None:
      url = requests.get(request)
      print("url is ", request)
   else:
      print("Error creating link")
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

</tabpanel>
</tabs>

## Копирование объекта

Инструкция подходит для копирования объекта в пределах одного бакета или между бакетами одного проекта.

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

   ```bash
   aws s3 cp s3://<бакет_источник>/<ключ_объекта> s3://<бакет_приемник>/<ключ_объекта> --endpoint-url=<домен>
   ```

   Здесь:

   - `<бакет_источник>` — имя бакета, из которого копируется объект.
   - `<бакет_приемник>` — имя бакета, в который копируется объект. Если имена совпадают, объект копируется в тот же бакет.
   - `<ключ_объекта>` — имя объекта и путь до него, включая папки, если они есть.
   - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
       - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
       - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды копирования объекта в другой бакет</summary>

   Пример команды:

   ```bash
   aws s3 cp s3://my-bucket/my-picture.png s3://my-another-bucket/my-picture.png --endpoint-url=https://hb.ru-msk.vkcs.cloud
   ```

   Пример ответа:

   ```bash
   copy: s3://my-bucket/my-picture.png to s3://my-another-bucket/my-picture.png
   ```

   </details>

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Cloud Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Копирование объекта из одного бакета в другой
	
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

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команда `CopyObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcs.cloud')

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
   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команда `copy` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy).

</tabpanel>
</tabs>

## Копирование всех объектов бакета

<tabs>
<tablist>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

   ```bash
   aws s3 cp --recursive s3://<бакет_источник> s3://<бакет_приемник> --endpoint-url=<домен>
   ```

   Здесь:

   - `<бакет_источник>` — имя бакета, из которого копируется объект.
   - `<бакет_приемник>` — имя бакета, в который копируется объект. Если имена совпадают, объект копируется в тот же бакет.
   - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
       - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
       - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды копирования всех объектов бакета в другой бакет</summary>

      Пример команды:

      ```bash
      aws s3 cp --recursive s3://my-bucket s3://my-another-bucket --endpoint-url=https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```bash
      copy: s3://my-bucket/video.mp4 to s3://my-another-bucket/video.mp4
      copy: s3://my-bucket/pre/scheme.svg to s3://my-another-bucket/pre/scheme.svg
      copy: s3://my-bucket/picture.png to s3://my-another-bucket/picture.png
      copy: s3://my-bucket/example.txt to s3://my-another-bucket/example.txt
      ```

   </details>

</tabpanel>
</tabs>

## Удаление объекта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько объектов, выбрав их с помощью флажков.

Для удаления объекта:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета. Откроется страница с информацией о бакете на вкладке **Папки и файлы**.
1. Выполните одно из действий для нужного объекта:

   - Выберите с помощью флажка объект, затем нажмите кнопку **Удалить**.
   - Раскройте меню объекта и выберите пункт **Удалить файл**.

1. Подтвердите удаление.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

   ```bash
   aws s3 rm s3://<имя_бакета>/<ключ_объекта> --endpoint-url=<домен>
   ```

   Здесь:

   - `<ключ_объекта>` — имя объекта и путь до него, включая папки, если они есть.
   - `<домен>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:
       - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
       - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды удаления объекта</summary>

      Пример команды:

      ```bash
      aws s3 rm s3://my-bucket/my-picture.png --endpoint-url=https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```bash
      delete: s3://my-bucket/my-picture.png
      ```

   </details>

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"
	   defaultRegion = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, err := session.NewSession()
	   if err != nil {
		   log.Fatalf("Unable to create session, %v", err)
	   }
	   // Подключение к сервису Cloud Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Удаление объекта из бакета
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

      // Удаление множества объектов
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
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команды [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) и [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) подробно описаны в официальной документации к библиотеке aws-sdk-go.

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../storage-connecting/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../storage-connecting/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcs.cloud')

   test_bucket_name = 'boto3-test-bucket-name'

   #Удаление одного объекта
   s3_client.delete_object(Bucket='boto3-bucket-name-test', Key='object_name.txt',)

   #Удаление множества объектов
   object_to_delete = [{'Key':'objectkey1.txt'}, {'Key':'objectkey2.txt'}]
   s3_client.delete_objects(Bucket=test_bucket_name, Delete={'Objects': object_to_delete})
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Команда `delete_objects` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects).

</tabpanel>
</tabs>

## Удаление частей загруженного объекта

Если [составная загрузка](../../../references#sostavnaya_zagruzka) не завершена, объект не создается и не может использоваться, но хранение загруженных частей [тарифицируется](../../../tariffication). Чтобы средства не списывались, удаляйте составные загрузки, которые не будут завершены.

Вы можете настроить автоматическое удаление незавершенных загрузок через [жизненный цикл](../../../references#zhiznennyy_cikl) объектов или удалить загрузку вручную.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

Чтобы узнать, есть ли у вас незавершенные составные загрузки:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. Откройте консоль и выполните команду:

   ```bash
   aws s3api list-multipart-uploads --bucket <имя_бакета> --endpoint-url <endpoint-url>
   ```

   Здесь:

    - `<имя_бакета>` — имя бакета, для которого нужно удалить незавершенные загрузки.

    - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

      - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
      - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды просмотра незавершенных загрузок</summary>

      Пример команды:

      ```bash
      aws s3api list-multipart-uploads --bucket mybucket --endpoint-url https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

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

   </details>

</tabpanel>
</tabs>

Чтобы удалить незавершенные загрузки:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько частей, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.
1. Выполните одно из действий для нужной части:

   - Выберите с помощью флажка часть, затем нажмите кнопку **Удалить** над таблицей.
   - Выберите часть, которую нужно удалить, и нажмите на значок ![Удалить](./assets/delete-icon.svg "inline") справа.
1. Подтвердите удаление.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../storage-connecting/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. Откройте консоль и выполните команду:

   ```bash
   aws s3api abort-multipart-upload --bucket <имя_бакета> --key <ключ_объекта> --upload-id <UploadId> --endpoint-url <endpoint-url>
   ```

   Здесь:

    - `<имя_бакета>` — имя бакета, для которого нужно удалить незавершенные загрузки.

    - `<ключ_объекта>` — **Название** объекта на вкладке **Multipart** в личном кабинете или значение параметра `Key` в ответе AWS CLI.

    - `<UploadId>` — **ID** объекта на вкладке **Multipart** в личном кабинете или значение параметра `UploadId` в ответе AWS CLI.

    - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/base/account/concepts/regions) аккаунта:

      - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
      - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   Пример выполнения команды:

   ```bash
   aws s3api abort-multipart-upload --bucket mybucket --key inupload.avi --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

В результате все незавершенные загрузки будут отменены, а загруженные части — удалены.
</tabpanel>
</tabs>
