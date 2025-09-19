## Просмотр списка объектов

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя бакета. Откроется список объектов в бакете.
1. (Опционально) Отсортируйте список по имени объекта, используя стрелки в заголовке соответствующего столбца.

   - Порядок при сортировке по возрастанию:  `A`–`Z` / `a`–`z` / `A`–`Я` / `а`–`я` / спецсимволы по возрастанию ASCII-значений / `0`–`9`.
   - Порядок при сортировке по убыванию:  `9`–`0` / спецсимволы по убыванию ASCII-значений / `я`–`а` / `Я`–`А` / `z`–`a` / `Z`–`A`.

   {note:warn}
   Сортировка действует не на весь список целиком, а только на ту его часть, которая выведена на экран.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА>/<ПУТЬ>/ --recursive --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя целевого бакета.
   - `<ПУТЬ>` — путь до директории. Укажите путь, чтобы вывести список объектов, расположенных в определенной директории. Пример: если у вас есть доступ только к объектам, расположенным в определенной директории.
   - `--recursive` — параметр, при использовании которого команда выполнится для всех объектов, расположенных в бакете или в указанной директории.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды просмотра списка объектов)}

      Пример команды:

      ```console
      aws s3 ls s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Пример ответа:

      ```console
                                    PRE folder/
      2023-09-27 11:45:05     421326 picture-1.jpg
      2023-09-27 11:47:37       2713 picture-2.png
      2023-09-27 11:48:37       2662 picture-3.png
      2023-09-27 10:31:02      48314 picture-4.png
      2023-09-27 11:48:56        361 delete-picture.png
      ```

   {/cut}

Описание доступных параметров для команды просмотра списка объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"

   const defaultRegion = "us-east-1"

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Object Storage
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

Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

- `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
- `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

Команда `ListObjectsV2` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2).

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```

Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

- `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
- `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

Команда `list_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

{/tab}

{/tabs}

## Скачивание объекта

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объект с помощью флажка и нажмите кнопку **Скачать**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для объекта и выберите пункт **Скачать файл**.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. Откройте консоль и перейдите в директорию, в которую нужно скачать объект.

1. Выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=get_object]}

   {cut(Пример команды скачивания объекта)}

      Пример команды:

      ```console
      aws s3api get-object \
        --bucket my-bucket \
        --key folder/my-object.exe \
        uploaded-file.exe \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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
   {/cut}

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Object Storage
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

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `GetObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject).

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `get_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects).

{/tab}

{/tabs}

## {heading(Изменение уровня доступа к объекту)[id=manage_access]}

Загруженные в бакет объекты по умолчанию имеют уровень доступа `private`, то есть их можно скачать только:

- в личном кабинете VK Cloud;
- через CLI, API, SDK и файловые менеджеры, если есть ключи доступа к бакету или аккаунту.

Вы можете изменить уровень доступа объекта, чтобы сделать его доступным сторонним пользователям. Уровни доступа соответствуют [фиксированным ACL](../../../concepts/s3-acl#fiksirovannyy_acl). По умолчанию можно установить уровни:

- `private` — полные права при наличии ключей доступа к бакету или аккаунту, всем остальным объект недоступен;
- `public-read` — полные права при наличии ключей, остальным пользователям VK Cloud и сторонним пользователям объект доступен только для чтения;
- `authenticated-read` — полные права при наличии ключей, остальным пользователям VK Cloud объект доступен только для чтения, сторонним пользователям объект недоступен.

Чтобы изменить уровень доступа к объекту:

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объекты или директории с помощью флажков и нажмите кнопку **Доступ**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для объекта и выберите пункт **Доступ к файлу**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для директории и выберите пункт **Доступ к файлам в папке**.

1. В поле **Настройка ACL** выберите настройку доступа и нажмите **Сохранить изменения**. При выборе `public-read` или `authenticated-read` после сохранения изменений появится ссылка на доступ к объекту.
1. Скопируйте ссылку и закройте окно настройки доступа.
1. Отправьте ссылку пользователям или разместите ее на стороннем ресурсе для прямого доступа к объекту.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду для изменения уровня доступа:

   {tabs}
   {tab(К одному объекту)}

   ```console
   aws s3api put-object-acl \
     --acl <НАСТРОЙКА_ACL> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<НАСТРОЙКА_ACL>` — уровень доступа ACL. Если указанный уровень доступа не настроен в проекте, то объекту будет присвоен уровень доступа `private`.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды настройки доступа к объекту)}

      ```console
      aws s3api put-object-acl \
        --acl public-read \
        --bucket my-bucket \
        --key picture.png \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   {/cut}

   Полное описание операции изменения ACL объекта доступно в [официальной документации AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

   {/tab}
   {tab(Ко всем объектам в бакете или в его директории)}

    ```console
   aws s3 cp s3://<ИМЯ_БАКЕТА>/<ПУТЬ>  s3://<ИМЯ_БАКЕТА>/<ПУТЬ> \
     --acl <НАСТРОЙКА_ACL> \
     --recursive \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, доступ к объектам в котором нужно изменить.
   - `<ПУТЬ>` — путь до директории, доступ к объектам в которой нужно изменить.
   - `<НАСТРОЙКА_ACL>` — уровень доступа ACL. Если указанный уровень доступа не настроен в проекте, то объекту будет присвоен уровень доступа `private`.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Время модификации объектов обновится. Учитывайте это при управлении жизненным циклом (lifecycle) объектов и использовании условных запросов (`if-modified-since`).

   {cut(Пример команды настройки доступа к объекту)}

      ```console
      aws s3 cp s3://my-bucket s3://my-bucket \
        --acl public-read \
        --recursive \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Предоставление доступа к объекту по подписанному URL)[id=access_via_signed_link]}

<!--- на слова "Подписанный URL" прикрепить ссылку на раздел "Разграничение доступа", когда он будет написан--->
Подписанный URL предоставляет полный доступ к объекту стороннему пользователю, но ограничен по времени.

Для генерации подписанного URL:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

   ```console
   aws s3 presign s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА> \
     --expires-in <СРОК_ДЕЙСТВИЯ> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<СРОК_ДЕЙСТВИЯ>` — время действия доступа в секундах. Если не указано, ссылка будет действовать 3600 секунд.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды формирования подписанного URL)}

   Пример команды:

   ```console
   aws s3 presign s3://my-bucket/my-object.png \
     --expires-in 300000 \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```http
   https://hb.ru-msk.vkcloud-storage.ru/dd-winscp/usetech.ico?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=4TucX9HhP8RZveR9Cb3vGr%2F20231113%2Fru-msk%2Fs3%2Faws4_request&X-Amz-Date=20231113T104239Z&X-Amz-Expires=300000&X-Amz-SignedHeaders=host&X-Amz-Signature=5a7c4d87d12dd12f8f420ffaed84328f1d6a79050818fd4c615b219ce7bc18e9
   ```

   {/cut}

Описание доступных параметров для команды формирования подписанного URL — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/presign.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   request = create_presigned_url(s3_client, "my-bucket", "picture.png")

   if request is not None:
      url = requests.get(request)
      print("url is ", request)
   else:
      print("Error creating link")
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

{/tab}

{/tabs}

## {heading(Блокировка удаления объектов)[id=lock_object]}

Установить блокировку от удаления или перезаписи можно только для объектов в бакетах, созданных с [явным указанием](../../buckets/create-bucket#ways_to_create_bucket) такой возможности.

### Временная блокировка по умолчанию

Временная блокировка по умолчанию (`DefaultRetention`) устанавливается на уровне бакета. Она применяется ко всем новым объектам, загружаемым в бакет, и не распространяется на уже загруженные объекты.
Устанавливать блокировку по умолчанию необязательно.

{note:warn}

Явное указание режима и срока блокировки для объекта внутри бакета имеет приоритет над настройками блокировки по умолчанию на уровне бакета.

{/note}

Для управления временной блокировкой по умолчанию:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой:

   {tabs}
   
   {tab(Установить)}
      
   Чтобы установить временную блокировку по умолчанию, выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

   {cut(Пример команды)}

   ```console
   aws s3api put-object-lock-configuration \
     --bucket my_bucket \
     --object-lock-configuration '{
         "ObjectLockEnabled": "Enabled",
         "Rule": {
             "DefaultRetention": {
                 "Mode": "COMPLIANCE",
                 "Days": 30
             }
         }
     }' \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа. Для всех новых объектов, загружаемых в `my_bucket`, будет устанавливаться строгий режим блокировки на срок в 30 дней. Для уже загруженных в `my_bucket` объектов режим блокировки не изменится.

   {/cut}

   {/tab}
   
   {tab(Снять)}
   
   Чтобы снять временную блокировку по умолчанию, выполните команду:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --object-lock-configuration '{
         "ObjectLockEnabled": "Enabled"
         }' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого снимается блокировка по умолчанию.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {/tab}
   
   {tab(Узнать статус)}
   
   Чтобы получить текущую конфигурацию блокировки по умолчанию для бакета, выполните команду:

   ```console
   aws s3api get-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого запрашивается конфигурация блокировки по умолчанию.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api get-object-lock-configuration \
     --bucket my_bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример вывода:

   ```json
   { "ObjectLockConfiguration": {
      "ObjectLockEnabled": "Enabled",
      "Rule": {
         "DefaultRetention": {
            "Mode": "COMPLIANCE",
            "Days": 30 }}}}
   ```

   {/cut}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

### {heading(Бессрочная блокировка)[id=object_legal_hold]}

Бессрочная блокировка (legal hold) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете. Устанавливать и снимать такую блокировку может только пользователь, обладающий [правами на запись WRITE](../../../concepts/s3-acl#permissons).

{note:warn}

Если для объекта установлены одновременно и временная, и бессрочная блокировки, бессрочная имеет приоритет над временной.

{/note}

Для управления бессрочной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
   
   {tab(Установить для нового объекта)}
      
   Чтобы установить бессрочную блокировку для нового объекта, загружаемого в бакет, выполните команду:

   ```console
   aws s3api put-object \
     --body <ПУТЬ_К_ФАЙЛУ> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --object-lock-legal-hold-status ON \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object \
     --body image.png \
     --bucket my-bucket-with-lock \
     --key images/image.png \
     --object-lock-legal-hold-status ON \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Пример ответа:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
   {tab(Установить для объекта в бакете)}
   
   Чтобы установить бессрочную блокировку для объекта, находящегося в бакете, выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

   {cut(Пример команды)}

   ```console
   aws s3api put-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --legal-hold Status=ON \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Снять)}
   
   Чтобы снять бессрочную блокировку для объекта, находящегося в бакете, выполните команду:

   ```console
   aws s3api put-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --legal-hold Status=OFF \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --legal-hold Status=OFF \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Узнать статус)}
   
   Чтобы узнать статус бессрочной блокировки объекта, выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

   {cut(Пример команды)}

   ```console
   aws s3api get-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```json
   {
      "LegalHold": {
         "Status": "ON"
      }
   }
   ```

   {/cut}

   {note:info}

   Статус блокировки объекта также можно посмотреть в ответах команд `s3api get-object` и `s3api head-object`. Подробнее — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

### Временная блокировка

Временная блокировка (retention period) может устанавливаться как при загрузке объекта в бакет, так и для объекта, уже находящегося в бакете.

Для управления временной блокировкой:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие с блокировкой.

   {tabs}
   
   {tab(Установить для нового объекта)}
      
   Чтобы установить временную блокировку для нового объекта, загружаемого в бакет, выполните команду:

   ```console
   aws s3api put-object \
     --body <ПУТЬ_К_ФАЙЛУ> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ> \
     --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в который будет загружен новый объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:
     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).
   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object \
     --body image.png \
     --bucket my-bucket-with-lock \ 
     --key images/image2.png \
     --object-lock-mode GOVERNANCE \
     --object-lock-retain-until-date '2025-05-15 12:00:00' \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Пример ответа:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
   {tab(Установить для объекта в бакете)}
   
   Чтобы установить временную блокировку для объекта, находящегося в бакете, выполните команду:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{
       "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
       "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
       }' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).
   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --retention '{
       "Mode": "COMPLIANCE",
       "RetainUntilDate": "2025-05-15 12:00:00"
       }' \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Продлить)}
   
   Чтобы установить временную блокировку для объекта, находящегося в бакете, выполните команду:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{
       "Mode": "<РЕЖИМ_БЛОКИРОВКИ>",
       "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
       }' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<РЕЖИМ_БЛОКИРОВКИ>` — режим блокировки:

     - `GOVERNANCE` — [управляемый режим](/ru/storage/s3/concepts/objects-lock#governance-lock);
     - `COMPLIANCE` — [строгий режим](/ru/storage/s3/concepts/objects-lock#compliance-lock).

   - `<YYYY-MM-DD HH:MM:SS>` — новая более поздняя дата и время окончания блокировки.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --retention '{
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2025-08-15 21:00:00"
        }' \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Узнать статус)}

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_state]}

   {cut(Пример команды)}

   ```console
   aws s3api get-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```json
   {
      "Retention": {
         "Mode": "COMPLIANCE",
         "RetainUntilDate": "2025-03-15T12:00:00+00:00"
      }
   }
   ```

   {/cut}

   {note:info}

   Статус блокировки объекта также можно посмотреть в ответах команд `s3api get-object` и `s3api head-object`. Подробнее — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

### Обход временной блокировки

{note:warn}

Обойти временную блокировку со строгим режимом (`COMPLIANCE`) нельзя.

{/note}

Пользователь, обладающий [правами на запись WRITE](../../../concepts/s3-acl#permissons), может обойти временную блокировку с режимом `GOVERNANCE`, используя в командах флаг `--bypass-governance-retention`. Обходя блокировку, он может:

- удалить объект до окончания срока блокировки;
- снять временную блокировку;
- сократить срок блокировки;
- изменить режим на `COMPLIANCE`.

Для выполнения действий в обход блокировки:

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните нужное действие.

   {tabs}
   
   {tab(Удалить объект)}
      
   Чтобы удалить объект, для которого установлена управляемая временная блокировка, выполните команду:

   ```console
   aws s3api delete-object \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api delete-object \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Снять блокировку)}
   
   Чтобы снять с объекта управляемую временную блокировку, выполните команду:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{}' \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --retention '{}' \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Сократить срок)}
   
   Чтобы сократить для объекта срок управляемой временной блокировки, выполните команду:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{
       "Mode": "GOVERNANCE",
       "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
       }' \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<YYYY-MM-DD HH:MM:SS>` — новая более ранняя дата и время окончания блокировки.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --retention '{
       "Mode": "GOVERNANCE",
       "RetainUntilDate": "2025-04-10 10:00:00"
       }' \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}
   
   {tab(Изменить режим)}
   
   Чтобы изменить для объекта режим временной блокировки на `COMPLIANCE`, выполните команду:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{
       "Mode": "COMPLIANCE",
       "RetainUntilDate": "<YYYY-MM-DD HH:MM:SS>"
       }' \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<YYYY-MM-DD HH:MM:SS>` — дата и время окончания блокировки.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --retention '{
       "Mode": "COMPLIANCE",
       "RetainUntilDate": "2025-05-15 12:00:00"
       }' \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Команда не выводит ответа.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Копирование объектов)[id=copy_object]}

Инструкция подходит для копирования объектов в пределах одного бакета или между бакетами одного проекта.

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

   ```console
   aws s3 cp --recursive s3://<БАКЕТ_ИСТОЧНИК>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> s3://<БАКЕТ_ПРИЕМНИК>/<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `--recursive` — параметр, при использовании которого команда выполнится для всех объектов, расположенных в бакете или в указанной директории.
   - `<БАКЕТ_ИСТОЧНИК>` — имя бакета, из которого копируется объект.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — полное имя копируемого объекта или директории, из которой копируются объекты, включая путь до нее.
   - `<БАКЕТ_ПРИЕМНИК>` — имя бакета, в который копируется объект. Если имена совпадают, объект копируется в тот же бакет.
   - `<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА>` — полное имя объекта или директории, в которую копируются объекты, включая путь до нее.
   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
       - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
       - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды копирования одного объекта в другой бакет)}

   Пример команды:

   ```console
   aws s3 cp s3://my-bucket/my-picture.png s3://my-another-bucket/my-picture.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   copy: s3://my-bucket/my-picture.png to s3://my-another-bucket/my-picture.png
   ```

   {/cut}

   {cut(Пример команды копирования всех объектов бакета в другой бакет)}

   Пример команды:

      ```console
      aws s3 cp --recursive s3://my-bucket s3://my-another-bucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   Пример ответа:

      ```console
      copy: s3://my-bucket/video.mp4 to s3://my-another-bucket/video.mp4
      copy: s3://my-bucket/pre/scheme.svg to s3://my-another-bucket/pre/scheme.svg
      copy: s3://my-bucket/picture.png to s3://my-another-bucket/picture.png
      copy: s3://my-bucket/example.txt to s3://my-another-bucket/example.txt
      ```

   {/cut}

Описание доступных параметров для команды копирования объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Object Storage
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

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `CopyObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty).

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

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
   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `copy` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy).

{/tab}

{/tabs}

## Удаление объектов

В этом разделе описано, как удалить объекты без установленной блокировки от удаления и перезаписи. О снятии и обходе блокировки — в разделе [Блокировка удаления объектов](/ru/storage/s3/instructions/objects/object-lock).

{tabs}

{tab(Личный кабинет)}

Для удаления объектов:

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объекты или директории с помощью флажков и нажмите кнопку **Удалить**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для объекта и выберите пункт **Удалить файл**.
   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для директории и выберите пункт **Удалить папку**.

1. Подтвердите удаление.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

   {include(/ru/_includes/_s3-manage-object.md)[tags=object_rm]}

   {cut(Пример команды удаления одного объекта)}

      Пример команды:

      ```console
      aws s3 rm s3://my-bucket/my-picture.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Пример ответа:

      ```console
      delete: s3://my-bucket/my-picture.png
      ```

   {/cut}

   {cut(Пример команды удаления нескольких объектов)}

   Пример команды:

      ```console
      aws s3 rm --recursive s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   Пример ответа:

      ```console
      delete: s3://my-bucket/video.mp4
      delete: s3://my-bucket/pre/scheme.svg
      delete: s3://my-bucket/picture.png
      delete: s3://my-bucket/example.txt
      ```

   {/cut}

Описание доступных параметров для команды удаления объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, err := session.NewSession()
	   if err != nil {
		   log.Fatalf("Unable to create session, %v", err)
	   }
	   // Подключение к сервису Object Storage
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
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команды [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) и [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) подробно описаны в официальной документации к библиотеке aws-sdk-go.

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   #Удаление одного объекта
   s3_client.delete_object(Bucket='boto3-bucket-name-test', Key='object_name.txt',)

   #Удаление множества объектов
   object_to_delete = [{'Key':'objectkey1.txt'}, {'Key':'objectkey2.txt'}]
   s3_client.delete_objects(Bucket=test_bucket_name, Delete={'Objects': object_to_delete})
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `delete_objects` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects).

{/tab}

{/tabs}

## Удаление частей загруженного объекта

Если [составная загрузка](../../../reference#sostavnaya_zagruzka) не завершена, объект не создается и не может использоваться, но хранение загруженных частей [тарифицируется](../../../tariffication). Чтобы средства не списывались, удаляйте составные загрузки, которые не будут завершены.

Вы можете настроить автоматическое удаление незавершенных загрузок через [жизненный цикл](../../../reference#zhiznennyy_cikl) объектов или удалить загрузку вручную.

{tabs}

{tab(Личный кабинет)}

Чтобы узнать, есть ли у вас незавершенные составные загрузки:

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. В консоли выполните команду:

   ```console
   aws s3api list-multipart-uploads \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно удалить незавершенные загрузки.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды просмотра незавершенных загрузок)}

      Пример команды:

      ```console
      aws s3api list-multipart-uploads \
        --bucket mybucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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

   {/cut}

{/tab}

{/tabs}

Чтобы удалить незавершенные загрузки:

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно удалить сразу несколько частей, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.
1. Выполните одно из действий для нужной части:

   - Выберите часть с помощью флажка, затем нажмите кнопку **Удалить** над таблицей.
   - Выберите часть, которую нужно удалить, и нажмите на значок ![Удалить](assets/delete-icon.svg "inline") справа.
1. Подтвердите удаление.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. В консоли выполните команду:

   ```console
   aws s3api abort-multipart-upload \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --upload-id <ID_ЗАГРУЗКИ> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно удалить незавершенные загрузки.
    - `<КЛЮЧ_ОБЪЕКТА>` — значение в поле **Название** на вкладке **Multipart** в личном кабинете или значение параметра `Key` в ответе AWS CLI.
    - `<ID_ЗАГРУЗКИ>` — значение в поле **ID** на вкладке **Multipart** в личном кабинете или значение параметра `UploadId` в ответе AWS CLI.
    - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Пример выполнения команды:

   ```console
   aws s3api abort-multipart-upload \
     --bucket mybucket \
     --key inupload.avi \
     --upload-id \example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

В результате все незавершенные загрузки будут отменены, а загруженные части — удалены.

{/tab}

{/tabs}
