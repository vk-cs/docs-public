## Просмотр списка бакетов

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

      ```console
      aws s3 ls --endpoint-url <URL_СЕРВИСА>
      ```

      Здесь:

      - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
         - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
         - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды просмотра списка бакетов)}

      Пример команды:

      ```console
      aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Пример ответа:

      ```console
      2022-12-27 13:55:01 bucket-1
      2024-04-17 12:44:31 bucket-2
      2024-03-11 13:38:27 bucket-3
      2024-03-18 16:00:57 bucket-4
      ```

   {/cut}

Описание всех параметров для команды вывода списка бакетов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

{/tab}

{tab(Golang SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
	    vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcloud-storage.ru"
	    defaultRegion = "us-east-1"
    )

    func main() {
	    // Создание сессии
	    sess, _ := session.NewSession()

	    // Подключение к сервису Object Storage
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

   Значение переменной `vkCloudHotboxEndpoint` должно соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

Команда `ListBuckets` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets).

{/tab}

{tab(Python SDK)}

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Object Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcloud-storage.ru')

   response = s3_client.list_buckets()
   print(response)

   for key in response['Buckets']:
     print(key['Name'])
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

Команда `list_buckets` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html).

{/tab}

{/tabs}

## {heading(Привязка домена)[id=bind_domain]}

Привязка домена к бакету позволит получить доступ к объектам бакета через ваш домен, а также использовать бакет в качестве репозитория вашего сайта.

{tabs}

{tab(Личный кабинет)}

1. Зарегистрируйте домен у любого регистратора доменных имен, если этого не было сделано ранее. Привязать можно только домен третьего уровня и выше, например: `mysite.mycompany.ru`, `my.site.mycompany.ru`.

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Домен** и нажмите кнопку ![plus-icon](/ru/assets/plus-icon.svg "inline") **Привязать домен**.
1. В открывшемся окне скопируйте значение для CNAME-записи вида `<ИМЯ_БАКЕТА>.<URL_СЕРВИСА>`. Пример записи: `mybucket.hb.ru-msk.vkcloud-storage.ru`.
1. Перейдите в личный кабинет провайдера вашего домена. Добавьте для вашего домена любую CNAME-запись, в качестве значения записи добавьте скопированный текст.
1. Подождите, пока изменения вступят в силу. Обычно это занимает 15–20 минут.
1. Вернитесь в личный кабинет VK Cloud. В поле **Домен** укажите имя вашего домена.

После привязки бакет будет доступен по ссылке вида `http://<ИМЯ_БАКЕТА>.<ИМЯ_ДОМЕНА>`, например `http://mybucket.mysite.mycompany.ru`.

{/tab}

{/tabs}

{note:warn}

Если имя бакета содержит точку, он будет доступен только при использовании протокола HTTP. Чтобы использовать HTTPS-протокол, установите SSL-сертификат.

{/note}

## {heading(Использование CDN)[id=use_cdn]}

{include(/ru/_includes/_s3-create-cdn.md)}

## {heading(Управление вебхуками)[id=manage_webhooks]}

Object Storage позволяет настроить уведомления о добавлении или удалении объекта из бакета.

{note:info}

Обычно уведомления доставляются за секунды, но иногда это может занять минуту или больше.

{/note}

### {heading(Добавление вебхука)[id=add_webhook]}

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks** и нажмите кнопку ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить**.
1. Укажите параметры вебхука:

   - **ID**: имя вебхука, должно быть уникальным в рамках одного бакета.
   - **Event**: события, при которых должно отправляться уведомление:

      - `ObjectCreated` — добавление объекта в бакет любым способом, включает в себя события `PutObject`, `PutObjectCopy` и `CompleteMultipartUpload`;
      - `PutObject` — добавление объекта;
      - `PutObjectCopy` — добавление копии объекта;
      - `CompleteMultipartUpload` — добавление объекта составным методом;
      - `ObjectRemoved` — удаление объекта любым способом, включает в себя событие `DeleteObject`;
      - `DeleteObject` — удаление объекта.

   - **URL**: адрес сервера приема вебхуков. Например, `http://83.166.234.90/webhook`. Для приема вебхуков на сервере должны быть настроены порты `80` или `443`.
   - **Filter prefix**: фильтр, который позволяет генерировать вебхуки на события только с теми объектами, имя которых содержит указанный префикс. Например, если ввести значение `images`, то вебхуки будут отправляться при изменении объектов типа `bucket\images\picture.png`, `bucket\images\picture.svg`. В личном кабинете префикс отображается в виде директории.
   - **Filter suffix**: фильтр, который позволяет генерировать вебхуки на события только с теми объектами, имя которых содержит указанный суффикс. Например, если ввести значение `png`, то вебхуки будут отправляться при изменении файлов с расширением `.png`.
1. Нажмите кнопку **Добавить hook**.

{/tab}

{/tabs}

Вы можете подробно изучить механизм обмена вебхуками в Object Storage на [примере создания event-driven приложения](https://habr.com/ru/companies/vk/articles/510110).

### Редактирование вебхука

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного вебхука и выберите пункт ![pencil-icon](/ru/assets/pencil-icon.svg "inline") **Редактировать hook**.
1. Отредактируйте [параметры](#add_webhook) вебхука.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

### Удаление вебхука

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно удалить несколько вебхуков, выбрав их с помощью флажков.

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks**.
1. Удалите вебхук одним из способов:

   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного вебхука и выберите пункт ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить hook**.
   - Установите флажок для нужного вебхука и нажмите кнопку ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить**.
1. Подтвердите удаление.

{/tab}

{/tabs}

## {heading(Синхронизация локальной директории с бакетом)[id=sync_local_directory_and_bucket]}

Object Storage позволяет синхронизировать объекты бакета и файлы локальной директории. При синхронизации Object Storage проверяет наличие файла или объекта, их размер и дату последнего изменения. Сравнение происходит в момент выполнения команды или запроса. В зависимости от команды или запроса обновляется содержимое либо бакета, либо локальной директории.

{tabs}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли перейдите в локальную директорию, которую нужно синхронизировать с бакетом.

2. В консоли выполните команду:

    - Чтобы обновить локальную директорию в соответствии с бакетом:

        ```console
        aws s3 sync s3://<ИМЯ_БАКЕТА> . --endpoint-url <URL_СЕРВИСА>
        ```
    - Чтобы обновить бакет в соответствии с локальной директорией:

        ```console
        aws s3 sync . s3://<ИМЯ_БАКЕТА> --endpoint-url <URL_СЕРВИСА>
        ```
   Здесь `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
      - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды обновления локальной директории в соответствии с бакетом)}

   Пример команды:

   ```console
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   {/cut}

   {cut(Пример команды обновления бакета в соответствии с локальной директорией)}

   Пример команды:

   ```console
   aws s3 sync . s3://example-bucket --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Пример ответа:

   ```console
   upload: .\my-file.svg to s3://example-bucket/my-file.svg
   ```

   {/cut}

{/tab}

{/tabs}

## {heading(Автоматическая очистка бакета)[id=manage_lifecycle]}

Object Storage позволяет настроить автоматическое удаление определенных объектов через определенное количество дней. Для настройки нужно создать правила удаления объектов.

### {heading(Добавление правила)[id=add_rule]}

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила.
1. Задайте параметры правила:

    - **Наименование правила**: допустимы только цифры, латинские буквы и символы `-`, `_`, `.`. Наименование должно быть уникальным в рамках бакета.
    - **Префикс ключа объекта**: правило будет применяться только для объектов с указанными префиксными ключами. Фильтр может содержать только один ключ. Примеры префиксных ключей: `image/`, `pre/`, `image/photo`.
    - **Удалять данные через заданное количество дней**: укажите количество дней, через которые будут удалены объекты. Очистка происходит в 00:00 UTC.
    - **Активировать правило**: выключите опцию, если добавляемое правило не нужно применять к объектам в настоящее время.
1. Нажмите кнопку **Добавить правило**.

{/tab}

{/tabs}

### Отключение правила

Чтобы объекты не удалялись по заданному правилу, отключите его:

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Отключите нужное правило справа.

{/tab}

{/tabs}

### Редактирование правила

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![pencil-icon](/ru/assets/pencil-icon.svg "inline") для правила, которое нужно отредактировать.
1. Отредактируйте [параметры](#add_rule) правила.
1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

### Удаление правила

{tabs}

{tab(Личный кабинет)}

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") для правила, которое нужно удалить.

{/tab}

{/tabs}

## {heading(Удаление бакета)[id=bucket_delete]}

{note:warn}

Бакет с классом хранения Backup удалить нельзя. Удалить содержащиеся в нем объекты можно через сервис резервного копирования.

{/note}

{tabs}

{tab(Личный кабинет)}

Это групповая операция: при необходимости можно удалить сразу несколько бакетов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. [Удалите объекты](../../objects/manage-object#udalenie_obektov) из бакета, который нужно удалить, если этого не было сделано ранее.
1. Удалите бакет одним из способов:

    - Нажмите на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") напротив бакета, который нужно удалить.
    - Выберите бакет с помощью флажка, затем нажмите кнопку ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить**.

1. Подтвердите удаление.

{/tab}

{tab(AWS CLI)}

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли выполните команду:

      ```console
      aws s3 rb s3://<ИМЯ_БАКЕТА> --force --endpoint-url <URL_СЕРВИСА>
      ```

      Здесь:

      - (Опционально) `force` — удаляет бакет и все объекты в нем. Без этого параметра бакет будет удален, только если не содержит объектов.

      - `<URL_СЕРВИСА>` — домен сервиса Object Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
         - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
         - `https://hb.kz-ast.vkcloud-storage.ru` — домен региона Казахстан.

   {cut(Пример команды удаления бакета и всех объектов в нем )}

      Пример команды:

      ```console
      aws s3 rb s3://example-bucket --force --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
      ```

      Пример ответа:

      ```console
      delete: s3://example-bucket/images/picture-1.jpg
      delete: s3://example-bucket/images/picture-2.jpg
      delete: s3://example-bucket/input/
      remove_bucket: example-bucket
      ```

   {/cut}

Описание всех параметров команды удаления бакета доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html).

{/tab}

{/tabs}
