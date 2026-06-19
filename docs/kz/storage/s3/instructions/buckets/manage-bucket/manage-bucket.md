# {heading(Бакетті басқару)[id=s3-instructions-manage-bucket]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Бакеттер тізімін қарау)[id=s3-instructions-manage-bucket-view]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз. Жобадағы бакеттер тізімі ашылады.
1. (Қосымша) Тиісті баған тақырыбындағы көрсеткілерді пайдаланып, тізімді бакет атауы бойынша сұрыптаңыз.

   - Өсу ретімен сұрыптау кезіндегі тәртіп: `a`–`z` / `-` / `.` / `0`–`9`.
   - Кему ретімен сұрыптау кезіндегі тәртіп: `9`–`0` / `.` / `-` / `z`–`a`.

   {note:warn}
   Сұрыптау бүкіл тізімге түгелдей емес, тек экранға шығарылған бөлігіне ғана қолданылады.
   {/note}

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Сіз {var(s3)} бакеттерінің қасиеттерін, соның ішінде нұсқаларды басқару параметрлерін, тегтерді, әдепкі шифрлауды, журнал жүргізуді, хабарландыруларды және тағы басқаларын қарап, баптай аласыз.

Файл менеджері көмегімен бакет қасиеттерін көру үшін келесі әрекеттерді орындаңыз:

1. Жобаңыз ашылған файл менеджері панелінде қажетті бакетті таңдап, тінтуірдің оң жақ батырмасымен контекстік мәзірді ашыңыз. Контекстік мәзірде **Properties** тармағын таңдаңыз.
1. Ашылған терезеде бакеттің қасиеттері қарауға қолжетімді болады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 ls --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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

Бакеттер тізімін шығару командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html) қолжетімді.

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

   const (
      vkCloudHotboxEndpoint = "https://hb.kz-ast.vkcloud-storage.ru"
      defaultRegion = "kz-ast"
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
             log.Printf("* %s created on %s \n", aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
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

`ListBuckets` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Егер бұған дейін жасалмаған болса, {var(s3)}-ке {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қосылу реквизиттерін]} орта айнымалыларына немесе конфигурациялық файлға қосыңыз.
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
   {ifdef(public)}
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
   {/ifdef}

`list_buckets` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}

## {heading(Доменді байланыстыру)[id=s3-instructions-manage-bucket-domain]}

Доменді бакетке байланыстыру бакет объектілеріне доменіңіз арқылы қол жеткізуге, сондай-ақ бакетті сайтыңыздың репозиторийі ретінде пайдалануға мүмкіндік береді.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

1. Егер бұған дейін жасалмаған болса, домендік атаулардың кез келген тіркеушісінде доменді тіркеңіз. Тек үшінші деңгейлі және одан жоғары доменді байланыстыруға болады, мысалы: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Бакет баптауларына келесі тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакет атауын басыңыз, содан кейін бакет бетінде ![ ](../../../assets/settings-icon.svg "inline") түймесін басыңыз.

1. **Домен** қойындысына өтіп, ![plus-icon](../../../assets/plus-icon.svg "inline") **Доменді байланыстыру** түймесін басыңыз.
1. Ашылған терезеде `<ИМЯ_БАКЕТА>.<ENDPOINT_ДОМЕН>` түріндегі CNAME жазбасы үшін мәнді көшіріп алыңыз. Жазба мысалы: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Домен провайдеріңіздің жеке кабинетіне өтіңіз. Доменіңіз үшін кез келген CNAME жазбасын қосыңыз, жазба мәні ретінде көшірілген мәтінді енгізіңіз.
1. Өзгерістер күшіне енгенше күтіңіз. Әдетте бұл 15–20 минутты алады.
1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетіне оралыңыз. **Домен** өрісінде доменіңіздің атауын көрсетіңіз.

Байланыстырғаннан кейін бакет `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>` түріндегі сілтеме арқылы қолжетімді болады, мысалы `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}
Егер бакет атауында нүкте болса, ол тек HTTP протоколын қолданғанда ғана қолжетімді болады. HTTPS протоколын пайдалану үшін SSL сертификатын орнатыңыз.
{/note}

{ifdef(public)}

## {heading(CDN пайдалану)[id=s3-instructions-manage-bucket-cdn]}

{include(../../../_includes/_s3-create-cdn.md)[tags=s3_create_cdn_all,s3_create_cdn_s3]}

{/ifdef}

## {heading(Жергілікті директорияны бакетпен синхрондау)[id=s3-instructions-manage-bucket-sync]}

{var(s3)} бакет объектілерін және жергілікті директория файлдарын синхрондауға мүмкіндік береді. Синхрондау кезінде {var(s3)} файлдың немесе объектінің бар-жоғын, олардың өлшемін және соңғы өзгерту күнін тексереді. Салыстыру команда немесе сұрау орындалған сәтте жүзеге асады. Командаға немесе сұрауға байланысты мазмұн бакетте немесе жергілікті директорияда жаңартылады.

{tabs}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде бакетпен синхрондау қажет жергілікті директорияға өтіңіз.
1. Консольде команданы орындаңыз:

   - Жергілікті директорияны бакетке сәйкес жаңарту үшін:

     ```console
     aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <ENDPOINT_URL>
     ```
   - Бакетті жергілікті директорияға сәйкес жаңарту үшін:

     ```console
     aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
     ```
       {ifdef(public)}
     - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
       {/ifdef}
       {ifdef(s3,s3-pdf)}
     - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
       {/ifdef}

   {cut(Жергілікті директорияны бакетке сәйкес жаңарту командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Бакетті жергілікті директорияға сәйкес жаңарту командасының мысалы)}

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

## {heading(Бакетті жою)[id=s3-instructions-manage-bucket-delete]}

{ifdef(public)}

{note:warn}
Backup сақтау класы бар бакетті жоюға болмайды. Ондағы объектілерді резервтік көшіру сервисі арқылы жоюға болады.
{/note}

{/ifdef}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Бұл топтық операция: қажет болған жағдайда жалаушалар арқылы таңдап, бірден бірнеше бакетті жоюға болады.

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. Егер бұған дейін жасалмаған болса, жойылатын бакеттен {linkto(../../objects/manage-object#s3-instructions-manage-object-delete)[text=объектілерді жойыңыз]}.
1. Бакетті келесі тәсілдердің бірімен жойыңыз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Жою** тармағын таңдаңыз.
   - Бакетті жалаушамен таңдап, содан кейін ![trash-icon](../../../assets/trash-icon.svg "inline") **Жою** түймесін басыңыз.

1. Жоюды растаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

1. Жобаңыз ашылған файл менеджері панелінде қажетті бакетті таңдап, тінтуірдің оң жақ батырмасымен контекстік мәзірді ашыңыз. Контекстік мәзірде **Delete** тармағын таңдаңыз.
1. Содан кейін диалог терезесінде **Yes** түймесін басып, жоюды растаңыз.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - (Қосымша) `force` — бакетті және ондағы барлық объектілерді жояды. Бұл параметрсіз бакет тек объектілер болмаса ғана жойылады.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
     {/ifdef}

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

Бакетті жою командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html) қолжетімді.

{/tab}

{/tabs}
