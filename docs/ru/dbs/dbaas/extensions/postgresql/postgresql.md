# {heading(Расширения PostgreSQL)[id=dbaas-extensions-postgresql]}

Описаны расширения, специфичные для {linkto(../../concepts/types/postgresql#dbaas-concepts-postgresql)[text=PostgreSQL]}. О расширениях для мониторинга инстанса БД читайте в разделах {linkto(../node-exporter#dbaas-node-exporter)[text=node_exporter]} и {linkto(../zabbix#dbaas-zabbix)[text=zabbix]}.

{note:info}
Набор доступных для установки расширений зависит от выбранной версии PostgreSQL.
{/note}

{ifdef(public)}
## {heading(JsQuery)[id=dbaas-extensions-postgresql-jsquery]}

{tabs}

{tab(Описание расширения)}

Расширение предоставляет язык запросов [JsQuery](https://postgrespro.ru/products/extensions/jsquery), расширяющий возможности PostgreSQL по обработке типa данных [jsonb](https://www.postgresql.org/docs/current/datatype-json.html). Расширение облегчает поиск во вложенных объектах и массивах, позволяет использовать операторы сравнения с поддержкой индексов.

{/tab}

{tab(Параметры расширения)}

`database`: список баз данных, в которых должно работать расширение.

{note:info}
Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.
{/note}

{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}
## {heading(pgBadger)[id=dbaas-extensions-postgresql-pgbadger]}

{tabs}

{tab(Описание расширения)}

Расширение [pgBadger](https://pgbadger.darold.net/) позволяет анализировать логи PostgreSQL и затем строить отчеты, содержащие статистику по SQL-запросам, работе функции [Autovacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM) и другие данные. Подробнее о возможностях читайте в [документации расширения](https://pgbadger.darold.net/documentation.html#FEATURE).

{/tab}

{tab(Параметры расширения)}

- `s3_bucket`: имя бакета [VK Object Storage](../../../../storage/s3), где будут храниться отчеты. Обязательный параметр.

  Если бакета с таким именем не существует — [создайте его](../../../../storage/s3/instructions/buckets/create-bucket).

  {note:warn}
  Бакет должен иметь настройки ACL по умолчанию `public-read-write`.
  {/note}

  Отчеты по конкретному инстансу БД хранятся в директории с именем, совпадающим с идентификатором инстанса. Идентификатор можно получить, {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-get-info)[text=посмотрев информацию об инстансе БД]}.

- `period`: интервал между созданием отчетов (в часах).

  Значение должно быть больше нуля. Значение по умолчанию: `24`.

- `log_min_duration_statement`: минимальная длительность SQL-запроса (в миллисекундах). Все запросы с указанной или большей длительностью попадут в лог PostgreSQL для последующего анализа pgBadger.

  Если задать отрицательное значение, то не будет логироваться ни один SQL-запрос. В отчете pgBadger не будут содержаться сведения о запросах.

  Значение по умолчанию: `0` (в лог попадают все SQL-запросы).

- `log_rotation`: количество дней, за которые необходимо хранить отчеты. Более старые отчеты будут удаляться.

  Значение по умолчанию: `0` (не удалять ничего).

{/tab}

{/tabs}
{/ifdef}

{ifdef(public)}
## {heading(PgBouncer)[id=dbaas-extensions-postgresql-pgbouncer]}

{tabs}

{tab(Описание расширения)}

Балансировщик [PgBouncer](https://www.pgbouncer.org) работает как прокси, управляя пулом клиентских подключений к серверу БД. Он переиспользует соединения, снижая нагрузку на сервер и повышая производительность. 
Поддерживает три режима: сессионный (session), транзакционный (transaction), оперативный (statement).
Подробнее о работе с расширением балансировщика в разделе {linkto(../../how-to-guides/tls-connect#dbaas-tls-connect)[text=Использование TLS-протокола для подключения к PostgreSQL]}.

{/tab}

{tab(Параметры расширения)}

- `pool_mode`: режим управления соединениями. 
  Возможные значения:
    - `session`: соединение возвращается в пул после завершения сессии.
    - `transaction`: соединение возвращается в пул после завершения транзакции.
    - `statement`: соединение возвращается в пул после выполнения каждого SQL-запроса. Этот режим подходит для простых запросов, но может быть несовместим с некоторыми функциями PostgreSQL (например, временными таблицами или курсорами).
- `max_client_conn`: ограничение числа клиентских подключений для предотвращения перегрузки балансировщика.
- `listen_port`: порт для входящих подключений.

{/tab}

{/tabs}
{/ifdef}

## {heading(pg_hint_plan)[id=dbaas-extensions-postgresql-pghintplan]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

При выполнении SQL-запроса планировщик PostgreSQL пытается выбрать наилучший план выполнения (execution plan). Выбранный план не всегда оптимален, так как планировщик не учитывает некоторые свойства данных, например корреляции между столбцами. Расширение [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) позволяет корректировать планы выполнения запроса с помощью указаний (hints) планировщику PostgreSQL. Указания передаются в виде комментариев особого вида к SQL-запросам или записей в специальной таблице `hint_plan.hints`.

{/tab}

{tab(Параметры расширения)}

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

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
Название модуля в личном кабинете: `pg_hint_plan`.

Hint plan — управление планом выполнения запроса с помощью указаний, записываемых в комментариях особого вида. На {var(cloud)} поддерживается для СУБД PostgreSQL.

{ifdef(private-pdf, private-pg-pdf)}
Параметры расширения перечислены в {linkto(#tab_extension_hint_plan_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_extension_hint_plan_params]} — Параметры для расширения Hint plan)[align=right;position=above;id=tab_extension_hint_plan_params;number={const(numb_tab_extension_hint_plan_params)}]}
{/ifdef}
[cols="1,1,3", options="header"]
|===
|Параметр
|Значение по умолчанию
|Описание

|`enable_hint_table`
|`on`
|Использование указаний из таблицы

|`parse_messages`
|`info`
|Уровень сообщений, которые будут попадать в журнал

|`debug_print`
|`off`
|Вывод и детализация отладочной информации

|`message_level`
|`info`
|Уровень отладочных сообщений, которые будут попадать в журнал
|===
{ifdef(private-pdf, private-pg-pdf)}
{/caption}
{/ifdef}

{note:warn}
Если БД восстанавливается из резервной копии, установите повторно параметр базы данных `shared_preload_libraries` = `pg_hint_plan`.
{/note}

Подробная информация о расширении (его синтаксис, подзапросы, ошибки и прочее) приведена в [официальной документации](https://mcs.mail.ru/docs/ru/dbs/dbaas/db-extensions/hint-plan).
{/ifndef}

{ifdef(public)}
## {heading(pg_partman)[id=dbaas-extensions-postgresql-pgpartman]}

{tabs}

{tab(Описание расширения)}

Расширение pg_partman предназначено для расширенного управления партиционированием таблиц (partitioning). Поддерживается два вида партиционирования: на основе триггеров `pg_partman` и нативное (native) на основе функциональности, встроенной в PostgreSQL. Подробнее в [документации расширения](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md).

Вместе с расширением создается схема (schema) `partman`, в которую происходит установка.

Для нативного партицирования в PostgreSQL будет создан и настроен пользователь `partman`, для которого можно задать пароль. Для партицирования на основе триггеров `pg_partman` необходимо использовать пользователя `postgres`.

{/tab}

{tab(Параметры расширения)}

- `database`: список баз данных, в которых должно работать расширение.

  {note:info}
  Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.
  {/note}

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

{/tab}

{/tabs}
{/ifdef}

## {heading(pg_stat_kcache)[id=dbaas-extensions-postgresql-pgstatkcache]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

Расширение [pg_stat_kcache](https://github.com/powa-team/pg_stat_kcache) собирает статистику о реальных операциях чтения и записи, выполненных на уровне файловой системы.

{note:info}
Для работы этого расширения требуется расширение {linkto(#dbaas-extensions-postgresql-pgstatstatements)[text=pg_stat_statements]}. Если оно еще не установлено, то установка будет выполнена автоматически.
{/note}

{/tab}

{tab(Параметры расширения)}

`database`: список баз данных, в которых должно работать расширение.

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
Название модуля в личном кабинете: `pg_stat_kcache`.

`pg_stat_kcache` — расширение, предоставляющее статистику о реальных чтениях и записях на уровне файловой системы.

Подробная информация о расширении приведена в [официальной документации](https://github.com/powa-team/pg_stat_kcache) на GitHub.

При установке расширения возможно добавить параметр `database` — имя базы данных, для которой будет установлено расширение.
{/ifndef}

## {heading(pg_stat_statements)[id=dbaas-extensions-postgresql-pgstatstatements]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

Расширение [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) позволяет отслеживать статистику по планированию и выполнению сервером PostgreSQL всех SQL-выражений (SQL statements).

{/tab}

{tab(Параметры расширения)}

`database`: список баз данных, в которых должно работать расширение.

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
Название модуля в личном кабинете: `pg_stat_statements`.

Расширение [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) предоставляет возможность отслеживать статистику планирования и выполнения операторов SQL сервером PostgreSQL.

При установке расширения возможно добавить параметр `database` — имя базы данных, для которой будет установлено расширение.
{/ifndef}

## {heading(PostGIS)[id=dbaas-extensions-postgresql-postgis]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

Расширение [PostGIS](http://postgis.net/) добавляет в PostgreSQL возможности по работе с географическими объектами. Реализуется несколько типов пространственных данных, поддерживается хранение, индексирование и обработка геоданных.

Подробнее о работе с расширением в разделе {linkto(../../how-to-guides/using-postgis#dbaas-using-postgis)[text=Использование расширения PostGIS в PostgreSQL]}.

{/tab}

{tab(Параметры расширения)}

- `database`: список баз данных, в которых должно работать расширение.

- `extension_list`: список дополнительных расширений, которые нужно установить вместе с PostGIS.

  Значение по умолчанию: не выбрано ни одно из доступных расширений.

  {cut(Доступные для установки расширения)}

  <!-- prettier-ignore -->
  | Название    |  Описание |
  | ----------- | --------- |
  | [address_standardizer_data_us](https://postgis.net/docs/Extras.html#Address_Standardizer)   | Позволяет выполнять нормализацию адресов для США |
  | [address_standardizer](https://postgis.net/docs/Extras.html#Address_Standardizer)           | Позволяет выполнять нормализацию адресов |
  | [postgis_tiger_geocoder](https://postgis.net/docs/Extras.html#Tiger_Geocoder)               | Позволяет выполнять геокодирование в формате [TIGER](http://www.census.gov/geo/www/tiger/) |
  | [postgis_topology](https://postgis.net/docs/Topology.html)                                  | Реализует типы данных и функции для управления топологическими объектами |
  | [pgrouting](http://pgrouting.org/)                                                          | Добавляет функциональность для геопространственной маршрутизации |

  {/cut}

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
PostGIS — расширение PostgreSQL для работы с географическими объектами. Поддерживает несколько типов пространственных данных, обеспечивает хранение, индексирование и обработку геоданных.

Подробная информация о расширении приведена в [официальной документации](https://postgis.net).

Параметры расширения:

* `database` — список баз данных, в которых будет работать расширение.
* `extension_list` — список дополнительных расширений, которые нужно установить вместе с PostGIS {ifdef(private-pdf, private-pg-pdf)}
  (подробнее — в {linkto(#tab_extension_postgis)[text=таблице %number]}){/ifdef}.

{ifdef(private-pdf, private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_extension_postgis]} — Доступные для установки расширения)[align=right;position=above;id=tab_extension_postgis;number={const(numb_tab_extension_postgis)}]}
{/ifdef}
[cols="2,3", options="header"]
|===
|Название
|Описание

|`address_standardizer_data_us`
|Нормализация адресов для США

|`address_standardizer`
|Нормализация адресов

|`postgis_tiger_geocoder`
|Геокодирование в формате TIGER

|`postgis_topology`
|Типы данных и функции для управления топологическими объектами

|`pgrouting`
|Геопространственная маршрутизация
|===
{ifdef(private-pdf, private-pg-pdf)}
{/caption}
{/ifdef}
{/ifndef}

## {heading(postgres_extensions)[id=dbaas-extensions-postgresql-postgresextensions]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

Набор популярных расширений PostgreSQL, не требующих дополнительной настройки. Вы можете выбрать для установки одно или несколько расширений, они перечислены на вкладке **Параметры расширения**.

{/tab}

{tab(Параметры расширения)}

- `databases`: список баз данных, в которых должно работать расширение.

- `extension_list`: список расширений, которые нужно установить.

  Значение по умолчанию: выбраны все доступные расширения из списка.

  {cut(Доступные для установки расширения)}

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
  | [earthdistance](https://www.postgresql.org/docs/current/earthdistance.html)             | Позволяет вычислять расстояния между точками на поверхности Земли двумя способами: [по кубам](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.7) и [по точкам](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.8).<br><br>При выполнении расчетов Земля считается идеальной сферой. Если это слишком грубое допущение, воспользуйтесь расширением {linkto(#dbaas-extensions-postgresql-postgis)[text=PostGIS]}.<br><br>**Зависимости:** расширение `cube`. Если оно не установлено, то установка будет выполнена автоматически |
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

  {/cut}

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
Название модуля в личном кабинете: `postgres_extensions`.

Набор расширений для PostgreSQL может существенно расширить функциональность БД как сервиса. Примеры: мониторинг, криптография, дополнительные типы данных и многое другое.

Параметры расширения:

* `database` — имя базы данных, для которой будет установлено расширение.
* `extension_list` — список дополнений для установки. Выбранные дополнения перечисляются через запятую. Если оставить параметр пустым, будут установлены все доступные дополнения.

Доступные для установки дополнения перечислены в [официальной документации](https://mcs.mail.ru/docs/dbs/dbaas/db-extensions/postgresql-optional-modules).
{/ifndef}

## {heading(TimescaleDB)[id=dbaas-extensions-postgresql-timescaledb]}

{ifdef(public)}
{tabs}

{tab(Описание расширения)}

Расширение [TimescaleDB](https://docs.timescale.com/) добавляет в PostgreSQL расширенные возможности по работе с временными рядами (time series). Обеспечена полная поддержка стандартного синтаксиса SQL PostgreSQL для работы с данными временных рядов, хранящихся в гипертаблицах (hypertables). Поддерживается автоматическое партиционирование гипертаблиц с данными временных рядов по времени и пространству.

{/tab}

{tab(Параметры расширения)}

`database`: список баз данных, в которых должно работать расширение.

{note:info}
Если расширение установлено, то из параметра `database` нельзя удалить уже внесенные в него базы данных, только добавить новые.
{/note}

{/tab}

{/tabs}
{/ifdef}

{ifndef(public)}
Название модуля в личном кабинете: `timescaledb`.

TimescaleDB — расширение PostgreSQL для работы с временными рядами, реализованными в виде гипертаблиц (`create_hypertable`).

Подробная информация о расширении приведена в [официальной документации](https://docs.timescale.com/api/latest/).

При установке расширения возможно добавить параметр `database` — имя базы данных, для которой будет установлено расширение.
{/ifndef}

{ifndef(public)}
## {heading(PostgreSQL Server Exporter)[id=dbaas-extensions-postgresql-exporter]}

Название модуля в личном кабинете: `postgres_exporter`.

PostgreSQL Server Exporter — утилита сбора метрик с экземпляров кластера СУБД PostgreSQL в формате, доступном Prometheus (подробнее — в [официальной документации](https://github.com/prometheus-community/postgres_exporter) на GitHub).

Пример настройки мониторинга на основе Prometheus+Grafana+PostgreSQL Exporter приведен в [официальной документации](https://mcs.mail.ru/docs/ru/additionals/cases/cases-monitoring/case-psql-exporter) VK Cloud.
{/ifndef}