{includetag(intro-dbaas)}

ClickHouse is an open-source columnar analytical DBMS developed by ClickHouse Inc.

The main advantage of this DBMS is fast processing of OLAP queries on structured big data. ClickHouse efficiently uses CPU resources and can process data stored on hard drives without fully loading that data into the memory cache.

ClickHouse uses its own SQL dialect with a number of extensions and limitations compared to standard SQL. Key extensions include the ability to work with external key-value stores (dictionaries) and aggregate functions for approximate computations. Key limitations include the absence of transactions and support for point UPDATE/DELETE (only batch UPDATE/DELETE is available), and limited JOIN syntax support.

ClickHouse is recommended when:

- you need to generate analytical reports on big data in real time — for example, calculating application customer behavior analytics;
- a large volume of incoming data is continuously written to the database, while a consistently high read query processing speed is required;
- linear scalability is important.

{/includetag}

{includetag(intro-dp)}

Cloud ClickHouse is a ready-made solution for storing and analyzing historical data based on the columnar analytical DBMS ClickHouse developed by ClickHouse Inc.

The main advantage of this DBMS is fast processing of OLAP queries on structured big data. Cloud ClickHouse efficiently uses CPU resources and can process data stored on hard drives without fully loading that data into the memory cache.

Cloud ClickHouse uses its own SQL dialect with a number of extensions and limitations compared to standard SQL. Key extensions include the ability to work with external key-value stores (dictionaries) and aggregate functions for approximate computations. Key limitations include the absence of transactions and support for point UPDATE/DELETE (only batch UPDATE/DELETE is available), and limited JOIN syntax support.

Cloud ClickHouse is recommended when:

- you need to generate analytical reports on big data in real time — for example, calculating application customer behavior analytics;
- a large volume of incoming data is continuously written to the database, while a consistently high read query processing speed is required;
- linear scalability is important.

{/includetag}

{includetag(open)}

{ifdef(public)}
1. [Go](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the name of the required instance.

{/includetag}

{includetag(password)}

Password requirements:

- at least 16 characters;
- at least one uppercase and one lowercase letter of the Latin alphabet;
- at least one digit;
- at least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

{note:warn}
Save the password. Password recovery is not supported.
{/note}

{/includetag}

{includetag(maintenance)}

1. Select the days of the week and the start time of maintenance, considering the time zone specified in the block.

    The duration of maintenance, including backup, is 4 hours. During this time, the service may be unavailable.

1. Set the maximum number of full backups. This number depends on the data archival retention requirements or may be dictated by regulatory requirements. When the maximum number is exceeded, older backups will be overwritten.

    A full backup includes files, databases, settings, and configurations necessary to restore the system in case of failure, data loss, or other issues.

1. Set the incremental backup schedule in crontab format or select an existing one from the list.

    An incremental backup contains only the data that has changed since the previous backup run (full or incremental). This backup is smaller in size than a full one.

1. Set the maximum number of incremental backups. When the maximum number is exceeded, older backups will be overwritten.

{/includetag}
