Information about events and errors that occurred during the operation of the service is stored in VK Cloud logs. This data is used by technical support when analyzing emerging incidents.

{note:info}

If there are failures in the running VM, provide technical support with [VM message logs](/en/computing/iaas/instructions/vm/vm-console#vm_message_logs).

{/note}

To download logs locally:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Click on the user's name in the header of the page.
1. From the drop-down list, select **Application debug**.

   {note:info}

   Detailed information about each event in JSON format is available when you click on it.

   {/note}

1. Configure the displayed entries:

   - **Backend type**: select a service from the drop-down list. Select the option **Unknown backend** if the required service is not in the list.
   - **Show only 4хх and 5хх**: enable the option if you want to display only events completed with errors of type `4XX` or `5XX`.

1. Click **Download log**. A file of the form `dpp-log-<date>.json` will be downloaded.

{/tab}

{/tabs}
