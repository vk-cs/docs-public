# {heading(Қолжетімді кеңейтімдер мен плагиндер)[id=dbaas-concepts-extensions]}

{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud бұрыннан өрістетілген ДҚ инстанстарына кеңейтімдер мен плагиндерді орнатуды қолдайды. Кеңейтімдер мен плагиндер — ДҚБЖ-ның базалық функционалдығын кеңейтуге, мысалы, метрикалар жинауды қосуға мүмкіндік беретін БҚ кешені.

Қолжетімді кеңейтімдер:

[cols="4,^1,^1,^1,^1,^1", options="header"]
|===
| Кеңейтім
| Postgres
| MySQL
| ClickHouse
| Redis
| MongoDB

| Prometheus сервер үшін
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Серверлік метрикаларға арналған Prometheus (node_exporter)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Zabbix Agent (zabbix)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Postgres-ты оңтайландыру қызметі (holistic)
| ![](../../../../assets/check.svg "inline") 
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| PostgreSQL жоспарлаушысына арналған танымал Hints (pg_hint_plan)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кеңейтімдер жиынтығы (postgres_extensions)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| SQL трафигін талдауға және графиктер құруға арналған құрал (pgbadger)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Уақыт қатарлары деректерін сақтауға арналған кеңейтім (timescaledb)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Кесте бөлімдерінің жиындарын жасауға және басқаруға арналған кеңейтім (pg_partman)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Жүйелік метрикалар бойынша статистика жинайтын кеңейтім (pg_stat_kcache)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| jsonb деректеріне сұраулар тілін қолдайтын кеңейтім (jsquery)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Postgres-та географиялық нысандарды қолдау (postgis)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| SQL операторларын орындау статистикасын қадағалау (pg_stat_statements)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|===

Кейбір кеңейтімдер мен плагиндер үшін міндетті параметрлер қосылуы тиіс — оларсыз орнату қате арқылы аяқталады. {linkto(../../extensions#dbaas-extensions)[text=Кеңейтімдер және олардың параметрлері туралы толығырақ]}.

Бір ДҚ инстансына орнатылатын кеңейтімдер немесе плагиндер саны шектеулі және ДҚБЖ түріне байланысты.

VK Cloud-та кеңейтімдер мен плагиндермен жұмыс істеу туралы толығырақ {linkto(../../instructions/managing-extensions#dbaas-managing-extensions)[text=Кеңейтімдерді басқару]} мақаласында.

{note:info}

Кеңейтім немесе плагин инстанстың барлық ДҚ-на орнатылады.

{/note}
