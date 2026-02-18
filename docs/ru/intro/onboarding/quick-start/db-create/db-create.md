# {heading(Cloud Databases: создайте первую управляемую базу данных)[id=onboarding-db-create]}

[Cloud Databases](/ru/dbs/dbaas/concepts/about) — сервис, позволяющий работать с управляемыми базами данных.

Начните работу с сервисом [Cloud Databases](/ru/dbs/dbaas/concepts/about) любым удобным способом:

- Воспользуйтесь [инструкцией](#create_db_postgre) и создайте первую управляемую базу данных PostgreSQL, подключитесь к ней и выполните тестовые запросы.
- Посмотрите [видео](#db_video), в которых будут созданы управляемые базы данных MySQL, PostgreSQL и ClickHouse в конфигурации Single.
- Пройдите [бесплатный обучающий курс](https://cloud.vk.com/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/). В теоретической части курса объясняется, что такое база данных и система управления базами данных, какие есть типы и конфигурации БД. В практической части курса вы создадите [кластер PostgreSQL](https://cloud.vk.com/cloud-native-courses/advanced/postgresql/#sozdanieclastera) и [БД MySQL](https://cloud.vk.com/cloud-native-courses/advanced/mysql/#praktikamysql), затем подключите созданную БД MySQL к приложению, установленному на виртуальной машине.

{note:info}Инстанс БД потребляет вычислительные ресурсы и [тарифицируется](/ru/dbs/dbaas/tariffication).{/note}

## {heading(Создайте управляемую БД PostgreSQL)[id=create_db_postgre]}

Пройдя все шаги этой инструкции, вы:

1. [Создадите](#instance_create) инстанс БД PostgreSQL в конфигурации Single.
1. [Получите](#instance_ip) внешний IP-адрес созданного инстанса БД.
1. (Опционально) [Посмотрите](#instance_logs) логи созданного инстанса БД.
1. [Установите](#install_timescaledb) в инстанс БД расширение [TimescaleDB](https://docs.timescale.com).
1. [Подключитесь](#db_connect) к БД.
1. [Создадите](#tables_create) таблицы в БД.
1. [Наполните](#tables_fill) таблицы данными.
1. [Выполните](#db_select) тестовые запросы к БД.
1. (Опционально) [Познакомитесь](#db_monitoring) с данными мониторинга, собранными за время работы инстанса БД.

В качестве примера тестовых данных будет использован автоматически генерируемый набор данных, представляющий собой информацию от сенсоров интернета вещей (IoT): температуры и загрузки CPU. Подробнее про тестовый набор данных читайте в [документации Timescale](https://docs.timescale.com/tutorials/latest/simulate-iot-sensor-data/). Процедура генерации подобных наборов данных подробно [рассматривается в блоге Timescale](https://www.timescale.com/blog/how-to-create-lots-of-sample-time-series-data-with-postgresql-generate_series/).

{include(/ru/_includes/_db-create.md)[tags=db_onboarding; level=+1]}

## {heading(Видеоинструкции)[id=db_video]}

{tabs}

{tab(MySQL)}
В этом видео будет создана управляемая база данных MySQL в конфигурации Single, настроены резервное копирование и мониторинг, затем будет выполнено подключение к созданной БД. 

MySQL используется преимущественно для веб-приложений и небольших проектов.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239409&hash=c7f0ae9350b0f51c&hd=3)[type=vkvideo]}
{/tab}

{tab(PostgreSQL)}
В этом видео будет создана управляемая база данных PostgreSQL в конфигурации Single, настроен мониторинг, затем будет выполнено подключение к созданной БД. 

PostgreSQL подходит для критически важных приложений, где необходимы высокая доступность и целостность данных.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239411&hash=297f56a0664e28de&hd=3)[type=vkvideo]}
{/tab}

{tab(ClickHouse)}
В этом видео будет создана управляемая база данных ClickHouse в конфигурации Single, настроены резервное копирование и мониторинг, затем будет выполнено подключение к созданной БД. 

ClickHouse используется преимущественно для аналитики больших объемов данных в режиме реального времени и построения отчетов.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239410&hash=5dd6bfe20d0e063e&hd=4)[type=vkvideo]}
{/tab}

{/tabs}

## {heading(Обучающий курс)[id=courses_db]}

Пройдите [бесплатный обучающий курс](https://cloud.vk.com/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/).

В теоретической части курса объясняется, что такое база данных и система управления базами данных, какие есть типы и конфигурации БД. В практической части курса вы создадите [кластер PostgreSQL](https://cloud.vk.com/cloud-native-courses/advanced/postgresql/#sozdanieclastera) и [БД MySQL](https://cloud.vk.com/cloud-native-courses/advanced/mysql/#praktikamysql), затем подключите созданную БД MySQL к приложению, установленному на виртуальной машине.

## Вопросы и ответы

{cut(Какие СУБД доступны в облаке?)}

Полный [список](/ru/dbs/dbaas/concepts/types) поддерживаемых СУБД и их [конфигурации](/ru/dbs/dbaas/concepts/work-configs).

{/cut}

{cut(Как масштабировать базу данных?)}

Вы можете изменить тип виртуальной машины, на которой размещены базы данных, или увеличить размер диска. При смене типа ВМ изменения вступают в силу после перезагрузки ВМ.

Также вы можете подключить автомасштабирование размера диска базы данных. Тогда при увеличении объема данных размер диска увеличится автоматически.

Инструкции по масштабированию инстанса БД в разделе [Управление инстансом БД](/ru/dbs/dbaas/instructions/manage-instance).

{/cut}

{cut(Какие расширения и плагины можно установить на инстанс БД?)}

[Список](/ru/dbs/dbaas/concepts/extensions) доступных расширений и плагинов для разных СУБД.

{/cut}
