# {heading(Установка, обновление и удаление Linux-драйвера GPU)[id=gpu-instructions-gpu-driver]}

{note:info}

Для установки драйвера vGPU воспользуйтесь руководством {linkto(../vgpu-setup#vgpu-setup)[text=%text]}.

{/note}

## {heading(Установка драйвера GPU)[id=gpu-instructions-gpu-driver-install]}

{note:info}

Драйвер устанавливается из [репозитория NVIDIA CUDA](https://developer.download.nvidia.com/compute/cuda/repos/).

{/note}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU или {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} новую, если этого не было сделано ранее.
1. Проверьте, установлен ли драйвер GPU:

   ```bash
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   Ошибка `No such file or directory` означает, что драйвер не установлен. Если вместо ошибки отображается версия — перейдите в раздел {linkto(#gpu-instructions-gpu-driver-update)[text=%text]}.

1. Установите драйвер:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Определите версию дистрибутива:

      ```bash
      cat /etc/os-release
      ```

   1. Загрузите и установите пакет `cuda-keyring_1.1-1_all.deb` из репозитория NVIDIA CUDA для соответствующей версии вашего дистрибутива:

      ```bash
      wget https://developer.download.nvidia.com/compute/cuda/repos/<ДИСТРИБУТИВ><ВЕРСИЯ>/x86_64/cuda-keyring_1.1-1_all.deb && \
      sudo dpkg -i cuda-keyring_1.1-1_all.deb
      ```

      Здесь:

      - `<ДИСТРИБУТИВ>` — название дистрибутива латиницей.
      - `<ВЕРСИЯ>` — версия дистрибутива. Указываются только числа, без точек.

      Примеры: `debian13`, `ubuntu2404`.

   1. Обновите индексы пакетного менеджера:

      ```bash
      sudo apt update
      ```

   1. Убедитесь, что для установки доступна нужная или более новая версия драйвера:

      ```bash
      apt-cache policy cuda-drivers
      ```

      При успешном выполнении команды в выводе будет поле `Candidate`, которое указывает версию для установки из метапакета `cuda-drivers`.

   1. Установите драйвер:

      ```bash
      sudo apt -y install cuda-drivers-<ВЕРСИЯ_ВЕТКИ>
      ```

      Здесь `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, из которой необходимо установить драйвер. Например, `550`.

   {/tab}

   {tab(RHEL)}

   1. Определите версию RHEL вашего дистрибутива:

      ```bash
      rpm -E %rhel
      ```

   1. Добавьте репозиторий NVIDIA CUDA в качестве источника:

      ```bash
      sudo tee /etc/yum.repos.d/nvidia-cuda.repo >/dev/null <<EOF
      [cuda-rhel<ВЕРСИЯ_RHEL>-x86_64]
      name=NVIDIA CUDA Repository (rhel<ВЕРСИЯ_RHEL>/x86_64)
      baseurl=https://developer.download.nvidia.com/compute/cuda/repos/rhel<ВЕРСИЯ_RHEL>/x86_64/
      enabled=1
      gpgcheck=1
      repo_gpgcheck=0
      gpgkey=https://developer.download.nvidia.com/compute/cuda/repos/rhel<ВЕРСИЯ_RHEL>/x86_64/D42D0685.pub
      EOF
      ```

      Здесь `<ВЕРСИЯ_RHEL>` — номер версии RHEL, на которой основан ваш дистрибутив.

   1. Обновите кеш пакетного менеджера:

      ```bash
      sudo dnf clean all
      sudo dnf makecache --refresh
      ```

   1. Убедитесь, что для установки доступна нужная или более новая версия драйвера:

      ```bash
      dnf repoquery --show-duplicates --latest-limit=0 cuda-drivers
      ```

   1. Установите драйвер:

      ```bash
      sudo dnf install '<ПАКЕТ_ДРАЙВЕРА>'
      ```

      Здесь `<ПАКЕТ_ДРАЙВЕРА>` — название пакета из списка, полученного в предыдущем пункте. Например, `cuda-drivers-3:570.211.01-1.el9.x86_64`.

   {/tab}

   {/tabs}

   1. Проверьте, что драйвер установлен:

      ```bash
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Если при попытке выполнить команду появилась ошибка `command not found`, добавьте `nvidia-smi` в переменные окружения вручную:

      ```bash
      echo 'export PATH="$PATH:/usr/bin"' | sudo tee /etc/profile.d/nvidia-smi-path.sh >/dev/null &&
      source /etc/profile.d/nvidia-smi-path.sh
      ```

   1. Повторно проверьте работоспособность `nvidia-smi`:

      ```bash
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Перезагрузите ВМ.

## {heading(Обновление драйвера GPU)[id=gpu-instructions-gpu-driver-update]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. Определите версию установленного драйвера:

   ```bash
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   Ошибка `No such file or directory` означает, что драйвер не установлен. Перейдите в раздел {linkto(#gpu-instructions-gpu-driver-install)[text=%text]}.

1. Определите способ установки драйвера:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```bash
   dpkg -S "$(command -v nvidia-smi)" 2>/dev/null
   ```

   {/tab}

   {tab(RHEL)}

   ```bash
   rpm -qf "$(command -v nvidia-smi)" 2>/dev/null
   ```
   {/tab}

   {/tabs}

   Пустой ответ указывает на отсутствие связи команды `nvidia-smi` с вашим пакетным менеджером. Как правило, это означает, что драйвер был установлен без пакетного менеджера с помощью готового установочного пакета `*.run` с сайта производителя.

   Для обновления версии необходимо переустановить драйвер. Для этого сначала {linkto(#gpu-instructions-gpu-driver-uninstall)[text=удалите]}, а затем заново {linkto(#gpu-instructions-gpu-driver-install)[text=установите]} драйвер.

1. Определите источник обновления и доступные для обновления версии:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```bash
   apt-cache policy nvidia-driver-<ВЕРСИЯ_ВЕТКИ>
   ```

   `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, полученной при проверке наличия `nvidia-smi`. Например, `550`.

   Если при успешном выполнении команды в выводе поля `Candidate` или `Installed` указывают на версию из системных или других сторонних репозиториев, помимо `developer.download.nvidia.com`, вместо обновления рекомендуется переустановить драйвер с переходом на репозиторий NVIDIA CUDA.

   Для переустановки сначала {linkto(#gpu-instructions-gpu-driver-uninstall)[text=удалите]} драйвер, затем {linkto(#gpu-instructions-gpu-driver-install)[text=установите]} его повторно.

   {/tab}

   {tab(RHEL)}

   1. Узнайте, какие пакеты сейчас установлены:

      ```bash
      rpm -qa | grep -iE 'nvidia|akmod|kmod'
      ```

   1. Определите, из какого источника этот пакет установлен:

      ```bash
      dnf repoquery --installed --info <ПАКЕТ>
      ```

      Здесь `<ПАКЕТ>` — имя любого из пакетов, полученных из списка выше. Например, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   1. Проверьте, из какого источника будет установлено обновление:

      ```bash
      sudo dnf install --assumeno cuda-drivers
      ```

      Если при успешном выполнении команды в столбце `Repository` для пакета `cuda-drivers` указано значение, отличное от `cuda-rhel<ВЕРСИЯ_RHEL>-x86_64`, вместо обновления рекомендуется переустановить драйвер с переходом на репозиторий NVIDIA CUDA.

      Для переустановки сначала {linkto(#gpu-instructions-gpu-driver-uninstall)[text=удалите]} драйвер, затем {linkto(#gpu-instructions-gpu-driver-install)[text=установите]} его повторно.

   {/tab}

   {/tabs}

1. Обновите драйвер:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```bash
   sudo apt install --only-upgrade -y cuda-driver-<ВЕРСИЯ_ВЕТКИ>
      ```

   Здесь `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, до которой необходимо обновить драйвер. Например, `550`.

   {/tab}

   {tab(RHEL)}

   ```bash
   sudo dnf upgrade -y <ПАКЕТ>
   ```

   Здесь `<ПАКЕТ>` — имя пакета драйвера для обновления из списка, полученного выше. Например, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   {/tab}

   {/tabs}

## {heading(Удаление драйвера GPU)[id=gpu-instructions-gpu-driver-uninstall]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. Удалите драйвер и его зависимости из пакетного менеджера:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```bash
   sudo apt purge cuda-drivers 'nvidia-driver-*' 'libnvidia-*' 'nvidia-utils-*' 'nvidia-dkms-*' 'nvidia-kernel-*'  'xserver-xorg-video-nvidia*' 'nvidia-settings'
   sudo apt autoremove --purge
   ```

   {/tab}

   {tab(RHEL)}

   ```bash
   sudo dnf remove 'nvidia-driver*' 'nvidia-kmod*' 'cuda-drivers*' 'akmod-nvidia*' 'kmod-nvidia*' 'xorg-x11-drv-nvidia*' 'nvidia-settings' 'nvidia-persistenced' 'nvidia-modprobe' 'nvidia-xconfig'
   sudo dnf autoremove
   ```
   {/tab}

   {/tabs}

1. Запустите `nvidia-uninstall` или `nvidia-installer --uninstall`. 

   ```bash
   sudo /usr/bin/nvidia-uninstall 2>/dev/null || sudo /usr/bin/nvidia-installer --uninstall
   ```

   Если ранее в системе был установлен драйвер из файла с расширением `*.run`, запустится его удаление. В противном случае будет ошибка `No such file or directory`, которая указывает на отсутствие драйвера установленного из файла с расширением `*.run`. Дальнейшие действия не требуются.

1. Перезагрузите ВМ.