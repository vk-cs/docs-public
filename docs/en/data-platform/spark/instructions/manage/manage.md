# {heading(Working with a service instance)[id=spark_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifndef(public)}
{include(../../../_includes/_standalone.md)[tags=difference_management]}
{/ifndef}

## {heading(Viewing instance information)[id=spark_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_info]}

{/tab}

{/tabs}

## {heading(Editing the instance name and description)[id=spark_edit]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Changing the IP address and ports)[id=spark_change-ip]}
{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}
{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip_without_ui]}

{/tab}

{/tabs}
{/ifndef}

## {heading(Viewing component status)[id=spark_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=spark_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Vertical scaling)[id=spark_vertical_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_vertical_scaling]}

{/tab}

{/tabs}

{/ifndef}

## {heading(Viewing and changing the Spark version)[id=spark_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_spark.md)[tags=open]}

1. On the instance page, go to the **Settings** tab.
1. View the Spark version change history by clicking **•••**.
1. If necessary, change the Spark version that will be used to run your tasks:

   1. Click the **Edit** button.
   1. In the **Value** column, select the desired version from the list.
   1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Viewing connections)[id=spark_view_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Adding connections)[id=spark_create_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_spark.md)[tags=open]}

1. On the instance page, go to the **Connections** tab.

   {include(../../../_includes/_spark.md)[tags=connection]}

   1. Click the **Add** button.

{/tab}

{/tabs}

## {heading(Changing instance maintenance settings)[id=spark_maintenance]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_spark.md)[tags=open]}

1. On the instance page, go to the **Maintenance** tab.

{include(../../../_includes/_spark.md)[tags=maintenance]}

1. Click the **Save changes** button.

{/tab}

{/tabs}

## {heading(Deleting an instance)[id=spark_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}