To view the logs, use any method convenient for you:

<tabs>
<tablist>
<tab>Management console</tab>
<tab>API</tab>
<tab>Grafana</tab>
</tablist>
<tabpanel>

1. [Go to](https://msk.cloud.vk.com/app/en/services/monitoring/logging) the **Monitoring** → **Logging** section of your VK Cloud management console.
1. (Optional) Select values ​​for filters.
1. (Optional) Enter a value to search for or formulate a query using the [search query language](../../concepts/search-tools).

    Examples of search expressions:

      {include(/en/_includes/_logs_query.md)}

</tabpanel>
<tabpanel>

Use [API methods](/ru/tools-for-using-services/api/api-spec/logging "change-lang").

To refine the search results, specify a search expression for the `message` field in the `like` parameter. Use the [search query language](../../concepts/search-tools) to write the search expression.
Examples of search expressions:

  {include(/en/_includes/_logs_query.md)}

</tabpanel>
<tabpanel>

1. [Deploy](/en/applications-and-services/marketplace/initial-configuration/grafana-start) the Grafana service from the [Marketplace](https://msk.cloud.vk.com/app/en/services/marketplace) to your project.

    When deploying the service, it will be automatically integrated with Cloud Logging:

      - A connection will be established that allows Grafana to receive application logs from the Cloud Logging service.
      - In Grafana, data sources associated with Cloud Logging will be configured.

1. Go to the Grafana console and log in.
1. Create a dashboard and add a visualization to it.
1. Select a data source associated with `VK Cloud Logging`.
1. From the list in the upper right corner, select the `Logs` visualization.
1. (Optional) Configure the visualization parameters:

   - **Time**: display the time column. It contains Cloud Logging system timestamps associated with log entries.
   - **Unique Labels**: display columns with the `group_id` and `stream_id` parameters.
   - **Common Labels**: group logs by the values ​​of the `group_id` and `stream_id` parameters.
   - **Wrap Lines**: enable line wrapping.
   - **Prettify JSON**: enable improved visualization of logs in JSON format.
   - **Enable log details**: display an expandable area with detailed log content.

1. In the **Service** field, specify the ID of the service whose logs you want to display on the dashboard. Use the service IDs pre-configured in the VK Cloud logging system or [your own IDs](../../concepts/logging-plugin#conf_parameters).

    <tabs>
    <tablist>
    <tab>Pre-configured IDs</tab>
    <tab>Your own IDs</tab>
    </tablist>
    <tabpanel>

    - `default` — an identifier that has no services associated with it and is intended for testing and debugging.
    - `containers` — Cloud Containers.
    - `databases` — Cloud Databases.
    - `bigdata` — Cloud Big Data.
    - `vdi` — Cloud Desktop.
    - `mlplatform` — Cloud ML Platform.

    </tabpanel>
    <tabpanel>

    Your own IDs (`service_ID`) are located on the **Other resources** tab in the settings of the **Monitoring → Logging** section. They consist of lowercase Latin letters, numbers, and the `-` characters, for example: `a01bc23-d456-7890-a1bc-d2e3f45g6789`.

    </tabpanel>
    </tabs>

1. Click the **Apply** button.
1. (Optional) In the **Group** field, specify the log group identifier (`group_id`). Use the `group_id` value specified in the [logging plugin settings](../../concepts/logging-plugin#conf_parameters) during its installation. If the **Unique Labels** option is enabled, the `group_id` is displayed in the logs of the required service on the dashboard being created.
1. (Optional) In the **Stream** field, specify the log source identifier (`stream_id`). Use the `stream_id` value specified in the [logging plugin settings](../../concepts/logging-plugin#conf_parameters) during its installation. If the **Unique Labels** option is enabled, the `stream_id` is displayed in the logs of the required service on the dashboard being created.
1. Save the changes you made.

</tabpanel>
</tabs>
