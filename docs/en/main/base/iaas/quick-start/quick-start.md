Using VK Cloud Servers, a Linux virtual machine (VM) will be created in the VK Cloud personal account and connected to it.

A quick start will help you get started with the service and get acquainted with its capabilities.

After going through all the steps of a quick start, you will:

1. Create a new virtual machine (VM).
2. Connect to the created VM via SSH.

<info>

A running VM consumes computing resources.

After passing the quick start, stop or delete the VM if you no longer need it.

</info>

## 1. Preparatory steps

1. [Register](../../../additionals/account/start/registration) on the VK Cloud platform.
2. [Activate](../../../additionals/account/start/activation) the services.

The account balance should be positive, and [quotas](../../../additionals/account/concepts/quotasandlimits) should be enough to create the target configuration of the virtual machine.

## 2. Create a VM

1. Go to [personal account](https://mcs.mail.ru/app/en) VK Cloud.
2. Go to **Cloud Computing → Virtual machines**.
3. Click the  **Create instance** or **Add** button.
4. In the field **Operating system** choose `Ubuntu 22.04`.
5. Click the **Next step** button.
6. In the field **Network** choose `External network (ext-net)`.

   An external IP address will be automatically assigned to the virtual machine on the external network.

7. In the field **Virtual machine key** choose `Create a new key`.
8. In the field **Firewall settings** choose `Only ssh is allowed`.
9. Click the **Next step** and **Create instance** buttons.

<warn>

Do not close the page until the VM creation process is complete.

</warn>

10. Save the suggested key file `.pem`.
11. Wait until the virtual machine creation process is completed and the page of the new VM based on Ubuntu 22.04 opens.

## 3. Wait for the VM configuration to complete

After the VM is successfully created, wait at least 10-15 minutes. During this period, the operating system is deployed to the VM disk, and system tools are also working to configure the virtual machine in accordance with the specified parameters.

## 4. Connect to the VM

You can connect to a Linux-based virtual machine created from an Ubuntu image via SSH.

<tabs>
<tablist>
<tab>Linux/macOS</tab>
<tab>Windows 10/11</tab>
<tab>Windows 7/8</tab>
</tablist>
<tabpanel>

Run the command in the terminal:

```shell
ssh -i <the path to the key> ubuntu@<external IP address of the virtual machine>
```

For example:

```shell
ssh -i ubuntu-key.pem ubuntu@213.219.212.130
```

The external IP address of the VM can be viewed in VK Cloud [personal account](https://mcs.mail.ru/app/) to **Cloud Computing → Virtual machines**.

The first time you connect to the VM, you will be asked to confirm the connection to a previously unknown host:

```shell
The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
Are you sure you want to continue connecting (yes/no)?
 ```

Type `yes` in the terminal and press _Enter_.

</tabpanel>
<tabpanel>

Run the command in the terminal:

```shell
ssh -i <the path to the key> ubuntu@<external IP address of the virtual machine>
```

For example:

```shell
ssh -i ubuntu-key.pem ubuntu@213.219.212.130
```

The external IP address of the VM can be viewed in VK Cloud [personal account](https://mcs.mail.ru/app/) to **Cloud Computing → Virtual machines**.

The first time you connect to the VM, you will be asked to confirm the connection to a previously unknown host:

```shell
The authenticity of host '213.219.212.130 (213.219.212.130)' can't be established.
ECDSA key fingerprint is SHA256:aYZIWs9N6KRtfFOuic6eoWcluhSp6+jha/DSBgd9McI.
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` in the terminal and press _Enter_.

</tabpanel>
<tabpanel>

In Windows 7/8, use the PuTTY application to connect via SSH.

1. [Install](https://www.putty.org/) PuTTY.
2. Launch the PuTTYgen app that comes with the package:

   1. In the **Conversions** menu choose **Import Key** and specify the available key `.pem`.
   2. Click the **Save private key** button, select the directory and specify the desired key name `.ppk`.

3. Launch the Pageant app that comes with the package:

   1. Right-click on the Pageant icon on the taskbar.
   2. In the context menu, select **Add key**.
   3. Select the generated private key in the format `.ppk`.

4. Run PuTTY:

   1. In the field **Host Name (or IP address)** enter the external IP address of the VM. Specify the port `22` and the connection type `SSH`.

   <info>

   The external IP address of the VM can be viewed in VK Cloud [personal account](https://mcs.mail.ru/app/) to **Cloud Computing → Virtual machines**.

   </info>

   2. In the tree on the left, go to the category **Connection → SSH → Auth**.
   3. Set the flag **Allow agent forwarding**.
   4. Open the item in the tree on the left **Auth → Credentials**.
   5. In the field **Private key file for authentication** select the `.ppk` file with the private key.
   6. Click the **Open** button.

      If this is the first connection to the VM, confirm it in the window that appears.

   7. In the terminal window that appears, enter your login `ubuntu`.

      If everything is configured correctly, a connection to the server will be established.

</tabpanel>
</tabs>

## Monitor the use of resources

A running VM consumes computing resources. If you don't need it anymore:

- [stop](../instructions/vm/vm-manage#starting_stopping_reboot_the_vm) it to use it later;
- [delete](../instructions/vm/vm-manage#deleting_a_vm) it.
