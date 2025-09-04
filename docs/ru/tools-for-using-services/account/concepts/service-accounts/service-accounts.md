Сервисные учетные записи (СУЗ) — специальные учетные записи, предназначенные для программ. От имени СУЗ программы могут управлять ресурсами VK Cloud и взаимодействовать друг с другом без участия человека. СУЗ помогают автоматизировать такое взаимодействие.

Как и обычные учетные записи, СУЗ позволяют пройти авторизацию в API и CLI с помощью логина и пароля. Однако авторизоваться с помощью СУЗ в личном кабинете VK Cloud нельзя.

Доступ программ к ресурсам VK Cloud ограничивается рамками роли, назначенной СУЗ. Для СУЗ можно назначить [любую пользовательскую роль](../rolesandpermissions), кроме роли `Владелец проекта`.

В зависимости от роли в проекте пользователь в личном кабинете может:

- [создавать](../../instructions/project-settings/service-account-manage#create) СУЗ;
- [просматривать](../../instructions/project-settings/service-account-manage#view_list) список СУЗ проекта;
- [просматривать](../../instructions/project-settings/service-account-manage#view_card) карточку СУЗ;
- [скачивать](../../instructions/project-settings/service-account-manage#download_rc_file) на свое устройство OpenStack RC-файл, необходимый для использования API;
- [настраивать](../../instructions/project-settings/service-account-manage#authorize) окружение для доступа к API от имени СУЗ;
- [удалять](../../instructions/project-settings/service-account-manage#delete) СУЗ.

Эти же действия можно выполнять [через API](/ru/tools-for-using-services/api/api-spec/api-service-users).

Права на управление СУЗ в зависимости от роли в проекте:

[cols="1,1,1", options="header"]
|===
|Роли
|Создание и удаление СУЗ
|Просмотр списка и карточек СУЗ, скачивание OpenStack RC-файла

|Владелец проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Суперадминистратор
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор проекта
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Наблюдатель
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

Список всех СУЗ в проекте доступен в разделе личного кабинета **Управление доступами** на вкладке **Сервисные пользователи**. Эта вкладка отображается только для пользователей с ролью из таблицы выше и верифицированными почтой и номером телефона.

В проекте можно создать до 300 СУЗ.
