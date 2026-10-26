{includetag(detail-all)}
All debits and credits for projects are recorded in the {var(cloud)} management console on the {ifdef(public)}[balance page](https://msk.cloud.vk.com/app/services/billing){/ifdef}{ifndef(public)}balance page{/ifndef} of the project.

{ifdef(public)}
Expense details are available to users whose {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=role]} in the project is owner, super administrator, project administrator, or billing administrator.

{note:warn}
Details of debits and credits in the Moscow {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} are tied to Moscow time (GMT+3), and in the Kazakhstan region — to Astana time (GMT+6).

The same principle applies when {linkto(../../concepts/report#billing-report)[text=generating reporting documents]}.
{/note}
{/ifdef}

## {heading(Viewing debits and credits)[id=includes-detail-debits-receipts-view]}
{/includetag}
{includetag(file-billing-detail)}
1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
   {/includetag}
   {includetag(detail-all)}

{include(/en/_includes/_balance_page.md)}

   {/includetag}
   {includetag(file-billing-detail)}
1. Go to the **Details** tab.
   {/includetag}
   {includetag(detail-all)}
   {note:warn}
   Amounts less than one kopeck are rounded up to 1 kopeck, including when calculating the total cost.
   {/note}

1. If necessary, set filters on the displayed records:

   - Set the date, using detailing by period if necessary.
   - Specify the type of fund movement: debits or credits.
     {/includetag}
     {includetag(file-billing-detail)}
   - Configure the displayed projects by clicking the ![Filter](../../../../assets/filter_icon.svg "inline") icon and selecting projects from the list.
     {/includetag}
     {includetag(file-account-detail)}
   - Configure the displayed projects by clicking the ![Filter](../../../../../assets/filter_icon.svg "inline") icon and selecting projects from the list.
     {/includetag}
     
{includetag(detail-all)}
## {heading(Viewing resource consumption statistics)[id=includes-detail-consumption-statistics-view]}
{/includetag}

{includetag(file-billing-detail)}
1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
   {/includetag}
   {includetag(detail-all)}

{include(/en/_includes/_balance_page.md)}

1. Go to the **Service expenses** tab.
1. If necessary, set filters on the displayed records:

   - Set the date, using detailing by period if necessary.
   - Specify the type of fund movement: debits or credits.
     {/includetag}
     {includetag(file-billing-detail)}
   - Configure the displayed projects by clicking the ![Filter](../../../../assets/filter_icon.svg "inline") icon and selecting projects from the list.
     {/includetag}
     {includetag(file-account-detail)}
   - Configure the displayed projects by clicking the ![Filter](../../../../../assets/filter_icon.svg "inline") icon and selecting projects from the list.
     {/includetag}
     {includetag(detail-all)}
     The list displays projects in which your role is owner or super administrator. By default, the data is filtered by the current project.

## {heading(Downloading a report)[id=includes-detail-report-download]}
{/includetag}

{includetag(file-billing-detail)}
1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
   {/includetag}
   {includetag(file-account-detail)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
   {/includetag}
   {includetag(detail-all)}

{include(/en/_includes/_balance_page.md)}

   {/includetag}
   {includetag(file-billing-detail)}
1. If necessary, set filters on the displayed records.
1. Go to the **Details** tab.
1. Click the ![Download](../../../../assets/download_icon.svg "inline") icon.
   {/includetag}
   {includetag(file-account-detail)}
1. If necessary, set filters on the displayed records on the **Details** tab.
1. Click the ![Download](../../../../../assets/download_icon.svg "inline") icon.
   {/includetag}
   {includetag(detail-all)}
1. {ifdef(public)}Select a {linkto(/en/intro/billing/concepts/balance#billing-details)[text=report]} in the window that opens:

   {tabs}

   {tab(Consumption report)}

   A report with the total amount of expenses for the specified period.

   {/ifdef}
   Fill in the report parameters:
   {/includetag}
   {includetag(file-billing-detail)}
   - **Period**: the time period for which you want to export the report.
   - **Detail level**: the level of data detail in the report (day, week, month, or year).
     {/includetag}
     {includetag(detail-all)}
   - **Report type**: the type of report to download — `docx`, `xlsx`, `For accounting`.
   - **Select the projects for which you want to get reports**: one or more projects.

     The list displays projects in which your role is owner or super administrator. By default, the data is filtered by the current project.

   {ifdef(public)}
   {/tab}

   {tab(Granular report)}

   A detailed report with the amount of expenses for each {var(cloud)} service parameter, grouped by day.

   Fill in the report parameters:

   - **Period**: the time period for which you want to export the report.
   - **File format**: the format of the report to download — `CSV`, `xlsx`.
   - **Select the projects for which you want to get reports**: one or more projects.

     The list displays projects in which your role is owner or super administrator. By default, the data is filtered by the current project.
   
   {/tab}

   {/tabs}

{/ifdef}

1. Click the **Download report** button.
{/includetag}
