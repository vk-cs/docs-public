# {heading(Working with logs)[id=logging-view-logs]}

## {heading(Viewing logs)[id=logging-view]}

To view the logs, use any convenient method:

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Monitoring** → **Logging** section.

   The list of logs and a histogram of log distribution over time will be displayed. It lets you quickly spot spikes in errors or activity.

1. Use the buttons above the log list to select a display mode:

   - `Stream` — the list shows fewer details, but you can expand detailed information without leaving the list.
   - `Table` — a more detailed view that lets you copy brief log data. Detailed information is shown on a separate panel.

1. (Optional) {linkto(#logging-filter)[text=Use]} the search tools.
1. Click the required log in the list. Detailed information about it will be displayed.

{/tab}

{tab(API)}

Use {ifdef(public)}{linkto(../../../../tools-for-using-services/api/api-spec/logging#api-spec-logging)[text=the API methods]}{/ifdef}{ifndef(public)}the Cloud Logging API methods{/ifndef}.

To refine the search results, specify a search expression for the `message` field in the `like` parameter. Use the {linkto(../../concepts/search-tools#logging-search-tools)[text=search query language]} to write the search expression.

Examples of search expressions:

{include(../../../../_includes/_logs_query.md)}

{/tab}

{tab(Grafana)}

1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Deploy]} the Grafana service from the [Marketplace](https://msk.cloud.vk.ru/app/services/marketplace) to your project.

   When deploying the service, it will be automatically integrated with Cloud Logging:

   - A connection will be established that allows Grafana to receive application logs from the Cloud Logging service.
   - Data sources associated with Cloud Logging will be configured in Grafana.

1. Go to the Grafana console and log in.
1. Create a dashboard and add a visualization to it.
1. Select a data source associated with `{var(cloud)} Logging`.
1. From the list in the upper-right corner, select the `Logs` visualization.
1. (Optional) Configure the visualization parameters:

   - **Time**: display the time column. It contains Cloud Logging system timestamps associated with log entries.
   - **Unique Labels**: display columns with the `group_id` and `stream_id` parameters.
   - **Common Labels**: group logs by the values of the `group_id` and `stream_id` parameters.
   - **Wrap Lines**: enable line wrapping.
   - **Prettify JSON**: enable improved visualization of logs in JSON format.
   - **Enable log details**: display an expandable area with detailed log content.

1. In the **Service** field, specify the identifier of the service whose logs you want to display on the dashboard. Use the service identifiers pre-configured in the {var(cloud)} logging system, or {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=your own identifiers]}.

   {tabs}
    
   {tab(Pre-configured identifiers)}
        
   - `default` — an identifier that has no services associated with it and is intended for testing and debugging.
   - `containers` — Managed Containers.
   - `databases` — Cloud Databases.
   - `mlplatform` — Cloud ML Platform.

   {/tab}
    
   {tab(Your own identifiers)}
    
   Your own identifiers (`service_ID`) are located on the **Other resources** tab in the settings of the **Monitoring → Logging** section. They consist of lowercase Latin letters, numbers, and the `-` character, for example `a01bc23-d456-7890-a1bc-d2e3f45g6789`.

   {/tab}
    
   {/tabs}

1. Click the **Apply** button.
1. (Optional) In the **Group** field, specify the log group identifier (`group_id`). Use the `group_id` value specified in the {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=logging plugin settings]} during its installation. If the **Unique Labels** option is enabled, the `group_id` is displayed in the logs of the required service on the dashboard being created.
1. (Optional) In the **Stream** field, specify the log source identifier (`stream_id`). Use the `stream_id` value specified in the {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=logging plugin settings]} during its installation. If the **Unique Labels** option is enabled, the `stream_id` is displayed in the logs of the required service on the dashboard being created.
1. Save the changes you made.

{/tab}

{/tabs}

## {heading(Using filters and search queries)[id=logging-filter]}

{tabs}

{tab(Management console)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Monitoring → Logging** section.

   The list of logs and a histogram of log distribution over time will be displayed. It lets you quickly spot spikes in errors or activity.
1. In the **Query** field, select one or more log search criteria:

   - Select the required filter values.
  
       - **Period**: the period for which logs will be displayed.
       - **Level**: the severity level of the event. All levels are selected by default.
       - **Product**: the {var(cloud)} service the logs are collected from. All services for which logging is configured are selected by default.
   - Formulate and enter a query using the {linkto(../../concepts/search-tools#logging-search-tools)[text=search query language]}, or select a previously entered query from the **Saved queries** list.

   {cut(Examples of search expressions)}

   {include(../../../../_includes/_logs_query.md)}
   {/cut}

1. Use any parameter of a specific log to find other logs with the same values for that parameter:

   1. Open the detailed information for the required log.
   1. Click the ![Filter](../../../../assets/filter-funnel-icon.svg "inline") icon next to the required parameter in the **General information** and **Recognized fields** blocks to filter logs by this parameter.
   1. Make sure the corresponding search query language expression has been added to the **Query** field.
   1. (Optional) Repeat for another parameter.

1. Click the **Run** button.

   The list will display logs that match the search criteria.

{/tab}

{/tabs}

## {heading(Copying the full log entry)[id=logging-copy]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.
1. Go to the **Monitoring → Logging** section.

   The list of logs and a histogram of log distribution over time will be displayed. It lets you quickly spot spikes in errors or activity.
1. Find the required log. If needed, {linkto(#logging-filter)[text=use]} the search tools.
1. Copy the entry using one of the following methods:

    -  In the `Stream` view, click ![more-icon](../../../../assets/more-icon.svg "inline") for the required log and select **Copy log details**.
    - In the `Table` view, click the required log, then click the **Copy log details** button on the panel that opens.

   The full log entry will be copied in JSON format.

{/tab}

{/tabs}

## {heading(Creating a trigger from a log)[id=event-log-trigger]}

{tabs}

{tab(Management console)}

{include(../../../../_includes/_add-event-trigger.md)[tags=logging]}

{/tab}

{/tabs}
