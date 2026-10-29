# {heading(Viewing interactive logs)[id=spark_interactive_logs]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

Cloud Spark provides viewing of interactive logs with detailed information about Spark job execution in text or JSON format.

{note:warn}
Logs are displayed only for completed Spark jobs, including those with errors, if the `job.delete` job deletion function is not used in their code.
{/note}

To view interactive logs:

1. Go to the **Data Platform** → **Service Instances** section.
1. Click on the name of the Cloud Spark service instance.
1. On the **General Information** tab, copy the URL from the **Spark Service** field.
1. Follow the copied URL. The History Server will open — a web interface for visualizing events of completed Spark jobs.
1. Find the job of interest by its `App Name` value and click on its App ID.
1. Go to the **Executors** tab.
1. In the Executors table, on the right, in the `logs` column, click **log**.

   A page with interactive logs of the Spark job execution will open in text or JSON format (depending on the settings).

   If there are no logs and the message `failed to get pod logs` is displayed, make sure that the `job.delete` function is not used in the Spark job code. If the function is present, remove it and restart the job.