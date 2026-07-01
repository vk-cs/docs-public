# {heading(Работа с экземпляром сервиса)[id=spark_management]}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Просмотр информации об экземпляре)[id=spark_view]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Редактирование имени и описания экземпляра)[id=spark_edit]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Изменение IP и портов)[id=spark_change-ip]}
{note:warn}
Только для Standalone и Standalone в составе {var(cloud)}.
{/note}
{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_standalone.md)[tags=change_ip_without_ui]}

{/tab}

{/tabs}
{/ifndef}

## {heading(Просмотр статуса компонентов)[id=spark_status]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Горизонтальное масштабирование)[id=spark_horizontal_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

{ifndef(public)}
## {heading(Вертикальное масштабирование)[id=spark_vertical_scaling]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_scaling]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Просмотр и изменение версии Spark)[id=spark_settings]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. На странице экземпляра перейдите на вкладку **Настройки**.
1. Просмотрите историю изменения версии Spark, для этого нажмите **•••**.
1. При необходимости измените версию Spark, которая будет использоваться при запуске ваших задач:

   1. Нажмите кнопку **Редактировать**.
   1. В столбце **Значение** выберите нужную версию из списка.
   1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Просмотр подключений)[id=spark_view_connect]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Добавление подключений)[id=spark_create_connect]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. На странице экземпляра перейдите на вкладку **Подключения**.

   {include(../../../_includes/_spark.md)[tags=connection]}

   1. Нажмите кнопку **Добавить**. 

{/tab}

{/tabs}

## {heading(Изменение параметров обслуживания экземпляра)[id=spark_maintenance]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_spark.md)[tags=open]}

1. На странице экземпляра перейдите на вкладку **Обслуживание**.

{include(../../../_includes/_spark.md)[tags=maintenance]}

1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{/tabs}

## {heading(Удаление экземпляра)[id=spark_delete]}

{tabs}

{tab(Личный кабинет)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}
