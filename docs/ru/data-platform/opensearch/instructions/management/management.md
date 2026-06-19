# {heading(Работа с экземпляром сервиса)[id=opensearch_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Общая информация)[id=opensearch_info]}

### {heading(Просмотр общей информации)[id=opensearch_view_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Редактирование общей информации)[id=opensearch_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Изменение IP и портов)[id=opensearch_change-ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр статуса компонентов)[id=opensearch_view_status]}

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

## {heading(Горизонтальное масштабирование)[id=opensearch_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Учетные записи пользователей)[id=opensearch_users]}

### {heading(Просмотр учетных записей)[id=opensearch_users_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Создание учетных записей)[id=opensearch_users_create]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. Перейдите на вкладку **Учетные данные**.
1. Нажмите кнопку **Добавить учетную запись**.
1. Укажите логин, роль и пароль для учетной записи. В настоящий момент для пользователя доступна только роль `Администратор`.

   {note:info}
   Подробнее об особенностях создания пользователя в разделе {linkto(../create#opensearch_create_user)[text=Шаг 4. Учетные данные]}
   {/note}

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=opensearch_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Резервные копии экземпляра)[id=opensearch_backup]}

### {heading(Просмотр резервных копий)[id=opensearch_backup_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Создание резервной копии)[id=opensearch_backup_create]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Восстановление резервной копии)[id=opensearch_backup_recovery]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}

## {heading(Просмотр истории изменений)[id=opensearch_changes_history]}

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

## {heading(Удаление экземпляра сервиса)[id=opensearch_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
