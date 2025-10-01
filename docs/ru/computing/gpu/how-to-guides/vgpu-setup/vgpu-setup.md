Если для работы с vGPU вы создали виртуальную машину из собственного образа, нужно выполнить дополнительную настройку ОС: установить драйверы GPU и токен лицензирования.

Если использовался образ от VK Cloud, то дополнительные действия не требуются.

## {heading(Подготовительные шаги)[id=preparatory_steps]}

1. [Подключите](/ru/computing/gpu/connect) сервис Cloud GPU, если он еще не подключен.
1. Запросите в [технической поддержке](/ru/contacts) квоты на шаблон конфигурации ВМ на базе vGPU.
1. Подготовьте [образ](/ru/computing/iaas/concepts/image-vm) одним из способов:

    - [Создайте](/ru/computing/iaas/instructions/images/images-manage#sozdanie_obraza) из уже существующей [виртуальной машины](/ru/computing/iaas/concepts/vm).

    - [Импортируйте](/ru/computing/iaas/instructions/images/images-manage#import_obraza) из файла образа.

        Рекомендуется использовать [подготовленный образ](https://docs.openstack.org/image-guide/obtain-images.html) с поддержкой [cloud-init](https://cloudinit.readthedocs.io/) (Linux) или [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) (Windows). Это позволяет автоматизировать настройку параметров ОС, связанных с облачной платформой.

        Некоторые способы создания таких образов приведены в [практических руководствах Cloud Servers](/ru/computing/iaas/how-to-guides).

1. [Создайте](/ru/computing/iaas/instructions/vm/vm-create#create_vm) виртуальную машину на базе [шаблонов конфигурации vGPU](/ru/computing/gpu/concepts/about#vgpu_flavors) и созданного образа.

    Виртуальная машина должна иметь подключение к интернету.

1. [Подключитесь](/ru/computing/iaas/instructions/vm/vm-connect) к ВМ.

## {heading({counter(toc-counter)}. Установите драйвер GPU)[id=driver-install]}

{tabs}

{tab(Linux)}

1. Выполните предварительную настройку ОС:

    {tabs}

    {tab(apt)}

    1. Обновите системные компоненты:

        ```shell
        sudo apt update &&
        sudo apt upgrade -y
        ```

    1. Перезагрузите ВМ.

    1. Установите дополнительные пакеты, необходимые для установки драйвера:

        ```shell
        sudo apt install linux-headers-$(uname -r) gcc make
        ```

    {/tab}

    {tab(dnf)}

    1. Обновите системные компоненты:

        ```shell
        sudo dnf update
        ```

    1. Перезагрузите ВМ.

    1. Установите дополнительные пакеты, необходимые для установки драйвера:

        ```shell
        sudo dnf install -y kernel-devel kernel-headers gcc make
        ```

    {/tab}

    {/tabs}

1. Загрузите драйвер NVIDIA® GRID одним из способов:

    {tabs}

    {tab(wget)}

    ```shell
    wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/NVIDIA-Linux-x86_64-535.247.01-grid.run
    ```

    {/tab}

    {tab(curl)}

    ```shell
    curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/NVIDIA-Linux-x86_64-535.247.01-grid.run
    ```

    {/tab}

    {/tabs}

1. Выдайте права на исполнение для скачанного файла:

    ```shell
    chmod +x NVIDIA-Linux-x86_64-535.247.01-grid.run
    ```

1. Запустите установку:

    ```shell
    sudo ./NVIDIA-Linux-x86_64-535.247.01-grid.run
    ```

1. Следуйте инструкциям установщика.
1. Перезапустите ВМ.

{/tab}

{tab(Windows)}

1. [Скачайте](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/539.28_grid_win10_win11_server2019_server2022_dch_64bit_international.exe) драйвер NVIDIA® GRID.
1. Запустите файл и следуйте инструкциям установщика.
1. Перезагрузите ВМ.

{note:warn}

После установки драйверов VNC-консоль будет недоступна для управления ВМ. Для дальнейшей работы используйте RDP-подключение либо установите альтернативное ПО для удаленного управления.

{/note}

{/tab}

{/tabs}


## {heading({counter(toc-counter)}. Настройте лицензирование)[id=license-setup]}

{tabs}

{tab(Linux)}

1. Загрузите скрипт лицензирования одним из способов:

    {tabs}

    {tab(wget)}

    ```shell
    wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
    ```

    {/tab}

    {tab(curl)}

    ```shell
    curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
    ```

    {/tab}

    {/tabs}

1. Выдайте права на исполнение скрипта:

    ```shell
    chmod +x nvidia_token_fetcher
    ```

1. Запустите скрипт:

    ```shell
    sudo ./nvidia_token_fetcher
    ```

1. (Опционально) Настройте автоматическую проверку токена лицензирования при запуске системы. Порядок действий зависит от поддержки [cloud-init](https://cloudinit.readthedocs.io/) в образе, из которого создана ВМ.

    {tabs}

    {tab(Образ с поддержкой cloud-init)}

    Скопируйте файл скрипта в специальную директорию: 

    ```shell
    sudo cp nvidia_token_fetcher /var/lib/cloud/scripts/per-boot/
    ```

    {/tab}

    {tab(Образ без поддержки cloud-init)}     

    1. Сохраните файл скрипта в общедоступной директории:

        ```shell
        sudo cp nvidia_token_fetcher /usr/local/bin/
        ```

    1. Создайте новый unit-файл для подсистемы systemd:

        ```shell
        sudo nano /etc/systemd/system/nvidia-token.service
        ```

        В указанном примере используется текстовый редактор `nano`, но вы также можете использовать любой другой, например `vi`. 

    1. Скопируйте содержимое в файл и сохраните:

        ```txt
        [Unit]
        Description=NVIDIA Licensing Script
        After=network.target

        [Service]
        Type=oneshot
        ExecStart=/usr/local/bin/nvidia_token_fetcher
        TimeoutStartSec=15
        RemainAfterExit=false

        [Install]
        WantedBy=multi-user.target
        ```

    1. Включите сервис, чтобы он запускался при старте системы:

        ```shell
        sudo systemctl enable nvidia-token.service
        ```
    {/tab}

    {/tabs}

{/tab}

{tab(Windows)}

1. [Скачайте](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher.exe) скрипт лицензирования и запустите его.

    Появится окно с командным интерфейсом, которое почти сразу же закроется. На этом работа скрипта завершена.

1. (Опционально) Настройте автоматическую проверку токена лицензирования при запуске системы. Порядок действий зависит от поддержки [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) в образе, из которого создана ВМ.

    {tabs}

    {tab(Образ с поддержкой Cloudbase-Init)}

    1. Скопируйте файл скрипта в специальную директорию:

        ```plaintext
        C:\Program Files\Cloudbase Solutions\Cloudbase-Init\LocalScripts
        ```

    1. Откройте в текстовом редакторе файл конфигурации `cloudbase-init.conf`:

        ```plaintext
        C:\Program Files\Cloudbase Solutions\Cloudbase-Init\conf\cloudbase-init.conf
        ```

    1. Проверьте, что в поле `plugins` присутствует плагин локальных скриптов:

        ```plaintext
        plugins = cloudbaseinit.plugins.windows.localscripts.LocalScriptsPlugin
        ```

        Если его нет, добавьте. Если плагинов несколько, они перечисляются через запятую.

    1. Сохраните файл и перезапустите службу `cloudbase-init`. Для этого в командной строке или PowerShell выполните команду:

        ```shell
        net stop cloudbase-init
        net start cloudbase-init
        ```

    {/tab}

    {tab(Образ без поддержки Cloudbase-Init)}

    1. Сохраните файл в доступном месте. Пример:

        ```plaintext
        C:\NVIDIA Token
        ```

    1. Нажмите правой кнопкой мыши на файл скрипта и выберите **Создать ярлык**.

        Будет создан файл с названием в формате `<НАЗВАНИЕ_ФАЙЛА> - ярлык`.

    1. Скопируйте полученный файл в директорию:

        ```plaintext
        C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
        ```

    {/tab}

    {/tabs}

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. Проверьте работоспособность)[id=diagnostics]}

{tabs}

{tab(Linux)}

1. Проверьте подключенные устройства:

    ```shell
    lspci | grep -i nvidia
    ```

    Будет выведено название GPU вашей конфигурации.

1. Узнайте статус драйвера:
    
    ```shell
    nvidia-smi
    ```

    Если драйвер работает корректно, в выводе будет GPU вашей конфигурации.

1. Проверьте настройки лицензирования:

    1. Убедитесь в наличии файла токена лицензирования:

        ```shell
        sudo ls /etc/nvidia/ClientConfigToken/
        ```

    1. Узнайте статус лицензии:

        ```shell
        nvidia-smi -q | grep -i license
        ```

        Вывод при корректной настройке лицензирования:

        ```shell
        vGPU Software Licensed Product
            License Status: Licensed
        ```
    
{/tab}

{tab(Windows)}

1. Проверьте, что GPU отображается в диспетчере устройств:

    1. Нажмите сочетание клавиш WIN + X.
    1. Выберите **Диспетчер устройств**.
    1. Дважды щелкните по пункту **Видеоадаптеры**.
    1. Убедитесь, что устройство GPU отображается.

1. Проверьте работу драйвера. Для этого в командной строке или PowerShell выполните команду:

    ```shell
    nvidia-smi
    ```

    Если драйвер работает корректно, в выводе будет GPU вашей конфигурации.

1. Проверьте настройки лицензирования:

    1. Убедитесь в наличии файла токена лицензирования. Для этого в командной строке или PowerShell выполните команду:
    
        ```shell
        dir "C:\Program Files\NVIDIA Corporation\vGPU Licensing\ClientConfigToken\"
        ```

    1. Проверьте статус лицензии:

        ```shell
        nvidia-smi -q | grep -i license
        ```

        Вывод при корректной настройке лицензирования:

        ```shell
        vGPU Software Licensed Product
            License Status: Licensed
        ```

{/tab}

{/tabs}