In your personal account, you can view the addresses of the available API endpoints. The list and addresses of endpoints differ between [regions](/en/base/account/concepts/regions).

To work with VK Cloud via the API [activate API access](../enable-api). Read more about working with services in the section [Справка API](/ru/additionals/api "change-lang").

## Viewing the list of endpoints

The list is available to all users, regardless of their [role](/en/base/account/concepts/rolesandpermissions) if the project [enabled services](/en/base/account/instructions/activation).

To see the list of endpoints for your region:

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user name in the header of the page and select **Project settings**.
1. Go to **API endpoints** tab.

## Endpoints of the Moscow region

Four key endpoints for OpenStack services:

| Endpoint                            | Address                 |
|-------------------------------------|-------------------------|
| Nova              | https://infra.mail.ru:8774/v2.1                     |
| Cinder            | https://public.infra.mail.ru:8776/v3/<project_id>   |
| Neutron           | https://infra.mail.ru:9696                          |
| Heat              | https://infra.mail.ru:8004/v1/<project_id>          |

<details><summary>Other endpoints</summary>

**Endpoints of OpenStack services**

| Endpoint                            | Address                 |
|-------------------------------------|-------------------------|
| Audit             | https://mcs.mail.ru/auditlogs/v1/<project_id>       |
| Barbican          | https://public.infra.mail.ru:9311                   |
| Glance            | https://infra.mail.ru:9292                          |
| Gnocchi           | https://infra.mail.ru:8041                          |
| Karboii           | https://mcs.mail.ru/infra/karboii/v1                |
| Keystone          | https://infra.mail.ru:35357/v3/                     |
| Magnum            | https://infra.mail.ru:9511/v1                       |
| Magnum-addons     | https://mcs.mail.ru/infra/container/addons          |
| Manila            | https://public.infra.mail.ru:8786/v2/<project_id>   |
| Octavia           | https://public.infra.mail.ru:9876                   |
| Publicdns         | https://mcs.mail.ru/public-dns                      |
| Quota-manager     | https://mcs.mail.ru/quota-manager                   |
| Sahara            | https://infra.mail.ru:8386/v1.1/<project_id>        |
| Trove             | https://infra.mail.ru:8779/v1.0/<project_id>        |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Endpoints of the Object storage service (S3)**

| Endpoint                            | Address                          |
|-------------------------------------|----------------------------------|
| Домен S3                            | https://hb.ru-msk.vkcs.cloud/    |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Endpoint of the AI API**

| Endpoint                      | Address                   |
|-------------------------------|---------------------------|
| Vision for image recognition  | https://smarty.mail.ru/   |
| Vision for video recognition  | https://smarty.mail.ru/   |
<br />
<hr color="#D3D3D3" width="90%">
<br />

**Message Queue service endpoints**

| Endpoint                            | Address                          |
|-------------------------------------|----------------------------------|
| Endpoint URL                        | https://sqs.mcs.mail.ru          |

</details>

## Getting Project ID

The addresses of some endpoints contain the variable `<project_id>`. When creating a request, replace this variable with the Project ID of the current project.

The Project ID does not match the [project ID](/en/base/account/instructions/project-settings/manage#getting-the-project-id) to VK Cloud personal account. This is another identifier that is used in configuration files:

- In `openrc.sh`, as the value of the variable `OS_PROJECT_ID`. This file is required to work with additional tools such as the OpenStack CLI or cURL.
- In `vkcs_provider.tf`, as the value of the `project_id` parameter. This file is required to work through Terraform.

To get the Project ID value for a project:

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Open the desired project by selecting it from the list in the header of the personal account page.
1. Click on the user name in the header of the page and select **Project settings**.
1. Go to **API access** or **Terraform** tab.

    The value is available on both tabs, under the headings **Project ID** and **Project ID / tenant_id**, respectively.

    <info>

    On the **API Access** tab, the **Project ID** value is displayed if API access is activated.

    </info>
