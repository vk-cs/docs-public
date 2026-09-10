<!-- Info about standalone differences -->

{includetag(difference)}

{note:info}
Most steps for creating a service instance are the same for {var(data-p)} configurations: Standalone as part of {var(cloud)} and Standalone as part of {var(cloud)}. Differences in the steps are noted accordingly.

You can identify the Standalone configuration by the icon in the top-left corner and the {var(data-p)} label.
{/note}

{/includetag}

<!-- Info about standalone differences for the service instance management page -->

{includetag(difference_management)}

{note:info}
Some actions on a service instance may be unavailable depending on the {var(data-p)} configuration: Standalone as part of {var(cloud)} and Standalone as part of {var(cloud)}.

You can identify the Standalone configuration by the icon in the top-left corner and the {var(data-p)} label.
{/note}

{/includetag}

<!-- Automatic IP assignment -->

{includetag(assign_ip)}

**(Standalone only, optional)** Specify your IP address for the service instance from the subnet. To do this, disable the **Automatic IP assignment** option. By default, the IP address is assigned to the instance automatically.

{/includetag}

<!-- Changing IP address -->

{includetag(change_ip)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required service instance.
1. Go to the **General information** tab.
1. Click **Manage IP addresses**.
1. (Standalone as part of {var(cloud)} only) Change the security group.
1. Specify the new IP addresses and change the ports if necessary.
1. Click **Save changes**.

{/includetag}

<!-- Viewing logs -->

{includetag(logs_view)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required service instance.
1. Go to the **Logging** tab.
1. Review the logs.
1. To view detailed information about a log entry, click on the record in the log table.
1. If necessary, refresh the logs or enable auto-refresh every 5 minutes.

{/includetag}

<!-- Filtering logs -->

{includetag(logs_filtering)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required service instance.
1. Go to the **Logging** tab.
1. Click **Filters** and select the filtering parameters:

   - **Status** — filter by log status. By default, events of all statuses are displayed. Can take the following values:

      - `All statuses` — all logs.
      - `Fatal` — information about critical errors that may cause {var(data-p)} failure or data loss. Require immediate attention and correction to avoid serious consequences.
      - `Debug` — information about {var(data-p)} or service operation needed for diagnostics and debugging.
      - `Error` — information about errors that will cause individual operations to fail, but are not critical for {var(data-p)} or the service. They need to be handled to restore functionality.
      - `Info` — information about {var(data-p)} or service operation. Examples: process startup or task completion.
      - `Warning` — information about potential issues that do not cause failures but may require intervention in the future. Examples: deprecated methods or unstable connections.

   - A fixed time period for which to display logs.
   - A specified time period for which to display logs. Set it manually using the calendar or timeline.

   To reset the filter settings, click **Reset filters**.

{/includetag}

<!-- Authorization via CIAM -->

{includetag(ciam_auth_note)}

{note:info}
In the Standalone configuration, user authorization in the service web interface is performed through the CIAM system. If the user is already authorized in the system, the connection occurs automatically.
{/note}

{/includetag}

<!-- Creating a service user -->

{includetag(service_user_create)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Service users** tab.
1. Click **Add service user**.
1. Click **Generate** to generate the service user secret. The service user ID is created automatically.

   {note:warn}
   Save the generated secret. After creating a service user, viewing the secret is not available.
   {/note}

1. Click **Save changes**.

{/includetag}

<!-- Deleting a service user -->

{includetag(service_user_delete)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required instance.
1. Go to the **Service users** tab.
1. Click **•••** for the required service user and select **Delete**.
1. Confirm the deletion.

{/includetag}

<!-- Changing endpoint IP address without UI -->

{includetag(change_ip_without_ui)}

1. Go to **Data Platform** → **Service instances**.
1. Click on the name of the required service instance.
1. Go to the **General information** tab.
1. Click **Manage IP addresses**. IP address editing is available for endpoints without a web interface.
1. (Standalone as part of {var(cloud)} only) Change the security group.
1. Specify the new IP addresses and change the ports if necessary.
1. Click **Save changes**.

{/includetag}

<!-- Information about shared quotas -->

{includetag(total_quotas)}

{note:info}
Resources in the Standalone and Standalone as part of {var(cloud)} configurations are shared among all users. Specify the instance parameters with the available resources in mind. The amount of available resources is displayed on the **Data Platform** → **Service instances** page in the top panel.
{/note}

{/includetag}
