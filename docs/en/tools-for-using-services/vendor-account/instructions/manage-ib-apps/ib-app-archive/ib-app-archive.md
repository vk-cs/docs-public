# {heading(Archiving an image-based application)[id=archive]}

{include(/en/_includes/_translated_by_ai_en.md)}

A specific revision of an image-based application located in the test namespace is moved to the archive.

A service revision moved to the archive will not be displayed in the Marketplace catalog.

Service instances created before the service revision was moved to the archive remain available to the user, but they cannot be updated (the tariff plan or options cannot be changed).

To move a service revision to the archive:

{tabs}

{tab(Vendor Dashboard)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} personal dashboard.
1. In the **App Store** section, click the **Go to Vendor Dashboard** button.
1. Go to the **Service Management** tab.
1. Select the desired service from the list.
1. Click ![ ](/ru/assets/more-icon.svg "inline") for the desired revision and select **Archive**.
1. Confirm the operation by clicking the **Archive** button.

The selected revision will show the `Archive` status in the list.

{/tab}

{tab(Infra API)}

Make a request with the parameters{ifdef(public)}:{/ifdef}{ifndef(public)} given in {linkto(#tab_service_archiving)[text=table %number]}.{/ifndef}

{ifndef(public)}
{caption(Table {counter(table)[id=numb_tab_service_archiving]} — Service archiving request parameters)[align=right;position=above;id=tab_service_archiving;number={const(numb_tab_service_archiving)}]}
{/ifndef}
[cols="2,5", options="header"]
|===
|Parameter
|Value

|
Request method
|
`POST`

|
Request path
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/product/archive`

Here `<CLOUD_HOST>` is the domain name of the cloud platform `https://cloud.vk.ru`

|
`Content-Type`
|
`application/json`

|
Request body (`--data`)
|
A list of services is passed in the request body.

For each service, specify the following parameters:

* `id` — the service ID in UUID4 format.
* `revision` — the service revision

|
`x-service-token`
|
`<SERVICE_TOKEN>` — the service key
|===
{ifndef(public)}
{/caption}
{/ifndef}

Example of a request to archive a service:

```console
$ curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product/archive \
-H "Content-Type: application/json" \
-H "x-service-token: $token" \
--data '{
  "services": [
    {
      "id": "b27ee400-b045-43eb-8a7d-db48c280ba16",
      "revision": "v.1.1"
    }
  ]
}'
```

HTTP response codes{ifdef(public)}:{/ifdef}{ifndef(public)} are given in {linkto(#tab_http_response_codes1)[text=table %number]}.{/ifndef}

{ifndef(public)}
{caption(Table {counter(table)[id=numb_tab_http_response_codes1]} — HTTP response codes)[align=right;position=above;id=tab_http_response_codes1;number={const(numb_tab_http_response_codes1)}]}
{/ifndef}
[cols="2,5", options="header"]
|===
|Code
|Description

|204
|The service has been moved to the archive

|400, 500
|Request execution error

|401
|Authorization error

|404
|Service not found
|===
{ifndef(public)}
{/caption}
{/ifndef}

{/tab}

{/tabs}