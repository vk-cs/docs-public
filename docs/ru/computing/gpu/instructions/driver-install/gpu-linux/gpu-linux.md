# {heading(Установка Linux-драйвера GPU)[id=gpu-instructions-driver-install-gpu-linux]}

{note:info}

Установка драйвера GPU на ВМ с ОС Windows выполняется в интерактивном режиме с помощью установочного файла с [сайта производителя](https://www.nvidia.com/en-us/drivers/). 

{/note}

1. Проверьте тип конфигурации вашей ВМ:

   1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. В появившемся списке найдите ВМ, для которой необходимо установить драйвер GPU. Убедитесь, что в столбце **Тип** указан {linkto(../../../concepts/about#gpu-about-flavors-model)[text=шаблон конфигурации выделенного GPU]}.

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU или {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} новую, если этого не было сделано ранее.
1. Проверьте, установлен ли драйвер GPU:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   Возможны следующие результаты:

   - Ошибка `No such file or directory` означает, что драйвер не установлен.
   - В выводе команды указывается версия драйвера. Это означает, что драйвер уже установлен и стек NVIDIA успешно инициализирован. Перейдите в раздел {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=%text]}.
   - `nvidia-smi` выполняется, но в выводе команды ошибка `... couldn’t communicate with the NVIDIA driver`. Это означает, что драйвер поврежден или используется его некорректная версия (например, для {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=vGPU]}). Переустановите драйвер: сначала {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=удалите]} драйвер GPU, затем повторно установите его, выполнив шаги этой инструкции заново.
   
1. Установите драйвер:

   {note:info}

   Драйвер устанавливается из [репозитория NVIDIA CUDA](https://developer.download.nvidia.com/compute/cuda/repos/).

   {/note}

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Определите версию дистрибутива:

      ```console
      cat /etc/os-release
      ```

   1. Загрузите и установите пакет `cuda-keyring_1.1-1_all.deb` из репозитория NVIDIA CUDA для соответствующей версии вашего дистрибутива:

      ```console
      wget https://developer.download.nvidia.com/compute/cuda/repos/<ДИСТРИБУТИВ><ВЕРСИЯ>/x86_64/cuda-keyring_1.1-1_all.deb && \
      sudo dpkg -i cuda-keyring_1.1-1_all.deb
      ```

      Здесь:

      - `<ДИСТРИБУТИВ>` — название дистрибутива латиницей.
      - `<ВЕРСИЯ>` — версия дистрибутива. Указываются только числа, без точек.

      Примеры: `debian13`, `ubuntu2404`.

   1. Обновите индексы пакетного менеджера:

      ```console
      sudo apt update
      ```

   1. Убедитесь, что для установки доступна нужная или более новая версия драйвера:

      ```console
      apt-cache policy cuda-drivers
      ```

      При успешном выполнении команды в выводе будет поле `Candidate`, которое указывает версию для установки из метапакета `cuda-drivers`.

   1. Установите драйвер:

      ```console
      sudo apt -y install cuda-drivers-<ВЕРСИЯ_ВЕТКИ>
      ```

      Здесь `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, из которой необходимо установить драйвер. Например, `550`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Определите версию Red Hat Enterprise Linux вашего дистрибутива:

      ```console
      rpm -E %rhel
      ```

   1. Добавьте репозиторий NVIDIA CUDA в качестве источника:

      ```console
      sudo tee /etc/yum.repos.d/nvidia-cuda.repo >/dev/null <<EOF
      [cuda-rhel<ВЕРСИЯ>-x86_64]
      name=NVIDIA CUDA Repository (rhel<ВЕРСИЯ>/x86_64)
      baseurl=https://developer.download.nvidia.com/compute/cuda/repos/rhel<ВЕРСИЯ>/x86_64/
      enabled=1
      gpgcheck=1
      repo_gpgcheck=0
      gpgkey=https://developer.download.nvidia.com/compute/cuda/repos/rhel<ВЕРСИЯ>/x86_64/D42D0685.pub
      EOF
      ```

      Здесь `<ВЕРСИЯ>` — номер версии Red Hat Enterprise Linux, на которой основан ваш дистрибутив.

   1. Обновите кеш пакетного менеджера:

      ```console
      sudo dnf clean all
      sudo dnf makecache --refresh
      ```

   1. Убедитесь, что для установки доступна нужная или более новая версия драйвера:

      ```console
      dnf repoquery --show-duplicates --latest-limit=0 cuda-drivers
      ```

   1. Установите драйвер:

      ```console
      sudo dnf install '<ПАКЕТ_ДРАЙВЕРА>'
      ```

      Здесь `<ПАКЕТ_ДРАЙВЕРА>` — название пакета из списка, полученного в предыдущем пункте. Например, `cuda-drivers-3:570.211.01-1.el9.x86_64`.

   {/tab}

   {/tabs}

   1. Проверьте, что драйвер установлен:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Если при попытке выполнить команду появилась ошибка `command not found`, добавьте `nvidia-smi` в переменные окружения вручную:

      ```console
      echo 'export PATH="$PATH:/usr/bin"' | sudo tee /etc/profile.d/nvidia-smi-path.sh >/dev/null &&
      source /etc/profile.d/nvidia-smi-path.sh
      ```

   1. Повторно проверьте работоспособность `nvidia-smi`:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Перезагрузите ВМ.
