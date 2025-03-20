<info>

Список ОС Windows, для которых поддерживается миграция в VK Cloud, приведен в разделе [Операционная система](../../concepts/about#operacionnaya_sistema).

</info>

Создание и загрузка образа ВМ в VK Cloud рассмотрены на примере ОС Windows Server 2016 редакции Standard. Для подготовки образа используется компьютер с ОС Windows 11 Pro. Все команды выполняются в консоли Windows PowerShell.

Требования к компьютеру, который используется для подготовки образа:

[cols="1,3", options="header"]
|===
|Компонент
|Требования к компоненту

|Операционная система
|Windows 10/11 (кроме редакции Home), Windows Server 2012 R2 и выше

|Процессор (CPU)
|2–4 ядра с поддержкой технологии виртуализации (Intel VT-x или AMD-V)

|Оперативная память (RAM)
|Минимум 8 ГБ для работы с виртуальными машинами и инструментами. Рекомендуется 16 ГБ и более для комфортной работы с образами Windows, особенно при использовании нескольких виртуальных машин

|Дисковое пространство
|Не менее 50 ГБ свободного места на диске для хранения образов Windows и временных файлов. Рекомендуется использовать SSD для более быстрой обработки файлов и создания образов
|===

## Подготовительные шаги

1. Скачайте установочный ISO-образ ОС Windows, для которого планируется миграция в VK Cloud. Рекомендуется использовать en-US версию образа.
1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

## 1. Подготовьте инструментарий

1. Включите механизм виртуализации Hyper-V.

    1. Перейдите в панель управления компьютера. Для этого нажмите сочетание клавиш WIN+R, в открывшемся окне **Выполнить** введите `control` и нажмите кнопку **OK**.
    1. В панели управления выберите **Программы и компоненты**.
    1. В левом боковом меню выберите **Включение или отключение компонентов Windows**.
    1. Выберите с помощью флажка опцию **Hyper-V** и нажмите кнопку **ОК**.
    1. Перезапустите компьютер.

1. Обновите версию программы Windows Powershell до версии 4 или выше.

    1. Проверьте текущую версию. Для этого запустите Windows PowerShell и выполните команду: `$PSVersionTable.PSVersion` или `get-host`.
    1. Если версия ниже четвертой, установите последнюю версию Windows PowerShell с [официального сайта Microsoft](https://aka.ms/PSWindows) или обратитесь к системному администратору вашей организации для установки обновления с внутреннего ресурса.

1. Установите набор инструментов Windows Assessment and Deployment Kit (ADK).

    1. Проверьте, установлен ли ADK. Для этого перейдите в панель управления в раздел **Программы и компоненты** и найдите программу **Windows Assessment and Deployment Kit**.
    1. Если этой программы нет, скачайте ADK с [официального сайта](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) и установите. Во время установки выберите с помощью флажков все компоненты, кроме **Windows Assessment Toolkit**.

1. [Скачайте](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.266-1/virtio-win.iso) драйверы VirtIO (KVM).
1. [Скачайте](https://github.com/cloudbase/windows-imaging-tools/archive/refs/heads/master.zip) архив репозитория Windows Imaging Tools — инструмента для автоматизации создания Windows-образов.
1. [Скачайте](https://github.com/cloudbase/WindowsUpdateCLI/archive/refs/heads/master.zip) архив репозитория WindowsUpdateCLI — модуля для управления обновлениями Windows.

## 2. Создайте внешний виртуальный коммутатор в Hyper-V

Это позволит вашим виртуальным машинам, созданным из подготовленного образа, подключаться к интернету через физический сетевой адаптер.

1. Запустите Диспетчер Hyper-V. Для этого нажмите сочетание клавиш WIN+R, в открывшемся окне **Выполнить** введите `virtmgmt.msc` и нажмите кнопку **OK**.
1. В левом меню выберите имя вашего компьютера.
1. Справа в панели **Действия** выберите опцию **Диспетчер виртуальных коммутаторов**.
1. В окне **Диспетчер виртуальных коммутаторов** в левом меню выберите опцию **Создать виртуальный сетевой коммутатор**.
1. Выберите значение `Внешний` для типа коммутатора и нажмите кнопку **Создать виртуальный коммутатор**.
1. В поле **Имя** введите имя коммутатора — `external`.
1. Убедитесь, что в разделе **Тип подключения** выбрана внешняя сеть, и выберите из списка сетевой адаптер с доступом в интернет, например адаптер Ethernet или Wi-Fi вашего компьютера.
1. (Опционально) Чтобы разрешить ОС вашего компьютера также использовать этот адаптер, выберите опцию **Разрешить управляющей операционной системе предоставлять общий доступ к этому сетевому адаптеру**.
1. Примените внесенные изменения.
1. Если отобразится предупреждение о том, что эти изменения могут нарушить текущее сетевое подключение, согласитесь продолжить.
1. Завершите создание виртуального коммутатора, нажав кнопку **OK**.

## 3. Подготовьте конфигурацию Windows Imaging Tools

1. Распакуйте архив репозитория Windows Imaging Tools в корневую директорию диска `C:`. В результате будет создана директория `C:\windows-imaging-tools-master`.
1. Создайте в `C:\windows-imaging-tools-master` директории `ISO` и `IMG`. Директория `ISO` будет использоваться для ISO-файлов, `IMG` — для Windows-образа, который будет создан в результате выполнения инструкции.
1. Переместите ISO-файлы с установочным образом Windows и драйверами VirtIO в директорию `ISO`.
1. Перейдите в директорию `ISO`, нажмите правой кнопкой мыши на ISO-файл с установочным образом Windows и выберите из контекстного меню пункт **Подключить**.

    ISO-файл будет смонтирован как виртуальный диск. В проводнике Windows появится новый диск, например `E:`.

## 4. Подготовьте установочный WIM-файл ОС

Установочный ISO-образ Windows может содержать в себе несколько редакций операционной системы. Так как установка проходит в автоматическом режиме, заранее выберите нужную редакцию и экспортируйте ее в отдельный WIM-файл. Для этого:

1. Запустите Windows PowerShell от имени администратора.
1. Выведите список всех версий Windows с помощью команды:

    ```powershell
    Get-WindowsImage -ImagePath E:\sources\Install.wim
    ```

    Здесь `E:\sources\Install.wim` — полный путь на смонтированном виртуальном диске к WIM-файлу с доступными редакциями Windows.

    Появится список редакций с указанием их порядковых номеров в параметре `ImageIndex`:

    ```txt
    ImageIndex      : 1
    ImageName       : Windows Server 2016 Standard
    ImageDescription: Это рекомендуемый вариант. Он сокращает управление и обслуживание за счет установки только того, что требуется для большинства приложений и ролей сервера. Он не включает графический интерфейс пользователя, однако вы можете полностью управлять сервером локально или удаленно с помощью Windows PowerShell или других средств. См. раздел "Варианты установки Windows Server".
    ImageSize       : 9 146 079 566 bytes

    ImageIndex      : 2
    ImageName       : Windows Server 2016 Standard (возможности рабочего стола)
    ImageDescription: Этот вариант подходит, если нужен графический пользовательский интерфейс (например, для обеспечения обратной совместимости приложения, которое не может работать при установке основных серверных компонентов). Поддерживаются все роли и компоненты сервера. Подробнее: "Варианты установки Windows Server".
    ImageSize       : 15 219 002 744 bytes
    ```

1. Создайте директорию `Temp` в корневой директории диска `C:`.
1. Экспортируйте редакцию с `ImageIndex` = `1` с помощью команды:

    ```powershell
    dism `
    /export-image `
    /SourceImageFile:E:\sources\Install.wim `
    /SourceIndex:1 `
    /DestinationImageFile:C:\Temp\install.wim `
    /Compress:max `
    /CheckIntegrity
    ```

    Здесь:

    * `SourceIndex` — порядковый номер экспортируемой редакции.
    * `DestinationImageFile` — полный путь для сохранения экспортируемой редакции.

## 5. Соберите образ локально

1. Перейдите в директорию `C:\windows-imaging-tools-master` и импортируйте модули со скриптами для автоматизации создания образа:

    ```powershell
    Import-Module .\WinImageBuilder.psm1
    Import-Module .\Config.psm1
    Import-Module .\UnattendResources\ini.psm1
    ```

1. Распакуйте архив репозитория WindowsUpdateCLI и перенесите содержимое директории `WindowsUpdateCLI-master` в `C:\windows-imaging-tools-master\UnattendResources\WindowsUpdates`.
1. Создайте конфигурационный файл `config.ini`:

    ```powershell
    $ConfigFilePath = ".\config.ini"
    New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
    ```

1. Откройте созданный файл и отредактируйте параметры:

    ```ini
    wim_file_path=C:\Temp\install.wim
    image_name=Windows Server 2016 Standard
    image_path=C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw
    virtual_disk_format=RAW
    image_type=KVM
    external_switch=external
    virtio_iso_path="C:\windows-imaging-tools-master\ISO\virtio-win.iso"
    time_zone="Russian Standard Time"
    install_qemu_ga=True
    install_updates=True
    purge_updates=False
    disk_layout=BIOS
    ```

    Здесь:

    * `wim_file_path` — полный путь к WIM-файлу выбранной ранее редакции ОС.
    * `image_name` — имя редакции ОС Windows. Должно совпадать со значением параметра `ImageName` для выбранной редакции ОС.
    * `image_path` — полный путь для сохранения создаваемого образа Windows.
    * `virtual_disk_format` — формат виртуального диска.
    * `image_type` — тип образа.
    * `external_switch` — имя ранее созданного виртуального коммутатора.
    * `virtio_iso_path` — полный путь к ISO-файлу с драйверами VirtIO.
    * `time_zone` — название нужной временной зоны. Узнайте названия зон с помощью команды `tzutil /l`.
    * `install_qemu_ga=True` — установка QEMU-агента.
    * `install_updates=True` — установка обновлений Windows при генерации образа.
    * `purge_updates=False` — запрет на очистку директории `WinSXS` после установки обновлений.
    * `disk_layout` — тип разметки диска.

    <info>

    Платформа VK Cloud поддерживает загрузочные диски, размеченные для загрузки ОС с помощью BIOS. Разметка для загрузки через UEFI не поддерживается.

    </info>

1. Запустите локальную сборку образа с помощью команды:

    ```powershell
    New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
    ```

1. Дождитесь завершения операции и убедитесь, что файл `C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw` создан.

## 6. Импортируйте образ в облако VK Cloud

[Воспользуйтесь OpenStack CLI](../../service-management/images/images-manage#import_obraza) для импорта образа:

```bash
openstack image create \
    --progress \
    --private \
    --container-format bare \
    --disk-format raw \
    --file C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw \
    --property store=s3 \
    --property hw_qemu_guest_agent=True \
    --property os_require_quiesce=yes \
    --property mcs:lic:mswinsrv=true \
    --property mcs_name='Windows Server 2016 Standard (en)' \
    --property os_admin_user='Admin' \
    --property os_type=windows \
    <ИМЯ_ОБРАЗА>
```
Замените <ИМЯ_ОБРАЗА> на актуальное. Аргументы вида `--property <ключ>=<значение>` используются для присвоения образу [метатегов](/ru/computing/iaas/service-management/images/image-metadata).

Дождитесь завершения операции. После загрузки образа появится возможность [создавать ВМ](../../service-management/vm/vm-create) стандартными средствами платформы VK Cloud.

## Удалите неиспользуемые ресурсы

Если импортированный образ вам больше не нужен, [удалите его](../../service-management/images/images-manage#udalenie_obraza).
