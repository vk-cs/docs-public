# {heading(AWS S3-дан VK Cloud объектілік қоймасына деректерді көшіру)[id=aws-s3-migration]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} сервисінің көмегімен AWS S3-тан деректерді көшіруге болады, бұл сақтау шығындарын азайтады және жеткізушіге тәуелділіктен (Vendor Lock-in) құтылуды қамтамасыз етеді. Көшіру AWS CLI немесе rclone құралдарымен орындалады, содан кейін деректердің тұтастығын тексеру және қосымшаларды жаңа эндпоинтқа ауыстыру жүзеге асырылады.

Мысал ретінде кейіннен мына деректер қолданылады:

- **Дереккөз:** AWS S3-тағы `my-aws-bucket` бакеті, `us-east-1` аймағы.
- **Мақсат:** {var(s3)}-тағы `my-vk-bucket` бакеті, `ru-msk` аймағы.
- **Дереккөзге арналған AWS CLI профилі:** `aws-source`.
- **Мақсатқа арналған AWS CLI профилі:** `vk-dest`.
- **{var(s3)} эндпоинті:** `https://hb.ru-msk.vkcloud-storage.ru`.

Сынақ мәндерін өзіңіздің нақты деректеріңізбен ауыстырыңыз.

## {heading(Дайындық қадамдар)[id=aws-s3-migration-prepare]}

1. {var(s3)} сервисіне арналған аккаунт жасаңыз, егер бұрын жасалмаса:
   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
   1. Жобаны таңдаңыз.
   1. **Object Storage** → **Аккаунтар** бөліміне өтіңіз.
   1. **Аккаунт қосу** немесе **Қосу** түймесін басыңыз.
   1. Аккаунт атауын енгізіңіз.
   1. **Жасау** түймесін басыңыз.
   1. Ашылған терезеде қол жеткізу кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп сақтаңыз.

      {note:warn}
      Терезе жабылғаннан кейін құпия кілтті қалпына келтіру мүмкін болмайды. Егер кілт жоғалса, жаңасын жасаңыз.
      {/note}

1. [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) орнатылып, жасалған {var(s3)} аккаунтымен жұмыс істеуге бапталғанына көз жеткізіңіз.
1. (Қалауыңыз бойынша) Көшіру үшін AWS CLI орнына rclone қолдануды жоспарласаңыз, [rclone](https://rclone.org/install/) орнатыңыз.

## {heading(1. Көшіру стратегиясын таңдаңыз)[id=aws-s3-migration-strategy]}

Көшірудің екі стратегиясы қолжетімді:

- **Big Bang** — деректерді бір рет өткізумен толық көшіру, содан кейін барлық қосымшаларды жаңа эндпоинтқа ауыстыру. Аз көлемдегі деректер немесе тоқтау уақытына рұқсат етілген жүйелерге жарамды. Көшіру басталғаннан кейін бастапқы бакеттегі өзгерістерді қайта көшіру қажет.
- **Кезең-кезеңмен көшіру (Dual write)** — қосымшалар деректерді екі қоймаға да параллель жазады, ал фондық процесс тарихи деректерді көшіреді. Көшіру аяқталғаннан кейін қосымшалар {var(s3)}-қа ауыстырылады. Тоқтау уақытына рұқсат етілмейтін жүйелер мен үлкен көлемдегі деректерге жарамды.

{note:info}
Кезең-кезеңмен көшіру кезінде қосымшалар екі қоймаға да бір мезгілде жазуды қолдауы қажет. Егер бұл мүмкін болмаса — Big Bang стратегиясын қолданыңыз.
{/note}

Әрі қарай `aws s3 sync` көмегімен Big Bang стратегиясы бойынша көшіру қарастырылады. Кезең-кезеңмен көшіру үшін сол құралды қолданыңыз, бірақ қосымшалар толық ауыстырылғанша синхронизацияны қайта-қайта іске қосыңыз.

## {heading(2. Дереккөз бен мақсат үшін AWS CLI профильдерін баптаңыз)[id=aws-s3-migration-profiles]}

`aws s3 sync` көмегімен көшіру үшін екі AWS CLI профилі қажет: біреуі AWS S3-тан оқуға, екіншісі {var(s3)}-қа жазуға.

1. AWS S3-қа қолжетімділік үшін `aws-source` профилін баптаңыз, егер ол бұрын бапталмаса:

   ```console
   aws configure --profile aws-source
   ```

   Мәндерді енгізіңіз:

   - `AWS Access Key ID` — AWS S3-қа қолжетімділік кілті.
   - `AWS Secret Access Key` — AWS S3 құпия кілті.
   - `Default region name` — AWS S3 аймағы, мысалы `us-east-1`.
   - `Default output format` — `json`.

1. {var(s3)}-қа қолжетімділік үшін `vk-dest` профилін баптаңыз:

   ```console
   aws configure --profile vk-dest
   ```

   Мәндерді енгізіңіз:

   - `AWS Access Key ID` — бұрын сақталған {var(s3)} аккаунтының кілт идентификаторы (**Access Key ID**).
   - `AWS Secret Access Key` — бұрын сақталған {var(s3)} аккаунтының құпия кілті (**Secret Key**).
   - `Default region name` — `ru-msk`.
   - `Default output format` — `json`.

1. Екі қоймаға да қолжетімділікті тексеріңіз:

   ```console
   aws s3 ls --profile aws-source
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest
   ```

   Бірінші команда AWS S3 бакеттерінің тізімін, екіншісі {var(s3)} бакеттерінің тізімін шығаруы қажет.

## {heading(3. VK Cloud-та мақсатты бакетті жасаңыз)[id=aws-s3-migration-create-bucket]}

{linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Бакетті жасаңыз]} — `my-vk-bucket` {var(s3)}-та жеке кабинет арқылы немесе AWS CLI көмегімен:

```console
aws s3api create-bucket \
    --bucket my-vk-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
    --region ru-msk \
    --profile vk-dest
```

{note:warn}
Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.
{/note}

## {heading(4. Деректерді көшіруді орындаңыз)[id=aws-s3-migration-sync]}

{tabs}

{tab(AWS CLI)}

`aws s3 sync` командасы объектілерді бастапқы бакеттен мақсатты бакетке көшіреді, ETag және өлшемі сәйкес келетін бұрын көшірілген файлдарды өткізіп жібереді.

1. Синхронизацияны орындаңыз:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   Мұнда:

   - `s3://my-aws-bucket` — AWS S3-тың бастапқы бакеті.
   - `s3://my-vk-bucket` — {var(s3)}-тың мақсатты бакеті.
   - `--source-region us-east-1` — дереккөз аймағы.
   - `--region ru-msk` — мақсат аймағы.
   - `--endpoint-url` — {var(s3)} эндпоинті.
   - `--profile vk-dest` — {var(s3)}-қа қолжетімділік кілттері бар профиль.

   {note:info}
   `aws s3 sync` командасы екі бакетке де қолжетімділік үшін `vk-dest` профилін қолданады. AWS S3-тан оқу үшін `--profile` көрсетілмесе, әдепкі профиль қолданылады. Егер AWS S3 үшін бөлек профиль қажет болса, алдымен деректерді жергілікті түрде көшіріңіз немесе rclone қолданыңыз.
   {/note}

1. Синхронизацияның аяқталуын күтіңіз. Үлкен көлемдегі деректер үшін процесс айтарлықтай уақыт алуы мүмкін.

{/tab}

{tab(rclone)}

1. rclone баптаңыз, конфигурация файлын жасап немесе өңдеп:

   ```console
   rclone config
   ```

1. Екі remote қосыңыз: AWS S3 үшін `aws-source` және {var(s3)} үшін `vk-dest`. Конфигурация мысалы:

   ```ini
   [aws-source]
   type = s3
   provider = AWS
   access_key_id = <AWS_ACCESS_KEY>
   secret_access_key = <AWS_SECRET_KEY>
   region = us-east-1

   [vk-dest]
   type = s3
   provider = Other
   access_key_id = <VK_ACCESS_KEY>
   secret_access_key = <VK_SECRET_KEY>
   endpoint = https://hb.ru-msk.vkcloud-storage.ru
   region = ru-msk
   ```

   Мұнда `<AWS_ACCESS_KEY>`, `<AWS_SECRET_KEY>` — AWS S3-қа қолжетімділік кілттері, `<VK_ACCESS_KEY>`, `<VK_SECRET_KEY>` — {var(s3)}-қа қолжетімділік кілттері.

1. Көшіруді орындаңыз:

   ```console
   rclone copy aws-source:my-aws-bucket vk-dest:my-vk-bucket --progress
   ```

1. Көшірудің аяқталуын күтіңіз.

{/tab}

{/tabs}

## {heading(5. Көшірілген деректердің тұтастығын тексеріңіз)[id=aws-s3-migration-validate]}

Көшіру аяқталғаннан кейін барлық объектілер дұрыс көшірілгеніне көз жеткізіңіз.

1. Бастапқы және мақсатты бакеттердегі объектілер санын салыстырыңыз:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "KeyCount" --output text
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "KeyCount" --output text
   ```

   Мәндер сәйкес келуі қажет.

1. Объектілердің ETag (checksum) мәндерін салыстырыңыз. Екі бакеттен де объектілер тізімін алыңыз:

   ```console
   aws s3api list-objects-v2 --bucket my-aws-bucket --profile aws-source --query "Contents[*].[Key,ETag,Size]" --output text > aws-objects.txt
   aws s3api list-objects-v2 --bucket my-vk-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru --profile vk-dest --query "Contents[*].[Key,ETag,Size]" --output text > vk-objects.txt
   ```

1. Алынған файлдарды салыстырыңыз:

   ```console
   diff aws-objects.txt vk-objects.txt
   ```

   Егер шығу бос болса — барлық объектілер дұрыс көшірілген. Егер айырмашылықтар болса, синхронизацияны қайталап орындаңыз:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

   {note:warn}
   Құрама жүктеумен (multipart upload) жүктелген объектілердің ETag мәні AWS S3 пен {var(s3)} арасында өзгеше болуы мүмкін. Мұндай объектілер үшін объектінің өлшемін және кілтін салыстырыңыз, ал тұтастықты толық тексеру үшін жүкті алып, бақылау сомасын жергілікті түрде есептеуді қолданыңыз.
   {/note}

## {heading(6. Қосымшаларды жаңа эндпоинтқа ауыстырыңыз)[id=aws-s3-migration-switch]}

1. {var(s3)} эндпоинтын қолдану үшін қосымшалардың конфигурациясын жаңартыңыз:

   - **Endpoint URL:** `https://hb.ru-msk.vkcloud-storage.ru`
   - **Region:** `ru-msk`
   - **Access Key ID** және **Secret Key** — {var(s3)} аккаунтының кілттері.
   - **Bucket name:** `my-vk-bucket`

1. Егер қосымшалар бакетке домен атауы арқылы қол жеткізсе, DNS-жазбаларды жаңартыңыз. Публикті объектілер үшін `https://<БАКЕТ_АТАУЫ>.hb.ru-msk.vkcloud-storage.ru/<ОБЪЕКТ_КІЛТІ>` форматындағы URL қолданыңыз.

1. Егер Dual write стратегиясы қолданылса, қосымшалардың {var(s3)}-пен дұрыс жұмыс істеуі расталғаннан кейін AWS S3-қа жазуды тоқтатыңыз.

1. Негізгі көшіруден кейін өзгертілген объектілерді көшіру үшін соңғы синхронизацияны орындаңыз:

   ```console
   aws s3 sync s3://my-aws-bucket s3://my-vk-bucket \
       --source-region us-east-1 \
       --region ru-msk \
       --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
       --profile vk-dest
   ```

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=aws-s3-migration-delete]}

Көшіру аяқталғаннан және қосымшалардың {var(s3)}-пен дұрыс жұмыс істеуі расталғаннан кейін AWS документациясына сәйкес AWS S3-тағы деректер мен бакетті жойыңыз.

{var(s3)}-тағы бакет және оған жүктелген объектілер {linkto(../../tariffication#s3-tariffication)[text=тарифтеленеді]}. Егер олар сізге қажет болмаса:

1. {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Объектілерді жойыңыз]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Бакетті жойыңыз]}.

{note:warn}
Қосымшалар толық ауыстырылғанша және олардың {var(s3)}-пен жұмыс істеуі расталғанша AWS S3-тағы деректерді жоймаңыз.
{/note}