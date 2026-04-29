{include(/kz/_includes/_translated_by_ai.md)}

{cut(master-түйін үшін қандай конфигурация пайдаланылады?)}

Master-түйін конфигурациясын кластердің жұмыс режимі анықтайды.

- **DEV**: master-түйін үшін 2 vCPU және 4 GB RAM бар виртуалды машина пайдаланылады.
- **PROD**: master-түйін үшін 6 vCPU және 6 GB RAM бар виртуалды машина пайдаланылады.

{/cut}

{cut(Кластерге kubectl немесе кітапхана арқылы қосылуға бола ма?)}

Кластерге қосылу үшін VK Cloud жеке кабинетінде немесе Cloud ML Platform кітапханасында қолжетімділік токендерін пайдаланыңыз. Токендерді жасау процесі [Аутентификация және авторизация](/kz/ml/spark-to-k8s/ml-platform-library/authz) бөлімінде егжей-тегжейлі сипатталған.

{note:err}

Spark кластеріне қосылу үшін kubectl қолданбаңыз және Kubernetes мәндерін тікелей өзгертпеңіз: secrets, namespaces, Deployments, ConfigMaps, Spark Operator баптаулары.

Бұл қолданбаның дұрыс жұмыс істемеуіне әкелуі мүмкін.

{/note}

{/cut}

{cut(Spark History Server-ге қалай қол жеткізуге болады?)}

[Нұсқаулықты](/kz/ml/spark-to-k8s/monitoring#spark_history_server_paydalanu) пайдаланыңыз.

{/cut}

{cut(Бакетке қалай қол жеткізуге болады?)}

Әдепкі бойынша Spark кластерінің кластермен бірге автоматты түрде жасалатын [VK Object Storage](/kz/ml/spark-to-k8s/instructions/buckets) бакетіне қолжетімділігі бар. Басқа бакеттерге қол жеткізу үшін [нұсқаулықты](/kz/storage/s3) пайдаланыңыз.

{/cut}

{cut(Spark кластері үшін мониторинг және логтау бойынша қандай сервистерді қосуға болады?)}

Spark кластерлері әдепкі бойынша келесі сервистерге қосылған:

- [Cloud Logging](/kz/monitoring-services/logging) — логтарды жинау және талдау.
- [Cloud Alerting](/kz/monitoring-services/alerting) — VK Cloud сервистерінің негізгі метрикалары өзгерген кезде хабарламалар жіберу.
- [Cloud Monitoring](/kz/monitoring-services/monitoring) — метрикалардың кең жиынтығын пайдалана отырып, ресурстардың күйін бақылау.

Толығырақ — [Кластер мониторингі](/kz/ml/spark-to-k8s/monitoring) мақаласында.

{/cut}
