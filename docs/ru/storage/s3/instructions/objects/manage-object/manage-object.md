# {heading(Управление объектами в бакете)[id=s3-instructions-manage-object]}

## {heading(Просмотр списка объектов)[id=s3-instructions-manage-object-list]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя бакета. Откроется список объектов в бакете.
1. (Опционально) Отсортируйте список по имени объекта, используя стрелки в заголовке соответствующего столбца.

   - Порядок при сортировке по возрастанию:  `A`–`Z` / `a`–`z` / `A`–`Я` / `а`–`я` / спецсимволы по возрастанию ASCII-значений / `0`–`9`.
   - Порядок при сортировке по убыванию:  `9`–`0` / спецсимволы по убыванию ASCII-значений / `я`–`а` / `Я`–`А` / `z`–`a` / `Z`–`A`.

   {note:warn}
   Сортировка действует не на весь список целиком, а только на ту его часть, которая выведена на экран.
   {/note}

{/tab}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3 ls s3://<ИМЯ_БАКЕТА>/<ПУТЬ>/ --recursive --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя целевого бакета.
   - `<ПУТЬ>` — путь до директории. Укажите путь, чтобы вывести список объектов, расположенных в определенной директории. Пример: если у вас есть доступ только к объектам, расположенным в определенной директории.
   - `--recursive` — параметр, при использовании которого команда выполнится для всех объектов, расположенных в бакете или в указанной директории.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

  {cut(Пример команды просмотра списка объектов)}

  Пример команды:

  ```console
  aws s3 ls s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
  ```

  Пример ответа:

  ```console
                                PRE folder/
  2023-09-27 11:45:05     421326 picture-1.jpg
  2023-09-27 11:47:37       2713 picture-2.png
  2023-09-27 11:48:37       2662 picture-3.png
  2023-09-27 10:31:02      48314 picture-4.png
  2023-09-27 11:48:56        361 delete-picture.png
  ```

  {/cut}

Описание доступных параметров для команды просмотра списка объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значения переменных `vkCloudHotboxEndpoint` и `defaultRegion` должны соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

   - `defaultRegion`:

      - `ru-msk` — для региона Москва;
      - `kz-ast` — для региона Казахстан.
   {/ifdef}

   Команда `ListObjectsV2` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2).

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3',endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   test_bucket_name = 'boto3-test-bucket-name'

   for key in s3_client.list_objects(Bucket=test_bucket_name) ['Contents']:
   print(key['Key'])
   ```
   {ifdef(public)}
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}

   Команда `list_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.list_objects).

{/tab}

{/tabs}

## {heading(Просмотр свойств объекта)[id=s3-instructions-manage-object-view]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя бакета.
1. Нажмите на имя объекта. Откроется страница его свойств:

   - **Название** — имя объекта.
   - **Размер** — размер объекта.
   - **Владелец объекта** — {ifndef(s3,s3-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=идентификатор проекта]}{/ifndef}{ifdef(s3,s3-pdf)}идентификатор проекта{/ifdef}, к которому относится объект.
   - **Класс хранения** — {linkto(../../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения объекта]}.
   - **Дата создания** — дата и время добавления объекта в бакет.
   - **Дата изменения** — дата и время последнего изменения объекта.
   - **Ссылка на объект** — ссылка на скачивание объекта. Ссылку можно скопировать, нажав на значок ![Копировать](assets/copy-icon.svg "inline") справа от нее.
   - **ETag** — контрольная сумма объекта, используемая для проверки его целостности при {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=составной загрузке]}. Контрольную сумму можно скопировать, нажав на значок ![Копировать](assets/copy-icon.svg "inline") справа от нее.
   - **Доступ к файлу** — {linkto(../../../concepts/access/s3-acl#s3-concepts-acl)[text=список управления доступом (ACL)]} назначенный объекту.

{/tab}

{/tabs}

## {heading(Скачивание объекта)[id=s3-instructions-manage-object-download]}

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объект с помощью флажка и нажмите кнопку **Скачать**.
   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для объекта и выберите пункт **Скачать файл**.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

На левой панели вашего файлового менеджера откройте папку в вашей операционной системе, в которую вы планируете загрузить файл. На правой панели файлового менеджера откройте {var(s3)} и перейдите в нужный бакет.

На правой панели файлового менеджера найдите файл, который вы планируете скачать из бакета и с помощью мыши перетащите его на левую панель. Таким образом вы загрузите копию файла из бакета.

Или используйте кнопки в правой панели файлового менеджера **Copy** или **Move**. Для этого выделите нужный файл или группу файлов и нажмите соответсвующую кнопку. Функция «Copy» загружает копию файла из бакета, функция «Move» перемещает файл из бакета. Исходный файл в бакете удалится.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. Откройте консоль и перейдите в директорию, в которую нужно скачать объект.
1. Выполните команду:

   {include(../../../_includes/_s3-manage-object.md)[tags=get_object]}

   {cut(Пример команды скачивания объекта)}

   Пример команды:

   ```console
   aws s3api get-object \
      --bucket my-bucket \
      --key folder/my-object.exe \
        uploaded-file.exe \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

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

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значения переменных `vkCloudHotboxEndpoint` и `defaultRegion` должны соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

   - `defaultRegion`:

      - `ru-msk` — для региона Москва;
      - `kz-ast` — для региона Казахстан.
   {/ifdef}
   
   Команда `GetObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject).

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.get_object(Bucket='boto3-bucket-name-test', Key='object_name.txt')
   print(response)
   print(response['Body'].read())
   ```
   {ifdef(public)}
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}
   
   Команда `get_object` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.get_objects).

{/tab}

{/tabs}

## {heading(Изменение уровня доступа к объекту)[id=s3-instructions-manage-object-access]}

Загруженные в бакет объекты по умолчанию имеют уровень доступа `private`, то есть их можно скачать только:

- в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef};
- через CLI, API, SDK и файловые менеджеры, если есть {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=ключи доступа к бакету или аккаунту]}.

Вы можете изменить уровень доступа объекта, чтобы сделать его доступным сторонним пользователям. Уровни доступа соответствуют {linkto(../../../concepts/access/s3-acl#s3-concepts-acl-pre-set)[text=стандартным ACL]}. По умолчанию можно установить уровни:

- `private` — полные права при наличии {linkto(../../../concepts/access/account-and-keys#s3-concepts-account-and-keys)[text=ключей доступа к бакету или аккаунту]}, всем остальным объект недоступен;
- `public-read` — полные права при наличии ключей, остальным пользователям {var(s3)} и сторонним пользователям объект доступен только для чтения;
- `authenticated-read` — полные права при наличии ключей, остальным пользователям {var(s3)} объект доступен только для чтения, сторонним пользователям объект недоступен.

Чтобы изменить уровень доступа к объекту:

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объекты или директории с помощью флажков и нажмите кнопку **Доступ**.
   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для объекта и выберите пункт **Доступ к файлу**.
   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для директории и выберите пункт **Доступ к файлам в папке**.

1. В поле **Настройка ACL** выберите настройку доступа и нажмите **Сохранить изменения**. При выборе `public-read` или `authenticated-read` после сохранения изменений появится ссылка на доступ к объекту.
1. Скопируйте ссылку и закройте окно настройки доступа.
1. Отправьте ссылку пользователям или разместите ее на стороннем ресурсе для прямого доступа к объекту.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду для изменения уровня доступа:

   {tabs}
   {tab(К одному объекту)}

   ```console
   aws s3api put-object-acl \
      --acl <НАСТРОЙКА_ACL> \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<НАСТРОЙКА_ACL>` — уровень доступа ACL. Если указанный уровень доступа не настроен в проекте, то объекту будет присвоен уровень доступа `private`.
   - `<ИМЯ_БАКЕТА>` — имя бакета, в котором находится нужный объект.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды настройки доступа к объекту)}

   ```console
   aws s3api put-object-acl \
      --acl public-read \
      --bucket my-bucket \
      --key picture.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   {/cut}

   Полное описание операции изменения ACL объекта доступно в [официальной документации AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-object-acl.html).

   {/tab}
   {tab(Ко всем объектам в бакете или в его директории)}

   ```console
   aws s3 cp s3://<ИМЯ_БАКЕТА>/<ПУТЬ>  s3://<ИМЯ_БАКЕТА>/<ПУТЬ> \
      --acl <НАСТРОЙКА_ACL> \
      --recursive \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, доступ к объектам в котором нужно изменить.
   - `<ПУТЬ>` — путь до директории, доступ к объектам в которой нужно изменить.
   - `<НАСТРОЙКА_ACL>` — уровень доступа ACL. Если указанный уровень доступа не настроен в проекте, то объекту будет присвоен уровень доступа `private`.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   Время модификации объектов обновится. Учитывайте это при управлении жизненным циклом (lifecycle) объектов и использовании условных запросов (`if-modified-since`).

   {cut(Пример команды настройки доступа к объекту)}

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

## {heading(Копирование объектов)[id=s3-instructions-manage-object-copy]}

Инструкция подходит для копирования объектов в пределах одного бакета или между бакетами одного проекта.

Операция копирования выполняется только для несоставных объектов, поэтому максимальный размер копируемого объекта ограничен 32 ГБ.

{tabs}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.

1. В консоли выполните команду:

   ```console
   aws s3 cp --recursive s3://<БАКЕТ_ИСТОЧНИК>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> s3://<БАКЕТ_ПРИЕМНИК>/<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `--recursive` — параметр, при использовании которого команда выполнится для всех объектов, расположенных в бакете или в указанной директории.
   - `<БАКЕТ_ИСТОЧНИК>` — имя бакета, из которого копируется объект.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — полное имя копируемого объекта или директории, из которой копируются объекты, включая путь до нее.
   - `<БАКЕТ_ПРИЕМНИК>` — имя бакета, в который копируется объект. Если имена совпадают, объект копируется в тот же бакет.
   - `<КЛЮЧ_ОБЪЕКТА_ПРИЕМНИКА>` — полное имя объекта или директории, в которую копируются объекты, включая путь до нее.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды копирования одного объекта в другой бакет)}

   Пример команды:

   ```console
   aws s3 cp s3://my-bucket/my-picture.png s3://my-another-bucket/my-picture.png \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   copy: s3://my-bucket/my-picture.png to s3://my-another-bucket/my-picture.png
   ```

   {/cut}

   {cut(Пример команды копирования всех объектов бакета в другой бакет)}

   Пример команды:

   ```console
   aws s3 cp --recursive s3://my-bucket s3://my-another-bucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   copy: s3://my-bucket/video.mp4 to s3://my-another-bucket/video.mp4
   copy: s3://my-bucket/pre/scheme.svg to s3://my-another-bucket/pre/scheme.svg
   copy: s3://my-bucket/picture.png to s3://my-another-bucket/picture.png
   copy: s3://my-bucket/example.txt to s3://my-another-bucket/example.txt
   ```

   {/cut}

Описание доступных параметров для команды копирования объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значения переменных `vkCloudHotboxEndpoint` и `defaultRegion` должны соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

   - `defaultRegion`:

      - `ru-msk` — для региона Москва;
      - `kz-ast` — для региона Казахстан.
   {/ifdef}

   Команда `CopyObject` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty).

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}

   Команда `copy` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.copy).

{/tab}

{/tabs}

## {heading(Маркировка объектов тегами)[id=s3-instructions-manage-object-tagging]}

### {heading(Просмотреть теги объекта)[id=s3-instructions-manage-object-tagging-view]}

{tabs}

{tab(AWS CLI)}

Чтобы проверить теги объекта, выполните команду `get-object-tagging`.

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api get-object-tagging \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, присвоенное ему при создании.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   Пример ответа:

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

### {heading(Скопировать объект с сохранением тегов)[id=s3-instructions-manage-object-tagging-copy]}

{tabs}

{tab(AWS CLI)}

Чтобы сохранить теги при копировании объекта, выполните команду `copy-object` с опцией `--tagging-directive COPY`.

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api copy-object \
      --copy-source <ИМЯ_БАКЕТА_ИСТОЧНИКА>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> \
      --bucket <ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ> \
      --key <КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ> \
      --tagging-directive COPY \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА_ИСТОЧНИКА>` — имя бакета, из которого нужно скопировать объект.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — полное имя копируемого объекта, включая путь до него.
   - `<ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ>` — имя бакета, в который нужно скопировать объект.
   - `<КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ>` — полное имя для копии объекта, включая путь до него. Следуйте {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=рекомендациям]} при выборе имен.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Скопировать объект с заменой тегов)[id=s3-instructions-manage-object-tagging-replace]}

{tabs}

{tab(AWS CLI)}

Чтобы заменить теги при копировании объекта, выполните команду `copy-object` с опцией `--tagging-directive REPLACE`.

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api copy-object \
      --copy-source <ИМЯ_БАКЕТА_ИСТОЧНИКА>/<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА> \
      --bucket <ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ> \
      --key <КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ> \
      --tagging-directive REPLACE \
      --tagging "<ТЕГИ>" \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА_ИСТОЧНИКА>` — имя бакета, из которого нужно скопировать объект.
   - `<КЛЮЧ_ОБЪЕКТА_ИСТОЧНИКА>` — полное имя копируемого объекта, включая путь до него.
   - `<ИМЯ_БАКЕТА_НАЗНАЧЕНИЯ>` — имя бакета, в который нужно скопировать объект.
   - `<КЛЮЧ_ОБЪЕКТА_НАЗНАЧЕНИЯ>` — полное имя для копии объекта, включая путь до него. Следуйте {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=рекомендациям]} при выборе имен.
   - `<ТЕГИ>` — теги в формате `<КЛЮЧ_1>=<ЗНАЧЕНИЕ_1>&...<КЛЮЧ_N>=<ЗНАЧЕНИЕ_N>`. Например: `Key1=Value1&Key2=Value2`.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Добавить тег при загрузке)[id=s3-instructions-manage-object-upload-tagging]}

{tabs}

{tab(AWS CLI)}

Чтобы добавить тег к новому объекту при его загрузке, выполните команду `put-object` с опцией `--tagging`.

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api put-object --endpoint-url <ENDPOINT_URL> --bucket <ИМЯ_БАКЕТА> --key <КЛЮЧ_ОБЪЕКТА> --body <ПУТЬ_К_ФАЙЛУ> --tagging "<ТЕГИ>"
   ```

   Здесь:

     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
    
     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}
   - `<ИМЯ_БАКЕТА>` — имя бакета, присвоенное ему при создании.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него. Следуйте {linkto(../../../concepts/about#s3-concepts-about-object-key-rules)[text=рекомендациям]} при выборе имен.
   - `<ПУТЬ_К_ФАЙЛУ>` — путь к локальному файлу.
   - `<ТЕГИ>` — теги в формате `<КЛЮЧ_1>=<ЗНАЧЕНИЕ_1>&...<КЛЮЧ_N>=<ЗНАЧЕНИЕ_N>`. Например: `Key1=Value1&Key2=Value2`.

{/tab}

{/tabs}

### {heading(Добавить тег существующего объекта)[id=s3-instructions-manage-object-existing-tagging]}

{tabs}

{tab(AWS CLI)}

Чтобы добавить тег к существующему объекту, выполните команду `put-object-tagging` с опцией `--tagging` и перечислением пар ключ/значение в формате JSON.

{note:warn}
Операция `put-object-tagging` перезаписывает текущие теги объекта, если они были установлены ранее. Для сохранения уже имеющихся тегов, {linkto(#s3-instructions-manage-object-tagging-view)[text=запросите]} текущую конфигурацию тегов и добавьте её в команду `put-object-tagging`.
{/note}

{cut(Структура перечисления тегов)}

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

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли установите, например, два тега, выполнив команду:

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

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, присвоенное ему при создании.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
   - `<КЛЮЧ_ТЕГА_1>`, `<ЗНАЧЕНИЕ_ТЕГА_1>` и `<КЛЮЧ_ТЕГА_2>`, `<ЗНАЧЕНИЕ_ТЕГА_2>` — пары ключ/значение для тегов объекта.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
    
     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{/tabs}

### {heading(Удалить теги объекта)[id=s3-instructions-manage-object-tagging-delete]}

{tabs}

{tab(AWS CLI)}

Чтобы проверить теги объекта, выполните команду `get-object-tagging`.

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команду:

   ```console
   aws s3api delete-object-tagging \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --endpoint-url=<ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, присвоенное ему при создании.
   - `<КЛЮЧ_ОБЪЕКТА>` — полное имя объекта, включая путь до него.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
    
     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

{/tab}

{/tabs}

## {heading(Удаление объектов)[id=s3-instructions-manage-object-delete]}

В этом разделе описано, как удалить объекты без установленной блокировки от удаления и перезаписи. О снятии и обходе блокировки — в разделе {linkto(../object-lock#s3-instructions-object-lock)[text=Блокировка удаления объектов]}.

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Для удаления объектов:

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Выберите проект, в котором расположен бакет.
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя бакета.
1. Выполните одно из действий:

   - Выберите объекты или директории с помощью флажков и нажмите кнопку **Удалить**.
   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для объекта и выберите пункт **Удалить файл**.
   - Нажмите ![ ](../../../assets/more-icon.svg "inline") для директории и выберите пункт **Удалить папку**.

1. Подтвердите удаление.

{/tab}

{ifdef(s3,s3-pdf)}

{tab(Файловый менеджер)}

{note:warn}
Здесь и далее мы используем файловый менеджер «CloudBerry Explorer for Amazon S3». Если вы используете другой файловый менеджер, интерфейс и названия его элементов могут отличаться от используемых в данной инструкции.
{/note}

1. На правой панели файлового менеджера откройте {var(s3)} и перейдите в нужный бакет. Найдите файл, который вы планируете удалить и вызовите для него контекстное меню правой кнопкой мыши.

   Или, выберите нужный файл и нажмите кнопку **Delete** на панели инструментов файлового менеджера.

1. В открывшемся диалоговом окне можно подтвердить или отменить удаление файла.

{/tab}

{/ifdef}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен.
1. В консоли выполните команды:

   {tabs}

   {tab(Удаление одного объекта)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_rm-single]}

   {/tab}

   {tab(Удаление нескольких объектов)}

   {include(../../../_includes/_s3-manage-object.md)[tags=object_rm-multiple]}

   {/tab}

   {/tabs}

   {cut(Пример команды удаления одного объекта)}

   Пример команды:

   ```console
   aws s3 rm s3://my-bucket/my-picture.png --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   delete: s3://my-bucket/my-picture.png
   ```

   {/cut}

   {cut(Пример команды удаления нескольких объектов)}

   Пример команды:

   ```console
   aws s3 rm --recursive s3://my-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   delete: s3://my-bucket/video.mp4
   delete: s3://my-bucket/pre/scheme.svg
   delete: s3://my-bucket/picture.png
   delete: s3://my-bucket/example.txt
   ```

   {/cut}

Описание доступных параметров для команды удаления объектов — в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Go, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значения переменных `vkCloudHotboxEndpoint` и `defaultRegion` должны соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `vkCloudHotboxEndpoint`:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

   - `defaultRegion`:

      - `ru-msk` — для региона Москва;
      - `kz-ast` — для региона Казахстан.
   {/ifdef}

   Команды [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) и [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects) подробно описаны в официальной документации к библиотеке aws-sdk-go.

{/tab}

{tab(Python SDK)}

1. Установите и настройте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=SDK]} для Python, если он еще не установлен.
1. Добавьте {linkto(../../../connect/s3-sdk#s3-connect-sdk)[text=реквизиты подключения]} к {var(s3)} в переменные окружения или конфигурационный файл, если этого не было сделано ранее.
1. Добавьте код в свой проект:

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
   Значение переменной `endpoint_url` должно соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.
   {/ifdef}

   Команда `delete_objects` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html?highlight=delete_objects#S3.Client.delete_objects).

{/tab}

{/tabs}

## {heading(Удаление частей загруженного объекта)[id=s3-instructions-manage-object-parts-delete]}

Если {linkto(../../../concepts/features#s3-concepts-features-object-uploading)[text=составная загрузка]} не завершена, объект не создается и не может использоваться{ifdef(public)}, но хранение загруженных частей {linkto(../../../tariffication#s3-tariffication)[text=тарифицируется]}. Чтобы средства не списывались, удаляйте составные загрузки, которые не будут завершены{/ifdef}.

Вы можете настроить автоматическое удаление незавершенных загрузок через {linkto(../../../concepts/lifecycle#s3-concepts-lifecycle)[text=жизненный цикл]} объектов или удалить загрузку вручную.

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Чтобы узнать, есть ли у вас незавершенные составные загрузки:

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. В консоли выполните команду:

   ```console
   aws s3api list-multipart-uploads \
      --bucket <ИМЯ_БАКЕТА> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно удалить незавершенные загрузки.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   {cut(Пример команды просмотра незавершенных загрузок)}

   Пример команды:

   ```console
   aws s3api list-multipart-uploads \
      --bucket mybucket \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

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

Чтобы удалить незавершенные загрузки:

{tabs}

{tab(Личный кабинет{ifdef(s3,s3-pdf)} IAM Only{/ifdef})}

Это групповая операция: при необходимости можно удалить сразу несколько частей, выбрав их с помощью флажков.

{ifdef(public)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.

{/ifdef}

{ifdef(s3,s3-pdf)}

1. {linkto(../../iamo/iamo-auth#s3-instructions-iamo-auth)[text=Войдите]} в личный кабинет IAM Only.

{/ifdef}

1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Нажмите на имя нужного бакета и перейдите на вкладку **Multipart**.
1. Выполните одно из действий для нужной части:

   - Выберите часть с помощью флажка, затем нажмите кнопку **Удалить** над таблицей.
   - Выберите часть, которую нужно удалить, и нажмите на значок ![Удалить](assets/delete-icon.svg "inline") справа.
   
1. Подтвердите удаление.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте {linkto(../../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}, если он еще не установлен. Установите выходной формат JSON или YAML, так как текстовые форматы не распознаются при выполнении команд составной загрузки или удаления.
1. В консоли выполните команду:

   ```console
   aws s3api abort-multipart-upload \
      --bucket <ИМЯ_БАКЕТА> \
      --key <КЛЮЧ_ОБЪЕКТА> \
      --upload-id <ID_ЗАГРУЗКИ> \
      --endpoint-url <ENDPOINT_URL>
   ```

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета, для которого нужно удалить незавершенные загрузки.
   - `<КЛЮЧ_ОБЪЕКТА>` — значение в поле **Название** на вкладке **Multipart** в личном кабинете или значение параметра `Key` в ответе AWS CLI.
   - `<ID_ЗАГРУЗКИ>` — значение в поле **ID** на вкладке **Multipart** в личном кабинете или значение параметра `UploadId` в ответе AWS CLI.
     {ifdef(public)}
   - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

     - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
     {/ifdef}
     {ifdef(s3,s3-pdf)}
   - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
     {/ifdef}

   Пример выполнения команды:

   ```console
   aws s3api abort-multipart-upload \
      --bucket mybucket \
      --key inupload.avi \
      --upload-id \example3K1xj3g1KUb2pKeDAfeT2zP6K74XiyJtceMeXH \
      --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

В результате все незавершенные загрузки будут отменены, а загруженные части — удалены.

{/tab}

{/tabs}
