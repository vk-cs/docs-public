# {heading(Processor generations)[id=iaas-cpu-generation]}

{include(/en/_includes/_translated_by_ai_en.md)}

The performance of a virtual machine depends on the resources of the host it is placed on. {var(cloud)} provides server hardware that allows you to configure VMs of different performance levels.

In {var(cloud)}, the following processors are used to host VMs:

[cols="3,3,1", options="header"]
|===
|Processor
|Processor type and generation
|Availability

|Intel(R) Xeon(R) Gold 6230 CPU @ 2.10GHz <br> Intel(R) Xeon(R) Gold 6238R CPU @ 2.20GHz
|Intel Cascade Lake (Intel Xeon Gen 2)
|By default

|Intel Xeon Gold 6338 @ 2.0GHz <br> Intel Xeon Platinum 8380 CPU @ 2.3GHz
|Intel Ice Lake (Intel Xeon Gen 3)
|By default

|Intel(R) Xeon(R) Gold 6230 CPU @ 3.40GHz  <br> Intel(R) Xeon(R) Gold 6238R CPU @ 3.70GHz <br> Intel(R) Xeon(R) Platinum 8380 CPU @ 3.4GHz
|High-performance processors
|On request

|AMD EPYC 7662
|Only for certain GPU-enabled virtual machines
|On request
|===

Configurations available by default allow you to create VMs on servers with standard processors.

To get access to high-performance processors, contact [technical support](/en/contacts). The cost of a virtual machine with a high-performance processor is calculated individually for each request.