{includetag(service.yaml-common-param)}
[cols="2,4,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`id`
|UUID4 service identifier (ID), generated using a UUID4 generator
|string (UUID4)
| ![](/ru/assets/check.svg "inline")

|`revision`
|Service revision. The combination of the revision and the service ID determines its uniqueness in Marketplace. The remaining parameters describe the characteristics of a specific service revision
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")

|`name`
|Service name
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")

|`short_description`
|A brief description of the service that will be displayed on its card:

* in the Marketplace catalog;
* on the **Service description** tab on the service page.

The full description of the service is contained in the [full_description.md file](/ru/tools-for-using-services/vendor-account/reference/ib-apps-full-description)
|string, up to 120 characters
| ![](/ru/assets/check.svg "inline")

|`singleton`
|Determines whether there is a limit of one service instance per cloud platform project
|boolean
| ![](/en/assets/no.svg "inline")

|`auto_bind`
|Determines whether a service binding should be created automatically after the service is deployed
|boolean
| ![](/en/assets/no.svg "inline")

|`icon`
|The name of the service icon file located in the `images` directory of the [service package](../../../instructions/manage-ib-apps/ib-add#service_pack_structure)
|string, up to 512 characters
| ![](/ru/assets/check.svg "inline")

|`help`
|Service documentation URL
|string, up to 512 characters
| ![](/ru/assets/check.svg "inline")

|`bindable`
|Determines whether service bindings can be created for this service. The value must be `true`
|boolean
| ![](/ru/assets/check.svg "inline")

|`plan_updateable`
|Determines whether the user can switch from one tariff plan to another without deleting the service.

The parameter value applies to all plans of the service.

For image-based applications, the value must be `false`
|boolean
| ![](/ru/assets/check.svg "inline")

|`deactivatable`
|Determines whether the use of the service can be temporarily suspended
|boolean
| ![](/ru/assets/check.svg "inline")

|`bindings_retrievable`
|Determines whether the creation of a service binding should be retried for a certain period of time if the previous attempt failed
|boolean
| ![](/ru/assets/check.svg "inline")

|`instances_retrievable`
|Determines whether the creation of a service instance should be retried for a certain period of time if the previous attempt failed
|boolean
| ![](/ru/assets/check.svg "inline")

|`plans`
|Contains the [names of the tariff plans](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/ib-apps-param#ib-apps-param-service-plans) of the application
|Array
| ![](/ru/assets/check.svg "inline")

|`preview`
|Contains the [names of the tariff options](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/ib-apps-param#service_options_for_matrix) for the tariff plan matrix
|Array
| ![](/ru/assets/check.svg "inline")
|===

{note:warn}

The combination of the `id` and `revision` parameters must be unique within Marketplace. If an application with the same identifier and revision already exists in Marketplace, the service package will not be updated.

{/note}

Based on the tariff plans and options specified in the `plans` and `preview` arrays, a [tariff plan matrix](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix) is generated.
{/includetag}

{includetag(service.yaml-plans)}
In the `plans` array, the `name` keys list the names of the tariff plans (`<PLAN_NAME>`) that will be available to the Marketplace user.

Example of the `plans` array:

```yaml
plans:
    - name: free
    - name: basic
```

In this example, the `free` and `basic` tariff plans are listed. Their configurations must be described in the `plans/free` and `plans/basic` directories, respectively. In the tariff plan matrix, these plans will be displayed with the names specified in the `description` parameter of the `plans/free/plan.yaml` and `plans/basic/plan.yaml` files.

{note:warn}

Tariff plans not specified in the `plans` array are not displayed in the [tariff plan matrix](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix) in Marketplace.

{/note}
{/includetag}

{includetag(service.yaml-preview)}
The `preview` section contains the `parameters` array. In this array, the `name` keys list the names of the tariff options (`<OPTION_NAME>`) that will be available to the Marketplace user. The array can be empty.

Example of the `preview` section:

```yaml
preview:
  parameters:
  - name: groups
  - name: products
```

In this example, the `groups` and `products` tariff options are listed. They must be described in the `parameters` directory in the `groups.yaml` and `products.yaml` files, respectively. In the tariff plan matrix, the options will be displayed with the names specified in the `description` parameter of the specified YAML files.

{note:warn}

Tariff options not specified in the `preview` section are not displayed in the [tariff plan matrix](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_tariff_matrix) in Marketplace.

{/note}
{/includetag}

{includetag(service.yaml-example)}
```yaml
id: 72b70199-1823-40c8-aa7e-f43a23ddf380
revision: v. 1.0
name: VK Testers
short_description: A crowdtesting program with a community of thousands of beta testers and its own platform for working with data
singleton: false
auto_bind: true
icon: icon.png
help: http://vk.cc/vktesters_po_faq
bindable: true
plan_updateable: false
deactivatable: false
bindings_retrievable: true
instances_retrievable: true

plans:
- name: free
- name: basic

preview:
  parameters:
  - name: api_requests_daily_limit
  - name: groups
  - name: products
```
{/includetag}

{includetag(full_description-ib-general)}
The section specifies the following information:

* A brief overview of the service: what the service is, what tasks it helps solve (main use cases).
* Who the provider is:

  * Vendor.
  * Distributor.
  * VK.

   {note:info}

   For open-source solutions, the provider is VK.

   {/note}
* Provider information (optional).

   {note:info}

   For open-source solutions, provider information is not specified.

   {/note}
* Service characteristics, preferably in table form.

  * Service type: Image-based.

  * Service version (if any). For example, Usergate 7.01.

      {note:info}

      The service version is not the service revision specified in its configuration.

      {/note}
  * OS version. For example, Ubuntu 22.04.
  * Service category. Examples:

    * Analytics.
    * Databases.
    * Security.
    * Development tools.
    * VPN.

* Service deployment options:

  * A single VM.
  * A cluster.

* Which cloud platform infrastructure is used. For example, VMs, virtual networks, DNS.
* Network requirements:

  * The VM must have access to the external network.
  * Private DNS must be disabled in the subnet settings.

* (Optional) Service diagrams and interface screenshots.

{cut(Example of filling in the service information section (Markdown format))}

```markdown
UserGate NGFW contains all the functions of UTM (Unified Threat Management) class solutions, providing protection against all kinds of internet threats and internet access management. UserGate NGFW provides attack protection, traffic management, authentication of internet users, and also ensures the security of employees' access to internet resources, protecting them from downloading dangerous and malicious content.

Service provider: UserGate.

## Tasks solved

### As a firewall

* Separating the external internet space from the internal or corporate network at the physical border.
* A VPN gateway for organizing access and authentication of specific remote users to specific information systems.
* Organizing a hybrid environment of the local infrastructure-cloud type via Site-to-Site VPN L2TP IPSec and combining branches with the head office and the VK Cloud cloud.

## Service characteristics:
|                      |                  |
|----------------------|------------------|
| Service type         |       Image-based|
| OS                   |              UGOS|
| Service version      |     Usergate 7.01|
| Service category     |          Security|

> Image-based — a type of service deployed based on virtual machine images on the VK Cloud infrastructure.
<br>The following are used for this product to function:
> * Virtual machine.
> * Virtual networks.
> * Floating IP addresses.

**Minimum infrastructure requirements**
Virtual machines:
* vCPU: 2.
* RAM: 8 GB.
* Disk size: at least 100 GB.
* Network:
    * The VM must have access to the external network.
    * Private DNS must be **disabled** in the subnet settings.
```

{/cut}
{/includetag}

{includetag(full_description-saas-general)}
The section specifies the following information:

* A brief overview of the service: what the service is, what tasks it helps solve (main use cases).
* Who the provider is:

  * Vendor.
  * Distributor.
  * VK.

   {note:info}

   For open-source solutions, the provider is VK.

   {/note}
* Provider information (optional).

   {note:info}

   For open-source solutions, provider information is not specified.

   {/note}
* Service characteristics, preferably in table form.

  * Service type: SaaS.

  * Service version (if any). For example, Usergate 7.01.

      {note:info}

      The service version is not the service revision specified in its configuration.

      {/note}
  * Service category. Examples:

    * Analytics.
    * Databases.
    * Security.
    * Development tools.
    * VPN.

* (Optional) Service diagrams and interface screenshots.

{cut(Example of filling in the service information section (Markdown format))}

```markdown
UserGate NGFW contains all the functions of UTM (Unified Threat Management) class solutions, providing protection against all kinds of internet threats and internet access management. UserGate NGFW provides attack protection, traffic management, authentication of internet users, and also ensures the security of employees' access to internet resources, protecting them from downloading dangerous and malicious content.

Service provider: UserGate.

## Tasks solved

### As a firewall

* Separating the external internet space from the internal or corporate network at the physical border.
* A VPN gateway for organizing access and authentication of specific remote users to specific information systems.
* Organizing a hybrid environment of the local infrastructure-cloud type via Site-to-Site VPN L2TP IPSec and combining branches with the head office and the VK Cloud cloud.

## Service characteristics:
|                      |                  |
|----------------------|------------------|
| Service type         |       Image-based|
| OS                   |              UGOS|
| Service version      |     Usergate 7.01|
| Service category     |          Security|

> Image-based — a type of service deployed based on virtual machine images on the VK Cloud infrastructure.
<br>The following are used for this product to function:
> * Virtual machine.
> * Virtual networks.
> * Floating IP addresses.

**Minimum infrastructure requirements**
Virtual machines:
* vCPU: 2.
* RAM: 8 GB.
* Disk size: at least 100 GB.
* Network:
    * The VM must have access to the external network.
    * Private DNS must be **disabled** in the subnet settings.
```

{/cut}
{/includetag}

{includetag(full_description-ib-tariff)}
Billing rules are described in free form. It is recommended to:

* Specify the [billing type](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing).
* Specify where the tariff plans can be viewed, if there are several. Example: "The billing rules can be found in the tariff plan matrix on the service page."
* Mention that paid tariff options, if any, are billed in addition to the cost of the tariff plan.
* Describe tariff plans with a negotiated price, if any.
* Explain that the cost of the cloud platform infrastructure is billed separately.

{note:warn}

If an image-based application uses cloud platform infrastructure whose volume and cost cannot be determined at the time the service is connected (for example, storage of information accumulated during operation — backups), this must be stated in the billing rules description.

{/note}

Example of filling in the billing rules subsection (Markdown format):

```markdown
# Billing rules
The service is provided under the Bring Your Own License model. Billing applies only to the consumed VK Cloud infrastructure. Its cost can be estimated in the **Details** block in the tariff plan configuration wizard. The final cost will be displayed on the last page of the tariff plan configuration wizard.
```
{/includetag}

{includetag(full_description-saas-tariff)}
Billing rules are described in free form. It is recommended to:

* Specify the [billing type](/ru/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing).
* Specify where the tariff plans can be viewed, if there are several. Example: "The billing rules can be found in the tariff plan matrix on the service page."
* Mention that paid tariff options, if any, are billed in addition to the cost of the tariff plan.
* Describe tariff plans with a negotiated price, if any.

Example of filling in the billing rules subsection (Markdown format):

```markdown
# Billing rules
The service is provided under the Bring Your Own License model. Billing applies only to the consumed VK Cloud infrastructure. Its cost can be estimated in the **Details** block in the tariff plan configuration wizard. The final cost will be displayed on the last page of the tariff plan configuration wizard.
```
{/includetag}

{includetag(full_description-links)}
* A link to the brief documentation describing getting started with the service — a link to the [Configuring app store services](/ru/applications-and-services/marketplace/initial-configuration) article.
* A link to the full documentation published by the service developer.

Example of filling in the useful links section (Markdown format):

```markdown
# Useful links
- [Getting started documentation](<LINK_TO_VK_CLOUD_DOCUMENTATION_PORTAL> "On the VK Cloud documentation portal") — instructions for gaining access, initial setup, and getting started with the service after deploying an instance.
- [Full service documentation](<LINK_TO_DEVELOPER_DOCUMENTATION> "On the provider's website").
```
{/includetag}

{includetag(full_description-ib-support)}
The section provides:

* Rules for obtaining technical support for the service.
* Rules for obtaining technical support for the cloud platform infrastructure.
* Technical support contacts.

Example of filling in the technical support section (Markdown format):

```markdown
# Technical support
The UserGate NGFW technical support service is purchased together with the product license. Support is provided by the provider on the [Technical Support Portal](https://support.usergate.com/ru) in accordance with the [Technical Support Regulations](https://support.usergate.com/ru/technical-support-regulations).
Upon request, the VK Cloud [Professional Services team](https://cloud.vk.ru/professional-services/) provides extended technical support for UserGate NGFW.

The VK Cloud team provides technical support on issues related to the operation of the VK Cloud infrastructure. Information about the terms of support and how to contact support is available on the [Support terms](/ru/start/support/support-info) page.
```
{/includetag}

{includetag(full_description-saas-support)}
The section provides:

* Rules for obtaining technical support for the service.
* Technical support contacts.

Example of filling in the technical support section (Markdown format):

```markdown
# Technical support
The UserGate NGFW technical support service is purchased together with the product license. Support is provided by the provider on the [Technical Support Portal](https://support.usergate.com/ru) in accordance with the [Technical Support Regulations](https://support.usergate.com/ru/technical-support-regulations).
Upon request, the VK Cloud [Professional Services team](https://cloud.vk.ru/professional-services/) provides extended technical support for UserGate NGFW.

The VK Cloud team provides technical support on issues related to the operation of the VK Cloud infrastructure. Information about the terms of support and how to contact support is available on the [Support terms](/ru/start/support/support-info) page.
```
{/includetag}

{includetag(full_description-legal)}
The section specifies:

* Links:

  * To the [app store user agreement](/ru/start/legal/offer/private-special-conditions/policy-marketplace)
  * To the service's user agreement.

* For open-source solutions — a disclaimer about open-source licenses.

Example of filling in the license agreement section (Markdown format):

```markdown
# License agreement
By using the UserGate NGFW service, you agree to:
- The [app store user agreement](https://cloud.vk.ru/docs/ru/start/legal/offer/private-special-conditions/policy-marketplace).
- The [UserGate NGFW license agreement](https://www.usergate.com/ru/usergate-eula).
```
{/includetag}

{includetag(plan.yaml-common-param)}

[cols="2,5,2,2", options="header"]
|===
| Name
| Description
| Format
| Required

| `id`
| UUID4 tariff plan identifier (ID), generated using a UUID4 generator
| `string (UUID4)`
| ![](/ru/assets/check.svg "inline")

| `revision`
| Tariff plan revision. The combination of the revision and the tariff plan ID determines its uniqueness within the service. The remaining parameters describe the characteristics of a specific tariff plan revision.

{note:warn}

If a tariff plan with the same identifier and revision already exists for this service, the plan will not be updated

{/note}
| `string`, up to 255 characters
| ![](/ru/assets/check.svg "inline")

| `name`
| Technical name of the tariff plan, which is not displayed in the Marketplace interface. Can contain only Latin letters and the `_` character
| `string`, up to 255 characters
| ![](/ru/assets/check.svg "inline")

| `description`
| Name of the tariff plan, which is displayed in the Marketplace interface
| `string`, up to 255 characters
| ![](/ru/assets/check.svg "inline")

| `free`
| Determines whether the tariff plan is free
| `boolean`
| ![](/ru/assets/check.svg "inline")

| `billing`
| [The billing section of the tariff plan](#plan_billing), determines the cost of the tariff plan excluding paid tariff options
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| `parameters_patch`
| [The parameters_patch section](#plan_options), selectively overrides tariff option parameters for a specific plan
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| `resource_usages`
| List of postpaid tariff options.

{note:warn}

Cannot be specified for a tariff plan with prepaid tariff options

{/note}
| Array
| Yes — for a plan with postpaid options
|===

{/includetag}

{includetag(plan.yaml-billing)}
Section parameters:

[cols="3,5,2,1,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Default value

|`cost`
|Cost of the tariff plan for the billing period, excluding paid tariff options. Specified in the currency of the country where Marketplace is deployed.

For a free tariff plan — `0`
|`float`
| ![](/ru/assets/check.svg "inline")
| —

|`refundable`
|Determines whether funds are refunded to the project's bonus account for the remaining days of the billing period if the user changed the tariff plan or deleted the service instance.

The parameter affects the date the payment for the service is charged when the user changes the tariff plan (edits the tariff options or switches to a new one):

- If `true`, the date does not change.
- If `false`, the date is updated to the date the tariff plan was changed

|`boolean`
| ![](/ru/assets/no.svg "inline")
|`true`

|`billing_cycle_flat`
|Duration of the billing period for the billing.

Record format: `<NUMBER_OF_MONTHS> mons <NUMBER_OF_DAYS> days`. For example, `1 mons 15 days`, `30 days`.

{note:info}

The number of days in a `mons` month is calculated based on the calendar value, so the periods `1 mons 0 days` and `0 mons 31 days` are not equal to each other.

{/note}
|`string`
| ![](/ru/assets/no.svg "inline")
|`1 mons 0 days`
|===

Example of filling in the `billing` section:

```yaml
billing:
  cost: 2000
  refundable: true
  billing_cycle_flat: 1 mons 0 days
```

{/includetag}

{includetag(plan.yaml-parameters_patch)}
This section selectively overrides tariff option parameters for the tariff plan: individual parameters or entire sections of the tariff option description.

{tabs}
{tab(Overriding individual tariff option parameters)}

For each parameter being overridden, its name is specified with the path to the root section. The parameter name and the names of its parent sections are separated by dots.

Example of overriding tariff option parameters:

```yaml
parameters_patch:
  users:
    schema.const: 5000
  volume_data_size:
    schema.default: 550
    schema.minimum: 550
```

In this example, new values are assigned to:

- the `cost` parameter in the `schema` section of the `users` tariff option;
- the `default` and `minimum` parameters in the `schema` section of the `volume_data_size` tariff option.

The possible parameters, depending on the type of tariff option, are provided in the [Tariff option YAML file](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/tariff-options) section.

{/tab}
{tab(Overriding an entire tariff option section)}

The tariff option section being overridden is specified in the same format as in the tariff option YAML file.

Example of overriding the `billing` section of a tariff option:

```yaml
parameters_patch:
  assemblies_size:
    billing:
      base: 25
      cost: 0
      unit:
        size: 100
```

In this example, the entire `billing` section of the `assemblies_size` tariff option is replaced with a new one.

{/tab}
{/tabs}

{note:warn}
Simultaneously overriding an entire section and an individual parameter from that section is not allowed.
{/note}

The parameter values specified in the `parameters_patch` section take precedence over the values from the tariff option YAML files.

If the tariff plans use options that differ significantly from each other:

- It is recommended to describe each option in a separate YAML file in the `parameters` directory.
- It is not recommended to describe a single tariff option for all tariff plans and override most of its parameters in different tariff plans.

{/includetag}

{includetag(plan.yaml-example)}
```yaml
id: b2b42648-XXXX-b4cddbf010b2
revision: v. 1.0
name: basic
description: Basic
free: false

billing:
  cost: 2000
  refundable: true
  billing_cycle_flat: 1 mons

parameters_patch:
  users:
    schema.const: 5000
  volume_data_size:
    schema.default: 550
    schema.minimum: 550
```
{/includetag}

{includetag(plan.yaml-example-free-postpaid)}
```yaml
id: 3aa541d8-XXXX-6dbf542b3f90
revision: v. 1.1
name: postpaid
description: Postpaid
free: true

billing:
  cost: 0

resource_usages:
  - storage
```
{/includetag}

{includetag(display.yaml-pages)}

The array describes the pages of the configuration wizard for the tariff plan. Each page displays one or more groups of tariff options. The maximum number of pages is 5.

{note:warn}

Each tariff option of the plan must belong to one and only one group.

{/note}

Parameters of the `pages` array:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`name`
|Name of the configuration wizard page, no more than 32 characters
|`string`
|![](/ru/assets/check.svg "inline")

|`groups`
|Groups of tariff options displayed on a specific page of the configuration wizard
|Array
|![](/ru/assets/check.svg "inline")

|`groups.name`
|Name of the tariff option group, no more than 255 characters
|`string`
|![](/ru/assets/check.svg "inline")

|`groups.parameters`
|List of names of the tariff options included in the group.
|List, list item — `string`
|![](/ru/assets/check.svg "inline")

|`groups.parameters.name`
|Name of the tariff option, matching the name of the YAML file of this option: `<OPTION_NAME>`.
|`string`
|![](/ru/assets/check.svg "inline")
|===

By default, the tariff plan configuration wizard displays all groups of tariff options (`groups`) specified in the `pages` array. The [when construct](#when_construction) is used to show or hide groups depending on specified conditions.

{/includetag}

{includetag(display.yaml-entities-common)}

The array describes the elements of the VK Cloud infrastructure that will be billed under the tariff plan.

{note:warn}

The [Terraform manifests](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/tf-manifest) must contain a description of the infrastructure elements from `entities`.

{/note}

By default, the tariff plan configuration wizard displays the cost of all infrastructure elements described in the `entities` array. The [when construct](#when_construction) is used to show or hide the infrastructure cost depending on specified conditions.

General parameters of the `entities` array:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`entity`
|Type of infrastructure element:

* `vm` — VM.
* `load_balancing` — load balancer.
* `floating_ip` — external IP address.
|`string`
|![](/ru/assets/check.svg "inline")

|`description`
|Description of the infrastructure element
|`string`
|![](/ru/assets/no.svg "inline")
|===

Example of describing the **Service settings** page in the tariff plan configuration wizard:

```yaml
pages:
- name: Service settings # Page name
  groups:
  - name: Server # Tariff option group name
    parameters:
    - name: network # Tariff option name
    - name: vm
    - name: az

  - name: System disk
    parameters:
    - name: volume_size
    - name: volume_type
```

{/includetag}

{includetag(display.yaml-entities-vm)}

Parameters of the `entities` array for a VM:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`count`
|Number of VMs, specified by the `const` or `param` parameter
|Section
|![](/ru/assets/check.svg "inline")

|`count.const`
|Number of VMs
|`integer`
| —

|`count.param`
|Name of the tariff option (`<OPTION_NAME>`) whose value determines the number of VMs
|`string`
| —

|`flavor`
|VM type, specified by the `const` or `param` parameter
|Section
|![](/ru/assets/check.svg "inline")

|`flavor.const`
|[VM configuration template ID](/ru/tools-for-using-services/cli/openstack-cli#openstack-example)
|`string`
| —

|`flavor.param`
|Name of the tariff option (`<OPTION_NAME>`) describing the VM type: `datasource.type` = `flavor`
|`string`
| —

|`disks`
|VM disks. Each disk is described by the `type` and `size` sections
|Array
|![](/ru/assets/check.svg "inline"), if the `pages` array specifies an option of type `datasource.type` = `volume_type`

|`disks.type`
|Disk type, specified by the `const` or `param` parameter
|Section
| —

|`disks.type.const`
|Disk type.

Possible values:

* `ceph-ssd` — SSD disk.
* `ceph-hdd` — HDD disk.
* `high-iops` — High-IOPS SSD disk (SSD with increased performance).
|`string`
| —

|`disks.type.param`
|Name of the tariff option (`<OPTION_NAME>`) describing the disk type: `datasource.type` = `volume_type`
|`string`
| —

|`disks.size`
|Disk size, specified by the `const` or `param` parameter
|Section
| —

|`disks.size.const`
|Disk size
|`integer`
| —

|`disks.size.param`
|Name of the tariff option (`<OPTION_NAME>`) whose value determines the disk size
|`string`
| —
|===

{note:warn}

The `disks` array in the VM description is required if the tariff plan's `pages` array uses a tariff option of type `datasource` that describes the disk type.

{/note}

Example of describing a VM for the tariff plan configuration wizard:

```yaml
entities:
  - entity: vm
    description: Virtual machine
    count:
      const: 1
    flavor:
      param: ds-flavor # Tariff option name
    disks:
      - type:
          param: root_type
        size:
          param: root_size
      - type:
          param: data_type
        size:
          param: data_size
```

{/includetag}

{includetag(display.yaml-entities-lb)}

Parameters of the `entities` array for a load balancer:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`count`
|Number of load balancers, specified by the `const` or `param` parameter
|Section
|![](/ru/assets/check.svg "inline")

|`count.const`
|Number of load balancers
|`integer`
| —

|`count.param`
|Name of the tariff option (`<OPTION_NAME>`) whose value determines the number of load balancers
|`string`
| —
|===

Example of describing a load balancer for the tariff plan configuration wizard:

```yaml
entities:
  - entity: load_balancing
    count:
      param: number_balancing # Tariff option name
```

{/includetag}

{includetag(display.yaml-entities-ip)}

Parameters of the `entities` array for an external IP address:

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Format
|Required

|`count`
|Number of external IP addresses, specified by the `const` or `param` parameter
|Section
|![](/ru/assets/check.svg "inline")

|`count.const`
|Number of external IP addresses
|`integer`
| —

|`count.param`
|Name of the tariff option (`<OPTION_NAME>`) whose value determines the number of external IP addresses
|`string`
| —
|===

Example of describing an external IP address for the tariff plan configuration wizard:

```yaml
entities:
  - entity: floating_ip
    count:
      const: 1
```

{/includetag}

{includetag(display.yaml-when-common)}

The `when` construct controls conditional branching when displaying the tariff plan wizard. It contains:

* Condition type:

  * `when.in` — checks equality of the values specified by the `key` and `values` parameters. The condition is met if the value of `key` is equal to at least one of the `values`.
  * `when.not_in` — checks inequality of the values specified by the `key` and `values` parameters. The condition is met if the value of `key` is not equal to any of the `values`.

* Criteria. Specified by the `key` and `values` parameters in one of the following ways:

  * Via the `param` parameter — to use the value of a specific tariff option.
  * Via the `const` parameter — to use a fixed value.

  `key` can be set to one value, `values` — to one or more.

Structure of `when` in YAML format:

```yaml
when:
  in: # or not_in
    key:
      param: <OPTION_NAME> # or const: <VALUE>
    values:
      - const: <VALUE>
      - param: <OPTION_NAME>
      ...
```
Here:

* `<OPTION_NAME>` — the name of the tariff option, matching the name of the YAML file of this option.
* `<VALUE>` — a fixed value.

{note:warn}

Resources in [Terraform manifests](/ru/tools-for-using-services/vendor-account/reference/ib-apps-reference/tf-manifest) must be described taking into account the conditions specified in the `when` constructs.

{/note}

{/includetag}

{includetag(display.yaml-when-pages)}

In the `pages` array, the `when` construct is used to set a condition that determines whether a group of tariff options should be displayed in the tariff plan configuration wizard.

{note:warn}

Only the first level of the hierarchy is supported in the conditions for displaying groups. If a `when` construct is specified for a group of options, the tariff options from this group listed in the `parameters` array cannot be used in a `when` construct in other groups.

{/note}

The same tariff option can be used in `when` constructs in different groups. Depending on the value of the tariff option, different groups will be displayed in the configuration wizard.

When using the `when` construct, a page with groups of tariff options will be hidden if the following conditions are met at the same time:

* All groups on the same page have a `when` construct.
* The tariff plan configuration wizard has tariff option values set such that the conditions in all groups on this page are not met.

Example of using the `when` construct in the `pages` array:

```yaml
pages:
- name: Backup settings # Page name
  groups:
  - name: High-frequency backup # Tariff option group name
    parameters:
    - name: frequency_per_day # Tariff option name
    when:
      in:
        key:
          param: backup_method # Tariff option name
        values:
          - const: high-frequency
```

In this example, the `High-frequency backup` group with the `frequency_per_day` tariff option will be displayed if the user selected the value `high-frequency` for the `backup_method` tariff option in the configuration wizard. The user will then be able to choose the backup frequency.

The `backup_method` tariff option:

* can be used in a `when` construct in other groups;
* must be specified in the `parameters` array in another group.

The `frequency_per_day` tariff option cannot be used in other groups:

* in a `when` construct — because only one level of condition hierarchy is supported;
* in `parameters` — because a single tariff option can be specified in only one group.

{/includetag}

{includetag(display.yaml-when-entities)}

In the `entities` array, the `when` construct is used to set a condition that determines whether the cost of the infrastructure element described in the `entities` array should be displayed in the tariff plan configuration wizard.

Example of using the `when` construct in the `entities` array:

```yaml
entities:
  - entity: vm
    description: alkair_software
    when:
      in:
        key:
          param: need_install_alkair_software # Tariff option name
        values:
          - const: true
    flavor:
      const: 6a7a0690-943a-4921-936e-2849970ccfba # VM type (CPU, RAM). In this example, a VM with 2 CPU and 3 GB RAM
    count:
      const: 1
    disks:
      - type:
          const: high-iops # Disk type
        size:
          const: 500 # Disk size
```

This example shows a configuration for displaying the cost of a VM for the Alkair software. If the user selects the value `true` for the `need_install_alkair_software` tariff option, the cost of the VM described in the `entities.entity` element will be displayed in the tariff plan configuration wizard.

{/includetag}
