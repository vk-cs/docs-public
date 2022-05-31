## General information

<info>

On the territory of Crimea, Microsoft licensing services are not provided to customers of individuals and legal entities registered or located on the territory of Crimea, in accordance with the terms of the Microsoft SPLA agreement.

</info>

The VK CS platform allows you to create virtual machines with pre-installed licensed copies of Microsoft Windows Server operating systems, as well as use additional Microsoft software products available, such as: SQL Server, Remote Desktop Services, Exchange Server with monthly payment.

VK CS has the right to provide Microsoft software under the Service Provider License Agreement (SPLA) for the purpose of providing software services.

At the moment, the list of software products provided within SPLA is limited to the following set:

| Code | Name | Description |
| --- | --- | --- |
| 9EM-00562 | WinSvrSTDCore ALNG LicSAPk MVL 2Lic CoreLic | Windows Server Standard edition (2 vCPUs) |
| 7NQ-00302 | SQLSvrStdCore ALNG LicSAPk MVL 2Lic CoreLic | Microsoft SQL Server Standard (2 vCPU) |
| 7JQ-00341 | SQLSvrEntCore ALNG LicSAPk MVL 2Lic CoreLic | Microsoft SQL Server Enterprise Core Edition (2 vCPU) |
| 228-05018 | SQLSvrStd ALNG LicSAPk MVL SAL | Microsoft SQL Server Standard Edition (per user) |
| 6WC-00002 | WinRmtDsktpSrvcsSAL ALNG LicSAPk MVL | Windows Remote Desktop Services (per user) |

## Terms of Use

The terms of use of Microsoft software are governed by the terms of the license agreement with Microsoft, concluded when purchasing Microsoft products. The user is responsible for compliance with the Microsoft licensing terms. If you have any questions about licensing and rights to use Microsoft software, you should contact your legal department or Microsoft sales representatives. The information in this article complies with [current Microsoft Product Terms of Use](https://www.microsoft.com/en-us/licensing/product-licensing/products ).

## Cost

To find out the cost of monthly license usage, at the top of the control panel, click "Project Settings" —> "Prices".

You can track write-offs in your personal account in the "Balance" section.

## Windows Server

When creating an instance with Microsoft Windows OS, a licensed copy of the corresponding edition selected at creation is automatically deployed.

Available editions of the Microsoft Windows Server operating system:

- Windows Server 2012R2 RU;
- Windows Server 2012R2 EN;
- Windows Server 2016 RU;
- Windows Server 2016 EN;
- Windows Server 2019 RU;
- Windows Server 2019 RU.

Every 2 vCPU instances with Windows OS require the use of one license. Accordingly, when creating an instance with 5 vCPUs, you will need 3 Windows Server licenses per core.

Payment of licenses does not require additional actions and will be automatically made in accordance with the configuration of the created virtual machine.

When changing the type of virtual machine, the number of licenses will be changed in accordance with the number of virtual cores of the modified configuration.

### Key

To activate Windows Server OS, you may need a license key, as evidenced by the inscription in the lower right corner of the screen. In this case, it is necessary to [contact technical support](https://mcs.mail.ru/docs/contacts) to fix the OS activation failure. Depending on the operating system, either an activation key or a command for self-activation of the licensed copy will be provided.

The presence of an activation failure does not affect the period of use of the license, since the VK CS platform does not provide a trial period for using Microsoft licenses.

If you chose Windows 2012 / 2016 operating system when creating a virtual machine, then you can purchase an activation key. Without activation after the trial period expires (two weeks), Windows will restart every hour.

To get an activation key, write to us in the feedback form indicating the VK CS account and the number of licenses.

## Remote Desktop Services

The remote desktop service allows a large number of users to work with a virtual machine at the same time.

By default, after installing Windows Server OS, only 2 simultaneous connections to the VM are available:

- 1 direct connection to the Virtual Machine Console.
- 1 Remote Desktop Connection (RDP).

These 2 connections can only be used to configure and administer the server. To allow more than two administrative connections or connections to multiple users, you must install the Remote Desktop Session host role and have the appropriate Remote Desktop Services client licenses.

Each operating system user who connects using the Remote Desktop Protocol (RDP) is subject to licensing. Activation of the Remote Desktop service completely replaces the default RDP connection. Multiplexing, i.e. the use of a single RDP license by multiple users, is not allowed in this case.

<warn>

Licenses for Remote Desktop Services can only be granted for a licensed copy of the instance's MS Windows operating system purchased from VK CS.

To activate the license, you should [contact technical support](https://mcs.mail.ru/docs/contacts) and provide the data of the project, instance, the required number of licenses, as well as the parameters for connecting to the remote desktop of the instance to activate licenses.

</warn>

## SQL Server

The SQL Server database management system is available for installation as a ready-made instance with a pre-installed copy of SQL Server.

Licensing is carried out automatically when creating a virtual machine. The licensing method is applied "per core", a multiple of 2m cores, but not less than 4 cores for a virtual machine.

<warn>

SQL Server licenses are granted simultaneously with operating system licenses when creating a virtual machine.

</warn>

## Upgrade (upgrade level) of licenses

To upgrade the license level of the software used, contact [VK CS Technical Support](https://mcs.mail.ru/help/contact-us).
