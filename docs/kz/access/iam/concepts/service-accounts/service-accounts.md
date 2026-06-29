# {heading(Жеке кабинет пайдаланушыларының рөлдері мен құқықтары)[id=tools-account-concepts-service-accounts]}

{include(/kz/_includes/_translated_by_ai.md)}

Сервистік тіркелгі жазбалары (СТЖ) — бағдарламаларға арналған арнайы тіркелгі жазбалары. СТЖ атынан бағдарламалар {var(cloud)} ресурстарын басқара алады және адам қатысуынсыз бір-бірімен өзара әрекеттесе алады. СТЖ мұндай өзара әрекеттесуді автоматтандыруға көмектеседі.

Қалыпты тіркелгі жазбалары сияқты, СТЖ логин мен пароль арқылы API және CLI-де авторизациядан өтуге мүмкіндік береді. Алайда {var(cloud)} жеке кабинетінде СТЖ арқылы авторизациялануға болмайды.

Бағдарламалардың {var(cloud)} ресурстарына қол жеткізуі СТЖ-қа тағайындалған рөл аясымен шектеледі. СТЖ үшін `Владелец проекта` рөлінен басқа, {linkto(/kz/access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=кез келген пайдаланушы рөлін]} тағайындауға болады.

Жобадағы рөліне байланысты пайдаланушы жеке кабинетте мыналарды орындай алады:

- {linkto(../../instructions/project-settings/service-account-manage#service-account-create)[text=құру]} СТЖ;
- {linkto(../../instructions/project-settings/service-account-manage#service-account-view-list)[text=көру]} жоба СТЖ тізімін;
- {linkto(../../instructions/project-settings/service-account-manage#service-account-view-card)[text=көру]} СТЖ карточкасын;
- {linkto(../../instructions/project-settings/service-account-manage#service-account-download-rc-file)[text=жүктеп алу]} өз құрылғысына API пайдалану үшін қажетті OpenStack RC-файлын;
- {linkto(../../instructions/project-settings/service-account-manage#service-account-authorize)[text=баптау]} СТЖ атынан API-ге қол жеткізу ортасын;
- {linkto(../../instructions/project-settings/service-account-manage#service-account-delete)[text=жою]} СТЖ.

Осы әрекеттерді [API арқылы](/kz/tools-for-using-services/api/api-spec/api-service-users) да орындауға болады.

Жобадағы рөлге байланысты СТЖ басқару құқықтары:

[cols="1,1,1", options="header"]
|===
|Рөлдер
|СТЖ құру және жою
|СТЖ тізімі мен карточкаларын көру, OpenStack RC-файлын жүктеп алу

|Владелец проекта
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|Суперадминистратор
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|Пайдаланушылар әкімшісі (IAM)
| ![](/kz/assets/check.svg "inline")
| ![](/kz/assets/check.svg "inline")

|Жоба әкімшісі
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")

|Бақылаушы
| ![](/kz/assets/no.svg "inline")
| ![](/kz/assets/check.svg "inline")
|===

Жобадағы барлық СТЖ тізімі жеке кабинеттегі **Қолжетімділікті басқару** бөлімінде, **Сервистік пайдаланушылар** қойындысында қолжетімді. Бұл қойынды тек жоғарыдағы кестедегі рөлі бар және поштасы мен телефон нөмірі верификацияланған пайдаланушылар үшін ғана көрсетіледі.

Жобада 300-ге дейін СТЖ құруға болады.
