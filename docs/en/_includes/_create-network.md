## {heading({counter(network)}. Create networks and subnets)[id=includes-create-network-network-create]}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Virtual networks** → **Networks**.
1. Create a network with internet access:

   1. Click the **Create** button.
   1. Set the network name: `test-network`.
   1. Select [SDN](/en/networks/vnet/concepts/sdn): `Sprut` (default). The setting is unavailable if only one SDN is connected to the project.
   1. Enable the **Internet access** option.
   1. From the **Router** list, select `Create new`.
   1. Click the **Add network** button.

1. Create a network without internet access:

   1. Click the **Create** button.
   1. Set the network name: `test-network-2`.
   1. Select [SDN](/en/networks/vnet/concepts/sdn): `Sprut` (default). The setting is unavailable if only one SDN is connected to the project.
   1. Disable the **Internet access** option.
   1. From the **Router** list, select `Create new`.
   1. Click the **Add network** button.

## {heading({counter(network)}. Create several virtual machines)[id=includes-create-network-vms-create]}

Create one VM with internet access and three VMs without internet access.

{tabs}

{tab(test-vm1)}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click the **Add** button.
1. In the **Configuration** block, set the VM parameters that match your requirements.
1. Fill in the **General information** block:

   - **Virtual machine name**: `test-vm1`.
   - Leave the other parameters unchanged.

1. In the **Disk size and speed** block, select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** block, set the following parameters:

   - **Network**: `External network (internet)`.
   - **Virtual machine key**: `Create a new key`.
   - **Firewall settings**: add the `default`, `ssh` security groups.
   - Leave the other settings unchanged.

1. Click the **Next step** button.
1. In the **Backup** block, disable backup.
1. Click the **Create** button.

{/tab}

{tab(test-vm2)}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click the **Add** button.
1. In the **Configuration** block, set the VM parameters that match your requirements.
1. Fill in the **General information** block:

   - **Virtual machine name**: `test-vm2`.
   - Leave the other parameters unchanged.

1. In the **Disk size and speed** block, select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** block, set the following parameters:

   - **Network**: `test-network`.
   - **Virtual machine key**: `Create a new key`.
   - **Firewall settings**: add the `default`, `ssh` security groups.
   - **Assign external IP**: enable the option.

1. Click the **Next step** button.
1. In the **Backup** block, disable backup.
1. Click the **Create** button.

{/tab}

{tab(test-vm3)}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click the **Add** button.
1. In the **Configuration** block, set the VM parameters that match your requirements.
1. Fill in the **General information** block:

   - **Virtual machine name**: `test-vm3`.
   - Leave the other parameters unchanged.

1. In the **Disk size and speed** block, select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** block, set the following parameters:

   - **Network**: `test-network`.
   - **Virtual machine key**: `Create a new key`.
   - **Firewall settings**: add the `default`, `ssh` security groups.
   - **Assign external IP**: disable the option.

1. Click the **Next step** button.
1. In the **Backup** block, disable backup.
1. Click the **Create** button.

{/tab}

{tab(test-vm4)}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click the **Add** button.
1. In the **Configuration** block, set the VM parameters that match your requirements.
1. Fill in the **General information** block:

   - **Virtual machine name**: `test-vm2`.
   - Leave the other parameters unchanged.

1. In the **Disk size and speed** block, select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** block, set the following parameters:

   - **Network**: `test-network-2`.
   - **Virtual machine key**: `Create a new key`.
   - **Firewall settings**: add the `default`, `ssh` security groups.
   - **Assign external IP**: enable the option.

1. Click the **Next step** button.
1. In the **Backup** block, disable backup.
1. Click the **Create** button.

{/tab}

{/tabs}

Creating the virtual machines may take some time, after which they will appear in the list. The SSH keys of the virtual machines will be downloaded to your computer.

## {heading({counter(network)}. Create a security group)[id=includes-create-network-sg-create]}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click the **Add** button.
1. Set the rule group name: `test-icmp`.
1. Select [SDN](/en/networks/vnet/concepts/sdn): `Sprut` (default). The setting is unavailable if only one SDN is connected to the project.
1. Click the **Create group** button.
1. In the **Inbound traffic** block, create rules to manage traffic:

   1. Click **Add rule**.
   1. Select type: `ICMP`.
   1. Select remote address: `All IP addresses`.

1. Click the **Save rule** button.
1. In the **Outbound traffic** block, create rules to manage traffic:

   1. Click **Add rule**.
   1. Select type: `ICMP`.
   1. Select remote address: `All IP addresses`.

1. Click the **Save rule** button.

## {heading({counter(network)}. Assign the security group)[id=includes-create-network-sg-assign]}

To send and receive traffic, assign a security group to the VM. Apply the following settings to the previously created VMs:

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the virtual machine and select **Firewall settings**.
1. Find the previously created security group in the list.
1. Click **Apply** in the row with the security group.
1. Click the **Confirm** button.

{note:info}
Assigning security groups guarantees ICMP connectivity between the created VMs. Network connectivity will work even if one of the VMs in the assigned security group does not have a Floating IP address.
{/note}

## {heading({counter(network)}. Check network connectivity between VMs)[id=includes-create-network-connection-check]}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. For each VM in the `internet` and `test-network` networks, perform the following actions:

   {tabs}

   {tab(test-vm1)}

   1. Open the `test-vm1` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM2_VM_IP_ADDRESS>` command. Make sure that the packets arrive successfully.

   {/tab}

   {tab(test-vm2)}

   1. Open the `test-vm2` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM3_VM_IP_ADDRESS>` command. Make sure that the packets arrive successfully.

   {/tab}

   {tab(test-vm3)}

   1. Open the `test-vm3` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM2_VM_IP_ADDRESS>` command. Make sure that the packets arrive successfully.

   {/tab}

   {/tabs}

## {heading({counter(network)}. Check internet access)[id=includes-create-network-internet-check]}

1. [Go to](https://msk.cloud.vk.com/app/) your {var(cloud)} management console.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Open the `test-vm4` VM page by clicking its name in the list.
1. Go to the **Console** tab.
1. Log in to the VM.
1. Ping an external resource on the internet using the command:

   ```console
   ping cloud.vk.com
   ```

   There is no internet connection, so packet exchange does not occur.

1. Go to **Virtual networks** → **Routers**.
1. Find the router with the `test-network-2` network and click its name.
1. Click the **Edit router** button.
1. In the window that opens, enable the **External network connection** option.
1. Click the **Save** button.
1. Return to the `test-vm4` VM page.
1. Go to **Cloud Computing** → **Virtual machines**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for `test-vm4` and select **Reboot**.
1. Open the `test-vm4` VM page by clicking its name in the list.
1. Go to the **Console** tab.
1. Log in to the VM.
1. Ping an external resource on the internet using the command:

   ```console
   ping cloud.vk.com
   ```

   The internet connection works correctly, so packet exchange occurs.

## {heading({counter(network)}. Connect to the VM via SSH)[id=includes-create-network-ssh-check]}

1. Open the terminal.
1. Go to the directory where the SSH keys for connecting to the created VMs were saved.
1. Make the key accessible only to the current user:

   ```console
   chmod 400 <PATH_TO_TEST_VM2_VM_KEY>
   ```

1. Connect to the `test-vm2` VM via the SSH protocol:

   ```console
   ssh -i <PATH_TO_KEY> <USERNAME>@<FLOATING_IP>
   ```

   Make sure there are no connection errors.

## {heading(Delete unused resources)[id=includes-create-network-delete]}

Running VMs consume computing resources. If you no longer need them:

- {linkto(/en/computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=delete]} the created VMs;
- {linkto(/en/networks/vnet/instructions/net#vnet-net-delete)[text=delete]} the `test-network` and `test-network-2` networks.
