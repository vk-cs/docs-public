1. Connect the service: if the service is in beta testing, send a request to [technical support](/en/contacts).
1. Create a VM from a public Linux image with internet access. The example uses an Ubuntu 18.04 image.
1. [Connect to the VM via SSH](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Install on VM [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) 2.1.9 version:

   ```bash
   curl https://cloudlogging.hb.ru-msk.vkcs.cloud/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```

   <info>

   For AltLinux Server p10 install 1.9.5 version:

   ```bash
   sudo apt-get update
   sudo apt-get install fluent-bit  
   ```

   </info>

1. Generate credentials to connect to the service:

   1. [Go](https://msk.cloud.vk.com/app/en) to VK Cloud personal account.
   1. Go to **Monitoring** → **Logging**.
   1. Click to the **Settings** button.
   1. Go to the **User credential generation** tab.
   1. Click the **Generate** button.
   1. Save the received credentials.

1. [Connect](../instructions/connect-plugin/) the `vkcloudlogs-fluent-bit-plugin` plugin.
