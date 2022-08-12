## Концепции

Сервис мониторинга VK Cloud состоит из нескольких частей:

1.  Масштабируемый API по приему метрик
2.  Распределенное хранилище метрик
3.  Масштабируемый API по чтению значений метрик и построению запроса
4.  Агенты для отправки стандартных метрик
5.  UI с возможностью строить дашборды и графики
6.  Сервис централизованного обновления агентов мониторинга

## Namespaces

Каждый сервис пишет данные в свой namespace. Стандартные имена Namespace,формируемые сервисами VK Cloud, выглядят как “mcs/servicename”. Если необходимо писать кастомные метрики, то название Namespace не должно начинаться с “mcs/”.

#### Таблица стандартных Namespace

<table><tbody><tr><td style="background-color: rgb(209, 213, 216);"><p><strong>Название сервиса</strong></p></td><td style="background-color: rgb(209, 213, 216);"><p><strong>Название Namespace</strong></p></td></tr><tr><td>Облачные вычисления</td><td>mcs/vm</td></tr><tr><td>Виртуальные сети</td><td>mcs/network</td></tr><tr><td>Объектное хранилище</td><td>mcs/cloudstorage</td></tr><tr><td>Контейнеры</td><td>mcs/containers</td></tr><tr><td>Базы данных</td><td>mcs/databases</td></tr><tr><td>Большие данные</td><td>mcs/bigdata</td></tr><tr><td>SQS</td><td>mcs/managedqueue</td></tr><tr><td>Marketplace</td><td>mcs/marketplace</td></tr><tr><td>CDN</td><td>mcs/cdn</td></tr><tr><td>Аналитические БД</td><td>mcs/dwh</td></tr><tr><td>IoT</td><td>mcs/iot</td></tr><tr><td>Monitoring</td><td>mcs/monitoring</td></tr></tbody></table>

## Метки (Labels)

В Labels передается дополнительная метаинформация, которая может идентифицировать целевой ресурс, который мы мониторим. Т.е. В случае VM - название VM или id VM.

Для каждой метрики, которая отправляется в хранилище можно указать произвольный набор пар “ключ-значение” (labels). Например, вы вместе со значением метрики cpu_total хотите передать имя хоста виртуальной машины и название availability zone, в которой она находится, тогда вам необходимо заполнить значения для меток ‘host’ и ‘availability_zone’.

Переданные метки и их значения сохраняются в базу данных VK Cloud Cloud Monitoring. Значения одной и той же метрики автоматически агрегируются с точностью до периодов 1 минута, 5 минут, 1 час. Агрегирование происходит по всем полям labels, с которыми была сохранено значение метрики

Далее ключи и значения меток можно использовать для построения запросов, которые фильтруют и группируют значения метрик. Например, можно построить такой запрос в формате ala PromQL:

```
SUM BY(host) (cpu:Minimum{instance="<"span >"server1", app!="<"span >"system"})
```

```
SUM BY(job) (cpu:Average{host="<"span >"server1", job!="<"span >"system"}[12h] offset 24h
```

## Агрегация

1.  VK Cloud Monitoring автоматически агрегирует значения метрик по интервалам 1 минута, 5 минут, 1 час
2.  Сырые значения метрик автоматически удаляются после агрегации
3.  Из коробки поддерживаются следующие функции агрегации:
    1.  Минимум
    2.  Максимум
    3.  Среднее
4.  Агрегирование происходит по всем полям labels, с которыми была сохранено значение метрики
5.  Агрегированные метрики хранятся в течение 30 дней
6.  Пользователь может получить значения агрегированных метрик с фильтрацией по необходимым значениям Labels

## Единицы измерения

В VK Cloud Monitoring есть стандартные единицы измерений, которые можно передавать и по которым агрегировать:

Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None

Если не указана единица измерений, то подразумевается None.
