# {heading(Бакеттегі объектілерді басқару)[id=s3-instructions-manage-object]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Объектілер тізімін қарау)[id=s3-instructions-manage-object-list]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз. Бакеттегі объектілер тізімі ашылады.
1. (Қосымша) Тиісті баған тақырыбындағы көрсеткілерді пайдаланып, тізімді объект атауы бойынша сұрыптаңыз.

   - Өсу ретімен сұрыптау кезіндегі тәртіп: `A`–`Z` / `a`–`z` / `A`–`Я` / `а`–`я` / ASCII мәндерінің өсуі бойынша арнайы таңбалар / `0`–`9`.
   - Кему ретімен сұрыптау кезіндегі тәртіп: `9`–`0` / ASCII мәндерінің кемуі бойынша арнайы таңбалар / `я`–`а` / `Я`–`А` / `z`–`a` / `Z`–`A`.

   {note:warn}
   Сұрыптау бүкіл тізімге түгелдей емес, тек экранға шығарылған бөлігіне ғана қолданылады.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА>/<ПУТЬ>/ --recursive --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — мақсатты бакеттің атауы.
   - `<ПУТЬ>` — директорияға дейінгі жол. Белгілі бір директорияда орналасқан объектілер тізімін шығару үшін жолды көрсетіңіз. Мысал: егер сізде тек белгілі бір директорияда орналасқан объектілерге ғана қол жеткізу болса.
   - `--recursive` — осы параметр қолданылғанда команда бакетте немесе көрсетілген директорияда орналасқан барлық объектілер үшін орындалады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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

Объектілер тізімін қарау командасы үшін қолжетімді параметрлердің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Жобаңызға кодты қосыңыз:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"

   const defaultRegion = "kz-ast"

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
   {ifdef(public)}
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `ListObjectsV2` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `list_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Объект қасиеттерін қарау)[id=s3-instructions-manage-object-view]}

{tabs}

{tab(Жеке кабинет)}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Объект атауын басыңыз. Оның қасиеттері беті ашылады:

   - **Атауы** — объект атауы.
   - **Өлшемі** — объект өлшемі.
   - **Объект иесі** — {ifndef(s3,s3-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=жоба идентификаторы]}{/ifndef}{ifdef(s3,s3-pdf)}жоба идентификаторы{/ifdef}, объект соған жатады.
   - **Сақтау класы** — {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=объектінің сақтау класы]}.
   - **Жасалған күні** — объект бакетке қосылған күн мен уақыт.
   - **Өзгертілген күні** — объектінің соңғы өзгертілген күн мен уақыты.
   - **Объектке сілтеме** — объектіні жүктеп алу сілтемесі. Сілтемені оның оң жағындағы ![Копировать](assets/copy-icon.svg "inline") белгішесін басып көшіруге болады.
   - **ETag** — {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=құрамдас жүктеу]} кезінде тұтастығын тексеру үшін қолданылатын объектінің бақылау сомасы. Бақылау сомасын оның оң жағындағы ![Копировать](assets/copy-icon.svg "inline") белгішесін басып көшіруге болады.
   - **Файлға қол жеткізу** — объектіге тағайындалған {linkto(../../../concepts/access/s3-acl#s3-concepts-acl)[text=қол жеткізуді басқару тізімі (ACL)]}.

{/tab}

{/tabs}

## {heading(Объектіні жүктеп алу)[id=s3-instructions-manage-object-download]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Объектіні жалаушамен таңдап, **Жүктеп алу** түймесін басыңыз.
   - Объект үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Файлды жүктеп алу** тармағын таңдаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Файл менеджеріңіздің сол жақ панелінде операциялық жүйеңіздегі файлды жүктеп алуды жоспарлап отырған қалтаны ашыңыз. Файл менеджерінің оң жақ панелінде {var(s3)} ашып, қажетті бакетке өтіңіз.

Файл менеджерінің оң жақ панелінде бакеттен жүктеп алуды жоспарлап отырған файлды тауып, тінтуірмен оны сол жақ панельге сүйреп апарыңыз. Осылайша сіз бакеттен файлдың көшірмесін жүктейсіз.

Немесе файл менеджерінің оң жақ панеліндегі **Copy** немесе **Move** түймелерін пайдаланыңыз. Ол үшін қажетті файлды немесе файлдар тобын белгілеп, тиісті түймені басыңыз. «Copy» функциясы бакеттен файлдың көшірмесін жүктейді, «Move» функциясы файлды бакеттен жылжытады. Бастапқы файл бакеттен жойылады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, объектіні жүктеп алу қажет директорияға өтіңіз.
1. Команданы орындаңыз:

   {include(../../../_includes/_s3-manage-object.md)[tags=get_object]}

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

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
	   vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"
	   defaultRegion         = "kz-ast"
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
   {ifdef(public)}
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}
   
   `GetObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}
   
   `get_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Объектіге қол жеткізу деңгейін өзгерту)[id=s3-instructions-manage-object-access]}

Бакетке жүктелген объектілер әдепкі бойынша `private` қол жеткізу деңгейіне ие, яғни оларды тек мына жерлерден жүктеп алуға болады:

- {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде;
- CLI, API, SDK және файл менеджерлері арқылы, егер {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=бакетке немесе аккаунтқа қол жеткізу кілттері]} бар болса.

Сіз объектінің қол жеткізу деңгейін өзгертіп, оны үшінші тарап пайдаланушыларына қолжетімді ете аласыз. Қол жеткізу деңгейлері {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL]}-ге сәйкес келеді. Әдепкі бойынша мына деңгейлерді орнатуға болады:

- `private` — {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=бакетке немесе аккаунтқа қол жеткізу кілттері]} болған кезде толық құқықтар, қалғандарының барлығына объект қолжетімсіз;
- `public-read` — кілттер болған кезде толық құқықтар, {var(s3)}-тің басқа пайдаланушыларына және үшінші тарап пайдаланушыларына объект тек оқуға қолжетімді;
- `authenticated-read` — кілттер болған кезде толық құқықтар, {var(s3)}-тің басқа пайдаланушыларына объект тек оқуға қолжетімді, үшінші тарап пайдаланушыларына объект қолжетімсіз.

Объектінің қол жеткізу деңгейін өзгерту үшін:

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Объектілерді немесе директорияларды жалаушалармен таңдап, **Қол жеткізу** түймесін басыңыз.
   - Объект үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Файлға қол жеткізу** тармағын таңдаңыз.
   - Директория үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Қалтадағы файлдарға қол жеткізу** тармағын таңдаңыз.

1. **ACL баптауы** өрісінде қол жеткізу баптауын таңдап, **Өзгерістерді сақтау** түймесін басыңыз. `public-read` немесе `authenticated-read` таңдалса, өзгерістер сақталғаннан кейін объектіге қол жеткізу сілтемесі пайда болады.
1. Сілтемені көшіріп, қол жеткізуді баптау терезесін жабыңыз.
1. Сілтемені пайдаланушыларға жіберіңіз немесе объектіге тікелей қол жеткізу үшін оны үшінші тарап ресурсында орналастырыңыз.

{/tab}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде қол жеткізу деңгейін өзгерту үшін команданы орындаңыз:

   {tabs}
   {tab(Бір объектіге)}

   ```console
   aws s3api put-object-acl \
      --acl <НАСТРОЙКА_ACL> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<НАСТРОЙКА_ACL>` — ACL қол жеткізу деңгейі. Егер көрсетілген қол жеткізу деңгейі жобада бапталмаған болса, объектіге `private` қол жеткізу деңгейі тағайындалады.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   {cut(Объектіге қол жеткізуді баптау командасының мысалы)}

   ```console
   aws s3api put-object-acl \
      --acl public-read \
      --bucket my-bucket \
      --key picture.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {/cut}

   Объект ACL-ін өзгерту операциясының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html) қолжетімді.

   {/tab}
   {tab(Бакеттегі немесе оның директориясындағы барлық объектілерге)}

   ```console
   aws s3 cp s3://<ИМЯ_БАКЕТА>/<ПУТЬ>  s3://<ИМЯ_БАКЕТА>/<ПУТЬ> \
      --acl <НАСТРОЙКА_ACL> \
      --recursive \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объектілеріне қол жеткізуді өзгерту қажет бакеттің атауы.
   - `<ПУТЬ>` — объектілеріне қол жеткізуді өзгерту қажет директорияға дейінгі жол.
   - `<НАСТРОЙКА_ACL>` — ACL қол жеткізу деңгейі. Егер көрсетілген қол жеткізу деңгейі жобада бапталмаған болса, объектіге `private` қол жеткізу деңгейі тағайындалады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   Объектілердің модификация уақыты жаңартылады. Мұны объектілердің өмірлік циклін (lifecycle) басқару және шартты сұрауларды (`if-modified-since`) пайдалану кезінде ескеріңіз.

   {cut(Объектіге қол жеткізуді баптау командасының мысалы)}

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

## {heading(Объектілерді көшіру)[id=s3-instructions-manage-object-copy]}

Нұсқаулық бір бакет ішінде немесе бір жобаның бакеттері арасында объектілерді көшіруге жарайды.

Көшіру операциясы тек құрамдас емес объектілер үшін орындалады, сондықтан көшірілетін объектінің ең үлкен өлшемі 32 ГБ-пен шектеледі.

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp --recursive s3://<БАКЕТ_ИСТОЧНИК>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> s3://<БАКЕТ_ПРИЕМНИК>/<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `--recursive` — осы параметр қолданылғанда команда бакетте немесе көрсетілген директорияда орналасқан барлық объектілер үшін орындалады.
   - `<БАКЕТ_ИСТОЧНИК>` — объект көшірілетін бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — көшірілетін объектінің немесе объектілер көшірілетін директорияның толық атауы, оған дейінгі жолды қоса.
   - `<БАКЕТ_ПРИЕМНИК>` — объект көшірілетін бакеттің атауы. Егер атаулар бірдей болса, объект сол бакетке көшіріледі.
   - `<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА>` — объектілер көшірілетін объектінің немесе директорияның толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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

   {cut(Бакеттің барлық объектілерін басқа бакетке көшіру командасының мысалы)}

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

Объектілерді көшіру командасы үшін қолжетімді параметрлердің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
	   vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"
	   defaultRegion         = "kz-ast"
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
   {ifdef(public)}
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `CopyObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `copy` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Объектілерді тегтермен белгілеу)[id=s3-instructions-manage-object-tagging]}

### {heading(Объект тегтерін қарау)[id=s3-instructions-manage-object-tagging-view]}

{tabs}

{tab(AWS CLI)}

Объект тегтерін тексеру үшін `get-object-tagging` командасын орындаңыз.

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-object-tagging \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет жасалған кезде берілген атау.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

   Жауап мысалы:

   ```console
   {
       "TagSet": [
           {
               "Key": "key-object1",
               "Value": "value-object1"
           },
           {
               "Key": "key-object2",
               "Value": "value-object2"
           }
       ]
   }
   ```

{/tab}

{/tabs}

### {heading(Тегтерді сақтай отырып объектіні көшіру)[id=s3-instructions-manage-object-tagging-copy]}

{tabs}

{tab(AWS CLI)}

Объектіні көшіру кезінде тегтерді сақтау үшін `copy-object` командасын `--tagging-directive COPY` опциясымен орындаңыз.

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api copy-object \
      --copy-source <ИМЯ_БАКЕТА_ИСТОЧНИКА>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> \
      --bucket <ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ> \
      --key <КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ> \
      --tagging-directive COPY \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА_ИСТОЧНИКА>` — объектіні көшіру қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — көшірілетін объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ>` — объектіні көшіру қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ>` — объект көшірмесінің толық атауы, оған дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Тегтерді ауыстыра отырып объектіні көшіру)[id=s3-instructions-manage-object-tagging-replace]}

{tabs}

{tab(AWS CLI)}

Объектіні көшіру кезінде тегтерді ауыстыру үшін `copy-object` командасын `--tagging-directive REPLACE` опциясымен орындаңыз.

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api copy-object \
      --copy-source <ИМЯ_БАКЕТА_ИСТОЧНИКА>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> \
      --bucket <ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ> \
      --key <КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ> \
      --tagging-directive REPLACE \
      --tagging "<ТЕГИ>" \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА_ИСТОЧНИКА>` — объектіні көшіру қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — көшірілетін объектінің толық атауы, оған дейінгі жолды қоса.
   - `<ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ>` — объектіні көшіру қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ>` — объект көшірмесінің толық атауы, оған дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз.
   - `<ТЕГИ>` — `<КЛЮЧ_1>=<ЗНАЧЕНИЕ_1>&...<КЛЮЧ_N>=<ЗНАЧЕНИЕ_N>` форматындағы тегтер. Мысалы: `Key1=Value1&Key2=Value2`.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Жүктеу кезінде тег қосу)[id=s3-instructions-manage-object-upload-tagging]}

{tabs}

{tab(AWS CLI)}

Жаңа объектіні жүктеу кезінде оған тег қосу үшін `put-object` командасын `--tagging` опциясымен орындаңыз.

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-object --endpoint-url <ENDPOINT_URL> --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --body <ПУТЬ_К_ФАЙЛУ> --tagging "<ТЕГИ>"
   ```

   Мұнда:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:
    
     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}
   - `<ИМЯ_БАКЕТА>` — бакет жасалған кезде берілген атау.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса. Атауларды таңдағанда {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсынымдарды]} ұстаныңыз.
   - `<ПУТЬ_К_ФАЙЛУ>` — жергілікті файлға дейінгі жол.
   - `<ТЕГИ>` — `<КЛЮЧ_1>=<ЗНАЧЕНИЕ_1>&...<КЛЮЧ_N>=<ЗНАЧЕНИЕ_N>` форматындағы тегтер. Мысалы: `Key1=Value1&Key2=Value2`.

{/tab}

{/tabs}

### {heading(Бар объектіге тег қосу)[id=s3-instructions-manage-object-existing-tagging]}

{tabs}

{tab(AWS CLI)}

Бар объектіге тег қосу үшін `put-object-tagging` командасын `--tagging` опциясымен және JSON форматында кілт/мән жұптарын тізімдеумен орындаңыз.

{note:warn}
`put-object-tagging` операциясы, егер олар бұрын орнатылған болса, объектінің ағымдағы тегтерін қайта жазады. Бар тегтерді сақтау үшін, ағымдағы тегтер конфигурациясын {linkto(#s3-instructions-manage-object-tagging-view)[text=сұратып]} алып, оны `put-object-tagging` командасына қосыңыз.
{/note}

{cut(Тегтер тізімінің құрылымы)}

```txt
{
  "TagSet": [
    {
      "Key": "<КЛЮЧ_ТЕГА_1>",
      "Value": "<ЗНАЧЕНИЕ_ТЕГА_1>"
    },
    ...
    {
      "Key": "<КЛЮЧ_ТЕГА_N>",
      "Value": "<ЗНАЧЕНИЕ_ТЕГА_N>"
    }
  ]
}
```

{/cut}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде, мысалы, екі тегті орнату үшін команданы орындаңыз:

   ```console
   aws s3api put-object-tagging \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --tagging '{
         "TagSet": [
            {
              "Key": "<КЛЮЧ_ТЕГА_1>",
              "Value": "<ЗНАЧЕНИЕ_ТЕГА_1>"
            },
            {
               "Key": "<КЛЮЧ_ТЕГА_2>",
               "Value": "<ЗНАЧЕНИЕ_ТЕГА_2>"
            }
         ]
      }' \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет жасалған кезде берілген атау.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
   - `<КЛЮЧ_ТЕГА_1>`, `<ЗНАЧЕНИЕ_ТЕГА_1>` және `<КЛЮЧ_ТЕГА_2>`, `<ЗНАЧЕНИЕ_ТЕГА_2>` — объект тегтері үшін кілт/мән жұптары.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:
    
     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Объект тегтерін жою)[id=s3-instructions-manage-object-tagging-delete]}

{tabs}

{tab(AWS CLI)}

Объект тегтерін тексеру үшін `get-object-tagging` командасын орындаңыз.

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api delete-object-tagging \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — бакет жасалған кезде берілген атау.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:
    
     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

{/tab}

{/tabs}

## {heading(Объектілерді жою)[id=s3-instructions-manage-object-delete]}

Бұл бөлімде жоюдан және қайта жазудан бұғаттауы орнатылмаған объектілерді қалай жою керектігі сипатталған. Бұғаттауды алып тастау және айналып өту туралы — {linkto(../object-lock#s3-instructions-object-lock)[text=Объектілерді жоюды бұғаттау]} бөлімінде.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Объектілерді жою үшін:

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Объектілерді немесе директорияларды жалаушалармен таңдап, **Жою** түймесін басыңыз.
   - Объект үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Файлды жою** тармағын таңдаңыз.
   - Директория үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Қалтаны жою** тармағын таңдаңыз.

1. Жоюды растаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

1. Файл менеджерінің оң жақ панелінде {var(s3)} ашып, қажетті бакетке өтіңіз. Жоюды жоспарлап отырған файлды тауып, оған тінтуірдің оң жақ батырмасымен контекстік мәзірді ашыңыз.

   Немесе қажетті файлды таңдап, файл менеджерінің құралдар тақтасындағы **Delete** түймесін басыңыз.

1. Ашылған диалог терезесінде файлды жоюды растауға немесе болдырмауға болады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде командаларды орындаңыз:

   {tabs}

   {tab(Бір объектіні жою)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_rm-single]}

   {/tab}

   {tab(Бірнеше объектіні жою)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_rm-multiple]}

   {/tab}

   {/tabs}

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

Объектілерді жою командасы үшін қолжетімді параметрлердің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html) берілген.

{/tab}

{tab(Golang SDK)}

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
	   vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"
	   defaultRegion = "kz-ast"
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
   {ifdef(public)}
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес келуі керек:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) және [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) командалары aws-sdk-go кітапханасының ресми құжаттамасында егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `delete_objects` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Жүктелген объект бөліктерін жою)[id=s3-instructions-manage-object-parts-delete]}

Егер {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=құрамдас жүктеу]} аяқталмаса, объект жасалмайды және пайдаланылмайды{ifdef(public)}, бірақ жүктелген бөліктерді сақтау {linkto(../../../tariffication#iaas-tariffication)[text=тарифтеледі]}. Қаражат есептен шығарылмауы үшін, аяқталмайтын құрамдас жүктеулерді жойыңыз{/ifdef}.

Сіз аяқталмаған жүктеулерді {linkto(../../../concepts/lifecycle#s3-concepts-lifecycle)[text=өмірлік цикл]} арқылы автоматты түрде жоюды баптай аласыз немесе жүктеуді қолмен жоя аласыз.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Сізде аяқталмаған құрамдас жүктеулер бар-жоғын білу үшін:

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет атауын басып, **Multipart** қойындысына өтіңіз.

{/tab}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз. Шығыс форматын JSON немесе YAML етіп орнатыңыз, өйткені мәтіндік форматтар құрамдас жүктеу немесе жою командаларын орындау кезінде танылмайды.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api list-multipart-uploads \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — аяқталмаған жүктеулерді жою қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Бұл топтық операция: қажет болған жағдайда жалаушалар арқылы таңдап, бірден бірнеше бөлікті жоюға болады.

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакет атауын басып, **Multipart** қойындысына өтіңіз.
1. Қажетті бөлік үшін келесі әрекеттердің бірін орындаңыз:

   - Бөлікті жалаушамен таңдап, содан кейін кестенің үстіндегі **Жою** түймесін басыңыз.
   - Жою қажет бөлікті таңдап, оң жақтағы ![Удалить](assets/delete-icon.svg "inline") белгішесін басыңыз.
   
1. Жоюды растаңыз.

{/tab}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз. Шығыс форматын JSON немесе YAML етіп орнатыңыз, өйткені мәтіндік форматтар құрамдас жүктеу немесе жою командаларын орындау кезінде танылмайды.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api abort-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — аяқталмаған жүктеулерді жою қажет бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — жеке кабинеттегі **Multipart** қойындысындағы **Атауы** өрісіндегі мән немесе AWS CLI жауабындағы `Key` параметрінің мәні.
   - `<ID_ЗАГРУЗКИ>` — жеке кабинеттегі **Multipart** қойындысындағы **ID** өрісіндегі мән немесе AWS CLI жауабындағы `UploadId` параметрінің мәні.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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