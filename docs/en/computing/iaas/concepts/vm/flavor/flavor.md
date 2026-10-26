# {heading(VM Flavors)[id=iaas-flavor]}

{include(/en/_includes/_translated_by_ai_en.md)}

In {var(cloud)}, the number of processors and the amount of VM RAM are set using flavors.

{ifdef(public)}

## {heading(VM Categories)[id=iaas-flavor-vm-categories]}

In the management console, VM flavors are grouped by categories:

[cols="1,2,2", options="header"]
|===
|Category
|Description
|Display condition

|Intel Cascade Lake (Intel Xeon Gen 2)
|VMs on servers with Intel Cascade Lake CPU
|Available by default

|Intel Ice Lake (Intel Xeon Gen 3)
|VMs on servers with Intel Ice Lake CPU
|Available by default

|Legacy VM types
|Old VM flavors
|Hidden by default when filtering

|High-performance CPUs
|VMs on {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=servers]} with increased CPU clock frequency
|Displayed when ordering the corresponding VM types via [technical support](/en/contacts)

|VMs with GPU
|VMs with a dedicated {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=graphics accelerator]}
|Displayed when ordering the corresponding VM types via the [Cloud GPU](https://cloud.vk.ru/cloud-gpu/) service

|VMs with vGPU
|VMs with a {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=graphics accelerator]} based on the {linkto(../../../../../computing/gpu/concepts/vgpu#gpu-vgpu)[text=vGPU technology]}
|Displayed when ordering the corresponding VM types via the [Cloud GPU](https://cloud.vk.ru/cloud-gpu/) service

|VMs with local disks
|VMs with the ability to use hypervisor local disks
|Displayed when ordering the corresponding VM types via [technical support](/en/contacts)

|VMs on dedicated servers
|VMs on hypervisors dedicated to a single customer's needs
|Displayed when ordering the corresponding VM types via your account manager
|===

By default, only current flavors are displayed: on servers with Intel Cascade Lake and Intel Ice Lake CPUs, as well as VMs with an attached graphics card, on high-performance or dedicated servers, if they have been added to the project.

To add individual VM configurations to the list, including VMs with more than 16 vCPU and 64 GB of RAM, contact [technical support](/en/contacts).

Legacy VM flavors are available when selecting the **Legacy VM types** category. The server for creating a legacy-configuration VM is selected at random: Intel Cascade Lake or Intel Ice Lake. If the server becomes unavailable (for example, during maintenance), these VMs may be migrated to a server of a different generation.

{cut(Legacy VM types)}

[cols="1,2,3", options="header"]
|===
|Name
|Configuration parameters
|Description

|Basic
|Up to 2 vCPU <br/> Up to 4 GB RAM
|Basic configurations for creating VMs with low performance

|Standard
|From 2 to 4 vCPU <br/> From 4 GB to 16 GB RAM
|Configurations with an increased number of CPUs and amount of RAM

|Advanced
|From 8 to 16 vCPU <br/> From 16 GB to 64 GB RAM
|Configurations for creating high-performance VMs

|Heavy
|From 16 vCPU <br/> From 64 GB RAM
|Individual configurations for creating high-performance VMs

|Custom
|Unlimited
|Individual configurations
|===
{/cut}

To create additional VM flavors (for example, with a larger amount of resources), contact [technical support](/en/contacts). In this case, the VM cost is calculated individually for each request.

{note:info}
The number and type of CPUs, as well as the amount of RAM of an already created VM, can be changed by switching the VM flavor. This process requires a VM reboot.
{/note}

## {heading(VM Flavor Names)[id=iaas-flavor-vm-names]}

The flavor name structure differs depending on the VM category, but has the general form:

```plaintext
<VM_CATEGORY>-<CPU_COUNT>-<RAM_AMOUNT>-...
```

If there are additional parameters specific to certain VM categories, they are specified at the end.

Examples:

[cols="1,3", options="header"]
|===
|VM flavor name
|Description

|STD2-2-4
|VM with an Intel Cascade Lake processor, 2 vCPU and 4 GB of RAM

|STD3-4-8 
|VM with an Intel Ice Lake processor, 4 vCPU and 8 GB of RAM

|GPU1A-32-96-A100-1 
|VM with an AMD EPYC 7662 processor and one attached Nvidia Tesla A10040GB graphics card
|===

{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}

{ifndef(private-pdf,private-pg-pdf,private-cert)}
VM flavors created during {var(cloud)} installation:
{/ifndef}

{ifndef(private,private-pg)}
VM flavors created during {var(cloud)} installation and their description are provided in {linkto(#tab_instance_types)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_instance_types]} — VM Flavors)[align=right;position=above;id=tab_instance_types;number={const(numb_tab_instance_types)}]}
{/ifndef}
[cols="1,2,4", options="header"]
|===
|Name
|Configuration parameters
|Description

|Basic
|1 vCPU, up to 4 GB RAM
|Basic group containing VM configurations with low performance

|Standard
|From 2 to 16 vCPU, from 2 GB to 64 GB RAM
|Group with an increased number of CPUs and amount of RAM
|===
{ifndef(private,private-pg)}
{/caption}
{/ifndef}

{ifndef(private-cert)}
The full list of available project VM flavors can be seen by expanding the **VM type** list when {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=creating a VM]}.
{/ifndef}

To create new custom VM flavors with arbitrary specifications, contact the {var(cloud)} administrator.

{/ifdef}