# {heading(NVIDIA Container Toolkit орнату)[id=gpu-instructions-container-toolkit]}

{include(/kz/_includes/_translated_by_ai.md)}

1. GPU бар ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]} немесе бұрын жасалмаған болса, жаңасын {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. Docker орнатыңыз:

   ```console
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER && newgrp docker
   ```

1. NVIDIA Container Toolkit орнатыңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Қажетті тәуелділіктерді орнатыңыз:

      ```console
      sudo apt update &&
      sudo apt-get update && sudo apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      gnupg2
      ```

   1. NVIDIA Container Toolkit репозиторийін қосыңыз:

      ```console
      curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
      sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
      sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
      ```

   1. NVIDIA Container Toolkit орнатыңыз:

      ```console
      sudo apt update &&
      sudo apt install -y nvidia-container-toolkit
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Қажетті тәуелділіктерді орнатыңыз:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y curl
      ```

   1. NVIDIA Container Toolkit репозиторийін қосыңыз:

      ```console
      curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
      sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
      ```

   1. NVIDIA Container Toolkit орнатыңыз:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y nvidia-container-toolkit
      ```

   {/tab}

   {/tabs}

1. Docker-ды NVIDIA Container Toolkit-пен пайдалану үшін баптаңыз:

   ```console
   sudo nvidia-ctk runtime configure --runtime=docker
   ```

   Команда орындалу нәтижесінде NVIDIA Container Toolkit-пен жұмыс істеу үшін `/etc/docker/daemon.json` файлы өзгертіледі.

1. Docker-ды қайта іске қосыңыз:

   ```console
   sudo systemctl restart docker
   ```

1. (Опционалды) Контейнер ішіндегі GPU-дың жұмысқа қабілеттілігін тексеріңіз:

   ```console
   docker run --rm --gpus all <DOCKER_БЕЙНЕСІ> nvidia-smi
   ```

   Мұнда `<DOCKER_БЕЙНЕСІ>` — `nvidia/cuda/<БЕЙНЕ_АТАУЫ>` форматындағы [Docker Hub бейнесінің](https://hub.docker.com/r/nvidia/cuda/tags) нақты атауы. Мысалы, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.

   Тексеру сәтті орындалғанда жүйедегі GPU және драйвер туралы ақпарат шығады.
