# {heading(Операционные системы)[id=iaas-oper-system]}

В {var(cloud)} при создании виртуальной машины можно выбрать операционную систему семейства {ifdef(public)}Microsoft Windows или {/ifdef}Linux. Для создания ВМ с операционной системой, которой нет в списке {var(cloud)}, используйте файл {linkto(../../../../computing/iaas/concepts/image-vm#iaas-image-vm)[text=образа]} виртуальной машины с нужной ОС.

{ifdef(public)}
В {var(cloud)} поддерживается миграция ОС Windows серверных версий:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

{note:warn}
В {var(cloud)} невозможно использовать операционные системы Windows 7 / 8 / 8.1 / 10 / 11. Это ограничение установлено для всех проектов и не может быть снято.
{/note}
{/ifdef}

## {heading(Учетная запись по умолчанию)[id=iaas-oper-system-default-account]}

В операционных системах образов {var(cloud)} {ifdef(public)}(кроме ОС Bitrix){/ifdef} учетная запись `root` заблокирована в целях безопасности и добавлена учетная запись для использования по умолчанию.

Имя учетной записи по умолчанию вы можете посмотреть в {ifdef(public,private,private-pg)}списке ниже{/ifdef}{ifdef(private-pdf,private-pg-pdf,private-cert)}{linkto(#tab_name_users_os)[text=таблице %number]}{/ifdef} или в окне {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-password)[text=установки пароля]} в личном кабинете {var(cloud)}.

{cut(Список учетных записей по умолчанию для разных ОС)}

{ifdef(public)}
[cols="1,1", options="header"]
|===
|Операционная система
|Имя пользователя

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
{caption(Таблица {counter(table)[id=numb_tab_name_users_os]} — Имена пользователей ОС)[align=right;position=above;id=tab_name_users_os;number={const(numb_tab_name_users_os)}]}
{/ifndef}
[cols="1,1", options="header"]
|===
|Операционная система
|Имя пользователя

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
## {heading(Лицензии)[id=iaas-oper-system-licenses]}

{var(cloud)} обладает правом лицензировать программное обеспечение на основании соглашений с компаниями:

- Microsoft (Microsoft Services Provider License Agreement — SPLA);
- РЕД СОФТ;
- BaseALT;
- Астра Линукс.

Подробнее — в разделе {linkto(../../../../computing/vm-licenses#vm-licenses)[text=Лицензии для ВМ]}.
{/ifdef}