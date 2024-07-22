Sending user application logs to the Cloud Logging service is enabled and configured via the `vkcloudlogs-fluent-bit-plugin` logging plugin.
It works with the [Golang plugin](https://docs.fluentbit.io/manual/development/golang-output-plugins) interface provided by [Fluent Bit](https://docs.fluentbit.io/manual).

## {heading(Plugin authorization parameters)[id=auth_parameters]}

| Parameter | Required? | Description | Where to find |
| -------- | ------------- | -------- | --------- |
| `auth_url` | Yes | The Keystone service endpoint | The Auth URL parameter in your VK Cloud [management console](https://msk.cloud.vk.com/app/en/any/project/keys) |
| `project_id` | Yes | An identifier of a VK Cloud project to which logs will be recorded | The Project ID parameter in your VK Cloud [management console](https://msk.cloud.vk.com/app/en/any/project/keys).</br>Example: `a1b2c3d4e5f6g7h8i9a1b2c3d4e5f6g7`.</br>Do not confuse with Project Name of the form `mcs1234567890` |
| `user_id` | No | An identifier of a user on whose behalf logs will be recorded | Created in your VK Cloud management console on the [User credentials generation](https://msk.cloud.vk.com/app/en/services/monitoring/logging/settings) tab |
| `user_name` | No | A login of a user on whose behalf logs will be recorded | The Username parameter in your VK Cloud [management console](https://msk.cloud.vk.com/app/en/any/project/keys) |
| `password` | No | The password of the user specified in `user_id` or `user_name` | For `user_id`, the password is created in your VK Cloud management console on the [User credentials generation](https://msk.cloud.vk.com/app/en/services/monitoring/logging/settings) tab.</br> For `user_name`, the password of your VK Cloud management console is used |
| `key_file` | No | A name of a JSON file that contains the `user_id` and `password` values |  |
| `internal` | No | The parameter indicating whether the recording of technical service logs will be enabled:</br> - `true` — enabled</br> - `false` — disabled</br>By default: `true` |  |

Acceptable options for specifying user credentials:

- `user_id` and `password`;
- `key_file`;
- `user_name` and `password` (for example, your username and password to sign in to your VK Cloud management console).

<warn>

Accounts generated for the Cloud Logging service have only the right to record logs. Therefore, authorization with their use is recommended as more secure.

</warn>

## Plugin configuration parameters

| Parameter | Required? | Description |
| -------- | ------------- | -------- |
| `server_host_port` | Yes | The Cloud Logging service address (`cloudlogs.mcs.mail.ru:443`) |
| `service_id` | No | A service ID in the logging system:</br> - `databases` — the Cloud Databases service</br> - `containers` — the Cloud Containers service</br> - `bigdata` — the Cloud Big Data service</br> - `vdi` — the Cloud Desktop service</br>If not specified, the `default` value will be assigned.</br></br>If necessary, create your own IDs through [technical support](/en/contacts) or by yourself on the [Other resources](https://msk.cloud.vk.com/app/en/services/monitoring/logging/settings) tab in the settings of the  **Monitoring → Logging** section |
| `group_id` | No | A log group identifier. By default: a [Tag](https://docs.fluentbit.io/manual/concepts/key-concepts#tag) parameter value assigned to an event in Fluent Bit |
| `group_id_key` | No | A name of a parameter containing the log group identifier. Used if the `group_id` parameter is not specified |
| `stream_id` | No | A log source identifier, for example: an instance ID (`instance_id`) or a VM ID (`vm_id`). By default: empty |
| `stream_id_key` | No | A name of a parameter containing the log source identifier. Used if the `stream_id` parameter is not specified |
| `message_key` | No | A name of a parameter containing a message that will be added to each log entry. By default: `message` |
| `level_key` | No | A name of a parameter containing a logging level value. By default: `level` |
| `default_level` | No | The logging level value. Used if there is no parameter with the name specified in `level_key`. By default: `debug` |
| `default_payload` | No | A JSON string containing key/value pairs that will be added to the `payload` field of every log entry.</br>Example: `{"tag": "example", "case": 3}`</br>By default: an empty string |
| `tls_on` | No | The parameter indicating whether TLS is enabled for the `server_host_port` address:</br> - `true` — enabled</br> - `false` — disabled</br>By default: `true` |
| `tls_verify` | No | The parameter indicating whether the TLS certificate verification is enabled for the `server_host_port` address:</br> - `true` — enabled</br> - `false` — disabled</br>By default: `true` |

Examples of setting up the plugin using its authorization and configuration parameters are given in the [Plugin installation](../../service-management/connect-plugin) и [Managing the logging agent](../../service-management/manage-vkcloudlogs-plugin#configure_agent) sections.
