# {heading(Қолжетімділікті басқару)[id=kafka-concepts-iam]}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларының немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбалардың]} құқықтарын шектеу үшін Cloud Kafka жүйесінде сәйкестендіру және қолжетімділікті басқарудың бірыңғай сервисі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімділіктерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Cloud Kafka сервисінде жоба қатысушысына қолжетімді әрекеттер тізімін мыналар анықтайды:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Базалық рөл]} — әдепкі бойынша қолжетімді құқықтар жиынтығын береді.
- Жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттар]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындалады]} қосымша, егер {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлге]} кіретіндері жеткіліксіз болса.

    {note:info}
    15.01.2026 дейін жасалған Cloud Kafka сервисінің даналары үшін атауы `dp_kafka_` деп басталатын рұқсаттар қолданылады. Жеке кабинетте олар атауына `(legacy)` қосымшасымен көрсетіледі.
    {/note}

Cloud Kafka сервисі үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} жоқ.

Рөлдерді және рұқсаттарды тек `Жоба иесі`, `Суперадминистратор` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындай]} алады. Рөлдер мен рұқсаттарды беру кезінде ең аз артықшылықтар қағидатын ұстаныңыз: пайдаланушы өз міндеттерін орындау үшін қажет құқықтарға ғана ие болуы тиіс.

## {heading(Рөлдік модель мысалы)[id=kafka-concepts-iam-example]}

`Жоба иесі`, `Суперадминистратор` және `Жоба әкімшісі` базалық рөлдері Cloud Kafka-ның барлық операцияларына толық қолжетімділік алады, жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптаудың қажеті жоқ.

Қолжетімділікті шектеу үшін қосымша {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттары]} бар `Пайдаланушылар әкімшісі (IAM)` немесе `Бақылаушы` {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базалық рөлі]} пайдаланылуы мүмкін. Әдепкі бойынша бұл базалық рөлдер үшін Cloud Kafka-ға қолжетімділік шектеулі:

- `Пайдаланушылар әкімшісі (IAM)`: қолжетімділік жоқ.
- `Бақылаушы`: Cloud Kafka сервисінің бұрын жасалған даналары туралы ақпараттың бір бөлігін ғана қарау.

Сіз өзіңізге қолайлы рөлдік модель құрып, кез келген {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} бере аласыз.

### {heading(Толық қолжетімділік)[id=kafka-concepts-iam-example-full-access]}

Барлық әрекеттерге, соның ішінде Cloud Kafka сервисінің даналарын жасауға және жоюға рұқсат етіледі. Құзыреті кең және жауапкершілік деңгейі жоғары жоба қатысушысы осы қолжетімділік деңгейін пайдалана алады. Сервистің жаңа даналарын жасау инфрақұрылым шығындарын арттыруы мүмкін, ал жою — қайтарымсыз операция, ол Cloud Kafka сервисінің данаңызды пайдаланатын қолданбаның жұмысын бұзуы ықтимал.

{cut(Cloud Kafka-да қолжетімді рұқсаттардың толық тізімі)}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Инфрақұрылымды әкімшілендіру)[id=kafka-concepts-iam-example-admin]}

Cloud Kafka сервисінің даналарын жасау мен жоюдан басқа, дерлік барлық рұқсаттарға ие. Сервистің бұрыннан жасалған даналарын басқару үшін инфрақұрылым операторы немесе DevOps-инженері рөлін атқаратын жоба қатысушысы пайдалана алады. Сондай-ақ қызметтердің құнына әсер етуді көздейді, бірақ тек бар сервистік даналарды масштабтау есебінен.

{cut(Инфрақұрылымды әкімшілендіруге арналған рұқсаттар тізімі)}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_install]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_uninstall]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_update]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_innerips_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_cruisecontrol]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_maintenance]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_reboot]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_scaledisk]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_ui]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_updateinfo]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_versionupdate]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_change]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_update]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}

### {heading(Сервисті пайдалану)[id=kafka-concepts-iam-example-usage]}

Сервис даналарын басқаруға қолжетімділігі жоқ, аудитке арналған деректерден басқа, олар туралы ақпаратты ғана қарай алады. Сондай-ақ Kafka кластерлері арасында деректерді репликациялауға арналған mirror-қосылымдарды жасауға, жоюға және қарауға мүмкіндік береді. Деректермен жұмыс істейтін жоба қатысушылары, мысалы, әзірлеушілер немесе деректер инженерлері пайдалана алады.

{cut(Сервисті пайдалануға арналған рұқсаттар тізімі)}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_create]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_delete]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_mirrormaker_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_settings_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{/cut}

### {heading(Қауіпсіздік аудиті)[id=kafka-concepts-iam-example-security-audit]}

Cloud Kafka сервисі данасының параметрлерін өзгерте алмайды және жеке кабинеттегі сервистің графикалық интерфейсіне қолжетімділігі жоқ. Тек аудит үшін қолданылады: логтар мен оқиғалар тарихын зерттеу, сондай-ақ пайдаланушылар тізімін қарау. Әдетте, қауіпсіздік қызметінің қызметкерлеріне қолайлы.

{cut(Қауіпсіздік аудитіне арналған рұқсаттар тізімі)}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_connections_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_audit]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_instances_viewhistory]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_logs_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_monitoring_view]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_list]}

{include(/kz/_includes/_iam_permissions.md)[tags=dp_kafkaatom_users_viewhistory]}

{/cut}
