# {heading(Установка компонентов CUDA)[id=gpu-instructions-cuda-install]}

{note:info}

В разделе устанавливаются и обновляются только компоненты CUDA Toolkit, CUDA Runtime, CUDA Libraries и cuDNN из [репозитория NVIDIA CUDA](https://developer.download.nvidia.com/compute/cuda/repos/). Вы также можете добавить [другие необходимые компоненты](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#meta-packages).

{/note}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU или {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} новую, если этого не было сделано ранее.
1. {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=Установите]} драйвер GPU, если этого не было сделано ранее.
1. Проверьте, установлены ли CUDA Toolkit, CUDA Runtime, CUDA Libraries и cuDNN:

   - CUDA Toolkit:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      Ошибка `No such file or directory` как правило означает, что CUDA Toolkit не установлен.

   - CUDA Runtime, CUDA Libraries и cuDNN:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — драйверная библиотека. Она должна отображаться, если драйвер установлен корректно. Вы можете проверить наличие драйвера или переустановить его в разделе {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]}.
      - `libcudnn.so` — cuDNN.

      Если какая-то из библиотек не отображается, соответствующий компонент не установлен в системе.

   Если все нужные компоненты установлены, но имеют версию ниже необходимой — перейдите в раздел {linkto(../update#gpu-instructions-cuda-update)[text=%text]}.

   Если какой-то из компонентов не установлен, выберите один из сценариев:
   
   - Установите только недостающие компоненты, используя ту же версию, что и уже установленные. Используйте этот способ, если уже установленные версии подходят для ваших задач. При необходимости, позже их можно будет {linkto(../update#gpu-instructions-cuda-update)[text=обновить]}.
   - Полностью переустановите все компоненты. Для этого {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=удалите]} полностью все компоненты, а затем вернитесь к установке. Используйте этот способ, если необходимо понизить версию или выполнить чистую установку с нуля.

1. Установите CUDA Toolkit, CUDA Runtime, CUDA Libraries и cuDNN из [репозитория NVIDIA CUDA](https://developer.download.nvidia.com/compute/cuda/repos/). Для этого:

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

   1. Убедитесь, что для установки доступны нужные версии компонентов CUDA:

      ```console
      apt-cache policy -<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
      ```

      Здесь `<МАЖОРНАЯ_ВЕРСИЯ>` и `<МИНОРНАЯ_ВЕРСИЯ>` — номера мажорной и минорной версии компонентов CUDA. Например, для CUDA Toolkit 12.4 название пакета будет `cuda-toolkit-12-4`.

      При успешном выполнении команды в выводе будет поле `Candidate`, которое указывает версию для установки указанного пакета.

   1. Установите компоненты CUDA:

      ```console
      sudo apt -y install \
         cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
      ```

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

   1. Убедитесь, что для установки доступны нужные версии компонентов CUDA:

      ```console
      dnf --disablerepo="*" --enablerepo="cuda*" list | grep -E '^cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>(\.|$)|^cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>(\.|$)|^cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>(\.|$)|^cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>(\.|$)'
      ```

      Здесь `<МАЖОРНАЯ_ВЕРСИЯ>` и `<МИНОРНАЯ_ВЕРСИЯ>` — номера мажорной и минорной версии компонентов CUDA. Например, для CUDA Toolkit 12.4 название пакета будет `cuda-toolkit-12-4`.

   1. Установите компоненты CUDA:

      ```console
      sudo dnf install -y \
         cuda-runtime-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-libraries-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cuda-toolkit-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ> \
         cudnn9-cuda-<МАЖОРНАЯ_ВЕРСИЯ>-<МИНОРНАЯ_ВЕРСИЯ>
      ```

   {/tab}

   {/tabs}

1. Проверьте работоспособность CUDA Toolkit:

   ```console
   nvcc --version
   ```

1. Если при попытке выполнить команду `nvcc --version` появилась ошибка `command not found`, добавьте CUDA Toolkit в переменные окружения вручную:

   ```console
   sudo tee /etc/profile.d/cuda-path.sh >/dev/null <<'EOF'
   # Add CUDA Toolkit to PATH (system-wide)
   CUDA_HOME=/usr/local/cuda
   case ":$PATH:" in
   *":$CUDA_HOME/bin:"*) ;;
   *) export PATH="$CUDA_HOME/bin:$PATH" ;;
   esac
   EOF
   ```

1. Повторно проверьте работоспособность CUDA Toolkit:

   ```console
   nvcc --version
   ```

1. (Опционально) Повторно проверьте установку CUDA Runtime, CUDA Libraries и cuDNN:

   ```console
   ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
   ```
