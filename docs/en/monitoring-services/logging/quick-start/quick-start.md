1. Connect the service: if the service is in beta testing, send a request to [technical support](/en/contacts).
1. [Create a VM](/en/computing/iaas/service-management/vm/vm-create) from a public Linux image with the internet access. The example below uses the Ubuntu 22.04 image.
1. [Connect to the VM via SSH](/en/computing/iaas/service-management/vm/vm-connect/vm-connect-nix).
1. Install [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) version 2.1.9 on the VM:

   ```bash
   curl https://cloudlogging.hb.bizmrg.com/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```

1. [Generate](../service-management/generate-userdata/) credentials for connecting to the service.
1. [Install and configure](../service-management/connect-plugin/) the `vkcloudlogs-fluent-bit-plugin` plugin.
