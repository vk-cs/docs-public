The Cloud Audit service allows you the following:

- [View](#event_log_view) in your management console information about events coming from your cloud services and virtual machines.
- [Use](#event_log_filter) filters and search queries to find the necessary events in the log.
- [Export](#event_log_export) a filtered list of events.

## {heading(Viewing event list)[id=event_log_view]}

1. [Go](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.

   The list of events allowed to be viewed for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project will be displayed.

1. (Optional) Sort the list in ascending or descending order of the event registration time. To do this, use the sort icon in the **Event Date** column header.
1. (Optional) [Use](#event_log_filter) the search tools.
1. Click the row in the list to view the detailed information about the event.

## {heading(Using filters and search queries)[id=event_log_filter]}

1. [Go](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.

   The list of events allowed to be viewed for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project will be displayed.

1. Click the **Search and filters** button.

1. Specify one or more filters for searching events in the list:

   - In the search line, specify a substring that must be present in one of the event parameters, or formulate a more complex query in [search query language](/en/monitoring-services/event-log/concepts/search-language).
   - Select the filter values from the drop-down lists.
   - Specify the event registration time interval.

1. Click the **Find** button.

The list will display events that meet the search parameters.

## {heading(Exporting event list)[id=event_log_export]}

1. [Go](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.

   The list of events allowed to be viewed for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project will be displayed.

1. (Optional) [Customize](#event_log_filter) the contents of the list using the search query and filters.
1. (Optional) Sort the list in ascending or descending order of the event registration time. Use the sort icon in the **Event Date** column header to do this.
1. Click the **Download** button.

A TSV file will be downloaded. The log entries in the file will be arranged in the order determined by the search query, filters, and sorting.

{note:info}

The maximum number of entries in the saved file is 1000.

{/note}
