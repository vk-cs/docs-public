The Activity Log section is for monitoring and installing changes. To go to the section, at the top of the control panel, click on the username and select "Activity Log".

The page displays the history of user actions working with the project. Now the history of actions is recorded by 6 components of the VK Cloud cloud:

1. Nova is a controller of computing resources.
2. Cinder - a component responsible for working with disks.
3. Karbor - a component for data protection, provides backup.
4. Neutron is a component that implements virtual networks in the cloud.
5. Glance is a component that is responsible for storing and working with images.
6. Octavia is a component that manages load balancers.

By default, the page displays user activity for the last month. If you are interested in a different period, specify a new time range and click "Generate another request". Then click "Show Report".

The generated report can be downloaded in xls format. To do this, click "Download report" and it will automatically be saved on your computer.

## API

To automatically retrieve activity log entries, use the API request:

```http
curl -i -X ​​GET "[https://infra.mail.ru](https://infra.mail.ru/):{port}/v1/{project_id}/logs?source=nova" -H " X-Auth-Token: {auth_token}"
```

You can see the current endpoint address on the "Project Settings" -> "API Endpoints" page.

| Request parameters | Values ​​| Description |
| ----------------- | -------- | -------------------------------------------------- --------------------------------- |
| From | RFC3339 | The start of the time range. |
| To | RFC3339 | End of time range. |
| source | string | Event source (component). |
| marker | string | The token for requesting the next page, previously returned by the API. TTL markers - 1 hour. |
| limit | Integer | The number of records to return. The default is 1000. |

Answer:

```yaml
{
   "logs": [
      {
         "action":"create-floating-ip",
         "event_id":"9840e233-6717-44d3-af7d-7a68837ee893",
         "method":"POST",
         "request_body":"{}",
         "request_id":"req-6bee7f11-b233-430a-9c55-f476be373b23",
         "response_body":"{}",
         "source":"neutron",
         "success":"yes",
         "timestamp":"2021-07-16T13:13:20Z",
         "uri":"/v2.0/floatingips",
         "user_email":"example@mcs.mail.ru",
         "user_id":"d06lc1dd59bc22c4bc15d1de98d28119"
      },
      {
         "action":"vm-action",
         "event_id":"7259205b-7u4e-4078-9ffc-zf15d2bd1a8f",
         "method":"POST",
         "request_body":"{}",
         "request_id":"req-8449b158-19bb-41b1-b0b4-e3522b9119f4",
         "response_body":"{}",
         "source":"new",
         "success":"yes",
         "timestamp":"2021-07-14T21:52:20Z",
         "uri":"/v2.1/servers/912gd12d9gd912/action",
         "user_email":"example@mcs.mail.ru",
         "user_id":"d06lc1dd59bc22c4bc15d1de98d28119"
      }
  ]
}
```
