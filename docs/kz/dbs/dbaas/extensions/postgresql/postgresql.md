# {heading(PostgreSQL кеңейтімдері)[id=dbaas-extensions-postgresql]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../concepts/types/postgresql#dbaas-concepts-postgresql)[text=PostgreSQL]} үшін арнайы кеңейтімдер сипатталған. ДБ инстансын мониторингтеу үшін кеңейтімдер туралы {linkto(../node-exporter#dbaas-node-exporter)[text=node_exporter]} және {linkto(../zabbix#dbaas-zabbix)[text=zabbix]} бөлімдерінен оқыңыз.

{note:info}

Орнатуға қолжетімді кеңейтімдер жиынтығы таңдалған PostgreSQL нұсқасына байланысты.

{/note}

## {heading(Holistic.dev (holistic))[id=dbaas-extensions-postgresql-holistic]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[Holistic.dev](https://holistic.dev/) — дерекқор ұйымдастырылуы туралы мәліметтерді алуға арналған статикалық талдағыш және құрал. Жиналған деректердің арқасында құрал дерекқор объектілері арасындағы (relations) қатынастардың тұтастығын автоматты түрде бақылайды және ықтимал мәселелерді анықтайды. Holistic.dev есептеріндегі ақпаратты әкімшілер дерекқорды оңтайландыру кезінде пайдаланады. Holistic.dev тек DML-сұраулар мен дерекқор схемасы туралы мәліметтерді жинайды, дерекқор конфигурациясы мен сұрауларды орындау жоспарлары талданбайды.

Толығырақ [кеңейтімнің ресми FAQ құжатынан](https://holistic.dev/faq) оқыңыз.

{/tab}

{tab(Кеңейтім параметрлері)}

- `databases`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі. Міндетті параметр.
- `api_key`: Holistic.dev API кілті. Міндетті параметр.
- `project_name`: Holistic.dev жобасының атауы. Міндетті параметр.

{/tab}

{/tabs}

## {heading(JsQuery)[id=dbaas-extensions-postgresql-jsquery]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

Кеңейтім [JsQuery](https://postgrespro.ru/products/extensions/jsquery) сұрау тілін ұсынады, ол PostgreSQL жүйесінің [jsonb](https://www.postgresql.org/docs/current/datatype-json.html) деректер түрін өңдеу мүмкіндіктерін кеңейтеді. Кеңейтім салынған объектілер мен массивтер бойынша іздеуді жеңілдетеді, индекстерді қолдайтын салыстыру операторларын пайдалануға мүмкіндік береді.

{/tab}

{tab(Кеңейтім параметрлері)}

`database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

{note:info}

Егер кеңейтім орнатылған болса, `database` параметрінен оған бұрын енгізілген дерекқорларды өшіруге болмайды, тек жаңаларын қосуға болады.

{/note}

{/tab}

{/tabs}

## {heading(pgBadger)[id=dbaas-extensions-postgresql-pgbadger]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[pgBadger](https://pgbadger.darold.net/) кеңейтімі PostgreSQL логтарын талдап, кейін SQL-сұраулар статистикасын, [Autovacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM) функциясының жұмысын және басқа деректерді қамтитын есептер құруға мүмкіндік береді. Мүмкіндіктері туралы толығырақ [кеңейтім құжаттамасынан](https://pgbadger.darold.net/documentation.html#FEATURE) оқыңыз.

{/tab}

{tab(Кеңейтім параметрлері)}

- `s3_bucket`: есептер сақталатын [VK Object Storage](../../../../storage/s3) бакетінің атауы. Міндетті параметр.

  Егер мұндай атаудағы бакет жоқ болса — [оны жасаңыз](../../../../storage/s3/instructions/buckets/create-bucket).

  {note:warn}

  Бакетте әдепкі бойынша `public-read-write` ACL баптаулары болуы керек.

  {/note}

  Белгілі бір ДҚ инстансы бойынша есептер инстанс идентификаторына сәйкес келетін атаудағы директорияда сақталады. Идентификаторды {linkto(../../instructions/manage-instance/postgresql#dbaas-postgresql-get-info)[text=ДҚ инстансы туралы ақпаратты қарап]} алуға болады.

- `period`: есептерді жасау аралығы (сағатпен).

  Мән нөлден үлкен болуы керек. Әдепкі мәні: `24`.

- `log_min_duration_statement`: SQL-сұраудың ең аз ұзақтығы (миллисекундпен). Көрсетілген немесе одан үлкен ұзақтықтағы барлық сұраулар PostgreSQL логына түседі, кейін оларды pgBadger талдайды.

  Егер теріс мән берілсе, бірде-бір SQL-сұрау логқа жазылмайды. pgBadger есебінде сұраулар туралы мәліметтер болмайды.

  Әдепкі мәні: `0` (логқа барлық SQL-сұраулар түседі).

- `log_rotation`: есептерді сақтау қажет күндер саны. Бұдан ескі есептер жойылады.

  Әдепкі мәні: `0` (ештеңені жоймау).

{/tab}

{/tabs}

## {heading(PgBouncer)[id=dbaas-extensions-postgresql-pgbouncer]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[PgBouncer](https://www.pgbouncer.org) теңгергіші ДҚ серверіне клиенттік қосылымдар пулын басқаратын прокси ретінде жұмыс істейді. Ол қосылымдарды қайта пайдаланып, серверге түсетін жүктемені азайтады және өнімділікті арттырады.
Қолдау көрсетілетін үш режим: session, transaction, statement.
Теңгергіш кеңейтімімен жұмыс туралы толығырақ {linkto(../../how-to-guides/tls-connect#dbaas-tls-connect)[text=PostgreSQL-ге қосылу үшін TLS-протоколын пайдалану]} бөлімінде берілген.

{/tab}

{tab(Кеңейтім параметрлері)}

- `pool_mode`: қосылымдарды басқару режимі.
  Мүмкін мәндер:
    - `session`: қосылым сессия аяқталғаннан кейін пулға қайтарылады.
    - `transaction`: қосылым транзакция аяқталғаннан кейін пулға қайтарылады.
    - `statement`: қосылым әр SQL-сұрау орындалғаннан кейін пулға қайтарылады. Бұл режим қарапайым сұраулар үшін қолайлы, бірақ PostgreSQL-дің кейбір мүмкіндіктерімен (мысалы, уақытша кестелермен немесе курсорлармен) үйлеспеуі мүмкін.
- `max_client_conn`: теңгергішке шамадан тыс жүктеме түсудің алдын алу үшін клиенттік қосылымдар санының шегі.
- `listen_port`: кіріс қосылымдарға арналған порт.

{/tab}

{/tabs}

## {heading(pg_hint_plan)[id=dbaas-extensions-postgresql-pghintplan]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

SQL-сұрау орындалған кезде PostgreSQL жоспарлағышы ең жақсы орындау жоспарын (execution plan) таңдауға тырысады. Таңдалған жоспар әрдайым оңтайлы бола бермейді, өйткені жоспарлағыш деректердің кейбір қасиеттерін, мысалы, бағандар арасындағы корреляцияларды ескермейді. [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) кеңейтімі PostgreSQL жоспарлағышына нұсқаулар (hints) беру арқылы сұрауды орындау жоспарларын түзетуге мүмкіндік береді. Нұсқаулар SQL-сұрауларға арнайы түрдегі комментарийлер немесе `hint_plan.hints` арнайы кестесіндегі жазбалар түрінде беріледі.

{/tab}

{tab(Кеңейтім параметрлері)}

- `enable_hint_table`: `hint_plan.hints` кестесіндегі нұсқауларды пайдалануға рұқсат етілетінін анықтайды.

  Әдепкі мәні: `on` (рұқсат етілген).

- `parse_messages`: логқа нұсқауларды талдауға байланысты хабарламалар қай деңгейден бастап түсетінін анықтайды. Мысалы, `info` таңдалса, логқа `info`, `notice`, `warning` және `error` деңгейлеріндегі хабарламалар түседі.

  Рұқсат етілген мәндер:

  - `error` (қате);
  - `warning` (ескерту);
  - `notice` (хабарлама);
  - `info` (ақпарат);
  - `log` (лог жүргізу);
  - `debug` (жөндеу).

  Әдепкі мәні: `info`.

- `debug_print`: жөндеу ақпаратын шығаруды және оның егжей-тегжейлілік деңгейін басқарады.

  Рұқсат етілген мәндер:

  - `off`: жөндеу ақпаратын шығару өшірілген;
  - `on`: жөндеу ақпаратын шығару қосылған;
  - `detailed`: толығырақ жөндеу ақпаратын шығару қосылған;
  - `verbose`: ең егжей-тегжейлі жөндеу ақпаратын шығару қосылған.

  Әдепкі мәні: `off`.

- `message_level`: жөндеу хабарламалары логқа қай деңгейден бастап түсетінін анықтайды. Мысалы, `info` таңдалса, логқа `info`, `notice`, `warning` және `error` деңгейлеріндегі хабарламалар түседі.

  Рұқсат етілген мәндер:

  - `error`;
  - `warning`;
  - `notice`;
  - `info`;
  - `log`;
  - `debug`.

  Әдепкі мәні: `info`.

{/tab}

{/tabs}

## {heading(pg_partman)[id=dbaas-extensions-postgresql-pgpartman]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

pg_partman кеңейтімі кестелерді партициялауды (partitioning) кеңейтілген түрде басқаруға арналған. Партициялаудың екі түрі қолданылады: `pg_partman` триггерлері негізіндегі және PostgreSQL-ге ендірілген функционал негізіндегі native түрі. Толығырақ [кеңейтім құжаттамасында](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md).

Кеңейтіммен бірге орнату жүзеге асырылатын `partman` схемасы (schema) жасалады.

PostgreSQL-де native партициялау үшін құпиясөз орнатуға болатын `partman` пайдаланушысы жасалып, бапталады. `pg_partman` триггерлері негізіндегі партициялау үшін `postgres` пайдаланушысын қолдану қажет.

{/tab}

{tab(Кеңейтім параметрлері)}

- `database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

  {note:info}

  Егер кеңейтім орнатылған болса, `database` параметрінен оған бұрын енгізілген дерекқорларды өшіруге болмайды, тек жаңаларын қосуға болады.

  {/note}

- `interval`: фондық процесс ([background worker](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#background-worker), BGW) арқылы [run_maintenance()](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#maintenance-functions) функциясын іске қосу аралығы (секундпен).

  Әдепкі мәні: `3600` (бір сағат).

- `analyze`: мұрагер-кесте (child table) жасалғаннан кейін ата-аналық кестені (parent table) талдауды іске қосу баптаулары.

  Баптаудың рұқсат етілген мәндері:

  - `default`: әдепкі әрекет. Ол PostgreSQL нұсқасына қарай өзгереді:

    - PostgreSQL 10 үшін: ата-аналық кестені талдауды іске қосу;
    - PostgreSQL 11 және одан жоғары үшін: ата-аналық кестені талдауды іске қоспау.

  - `on`: ата-аналық кестені талдауды іске қосу.
  - `off`: ата-аналық кестені талдауды іске қоспау.

  Әдепкі мәні: `default`.

{/tab}

{/tabs}

## {heading(pg_stat_kcache)[id=dbaas-extensions-postgresql-pgstatkcache]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[pg_stat_kcache](https://github.com/powa-team/pg_stat_kcache) кеңейтімі файлдық жүйе деңгейінде орындалған нақты оқу және жазу операциялары туралы статистиканы жинайды.

{note:info}

Бұл кеңейтімнің жұмыс істеуі үшін {linkto(#dbaas-extensions-postgresql-pgstatstatements)[text=pg_stat_statements]} кеңейтімі қажет. Егер ол әлі орнатылмаған болса, орнату автоматты түрде орындалады.

{/note}

{/tab}

{tab(Кеңейтім параметрлері)}

`database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

{/tab}

{/tabs}

## {heading(pg_stat_statements)[id=dbaas-extensions-postgresql-pgstatstatements]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) кеңейтімі PostgreSQL серверінің барлық SQL-өрнектерді (SQL statements) жоспарлау және орындау статистикасын бақылауға мүмкіндік береді.

{/tab}

{tab(Кеңейтім параметрлері)}

`database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

{/tab}

{/tabs}

## {heading(PostGIS)[id=dbaas-extensions-postgresql-postgis]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[PostGIS](http://postgis.net/) кеңейтімі PostgreSQL жүйесіне географиялық объектілермен жұмыс істеу мүмкіндіктерін қосады. Кеңістіктік деректердің бірнеше типі іске асырылады, геодеректерді сақтау, индекстеу және өңдеу қолдау көрсетіледі.

Кеңейтіммен жұмыс істеу туралы толығырақ {linkto(../../how-to-guides/using-postgis#dbaas-using-postgis)[text=PostgreSQL жүйесінде PostGIS кеңейтімін пайдалану]} бөлімінде.

{/tab}

{tab(Кеңейтім параметрлері)}

- `database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

- `extension_list`: PostGIS-пен бірге орнатылуы тиіс қосымша кеңейтімдер тізімі.

  Әдепкі мәні: қолжетімді кеңейтімдердің ешқайсысы таңдалмаған.

  {cut(Орнатуға қолжетімді кеңейтімдер)}

  <!-- prettier-ignore -->
  | Атауы    |  Сипаттамасы |
  | ----------- | --------- |
  | [address_standardizer_data_us](https://postgis.net/docs/Extras.html#Address_Standardizer)   | АҚШ үшін мекенжайларды қалыпқа келтіруге мүмкіндік береді |
  | [address_standardizer](https://postgis.net/docs/Extras.html#Address_Standardizer)           | Мекенжайларды қалыпқа келтіруге мүмкіндік береді |
  | [postgis_tiger_geocoder](https://postgis.net/docs/Extras.html#Tiger_Geocoder)               | [TIGER](http://www.census.gov/geo/www/tiger/) форматында геокодтауды орындауға мүмкіндік береді |
  | [postgis_topology](https://postgis.net/docs/Topology.html)                                  | Топологиялық объектілерді басқаруға арналған деректер типтері мен функцияларды іске асырады |
  | [pgrouting](http://pgrouting.org/)                                                          | Геокеңістіктік маршруттауға арналған функционал қосады |

  {/cut}

{/tab}

{/tabs}

## {heading(postgres_extensions)[id=dbaas-extensions-postgresql-postgresextensions]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

Қосымша баптауды қажет етпейтін танымал PostgreSQL кеңейтімдерінің жиыны. Орнату үшін бір немесе бірнеше кеңейтімді таңдай аласыз, олар **Кеңейтім параметрлері** қойындысында тізілген.

{/tab}

{tab(Кеңейтім параметрлері)}

- `databases`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

- `extension_list`: орнатылуы тиіс кеңейтімдер тізімі.

  Әдепкі мәні: тізімдегі барлық қолжетімді кеңейтімдер таңдалған.

  {cut(Орнатуға қолжетімді кеңейтімдер)}

  <!-- prettier-ignore -->
  | Атауы    |  Сипаттамасы |
  | ----------- | --------- |
  | [amcheck](https://www.postgresql.org/docs/current/amcheck.html)                         | Қатынастар (relations) құрылымының логикалық тұтастығын тексеруге арналған функцияларды ұсынады |
  | [autoinc](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.6)      | Өрістерді автоматты инкременттеуге арналған функцияларды ұсынады |
  | [bloom](https://www.postgresql.org/docs/current/bloom.html)                             | Блум сүзгілеріне негізделген индекстік қолжеткізу әдісін ұсынады |
  | [btree_gin](https://www.postgresql.org/docs/current/btree-gin.html)                     | Көптеген деректер типтері мен барлық тізбектелген типтер (enums) үшін B-ағаштарына баламалы мінез-құлықты іске асыратын GIN-оператор кластарының мысалдарын ұсынады |
  | [btree_gist](https://www.postgresql.org/docs/current/btree-gist.html)                   | Көптеген деректер типтері мен барлық тізбектелген типтер (enums) үшін B-ағаштарына баламалы мінез-құлықты іске асыратын GiST-оператор кластарының мысалдарын ұсынады |
  | [citext](https://www.postgresql.org/docs/current/citext.html)                           | Регистрге тәуелсіз жолдарды сақтау үшін `citext` деректер типін іске асырады |
  | [cube](https://www.postgresql.org/docs/current/cube.html)                               | Көпөлшемді кубтарды көрсетуге арналған `cube` деректер типін іске асырады |
  | [dblink](https://www.postgresql.org/docs/current/contrib-dblink-function.html)          | Ағымдағы сессиядан қашықтағы (remote) PostgreSQL дерекқорына SQL-сұрау орындауға мүмкіндік береді |
  | [dict_int](https://www.postgresql.org/docs/current/dict-int.html)                       | Толықмәтіндік іздеуге арналған қосымша сөздік шаблонының мысалын ұсынады. Сөздік бүтін сандарды (таңбалы және таңбасыз) индекстеуге мүмкіндік береді. Соның арқасында бірегей сөздер тізімі шектен тыс ұлғаймайды және іздеу жылдамдығы артады |
  | [dict_xsyn](https://www.postgresql.org/docs/current/dict-xsyn.html)                     | Толықмәтіндік іздеуге арналған қосымша сөздік шаблонының мысалын ұсынады. Сөздік сөздерді синонимдер топтарына ауыстырады, бұл олардың синонимдері бойынша іздеуге мүмкіндік береді |
  | [earthdistance](https://www.postgresql.org/docs/current/earthdistance.html)             | Жер бетіндегі нүктелер арасындағы қашықтықты екі тәсілмен есептеуге мүмкіндік береді: [кубтар бойынша](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.7) және [нүктелер бойынша](https://postgrespro.ru/docs/postgresql/15/earthdistance#id-1.11.7.24.8).<br><br>Есептеулер кезінде Жер мінсіз сфера деп есептеледі. Егер бұл тым дөрекі жуықтау болса, {linkto(#dbaas-extensions-postgresql-postgis)[text=PostGIS]} кеңейтімін пайдаланыңыз.<br><br>**Тәуелділіктер:** `cube` кеңейтімі. Егер ол орнатылмаған болса, орнату автоматты түрде орындалады |
  | [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html)             | Жолдардың ұқсастық деңгейін және жолдар арасындағы қашықтықты анықтауға арналған функцияларды ұсынады |
  | [hstore](https://www.postgresql.org/docs/current/hstore.html)                           | Бір мән ішінде кілт/мән жолдары жұптарын сақтау үшін `hstore` деректер типін іске асырады |
  | [intarray](https://www.postgresql.org/docs/current/intarray.html)                       | `NULL` мәндері жоқ бүтін сандар массивтерімен жұмыс істеуге арналған функциялар мен операторларды ұсынады |
  | [isn](https://www.postgresql.org/docs/current/isn.html)                                 | Тауарларды нөмірлеудің келесі халықаралық стандарттарына арналған деректер типтерін іске асырады:<br><ul><li>EAN13</li><li>UPC</li><li>ISBN (кітаптар)</li><li>ISMN (музыка)</li><li>ISSN (сериялық нөмірлер)</li></ul> |
  | [lo](https://www.postgresql.org/docs/current/lo.html)                                   | Үлкен объектілерді (BLOBs) басқару үшін `lo` деректер типін және `lo_manage` триггерін іске асырады. JDBC және ODBC драйверлерін пайдаланғанда үлкен объектілермен дұрыс жұмыс істеуге мүмкіндік береді |
  | [ltree](https://www.postgresql.org/docs/current/ltree.html)                             | Деректер белгілерін көрсетуге арналған `ltree` деректер типін іске асырады. Белгілер иерархиялық ағаш құрылымында сақталады. Сондай-ақ мұндай құрылымда іздеудің кеңейтілген мүмкіндіктері беріледі |
  | [moddatetime](https://www.postgresql.org/docs/current/contrib-spi.html#id-1.11.7.50.8)  | Ағымдағы уақытты `timestamp` типті өріске сақтайтын триггерді іске асырады. Бұл, мысалы, кесте жолының соңғы өзгертілу уақытын бақылау үшін пайдалы болуы мүмкін |
  | [pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache.html)            | Ортақ буфер кэшінің (shared buffer cache) күйін нақты уақыт режимінде бақылауға арналған құралдарды ұсынады |
  | [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)                          | Жолдардың ұқсастық деңгейін анықтауға және ұқсас жолдарды жылдам іздеуге арналған триграммаларға негізделген құралдарды ұсынады |
  | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)                       | PostgreSQL үшін криптографиялық функцияларды ұсынады: хештеу, шифрлау, кездейсоқ деректерді генерациялау функциялары |
  | [pgrowlocks](https://www.postgresql.org/docs/current/pgrowlocks.html)                   | Көрсетілген кесте жолдарының бұғатталуы туралы ақпаратты көрсетуге арналған функцияны ұсынады |
  | [pgstattuple](https://www.postgresql.org/docs/current/pgstattuple.html)                 | Кортеждер (tuple) деңгейінде статистика алуға арналған функцияларды ұсынады |
  | [postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw.html)               | Сыртқы PostgreSQL серверінде сақталатын деректерге қол жеткізу үшін сыртқы деректерге арналған ораманы (foreign-data wrapper, FDW) ұсынады |
  | [seg](https://www.postgresql.org/docs/current/seg.html)                                 | Сызық кесінділерін немесе қалқымалы нүктелі сандар интервалдарын көрсетуге арналған `seg` деректер типін іске асырады |
  | [tablefunc](https://www.postgresql.org/docs/current/tablefunc.html)                     | Жолдар жиынтығын (кестелерді) қайтаратын әртүрлі функцияларды ұсынады |
  | [uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp.html)                     | Стандартты алгоритмдерді пайдалана отырып, әмбебап бірегей идентификаторларды (UUIDs) генерациялауға арналған функцияларды ұсынады |
  | [xml2](https://www.postgresql.org/docs/current/xml2.html)                               | XML-пен жұмыс істеуге арналған функцияларды ұсынады. XPath сұрауларын және XSLT түрлендірулерін орындауға болады |

  {/cut}

{/tab}

{/tabs}

## {heading(TimescaleDB)[id=dbaas-extensions-postgresql-timescaledb]}

{tabs}

{tab(Кеңейтім сипаттамасы)}

[TimescaleDB](https://docs.timescale.com/) кеңейтімі PostgreSQL жүйесіне уақыттық қатарлармен (time series) жұмыс істеуге арналған кеңейтілген мүмкіндіктерді қосады. Гиперкестелерде (hypertables) сақталатын уақыттық қатарлар деректерімен жұмыс істеу үшін PostgreSQL стандартты SQL синтаксисіне толық қолдау қамтамасыз етілген. Уақыттық қатарлар деректері бар гиперкестелерді уақыт және кеңістік бойынша автоматты түрде партициялау қолдау көрсетіледі.

{/tab}

{tab(Кеңейтім параметрлері)}

`database`: кеңейтім жұмыс істеуі тиіс дерекқорлар тізімі.

{note:info}

Егер кеңейтім орнатылған болса, `database` параметрінен оған бұрын енгізілген дерекқорларды өшіруге болмайды, тек жаңаларын қосуға болады.

{/note}

{/tab}

{/tabs}
