
{include(/en/_includes/_translated_by_ai_en.md)}

The performance of RAM is determined by the number of read and write operations performed per second, as well as the amount of data transferred per second.

To test RAM performance, the [sysbench](https://github.com/akopytov/sysbench) utility will be used.

## Preparatory steps

{include(/en/_includes/_testing_preparatory.md)}

## 1. Run RAM testing

1. [Connect](/en/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) to the VM.
1. Install the sysbench utility on the VM:

    ```console
    sudo apt install sysbench
    ```

1. Start executing sequential read and write operations:

    ```console
    sysbench --test=memory run
    ```

## 2. Record the test results

Save the command output to a file. The most indicative parameters are:

* `Operations per second` — the number of read and write operations performed per second;
* `MiB transferred` — the amount of data transferred per second.

You can now compare this data with the performance of other cloud platforms.

{note:warn}

To make the performance comparison objective, use the same testing methodology on all platforms of interest.

{/note}

## Delete unused resources

The created resources are billed. If you no longer need them, delete them:

1. [Delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) the test VM.
1. Delete the [subnet](/en/networks/vnet/instructions/net#vnet-net-subnet-delete) and the [network](/en/networks/vnet/instructions/net#vnet-net-delete) in which the VM was hosted.