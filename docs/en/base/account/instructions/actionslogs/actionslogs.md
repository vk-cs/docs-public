The activity log stores the history of operations performed by VK Cloud components. The actions of the following components are saved (specified in the format for API requests):

- `nova` — controller of computing resources.
- `cinder` — working with VM disks.
- `neutron` — management of cloud virtual networks.
- `glance` — storing and working with images.
- `octavia` — managing load balancers.
- `dbaas` — creating and managing DB instances.
- `magnum` — orchestration of K8s containers.
- `iam` — managing users in the project (only available when contacting [technical support](/en/contacts/)).

Log data can be useful both for internal analysis of incidents and when contacting [technical support](/en/contacts/).

## Downloading the action log

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. Click on the user's name in the header of the page.
1. Select **Action logger** from the drop-down list.
1. Click the **Download report** button.

The generated report will be uploaded with the extension `.xlsx`.

</tabpanel>
</tabs>

## Viewing log

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. Click on the user's name in the header of the page.
1. Select **Action logger** from the drop-down list.
1. (Optional) Specify the time range:

   1. Click the **Generate another request**.
   1. In the window that opens, select the target range manually or using the calendar.
   1. Click the **Show logs** button.

To open detailed information about an individual record, click on the icon ![Info](./assets/info-icon.svg "inline") to the right of the entry.

</tabpanel>
<tabpanel>

1. [Enable](/en/base/account/instructions/account-manage/manage-2fa) two-factor authentication (2FA) for your account.
1. [Get](/en/additionals/cases/case-keystone-token) the `X-Auth-Token`.
1. [Find out](https://msk.cloud.vk.com/app/en/project/endpoints) the address of the `Audit` endpoint.
1. Run the request:

   ```bash
   curl -X GET "<Audit endpoint>/logs" -H "X-Auth-Token: <token>"
   ```

   More information about formulating a request in the section [Examples of API requests to the action log](../actionslogs#examples_of_api_requests_to_the_action_log).

   Additional parameters can be specified in the request (header):

   | Parameter | Format | Description |
   | --- | --- | --- |
   | `from`   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | The beginning of the time range |
   | `to`     | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | End of time range |
   | `source` | string  | The source component of the operation |
   | `marker` | string  | The token for requesting the next page, previously returned by the API. TTL of markers — 1 hour |
   | `limit`  | integer | The number of records to return. If omitted, returns 100 records |

</tabpanel>
</tabs>

Each action log record provides the information:

- `event_id` — ID of the operation.
- `user_email` — the mail of the user who performed the operation.
- `timestamp` — date and time of the operation.
- `source` — the component is the source of the operation.
- `action` — a brief description of the operation.
- `success` — a sign of successful completion of the operation.
- `method` — REST method of the performed operation.
- `uri` — the path where the request was executed.
- `request_body` — request body (if any).
- `response_body` — response body (if any).

## Examples of API requests to the action log

To split the output of records to the console or file into lines, the requests use [the jq utility](/en/manage/tools-for-using-services/rest-api/install-jq).

<details>
    <summary>Retrieving the latest log records</summary>

To get the last 2 records from the action log of the Magnum component, run the request:

```bash
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=magnum&\
limit=2&\
from=&\
to=" \
-H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXX" \
-H "Content-Type: application/json" | jq
```

Response example:

```json
{
  "logs": [
    {
      "action": "unknown",
      "event_id": "4f6ed6e5-XXXX-dcc2279ba39d",
      "method": "DELETE",
      "request_body": "<BINARY_DATA>",
      "request_id": "req-05134dd5-XXXX-18b29ea5552e",
      "response_body": "<BINARY_DATA>",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:15:11Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    },
    {
      "action": "unknown",
      "event_id": "00a5def3-XXXX-f0884f24798b",
      "method": "PATCH",
      "request_body": "{\"delta\":-1}",
      "request_id": "req-f697a08b-XXXX-e59c66306dd1",
      "response_body": "{\"uuid\": \"31a092d7-XXXX\"}",
      "source": "magnum",
      "success": "yes",
      "timestamp": "2023-11-20T09:08:18Z",
      "uri": "/infra/container/v1/nodegroups/XXXX-4eb4e8ec5de9/actions/scale",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
      "user_email": "XXXX@vk.team",
      "user_id": "d98c90595998426f9c69746f02aXXXX"
    }
  ],
  "marker": "eyJ0bSI6MCwib2ZzIjo1LCJzcmMiOiJtYWdudW0iLCJXXXX"
}
```

</details>

<details>
    <summary>Retrieving log records for a given period</summary>

To get the last 2 records from the action log of the Nova component for a given period, run the request:

```bash
curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
source=nova&\
limit=2&\
from=2023-10-15T10:00:00.000Z&\
to=2023-11-15T16:43:00.477Z" \
-H "X-Auth-Token: gAAAAABlXEVTelmi_XXXX" \
-H "Content-Type: application/json" | jq
```

Response example:

```json
{
  "logs": [
    {
      "action": "create-vm",
      "event_id": "a2d05902-XXXX-60bce13de1f7",
      "method": "POST",
      "request_body": "{\"server\":{\"name\":\"BY-CentOS_prometheus\",\"key_name\":\"ADH-clusterXXXX\",XXXX}}",
      "request_id": "req-1d76a3f3-XXXX-b695d066e606",
      "response_body": "{\"server\": {\"security_groups\": [{\"name\": \"71d90a92-XXXX\"}, {\"name\": \"XXXX-aecb77b43bec\"}], XXXX}}",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T12:16:26Z",
      "uri": "/v2.1/servers",
      "user_agent": "axios/1.4.0",
      "user_email": "XXXX@vk.team",
      "user_id": "5f48556ef89444dbab8fa82669dXXXX"
    },
    {
      "action": "vm-action",
      "event_id": "fc98d3d7-XXXX-c2c5fd8fe619",
      "method": "POST",
      "request_body": "{\"addFloatingIp\":{\"address\":\"XXXX\"}}",
      "request_id": "req-f358678d-XXXX-311861a4ff77",
      "response_body": "",
      "source": "nova",
      "success": "yes",
      "timestamp": "2023-11-15T09:43:41Z",
      "uri": "/v2.1/servers/c6be363f-f56c-XXXX/action",
      "user_agent": "HashiCorp Terraform/1.4.0-dev XXXX gophercloud/2.0.0",
      "user_id": "649a35d97fc64452b019a0809dXXXX"
    }
  ],
  "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjo1LCJXXXX"
} 
```

</details>

<details>
    <summary>Using the marker parameter</summary>

Using the `marker` parameter, a large request for log records can be divided into several partial requests. Action log records are arranged in reverse order of time, with the most recent at the beginning of the log. So the first partial request will return a bunch of the most recent records, the next one will return a bunch of earlier records, and so on.

To output all log records of the Nova component for a given period into files in portions of 10 records per file:

1. Request output of 10 recent log records for the specified period to the `nova_part1.log` file:

   ```bash
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXXX" \
   -H "Content-Type: application/json" | jq > nova_part1.log
   ```

2. Extract the value of the `marker` parameter from the `nova_part1.log` file:

   ```bash
   cat nova_part1.log | grep marker
   ```

   Response example:

   ```json
   "marker": "eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX"
   ```

3. Request output of 10 earlier log records to the `nova_part2.log` file using the `marker` parameter value:

   ```bash
   curl -X GET "https://mcs.mail.ru/auditlogs/v1/b5b7ffd4efXXXX/logs?\
   source=nova&\
   marker=eyJ0bSI6MTY5NzM2NDAwMCwib2ZzIjoxMCwidG8iOjE3MDAwNjY1ODAsXXXX&\
   limit=10&\
   from=2023-10-15T10:00:00.000Z&\
   to=2023-11-15T16:43:00.477Z" \
   -H "X-Auth-Token: gAAAAABlXDFc8RTqKryFlXXXX" \
   -H "Content-Type: application/json" | jq > nova_part2.log
   ```

4. Repeat the previous request, changing only the file name (for example: `nova_part3.log`, `nova_part4.log`, ...), until you get all the log records for the specified period.

</details>
