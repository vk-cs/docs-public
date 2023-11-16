1. Connect the service: if the service is in beta testing, send a request to [technical support](/en/contacts).
1. Create a VM from a public Linux image with internet access. The example uses an Ubuntu 18.04 image.
1. [Connect to the VM via SSH](/en/base/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Install on VM:

   - [Go not lower than version 1.17](https://go.dev/doc/install):

     ```bash
     wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz
     tar -xzf go1.17.6.linux-amd64.tar.gz
     export PATH=$PWD/go/bin:$PATH
     ```

   - Git:

     ```bash
     sudo apt install git
     ```

   - [Fluent-bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu):

     ```bash
     sudo apt install ca-certificates
     sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
     Build-essential
     sudo apt install build-essential
     ```

1. Generate credentials to connect to the service:

   1. [Go](https://mcs.mail.ru/app/en) to VK Cloud personal account.
   1. Go to **Monitoring** → **Logging**.
   1. Click to the **Settings** button.
   1. Go to the **User credential generation** tab.
   1. Click the **Generate** button.
   1. Save the received credentials.

1. [Connect](../instructions/connect-plugin/) the `cloudlogs-fluent-bit` plugin.
