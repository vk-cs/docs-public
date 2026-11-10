# {heading(Версиялау арқылы жойылған нысандарды қалпына келтіру)[id=versioning-restore]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} қызметінің көмегімен бакеттегі деректерді кездейсоқ жою мен рұқсат етілмеген өзгертулерден қорғауға болады. Ол үшін {linkto(../../concepts/versioning#s3-concepts-versioning)[text=версиялау]} қолданылады — бұл нысан қайта жазылғанда немесе жойылғанда оның барлық нұсқаларын сақтайтын механизм. Нысан қате жойылған жағдайда оны алдыңғы нұсқасынан қалпына келтіруге болады.

Версиялау ransomware-шабуылдарынан қорғануға да көмектеседі: тіпті шабуылдаушы деректерді шифрласа немесе жойса да, түпнұсқа нұсқалары бакетте қолжетімді болып қалады.

Мысал үшін келесі деректер қолданылады:

- Бакет атауы — `versioning-test-bucket`.
- Нысан кілті — `report.txt`.
- Қосылуға арналған хост атауы — `https://hb.ru-msk.vkcloud-storage.ru` (Мәскеу өңірі үшін).

## {heading(Дайындық қадамдар)[id=versioning-restore-prepare]}

1. {var(s3)} қызметі үшін аккаунт жасаңыз, егер бұрын жасалмаса:
   1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).
   1. Жобаны таңдаңыз.
   1. **Object Storage** → **Аккаунтар** бөліміне өтіңіз.
   1. **Аккаунт қосу** немесе **Қосу** түймесін басыңыз.
   1. Аккаунт атауын белгілеңіз.
   1. **Жасау** түймесін басыңыз.
   1. Ашылған терезеде қолжетімділік кілтінің идентификаторын (**Access Key ID**) және құпия кілтті (**Secret Key**) көшіріп сақтаңыз.

      {note:warn}
      Терезе жабылғаннан кейін құпия кілтті қалпына келтіру мүмкін болмайды. Егер кілт жоғалса, жаңасын жасаңыз.
      {/note}

1. [AWS CLI](../../../../tools-for-using-services/cli/aws-cli) орнатылып, жасалған {var(s3)} аккаунтымен жұмыс істеуге бапталғанына көз жеткізіңіз.
1. `versioning-test-bucket` атауымен бакет {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жасаңыз]}.

## {heading(1. Бакеттің версиялауын қосыңыз)[id=versioning-restore-step1]}

`versioning-test-bucket` бакеті үшін версиялауды қосыңыз, команданы орындау арқылы:

```console
aws s3api put-bucket-versioning \
  --bucket versioning-test-bucket \
  --versioning-configuration Status=Enabled \
  --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
```

Версиялау қосылғаннан кейін бакеттегі нысандарды жүктеу, қайта жазу және жою операцияларының барлығы алдыңғы нұсқаларды сақтайтын болады. Әрбір нұсқаға бірегей идентификатор (`VersionId`) тағайындалады.

{note:info}
Версиялау бакеттегі барлық нысандарға қолданылады. Нысандардың барлық нұсқалары тарифтеленеді және қоймада орын алады. Сақталатын деректердің көлемін бақылау үшін өмірлік цикл ережелерін баптаңыз.
{/note}

## {heading(2. Бакетке тесттік нысанды жүктеңіз)[id=versioning-restore-step2]}

1. `report.txt` мәтіндік файлын жасап, оны бакетке жүктеңіз:

    ```console
    echo "Version 1" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Файлдың жаңа нұсқасын жүктеп, нысанды қайта жазыңыз:

    ```console
    echo "Version 2" > report.txt
    aws s3 cp report.txt s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Бакетте нысанның екі нұсқасы да сақталғанын тексеріңіз:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Команда шығысының мысалы)}

    ```json
    {
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": true,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

Қалпына келтіру үшін қажетті нұсқаның идентификаторын (`VersionId`) сақтаңыз — ол қалпына келтіру кезінде керек болады.

## {heading(3. Нысанды жойып, жою маркерін жасалғанын тексеріңіз)[id=versioning-restore-step3]}

1. Нысанды бакеттен жойыңыз:

    ```console
    aws s3 rm s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    Версиялау қосылған кезде нысанды қарапайым жою оны физикалық түрде жоймайды. Оның орнына нысанды жойылған деп белгілейтін {linkto(../../concepts/versioning#s3-concepts-versioning-delete-marker)[text=жою маркері]} жасалады.

1. Жою маркері жасалғанын тексеріңіз:

    ```console
    aws s3api list-object-versions \
    --bucket versioning-test-bucket \
    --prefix report.txt \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    {cut(Команда шығысының мысалы)}

    ```json
    {
        "DeleteMarkers": [
            {
                "VersionId": "delete-marker-123",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:35:00.000Z",
                "IsLatest": true
            }
        ],
        "Versions": [
            {
                "VersionId": "1234567890.abcdef",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:30:00.000Z",
                "IsLatest": false,
                "Size": 10
            },
            {
                "VersionId": "0987654321.fedcba",
                "Key": "report.txt",
                "LastModified": "2024-01-15T10:25:00.000Z",
                "IsLatest": false,
                "Size": 10
            }
        ]
    }
    ```

    {/cut}

1. Нысан қарапайым сұрау кезінде қолжетімсіз екеніне көз жеткізіңіз:

    ```console
    aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(4. Жойылған нысанды қалпына келтіріңіз)[id=versioning-restore-step4]}

1. Нысанды қалпына келтіру үшін бакеттен қажетті нұсқаны көшіріңіз, оның идентификаторын `--version-id` параметрі арқылы көрсете отырып:

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt restored_report.txt \
    --version-id <НҰСҚА_ID> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

    Мұнда `<НҰСҚА_ID>` — `list-object-versions` командасының шығысынан алынған нысан нұсқасының идентификаторы.

1. Қалпына келтірілген файлдың мазмұнын тексеріңіз:

    ```console
    cat restored_report.txt
    ```

1. Нысанды тікелей бакетте қалпына келтіру үшін (қалпына келтірілген нұсқаны ағымдағы ету үшін) қажетті нұсқаны бакетке қайта көшіріңіз:

    ```console
    aws s3 cp s3://versioning-test-bucket/report.txt s3://versioning-test-bucket/report.txt \
    --version-id <НҰСҚА_ID> \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(5. Ескі нұсқаларды автоматты тазалауды баптаңыз)[id=versioning-restore-step5]}

Версиялауды ұзақ уақыт пайдаланған кезде нысандардың нұсқаларының саны өседі, бұл сақтау шығындарын арттырады. Ескірген нысандарды автоматты жою үшін бакет үшін {linkto(../../concepts/lifecycleg#s3-concepts-lifecycle-config)[text=өмірлік цикл ережелерін]} баптаңыз.

1. Өмірлік цикл конфигурациясы бар `lifecycle.json` файлын жасаңыз:

    ```json
    {
    "Rules": [
        {
        "ID": "Expire old objects",
        "Status": "Enabled",
        "Filter": {
            "Prefix": ""
        },
        "NoncurrentVersionExpiration": {
            "NoncurrentDays": 30,
            "NewerNoncurrentVersions": 50
        }
        }
    ]
    }
    ```

    Мұнда:

    - `NoncurrentDays` — нысанның өзекті емес нұсқасы сақталатын күндер саны, олар өткеннен кейін бұл нұсқа жойылады.
    - `NewerNoncurrentVersions` — сақталатын нысанның өзекті емес нұсқаларының саны. Көрсетілген шекке жеткенде нысанның ескі нұсқалары автоматты түрде жойылады. `NoncurrentDays`-пен бірге қолданғанда өзекті емес нұсқа екі шекке де жеткенде ғана жойылады.

1. Өмірлік цикл конфигурациясын бакетке қолданыңыз:

    ```console
    aws s3api put-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --lifecycle-configuration file://lifecycle.json \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

1. Конфигурация қолданылғанын тексеріңіз:

    ```console
    aws s3api get-bucket-lifecycle-configuration \
    --bucket versioning-test-bucket \
    --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
    ```

## {heading(Жұмыс істеуін тексеріңіз)[id=versioning-restore-check]}

1. Қалпына келтірілген нысан бакетте қолжетімді екеніне көз жеткізіңіз:

   ```console
   aws s3 ls s3://versioning-test-bucket/report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

1. Нысанды жүктеп алып, оның мазмұнын тексеріңіз:

   ```console
   aws s3 cp s3://versioning-test-bucket/report.txt downloaded_report.txt --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   cat downloaded_report.txt
   ```

   Файлдың мазмұны қалпына келтірілген нұсқаға сәйкес болуы тиіс.

1. Өмірлік цикл конфигурациясы қолданылғанына көз жеткізіңіз:

   ```console
   aws s3api get-bucket-lifecycle-configuration \
     --bucket versioning-test-bucket \
     --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=versioning-restore-delete]}

Жасалған ресурстар {linkto(../../tariffication#s3-tariffication)[text=тарифтеледі]}. Егер олар сізге енді қажет болмаса:

1. Бакеттен нысандардың барлық нұсқалары мен Delete Markers-ды қоса {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=нысандарды жойыңыз]}.
1. Бакетті {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=жойыңыз]}.