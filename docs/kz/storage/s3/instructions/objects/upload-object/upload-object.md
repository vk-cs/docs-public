# {heading(Бакетке объектілерді қосу)[id=s3-instructions-upload-object]}

{include(/kz/_includes/_translated_by_ai.md)}

Объект өлшеміне байланысты оны бакетке жүктеудің әртүрлі тәсілдері ұсынылады:

- 1 ГБ-қа дейін — {linkto(#s3-instructions-upload-object-standard)[text=стандартты жүктеу]} кез келген ыңғайлы тәсілмен: жеке кабинет арқылы, файл менеджерлері, CLI, SDK немесе API арқылы.
- 1 ГБ-тан жоғары — CLI, SDK немесе API.
- 32 ГБ-тан жоғары — тек {linkto(#s3-instructions-upload-object-multipart)[text=құрамдас жүктеу]} CLI, SDK немесе API арқылы.

Объект жүктелген кезде оған арнайы идентификатор — {linkto(../../../concepts/about#s3-concepts-about-object-key)[text=объект кілті]} тағайындалады.

{note:err}
Егер жүктелетін файлдың кілті бакеттегі объект кілтімен сәйкес келсе және бұл объект {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=қайта жазудан қорғалмаған]} болса, {var(s3)} бар объектіні жаңасымен алмастырады.
{/note}

## {heading(Стандартты жүктеу)[id=s3-instructions-upload-object-standard]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет атауын басыңыз немесе {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=жаңасын]} жасаңыз.
1. (Қосымша) Объектіні сақтау үшін қалта қосыңыз:

   1. **Жаңа қалта** түймесін басыңыз.
   1. Қалта атауын енгізіңіз. Қалта атауын таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз, өйткені ол объект кілтінің бір бөлігі болады.
   1. **Жасау** түймесін басыңыз.
   1. Жасалған қалтаға өтіңіз.

1. **Файл қосу** түймесін басыңыз.
1. Жүктелетін объектілер үшін қажетті {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=ACL баптауларын]} таңдаңыз.
1. Бір немесе бірнеше файлды жүктеу үшін келесі әрекеттердің бірін орындаңыз:

   - Файлдарды жүктеу терезесіне сүйреп апарыңыз.
   - **Файлдарды таңдау** түймесін басып, файлдарды таңдаңыз.

1. Файлдары бар қалтаны жүктеу үшін қалтаны жүктеу терезесіне сүйреп апарыңыз.

   Файлдарды жүктеу күйі экранның төменгі оң жақ бұрышында көрсетіледі, сол жерде жүктеу барысын қадағалай аласыз немесе оны болдырмай аласыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Файл менеджеріңіздің сол жақ панелінде операциялық жүйеңіздің қалталарын ашыңыз. Файл менеджерінің оң жақ панелінде {var(s3)} ашып, қажетті бакетке өтіңіз.

Файл менеджерінің сол жақ панелінде бакетке жүктеуді жоспарлап отырған файлды тауып, тінтуірмен оны оң жақ панельге сүйреп апарыңыз. Осылайша бакетте ОЖ-ңыздағы файлдың көшірмесі жасалады.

Немесе файл менеджерінің сол жақ панеліндегі **Copy** немесе **Move** түймелерін пайдаланыңыз. Ол үшін қажетті файлды немесе файлдар тобын белгілеп, тиісті түймені басыңыз. «Copy» функциясы бакетте файлдың көшірмесін жасайды, «Move» функциясы файлды бакетке жылжытады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp <ПУТЬ> s3://<ИМЯ_БАКЕТА>/<КЛЮЧ_ОБЪЕКТА>
      --endpoint-url <ENDPOINT_URL>
      --storage-class <КЛАСС_ХРАНЕНИЯ>
      --acl <НАСТРОЙКА_ACL>
   ```

   Мұнда:

   - `<ПУТЬ>` — жергілікті файлға дейінгі жол.
   - `<ИМЯ_БАКЕТА>` — объектіні жүктеу қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}
   - (Қосымша) `<КЛАСС_ХРАНЕНИЯ>` — объектінің {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класын]} орнатады. Егер көрсетілмесе, сақтау класы бакеттен мұраға алынады. Қолжетімді мәндер:

     - `STANDARD` — Hotbox сақтау класына сәйкес келеді;
     - `STANDARD_IA` — Icebox сақтау класына сәйкес келеді.

   - (Қосымша) `<НАСТРОЙКА_ACL>` — {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=ACL баптауларын]} орнатады. Қолжетімді мәндер:

     - `private` — баптау көрсетілмесе, әдепкі мән;
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

Объектілер мен файлдарды көшіру және жылжыту операцияларының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html#synopsis) қолжетімді.

{/tab}

{tab(API)}

1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
1. {var(s3)} сервисі үшін эндпоинтті [біліңіз](https://msk.cloud.vk.com/app/project/endpoints).
   {ifdef(public)}
1. API-де аутентификация үшін сұраудың {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro)[text=қолтаңбасын қалыптастырыңыз]}.
   {/ifdef}
1. Объектіні бакетке жүктеу үшін {linkto(../../../api/object#api-spec-s3-put-object)[text=PutObject]} әдісін пайдаланыңыз.

{/tab}

{tab(Golang SDK)}

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
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
	   vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"
	   defaultRegion         = "kz-ast"
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
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `PutObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.PutObject) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
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
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `put_object` және `upload_file` командалары boto3 кітапханасының ресми құжаттамасында [PUT](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.put_object) және [UPLOAD](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.upload_file) әдістері бойынша егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Құрамдас жүктеу)[id=s3-instructions-upload-object-multipart]}

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз. Шығыс форматын JSON етіп орнатыңыз, өйткені мәтіндік форматтар құрамдас жүктеу командаларын орындау кезінде танылмайды.
1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
1. Бакетке жүктеу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасы арқылы жасауға болады.
1. Құрамдас жүктеуді инициализациялаңыз. Консольде команданы орындаңыз:

   ```console
   aws s3api create-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объектіні жүктеу қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — құрамдас жүктеу инициализацияланатын, жасалатын объектінің толық атауы, оған дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Құрамдас жүктеуді жасау командасының мысалы)}

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

1. Файлдың бірінші бөлігін жүктеңіз. Консольді ашып, жүктеу үшін файл орналасқан директорияға өтіп, команданы орындаңыз:

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

   - `<НОМЕР_ЧАСТИ>` — бөліктің жиналатын реті бойынша нөмірі. Бөлікті жүктеу реті маңызды емес.
   - `<ID_ЗАГРУЗКИ>` — алдыңғы қадамда алынған жүктеу идентификаторы (`UploadId`).

   Сәтті жүктелген жағдайда жауапта жүктелген бөліктің `ETag` мәні қайтарылады. Алынған мәнді сақтаңыз, ол жүктеуді аяқтау үшін қажет болады.

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

1. Файлдың барлық бөліктері жүктелгенін тексеріңіз. Ол үшін команданы орындаңыз:

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

1. Ағымдағы директорияда JSON форматындағы файл жасап, онда файлдың әр бөлігі үшін `ETag` мәнін көрсетіңіз.

   {cut(JSON файлы мазмұнының мысалы)}

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

1. Құрамдас жүктеуді аяқтап, файл бөліктерін объектіге біріктіріңіз. Консольде команданы орындаңыз:

   ```console
   aws s3api complete-multipart-upload \
      --multipart-upload file://<JSON-файл> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Команда сәтті орындалған жағдайда, жеке бөліктерден көрсетілген кілті бар объект жасалады.

   {cut(Құрамдас жүктеуді аяқтау командасының мысалы)}
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

1. Егер қандай да бір себеппен құрамдас жүктеуді болдырмау қажет болса, команданы орындаңыз:

   ```console
   aws s3api abort-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — құрамдас жүктеу орындалған бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — құрамдас жүктеу инициализацияланған, жасалатын объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ID_ЗАГРУЗКИ>` — құрамдас жүктеу жасалған кезде алынған жүктеу идентификаторы (`UploadId`).
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   Сәтті орындалған жағдайда команда жауап шығармайды, ал бұрын жүктелген файл бөліктерінің барлығы жойылады.

{/tab}

{tab(API)}

1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.
1. Бакетке жүктеу қажет файлды бөліктерге бөліңіз. Мысалы, Linux жүйелерінде мұны `split` командасы арқылы жасауға болады.
   {ifdef(public)}
1. API-де аутентификация үшін сұраудың {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro)[text=эндпоинтін біліп, қолтаңбасын қалыптастырыңыз]}.
   {/ifdef}
1. {linkto(../../../api/multipart#api-spec-s3-create-multipart-upload)[text=CreateMultipartUpload]} сұрауы арқылы құрамдас жүктеуді инициализациялаңыз. Бұл кезеңде болашақ объектінің кілті жасалады және оның барлық пайдаланушы метадеректері қосылады. Жауапта келесі кезеңдер үшін қажет болатын `UploadId` жүктеу идентификаторы қайтарылады.
1. Файлдың барлық бөліктерін бакетке жүктеңіз. Әр бөлікті жүктеу үшін {linkto(../../../api/multipart#api-spec-s3-upload-part)[text=UploadPart]} бөлек сұрауын жіберіңіз. Әр бөлік үшін нөмір көрсетіңіз. Нөмірлер қайталанбауы керек, әйтпесе соңғы жүктелген бөлік дәл сондай нөмірі бар алдыңғысын қайта жазады. {var(s3)} объектінің барлық бөліктерін олардың нөмірлері өсу ретімен жинайды.

   Әр сұрауға жауапта жүктелген бөліктің `ETag` мәні қайтарылады. `ETag` мәнін және оған сәйкес бөлік нөмірін сақтаңыз.

1. Файлдың барлық бөліктері бакетке жүктелгенін тексеріңіз. Ол үшін {linkto(../../../api/multipart#api-spec-s3-list-parts)[text=ListParts]} сұрауын пайдаланыңыз.

1. {linkto(../../../api/multipart#api-spec-s3-complete-multipart-upload)[text=CompleteMultipartUpload]} сұрауы арқылы жүктеуді аяқтап, объектіні жинаңыз.

{/tab}

{tab(Go SDK)}

1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.

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

1. Егер бакет әлі жасалмаған болса, {linkto(../../buckets/create-bucket#s3-instructions-create-bucket)[text=бакет жасаңыз]}.

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