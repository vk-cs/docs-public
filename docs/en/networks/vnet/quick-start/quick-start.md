A quick start will help you get started with the service and get acquainted with its capabilities.

After completing all the quick start steps, you will:

1. Set up Internet access.
1. Organize the basic network connectivity of several virtual machines.
1. Learn how to assign security group rules.

## Step 1: Create networks and subnets

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Create a network with internet access:

    1. Click the **Create** button.
    1. Specify a network name, for example, `test-network`.
    1. Select [SDN](/ru/networks/vnet/concepts/sdn "change-lang"): `Sprut` (default). The option is unavailable if your project has only one SDN.
    1. Enable the **Internet access** option.
    1. In the **Router** dropdown select `Create new`.
    1. Click **Add network**.
1. Create a network without internet access:
    1. Click the **Create** button.
    1. Specify a network name, for example, `test-network-2`.
    1. Select [SDN](/ru/networks/vnet/concepts/sdn "change-lang"): `Sprut` (default). The option is unavailable if your project has only one SDN.
    1. Disable the **Internet access** option.
    1. In the **Router** dropdown select `Create new`.
    1. Click **Add network**.

## Step 2: Create multiple virtual machines

Create a VM with internet access and 3 VMs without internet access.

{tabs}

{tab(test-vm1)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. In the **Configuration** box set VM parameters depending on your requirements.
1. In the **General information** box specify:

    - **Name of virtual machine**: `test-vm1`.
    - **Tags**: if needed, [assign a tag](/en/computing/iaas/instructions/vm/vm-manage#assigning_tags) or create a new one.
    - **Configure scripts on VM startup**: enable the option to add a  bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) which will be executed at VM startup.
1. In the **Disk size and speed** box select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** box specify:

     - **Network**: `External network (internet)`.
     - **Virtual machine key**: `Create a new key`.
     - **Firewall settings**: add `default` and `ssh` security groups.

1. In the **Backup** box, disable backup.
1. Click **Create**.

{/tab}

{tab(test-vm2)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. In the **Configuration** box set VM parameters depending on your requirements.
1. In the **General information** box specify:

    - **Name of virtual machine**: `test-vm2`.
    - **Tags**: if needed, [assign a tag](/en/computing/iaas/instructions/vm/vm-manage#assigning_tags) or create a new one.
    - **Configure scripts on VM startup**: enable the option to add a  bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) which will be executed at VM startup.
1. In the **Disk size and speed** box select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** box specify:

     - **Network**: `test-network`.
     - **Virtual machine key**: `Create a new key`.
     - **Firewall settings**: add `default` and `ssh` security groups.
     - **Assign external IP**: enabled.

1. In the **Backup** box, disable backup.
1. Click **Create**.

{/tab}

{tab(test-vm3)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. In the **Configuration** box set VM parameters depending on your requirements.
1. In the **General information** box specify:

    - **Name of virtual machine**: `test-vm3`.
    - **Tags**: if needed, [assign a tag](/en/computing/iaas/instructions/vm/vm-manage#assigning_tags) or create a new one.
    - **Configure scripts on VM startup**: enable the option to add a  bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) which will be executed at VM startup.
1. In the **Disk size and speed** box select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** box specify:

     - **Network**: `test-network`.
     - **Virtual machine key**: `Create a new key`.
     - **Firewall settings**: add `default` and `ssh` security groups.
     - **Assign external IP**: disabled.

1. In the **Backup** box, disable backup.
1. Click **Create**.

{/tab}

{tab(test-vm4)}

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. In the **Configuration** box set VM parameters depending on your requirements.
1. In the **General information** box specify:

    - **Name of virtual machine**: `test-vm4`.
    - **Tags**: if needed, [assign a tag](/en/computing/iaas/instructions/vm/vm-manage#assigning_tags) or create a new one.
    - **Configure scripts on VM startup**: enable the option to add a  bash script or a [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) which will be executed at VM startup.
1. In the **Disk size and speed** box select the appropriate disk type and specify its size.
1. In the **Network and firewall settings** box specify:

     - **Network**: `test-network-2`.
     - **Virtual machine key**: `Create a new key`.
     - **Firewall settings**: add `default` and `ssh` security groups.
     - **Assign external IP**: disabled.

1. In the **Backup** box, disable backup.
1. Click **Create**.

{/tab}

{/tabs}

Wait for the creation of the virtual machines to complete. Files with virtual machine keys will be downloaded to your computer.

## Step 3: Create a rule group

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Networks** → **Firewall Settings**.
1. Click **Add**.
1. Specify a rule group name, for example, `test-icmp`.
1. Select [SDN](/ru/networks/vnet/concepts/sdn "change-lang"): `Sprut` (default). The option is unavailable if your project has only one SDN.
1. Click **Create Group**.
1. In the **Incoming traffic** block, create rules for traffic management:

     1. Click **Add Rule**.
     1. Type: `ICMP`.
     1. Remote address: `All IP addresses`.

1. Click the **Save Rule** button.
1. In the **Outgoing traffic** block, create rules for traffic management:

     1. Click **Add Rule**.
     1. Type: `ICMP`.
     1. Remote address: `All IP addresses`.

1. Click the **Save Rule** button.

## Step 4. Assign a rule group

To send and receive traffic, assign a security group to the VM. For previously created VMs, apply the following settings:

1. [Go to](https://msk.cloud.vk.com/app) VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the virtual machine and select **Firewall Settings**.
1. Find the rule group created in step 3 in the list.
1. Click **Apply** in the line with the rule group.
1. Press **Confirm**.

{note:info}

Successful completion of this step ensures that ICMP connectivity exists between the created VMs. Network connectivity will work even if one VM in the assigned rule group does not have a floating IP address.

{/note}

## Step 5: Check network connectivity between VMs

1. [Go to](https://msk.cloud.vk.com/app/) to VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. For each of the VMs in the `internet` and `test-network` networks, perform the following steps:

   {tabs}

   {tab(test-vm1)}

   1. Open the `test-vm1` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM2_IP_ADDRESS>` command. Verify that packets are being sent successfully.

   {/tab}

   {tab(test-vm2)}

   1. Open the `test-vm2` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM3_IP_ADDRESS>` command. Verify that packets are being sent successfully.

   {/tab}

   {tab(test-vm3)}

   1. Open the `test-vm3` VM page by clicking its name in the list.
   1. Go to the **Console** tab.
   1. Log in to the VM.
   1. Run the `ping <TEST_VM2_IP_ADDRESS>` command. Verify that packets are being sent successfully.

   {/tab}

   {/tabs}

## Step 6: Check internet access

1. [Go to](https://msk.cloud.vk.com/app/) to VK Cloud management console.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Open the `test-vm4` VM page by clicking its name in the list.
1. Go to the **Console** tab.
1. Log in to the VM.
1. Ping an external internet resource using the command:

    ```console
    ping cloud.vk.com
    ```

   There is no internet connection, so no packet exchange occurs.

1. Go to **Cloud Networks** → **Routers**.
1. Find the router with the `test-network-2` network and click its name.
1. Click the **Edit router** button.
1. In the window that opens, enable the **External network connection** option.
1. Click the **Save** button.
1. Return to the `test-vm4` VM page.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click ![ ](/ru/assets/more-icon.svg "inline") for `test-vm4` and select **Reboot**.
1. Open the `test-vm4` VM page by clicking its name in the list.
1. Go to the **Console** tab.
1. Log in to the VM.
1. Ping an external internet resource using the command:

    ```console
    ping cloud.vk.com
    ```

   The internet connection is working correctly, so packet exchange occurs.

## Step 7. Connect to the VM via SSH

In the last step, you created a virtual machine key that was saved to your computer. Find the file in downloads, you will need it to connect to the VM.

1. Open a terminal.
1. Go to downloads:

    ```console
    cd ~/Downloads/
    ```

1. Make the key available only to the current user:

     ```console
     chmod 400 <PATH_TO_KEY_FOR_TEST-VM-2>
     ```

1. Connect to the instance via SSH:

     ```console
     ssh -i <PATH_TO_KEY> <USERNAME>@<FLOATING_IP>
     ```

## Delete unnecessary resources

If you no longer need the resources you created, delete them.
