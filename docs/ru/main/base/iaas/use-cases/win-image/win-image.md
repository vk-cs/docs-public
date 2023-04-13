В VK Cloud поддерживается миграция ОС Windows серверных версий:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

<warn>

VK Cloud не поддерживает миграцию ОС Windows версий 7 / 8 / 8.1 / 10 / 11.

</warn>

В качестве примера использован образ Windows Server 2016 редакции CORE.

## Подготовительные шаги

1. Клонируйте репозиторий со скриптами автоматизированной сборки [windows-imaging-tools](https://github.com/cloudbase/windows-imaging-tools).
1. Клонируйте репозиторий для обновления образа системы [WindowsUpdateCLI](https://github.com/cloudbase/WindowsUpdateCLI/tree/216d0e832a3a1e4a681409792210fb97938e41b9).
1. Убедитесь, что у вас [установлен и настроен](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) Git.
1. [Установите драйвера](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.225-1/virtio-win.iso) VirtIO (KVM).
1. Настройте Hyper-V, если этого не было сделано ранее.
1. [Скачайте и установите](https://learn.microsoft.com/ru-ru/windows-hardware/get-started/adk-install) Windows ADK.
1. Скачайте ISO-образ операционной системы, для которого планируется миграция в VK Cloud. Рекомендуется использовать en-US версию образа.
1. [Установите](../../../../base/account/project/cli/setup) OpenStack CLI, если он еще не установлен. Убедитесь, что вы можете [авторизоваться](../../../../base/account/project/cli/authorization) в облаке с его помощью.

## 1. Подготовьте установочный WIM-файл ОС

<info>

Установочный образ может содержать в себе несколько редакций операционной системы. Так как установка проходит в автоматическом режиме, заранее выберите нужную редакцию и экспортируйте ее в отдельный wim-файл.

</info>

1. Подключите скачанный ISO-образ ОС.
1. Выведите список всех версий Windows с помощью выполненной от имени администратора команды:

    ```powershell
    Get-WindowsImage -ImagePath E:\sources\Install.wim
    ```

    Здесь `E:\sources\Install.wim` — полный пусть к WIM-файлу системы на смонтированном диске.

    Появится список редакций с указанием `ImageIndex` ее номера:

    ```bash
    ImageIndex      : 1
    ImageName       : Windows Server 2016 Standard
    ImageDescription: Это рекомендуемый вариант. Он сокращает управление и обслуживание за счет установки только того, что требуется для большинства приложений и ролей сервера. Он не включает графический интерфейс пользователя, однако вы можете полностью управлять сервером локально или удаленно с помощью Windows PowerShell или других средств. См. раздел "Варианты установки Windows Server".
    ImageSize       : 9 146 079 566 bytes

    ImageIndex      : 2
    ImageName       : Windows Server 2016 Standard (возможности рабочего стола)
    ImageDescription: Этот вариант подходит, если нужен графический пользовательский интерфейс (например, для обеспечения обратной совместимости приложения, которое не может работать при установке основных серверных компонентов). Поддерживаются все роли и компоненты сервера. Подробнее: "Варианты установки Windows Server".
    ImageSize       : 15 219 002 744 bytes
    ```

1. Экспортируйте редакцию с `ImageIndex` = `1` с помощью команды:

    ```powershell
    dism /
    export-image /
    SourceImageFile:E:\sources\Install.wim /
    SourceIndex:1 /
    DestinationImageFile:D:\Temp\install.wim /
    Compress:max /
    CheckIntegrity
    ```

    Здесь:

    - `D:\Temp\install.wim` — полный путь на локальном диске, где будет сохранен экспортируемый образ;
    - `SourceIndex:1` — номер индекса необходимой редакции.

## 2. Настройте внешний коммутатор в Hyper-V

[Создайте](https://learn.microsoft.com/ru-ru/windows-server/virtualization/hyper-v/get-started/create-a-virtual-switch-for-hyper-v-virtual-machines?tabs=hyper-v-manager#create-a-virtual-switch) виртуальный коммутатор `external` с типом подключения **Внешняя сеть**.

## 3. Соберите образ локально

1. Перейдите в каталог `windows-imaging-tools` и импортируйте модули:

    ```powershell
    pushd windows-openstack-imaging-tools
    Import-Module .\WinImageBuilder.psm1
    Import-Module .\Config.psm1
    Import-Module .\UnattendResources\ini.psm1
    ```

1. Перенесите содержимое каталога `WindowsUpdateCLI` в `windows-openstack-imaging-tools\UnattendResources\WindowsUpdates` (если указана опция `install_updates=True`).
1. Создайте конфигурационный файл `config.ini`:

    ```powershell
    $ConfigFilePath = ".\config.ini"
    New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
    ```

1. Откройте созданный файл и вставьте туда код:

    ```ini
    wim_file_path=D:\Temp\install.wim
    image_name=Windows Server 2016 SERVERSTANDARDCORE
    image_path=D:\Win_Server_2016_img.qcow2
    virtual_disk_format=QCOW2
    image_type=KVM
    external_switch=external
    virtio_iso_path="D:\Drivers\virtio.iso"
    time_zone="Russian Standard Time"
    install_qemu_ga=True
    install_updates=True
    purge_updates=False
    compress_qcow2=True
    ```

    Здесь:

    - `external_switch=external` — имя созданного коммутатора;
    - `virtio_iso_path="D:\Drivers\virtio.iso"` — полный путь к ISO-файлу с драйверами VirtIO;
    - `time_zone="Russian Standard Time"` — временная зона, можно узнать с помощью команды `tzutil /l`;
    - `purge_updates=False` — не очищать каталог `WinSXS` после установки обновлений.

1. Запустите локальную сборку образа с помощью команды:

    ```powershell
    New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
    ```

1. Дождитесь завершения выполнения операции и убедитесь, что файл `D:\Win_Server_2016_img.qcow2` создан.

## 4. Импортируйте образ в облако VK Cloud

[Воспользуйтесь CLI](../../instructions/vm-images/vm-images-manage#import-obraza) для импорта образа:

```bash
openstack image create --private --container-format bare --disk-format qcow2 --file D:\Win_Server_2016_img.qcow2 --property hw_qemu_guest_agent=yes --property store=s3 --property min_ram=2048 --property os_require_quiesce=yes --property min_disk=40 --property os_type=windows --property os_admin_user=Administrator --property mcs:lic:mswinsrv=true --property mcs_name='Windows Server 2016 Standard (en)' --property mcs_os_distro='server' --property mcs_os_edition='std' --property mcs_os_type='windows' --property mcs_os_lang='en' --property mcs_os_type='windows' --property mcs_os_version='2016' --property os_distro='win2k16' <Наименование образа>
```

Дождитесь завершения операции. После загрузки образа появится возможность [создавать ВМ](../../instructions/vm/vm-create/) стандартными средствами платформы VK Cloud.

## Проконтролируйте использование ресурсов

Если импортированный образ вам больше не нужен, [удалите его](../../instructions/vm-images/vm-images-manage#udalenie-obraza).
