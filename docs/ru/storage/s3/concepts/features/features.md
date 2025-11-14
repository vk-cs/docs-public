Сервис Object Storage поддерживает следующие возможности для работы с бакетами и объектами на платформе VK Cloud:

<!-- исправить ссылки: на управлениями версиями после выкатки 2341, на управление доступом после выкатки 1865 -->
- [стандартная и составная загрузка](#object_uploading) объектов в бакет;
- настройка [автоматического удаления](../lifecycle) объектов (lifecycle);
- [копирование объектов](#objects_copying);
- [блокировка удаления объектов](../objects-lock) (object lock);
- [уведомления](#bucket_event_notifications) о событиях в бакете;
- набор инструментов для [управления доступом](../s3-acl) к бакетам и объектам;
- [API](#s3_api) для программного управления бакетами и объектами с помощью стандартных HTTP-запросов.

## {heading(Стандартная и составная загрузка объектов)[id=object_uploading]}

В бакет Object Storage можно загружать файлы любого типа, например, изображения, резервные копии, видео.

В зависимости от объема файла рекомендованы различные способы загрузки:

- До 1 ГБ — [стандартная загрузка](../../instructions/objects/upload-object#standard_upload) любым удобным способом: через личный кабинет, файловые менеджеры, CLI, SDK или API.
- Свыше 1 ГБ — CLI, SDK или API.
- Свыше 32 ГБ — только [составная загрузка](../../instructions/objects/upload-object#multipart_upload) через CLI, SDK или API.

При составной загрузке данные разделяются на несколько частей и загружаются по отдельности. Если передача какой-либо части не удалась, ее можно передать повторно, не затрагивая другие части. Когда все части загружены, хранилище собирает их вместе в заданном порядке и создает объект.

Преимущества составной загрузки:

- Части большого файла можно загружать параллельно, тем самым сокращая время загрузки.
- Если какая-то часть не была загружена из-за ошибки сети, ее быстрее перезагрузить, чем большой файл.
- Можно приостановить загрузку и продолжить ее позднее.
- Начать загрузку можно до того, как будет известен окончательный размер файла, т.е. можно загружать файл по мере его создания.

{note:info}

Ограничения на размер загружаемых файлов:

- Максимальный размер несоставного объекта или части составного объекта — 32 ГБ.
- Максимальный размер составного объекта — 320 ТБ.
- Количество частей составной загрузки — от 1 до 10000.

{/note}

## {heading(Копирование объектов)[id=objects_copying]}

Object Storage позволяет создавать копии хранимых объектов. Копирование выполняется [с помощью CLI, SDK, файлового менеджера](../../instructions/objects/manage-object#copy_object) или [API](/ru/tools-for-using-services/api/api-spec/s3-rest-api/object-api#copy).

С помощью копирования вы можете:

- Создавать дополнительные копии объектов в том же самом или другом бакете.
- Переименовывать объекты.

  Прямое переименование объектов в бакете не поддерживается. Обойти это ограничение можно, создав копию объекта с новым именем и затем удалив исходный объект.

- Изменять метаданные объекта.

  Метаданные объекта устанавливаются при его загрузке в бакет. Единственный способ изменить их после загрузки — создать копию объекта с тем же именем, указав новые метаданные в запросе на копирование. Таким способом можно изменить пользовательские метаданные и некоторые системные метаданные, например [класс хранения](../about#storage_class).

## {heading(Уведомления о событиях в бакете)[id=bucket_event_notifications]}

Object Storage позволяет настроить отправку уведомлений о событиях в бакете с помощью вебхуков (webhooks). В каждом вебхуке указывается тип события и URL-адрес, на который приходит сообщение или HTTP/HTTPS-запрос, когда в бакете происходит событие указанного типа. Можно создать вебхуки для следующих типов событий:

- создание объекта;
- копирование объекта;
- удаление объекта;
- завершение составной загрузки.

Использование вебхуков позволяет:

- информировать пользователя о произошедшем в бакете событии;
- настроить обработку и конвертирование файлов после загрузки;
- настроить взаимодействие с внешними системами;
- подключить логирование для объектного хранилища.

Конфигурация вебхуков для бакета создается [через личный кабинет](../../instructions/buckets/manage-bucket#manage_webhooks) или [с помощью API](/ru/tools-for-using-services/api/api-spec/s3-rest-api/webhook-api).

## {heading(Использование API)[id=s3_api]}

Object Storage предоставляет RESTful XML [API](/ru/tools-for-using-services/api/api-spec/s3-rest-api) для программного управления бакетами и объектами с помощью стандартных HTTP-запросов. Object Storage API предназначен для взаимодействия с [Amazon Web Service S3 API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) и имеет совместимый с ним интерфейс. Для доступа к Object Storage API используется протокол, созданный для сервиса AWS S3.

Запросы к API вы можете передавать через [AWS CLI](../../connect/s3-cli), [SDK](../../connect/s3-sdk) или [файловые менеджеры](../../connect/s3-file-managers).

Object Storage API поддерживает операции создания, чтения, обновления и удаления как для бакетов, так и для объектов, а также возможность определять списки управления доступом (ACL). Некоторые методы AWS S3 API не поддерживаются.

{cut(Поддержка методов AWS S3 API в Object Storage)}

[cols="2,2,3",options="header"]
|===
|Методы AWS S3 API
|Поддержка в Object Storage API
|Примечание

|Bucket Create, Head, Delete
| ![Да](/ru/assets/check.svg "inline")
|

|Object Get, Head, Put, Copy, Delete
| ![Да](/ru/assets/check.svg "inline")
|

|Multipart Uploads
| ![Да](/ru/assets/check.svg "inline")
|

|Pre-Signed URLs
| ![Да](/ru/assets/check.svg "inline")
| Поддерживаются типы подписи v2 и v4

|Bucket ACLs
| ![Да](/ru/assets/check.svg "inline")
|

|Object ACLs
| ![Да](/ru/assets/check.svg "inline")
|

|Bucket CORS
| ![Да](/ru/assets/check.svg "inline")
|

|Prefix Keys
| ![Да](/ru/assets/check.svg "inline")
|

|Identity and Access Management (IAM)
| ![Нет](/ru/assets/no.svg "inline")
|

|Security Token Service (STS)
| ![Нет](/ru/assets/no.svg "inline")
|

|Multi-factor Authentication
| ![Нет](/ru/assets/no.svg "inline")
|

|Public Access Block
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Policies
| ![Нет](/ru/assets/no.svg "inline")
|

|Object Policies
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Versioning
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Replication
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Notifications
| ![Да](/ru/assets/check.svg "inline")
|

|Bucket Notification Configuration
| ![Да](/ru/assets/check.svg "inline")
|Реализовано альтернативно методам AWS S3 API.

Использование этих методов в AWS CLI не поддерживается

|Bucket Tagging
| ![Нет](/ru/assets/no.svg "inline")
|

|Object Tagging
| ![Да](/ru/assets/check.svg "inline")
|

|Request Payment
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Lifecycle
| ![Да](/ru/assets/check.svg "inline")
|Поддерживается удаление объекта по истечении его времени жизни и удаление неполных составных загрузок.

Политики жизненного цикла, основанные на маркировке объектов, не поддерживаются

|Bucket Inventory
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Access Logging
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Metrics
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Analytics
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Accelerate
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Encryption Configuration
| ![Нет](/ru/assets/no.svg "inline")
|

|Bucket Website
| ![Да](/ru/assets/check.svg "inline")
|

|Object Torrent
| ![Нет](/ru/assets/no.svg "inline")
|

|Object Lock
| ![Да](/ru/assets/check.svg "inline")
|
|===

{/cut}

Запросы для методов AWS S3 API, которые не поддерживаются сервисом Object Storage, возвращают S3-совместимый ответ об ошибке `NotImplemented` в формате XML.
