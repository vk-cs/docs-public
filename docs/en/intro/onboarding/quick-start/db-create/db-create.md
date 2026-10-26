# {heading(Cloud Databases: create your first managed database)[id=onboarding-db-create]}

{include(/en/_includes/_translated_by_ai_en.md)}

[Cloud Databases](/en/dbs/dbaas/concepts/about) is a service that allows you to work with managed databases.

Start working with the [Cloud Databases](/en/dbs/dbaas/concepts/about) service in any convenient way:

- Follow the [instructions](#onboarding-db-create-postgre) to create your first managed PostgreSQL database, connect to it, and run test queries.
- Watch the [videos](#onboarding-db-create-video) where managed MySQL, PostgreSQL, and ClickHouse databases in the Single configuration are created.
- Take the [free training course](https://cloud.vk.ru/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/). The theoretical part of the course explains what a database and a database management system are, and what types and configurations of databases exist. In the practical part of the course, you will create a [PostgreSQL cluster](https://cloud.vk.ru/cloud-native-courses/advanced/postgresql/#sozdanieclastera) and a [MySQL database](https://cloud.vk.ru/cloud-native-courses/advanced/mysql/#praktikamysql), then connect the created MySQL database to an application installed on a virtual machine.

{note:info}A database instance consumes computing resources and is [billed](/en/dbs/dbaas/tariffication).{/note}

## {heading(Create a managed PostgreSQL database)[id=onboarding-db-create-postgre]}

After completing all the steps in this instruction, you will:

1. [Create](#instance_create) a PostgreSQL database instance in the Single configuration.
1. [Get](#instance_ip) an external IP address of the created database instance.
1. [Install](#install_timescaledb) the [TimescaleDB](https://docs.timescale.com) extension in the database instance.
1. [Connect](#db_connect) to the database.
1. [Create](#tables_create) tables in the database.
1. [Fill](#tables_fill) the tables with data.
1. [Run](#db_select) test queries against the database.
1. (Optionally) [Explore](#db_monitoring) the monitoring data collected during the database instance operation.

As an example of test data, an automatically generated dataset will be used, representing information from Internet of Things (IoT) sensors: temperature and CPU load. For more details about the test dataset, see the [Timescale documentation](https://docs.timescale.com/tutorials/latest/simulate-iot-sensor-data/). The procedure for generating similar datasets is [covered in detail in the Timescale blog](https://www.timescale.com/blog/how-to-create-lots-of-sample-time-series-data-with-postgresql-generate_series/).

{include(../../../../_includes/_db-create.md)[tags=db_onboarding; level=+1]}

## {heading(Video instructions)[id=onboarding-db-create-video]}

{tabs}

{tab(MySQL)}
This video shows how to create a managed MySQL database in the Single configuration, configure backup and monitoring, and then connect to the created database.

MySQL is used primarily for web applications and small projects.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239409&hash=c7f0ae9350b0f51c&hd=3)[type=vkvideo]}
{/tab}

{tab(PostgreSQL)}
This video shows how to create a managed PostgreSQL database in the Single configuration, configure monitoring, and then connect to the created database.

PostgreSQL is suitable for mission-critical applications that require high availability and data integrity.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239411&hash=297f56a0664e28de&hd=3)[type=vkvideo]}
{/tab}

{tab(ClickHouse)}
This video shows how to create a managed ClickHouse database in the Single configuration, configure backup and monitoring, and then connect to the created database.

ClickHouse is used primarily for analytics of large volumes of data in real time and for building reports.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239410&hash=5dd6bfe20d0e063e&hd=4)[type=vkvideo]}
{/tab}

{/tabs}

## {heading(Training course)[id=onboarding-db-create-courses]}

Take the [free training course](https://cloud.vk.ru/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/).

The theoretical part of the course explains what a database and a database management system are, and what types and configurations of databases exist. In the practical part of the course, you will create a [PostgreSQL cluster](https://cloud.vk.ru/cloud-native-courses/advanced/postgresql/#sozdanieclastera) and a [MySQL database](https://cloud.vk.ru/cloud-native-courses/advanced/mysql/#praktikamysql), then connect the created MySQL database to an application installed on a virtual machine.

## {heading(FAQ)[id=onboarding-db-create-faq]}

{cut(Which DBMSs are available in the cloud?)}

The full [list](/en/dbs/dbaas/concepts/types) of supported DBMSs and their [configurations](/en/dbs/dbaas/concepts/work-configs).

{/cut}

{cut(How do I scale a database?)}

You can change the type of the virtual machine hosting the databases or increase the disk size. When the VM type is changed, the changes take effect after the VM is rebooted.

You can also enable automatic scaling of the database disk size. Then, when the amount of data grows, the disk size will increase automatically.

For instructions on scaling a database instance, see the section [DB instance management](/en/dbs/dbaas/instructions/manage-instance).

{/cut}

{cut(Which extensions and plugins can be installed on a database instance?)}

The [list](/en/dbs/dbaas/concepts/extensions) of available extensions and plugins for different DBMSs.

{/cut}