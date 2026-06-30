# {heading(Подготовка GPU-окружения для Machine Learning (ML) и Data Science (DS))[id=gpu-how-to-guides-ml-ds-env]}

После ознакомления с этим руководством вы узнаете, как {linkto(#gpu-how-to-guides-ml-ds-env-configure)[text=подготовить]} окружение для выполнения задач, связанных с Machine Learning (ML) и Data Science (DS), а также {linkto(#gpu-how-to-guides-ml-ds-env-fine-tuning)[text=запустите]} конфигурацию LLM Llama-2-7B Fine-tuning с LoRA в [conda](https://docs.conda.io/projects/conda/en/latest/index.html)-окружении.

## {heading(Подготовительные шаги)[id=gpu-how-to-guides-ml-ds-env-preparation]}

1. Подготовьте новую {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=виртуальноую машину с GPU]}, если этого не было сделано ранее.

   1. {linkto(../../../../computing/gpu/connect#gpu-connect)[text=Подключите]} сервис Cloud GPU, если это не было сделано ранее.
   1. Запросите в {linkto(../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=технической поддержке]} квоты на шаблон конфигурации ВМ на базе GPU.
   1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте]} виртуальную машину с параметрами:

      - {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=Шаблон конфигурации]} с GPU.

         {note:warn}

         Для шаблонов конфигураций с vGPU не гарантирована поддержка решений, описанных в этом руководстве.

         {/note}

      - ОС с поддержкой нужной версии драйвера. Узнайте доступные версии для предпочитаемого дистрибутива в [репозитории NVIDIA CUDA](https://developer.download.nvidia.com/compute/cuda/repos/).

         Если нет необходимости в определенной версии драйвера, выберите один из рекомендуемых дистрибутивов:
         
         - Ubuntu версии 22.04 или 24.04.
         - Debian версии 11 или 12.
         - Red Hat Enterprise Linux/AlmaLinux/Oracle Linux/Rocky Linux версии 8 или 9.

      - Доступ во внешнюю сеть с помощью IP-адреса из [пула публичных IP-адресов](/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-address-pool) или [Floating IP-адреса](/ru/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip).

      Остальные параметры установите на свое усмотрение.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к ВМ.
1. {linkto(../../instructions/gpu-driver#gpu-instructions-gpu-driver-install)[text=Установите]} или {linkto(../../instructions/gpu-driver#gpu-instructions-gpu-driver-update)[text=обновите]} драйвер NVIDIA.

   {note:info}

   Если для вашей рабочей задачи используются определенные версии компонентов NVIDIA, подберите необходимую для установки или обновления версию драйвера с помощью [матрицы совместимости](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html).

   {/note}


## {heading({counter(toc-counter)}. Подготовьте ML-окружение)[id=gpu-how-to-guides-ml-ds-env-configure]}

Подготовить ML-окружение можно одним из способов:

- через установку компонентов CUDA в ОС;
- через запуск Docker-контейнера из [готового образа](https://hub.docker.com/r/nvidia/cuda/tags) с помощью NVIDIA Container Toolkit.

{tabs}

{tab(Системная установка компонентов CUDA)}

Окружение подготавливается непосредственно в ОС вашей виртуальной машины. Используйте этот метод, если необходим доступ к системным компонентам и самостоятельно устанавливать и настраивать нужные версии компонентов CUDA.

1. {linkto(../../instructions/cuda#gpu-instructions-cuda-install)[text=Установите]} компоненты CUDA.
1. Установите Python, если этого не было сделано ранее:

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

1. Установите Miniconda:

   ```console
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh &&
   bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda &&
   eval "$($HOME/miniconda/bin/conda shell.bash hook)" &&
   conda init bash && source ~/.bashrc
   ```

1. Ознакомьтесь с [условиями использования](https://www.anaconda.com/legal/terms/terms-of-service). Для подтверждения согласия введите команды:

   ```console
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
   ```

1. Создайте и активируйте conda-окружение:

   ```shell
   conda create -n ml-env python -y
   conda activate ml-env
   ```

1. Установите PyTorch с поддержкой CUDA 12.4:

   ```shell
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
   ```

1. Проверьте, что PyTorch видит GPU, CUDA и cuDNN:

   ```shell
   python -c "import torch; a=torch.cuda.is_available(); print('cuda',a,'cudnn',torch.backends.cudnn.is_available()); print('gpu', torch.cuda.get_device_name(0) if a and torch.cuda.device_count()>0 else 'none')"
   ```

1. Установите необходимые ML-библиотеки:

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

1. (Опционально) Сохраните окружение и pip-зависимости:

   ```console
   conda env export > environment.yml
   pip freeze > requirements.txt
   ```

   Позже используйте эти файлы для:
   
   - быстрого создания аналогичного сonda-окружения:

      ```console
      conda env create -f environment.yml
      ```

   - восстановления pip-зависимостей:

      ```console
      pip install -r requirements.txt
      ```

{/tab}

{tab(NVIDIA Container Toolkit + Docker)}

Docker контейнер обеспечивает изолированное окружение, а NVIDIA Container Toolkit позволяет использовать возможности GPU внутри этого контейнера

1. {linkto(../../instructions/container-toolkit#gpu-instructions-container-toolkit)[text=Установите]} NVIDIA Container Toolkit и Docker.
1. Подготовьте Dockerfile:

   ```ini
   FROM <ОБРАЗ_DOCKER>

   ENV DEBIAN_FRONTEND=noninteractive

   RUN apt-get update && apt-get install -y --no-install-recommends \
         python3 python3-pip python3-venv \
         git ca-certificates wget curl \
      && rm -rf /var/lib/apt/lists/* \
      && python3 -m pip install --upgrade pip \
      && python3 -m pip install \
         torch torchvision torchaudio --index-url https://download.pytorch.org/whl/<ПУТЬ_CUDA> \
      && python3 -m pip install \
         transformers accelerate peft bitsandbytes datasets sentencepiece einops

   WORKDIR /workspace
   CMD ["bash"]
   ```

   Здесь:

   - `<ОБРАЗ_DOCKER>` — точное название нужного [образа из Docker Hub](https://hub.docker.com/r/nvidia/cuda/tags) в формате `nvidia/cuda/<ИМЯ_ОБРАЗА>`. Например, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.
   - `<ПУТЬ_CUDA>` — версия CUDA в формате `cu<МАЖОРНАЯ_ВЕРСИЯ><МИНОРНАЯ_ВЕРСИЯ>`, соответствующая версии в значении `<ОБРАЗ_DOCKER>`. Например, `cu124`.

   {cut(Пример Dockerfile)}

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

1. Запустите Docker-контейнер с GPU:

   ```console
   docker run --gpus all -it --rm \
   -v $(pwd):/workspace \
   -p 8888:8888 \
   my-ml-image
   ```

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. Запустите конфигурацию LLM Llama-2-7B Fine-tuning с LoRA)[id=gpu-how-to-guides-ml-ds-env-fine-tuning]}

1. Создайте Python-скрипт `llama.py`, который подготовит модель LoRA к обучению:

   ```python
   from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, BitsAndBytesConfig
   from peft import LoraConfig, get_peft_model, TaskType
   from datasets import load_dataset
   import torch

   MODEL_NAME = "meta-llama/Llama-2-7b-hf"  # Требует принятия лицензии на HF

   # Квантизация 4-bit (умещается в 16 GB VRAM вместо 28 GB)
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
      device_map="auto"  # автоматически распределяет по GPU
   )

   # LoRA конфигурация
   lora_config = LoraConfig(
      task_type=TaskType.CAUSAL_LM,
      r=16,               # ранг адаптера
      lora_alpha=32,
      target_modules=["q_proj", "v_proj"],  # только attention слои
      lora_dropout=0.05,
      bias="none"
   )

   model = get_peft_model(model, lora_config)
   model.print_trainable_parameters()
   # trainable params: 4,194,304 || all params: 3,504,607,232 || trainable%: 0.1197

   # Загрузка датасета (пример — alpaca)
   dataset = load_dataset("tatsu-lab/alpaca", split="train[:1000]")

   # Дальше — стандартный Trainer из transformers
   # ... (добавь свой TrainingArguments и Trainer.train())
   print("LoRA модель готова к обучению!")
   ```

1. Запустите скрипт:

   {tabs}

   {tab(Системная установка компонентов CUDA)}

   ```console
   export HF_TOKEN="<HF_ТОКЕН>"
   python llama.py
   ```

   Здесь `<HF_ТОКЕН>` — [токен в Hugging Face](https://huggingface.co/docs/hub/security-tokens). Аккаунт, использующий этот токен, должен иметь доступ к репозиторию [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf).

   {/tab}

   {tab(NVIDIA Container Toolkit + Docker)}

   ```console
   docker run --rm --gpus all \
      -v "$PWD":/workspace \
      -v "$HOME/.cache/huggingface":/root/.cache/huggingface \
      -e HF_TOKEN="<HF_ТОКЕН>" \
      -w /workspace \
      <DOCKER_ОБРАЗ> \
      python3 train_lora.py
   ```

   Здесь:

   - `<HF_ТОКЕН>` — [токен в Hugging Face](https://huggingface.co/docs/hub/security-tokens). Аккаунт, использующий этот токен, должен иметь доступ к репозиторию [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf).
   - `<DOCKER_ОБРАЗ>`  — имя образа, который использовался в Dockerfile.

   {/tab}

   {/tabs}

   При успешном выполнении в выводе команды будет сообщение:

   ```txt
   LoRA модель готова к обучению!
   ```
