The VK Cloud platform allows you to create virtual machines with pre-installed licensed copies of Microsoft Windows Server operating systems, as well as use additional Microsoft software products — the full list is available in the [price list](https://mcs.mail.ru/pricelist). If you have not found a suitable product, contact [technical support](/en/contacts).

<warn>

VK Cloud provides Microsoft software under the Service Provider License Agreement (SPLA). Under this agreement, Microsoft software can only be operated on virtual machines in the VK Cloud.

</warn>

## Terms of use

If you have any questions about licensing and rights to use Microsoft software, contact your legal department or Microsoft sales representatives.

**By using this product, you agree to the terms of use of the following products**: [Microsoft](https://www.microsoft.com/en-us/licensing/product-licensing/products).

## Price

The price for a month of using the software can be found out:

- in the [price list](https://mcs.mail.ru/pricelist);
- when creating a virtual machine;
- in [project settings](https://mcs.mail.ru/app/en/project/) on the tab **Prices**.
- in the section **Balance** [personal account](https://mcs.mail.ru/app/en/services/billing).

## Windows Server

When creating a VM with Microsoft Windows OS, a licensed copy of the OS of the selected edition is automatically deployed. It will be activated when the VM is turned on.

The available editions of the Microsoft Windows Server are displayed in the drop-down list **Operating system** when creating a VM through VK Cloud [personal account](https://mcs.mail.ru/app/services/infra/servers/add).

Every 2 vCPUs of a Windows VM require the use of one license. For example, when creating a VM with 5 vCPUs, you will need 3 Windows Server licenses. When changing the type of virtual machine, the number of licenses will be changed in accordance with the number of virtual cores of the modified configuration.

<info>

Payment of licenses does not require additional actions and will be debited automatically in accordance with the configuration of the created VM.

</info>

## Remote Desktop Services

By default, after installing Windows Server OS, only two simultaneous connections to the VM are available (console and/or RPD).

These 2 connections can only be used to configure and administer the server. To allow more connections (administrative or connections to multiple users):

1. Make sure that the appropriate Remote Desktop Services client licenses are available.
1. Install the Remote Desktop session host role on the target VM.

A license will be required for each OS user who connects using the Remote Desktop Protocol (RDP). Activation of the Remote Desktop service completely replaces the default RDP connection.

<warn>

Licenses for Remote Desktop Services can only be granted for a licensed copy of the MS Windows operating system purchased from VK Cloud.

</warn>

To activate the license, contact [technical support](/en/contacts) with information:

- project ID;
- id of the VM with MS Windows;
- the required number of licenses;
- remote desktop connection settings.

## SQL Server

The SQL Server database management system is available for installation as a ready-made image with a pre-installed copy of SQL Server. Tell [technical support](/en/contacts) the ID of the VM on which it is used.

The licensing method is applied “per core”: the price increases for each of the next two cores added to the VM. The minimum number of cores for which a license is purchased is four.

## Migration previously purchased licenses to VK Cloud

VK Cloud allows you to deploy a number of Microsoft server applications using previously purchased licenses. This simplifies the migration of workloads to the VK Cloud, eliminating new costs for the purchase of Microsoft licenses. This advantage is available to Microsoft corporate licensing customers with licenses of the relevant applications under the current Microsoft Software Assurance (SA) agreements.

### Checking a previously purchased license

To transfer licenses under the Software Assurance agreement, you must go through the license verification process, and Microsoft must confirm that you have eligible licenses in accordance with the current Software Assurance (SA) agreement. Fill out the verification form on the [corporate Licensing website](https://www.microsoft.com/licensing/docs) and provide it to your Microsoft representative or partner who will help send it to Microsoft:

- email: `support@mcs.mail.ru`;
- name of the partner: `VK Cloud`;
- partner web site: `mcs.mail.ru`.

After receiving the form, Microsoft will check your license and inform you and your Microsoft partner about the results of the check. Further instructions in the manual [Moving licenses within Software Assurance](https://www.microsoft.com/ru-ru/licensing/licensing-programs/software-assurance-license-mobility) and to the document [License Mobility Verification Guide](http://download.microsoft.com/download/7/9/b/79bd917e-760b-48b6-a266-796b3e47c47a/License_Mobility_Customer_Verification_Guide.pdf) Microsoft (PDF).

According to the requirements of the agreement, you are responsible for performing inspections and extensions. However, you can start deploying application server software without waiting for the verification to be completed. You can deploy the software ten days before submitting the form.

After passing the verification process, let us know about it to [support service](/en/contacts/), indicating the name of the project and the type of license used.

### License transfer conditions

To use the license transfer, ensure that the conditions are met:

1. All Microsoft Server application software products migrated to VK Cloud using Software Assurance license portability must be subject to the current Software Assurance (SA) agreement.

2. Server applications should be included in the list of eligible products:

    - Exchange Server;
    - SharePoint Server;
    - SQL Server Standard Edition;
    - SQL Server Enterprise Edition;
    - SQL Server Business Intelligence Edition;
    - Skype for Business Server;
    - System Center Server;
    - Dynamics CRM Server;
    - Dynamics AX Server;
    - Project Server;
    - Visual Studio Team Foundation Server;
    - BizTalk Server;
    - Forefront Identity Manager;
    - Forefront Unified Access Gateway;
    - Remote Desktop Services.

    The full list of eligible software products is available in the [Microsoft Product Terms of Use](https://www.microsoft.com/en-us/licensing/product-licensing/products.aspx).

3. Eligible corporate licensing programs include Enterprise Agreement, Enterprise Subscription Agreement and Microsoft Open Value Agreement, which include the Software Assurance agreement, as well as other Microsoft corporate licensing programs in which the Software Assurance agreement is an additional feature, for example, Microsoft Open License or Select Plus.

4. To access the application servers, you must have the appropriate Client Access Licenses (CAL) in the corporate licensing agreement together with the Software Assurance agreement.

5. License portability does not apply to Microsoft Windows client operating systems, desktop application products (for example, Microsoft Office) and Microsoft Windows Server operating systems.

6. In accordance with the rules of the Microsoft Server farm, licenses deployed in a specific VK Cloud region cannot be transferred to another VK Cloud region within 90 days. For more information, see [Microsoft Product Terms of Use](https://www.microsoft.com/en-us/licensing/product-licensing/products.aspx).
