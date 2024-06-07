You can visualize data from various sources (databases, Google Sheets), as well as build interactive reports using the [Redash](https://msk.cloud.vk.com/app/en/services/marketplace/v2/apps/service/7ee4cc28-6b2b-4595-b119-89c718af9e8b/latest/info/) service. This instruction will help you deploy the Redash 10.1.0 service on a VM in VK Cloud, log into the service console and create a new user.

By using the Redash 10.1.0, you agree to the license agreements of the [Marketplace](/ru/intro/start/legal/marketplace "change-lang") and [Redash](https://redash.io/terms) services.

To deploy the Redash 10 service in a project:

1. [Register](/en/intro/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/service-management/net#creating_a_network) a network with Internet access, if one has not been created earlier.
1. In the [settings of the subnet](/en/networks/vnet/service-management/net#editing_a_subnet) where the VM with the deployed service will be located, disable the **Private DNS** option.
1. [Deploy](../../service-management/pr-instance-add/) Redash 10 service:

   - Select the previously created network with Internet access and subnet. The external IP address will be assigned automatically.
   - Choose the other parameters at your discretion.

   After the installation is completed, a one-time link with access will be sent to your email.

1. Follow the link from the email.
1. Save the data to access Redash, including `redash_url` — has the `https://redash-<ID>.xaas.msk.vkcs.cloud` format.

   <info>

   If you have not saved the access data, [generate](../../service-management/pr-instance-manage#updating_access_to_a_service_instance) new ones.

   </info>

1. Go to the Redash console using the link from `redash_url`.
1. In the administrator registration data window that opens, and click the **Setup** button.
1. (Optional) Go through the [getting started guide](https://redash.io/help/user-guide/getting-started). If necessary, review the [official Redash documentation](https://redash.io/help/).
