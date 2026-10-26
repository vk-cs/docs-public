# {heading(Filling in the service description for the marketplace)[id=service_description]}

{include(/en/_includes/_translated_by_ai_en.md)}

The service description includes:

* An icon.
* A short description.
* A full description.

The service description is set in its configuration.

## {heading(Icon)[id=service_description_icon]}

The service icon is displayed on the service card:

* In the marketplace catalog.
* On the **Service description** tab on the service page.

For an image-based application, the icon is uploaded as part of the [service package](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_structure).

For a SaaS application, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) with the icon attached in SVG format, at least 62 × 62 pixels in size. A reply email will contain a link to the icon, which is specified in the [JSON file](/en/tools-for-using-services/vendor-account/manage-apps/saas_add/saas_configure/saas_json).

## {heading(Short service description)[id=service_description_short]}

The short service description is displayed on the service card:

* In the marketplace catalog.
* On the **Service description** tab on the service page.

The text is specified in the `short_description` parameter in the service configuration:

* For an image-based application — in the `service.yaml` file from the service package.
* For a SaaS application — in the JSON file.

## {heading(Full service description)[id=service_description_full]}

The full service description is displayed on the **Service description** tab on the service page.

The text is specified in the service configuration:

* For an image-based application — in the `full_description.md` file from the service package.
* For a SaaS application — in the `full_description` parameter in the JSON file.

In general, the full service description must contain the following sections:

* Service information.
* Tariffication rules.
* Useful links.
* Technical support.
* License agreement.

### {heading(Service information)[id=service_description_info]}

In this section, provide the following information:

* A brief overview of the service.

   Describe what the service is and what tasks it helps to solve (main use cases).
* Who the provider is:

   * A vendor.
   * A distributor.
   * VK.

   {note:info}

   For opensource solutions, the provider is VK.

   {/note}
* Information about the provider (optional).

   {note:info}

   For opensource solutions, no information about the provider is specified.

   {/note}
* Service characteristics. Specify the following data in a table:

   * Service type:

      * Image-based.
      * SaaS.

   * Service version (if any). For example, Usergate 7.01.

      {note:info}

      The service version is not the service revision specified in its configuration.

      {/note}
   * For an image-based application — the specific OS version. For example, Ubuntu 22.04.
   * Service category. Examples of categories:

      * Analytics.
      * Databases.
      * Security.
      * Development tools.
      * VPN.

For an image-based application, specify additional information in this section:

* Service deployment options:

   * A single VM.
   * A cluster.

* Which cloud platform infrastructure is used. For example, VMs, virtual networks, DNS.
* Network requirements:

   * The VM must have access to the external network.
   * The private DNS must be disabled in the subnet settings.

To give the user a complete picture of the service, add service diagrams and interface screenshots to this section (optional).

{caption(Example of filling in the section with service information, Markdown format)[align=left;position=above]}
```markdown
UserGate NGFW contains all the features of UTM (Unified Threat Management) class solutions, providing protection against all kinds of Internet threats and Internet access management. UserGate NGFW provides protection against attacks, traffic management, authentication of Internet users, as well as ensures the security of employees visiting Internet resources, protecting them from downloading dangerous and malicious content.

Service provider: UserGate company.

## Tasks solved

### As a firewall

* Separation of the external Internet space from the internal or corporate network at the physical boundary.
* A VPN gateway for organizing access and authentication of specific remote users to specific information systems.
* Building a hybrid environment of the local infrastructure-cloud type by means of Site-to-Site VPN L2TP IPSec and connecting branch offices with the center and the {var(cloud)} cloud.

## Service characteristics:
|                      |                  |
|----------------------|------------------|
| Service type         |       Image-based|
| OS                   |              UGOS|
| Service version      |     Usergate 7.01|
| Service category     |         Security |

> Image-based is a service type deployed on the basis of virtual machine images on the {var(cloud)} infrastructure.
<br>The operation of this product uses:
> * A virtual machine.
> * Virtual networks.
> * Floating IP addresses.

**Minimum infrastructure requirements**
Virtual machines:
* vCPU: 2.
* RAM: 8 GB.
* Disk size: at least 100 GB.
* Network:
    * The VM must have access to the external network.
    * The private DNS must be **disabled** in the subnet settings.
```
{/caption}

### {heading(Tariffication rules)[id=service_description_tariffication]}

In this section, provide the following information:

* The tariffication type (for more details, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing)[text=%text]}).
* If the service has several tariff plans, specify that they can be reviewed in the tariff plan matrix on the service page.
* If the service has paid tariff options, specify that such options are charged in addition to the cost of the tariff plan.
* If the service has tariff plans with a negotiated price, provide information about this.
* For an image-based application, specify that the cost of the cloud platform infrastructure is charged separately.

{note:err}

If an image-based application uses the cloud platform infrastructure whose volume and cost cannot be determined at the time of connecting the service (for example, storage of data accumulated during operation — backups), mention this in the description of the tariffication rules.

{/note}

{caption(Example of filling in the section with tariffication rules, Markdown format)[align=left;position=above]}
```markdown

# Tariffication rules
The service is provided under the Bring Your Own License model. Tariffication is applied only for the {var(cloud)} infrastructure consumed. Its cost can be estimated in the **Details** block in the tariff plan configuration wizard. The final cost will be displayed on the last page of the tariff plan configuration wizard.
```
{/caption}

### {heading(Useful links)[id=service_description_links]}

In this section, provide the following links to the documentation:

* A link to the quick-start documentation describing how to get started with the service — a link to the article [Configuring marketplace services](/en/applications-and-services/marketplace/initial-configuration).
* A link to the full documentation published by the service developer.

{caption(Example of filling in the section with useful links, Markdown format)[align=left;position=above]}
```markdown

# Useful links
- [Getting started documentation](<VK_CLOUD_DOCUMENTATION_PORTAL_LINK> "On the {var(cloud)} documentation portal") — instructions on obtaining access, initial configuration, and getting started with the service after deploying an instance.
- [Full service documentation](<DEVELOPER_DOCUMENTATION_LINK> "On the provider's website").
```
{/caption}

### {heading(Technical support)[id=service_description_support]}

In this section, provide the following information:

* Rules for obtaining technical support for the service.
* For an image-based application — rules for obtaining technical support for the cloud platform infrastructure.
* Technical support contacts.

{caption(Example of filling in the section on technical support, Markdown format)[align=left;position=above]}
```markdown

# Technical support
The UserGate NGFW technical support service is purchased together with the product license. Support is provided by the supplier on the [Technical Support Portal](https://support.usergate.com/ru) in accordance with the [Technical Support Regulations](https://support.usergate.com/ru/technical-support-regulations).
Upon request, the [Professional Services team](https://cloud.vk.ru/professional-services/) of {var(cloud)} provides extended technical support for UserGate NGFW.

The {var(cloud)} team provides technical support on issues related to the operation of the {var(cloud)} infrastructure. Information about the technical support terms and ways to contact support can be found on the [Support terms](/en/start/support/support-info) page.
```
{/caption}

### {heading(License agreement)[id=service_description_license]}

In this section, provide the following information:

* Links:

   * To the [Marketplace user agreement](/en/start/legal/offer/private-special-conditions/policy-marketplace)
   * To the service user agreement.

* For opensource solutions — a disclaimer about opensource licenses.

{caption(Example of filling in the section on the license agreement, Markdown format)[align=left;position=above]}
```markdown

# License agreement
By using the UserGate NGFW service, you agree to:
- The [Marketplace user agreement](https://cloud.vk.ru/docs/ru/start/legal/offer/private-special-conditions/policy-marketplace).
- The [UserGate NGFW License Agreement](https://www.usergate.com/ru/usergate-eula).
```
{/caption}