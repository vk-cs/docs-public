# {heading(Рұқықтарды басқару)[id=km-concepts-iam]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=Шақырылған]} {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=жоба]} қатысушыларына немесе {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервистік тіркелгілерге]} құқықтарды шектеу үшін кілттер менеджерінде бірыңғай идентификация және рұқсат басқару қызметі — {linkto(../../../../access/iam#iam)[text=IAM]} пайдаланылады. Рұқықтарды {var(cloud)} жеке кабинетінен орталықтандырылған түрде басқаруға болады.

Жобаның қатысушысына кілттер менеджерінде қолжетімді әрекеттер тізімін анықтайтын:

- {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=Базалық рөл]} — әдепкі бойынша қолжетімді құқықтар жинағын анықтайды.
- Жеке {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=рұқсаттар]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=қосымша тағайындалады]}, егер {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=базалық рөлге]} кіретін құқықтар жеткіліксіз болса.

Кілттер менеджері үшін {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=мамандандырылған рөлдер]} жоқ.

Рөлдер мен рұқсаттарды тек `Жоба иесі`, `Суперәкімші` және `Пайдаланушылар әкімшісі (IAM)` рөлдері бар жоба қатысушылары {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=тағайындай алады]}. Рөлдер мен рұқсаттарды беру кезінде ең аз артықшылық қағидатын ұстаныңыз: пайдаланушыда тек оның міндеттерін орындауға қажетті ғана құқықтар болуы тиіс.

## {heading(Рұқсаттар)[id=km-concepts-iam-permissions]}

`Жоба иесі`, `Суперәкімші` және `Жоба әкімшісі` базалық рөлдері кілттер менеджеріне толық рұқсат алады, жеке рұқсаттарды баптау қажет емес.

Қалған базалық рөлдер үшін кілттер менеджеріне рұқсатты жеке рұқсаттар арқылы баптауға болады:

{include(/kz/_includes/_iam_permissions.md)[tags=mcs_kms_reader]}

{include(/kz/_includes/_iam_permissions.md)[tags=mcs_kms_writer]}