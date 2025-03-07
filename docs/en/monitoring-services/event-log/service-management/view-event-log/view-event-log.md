The Cloud Audit service allows you the following:

- [View](#view_events_list) in your management console information about events coming from your cloud services and virtual machines.
- [Use](#filter_events_list) filters and search queries to find the necessary events in the log.
- [Export](#export_events_list) a filtered list of events.

## {heading(Viewing event list)[id=view_events_list]}

1. [Go](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.

   The list of events allowed to be viewed for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project will be displayed.

1. (Optional) Sort the list in ascending or descending order of the event registration time. To do this, use the sort icon in the **Event Date** column header.
1. (Optional) [Use](#filter_events_list) the search tools.
1. Click the row in the list to view the detailed information about the event.

## {heading(Using filters and search queries)[id=filter_events_list]}

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

## {heading(Exporting event list)[id=export_events_list]}

1. [Go](https://cloud.vk.com/app/en) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.

   The list of events allowed to be viewed for your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project will be displayed.

1. (Optional) [Customize](#filter_events_list) the contents of the list using the search query and filters.
1. (Optional) Sort the list in ascending or descending order of the event registration time. Use the sort icon in the **Event Date** column header to do this.
1. Click the **Download** button.

A TSV file will be downloaded. The log entries in the file will be arranged in the order determined by the search query, filters, and sorting.

<info>

The maximum number of entries in the saved file is 1000.

</info>
