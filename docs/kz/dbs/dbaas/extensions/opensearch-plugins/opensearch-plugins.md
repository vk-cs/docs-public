{include(/kz/_includes/_translated_by_ai.md)}

VK Cloud бұрыннан өрістетілген ДҚ инстанстарына OpenSearch плагиндерін орнатуды қолдайды:

- `analysis-icu`

    Lucene ICU — Unicode кеңейтілген қолдау модулін қосады. Модуль [ICU](https://icu.unicode.org/) кітапханаларын пайдаланады және азиялық тілдерді талдауға, Unicode регистрін түрлендіруге, сәйкестендіру мен транслитерацияны қолдауға мүмкіндік береді.

- `analysis-kuromoji`

    Lucene Kuromoji — жапон тілін талдау модулін қосады.

- `analysis-nori`

    Lucene Nori — корей тілін талдау модулін қосады.

- `analysis-stempel`

    Lucene Stempel — поляк тілін талдау модулін қосады.

- `analysis-ukrainian`

    Lucene UkrainianMorfologikAnalyzer — украин тілін талдау модулін қосады. Модуль [Morfologik project](https://github.com/morfologik/morfologik-stemming) кітапханасын пайдаланады.

- `analysis-phonetic`

    Soundex, Metaphone және басқа алгоритмдерді пайдалана отырып, токендерді талдауға арналған фонетикалық сүзгілерді қосады.

- `analysis-smartcn`

    Lucene Smart Chinese — қытай тіліндегі немесе қытай және ағылшын тілдерінің аралас мәтіндерін талдау модулін қосады. Кеңейтім жеңілдетілген қытай тіліндегі сөздерді жақсырақ сегменттеу үшін мәтінді сөйлемдерге, содан кейін әр сөйлемді сөздерге бөледі.

- `discovery-azure-classic`

    [API Azure Classic](https://learn.microsoft.com/en-us/rest/api/azure/) арқылы бірдей мекенжайларды анықтау үшін хосттардың бастапқы мекенжайларын анықтайды.

- `discovery-ec2`

    AWS API көмегімен master талаптарына сәйкес келетін AWS EC2 жүйесіндегі кластер түйіндерін іздеуге мүмкіндік береді.

- `discovery-gce`

    [API GCE](https://cloud.google.com/compute/docs/reference/rest/v1) арқылы бірдей мекенжайларды анықтау үшін хосттардың бастапқы мекенжайларын анықтайды.

- `ingest-attachment`

    Енгізілген файлдарды шығаруға мүмкіндік береді. Кеңейтім [Apache Tika](https://tika.apache.org/) кітапханасын пайдаланады.

- `mapper-annotated-text`

    Аннотацияларға арналған таңбалауы бар мәтінді индекстеуге мүмкіндік береді.

- `mapper-murmur3`

    Индекстеу уақытында өріс мәндерінің хешін есептеуге және өріс мәндерін индексте сақтауға мүмкіндік береді.

- `mapper-size`

    `_source` құжаттарының сығылмаған өлшемін индекстеуге және оны `_size` метадеректерінде байтпен жазуға мүмкіндік береді.

- `repository-azure`

    Деректерді сақтау үшін [Azure](https://azure.microsoft.com/ru-ru) пайдалануға мүмкіндік береді.

- `repository-gcs`

    Деректерді сақтау үшін [Google Cloud Storage](https://cloud.google.com/) пайдалануға мүмкіндік береді.

- `repository-hdfs`

    Деректерді сақтау үшін [Hadoop Distributed File System (HDFS)](https://hadoop.apache.org/) пайдалануға мүмкіндік береді.

- `repository-s3`

    Деректерді сақтау үшін [S3](/kz/storage/s3) пайдалануға мүмкіндік береді.

- `store-smb`

    SMB серверлерін OpenSearch іздеу функцияларымен интеграциялау мүмкіндігін береді.

- `transport-nio`

    Тасымалдау қабатын NIO тәсілін пайдаланып іске асырады. [NIO Transport](https://activemq.apache.org/nio-transport-reference) енгізу-шығаруды асинхронды бұғатталмайтын өңдеуді қамтамасыз етеді, бұл жүйенің өнімділігі мен ауқымдылығын арттырады.

VK Cloud-тағы кеңейтімдер мен плагиндермен жұмыс істеу туралы толығырақ [Кеңейтімдерді басқару](../../instructions/managing-extensions) мақаласынан оқыңыз.
