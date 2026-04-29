{include(/kz/_includes/_translated_by_ai.md)}

## Бакеттер тізімін қарау

{tabs}

{tab(Жеке кабинет)}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз. Жобадағы бакеттер тізімі ашылады.
1. (Опционалды) Тиісті баған тақырыбындағы көрсеткілерді пайдаланып, тізімді бакет атауы бойынша сұрыптаңыз.

   - Өсу ретімен сұрыптау кезіндегі тәртіп: `a`–`z` / `-` / `.` / `0`–`9`.
   - Кему ретімен сұрыптау кезіндегі тәртіп: `9`–`0` / `.` / `-` / `z`–`a`.

   {note:warn}
   Сұрыптау бүкіл тізімге емес, экранға шығарылған бөлігіне ғана қолданылады.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

      ```console
      aws s3 ls --endpoint-url <URL_СЕРВИСА>
      ```

      Мұнда:

      - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
         - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
         - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Бакеттер тізімін қарау командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

      ```console
      2022-12-27 13:55:01 bucket-1
      2024-04-17 12:44:31 bucket-2
      2024-03-11 13:38:27 bucket-3
      2024-03-18 16:00:57 bucket-4
      ```

   {/cut}

Бакеттер тізімін шығару командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html) берілген.

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

    const (
	    vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	    defaultRegion = "us-east-1"
    )

    func main() {
	    // Создание сессии
	    sess, _ := session.NewSession()

	    // Подключение к сервису VK Object Storage
	    svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	    if res, err := svc.ListBuckets(nil); err != nil {
		    log.Fatalf("Unable to list buckets, %v", err)
	    } else {
		    for _, b := range res.Buckets {
			    log.Printf("* %s created on %s 
", aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
		    }
	    }
    }
    ```

   `vkCloudHotboxEndpoint` айнымалысының мәні аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

`ListBuckets` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін [SDK](../../../connect/s3-sdk) орнатып, баптаңыз.

1. Егер бұл бұрын жасалмаған болса, VK Object Storage-ке арналған [қосылу деректерін](../../../connect/s3-sdk) орта айнымалыларына немесе конфигурация файлына қосыңыз.

1. Жобаңызға кодты қосыңыз:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.list_buckets()
   print(response)

   for key in response['Buckets']:
     print(key['Name'])
   ```

   `endpoint_url` айнымалысының мәні аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

`list_buckets` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html) толық сипатталған.

{/tab}

{/tabs}

## {heading(Бакет туралы ақпаратты қарау)[id=bucket_info]}

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](/kz/storage/s3/connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА> --summarize --human-readable --recursive --endpoint-url <URL_СЕРВИСА>
   ```
   Мұнда:

   - `<ИМЯ_БАКЕТА>` — ақпаратын қарау қажет бакет атауы.
   - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.


Команда жауабында келесі параметрлердің мәндері болады:

- `Permission` — қолжетімділік топтары (мысалы, `OWNER`, `READ`, `WRITE`, `FULL_CONTROL`) немесе олардың құқықтары көрсетілген нақты тіркелгілер/пайдаланушылар.
- `Type` — жазба түрі:

  - `d`, егер бұл директория болса (directory).
  - `-`, егер бұл қарапайым файл болса (object).

- `Size` — объектінің немесе директорияның өлшемі. Директория үшін жиынтық мән шығарылады (мысалы, `1 object(s) 10 KB`).
- `Last Modified` — объектінің немесе директорияның соңғы өзгертілген күні мен уақыты. Бұл мазмұнның өзектілігін бақылауға көмектеседі.
- `Storage Class` — объект үшін пайдаланылған [сақтау класының](../../../concepts/about#storage_class) түрі. Мысалдар:

  - `STANDARD` — `Hotbox` сақтау класына сәйкес келеді;
  - `STANDARD_IA` — `Icebox` сақтау класына сәйкес келеді.

- `Key` — бакет ішіндегі объектіге немесе директорияға толық жол.
- `Owner` — объект тиесілі тіркелгі (немесе пайдаланушы идентификаторы) мен топ.

{/tab}

{/tabs}

## {heading(Доменді байланыстыру)[id=bind_domain]}

Доменді бакетке байланыстыру бакет объектілеріне өз доменіңіз арқылы қол жеткізуге, сондай-ақ бакетті сайтыңыздың репозиторийі ретінде пайдалануға мүмкіндік береді.

{tabs}

{tab(Жеке кабинет)}

1. Егер бұл бұрын жасалмаған болса, кез келген домендік атаулар тіркеушісінде доменді тіркеңіз. Тек үшінші деңгейдегі және одан жоғары доменді байланыстыруға болады, мысалы: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{include(/kz/_includes/_s3-open-bucket.md)}

1. **Домен** қойындысына өтіп, ![plus-icon](/kz/assets/plus-icon.svg "inline") **Доменді байланыстыру** батырмасын басыңыз.
1. Ашылған терезеде `<ИМЯ_БАКЕТА>.<URL_СЕРВИСА>` түріндегі CNAME жазбасы үшін мәнді көшіріп алыңыз. Жазба мысалы: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Домен провайдеріңіздің жеке кабинетіне өтіңіз. Доменіңіз үшін кез келген CNAME жазбасын қосып, жазба мәні ретінде көшірілген мәтінді көрсетіңіз.
1. Өзгерістер күшіне енгенше күтіңіз. Әдетте бұл 15–20 минутты алады.
1. VK Cloud жеке кабинетіне оралыңыз. **Домен** өрісіне доменіңіздің атауын көрсетіңіз.

Байланыстырылғаннан кейін бакет `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>` түріндегі сілтеме арқылы қолжетімді болады, мысалы `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}

Егер бакет атауында нүкте болса, ол тек HTTP протоколын пайдаланған кезде ғана қолжетімді болады. HTTPS протоколын пайдалану үшін SSL сертификатын орнатыңыз.

{/note}

## {heading(CDN пайдалану)[id=use_cdn]}

{include(/kz/_includes/_s3-create-cdn.md)}

## {heading(Жергілікті директорияны бакетпен синхрондау)[id=sync_local_directory_and_bucket]}

VK Object Storage бакет объектілерін және жергілікті директория файлдарын синхрондауға мүмкіндік береді. Синхрондау кезінде VK Object Storage файлдың немесе объектінің бар-жоғын, олардың өлшемін және соңғы өзгертілген күнін тексереді. Салыстыру команда немесе сұрау орындалған сәтте жасалады. Командаға немесе сұрауға байланысты не бакеттің, не жергілікті директорияның мазмұны жаңартылады.

{tabs}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде бакетпен синхрондау қажет жергілікті директорияға өтіңіз.

2. Консольде команданы орындаңыз:

    - Жергілікті директорияны бакетке сәйкес жаңарту үшін:

        ```console
        aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <URL_СЕРВИСА>
        ```
    - Бакетті жергілікті директорияға сәйкес жаңарту үшін:

        ```console
        aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
        ```
   Мұнда `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Бакетке сәйкес жергілікті директорияны жаңарту командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Жергілікті директорияға сәйкес бакетті жаңарту командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 sync . s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   upload: .\my-file.svg to s3://example-bucket/my-file.svg
   ```

   {/cut}

{/tab}

{/tabs}

## {heading(Бакетті жою)[id=bucket_delete]}

{note:warn}

`Backup` сақтау класы бар бакетті жою мүмкін емес. Ондағы объектілерді резервтік көшіру сервисі арқылы жоюға болады.

{/note}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірден бірнеше бакетті жоюға болады.

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Объектілік сақтау қоймасы → Бакеттер** бөліміне өтіңіз.
1. Егер бұл бұрын жасалмаған болса, жою қажет бакеттен [объектілерді жойыңыз](../../objects/manage-object#zhoyu_obektilerdin).
1. Бакетті келесі тәсілдердің бірімен жойыңыз:

    - Қажетті бакет үшін ![ ](/kz/assets/more-icon.svg "inline") батырмасын басып, **Жою** тармағын таңдаңыз.
    - Жалауша арқылы бакетті таңдап, одан кейін ![trash-icon](/kz/assets/trash-icon.svg "inline") **Жою** батырмасын басыңыз.

1. Жоюды растаңыз.

{/tab}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, [AWS CLI](../../../connect/s3-cli) орнатып, баптаңыз.

1. Консольде команданы орындаңыз:

      ```console
      aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <URL_СЕРВИСА>
      ```

      Мұнда:

      - (Опционалды) `force` — бакетті және ондағы барлық объектілерді жояды. Бұл параметрсіз бакет тек объектілер болмаса ғана жойылады.

      - `<URL_СЕРВИСА>` — VK Object Storage сервисінің домені, ол аккаунттың [аймағына](/kz/tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:
         - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
         - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.

   {cut(Бакетті және ондағы барлық объектілерді жою командасының мысалы)}

      Команда мысалы:

      ```console
      aws s3 rb s3://example-bucket --force --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Жауап мысалы:

      ```console
      delete: s3://example-bucket/images/picture-1.jpg
      delete: s3://example-bucket/images/picture-2.jpg
      delete: s3://example-bucket/input/
      remove_bucket: example-bucket
      ```

   {/cut}

Бакетті жою командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html) берілген.

{/tab}

{/tabs}
