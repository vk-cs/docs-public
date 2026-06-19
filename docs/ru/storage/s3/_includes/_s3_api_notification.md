Сервис уведомлений работает по модели издатель-подписчик (pub/sub). Он мгновенно рассылает уведомления (push-модель) по настроенным каналам.

Сервис использует SNS‑подобные вебхуки для работы.

При работе сервиса:

- Возможно дублирование — уведомление об одном и том же событии может быть доставлено несколько раз.
- Уведомления о событиях могут быть доставлены в произвольном порядке.

{note:warn}
EventBridge не поддерживается.
{/note}

## {heading(Типы событий)[id=working-with-notifications]}

Описание типов событий приведено в {linkto(#notifications)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_notifications]} — Типы событий)[align=right;position=above;id=notifications;number={const(numb_tab_notifications)}]}
[cols="1,4", options="header"]
|===
|Тип события
|Описание

|`TestEvent`
|Тестовое событие.

Когда уведомление включено, {var(s3)} отправляет тестовое уведомление. Если получатель не получил тестовое уведомление, проверьте настройки уведомлений

|`s3:ObjectCreated:*`

`s3:ObjectCreated:Put`

`s3:ObjectCreated:Post`

`s3:ObjectCreated:Copy`

`s3:ObjectCreated:CompleteMultipartUpload`

|Создание объекта.

Можно настроить уведомление о создании объекта с помощью определенного метода (`s3:ObjectCreated:Put`, `s3:ObjectCreated:Post` или `s3:ObjectCreated:Copy`) или типа `s3:ObjectCreated:CompleteMultipartUpload`, при котором объект создается с помощью копирования (`UploadPartCopy`)

|`s3:ObjectRemoved:*`

`s3:ObjectRemoved:Delete`

`s3:ObjectRemoved:DeleteMarkerCreated`

|Удаление объекта или группы объектов из бакета:

- `s3:ObjectRemoved:*` — универсальный тип уведомлений об удалении объекта.
- `s3:ObjectRemoved:Delete` — удаление объекта или окончательное удаление версионированного объекта.
- `s3:ObjectRemoved:DeleteMarkerCreated` — создание маркера удаления для версионированного объекта.

Эти события не включают случаи, когда объекты были автоматически удалены в соответствии с конфигурацией жизненного цикла или из-за неудачных операций

|`s3:ObjectRestore:*`

`s3:ObjectRestore:Post`

`s3:ObjectRestore:Completed`

`s3:ObjectRestore:Delete`

|События восстановления объекта:

- `s3:ObjectRestore:Post` — восстановления объекта запущено.
- `s3:ObjectRestore:Completed` — восстановления объекта завершено.
- `s3:ObjectRestore:Delete` — временная копия восстановленного объекта истекла

|`s3:Replication:*`

`s3:Replication:OperationFailedReplication`

`s3:Replication:OperationMissedThreshold`

`s3:Replication:OperationReplicatedAfterThreshold`

`s3:Replication:OperationNotTracked`

|События конфигурации репликации, в которых включены метрики `Replication` или `Replication Time Control` (`RTC`):

- `s3:Replication:OperationFailedReplication` — репликация не была выполнена.
- `s3:Replication:OperationMissedThreshold` — объект, который должен был быть реплицирован с использованием `RTC` (`Replication Time Control`), не был скопирован в течение тайм-аута 15 минут.
- `s3:Replication:OperationReplicatedAfterThreshold` — объект, который должен был быть реплицирован с использованием `RTC`, был скопирован после истечения 15-минутного тайм-аута.
- `s3:Replication:OperationNotTracked` — объект, который должен был быть реплицирован в режиме реального времени (например, в пределах одного региона — `SRR` или между регионами — `CRR`), больше не отслеживается с помощью метрик репликации

|`s3:LifecycleExpiration:*`

`s3:LifecycleExpiration:Delete`

`s3:LifecycleExpiration:DeleteMarkerCreated`

|Удаление объекта или группы объектов из бакета:

- `s3:LifecycleExpiration:*` — универсальный тип уведомлений об удалении объекта.
- `s3:LifecycleExpiration:Delete` — удаление объекта или окончательное удаление версионированного объекта.
- `s3:LifecycleExpiration:DeleteMarkerCreated` — создание маркера удаления для версионированного объекта

|`s3:ObjectTagging:*`

`s3:ObjectTagging:Put`

`s3:ObjectTagging:Delete`

|Добавление или удаление тега объекта:

- `s3:ObjectTagging:Put` — добавление тега объекту или изменение существующего тега.
- `s3:ObjectTagging:Delete` — удаление тега

|`s3:ObjectAcl:Put`
|К объекту применен новый ACL (Access Control List) или изменен существующий.

Если запрос не привел к изменению ACL объекта, уведомление не поступает

|===
{/caption}

## {heading(Настройка уведомлений)[id=add-notifications]}

Для работы с уведомлениями используются 2 метода:

- `GetBucketNotificationConfiguration` — получение текущих настроек уведомлений бакета.
- `PutBucketNotificationConfiguration` — применение настроек уведомлений к бакету.

### {heading(Получение настроек уведомлений бакета)[id=notifications-get]}

Для получения настроек используется метод `GetBucketNotificationConfiguration`.

Если уведомления не включены в бакете, операция возвращает пустой элемент `NotificationConfiguration`.

По умолчанию только владелец бакета имеет право на чтение настроек уведомлений. Владелец бакета может предоставить другим пользователям право с помощью политики бакета.

Пример запроса:

```http
GET /?notification HTTP/1.1
Host: <ИМЯ_БАКЕТА>.s3.<АДРЕС>
x-amz-expected-bucket-owner: <ИДЕНТИФИКАТОР_ВЛАДЕЛЬЦА>
```

Пример ответа:

```http
HTTP/1.1 200
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration>
   <SimpleTopicConfiguration>
     <Id>1</Id>
     <Url>http://<АДРЕС_ПОЛУЧАТЕЛЯ></Url>
     <Event>string</Event>
     <Filter>
       <S3Key>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
         <FilterRule>
           <Name>string</Name>
           <Value>string</Value>
         </FilterRule>
       </S3Key>
     </Filter>
   </SimpleTopicConfiguration>
 </NotificationConfiguration>
```

Здесь:

- `NotificationConfiguration` — корневой тег для параметров конфигурации уведомлений.
- `SimpleTopicConfiguration` — события, по которым генерируются уведомления.

### {heading(Настройка уведомлений)[id=notifications-put]}

Для добавления настроек используется метод `PutBucketNotificationConfiguration`.

С помощью данного API возможна замена текущей конфигурации уведомлений. Конфигурация представляет собой XML-файл, в котором задаются типы событий, а также параметры получателя, куда будут отправляться уведомления о событиях.

По умолчанию только владелец бакета имеет право на чтение настроек уведомлений. Владелец бакета может предоставить другим пользователям право с помощью политики бакета.

По умолчанию в бакете не настроены уведомления: секция `NotificationConfiguration` будет пустой.

Пример секции `NotificationConfiguration`:

```http
<NotificationConfiguration>

</NotificationConfiguration>
```

Для активации уведомлений выполните запрос с заполненной секцией.

Это действие заменяет текущую настройку уведомлений на ту, которая указана в теле запроса.

Пример запроса:

```http
PUT /?notification HTTP/1.1
Host: <ИМЯ_БАКЕТА>.s3.<АДРЕС>
x-amz-expected-bucket-owner: <ИДЕНТИФИКАТОР_ВЛАДЕЛЬЦА>
x-amz-skip-destination-validation: SkipDestinationValidation
<?xml version="1.0" encoding="UTF-8"?>
<NotificationConfiguration xmlns="http://s3.<АДРЕС>">
  <SimpleTopicConfiguration>
    <Id>1</Id>
    <Url>http://<АДРЕС_ПОЛУЧАТЕЛЯ></Url>
    <Event>string</Event>
    <Filter>
      <S3Key>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
        <FilterRule>
          <Name>string</Name>
          <Value>string</Value>
        </FilterRule>
      </S3Key>
    </Filter>
  </SimpleTopicConfiguration>
</NotificationConfiguration>
```

Здесь `SimpleTopicConfiguration` — конфигурация уведомлений, указывает SNS-подобный вебхук-назначение (destination). В поле `Url` указывается прямой HTTP(S)-адрес получателя, на который отправляются уведомления.

При успешном запросе ответ содержит код 200.

Пример ответа:

```http
HTTP/1.1 200
```

## {heading(Фильтрация объектов)[id=notification-filter]}

`FilterRule` — правило фильтрации объектов, для которых отправляются уведомления. В элементе `Name` указывается тип правила:

- `Prefix` — уведомления отправляются только для объектов, ключ которых начинается с указанного значения.
- `Suffix` — уведомления отправляются только для объектов, ключ которых заканчивается указанным значением.

В элементе `Value` задается строка для сравнения с ключом объекта.
Если указаны одновременно `Prefix` и `Suffix`, уведомление отправляется только для объектов, ключ которых соответствует обоим условиям.

Пример:

```http
<Filter>
  <S3Key>
    <FilterRule>
      <Name>Prefix</Name>
      <Value>images/</Value>
    </FilterRule>
    <FilterRule>
      <Name>Suffix</Name>
      <Value>.jpg</Value>
    </FilterRule>
  </S3Key>
</Filter>
```
