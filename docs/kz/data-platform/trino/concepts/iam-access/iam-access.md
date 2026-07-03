# {heading(Управление доступом)[id=trino-concepts-iam]}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларының немесе {linkto(../../../../access/iam/concepts/service-accounts#tools-account-concepts-service-accounts)[text=сервистік есептік жазбалардың]} құқықтарын шектеу үшін Cloud Trino жүйесінде сәйкестендіру және қолжетімділікті басқарудың бірыңғай сервисі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімділіктерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Cloud Trino сервисінде жоба қатысушысына қолжетімді әрекеттер тізімін мыналар анықтайды:
- Тағайындалған {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference#iam-roles-reference-basic)[text=базалық рөл]} — әдепкі бойынша қолжетімді {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттар]} жиынтығын береді. Cloud Trino үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} жоқ.

    `Жоба иесі`, `Суперадминистратор` және `Жоба әкімшісі` базалық рөлдері Cloud Trino-ның барлық операцияларына толық қолжетімділік алады, жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} баптаудың қажеті жоқ.

- Жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттар]} — {linkto(../../../../access/iam/instructions/manage-roles#iam-manage-roles)[text=қосымша тағайындалады]}, егер {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлге]} кіретіндері жеткіліксіз болса.

    {note:info}

    {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлмен]} бірге берілетін қолжетімділіктер жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарға]} қарағанда басымдыққа ие.

    {/note}

Рөлдер мен рұқсаттарды беру кезінде ең аз артықшылықтар қағидатын ұстаныңыз: пайдаланушы өз міндеттерін орындау үшін қажет құқықтарға ғана ие болуы тиіс.

## {heading(Рөлдік модель мысалы)[id=trino-concepts-iam-example]}

{note:info}

{linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=Рөлдерді]} және {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} тек `Жоба иесі`, `Суперадминистратор` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана {linkto(../../../../access/iam/instructions/manage-roles#iam-manage-roles)[text=тағайындай]} алады.

{/note}

Cloud Trino сервисі үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} жоқ. Қолжетімділікті шектеу үшін қосымша {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттары]} бар `Пайдаланушылар әкімшісі (IAM)` немесе `Бақылаушы` {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлі]} пайдаланылуы мүмкін. Әдепкі бойынша бұл базалық рөлдер үшін Cloud Trino-ға қолжетімділік шектеулі:

- `Пайдаланушылар әкімшісі (IAM)`: қолжетімділік жоқ.
- `Бақылаушы`: Cloud Trino сервисінің бұрын жасалған даналары туралы ақпараттың бір бөлігін ғана қарау.

Сіз өзіңізге қолайлы рөлдік модель құрып, кез келген {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттарды]} бере аласыз.

### {heading(Толық қолжетімділік)[id=trino-concepts-iam-example-full-access]} 

Барлық әрекеттерге, соның ішінде Cloud Trino сервисінің даналарын жасауға және жоюға рұқсат етіледі. Құзыреті кең және жауапкершілік деңгейі жоғары жоба қатысушысы осы қолжетімділік деңгейін пайдалана алады. Сервистің жаңа даналарын жасау инфрақұрылым шығындарын арттыруы мүмкін, ал жою — қайтарымсыз операция, ол Cloud Trino сервисінің данаңызды пайдаланатын қолданбаның жұмысын бұзуы ықтимал.

{cut(Cloud Trino-да қолжетімді рұқсаттардың толық тізімі)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_update]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Инфрақұрылымды әкімшілендіру)[id=trino-concepts-iam-example-admin]}

Cloud Trino сервисінің даналарын жасау мен жоюдан басқа, дерлік барлық рұқсаттарға ие. Сервистің бұрыннан жасалған даналарын басқару үшін инфрақұрылым операторы немесе DevOps-инженері рөлін атқаратын жоба қатысушысы пайдалана алады. Сондай-ақ қызметтердің құнына әсер етуді көздейді, бірақ тек бар сервистік даналарды масштабтау есебінен.

{cut(Инфрақұрылымды әкімшілендіруге арналған рұқсаттар тізімі)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_update]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Сервисті пайдалану)[id=trino-concepts-iam-example-usage]}

Сервис даналарын басқаруға қолжетімділігі жоқ, аудитке арналған деректерден басқа, олар туралы ақпаратты ғана қарай алады. Сондай-ақ жеке кабинеттегі консоль арқылы SQL-сұрауларды орындауға қолжетімділігі бар; деректермен жұмыс істейтін жоба қатысушылары, мысалы, әзірлеушілер немесе аналитиктер пайдалана алады.

{cut(Сервисті пайдалануға арналған рұқсаттар тізімі)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}

### {heading(Қауіпсіздік аудиті)[id=trino-concepts-iam-example-security-audit]}

Cloud Trino сервисі данасының параметрлерін өзгерте алмайды және жеке кабинеттегі консольге қолжетімділігі жоқ. Тек аудит үшін қолданылады: логтар мен оқиғалар тарихын зерттеу, сондай-ақ пайдаланушылар тізімін қарау. Әдетте, қауіпсіздік қызметінің қызметкерлеріне қолайлы.

{cut(Қауіпсіздік аудитіне арналған рұқсаттар тізімі)}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{/cut}