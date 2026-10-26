# {heading(ivkcs_agent_check resource)[id=ivkcs_agent_check]}

{include(/en/_includes/_translated_by_ai_en.md)}

## Resource arguments

[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|
`uuid`
|Service instance identifier
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`hosts`
|List of host names
|list, list elements — string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

The resource specifies one or more methods for monitoring the state of service instances. The following monitoring methods are supported:

* Port availability check — described in the [port_health block](#port_health).
* Address availability check — described in the [http_health block](#http_health).
* Service instance availability check using scripts — described in the [script_health block](#script_health).

### {heading(port_health block)[id=port_health]}

Each port is described by a separate `port_health` block.

{cut(Arguments for the port_health block)}

[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|
`host`
|
Host IP address or DNS name
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`period`
|
Port availability check frequency. Example values:

* `1m`.
* `15s`.
* `1h`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`port`
|
Port to check
|integer
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

{/cut}

### {heading(http_health block)[id=http_health]}

Each address check is described by a separate `http_health` block.

{cut(Arguments for the http_health block)}

[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|
`protocol`
|
Request protocol. Possible values:

* `http`.
* `https`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`method`
|
Request method. Possible values:

* `GET`.
* `POST`.
* `PUT`.
* `DELETE`.
* `OPTIONS`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`host`
|
Host IP address or DNS name
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`path`
|
Request path (endpoint of the method)
|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`period`
|
Address availability check frequency. Example values:

* `1m`.
* `15s`.
* `1h`

|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`port`
|
Port to check
|integer
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`http_codes`
|
Expected response codes
|list, list elements — integer
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`url`
|
Full address including:

* Host IP address or DNS name.
* Port.
* Request path (endpoint of the method)

|string
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===

{note:warn}

If the `url` argument is specified, its value will take precedence over the values in the `host`, `path`, and `port` arguments.

{/note}

{/cut}

### {heading(script_health block)[id=script_health]}

Each script is described by a separate `script_health` block.

{cut(Arguments for the script_health block)}

[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation on value change

|
`type`
|
Script language. Possible values:

* `bash`.
* `python`

|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`options`
|
Script execution parameters
|
set, list arguments — in the table {linkto(../ivkcs_agent_exec/#tab_script_options)[text=Script options]}
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`script`
|
Script body
|
string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")
|===
{/cut}

## Returned parameters

The `ivkcs_agent_check` resource returns the `hash` attribute (string format), which contains the hash of the monitoring result to be passed to the configuration management service.

## Example of resource description

```hcl
resource "ivkcs_agent_check" "check1" {
    uuid = "<UUID>"
	hosts = ["<СПИСОК_ИМЕН_ХОСТОВ>"]

	http_health {
		protocol = "http"
		method = "GET"
		host = "127.0.0.1"
		path = "status"
		period = "1m"
		port = 11012
		http_codes = [200]
	}
}
```

Here:

* `<UUID>` — service instance identifier.
* `<СПИСОК_ИМЕН_ХОСТОВ>` — list of host names on which monitoring will be performed. Host names must exactly match the VM names defined in your Terraform configuration (usually in the `vkcs_compute_instance` resource).

{include(../../../../../../_includes/_tf_hosts.md)}