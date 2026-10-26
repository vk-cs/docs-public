Below are the API methods for testing a Terraform manifest with the deployment system.

## {heading(Uploading a Terraform manifest to the deployment system)[id=upload_terraform_manifest]}

{include(/en/_includes/_translated_by_ai_en.md)}

The request uploads a Terraform manifest to the deployment system.

Parameters of the request to upload the manifest `plans/<PLAN_NAME>/deployment/deploy.tf`:

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`POST`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Where:

* `<VK_CLOUD_HOST>` — domain name of the VK Cloud platform (`https://cloud.vk.ru`).
* `<MANIFEST_NAME>` — name of the manifest in the deployment system

|Request body (`--data-binary`)
|Contents of the manifest `plans/<PLAN_NAME>/deployment/deploy.tf`.

If additional provider resources are required for testing, they must be added to the request body

|`x-auth-token`
|`<ACCESS_TOKEN>` — API access token
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ACCESS_TOKEN>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ACCESS_TOKEN>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|201
|The manifest has been uploaded or updated

|400, 500
|Request execution error

|401
|Authorization error
|===

When a request is sent with a manifest name that already exists in the deployment system, the configuration of that manifest will be updated. All previously uploaded configurations of the manifest will be preserved in the deployment system to ensure correct Terraform operation.

## {heading(Checking the current configuration of the Terraform manifest)[id=check_terraform_configuration]}

The request returns the current configuration of the Terraform manifest specified in the request.

Request parameters:

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`GET`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Where:

* `<VK_CLOUD_HOST>` — domain name of the VK Cloud platform (`https://cloud.vk.ru`).
* `<MANIFEST_NAME>` — name of the manifest in the deployment system

|`x-auth-token`
|`<ACCESS_TOKEN>` — key for API access
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <ACCESS_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <ACCESS_TOKEN>"
```

{/tab}

{/tabs}

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|200
|The request has been completed.

The response to the request contains the current configuration of the specified Terraform manifest

|401
|Authorization error

|404
|Manifest not found

|500
|Request execution error
|===

## {heading(Creating a service instance)[id=create_service_instance]}

The request creates resources according to the current configuration of the Terraform manifest.

Parameters of the request to create a service instance:

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`POST`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object`

Where `<VK_CLOUD_HOST>` is the domain name of the VK Cloud platform (`https://cloud.vk.ru`)

|`Content-Type`
|`application/json`

|Request body (`--data`)

|The following parameters must be specified:

* `uuid` — service instance identifier generated using the UUID4 generator.
* `config` — name of the manifest in the deployment system.
* `vars` — external input variables of the manifest. Setting values for these variables in the request body simulates user actions in the tariff plan configuration wizard

|`x-auth-token`
|`<ACCESS_TOKEN>` — key for API access
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <ACCESS_TOKEN>' \
--data '{
  "uuid": "675f6f08-XXXX-f02311f795d7",
  "config": "test_1.0",
  "vars": {
    "sub_network": "a793470c-XXXX-67af6c178c8e",
    "image_uuid": "163ff752-XXXX-b0001e3e65d3",
    "volume_type": "ceph-ssd",
    "flavor_uuid": "6e61564f-XXXX-08df5fd84514"
    }
  }'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object ^
-H "Content-Type: application/json" ^
-H "x-auth-token: <ACCESS_TOKEN>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Where:

* `sub_network` — ID of the subnet.
* `image_uuid` — ID of the service image.
* `volume_type` — disk type.
* `flavor_uuid` — ID of the VM configuration template.

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|201
|The service instance has been created

|400, 500
|Request execution error

|401
|Authorization error
|===

## {heading(Deleting a service instance)[id=delete_service_instance]}

The request deletes the service instance created as a result of executing the Terraform manifest

Request parameters:

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`DELETE`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Where:

* `<VK_CLOUD_HOST>` — domain name of the VK Cloud platform (`https://cloud.vk.ru`).
* `<OBJECT_UUID>` — identifier of the service instance deployment. The value corresponds to the `uuid` parameter in the request to [create a service instance](#create_service_instance)

|`x-auth-token`
|`<ACCESS_TOKEN>` — key for API access
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ACCESS_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ACCESS_TOKEN>"
```

{/tab}

{/tabs}

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|201
|The service instance has been deleted

|400, 500
|Request execution error

|401
|Authorization error

|404
|Manifest not found
|===

## {heading(Checking the service instance status)[id=check_instance_status]}

The request returns the status of the service instance.

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`GET`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Where:

* `<VK_CLOUD_HOST>` — domain name of the VK Cloud platform (`https://cloud.vk.ru`).
* `<OBJECT_UUID>` — identifier of the service instance deployment. The value corresponds to the `uuid` parameter in the request to [create a service instance](#create_service_instance)

|`x-auth-token`
|`<ACCESS_TOKEN>` — key for API access
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ACCESS_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ACCESS_TOKEN>"
```

{/tab}

{/tabs}

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|200
|The request has been completed.

The response to the request contains the status of the service instance (`status`). Possible statuses:

* `applying` — the manifest is being executed, resources are being created.
* `running` — the manifest has been executed, the service instance has been created.
* `failed` — the manifest has completed with an error, the service instance has not been created.
* `deleted` — the service instance has been deleted

|401
|Authorization error

|404
|Service instance identifier not found

|500
|Request execution error
|===

Example of a response to a request made after the service instance was deleted:

```yaml
{
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "target_status": "deleted",
    "vars": {},
    "out": "{}",
    "status": "deleted",
    "conf_name": "user@vk.team",
    "conf_hash": "75587baeXXXX",
    "pid": "b66dde3dXXXX",
    "create_at": "2023-04-26T13:57:54.849565Z",
    "update_at": "2023-04-26T14:02:42.667399Z",
    "full_deployed": false,
    "attempts": 0,
    "max_attempts": 15
}
```

Where:

* `uuid` — identifier of the service instance deployment.
* `target_status` — target status of the service instance (`deleted` or `running`).
* `vars` — input variables of the manifest.
* `out` — output parameters of the manifest.
* `status` — current status of the service instance.
* `conf_name` — name of the user who deployed the service.
* `conf_hash` — hash of the service instance configuration.
* `pid` — identifier of the project of the user who deployed the service (Project ID).
* `create_at` — date and time when the service instance was created.
* `update_at` — date and time of the last update of the service instance by the deployment system.
* `full_deployed` — whether the service instance was deployed successfully (for the `deleted` status, the value is `false`).
* `attempts` — number of retry attempts made when deploying the service instance.
* `max_attempts` — maximum number of retry attempts.

## {heading(Viewing service instance logs)[id=deploysystemtest_log]}

The request returns the logs of the service instance.

Request parameters:

[cols="2,5", options="header"]
|===
|Parameter
|Value

|Request method
|`GET`

|Request path
|`https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/logs/instance/<OBJECT_UUID>`

Where:

* `<VK_CLOUD_HOST>` — domain name of the VK Cloud platform (`https://cloud.vk.ru`).
* `<OBJECT_UUID>` — identifier of the service instance deployment. The value corresponds to the `uuid` parameter in the request to [create a service instance](#create_service_instance)

|`x-auth-token`
|`<ACCESS_TOKEN>` — key for API access
|===

Example request:

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <ACCESS_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <ACCESS_TOKEN>"
```

{/tab}

{/tabs}

HTTP response codes:

[cols="2,5", options="header"]
|===
|Code
|Description

|200
|The request has been completed.

The response to the request contains the service instance logs in the `message` parameter

|401
|Authorization error

|404
|Service instance identifier not found

|500
|Request execution error
|===

Example response:

```yaml
[
  {
    "message": " Apply complete! Resources: 1 added, 0 changed, 0 destroyed. ",
    "src": "terraform",
    "level": "debug",
    "created_at": "2024-05-30T08:32:24Z",
    "uuid": "675f6f08-XXXX-f02311f795d7",
    "broker_id": ""
  }
]
```