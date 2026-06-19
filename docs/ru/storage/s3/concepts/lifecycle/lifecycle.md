# {heading(Жизненный цикл объектов)[id=s3-concepts-lifecycle]}

{var(s3)} позволяет настроить жизненный цикл (lifecycle) объектов в бакете. Жизненный цикл — это автоматизированное удаление из бакета объектов или их {linkto(../versioning#s3-concepts-versioning)[text=версий]} по заданным правилам.

Правила устанавливаются на уровне одного бакета. Настроить жизненный цикл для группы бакетов или проекта нельзя.

В личном кабинете{ifdef(s3,s3-pdf)} IAM Only{/ifdef} {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=управлять]} правилами жизненного цикла можно только по отдельности. Добавлять, удалять и изменять сразу несколько правил можно через:

- {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} с помощью {linkto(#s3-concepts-lifecycle-config)[text=JSON-конфигурации]} жизненного цикла.  
- {linkto(../../api/lifecycle#s3-api-lifecycle)[text=API]} с помощью XML-конфигурации.

Особенности создания правил жизненного цикла:

- Конфигурация должна содержать как минимум одно правило.
- Наименование правила (параметр `ID`) — уникальный идентификатор, состоящий только из цифр, латинских букв и символов `_`, `.` и `-`.
- Каждое правило жизненного цикла включает в себя:

  - Фильтр (параметр `Filter`) для выбора объектов, попадающих под правило. Может содержать один или два вида фильтрации:

    - По префиксу {linkto(../about#s3-concepts-about-object-key)[text=ключа]} объекта (параметр `Prefix`). Примеры префиксов: `image`, `image/`, `image/photo`.

      Одно правило может содержать только один префикс. Чтобы фильтровать объекты по нескольким префиксам, нужно создать отдельное правило для каждого из префиксов.

    - По {linkto(../features#s3-concepts-features-tagging)[text=тегам]} объекта (параметр `Tag` или `Tags`).

  - Время жизни объекта (параметр `Expiration`). Определяет, когда объект должен быть удален:

    - через заданное количество дней после загрузки;
    - в заданное время (только с помощью {linkto(../../api/lifecycle#s3-api-lifecycle)[text=API]} и {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]}).

- После добавления правила оно автоматически применяется к соответствующим объектам или версиям объектов в бакете.

    Далее объекты удаляются в фоновом режиме: сначала, по истечении времени жизни, становятся недоступными, а затем удаляются в порядке очереди в течение следующих 24 часов.

Ограничения:

- Для каждого бакета можно установить не более 50 правил.
- При создании правил через API размер XML-файла с правилами не должен превышать 512 КБ.

Правила жизненного цикла работают в фоновом режиме и не влияют на производительность сервиса {var(s3)}.

## {heading(Конфигурация правил жизненного цикла)[id=s3-concepts-lifecycle-config]}

- `ID` — уникальный идентификатор правила.
- `Status` — статус правила. Возможные значения:

Для JSON-конфигурации все правила задаются в виде массива (array) `Rules`, содержащего элементы `Rules[i]` формата `object`.

{note:warn}

Перед использованием шаблонов для {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=установки]} конфигурации необходимо:

- в блоке `Expiration` из элементов `Days`, `Date`, `ExpiredObjectDeleteMarker` оставить только один и удалить остальные;
- удалить все комментарии `// <ТЕКСТ_КОММЕНТАРИЯ>`;
- заполнить поля необходимыми значениями;
- удалить элемент конфигурации `NoncurrentVersionExpiration`, если бакет без версионирования.

В противном случае выполнение команды AWS CLI может завершиться ошибкой.

{/note}

{cut(Шаблон конфигурации с префиксом и несколькими тегами в формате JSON)}

```json
{
  "Rules": [
    {
      "ID": "Object expiration rule",
      "Status": "Enabled",
      "Expiration": {
        "Days": 1,                                       // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",                  // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true                // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "And": {
          "Prefix": "string",
          "Tags": [
            { "Key": "tagKey1", "Value": "tagValue1" },
            { "Key": "tagKey2", "Value": "tagValue2" },
            { "Key": "tagKey3", "Value": "tagValue3" }
          ]
        }
      },
      "NoncurrentVersionExpiration": {                   // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
Описание параметров конфигурации приведено в {linkto(#tab_lifecycle-config1)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecycle-config1]} — Параметры конфигурации)[align=right;position=above;id=tab_lifecycle-config1;number={const(numb_tab_lifecycle-config1)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|`Expiration`
|Срок жизни объекта. В зависимости от текущей версии объекта, {linkto(../versioning#s3-concepts-versioning-status)[text=статуса версионирования]} и наличия {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=маркера удаления]}, по истечении этого срока к объекту применится одно из действий.

Для бакета с выключенным версионированием объект удаляется безвозвратно.

Для бакета с включенным версионированием.

- Текущая версия не маркер удаления — создается маркер удаления и становится текущей версией.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Для бакета с приостановленным версионированием.

- `null` — единственная версия: удалится версия `null`.
- Версий несколько и текущая — `null`: удалится версия `null`. Если после удаления версии `null` останутся другие версии объекта, будет создан маркер удаления с версией `null`.
- Версий несколько и текущая не `null`: будет только создан маркер удаления с версией `null`.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Задается с помощью элементов конфигурации `Days`, `Date` или `ExpiredObjectDeleteMarker`.

Формат: `object`.

Полный путь: `Rules[i]` → `Expiration`

|`Days`
|Количество дней после загрузки в бакет.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Date` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `integer`.

Полный путь: `Rules[i]` → `Expiration` → `Days`

|`Date`
|Дата и время в UTC в формате ISO 8601.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Days` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `string`.

Полный путь: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(только для бакетов с версионированием)
|Опция, которая определяет, нужно ли удалять из бакета маркер удаления объекта, когда других версий этого объекта не осталось.

Формат: `boolean` в значении `true`.

Полный путь: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Уникальный идентификатор правила.

Формат: `string`.

Полный путь: `Rules[i]` → `ID`

|`Status`
|Статус правила.

Формат: `string`.

Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется.

Полный путь: `Rules[i]` → `Status`

|`Filter`
|Фильтр по объектам, к которым применяется правило.

Формат: `object`.

Полный путь: `Rules[i]` → `Filter`

|`And`
|Элемент конфигурации, который применяется при использовании в одном правиле и фильтрации по префиксу, и по нескольким тегам.

Формат: `object`.

Полный путь: `Rules[i]` → `Filter` → `And`

|`Prefix`
|Префикс {linkto(../about#s3-concepts-about-object-key)[text=ключа объекта]}

Формат: `string`.

Полный путь: `Rules[i]` → `Filter` → `And` → `Prefix`

|`Tags`
|{linkto(../features#s3-concepts-features-tagging)[text=Теги]} объекта в виде массива (array). Каждый элемент массива `Tags[i]` имеет формат `object` и содержит пары ключ/значение `Key` и `Value`.

Формат: `array`.

Полный путь: `Rules[i]` → `Filter` → `And` → `Tags`

|`Key`
|Ключ {linkto(../features#s3-concepts-features-tagging)[text=тега]}.

Формат: `string`.

Полный путь: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Key`

|`Value`
|Значение {linkto(../features#s3-concepts-features-tagging)[text=тега]}.

Формат: `string`.

Полный путь: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Value`

|`NoncurrentVersionExpiration`

(только для бакетов с версионированием)
|Условия удаления неактуальных версий объекта.

Формат: `object`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(только для бакетов с версионированием)
|Количество дней, в течение которых хранится неактуальная версия объекта, после чего эта версия удаляется.

Если использовать совместно с `NewerNoncurrentVersions`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(только для бакетов с версионированием)
|Количество хранимых неактуальных версий объекта. При достижении указанного лимита, старые версии объекта будут удаляться автоматически.

Если использовать совместно с `NoncurrentDays`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`, но не более 100.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

{cut(Шаблон конфигурации только с префиксами в формате JSON)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",          // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "string"
      },
      "NoncurrentVersionExpiration": {          // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
Описание параметров конфигурации приведено в {linkto(#tab_lifecycle-config2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecycle-config2]} — Параметры конфигурации)[align=right;position=above;id=tab_lifecycle-config2;number={const(numb_tab_lifecycle-config2)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|`Expiration`
|Срок жизни объекта. В зависимости от текущей версии объекта, {linkto(../versioning#s3-concepts-versioning-status)[text=статуса версионирования]} и наличия {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=маркера удаления]}, по истечении этого срока к объекту применится одно из действий.

Для бакета с выключенным версионированием объект удаляется безвозвратно.

Для бакета с включенным версионированием.

- Текущая версия не маркер удаления — создается маркер удаления и становится текущей версией.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Для бакета с приостановленным версионированием.

- `null` — единственная версия: удалится версия `null`.
- Версий несколько и текущая — `null`: удалится версия `null`. Если после удаления версии `null` останутся другие версии объекта, будет создан маркер удаления с версией `null`.
- Версий несколько и текущая не `null`: будет только создан маркер удаления с версией `null`.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Задается с помощью элементов конфигурации `Days`, `Date` или `ExpiredObjectDeleteMarker`.

Формат: `object`.

Полный путь: `Rules[i]` → `Expiration`

|`Days`
|Количество дней после загрузки в бакет.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Date` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `integer`.

Полный путь: `Rules[i]` → `Expiration` → `Days`

|`Date`
|Дата и время в UTC в формате ISO 8601.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Days` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `string`.

Полный путь: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(только для бакетов с версионированием)
|Опция, которая определяет, нужно ли удалять из бакета маркер удаления объекта, когда других версий этого объекта не осталось.

Формат: `boolean` в значении `true`.

Полный путь: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Уникальный идентификатор правила.

Формат: `string`.

Полный путь: `Rules[i]` → `ID`

|`Status`
|Статус правила.

Формат: `string`.

Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется.

Полный путь: `Rules[i]` → `Status`

|`Filter`
|Фильтр по объектам, к которым применяется правило.

Формат: `object`.

Полный путь: `Rules[i]` → `Filter`

|`Prefix`
|Префикс {linkto(../about#s3-concepts-about-object-key)[text=ключа объекта]}

Формат: `string`.

Полный путь: `Rules[i]` → `Filter` → `Prefix`

|`NoncurrentVersionExpiration`

(только для бакетов с версионированием)
|Условия удаления неактуальных версий объекта.

Формат: `object`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(только для бакетов с версионированием)
|Количество дней, в течение которых хранится неактуальная версия объекта, после чего эта версия удаляется.

Если использовать совместно с `NewerNoncurrentVersions`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(только для бакетов с версионированием)
|Количество хранимых неактуальных версий объекта. При достижении указанного лимита, старые версии объекта будут удаляться автоматически.

Если использовать совместно с `NoncurrentDays`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`, но не более 100.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(Шаблон конфигурации только по одному тегу в формате JSON)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Указывается вместо Date и ExpiredObjectDeleteMarker
        "Date": "YYYY-MM-DDTHH:MM:SSZ",          // Указывается вместо Days и ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Указывается вместо Days и Date (только для бакетов с версионированием)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Tag": { "Key": "env", "Value": "prod" }
      },
      "NoncurrentVersionExpiration": {           // Только для бакетов с версионированием
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      }
    }
  ]
}
```
{ifdef(s3-pdf)}
Описание параметров конфигурации приведено в {linkto(#tab_lifecycle-config3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_lifecycle-config3]} — Параметры конфигурации)[align=right;position=above;id=tab_lifecycle-config3;number={const(numb_tab_lifecycle-config3)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Имя
|Описание

|`Expiration`
|Срок жизни объекта. В зависимости от текущей версии объекта, {linkto(../versioning#s3-concepts-versioning-status)[text=статуса версионирования]} и наличия {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=маркера удаления]}, по истечении этого срока к объекту применится одно из действий.

Для бакета с выключенным версионированием объект удаляется безвозвратно.

Для бакета с включенным версионированием.

- Текущая версия не маркер удаления — создается маркер удаления и становится текущей версией.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Для бакета с приостановленным версионированием.

- `null` — единственная версия: удалится версия `null`.
- Версий несколько и текущая — `null`: удалится версия `null`. Если после удаления версии `null` останутся другие версии объекта, будет создан маркер удаления с версией `null`.
- Версий несколько и текущая не `null`: будет только создан маркер удаления с версией `null`.
- Текущая версия маркер удаления — ничего не происходит. Однако если нет других версий и вместо `Days` или `Date` используется `ExpiredObjectDeleteMarker`, маркер удаления будет удален.

Задается с помощью элементов конфигурации `Days`, `Date` или `ExpiredObjectDeleteMarker`.

Формат: `object`.

Полный путь: `Rules[i]` → `Expiration`

|`Days`
|Количество дней после загрузки в бакет.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Date` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `integer`.

Полный путь: `Rules[i]` → `Expiration` → `Days`

|`Date`
|Дата и время в UTC в формате ISO 8601.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Days` и `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`.

Формат: `string`.

Полный путь: `Rules[i]` → `Expiration` → `Date`

|`ExpiredObjectDeleteMarker`

(только для бакетов с версионированием)
|Опция, которая определяет, нужно ли удалять из бакета маркер удаления объекта, когда других версий этого объекта не осталось.

Несовместимо с элементами конфигурации `Rules[i]` → `Expiration` → `Days` и `Rules[i]` → `Expiration` → `Date`.

Формат: `boolean` в значении `true`.

Полный путь: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|Уникальный идентификатор правила.

Формат: `string`.

Полный путь: `Rules[i]` → `ID`

|`Status`
|Статус правила.

Формат: `string`.

Возможные значения:

- `Enabled` — правило применяется;
- `Disabled` — правило не применяется.

Полный путь: `Rules[i]` → `Status`

|`Filter`
|Фильтр по объектам, к которым применяется правило.

Формат: `object`.

Полный путь: `Rules[i]` → `Filter`

|`Tag`
|{linkto(../features#s3-concepts-features-tagging)[text=Тег]} объекта в виде пары ключ/значение `Key` и `Value`.

Формат: `object`.

Полный путь: `Rules[i]` → `Filter` → `Tag`

|`NoncurrentVersionExpiration`

(только для бакетов с версионированием)
|Условия удаления неактуальных версий объекта.

Формат: `object`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(только для бакетов с версионированием)
|Количество дней, в течение которых хранится неактуальная версия объекта, после чего эта версия удаляется.

Если использовать совместно с `NewerNoncurrentVersions`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(только для бакетов с версионированием)
|Количество хранимых неактуальных версий объекта. При достижении указанного лимита, старые версии объекта будут удаляться автоматически.

Если использовать совместно с `NoncurrentDays`, удаление неактуальной версии выполнится только при достижении обоих лимитов.

Формат: `integer`, но не более 100.

Полный путь: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}