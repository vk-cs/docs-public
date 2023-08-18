A region is a geographical area that unites [availability zones](/en/additionals/start/it-security/platform-security#availability_zones). Each availability zone has one or more data processing centers (data centers) where cloud infrastructure objects are physically located.

The region is assigned to each [project](../projects) automatically and depends on the URL of the site where the project owner [registered](/en/additionals/start/get-started/account-registration) account.

You can create objects (for example, virtual machines) only in the availability zone of the region in which the project was created.

<warn>

All regions have a single user base. It is not possible to register accounts with the same mail in different regions.

</warn>

The following regions are available:

|            | Moscow             | Kazakhstan              |
|-------------------------------|--------------------|------------------------|
| Site URL | https://mcs.mail.ru | https://vkcloud.kz, https://kz.mcs.mail.ru |
| Availability zones             | MS1 (KO1), GZ1 | QAZ |
| Project currency               | Rubles               | Tenge |

Projects created in different regions have different:

- a set of available services;
- set of [quotas](../../concepts/quotasandlimits);
- addresses of [VK Cloud API endpoints](/en/manage/tools-for-using-services/rest-api);
- the name of the region in the configuration files [openrc](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) and [Terraform](/en/manage/tools-for-using-services/terraform/quick-start).

<warn>

It is not possible to combine virtual networks of projects from different regions using standard methods. Network connectivity between such projects can be configured using [VPN tunnel](/en/networks/vnet/use-cases/vpn-tunnel).

</warn>
