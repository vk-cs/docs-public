Zabbix — это ПО для мониторинга приложений, серверов и сетевых устройств.

Для мониторинга инстансов кластера баз данных можно использовать систему мониторинга Zabbix. Этот раздел не включает в себя информацию о разворачивании сервера мониторинга Zabbix. Он содержит информацию о дополнительно устанавливаемых компонентах, которые расширяют возможности сервера и агентов мониторинга. Предполагается, что вы самостоятельно установите и настроите клиентскую часть системы мониторинга Zabbix агента на инстансах кластера БД.

Многочисленные предустановленные шаблоны, разработанные для Zabbix, позволяют получать информацию о состоянии множества сервисов. Решения совместимы с версиями Zabbix 3.4 и выше.

## Пользовательские параметры

- server (обязательный параметр) — IP-адрес или имя  сервера мониторинга Zabbix.
- listen_port (default: 10050) — порт Zabbix агента для пассивных проверок.
- server_port (default: 10051) — порт Zabbix сервера для активных проверок.
- b64_pkcs12_container (default: none) — файл в формате PKS#12 без пароля конвертированный в base4 содержащий сертификат удостоверяющего центра,  приватный ключ и сертификат Zabbix агента.
- psk (default: none) — секретный ключ (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — версия Zabbix агента (возможные значения 3.4 или 5.0). Параметр доступен для PostgreSQL и PostgreSQL Pro.
- hostname — имя хоста (с учетом регистра) для отображения на сервере Zabbix. Допустимые символы: латинские строчные, заглавные, цифры и символы: '.', ' ', '_', '-'. По умолчанию — имя ВМ инстанса СУБД. Не использовать для кластеров СУБД.

## Мониторинг PostgreSQL

- server (обязательный параметр) — IP-адрес или имя  сервера мониторинга Zabbix.
- listen_port (default: 10050) — порт Zabbix агента для пассивных проверок.
- server_port (default: 10051) — порт Zabbix сервера для активных проверок.
- b64_pkcs12_container (default: none) — файл в формате PKS#12 без пароля конвертированный в base4 содержащий сертификат удостоверяющего центра,  приватный ключ и сертификат Zabbix агента.
- psk (default: none) — секретный ключ (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — версия Zabbix агента. Возможные значения 3.4 и 5.0. Для PostgreSQL и PostgreSQL Pro также доступен 5.0v2 — для установки Zabbix Agent 2.
- hostname — имя хоста (с учётом регистра) для отображения на сервере Zabbix. Допустимые символы: латинские строчные, заглавные, цифры и символы: '.', ' ', '_', '-'. По умолчанию — имя ВМ инстанса СУБД. Не использовать для кластеров СУБД.

При установке версии агента 3.4 на Zabbix сервер следует установить шаблон [pg_monz](https://www.google.com/url?q=https://github.com/pg-monz/pg_monz/blob/master/README-en.md&sa=D&source=docs&ust=1635767629305000&usg=AOvVaw3-3XfumQyub6xvlkGtZvjE). Для этого необходимо [распаковать архив](https://github.com/pg-monz/pg_monz/archive/refs/tags/2.2.tar.gz) и импортировать шаблон из директории `/pg_monz-2.2/pg_monz/template/` на Zabbix сервере. При этом шаблон настраивать не нужно.

Для версии агента 5.0 следует использовать шаблон Zabbix сервера PosgreSQL Agent. При этом не требуется настройка шаблона.

Для версии агента 5.0v2 следует использовать шаблон Zabbix сервера PosgreSQL Agent 2.

В настройках шаблона следует установить:

- PG.URI — tcp://127.0.0.1:5432;
- PG.DB — postgres.

## Мониторинг MySQL

Установка расширения Zabbix Agent для MySQL позволяет собирать перечисленные ниже метрики:

| Метрика| Описание|
|-------------------------|---------------------------------------------------------------------------------|
| mysql status            | Версия, идентификатор, состояние, непрерывное время работы.                     |
| connections status      | Ошибки связи и прерванные соединения.                                           |
| traffic                 | Получено/отправлено, байт в секунду.                                            |
| temporary objects usage | Использование временных файлов, таблиц и таблиц на дисках.                      |
| keys usage              | Количество записей, чтений, использование блоков и кэша MyISAM.                 |
| operations count        | Операций в секунду для begin, commit, delete, insert, rollback, select, update. |
| queries                 | Количество запросов в секунду и медленных запросов.                             |
| table locks             | Количество немедленных и ожидаемых блокировок таблиц.                           |
| threads count           | Количество работающих, созданных подключенных и кэшированных потоков.           |

При выборе Zabbix агента версии 3.4 устанавливаются компоненты темплейта [mysbix](https://github.com/sergiotocalini/mysbix).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [этот темплейт](https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml).

<warn>

В некоторых версиях Zabbix сервер может быть уже установлен темплейт с таким же именем. Рекомендуем перед импортом изменить имя темплейта в xml файле на уникальное, чтобы избежать коллизий.

При выборе версии агента v.5.0 используйте темплейт [Template DB MySQL by Zabbix agent](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mysql_agent?at=refs%2Fheads%2Frelease%2F5.0) предустановленный на Zabbix сервер версии 5.0 и выше.

</warn>

## Мониторинг Galera

Для мониторинга Galera вместе с Zabbix агентом версии 3.4 устанавливаются компоненты темплейта [zabbix-galera-template](https://github.com/MogiePete/zabbix-galera-template), который позволяет собирать перечисленные ниже метрики:

| Метрика| Описание                                                                                        |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| cluster information        | идентификатор кластера, количество членов                                                                                        |
| cluster member status      | готовность, состояние подключения к кластеру, состояние протокола EVS, идентификатор групповой связи, номер последней транзакции |
| cluster member performance | события потока управления и состояние очередей запросов                                                                          |
| replication counters       | количественные показатели реплицированных данных и ключей                                                                        |

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [этот темплейт](https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml).

## Мониторинг MongoDB

Установка расширения Zabbix агента для MongoDB позволяет собирать перечисленные ниже метрики:

|Метрика|Описание|
|----------------------|---------------------------------------------------------------------------------------------------------------------------|
| db status            | Готовность, состояние подключений.                                                                                        |
| operations count     | Команд, вставок, удалений, запросов в секунду.                                                                            |
| storage engine cache | Использование кэша хранилища.                                                                                             |
| network usage        | Показатели сетевой активности.                                                                                            |
| memory usage         | Использование памяти.                                                                                                     |
| per db metrics       | Средний размер и количество объектов, количество коллекций, объем данных, количество и размер индексов, размер хранилища. |

При выборе Zabbix агента версии 3.4 устанавливаются компоненты темплейта [zabbix-mongodb](https://github.com/omni-lchen/zabbix-mongodb).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [этот темплейт](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml).

При выборе Zabbix агента версии 5.0 будет установлен агент второго поколения, который поддерживает темплейт [Template DB MongoDB node by Zabbix Agent 2](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mongodb/template_db_mongodb.xml?at=refs%2Fheads%2Frelease%2F5.0) предустановленный на Zabbix server версии 5.0 и выше. Установите значение макроса “{$MONGODB.CONNSTRING}” равное “mcs_mongodb" для авторизации на наблюдаемом хосте.

## Мониторинг Clickhouse

Установка расширения Zabbix Agent для ClickHouse позволяет собирать перечисленные ниже метрики:

|Метрика|Описание|
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| db status        | Готовность, состояние подключений.                                                                                                              |
| operations count | Вставок\строк в секунду, запросов в секунду.                                                                                                    |
| query            | Количество текущих запросов, максимальное время выполнение текущих запросов, количество обработанных запросов и вставок, задержки при вставках. |
| merge            | Слияний несжатых байт и слияний строк в секунду.                                                                                                |
| replication      | Использование памяти для репликации, лаг, количество задач репликации в очереди.                                                                |
| memory usage     | Использование памяти для фоновых слияний, мутаций, доставок.                                                                                    |

При выборе версии zabbix агента 3.4 устанавливаются компоненты темплейта [clickhouse-zabbix-template](https://www.google.com/url?q=https://github.com/Altinity/clickhouse-zabbix-template/&sa=D&source=docs&ust=1635766525505000&usg=AOvVaw1EbWUEyfblJ3WnlZpK9shE).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) [этот темплейт](https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml).

Если ваш zabbix-server версии 5.0 или выше используйте встроенный темплейт [Template DB ClickHouse by HTTP](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/clickhouse_http?at=refs%2Fheads%2Frelease%2F5.0).

При установке расширения укажите параметры:

- source_ip_addresses — для указания разрешенных адресов, для подключения к clickhouse-server по http в формате аналогичном настройками разрешений [cllickhouse users](https://clickhouse.com/docs/ru/operations/settings/settings-users/#user-namenetworks) (разделитель — запятая).
- zabbix_clickhouse_password — для использования значения в макросе “{$CLICKHOUSE.PASSWORD}”
- mcs_user — для макроса {$CLICKHOUSE.USER}.

## Мониторинг Redis

Установка расширения Zabbix агент для Redis позволяет собирать перечисленные ниже метрики:

|Метрики|Описание|
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| command statistics | Статистика по командам: количество, задержка.                                                                                   |
| clients            | статистика по подключениям: количество, подключений в секунду, заблокировано, максимальный буфер и максимальный вывод клиентов. |
| performance        | Использование памяти и процессора.                                                                                              |
| keys               | Счетчики ключей, и статистика связанная с базой данных.                                                                         |
| replication        | Состояние репликации.                                                                                                           |
| slowlog            | Информация о медленных запросах.                                                                                                |

Для мониторинга Redis Zabbix агента версии 3.4 устанавливаются компоненты темплейта [zabbix-redis-template](https://github.com/pavelnemirovsky/zabbix-redis-template).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) этот темплейт[этот темплейт](https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml).

При выборе Zabbix агента версии 5.0 будет установлен агент второго поколения, который поддерживает темплейт [Template DB Redis](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/redis?at=release/5.0) предустановленный на zabbix-server v5.0 и выше.

## Пример сценария подключения инстансов к серверу мониторинга

1.  Обеспечьте сетевую связность инстанса и сервера мониторинга по портам для активных и пассивных проверок ([подробнее здесь](https://www.zabbix.com/documentation/current/ru/manual/appendix/items/activepassive)).
2.  Определитесь с методом шифрования передаваемых данных (без шифрования, TLS или PSK). При установке Zabbix агента вы можете выбрать оба метода защиты соединения, в таком случае в процессе эксплуатации способ шифрования можно будет изменять меняя конфигурацию подключения только на сервере ([подробнее здесь](https://www.zabbix.com/documentation/current/ru/manual/encryption)).
3.  Установите Zabbix агент на инстанс или все экземпляры кластера с желаемыми пользовательскими параметрами.
4.  Подключите инстансы к Zabbix серверу в разделе Configuration -> Hosts -> Create Hosts ([подробнее здесь](https://www.zabbix.com/documentation/5.4/ru/manual/config/hosts/host)).

<warn>

Используйте короткое имя инстанса (hostname -s) для значения полей Host name, PSK identity (если используется PSK).

5.  Назначьте темплейт(ы) мониторинга для инстанса или для группы в которую входит инстанс ([подробнее здесь](https://www.zabbix.com/documentation/5.4/ru/manual/config/templates/linking)).
6.  Через 10 минут убедитесь, что данные от агента поступают на сервер в разделе Monitoring -> Latest Data, отфильтровав содержимое по имени инстанса. Исторические сведения по метрикам вы можете просмотреть там же — в последней колонке.

</warn>
