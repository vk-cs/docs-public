# {heading(Генерация учетных данных)[id=logging-generate-userdata]}

Для записи логов в сервис Cloud Logging используются учетные данные:

- `user_id` — идентификатор пользователя, от имени которого будут записываться логи;
- `password` — пароль указанного пользователя;
- `project_id` — {linkto(../../../../tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)[text=идентификатор]} проекта {var(cloud)} в OpenStack.

Чтобы сгенерировать учетные данные:

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Мониторинг** → **Логирование**.
1. Нажмите кнопку **Настройки**.
1. Перейдите на вкладку **Генерация учетных данных**.
1. Нажмите кнопку **Сгенерировать**.
1. Сохраните полученные учетные данные.

{/tab}

{/tabs}
