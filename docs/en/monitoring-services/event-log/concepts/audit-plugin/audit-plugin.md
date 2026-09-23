# {heading(Data plane audit plugin)[id=event-log-audit-plugin]}

Sending data plane logs to the Cloud Audit service is enabled and configured using the `vkcloudaudit-fluent-bit-plugin` logging plugin. It works with the [Golang plugin interface](https://docs.fluentbit.io/manual/development/golang-output-plugins) provided by the [Fluent Bit](https://docs.fluentbit.io/manual) service.

Examples of event sources for the data plane:

- Kubernetes (Kubernetes auditing);
- PostgreSQL (pgAudit extension);
- Operating system (auditd service).

Event collection from some sources, such as Kubernetes, is already integrated into the audit service.
You can add any other sources by {linkto(../../instructions/connect-plugin#event-log-connect-plugin)[text=installing and configuring]} the plugin yourself.

## {heading(Plugin authorization parameters)[id=event-log-auth-parameters]}

[cols="1,1,2,2", options="header"]
|===
| Parameter
| Required
| Description
| Where to find

| `auth_type`
| ![](../../../../assets/check.svg "inline")
| Authentication type:

- `keystone`;
- `disabled`.

Default: `keystone`
|<!--- no ---!>

| `auth_url`
| ![](../../../../assets/check.svg "inline")
| Keystone service endpoint
| Auth URL parameter in the [{var(cloud)} management console](https://msk.cloud.vk.ru/app/any/project/keys)

| `auth_timeout`
| ![](../../../../assets/no.svg "inline")
| Maximum time the application waits for a response from the authentication service when validating the user's credentials.

Default: `5s`
|<!--- no ---!>

| `project_id`
| ![](../../../../assets/check.svg "inline")
| ID of the {var(cloud)} project where logs will be written
| Project ID parameter in the [{var(cloud)} management console](https://msk.cloud.vk.ru/app/any/project/keys).

Example: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`

Do not confuse it with a Project Name like `mcs1234567890`

| `user_id`
| ![](../../../../assets/no.svg "inline")
| User ID on whose behalf logs will be written
| <!--- no --->

| `user_name`
| ![](../../../../assets/no.svg "inline")
| Username on whose behalf logs will be written
| Username parameter in the [{var(cloud)} management console](https://msk.cloud.vk.ru/app/any/project/keys)

| `password`
| ![](../../../../assets/no.svg "inline")
| Password of the user on whose behalf logs will be written
| For `user_name`, use the password you use to sign in to the {var(cloud)} management console

| `key_file`
| ![](../../../../assets/no.svg "inline")
| JSON file that contains the `user_id` and `password` values
| <!--- no --->

|===

Allowed ways to specify user credentials:

- `user_id` and `password`;
- `key_file`;
- `user_name` and `password` (for example, your username and password for signing in to the {var(cloud)} management console).

## {heading(Plugin configuration parameters)[id=event-log-conf-parameters]}

[cols="1,1,3", options="header"]
|===
| Parameter
| Required
| Description

| `server_host`
| ![](../../../../assets/check.svg "inline")
| API endpoint for receiving audit data:

- `https://msk.cloud.vk.ru/audit/c2s` — for the Moscow region;
- `https://kz.cloud.vk.kz/audit/c2s` — for the Kazakhstan region

| `source_id`
| ![](../../../../assets/check.svg "inline")
| Audit event source ID (for example, `databases` for the Cloud Databases service). Set by the user

| `timeout`
| ![](../../../../assets/no.svg "inline")
| Maximum request timeout. Default: `5s`

| `idle_timeout`
| ![](../../../../assets/no.svg "inline")
| Time after which an inactive keepalive connection will be closed. Default: `1s`

| `max_conns`
| ![](../../../../assets/no.svg "inline")
| Maximum number of connections. Default: `512`

|===