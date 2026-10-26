# {heading(Working with a service instance)[id=airflow_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Viewing general information)[id=airflow_view_info]}

{tabs}

{tab(Management console)}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the instance name.
1. Review the information on the instance page tabs:

   - **General information** — instance parameters and main endpoints.
   - **Architecture** — Cloud Airflow nodes and their specifications.
   - **Credentials** — viewing and managing user accounts.
   - **Settings** — viewing and editing the service configuration.

     To view the description of a specific parameter, click its name.

   - **Connections** — viewing connections to data sources.
   - **Maintenance** — viewing and managing Cloud Airflow maintenance parameters.

{/tab}

{/tabs}

## {heading(Editing instance information)[id=airflow_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

{ifndef(public)}

## {heading(Viewing and replacing the TLS certificate)[id=airflow_certificate]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_tls_certificate]}

For more information on working with certificates, see the {linkto(../../../certificates/manage#certificates_manage)[text=Certificates]} section.

{/tab}

{/tabs}

{/ifndef}

## {heading(Changing IP addresses and ports)[id=airflow_change_ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Viewing instance node information)[id=airflow_view_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=airflow_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=airflow_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Maintaining an instance)[id=airflow_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Viewing connections)[id=airflow_view_connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Viewing credentials)[id=airflow_users_view]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_users_view]}

{/tab}

{/tabs}

## {heading(Adding an account)[id=airflow_user_add]}

{tabs}

{tab(Management console)}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the instance name.
1. Go to the **Credentials** tab.
1. Click **Add account**.
1. In the window that opens, set the username for accessing the Cloud Airflow instance.
1. Select a role for the account:

   {include(../../../_includes/_airflow.md)[tags=roles_airflow]}

1. Create or generate a password.

   {note:err}
   Save the password. Forgotten password recovery is not available.
   {/note}

1. Click **Save changes**.

{/tab}

{/tabs}

## {heading(Deleting an account)[id=airflow_user_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_user_delete]}

{/tab}

{/tabs}

## {heading(Deleting an instance)[id=airflow_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

## {heading(Viewing change history)[id=airflow_changes_history]}

{tabs}

{tab(Management console)}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the instance name.
1. Go to the desired tab and click the icon on the right ![icon](../../../assets/icon-clock.svg "inline").
1. Review the change history.

{/tab}

{/tabs}