Мониторинг для Arenadata DB — готовое решение для мониторинга баз данных Arenadata в инфраструктуре VK Cloud. Содержит набор предустановленных инструментов для сбора метрик, визуализации и своевременного оповещения о проблемах.

Пройдя все шаги этой инструкции, вы:

1. Подключите в личном кабинете VK Cloud сервис Мониторинг для Arenadata DB.

   При подключении автоматически будет создана виртуальная машина и на ней установлены:

   - [Grafana](https://grafana.com/docs/grafana/latest/) — сервис для визуализации и анализа данных мониторинга;
   - [Prometheus](https://prometheus.io/) — сервис мониторинга и оповещений;
   - ADB Exporter — сервис сбора метрик из Arenadata DB;
   - [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) — обработчик оповещений, поступающих от Prometheus.

1. Подготовите базу данных Arenadata для работы с сервисом Мониторинг для Arenadata DB.
1. Настроите сервис ADB Exporter.
1. Установите и настроите Node Exporter — агент сбора метрик состояния операционной системы.
1. Установите и настроите cAdvisor — агент для сбора метрик контейнеров Docker.
1. Подключитесь к сервису Grafana и посмотрите дашборды с данными, поступающими из Prometheus.

## Подготовительные шаги

1. Создайте Telegram-чат, в который будут отправляться оповещения от сервиса Мониторинг для Arenadata DB, сохраните идентификатор чата.
1. Создайте Telegram-бот, который будет использоваться для отправки оповещений, сохраните токен бота.
1. [Зарегистрируйтесь](/ru/intro/onboarding/account) в VK Cloud, если это не сделано ранее.
1. [Создайте](/ru/dbs/adb/quick-start/create-adb) инстанс Arenadata DB. Сохраните данные, указанные при создании инстанса:

   - Имя кластера Arenadata DB. Оно же является именем инстанса.
   - Имя базы данных Arenadata.
   - Имя и пароль пользователя базы данных Arenadata.

   Эти данные понадобятся при подключении и настройке сервиса Мониторинг для Arenadata DB.

1. Перейдите в раздел **Аналитические БД** → **Инстансы АБД**.
1. Нажмите на имя нужного инстанса.
1. На вкладке **Информация** в строке **Connecting settings** найдите и сохраните данные:

   - IP-адрес узла Arenadata DB — значение аргумента `-h` в psql-команде.
   - Порт для подключения к Arenadata DB — значение аргумента `-p` в psql-команде.

   Эти данные понадобятся при подключении и настройке сервиса Мониторинг для Arenadata DB.

## 1. Подключите сервис Мониторинг для Arenadata DB

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. [Создайте](/ru/networks/vnet/instructions/net#sozdanie_seti) сеть с доступом в интернет, если она не была создана ранее.
1. В [настройках подсети](/ru/networks/vnet/instructions/net#redaktirovanie_podseti), где будет размещена ВМ сервиса Мониторинг для Arenadata DB, отключите опцию **Приватный DNS**.
1. Перейдите в раздел **Магазин приложений**, на странице раздела нажмите кнопку **Все решения**.
1. На карточке сервиса **Мониторинг для Arenadata DB** нажмите кнопку **Подробнее**.
1. На странице с описанием сервиса нажмите кнопку **Подключить**.
1. Введите данные на странице **Параметры сервера**.

   1. Укажите параметры виртуальной машины, на которой будет развернут инстанс сервиса:

      - **Зона доступности**: выберите [дата-центр](/ru/start/concepts/architecture#az), где будет запущена ВМ.
      - **Тип виртуальной машины**: выберите предустановленную [конфигурацию ВМ](/ru/computing/iaas/concepts/vm/flavor).
      - **Сеть**: выберите сеть с доступом в интернет и подсеть, для которой отключена опция **Приватный DNS**.

   1. Укажите параметры системного диска и диска с данными:

      - **Размер диска**: укажите нужный размер диска ВМ в гигабайтах.
      - **Тип диска**: выберите [один из типов диска](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) — `HDD`, `SSD` или `High-IOPS SSD`.

1. Нажмите кнопку **Следующий шаг**.
1. Введите данные на странице **Параметры мониторинга**.

   1. Укажите ранее сохраненные данные для подключения к базе данных Arenadata:

      - имя кластера (инстанса) Arenadata DB, для которого будет выполняться мониторинг;
      - IP-адрес узла кластера Arenadata DB, к которому будет подключаться сервис Мониторинг для Arenadata DB;
      - порт для подключения к Arenadata DB;
      - логин и пароль пользователя базы данных Arenadata;
      - имя базы данных в кластере Arenadata DB.

   1. Задайте логин и пароль пользователя для входа в Grafana. Этот пользователь будет обладать правами администратора Grafana.
   1. Укажите ранее сохраненные параметры Telegram-бота для оповещений.

1. Нажмите кнопку **Следующий шаг**.
1. Ознакомьтесь с тарифными условиями и стоимостью инфраструктуры для развертывания сервиса и нажмите кнопку **Подключить тариф**.

   После успешного развертывания на зарегистрированную в VK Cloud почту придут сообщения:

   - уведомление со ссылкой на инстанс сервиса в личном кабинете VK Cloud;
   - письмо с одноразовой ссылкой.

1. Перейдите по одноразовой ссылке из письма и сохраните данные для доступа к сервису:

   - `grafanaUser` и `grafanaPassword` — логин и пароль администратора Grafana;
   - `productURL` — ссылка на веб-интерфейс Grafana;
   - `sshUser` — имя администратора ВМ сервиса Мониторинг для Arenadata DB;
   - `sshKey` — приватный ключ для подключения ĸ ВМ по SSH.

   {note:info}

   Если данные для доступа утрачены, [сгенерируйте](../../instructions/pr-instance-manage#update_access) новые.

   {/note}

## 2. Подключитесь к ВМ сервиса Мониторинг для Arenadata DB

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите на имя ВМ, начинающееся с `adb-monitoring-`.
1. На странице ВМ скопируйте и сохраните внешний IP-адрес. Он понадобится для подключения к ВМ сервиса Мониторинг для Arenadata DB.
1. Создайте на вашем компьютере файл `vkc_monitoring.pem` и скопируйте в него полученный в письме SSH-ключ.
1. Установите доступ к файлу `vkc_monitoring.pem` так, чтобы только владелец имел права на чтение и запись. Для этого выполните команду:

   ```console

   chmod 600 vkc_monitoring.pem

   ```

1. Подключитесь к ВМ сервиса Мониторинг для Arenadata DB, выполнив команду:

   ```console

   ssh -i <ПУТЬ_К_КЛЮЧУ>/vkc_monitoring.pem <ЛОГИН>@<IP-АДРЕС_ВМ>

   ```

   Здесь:

   - `<ПУТЬ_К_КЛЮЧУ>` — путь к директории с файлом `vkc_monitoring.pem`.
   - `<ЛОГИН>` — имя администратора ВМ, полученное в письме (`sshUser`).
   - `<IP-АДРЕС_ВМ>` — сохраненный ранее внешний IP-адрес ВМ сервиса Мониторинг для Arenadata DB.

## 3. Подготовьте Arenadata DB для работы с сервисом Мониторинг для Arenadata DB

1. На ВМ сервиса Мониторинг для Arenadata DB подключитесь к базе данных Arenadata. Для этого выполните команду, подставив в нее ранее сохраненные данные:

   ```console

   psql -h <IP-АДРЕС_БД> -p <ПОРТ> -U <ЛОГИН> <ИМЯ_БД>

   ```

   Здесь:

   - `<IP-АДРЕС_БД>` — IP-адрес узла кластера Arenadata DB.
   - `<ПОРТ>` — порт для подключения к Arenadata DB.
   - `<ЛОГИН>` — логин пользователя Arenadata DB.
   - `<ИМЯ_БД>` — имя базы данных в кластере Arenadata DB.

1. Откройте для редактирования скрипт инициализации базы данных `/home/almalinux/init.sql`.

   {cut(Скрипт инициализации базы данных)}

   ```console

   -- client database
   -- 1. create
   CREATE RESOURCE GROUP monitoring_group
   WITH (
   concurrency=15,
   cpu_rate_limit=1,
   memory_limit=0
   )
   ;
   CREATE USER vkc_monitoring WITH login password '<ПАРОЛЬ>' RESOURCE GROUP monitoring_group CONNECTION LIMIT 5;
   CREATE SCHEMA IF NOT EXISTS vkcloud_toolkit;
   CREATE EXTENSION gp_internal_tools;  -- crates session_state schema


   CREATE OR REPLACE FUNCTION vkcloud_toolkit.pg_stat_replication() RETURNS SETOF pg_stat_replication AS
   $$ SELECT * FROM pg_catalog.pg_stat_replication; $$
   LANGUAGE sql SECURITY definer
   ;

   CREATE OR REPLACE FUNCTION vkcloud_toolkit.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
   $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
   LANGUAGE sql SECURITY definer
   ;


   CREATE OR REPLACE VIEW vkcloud_toolkit.v_replication_delay
   AS SELECT pg_current_xlog_location() - ( SELECT pg_stat_replication.replay_location
            FROM vkcloud_toolkit.pg_stat_replication()) AS replication_delay_bytes
   ;


   CREATE OR REPLACE VIEW vkcloud_toolkit.v_locked_pids
   AS SELECT COALESCE(blockingl.relation::regclass::text, blockingl.locktype) AS locked_item,
      now() - blockeda.query_start AS waiting_duration,
      blockeda.pid AS blocked_pid,
      blockeda.query AS blocked_query,
      blockedl.mode AS blocked_mode,
      blockinga.pid AS blocking_pid,
      blockinga.query AS blocking_query,
      blockingl.mode AS blocking_mode
      FROM pg_locks blockedl
      JOIN vkcloud_toolkit.pg_stat_activity() blockeda ON blockedl.pid = blockeda.pid
      JOIN pg_locks blockingl ON (blockingl.transactionid = blockedl.transactionid OR (blockingl.relation = blockedl.relation AND blockingl.locktype = blockedl.locktype)) AND blockedl.pid <> blockingl.pid
      JOIN vkcloud_toolkit.pg_stat_activity() blockinga ON blockingl.pid = blockinga.pid AND blockinga.datid = blockeda.datid
   WHERE NOT blockedl.granted AND blockinga.datname = current_database()
   ;


   CREATE OR REPLACE VIEW vkcloud_toolkit.v_resgroup_slots
   AS SELECT tt.groupname,
      tt.slots_for_queries,
      tt.active_queries,
      tt.slots_for_queries - tt.active_queries AS free_slots,
      tt.waiting_queries,
      tt.max_wait_sec
      FROM ( SELECT grc.groupname,
               grc.concurrency::bigint AS slots_for_queries,
               COALESCE(act.active_queries, 0::bigint) AS active_queries,
               COALESCE(act.waiting_queries, 0::bigint) AS waiting_queries,
               date_part('epoch'::text, COALESCE(act.max_wait_time, '00:00:00'::interval)) AS max_wait_sec
            FROM gp_toolkit.gp_resgroup_config grc
               LEFT JOIN ( SELECT pg_stat_activity.rsgid,
                     count(1) AS active_queries,
                     count(pg_stat_activity.rsgqueueduration) AS waiting_queries,
                     max(pg_stat_activity.rsgqueueduration) AS max_wait_time
                     FROM vkcloud_toolkit.pg_stat_activity()
                     WHERE pg_stat_activity.rsgname IS NOT NULL AND pg_stat_activity.rsgname <> 'unknown'::text
                     GROUP BY pg_stat_activity.rsgid) act ON grc.groupid = act.rsgid) tt
   ;


   -- 2. grant
   GRANT USAGE ON SCHEMA pg_catalog, gp_toolkit, arenadata_toolkit, vkcloud_toolkit, session_state TO vkc_monitoring;
   GRANT SELECT ON ALL tables IN SCHEMA pg_catalog, gp_toolkit, arenadata_toolkit, vkcloud_toolkit, session_state TO vkc_monitoring;
   GRANT EXECUTE ON ALL functions IN SCHEMA vkcloud_toolkit TO vkc_monitoring;
   GRANT SELECT ON session_state.session_level_memory_consumption TO vkc_monitoring;

   ```

   {/cut}

1. Сгенерируйте или придумайте пароль для пользователя `vkc_monitoring` базы данных Arenadata, от имени которого будет работать сервис Мониторинг для Arenadata DB.
1. Вставьте этот пароль в скрипт `/home/almalinux/init.sql` в строку:

   ```console

   CREATE USER vkc_monitoring WITH login password `<ПАРОЛЬ>` RESOURCE GROUP monitoring_group CONNECTION LIMIT 5;

   ```

1. Сохраните изменения.
1. Внутри терминала `psql` выполните скрипт инициализации базы данных:

   ```console

   \i /home/almalinux/init.sql

   ```

1. Выйдите из терминала `psql` с помощью команды `\q`.

## 4. Настройте сервис ADB Exporter

Сервис ADB Exporter предназначен для экспорта метрик из баз данных Arenadata в Prometheus. Сервис формирует метрики на основе описаний в конфигурационном файле и автоматически обновляет их значения по заданному расписанию, выполняя SQL-запросы к базе данных.

ADB Exporter автоматически устанавливается и настраивается на ВМ инстанса при развертывании сервиса Мониторинг для Arenadata DB. Чтобы ADB Exporter получал метрики из вашей Arenadata DB, укажите в его конфигурационном файле параметры доступа к базе данных:

1. На ВМ сервиса Мониторинг для Arenadata DB откройте конфигурационный файл сервиса ADB Exporter:

   ```console

   sudo nano /etc/adb_exporter/config.yml

   ```

1. Добавьте в конфигурационный файл параметры подключения к базе данных Arenadata с помощью ранее созданного пользователя `vkc_monitoring`:

   ```txt

   datasource:
      dsn: "postgresql://vkc_monitoring:<ПАРОЛЬ>@<IP-АДРЕС_БД>:<ПОРТ>/<ИМЯ_БД>?sslmode=disable"

   ```
   Здесь:

   - `<ПАРОЛЬ>` — ранее заданный пароль пользователя `vkc_monitoring`.
   - `<IP-АДРЕС_БД>` — IP-адрес узла кластера Arenadata DB.
   - `<ПОРТ>` — порт для подключения к Arenadata DB.
   - `<ИМЯ_БД>` — имя базы данных в кластере Arenadata DB.

1. Перезапустите ADB Exporter:

   ```console

   sudo systemctl restart adb_exporter

   ```

1. Проверьте состояние ADB Exporter:

   ```console

   sudo systemctl status adb_exporter

   ```

   Если сервис успешно запущен и работает, ответ команды будет содержать строку:

   ```txt

   Active: active (running)

   ```

## 5. Установите и настройте агент Node Exporter

Агент Node Exporter собирает системные метрики серверов, включая использование процессора, памяти, дисков, файловых систем и сетевых интерфейсов. Без установки этого агента не будут работать некоторые дашборды Grafana и оповещения в Prometheus.

1. Установите агент Node Exporter на все узлы кластера Arenadata DB, как описано на [странице продукта в GitHub](https://github.com/prometheus/node_exporter/blob/master/README.md).
1. На ВМ сервиса Мониторинг для Arenadata DB откройте конфигурационный файл сервиса Prometheus:

   ```console

   sudo nano /opt/monitoring_data/prometheus/prometheus.yml

   ```

1. Добавьте в конфигурационный файл информацию об источниках метрик: IP-адреса узлов кластера (`targets`) и метки метрик (`labels`).

   Пример конфигурации Prometheus:

   ```yml

   - job_name: 'node_exporter'
     static_configs:
       - targets: ['localhost:9100']
         labels:
           instance: segment-1
           adb_cluster: staging

   ```
1. Перезапустите Prometheus.

   ```console

   sudo systemctl restart prometheus

   ```

1. Проверьте состояние Prometheus:

   ```console

   sudo systemctl status prometheus

   ```

   Если сервис успешно запущен и работает, ответ команды будет содержать строку:

   ```txt

   Active: active (running)

   ```

## 6. Установите и настройте агент cAdvisor

Агент cAdvisor собирает метрики работы контейнеров Docker, включая использование процессора, памяти, дискового ввода-вывода и сетевого трафика. Без установки этого агента не будут работать некоторые дашборды Grafana и оповещения в Prometheus.

1. Установите агент cAdvisor на все узлы кластера Arenadata DB, на которых запущены контейнеризованные приложения. Процедура установки описана на [странице продукта в GitHub](https://github.com/google/cadvisor/blob/master/README.md).
1. На ВМ сервиса Мониторинг для Arenadata DB откройте конфигурационный файл сервиса Prometheus:

   ```console

   sudo nano /opt/monitoring_data/prometheus/prometheus.yml

   ```

1. Добавьте в конфигурационный файл информацию об источниках метрик: IP-адреса узлов кластера (`targets`) и метки метрик (`labels`).

   Пример конфигурации Prometheus:

   ```yml

   - job_name: 'docker_exporter'
     metrics_path: /metrics
     static_configs:
       - targets: ['localhost:8080']
         labels:
           instance: adcc-node-1

   ```
1. Перезапустите Prometheus.

   ```console

   sudo systemctl restart prometheus

   ```

1. Проверьте состояние Prometheus:

   ```console

   sudo systemctl status prometheus

   ```

   Если сервис успешно запущен и работает, ответ команды будет содержать строку:

   ```txt

   Active: active (running)

   ```

## 7. Подключитесь к веб-интерфейсу Grafana

1. Перейдите по сохраненной ранее ссылке `productURL` из письма. Откроется веб-интерфейс Grafana.
1. Авторизуйтесь с помощью логина и пароля администратора Grafana, полученных в письме (`grafanaUser` и `grafanaPassword`).
1. Просмотрите содержимое дашбордов с отображением метрик, собранных Prometheus.

   {note:info}

   Менять пароль при первом входе необязательно.

   {/note}
