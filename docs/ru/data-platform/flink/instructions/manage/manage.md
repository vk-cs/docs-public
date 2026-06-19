# {heading(Работа с экземпляром сервиса)[id=flink_management]}

## {heading(Просмотр информации об экземпляре)[id=flink_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Редактирование имени и описания экземпляра)[id=flink_edit]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Просмотр статуса компонентов)[id=flink_status]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_clickhouse.md)[tags=open]}

1. На странице экземпляра перейдите на вкладку **Статус компонентов**.

{/tab}

{/tabs}

## {heading(Изменение пароля администратора)[id=flink_change_password]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_admin_password]}

{/tab}

{/tabs}

## {heading(Удаление экземпляра)[id=flink_delete]}

Это групповая операция: при необходимости можно удалить сразу несколько экземпляров сервиса, выбрав их с помощью флажков.

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

{ifdef(public)}

## {heading(Просмотр информации о связанном кластере Kubernetes)[id=flink_k8s]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Data Platform → Экземпляры сервисов**.
1. Нажмите **•••** для нужного экземпляра и выберите пункт **Перейти к кластеру k8s**.

{/tab}

{/tabs}
{/ifdef}
