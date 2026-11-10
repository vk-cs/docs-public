# {heading(Бакеттегі нысандарды басқару)[id=s3-instructions-manage-object]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Нысандар тізімін қарау)[id=s3-instructions-manage-object-list]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз. Бакеттегі нысандар тізімі ашылады.
1. (Қалауыңыз бойынша) Тізімді нысан атауы бойынша сұрыптаңыз, ол үшін тиісті баған тақырыбындағы көрсеткілерді пайдаланыңыз.

   - Өсу ретімен сұрыптау тәртібі: `A`–`Z` / `a`–`z` / `A`–`Я` / `а`–`я` / ASCII мәндерінің өсу реті бойынша арнайы таңбалар / `0`–`9`.
   - Кему ретімен сұрыптау тәртібі: `9`–`0` / ASCII мәндерінің кему реті бойынша арнайы таңбалар / `я`–`а` / `Я`–`А` / `z`–`a` / `Z`–`A`.

   {note:warn}
   Сұрыптау тізімнің бүкілін емес, тек экранға шығарылған бөлігін ғана қамтиды.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА>/<ПУТЬ>/ --recursive --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — мақсатты бакеттің атауы.
   - `<ПУТЬ>` — каталогқа дейінгі жол. Белгілі бір каталогта орналасқан нысандар тізімін шығару үшін жолды көрсетіңіз. Мысалы: сізде тек белгілі бір каталогта орналасқан нысандарға қол жеткізу мүмкіндігі бар болса.
   - `--recursive` — пайдаланған кезде команда бакетте немесе көрсетілген каталогта орналасқан барлық нысандарға орындалатын параметр.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда пайдаланылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің нақты пішімін білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

  {cut(Нысандар тізімін қарау командасының мысалы)}

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

Нысандар тізімін қарау командасының қолжетімді параметрлерінің сипаттамасы — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Әлі орнатылмаған болса, Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе баптау файлына қосыңыз.
1. Өз жобаңызға кодты қосыңыз:

   ```go
   package main

   import (
	   "github.com/aws/aws-sdk-go/aws"
	   "github.com/aws/aws-sdk-go/aws/session"
	   "github.com/aws/aws-sdk-go/service/s3"
	   "log"
   )

   const vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"

   const defaultRegion = "ru-msk"

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
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `ListObjectsV2` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Әлі орнатылмаған болса, Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе баптау файлына қосыңыз.
1. Өз жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `list_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects) толық сипатталған.

{/tab}

{/tabs}

## {heading(Нысандар нұсқаларын қарау)[id=s3-instructions-manage-object-list-versions]}

Бакет үшін {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқаларды басқару]} қосылған болса, {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=өшіру маркерлерін]} қоса алғанда, нысандардың барлық нұсқаларын қарауыңызға болады.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. **Нысандар нұсқаларын көрсету** опциясын қосыңыз.

   Нысандар тізімінде нысандардың барлық нұсқалары пайда болады, ал **Нұсқа ID** бағанында оның {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=идентификаторы]} көрсетіледі.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api list-object-versions \
      --bucket <ИМЯ_БАКЕТА> \
      --prefix <ПУТЬ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нысандардың нұсқаларын қарау қажет бакеттің атауы.
   - (Қалауыңыз бойынша) `--prefix` — нысандарды сүзгілеу қажет кілт префиксі. Мысалы: `image/`, `pre/`, `image/photo`.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда пайдаланылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің нақты пішімін білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Команда мен жауаптың мысалы)}

   Команда мысалы:

   ```console
   aws s3api list-object-versions \
      --bucket my-bucket \
      --prefix folder/ \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```json
   {
       "Versions": [
           {
               "ETag": "\"ab5083fd8cd77246da821f42f90a5761\"",
               "Size": 13204976,
               "StorageClass": "STANDARD",
               "Key": "folder/my-object.exe",
               "VersionId": "e6JxeTPO0MDl2VZOaWDHmveXbxxIkGic",
               "IsLatest": true,
               "LastModified": "2023-10-05T14:38:16+00:00"
           },
           {
               "ETag": "\"1efbf0a935e6f74ba1ca884a53194b46\"",
               "Size": 12984512,
               "StorageClass": "STANDARD",
               "Key": "folder/my-object.exe",
               "VersionId": "QUpfdndhfd8438MNFDNvssklpaTBGxxE",
               "IsLatest": false,
               "LastModified": "2023-09-27T11:48:56+00:00"
           }
       ],
       "DeleteMarkers": []
   }
   ```

   {/cut}

`list-object-versions` командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/list-object-versions.html) қолжетімді.

{/tab}

{/tabs}

## {heading(Нысан қасиеттерін қарау)[id=s3-instructions-manage-object-view]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Нысан атауын басыңыз. Оның қасиеттері беті ашылады:

   - **Атауы** — нысанның атауы.
   - **Өлшемі** — нысанның өлшемі.
   - **Нысан иесі** — нысан тиесілі {ifndef(s3,s3-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=жобаның идентификаторы]}{/ifndef}{ifdef(s3,s3-pdf)}жобаның идентификаторы{/ifdef}.
   - **Сақтау класы** — {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=нысанның сақтау класы]}.
   - **Жасалған күні** — нысанның бакетке қосылған күні мен уақыты.
   - **Өзгертілген күні** — нысанның соңғы өзгертілген күні мен уақыты.
   - **Нысанға сілтеме** — нысанды жүктеу сілтемесі. Сілтемені оның оң жағындағы ![Копировать](assets/copy-icon.svg "inline") белгішесін басу арқылы көшіруге болады.
   - **ETag** — {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=құрамдас жүктеу]}} кезінде оның тұтастығын тексеру үшін пайдаланылатын нысанның бақылау сомасы. Бақылау сомасын оның оң жағындағы ![Копировать](assets/copy-icon.svg "inline") белгішесін басу арқылы көшіруге болады.
   - **Файлға қол жеткізу** — нысанға тағайындалған {linkto(../../../concepts/access/s3-acl#s3-concepts-acl)[text=қол жеткізуді басқару тізімі (ACL)]}.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api head-object \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --version-id <ID_ВЕРСИИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нысан орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — нысанға дейінгі жолды қоса алғанда, нысанның толық атауы.
   - (Қалауыңыз бойынша) `<ID_ВЕРСИИ>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқаларды басқаруы]} бар бакеттегі нысанның {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқаның идентификаторы]}. `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа пайдаланылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда пайдаланылатын домендік атауы бар сілтеме. Атау пішімі өзгеше болуы мүмкін. Сілтеменің нақты пішімін білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Команда мен жауаптың мысалы)}

   Команда мысалы:

   ```console
   aws s3api head-object \
      --bucket my-bucket \
      --key folder/my-object.exe \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```json
   {
     "LastModified": "2023-10-05T14:38:16+00:00",
     "ContentLength": 13204976,
     "ETag": "\"ab5083fd8cd77246da821f42f90a5761\"",
     "VersionId": "e6JxeTPO0MDl2VZOaWDHmveXbxxIkGic",
     "ContentType": "application/x-msdownload",
     "Metadata": {}
   }
   ```

   {/cut}

`head-object` командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/head-object.html) қолжетімді.

{/tab}

{/tabs}

## {heading(Объектті жүктеп алу)[id=s3-instructions-manage-object-download]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Флажок арқылы объектіні таңдап, **Жүктеп алу** түймесін басыңыз.
   - Объект үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Файлды жүктеп алу** тармағын таңдаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файлдық менеджер)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файлдық менеджерін қолданамыз. Егер сіз басқа файлдық менеджерді қолдансаңыз, оның интерфейсі және элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеруі мүмкін.
{/note}

Файлдық менеджеріңіздің сол жақ панелінде файлды жүктеп алуды жоспарлап отырған операциялық жүйеңіздегі қалтаны ашыңыз. Файлдық менеджердің оң жақ панелінде {var(s3)} ашып, қажетті бакетке өтіңіз.

Файлдық менеджердің оң жақ панелінде бакеттен жүктеп алуды жоспарлап отырған файлды тауып, тінтуірмен оны сол жақ панельге сүйреңіз. Осылайша бакеттен файлдың көшірмесін жүктеп аласыз.

Немесе файлдық менеджердің оң жақ панеліндегі **Copy** немесе **Move** түймелерін қолданыңыз. Ол үшін қажетті файлды немесе файлдар тобын белгілеп, сәйкес түймені басыңыз. «Copy» функциясы бакеттен файлдың көшірмесін жүктейді, «Move» функциясы файлды бакеттен жылжытады. Бакеттегі бастапқы файл жойылады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Консоль ашып, объектіні жүктеп алу қажет каталогке өтіңіз.
1. Команданы орындаңыз:

   ```console
   aws s3api get-object \
     --bucket <ИМЯ_БАКЕТА> \
     --key <КЛЮЧ_ОБЪЕКТА> \
     --version-id <ID_ВЕРСИИ> \
     <ИМЯ_ФАЙЛА> \
     --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің атауы және оған дейінгі жол, каталогтар болса, оларды қоса.
   - (Міндетті емес) `<ID_ВЕРСИИ>` — версиялауы бар бакеттегі объектінің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
   - `<ИМЯ_ФАЙЛА>` — жүктеп алынған файлға берілетін атау.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

   {cut(Объектті жүктеп алу командасының мысалы)}

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

1. Әлі орнатылмаған болса, Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Өз жобаңызға кодты қосыңыз:

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
	   defaultRegion         = "ru-msk"
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
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

   `GetObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Әлі орнатылмаған болса, Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз.
1. Бұрын жасалмаған болса, {var(s3)} үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Өз жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `get_object` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects) толық сипатталған.

{/tab}

{/tabs}

## {heading(Объектке қолжетімділік деңгейін өзгерту)[id=s3-instructions-manage-object-access]}

Бакетке жүктелген объектілер әдепкі бойынша `private` қолжетімділік деңгейіне ие, яғни оларды тек келесі жағдайларда жүктеп алуға болады:

- {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде;
- бакетке немесе аккаунтқа {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=қолжетімділік кілттері]} болса, CLI, API, SDK және файлдық менеджерлер арқылы.

Объектті үшінші тарап пайдаланушыларына қолжетімді ету үшін оның қолжетімділік деңгейін өзгертуге болады. Қолжетімділік деңгейлері {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартты ACL-ге]} сәйкес келеді. Әдепкі бойынша келесі деңгейлерді орнатуға болады:

- `private` — {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=бакетке немесе аккаунтқа қолжетімділік кілттері]} болған жағдайда толық құқықтар, қалғандарға объект қолжетімсіз;
- `public-read` — кілттер болған жағдайда толық құқықтар, {var(s3)} қалған пайдаланушыларына және үшінші тарап пайдаланушыларына объект тек оқу үшін қолжетімді;
- `authenticated-read` — кілттер болған жағдайда толық құқықтар, {var(s3)} қалған пайдаланушыларына объект тек оқу үшін қолжетімді, үшінші тарап пайдаланушыларына объект қолжетімсіз.

Объектке қолжетімділік деңгейін өзгерту үшін:

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Келесі әрекеттердің бірін орындаңыз:

   - Объекттерді немесе каталогтарды флажоктар арқылы таңдап, **Қолжетімділік** түймесін басыңыз.
   - Объект үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Файлға қолжетімділік** тармағын таңдаңыз.
   - Каталог үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Қалтадағы файлдарға қолжетімділік** тармағын таңдаңыз.

1. **ACL баптау** өрісінде қолжетімділік баптауын таңдап, **Өзгерістерді сақтау** басыңыз. `public-read` немесе `authenticated-read` таңдалған жағдайда өзгерістер сақталғаннан кейін объектке қолжетімділік сілтемесі пайда болады.
1. Сілтемені көшіріп, қолжетімділікті баптау терезесін жабыңыз.
1. Объектке тікелей қолжетімділік үшін сілтемені пайдаланушыларға жіберіңіз немесе үшінші тарап ресурсында орналастырыңыз.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз.
1. Консольда қолжетімділік деңгейін өзгерту командасын орындаңыз:

   {tabs}
   {tab(Бір объектке)}

   ```console
   aws s3api put-object-acl \
      --acl <НАСТРОЙКА_ACL> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<НАСТРОЙКА_ACL>` — ACL қолжетімділік деңгейі. Көрсетілген қолжетімділік деңгейі жобада бапталмаған болса, объектке `private` қолжетімділік деңгейі беріледі.
   - `<ИМЯ_БАКЕТА>` — қажетті объект орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — объектінің толық атауы, оған дейінгі жолды қоса.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеруі мүмкін. Сілtemенің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Объектке қолжетімділікті баптау командасының мысалы)}

   ```console
   aws s3api put-object-acl \
      --acl public-read \
      --bucket my-bucket \
      --key picture.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {/cut}

   Объекттің ACL-ін өзгерту операциясының толық сипаттамасы [AWS CLI ресми құжаттамасында](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html) қолжетімді.

   {/tab}
   {tab(Бакеттегі немесе оның каталогындағы барлық объектілерге)}

   ```console
   aws s3 cp s3://<ИМЯ_БАКЕТА>/<ПУТЬ>  s3://<ИМЯ_БАКЕТА>/<ПУТЬ> \
      --acl <НАСТРОЙКА_ACL> \
      --recursive \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — объектілеріне қолжетімділікті өзгерту қажет бакеттің атауы.
   - `<ПУТЬ>` — объектілеріне қолжетімділікті өзгерту қажет каталогқа дейінгі жол.
   - `<НАСТРОЙКА_ACL>` — ACL қолжетімділік деңгейі. Көрсетілген қолжетімділік деңгейі жобада бапталмаған болса, объектке `private` қолжетімділік деңгейі беріледі.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеруі мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   Объекттердің модификациялау уақыты жаңартылады. Объекттердің өмірлік циклін (lifecycle) басқару кезінде және шартты сұрауларды (`if-modified-since`) қолданғанда мұны ескеріңіз.

   {cut(Объектке қолжетімділікті баптау командасының мысалы)}

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

## {heading(Объекттерді көшіру)[id=s3-instructions-manage-object-copy]}

Нұсқаулық бір бакеттің ішінде немесе бір жобаның бакеттері арасында объекттерді көшіруге арналған.

Көшіру операциясы тек құрама емес объекттерге орындалады, сондықтан көшірілетін объекттің максималды өлшемі 32 ГБ-пен шектелген.

{tabs}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.

1. Консольде команданы орындаңыз:

   ```console
   aws s3 cp --recursive s3://<ҚАЗНА_ДЕРЕККӨЗ>/<ОБЪЕКТ_ДЕРЕККӨЗ_КІЛТІ> s3://<ҚАЗНА_ҚАБЫЛДАҒЫШ>/<ОБЪЕКТ_ҚАБЫЛДАҒЫШ_КІЛТІ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `--recursive` — пайдаланылған кезде команда бакетте немесе көрсетілген каталогта орналасқан барлық объекттерге орындалатын параметр.
   - `<ҚАЗНА_ДЕРЕККӨЗ>` — объект көшірілетін бакеттің атауы.
   - `<ОБЪЕКТ_ДЕРЕККӨЗ_КІЛТІ>` — көшірілетін объекттің немесе объекттер көшірілетін каталогтың толық атауы, соның ішінде оған дейінгі жол.
   - `<ҚАЗНА_ҚАБЫЛДАҒЫШ>` — объект көшірілетін бакеттің атауы. Егер атаулар сәйкес келсе, объект сол бакетке көшіріледі.
   - `<ОБЪЕКТ_ҚАБЫЛДАҒЫШ_КІЛТІ>` — объекттің немесе объекттер көшірілетін каталогтың толық атауы, соның ішінде оған дейінгі жол.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Бір объектті басқа бакетке көшіру командасының мысалы)}

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

   {cut(Бакеттің барлық объекттерін басқа бакетке көшіру командасының мысалы)}

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

Объекттерді көшіру командасының қолжетімді параметрлерінің сипаттамасы — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html).

{/tab}

{tab(Golang SDK)}

1. Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Бұрын жасалмаса, {var(s3)} қызметінің {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе баптау файлына қосыңыз.
1. Өз жобаңызға код қосыңыз:

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
	   defaultRegion         = "ru-msk"
   )

   func main() {
	   // Сессия жасау
	   sess, _ := session.NewSession()

	   // VK Object Storage қызметіне қосылу
	   svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	   // Объектті бір бакеттен екіншісіне көшіру

	   sourceBucket := "gobucket"
	   sourceKey := "test_string.txt"
	   destBucket := "gobucket2"
	   destKey := "test_string.txt"

	   if _, err := svc.CopyObject(&s3.CopyObjectInput{
		   Bucket:     aws.String(destBucket),
		   Key:        aws.String(destKey),
		   CopySource: aws.String(fmt.Sprintf("%s/%s", sourceBucket, sourceKey)),
	   }); err != nil {
		   log.Fatalf("Объектті %q ішінен %q ішіне көшіру мүмкін болмады, %v\n", sourceBucket, destBucket, err)
	   } else {
		   fmt.Printf("Объект %q ішінен %q ішіне көшірілді\n", sourceBucket, destBucket)
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

   `CopyObject` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Бұрын жасалмаса, {var(s3)} қызметінің {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе баптау файлына қосыңыз.
1. Өз жобаңызға код қосыңыз:

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
   `endpoint_url` айнымаласының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
   {/ifdef}

   `copy` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy) толық сипатталған.

{/tab}

{/tabs}

## {heading(Объекттерді тегтермен белгілеу)[id=s3-instructions-manage-object-tagging]}

### {heading(Объект тегтерін көру)[id=s3-instructions-manage-object-tagging-view]}

{tabs}

{tab(AWS CLI)}

Объект тегтерін тексеру үшін `get-object-tagging` командасын орындаңыз.

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api get-object-tagging \
      --bucket <ҚАЗНА_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --version-id <НҰСҚА_ID> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ҚАЗНА_АТАУЫ>` — жасалған кезде бакетке берілген атау.
   - `<ОБЪЕКТ_КІЛТІ>` — объекттің толық атауы, соның ішінде оған дейінгі жол.
   - (Қалауыңыз бойынша) `<НҰСҚА_ID>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқалар басқарылатын]} бакеттегі объекттің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. Егер `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
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

### {heading(Объектті тегтерін сақтай отырып көшіру)[id=s3-instructions-manage-object-tagging-copy]}

{tabs}

{tab(AWS CLI)}

Объектті көшіру кезінде тегтерді сақтау үшін `--tagging-directive COPY` опциясымен `copy-object` командасын орындаңыз.

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api copy-object \
      --copy-source <ДЕРЕККӨЗ_ҚАЗНА_АТАУЫ>/<ДЕРЕККӨЗ_ОБЪЕКТ_КІЛТІ>?versionId=<НҰСҚА_ID> \
      --bucket <МАҚСАТТЫ_ҚАЗНА_АТАУЫ> \
      --key <МАҚСАТТЫ_ОБЪЕКТ_КІЛТІ> \
      --tagging-directive COPY \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ДЕРЕККӨЗ_ҚАЗНА_АТАУЫ>` — объект көшірілетін бакеттің атауы.
   - `<ДЕРЕККӨЗ_ОБЪЕКТ_КІЛТІ>` — көшірілетін объекттің толық атауы, соның ішінде оған дейінгі жол.
   - (Қалауыңыз бойынша) `<НҰСҚА_ID>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқалар басқарылатын]} бакеттегі объекттің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. Егер `?versionId=<НҰСҚА_ID>` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
   - `<МАҚСАТТЫ_ҚАЗНА_АТАУЫ>` — объект көшірілетін бакеттің атауы.
   - `<МАҚСАТТЫ_ОБЪЕКТ_КІЛТІ>` — объект көшірмесінің толық атауы, соның ішінде оған дейінгі жол. Атауларды таңдау кезінде {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Объектті тегтерін ауыстырып көшіру)[id=s3-instructions-manage-object-tagging-replace]}

{tabs}

{tab(AWS CLI)}

Объектті көшіру кезінде тегтерді ауыстыру үшін `--tagging-directive REPLACE` опциясымен `copy-object` командасын орындаңыз.

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api copy-object \
      --copy-source <ДЕРЕККӨЗ_ҚАЗНА_АТАУЫ>/<ДЕРЕККӨЗ_ОБЪЕКТ_КІЛТІ>?versionId=<НҰСҚА_ID> \
      --bucket <МАҚСАТТЫ_ҚАЗНА_АТАУЫ> \
      --key <МАҚСАТТЫ_ОБЪЕКТ_КІЛТІ> \
      --tagging-directive REPLACE \
      --tagging "<ТЕГТЕР>" \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ДЕРЕККӨЗ_ҚАЗНА_АТАУЫ>` — объект көшірілетін бакеттің атауы.
   - `<ДЕРЕККӨЗ_ОБЪЕКТ_КІЛТІ>` — көшірілетін объекттің толық атауы, соның ішінде оған дейінгі жол.
   - (Қалауыңыз бойынша) `<НҰСҚА_ID>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқалар басқарылатын]} бакеттегі объекттің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. Егер `?versionId=<НҰСҚА_ID>` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
   - `<МАҚСАТТЫ_ҚАЗНА_АТАУЫ>` — объект көшірілетін бакеттің атауы.
   - `<МАҚСАТТЫ_ОБЪЕКТ_КІЛТІ>` — объект көшірмесінің толық атауы, соның ішінде оған дейінгі жол. Атауларды таңдау кезінде {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз.
   - `<ТЕГТЕР>` — `<КІЛТ_1>=<МӘН_1>&...<КІЛТ_N>=<МӘН_N>` форматындағы тегтер. Мысалы: `Key1=Value1&Key2=Value2`.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Жүктеп салу кезінде тег қосу)[id=s3-instructions-manage-object-upload-tagging]}

{tabs}

{tab(AWS CLI)}

Жаңа объектті жүктеп салған кезде оған тег қосу үшін `--tagging` опциясымен `put-object` командасын орындаңыз.

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api put-object --endpoint-url <ENDPOINT_URL> --bucket <ҚАЗНА_АТАУЫ> --key <ОБЪЕКТ_КІЛТІ> --body <ФАЙЛ_ЖОЛЫ> --tagging "<ТЕГТЕР>"
   ```

   Мұнда:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}
   - `<ҚАЗНА_АТАУЫ>` — жасалған кезде бакетке берілген атау.
   - `<ОБЪЕКТ_КІЛТІ>` — объекттің толық атауы, соның ішінде оған дейінгі жол. Атауларды таңдау кезінде {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=ұсыныстарды]} орындаңыз.
   - `<ФАЙЛ_ЖОЛЫ>` — жергілікті файлға дейінгі жол.
   - `<ТЕГТЕР>` — `<КІЛТ_1>=<МӘН_1>&...<КІЛТ_N>=<МӘН_N>` форматындағы тегтер. Мысалы: `Key1=Value1&Key2=Value2`.

{/tab}

{/tabs}

### {heading(Бар объектке тег қосу)[id=s3-instructions-manage-object-existing-tagging]}

{tabs}

{tab(AWS CLI)}

Бар объектке тег қосу үшін `--tagging` опциясымен және JSON форматындағы кілт/мән жұптарының тізімімен `put-object-tagging` командасын орындаңыз.

{note:warn}
`put-object-tagging` операциясы бұрын орнатылған болса, объекттің ағымдағы тегтерін қайта жазады. Бар тегтерді сақтау үшін тегтердің ағымдағы баптауын {linkto(#s3-instructions-manage-object-tagging-view)[text=сұратыңыз]} және оны `put-object-tagging` командасына қосыңыз.
{/note}

{cut(Тегтер тізімінің құрылымы)}

```txt
{
  "TagSet": [
    {
      "Key": "<ТЕГ_КІЛТІ_1>",
      "Value": "<ТЕГ_МӘНІ_1>"
    },
    ...
    {
      "Key": "<ТЕГ_КІЛТІ_N>",
      "Value": "<ТЕГ_МӘНІ_N>"
    }
  ]
}
```

{/cut}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде, мысалы, екі тегті орнатыңыз, команданы орындай отырып:

   ```console
   aws s3api put-object-tagging \
      --bucket <ҚАЗНА_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --tagging '{
         "TagSet": [
            {
              "Key": "<ТЕГ_КІЛТІ_1>",
              "Value": "<ТЕГ_МӘНІ_1>"
            },
            {
               "Key": "<ТЕГ_КІЛТІ_2>",
               "Value": "<ТЕГ_МӘНІ_2>"
            }
         ]
      }' \
      --version-id <НҰСҚА_ID> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ҚАЗНА_АТАУЫ>` — жасалған кезде бакетке берілген атау.
   - `<ОБЪЕКТ_КІЛТІ>` — объекттің толық атауы, соның ішінде оған дейінгі жол.
   - `<ТЕГ_КІЛТІ_1>`, `<ТЕГ_МӘНІ_1>` және `<ТЕГ_КІЛТІ_2>`, `<ТЕГ_МӘНІ_2>` — объект тегтерінің кілт/мән жұптары.
   - (Қалауыңыз бойынша) `<НҰСҚА_ID>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқалар басқарылатын]} бакеттегі объекттің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. Егер `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Объект тегтерін жою)[id=s3-instructions-manage-object-tagging-delete]}

{tabs}

{tab(AWS CLI)}

Объект тегтерін тексеру үшін `get-object-tagging` командасын орындаңыз.

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api delete-object-tagging \
      --bucket <ҚАЗНА_АТАУЫ> \
      --key <ОБЪЕКТ_КІЛТІ> \
      --version-id <НҰСҚА_ID> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Мұнда:

   - `<ҚАЗНА_АТАУЫ>` — жасалған кезде бакетке берілген атау.
   - `<ОБЪЕКТ_КІЛТІ>` — объекттің толық атауы, соның ішінде оған дейінгі жол.
   - (Қалауыңыз бойынша) `<НҰСҚА_ID>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқалар басқарылатын]} бакеттегі объекттің {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}. Егер `--version-id` параметрі көрсетілмесе, ағымдағы нұсқа қолданылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

{/tab}

{/tabs}

## {heading(Нысандарды жою)[id=s3-instructions-manage-object-delete]}

Бұл бөлімде жоюға және қайта жазуға тыйым салынған блоктауы орнатылмаған нысандарды қалай жою керектігі сипатталған. Блоктауды алу және айналып өту туралы — {linkto(../object-lock#s3-instructions-object-lock)[text=Нысандарды жоюға блоктау]} бөлімінде.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Нысандарды жою үшін:

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет атауын басыңыз.
1. Мына әрекеттердің бірін орындаңыз:

   - Нысандарды немесе директорияларды жалаушалар арқылы таңдап, **Удалить** батырмасын басыңыз.
   - Нысан үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Удалить файл** тармағын таңдаңыз.
   - Директория үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Удалить папку** тармағын таңдаңыз.

1. Жоюды растаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файлдық менеджер)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файлдық менеджерін қолданамыз. Егер сіз басқа файлдық менеджерді қолдансаңыз, оның интерфейсі және элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

1. Файлдық менеджердің оң панелінде {var(s3)} ашыңыз және қажетті бакетке өтіңіз. Жоюды жоспарлап отырған файлды тауып, оған тінтуірдің оң жақ батырмасымен контекстік мәзірді шақырыңыз.

   Немесе қажетті файлды таңдап, файлдық менеджердің құралдар тақтасындағы **Delete** батырмасын басыңыз.

1. Ашылған диалогтік терезеде файлды жоюды растауға немесе болдырмауға болады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Консольде командаларды орындаңыз:

   {tabs}

   {tab(Бір нысанды жою)}

   ```console
   aws s3api delete-object \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --version-id <ID_ВЕРСИИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нысан орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — нысанның толық атауы, соның ішінде оған дейінгі жол.
   - `<ID_ВЕРСИИ>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=версиялауы]} бар бакеттегі нысанның {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}.

      {note:warn}
      Егер көрсетілген нұсқа — жалғыз болса, нысан қалпына келтіру мүмкіндігі жоқ түрде, біржола жойылады. Толығырақ — {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=%text]} бөлімінде.
      {/note}

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {/tab}

   {tab(Бірнеше нысанды жою)}

   1. Қандай файлдар жойылатынын тексеріңіз:

      ```console
      aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --dryrun --endpoint-url <ENDPOINT_URL>
      ```

   1. Егер жойылатын файлдар тізімі дұрыс болса, жоюды орындаңыз:

      ```console
      aws s3 rm s3://<ИМЯ_БАКЕТА>/<ПРЕФИКС> --recursive --endpoint-url <ENDPOINT_URL>
      ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — қажетті нысан орналасқан бакеттің атауы.
   - `<ПРЕФИКС>` — жою қажет барлық нысан кілттерінің жалпы префиксі. Бос префикс көрсетілген жағдайда бакеттегі барлық нысандар жойылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік атауы бар сілтеме.
     {/ifdef}

   {/tab}

   {tab(Нысан нұсқасын жою)}

   ```console
   aws s3api delete-object \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --version-id <ID_ВЕРСИИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нысан орналасқан бакеттің атауы.
   - `<КЛЮЧ_ОБЪЕКТА>` — нысанның толық атауы, соның ішінде оған дейінгі жол.
   - `<ID_ВЕРСИИ>` — {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=версиялауы]} бар бакеттегі нысанның {linkto(../../../concepts/versioning#s3-concepts-versioning-version-id)[text=нұсқа идентификаторы]}.

      {note:warn}
      Егер көрсетілген нұсқа — жалғыз болса, нысан қалпына келтіру мүмкіндігі жоқ түрде, біржола жойылады. Толығырақ — {linkto(../../../concepts/versioning#s3-concepts-versioning-objects-delete)[text=%text]} бөлімінде.
      {/note}

      Егер нысанның {linkto(../../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=жою маркері]} болып табылатын нұсқасын көрсетсеңіз, ағымдағы нұсқа алдыңғы нұсқаға айналады.

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {/tab}

   {/tabs}

   {cut(Бір нысанды жою командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 rm s3://my-bucket/my-picture.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   delete: s3://my-bucket/my-picture.png
   ```

   {/cut}

   {cut(Бірнеше нысанды жою командасының мысалы)}

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

Нысандарды жою командасының қолжетімді параметрлерінің сипаттамасы — [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html).

{/tab}

{tab(Golang SDK)}

1. {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Егер бұрын жасалмаса, {var(s3)} қызметіне {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Өз жобаның кодын қосыңыз:

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
	   defaultRegion = "ru-msk"
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
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу аймағы үшін;
      - `kz-ast` — Қазақстан аймағы үшін.
   {/ifdef}

   [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) және [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) командалары aws-sdk-go кітапханасының ресми құжаттамасында толық сипатталған.

{/tab}

{tab(Python SDK)}

1. {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python орнатып, баптаңыз, егер ол әлі орнатылмаған болса.
1. Егер бұрын жасалмаса, {var(s3)} қызметіне {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу деректемелерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
1. Өз жобаның кодын қосыңыз:

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
   `endpoint_url` айнымаласының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
   {/ifdef}

   `delete_objects` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects) толық сипатталған.

{/tab}

{/tabs}

## {heading(Жүктелген нысанның бөліктерін жою)[id=s3-instructions-manage-object-parts-delete]}

Егер {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=құрамдас жүктеу]} аяқталмаса, нысан жасалмайды және қолданыла алмайды{ifdef(public)}, бірақ жүктелген бөліктерді сақтау {linkto(../../../tariffication#s3-tariffication)[text=тарифтеленеді]}. Қаражат шығыны болмауы үшін аяқталмайтын құрамдас жүктеулерді жойыңыз{/ifdef}.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Сізде аяқталмаған құрамдас жүктеулер бар-жоғын білу үшін:

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Кіріңіз]}.

{/ifdef}

1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакеттің атауын басып, **Multipart** қойындысына өтіңіз.

{/tab}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса. Шығу форматын JSON немесе YAML етіп орнатыңыз, себебі мәтіндік форматтар құрамдас жүктеу немесе жою командаларын орындағанда танылмайды.
1. Консольде команданы орындаңыз:

   ```console
   aws s3api list-multipart-uploads \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — аяқталмаған жүктеулерді жою қажет бакеттің атауы.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Аяқталмаған жүктеулерді көру командасының мысалы)}

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

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Кіріңіз]}.

{/ifdef}

1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Қажетті бакеттің атауын басып, **Multipart** қойындысына өтіңіз.
1. Қажетті бөлік үшін мына әрекеттердің бірін орындаңыз:

   - Бөлікті жалауша арқылы таңдап, кестенің үстіндегі **Удалить** батырмасын басыңыз.
   - Жою қажет бөлікті таңдап, оң жақтағы ![Удалить](assets/delete-icon.svg "inline") белгішесін басыңыз.

1. Жоюды растаңыз.

{/tab}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатып, баптаңыз, егер ол әлі орнатылмаған болса. Шығу форматын JSON немесе YAML етіп орнатыңыз, себебі мәтіндік форматтар құрамдас жүктеу немесе жою командаларын орындағанда танылмайды.
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
   - `<КЛЮЧ_ОБЪЕКТА>` — жеке кабинеттегі **Multipart** қойындысындағы **Название** өрісіндегі мән немесе AWS CLI жауабындағы `Key` параметрінің мәні.
   - `<ID_ЗАГРУЗКИ>` — жеке кабинеттегі **Multipart** қойындысындағы **ID** өрісіндегі мән немесе AWS CLI жауабындағы `UploadId` параметрінің мәні.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағы үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағы үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   Команданы орындау мысалы:

   ```console
   aws s3api abort-multipart-upload \
      --bucket mybucket \
      --key inupload.avi \
      --upload-id \example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

Нәтижесінде барлық аяқталмаған жүктеулер тоқтатылып, жүктелген бөліктер жойылады.

{/tab}

{/tabs}