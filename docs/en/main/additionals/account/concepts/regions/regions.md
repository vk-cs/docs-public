To make your services available all over the world, it is possible to select the region where the VK Cloud Services infrastructure is located. Each region is a geographic area that includes local data centers. Each data center within the region consists in its own availability zone, isolated from each other to increase the fault tolerance of the system.

You have the opportunity to independently choose the region where the capacities, disks and other services of your users are located.

## Manage regions in your account

When creating a project, the Moscow region is selected by default. To change the region, in the header of your personal account, click on the name of the current region and select the desired region from the drop-down list.

<warn>

Within the same project, resources can be created in different regions. To ensure fault tolerance, resources from different regions are not linked to each other. If no resources were previously created in the current region, they will not be displayed in the interface.

</warn>

## Services and restrictions

### Availability of services in the region

Depending on the region, the list of available services may vary. Information about available services is displayed on the left, in the services menu in your personal account.

### Restrictions

To ensure network connectivity between regions, you must use a VPN, or organize connectivity over the Internet. At the moment, virtual networks of different regions cannot be combined.

## Prices, billing and quotas

### Prices

Rates may vary depending on the region. To get pricing information, select a region and click "User -> Project Settings -> Prices".

### Billing

The Billing page is the same for all regions. You can learn more in the article [“Billing”](/ru/main/additionals/billing).

### Quotas

Depending on the region, project quotas may differ. To get information about available quotas, select a region and click "User -> Manage Quotas". For more information about the Quotas section, see the article [Quotas](/ru/additionals/start/user-account/quota-limits). To increase quotas [contact our support](/en/contacts).

## Interfaces

<tabs>
<tablist>
<tab>CLI</tab>
<tab>API</tab>
<tab>Terraform</tab>
</tablist>
<tabpanel>

- **CLI**

You can use the CLI to manage resources in any of the regions.

The resource region is determined by the settings specified in the openrc file. To use the CLI in each region, you need to get your own openrc configuration file.

To get the openrc configuration file, select the region and click ["User -> Project Settings -> API Keys -> Download openrc version 3"](https://mcs.mail.ru/app/project/keys/).

You can learn more about setting up the CLI in the [CLI section of the Management Interfaces article](/ru/additionals/start/user-account/mgmt-interfaces#cli).

</tabpanel>
<tabpanel>

- **API**

You can use the API to manage resources in any of the regions. To access the API in each region, you must use separate endpoints. You can learn more about working with the OpenStack API in the [API section of the Management Interfaces article](/ru/additionals/start/user-account/mgmt-interfaces#api) .

To get a list of endpoints for the selected region, click "User -> Project Settings -> API Endpoints".

</tabpanel>
<tabpanel>

- **Terraform**

You can use Terraform to create and customize resources in any of the regions.

Each region has its own configuration file. To get the Terraform configuration file, select a region and click "User -> Project Settings -> Terraform -> Download File" of the Terraform configuration.

More information about setting up Terraform can be found in the [Terraform section of the Management Interfaces article](/ru/additionals/start/user-account/mgmt-interfaces#terraform).

</tabpanel>
</tabs>
