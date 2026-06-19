# {heading(Архитектура сервиса)[id=monitoring-architecture]}

## {heading(Концепции)[id=monitoring-architecture-concepts]}

Сервис Cloud Monitoring состоит из нескольких частей:

- Масштабируемый API по приему метрик.
- Распределенное хранилище метрик.
- Масштабируемый API по чтению значений метрик и построению запроса.
- Агенты для отправки стандартных метрик.
- Пользовательский интерфейс с возможностью строить дашборды и графики.
- Сервис централизованного обновления агентов мониторинга.

## {heading(Пространства имен (namespace))[id=monitoring-namespace]}

Каждый сервис пишет данные в свое пространство имен. Стандартные названия для пространств имен, формируемые сервисами {var(cloud)}, имеют вид: `mcs/servicename`. Если необходимо писать пользовательские метрики, то название для пространства имен не должно начинаться с символов `mcs/`.

#### {heading(Стандартные пространства имен)[id=monitoring-standard-namespace]}

{ifdef(public)}
[cols="1,1", options="header"]
|===
|Название сервиса
|Название пространства имен

|Cloud Servers
|`mcs/vm`

|Cloud Networks
|`mcs/network`

|{var(s3)}
|`mcs/cloudstorage`

|Cloud Containers
|`mcs/containers`

|Cloud Databases
|`mcs/databases`

|SQS
|`mcs/managedqueue`

|Marketplace
|`mcs/marketplace`

|CDN
|`mcs/cdn`

|Arenadata DB as a Service
|`mcs/dwh`

|Cloud Monitoring
|`mcs/monitoring`
|===
{/ifdef}

{ifdef(private-pdf,private-pg-pdf)}
В {linkto(#tab_comparison_operators)[text=таблице %number]} приведены стандартные названия пространств имен, используемые в {var(cloud)}.

<!--- //todo Таблицу ниже необходимо актуализировать для релиза 4.3 -->

{caption(Таблица {counter(table)[id=numb_tab_comparison_operators]} — Пространства имен для ресурсов)[align=right;position=above;id=tab_comparison_operators;number={const(numb_tab_comparison_operators)}]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
[cols="1,1", options="header"]
|===
|Название ресурса
|Название пространства имен

|Виртуальные машины
|`mcs/vm`

|Базы данных
|`mcs/dbaas`

|Кластеры Kubernetes
|`mcs/kubernetes`

|Резервные копии
|`mcs/backup`

|Магазин приложений
|`mcs/marketplace`
|===
{/ifdef}{ifdef(private-pdf,private-pg-pdf)}
{/caption}{/ifdef}
{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
Пространство имен задается в процессе интеграции сторонней системы с {var(cloud)}.

{note:info}
Если указать несуществующее название пространства имен, график нельзя будет создать из-за отсутствия параметров для ресурса.
{/note}

{/ifdef}

## {heading(Метки (label))[id=monitoring-label]}

В метках передается дополнительная метаинформация, которая может идентифицировать целевой ресурс, например для ВМ это могут быть название или идентификатор ВМ.

Для каждой метрики, которая отправляется в хранилище, можно указать произвольный набор меток, т.е. пар ключ/значение. Например, вы вместе со значением метрики `cpu_total` хотите передать имя хоста виртуальной машины и название зоны доступности, в которой она находится. Тогда вам необходимо заполнить значения для меток `host` и `availability_zone`.

Переданные метки и их значения сохраняются в базу данных Cloud Monitoring. Значения одной и той же метрики автоматически агрегируются с точностью до периодов 1 минута, 5 минут, 1 час. Агрегирование происходит по всем полям меток, с которыми было сохранено значение метрики.

Далее ключи и значения меток можно использовать для построения запросов, которые фильтруют и группируют значения метрик. Например, можно построить такой запрос в формате типа PromQL:

```promql
SUM BY(host) (cpu:Minimum{instance="<"span >"server1", app!="<"span >"system"})
```

```promql
SUM BY(job) (cpu:Average{host="<"span >"server1", job!="<"span >"system"}[12h] offset 24h)
```

## {heading(Агрегирование)[id=monitoring-aggregation]}

Основные характеристики процесса агрегирования:

- Cloud Monitoring автоматически агрегирует значения метрик по интервалам 1 минута, 5 минут, 1 час.
- Сырые значения метрик автоматически удаляются после агрегирования.
- По умолчанию поддерживаются следующие функции агрегирования:

  - минимум,
  - максимум,
  - среднее.

- Агрегирование происходит по всем полям меток, с которыми было сохранено значение метрики.
- Агрегированные метрики хранятся в течение 30 дней.
- Пользователь может получить значения агрегированных метрик с фильтрацией по необходимым значениям меток.

## {heading(Единицы измерения)[id=monitoring-units-of-measurement]}

В Cloud Monitoring есть стандартные единицы измерений, которые можно передавать и по которым можно агрегировать:

`Seconds`, `Microseconds`, `Milliseconds`, `Bytes`, `Kilobytes`, `Megabytes`, `Gigabytes`, `Terabytes`, `Bits`, `Kilobits`, `Megabits`, `Gigabits`, `Terabits`, `Percent`, `Count`, `Bytes/Second`, `Kilobytes/Second`, `Megabytes/Second`, `Gigabytes/Second`, `Terabytes/Second`, `Bits/Second`, `Kilobits/Second`, `Megabits/Second`, `Gigabits/Second`, `Terabits/Second`, `Count/Second`, `None`

Если единица измерений не указана, используется `None`.
