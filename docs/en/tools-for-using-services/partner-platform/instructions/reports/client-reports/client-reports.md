# {heading(Getting a client report)[id=partner-platform-client-reports]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can generate and export reports on resource consumption across all client projects.
The resource consumption report contains the total expenses for the specified period without day-by-day details.

To get a report:

1. [Go to](https://partners.tech.vk.ru) the VK Tech partner management console.
1. On the main page, click the **Partner Account** button in the {var(cloud)} card.
1. Go to the **Clients** section.
1. Click the **Consumption Report** button.
1. In the window that opens:

   1. Select the **Report type**:

      - **For accounting** — an XLSX file in the accounting report format.
      - **XLSX report** — a report in the form of a simple table.

   1. Select the start and end of the period for which you are generating the report.
   1. Select the **Enter client emails** option if you want to generate a report for specific clients. By default, the **All clients** option is selected.
   1. Click **Export**.

1. Wait for the report to be generated. This may take some time.
1. In the window that opens, click the **Download report** button.

An archive will be downloaded that contains:

- Reports for clients in separate XLSX files with names like `<CLIENT_NAME+CLIENT_EMAIL>.xlsx`.
- A general report with the consumption of all clients in an XLSX file with a name like `summary_report_<REPORTING_PERIOD>`.