# {heading(Бакетке объекттер қосу)[id=s3-instructions-upload-object]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Объекттің өлшеміне байланысты оны бакетке жүктеудің әртүрлі тәсілдері ұсынылады:

- 1 ГБ-ға дейін — {linkto(#s3-instructions-upload-object-standard)[text=стандартты жүктеу]} кез келген ыңғайлы тәсілмен: жеке кабинет, файлдық менеджерлер, CLI, SDK немесе API арқылы.
- 1 ГБ-дан астам — CLI, SDK немесе API.
- 32 ГБ-дан астам — тек {linkto(#s3-instructions-upload-object-multipart)[text=құрамдас жүктеу]} CLI, SDK немесе API арқылы.

Объект жүктелген кезде оған арнайы идентификатор — {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=объект кілті]} тағайындалады.

{note:err}
Егер жүктелетін файлдың кілті бакеттегі объект кілтімен сәйкес келсе және бұл объект {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=қайта жазудан қорғалмаған]} болса, {var(s3)} бар объектті жаңасына ауыстырады.
{/note}

## {heading(Стандартты жүктеу)[id=s3-instructions-upload-object-standard]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакеттің атын басыңыз немесе {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=жаңа бакет]} жасаңыз.
1. (Қалауыңыз бойынша) Объектті сақтау үшін қалта қосыңыз:

   1. **Жаңа қалта** түймесін басыңыз.
   1. Қалта атауын енгізіңіз. Қалта атауын таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз, өйткені ол объект кілтінің бөлігі болады.
   1. **Жасау** түймесін басыңыз.
   1. Жасалған қалтаға өтіңіз.

1. **Файл қосу** түймесін басыңыз.
1. Жүктелетін объекттер үшін қажетті {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=ACL баптауларын]} таңдаңыз.
1. Бір немесе бірнеше файлды жүктеу үшін келесі әрекеттердің бірін орындаңыз:

   - Файлдарды жүктеу терезесіне үсіріп әкеліңіз.
   - **Файлдарды таңдау** түймесін басып, файлдарды таңдаңыз.

1. Файлдары бар қалтаны жүктеу үшін қалтаны жүктеу терезесіне үсіріп әкеліңіз.

   Файлдарды жүктеу күйі экранның оң жақ төменгі бұрышында көрсетіледі, онда жүктеу барысын бақылауға немесе оны тоқтатуға болады.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файлдық менеджер)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файлдық менеджерін қолданамыз. Егер сіз басқа файлдық менеджерді қолдансаңыз, оның интерфейсі және элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Файлдық менеджеріңіздің сол жақ панелінде операциялық жүйеңіздің қалталарын ашыңыз. Файлдық менеджердің оң жақ панелінде {var(s3)} ашып, қажетті бакетке өтіңіз.

Файлдық менеджердің сол жақ панелінде бакетке жүктемекші файлды тауып, тышқанмен оны оң жақ панельге үсіріп әкеліңіз. Осылайша бакетте сіздің ОС-дегі файлдың көшірмесі жасалады.

Немесе файлдық менеджердің сол жақ панеліндегі **Copy** немесе **Move** түймелерін қолданыңыз. Ол үшін қажетті файлды немесе файлдар тобын белгілеп, сәйкес түймені басыңыз. «Copy» функциясы файлдың бакетте көшірмесін жасайды, «Move» функциясы файлды бакетке жылжытады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатылмаған болса, орнатып, баптаңыз.
1. Бакет жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp <ЖОЛ> s3://<БАКЕТ_АТАУЫ>/<ОБЪЕКТ_КІЛТІ>
      --endpoint-url <ENDPOINT_URL>
      --storage-class <САҚТАУ_КЛАССЫ>
      --acl <ACL_BАПТАУЫ>
   ```

   Мұнда:

   - `<ЖОЛ>` — жергілікті файлға жол.
   - `<БАКЕТ_АТАУЫ>` — объект жүктелетін бакеттің атауы.
   - `<ОБЪЕКТ_КІЛТІ>` — объекттің толық атауы, оға дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз.

      Бакетте {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=версиялау]} қосылған болса, бар объект кілтімен толық сәйкес келетін объект кілтін көрсеткенде, жүктелетін мазмұны бар объекттің жаңа версиясы жасалады.

      {note:warn}
      Егер объект кілті бакетте бар, бірақ версиялауы тоқтатылған немесе ешқашан қосылмаған объект кілтімен толық сәйкес келсе, объект қайта жазылады.
      {/note}

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің дәл форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}
   - (Қалауыңыз бойынша) `<САҚТАУ_КЛАССЫ>` — объекттің {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класын]} анықтайды. Көрсетілмеген жағдайда сақтау класы бакеттен мұраланады. Қолжетімді мәндер:

     - `STANDARD` — Hotbox сақтау класына сәйкес;
     - `STANDARD_IA` — Icebox сақтау класына сәйкес.

   - (Қалауыңыз бойынша) `<ACL_BАПТАУЫ>` — {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=ACL баптауларын]} анықтайды. Қолжетімді мәндер:

     - `private` — баптау көрсетілмеген жағдайдағы әдепкі мән;
     - `public-read`;
     - `public-read-write`.

{cut(Объект жасау командасының мысалы)}

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

Объекттер мен файлдарды көшіру және жылжыту операцияларының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis) қолжетімді.

{/tab}

{tab(API)}

1. Бакет жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз.
1. {var(s3)} сервисі үшін [эндпоинтті біліңіз](https://msk.cloud.vk.ru/app/project/endpoints).
   {ifdef(public)}
1. API-де аутентификация үшін сұраныстың {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro)[text=қолтаңбасын құрыңыз]}.
   {/ifdef}
1. Объектті бакетке жүктеу үшін {linkto(../../../api/object#api-spec-s3-put-object)[text=PutObject]} әдісін қолданыңыз.

{/tab}

{tab(Golang SDK)}

1. Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатылмаған болса, орнатып, баптаңыз.
1. Бакет жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз.
1. Жобаңызға кодты қосыңыз:

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
	   defaultRegion         = "ru-msk"
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
   {ifdef(public)}  
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `PutObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.PutObject) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатылмаған болса, орнатып, баптаңыз.
1. Бакет жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет]} жасаңыз.
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
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `put_object` және `upload_file` командалары boto3 кітапханасының ресми құжаттамасында [PUT](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.put_object) және [UPLOAD](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.upload_file) әдістері бойынша толық сипатталған.

{/tab}

{/tabs}

## {heading(Құрама жүктеу)[id=s3-instructions-upload-object-multipart]}

{tabs}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса. JSON шығу форматын орнатыңыз, себебі мәтіндік форматтар құрама жүктеу командаларын орындау кезінде танылмайды.
1. {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=Бакет]} жасаңыз, егер ол әлі жасалмаған болса.
1. Бакетке жүктеп салу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасы арқылы жасауға болады.
1. Құрама жүктеуді бастаңыз. Консольде команданы орындаңыз:

   ```console
   aws s3api create-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объект жүктеп салынатын бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — құрама жүктеу басталатын объектінің толық атауы, соның ішінде оған дейінгі жолмен бірге. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізғе хабарласыңыз.
     {/ifdef}

   {cut(Құрама жүктеу жасау командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api create-multipart-upload \
      --bucket mybucket \
      --key large.avi \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
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

1. Файлдың бірінші бөлігін жүктеп салыңыз. Консольді ашыңыз, жүктеп салу үшін файл орналасқан каталогке өтіп, команданы орындаңыз:

   ```console
   aws s3api upload-part \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --part-number <НОМЕР_ЧАСТИ> \
      --body <ИМЯ_ЧАСТИ> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<НОМЕР_ЧАСТИ>` — бөліктердің жиналу ретіндегі бөлік нөмірі. Бөлікті жүктеп салу реті маңызды емес.
   - `<ID_ЗАГРУЗКИ>` — алдыңғы қадамда алынған жүктеу идентификаторы (`UploadId`).

   Сәтті жүктеу нәтижесінде жауапта жүктелген бөліктің `ETag` мәні қайтарады. Алынған мәнді сақтаңыз, ол объектіні жүктеуді аяқтау үшін қажет болады.

   {cut(Файл бөлігін жүктеу командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api upload-part \
      --bucket mybucket \
      --key large.avi \
      --part-number 1 \
      --body large.avi.00.part \
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   {
    "ETag": "\"example468bd2718bfe43af2bb\""
   }
   ```
   {/cut}

   Файлдың әр бөлігі үшін команданы орындаңыз.

1. Файлдың барлық бөлігі жүктелгенін тексеріңіз. Ол үшін команданы орындаңыз:

   ```console
   aws s3api list-parts \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   {cut(Команданы орындау мысалы)}

   Сұрау мысалы:

   ```console
   aws s3api list-parts \
      --bucket mybucket \
      --key large.avi \
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
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

1. Ағымдағы каталогте JSON форматындағы файл жасап, оның ішінде файлдың әр бөлігі үшін `ETag` мәнін көрсетіңіз.

   {cut(JSON-файл мазмұнының мысалы)}

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

1. Құрама жүктеуді аяқтап, файлдың бөліктерін объектіге біріктіріңіз. Консольде команданы орындаңыз:

   ```console
   aws s3api complete-multipart-upload \
      --multipart-upload file://<JSON-файл> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Команда сәтті орындалған нәтижесінде жекелеген бөліктерден көрсетілген кілтпен объект жасалады.

   {cut(Құрама жүктеуді аяқтау командасының мысалы)}
   Команда мысалы:

   ```console
   aws s3api complete-multipart-upload \
      --multipart-upload file://fileparts.json \
      --bucket mybucket \
      --key large.avi \
      --upload-id example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
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

1. Егер қандай да бір себеппен құрама жүктеуді болдырмау қажет болса, команданы орындаңыз:

   ```console
   aws s3api abort-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — құрама жүктеу орындалған бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — құрама жүктеу басталған объектінің толық атауы, соның ішінде оған дейінгі жолмен бірге.
   - `<ID_ЗАГРУЗКИ>` — құрама жүктеу жасау кезінде алынған жүктеу идентификаторы (`UploadId`).
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляциясыңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізғе хабарласыңыз.
     {/ifdef}

   Команда сәтті орындалғанда жауап шығармайды, ал бұрын жүктелген файл бөліктерінің барлығы жойылады.

{/tab}

{tab(API)}

1. {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=Бакет]} жасаңыз, егер ол әлі жасалмаған болса.
1. Бакетке жүктеп салу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасы арқылы жасауға болады.
   {ifdef(public)}
1. API-де аутентификация үшін сұраудың {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro)[text=эндпоинтін біліп, қолтаңбасын құрастырыңыз]}.
   {/ifdef}
1. {linkto(../../../api/multipart#api-spec-s3-create-multipart-upload)[text=CreateMultipartUpload]} сұрауы арқылы құрама жүктеуді бастаңыз. Бұл кезеңде болашақ объектінің кілті жасалады және оның барлық пайдаланушы метадеректері қосылады. Жауапта құрама жүктеудің келесі кезеңдері үшін қажет болатын `UploadId` жүктеу идентификаторы қайтарады.
1. Файлдың барлық бөлігін бакетке жүктеп салыңыз. Әр бөлікті жүктеу үшін жеке {linkto(../../../api/multipart#api-spec-s3-upload-part)[text=UploadPart]} сұрауын жіберіңіз. Әр бөлік үшін нөмірді көрсетіңіз. Нөмірлер қайталанмауы тиіс, әйтпесе соңғы жүктелген бөлік алдыңғысын сол нөмірмен үстеп жазады. {var(s3)} объектінің барлық бөлігін нөмірлерінің өсу ретімен жинайды.

   Әр жауапта жүктелген бөліктің `ETag` мәні қайтарады. `ETag` мәнін және оған сәйкес бөлік нөмірін сақтаңыз.

1. Файлдың барлық бөлігі бакетке жүктелгенін тексеріңіз. Ол үшін {linkto(../../../api/multipart#api-spec-s3-list-parts)[text=ListParts]} сұрауын пайдаланыңыз.

1. Жүктеуді аяқтап, {linkto(../../../api/multipart#api-spec-s3-complete-multipart-upload)[text=CompleteMultipartUpload]} сұрауы арқылы объектіні жинаңыз.

{/tab}

{tab(Go SDK)}

1. {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=Бакет]} жасаңыз, егер ол әлі жасалмаған болса.

1. Өз жобаңызға кодты қосыңыз:

   ```go
   // Бакеттермен және объектілермен операциялар орындау үшін S3Client қосу
   type BucketBasics struct {
	      S3Client *s3.Client
      }

   // UploadLargeObject үлкен файлды бөліктерге бөліп, оларды VK Object Storage-қа бір мезгілде жүктейді
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

   // DownloadLargeObject үлкен объектіні бөліктерге бөліп, оларды VK Object Storage-тан тәуелсіз жүктеп алады
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

1. {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=Бакет]} жасаңыз, егер ол әлі жасалмаған болса.

1. Өз жобаңызға кодты қосыңыз:

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
    # Жүктеу барысын көрсету үшін мерзімді түрде іске қосылатын кері қоңырау әдісі
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

    # Әдепкі баптаулармен жүктеу
    def upload_with_default_configuration(local_file_path, bucket_name, object_key, file_size_mb):

      transfer_callback = TransferCallback(file_size_mb)
      s3.Bucket(bucket_name).upload_file(
         local_file_path, object_key,  Callback=transfer_callback
      )
      return transfer_callback.thread_info

    # Жүктелетін объектінің бөліктерінің өлшемін анықтау және объектінің метадеректерін қосу арқылы жүктеу
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

    # Шекті мәнді орнату арқылы жүктеу
    # Егер файл орнатылған шектен кіші немесе тең болса, ол қарапайым әдіспен, ал одан үлкен болса — құрама әдіспен жүктеледі
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