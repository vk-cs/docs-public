# {heading(Бакет жасау)[id=s3-instructions-create-bucket]}

{include(/kz/_includes/_translated_by_ai.md)}

Қоймаға объектілерді жүктеу үшін, оларды орналастыруға арналған {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакет]} алдын ала жасалуы керек.

Бакетті жасайтын пайдаланушының есептік жазбасы бакетке және объектілерге толық қол жеткізу құқықтарын алады. Бакетке объектілердің кез келген саны жүктелуі мүмкін.

{ifdef(public)}

{note:warn}
Бакет жасау [тарифтелмейді](../../../tariffication). Қаражат объектілерді сақтау және жүктеп алу үшін есептен шығарылады.
{/note}

{/ifdef}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.com/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}
1. **Объектілік қойма** → **Бакеттер** бөліміне өтіңіз.
1. **Жасау** түймесін басыңыз.
1. **Конфигурация** блогында:

    1. {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауын енгізіңіз.

        Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.

    1. {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класын]} таңдаңыз. Бакет жасалғаннан кейін оны {linkto(../../change-storage-class#s3-instructions-change-storage-class)[text=өзгерте]} аласыз.

1. **Нұсқалау және бұғаттау** блогында:

    1. (Қосымша) Әр объектінің бірнеше {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқасын]} сақтау үшін **Объектілерді нұсқалау** опциясын қосыңыз. Кейін нұсқалауды өшіру мүмкін емес — тек уақытша тоқтатуға болады.
    1. (Қосымша) {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=объектілерді жоюдан және қайта жазудан қорғау]} үшін **Объектілерді бұғаттау** опциясын қосыңыз. Кейін объектілерді бұғаттауды өшіру мүмкін емес, бірақ конфигурацияны {linkto(../../../instructions/objects/object-lock#s3-instructions-object-lock)[text=өзгертуге]} болады.

        {note:info}

        {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=объектілерді бұғаттау]} қосылған кезде бакетте {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=объектілерді нұсқалау]} автоматты түрде қосылады.

        {/note}

    1. (Қосымша) **Әдепкі бойынша объектілерді бұғаттау** опциясын қосып, қажетті параметрлерді баптаңыз:

        - **Қорғау режимі**:

            - `Governance`: оны айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын бұғаттау режимі]}.
            - `Compliance`: белгіленген мерзім аяқталғанға дейін оны алып тастау мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң бұғаттау режимі]}.

        - **Сақтау мерзімі, күн**: бұғаттау әрекет ететін күндер саны.

    1. Егер бұған дейін **Объектілерді бұғаттау** опциясы қосылған болса, бұғаттауды қосуды растаңыз.

1. **Бакет жасау** түймесін басыңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Мұнда және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, интерфейс және оның элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Жаңа бакет жасау үшін келесі әрекеттерді орындаңыз:

1. Жобаңыз ашылған файл менеджері панелінде **New Bucket** түймесін басыңыз.
1. Содан кейін жаңа бакеттің атауын (мысалы, `new-bkt-1`) көрсетіп, **Ок** түймесін басыңыз.
1. Жасалған бакет жобаңыздың панелінде көрсетіледі.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Консольді ашып, команданы орындаңыз:

    {include(../../../_includes/_s3-manage-bucket.md)[tags=create_bucket,create_bucket_instruction]}

    Бакет жасау командасының мысалы:

    ```console
    aws s3api create-bucket \
        --bucket my-bucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
        --region ru-msk
    ```

    Жауап мысалы:

    ```json
    {
        "Location": "/my-bucket"
    }  
    ```

{/tab}

{tab(Golang SDK)}

1. Егер Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
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
        vkCloudHotboxEndpoint = "<ENDPOINT_URL>"
        defaultRegion         = "<КОД_РЕГИОНА>"
    )

    func main() {
        // Создание сессии
        sess, _ := session.NewSession()

        // Подключение к сервису S3
        svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

        // Создание бакета
        bucket := "<ИМЯ_БАКЕТА>"

        if _, err := svc.CreateBucket(&s3.CreateBucketInput{
            Bucket: aws.String(bucket),
        }); err != nil {
            log.Fatalf("Unable to create bucket %q, %v", bucket, err)
        } else {
            log.Printf("Bucket with name %q created", bucket)
        }
    }
    ```

    Бұл код мысалында `Hotbox` {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класымен]} бакет жасалады.

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауы.

        Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — аккаунт өңірінің коды, мысалы `ru-msk`{ifdef(public)} Мәскеу өңірі үшін. Қолжетімді мәндер {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text={var(s3)} сервисінің API сипаттамасында]} келтірілген{/ifdef}.

    `CreateBucket` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CreateBucket) егжей-тегжейлі сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} әлі орнатылмаған болса, оны орнатып, баптаңыз.
1. Жобаңызға кодты қосыңыз:

    ```python
    import boto3
    session = boto3.session.Session()
    s3_client = session.client(
        service_name='s3',
        endpoint_url='<ENDPOINT_URL>',
        region_name="<КОД_РЕГИОНА>"
    )

    test_bucket_name = '<ИМЯ_БАКЕТА>'
    # Создание бакета
    s3_client.create_bucket(Bucket=test_bucket_name)
    ```

    Бұл код мысалында `Hotbox` {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класымен]} бакет жасалады.

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауы.

        Бакет жасалғаннан кейін оның атауын өзгерту мүмкін болмайды.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, аккаунттың {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірінің домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірінің домені.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік аты бар сілтеме. Атаудың форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — аккаунт өңірінің коды, мысалы `ru-msk`{ifdef(public)} Мәскеу өңірі үшін. Қолжетімді мәндер {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text={var(s3)} сервисінің API сипаттамасында]} келтірілген{/ifdef}.

    `create_bucket` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket) егжей-тегжейлі сипатталған.

{/tab}

{/tabs}