{include(/kz/_includes/_translated_by_ai.md)}

Arenadata DB үшін мониторинг — VK Cloud инфрақұрылымындағы Arenadata дерекқорларын мониторингтеуге арналған дайын шешім. Ол метрикаларды жинауға, визуализациялауға және мәселелер туралы уақтылы хабарлауға арналған алдын ала орнатылған құралдар жиынтығын қамтиды.

Осы нұсқаулықтағы барлық қадамдарды орындағаннан кейін, сіз:

1. VK Cloud жеке кабинетінде Arenadata DB үшін мониторинг сервисін қосасыз.

   Қосылған кезде виртуалды машина автоматты түрде жасалып, оған мыналар орнатылады:

    - [Grafana](https://grafana.com/docs/grafana/latest/) — мониторинг деректерін визуализациялау және талдау сервисі;
    - [Prometheus](https://prometheus.io/) — мониторинг және хабарландырулар сервисі;
    - ADB Exporter — Arenadata DB жүйесінен метрикаларды жинау сервисі;
    - [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) — Prometheus-тен келетін хабарландыруларды өңдеу құралы.

1. Arenadata дерекқорын Arenadata DB үшін мониторинг сервисімен жұмыс істеуге дайындайсыз.
1. ADB Exporter сервисін баптайсыз.
1. Node Exporter агентін орнатып, баптайсыз — операциялық жүйе күйінің метрикаларын жинау агенті.
1. cAdvisor агентін орнатып, баптайсыз — Docker контейнерлерінің метрикаларын жинау агенті.
1. Grafana сервисіне қосылып, Prometheus-тен келіп түсетін деректері бар дашбордтарды қарайсыз.

## Дайындық қадамдары

1. Arenadata DB үшін мониторинг сервисінен хабарландырулар жіберілетін Telegram-чатын жасаңыз, чат идентификаторын сақтаңыз.
1. Хабарландырулар жіберу үшін пайдаланылатын Telegram-ботты жасаңыз, бот токенін сақтаңыз.
1. [Тіркеліңіз](/kz/intro/onboarding/account) VK Cloud-та, егер мұны бұрын жасамаған болсаңыз.
1. [Жасаңыз](/kz/dbs/adb/quick-start/create-adb) Arenadata DB инстансын. Инстансты жасау кезінде көрсетілген деректерді сақтаңыз:

    - Arenadata DB кластерінің атауы. Бұл сонымен қатар инстанс атауы болып табылады.
    - Arenadata дерекқорының атауы.
    - Arenadata дерекқоры пайдаланушысының аты мен құпиясөзі.

   Бұл деректер Arenadata DB үшін мониторинг сервисін қосу және баптау кезінде қажет болады.

1. **Аналитикалық ДБ** → **АДБ инстанстары** бөліміне өтіңіз.
1. Қажетті инстанстың атауын басыңыз.
1. **Ақпарат** қойындысындағы **Connecting settings** жолынан деректерді тауып, сақтаңыз:

    - Arenadata DB түйінінің IP мекенжайы — psql-командасындағы `-h` аргументінің мәні.
    - Arenadata DB жүйесіне қосылу порты — psql-командасындағы `-p` аргументінің мәні.

   Бұл деректер Arenadata DB үшін мониторинг сервисін қосу және баптау кезінде қажет болады.

## 1. Arenadata DB үшін мониторинг сервисін қосыңыз

1. VK Cloud [жеке кабинетіне](https://kz.cloud.vk.com/app) өтіңіз.
1. Егер ол бұрын жасалмаған болса, интернетке қолжетімділігі бар [желі жасаңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau).
1. Arenadata DB үшін мониторинг сервисінің ВМ-і орналастырылатын [ішкі желі баптауларында](/kz/networks/vnet/instructions/net#zhelini_redakciyalau) **Жеке DNS** опциясын өшіріңіз.
1. **Қолданбалар дүкені** бөліміне өтіп, бөлім бетінде **Все решения** батырмасын басыңыз.
1. **Arenadata DB үшін мониторинг** сервисінің карточкасында **Подробнее** батырмасын басыңыз.
1. Сервис сипаттамасы бар бетте **Подключить** батырмасын басыңыз.
1. **Параметры сервера** бетінде деректерді енгізіңіз.

    1. Сервис инстансы орналастырылатын виртуалды машинаның параметрлерін көрсетіңіз:

        - **Қолжетімділік аймағы**: ВМ іске қосылатын [деректер орталығын](/kz/start/concepts/architecture#az) таңдаңыз.
        - **Виртуалды машина түрі**: алдын ала орнатылған [ВМ конфигурациясын](/kz/computing/iaas/concepts/vm/flavor) таңдаңыз.
        - **Желі**: интернетке қолжетімділігі бар және **Жеке DNS** опциясы өшірілген ішкі желісі бар желіні таңдаңыз.

    1. Жүйелік диск пен деректер дискісінің параметрлерін көрсетіңіз:

        - **Диск өлшемі**: ВМ дискісінің қажетті өлшемін гигабайтпен көрсетіңіз.
        - **Диск түрі**: [диск түрлерінің бірін](/kz/computing/iaas/concepts/data-storage/disk-types#disk_types) таңдаңыз — `HDD`, `SSD` немесе `High-IOPS SSD`.

1. **Келесі қадам** батырмасын басыңыз.
1. **Параметры мониторинга** бетінде деректерді енгізіңіз.

    1. Arenadata дерекқорына қосылу үшін бұрын сақталған деректерді көрсетіңіз:

        - мониторинг жүргізілетін Arenadata DB кластерінің (инстансының) атауы;
        - Arenadata DB үшін мониторинг сервисі қосылатын Arenadata DB кластері түйінінің IP мекенжайы;
        - Arenadata DB жүйесіне қосылу порты;
        - Arenadata дерекқоры пайдаланушысының логині мен құпиясөзі;
        - Arenadata DB кластеріндегі дерекқор атауы.

    1. Grafana жүйесіне кіруге арналған пайдаланушының логині мен құпиясөзін орнатыңыз. Бұл пайдаланушыда Grafana әкімшісінің құқықтары болады.
    1. Хабарландыруларға арналған Telegram-боттың бұрын сақталған параметрлерін көрсетіңіз.

1. **Келесі қадам** батырмасын басыңыз.
1. Тарифтік шарттармен және сервисті орналастыруға арналған инфрақұрылым құнымен танысып, **Подключить тариф** батырмасын басыңыз.

   Сәтті орналастырылғаннан кейін VK Cloud-та тіркелген электрондық поштаңызға мына хабарламалар келеді:

    - VK Cloud жеке кабинетіндегі сервис инстансына сілтемесі бар хабарлама;
    - бір реттік сілтемесі бар хат.

1. Хаттағы бір реттік сілтеме бойынша өтіп, сервиске қол жеткізу деректерін сақтаңыз:

    - `grafanaUser` және `grafanaPassword` — Grafana әкімшісінің логині мен құпиясөзі;
    - `productURL` — Grafana веб-интерфейсіне сілтеме;
    - `sshUser` — Arenadata DB үшін мониторинг сервисі ВМ әкімшісінің аты;
    - `sshKey` — ВМ-ге SSH арқылы қосылуға арналған жеке кілт.

   {note:info}

   Егер қол жеткізу деректері жоғалса, жаңаларын [генерациялаңыз](../../instructions/pr-instance-manage#update_access).

   {/note}

## 2. Arenadata DB үшін мониторинг сервисінің ВМ-не қосылыңыз

1. VK Cloud [жеке кабинетіне](https://kz.cloud.vk.com/app) өтіңіз.
1. **Бұлтты есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
1. `adb-monitoring-` таңбасынан басталатын ВМ атауын басыңыз.
1. ВМ бетінде сыртқы IP мекенжайын көшіріп, сақтаңыз. Ол Arenadata DB үшін мониторинг сервисінің ВМ-не қосылу үшін қажет болады.
1. Компьютеріңізде `vkc_monitoring.pem` файлын жасап, хатта алынған SSH кілтін соған көшіріңіз.
1. `vkc_monitoring.pem` файлына тек иесі оқу және жазу құқықтарына ие болатындай етіп рұқсат орнатыңыз. Ол үшін мына команданы орындаңыз:

   ```console

   chmod 600 vkc_monitoring.pem

   ```

1. Arenadata DB үшін мониторинг сервисінің ВМ-не келесі команданы орындау арқылы қосылыңыз:

   ```console

   ssh -i <ПУТЬ_К_КЛЮЧУ>/vkc_monitoring.pem <ЛОГИН>@<IP-АДРЕС_ВМ>

   ```

   Мұнда:

    - `<ПУТЬ_К_КЛЮЧУ>` — `vkc_monitoring.pem` файлы бар директорияға жол.
    - `<ЛОГИН>` — хатта алынған ВМ әкімшісінің аты (`sshUser`).
    - `<IP-АДРЕС_ВМ>` — бұрын сақталған Arenadata DB үшін мониторинг сервисі ВМ-нің сыртқы IP мекенжайы.

## 3. Arenadata DB жүйесін Arenadata DB үшін мониторинг сервисімен жұмыс істеуге дайындаңыз

1. Arenadata DB үшін мониторинг сервисінің ВМ-інде Arenadata дерекқорына қосылыңыз. Ол үшін бұрын сақталған деректерді қойып, келесі команданы орындаңыз:

   ```console

   psql -h <IP-АДРЕС_БД> -p <ПОРТ> -U <ЛОГИН> <ИМЯ_БД>

   ```

   Мұнда:

    - `<IP-АДРЕС_БД>` — Arenadata DB кластері түйінінің IP мекенжайы.
    - `<ПОРТ>` — Arenadata DB жүйесіне қосылу порты.
    - `<ЛОГИН>` — Arenadata DB пайдаланушысының логині.
    - `<ИМЯ_БД>` — Arenadata DB кластеріндегі дерекқор атауы.

1. `/home/almalinux/init.sql` дерекқорды инициализациялау скриптін өңдеу үшін ашыңыз.

   {cut(Дерекқорды инициализациялау скрипті)}

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

1. Arenadata дерекқорының `vkc_monitoring` пайдаланушысы үшін, оның атынан Arenadata DB үшін мониторинг сервисі жұмыс істейтіндей, құпиясөз генерациялаңыз немесе ойлап табыңыз.
1. Осы құпиясөзді `/home/almalinux/init.sql` скриптіндегі келесі жолға қойыңыз:

   ```console

   CREATE USER vkc_monitoring WITH login password `<ПАРОЛЬ>` RESOURCE GROUP monitoring_group CONNECTION LIMIT 5;

   ```

1. Өзгерістерді сақтаңыз.
1. `psql` терминалының ішінде дерекқорды инициализациялау скриптін орындаңыз:

   ```console

   \i /home/almalinux/init.sql

   ```

1. `psql` командасы арқылы `\q` терминалынан шығыңыз.

## 4. ADB Exporter сервисін баптаңыз

ADB Exporter сервисі Arenadata дерекқорларынан метрикаларды Prometheus жүйесіне экспорттауға арналған. Сервис конфигурациялық файлдағы сипаттамалар негізінде метрикаларды қалыптастырады және дерекқорға SQL сұрауларын орындау арқылы олардың мәндерін берілген кесте бойынша автоматты түрде жаңартады.

Arenadata DB үшін мониторинг сервисін орналастыру кезінде ADB Exporter ВМ инстансына автоматты түрде орнатылады және бапталады. ADB Exporter сіздің Arenadata DB жүйеңізден метрикаларды алуы үшін, оның конфигурациялық файлында дерекқорға қол жеткізу параметрлерін көрсетіңіз:

1. Arenadata DB үшін мониторинг сервисінің ВМ-інде ADB Exporter сервисінің конфигурациялық файлын ашыңыз:

   ```console

   sudo nano /etc/adb_exporter/config.yml

   ```

1. Бұрын жасалған `vkc_monitoring` пайдаланушысы арқылы Arenadata дерекқорына қосылу параметрлерін конфигурациялық файлға қосыңыз:

   ```txt

   datasource:
      dsn: "postgresql://vkc_monitoring:<ПАРОЛЬ>@<IP-АДРЕС_БД>:<ПОРТ>/<ИМЯ_БД>?sslmode=disable"

   ```
   Мұнда:

    - `<ПАРОЛЬ>` — `vkc_monitoring` пайдаланушысы үшін бұрын орнатылған құпиясөз.
    - `<IP-АДРЕС_БД>` — Arenadata DB кластері түйінінің IP мекенжайы.
    - `<ПОРТ>` — Arenadata DB жүйесіне қосылу порты.
    - `<ИМЯ_БД>` — Arenadata DB кластеріндегі дерекқор атауы.

1. ADB Exporter сервисін қайта іске қосыңыз:

   ```console

   sudo systemctl restart adb_exporter

   ```

1. ADB Exporter күйін тексеріңіз:

   ```console

   sudo systemctl status adb_exporter

   ```

   Егер сервис сәтті іске қосылып, жұмыс істеп тұрса, команда жауабында мына жол болады:

   ```txt

   Active: active (running)

   ```

## 5. Node Exporter агентін орнатып, баптаңыз

Node Exporter агенті серверлердің жүйелік метрикаларын, соның ішінде процессорды, жадты, дискілерді, файлдық жүйелерді және желілік интерфейстерді пайдалану көрсеткіштерін жинайды. Бұл агент орнатылмаса, кейбір Grafana дашбордтары мен Prometheus хабарландырулары жұмыс істемейді.

1. Node Exporter агентін Arenadata DB кластерінің барлық түйіндеріне [GitHub-тағы өнім бетінде](https://github.com/prometheus/node_exporter/blob/master/README.md) сипатталғандай орнатыңыз.
1. Arenadata DB үшін мониторинг сервисінің ВМ-інде Prometheus сервисінің конфигурациялық файлын ашыңыз:

   ```console

   sudo nano /opt/monitoring_data/prometheus/prometheus.yml

   ```

1. Конфигурациялық файлға метрика көздері туралы ақпаратты қосыңыз: кластер түйіндерінің IP мекенжайлары (`targets`) және метрика белгілері (`labels`).

   Prometheus конфигурациясының мысалы:

   ```yml

   - job_name: 'node_exporter'
     static_configs:
       - targets: ['localhost:9100']
         labels:
           instance: segment-1
           adb_cluster: staging

   ```
1. Prometheus жүйесін қайта іске қосыңыз.

   ```console

   sudo systemctl restart prometheus

   ```

1. Prometheus күйін тексеріңіз:

   ```console

   sudo systemctl status prometheus

   ```

   Егер сервис сәтті іске қосылып, жұмыс істеп тұрса, команда жауабында мына жол болады:

   ```txt

   Active: active (running)

   ```

## 6. cAdvisor агентін орнатып, баптаңыз

cAdvisor агенті Docker контейнерлерінің жұмыс метрикаларын, соның ішінде процессорды, жадты, дискілік енгізу-шығаруды және желілік трафикті пайдалану көрсеткіштерін жинайды. Бұл агент орнатылмаса, кейбір Grafana дашбордтары мен Prometheus хабарландырулары жұмыс істемейді.

1. Контейнерленген қолданбалар іске қосылған Arenadata DB кластерінің барлық түйіндеріне cAdvisor агентін орнатыңыз. Орнату процедурасы [GitHub-тағы өнім бетінде](https://github.com/google/cadvisor/blob/master/README.md) сипатталған.
1. Arenadata DB үшін мониторинг сервисінің ВМ-інде Prometheus сервисінің конфигурациялық файлын ашыңыз:

   ```console

   sudo nano /opt/monitoring_data/prometheus/prometheus.yml

   ```

1. Конфигурациялық файлға метрика көздері туралы ақпаратты қосыңыз: кластер түйіндерінің IP мекенжайлары (`targets`) және метрика белгілері (`labels`).

   Prometheus конфигурациясының мысалы:

   ```yml

   - job_name: 'docker_exporter'
     metrics_path: /metrics
     static_configs:
       - targets: ['localhost:8080']
         labels:
           instance: adcc-node-1

   ```
1. Prometheus жүйесін қайта іске қосыңыз.

   ```console

   sudo systemctl restart prometheus

   ```

1. Prometheus күйін тексеріңіз:

   ```console

   sudo systemctl status prometheus

   ```

   Егер сервис сәтті іске қосылып, жұмыс істеп тұрса, команда жауабында мына жол болады:

   ```txt

   Active: active (running)

   ```

## 7. Grafana веб-интерфейсіне қосылыңыз

1. Хаттағы бұрын сақталған `productURL` сілтемесі бойынша өтіңіз. Grafana веб-интерфейсі ашылады.
1. Хатта алынған Grafana әкімшісінің логині мен құпиясөзі (`grafanaUser` және `grafanaPassword`) арқылы авторизациядан өтіңіз.
1. Prometheus жинаған метрикалар көрсетілетін дашбордтардың мазмұнын қараңыз.

   {note:info}

   Алғашқы кіру кезінде құпиясөзді өзгерту міндетті емес.

   {/note}
