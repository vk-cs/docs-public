To ensure your services are available worldwide, you can select the region of the VK Cloud Services infrastructure. Each region is a geographic area that combines local data processing centers. Each data center within the region consists of its availability zone, isolated from each other to increase the system's fault tolerance.

You can independently choose the area of ​​location, disks, and other services of your users.

## Regional management in the Personal Account

When creating a project, the MSK is the default region. To change the region, in the Personal Cabinet header, click on the name of the current region and select the desired region from the drop-down list.

> **Important:** <br> Within one project, resources can be created in different regions. However, to ensure fault tolerance, the resources from different regions are not associated. If there were no resources in the current region, they would not appear in the interface.

## Services and restrictions

### Availability of services in the region

Depending on the region, the list of available services may vary. Information about available services is displayed on the left, in the service menu in the Personal Account.

### Restrictions

To ensure network connection between regions, you must use VPN or organize an Internet connection. At the moment, users cannot combine virtual networks of different regions.

## Prices, billing, and quotas

### Prices

Depending on the region, tariffs may change. To get price information, select the region and click **User -> Project Settings -> Prices**.

### Billing

The billing page is one for all regions. You can learn more about the Billing section in [Billing] (https://mcs.mail.ru/docs/ru/main/additionals/billing).

### quotas

Depending on the region, the project quota may differ. To get information about available quotas, select the region and click **User -> Quota Management**. You can find more information about the quota section in the article [quotas] (https://mcs.mail.ru/docs/ru/additionals/start/user-account/quota-limits). To increase quotas [contact our support] (https://help.devmcs.ru/docs/en/contacts).

## Interfaces

- **CLI**

You can use the CLI to manage resources in any of the regions.

The resource region is determined by the settings specified in the OpenRC file. To use the CLI in each region, you must receive your OpenRC configuration file.

To get the OpenRC configuration file, select the region and click [** User -> Project Settings -> Key API -> Download OpenRC version 3 **] (https://mcs.mail.ru/app/project/keys/).

You can learn more about CLI configuration in [CLI section of the control interfaces] (https://mcs.mail.ru/docs/ru/additionals/start/user-Account/mgmt-Interfaces#CLI).

- **API**

You can use the API to manage resources in any of the regions. To connect to the API in each region, individual endpoints are necessary. You can learn more about working with OpenStack API in [API section of the control interfaces] (https://mcs.mail.ru/docs/ru/additionals/start/user-account/mgmt-interfaces#api).

To obtain a list of endpoints of the selected region, click **User -> Project Settings -> API EndPoints**.

- **Terraform**

You can use Terraform to create and configure resources in any region.

For each region there is a configuration file. To get the Terraform configuration file, select the region and click **User -> Project Settings -> Terraform -> Download file** Terraform configuration.

Learn more about Terraform, you can learn in [Terraform section of the Control Interfaces article] (https://mcs.mail.ru/docs/ru/additionals/start/user-account/mgmt-interfaces#terraform).
