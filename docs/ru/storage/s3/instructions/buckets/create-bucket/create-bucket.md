# {heading(Создание бакета)[id=s3-instructions-create-bucket]}

Чтобы загружать объекты в хранилище, предварительно нужно создать {linkto(../../../concepts/about#s3-concepts-about-bucket)[text=бакет]} для их размещения.

Учетная запись пользователя, который создает бакет, получает полные права доступа к бакету и объектам. В бакет может быть загружено любое количество объектов.

{ifdef(public)}

{note:warn}
Создание бакета не [тарифицируется](../../../tariffication). Средства списываются за хранение и скачивание объектов.
{/note}

{/ifdef}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите кнопку **Создать**.
1. В блоке **Конфигурация**:

    1. Введите имя бакета, соответствующее {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.

        После создания бакета изменить его имя будет невозможно.

    1. Выберите {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения]}. Вы сможете {linkto(../../change-storage-class#s3-instructions-change-storage-class)[text=изменить]} его после создания бакета.

1. В блоке **Версионирование и блокировка**:

    1. (Опционально) Включите опцию **Версионирование объектов**, чтобы хранить несколько {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=версий]} каждого объекта. Отключить версионирование позже — нельзя, только приостановить.
    1. (Опционально) Включите опцию **Блокировка объектов** для {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=защиты объектов от удаления и перезаписи]}. Отключить блокировку объектов позже — нельзя, но можно {linkto(../../../instructions/objects/object-lock#s3-instructions-object-lock)[text=изменить]} конфигурацию.

        {note:info}

        При включении {linkto(../../../concepts/objects-lock#s3-concepts-object-lock)[text=блокировки объектов]} автоматически будет подключено {linkto(../../../concepts/versioning#s3-concepts-versioning)[text=версионирование объектов]} в бакете.

        {/note}

    1. (Опционально) Включите опцию **Блокировать объекты по умолчанию** и настройте необходимые параметры:

        - **Режим защиты**:

            - `Governance`: {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-governance)[text=управляемый режим блокировки]} с возможностью ее обхода.
            - `Compliance`: {linkto(../../../concepts/objects-lock#s3-concepts-object-lock-compliance)[text=строгий режим блокировки]} без возможности ее снятия до истечения установленного срока.

        - **Срок хранения, дни**: количество дней, которое действует блокировка.

    1. Подтвердите включение блокировки, если ранее была включена опция **Блокировка объектов**.

1. Нажмите кнопку **Создать бакет**.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

Чтобы создать новый бакет, выполните следующие действия:

1. На панели файлового менеджера, в которой открыт ваш проект, нажмите кнопку **New Bucket**.
1. Затем укажите имя нового бакета (например, `new-bkt-1`) и нажмите кнопку **Ок**.
1. Созданный бакет отображается на панели вашего проекта.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и выполните команду:

    {include(../../../_includes/_s3-manage-bucket.md)[tags=create_bucket,create_bucket_instruction]}

    Пример команды создания бакета:

    ```console
    aws s3api create-bucket \
        --bucket my-bucket \
        --endpoint-url https://hb.ru-msk.vkcloud-storage.ru \
        --region ru-msk
    ```

    Пример ответа:

    ```json
    {
        "Location": "/my-bucket"
    }  
    ```

{/tab}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте код в свой проект:

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

    В этом примере кода создается бакет с {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=классом хранения]} `Hotbox`.

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.

        После создания бакета изменить его имя будет невозможно.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — код региона аккаунта, например `ru-msk`{ifdef(public)} для региона Москва. Доступные значения приведены в {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=описании API сервиса {var(s3)}]}{/ifdef}.

    Команда `CreateBucket` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CreateBucket).

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте код в свой проект:

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

    В этом примере кода создается бакет с {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=классом хранения]} `Hotbox`.

    Здесь:

    - `<ИМЯ_БАКЕТА>` — имя бакета, соответствующее {linkto(../../../concepts/about#s3-concepts-about-bucket-naming)[text=рекомендуемым правилам]}.

        После создания бакета изменить его имя будет невозможно.     

    {ifdef(public)}
    - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
    {/ifdef}
    {ifdef(s3,s3-pdf)}
    - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
    {/ifdef}
    - `<КОД_РЕГИОНА>` — код региона аккаунта, например `ru-msk`{ifdef(public)} для региона Москва. Доступные значения приведены в {linkto(../../../../../tools-for-using-services/api/api-spec/s3-rest-api/intro#api-spec-s3-intro-auth)[text=описании API сервиса {var(s3)}]}{/ifdef}.

    Команда `create_bucket` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.create_bucket).

{/tab}

{/tabs}
