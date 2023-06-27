The activity log stores the history of operations performed by VK Cloud components. The actions of the following components are saved (specified in the format for API requests):

- `nova` — controller of computing resources.
- `cinder` — working with VM disks.
- `neutron` — management of cloud virtual networks.
- `glance` — storing and working with images.
- `octavia` — managing load balancers.
- `dbaas` — creating and managing DB instances.
- `magnum` — orchestration of K8s containers.
- `iam` — managing users in the project.

Log data can be useful both for internal analysis of incidents and when contacting [technical support](/en/contacts/).

## Viewing log

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
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
1. [Find out](https://mcs.mail.ru/app/project/endpoints) the address of the `Audit` endpoint.
1. Run the request:

   ```bash
   curl -i -X GET "<Audit endpoint>/logs" -H "X-Auth-Token: <token>"
   ```

   Additional parameters can be specified in the request (header):

   | Parameter | Format | Description |
   | --- | --- | --- |
   | `from`   | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | The beginning of the time range |
   | `to`     | [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) | End of time range |
   | `source` | string  | The source component of the operation |
   | `marker` | string  | The token for requesting the next page, previously returned by the API. TTL of markers — 1 hour |
   | `limit`  | integer | The number of records to return. If omitted, returns 100 records |

<details>
    <summary>Response example</summary>

```json
{
    "logs": [{
            "action": "instance-update",
            "event_id": "b34bfd59-3f5b-4352-XXXX-28969024ce20",
            "method": "PATCH",
            "request_body": "{\"instance\":{\"datastore_version\":\"14\"}}",
            "request_id": "req-ed386938-6298-XXXX-b5e6-b804d6fe294a",
            "response_body": "",
            "source": "trove",
            "success": "yes",
            "timestamp": "2023-05-17T08:18:04Z",
            "uri": "/v1.0/b5b7ffd4ef0547e5b222f44555dfXXXX/instances/2303fd6c-79cc-XXXX-a574-ddcfac9ec104",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "instance-update",
            "event_id": "35d855ec-eaf6-4f5c-XXXX-5daf020985c5",
            "method": "PATCH",
            "request_body": "{\"instance\":{\"datastore_version\":\"13\"}}",
            "request_id": "req-958cad92-5cd9-459c-XXXX-66b0d7a92465",
            "response_body": "",
            "source": "trove",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:40Z",
            "uri": "/v1.0/b5b7ffd4ef0547e5b222f44555dfXXXX/instances/2303fd6c-79cc-XXXX-a574-ddcfac9ec104",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-security-group",
            "event_id": "1c1b2bd5-5ae2-454c-XXXX-2d79ac98b107",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-5f7085cf-a509-4792-XXXX-c6b07c4abf99",
            "response_body": "",
            "source": "neutron",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:12Z",
            "uri": "/v2.0/security-groups/5042bd04-23e3-XXXX-9ae8-515cb9e57cb3",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-volume",
            "event_id": "983c2077-08f2-472d-XXXX-7d7e2f1a991c",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-6c0f9e11-0267-40a8-XXXX-cd43443afb79",
            "response_body": "",
            "source": "cinder",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:06Z",
            "uri": "/v2/b5b7ffd4ef0547e5b222f44555dfXXXX/volumes/28b6a795-8467-468e-XXXX-60d2f21d96a4",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }, {
            "action": "delete-volume",
            "event_id": "722b6196-77de-4c95-XXXX-357614133727",
            "method": "DELETE",
            "request_body": "<BINARY_DATA>",
            "request_id": "req-2475b277-5977-XXXX-a31e-323a14a1d2a2",
            "response_body": "",
            "source": "cinder",
            "success": "yes",
            "timestamp": "2023-05-17T07:02:04Z",
            "uri": "/v2/b5b7ffd4ef0547e5b222f44555dfXXXX/volumes/f9f2f6d3-f141-4489-XXXX-88406bd9a8ab",
            "user_email": "examle@example.ex",
            "user_id": "d98c90595998426f9c69746f02a2XXXX"
        }
    ],
    "marker": "eyJ0bSI6MCwib2ZzIjo1LCJwaWQiOiJiNWI3ZmZkNGVmMDU0N2U1YjIyMmY0NDU1NWRmOGY2XXXX"
}
```

</details>

</tabpanel>
</tabs>

Information is provided for each action:

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

## Downloading the action log

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. Select **Action logger** from the drop-down list.
1. Click the **Download report** button.

The generated report will be uploaded with the extension `.xlsx`.

</tabpanel>
</tabs>
