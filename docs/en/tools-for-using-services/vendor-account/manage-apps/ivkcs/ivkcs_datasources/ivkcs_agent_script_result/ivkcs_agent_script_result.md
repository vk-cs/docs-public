# {heading(ivkcs_agent_script_result data source)[id=ivkcs_agent_script_result]}

{include(/en/_includes/_translated_by_ai_en.md)}

The arguments of the `ivkcs_agent_script_result` data source are provided in {linkto(#tab_source_args)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_source_args]} — Arguments of the ivkcs_agent_script_result data source)[align=right;position=above;id=tab_source_args;number={const(numb_tab_source_args)}]}
[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|
`uuid`
|
Service deployment identifier
|string
| ![](../../../../../../assets/check.svg "inline")

|
`host`
|
The name of the host where the script was executed. Corresponds to the name specified in the `hosts` argument of the `ivkcs_agent_exec` resource
|string
| ![](../../../../../../assets/check.svg "inline")

|
`group`
|
The name of the script group. Corresponds to the value of the `name` argument of the `ivkcs_agent_exec` resource
|string
| ![](../../../../../../assets/check.svg "inline")

|
`index`
|
The script index. Corresponds to the value of the `step.index` argument of the `ivkcs_agent_exec` resource
|integer
| ![](../../../../../../assets/check.svg "inline")
|===
{/caption}

The `ivkcs_agent_script_result` data source returns the attributes provided in {linkto(#tab_source_args1)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_source_args1]} — Attributes of the ivkcs_agent_script_result data source)[align=right;position=above;id=tab_source_args1;number={const(numb_tab_source_args1)}]}
[cols="2,5", options="header"]
|===
|Name
|Description

|
`result`
|The script execution result

|
`structured_result`
|The formatted result of the script execution
|===
{/caption}

{caption(Example of the `ivkcs_agent_script_result` data source)[align=left;position=above]}
```hcl
data "ivkcs_agent_script_result" "step_1_result" {
  uuid  = var.instance_uuid
  host  = local.hosts_names[0]
  group = ivkcs_agent_exec.start.name
  index = 1

  depends_on = [
    ivkcs_agent_exec.start
  ]
}
```
{/caption}