# {heading(Сервисные учетные записи)[id=iam-concepts-service-accounts]}

Сервисные учетные записи (СУЗ) — специальные учетные записи, предназначенные для программ. От имени СУЗ программы могут управлять ресурсами {var(cloud)} и взаимодействовать друг с другом без участия человека. СУЗ помогают автоматизировать такое взаимодействие.

Как и обычные учетные записи, СУЗ позволяют пройти авторизацию в API и CLI с помощью логина и пароля. Однако авторизоваться с помощью СУЗ в личном кабинете {var(cloud)} нельзя.

Доступ программ к ресурсам {var(cloud)} ограничивается рамками роли, назначенной СУЗ. Для СУЗ можно назначить {linkto(../rolesandpermissions#iam-concepts-rolesandpermissions)[text=любую пользовательскую роль]}, кроме роли `Владелец проекта`.

В зависимости от роли в проекте пользователь в личном кабинете может:

- {linkto(../../instructions/service-account-manage#service-account-create)[text=создавать]} СУЗ;
- {linkto(../../instructions/service-account-manage#service-account-view-list)[text=просматривать]} список СУЗ проекта;
- {linkto(../../instructions/service-account-manage#service-account-view-card)[text=просматривать]} карточку СУЗ;
- {linkto(../../instructions/service-account-manage#service-account-download-rc-file)[text=скачивать]} на свое устройство OpenStack RC-файл, необходимый для использования API;
- {linkto(../../instructions/service-account-manage#service-account-authorize)[text=настраивать]} окружение для доступа к API от имени СУЗ;
- {linkto(../../instructions/service-account-manage#service-account-delete)[text=удалять]} СУЗ.

Эти же действия можно выполнять {linkto(../../../api/api-spec/api-service-users#api-spec-service-users)[text=через API]}.

Права на управление СУЗ в зависимости от роли в проекте:

[cols="1,1,1", options="header"]
|===
|Роли
|Создание и удаление СУЗ
|Просмотр списка и карточек СУЗ, скачивание OpenStack RC-файла

|Владелец проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперадминистратор
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор проекта
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Наблюдатель
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

Список всех СУЗ в проекте доступен в разделе личного кабинета **Управление доступами** на вкладке **Сервисные пользователи**. Эта вкладка отображается только для пользователей с ролью из таблицы выше и верифицированными почтой и номером телефона.

В проекте можно создать до 300 СУЗ.
