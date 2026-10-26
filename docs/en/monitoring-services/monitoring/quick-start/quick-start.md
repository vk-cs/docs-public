Using Cloud Monitoring in the VK Cloud management console, you will create a Linux virtual machine (VM) and set up metric collection for it with visualization in the interface.

The quick start will help you get started with the service and learn about its capabilities.

After completing all the steps of the quick start, you will:

- Create a new virtual machine (VM).
- Connect monitoring to the VM.
- Create a new graph for it.

## Preparatory steps

1. When [creating a VM](/en/computing/iaas/instructions/vm/vm-create), enable the **Enable monitoring** option.
1. Wait for the VM creation to complete.
1. [Find out](/en/computing/iaas/instructions/vm/vm-manage) the ID of the created virtual machine.
1. Wait some time for monitoring data to accumulate.

## 1. Create a graph

1. Go to the **Monitoring → Dashboards** section.
1. Click the **Add graph** button.
1. At the **Graph configuration** step, select:

   - **Graph title**: specify the graph name, for example, `cpu-monitoring`.
   - **Resource type**: select the **Virtual machine** option.
   - **Chart type**: select the **Line** option.

1. Click the **Next step** button.
1. At the **Parameters** step, select:

   - **Metric name**: select `cpu_usage`.
   - **Grouping**: select the `vm_uuid` field.
   - **Aggregation function**: arithmetic mean.

1. Click the **Create graph** button.

If configured correctly, values for the created VM will appear on the graph.

## 2. Monitor the metric collection

1. Wait some time for monitoring data to accumulate.
1. Refresh the page. Data for the new period should appear.

## Delete unused resources

A running VM consumes computing resources. If you no longer need it:

- [stop](/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart) it to use it later;
- [delete](/en/computing/iaas/instructions/vm/vm-manage#delete_vm) it permanently.
