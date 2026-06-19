# {heading(Работа с компонентами сервиса)[id=jatoba_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Общая информация)[id=jatoba_info]}

### {heading(Просмотр общей информации)[id=jatoba_view_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Редактирование общей информации)[id=jatoba_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Изменение IP и портов)[id=jatoba_change-ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр статусов компонентов)[id=jatoba_view_status]}

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

## {heading(Масштабирование)[id=jatoba_horizontal_scaling]}

### {heading(Горизонтальное масштабирование)[id=jatoba_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Вертикальное масштабирование дисков)[id=jatoba_vertical_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(Учетные записи пользователей)[id=jatoba_users]}

### {heading(Просмотр учетных записей)[id=jatoba_users_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Добавление учетной записи)[id=jatoba_users_create]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. На странице экземпляра перейдите на вкладку **Учетные данные**.
1. Нажмите кнопку **Добавить учетную запись**.
1. В открывшемся окне задайте логин пользователя для доступа к экземпляру Jatoba.
1. Выберите роль:

   {include(../../../_includes/_data_p.md)[tags=roles_db]}

1. Придумайте или сгенерируйте пароль пользователя.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

### {heading(Редактирование сетевого доступа)[id=jatoba_users_access_network]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. Перейдите на вкладку **Учетные данные**.
1. Нажмите на значок **•••** справа от учетной записи пользователя и выберите пункт **Редактировать сетевой доступ**.
1. Выберите новые права на подключения для учетной записи.

   {note:info}
   Подробнее об особенностях настроек сетевого доступа в разделе {linkto(../create#jatoba_network_access)[text=Шаг 5. Сетевые доступы]}
   {/note}

1. Нажмите кнопку **Сохранить**.

{/tab}

{/tabs}

### {heading(Удаление учетных записей)[id=jatoba_users_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Включение и отключение расширений)[id=postgresql_extensions]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_extensions]}

{/tab}

{/tabs}

## {heading(Просмотр и редактирование настроек)[id=jatoba_edit_settings]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=jatoba_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Резервные копии экземпляра)[id=jatoba_backup]}

### {heading(Просмотр резервных копий)[id=jatoba_backup_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Создание резервной копии)[id=jatoba_backup_create]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Восстановление резервной копии)[id=jatoba_backup_recovery]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Просмотр истории изменений)[id=jatoba_changes_history]}

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

## {heading(Удаление экземпляра сервиса)[id=jatoba_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}