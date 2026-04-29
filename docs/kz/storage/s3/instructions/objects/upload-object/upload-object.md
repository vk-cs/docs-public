{include(/kz/_includes/_translated_by_ai.md)}

Объект өлшеміне байланысты оны бакетке жүктеудің әртүрлі тәсілдері ұсынылады:

- 1 ГБ-қа дейін — [стандартты жүктеу](#standard_upload) кез келген ыңғайлы тәсілмен: жеке кабинет, файл менеджерлері, CLI, SDK немесе API арқылы.
- 1 ГБ-тан жоғары — CLI, SDK немесе API арқылы.
- 32 ГБ-тан жоғары — тек [multipart жүктеу](#multipart_upload) CLI, SDK немесе API арқылы.

Объект жүктелген кезде оған арнайы идентификатор — [объект кілті](../../../concepts/about#object_key) беріледі.

{note:err}

Егер жүктелетін файлдың кілті бакеттегі объект кілтімен сәйкес келсе және бұл объект [қайта жазудан қорғалмаған](/kz/storage/s3/concepts/objects-lock) болса, VK Object Storage бар объектіні жаңасымен алмастырады.

{/note}

## {heading(Стандартты жүктеу)[id=standard_upload]}

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. **Объектілік сақтау қоймасы** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакеттің атауын басыңыз немесе [жаңасын жасаңыз](../../buckets/create-bucket).
1. (Опционалды) Объектіні сақтау үшін бума қосыңыз:

   1. **Жаңа бума** батырмасын басыңыз.
   1. Буманың атауын енгізіңіз. Атауды таңдағанда [ұсыныстарды](../../../concepts/about#object_key_rules) ұстаныңыз, өйткені ол объект кілтінің бір бөлігіне айналады.
   1. **Жасау** батырмасын басыңыз.
   1. Жасалған бумаға өтіңіз.
1. **Файл қосу** батырмасын басыңыз.
1. Жүктелетін объектілер үшін қажетті [ACL баптауларын](../../../concepts/access/s3-acl#standard_acl) таңдаңыз.
1. Бір немесе бірнеше файлды жүктеу үшін мына әрекеттердің бірін орындаңыз:

   - Файлдарды жүктеу терезесіне сүйреп апарыңыз.
   - **Файлдарды таңдау** батырмасын басып, файлдарды таңдаңыз.

1. Файлдары бар буманы жүктеу үшін буманы жүктеу терезесіне сүйреп апарыңыз.

   Файлдардың жүктелу күйі экранның төменгі оң жақ бұрышында көрсетіледі, сол жерден жүктеу барысын қадағалауға немесе оны болдырмауға болады.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp <ПУТЬ> s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>
      --endpoint-url <URL_СЕРВИСА>
      --storage-class <КЛАСС_ХРАНЕНИЯ>
      --acl <НАСТРОЙКА_ACL>
   ```

   Мұнда:

      - `<ПУТЬ>` — жергілікті файлға жол.
      - `<ИМЯ_БАКЕТА>`  — объект жүктелетін бакет атауы.
      - `<КЛЮЧ_ОБЪЕКТА>` — объектінің оған дейінгі жолды қоса алғандағы толық атауы. Атауларды таңдағанда [ұсыныстарды](../../../concepts/about#object_key_rules) ұстаныңыз.
      - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

         - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
         - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

      - (Опционалды) `<КЛАСС_ХРАНЕНИЯ>` — объектінің [сақтау класын](../../../concepts/about#storage_class) орнатады. Егер көрсетілмесе, сақтау класы бакеттен мұраланады. Қолжетімді мәндер:

         - `STANDARD` — Hotbox сақтау класына сәйкес келеді;
         - `STANDARD_IA` — Icebox сақтау класына сәйкес келеді.

      - (Опционалды) `<НАСТРОЙКА_ACL>` — [ACL баптауын](../../../concepts/access/s3-acl#standard_acl) орнатады. Қолжетімді мәндер:

         - `private` — егер баптау көрсетілмесе, әдепкі мән;
         - `public-read`;
         - `public-read-write`.

{cut(Объектіні жасау командасының мысалы)}

Команда мысалы:

   ```console
   aws s3 cp ../pictures/picture.png s3://my-bucket/folder/my-picture.png
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      --storage-class STANDARD_IA
      --acl public-read
   ```

Жауап мысалы:

   ```console
   upload: ../pictures/picture.png to s3://my-bucket/folder/my-picture.png
   ```
{/cut}

Объектілер мен файлдарды көшіру және жылжыту операцияларының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis) берілген.

{/tab}

{tab(API)}

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. [Біліңіз](https://kz.cloud.vk.com/app/project/endpoints) VK Object Storage сервисінің эндпоинтін.

1. [Сұрау қолтаңбасын қалыптастырыңыз](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro) API-де аутентификация үшін.

1. Объектіні бакетке жүктеу үшін [PutObject](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/object-api#upload) әдісін пайдаланыңыз.

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

2. Жобаңызға кодты қосыңыз:

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

	   // Подключение к сервису VK Object Storage
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
   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   `PutObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.PutObject) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Жобаңызға кодты қосыңыз:

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

   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

`put_object` және `upload_file` командалары boto3 кітапханасының [PUT](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.put_object) және [UPLOAD](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.upload_file) әдістері жөніндегі ресми құжаттамада толық сипатталған.

{/tab}

{/tabs}

## {heading(Multipart жүктеу)[id=multipart_upload]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз. Шығыс пішімі ретінде JSON немесе YAML орнатыңыз, өйткені мәтіндік пішімдер multipart жүктеу командаларын орындау кезінде танылмайды.

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Бакетке жүктеу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасының көмегімен жасауға болады.

1. Multipart жүктеуді бастаңыз. Консольде команданы орындаңыз:

   ```console
   aws s3api create-multipart-upload
      --bucket <ИМЯ_БАКЕТА>
      --key <КЛЮЧ_ОБЪЕКТА>
      --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект жүктелетін бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — жасау үшін multipart жүктеу басталатын объектінің оған дейінгі жолды қоса алғандағы толық атауы. Атауларды таңдағанда [ұсыныстарды](../../../concepts/about#object_key_rules) ұстаныңыз.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Нәтижесінде жүктеу параметрлері бар жауап қайтарылады, оның ішінде multipart жүктеу идентификаторы — `UploadId` болады. Алынған идентификаторды сақтап қойыңыз, ол кейінгі командаларды орындау үшін қажет.

   {cut(Multipart жүктеуді жасау командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api create-multipart-upload --bucket mybucket --key large.avi --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   {
      "Bucket": "mybucket",
      "Key": "large-file.avi",
      "UploadId": "example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH"
   }
   ```
   {/cut}

1. Файлдың бірінші бөлігін жүктеңіз. Консольді ашып, жүктелетін файл орналасқан директорияға өтіп, команданы орындаңыз:

   ```console
   aws s3api upload-part
      --bucket <ИМЯ_БАКЕТА>
      --key <КЛЮЧ_ОБЪЕКТА>
      --part-number <НОМЕР_ЧАСТИ>
      --body <ИМЯ_ЧАСТИ>
      --upload-id <ID_ЗАГРУЗКИ>
      --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<НОМЕР_ЧАСТИ>` — бөліктер жиналатын реттіліктегі бөлік нөмірі. Бөліктерді жүктеу реті маңызды емес.
   - `<ID_ЗАГРУЗКИ>` — алдыңғы қадамда алынған жүктеу идентификаторы (`UploadId`).

   Жүктеу сәтті аяқталса, жауапта жүктелген бөлікке арналған `ETag` қайтарылады. Алынған мәнді сақтап қойыңыз, ол объект жүктеуін аяқтау үшін қажет болады.

   {cut(Файл бөлігін жүктеу командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api upload-part
      --bucket mybucket
      --key large.avi
      --part-number 1
      --body large.avi.00.part
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   {
    "ETag": "\"example468bd2718bfe43af2bb\""
   }
   ```
   {/cut}

   Команданы файлдың әр бөлігі үшін орындаңыз.

1. Файлдың барлық бөліктері жүктелгенін тексеріңіз. Ол үшін команданы орындаңыз:

   ```console
   aws s3api list-parts
      --bucket <ИМЯ_БАКЕТА>
      --key <КЛЮЧ_ОБЪЕКТА>
      --upload-id <ID_ЗАГРУЗКИ>
      --endpoint-url <URL_СЕРВИСА>
   ```

   {cut(Команданы орындау мысалы)}

   Сұрау мысалы:

   ```console
   aws s3api list-parts
      --bucket mybucket
      --key large.avi
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
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
   {/cut}

1. Ағымдағы директорияда JSON пішіміндегі файл жасап, онда файлдың әр бөлігі үшін `ETag` көрсетіңіз.

   {cut(JSON файл мазмұнының мысалы)}

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
   {/cut}

1. Multipart жүктеуді аяқтап, файл бөліктерін бір объектіге біріктіріңіз. Консольде команданы орындаңыз:

   ```console
   aws s3api complete-multipart-upload
      --multipart-upload file://<JSON-файл>
      --bucket <ИМЯ_БАКЕТА>
      --key <КЛЮЧ_ОБЪЕКТА>
      --upload-id <ID_ЗАГРУЗКИ>
      --endpoint-url <URL_СЕРВИСА>
   ```

   Команда сәтті орындалса, жеке бөліктерден көрсетілген кілті бар объект жасалады.

   {cut(Multipart жүктеуді аяқтау командасының мысалы)}
   Команда мысалы:

   ```console
   aws s3api complete-multipart-upload
      --multipart-upload file://fileparts.json
      --bucket mybucket
      --key large.avi
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   {
    "Location": "http://hb.ru-msk.vkcloud-storage.ru/mybucket/large.avi",
    "Bucket": "mybucket",
    "Key": "large.avi",
    "ETag": "\"example7e0a4a8ce5683bf54ee3dff96-4\""
   }
   ```
   {/cut}

{/tab}

{tab(API)}

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Бакетке жүктеу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасының көмегімен жасауға болады.

1. [Эндпоинтті біліп, сұрау қолтаңбасын қалыптастырыңыз](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro) API-де аутентификация үшін.

1. [CreateMultipartUpload](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#initiate_multipart_upload) сұрауының көмегімен multipart жүктеуді бастаңыз. Бұл кезеңде болашақ объектінің кілті жасалып, оның барлық пайдаланушылық метадеректері қосылады. Жауапта жүктеу идентификаторы `UploadId` қайтарылады, ол multipart жүктеудің келесі кезеңдеріне қажет болады.

1. Файлдың барлық бөліктерін бакетке жүктеңіз. Әр бөлікті жүктеу үшін [UploadPart](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#upload_part) бөлек сұрауын жіберіңіз. Әр бөлік үшін нөмірді көрсетіңіз. Нөмірлер қайталанбауы тиіс, әйтпесе соңғы жүктелген бөлік дәл сол нөмірі бар алдыңғысын қайта жазады. VK Object Storage объектінің барлық бөліктерін олардың нөмірлері өсу ретімен жинайды.

   Әр сұрауға жауапта жүктелген бөліктің `ETag` мәні қайтарылады. `ETag` мәнін және оған сәйкес келетін бөлік нөмірін сақтап қойыңыз.

1. Файлдың барлық бөліктері бакетке жүктелгенін тексеріңіз. Ол үшін [ListParts](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#list_parts) сұрауын пайдаланыңыз.

1. [CompleteMultipartUpload](../../../../../tools-for-using-services/api/api-spec/s3-rest-api/multipart-api#complete_multipart_upload) сұрауының көмегімен жүктеуді аяқтап, объектіні жинаңыз.

{/tab}

{tab(Go SDK)}

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Жобаңызға кодты қосыңыз:

   ```go
   // Подключение S3Client для выполнения операций с бакетами и объектами
   type BucketBasics struct {
	      S3Client *s3.Client
      }

   // UploadLargeObject разделяет большой файл на части и загружает их VK Object Storage одновременно
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

   // DownloadLargeObject разделяет большой объект на части и скачивает их независимо из VK Object Storage
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

{/tab}

{tab(Python SDK)}

1. Егер әлі жасалмаған болса, [бакет жасаңыз](../../buckets/create-bucket).

1. Жобаңызға кодты қосыңыз:

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

{/tab}

{/tabs}
