# {heading(Working with a service instance)[id=lakekeeper_management]}

{include(/en/_includes/_translated_by_ai_en.md)}

{include(../../../_includes/_standalone.md)[tags=difference_management]}

## {heading(Viewing instance information)[id=lakekeeper_view_info]}

{tabs}

{tab(Management console)}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the instance name.
1. View the information on the tabs of the instance page:

   - **General information** — instance parameters and main endpoints.
   - **Architecture** — Lakekeeper nodes and their specifications.
   - **Monitoring** — viewing instance metrics.
   - **Settings** — viewing and editing the service configuration.

     To view the description of a specific parameter, click its name.

   - **Maintenance** — viewing and managing Lakekeeper maintenance settings.

{/tab}

{/tabs}

## {heading(Editing instance information)[id=lakekeeper_edit_info]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_name]}

{/tab}

{/tabs}

## {heading(Viewing component status)[id=lakekeeper_view_status]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_status]}

{/tab}

{/tabs}

## {heading(Assigning an external IP)[id=lakekeeper_assign_ip]}

{note:warn}
Available only for {var(data-p)} as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_assign_ip]}

{/tab}

{/tabs}

## {heading(Changing the IP and ports)[id=lakekeeper_change_ip]}

{note:warn}
Only for Standalone and Standalone as part of {var(cloud)}.
{/note}

{tabs}

{tab(Management console)}

{include(../../../_includes/_standalone.md)[tags=change_ip]}

{/tab}

{/tabs}

## {heading(Horizontal scaling)[id=lakekeeper_horizontal_scaling]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_horizontal_scaling]}

{/tab}

{/tabs}

## {heading(Viewing and editing settings)[id=lakekeeper_edit_settings]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_edit_settings_new]}

{/tab}

{/tabs}

## {heading(Viewing connections)[id=lakekeeper-view-connect]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_view_connect]}

{/tab}

{/tabs}

## {heading(Creating a data storage connection)[id=lakekeeper-create-connect]}

1. On the instance page, go to the **Connections** tab.
1. Click the **Add connection** button.
1. Set the connection parameters:

   - **Name**: an arbitrary connection name.
   - **Bucket**: the bucket name.
   - **Path to files in the bucket**: the path to a directory in the bucket for storing data.
   - **Warehouse name**: the name of the data warehouse.
   
   If necessary, enable the following options:

   - **Enable soft deletion**: marking objects as deleted for a specified period without physically removing them from storage. This option allows restoring accidentally deleted data.
   - **Data retention period for soft deletion (seconds)**: the time objects are kept in the trash, in seconds, before being physically deleted. Default value: `2592000` (30 days).
   - **Immediate deletion from S3**: immediate physical deletion of objects from S3 when metadata is deleted. Available only if the **Enable soft deletion** option is enabled. Prevents direct file deletion during `DROP TABLE` and `PURGE` operations.
   - **Use path-style access to S3**: using path-style access to the S3 storage. Some S3-compatible storages require this option to be enabled. If the storage supports both access styles (virtual-host and path-style), the option does not need to be enabled.
   - **Alternative S3 protocols**: using the alternative S3 protocols `s3a://` and `s3n://` in data paths.
   - **Enable MD5 hash support**: using MD5 hashes for operations that require checksums. Needed for backward compatibility with S3 storages that do not support modern hashing algorithms.

1. Click the **Add** button.

## {heading(Service instance maintenance)[id=lakekeeper_service]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_service]}

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=lakekeeper_delete]}

{tabs}

{tab(Management console)}

{include(../../../_includes/_data_p.md)[tags=instance_delete]}

{/tab}

{/tabs}

## {heading(Viewing the change history)[id=lakekeeper_changes_history]}

{tabs}

{tab(Management console)}

1. Go to the **Data Platform** → **Service instances** section.
1. Click the instance name.
1. Go to the desired tab and click the icon on the right ![icon](../../../assets/icon-clock.svg "inline").
1. Review the change history.

{/tab}

{/tabs}