## Развертывание Zabbix агента

Zabbix — это ПО для мониторинга приложений, серверов и сетевых устройств.

Многочисленные предустановленные шаблоны позволяют получать информацию о состоянии множества сервисов. Здесь описаны дополнительно устанавливаемые плагины, которые расширяют возможности сервера мониторинга. Решения совместимы с версиями Zabbix 3.4 и выше.

## Пользовательские параметры

- server (обязательный параметр) — IP-адрес или имя  сервера мониторинга Zabbix.
- listen_port (default: 10050) — порт Zabbix агента для пассивных проверок.
- server_port (default: 10051) — порт Zabbix сервера для активных проверок.
- b64_pkcs12_container (default: none) — файл в формате PKS#12 без пароля конвертированный в base4 содержащий сертификат удостоверяющего центра,  приватный ключ и сертификат Zabbix агента.
- psk (default: none) — секретный ключ (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — версия Zabbix агента (возможные значения 3.4 или 5.0). Параметр доступен для PostgreSQL и PostgreSQL Pro.

## Мониторинг PostgreSQL

- server (обязательный параметр) — IP-адрес или имя  сервера мониторинга Zabbix.
- listen_port (default: 10050) — порт Zabbix агента для пассивных проверок.
- server_port (default: 10051) — порт Zabbix сервера для активных проверок.
- b64_pkcs12_container (default: none) — файл в формате PKS#12 без пароля конвертированный в base4 содержащий сертификат удостоверяющего центра,  приватный ключ и сертификат Zabbix агента.
- psk (default: none) — секретный ключ (Pre Shared Key).
- zabbix_agent_version (default: 3.4) — версия Zabbix агента. Возможные значения 3.4 и 5.0. Для PostgreSQL и PostgreSQL Pro также доступен 5.0v2 — для установки Zabbix Agent 2.

## Мониторинг PostgreSQL

При установке версии агента 3.4 на Zabbix сервер следует установить шаблон [pg_monz](https://www.google.com/url?q=https://github.com/pg-monz/pg_monz/blob/master/README-en.md&sa=D&source=docs&ust=1635767629305000&usg=AOvVaw3-3XfumQyub6xvlkGtZvjE). Для этого необходимо [распаковать архив](https://github.com/pg-monz/pg_monz/archive/refs/tags/2.2.tar.gz) и импортировать шаблон из директории `/pg_monz-2.2/pg_monz/template/` на Zabbix сервере. При этом шаблон настраивать не нужно.

Для версии агента 5.0 следует использовать шаблон Zabbix сервера PosgreSQL Agent. При этом не требуется настройка шаблона.

Для версии агента 5.0v2 следует использовать шаблон Zabbix сервера PosgreSQL Agent 2.

В настройках шаблона следует установить:

- PG.URI — tcp://127.0.0.1:5432;
- PG.DB — postgres.

## Мониторинг MySQL

Установка расширения Zabbix Agent для ClickHouse позволяет собирать перечисленные ниже метрики:

<table style="border: none; border-collapse: collapse; margin-left: calc(0%); width: 100%;"><tbody><tr><td><p dir="ltr">mysql status</p></td><td><p dir="ltr">Версия, идентификатор, состояние, непрерывное время работы.</p></td></tr><tr><td><p dir="ltr"><span>connections status</span></p></td><td><p dir="ltr">Ошибки связи и прерванные соединения.</p></td></tr><tr><td><p dir="ltr">traffic</p></td><td><p dir="ltr">Получено/отправлено, байт в секунду.</p></td></tr><tr><td><p dir="ltr">temporary objects usage</p></td><td><p dir="ltr">Использование временных файлов, таблиц и таблиц на дисках.</p></td></tr><tr><td><p dir="ltr">keys usage</p></td><td><p dir="ltr">Количество записей, чтений, использование блоков и кэша MyISAM.</p></td></tr><tr><td><p dir="ltr">operations count</p></td><td><p dir="ltr">Операций в секунду для begin, commit, delete, insert, rollback, select, update.</p></td></tr><tr><td><p dir="ltr">queries</p></td><td><p dir="ltr">Количество запросов в секунду и медленных запросов.</p></td></tr><tr><td><p dir="ltr">table locks</p></td><td><p dir="ltr">Количество немедленных и ожидаемых блокировок таблиц.</p></td></tr><tr><td><p dir="ltr">threads count</p></td><td><p dir="ltr">Количество работающих, созданных подключенных и кэшированных потоков.</p></td></tr></tbody></table>

При выборе  Zabbix агента версии 3.4 устанавливаются компоненты темплейта [mysbix](https://github.com/sergiotocalini/mysbix).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) темплейт [https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml](https://raw.githubusercontent.com/sergiotocalini/mysbix/master/zbx3.4_template_db_mysql.xml).

<warn>

В некоторых версиях Zabbix сервер может быть уже установлен темплейт с таким же именем. Рекомендуем перед импортом изменить имя темплейта в xml файле на уникальное, чтобы избежать коллизий.

При выборе версии агента v.5.0 используйте темплейт [Template DB MySQL by Zabbix agent](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mysql_agent?at=refs%2Fheads%2Frelease%2F5.0) предустановленный на Zabbix сервер версии 5.0 и выше.

</warn>

## Мониторинг Galera

Для мониторинга Galera вместе с Zabbix агентом версии 3.4 устанавливаются компоненты темплейта [zabbix-galera-template](https://github.com/MogiePete/zabbix-galera-template), который позволяет собирать перечисленные ниже метрики:

<table border="1" cellpadding="0" cellspacing="0" width="523"><tbody><tr><td valign="bottom" width="34.41682600382409%"><p>cluster information</p></td><td valign="bottom" width="65.5831739961759%"><p>идентификатор кластера, количество членов</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>cluster member status</p></td><td valign="bottom" width="65.5831739961759%"><p>готовность, состояние подключения к кластеру, состояние протокола EVS, идентификатор групповой связи, номер последней транзакции</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>cluster member performance</p></td><td valign="bottom" width="65.5831739961759%"><p>события потока управления и состояние очередей запросов</p></td></tr><tr><td valign="bottom" width="34.41682600382409%"><p>replication counters</p></td><td valign="bottom" width="65.5831739961759%"><p>количественные показатели реплицированных данных и ключей</p></td></tr></tbody></table>

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) темплейт: [https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml](https://raw.githubusercontent.com/MogiePete/zabbix-galera-template/master/App-Galera_Cluster.xml).

## Мониторинг MongoDB

Установка расширения Zabbix агента для ClickHouse позволяет собирать перечисленные ниже метрики:

<table><tbody><tr><td><p dir="ltr">db status</p></td><td><p dir="ltr">Готовность, состояние подключений.</p></td></tr><tr><td><p dir="ltr">operations count</p></td><td><p dir="ltr"><span>Команд, вставок, удалений, запросов в секунду.</span></p></td></tr><tr><td><p dir="ltr">storage engine cache</p></td><td><p dir="ltr">Использование кэша хранилища.</p></td></tr><tr><td><p dir="ltr">network usage</p></td><td><p dir="ltr">Показатели сетевой активности.</p></td></tr><tr><td><p dir="ltr">memory usage</p></td><td><p dir="ltr">Использование памяти.</p></td></tr><tr><td><p dir="ltr">per db metrics</p></td><td><p dir="ltr">Средний размер и количество объектов, количество коллекций, объем данных, количество и размер индексов, размер хранилища.</p></td></tr></tbody></table>

При выборе Zabbix агента версии 3.4 устанавливаются компоненты темплейта [zabbix-mongodb](https://github.com/omni-lchen/zabbix-mongodb).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) темплейт: [https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml).[](https://raw.githubusercontent.com/omni-lchen/zabbix-mongodb/master/Templates/Template_MongoDB.xml)

При выборе Zabbix агента версии 5.0 будет установлен агент второго поколения, который поддерживает темплейт [Template DB MongoDB node by Zabbix Agent 2](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/mongodb/template_db_mongodb.xml?at=refs%2Fheads%2Frelease%2F5.0) предустановленный на Zabbix server версии 5.0 и выше. Установите значение макроса “{$MONGODB.CONNSTRING}” равное “mcs_mongodb" для авторизации на наблюдаемом хосте.

## Мониторинг Clickhouse

Установка расширения Zabbix Agent для ClickHouse позволяет собирать перечисленные ниже метрики:

<table><tbody><tr><td><p>db status</p></td><td><p>Готовность, состояние подключений.</p></td></tr><tr><td><p>operations count</p></td><td><p>Вставок\строк в секунду, запросов в секунду.</p></td></tr><tr><td><p>query</p></td><td><p>Количество текущих запросов, максимальное время выполнение текущих запросов, количество обработанных запросов и вставок, задержки при вставках.</p></td></tr><tr><td><p>merge</p></td><td><p>Слияний несжатых байт и слияний строк в секунду.</p></td></tr><tr><td><p>replication</p></td><td><p>Использование памяти для репликации, лаг, количество задач репликации в очереди.</p></td></tr><tr><td><p>memory usage</p></td><td><p>Использование памяти для фоновых слияний, мутаций, доставок.</p></td></tr></tbody></table>

При выборе версии zabbix агента 3.4 устанавливаются компоненты темплейта [clickhouse-zabbix-template](https://www.google.com/url?q=https://github.com/Altinity/clickhouse-zabbix-template/&sa=D&source=docs&ust=1635766525505000&usg=AOvVaw1EbWUEyfblJ3WnlZpK9shE).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) темплейт: [https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml](https://raw.githubusercontent.com/Altinity/clickhouse-zabbix-template/master/zbx_clickhouse_template.xml).

Если ваш zabbix-server версии 5.0 или выше используйте встроенный темплейт [Template DB ClickHouse by HTTP](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/db/clickhouse_http?at=refs%2Fheads%2Frelease%2F5.0).

При установке расширения укажите параметры:

- source_ip_addresses — для указания разрешенных адресов, для подключения к clickhouse-server по http в формате аналогичном настройками разрешений [cllickhouse users](https://clickhouse.com/docs/ru/operations/settings/settings-users/#user-namenetworks) (разделитель — запятая).
- zabbix_clickhouse_password — для использования значения в макросе “{$CLICKHOUSE.PASSWORD}”
- mcs_user — для макроса {$CLICKHOUSE.USER}.

## Мониторинг Redis

Установка расширения Zabbix агент для Redis позволяет собирать перечисленные ниже метрики:

<table><tbody><tr><td><p>command statistics</p></td><td><p>Статистика по командам: количество, задержка.</p></td></tr><tr><td><p>clients</p></td><td><p>статистика по подключениям: количество, подключений в секунду, заблокировано, максимальный буфер и максимальный вывод клиентов.</p></td></tr><tr><td><p>performance</p></td><td><p>Использование памяти и процессора.</p></td></tr><tr><td><p>keys</p></td><td><p>Счетчики ключей, и статистика связанная с базой данных.</p></td></tr><tr><td><p>replication</p></td><td><p>Состояние репликации.</p></td></tr><tr><td><p>slowlog</p></td><td><p>Информация о медленных запросах.</p></td></tr></tbody></table>

Для мониторинга Redis Zabbix агента версии 3.4 устанавливаются компоненты темплейта [zabbix-redis-template](https://github.com/pavelnemirovsky/zabbix-redis-template).

Для начала использования [импортируйте](https://www.zabbix.com/documentation/current/ru/manual/xml_export_import/templates#%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82) темплейт: [https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml](https://raw.githubusercontent.com/pavelnemirovsky/zabbix-redis-template/master/zbx_template/zbx_export_templates.xml).

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
