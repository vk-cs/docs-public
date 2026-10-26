# {heading(Cloud Monitoring)[id=api-spec-monitoring2]}

{include(/en/_includes/_translated_by_ai_en.md)}

The REST API of the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service supports reading metrics collected by the monitoring agent:

- retrieving metrics for a specified point in time;
- retrieving metrics for a specified time range;
- searching metrics by their labels.

Requests for reading metrics are formulated in the [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) language.

{cut(Getting the endpoint, authorization, and authentication)}

1. Make sure that the Cloud Monitoring service is enabled for your project; if necessary, enable it via [technical support](/en/contacts).
1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Enable]} two-factor authentication if it has not been done yet.
1. {linkto(../../rest-api/enable-api#rest-api-enable-activate)[text=Enable]} API access if it has not been done yet.
1. Click the username in the page header and select **Project Settings**.
1. Go to the **API Endpoints** tab.
1. Find the endpoint for the Cloud Monitoring service. If it is not in the list, use:

   - for the Moscow region — `https://cloud.vk.ru/monitoring/query/v2`;
   - for the Kazakhstan region — `https://kz.cloud.vk.kz/monitoring/query/v2`.

1. {linkto(../../rest-api/case-keystone-token#rest-api-keystone-token)[text=Get]} the `X-Auth-Token` access token.

{/cut}

{note:info}
You can download the original specification in JSON format using this [link](assets/monitoring-api.json "download").
{/note}

![{swagger}](assets/monitoring-api.json)