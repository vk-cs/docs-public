Описаны расширения, специфичные для [PostgreSQL](../../types/postgresql) и [PostgresPro](../../types/postgrespro). О расширениях для мониторинга инстанса БД читайте в разделах [node_exporter](../node-exporter), [postgres_exporter](../node-exporter) и [zabbix](../zabbix).

<info>

Набор доступных для установки расширений зависит от выбранной версии PostgreSQL и PostgresPro, а также от редакции PostgresPro.

</info>

## Holistic.dev (holistic)

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

[Holistic.dev](https://holistic.dev/) — статический анализатор и инструмент для извлечения сведений об организации базы данных. Благодаря собранным данным инструмент автоматически контролирует целостность отношений (relations) между объектами базы данных и обнаруживает возможные проблемы. Информацию из отчетов Holistic.dev администраторы используют при оптимизации базы данных. Holistic.dev собирает только сведения о DML-запросах и схеме базы данных, конфигурация базы данных и планы выполнения запросов не анализируются.

Подробнее читайте в [официальном FAQ расширения](https://holistic.dev/faq).

</tabpanel>
<tabpanel>

- `databases`: список баз данных, в которых должно работать расширение. Обязательный параметр.
- `api_key`: API-ключ Holistic.dev. Обязательный параметр.
- `project_name`: имя проекта Holistic.dev. Обязательный параметр.

</tabpanel>
</tabs>

## JsQuery

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение предоставляет язык запросов [JsQuery](https://postgrespro.ru/products/extensions/jsquery), расширяющий возможности PostgreSQL по обработке типa данных [jsonb](https://www.postgresql.org/docs/current/datatype-json.html). Расширение облегчает поиск во вложенных объектах и массивах, позволяет использовать операторы сравнения с поддержкой индексов.

</tabpanel>
<tabpanel>

`database`: список баз данных, в которых должно работать расширение.

<info>

Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.

</info>

</tabpanel>
</tabs>

## pgBadger

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение [pgBadger](https://pgbadger.darold.net/) позволяет анализировать логи PostgreSQL и затем строить отчеты, содержащие статистику по SQL-запросам, работе функции [Autovacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM) и другие данные. Подробнее о возможностях читайте в [документации расширения](https://pgbadger.darold.net/documentation.html#FEATURE).

</tabpanel>
<tabpanel>

- `s3_bucket`: имя бакета [объектного хранилища](/ru/base/s3), где будут храниться отчеты. Обязательный параметр.

  Если бакета с таким именем не существует — [создайте его](/ru/base/s3/buckets/create-bucket).

  <warn>

  Бакет должен иметь настройки ACL по умолчанию `public-read-write`.

  </warn>

  Отчеты по конкретному инстансу БД хранятся в папке с именем, совпадающим с идентификатором инстанса. Идентификатор можно получить, [посмотрев информацию об инстансе БД](/ru/dbs/dbaas/instructions/manage-instance/postgresql#poluchenie_informacii_ob_instanse_bd).

- `period`: интервал между созданием отчетов (в часах).

  Значение должно быть больше нуля. Значение по умолчанию: `24`.

- `log_min_duration_statement`: минимальная длительность SQL-запроса (в миллисекундах). Все запросы с указанной или большей длительностью попадут в лог PostgreSQL для последующего анализа pgBadger.

  Если задать отрицательное значение, то не будет логироваться ни один SQL-запрос. В отчете pgBadger не будут содержаться сведения о запросах.

  Значение по умолчанию: `0` (в лог попадают все SQL-запросы).

- `log_rotation`: количество дней, за которые необходимо хранить отчеты. Более старые отчеты будут удаляться.

  Значение по умолчанию: `0` (не удалять ничего).

</tabpanel>
</tabs>

## pg_hint_plan

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

При выполнении SQL-запроса планировщик PostgreSQL пытается выбрать наилучший план выполнения (execution plan). Выбранный план не всегда оптимален, так как планировщик не учитывает некоторые свойства данных, например корреляции между столбцами. Расширение [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) позволяет корректировать планы выполнения запроса с помощью указаний (hints) планировщику PostgreSQL. Указания передаются в виде комментариев особого вида к SQL-запросам или записей в специальной таблице `hint_plan.hints`.

</tabpanel>
<tabpanel>

- `enable_hint_table`: определяет, разрешено ли использовать указания из таблицы `hint_plan.hints`.

  Значение по умолчанию: `on` (разрешено).

- `parse_messages`: определяет уровень, начиная с которого в лог будут попадать сообщения, связанные с разбором указаний. Например, при выборе `info` в лог попадут сообщения с уровнем `info`, `notice`, `warning` и `error`.

  Допустимые значения:

  - `error` (ошибка);
  - `warning` (предупреждение);
  - `notice` (уведомление);
  - `info` (информация);
  - `log` (логирование);
  - `debug` (отладка).

  Значение по умолчанию: `info`.

- `debug_print`: управляет выводом отладочной информации и уровнем ее детализации.

  Допустимые значения:

  - `off`: вывод отладочной информации выключен;
  - `on`: вывод отладочной информации включен;
  - `detailed`: более детальный вывод отладочной информации включен;
  - `verbose`: наиболее детальный вывод отладочной информации включен.

  Значение по умолчанию: `off`.

- `message_level`: определяет уровень, начиная с которого в лог будут попадать отладочные сообщения. Например, при выборе `info` в лог попадут сообщения с уровнем `info`, `notice`, `warning` и `error`.

  Допустимые значения:

  - `error`;
  - `warning`;
  - `notice`;
  - `info`;
  - `log`;
  - `debug`.

  Значение по умолчанию: `info`.

</tabpanel>
</tabs>

## pg_partman

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение pg_partman предназначено для расширенного управления партиционированием таблиц (partitioning). Поддерживается два вида партиционирования: на основе триггеров `pg_partman` и нативное (native) на основе функциональности, встроенной в PostgreSQL. Подробнее в [документации расширения](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md).

Вместе с расширением создается схема (schema) `partman`, в которую происходит установка.

Для нативного партицирования в PostgreSQL будет создан и настроен пользователь `partman`, для которого можно задать пароль. Для партицирования на основе триггеров `pg_partman` необходимо использовать пользователя `postgres`.

</tabpanel>
<tabpanel>

- `database`: список баз данных, в которых должно работать расширение.

  <info>

  Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.

  </info>

- `interval`: интервал (в секундах) между запуском функции [run_maintenance()](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#maintenance-functions) фоновым процессом ([background worker](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#background-worker), BGW).

  Значение по умолчанию: `3600` (один час).

- `analyze`: настройки запуска анализа родительской таблицы (parent table) после создания таблицы-наследника (child table).

  Допустимые значения настройки:

  - `default`: поведение по умолчанию. Оно различается для разных версий PostgreSQL:

    - для PostgreSQL 10: запускать анализ родительской таблицы;
    - для PostgreSQL 11 и выше: не запускать анализ родительской таблицы.

  - `on`: запускать анализ родительской таблицы.
  - `off`: не запускать анализ родительской таблицы.

  Значение по умолчанию: `default`.

</tabpanel>
</tabs>

## pg_stat_kcache

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение [pg_stat_kcache](https://github.com/powa-team/pg_stat_kcache) собирает статистику о реальных операциях чтения и записи, выполненных на уровне файловой системы.

<info>

Для работы этого расширения требуется расширение [pg_stat_statements](#pg_stat_statements). Если оно еще не установлено, то установка будет выполнена автоматически.

</info>

</tabpanel>
<tabpanel>

`database`: список баз данных, в которых должно работать расширение.

</tabpanel>
</tabs>

## pg_stat_statements

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) позволяет отслеживать статистику по планированию и выполнению сервером PostgreSQL всех SQL-выражений (SQL statements).

</tabpanel>
<tabpanel>

`database`: список баз данных, в которых должно работать расширение.

</tabpanel>
</tabs>

## PostGIS

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение [PostGIS](http://postgis.net/) добавляет в PostgreSQL возможности по работе с географическими объектами. Реализуется несколько типов пространственных данных, поддерживается хранение, индексирование и обработка геоданных.

Подробнее о работе с расширением в разделе [Использование расширения PostGIS в PostgreSQL и PostgresPro](../../use-cases/using-postgis).

</tabpanel>
<tabpanel>

- `database`: список баз данных, в которых должно работать расширение.

- `extension_list`: список дополнительных расширений, которые нужно установить вместе с PostGIS.

  Значение по умолчанию: не выбрано ни одно из доступных расширений.

  <details>
  <summary>Доступные для установки расширения</summary>

  <!-- prettier-ignore -->
  | Название    |  Описание |
  | ----------- | --------- |
  | [address_standardizer_data_us](https://postgis.net/docs/Extras.html#Address_Standardizer)   | Позволяет выполнять нормализацию адресов для США |
  | [address_standardizer](https://postgis.net/docs/Extras.html#Address_Standardizer)           | Позволяет выполнять нормализацию адресов |
  | [postgis_tiger_geocoder](https://postgis.net/docs/Extras.html#Tiger_Geocoder)               | Позволяет выполнять геокодирование в формате [TIGER](http://www.census.gov/geo/www/tiger/) |
  | [postgis_topology](https://postgis.net/docs/Topology.html)                                  | Реализует типы данных и функции для управления топологическими объектами |
  | [pgrouting](http://pgrouting.org/)                                                          | Добавляет функциональность для геопространственной маршрутизации |

  </details>

</tabpanel>
</tabs>

## postgres_extensions

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Набор популярных расширений PostgreSQL, не требующих дополнительной настройки. Вы можете выбрать для установки одно или несколько расширений, они перечислены на вкладке **Параметры расширения**.

</tabpanel>
<tabpanel>

- `databases`: список баз данных, в которых должно работать расширение.

- `extension_list`: список расширений, которые нужно установить.

  Значение по умолчанию: выбраны все доступные расширения из списка.

  <details>
  <summary>Доступные для установки расширения</summary>

  <!-- prettier-ignore -->
  | Название    |  Описание |
  | ----------- | --------- |
  | [amcheck](https://www.postgresql.org/docs/current/amcheck.html)                         | Предоставляет функции для проверки логической целостности структуры отношений (relations) |
  | [autoinc](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.6)      | Предоставляет функции для автоматического инкремента полей |
  | [bloom](https://www.postgresql.org/docs/current/bloom.html)                             | Предоставляет индексный метод доступа, основанный на фильтрах Блума |
  | [btree_gin](https://www.postgresql.org/docs/current/btree-gin.html)                     | Предоставляет примеры классов GIN-операторов, которые реализуют поведение, эквивалентное B-деревьям для многих типов данных и всех типов-перечислений (enums) |
  | [btree_gist](https://www.postgresql.org/docs/current/btree-gist.html)                   | Предоставляет классы GiST-операторов, которые реализуют поведение, эквивалентное B-деревьям для многих типов данных и всех типов-перечислений (enums) |
  | [citext](https://www.postgresql.org/docs/current/citext.html)                           | Реализует тип данных `citext` для хранения строк, нечувствительных к регистру |
  | [cube](https://www.postgresql.org/docs/current/cube.html)                               | Реализует тип данных `cube` для представления многомерных кубов |
  | [dblink](https://www.postgresql.org/docs/current/contrib-dblink-function.html)          | Позволяет выполнить SQL-запрос к удаленной (remote) базе данных PostgreSQL из текущей сессии |
  | [dict_int](https://www.postgresql.org/docs/current/dict-int.html)                       | Предоставляет пример дополнительного шаблона словаря для полнотекстового поиска. Словарь позволяет индексировать целые числа (со знаком и без). Благодаря этому список уникальных слов не разрастается, а скорость поиска увеличивается |
  | [dict_xsyn](https://www.postgresql.org/docs/current/dict-xsyn.html)                     | Предоставляет пример дополнительного шаблона словаря для полнотекстового поиска. Словарь заменяет слова на группы синонимов, что позволяет искать слова по их синонимам |
  | [earthdistance](https://www.postgresql.org/docs/current/earthdistance.html)             | Позволяет вычислять расстояния между точками на поверхности Земли двумя способами: [по кубам](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.7) и [по точкам](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.8).<br><br>При выполнении расчетов Земля считается идеальной сферой. Если это слишком грубое допущение, воспользуйтесь расширением [PostGIS](#postgis).<br><br>**Зависимости:** расширение `cube`. Если оно не установлено, то установка будет выполнена автоматически |
  | [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html)             | Предоставляет функции для определения уровня сходства строк и расстояния между строками |
  | [hstore](https://www.postgresql.org/docs/current/hstore.html)                           | Реализует тип данных `hstore` для хранения пар строк ключ/значение внутри одного значения |
  | [intarray](https://www.postgresql.org/docs/current/intarray.html)                       | Предоставляет функции и операторы для работы с массивами целых чисел, не содержащих `NULL` |
  | [isn](https://www.postgresql.org/docs/current/isn.html)                                 | Реализует типы данных для следующих международных стандартов нумерации товаров:<br><ul><li>EAN13</li><li>UPC</li><li>ISBN (книги)</li><li>ISMN (музыка)</li><li>ISSN (серийные номера)</li></ul> |
  | [lo](https://www.postgresql.org/docs/current/lo.html)                                   | Реализует тип данных `lo` и триггер `lo_manage` для управления большими объектами (BLOBs). Позволяет корректно работать с большими объектами при использовании драйверов JDBC и ODBC |
  | [ltree](https://www.postgresql.org/docs/current/ltree.html)                             | Реализует тип данных `ltree` для представления меток данных. Метки хранятся в иерархической древовидной структуре. Также предоставляются расширенные возможности для поиска в такой структуре |
  | [moddatetime](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.8)  | Реализует триггер, сохраняющий текущее время в поле типа `timestamp`. Это может быть полезно, например, для отслеживания времени последней модификации строки таблицы |
  | [pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache.html)            | Предоставляет средства для отслеживания состояния общего кеша буферов (shared buffer cache) в реальном времени |
  | [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)                          | Предоставляет средства на основе триграмм для определения уровня сходства строк и быстрого поиска похожих строк |
  | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)                       | Предоставляет криптографические функции для PostgreSQL: функции хеширования, шифрования, генерации случайных данных |
  | [pgrowlocks](https://www.postgresql.org/docs/current/pgrowlocks.html)                   | Предоставляет функцию для отображения информации о блокировке строк указанной таблицы |
  | [pgstattuple](https://www.postgresql.org/docs/current/pgstattuple.html)                 | Предоставляет функции для получения статистики на уровне кортежей (tuple) |
  | [postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw.html)               | Предоставляет обертку над сторонними данными (foreign-data wrapper, FDW) для доступа к данным, хранящимся на внешнем сервере PostgreSQL |
  | [seg](https://www.postgresql.org/docs/current/seg.html)                                 | Реализует тип данных `seg` для представления отрезков линий или интервалов чисел с плавающей точкой |
  | [tablefunc](https://www.postgresql.org/docs/current/tablefunc.html)                     | Предоставляет различные функции, возвращающие набор строк (таблицы) |
  | [uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp.html)                     | Предоставляет функции для генерации универсальных уникальных идентификаторов (UUIDs) с использованием стандартных алгоритмов |
  | [xml2](https://www.postgresql.org/docs/current/xml2.html)                               | Предоставляет функции для работы с XML. Можно выполнять запросы XPath и преобразования XSLT |

  </details>

</tabpanel>
</tabs>

## TimescaleDB

<tabs>
<tablist>
<tab>Описание расширения</tab>
<tab>Параметры расширения</tab>
</tablist>
<tabpanel>

Расширение [TimescaleDB](https://docs.timescale.com/) добавляет в PostgreSQL расширенные возможности по работе с временными рядами (time series). Обеспечена полная поддержка стандартного синтаксиса SQL PostgreSQL для работы с данными временных рядов, хранящихся в гипертаблицах (hypertables). Поддерживается автоматическое партиционирование гипертаблиц с данными временных рядов по времени и пространству.

</tabpanel>
<tabpanel>

`database`: список баз данных, в которых должно работать расширение.

<info>

Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.

</info>

</tabpanel>
</tabs>
