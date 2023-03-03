## Типы хранилищ

В платформе IoT выделяют типы хранилищ:

- Хранилище метаинформации. Хранит всю метаинформацию: пользовательские настройки и данные. Основным инструментом работы с метаинформацией является графический интерфейс платформы https://iot.mcs.mail.ru

- Долговременное хранилище. Основное аналитическое хранилище данных от устройств в платформе IoT. Основным инструментом работы с долговременным хранилищем является [публичное HTTP API](../../../api/api-iot/). В API есть эндпоинт для выполнения произвольных аналитических SQL-запросов. Для SQL доступны операции `SELECT` и `INSERT`. Синтаксис SQL-запросов полностью совместим с синтаксисом Clickhouse, поэтому при написании запросов можно руководствоваться [официальной документацией](https://clickhouse.com/docs/en/interfaces/http/) базы данных Clickhouse в части [синтаксиса запросов](https://clickhouse.com/docs/en/sql-reference).

- Оперативное хранилище. Хранит в себе данные от устройств за последние 24 часа и предназначено для активной работы с оперативными данными от устройств. Основным инструментом работы с оперативным хранилищем является [публичное HTTP API](../../../api/api-iot/).

- Сервис цифровых двойников. Хранит в себе актуальные состояния датчиков, устройств, агентов и переменных для бизнес-правил. Основным инструментом работы с сервисом является [публичное HTTP API](../../../api/api-iot/).

## Примеры работы с данными в хранилищах

### Получение токена доступа

<info>

Параметры для подключения доступны в разделе [Сервисные аккаунты](https://iot.mcs.mail.ru/service-accounts/) в карточке аккаунта на вкладке **Инструкция по подключению**.

</info>

Чтобы получить токен доступа `ACCESS_TOKEN`, выполните запрос:

```curl
curl -X POST https://iot.mcs.mail.ru/keycloak/auth/realms/iot/protocol/openid-connect/token -d "client_id=<CLIENT_ID>&client_secret=<SECRET_KEY>&grant_type=client_credentials" -H "Content-Type: application/x-www-form-urlencoded"
```

где:

- `CLIENT_ID` — идентификатор сервисного аккаунта IoT.
- `SECRET_KEY` — секретный ключ для указываемого аккаунта.

Экспортируйте переменные `CLIENT_ID` и сгенерированный `ACCESS_TOKEN` в окружение, чтобы использовать их для последующих запросов:

```bash
export CLIENT_ID=<CLIENT_ID>
export ACCESS_TOKEN=<ACCESS_TOKEN>
```

### Работа с хранилищем метаинформации

#### Получить список правил

```bash
curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/registry/v1/clients/${CLIENT_ID}/rules
```

#### Получить корневой тег проекта (структуры)

```bash
curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/registry/v1/clients/${CLIENT_ID}/root_tag
```

#### Получить дочерние теги для корневого тега

```bash
# id корневого тега проекта, который был получен в предыдущем примере
export ROOT_TAG_ID=

curl \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/registry/v1/clients/${CLIENT_ID}/tags/${ROOT_TAG_ID}/children
```

### Работа с долговременным хранилищем

<details>
  <summary>Доступные таблицы для SQL-запросов</summary>

- `events` — временные ряды от сенсоров и история состояний:

```sql
CREATE TABLE
    events (
        tag_id UInt64,
        value_type Enum8(
            'integer' = 0,
            'float' = 1,
            'boolean' = 2,
            'string' = 3,
            'location' = 4,
            'timestamp' = 5
        ),
        integer_value Int64,
        float_value Float64,
        boolean_value UInt8,
        string_value String,
        timestamp_value DateTime64(6, 'UTC'),
        location_value Tuple(lat Float64, lng Float64),
        payload String,
        time DateTime64(6, 'UTC'),
        received_at DateTime64(6, 'UTC')
    );
```

- `aggregates` — подсчитанные платформой IoT агрегаты:

```sql
CREATE TABLE
    aggregates (
        tag_id UInt64,
        value_type Enum8(
            'integer' = 0,
            'float' = 1
        ),
        fvalue Float64,
        ivalue Int64,
        payload String,
        time DateTime64(6, 'UTC'),
        received_at DateTime64(6, 'UTC') DEFAULT now()
    );
```

- `tags` — слепок метаинформации о тегах:

```sql
CREATE TABLE
    tags (
        tag_id UInt64,
        name String,
        label String,
        type Enum8(
            'undefined' = 0,
            'event' = 1,
            'state' = 2,
            'node' = 3,
            'device' = 4,
            'agent' = 5,
            'aggregate' = 6
        ),
        full_name String,
        created_at DateTime64(6, 'UTC'),
        updated_at DateTime64(6, 'UTC'),
        device_id Nullable(UInt64),
        agent_id Nullable(UInt64),
        attrs Nested (key String, value String),
        last_check_date DateTime('UTC'),
        deleted UInt8 DEFAULT 0
    );
```

</details>

#### Сумма и количество показаний сенсора за последний месяц с группировкой по дням

```bash
# id датчика, по которому просматриваются данные
export TAG_ID=
```

<tabs>
<tablist>
<tab>Linux</tab>
<tab>MacOS</tab>
</tablist>
<tabpanel>

```bash
export TS_FROM=$(date -d '-1 month' +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
<tabpanel>

```bash
export TS_FROM=$(date -v-1m +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
</tabs>

```curl
curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d 'tag_id=${TAG_ID}' \
  -d 'ts_from=${TS_FROM}' \
  -d 'ts_to=${TS_TO}' \
  -d 'period=1d' \
  -d '{"sum": null, "count": null}' \
  https://iot.mcs.mail.ru/long-term-storage/api/v1/clients/${CLIENT_ID}/query/events/group
```

#### История изменений состояния за последний день

```bash
# id состояния, по которому просматриваются данные
export TAG_ID=
```

<tabs>
<tablist>
<tab>Linux</tab>
<tab>MacOS</tab>
</tablist>
<tabpanel>

```bash
export TS_FROM=$(date -d '-1 day' +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
<tabpanel>

```bash
export TS_FROM=$(date -v-1d +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
</tabs>

```curl
curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d 'tag_id=${TAG_ID}' \
  -d 'ts_from=${TS_FROM}' \
  -d 'ts_to=${TS_TO}' \
  -d 'limit=100' \
  -d 'order_by=desc(time)' \
  https://iot.mcs.mail.ru/long-term-storage/api/v1/clients/${CLIENT_ID}/query/events
```

#### Получить последние 100 событий (sql)

```bash
curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  --data-urlencode 'query=SELECT * FROM events ORDER BY time DESC LIMIT 100' \
  https://iot.mcs.mail.ru/long-term-storage/api/v1/clients/${CLIENT_ID}/proxy
```

### Работа с оперативным хранилищем

#### Последнее показание сенсора по ID

```bash
curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d 'tag_id={ id }' \
  https://iot.mcs.mail.ru/operational-storage/api/v1/clients/${CLIENT_ID}/query/events/latest
```

#### Среднее, минимум и максимум показаний сенсора за час

```bash
# id датчика, по которому просматриваются данные
export TAG_ID=
```

<tabs>
<tablist>
<tab>Linux</tab>
<tab>MacOS</tab>
</tablist>
<tabpanel>

```bash
export TS_FROM=$(date -d '-1 hour' +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
<tabpanel>

```bash
export TS_FROM=$(date -v-1H +%s000000)
export TS_TO=$(date +%s000000)
```

</tabpanel>
</tabs>

```curl
curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d 'tag_id=${TAG_ID}' \
  -d 'ts_from=${TS_FROM}' \
  -d 'ts_to=${TS_TO}' \
  -d '{"avg": null, "min": null, "max": null}' \
  https://iot.mcs.mail.ru/operational-storage/api/v1/clients/${CLIENT_ID}/query/events/aggregate
```

### Работа с сервисом цифровых двойников

#### Получить текущее значение состояния

```bash
# id состояния, по которому просматриваются данные
export TAG_ID=

curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/digital-twins/api/v1/clients/${CLIENT_ID}/tags/${TAG_ID}
```

#### Получить текущее состояние устройства

```bash
# id устройства
export DEVICE_ID=

curl -G \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  https://iot.mcs.mail.ru/digital-twins/api/v1/clients/${CLIENT_ID}/devices/${DEVICE_ID}
```
