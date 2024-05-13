You can deploy repositories of libraries and artifacts used in modular development using the [Nexus 3](https://msk.cloud.vk.com/app/en/services/marketplace/v2/apps/service/73f3ac8a-5c6e-4ced-a2e3-6ed6caed0fb0/latest/info/) service. This instruction will help you deploy the Nexus 3 service on a VM in VK Cloud, log into the service console and create a new user.

By using the Nexus 3 service, you agree to the license agreements of the [Marketplace](/ru/additionals/start/legal/marketplace "change-lang") and [Sonatype](https://sonatype.ru/prices) services.

To deploy the Nexus service in a project:

1. [Register](/en/additionals/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/operations/manage-net#creating_a_network) a network with Internet access, if one has not been created earlier.
1. In the [settings of the subnet](/en/networks/vnet/operations/manage-net#editing_a_subnet) where the VM with the deployed service will be located, disable the **Private DNS** option.
1. [Deploy](../../service-management/pr-instance-add/) Nexus 3 service:

   - Select the previously created network with Internet access and subnet. The external IP address will be assigned automatically.
   - Choose the other parameters at your discretion.

   After the installation is complete, you will receive a one-time link to the Nexus 3 console (`nexus_url`) and a password (`password`). The service will be deployed at the address like `https://nexus-<ID>.xaas.msk.vkcs.cloud`.

1. Go to the Nexus 3 console.
1. Click the **Sign in** button.
1. In the window that opens, enter the username `admin` and the password `admin_password` received by mail.
1. (Optional) Go through the checklist from the [official documentation](https://help.sonatype.com/repomanager3/installation-and-upgrades/post-install-checklist).

<info>

For the extended configuration of the service, use the official [Sonatype Nexus Repository 3 instructions](https://help.sonatype.com/repomanager3).

</info>
