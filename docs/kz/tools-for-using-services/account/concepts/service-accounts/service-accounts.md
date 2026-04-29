{include(/kz/_includes/_translated_by_ai.md)}

Сервистік тіркелгі жазбалары (СТЖ) — бағдарламаларға арналған арнайы тіркелгі жазбалары. СТЖ атынан бағдарламалар VK Cloud ресурстарын басқара алады және адам қатысуынсыз бір-бірімен өзара әрекеттесе алады. СТЖ мұндай өзара әрекеттесуді автоматтандыруға көмектеседі.

Қалыпты тіркелгі жазбалары сияқты, СТЖ логин мен пароль арқылы API және CLI-де авторизациядан өтуге мүмкіндік береді. Алайда VK Cloud жеке кабинетінде СТЖ арқылы авторизациялануға болмайды.

Бағдарламалардың VK Cloud ресурстарына қол жеткізуі СТЖ-қа тағайындалған рөл аясымен шектеледі. СТЖ үшін `Владелец проекта` рөлінен басқа, [кез келген пайдаланушы рөлін](../rolesandpermissions) тағайындауға болады.

Жобадағы рөліне байланысты пайдаланушы жеке кабинетте мыналарды орындай алады:

- [құру](../../instructions/project-settings/service-account-manage#create) СТЖ;
- [көру](../../instructions/project-settings/service-account-manage#view_list) жоба СТЖ тізімін;
- [көру](../../instructions/project-settings/service-account-manage#view_card) СТЖ карточкасын;
- [жүктеп алу](../../instructions/project-settings/service-account-manage#download_rc_file) өз құрылғысына API пайдалану үшін қажетті OpenStack RC-файлын;
- [баптау](../../instructions/project-settings/service-account-manage#authorize) СТЖ атынан API-ге қол жеткізу ортасын;
- [жою](../../instructions/project-settings/service-account-manage#delete) СТЖ.

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
