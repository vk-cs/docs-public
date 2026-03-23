The VK Cloud platform allows you to create virtual machines with pre-installed licensed copies of Microsoft Windows Server operating systems, as well as use additional Microsoft software products — the full list is available in the [price list](https://cloud.vk.com/pricelist).

{note:warn}

VK Cloud provides Microsoft software under the Service Provider License Agreement (SPLA). Under this agreement, Microsoft software can only be operated on virtual machines in the VK Cloud.

{/note}

## Terms of use

If you have any questions about licensing and rights to use Microsoft software, contact your legal department or Microsoft sales representatives.

By using this product, you agree to the terms of use of the following products: [Microsoft](https://www.microsoft.com/licensing/docs/view/Services-Provider-Use-Rights-SPUR?lang=1).

## Price

The price for a month of using the software can be found out:

- in the [price list](https://cloud.vk.com/pricelist);
- when creating a virtual machine;
- in [project settings](https://msk.cloud.vk.com/app/en/project/) on the tab **Prices**.
- in the section **Balance** [management console](https://msk.cloud.vk.com/app/en/services/billing).

## {heading(VM requirements for automatic license activation)[id=requirements]}

To automatically activate licenses for Microsoft Windows Server and Microsoft Office products purchased from VK Cloud:

- A VM must be accessible via internet. If the access is not via an IP address provided by VK Cloud, you should provide the IP address of the VM to [technical support](mailto:support@mcs.mail.ru).
- TCP port 1688 must be open on the VM.

Since a VM with Microsoft Windows OS regularly renews its activation, it is necessary to ensure that the VM has access to the activation server for its entire life.

## Windows Server

When creating a VM with Microsoft Windows OS, a licensed copy of the OS of the selected edition is automatically deployed. The license will be activated automatically when the VM is launched if the [VM requirements](../../vm-licenses/ms-lic#requirements) are met.

The available editions of the Microsoft Windows Server are displayed in the drop-down list **Operating system** when creating a VM through VK Cloud [management console](https://msk.cloud.vk.com/app/services/infra/servers/add).

Every 2 vCPUs of a Windows VM require the use of one license. For example, when creating a VM with 5 vCPUs, you will need 3 Windows Server licenses. When changing the type of virtual machine, the number of licenses will be changed in accordance with the number of virtual cores of the modified configuration.

{note:info}

Payment of licenses does not require additional actions and will be debited automatically in accordance with the configuration of the created VM.

{/note}

## Remote Desktop Services

By default, after installing Windows Server OS, only two simultaneous connections to the VM are available (console and/or RDP).

These 2 connections can only be used to configure and administer the server. To allow more connections (administrative or connections to multiple users):

1. Make sure that the appropriate Remote Desktop Services client licenses are available.
1. Install the Remote Desktop session host role on the target VM.

A license will be required for each OS user who connects using the Remote Desktop Protocol (RDP). Activation of the Remote Desktop service completely replaces the default RDP connection.

{note:warn}

Licenses for Remote Desktop Services can only be granted for a licensed copy of the MS Windows operating system purchased from VK Cloud.

{/note}

To activate the license, contact [technical support](mailto:support@mcs.mail.ru) with information:

- project ID;
- id of the VM with MS Windows;
- the required number of licenses;
- remote desktop connection settings.

## SQL Server

The SQL Server database management system is available for installation as a ready-made image with a pre-installed copy of SQL Server. Tell [technical support](mailto:support@mcs.mail.ru) the ID of the VM on which it is used.

The licensing method is applied “per core”: the price increases for each of the next two cores added to the VM. The minimum number of cores for which a license is purchased is four.