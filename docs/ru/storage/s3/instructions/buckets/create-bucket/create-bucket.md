Чтобы загружать объекты в хранилище, предварительно нужно создать [бакет](../../../reference#baket) для их размещения.

{note:warn}

Создание бакета не [тарифицируется](../../../tariffication). Средства списываются за хранение и скачивание объектов.

{/note}

## {heading(Способы создания бакетов)[id=ways_to_create_bucket]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите кнопку **Добавить**.
1. Введите имя бакета, соответствующее [рекомендуемым правилам](../../../concepts/about#bucket_naming).

   После создания бакета изменить его имя будет невозможно.

1. Выберите [класс хранения](../../../concepts/about#storage_class). Вы сможете [изменить его](../../change-storage-class) позже.
1. Нажмите кнопку **Создать бакет**.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.
1. Откройте консоль и выполните одну из команд в зависимости от того, нужно ли включить для бакета возможность устанавливать [блокировку объектов](/ru/storage/s3/concepts/objects-lock):

   {tabs}
   
   {tab(Бакет без блокировки объектов)}
      
   ```console
   aws s3 mb s3://<ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее [рекомендуемым правилам](../../../concepts/about#bucket_naming).

      После создания бакета изменить его имя будет невозможно.

   - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Пример команды создания бакета без возможности установить блокировку объектов от удаления и перезаписи:

   ```console
   aws s3 mb s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   make_bucket: example-bucket
   ```

   {/tab}
   
   {tab(Бакет с возможностью блокировки)}

   {include(/ru/_includes/_s3-manage-bucket.md)[tags=create_bucket_block]}

   Пример команды создания бакета с возможностью установить блокировку объектов от удаления и перезаписи:

   ```console
   aws s3api create-bucket --bucket my-bucket-with-lock --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --region ru-msk --object-lock-enabled-for-bucket
   ```

   Пример ответа:

   ```json
   {
     "Location": "/my-bucket-with-lock"
   }  
   ```

   {/tab}
   
   {/tabs}

Будет создан бакет с [классом хранения](../../../concepts/about#storage_class) `Hotbox`.

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте код в свой проект:

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
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису S3
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Создание бакета
	   bucket := "gobucket"

	   if _, err := svc.CreateBucket(&s3.CreateBucketInput{
		   Bucket: aws.String(bucket),
	   }); err != nil {
		   log.Fatalf("Unable to create bucket %q, %v", bucket, err)
	   } else {
		   log.Printf("Bucket with name %q created", bucket)
	   }
   }
   ```

   В этом примере кода создается бакет с [классом хранения](../../../concepts/about#storage_class) `Hotbox`.

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Имя бакета должно соответствовать [рекомендуемым правилам](../../../concepts/about#bucket_naming). После создания бакета изменить его имя будет невозможно.

   Команда `CreateBucket` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CreateBucket).

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(
       service_name='s3',
       endpoint_url='https://hb.ru-msk.vkcloud-storage.ru'
   )

   test_bucket_name = 'boto3-test-bucket-name'
   # Создание бакета
   s3_client.create_bucket(Bucket=test_bucket_name)
   ```

   В этом примере кода создается бакет с [классом хранения](../../../concepts/about#storage_class) `Hotbox`.

   Значение переменной `endpoint_url` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Имя бакета должно соответствовать [рекомендуемым правилам](../../../concepts/about#bucket_naming). После создания бакета изменить его имя будет невозможно.

   Команда `create_bucket` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket).

{/tab}

{/tabs}
