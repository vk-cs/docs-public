# {heading(Бакет құру)[id=s3-instructions-create-bucket]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Объекттерді сақтау орнына жүктеу үшін алдымен оларды орналастыруға арналған {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакет]} құру қажет.

Бакетті құратын пайдаланушының тіркелгісі бакетке және объектілерге толық қолжетімділік алады. Бакетке кез келген санддағы объектілерді жүктеуге болады.

{ifdef(public)}

{note:warn}
Бакет құру [тарифтенбейді](../../../tariffication). Объекттерді сақтау және жүктеп алу үшін қаражат алынады.
{/note}

{/ifdef}

{tabs}

{tab(Жеке кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app).

{/ifdef}

{ifdef(s3,s3-pdf)}

1. IAM Only жеке кабинетіне {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=кіріңіз]}.

{/ifdef}
1. **Object Storage** → **Бакеттер** бөліміне өтіңіз.
1. **Құру** түймесін басыңыз.
1. **Конфигурация** блогында:

    1. {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауын енгізіңіз.

        Бакет құрылғаннан кейін оның атауын өзгерту мүмкін болмайды.

    1. {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау сыныбын]} таңдаңыз. Бакет құрылғаннан кейін оны {linkto(../../change-storage-class#s3-instructions-change-storage-class)[text=өзгертуге]} болады.

1. **Версионирование и блокировка** блогында:

    1. (Қалауыңыз бойынша) Әр объектінің бірнеше {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=нұсқасын]} сақтау үшін **Версионирование объектов** опциясын қосыңыз. Версиялауды кейін өшіру мүмкін емес, тек тоқтатуға болады.
    1. (Қалауыңыз бойынша) Объекттерді {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=жоюдан және қайта жазудан қорғау]} үшін **Блокировка объектов** опциясын қосыңыз. Объекттерді блоктауды кейін өшіру мүмкін емес, бірақ конфигурацияны {linkto(../../../instructions/objects/object-lock#s3-instructions-object-lock)[text=өзгертуге]} болады.

        {note:info}

        {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=Объекттерді блоктау]} қосылған кезде бакетте {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=объекттерді версиялау]} автоматты түрде қосылады.

        {/note}

    1. (Қалауыңыз бойынша) **Блокировать объекты по умолчанию** опциясын қосыңыз және қажетті параметрлерді теңшеңіз:

        - **Қорғау режимі**:

            - `Governance`: оны айналып өту мүмкіндігі бар {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=басқарылатын блоктау режимі]}.
            - `Compliance`: белгіленген мерзім бітпей оны алып тастау мүмкіндігі жоқ {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=қатаң блоктау режимі]}.

        - **Сақтау мерзімі, күн**: блоктау әрекет ететін күндер саны.

    1. Егер бұрын **Блокировка объектов** опциясы қосылған болса, блоктауды қосуды растаңыз.

1. **Создать бакет** түймесін басыңыз.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файл менеджері)}

{note:warn}
Осы жерде және әрі қарай біз «CloudBerry Explorer for Amazon S3» файл менеджерін қолданамыз. Егер сіз басқа файл менеджерін қолдансаңыз, оның интерфейсі және элементтерінің атаулары осы нұсқаулықта қолданылғандардан өзгеше болуы мүмкін.
{/note}

Жаңа бакет құру үшін мына әрекеттерді орындаңыз:

1. Сіздің жобаңыз ашылған файл менеджері панелінде **New Bucket** түймесін басыңыз.
1. Содан кейін жаңа бакеттің атауын (мысалы, `new-bkt-1`) көрсетіп, **Ок** түймесін басыңыз.
1. Құрылған бакет сіздің жобаңыздың панелінде көрсетіледі.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Егер әлі орнатылмаған болса, {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} орнатыңыз және теңшеңіз.
1. Консольді ашып, команданы орындаңыз:

    ```console
    aws s3api create-bucket \
        --bucket <ИМЯ_БАКЕТА> \
        --endpoint-url <ENDPOINT_URL> \
        --region <КОД_РЕГИОНА>
    ```

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауы.

        Бакет құрылғаннан кейін оның атауын өзгерту мүмкін болмайды.

    {ifdef(public)}
    - `<ENDPOINT_URL>` — VK Object Storage сервисінің домені, тіркелгінің {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — сервис орнатылған кезде көрсетілген домендік атауы бар сілтеме.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — тіркелгінің аймақ коды, мысалы `ru-msk`{ifdef(public)} Мәскеу аймағы үшін. Қолжетімді мәндер {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=VK Object Storage сервисінің API сипаттамасында]} келтірілген{/ifdef}.

    Бакет құру командасының мысалы:

    ```console
    aws s3api create-bucket \
        --bucket my-bucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
        --region ru-msk
    ```

    Жауаптың мысалы:

    ```json
    {
        "Location": "/my-bucket"
    }  
    ```

{/tab}

{tab(Golang SDK)}

1. Егер әлі орнатылмаған болса, Go үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және теңшеңіз.
1. Өз жобаңызға кодты қосыңыз:

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

    Осы код мысалында `Hotbox` {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау сыныбы]} бар бакет құрылады.

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауы.

        Бакет құрылғаннан кейін оның атауын өзгерту мүмкін болмайды.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, тіркелгінің {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — тіркелгінің аймақ коды, мысалы `ru-msk`{ifdef(public)} Мәскеу аймағы үшін. Қолжетімді мәндер {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text={var(s3)} сервисінің API сипаттамасында]} келтірілген{/ifdef}.

    `CreateBucket` командасы [aws-sdk-go кітапханасының ресми құжаттамасында](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CreateBucket) толық сипатталған.

{/tab}

{tab(Python SDK)}

1. Егер әлі орнатылмаған болса, Python үшін {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} орнатыңыз және теңшеңіз.
1. Өз жобаңызға кодты қосыңыз:

    ```python
    import boto3
    session = boto3.session.Session()
    s3_client = session.client(
        service_name='s3',
        endpoint_url='<ENDPOINT_URL>',
        region_name="<КОД_РЕГИОНА>"
    )

    test_bucket_name = '<ИМЯ_БАКЕТА>'
    # Бакет құру
    s3_client.create_bucket(Bucket=test_bucket_name)
    ```

    Осы код мысалында `Hotbox` {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=сақтау сыныбы]} бар бакет құрылады.

    Мұнда:

    - `<ИМЯ_БАКЕТА>` — {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=ұсынылатын ережелерге]} сәйкес келетін бакет атауы.

        Бакет құрылғаннан кейін оның атауын өзгерту мүмкін болмайды.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — {var(s3)} сервисінің домені, тіркелгінің {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=аймағына]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу аймағының домені;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан аймағының домені.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — тіркелгінің аймақ коды, мысалы `ru-msk`{ifdef(public)} Мәскеу аймағы үшін. Қолжетімді мәндер {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text={var(s3)} сервисінің API сипаттамасында]} келтірілген{/ifdef}.

    `create_bucket` командасы [boto3 кітапханасының ресми құжаттамасында](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket) толық сипатталған.

{/tab}

{/tabs}