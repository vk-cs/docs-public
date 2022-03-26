General information
-------------------

The VK CS platform allows you to create virtual machines with pre-installed licensed copies of Microsoft Windows Server operating systems, as well as use additional available Microsoft software products, such as: SQL Server, Remote Desktop Services, Exchange Server with monthly payment.

VK CS is authorized to provide Microsoft software under the Service Provider License Agreement (SPLA) for the purpose of providing software services.

At the moment, the list of provided software products within the SPLA is limited to the following set:

<table style="width: 100%;"><tbody><tr><td style="width: 19.5616%; background-color: rgb(239, 239, 239); text-align: center;">The code</td><td style="width: 47.2175%; background-color: rgb(239, 239, 239); text-align: center;">Name</td><td style="width: 33.2209%; background-color: rgb(239, 239, 239); text-align: center;">Description</td></tr><tr><td style="width: 19.5616%;">9EM-00562</td><td style="width: 47.2175%;">WinSvrSTDCore ALNG LicSAPk MVL 2Lic CoreLic</td><td style="width: 33.2209%;">Windows Server Standard edition (2 vCPU)</td></tr><tr><td style="width: 19.5616%;">7NQ-00302</td><td style="width: 47.2175%;">SQLSvrStdCore ALNG LicSAPk MVL 2Lic CoreLic</td><td style="width: 33.2209%;">Microsoft SQL Server Standard (2 vCPU)</td></tr><tr><td style="width: 19.5616%;">7JQ-00341</td><td style="width: 47.2175%;">SQLSvrEntCore ALNG LicSAPk MVL 2Lic CoreLic</td><td style="width: 33.2209%;">Microsoft SQL Server Enterprise Core Edition (2 vCPU)</td></tr><tr><td style="width: 19.5616%;">228-05018</td><td style="width: 47.2175%;">SQLSvrStd ALNG LicSAPk MVL SAL</td><td style="width: 33.2209%;">Microsoft SQL Server Standard Edition (per user)</td></tr><tr><td style="width: 19.5616%;">6WC-00002</td><td style="width: 47.2175%;">WinRmtDsktpSrvcsSAL ALNG LicSAPk MVL</td><td style="width: 33.2209%;">Windows Remote Desktop Services (per user)</td></tr></tbody></table>

Terms of Use
------------

The terms of use of Microsoft software are governed by the terms of the Microsoft License Agreement with the purchase of Microsoft products. You are responsible for complying with the Microsoft licensing terms. If you have questions about licensing and Microsoft software use rights, please contact your Legal Department or Microsoft sales representatives. The information in this article corresponds to the [current terms of use for Microsoft products](https://www.microsoft.com/en-us/licensing/product-licensing/products).

The cost
--------

find out the cost of monthly license usage, at the top of the control panel, click «Project ettings» —> «Prices».

You can track write-offs in your personal account in the «Balance and payments» section.

Windows Server
--------------

When you create an instance with Microsoft Windows OS, a licensed copy of the corresponding edition selected during creation is automatically deployed.

Available editions of the Microsoft Windows Server operating system:

*   Windows Server 2012R2 RU
*   Windows Server 2012R2 EN
*   Windows Server 2016 RU
*   Windows Server 2016 EN
*   Windows Server 2019 RU
*   Windows Server 2019 RU

Every 2 vCPU Windows Instances require one license. Accordingly, when creating an instance with 5 vCPUs, you will need 3 Windows Server licenses per core.

Payment for licenses does not require additional steps and will be automatically performed in accordance with the configuration of the created virtual machine.

When you change the virtual machine type, the number of licenses will change according to the number of virtual cores of the changed configuration.

**Key**

A license key may be required to activate Windows Server, as indicated by the inscription in the lower right corner of the screen. In this case, you need to contact technical support to fix the OS activation failure. Depending on the operating system, either an activation key or a command for self-activation of the licensed copy will be provided.

An activation failure does not affect the license period because VK CS does not provide a trial period for Microsoft licenses.

If you selected the Windows 2012/2016 operating system when creating a virtual machine, then you can purchase an activation key. Without activation, after the trial period (two weeks) has expired, Windows will restart every hour.

To receive an activation key, write to us in the feedback form indicating your VK CS account and the number of licenses.

Remote Desktop Services
-----------------------

Remote Desktop Service allows a large number of users to work with a virtual machine at the same time.

By default, after installing Windows Server, only 2 concurrent Remote Desktop (RDP) connections are available.

These 2 connections can only be used for server setup and administration. To permanently work with the operating system as a user and run the software, you need to purchase a remote connection license for each user.

To install a license, an instance must have the Remote Desktop Session host role installed, which will allow you to manage and license RDP connections. Each operating system user who connects using the Remote Desktop Protocol (RDP) is subject to licensing. Multiplexing, i.e. multiple users using the same RDP license is not allowed in this case.

**Note**

Remote Desktop Services licenses can only be granted for a licensed copy of the MS Windows operating system of an instance purchased from VK CS.

To activate a license, you should [contact technical support](mailto:support@mcs.mail.ru) and provide the details of the project, instance, the required number of licenses, as well as the parameters for connecting to the instance's remote desktop to activate licenses.

SQL Server
----------

SQL Server Database Management System is available for installation as a pre-installed instance with a pre-installed copy of SQL Server.

Licensing is done automatically when a virtual machine is created. The licensing method "per core" is used, multiple of 2 cores, but not less than 4 cores for a virtual machine.

**Note**

SQL Server licenses are provided along with the operating system licenses when you create a virtual machine.