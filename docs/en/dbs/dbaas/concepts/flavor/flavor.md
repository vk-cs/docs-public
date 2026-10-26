# {heading(DB instance configuration template)[id=dbaas-flavor]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VM configuration template (flavor) defines the amount of VM resources: the number of CPUs and the amount of RAM.

When {var(cloud)} is installed, Standard VM configuration templates with the following characteristics are created for DB instances:

* vCPU: from 2 to 16.
* RAM: from 8 GB to 64 GB.

The full list of available VM configuration templates can be viewed by expanding the **Virtual machine type** list when {linkto(../../instructions/create#dbaas-create)[text=creating]} a database.

{note:warn}
It is possible to add new custom VM configuration templates with arbitrary configurations. To create other VM configuration templates, contact the {var(cloud)} administrator.
{/note}