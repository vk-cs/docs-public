# {heading(Работа с экземпляром сервиса)[id=airflow_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Просмотр общей информации)[id=airflow_view_info]}

{tabs}

{tab(Личный кабинет)}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя экземпляра.
1. Просмотрите информацию на вкладках страницы экземпляра:

   - **Общая информация** — параметры экземпляра и основные эндпоинты.
   - **Архитектура** — узлы Cloud Airflow и их характеристики.
   - **Учетные данные** — просмотр учетных записей и управление ими.
   - **Настройки** — просмотр и редактирование конфигурации сервиса.

     Чтобы ознакомиться с описанием определенного параметра, нажмите на его название.

   - **Подключения** — просмотр подключений к источникам данных.
   - **Обслуживание** — просмотр и управление параметрами обслуживания Cloud Airflow.

{/tab}

{/tabs}

## {heading(Редактирование информации об экземпляре)[id=airflow_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Изменение IP и портов)[id=airflow_change_ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр информации об узлах экземпляра)[id=airflow_view_status]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Горизонтальное масштабирование)[id=airflow_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Просмотр и редактирование настроек)[id=airflow_edit_settings]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=airflow_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Просмотр подключений)[id=airflow_view_connect]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Просмотр учетных данных)[id=airflow_users_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Добавление учетной записи)[id=airflow_user_add]}

{tabs}

{tab(Личный кабинет)}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя экземпляра.
1. Перейдите на вкладку **Учетные данные**.
1. Нажмите кнопку **Добавить учетную запись**.
1. В открывшемся окне задайте логин пользователя для доступа к экземпляру Cloud Airflow.
1. Выберите роль для учетной записи:

   {include(../../../_includes/_airflow.md)[tags=roles_airflow]}

1. Придумайте или сгенерируйте пароль.

   {note:err}
   Сохраните пароль. Восстановление забытого пароля недоступно.
   {/note}

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Удаление учетной записи)[id=airflow_user_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Удаление экземпляра)[id=airflow_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

## {heading(Просмотр истории изменений)[id=airflow_changes_history]}

{tabs}

{tab(Личный кабинет)}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя экземпляра.
1. Перейдите на нужную вкладку и нажмите справа на значок ![значок](../../../assets/icon-clock.svg "inline").
1. Ознакомьтесь с историей изменений.

{/tab}

{/tabs}
