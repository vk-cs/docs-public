# {heading(Работа с компонентами сервиса)[id=redis_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Общая информация)[id=redis_info]}

### {heading(Просмотр общей информации)[id=redis_view_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

### {heading(Редактирование общей информации)[id=redis_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Просмотр и замена TLS-сертификата)[id=redis_certificate]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

Подробнее о работе с сертификатами — в разделе {linkto(../../../certificates/manage#certificates_manage)[text=Сертификаты]}.

{/tab}

{/tabs}

{/ifndef}

## {heading(Изменение IP и портов)[id=redis_change-ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр статуса компонентов)[id=redis_view_status]}

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

## {heading(Масштабирование)[id=redis_scaling]}

### {heading(Горизонтальное масштабирование)[id=redis_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

### {heading(Вертикальное масштабирование дисков)[id=redis_vertical_disk_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_disk_scaling]}

{/tab}

{/tabs}

## {heading(Учетная запись администратора)[id=redis_admin]}

### {heading(Просмотр учетной записи)[id=redis_admin_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

### {heading(Добавление учетной записи)[id=redis_admin_create]}

{tabs}

{tab(Личный кабинет)}

{ifdef(public)}
1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
{/ifdef}

1. Перейдите в раздел **Data Platform** → **Экземпляры сервисов**.
1. Нажмите на имя нужного экземпляра.
1. На странице экземпляра перейдите на вкладку **Учетные данные**.
1. Нажмите кнопку **Добавить учетную запись**.
1. Укажите логин и пароль учетной записи.
   
   {note:info}
   Подробнее об особенностях ввода логина и пароля — в разделе {linkto(../create#redis_create_user)[text=Шаг 4. Учетные данные]}
   {/note}

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Просмотр и редактирование настроек)[id=redis_edit_settings]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=redis_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Резервные копии экземпляра)[id=redis_backup]}

### {heading(Просмотр резервных копий)[id=redis_backup_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_view]}

{/tab}

{/tabs}

### {heading(Создание резервной копии)[id=redis_backup_create]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_create]}

{/tab}

{/tabs}

### {heading(Восстановление резервной копии)[id=redis_backup_recovery]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_backup_recovery]}

{/tab}

{/tabs}


## {heading(Просмотр истории изменений)[id=redis_changes_history]}

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

## {heading(Удаление экземпляра сервиса)[id=redis_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}
