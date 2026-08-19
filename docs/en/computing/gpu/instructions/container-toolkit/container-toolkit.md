# {heading(Installing NVIDIA Container Toolkit)[id=gpu-instructions-container-toolkit]}

1. [Connect](../../../../computing/iaas/instructions/vm/vm-connect) to a VM with a GPU, or [create](../../../../computing/iaas/instructions/vm/vm-create) a new one if you haven't done so already.
1. Install Docker:

   ```console
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER && newgrp docker
   ```

1. Install NVIDIA Container Toolkit:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Install the required dependencies:

      ```console
      sudo apt update &&
      sudo apt-get update && sudo apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      gnupg2
      ```

   1. Add the NVIDIA Container Toolkit repository:

      ```console
      curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
      sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
      sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
      ```

   1. Install NVIDIA Container Toolkit:

      ```console
      sudo apt update &&
      sudo apt install -y nvidia-container-toolkit
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Install the required dependencies:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y curl
      ```

   1. Add the NVIDIA Container Toolkit repository:

      ```console
      curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
      sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
      ```

   1. Install NVIDIA Container Toolkit:

      ```console
      sudo dnf update -y &&
      sudo dnf install -y nvidia-container-toolkit
      ```

   {/tab}

   {/tabs}

1. Configure Docker to work with NVIDIA Container Toolkit:

   ```console
   sudo nvidia-ctk runtime configure --runtime=docker
   ```

   Running the command modifies the `/etc/docker/daemon.json` file to work with NVIDIA Container Toolkit.

1. Restart Docker:

   ```console
   sudo systemctl restart docker
   ```

1. (Optional) Check that the GPU works inside a container:

   ```console
   docker run --rm --gpus all <DOCKER_IMAGE> nvidia-smi
   ```

   Here `<DOCKER_IMAGE>` is the exact name of the required [image from Docker Hub](https://hub.docker.com/r/nvidia/cuda/tags) in the format `nvidia/cuda/<IMAGE_NAME>`. For example, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.

   If the check succeeds, information about the GPU and driver on the system will be displayed.
