# {heading(Обновление Linux-драйвера GPU)[id=gpu-instructions-driver-update-linux]}

{note:info}
В статье описано обновление Linux-драйвера для ВМ с {linkto(../../concepts/about#gpu-about-flavors-model)[text=шаблоном конфигурации GPU]}, для {linkto(../../concepts/vgpu#gpu-vgpu)[text=vGPU]} обновление не поддерживается.

Чтобы изменить версию драйвера vGPU, {linkto(../driver-uninstall#gpu-instructions-driver-uninstall)[text=удалите]} его и заново {linkto(../driver-install#gpu-instructions-driver-install)[text=установите]}.
{/note}

1. Проверьте тип конфигурации вашей ВМ:

   1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
   1. В появившемся списке найдите ВМ, для которой необходимо обновить драйвер GPU. Убедитесь, что в столбце **Тип** указан {linkto(../../concepts/about#gpu-about-flavors-model)[text=шаблон конфигурации выделенного GPU]}.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. Определите версию установленного драйвера:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   Ошибка `No such file or directory` означает, что драйвер не установлен. Перейдите в раздел {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.

1. Определите способ установки драйвера:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   dpkg -S "$(command -v nvidia-smi)" 2>/dev/null
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   rpm -qf "$(command -v nvidia-smi)" 2>/dev/null
   ```
   {/tab}

   {/tabs}

   Пустой ответ указывает на отсутствие связи команды `nvidia-smi` с вашим пакетным менеджером. Как правило, это означает, что драйвер был установлен без пакетного менеджера с помощью готового установочного пакета `*.run` с сайта производителя.

   Для обновления версии необходимо переустановить драйвер. Для этого сначала {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=удалите]}, а затем заново {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=установите]} драйвер.

1. Определите источник обновления и доступные для обновления версии:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy nvidia-driver-<ВЕРСИЯ_ВЕТКИ>
   ```

   `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, полученной при проверке наличия `nvidia-smi`. Например, `550`.

   Если при успешном выполнении команды в выводе поля `Candidate` или `Installed` указывают на версию из системных или других сторонних репозиториев, помимо `developer.download.nvidia.com`, вместо обновления рекомендуется переустановить драйвер с переходом на репозиторий NVIDIA CUDA.

   Для переустановки сначала {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=удалите]} драйвер, затем {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=установите]} его повторно.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Узнайте, какие пакеты сейчас установлены:

      ```console
      rpm -qa | grep -iE 'nvidia|akmod|kmod'
      ```

   1. Определите, из какого источника этот пакет установлен:

      ```console
      dnf repoquery --installed --info <ПАКЕТ>
      ```

      Здесь `<ПАКЕТ>` — имя любого из пакетов, полученных из списка выше. Например, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   1. Проверьте, из какого источника будет установлено обновление:

      ```console
      sudo dnf install --assumeno cuda-drivers
      ```

      Если при успешном выполнении команды в столбце `Repository` для пакета `cuda-drivers` указано значение, отличное от `cuda-rhel<ВЕРСИЯ>-x86_64`, вместо обновления рекомендуется переустановить драйвер с переходом на репозиторий NVIDIA CUDA.

      Для переустановки сначала {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=удалите]} драйвер, затем {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=установите]} его повторно.

   {/tab}

   {/tabs}

1. Обновите драйвер:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y cuda-driver-<ВЕРСИЯ_ВЕТКИ>
      ```

   Здесь `<ВЕРСИЯ_ВЕТКИ>` — номер мажорной версии драйвера, до которой необходимо обновить драйвер. Например, `550`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y <ПАКЕТ>
   ```

   Здесь `<ПАКЕТ>` — имя пакета драйвера для обновления из списка, полученного выше. Например, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   {/tab}

   {/tabs}
