# {heading(Input variables for resource configuration)[id=tf_manifest_variable]}

{include(/en/_includes/_translated_by_ai_en.md)}

Describe the input variables for resource configuration. Variables can be conditionally divided into the groups shown in {linkto(#tab_tf_variables)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_tf_variables]} — Terraform variables)[align=right;position=above;id=tab_tf_variables;number={const(numb_tab_tf_variables)}]}
[cols="2,5,2", options="header"]
|===
|Group
|Description
|Possible types

|Special
|
Variables that allow using data received from the broker.

The following variables are supported:

* `instance_uuid` — the service deployment identifier. Used in the description of most iVK CS provider resources.
* `email` — the email of the user who connected the service.

When such variables are declared in the manifest, their values will be obtained by Terraform automatically
|string

|External
|
Variables that allow setting values of tariff options configured in the tariff plan configuration wizard.

The variable name must match the name of the tariff option YAML file.

Besides declaring such a variable in the manifest, it must also be:

* Described as a tariff option in its YAML file.
* Specified in the tariff plan (file `plans/<PLAN_NAME>/plan.yaml`).
* Specified in the tariff plan configuration wizard (file `plans/<PLAN_NAME>/display.yaml`).

A default value can be set for an external variable. It will be applied if the external value cannot be obtained
|number, string, boolean

|Local
|
Variables used only in the manifest. Set the value in the `default` argument when declaring the variable
|Types supported by Terraform
|===
{/caption}

{note:warn}

When declaring a variable, specify the type in the `type` parameter.

{/note}

{caption(Example of declaring special variables)[align=left;position=above]}
```hcl

# Service deployment identifier
variable "instance_uuid" {
  type    = string
}

# User email
variable "email" {
  type    = string
}
```
{/caption}

{caption(Example of declaring external and local variables)[align=left;position=above]}
```hcl

# Name of the virtual network where the VM will be created
variable "sub_network" {
  type    = string
  default = "test-net"
}

# Number of CPUs for the VM
variable "flavor_vcpus" {
  type    = number
  default = 2
}
```
{/caption}

When describing input variables, you can use `locals` blocks. With them, you can define variables using computations, including computations based on other declared variables.