## Просмотр списка бакетов

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
<tab>Golang SDK</tab>
<tab>Python SDK</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

      ```bash
      aws s3 ls --endpoint-url <endpoint-url>
      ```

      Здесь:
  
      - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
         - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
         - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды просмотра списка бакетов</summary>

      Пример команды:

      ```bash
      aws s3 ls --endpoint-url https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```bash
      2022-12-27 13:55:01 bucket-1
      2024-04-17 12:44:31 bucket-2
      2024-03-11 13:38:27 bucket-3
      2024-03-18 16:00:57 bucket-4
      ```

   </details>

Полное описание операции просмотра объектов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Go, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

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
	    vkCloudHotboxEndpoint = "https://hb.ru-msk.vkcs.cloud"
	    defaultRegion = "us-east-1"
    )

    func main() {
	    // Создание сессии
	    sess, _ := session.NewSession()

	    // Подключение к сервису Cloud Storage
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

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

Команда `ListBuckets` подробно описана в [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets).

</tabpanel>
<tabpanel>

1. Установите и настройте [SDK](../../../connect/s3-sdk) для Python, если он еще не установлен.

1. Добавьте [реквизиты подключения](../../../connect/s3-sdk) к Cloud Storage в переменные окружения или конфигурационный файл, если этого не было сделано ранее.

1. Добавьте код в свой проект:

   ```python
   import boto3
   session = boto3.session.Session()
   s3_client = session.client(service_name='s3', endpoint_url='https://hb.ru-msk.vkcs.cloud')

   response = s3_client.list_buckets()
   print(response)

   for key in response['Buckets']:
     print(key['Name'])
   ```

   Значение переменной `endpoint_url` должно соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:

   - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
   - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

Команда `list_buckets` подробно описана в [официальной документации к библиотеке boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_buckets.html).

</tabpanel>
</tabs>

## Привязка домена

Привязка домена к бакету позволит получить доступ к объектам бакета через ваш домен, а также использовать бакет в качестве репозитория вашего сайта.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

Чтобы привязать домен к бакету:

1. Зарегистрируйте домен у любого регистратора доменных имен, если этого не было сделано ранее. Привязать можно только домен третьего уровня и выше, например: `mybucket.mycompany.ru`, `my.bucket.mycompany.ru`.

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Домен** и нажмите кнопку ![plus-icon](/ru/assets/plus-icon.svg "inline") **Привязать домен**.
1. В открывшемся окне скопируйте значение для CNAME-записи вида `<название_бакета>.<endpoint-url>`. Пример записи `mybucket.hb.ru-msk.vkcs.cloud`.
1. Перейдите в личный кабинет провайдера вашего домена. Добавьте для вашего домена любую CNAME-запись и в значение записи добавьте скопированный текст.
1. Подождите, пока изменения вступят в силу. Обычно это занимает 15–20 минут.
1. Вернитесь в личный кабинет VK Cloud. В поле **Домен** укажите имя вашего домена.

После привязки бакет будет доступен по ссылке вида `http://<название_бакета>.<адрес_вебсайта>.<доменная_зона>`.

</tabpanel>
</tabs>

<warn>

Если название бакета содержит точку, он будет доступен только при использовании протокола HTTP. Чтобы использовать HTTPS-протокол, установите SSL-сертификат.

</warn>

## Использование CDN

{include(/ru/_includes/_s3-create-cdn.md)}

## Управление вебхуками

Cloud Storage позволяет настроить уведомления о добавлении или удалении объекта из бакета.

<info>

Обычно уведомления доставляются за секунды, но иногда это может занять минуту или больше.

</info>

### Добавление вебхука

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks** и нажмите кнопку ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить**.
1. Укажите параметры вебхука:

   - **ID**: название вебхука, должно быть уникальным в рамках одного бакета.
   - **Event**: события, при которых должно отправляться уведомление:

      - **ObjectCreated** — добавление объекта в бакет любым способом, включает в себя события **PutObject**, **PutObjectCopy** и **CompleteMultipartUpload**;
      - **PutObject** — добавление объекта;
      - **PutObjectCopy** — добавление копии объекта;
      - **CompleteMultipartUpload** — добавление объекта составным методом;
      - **ObjectRemoved** — удаление объекта любым способом, включает в себя событие **DeleteObject**;
      - **DeleteObject** — удаление объекта.
   - **URL** — адрес сервера приема вебхуков. Например, `http://83.166.234.90/webhook`. Для приема вебхуков на сервере должны быть настроены порты 80 или 443.
   - **Filter prefix** — фильтр, который позволяет генерировать вебхуки только на события с теми объектами, название которых содержит указанный префикс. Например, если ввести значение `images`, то вебхуки будут отправляться при изменении объектов типа `bucket\images\picture.png`, `bucket\images\picture.svg`. В личном кабинете префикс отображается в виде директории.
   - **Filter suffix** — фильтр, который позволяет генерировать вебхуки только на события с теми объектами, название которых содержит указанный суффикс. Например, если ввести  значение `png`, то вебхуки будут отправляться при изменении файлов с расширением `.png`.
1. Нажмите кнопку **Добавить hook**.

</tabpanel>
</tabs>

Вы можете подробно изучить механизм обмена вебхуками в Cloud Storage на [примере создания event-driven приложения](https://habr.com/ru/companies/vk/articles/510110/).

### Редактирование вебхука

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного вебхука и выберите пункт ![pencil-icon](/ru/assets/pencil-icon.svg "inline") **Редактировать hook**.
1. Отредактируйте [параметры](#dobavlenie_vebhuka_7b84d9a6) вебхука.
1. Нажмите кнопку **Сохранить изменения**.

</tabpanel>
</tabs>

### Удаление вебхука

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить несколько вебхуков, выбрав их с помощью флажков.

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Webhooks**.
1. Удалите вебхук одним из способов:

   - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного вебхука и выберите пункт ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить hook**.
   - Установите флажок для нужного вебхука и нажмите кнопку ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить**.
1. Подтвердите удаление.

</tabpanel>
</tabs>

## Синхронизация локальной директории с бакетом

Cloud Storage позволяет синхронизировать объекты бакета и файлы локальной директории. При синхронизации Cloud Storage проверяет наличие файла или объекта, их размер и дату последнего изменения. Сравнение происходит в момент выполнения команды или запроса. В зависимости от команды или запроса обновляется содержимое либо бакета, либо локальной директории.

<tabs>
<tablist>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. В консоли перейдите в локальную директорию, которую нужно синхронизировать с бакетом.

2. Откройте консоль и выполните команду:

    - Чтобы обновить локальную директорию в соответствии с бакетом:

        ```bash
        aws s3 sync s3://<название_бакета> . --endpoint-url <endpoint-url>
        ```
    - Чтобы обновить бакет в соответствии с локальной директорией:

        ```bash
        aws s3 sync . s3://<название_бакета> --endpoint-url <endpoint-url>
        ```
   Здесь `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](../../../../../tools-for-using-services/account/concepts/regions) аккаунта:

      - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
      - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
    <summary>Пример команды обновления локальной директории в соответствии с бакетом</summary>

   Пример команды:

   ```bash
   aws s3 sync s3://example-bucket . --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

   Пример ответа:

   ```bash
   download: s3://example-bucket/my-object.pdf to .\my-object.pdf
   ```

   </details>

   <details>
    <summary>Пример команды обновления бакета в соответствии с локальной директорией</summary>

   Пример команды:

   ```bash
   aws s3 sync . s3://example-bucket --endpoint-url https://hb.ru-msk.vkcs.cloud
   ```

   Пример ответа:

   ```bash
   upload: .\my-file.svg to s3://example-bucket/my-file.svg
   ```

   </details>

</tabpanel>
</tabs>

## Автоматическая очистка бакета

Cloud Storage позволяет настроить автоматическое удаление определенных объектов через определенное количество дней. Для настройки нужно создать правила удаления объектов.

### Добавление правила

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите кнопку **Добавить правило** или ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить новое правило**, если в бакете уже есть добавленные правила.
1. Задайте параметры правила:

    - **Наименование правила**: допустимы только цифры, латинские буквы и символы `-`, `_`, `.`. Название должно быть уникальным в рамках бакета.
    - **Префикс ключа объекта**: правило будет применяться только для объектов с указанными префиксными ключами. Фильтр может содержать только один ключ. Примеры префиксных ключей: `image/`, `pre/`, `image/photo`.
    - **Удалять данные через заданное количество дней**: укажите количество дней, через которые будут удалены объекты. Очистка происходит в 00:00 UTC.
    - **Активировать правило**: выключите опцию, если добавляемое правило не нужно применять к объектам в настоящее время.
1. Нажмите кнопку **Добавить правило**.

</tabpanel>
</tabs>

### Отключение правила

Чтобы объекты не удалялись по заданному правилу, отключите его:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Отключите нужное правило справа.

</tabpanel>
</tabs>

### Редактирование правила

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![pencil-icon](/ru/assets/pencil-icon.svg "inline") для правила, которое нужно отредактировать.
1. Отредактируйте [параметры](#dobavlenie_pravila_1a844f06) правила.
1. Нажмите кнопку **Сохранить**.

</tabpanel>
</tabs>

### Удаление правила

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

{include(/ru/_includes/_s3-open-bucket.md)}

1. Перейдите на вкладку **Lifecycle**.
1. Нажмите на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") для правила, которое нужно удалить.

</tabpanel>
</tabs>

## Удаление бакета

<warn>

Бакет с классом хранения Backup нельзя удалить. Удалить содержащиеся в нем объекты можно через сервис резервного копирования.

</warn>

Чтобы удалить бакет:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>AWS CLI</tab>
</tablist>
<tabpanel>

Это групповая операция: при необходимости можно удалить сразу несколько бакетов, выбрав их с помощью флажков.

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет.
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. [Удалите объекты](../../objects/manage-object#udalenie_obekta) из бакета, который нужно удалить, если этого не было сделано ранее.
1. Удалите бакет одним из способов:

    - Нажмите на на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") напротив бакета, который нужно удалить.
    - Выберите с помощью флажка бакет, затем нажмите кнопку ![trash-icon](/ru/assets/trash-icon.svg "inline") **Удалить**.

1. Подтвердите удаление.

</tabpanel>
<tabpanel>

1. Установите и настройте [AWS CLI](../../../connect/s3-cli), если он еще не установлен.

1. Откройте консоль и выполните команду:

      ```bash
      aws s3 rb s3://<название_бакета> --force --endpoint-url <endpoint-url>
      ```

      Здесь:

      - (Опционально) `force` — удаляет бакет и все объекты в нем. Без этого параметра бакет будет удален, только если не содержит объектов.
  
      - `<endpoint-url>` — домен сервиса Cloud Storage, должен соответствовать [региону](/ru/tools-for-using-services/account/concepts/regions) аккаунта:
         - `https://hb.ru-msk.vkcs.cloud` — домен региона Москва;
         - `https://hb.kz-ast.vkcs.cloud` — домен региона Казахстан.

   <details>
      <summary>Пример команды удаления бакета и всех объектов в нем </summary>

      Пример команды:

      ```bash
      aws s3 rb s3://example-bucket --force --endpoint-url https://hb.ru-msk.vkcs.cloud
      ```

      Пример ответа:

      ```bash
      delete: s3://example-bucket/images/picture-1.jpg
      delete: s3://example-bucket/images/picture-2.jpg
      delete: s3://example-bucket/input/
      remove_bucket: example-bucket
      ```

   </details>

Полное описание операций просмотра объектов доступно в [официальной документации AWS CLI](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html).

</tabpanel>
</tabs>
