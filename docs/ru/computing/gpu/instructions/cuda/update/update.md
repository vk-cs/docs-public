# {heading(Обновление компонентов CUDA)[id=gpu-instructions-cuda-update]}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=Обновите]} драйвер GPU, если это необходимо для его [совместимости с CUDA](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html) после обновления.
1. Проверьте версию компонентов CUDA.

   1. Определите версию CUDA Toolkit:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      Ошибка `No such file or directory` как правило означает, что CUDA Toolkit не установлен.

   1. Опредилите версию для компонентов CUDA Runtime, CUDA Libraries и cuDNN:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — драйверная библиотека. Должна отображаться при условии, что драйвер установлен корректно. При необходимости, проверить наличие драйвера или выполнить его переустановку можно в разделе {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.
      - `libcudnn.so` — cuDNN.

      Отсутствие библиотеки как правило означает, что компонент не установлен в системе.

   Если какой-то из компонентов отсутствует, веберите один из сценариев.
   
   - {linkto(../install#gpu-instructions-cuda-install)[text=Установите]} недостающие компоненты нужной версии, после чего вернитесь к обновлению. Используйте этот способ если нет необходимости в чистуой установке с нуля.
   - Полностью переустановите все компоненты. Для этого {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=удалите]} полностью все компоненты, а затем вернитесь к {linkto(../install#gpu-instructions-cuda-install)[text=установке]}. Используйте этот способ если необходимо понизить версию или выполнить чистую установку с нуля.

1. Узнайте способ установки компонентов CUDA:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   dpkg -l | grep -E 'cuda-|nvidia-cuda-toolkit'
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   rpm -qa | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
   ```

   {/tab}

   {/tabs}

   Компоненты CUDA, которые установлены, но которых нет в списке, указывает на отсутствие связи этого компонента с вашим пакетным менеджером. Как правило, это означает, что компонент CUDA был установлен без пакетного менеджера с помощью готового установочного пакета `*.run` с сайта производителя.

   Для обновления версии таких компонентов необходимо выполнить их переустановку. Для этого выполните сначала {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=удаление]}, затем {linkto(../install#gpu-instructions-cuda-install)[text=установку]} компонентов CUDA.

1. Определите источник обновления и доступные для обновления версии:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>

   ```

   Здесь `<МАЖОРНАЯ_ВЕРСИЯ>` и `<МИНОРНАЯ_ВЕРСИЯ>` — номера мажорной и минорной версии компонентов CUDA. Например, для CUDA Toolkit 12.4 название пакета будет `cuda-toolkit-12-4`.

   Если в ответе ошибка `Unable to locate package` или в поле `Candidate` или `Installed` указана версия из репозиториев Ubuntu (`archive.ubuntu.com`) или Debian (`deb.debian.org` и `security.debian.org`), вместо обновления рекомендуется выполнить переустановку компонентов CUDA с переходом на репозиторий NVIDIA CUDA (`developer.download.nvidia.com`). Для этого выполните сначала {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=удаление]}, затем {linkto(../install#gpu-instructions-cuda-install)[text=установку]} CUDA Toolkit.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Узнайте какие пакеты сейчас установлены:

      ```console
      rpm -qa | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Определите из какого источника установлены эти пакеты:

      ```console
      dnf repoquery --installed --qf '%{name}.%{arch}\t%{version}-%{release}\t%{repoid}' | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Проверьте, из какого источника будет установлено обновление:

      ```console
      sudo dnf install --assumeno \
         cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
      ```

      Убедитесь, что в столбце `Repository` для ваших компонентов указан репозиторий `cuda-rhel<ВЕРСИЯ>-x86_64`. Если указан другой, рекомендуется вместо обновления выполнить переустановку компонентов CUDA с переходом на репозиторий NVIDIA CUDA. Для этого выполните сначала {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=удаление]}, затем {linkto(../install#gpu-instructions-cuda-install)[text=установку]} компонентов CUDA.

   {/tab}

   {/tabs}

1. Обновите компоненты CUDA:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y \
      cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
   ```

   Здесь `<МАЖОРНАЯ_ВЕРСИЯ>` и `<МИНОРНАЯ_ВЕРСИЯ>` — номера мажорной и минорной версии компонентов CUDA. Например, для CUDA Toolkit 12.4 название пакета будет `cuda-toolkit-12-4`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y \
      cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
      cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
   ```

   Здесь `<МАЖОРНАЯ_ВЕРСИЯ>` и `<МИНОРНАЯ_ВЕРСИЯ>` — номера мажорной и минорной версии компонентов CUDA. Например, для CUDA Toolkit 12.4 название пакета будет `cuda-toolkit-12-4`.

   {/tab}

   {/tabs}
