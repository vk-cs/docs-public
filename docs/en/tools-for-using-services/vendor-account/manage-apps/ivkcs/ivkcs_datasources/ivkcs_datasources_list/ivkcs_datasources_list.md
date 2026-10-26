# {heading(Data sources list)[id=ivkcs_datasources_list]}

{include(/en/_includes/_translated_by_ai_en.md)}

The iVK CS provider data sources are listed in {linkto(#tab_sources)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_sources]} — iVK CS data sources)[align=right;position=above;id=tab_sources;number={const(numb_tab_sources)}]}
[cols="2,4", options="header"]
|===
|Name
|Description

|
`ivkcs_agent_script_result`
|
Retrieves the formatted result of a script executed in the agent. Allows retrieving data during service deployment, passing it to Terraform, and using it in subsequent service deployment actions

|
`ivkcs_monitoring_user`
|
Integration with the [Cloud Monitoring](/en/monitoring-services/monitoring) service of the cloud platform
|===
{/caption}