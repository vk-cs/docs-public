{include(/kz/_includes/_translated_by_ai.md)}

## Объектілер тізімін қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз. Бакеттегі объектілер тізімі ашылады.
1. (Опционалды) Тиісті баған тақырыбындағы көрсеткілерді пайдаланып, тізімді объект атауы бойынша сұрыптаңыз.

   - Өсу ретімен сұрыптау тәртібі:  `A`–`Z` / `a`–`z` / `A`–`Я` / `а`–`я` / ASCII мәндерінің өсу реті бойынша арнайы символдар / `0`–`9`.
   - Кему ретімен сұрыптау тәртібі:  `9`–`0` / ASCII мәндерінің кему реті бойынша арнайы символдар / `я`–`а` / `Я`–`А` / `z`–`a` / `Z`–`A`.

   {note:warn}
   Сұрыптау бүкіл тізімге емес, экранға шығарылған бөлігіне ғана қолданылады.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА>/<ПУТЬ>/ --recursive --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нысаналы бакет атауы.
   - `<ПУТЬ>` — директорияға дейінгі жол. Белгілі бір директорияда орналасқан объектілер тізімін шығару үшін жолды көрсетіңіз. Мысалы, егер сізде тек белгілі бір директорияда орналасқан объектілерге ғана қолжетімділік болса.
   - `--recursive` — команда бакетте немесе көрсетілген директорияда орналасқан барлық объектілер үшін орындалатын параметр.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Объектілер тізімін қарау командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3 ls s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

      ```console
                                    PRE folder/
      2023-09-27 11:45:05     421326 picture-1.jpg
      2023-09-27 11:47:37       2713 picture-2.png
      2023-09-27 11:48:37       2662 picture-3.png
      2023-09-27 10:31:02      48314 picture-4.png
      2023-09-27 11:48:56        361 delete-picture.png
      ```

   {/cut}

Объектілер тізімін қарау командасының қолжетімді параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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

	   // Подключение к сервису VK Object Storage
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

`vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

- `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
- `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

`ListObjectsV2` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```

`endpoint_url` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

- `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
- `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

`list_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects) толық сипатталған.

{/tab}

{/tabs}

## Объектіні жүктеп алу

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Жалауша арқылы объектіні таңдап, **Жүктеп алу** батырмасын басыңыз.
   - Объект үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Файлды жүктеп алу** тармағын таңдаңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольді ашып, объектіні жүктеп алу қажет директорияға өтіңіз.

1. Команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=get_object]}

   {cut(Объектіні жүктеп алу командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3api get-object \
        --bucket my-bucket \
        --key folder/my-object.exe \
        uploaded-file.exe \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

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

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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

	   // Подключение к сервису VK Object Storage
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

   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    `GetObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, [қосылу деректерін](../../../connect/s3-sdk) Object Storage үшін орта айнымалыларына немесе конфигурациялық файлға қосыңыз.

1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```

   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    `get_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects) толық сипатталған.

{/tab}

{/tabs}

## {heading(Объектіге қатынау деңгейін өзгерту)[id=manage_access]}

Бакетке жүктелген объектілер әдепкі бойынша `private` қолжетімділік деңгейіне ие, яғни оларды тек мыналар жүктеп ала алады:

- VK Cloud жеке кабинетінде;
- CLI, API, SDK және файл менеджерлері арқылы, егер [бакетке немесе аккаунтқа қолжетімділік кілттері](../../../concepts/access/account-and-keys) бар болса.

Сіз объектінің қолжетімділік деңгейін өзгертіп, оны сыртқы пайдаланушыларға қолжетімді ете аласыз. Қолжетімділік деңгейлері [стандартты ACL](../../../concepts/access/s3-acl#standard_acl) сәйкес келеді. Әдепкі бойынша келесі деңгейлерді орнатуға болады:

- `private` — [бакетке немесе аккаунтқа қолжетімділік кілттері](../../../concepts/access/account-and-keys) бар болса толық құқықтар, барлық қалғандарға объект қолжетімсіз;
- `public-read` — кілттер болған жағдайда толық құқықтар береді, ал VK Cloud-тың басқа пайдаланушылары мен сыртқы пайдаланушылар үшін объект тек оқуға қолжетімді болады;
- `authenticated-read` — кілттер болған жағдайда толық құқықтар береді, ал VK Cloud-тың басқа пайдаланушылары үшін объект тек оқуға қолжетімді, сыртқы пайдаланушылар үшін объект қолжетімсіз.

Объектіге қолжетімділік деңгейін өзгерту үшін:

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Жалаушалар арқылы объектілерді немесе директорияларды таңдап, **Қолжетімділік** батырмасын басыңыз.
   - Объект үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Файлға қолжетімділік** тармағын таңдаңыз.
   - Директория үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Қалтадағы файлдарға қолжетімділік** тармағын таңдаңыз.

1. **ACL баптауы** өрісінде қолжетімділік баптауын таңдап, **Өзгерістерді сақтау** батырмасын басыңыз. `public-read` немесе `authenticated-read` таңдалған кезде өзгерістер сақталғаннан кейін объектіге қолжетімділік сілтемесі пайда болады.
1. Сілтемені көшіріңіз және қолжетімділік баптаулары терезесін жабыңыз.
1. Сілтемені пайдаланушыларға жіберіңіз немесе объектіге тікелей қолжеткізу үшін оны үшінші тарап ресурсында орналастырыңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Қолжетімділік деңгейін өзгерту үшін консольде команданы орындаңыз:

   {tabs}
   {tab(К одному объекту)}

   ```console
   aws s3api put-object-acl \
     --acl <НАСТРОЙКА_ACL> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<НАСТРОЙКА_ACL>` — ACL қолжетімділік деңгейі. Егер көрсетілген қолжетімділік деңгейі жоба үшін бапталмаған болса, объектіге `private` қолжетімділік деңгейі беріледі.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Объектіге қолжетімділікті баптау командасының мысалы)}

      ```console
      aws s3api put-object-acl \
        --acl public-read \
        --bucket my-bucket \
        --key picture.png \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   {/cut}

    Объектінің ACL параметрлерін өзгерту операциясының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html) берілген.

   {/tab}
    {tab(Бакеттегі немесе оның директориясындағы барлық объектілерге)}

    ```console
   aws s3 cp s3://<ИМЯ_БАКЕТА>/<ПУТЬ>  s3://<ИМЯ_БАКЕТА>/<ПУТЬ> \
     --acl <НАСТРОЙКА_ACL> \
     --recursive \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

    - `<ИМЯ_БАКЕТА>` — объектілерге қолжеткізуді өзгерту қажет бакет атауы.
    - `<ПУТЬ>` — объектілерге қолжеткізуді өзгерту қажет директорияға дейінгі жол.
   - `<НАСТРОЙКА_ACL>` — ACL қолжетімділік деңгейі. Егер көрсетілген қолжетімділік деңгейі жоба үшін бапталмаған болса, объектіге `private` қолжетімділік деңгейі беріледі.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Объектілердің өзгерту уақыты жаңартылады. Мұны объектілердің өмірлік циклін (lifecycle) басқару және шартты сұрауларды (`if-modified-since`) пайдалану кезінде ескеріңіз.

   {cut(Объектіге қолжетімділікті баптау командасының мысалы)}

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

## {heading(Объектілерді жоюды бұғаттау)[id=lock_object]}

Жоюдан немесе қайта жазудан қорғауды тек осындай мүмкіндік [нақты көрсетіліп](../../buckets/create-bucket#ways_to_create_bucket) жасалған бакеттердегі объектілер үшін ғана орнатуға болады.

### Әдепкі уақытша бұғаттау

Әдепкі уақытша бұғаттау (`DefaultRetention`) бакет деңгейінде орнатылады. Ол бакетке жүктелетін барлық жаңа объектілерге қолданылады және бұрын жүктелген объектілерге таралмайды.
Әдепкі бұғаттауды орнату міндетті емес.

{note:warn}

Бакет ішіндегі объекті үшін бұғаттау режимі мен мерзімін нақты көрсету бакет деңгейіндегі әдепкі бұғаттау баптауларына қарағанда басымдыққа ие.

{/note}

Әдепкі уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз:

   {tabs}
   
   {tab(Орнату)}
      
   Әдепкі уақытша бұғаттауды орнату үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=configuration_lock_object]}

    {cut(Команда мысалы)}

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

   Команда жауап шығармайды. `my_bucket` ішіне жүктелетін барлық жаңа объектілер үшін 30 күнге қатаң бұғаттау режимі орнатылады. `my_bucket` ішіне бұрын жүктелген объектілер үшін бұғаттау режимі өзгермейді.

   {/cut}

   {/tab}
   
   {tab(Алып тастау)}
   
   Әдепкі уақытша бұғаттауды алып тастау үшін команданы орындаңыз:

   ```console
   aws s3api put-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --object-lock-configuration '{
         "ObjectLockEnabled": "Enabled"
         }' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттау алынып тасталатын бакет атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {/tab}
   
   {tab(Күйін білу)}
   
   Бакет үшін әдепкі бұғаттаудың ағымдағы конфигурациясын алу үшін команданы орындаңыз:

   ```console
   aws s3api get-object-lock-configuration \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — әдепкі бұғаттау конфигурациясы сұралатын бакет атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api get-object-lock-configuration \
     --bucket my_bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Шығыс мысалы:

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

### {heading(Мерзімсіз бұғаттау)[id=object_legal_hold]}

Мерзімсіз бұғаттау (legal hold) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объект үшін де орнатылуы мүмкін. Мұндай бұғаттауды тек [WRITE жазу құқықтары](../../../concepts/access/s3-acl#permissons) бар пайдаланушы ғана орнатып немесе алып тастай алады.

{note:warn}

Егер объект үшін уақытша және мерзімсіз бұғаттаулар бір мезгілде орнатылса, мерзімсіз бұғаттау уақытшадан басым болады.

{/note}

Мерзімсіз бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз.

   {tabs}
   
    {tab(Жаңа объекті үшін орнату)}
       
    Бакетке жүктелетін жаңа объекті үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object \
     --body <ПУТЬ_К_ФАЙЛУ> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --object-lock-legal-hold-status ON \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға жол.
   - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api put-object \
     --body image.png \
     --bucket my-bucket-with-lock \
     --key images/image.png \
     --object-lock-legal-hold-status ON \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Жауап мысалы:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
    {tab(Бакеттегі объекті үшін орнату)}
   
   Бакетте орналасқан объекті үшін мерзімсіз бұғаттауды орнату үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_legal_hold]}

    {cut(Команда мысалы)}

   ```console
   aws s3api put-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --legal-hold Status=ON \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Алып тастау)}
   
   Бакетте орналасқан объектіден мерзімсіз бұғаттауды алып тастау үшін команданы орындаңыз:

   ```console
   aws s3api put-object-legal-hold \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --legal-hold Status=OFF \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api put-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --legal-hold Status=OFF \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Күйін білу)}
   
    Объектінің мерзімсіз бұғаттау күйін білу үшін команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_state_legal_hold]}

    {cut(Команда мысалы)}

   ```console
   aws s3api get-object-legal-hold \
     --bucket my-bucket-with-lock \
     --key images/image.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```json
   {
      "LegalHold": {
         "Status": "ON"
      }
   }
   ```

   {/cut}

   {note:info}

   Объектінің бұғаттау күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

### Уақытша бұғаттау

Уақытша бұғаттау (retention period) объектіні бакетке жүктеу кезінде де, бакетте бұрыннан бар объекті үшін де орнатылуы мүмкін.

Уақытша бұғаттауды басқару үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, бұғаттауға қатысты қажетті әрекетті орындаңыз.

   {tabs}
   
    {tab(Жаңа объекті үшін орнату)}
       
    Бакетке жүктелетін жаңа объекті үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object \
     --body <ПУТЬ_К_ФАЙЛУ> \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --object-lock-mode <РЕЖИМ_БЛОКИРОВКИ> \
     --object-lock-retain-until-date '<YYYY-MM-DD HH:MM:SS>' \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға жол.
   - `<ИМЯ_БАКЕТА>` — жаңа объект жүктелетін бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:
      - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
      - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api put-object \
     --body image.png \
     --bucket my-bucket-with-lock \ 
     --key images/image2.png \
     --object-lock-mode GOVERNANCE \
     --object-lock-retain-until-date '2025-05-15 12:00:00' \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Жауап мысалы:

   ```json
   {
      "ETag": "\"746066bba59ef00362b139a89a0b0363\""
   }
   ```

   {/cut}

   {/tab}
   
    {tab(Бакеттегі объекті үшін орнату)}
   
   Бакетте орналасқан объекті үшін уақытша бұғаттауды орнату үшін команданы орындаңыз:

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

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

      - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
      - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

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

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
    {tab(Ұзарту)}
    
    Бакетте орналасқан объекті үшін уақытша бұғаттауды ұзарту үшін команданы орындаңыз:

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

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
    - `<РЕЖИМ_БЛОКИРОВКИ>` — бұғаттау режимі:

      - `GOVERNANCE` — [басқарылатын режим](/kz/storage/s3/concepts/objects-lock#governance-lock);
      - `COMPLIANCE` — [қатаң режим](/kz/storage/s3/concepts/objects-lock#compliance-lock).

    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталуының жаңа, кейінгі күні мен уақыты.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

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

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
   {tab(Күйін білу)}

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_state]}

    {cut(Команда мысалы)}

   ```console
   aws s3api get-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image1.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

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

   Объектінің бұғаттау күйін `s3api get-object` және `s3api head-object` командаларының жауаптарынан да көруге болады. Толығырақ — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/index.html).

   {/note}

   {/tab}
   
   {/tabs}

{/tab}

{/tabs}

### Уақытша бұғаттауды айналып өту

{note:warn}

Қатаң режиммен (`COMPLIANCE`) уақытша бұғаттауды айналып өтуге болмайды.

{/note}

[WRITE жазу құқықтары](../../../concepts/access/s3-acl#permissons) бар пайдаланушы командаларда `--bypass-governance-retention` жалаушасын пайдаланып, `GOVERNANCE` режиміндегі уақытша бұғаттауды айналып өте алады. Бұғаттауды айналып өткенде ол мына әрекеттерді орындай алады:

- бұғаттау мерзімі аяқталғанға дейін объектіні жою;
- уақытша бұғаттауды алу;
- бұғаттау мерзімін қысқарту;
- режимді `COMPLIANCE` мәніне өзгерту.

Бұғаттауды айналып өтіп әрекеттерді орындау үшін:

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.
1. Консольді ашып, қажетті әрекетті орындаңыз.

   {tabs}
   
   {tab(Объектіні жою)}
      
   Басқарылатын уақытша бұғаттау орнатылған объектіні жою үшін команданы орындаңыз:

   ```console
   aws s3api delete-object \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api delete-object \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
    {tab(Бұғаттауды алу)}
    
    Объектіден басқарылатын уақытша бұғаттауды алу үшін команданы орындаңыз:

   ```console
   aws s3api put-object-retention \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --retention '{}' \
     --bypass-governance-retention \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

   ```console
   aws s3api put-object-retention \
     --bucket my-bucket-with-lock \
     --key images/image2.png \
     --retention '{}' \
     --bypass-governance-retention \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru 
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
    {tab(Мерзімін қысқарту)}
    
    Объектінің басқарылатын уақытша бұғаттау мерзімін қысқарту үшін команданы орындаңыз:

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

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталуының жаңа, ертерек күні мен уақыты.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

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

   Команда жауап шығармайды.

   {/cut}

   {/tab}
   
    {tab(Режимді өзгерту)}
   
   Объекті үшін уақытша бұғаттау режимін `COMPLIANCE` мәніне өзгерту үшін команданы орындаңыз:

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

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакет атауы.
    - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса алғанда.
    - `<YYYY-MM-DD HH:MM:SS>` — бұғаттаудың аяқталу күні мен уақыты.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    {cut(Команда мысалы)}

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

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Объектілерді көшіру)[id=copy_object]}

Нұсқаулық объектілерді бір бакет шегінде немесе бір жоба аясындағы әртүрлі бакеттер арасында көшіруге жарайды.

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp --recursive s3://<БАКЕТ_ИСТОЧНИК>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> s3://<БАКЕТ_ПРИЕМНИК>/<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

   - `--recursive` — команда бакетте немесе көрсетілген директорияда орналасқан барлық объектілер үшін орындалатын параметр.
    - `<БАКЕТ_ИСТОЧНИК>` — объект көшірілетін бакет атауы.
    - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — көшірілетін объектінің немесе объектілер көшірілетін директорияның оған дейінгі жолды қоса алғандағы толық атауы.
   - `<БАКЕТ_ПРИЕМНИК>` — объект көшірілетін бакет атауы. Егер атаулар сәйкес келсе, объект сол бакетке көшіріледі.
    - `<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА>` — объектілер көшірілетін объектінің немесе директорияның оған дейінгі жолды қоса алғандағы толық атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Бір объектіні басқа бакетке көшіру командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 cp s3://my-bucket/my-picture.png s3://my-another-bucket/my-picture.png \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   copy: s3://my-bucket/my-picture.png to s3://my-another-bucket/my-picture.png
   ```

   {/cut}

   {cut(Бакеттегі барлық объектілерді басқа бакетке көшіру командасының мысалы)}

   Команда мысалы:

      ```console
      aws s3 cp --recursive s3://my-bucket s3://my-another-bucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   Жауап мысалы:

      ```console
      copy: s3://my-bucket/video.mp4 to s3://my-another-bucket/video.mp4
      copy: s3://my-bucket/pre/scheme.svg to s3://my-another-bucket/pre/scheme.svg
      copy: s3://my-bucket/picture.png to s3://my-another-bucket/picture.png
      copy: s3://my-bucket/example.txt to s3://my-another-bucket/example.txt
      ```

   {/cut}

Объектілерді көшіру командасының қолжетімді параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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

	   // Подключение к сервису VK Object Storage
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

   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    `CopyObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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
   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    `copy` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy) толық сипатталған.

{/tab}

{/tabs}

## Жою объектілердің

Бұл бөлімде жоюдан және қайта жазудан бұғаттауы орнатылмаған объектілерді қалай жою керектігі сипатталған. Бұғаттауды алып тастау және айналып өту туралы [Объектілерді жоюды бұғаттау](/kz/storage/s3/instructions/objects/object-lock) бөлімінен қараңыз.

{tabs}

{tab(Жеке кабинет)}

Объектілерді жою үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Жалаушалар арқылы объектілерді немесе директорияларды таңдап, **Жою** батырмасын басыңыз.
   - Объект үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Файлды жою** тармағын таңдаңыз.
   - Директория үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Қалтаны жою** тармағын таңдаңыз.

1. Жоюды растаңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   {include(/kz/_includes/_s3-manage-object.md)[tags=object_rm]}

   {cut(Бір объектіні жою командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3 rm s3://my-bucket/my-picture.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

      ```console
      delete: s3://my-bucket/my-picture.png
      ```

   {/cut}

   {cut(Бірнеше объектіні жою командасының мысалы)}

   Команда мысалы:

      ```console
      aws s3 rm --recursive s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

   Жауап мысалы:

      ```console
      delete: s3://my-bucket/video.mp4
      delete: s3://my-bucket/pre/scheme.svg
      delete: s3://my-bucket/picture.png
      delete: s3://my-bucket/example.txt
      ```

   {/cut}

Объектілерді жою командасының қолжетімді параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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
	   // Подключение к сервису VK Object Storage
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
   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) және [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) командалары aws-sdk-go кітапханасының ресми құжаттамасында толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

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

   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

    `delete_objects` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects) толық сипатталған.

{/tab}

{/tabs}

## Жүктелмей қалған объект бөліктерін жою

Егер [multipart жүктеу](../../../concepts/features#object_uploading) аяқталмаса, объект жасалмайды және пайдалануға болмайды, бірақ жүктелген бөліктерді сақтау [тарифтеледі](../../../tariffication). Қаражат есептен шығарылмауы үшін аяқталмайтын multipart жүктеулерді жойыңыз.

Аяқталмаған жүктеулерді [объектілердің өмірлік циклі](../../../concepts/lifecycle) арқылы автоматты түрде жоюды баптауға немесе жүктеуді қолмен жоюға болады.

{tabs}

{tab(Жеке кабинет)}

Аяқталмаған multipart жүктеулер бар-жоғын білу үшін:

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. **Объектілік сақтау қоймасы** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет атауын басып, **Multipart** қойындысына өтіңіз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз. Шығыс пішімі ретінде JSON немесе YAML орнатыңыз, себебі мәтіндік пішімдер multipart жүктеу немесе жою командаларын орындау кезінде танылмайды.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api list-multipart-uploads \
     --bucket <ИМЯ_БАКЕТА> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

     - `<ИМЯ_БАКЕТА>` — аяқталмаған жүктеулерді жою қажет бакет атауы.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Аяқталмаған жүктеулерді қарау командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3api list-multipart-uploads \
        --bucket mybucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

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

Аяқталмаған жүктеулерді жою үшін:

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше бөлікті жоюға болады.

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. **Объектілік сақтау қоймасы** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет атауын басып, **Multipart** қойындысына өтіңіз.
1. Қажетті бөлік үшін мына әрекеттердің бірін орындаңыз:

   - Жалауша арқылы бөлікті таңдап, содан кейін кестенің үстіндегі **Жою** батырмасын басыңыз.
    - Жойылуы тиіс бөлікті таңдап, оң жақтағы ![Жою](assets/delete-icon.svg "inline") белгішесін басыңыз.
1. Жоюды растаңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз. Шығыс пішімі ретінде JSON немесе YAML орнатыңыз, себебі мәтіндік пішімдер multipart жүктеу немесе жою командаларын орындау кезінде танылмайды.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api abort-multipart-upload \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --upload-id <ID_ЗАГРУЗКИ> \
     --endpoint-url <URL_СЕРВИСА>
   ```

   Мұнда:

     - `<ИМЯ_БАКЕТА>` — аяқталмаған жүктеулерді жою қажет бакет атауы.
     - `<КЛЮЧ_ОБЪЕКТА>` — жеке кабинеттегі **Multipart** қойындысындағы **Атауы** өрісінің мәні немесе AWS CLI жауабындағы `Key` параметрінің мәні.
     - `<ID_ЗАГРУЗКИ>` — жеке кабинеттегі **Multipart** қойындысындағы **ID** өрісінің мәні немесе AWS CLI жауабындағы `UploadId` параметрінің мәні.
    - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   Команданы орындау мысалы:

   ```console
   aws s3api abort-multipart-upload \
     --bucket mybucket \
     --key inupload.avi \
     --upload-id \example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

Нәтижесінде барлық аяқталмаған жүктеулер тоқтатылады, ал жүктелген бөліктер жойылады.

{/tab}

{/tabs}
