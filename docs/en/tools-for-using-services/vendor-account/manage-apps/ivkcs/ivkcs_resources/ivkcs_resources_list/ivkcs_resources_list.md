# {heading(List of resources)[id=ivkcs_resources_list]}

{include(/en/_includes/_translated_by_ai_en.md)}

The iVK CS provider resources are listed in {linkto(#tab_provider_resources)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_provider_resources]} — iVK CS provider resources)[align=right;position=above;id=tab_provider_resources;number={const(numb_tab_provider_resources)}]}
[cols="2,5", options="header"]
|===
|Name
|Description

|
`ivkcs_ssh_keypair`
|
Creating a key pair that is not stored in the cloud platform

|
`ivkcs_user_data`
|
Creating a cloud-config configuration to configure VMs during service instance deployment.

Agent initialization on hosts and pairing the agent with the configuration management service.

Used together with the `vkcs_compute_instance` resource of the VK CS provider

|
`ivkcs_agent_init`
|
Agent initialization on hosts and pairing the agent with the configuration management service.

{note:warn}

This resource is deprecated. In Terraform manifests, use the `ivkcs_user_data` resource.

{/note}

|
`ivkcs_agent_exec`
|
Running scripts during service deployment

|
`ivkcs_agent_check`
|
Monitoring the state of a service instance on hosts

|
`ivkcs_s3`
|
Creating S3 buckets

|
`ivkcs_dns`
|
Creating A records in the cloud platform DNS (fifth-level and higher domains)

|
`ivkcs_compute_instance_reboot`
|
Rebooting a host during service deployment
|===
{/caption}