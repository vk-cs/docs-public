A quick start will help you get started with the service and get acquainted with its capabilities.

After completing all the quick start steps, you will:

1. Set up Internet access.
1. Organize the basic network connectivity of several virtual machines.
1. Learn how to assign groups of firewall rules.

## Step 1: Create a network and subnet

1. Go to VK Cloud [management console](https://msk.cloud.vk.com/app/en).
1. Select the project.
1. Go to **Virtual networks** → **Networks**.
1. Click the **Create** button.
1. Specify a network name, for example, `test-network`.
1. SDN: `Sprut` (default).
1. Internet access: included.
1. Router: `Create new`.
1. Click **Add network**.

## Step 2: Create some virtual machines

Create a virtual machine with Internet access:

1. Go to [management console](https://msk.cloud.vk.com/app/) VK Cloud.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. At the **Configuration** step:

    1. Name the virtual machine, for example `test-vm1`.
    1. Set other settings depending on your requirements or leave them unchanged.

1. Press **Next step**.
1. At the **Network settings** step:

     1. Networks: `External network (internet)`.
     1. Leave the rest of the settings unchanged.

1. Press **Next step**.
1. At the **Backup settings** step, leave the settings unchanged.
1. Click **Create Instance**.

The creation of the virtual machine may take some time, after which it will appear in the list.

Create a second virtual machine:

1. Go to [management console](https://msk.cloud.vk.com/app/) VK Cloud.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. At the **Configuration** step:

     1. Give the virtual machine a name, for example `test-vm2`.
     1. Set other settings depending on your requirements or leave them unchanged.

1. At the **Network settings** step:

     1. Networks: `test-network`.
     2. Virtual machine key: `Create a new key`.
     3. Firewall settings: `default`, `ssh`.
     4. Assign an external IP address: disable.

2. Press **Next step**.
3. At the **Backup settings** step, leave the settings unchanged.
4. Click **Create Instance**.

A file with a virtual machine key will be downloaded to your computer.

Create a third virtual machine:

1. Go to [management console](https://msk.cloud.vk.com/app/) VK Cloud.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click the **Add** button.
1. At the «Configuration» step:

     1. Name the virtual machine, for example `test-vm3`.
     1. Set other settings depending on your requirements or leave them unchanged.

1. At the **Network settings** step:

    1. Networks: `test-network`.
    1. Virtual machine key: `Create a new key`.
    1. Firewall settings: `default`, `ssh`.
    1. Assign an external IP address: disable.

1. Press **Next step**.
1. At the **Backup settings** step, leave the settings unchanged.
1. Click **Create Instance**.

Wait for the creation of the virtual machine to complete.

## Step 3: Create a rule group

1. Click **Add**.
1. Specify a rule group name, for example, `test-icmp`.
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

1. Go to [management console](https://msk.cloud.vk.com/app/) VK Cloud.
1. Go to **Cloud Servers** → **Virtual Machines**.
1. Click ![ ](/en/assets/more-icon.svg "inline") for the virtual machine and select **Firewall Settings**.
1. Find the rule group created in step 3 in the list.
1. Click **Apply** in the line with the rule group.
1. Press **Confirm**.

{note:info}

Successful completion of this step ensures that ICMP connectivity exists between the created VMs. Network connectivity will work even if one VM in the assigned rule group does not have a floating IP address.

{/note}

## Step 4. Connect to the VM via ssh

In the last step, you created a virtual machine key that was saved to your computer. Find the file in downloads, you will need it to connect to the VM.

1. Open a terminal.
1. Go to downloads:

    ```console
    cd ~/Downloads/
    ```

1. Make the key available only to the current user:

     ```console
     chmod 400 <PATH_TO_KEY>
     ```

1. Connect to the instance via SSH:

     ```console
     ssh -i <PATH_TO_KEY> <USERNAME>@<FLOATING_IP>
     ```

## Step 5: Delete unused resources

If you no longer need the resources you created, delete them.
