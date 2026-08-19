# {heading(Установка Windows-драйвера vGPU с настройкой токена лицензирования)[id=gpu-instructions-driver-install-vgpu-windows]}

{note:info}
Для ВМ, {linkto(../../../../iaas/instructions/vm/vm-create#iaas-vm-create)[text=созданных]} из специального Windows-образа {var(cloud)} для vGPU, достаточно при первом запуске один раз {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win-vm)[text=подключиться]} к ВМ и перезагрузить ее, чтобы полностью инициализировать все драйверы и службы vGPU. Отдельно устанавливать драйвер vGPU и настраивать токен лицензирования не нужно.
{/note}

После выполнения инструкции драйвер vGPU будет установлен, а токен лицензирования — настроен.

Драйвер vGPU не поддерживает обновление. Чтобы изменить его версию, сначала {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-windows)[text=удалите]} его, а затем повторно установите, выполнив шаги этой инструкции заново.

## {heading(Подготовительные шаги)[id=gpu-instructions-driver-install-vgpu-windows-preparation]}

1. Проверьте тип конфигурации вашей ВМ:

   1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. В появившемся списке найдите ВМ, для которой необходимо установить драйвер vGPU. Убедитесь, что в столбце **Тип** указан {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=шаблон конфигурации vGPU]}.

1. {linkto(../../../../iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} ВМ к внешней сети, если этого не было сделано ранее.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с vGPU.

## {heading({counter(TOC)}. Установите драйвер vGPU)[id=gpu-instructions-vgpu-windows-install]}

1. [Скачайте](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_windows.exe) драйвер NVIDIA® GRID.
1. Запустите файл и следуйте инструкциям установщика.

   {note:warn}
   После установки драйвера VNC-консоль будет недоступна для управления ВМ. Для дальнейшей работы используйте RDP-подключение либо установите альтернативное ПО для удаленного управления.
   {/note}

1. Перезапустите ВМ.
1. (Опционально) Проверьте работоспособность драйвера:

   1. Нажмите сочетание клавиш WIN + X.
   1. Выберите **Диспетчер устройств**.
   1. Дважды щелкните по пункту **Видеоадаптеры**.
   1. Убедитесь, что устройство GPU отображается.
   1. В командной строке или PowerShell выполните команду:

      ```shell
      nvidia-smi
      ```

      Если драйвер работает корректно, в выводе будет vGPU вашей конфигурации.

## {heading({counter(TOC)}. Настройте токен лицензирования)[id=gpu-instructions-vgpu-windows-token]}

1. [Скачайте](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher.exe) скрипт лицензирования и запустите его.

   Появится окно с командным интерфейсом, которое почти сразу же закроется. На этом работа скрипта завершена.

1. Проверьте настройки лицензирования с помощью командной строки или PowerShell:

   1. Убедитесь в наличии файла токена лицензирования:
    
      ```shell
      dir "C:\Program Files\NVIDIA Corporation\vGPU Licensing\ClientConfigToken\"
      ```

   1. Запросите информацию от `nvidia-smi`:

      ```shell
      nvidia-smi -q
      ```

   1. Убедитесь, что `License Status` в разделе `vGPU Software Licensed Product` имеет значение `Licensed`.

1. (Опционально) Настройте автоматическую проверку токена лицензирования при запуске системы.

   Автоматизацию можно настроить с помощью [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) или с помощью встроенного механизма автозагрузки ОС Windows.

   {tabs}

   {tab(Cloudbase-Init)}

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

      Если его нет, добавьте. Если плагинов несколько, перечислите их через запятую.

   1. Сохраните файл и перезапустите службу `cloudbase-init`. Для этого в командной строке или PowerShell выполните команды:

      ```shell
      net stop cloudbase-init
      net start cloudbase-init
      ```

   {/tab}

   {tab(Автозагрузка)}

   1. Сохраните файл в доступном месте. Пример:

      ```plaintext
      C:\NVIDIA Token
      ```

   1. Нажмите правой кнопкой мыши на файл скрипта и выберите **Создать ярлык**.

      Будет создан файл с названием в формате `<НАЗВАНИЕ_ФАЙЛА> - ярлык`.

   1. Скопируйте полученный ярлык в директорию:

      ```plaintext
      C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
      ```

   {/tab}

   {/tabs}
