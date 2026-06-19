# {heading(PostgreSQL дерекқорлары метрикаларындағы өзгерістер туралы хабарландыруларды баптау)[id=alerting-alerting-db]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұлттық қосымшалардың тұрақты жұмысын қолдау үшін PostgreSQL дерекқорлары метрикаларының мониторингін және олардағы өзгерістер туралы хабарландыруларды баптаңыз.

## {heading(Дайындық қадамдары)[id=alerting-db-prepare]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifndef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. {linkto(../../../../dbs/dbaas/instructions/create/create-single-replica#dbaas-create-single-replica)[text=Құрыңыз]} PostgreSQL БД инстансын, егер бұл әлі жасалмаған болса.

## {heading({counter(alerting-db)}. БД бетіндегі мониторинг деректерін қараңыз)[id=alerting-db-view]}

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-monitoring-data)[text=Қараңыз]} БД инстансы бетіндегі мониторинг деректерін. Келесі метрикаларға назар аударыңыз:

   [cols="1,3"]
   |===
   |**RAM Used**
   |Түйіндегі жадтың жалпы көлемінен пайдаланылған жадтың пайызы

   |**Current CPU**
   |Түйін процессоры БД инстансы мен онымен байланысты инфрақұрылымның жұмысын қамтамасыз ететін уақыттың пайызы

   |**Current IOWait**
   |Енгізу-шығару операцияларының аяқталуын күтуге жұмсалған түйін процессоры ресурстарының жалпы көлемінің пайызы

   |**Free connections**
   |Жалпы саннан қолжетімді қосылымдардың пайызы

   |**Disk used**
   |Түйіндегі жалпы көлемнен пайдаланылған диск кеңістігінің пайызы
   |===

1. {linkto(../../../../dbs/dbaas/monitoring/postgresql#dbaas-monitoring-postgresql-add-monitoring-data)[text=Қосыңыз]} оларға жылдам қол жеткізу үшін мониторинг деректерін өз графиктеріңізге.

## {heading({counter(alerting-db)}. Хабарландыруларды баптаңыз)[id=alerting-db-notifications]}

1. {linkto(../../instructions/notification#alerting-notification-add)[text=Құрыңыз]} бір немесе бірнеше хабарландыру арнасын.
1. {linkto(../../instructions/triggers#alerting-triggers-add)[text=Құрыңыз]} келесі параметрлері бар триггерлерді:

   [cols="1,1,1", options="header"]
   |===
   |Метрика атауы
   |Шекті мән
   |Сипаттама

   |`mem_used_percent`
   |`> 85-90%`
   |Жад жүктемесі жоғары

   |`cpu_usage_user`
   |`> 90%`
   |Қосымша шамадан тыс жүктелген

   |`cpu_usage_system`
   |`> 30%`
   |Жүйелік шақыруларда мәселелер болуы мүмкін

   |`cpu_usage_iowait`
   |`> 80%`
   |Диск операцияларын күту пайызы жоғары

   |`postgresql_free_connections_percent`
   |`< 10-20%`
   |БД-ға бос қосылымдар аз қалды

   |`disk_used_percent`
   |`> 85-90%`
   |Дискте бос орын аз қалды
   |===

Шекті мәнге жеткен кезде инцидент жасалып, көрсетілген хабарландыру арнасына хабарлама жіберіледі.

## {heading({counter(alerting-db)}. Мониторинг деректерін пайдаланыңыз)[id=alerting-db-use]}

CPU (**Current CPU**) және жедел жад (**RAM Used**) утилизациясының жоғары көрсеткіштері, диск ішкі жүйесіне түсетін жүктеме (**Disk used**), сондай-ақ дерекқорға түсетін қарқынды немесе біркелкі емес жүктеме (**Current IOWait**) түйіндерге жоғары жүктеме түскенін немесе индекстер мен сұраулардың оңтайландырылмағанын көрсетеді.

Мысалы, БД әкімшісі атынан PostgreSQL өнімділігін диагностикалаудың кіріктірілген құралдарын пайдаланыңыз:

- Орындалып жатқан сұраулар бойынша статистиканы жинау үшін [pg_stat_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW) жүйелік кестесіне сұраулар орындаңыз.

  Қалғандарының бәрінен ұзақ орындалатын сұрауларға назар аударыңыз.

- Осындай баяу сұраулардағы тар орындарды табу үшін [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) пәрменін пайдаланыңыз.

  Индекстерді пайдаланбайтын сұрауларға (`Seq Scan` ішіндегі жолдар саны көп) назар аударыңыз. Қажетті индекстерді [құрыңыз](https://www.postgresql.org/docs/current/sql-createindex.html) немесе [жаңартыңыз](https://www.postgresql.org/docs/current/sql-reindex.html).

Бос қосылымдардың төмен пайызы (**Free connections**) бір мезгілде қосылған клиенттердің көп екенін де, ашық қосылымды тым ұзақ пайдаланатын ұзақ транзакциялар бар екенін де көрсетуі мүмкін.

Ресурстарды пайдалануды оңтайландырыңыз:

- {linkto(../../../../dbs/dbaas/instructions/db-config#dbaas-db-config)[text=Параметр мәнін арттырыңыз]} `max_connections`.
- Ұзақ транзакциялар болмауы үшін сұрауларды оңтайландырыңыз.
- Серверге түсетін жүктемені азайту және ресурстарды пайдалануды оңтайландыру үшін [PgBouncer](https://www.pgbouncer.org/) пайдаланыңыз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=alerting-db-delete]}

Жайылған БД инстансы {ifdef(public)}{linkto(../../../../dbs/dbaas/tariffication#dbaas-tariffication)[text=тарификацияланады]} және {/ifdef}есептеу ресурстарын тұтынады. Егер ол енді қажет болмаса, {linkto(../../../../dbs/dbaas/instructions/manage-instance/postgresql#dbaas-postgresql-disk-delete)[text=жойыңыз]} оны.
