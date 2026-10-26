# {heading(Testing manifests with the deployment system)[id=ibservice_upload_deploysystemtest]}

{include(/en/_includes/_translated_by_ai_en.md)}

After locally testing the Terraform manifests and before uploading the service package to the store, it is recommended to test the `plans/<PLAN_NAME>/deployment/deploy.tf` manifests with the deployment system. This will make sure that all described resources can be created by the deployment system.

{note:warn}

Before testing with the deployment system, make sure that the OpenStack PID is added to the list of providers (for more details, see the section {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]}).

{/note}

The testing process will require:

* A key for API access. The key is displayed in the cloud platform management console on the project settings page (the tab with information about API access).
* The domain name of the cloud platform — `https://cloud.vk.ru`.

To test a Terraform manifest with the deployment system:

1. In the cloud platform management console, enable two-factor authentication (2FA) and API access (for more details, see the section [Managing 2FA](/en/access/iam/instructions/manage-2fa)).
1. Perform the API requests:

   1. Upload the manifest to the deployment system.
   1. Check the current configuration of the uploaded manifest.
   1. Create a service instance.
   1. Delete the service instance.

   The API request parameters are described in the following sections.

{note:info}

During creation, after creation, and after deletion of the service instance, check its state. If the service instance status is `failed`, view the error log (for more details, see the section {linkto(#deploysystemtest_log)[text=%text]}).

{/note}

## {heading(Uploading a Terraform manifest to the deployment system)[id=upload_terraform_manifest]}

To upload the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest to the deployment system, make a request with the parameters given in {linkto(#tab_request_params)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_request_params]} — Manifest upload request parameters)[align=right;position=above;id=tab_request_params;number={const(numb_tab_request_params)}]}
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
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Here:

* `<CLOUD_HOST>` — the domain name of the cloud platform.
* `<MANIFEST_NAME>` — the manifest name

|
Request body (`--data-binary`)
|
The contents of the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest.

If additional provider resources are required for testing, add them to the request body

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a manifest upload request)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data-binary "@deploy.tf"
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>" ^
--data-binary "@deploy.tf"
```

{/tab}

{/tabs}

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes]} — HTTP response codes)[align=right;position=above;id=tab_http_codes;number={const(numb_tab_http_codes)}]}
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
{/caption}

When sending a request with a manifest name that already exists in the deployment system, the configuration of that manifest will be updated.

Manifests are uploaded within a single user account.

All previously uploaded manifest configurations are stored in the deployment system to ensure correct Terraform operation. The service instance is deployed with the current manifest configuration, which can be viewed using the GET request `/hoe/config/<MANIFEST_NAME>` (for more details, see the section {linkto(#check_terraform_configuration)[text=%text]}).

## {heading(Checking the current Terraform manifest configuration)[id=check_terraform_configuration]}

To check the current Terraform manifest configuration stored in the deployment system, make a request with the parameters given in {linkto(#tab_check_terraform_configuration)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_check_terraform_configuration]} — Request parameters for checking the current manifest configuration)[align=right;position=above;id=tab_check_terraform_configuration;number={const(numb_tab_check_terraform_configuration)}]}
[cols="2,5", options="header"]
|===
|Parameter
|Value

|
Request method
|
`GET`

|
Request path
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

Here:

* `<CLOUD_HOST>` — the domain name of the cloud platform.
* `<MANIFEST_NAME>` — the manifest name

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a request to check the current manifest configuration)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes_after_check)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes_after_check]} — HTTP response codes)[align=right;position=above;id=tab_http_codes_after_check;number={const(numb_tab_http_codes_after_check)}]}
[cols="2,5", options="header"]
|===
|Code
|Description

|200
|
The request has been completed.

The response contains the current configuration of the specified Terraform manifest

|401
|
Authorization error

|404
|
Manifest not found

|500
|
Request execution error
|===
{/caption}

## {heading(Creating a service instance)[id=create_service_instance]}

To create a service instance, make a request with the parameters given in {linkto(#tab_create_service_instance)[text=table %number]}. The resources of the current Terraform manifest configuration will be created.

{caption(Table {counter(table)[id=numb_tab_create_service_instance]} — Service instance creation request parameters)[align=right;position=above;id=tab_create_service_instance;number={const(numb_tab_create_service_instance)}]}
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
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object`

Here `<CLOUD_HOST>` is the domain name of the cloud platform

|
`Content-Type`
|
`application/json`

|
Request body (`--data`)
|
Specify the following parameters:

* `uuid` — the service instance identifier generated using the UUID4 generator.
* `config` — the manifest name.
* `vars` — external input variables of the manifest. Setting values for these variables in the request body imitates user actions in the tariff plan configuration wizard.

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a service instance creation request)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <AUTH_TOKEN>' \
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
-H "x-auth-token: <AUTH_TOKEN>" ^
--data "{\"uuid\": \"675f6f08-XXXX-f02311f795d7\", \"config\": \"test_1.0\", \"vars\": {\"sub_network\": \"a793470c-XXXX-67af6c178c8e\", \"image_uuid\": \"163ff752-XXXX-b0001e3e65d3\", \"volume_type\": \"ceph-ssd\", \"flavor_uuid\": \"6e61564f-XXXX-08df5fd84514\"}}"
```

{/tab}

{/tabs}

Here:

* `sub_network` — the subnet ID.
* `image_uuid` — the service image ID.
* `volume_type` — the disk type.
* `flavor_uuid` — the VM flavor ID.

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes_after_create)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes_after_create]} — HTTP response codes)[align=right;position=above;id=tab_http_codes_after_create;number={const(numb_tab_http_codes_after_create)}]}
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
{/caption}

## {heading(Deleting a service instance)[id=delete_service_instance]}

To delete the service instance created as a result of executing the Terraform manifest, make a request with the parameters given in {linkto(#tab_delete_service_instance)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_delete_service_instance]} — Service instance deletion request parameters)[align=right;position=above;id=tab_delete_service_instance;number={const(numb_tab_delete_service_instance)}]}
[cols="2,5", options="header"]
|===
|Parameter
|Value

|
Request method
|
`DELETE`

|
Request path
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Here:

* `<CLOUD_HOST>` — the domain name of the cloud platform.
* `<OBJECT_UUID>` — the service instance deployment identifier. The value corresponds to the `uuid` parameter in the service instance deployment request

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a service instance deletion request)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl -v -X DELETE https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes_after_delete)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes_after_delete]} — HTTP response codes)[align=right;position=above;id=tab_http_codes_after_delete;number={const(numb_tab_http_codes_after_delete)}]}
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
{/caption}

## {heading(Checking the service instance state)[id=check_instance_status]}

To check the service instance state, make a request with the parameters given in {linkto(#tab_check_instance_status)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_check_instance_status]} — Service instance state check request parameters)[align=right;position=above;id=tab_check_instance_status;number={const(numb_tab_check_instance_status)}]}
[cols="2,5", options="header"]
|===
|Parameter
|Value

|
Request method
|
`GET`

|
Request path
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

Here:

* `<CLOUD_HOST>` — the domain name of the cloud platform.
* `<OBJECT_UUID>` — the service instance deployment identifier. The value corresponds to the `uuid` parameter in the service instance deployment request

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a service instance state check request)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes_status)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes_status]} — HTTP response codes)[align=right;position=above;id=tab_http_codes_status;number={const(numb_tab_http_codes_status)}]}
[cols="2,5", options="header"]
|===
|Code
|Description

|200
|
The request has been completed.

The response contains the service instance status (`status`). Possible statuses:

* `applying` — the manifest is being executed, resources are in the process of being created.
* `running` — the manifest has been executed, the service instance has been created.
* `failed` — the manifest has completed with an error, the service instance has not been created.
* `deleted` — the service instance has been deleted

|401
|
Authorization error

|404
|
Service instance identifier not found

|500
|
Request execution error
|===
{/caption}

{caption(Example of a response to a request made after service instance deletion)[align=left;position=above]}
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
{/caption}

Here:

* `uuid` — the service instance deployment identifier.
* `target_status` — the target status of the service instance (`deleted` or `running`).
* `vars` — the input variables of the manifest.
* `out` — the output parameters of the manifest.
* `status` — the current status of the service instance.
* `conf_name` — the name of the user who deployed the service.
* `conf_hash` — the configuration hash of the service instance.
* `pid` — the identifier of the project of the user who deployed the service (OpenStack PID).
* `create_at` — the date and time when the service instance was created.
* `update_at` — the date and time of the last service instance update by the deployment system.
* `full_deployed` — whether the service instance has been successfully deployed (for the `deleted` status the value is `false`).
* `attempts` — the number of retries performed when deploying the service instance.
* `max_attempts` — the maximum number of retries.

## {heading(Viewing service instance logs)[id=deploysystemtest_log]}

To view the service instance log, make a request with the parameters given in {linkto(#tab_log_request)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_log_request]} — Service instance log output request parameters)[align=right;position=above;id=tab_log_request;number={const(numb_tab_log_request)}]}
[cols="2,5", options="header"]
|===
|Parameter
|Value

|
Request method
|
`GET`

|
Request path
|
`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/logs/instance/<OBJECT_UUID>`

Here:

* `<CLOUD_HOST>` — the domain name of the cloud platform.
* `<OBJECT_UUID>` — the service instance deployment identifier. The value corresponds to the `uuid` parameter in the service instance deployment request

|
`x-auth-token`
|
`<AUTH_TOKEN>` — the key for API access
|===
{/caption}

{caption(Example of a service instance log output request)[align=left;position=above]}

{tabs}

{tab(Linux (bash))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```

{/tab}

{tab(Windows (cmd))}

```console
curl https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/logs/instance/675f6f08-XXXX-f02311f795d7 ^
-H "x-auth-token: <AUTH_TOKEN>"
```

{/tab}

{/tabs}

{/caption}

HTTP response codes are given in {linkto(#tab_http_codes_log)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_http_codes_log]} — HTTP response codes)[align=right;position=above;id=tab_http_codes_log;number={const(numb_tab_http_codes_log)}]}
[cols="2,5", options="header"]
|===
|Code
|Description

|200
|
The request has been completed.

The response to the request contains the service instance logs in the `message` parameter

|401
|
Authorization error

|404
|
Service instance identifier not found

|500
|
Request execution error
|===
{/caption}

{caption(Example of a response to the request)[align=left;position=above]}
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
{/caption}

## {heading(Viewing agent logs and results)[id=agent_log]}

To view the agent logs and results:

1. Connect to the VM where the agent is installed via a remote access protocol (for more details, see the section [Connecting to a VM](/en/computing/iaas/instructions/vm/vm-connect)) or using the VNC console in the cloud platform management console.

   {note:info}

   The name of the VM where the agent was installed is specified in the `ivkcs_agent_init` or `ivkcs_user_data` resource in the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest.

   {/note}
1. To view the logs, run the `journalctl -u sower` command.
1. To view the results, go to the `/etc/sower/result` directory.