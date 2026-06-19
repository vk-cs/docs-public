Язык поисковых запросов позволяет:

- искать по одному или нескольким фильтрующим выражениям;
- применять логические операции и операции сравнения.

{ifdef(public,private,private-pg)}
Для фильтрации логов используйте параметры фильтров в поисковой строке.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Для фильтрации логов используйте параметры фильтров в поисковой строке, перечисленные в {linkto(#tab_search_filter_options_audit)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_search_filter_options_audit]} — Параметры фильтров поиска)[align=right;position=above;id=tab_search_filter_options_audit;number={const(numb_tab_search_filter_options_audit)}]}{/ifdef}
[cols="1,3", options="header"]
|===
|Параметр
|Описание

|`event_id`
|Уникальный идентификатор события

|`timestamp`
|Время возникновения события, [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).

Пример: 2006-01-02T15:04:05Z07:00

|`action`
|Тип события

|`request_id`
|Идентификатор запроса, служит для связи с Cloud Logging

|`severity`
|Серьезность события. Доступные значения: `DEFAULT`,`DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`

|`message`
|Понятное человеку описание события

|`source.id`
|Идентификатор источника события

|`source.address`
|IP-адрес источника события

|`subject.user_id`
|Идентификатор субъекта — пользователя, с действиями которого связано событие

|`subject.address`
|IP-адрес пользователя

|`subject.project_id`
|Идентификатор проекта в OpenStack

|`subject.metadata`
|Дополнительные метаданные, определяющие пользователя.

Например: `subject.metadata.email` — почта пользователя

|`resource.id`
|Идентификатор ресурса в OpenStack или аналогичный

|`resource.type`
|Тип ресурса

|`resource.metadata`
|Дополнительные метаданные, определяющие ресурс.

Например:

- `resource.metadata.service_id` — имя сервиса (`DBaaS`);
- `resource.metadata.group_id` — имя подсервиса (`Redis`);
- `resource.metadata.stream_id` — имя объекта, где находится ресурс (`DB_id`)

|`status.code`
|Код статуса выполнения операции.

Например, код [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) или код [gRPC](https://developers.google.com/maps-booking/reference/grpc-api/status_codes)

|`status.message`
|Описание статуса выполнения операции

|`labels`
|Метки, по которым можно искать события
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Для фильтрации логов используйте параметры фильтров в поисковой строке, перечисленные в {linkto(#tab_search_filter_options)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_search_filter_options]} — Параметры фильтров поиска)[align=right;position=above;id=tab_search_filter_options;number={const(numb_tab_search_filter_options)}]}{/ifdef}
[cols="1,1,3,2", options="header"]
|===
|Параметр
|Формат
|Описание
|Пример

|`message`
|`message: "значение"` 
|Поиск записей, в сообщениях которых есть заданные значения. Является параметром по умолчанию, в запросе можно не указывать 
|`message: "Hello world!"`

|`timestamp`
|`timestamp <ОПЕРАТОР_СРАВНЕНИЯ> "<ЗНАЧЕНИЕ>"`
|Поиск записей, отправленных в заданный промежуток времени
|`timestamp >= "2022-04-10T00:00:00Z"`

|`level`
|`level <ОПЕРАТОР_СРАВНЕНИЯ> <ЗНАЧЕНИЕ>`
|Поиск записей с заданными уровнями логирования. Доступные уровни логирования — `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL` 
|`level = INFO`

| `json_payload`
| `json_payload: <ЗНАЧЕНИЕ>`
| Поиск по тексту записей, в `json_payload` которых есть заданные значения. Вместо `json_payload` можно использовать сокращение `payload`
| `json_payload: warning`

| `json_payload.field.search`
| `json_payload.<ПОЛЕ>: <ЗНАЧЕНИЕ>`
| Лексикографический поиск записей по элементам `json_payload`. Префикс `json_payload` можно не указывать, если корневой элемент дерева не совпадает ни с одним из параметров. Вместо `json_payload` можно использовать сокращение `payload`.

Проверить существование элемента в `json_payload` можно с помощью оператора `EXISTS: json_payload.result EXISTS`. Такой фильтр выведет записи, в `json_payload` которых есть элемент `result`
| `json_payload.status: created`

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
|`stream_id`
|`stream_id: "<ИДЕНТИФИКАТОР_РЕСУРСА>"`
|Поиск по идентификатору ресурса (БД, ВМ, кластера Kubernetes)
|`stream_id: "4dd2038a-2c88-45df-8e4d-64e0e1bfe82f"`
{/ifdef}

|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}
{/includetag}

Для фильтрации списка записей в журнале используйте в поисковой строке пары `<ИМЯ_ПАРАМЕТРА>`/`<ЗНАЧЕНИЕ_ПАРАМЕТРА>`. 

{note:info}
Если в строке поиска ввести только значение параметра без его имени, записи будут отфильтрованы по вхождению этого значения в параметр `message`.
{/note}

{includetag(event-log)}
## {heading(Особенности поиска)[id=event-log-search-lang-prop]}
{/includetag}

{includetag(logging)}
## {heading(Особенности поиска)[id=logging-search-tools-prop]}
{/includetag}

1. Символы `"`, `'` и `＼` в строке поиска экранируются с помощью `＼`.
1. Значение можно не брать в кавычки, если оно:

    - начинается с буквы латинского алфавита и содержит только буквы латинского алфавита, цифры и знаки подчеркивания;
    - является целым числом без знака.

1. Формат значений времени: [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
   {includetag(event-log)}
1. Все значения во вложенных объектах рассматриваются как строки и сравниваются в лексикографическом порядке.
1. Поддерживается поиск по параметрам-массивам с помощью операторов `:`, `=`, `<>`.
{/includetag}

{includetag(event-log)}
## {heading(Операторы сравнения)[id=event-log-search-lang-operators]}
{/includetag}

{includetag(logging)}
## {heading(Операторы сравнения)[id=logging-search-tools-operators]}
{/includetag}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Операторы сравнения перечислены в {linkto(#tab_comparison_operators_audit)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_comparison_operators_audit]} — Операторы сравнения)[align=right;position=above;id=tab_comparison_operators_audit;number={const(numb_tab_comparison_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Операторы сравнения перечислены в {linkto(#tab_comparison_operators)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_comparison_operators]} — Операторы сравнения)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Оператор
|Описание
|Пример

|`=`
|Равно
|`message="ИСКОМЫЙ_ТЕКСТ"`

|`<>`
|Не равно
|`message<>"ИСКОМЫЙ_ТЕКСТ"`

|`>`
|Больше
{includetag(event-log)}
|`severity > DEBUG`
{/includetag}
{includetag(logging)}
|`level > DEBUG`
{/includetag}

|`<`
| Меньше
{includetag(event-log)}
|`severity < DEBUG`
{/includetag}
{includetag(logging)}
|`level < DEBUG`
{/includetag}

|`>=`
|Больше либо равно
|`timestamp >= "2023-04-10T10:20:00Z"`

|`<=`
|Меньше либо равно
|`timestamp <= "2023-04-10T10:20:00Z"`

|`:`
|Содержит
|`message: "ИСКОМЫЙ_ТЕКСТ"`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Логические операторы)[id=event-log-search-lang-filters]}
{/includetag}
{includetag(logging)}
## {heading(Логические операторы)[id=logging-search-tools-filters]}
{/includetag}

{ifdef(public,private,private-pg)}
Объединить несколько условий в одном фильтре можно с помощью логических операторов.
{/ifdef}

{includetag(event-log)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Объединить несколько условий в одном фильтре можно с помощью логических операторов ({linkto(#tab_logical_union_operators_audit)[text=таблица %number]}).

{caption(Таблица {counter(table)[id=numb_tab_logical_union_operators_audit]} — Логические операторы)[align=right;position=above;id=tab_logical_union_operators_audit;number={const(numb_tab_logical_union_operators_audit)}]}{/ifdef}
{/includetag}
{includetag(logging)}
{ifdef(private-pdf,private-pg-pdf,private-cert)}
Объединить несколько условий в одном фильтре можно с помощью логических операторов ({linkto(#tab_logical_union_operators)[text=таблица %number]}).

{caption(Таблица {counter(table)[id=numb_tab_logical_union_operators]} — Логические операторы)[align=right;position=above;id=tab_logical_union_operators;number={const(numb_tab_logical_union_operators)}]}{/ifdef}
{/includetag}
[cols="1,2,2", options="header"]
|===
|Оператор
|Описание
|Пример

|`AND`
|Удовлетворяет всем условиям
|`service_id=databases AND severity=ERROR`

|`OR`
|Удовлетворяет как минимум одному условию
|`severity=ERROR OR status.code=500`

|`NOT`
|Не удовлетворяет этому условию
|`NOT message: hello`

|`EXIST`
|Запись содержит этот параметр
|`subject.metadata.email EXIST`
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}

{includetag(event-log)}
## {heading(Порядок вычислений)[id=event-log-search-lang-order]}
{/includetag}
{includetag(logging)}
## {heading(Порядок вычислений)[id=logging-search-tools-order]}
{/includetag}

Используйте скобки для задания определенного порядка вычислений, например:

```sql
ПАРАМЕТР_1: "ЗНАЧЕНИЕ_1" AND (ПАРАМЕТР_2 = "ЗНАЧЕНИЕ_2" OR ПАРАМЕТР_3 "ЗНАЧЕНИЕ_3")
```
В этом примере будут найдены записи, в которых параметр `ПАРАМЕТР_1` содержит подстроку `"ЗНАЧЕНИЕ_1"` и выполнено хотя бы одно из двух условий:

- Значение параметра `ПАРАМЕТР_2` равно `"ЗНАЧЕНИЕ_2"`.
- Значение параметра `ПАРАМЕТР_3` меньше, чем `"ЗНАЧЕНИЕ_3"` в лексикографическом смысле.

{includetag(event-log)}
{ifdef(public)}
## {heading(Примеры выражений)[id=event-log-search-lang-examples]}

[cols="1,1", options="header"]
|===
|Выражение
|Результат поиска

|`source.id=iam AND (subject.address="127.0.0.1" OR status.code=500)`
|Все события сервиса IAM, произошедшие с пользователем по IP-адресу `127.0.0.1` или вызвавшие код ошибки 500

|`severity=CRITICAL AND subject.metadata.email: "@example.ru"`
|Все критические события, произошедшие у пользователей с почтовым доменом `example.ru`

|`timestamp > "2023-06-02T15:04:05Z03:00" AND source.address="127.0.0.1" AND resource.metadata.stream_id="2278584446"`
|Все события, произошедшие на объекте с именем `2278584446` по IP-адресу `127.0.0.1` после 15:04:05 2 июня 2023 года. Время указано для часового пояса UTC+3
|===
{/ifdef}
{/includetag}