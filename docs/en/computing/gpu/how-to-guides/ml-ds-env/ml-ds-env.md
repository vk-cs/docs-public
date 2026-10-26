# {heading(Preparing a GPU environment for Machine Learning (ML) and Data Science (DS))[id=gpu-how-to-guides-ml-ds-env]}

{include(/en/_includes/_translated_by_ai_en.md)}

After reading this guide, you will learn how to {linkto(#gpu-how-to-guides-ml-ds-env-configure)[text=prepare]} an environment for performing tasks related to Machine Learning (ML) and Data Science (DS), as well as {linkto(#gpu-how-to-guides-ml-ds-env-fine-tuning)[text=run]} the Llama-2-7B Fine-tuning with LoRA LLM configuration in a [conda](https://docs.conda.io/projects/conda/en/latest/index.html) environment.

## {heading(Preparation steps)[id=gpu-how-to-guides-ml-ds-env-preparation]}

1. Prepare a new {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=GPU virtual machine]}, if this has not been done earlier.

   1. {linkto(../../../../computing/gpu/connect#gpu-connect)[text=Connect]} the Cloud GPU service, if this has not been done earlier.
   1. Request quotas for the VM configuration template based on GPU from {linkto(../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=technical support]}.
   1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Create]} a virtual machine with the following parameters:

      - A {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=configuration template]} with GPU.

         {note:warn}

         For configuration templates with vGPU, support for the solutions described in this guide is not guaranteed.

         {/note}

      - An OS with support for the required driver version. Find the available versions for your preferred distribution in the [NVIDIA CUDA repository](https://developer.download.nvidia.com/compute/cuda/repos/).

         If a specific driver version is not required, choose one of the recommended distributions:
         
         - Ubuntu version 22.04 or 24.04.
         - Debian version 11 or 12.
         - Red Hat Enterprise Linux/AlmaLinux/Oracle Linux/Rocky Linux version 8 or 9.

      - Access to the external network using an IP address from the [public IP address pool](/en/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-address-pool) or a [Floating IP address](/en/networks/vnet/concepts/ips-and-inet#floating-ip).

      Set the remaining parameters at your discretion.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the VM.
1. {linkto(../../instructions/driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=Install]} or {linkto(../../instructions/driver-update-linux#gpu-instructions-driver-update-linux)[text=update]} the NVIDIA driver.

   {note:info}

   If specific NVIDIA component versions are used for your work task, select the driver version needed for installation or update using the [compatibility matrix](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html).

   {/note}

## {heading({counter(toc-counter)}. Prepare the ML environment)[id=gpu-how-to-guides-ml-ds-env-configure]}

You can prepare the ML environment in one of the following ways:

- by installing CUDA components in the OS;
- by running a Docker container from a [ready-made image](https://hub.docker.com/r/nvidia/cuda/tags) using NVIDIA Container Toolkit.

{tabs}

{tab(System installation of CUDA components)}

The environment is prepared directly in the OS of your virtual machine. Use this method if you need access to system components and want to install and configure the required CUDA component versions yourself.

1. {linkto(../../instructions/cuda/install#gpu-instructions-cuda-install)[text=Install]} the CUDA components.
1. Install Python, if this has not been done earlier:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install -y python3 python3-venv python3-pip
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf install -y python3 python3-pip
   ```

   {/tab}

   {/tabs}

1. Install Miniconda:

   ```console
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh &&
   bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda &&
   eval "$($HOME/miniconda/bin/conda shell.bash hook)" &&
   conda init bash && source ~/.bashrc
   ```

1. Review the [terms of use](https://www.anaconda.com/legal/terms/terms-of-service). To confirm your agreement, enter the commands:

   ```console
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
   ```

1. Create and activate a conda environment:

   ```shell
   conda create -n ml-env python -y
   conda activate ml-env
   ```

1. Install PyTorch with CUDA 12.4 support:

   ```shell
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
   ```

1. Check that PyTorch detects the GPU, CUDA, and cuDNN:

   ```shell
   python -c "import torch; a=torch.cuda.is_available(); print('cuda',a,'cudnn',torch.backends.cudnn.is_available()); print('gpu', torch.cuda.get_device_name(0) if a and torch.cuda.device_count()>0 else 'none')"
   ```

1. Install the required ML libraries:

   ```console
   pip install \
   transformers \
   accelerate \
   bitsandbytes \
   peft \
   datasets \
   sentencepiece \
   einops \
   ```

1. (Optional) Save the environment and pip dependencies:

   ```console
   conda env export > environment.yml
   pip freeze > requirements.txt
   ```

   Later, use these files to:
   
   - quickly create an identical conda environment:

      ```console
      conda env create -f environment.yml
      ```

   - restore the pip dependencies:

      ```console
      pip install -r requirements.txt
      ```

{/tab}

{tab(NVIDIA Container Toolkit + Docker)}

A Docker container provides an isolated environment, and NVIDIA Container Toolkit allows using GPU capabilities inside that container

1. {linkto(../../instructions/container-toolkit#gpu-instructions-container-toolkit)[text=Install]} NVIDIA Container Toolkit and Docker.
1. Prepare the Dockerfile:

   ```ini
   FROM <DOCKER_IMAGE>

   ENV DEBIAN_FRONTEND=noninteractive

   RUN apt-get update && apt-get install -y --no-install-recommends \
         python3 python3-pip python3-venv \
         git ca-certificates wget curl \
      && rm -rf /var/lib/apt/lists/* \
      && python3 -m pip install --upgrade pip \
      && python3 -m pip install \
         torch torchvision torchaudio --index-url https://download.pytorch.org/whl/<CUDA_PATH> \
      && python3 -m pip install \
         transformers accelerate peft bitsandbytes datasets sentencepiece einops

   WORKDIR /workspace
   CMD ["bash"]
   ```

   Here:

   - `<DOCKER_IMAGE>` — the exact name of the required [image from Docker Hub](https://hub.docker.com/r/nvidia/cuda/tags) in the `nvidia/cuda/<IMAGE_NAME>` format. For example, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.
   - `<CUDA_PATH>` — the CUDA version in the `cu<MAJOR_VERSION><MINOR_VERSION>` format, corresponding to the version in the `<DOCKER_IMAGE>` value. For example, `cu124`.

   {cut(Dockerfile example)}

   ```ini
   FROM nvidia/cuda:12.4.0-devel-ubuntu22.04

   ENV DEBIAN_FRONTEND=noninteractive

   RUN apt-get update && apt-get install -y --no-install-recommends \
         python3 python3-pip python3-venv \
         git ca-certificates wget curl \
      && rm -rf /var/lib/apt/lists/* \
      && python3 -m pip install --upgrade pip \
      && python3 -m pip install \
         torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124 \
      && python3 -m pip install \
         transformers accelerate peft bitsandbytes datasets sentencepiece einops

   WORKDIR /workspace
   CMD ["bash"]
   ```

   {/cut} 

1. Run the Docker container with GPU:

   ```console
   docker run --gpus all -it --rm \
   -v $(pwd):/workspace \
   -p 8888:8888 \
   my-ml-image
   ```

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. Run the Llama-2-7B Fine-tuning with LoRA LLM configuration)[id=gpu-how-to-guides-ml-ds-env-fine-tuning]}

1. Create the `llama.py` Python script that will prepare the LoRA model for training:

   ```python
   from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, BitsAndBytesConfig
   from peft import LoraConfig, get_peft_model, TaskType
   from datasets import load_dataset
   import torch

   MODEL_NAME = "meta-llama/Llama-2-7b-hf"  # Requires accepting the license on HF

# 4-bit quantization (fits in 16 GB VRAM instead of 28 GB)
   bnb_config = BitsAndBytesConfig(
      load_in_4bit=True,
      bnb_4bit_use_double_quant=True,
      bnb_4bit_quant_type="nf4",
      bnb_4bit_compute_dtype=torch.bfloat16
   )

   tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
   model = AutoModelForCausalLM.from_pretrained(
      MODEL_NAME,
      quantization_config=bnb_config,
      device_map="auto"  # automatically distributes across GPUs
   )

# LoRA configuration
   lora_config = LoraConfig(
      task_type=TaskType.CAUSAL_LM,
      r=16,               # adapter rank
      lora_alpha=32,
      target_modules=["q_proj", "v_proj"],  # only attention layers
      lora_dropout=0.05,
      bias="none"
   )

   model = get_peft_model(model, lora_config)
   model.print_trainable_parameters()

# trainable params: 4,194,304 || all params: 3,504,607,232 || trainable%: 0.1197

# Loading the dataset (example — alpaca)
   dataset = load_dataset("tatsu-lab/alpaca", split="train[:1000]")

# Next — the standard Trainer from transformers

# ... (add your TrainingArguments and Trainer.train())
   print("LoRA модель готова к обучению!")
   ```

1. Run the script:

   {tabs}

   {tab(System installation of CUDA components)}

   ```console
   export HF_TOKEN="<HF_TOKEN>"
   python llama.py
   ```

   Here `<HF_TOKEN>` — a [Hugging Face token](https://huggingface.co/docs/hub/security-tokens). The account using this token must have access to the [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf) repository.

   {/tab}

   {tab(NVIDIA Container Toolkit + Docker)}

   ```console
   docker run --rm --gpus all \
      -v "$PWD":/workspace \
      -v "$HOME/.cache/huggingface":/root/.cache/huggingface \
      -e HF_TOKEN="<HF_TOKEN>" \
      -w /workspace \
      <DOCKER_IMAGE> \
      python3 train_lora.py
   ```

   Here:

   - `<HF_TOKEN>` — a [Hugging Face token](https://huggingface.co/docs/hub/security-tokens). The account using this token must have access to the [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf) repository.
   - `<DOCKER_IMAGE>` — the name of the image used in the Dockerfile.

   {/tab}

   {/tabs}

   If executed successfully, the command output will contain the message:

   ```txt
   LoRA модель готова к обучению!
   ```