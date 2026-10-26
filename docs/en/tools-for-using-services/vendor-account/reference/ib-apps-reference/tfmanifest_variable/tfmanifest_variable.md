
{include(/en/_includes/_translated_by_ai_en.md)}

Input variables for resource configuration are conventionally divided into special, external, and local.

[cols="2,5,2", options="header"]
|===
|Group
|Description
|Possible types

|Special
|Variables that allow using data received from the broker.

The following variables are supported:

* `instance_uuid` — the service deployment identifier. It is used in the description of most iVK CS provider resources.
* `email` — the email of the user who connected the service.

When such variables are declared in the manifest, their values will be obtained by Terraform automatically
|`string`

|External
|Variables that allow setting values of pricing options configured in the pricing plan configuration wizard.

The variable name must match the name of the pricing option YAML file.

In addition to declaring such a variable in the manifest, it must also be:

* Described as a pricing option in its YAML file.
* Specified in the pricing plan (the `plans/<PLAN_NAME>/plan.yaml` file).
* Specified in the pricing plan configuration wizard (the `plans/<PLAN_NAME>/display.yaml` file).

A default value can be set for an external variable. It will be applied if the external value could not be obtained
|`number`, `string`, `boolean`

|Local
|Variables used only in the manifest. The variable value is set when it is declared in the `default` argument
|Any types supported by Terraform
|===

{note:warn}

The variable type must be specified when the variable is declared in the `type` parameter.

{/note}

Example of declaring special variables:

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

Example of declaring external and local variables:

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

When describing input variables, you can use `locals` blocks. They allow computing variable values at the time of their declaration, including using the values of other declared variables. Example: [specifying a host name using a local variable](../../../manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_init#if-hosts-names-examples).