# {heading(Установка NVIDIA Container Toolkit)[id=gpu-instructions-container-toolkit]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU, или {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создайте]} новую, если этого не было сделано ранее.
1. Установите Docker:

   ```console
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER && newgrp docker
   ```

1. Установите NVIDIA Container Toolkit:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Установите необходимые зависимости:

      ```console
      sudo apt update &&
      sudo apt-get update && sudo apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      gnupg2
      ```

   1. Добавьте репозиторий NVIDIA Container Toolkit:

      ```console
      curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
      sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
      sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
      ```

   1. Установите NVIDIA Container Toolkit:

      ```console
      sudo apt update &&
      sudo apt install -y nvidia-container-toolkit
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Установите необходимые зависимости:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y curl
      ```

   1. Добавьте репозиторий NVIDIA Container Toolkit:

      ```console
      curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
      sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
      ```

   1. Установите NVIDIA Container Toolkit:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y nvidia-container-toolkit
      ```

   {/tab}

   {/tabs}

1. Настройте Docker для использования с NVIDIA Container Toolkit:

   ```console
   sudo nvidia-ctk runtime configure --runtime=docker
   ```

   В результате выполнения команды будет модифицирован файл `/etc/docker/daemon.json` для работы с NVIDIA Container Toolkit.

1. Перезапустите Docker:

   ```console
   sudo systemctl restart docker
   ```

1. (Опционально) Проверьте работоспособность GPU внутри контейнера:

   ```console
   docker run --rm --gpus all <ОБРАЗ_DOCKER> nvidia-smi
   ```

   Здесь `<ОБРАЗ_DOCKER>` — точное название нужного [образа из Docker Hub](https://hub.docker.com/r/nvidia/cuda/tags) в формате `nvidia/cuda/<ИМЯ_ОБРАЗА>`. Например, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.

   При успешном выполнении проверки будет выведена информация о GPU и драйвере в системе.