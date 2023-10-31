To install monitoring in an existing Linux VM:

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Go to **Cloud computing** → **Virtual machines**.
1. Open the VM page by clicking on its name in the general list.
1. On the **General information** tab, under the main VM information, go to the **Configuring monitoring** tab.
1. Copy the command that appears.
1. [Connect](/en/base/iaas/instructions/vm/vm-connect/) to the virtual machine.
1. On the connected VM, run the command copied in step 5.

The monitoring agent will be installed and will start every time the VM starts.

<info>

Metrics for this VM can be found by the label `host` with the value `hostname` of the VM.

</info>
