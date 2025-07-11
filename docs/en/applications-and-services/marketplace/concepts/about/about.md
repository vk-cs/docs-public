Marketplace is a VK Cloud subsystem that provides customers with access to third-party services of various kinds:

- provided by the vendor;
- open source solutions;
- self-developed services.

All details on infrastructure deployment and software or creating a tenant (account) remain on the VK Cloud side. The user receives a prepared instance of the service (an instance of the service), which, if necessary, can be customized to their needs. All deployed instances of the service are [charged](../../tariffication) and [managed](../../instructions/pr-instance-manage) within the VK Cloud project. The Marketplace helps you launch services faster and simplifies their support.

{note:warn}

By using the services from the Marketplace, you agree to the [user Agreement](/ru/intro/start/legal/marketplace "change-lang").

{/note}

## Types of services

VK Cloud supports two types of services:

- SaaS services — centrally installed [multi-tenant](https://habr.com/en/companies/microsoft/articles/145027) products. The vendor deploys the service either on its own infrastructure, or on the infrastructure in its project in VK Cloud. The user is granted access to the service through a separate account (tenant). The service and its instances are managed on the VK Cloud side.
- Image-based services — a product that is deployed based on virtual machine images in the VK Cloud project. Additional infrastructure can be used to maintain the product: virtual networks, load balancers, DBaaS clusters, S3 object storage, backup. The service, its instances, and infrastructure are managed on the VK Cloud side.

Each type of service is initialized in VK Cloud differently:

<tabs>
<tablist>
<tab>SaaS</tab>
<tab>Image-based</tab>
</tablist>
<tabpanel>

1. The user [connects](../../instructions/pr-instance-add) the service to the project.
1. VK Cloud sends a request to the supplier to create a tenant account in his product.
1. The supplier registers a new account, sends the VK Cloud details.
1. VK Cloud creates a service instance for [management](../../instructions/pr-instance-manage) and sends the access details to the user.

</tabpanel>
<tabpanel>

1. The user [connects](../../instructions/pr-instance-add) the service to the project.
1. VK Cloud creates the necessary infrastructure in the user's project.
1. VK Cloud installs the service on the created infrastructure.
1. VK Cloud creates a service instance for [management](../../instructions/pr-instance-manage) and sends the access details to the user.

</tabpanel>
</tabs>

Key differences for SaaS and image-based services:

[cols="2,1,1", options="header"]
|===
| Feature / Type
| SaaS
| Image-based

| Infrastructure location
| A separate account (tenant) on the side of the supplier company
| Project in VK Cloud

| Management of the deployed infrastructure via VK Cloud
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Service instance monitoring
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Integration with VK Cloud services
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

| [Tariffication](../../tariffication)
| Product Usage
| Product usage + deployed infrastructure in the project

| Changing the tariff plan
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Setting up tariff plan options
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

## Information for vendors

Vendors can add their software to VK Cloud by writing to `marketplace@cloud.vk.com`.
