# {heading(ivkcs_user_data resource)[id=ivkcs_user_data]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}

To use the resource, the service image must contain the [cloud-init](https://cloudinit.readthedocs.io/en/latest) software package.

{/note}

The arguments of the `ivkcs_user_data` resource are given in {linkto(#tab_arguments)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_arguments]} — Arguments of the ivkcs_user_data resource)[align=right;position=above;id=tab_arguments;number={const(numb_tab_arguments)}]}
[cols="4,5,2,2,2,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Default value
|Resource recreation upon value change

|
`uuid`
|
Service deployment identifier
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`hosts`
|
List of host names for agent initialization
|list, list items — string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|
`target_os`
|
Target OS (for details, see the section {linkto(#target_os)[text=%text]})
|string
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`ssh_private_key`
|
Private key in `RSA` format for host identification. Used together with the `ssh_public_key` argument
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`ssh_public_key`
|
Public key in `RSA` format for host identification. Used together with the `ssh_private_key` argument
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`ssh_authorized_keys`
|
Keys for user authentication over SSH. Added to the default user
|list, list items — string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`ca_certificates`
|
List of root certificates to be installed in the OS as trusted
|list, list items — string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|
`agent_install`
|
Defines whether to install the agent or not
|boolean
| ![](/ru/assets/no.svg "inline")
|`true`
| ![](/ru/assets/no.svg "inline")

|
`agent_memory_limit`
|
RAM limit for the agent, MB
|integer
| ![](/ru/assets/no.svg "inline")
|`512`
| ![](/ru/assets/no.svg "inline")

|
`packages`
|
Defines which packages must be installed (for details, see the section {linkto(#packages)[text=%text]})
|set
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`user_script`
|Scripts executed via Cloud-init
|list
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`token_file_path`
|Path to the file for writing the Marketplace API access token
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|`token_rotate`
|Defines whether to enable token rotation or not
|boolean
| ![](/ru/assets/no.svg "inline")
| `false`
| ![](/ru/assets/check.svg "inline")

|`token_file_owner`
|User assigned as the owner of the token file
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|`token_file_group`
|Group assigned to the token file
|string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===
{/caption}

{note:info}

When installing the agent, use the `agent_memory_limit` argument to limit RAM.

{/note}

The `ivkcs_user_data` resource returns the `user_data` attribute in the form of a list of strings. The index in the list corresponds to the index of the host passed in the `hosts` argument. The value is a cloud-config configuration in the MIME archive format. Use the obtained value in the `user_data` argument of the `vkcs_compute_instance` resource.

{caption(Example of using the `ivkcs_user_data` resource)[align=left;position=above]}
```hcl

# Creating a key pair
resource "ivkcs_ssh_keypair" "test" {}

# Creating a cloud-config configuration. Retrieving data for agent initialization on the host
resource "ivkcs_user_data" "test" {
  uuid                = var.instance_uuid
  hosts               = ["host1"]
  target_os           = "almalinux9"

  ssh_authorized_keys = [
    ivkcs_ssh_keypair.test.public_key,
  ]
}

resource "vkcs_compute_instance" "single" {
  name              = "host1"
  ...

  # Applying the cloud-config configuration to configure the VM. Installing the agent

  # In [] specify the host number. If the service is deployed on a single VM, the value must be 0
  user_data = ivkcs_user_data.test.user_data[0]
  ...
}
```
{/caption}

## {heading(The target_os argument)[id=target_os]}

The possible values of the `target_os` argument are given in {linkto(#tab_target_os)[text=table %number]}. Each value corresponds to a specific base image of the cloud platform and a specific configuration of that image (a combination of the OS and the Cloud-init version).

Creation of a correct cloud-config configuration is guaranteed for the base images from the table.

{caption(Table {counter(table)[id=numb_tab_target_os]} — Possible values of the target_os argument)[align=right;position=above;id=tab_target_os;number={const(numb_tab_target_os)}]}
[cols="3,2,2,2", options="header"]
|===
|Value
|OS
|Cloud-init version
|Base OS

|
`freebsd132`

{note:warn}

Agent installation is not supported.

{/note}
|FreeBSD 13.2
|23.1.1
|FreeBSD

|
`debian114`
|Debian 11.4
|20.4.1
|Debian

|
`ubuntu2204`
|Ubuntu 22.04
|22.2
|Debian

|
`redos73`
|RedOS 7.3
|21.4
|Debian

|
`centos84`
|CentOS 8.4
|19.4
|RHEL

|
`altserver10`
|ALT Server 10
|22.3.4
|Debian

|
`astralinux17`
|Astra Linux SE 1.7 «Voronezh»
|20.2
|Debian

|
`almalinux9`
|AlmaLinux 9
|22.1
|RHEL
|===
{/caption}

If the table does not contain the required OS, use the value for the closest related OS or the closest base OS. For example, the closest related OS to Ubuntu 21.10 is Ubuntu 22.04, so specify the `ubuntu2204` value.

{note:info}

If the service only requires the agent and SSH keys for VM access `ssh_authorized_keys`, use any value of the `target_os` argument.

{/note}

You can find out the ID of the base image in VK Cloud that corresponds to the `target_os` value by running the `openstack image list` command in [OpenStack CLI](/en/tools-for-using-services/cli/openstack-cli). The command outputs a list of all VM images available in the project. For each image, its ID, the `target_os` value, and the status are displayed.

## {heading(The packages argument)[id=packages]}

The `packages` arguments are given in {linkto(#tab_packages)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_packages]} — The packages arguments)[align=right;position=above;id=tab_packages;number={const(numb_tab_packages)}]}
[cols="3,3,3,3", options="header"]
|===
|Name
|Description
|Format
|Required

|
`name`
|Package name
|string
| ![](/ru/assets/check.svg "inline")

|
`version`
|Package version
|string
| ![](/ru/assets/check.svg "inline")
|===
{/caption}

{note:warn}

For the ALT Server OS, the package name and version must be specified in a special format.

{/note}

To specify the package name and version for the ALT Server OS, use the format:

```txt
name: "<NAME>=<VERSION_PART_1>"
version: "<VERSION_PART_2>"
```

Here:

* `<NAME>` — package name.
* `<VERSION_PART_1>` — package version value before the first `-` character.
* `<VERSION_PART_2>` — package version value after the first `-` character.

{caption(Example of a package entry with the name mc and the version 4.8.28-alt1:p10+299225.100.2.1)[align=left;position=above]}
```hcl
name: "mc=4.8.28"
version: "alt1:p10+299225.100.2.1"
```
{/caption}

{caption(Example of the `ivkcs_user_data` resource with package installation)[align=left;position=above]}
```hcl
resource "ivkcs_user_data" "user_data" {
  uuid      = var.instance_uuid
  hosts     = ["host1"]
  target_os = "almalinux9"

  packages {
    name    = "mc"
    version = "4.8.30"
  }

  packages {
    name    = "tmux"
    version = "3.3a"
  }
}
```
{/caption}

## {heading(The user_script argument)[id=user_script]}

The `user_script` arguments are given in {linkto(#tab_userscript)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_userscript]} — The user_script arguments)[align=right;position=above;id=tab_userscript;number={const(numb_tab_userscript)}]}
[cols="2,3,1,1", options="header"]
|===
|Name
|Description
|Format
|Default value

|`name`
|Script name. Scripts are executed in alphabetical order
|string
| ![](/en/assets/no.svg "inline")

|`content_type`
|Script type. Defines when the script will be executed. Possible values:

  - `text/x-shellscript-per-boot`;
  - `text/x-shellscript-per-instance`;
  - `text/x-shellscript-per-once`
|string
| ![](/en/assets/no.svg "inline")

|`content`
|Script body
|string
| ![](/en/assets/no.svg "inline")
|===
{/caption}

The script execution order is given in {linkto(#tab_scripttype)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_scripttype]} — Script types)[align=right;position=above;id=tab_scripttype;number={const(numb_tab_scripttype)}]}
[cols="1,2,3", options="header"]
|===
|Execution order
|Script type
|Description

|1
|`x-shellscript-per-boot`
|Executed in alphabetical order every time the system boots

|2
|`x-shellscript-per-instance`
|Executed in alphabetical order on the first boot of a new instance

|3
|`x-shellscript-per-once`
|Executed in alphabetical order once. Not run again when the instance changes
|===
{/caption}

{caption(Example of the `ivkcs_user_data` resource with `user_script`)[align=left;position=above]}
```hcl

resource "ivkcs_user_data" "init" {
  uuid      = var.instance_uuid
  hosts     = [local.hosts_name]
  target_os = "almalinux9"

  ssh_authorized_keys = [
    ivkcs_ssh_keypair.keypair.public_key,
  ]
  
  user_script {
    name = "script1"
    content_type = "text/x-shellscript-per-once"
    content =<<-EOT
#!/bin/bash

echo "script1"
EOT
  }

  user_script {
    name = "script2"
    content_type = "text/x-shellscript-per-instance"
    content =<<-EOT
#!/bin/bash

echo "script2"
EOT
  }
}
```
{/caption}

Additional information:

- [Scripts Per Boot](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-boot);
- [Scripts Per Instance](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-instance);
- [Scripts Per Once](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-per-once);
- [Scripts User](https://cloudinit.readthedocs.io/en/latest/reference/modules.html#scripts-user).