# {heading(Spark кластеріне қосылу)[id=mlspark-monitoring]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз Spark кластерінің күйін бақылап, оның жұмысын келесі құралдар мен сервистерді пайдаланып талдай аласыз:

- Cloud Logging;
- Cloud Monitoring;
- Cloud Alerting;
- кластер оқиғалары журналы;
- Spark History Server;
- Cloud ML Platform кітапханасының әдістері.

## {heading(Cloud Logging пайдалану)[id=mlspark-monitoring-cloud-logging]}

[Cloud Logging](/kz/monitoring-services/logging) сервисі пайдаланушы қолданбалары мен {var(cloud)} сервистерінің логтарын жинауды, сақтауды және көрсетуді орындайды.

Кластер логтарын көру мүмкіндігіне ие болу үшін:

1. Кластердің ВМ-на [логтау плагинін орнатыңыз](/kz/monitoring-services/logging/instructions/connect-plugin).
1. Деректер жиналуы үшін бірнеше минут күтіңіз.
1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Мониторинг** → **Логтау** бөліміне өтіңіз.
1. Кестедегі логтарды сүзуді [баптаңыз](/kz/monitoring-services/logging/instructions/view-logs).

## {heading(Cloud Monitoring пайдалану)[id=mlspark-monitoring-cloud-monitoring]}

[Cloud Monitoring](/kz/monitoring-services/monitoring) сервисі кластердің күйін берілген метрикалар бойынша нақты уақыт режимінде бақылауға және талдауға мүмкіндік береді. Сервис метрикаларды жинау деректерін графиктерде көрсетеді, оларды кластер жұмысы туралы тек қажетті ақпаратты алатындай етіп баптауға болады.

Кластер мониторингі графигін қосу үшін [нұсқаулықты](/kz/monitoring-services/monitoring/instructions/manage-dashboards#monitoring-create-custom-chart) пайдаланыңыз. **Ресурс түрі** өрісінде **k8s-тағы Spark сервисі** нұсқасын таңдаңыз.

## {heading(Cloud Alerting пайдалану)[id=mlspark-monitoring-cloud-alerting]}

[Cloud Alerting](/kz/monitoring-services/alerting) сервисі {var(cloud)} сервистерінің негізгі метрикалары өзгергені туралы хабарлауды баптауға мүмкіндік береді.

Кластер жұмысы туралы хабарламаларды алу үшін:

1. [Хабарландыру арнасын жасаңыз](/kz/monitoring-services/alerting/instructions/notification#alerting-notification-add).
1. Жасалған байланыс арнасы бойынша қандай шарттарда хабарламалар жіберілетінін [баптаңыз](/kz/monitoring-services/alerting/instructions/triggers#alerting-triggers-add).

## {heading(Оқиғалар журналын пайдалану)[id=mlspark-monitoring-event-journal]}

Оқиғалар журналында кластер жұмысындағы сыни қателер туралы хабарламалар болады.

Оқиғалар журналын көру үшін:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **Контейнерлер** → **Kubernetes кластерлері** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Оқиғалар журналы** қойындысына өтіңіз.

Егер кластер жұмысында қателер болса, олар қойындыда көрсетіледі.

## {heading(Spark History Server пайдалану)[id=mlspark-monitoring-spark-history-server]}

Spark History Server сервисі тапсырмалардың орындалу тарихы туралы ақпаратты жинайды және қолданба логтарын веб-интерфейсте көруге мүмкіндік береді. Сервис әрбір Spark кластері үшін қосылады.

Spark History Server ішіндегі логтарды көру үшін:

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/).
1. Қажетті кластер орналасқан жобаны таңдаңыз.
1. **ML Platform → Spark в k8s** бөліміне өтіңіз.
1. Қажетті кластердің атауын басыңыз.
1. **Жалпы деректер** қойындысында **Spark History Server** жолындағы сілтеме бойынша өтіңіз.
1. Spark History Server инстансы ашылады. Авторизация үшін тіркелгі деректерін енгізіңіз:

    - {var(cloud)} жеке кабинетінің логині мен құпиясөзі — бұл тәсіл ескі кластерлер үшін қолданылады;
    - {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=қолжетімділік токені]} — бұл тәсіл жаңа кластерлер үшін қолданылады.

Кластер оқиғаларының тізімі көрсетіледі.

## Cloud ML Platform кітапханасын пайдалану

[Cloud ML Platform](../ml-platform-library/library-reference) кітапханасы кластер оқиғалары мен логтарының тізімдерін алуға мүмкіндік береді.

Келесі әдістерді пайдаланыңыз:

- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_events)[text=spark_events]} — кластерде болған оқиғалардың тізімін алу.
- {linkto(../ml-platform-library/library-reference/spark-jobs#mlspark-library-reference-spark-jobs-spark_job_logs)[text=spark_job_logs]} — қажетті қолданбаның логтарын көрсету.
