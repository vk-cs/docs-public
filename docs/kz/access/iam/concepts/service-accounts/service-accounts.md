# {heading(Сервистік тіркелгілер)[id=iam-concepts-service-accounts]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Сервистік тіркелгілер (СТЗ) — программаларға арналған арнайы тіркелгілер. СТЗ атынан программалар {var(cloud)} ресурстарын басқара алады және адамның қатысуынсыз бір-бірімен өзара әрекеттесе алады. СТЗ мұндай өзара әрекеттестікті автоматтандыруға көмектеседі.

СТЗ логин мен құпиясөз арқылы API және CLI-де авторизациядан өтуге мүмкіндік береді. СТЗ көмегімен {var(cloud)} жеке кабинетінде авторизациялануға болмайды.

Программалардың {var(cloud)} ресурстарына қол жеткізуі СТЗ-ге тағайындалған рөл шегімен шектеледі. СТЗ-ге `Жоба иесі` рөлінен басқа {linkto(../rolesandpermissions#iam-concepts-rolesandpermissions)[text=кез келген пайдаланушы рөлін]} тағайындауға болады.

Жобадағы рөліне байланысты пайдаланушы жеке кабинетте мыналарды орындай алады:

- СТЗ {linkto(../../instructions/service-account-manage#service-account-create)[text=жасау]};
- жобаның СТЗ тізімін {linkto(../../instructions/service-account-manage#service-account-view-list)[text=қарау]};
- СТЗ карточкасын {linkto(../../instructions/service-account-manage#service-account-view-card)[text=қарау]};
- API пайдалану үшін қажетті OpenStack RC-файлды өз құрылғысына {linkto(../../instructions/service-account-manage#service-account-download-rc-file)[text=жүктеп алу]};
- СТЗ атынан API-ге қол жеткізу үшін ортаны {linkto(../../instructions/service-account-manage#service-account-authorize)[text=баптау]};
- СТЗ {linkto(../../instructions/service-account-manage#service-account-delete)[text=жою]}.

Осындай әрекеттерді {linkto(../../../../tools-for-using-services/api/api-spec/api-service-users#api-spec-service-users)[text=API арқылы]} да орындауға болады.

Жобадағы рөлге байланысты СТЗ басқару құқықтары:

[cols="1,1,1", options="header"]
|===
|Рөлдер
|СТЗ жасау және жою
|СТЗ тізімін және карточкаларын қарау, OpenStack RC-файлды жүктеп алу

|Жоба иесі
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперәкімші
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Пайдаланушылар әкімшісі (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Жоба әкімшісі
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Бақылаушы
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

Жобадағы барлық СТЗ тізімі жеке кабинеттің **Қол жеткізулерді басқару** бөлімінде **Сервистік пайдаланушылар** қойындысында қолжетімді. Бұл қойынды жоғарыдағы кестедегі рөлі бар пайдаланушылар үшін ғана және поштасы мен телефон нөмірі расталған пайдаланушылар үшін ғана көрсетіледі.

Жобада 300-ге дейін СТЗ жасауға болады.