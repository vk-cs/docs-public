# {heading(Operating systems)[id=iaas-oper-system]}

{include(/en/_includes/_translated_by_ai_en.md)}

In {var(cloud)}, when creating a virtual machine, you can choose an operating system from the {ifdef(public)}Microsoft Windows or {/ifdef}Linux family. To create a VM with an operating system that is not in the {var(cloud)} list, use a {linkto(../../../../computing/iaas/concepts/image-vm#iaas-image-vm)[text=image]} file of the virtual machine with the desired OS.

{ifdef(public)}
{var(cloud)} supports migration of server versions of the Windows OS:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

{note:warn}
In {var(cloud)}, the Windows 7 / 8 / 8.1 / 10 / 11 operating systems cannot be used. This restriction applies to all projects and cannot be lifted.
{/note}
{/ifdef}

## {heading(Default account)[id=iaas-oper-system-default-account]}

In the operating systems of {var(cloud)} images {ifdef(public)}(except for the Bitrix OS){/ifdef}, the `root` account is blocked for security reasons, and a default account has been added for use.

You can view the default account name in {ifdef(public,private,private-pg)}the list below{/ifdef}{ifdef(private-pdf,private-pg-pdf,private-cert)}{linkto(#tab_name_users_os)[text=table %number]}{/ifdef} or in the {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=password setting]} window in the {var(cloud)} management console.

{cut(List of default accounts for different OS)}

{ifdef(public)}
[cols="1,1", options="header"]
|===
|Operating system
|Username

|AlmaLinux
|almalinux

|ALT Linux
|altlinux

|Astra Linux
|astra

|Bitrix
|root

|CentOS
|centos

|Debian
|debian

|Fedora
|fedora

|FreeBSD
|freebsd

|openSUSE
|opensuse

|Ubuntu
|ubuntu

|РЕД ОС
|redos

|Windows
|Admin
|===
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}

{ifndef(private,private-pg)}
{caption(Table {counter(table)[id=numb_tab_name_users_os]} — OS usernames)[align=right;position=above;id=tab_name_users_os;number={const(numb_tab_name_users_os)}]}
{/ifndef}
[cols="1,1", options="header"]
|===
|Operating system
|Username

|AlmaLinux
|`almalinux`

|Astra Linux
|`astra`

|Ubuntu
|`ubuntu`

|Альт Сервер 10
|`altlinux`

|РЕД ОС
|`redos`
|===
{ifndef(private,private-pg)}
{/caption}
{/ifndef}
{/ifdef}

{/cut}

{ifdef(public)}

## {heading(Licenses)[id=iaas-oper-system-licenses]}

{var(cloud)} has the right to license software on the basis of agreements with the following companies:

- Microsoft (Microsoft Services Provider License Agreement — SPLA);
- RED SOFT;
- BaseALT;
- Astra Linux.

For more information, see the section {linkto(../../../../computing/vm-licenses#vm-licenses)[text=VM licenses]}.
{/ifdef}