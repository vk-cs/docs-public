Образы ВМ могут иметь метатеги, уточняющие настройки работы инфраструктуры. Такие теги задаются при создании образа ВМ, или позже, при редактировании образа.

Теги образа можно просмотреть с помощью команды `image show`, выполняемой в Openstack CLI:

```
openstack image show
```

Теги образа можно редактировать с помощью команды `image set`:

```
openstack image set
```

Теги образов ВМ делятся на два типа:
* os_* - включают различные настройки для гостевой операционной системы;
* hw_* - включают различные настройки виртуальной машины.

## Таблица поддерживаемых тегов образов

|Название|Описание|Значение по умолчанию|Пример|
| --- | --- | --- | --- |
| `os_type`  | Тип гостевой ОС внутри виртуальной машины, создаваемой из указанного образа. Влияет на конфигурацию виртуальной машины под указанный тип ОС. Например, для OS Windows будут включены специальные capabilities гипервизора для улучшения стабильности и производительности гостевой ОС.|`None` | `os_type="windows"`,`os_type="linux"`|
| `os_distro`| Дистрибутив гостевой ОС внутри виртуальной машины, создаваемой из указанного образа. Влияет на конфигурацию виртуальной машины под указанный дистрибутив ОС.  Например, влияет на типы виртуальных сетевых устройств. Такие настройки берутся из сервиса `nova-compute` через библиотеку `osinfo-db`, которая содержит описания различных дистрибутивов гостевых ОС и рекомендованные для них настройки виртуализации. | `None` | `os_distro="win2k"` |
| `os_version`| Версия гостевой ОС внутри виртуальной машины, создаваемой из указанного образа.  | `None` |`None`  |
| `os_admin_user` | Пользователь внутри гостевой ОС с правами администратора. Для этого пользователя будет устанавливаться пароль при возможной его смене через Nova API.| Для `os_type=="windows"` - "Administrator", для всех остальных - "root".| `os_admin_user="Admin"`,`os_admin_user="centos"` |
| `os_require_quiesce` | Указывает, является ли обязательным для гостевой ОС заморозка файловой системы перед снятием снапшота подключенных томов. Если да, и заморозка завершилась неудачей, операция снятия снапшота будет отменена.| `False`| `os_require_quiesce="true"` |
| `hw_vif_model` | Тип виртуализации сетевого интерфейса. Этой опцией можно переопределить стандартное поведение гипервизора и то что `nova-compute` определила для указанного в `os_distro` дистрибутива гостевой ОС. Например, новая версия `osinfo-db` для OS Windows рекомендует использовать тип сетевого интерфейса `e1000e`, так как считает что в дефолтной поставке OS Windows нет `virtio` драйверов. Поэтому, если в образе OS Windows есть `virtio` драйвера, можно переопределить значение на `virtio`. | Определяется для конкретной ОС через `osinfo-db` или используется `virtio` по умолчанию. | `hw_vif_model="virtio"` |
|`sid`|Идентификатор PAAS сервиса, который использует этот образ. Обязателен для PAAS образов |`None` | `sid="trove"`,`sid="sahara"` |
| `hw_qemu_guest_agent` | Если содержит значение `True`, гостевой агент QEMU будет отображаться для инстанса. |`None` | `hw_qemu_guest_agent="true"`|
| `private_net_only` | Определяет, можно ли из этого образа создавать ВМ во внешних сетях. Либо имеет значение `true`, либо отсутсвует. | `None` | `private_net_only="true"` |
| `mcs_name` | Показывает имя образа, которое отображается пользователю| `None` | `mcs_name="Windows Server 2016"`, `mcs_name="Ubuntu 18.04"` |

## Рекомендации

Для образов OS Windows в которых есть `virtio` драйвера необходимо указывать:

```
os_type="windows";
os_distro="win2k16" -- Значение `win2k16` выбрано для примера. См. "Выбор значения для os_distro";
os_admin_user="Admin" -- Указывать только если пользователь внутри гостевой ОС отличается от стандартного;
os_require_quiesce="true";
hw_vif_model="virtio" -- Указывать только если внутри гостевой ОС установлены virtio драйвера.
```

### Выбор значения для os_distro

Чтобы определить, какое значение нужно установить для тега `os_distro`, необходимо выполнить команду `osinfo-query os vendor="Microsoft Corporation"` на любом compute хосте и выбрать подходящее значение из колонки Short ID
```
osinfo-query os vendor="Microsoft Corporation"
 Short ID             | Name                                               | Version  | ID
----------------------+----------------------------------------------------+----------+-----------------------------------------
 win1.0               | Microsoft Windows 1.0                              | 1.0      | http://microsoft.com/win/1.0
 win10                | Microsoft Windows 10                               | 10.0     | http://microsoft.com/win/10
 win2.0               | Microsoft Windows 2.0                              | 2.0      | http://microsoft.com/win/2.0
 win2.1               | Microsoft Windows 2.1                              | 2.1      | http://microsoft.com/win/2.1
 win2k                | Microsoft Windows 2000                             | 5.0      | http://microsoft.com/win/2k
 win2k12              | Microsoft Windows Server 2012                      | 6.3      | http://microsoft.com/win/2k12
 win2k12r2            | Microsoft Windows Server 2012 R2                   | 6.3      | http://microsoft.com/win/2k12r2
 win2k16              | Microsoft Windows Server 2016                      | 10.0     | http://microsoft.com/win/2k16
 win2k3               | Microsoft Windows Server 2003                      | 5.2      | http://microsoft.com/win/2k3
 win2k3r2             | Microsoft Windows Server 2003 R2                   | 5.2      | http://microsoft.com/win/2k3r2
 win2k8               | Microsoft Windows Server 2008                      | 6.0      | http://microsoft.com/win/2k8
 win2k8r2             | Microsoft Windows Server 2008 R2                   | 6.1      | http://microsoft.com/win/2k8r2
 win3.1               | Microsoft Windows 3.1                              | 3.1      | http://microsoft.com/win/3.1
 win7                 | Microsoft Windows 7                                | 6.1      | http://microsoft.com/win/7
 win8                 | Microsoft Windows 8                                | 6.2      | http://microsoft.com/win/8
 win8.1               | Microsoft Windows 8.1                              | 6.3      | http://microsoft.com/win/8.1
 win95                | Microsoft Windows 95                               | 4.0      | http://microsoft.com/win/95
 win98                | Microsoft Windows 98                               | 4.1      | http://microsoft.com/win/98
 winme                | Microsoft Windows Millennium Edition               | 4.9      | http://microsoft.com/win/me
 winnt3.1             | Microsoft Windows NT Server 3.1                    | 3.1      | http://microsoft.com/winnt/3.1
 winnt3.5             | Microsoft Windows NT Server 3.5                    | 3.5      | http://microsoft.com/winnt/3.5
 winnt3.51            | Microsoft Windows NT Server 3.51                   | 3.51     | http://microsoft.com/winnt/3.51
 winnt4.0             | Microsoft Windows NT Server 4.0                    | 4.0      | http://microsoft.com/winnt/4.0
 winvista             | Microsoft Windows Vista                            | 6.0      | http://microsoft.com/win/vista
 winxp                | Microsoft Windows XP                               | 5.1      | http://microsoft.com/win/xp
 ```