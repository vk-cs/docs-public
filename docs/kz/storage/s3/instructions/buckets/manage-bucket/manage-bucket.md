# {heading(Бакетті басқару)[id=s3-instructions-manage-bucket]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Бакеттер тізімін көру)[id=s3-instructions-manage-bucket-view]}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз. Жобадағы бакеттер тізімі ашылады.
1. (Қалауыңыз бойынша) Тізімді бакет аты бойынша сұрыптаңыз, сәйкес бағанның тақырыбындағы жебелерді пайдаланып.

   - Өсу реті бойынша сұрыптау тәртібі: `a`–`z` / `-` / `.` / `0`–`9`.
   - Кему реті бойынша сұрыптау тәртібі: `9`–`0` / `.` / `-` / `z`–`a`.

   {note:warn}
   Сұрыптау тізімнің толық көлеміне емес, тек экранға шығарылған бөлігіне ғана әсер етеді.
   {/note}

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файлдық менеджер)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файлдық менеджерін пайдаланамыз. Егер сіз басқа файлдық менеджерді пайдалансаңыз, оның интерфейсі мен элементтерінің атаулары осы нұсқаулықта қолданылғаннан өзгеше болуы мүмкін.
{/note}

{var(s3)} бакеттерінің қасиеттерін, соның ішінде нұсқаларды басқару параметрлерін, тегтерді, әдепкі шифрлауды, журнал жүргізуді, хабарландыруларды және т.б. көруге және баптауға болады.

Файлдық менеджер көмегімен бакет қасиеттерін көру үшін мына әрекеттерді орындаңыз:

1. Жобаңыз ашылған файлдық менеджер панелінде қажетті бакетті таңдап, тінтуірдің оң жақ батырмасымен контекстік мәзірді шақырыңыз. Контекстік мәзірден **Properties** тармағын таңдаңыз.
1. Ашылған терезеде бакеттің қасиеттерін көруге болады.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консолда команданы орындаңыз:

   ```console
   aws s3 ls --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Бакеттер тізімін көру командасының мысалы)}

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

1. Әлі орнатылмаған болса, Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және баптаңыз.
1. Бұрын жасалмаса, {var(s3)} қосылым деректерін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қоршаған орта айнымалыларына]} немесе баптау файлына қосыңыз.
1. Өз жобаңызға код қосыңыз:

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
	   defaultRegion = "ru-msk"
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
   `vkCloudHotboxEndpoint` және `defaultRegion` айнымалыларының мәндері аккаунттың [өңіріне](../../../../../tools-for-using-services/account/concepts/regions) сәйкес болуы тиіс:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
      - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.

   - `defaultRegion`:

      - `ru-msk` — Мәскеу өңірі үшін;
      - `kz-ast` — Қазақстан өңірі үшін.
   {/ifdef}

`ListBuckets` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Әлі орнатылмаған болса, Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және баптаңыз.
1. Бұрын жасалмаса, {var(s3)} қосылым деректерін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=қоршаған орта айнымалыларына]} немесе баптау файлына қосыңыз.
1. Өз жобаңызға код қосыңыз:

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
   `endpoint_url` айнымалысының мәні аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

   - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
   - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
   {/ifdef}

`list_buckets` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html) толық сипатталған.

{/tab}

{/tabs}

## {heading(Бакеттің нұсқаларын басқаруды баптау)[id=s3-instructions-manage-bucket-versioning]}

{var(s3)} бакет нысандарының {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқаларын басқаруды]} қосуға мүмкіндік береді, бұл өзгерістер тарихын сақтауға және кездейсоқ жою немесе қайта жазудан қорғануға мүмкіндік береді.

{note:warn}
Нұсқаларды басқаруды қосқаннан кейін оны өшіру мүмкін емес, тек уақытша тоқтатуға болады.
{/note}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет баптауларына мына тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атын басып, бакет бетінде ![ ](../../../assets/settings-icon.svg "inline") батырмасын басыңыз.

1. **Нұсқаларды басқару** қойындысына өтіңіз.
1. Қосқыш көмегімен нұсқаларды басқаруды қосыңыз немесе уақытша тоқтатыңыз.

   Нысандарды блоктау қосылған болса, бакеттің нұсқаларын басқаруды тоқтатуға болмайды.

{/tab}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консольді ашып, қажетті әрекетті орындаңыз:

   {tabs}

   {tab(Қосу)}

   ```console
   aws s3api put-bucket-versioning \
      --bucket <ИМЯ_БАКЕТА> \
      --versioning-configuration Status=Enabled \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нұсқаларды басқару күйін өзгерту қажет бакеттің аты.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Нұсқаларды басқаруды қосу командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api put-bucket-versioning \
      --bucket my-bucket \
      --versioning-configuration Status=Enabled \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {tab(Уақытша тоқтату)}

   ```console
   aws s3api put-bucket-versioning \
      --bucket <ИМЯ_БАКЕТА> \
      --versioning-configuration Status=Suspended \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нұсқаларды басқару күйін өзгерту қажет бакеттің аты.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Нұсқаларды басқаруды уақытша тоқтату командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3api put-bucket-versioning \
      --bucket my-bucket \
      --versioning-configuration Status=Suspended \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Команда жауап шығармайды.

   {/cut}

   {/tab}

   {tab(Күйді білу)}

   ```console
   aws s3api get-bucket-versioning \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - `<ИМЯ_БАКЕТА>` — нұсқаларды басқару күйін білу қажет бакеттің аты.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Команда мен жауаптың мысалы)}

   Команда мысалы:

   ```console
   aws s3api get-bucket-versioning \
      --bucket my-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```json
   {
       "Status": "Enabled"
   }
   ```

   Бакеттің нұсқаларын басқару ешқашан қосылмаған болса, жауапта `Status` өрісі болмайды.

   {/cut}

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Домен байланыстыру)[id=s3-instructions-manage-bucket-domain]}

Доменді бакетке байланыстыру бакет нысандарына сіздің доменіңіз арқылы қол жеткізуге, сонымен қатар бакетті сайтыңыздың репозиторийі ретінде пайдалануға мүмкіндік береді.

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

1. Бұрын жасалмаса, кез келген домендік атаулар регистраторында доменді тіркеп алыңыз. Үшінші деңгейдегі және одан жоғары домендерді ғана байланыстыруға болады, мысалы: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{ifdef(public)}

1. {var(cloud)} жеке кабинетына [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетына {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Бакет баптауларына мына тәсілдердің бірімен өтіңіз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") басып, **Баптаулар** тармағын таңдаңыз.
   - Қажетті бакеттің атын басып, бакет бетінде ![ ](../../../assets/settings-icon.svg "inline") батырмасын басыңыз.

1. **Домен** қойындысына өтіп, ![plus-icon](../../../assets/plus-icon.svg "inline") **Доменді байланыстыру** батырмасын басыңыз.
1. Ашылған терезеде `<ИМЯ_БАКЕТА>.<ENDPOINT_ДОМЕН>` түріндегі CNAME-жазба мәнін көшіріп алыңыз. Жазба мысалы: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Доменіңіздің провайдерінің жеке кабинетына өтіңіз. Доменіңіз үшін кез келген CNAME-жазбаны қосыңыз, жазба мәні ретінде көшірілген мәтінді қойыңыз.
1. Өзгерістер күшіне енгенін күтіңіз. Әдетте бұл 15–20 минутты алады.
1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетына қайта оралыңыз. **Домен** өрісінде доменіңіздің атын көрсетіңіз.

Байланыстыруғаннан кейін бакет `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>` түріндегі сілтеме арқылы қолжетімді болады, мысалы `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}
Егер бакет атында нүкте болса, ол тек HTTP хаттамасын пайдаланғанда ғана қолжетімді болады. HTTPS хаттамасын пайдалану үшін SSL-сертификат орнатыңыз.
{/note}

{ifdef(public)}

## {heading(CDN пайдалану)[id=s3-instructions-manage-bucket-cdn]}

{include(../../../_includes/_s3-create-cdn.md)[tags=s3_create_cdn_all,s3_create_cdn_s3]}

{/ifdef}

## {heading(Жергілікті каталогты бакетпен синхрондау)[id=s3-instructions-manage-bucket-sync]}

{var(s3)} бакет нысандарын жергілікті каталог файлдарымен синхрондауға мүмкіндік береді. Синхрондау кезінде {var(s3)} файлдың немесе нысанның бар-жоғын, олардың өлшемін және соңғы өзгеру күнін тексереді. Салыстыру команда немесе сұрау орындалған сәтте жүргізіледі. Командаға немесе сұрауға байланысты бакеттің немесе жергілікті каталогтың мазмұны жаңартылады.

{tabs}

{tab(AWS CLI)}

1. Әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және баптаңыз.
1. Консолда бакетпен синхрондау қажет жергілікті каталогқа өтіңіз.
1. Консолда команданы орындаңыз:

   - Жергілікті каталогты бакетке сәйкес жаңарту үшін:

     ```console
     aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <ENDPOINT_URL>
     ```
   - Бакетті жергілікті каталогқа сәйкес жаңарту үшін:

     ```console
     aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <ENDPOINT_URL>
     ```
       {ifdef(public)}
     - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

       - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
       - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
       {/ifdef}
       {ifdef(s3,s3-pdf)}
     - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
       {/ifdef}

   {cut(Жергілікті каталогты бакетке сәйкес жаңарту командасының мысалы)}

   Команда мысалы:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Жауап мысалы:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Бакетті жергілікті каталогқа сәйкес жаңарту командасының мысалы)}

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

## {heading(Бакетті өшіру)[id=s3-instructions-manage-bucket-delete]}

{ifdef(public)}

{note:warn}
Backup сақтау класы бар бакетті өшіруге болмайды. Оның құрамындағы нысандарды резервтік көшірмелеу қызметі арқылы өшіруге болады.
{/note}

{/ifdef}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Бұл топтық операция: қажет болған жағдайда бірнеше бакетті бірден өшіруге болады, оларды құсбелгілер арқылы таңдау арқылы.

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}

1. Қажетті бакет орналасқан жобаны таңдаңыз.
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. Өшіру қажет бакеттен бұрын өшілмеген болса, {linkto(../../objects/manage-object#s3-instructions-manage-object-delete)[text=нысандарды өшіріңіз]}.
1. Бакетті келесі тәсілдердің бірімен өшіріңіз:

   - Қажетті бакет үшін ![ ](../../../assets/more-icon.svg "inline") түймесін басып, **Өшіру** тармағын таңдаңыз.
   - Бакетті құсбелгі арқылы таңдап, содан кейін ![trash-icon](../../../assets/trash-icon.svg "inline") **Өшіру** түймесін басыңыз.

1. Өшіруді растаңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файлдық менеджер)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файлдық менеджерін қолданамыз. Егер сіз басқа файлдық менеджерді қолдансаңыз, оның интерфейсі және элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

1. Жобаңыз ашылған файлдық менеджер панелінде қажетті бакетті таңдап, тінтуірдің оң жақ батырмасымен контекстік мәзірді шақырыңыз. Контекстік мәзірде **Delete** тармағын таңдаңыз.
1. Содан кейін диалогтік терезеде **Yes** түймесін басып, өшіруді растаңыз.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатылмаған болса, орнатып, баптаңыз.
1. Консольде команданы орындаңыз:

   ```console
   aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <ENDPOINT_URL>
   ```

   Мұнда:

   - (Қалауыңыз бойынша) `force` — бакетті және оның ішіндегі барлық нысандарды өшіреді. Бұл параметрсіз бакет нысандар құрамаса ғана өшеді.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — {var(s3)} қызметінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

     - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
     - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.

     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің дәл форматын білу үшін әкімшіңізге хабарласыңыз.
     {/ifdef}

   {cut(Бакетті және оның ішіндегі барлық нысандарды өшіру командасының мысалы)}

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

Бакетті өшіру командасының барлық параметрлерінің сипаттамасы [AWS CLI ресми құжаттамасында](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html) қолжетімді.

{/tab}

{/tabs}