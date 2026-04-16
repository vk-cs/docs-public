All deductions and additions for projects are recorded in the VK Cloud management console on the project [balance page](https://msk.cloud.vk.com/app/en/services/billing).

Expenses details are available to users with the [roles](/en/tools-for-using-services/account/concepts/rolesandpermissions) of Owner, Superadministrator, Project administrator and Billing administrator.

{note:warn}

Deductions and additions for projects in the Moscow [region](/en/tools-for-using-services/account/concepts/regions) are tied to the Moscow Time Zone (GMT+3), in the Kazakhstan region —  to the Astana Time Zone (GMT+6).

The same principle applies to [the formation of accounting documents](../../concepts/report).

{/note}

## Viewing deductions and additions

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Open the balance page using one of these options:

   - Click on your username in the top part of the management console page and select **Balance and payments** from the drop-down list.
   - Select the **Balance** section in the side menu.

1. Go to **Detail** tab.

   {note:warn}

   Amounts less than a kopeck are rounded up to one kopeck, including when calculating the total cost.

   {/note}

1. If necessary, set filters on the displayed records:

   - Set the date, if necessary, use the details for the period.
   - Specify the type of funds movement: deductions or additions.
   - Configure the displayed projects by clicking ![Filter](assets/filter_icon.svg "inline") and by selecting projects from the list.

## Viewing resource consumption statistics

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Open the balance page using one of these options:

   - Click on your username in the top part of the management console page and select **Balance and payments** from the drop-down list.
   - Select the **Balance** section in the side menu.

1. Go to **Expenses on services** tab.
1. If necessary, set filters on the displayed records:

   - Set the date, if necessary, use the details for the period.
   - Specify the type of funds movement: deductions or additions.
   - Configure the displayed projects by clicking ![Filter](assets/filter_icon.svg "inline") and by selecting projects from the list.

     The list shows projects in which your role is owner or superadministrator. By default, the data is filtered by the current project.

## {heading(Downloading the report)[id=download-report]}

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. Open the balance page using one of these options:

   - Click on your username in the top part of the management console page and select **Balance and payments** from the drop-down list.
   - Select the **Balance** section in the side menu.

1. If necessary, set filters on the displayed records.
1. Go to the **Detail** tab.
1. Click ![Download](assets/download_icon.svg "inline").
1. In the window that opens, select the [report](/en/intro/billing/concepts/balance#consumption-report) to download:

   {tabs}

   {tab(Consumption report)}

   A report that shows the total amount of expenses for the specified period.

   Specify the report options:

   - **Period** — the time period to download the report for.
   - **Details** — how detailed the data in the report must be (by day, week, month, or year).
   - **Report format** — the format to download the report in. The options are: **docx**, **xlsx**, **Для бухгалтерии**.
   - **Select the projects for which you want to get reports** — one or more projects.

   The list shows the projects in which your role is owner or superadministrator. By default, the data is filtered by the current project.

   {/tab}

   {tab(Granular report)}

   A detailed report with the amount of expenses for each service parameter of VK Cloud grouped by day.

   Specify the report options:

   - **Period** — the time period to download the report for.
   - **Report format** — the format to download the report in. The options are: `CSV`, `xlsx`.
   - **Select the projects for which you want to get reports** — one or more projects.

   The list shows the projects in which your role is owner or superadministrator. By default, the data is filtered by the current project.

   {/tab}

   {/tabs}

1. Click the **Download report** button.
