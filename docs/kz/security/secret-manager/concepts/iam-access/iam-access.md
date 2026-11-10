# {heading(Қолжетімді басқару)[id=sm-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларына немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік есептік жазбаларға]} құқықтарды шектеу үшін құпиялар менеджерінде бірыңғай идентификация мен қолжетімді басқару қызметі — {linkto(../../../../access/iam#iam)[text=IAM]} қолданылады. Қолжетімдерді {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Жоба қатысушысына құпиялар менеджерінде қолжетімді әрекеттер тізімін мыналар анықтайды:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Базалық рөл]} — әдепкі бойынша қолжетімді құқықтар жиынтығын анықтайды.
- Жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттар]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=қосымша тағайындалады]}, егер {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлге]} кіретіндер жеткіліксіз болса.

Құпиялар менеджері үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} жоқ.

Рөлдер мен рұқсаттарды {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындайтын]} тек `Жоба иесі`, `Суперәкімші` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары ғана бола алады. Рөлдер мен рұқсаттарды беру кезінде минималды артықшылықтар принципін ұстаныңыз: пайдаланушыда тек оның міндеттерін орындауға қажетті құқықтар ғана болуы керек.

## {heading(Рұқсаттар)[id=sm-concepts-iam-permissions]}

`Жоба иесі`, `Суперәкімші` және `Жоба әкімшісі` базалық рөлдері құпиялар менеджеріне толық қолжетімділік алады, жеке рұқсаттарды баптау қажет емес.

Қалған базалық рөлдер үшін құпиялар менеджеріне қолжетімділікті жеке рұқсаттар арқылы баптауға болады:

{include(/kz/_includes/_iam_permissions.md)[tags=mcs_kms_reader]}

{include(/kz/_includes/_iam_permissions.md)[tags=mcs_kms_writer]}