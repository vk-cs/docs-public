# {heading(ivkcs_agent_init resource)[id=ivkcs_agent_init]}

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
| ![](../../../../../../assets/no.svg "inline")

|
`hosts`
|List of host names for agent initialization
|list, list elements — string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/check.svg "inline")

|
`options`
|Agent initialization options
|set, list arguments — in the [table](#agent_init_options).
| ![](../../../../../../assets/no.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===

### {heading(Agent initialization options)[id=agent_init_options]}

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Default value

|
`memory_limit`
|
Limit of RAM used for the agent, MB
|
integer
|256
|===

{note:info}

Use the `options.memory_limit` option to limit the RAM for the agent.

{/note}

## Returned parameters

The `ivkcs_agent_init` resource returns the `agent` attribute in the format of a list of strings. The index in the list corresponds to the index of the host passed in the `hosts` argument. The value is a bash script. The bash script functions:

* Requests the agent from the configuration management service.
* Downloads the agent and installs it on the hosts.
* Issues access keys to the hosts for the configuration management service.

## Example of resource description

```hcl
resource "ivkcs_agent_init" "init" {
	uuid = "<UUID>"
	hosts = ["<LIST_OF_HOST_NAMES>"]
	options {
		memory_limit = 512
	}
}
```

Here:

* `<UUID>` — service instance identifier.
* `<LIST_OF_HOST_NAMES>` — list of host names on which monitoring will be performed. The host names must exactly match the VM names defined in your Terraform configuration (usually in the `vkcs_compute_instance` resource).

{include(../../../../../../_includes/_tf_hosts.md)}