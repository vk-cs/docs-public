# {heading(Сұрақтар мен жауаптар)[id=mlspark-faq]}

{include(/kz/_includes/_translated_by_ai.md)}

{cut(master-түйін үшін қандай конфигурация пайдаланылады?)}

Master-түйін конфигурациясын кластердің жұмыс режимі анықтайды.

- **DEV**: master-түйін үшін 2 vCPU және 4 GB RAM бар виртуалды машина пайдаланылады.
- **PROD**: master-түйін үшін 6 vCPU және 6 GB RAM бар виртуалды машина пайдаланылады.

{/cut}

{cut(Кластерге kubectl немесе кітапхана арқылы қосылуға бола ма?)}

Кластерге қосылу үшін {var(cloud)} жеке кабинетінде немесе Cloud ML Platform кітапханасында қолжетімділік токендерін пайдаланыңыз. Токендерді жасау процесі {linkto(../ml-platform-library/authz#mlspark-library-authz)[text=Аутентификация және авторизация]} бөлімінде егжей-тегжейлі сипатталған.

{note:err}

Spark кластеріне қосылу үшін kubectl қолданбаңыз және Kubernetes мәндерін тікелей өзгертпеңіз: secrets, namespaces, Deployments, ConfigMaps, Spark Operator баптаулары.

Бұл қолданбаның дұрыс жұмыс істемеуіне әкелуі мүмкін.

{/note}

{/cut}

{cut(Spark History Server-ге қалай қол жеткізуге болады?)}

{linkto(../monitoring#mlspark-monitoring-spark-history-server)[text=нұсқаулықты]} пайдаланыңыз.

{/cut}

{cut(Бакетке қалай қол жеткізуге болады?)}

Әдепкі бойынша Spark кластерінің кластермен бірге автоматты түрде жасалатын [VK Object Storage](/kz/storage/s3) бакетіне қолжетімділігі бар. Басқа бакеттерге қол жеткізу үшін {linkto(../instructions/buckets#mlspark-instructions-buckets)[text=нұсқаулықты]} пайдаланыңыз.

{/cut}

{cut(Spark кластері үшін мониторинг және логтау бойынша қандай сервистерді қосуға болады?)}

Spark кластерлері әдепкі бойынша келесі сервистерге қосылған:

- [Cloud Logging](/kz/monitoring-services/logging) — логтарды жинау және талдау.
- [Cloud Alerting](/kz/monitoring-services/alerting) — {var(cloud)} сервистерінің негізгі метрикалары өзгерген кезде хабарламалар жіберу.
- [Cloud Monitoring](/kz/monitoring-services/monitoring) — метрикалардың кең жиынтығын пайдалана отырып, ресурстардың күйін бақылау.

Толығырақ — {linkto(../monitoring#mlspark-monitoring)[text=Кластер мониторингі]} мақаласында.

{/cut}
