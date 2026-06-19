# {heading(Работа с компонентами сервиса)[id=nifi_management]}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Просмотр общей информации)[id=nifi_view_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Редактирование общей информации)[id=nifi_edit_info]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Изменение IP и портов)[id=nifi_change-ip]}

{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Просмотр статуса компонентов)[id=nifi_view_status]}

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

## {heading(Горизонтальное масштабирование)[id=nifi_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Просмотр учетной записи администратора)[id=nifi_admin_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Просмотр и редактирование настроек)[id=nifi_edit_settings]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings]}

{/tab}

{/tabs}

## {heading(Обслуживание экземпляра)[id=nifi_service]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Просмотр истории изменений)[id=postgresql_changes_history]}

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

## {heading(Удаление экземпляра сервиса)[id=nifi_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}