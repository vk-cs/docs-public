Information about events and errors that occurred during the operation of the service is stored in VK Cloud logs. This data is used by [technical support](/en/contacts/) when analyzing emerging incidents.

<info>

If there are failures in the running VM, provide technical support with [VM message logs](/en/base/iaas/instructions/vm/vm-console#vm-message-logs).

</info>

To download logs locally:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. From the drop-down list, select **Application debug**.

   <info>

   Detailed information about each event in JSON format is available when you click on it.

   </info>

1. Configure the displayed entries:

   - **Backend type**: select a service from the drop-down list. Select the option **Unknown backend** if the desired service is not in the list.
   - **Show only 4хх and 5хх**: enable the option if you want to display only events completed with errors of type `4XX` or `5XX`.

1. Click **Download log**. A file of the form `dpp-log-<date>.json` will be downloaded.

</tabpanel>
</tabs>
