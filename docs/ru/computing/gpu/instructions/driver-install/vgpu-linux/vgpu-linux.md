# {heading(Установка Linux-драйвера vGPU с настройкой токена лицензирования)[id=gpu-instructions-driver-install-vgpu-linux]}

{note:info}
Для ВМ, {linkto(../../../../iaas/instructions/vm/vm-create#iaas-vm-create)[text=созданных]} из специального Linux-образа {var(cloud)} для vGPU, не нужно дополнительно устанавливать драйвер vGPU и настраивать токен лицензирования.
{/note}

После выполнения инструкции драйвер vGPU будет установлен, а токен лицензирования — настроен.

Драйвер vGPU не поддерживает обновление. Чтобы изменить его версию, сначала {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=удалите]} его, а затем повторно установите, выполнив шаги этой инструкции заново.

## {heading(Подготовительные шаги)[id=gpu-instructions-driver-install-vgpu-linux-preparation]}

1. Проверьте тип конфигурации вашей ВМ:

   1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. В появившемся списке найдите ВМ, для которой необходимо установить драйвер vGPU. Убедитесь, что в столбце **Тип** указан {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=шаблон конфигурации vGPU]}.

1. {linkto(../../../../iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} ВМ к внешней сети, если этого не было сделано ранее.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с vGPU.

## {heading({counter(TOC)}. Установите драйвер vGPU)[id=gpu-instructions-vgpu-linux-install]}

1. Проверьте, установлен ли драйвер vGPU:

   ```console
   nvidia-smi --query-gpu=driver_version,virtualization.mode,virtualization.virtualized,name --format=csv,noheader
   ```

   Возможны следующие результаты:

   - Ошибка `No such file or directory` означает, что драйвер не установлен.
   - В выводе команды указывается версия драйвера, а тип виртуализации указан как vGPU. Это означает, что драйвер уже установлен и стек NVIDIA успешно инициализирован. В дальнейших действиях нет необходимости.
   - `nvidia-smi` выполняется, но в выводе команды ошибка `... couldn’t communicate with the NVIDIA driver`. Это означает, что драйвер поврежден или используется его некорректная версия (например, для {linkto(../../../concepts/about#gpu-about-flavors-model)[text=выделенных GPU]}). Необходимо переустановить драйвер, для этого сначала {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=удалите]} его, а затем повторно установите, выполнив шаги этой инструкции заново.

1. Выполните предварительную настройку ОС:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. (Опционально) Обновите системные компоненты и перезагрузите ВМ, чтобы исключить проблемы с совместимостью.

      {note:warn}
      Вместе с компонентами может обновиться версия ядра Linux. Если в ОС уже используется ПО, которому необходима текущая версия ядра, этот шаг лучше пропустить.
      {/note}

      Выполните команды:

      ```shell
      sudo apt update &&
      sudo apt upgrade -y &&
      sudo reboot
      ```

   1. Установите дополнительные пакеты, необходимые для установки драйвера:

      ```shell
      sudo apt install -y build-essential dkms perl pkg-config libelf-dev linux-headers-$(uname -r)
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. (Опционально) Обновите системные компоненты и перезагрузите ВМ, чтобы исключить проблемы с совместимостью.

      {note:warn}
      Вместе с компонентами может обновиться версия ядра Linux. Если в ОС уже используется ПО, которому необходима текущая версия ядра, этот шаг лучше пропустить.
      {/note}

      Выполните команды:

      ```shell
      sudo dnf update -y &&
      sudo reboot
      ```

   1. Установите дополнительные пакеты, необходимые для установки драйвера:

      ```shell
      sudo dnf -y install gcc make perl dkms pkgconf-pkg-config elfutils-libelf-devel "kernel-devel-uname-r == $(uname -r)" "kernel-headers-uname-r == $(uname -r)"
      ```

   {/tab}

   {/tabs}

1. Загрузите драйвер NVIDIA® GRID одним из способов:

   {tabs}

   {tab(wget)}

   ```shell
   wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {tab(curl)}

   ```shell
   curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {/tabs}

1. Выдайте права на исполнение для скачанного файла:

   ```shell
   chmod +x vgpu_driver_linux.run
   ```

1. Запустите файл и следуйте инструкциям установщика:

   ```shell
   sudo ./vgpu_driver_linux.run
   ```

1. Перезапустите ВМ.

## {heading({counter(TOC)}. Настройте токен лицензирования)[id=gpu-instructions-vgpu-linux-token]}

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

1. (Опционально) Настройте автоматическую проверку токена лицензирования при запуске системы.

   Если при создании ВМ использовался [подготовленный OpenStack-образ](https://docs.openstack.org/image-guide/obtain-images.html), автоматизация может быть настроена при помощи [cloud-init](https://cloudinit.readthedocs.io/). Также можно использовать возможности systemd.

   {tabs}

   {tab(Интеграция в cloud-init)}

   Скопируйте файл скрипта в специальную директорию: 

   ```shell
   sudo cp nvidia_token_fetcher /var/lib/cloud/scripts/per-boot/
   ```

   {/tab}

   {tab(Создание unit-файла для systemd)}     

   1. Сохраните файл скрипта в общедоступной директории:

      ```shell
      sudo cp nvidia_token_fetcher /usr/local/bin/
      ```

   1. Создайте новый unit-файл для подсистемы systemd. Пример для текстового редактора `nano`:

      ```shell
      sudo nano /etc/systemd/system/nvidia-token.service
      ```

      Вместо `nano` в команде можно использовать любой другой редактор, например `vi`. 

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

   1. Выполните команду для автоматического запуска при старте системы:

      ```shell
      sudo systemctl enable nvidia-token.service
      ```

   {/tab}

   {/tabs}
