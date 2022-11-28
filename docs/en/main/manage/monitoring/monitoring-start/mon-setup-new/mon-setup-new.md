The article will tell you how to install monitoring in a new virtual machine.

1. When creating a VM, activate the “Enable monitoring” item.
    1. This item is available only for VMs based on Linu family OS, only from VK CLoud public images.
2. Wait for the VM to be created.
3. Go to the Monitoring service.
4. Create a new dashboard.
    1. Select a visualization type.
    2. Select a standard service type/Namespace.
        1. “Linux virtual machine”.
    3. Select a metric from the list.
    4. Select a unit of measure.
        1. For standard metrics, we have already set the desired unit of measure.
    5. Select a filter condition for this metric.
        1. It is possible to select several filtering conditions.
    6. Select the field by which you want to group the received metrics data.
        1. For example, if you select the “host” grouping field, then graphs for different virtual machines will be displayed as separate lines.
    7. Select an aggregation function.
        1. Average.
        2. Minimum.
        3. Max.
    8. You can add multiple metrics to 1 chart.
        1. If the metrics have different units of measurement, then the units of measurement will not be displayed on the chart.
    9. To work with the dashboard, you can select a different date interval and different data aggregation intervals (from 1 minute to 30 days).
