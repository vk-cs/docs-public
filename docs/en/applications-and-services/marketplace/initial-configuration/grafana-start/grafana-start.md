You can visualize resource monitoring data using the [Grafana](https://msk.cloud.vk.com/app/en/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info/) service.

This instruction will help you deploy the Grafana 10 service on a VM in VK Cloud, sign in to the service console and create a new user.

By using the Grafana service, you agree to the license agreements of the services [Marketplace](/ru/intro/start/legal/marketplace "change-lang") and [Grafana Labs](https://grafana.com/legal/grafana-labs-license/).

To deploy the Grafana service in a project:

1. [Register](/en/intro/start/account-registration) at VK Cloud.
1. [Create](/en/networks/vnet/service-management/net#creating_a_network) a network, if one has not been created earlier.
1. In the [settings of the subnet](/en/networks/vnet/service-management/net#editing_a_subnet) where the VM with the deployed service will be located, disable the **Private DNS** option.
1. [Deploy](../../service-management/pr-instance-add/) Grafana service:

   - **Как будет размещена Grafana**: specify the `external` access type to Grafana to have access to the service via an external IP address.
   - **Резервное копирование**: select the `no` option to not copy the service data. With the `yes` option, data for the last 7 days is saved to the [Cloud Storage](/en/storage/s3).
   - **Сеть**: select the previously created network and subnet.

   Specify the other parameters at your discretion.

   Wait for the installation to complete and a one-time link will be sent to your email with a URL and password. The service will be deployed at the address `https://grafana-<ID>.xaas.msk.vkcs.cloud` (Grafana console).

1. Use the `grafana_url` link from the email to go to the Grafana console.
1. Click the **Sign in** button.
1. In the window appears, enter the username `admin` and the password `admin`.
1. Enter a new password.
1. (Optional) Create a dashboard according to the [official documentation](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard/).

<info>

For advanced configuration of the service, use the official [Grafana](https://grafana.com/docs/grafana/v10.0/) instructions.

</info>
