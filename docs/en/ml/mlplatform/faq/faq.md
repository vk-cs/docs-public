
{cut(Contact support)}

When contacting support, be sure to include your Cloud ML Platform instance ID. The instance ID can be found under ML Platform -> Instances -> Instance Name.

Clicking on the instance name will open the instance information page. On the "ID" line, you can copy the instance ID by clicking the "Copy" icon.

{/cut}

{cut(Actions to take when a JupyterHub instance is unavailable)}

In case the JupyterHub interface stops responding, you should reboot the JupyterHub VM instance.

To restart the VM

1. Go to the **Cloud Servers** -> **Virtual Machines** section.
2. Click ![ ](/en/assets/more-icon.svg "inline") for the JupyterHub VM instance and select **Restart**.

You can learn more about managing VM instances in ["Starting, Stopping, and Restarting a VM"](../../../computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm).

{/cut}

{cut(Fix issues with Jupyter Kernel)}

The Jupyter Kernel needs to be restarted after installing the libraries or if it hangs. To restart the Kernel, in the JupyterHub interface, select the menu item "Kernel" -> "Restart Kernel".

You can learn more about connecting to the JupyterHub interface in the article [“Connecting to JupyterHub”](../jupyterhub/instructions/connect).

{/cut}
