# {heading(The ivkcs_compute_instance_reboot resource)[id=ivkcs_compute_instance_reboot]}

{include(/en/_includes/_translated_by_ai_en.md)}

The argument of the `ivkcs_compute_instance_reboot` resource is given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — Argument of the ivkcs_compute_instance_reboot resource)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Resource recreation upon value change

|
`instance`
|
ID of the host that will be rebooted.

The ID is computed by the resource that creates the host (the `vkcs_compute_instance` resource of the VK CS provider)
|string
| ![](../../../../../../assets/check.svg "inline")
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

If the reboot occurs immediately after creating a VM, use a pause between creation and reboot. The pause will ensure that all processes occurring during VM creation are completed.

{caption(Example of the `ivkcs_compute_instance_reboot` resource with a pause)[align=left;position=above]}
```hcl

# Creating a pause
resource "time_sleep" "before_reboot" {
  create_duration = "30s"

  depends_on = [

    # Dependency on VM creation and disk attachment
    vkcs_compute_instance.compute,
    vkcs_compute_volume_attach.attached,
  ]
}

# VM reboot
resource "ivkcs_compute_instance_reboot" "reboot" {
  instance = vkcs_compute_instance.compute.id

  depends_on = [

    # Dependency on the pause
    time_sleep.before_reboot,
  ]
}

# Running scripts
resource "ivkcs_agent_exec" "start" {
  …
  depends_on = [

    # Dependency on VM reboot
    ivkcs_compute_instance_reboot.reboot,
  ]
  …
}
```
{/caption}