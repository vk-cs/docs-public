You can test the performance of the VK Cloud platform using the testing methodologies developed by VK Tech. With their help, you will get objective data that you can then compare with the results of other cloud platforms.

To make the performance comparison objective, use the same testing methodologies on all platforms of interest.

## {heading(Resources and components for testing)[id=test_item_selection]}

{include(/en/_includes/_translated_by_ai_en.md)}

To find out what the VK Cloud platform components are really capable of, use high-performance processors for testing. On the VK Cloud platform, the following resources are available for these purposes:

[cols="3,1,2", options="header"]
|===

|Resource type
|Clock frequency
|Possible configurations

|FREQ high-frequency aggregates with Intel(R) Xeon(R) Platinum 8380 CPU (Intel Ice Lake) processor
|\~3.4 GHz
|up to 24 vCPU, up to 256 GB RAM

|HEAVY aggregates for high-load services with Intel(R) Xeon(R) Platinum 8380 CPU (Intel Ice Lake) processor
|\~3 GHz
|up to 64 vCPU, from 64 to 512 GB RAM

|Dedicated host with a hypervisor and Intel(R) Xeon(R) Platinum 8380 CPU (Intel Ice Lake) processor
| ![](/en/assets/no.svg "inline")
|up to 148 vCPU, up to 2 TB RAM

|===

Components available for testing on dedicated resources:

* compute processors;
* random access memory;
* disk subsystem;
* networks.

## {heading(Testing procedure)[id=test_order]}

1. Contact technical support or the customer success manager from VK Cloud with a request to allocate the necessary resources for testing.
1. Prepare the testing infrastructure in the VK Cloud management console (create a test VM, configure the network, connect the required services).
1. Perform testing of the required components.
1. Record the testing results so that you can then compare them with the performance of other cloud platforms.

    {note:warn}

    To make the performance comparison objective, use the same testing methodologies on all platforms of interest.

    {/note}

1. Delete the resources created during testing if they are no longer needed.