## {heading(Creating a chart)[id=create-custom-chart]}

You can visualize resource metrics by creating a chart using the parameter constructor or direct queries in PromQL.

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. Click the **Create chart** button.
1. Select one of the modes:

    {tabs}

    {tab(By parameters)}

    Use this mode to quickly customize the chart without knowing the query syntax.

    1. Select the `By parameters` option and click **Next**.
    1. Specify the parameters:

        * **Name**: chart name.
        * **Category**: select an existing category or create a new one. You need categories for grouping charts on the dashboard. 
        * **Resource type**: specify the resource to build the chart for.
        * **Chart type**: select the visualization type.

            * **Linear** — a chart for changes in metrics over time. This type is useful for tracking CPU, memory, and traffic.
            * **Bar chart** — the distribution of metric values over intervals.
            * **Pie chart** — the share of each value in the total amount.
            * **Digital** — the current aggregated metric value (number).
            * **Bar** — vertical or horizontal columns. This type is convenient for comparing values among resources.
            * **Gauge** — the value on a scale with color zones (green, yellow, red).
            * **Binary** — one of the two states — true or false — based on the query result.

    1. Click **Next step**.
    1. Configure the metrics for display:
   
        * Select the values for **Label category**, **Metric name**, and **Unit**.
        * Click the **+ Add label** link to configure data filtering.
        * Select an **Aggregation function**.
        * If necessary, specify the **Grouping** parameters.
        
    1. Click **Create**.

    {/tab}

    {tab(By query)}

    Use this mode to flexibly configure complex selections using PromQL.

    1. Select the `By query` option and click **Next**.
    1. Specify the parameters:

        * **Name**: chart name.
        * **Category**: select an existing category or create a new one. You need categories for grouping charts on the dashboard.
        * **Resource type**: specify the resource to build the chart for.
        * **Chart type**: select the visualization type.

            * **Linear** — a chart for changes in metrics over time. This type is useful for tracking CPU, memory, and traffic.
             * **Bar chart** — the distribution of metric values over intervals.
            * **Pie chart** — the share of each value in the total amount.
            * **Digital** — the current aggregated metric value (number).
            * **Bar** — vertical or horizontal columns. This type is convenient for comparing values among resources.
            * **Gauge** — the value on a scale with color zones (green, yellow, red).
            * **Binary** — one of the two states — true or false — based on the query result.

    1. In the **Query body** field, enter the query for metrics. Use the [PromQL syntax](/en/monitoring-services/monitoring/concepts/mon-read-metrics).
    1. Click **Create**.

    {/tab}

    {/tabs}

## {heading(Viewing, editing, and deleting charts)[id=manage-charts]}

You can change the chart settings, view charts in the detailed mode, or delete them.

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. View the dashboard with the required chart using one of the methods:

    * Click the category name.
    * Click **Navigate to dashboard**.
   
1. Hover over the required chart and click the ![ ](/en/assets/more-icon.svg "inline") icon in its upper right corner.
1. Select the required action:

    * **Details**: open the expanded chart view for detailed analysis.
    * **Edit dashboard**: change the metrics, visualization type, or the chart name.
    * **Delete dashboard**: delete the chart.

## {heading(Working with a dashboard)[id=organize_with_sections]}

Categories allow you to structure your dashboard by grouping charts into logical blocks.

### Creating a category

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. Click the **Create category** button.
1. Enter the category name and click **Create**.

The new category appears in the list. Now, you can add charts to this category.

### Configuring and deleting a category

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. Click the ![ ](/en/assets/more-icon.svg "inline") icon in the header of the required category.
1. Select the required action:

    * **Rename**: change the category name.
    * **Pin/Unpin**: pin an important category to the beginning of the list.
    * **Delete**: delete the category.

       {note:warn}
       When deleting a category, all the charts included in it are deleted too.
       {/note}

### Managing chart visibility on the dashboard

You can hide the chart from the preview section on the **My charts** tab. A hidden chart does not display in the list, but remains available inside its category.

To hide a chart:

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. View the dashboard with the required chart using one of the methods:

    * Click the category name.
    * Click **Navigate to dashboard**.

1. Hover over the chart and click the ![ ](/en/assets/more-icon.svg "inline") icon in its upper right corner.
1. Select the **Hide from preview** option.

To show the chart in the preview:

1. [Go to](https://msk.cloud.vk.com/app/en) VK Cloud management console.
1. Go to the **Monitoring** → **Dashboards** section.
1. Go to the **My charts** tab.
1. View the dashboard with the required chart by clicking **Navigate to dashboard**.
1. Hover over the chart and click the ![ ](/en/assets/more-icon.svg "inline") icon in its upper right corner.
1. Select the **Show in preview** option.