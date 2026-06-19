# {heading(Работа с экземпляром сервиса)[id=mlflow_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Общая информация)[id=mlflow_info]}

### {heading(Просмотр общей информации)[id=mlflow_view_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Редактирование общей информации)[id=mlflow_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Изменение IP и портов)[id=mlflow_change-ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр статуса компонентов)[id=mlflow_view_status]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. На странице экземпляра перейдите на вкладку **Статус компонентов**.

{/tab}

{/tabs}

## {heading(Учетная запись администратора)[id=mlflow_admin]}

### {heading(Просмотр учетной записи)[id=mlflow_admin_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Добавление учетной записи)[id=mlflow_admin_create]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. Перейдите на вкладку **Учетные данные**.
1. Нажмите кнопку **Добавить учетную запись**.
1. Укажите логин и пароль учетной записи.
   
   {note:info}
   Подробнее об особенностях ввода логина и пароля — в разделе {linkto(../create#mlflow_create_user)[text=Шаг 5. Учетные данные]}
   {/note}

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Подключения)[id=mlflow_connect]}

### {heading(Просмотр подключений)[id=mlflow_view_connect]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

### {heading(Добавление подключений)[id=mlflow_create_connect]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_create_connect]}

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=mlflow_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service_no_backup]}

{/tab}

{/tabs}

## {heading(Просмотр истории изменений)[id=mlflow_changes_history]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. Перейдите на интересующую вкладку и нажмите справа на значок ![значок](../../../assets/clock-icon.svg "inline").
1. Ознакомьтесь с историей изменений.

{/tab}

{/tabs}

## {heading(Удаление экземпляра сервиса)[id=mlflow_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}