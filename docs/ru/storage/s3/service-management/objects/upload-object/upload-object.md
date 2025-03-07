В бакет Cloud Storage можно загружать файлы любого типа — изображения, резервные копии, видео и так далее.

Файлы объемом до 1 ГБ можно загружать через личный кабинет, файловые менеджеры, CLI или API. Файлы объемом больше 1 ГБ рекомендуется загружать через CLI или API. Для файлов объемом больше 32 ГБ используйте метод [составной загрузки](../../../reference#sostavnaya_zagruzka) и хранения.

При загрузке объекта ему назначается ключевое имя: комбинация имени объекта и имен директорий, в которых находится объект (при наличии).

<err>

Если ключевое имя загружаемого файла совпадает с ключевым именем объекта в бакете, Cloud Storage заменяет существующий объект на новый.

</err>

## Стандартная загрузка

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
<tab>API</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета или создайте [новый](../../buckets/create-bucket).
1. (Опционально) Добавьте папку для хранения объекта:

   1. Нажмите кнопку **Создать папку**.
   1. Введите имя папки. Для имени нет ограничений, но рекомендуется использовать латинские буквы, цифры и спецсимволы без пробелов, так как имя папки будет преобразовано в юникод и включено в имя объекта.
   1. Нажмите кнопку **Добавить папку**.
1. Нажмите кнопку **Добавить файл**.
1. Выберите необходимые [настройки ACL](../../access-management/s3-acl#fiksirovannyy_acl) для загружаемых объектов.
1. Чтобы загрузить один или несколько файлов, выполните одно из следующих действий:

   - Перетащите файлы в окно загрузки.
   - Нажмите кнопку **Выбрать файлы** и выберите файлы.

1. Чтобы загрузить папку с файлами, перетащите папку в окно загрузки.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Откройте консоль и выполните команду:

   ```bash
   aws s3 cp <путь_к_локальному_файлу> s3://<название_бакета>/<ключ_объекта>
      --endpoint-url <endpoint-url>
      --storage-class <класс-хранения>
      --acl <настройка-ACL>
   ```

   Здесь:

      - `<ключ_объекта>` — имя объекта и имена директорий, в которых он находится.

      - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

         - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
         - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

      - (Опционально) `<класс-хранения>` — задает [класс хранения](../../../reference#klass_hraneniya) объекта. Если не указано, класс хранения наследуется из бакета. Доступные значения:

         - `STANDARD` — соответствует классу хранения Hotbox;
         - `STANDARD_IA` — соответствует классу хранения Icebox.

      - (Опционально) `<настройка-ACL>` — задает [настройки ACL](../../access-management/s3-acl#fiksirovannyy_acl). Доступные значения:

         - `private` — значение по умолчанию, если настройка не указана;
         - `public-read`;
         - `public-read-write`.

<details>
<summary>Пример команды создания объекта</summary>

Пример команды:

   ```bash
   aws s3 cp ../pictures/picture.png s3://my-bucket/folder/my-picture.png
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      --storage-class STANDARD_IA
      --acl public-read
   ```

Пример ответа:

   ```bash
   upload: ../pictures/picture.png to s3://my-bucket/folder/my-picture.png
   ```
</details>

Полное описание операций копирования и перемещения объектов и файлов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis).

</tabpanel>
<tabpanel>

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. [Узнайте](https://msk.cloud.vk.com/app/project/endpoints) эндпоинт для сервиса Cloud Storage.

1. [Сформируйте подпись](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro) запроса для аутентификации в API.

1. Используйте метод [PutObject](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/object-api#upload) для загрузки объекта в бакет.

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

2. Добавьте код в свой проект:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
	   "os"
	   "strings"
   )

   const (
	   vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	   defaultRegion         = "us-east-1"
   )

   func main() {
	   // Создание сессии
	   sess, _ := session.NewSession()

	   // Подключение к сервису Cloud Storage
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   bucket := "gobucket"

	   // Загрузка объекта из строки в бакет
	   key := "test_string.txt"
	   body := "Hello World!"

	   if _, err := svc.PutObject(&s3.PutObjectInput{
		   Bucket: aws.String(bucket),
		   Key:    aws.String(key),
		   Body:   strings.NewReader(body),
	   }); err != nil {
		   log.Fatalf("Unable to upload %q to %q, %v\n", body, bucket, err)
	   } else {
		   log.Printf("File %q uploaded to bucket %q\n", body, bucket)
	   }

	   // Загрузка объекта из файла в бакет
	   fileName := "test.txt"
	   file, err := os.Open(fileName)
	   if err != nil {
		   log.Fatalf("Unable to open file %q, %v\n", fileName, err)
	   }

	   defer file.Close()

	   if _, err := svc.PutObject(&s3.PutObjectInput{
		   Bucket: aws.String(bucket),
		   Key:    aws.String(key),
		   Body:   file,
	   }); err != nil {
		   log.Fatalf("Unable to upload %q to %q, %v\n", fileName, bucket, err)
	   } else {
		   log.Printf("File %q uploaded to bucket %q\n", fileName, bucket)
	   }
   }
   ```
   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   Команда `PutObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.PutObject).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1.  Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Добавьте код в свой проект:

      ```python
      import boto3
      session = boto3.session.Session()
      s3_client = session.client(
         service_name = 's3',
         endpoint_url = 'https://hb.ru-msk.vkcloud-storage.ru'
         )

      test_bucket_name = 'boto3-test-bucket-name'

      #Загрузка данных из строки
      s3_client.put_object(Body='TEST_TEXT_TEST_TEXT', Bucket=test_bucket_name, Key='test_file.txt')

      #Загрузка локального файла
      s3_client.upload_file('some_test_file_from_local.txt', test_bucket_name, 'copy_some_test_file.txt')

      #Загрузка локального файла в директорию внутри бакета
      s3_client.upload_file('some_test_file_from_local.txt', test_bucket_name, 'backup_dir/copy_some_test_file.txt')
      ```

   Значение переменной `endpoint_url` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

Команды `put_object` и `upload_file` подробно описаны в официальной документации к библиотеке boto3 по методам [PUT](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.put_object) и [UPLOAD](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.upload_file).

</tabpanel>
</tabs>

## Составная загрузка

<tabs>
<tablist>
<tab>AWS CLI</tab>
<tab>API</tab>
<tab>Go SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки.

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Разделите на части файл, который нужно загрузить в бакет. Например, в Linux-системах это можно сделать при помощи команды `split`.

1. Инициируйте составную загрузку. Откройте консоль и выполните команду:

   ```bash
   aws s3api create-multipart-upload
      --bucket <название_бакета>
      --key <ключ_объекта>
      --endpoint-url <endpoint-url>
   ```

   Здесь:

   - `<имя_бакета>` — имя бакета, в который нужно загрузить объект.

   - `<ключ_объекта>` — имя объекта, для создания которого инициируется составная загрузка.

   - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   В результате вернется ответ с параметрами загрузки, включая идентификатор составной загрузки — `UploadId`. Сохраните полученный идентификатор, он понадобится для выполнения последующих команд.

   <details>
      <summary>Пример команды создания составной загрузки</summary>

   Пример команды:

   ```bash
   aws s3api create-multipart-upload --bucket mybucket --key large.avi --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```bash
   {
      "Bucket": "mybucket",
      "Key": "large-file.avi",
      "UploadId": "example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH"
   }
   ```
   </details>

1. Выполните загрузку первой части файла. Откройте консоль, перейдите в директорию файла для загрузки и выполните команду:

   ```bash
   aws s3api upload-part
      --bucket <имя_бакета>
      --key <ключ_объекта>
      --part-number <номер_части>
      --body <название_части>
      --upload-id <UploadId>
      --endpoint-url <endpoint-url>
   ```

   Здесь:

   - `<номер_части>` — номер части в том порядке, в котором они будут собраны. Порядок загрузки части не важен.

   - `<UploadId>` — идентификатор загрузки, который был получен на предыдущем шаге.

   В результате успешной загрузки в ответе вернется `ETag` загруженной части. Сохраните полученное значение, оно понадобится для завершения загрузки объекта.

   <details>
      <summary>Пример команды загрузки части файла</summary>

   Пример команды:

   ```bash
   aws s3api upload-part
      --bucket mybucket
      --key large.avi
      --part-number 1
      --body large.avi.00.part
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```bash
   {
    "ETag": "\"example468bd2718bfe43af2bb\""
   }
   ```
   </details>

   Выполните команду для каждой части файла.

1. Проверьте, все ли части файла загружены. Для этого выполните команду:

   ```bash
   aws s3api list-parts
      --bucket <имя_бакета>
      --key <ключ_объекта>
      --upload-id <UploadId>
      --endpoint-url <endpoint-url>
   ```

   <details>
      <summary>Пример выполнения команды</summary>

   Пример запроса:

   ```bash
   aws s3api list-parts
      --bucket mybucket
      --key large.avi
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```bash
   {
    "Parts": [
        {
            "PartNumber": 1,
            "LastModified": "2023-10-27T07:31:05.444000+00:00",
            "ETag": "\"example468bd2718bfe43af2bb\"",
            "Size": 209715200
        },
        {
            "PartNumber": 2,
            "LastModified": "2023-10-27T07:33:50.806000+00:00",
            "ETag": "\"example1aeca61dee379f8ca0be0468\"",
            "Size": 209715200
        },
        {
            "PartNumber": 3,
            "LastModified": "2023-10-27T07:35:21.803000+00:00",
            "ETag": "\"example046628fad3c2d13b21b1270a\"",
            "Size": 209715200
        },
        {
            "PartNumber": 4,
            "LastModified": "2023-10-27T07:37:14.395000+00:00",
            "ETag": "\"examplef91ce7e6ba091581162bcf3d\"",
            "Size": 203821824
        }
    ],
    "ChecksumAlgorithm": null,
    "Initiator": {
        "ID": "XXXXrs3jZaLwhimPAbVEiny",
        "DisplayName": "project"
    },
    "Owner": {
        "DisplayName": "project",
        "ID": "XXXXrs3jZaLwhimPAbVEiny"
    },
    "StorageClass": "STANDARD"
   }
   ```
   </details>

1. Создайте в текущей директории файл в формате JSON и укажите в нем `ETag` для каждой части файла.

   <details>
      <summary>Пример содержания JSON-файла</summary>

   ```json
   {
      "Parts": [{
         "ETag": "example468bd2718bfe43af2bb0a4da",
         "PartNumber":1
      },
      {
         "ETag": "example1aeca61dee379f8ca0be0468",
         "PartNumber":2
      },
      {
         "ETag": "example046628fad3c2d13b21b1270a",
         "PartNumber":3
      },
      {
         "ETag": "examplef91ce7e6ba091581162bcf3d",
         "PartNumber":4
      }]
   }
   ```
   </details>

1. Завершите составную загрузку и объедините части файла в объект. Откройте консоль и выполните команду:

   ```bash
   aws s3api complete-multipart-upload
      --multipart-upload file://<JSON-file>
      --bucket <имя_бакета>
      --key <ключ_объекта>
      --upload-id <UploadId>
      --endpoint-url <endpoint-url>
   ```

   В результате успешного выполнения команды из отдельных частей будет создан объект с указанным ключом.

   <details>
      <summary>Пример команды завершения составной загрузки</summary>
   Пример команды:

   ```bash
   aws s3api complete-multipart-upload
      --multipart-upload file://fileparts.json
      --bucket mybucket --key large.avi
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```bash
   {
    "Location": "http://hb.ru-msk.vkcloud-storage.ru/mybucket/large.avi",
    "Bucket": "mybucket",
    "Key": "large.avi",
    "ETag": "\"example7e0a4a8ce5683bf54ee3dff96-4\""
   }
   ```
   </details>

</tabpanel>
<tabpanel>

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Разделите на части файл, который нужно загрузить в бакет. Например, в Linux-системах это можно сделать при помощи команды `split`.

1. [Узнайте эндпоинт и сформируйте подпись](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro) запроса для аутентификации в API.

1. Инициируйте составную загрузку при помощи запроса [CreateMultipartUpload](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#initiate_multipart_upload). На этом этапе создается ключ будущего объекта и добавляются все его пользовательские метаданные. В ответе вернется идентификатор загрузки `UploadId`, который понадобится для следующих этапов составной загрузки.

1. Загрузите в бакет все части файла. Для загрузки каждой части отправьте отдельный запрос [UploadPart](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#upload_part). Для каждой части укажите номер. Номера не должны повторяться, иначе последняя загруженная часть перезапишет предыдущую с таким же номером. Cloud Storage будет собирать все части объекта в порядке возрастания их номеров.

   В каждом ответе на запрос вернется `ETag` загруженной части. Сохраните значение `ETag` и соответствующий ему номер части.

1. Проверьте, все ли части файла загружены в бакет. Для этого используйте запрос [ListParts](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#list_parts).

1. Завершите загрузку и соберите объект при помощи запроса [CompleteMultipartUpload](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#complete_multipart_upload).

</tabpanel>
<tabpanel>

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Добавьте код в свой проект:

   ```go
   // Подключение S3Client для выполнения операций с бакетами и объектами
   type BucketBasics struct {
	      S3Client *s3.Client
      }

   // UploadLargeObject разделяет большой файл на части и загружает их Cloud Storage одновременно
   func (basics BucketBasics) UploadLargeObject(bucketName string, objectKey string, largeObject []byte) error {
	largeBuffer := bytes.NewReader(largeObject)
	var partMiBs int64 = 10
	uploader := manager.NewUploader(basics.S3Client, func(u *manager.Uploader) {
		u.PartSize = partMiBs * 1024 * 1024
	   })
	   _, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		   Bucket: aws.String(bucketName),
		   Key:    aws.String(objectKey),
		   Body:   largeBuffer,
	   })
	   if err != nil {
		   log.Printf("Couldn't upload large object to %v:%v. Here's why: %v\n",
			   bucketName, objectKey, err)
	   }

	   return err
   }

   // DownloadLargeObject разделяет большой объект на части и скачивает их независимо из Cloud Storage
   func (basics BucketBasics) DownloadLargeObject(bucketName string, objectKey string) ([]byte, error) {
	   var partMiBs int64 = 10
	   downloader := manager.NewDownloader(basics.S3Client, func(d *manager.Downloader) {
		   d.PartSize = partMiBs * 1024 * 1024
	   })
	   buffer := manager.NewWriteAtBuffer([]byte{})
	   _, err := downloader.Download(context.TODO(), buffer, &s3.GetObjectInput{
		   Bucket: aws.String(bucketName),
		   Key:    aws.String(objectKey),
	   })
	   if err != nil {
		   log.Printf("Couldn't download large object from %v:%v. Here's why: %v\n",
			   bucketName, objectKey, err)
	   }
	   return buffer.Bytes(), err
   }
   ```

</tabpanel>
<tabpanel>

1. Создайте [бакет](../../buckets/create-bucket), если он еще не создан.

1. Добавьте код в свой проект:

   ```python
   import sys
   import threading

   import boto3
   from boto3.s3.transfer import TransferConfig

   MB = 1024 * 1024
   s3 = boto3.resource("s3")

   class TransferCallback:

    def __init__(self, target_size):
        self._target_size = target_size
        self._total_transferred = 0
        self._lock = threading.Lock()
        self.thread_info = {}

    # Метод обратного вызова, запускается периодически, чтобы показать прогресс по загрузке
    def __call__(self, bytes_transferred):

        thread = threading.current_thread()
        with self._lock:
            self._total_transferred += bytes_transferred
            if thread.ident not in self.thread_info.keys():
                self.thread_info[thread.ident] = bytes_transferred
            else:
                self.thread_info[thread.ident] += bytes_transferred

            target = self._target_size * MB
            sys.stdout.write(
                f"\r{self._total_transferred} of {target} transferred "
                f"({(self._total_transferred / target) * 100:.2f}%)."
            )
            sys.stdout.flush()

    # Загрузка с настройками по умолчанию
    def upload_with_default_configuration(local_file_path, bucket_name, object_key, file_size_mb):


      transfer_callback = TransferCallback(file_size_mb)
      s3.Bucket(bucket_name).upload_file(
         local_file_path, object_key,  Callback=transfer_callback
      )
      return transfer_callback.thread_info

    # Загрузка с определением размера частей загружаемого объекта и добавлением метаданных объекта
    def upload_with_chunksize_and_meta(local_file_path, bucket_name, object_key, file_size_mb, metadata=None):

      transfer_callback = TransferCallback(file_size_mb)

      config = TransferConfig(multipart_chunksize=1 * MB)
      extra_args = {"Metadata": metadata} if metadata else None
      s3.Bucket(bucket_name).upload_file(
         local_file_path,
         object_key,
         Config=config,
         ExtraArgs=extra_args,
         Callback=transfer_callback,
      )
      return transfer_callback.thread_info

    # Загрузка с установкой порогового значения
    # Если файл меньше или равен установленному порогу, он загружается обычным методом, если больше — через составную
    def upload_with_high_threshold(local_file_path, bucket_name, object_key, file_size_mb):

      transfer_callback = TransferCallback(file_size_mb)
      config = TransferConfig(multipart_threshold=file_size_mb * 2 * MB)
      s3.Bucket(bucket_name).upload_file(
        local_file_path, object_key, Config=config, Callback=transfer_callback
      )
      return transfer_callback.thread_info
   ```

</tabpanel>
</tabs>
