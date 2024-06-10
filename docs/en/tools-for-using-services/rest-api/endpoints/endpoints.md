In your personal account, you can view the addresses of the available API endpoints. The list and addresses of endpoints differ between [regions](/en/tools-for-using-services/account/concepts/regions).

To work with VK Cloud via the API [activate API access](../enable-api). Read more about working with services in [API specification](/ru/tools-for-using-services/api "change-lang").

## Viewing the list of endpoints

The list is available to all users, regardless of their [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) if [services are activated](/en/tools-for-using-services/account/service-management/activation) in the project.

To see the list of endpoints for your region:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Click on the user name in the header of the page and select **Project settings**.
1. Go to **API endpoints** tab.

## Endpoints of the Moscow region

### Cloud Servers

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Nova              | https://infra.mail.ru:8774/v2.1                     | Managing [virtual machines](/en/base/iaas/service-management/vm) |
| Cinder            | https://public.infra.mail.ru:8776/v3/<project_id>   | Managing [disks](/en/base/iaas/service-management/volumes) and their snapshots |
| Glance            | https://infra.mail.ru:9292                          | Managing [VM images](/en/base/iaas/service-management/images) |
| Karboii           | https://mcs.mail.ru/infra/karboii/v1                | Managing [backups](/en/storage/backups/api-examples) of VMs and database instances |
| Manila            | https://public.infra.mail.ru:8786/v2/<project_id>   | Managing [file shares](/en/base/iaas/service-management/fs-manage) |

<info>

The Cloudlogs endpoint (https://mcs.mail.ru/cloudlogs/v1/logs) that is not shown in the personal account allows [viewing VM logs](/en/monitoring-services/logging/service-management/view-logs).

</info>

<details><summary>Other endpoints</summary>

### Cloud Containers

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Magnum            | https://infra.mail.ru:9511/v1                       | Managing [Cloud Containers](/en/kubernetes/k8s) |
| Magnum-addons     | https://mcs.mail.ru/infra/container/addons          | Managing Cloud Containers [addons](/en/kubernetes/k8s/service-management/addons) |

### Cloud Networks

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Neutron           | https://infra.mail.ru:9696                          | Managing all [network infrastructure](/en/networks/vnet) objects, except public DNS zones and load balancers |
| Octavia           | https://public.infra.mail.ru:9876                   | Managing [load balancers](/en/networks/balancing/service-management) |
| Publicdns         | https://mcs.mail.ru/public-dns                      | Managing [public DNS zones](/en/networks/dns/publicdns) |

### Cloud Big Data

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Sahara            | https://infra.mail.ru:8386/v1.1/<project_id>        | Managing [Cloud Big Data](/en/bigdata/hortonworks/bigdata-integrate/bigdata-api) clusters |

### Cloud Databases

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Trove             | https://infra.mail.ru:8779/v1.0/<project_id>        | Managing [databases](/en/dbs/dbaas) |

### Cloud Storage

| Endpoint                            | Address                          | Purpose |
|-------------------------------------|----------------------------------|--|
| S3 domain                 | https://hb.ru-msk.vkcs.cloud/    | Managing [Cloud storage](/en/storage/s3) |


### Cloud ML Platform

| Endpoint                              | Address                     | Purpose |
|---------------------------------------|---------------------------| -----------------|
| Mlplatform | https://msk.cloud.vk.com/infra/mlplatform   | Managing [Cloud ML Platform](/en/ml/mlplatform) |

### AI API

| Endpoint                      | Address                   | Purpose |
|-------------------------------|---------------------------|--|
| Vision for image and video recognition  | https://smarty.mail.ru/   | [Objects recognition](/en/ml/vision) |

### Endpoints not associated with a service

| Endpoint                            | Address                 | Purpose |
|-------------------------------------|-------------------------|--|
| Audit             | https://mcs.mail.ru/auditlogs/v1/<project_id>       | Collecting the statistics of users' actions in the project |
| Barbican          | https://public.infra.mail.ru:9311                   | A protected storage for secrets (SSH keys, Keystone tokens, TLS certificates) |
| Keystone          | https://infra.mail.ru:35357/v3/                     | Managing project users, user authentication via [tokens](../case-keystone-token) |
| Quota-manager     | https://mcs.mail.ru/quota-manager                   | Viewing project [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) |
| Heat              | https://infra.mail.ru:8004/v1/<project_id>          | Cloud services orchestration (deprecated)

</details>

## Getting Project ID

The addresses of some endpoints contain the variable `<project_id>`. When creating a request, replace this variable with the Project ID of the current project.

The Project ID does not match the [project ID](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_the_project_id) to VK Cloud personal account. This is another identifier that is used in configuration files:

- In `openrc.sh`, as the value of the variable `OS_PROJECT_ID`. This file is required to work with additional tools such as the OpenStack CLI or cURL.
- In `vkcs_provider.tf`, as the value of the `project_id` parameter. This file is required to work through Terraform.

To get the Project ID value for a project:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en).
1. Open the desired project by selecting it from the list in the header of the personal account page.
1. Click on the user name in the header of the page and select **Project settings**.
1. Go to **API access** or **Terraform** tab.

    The value is available on both tabs, under the headings **Project ID** and **Project ID / tenant_id**, respectively.

    <info>

    On the **API Access** tab, the **Project ID** value is displayed if API access is activated.

    </info>
