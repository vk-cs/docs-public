# {heading(GPU-ортаны Machine Learning (ML) және Data Science (DS) үшін дайындау)[id=gpu-how-to-guides-ml-ds-env]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл нұсқаулықпен танысқаннан кейін Machine Learning (ML) және Data Science (DS) сияқты міндеттерді орындау үшін ортаны {linkto(#gpu-how-to-guides-ml-ds-env-configure)[text=дайындауды]} үйренесіз, сонымен қатар [conda](https://docs.conda.io/projects/conda/en/latest/index.html)-ортасында LoRA бар LLM Llama-2-7B Fine-tuning конфигурациясын {linkto(#gpu-how-to-guides-ml-ds-env-fine-tuning)[text=іске қосасыз]}.

## {heading(Дайындық қадамдары)[id=gpu-how-to-guides-ml-ds-env-preparation]}

1. Бұрын жасалмаса, жаңа {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=GPU бар виртуалды машинаны]} дайындаңыз.

   1. Бұрын жасалмаса, {linkto(../../../../computing/gpu/connect#gpu-connect)[text=Cloud GPU қызметін қосыңыз]}.
   1. {linkto(../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=Техникалық қолдау көрсету]] қызметінен GPU негізіндегі ВМ конфигурациясының шаблонына квота сұраңыз.
   1. Келесі параметрлерімен виртуалды машинаны {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}:

      - GPU бар {linkto(../../../../computing/gpu/concepts/about#gpu-about-flavors-model)[text=конфигурация шаблоны]}.

         {note:warn}

         vGPU бар конфигурация шаблондары үшін осы нұсқаулықта сипатталған шешімдердің қолдау көрсетілуіне кепілдік берілмейді.

         {/note}

      - Қажетті драйвер нұсқасын қолдайтын ОС. Қалаған дистрибутивіңізге қолжетімді нұсқаларды [NVIDIA CUDA репозиторийінен](https://developer.download.nvidia.com/compute/cuda/repos/) біліңіз.

         Белгілі бір драйвер нұсқасы қажет болмаса, ұсынылған дистрибутивтердің бірін таңдаңыз:

         - Ubuntu 22.04 немесе 24.04 нұсқасы.
         - Debian 11 немесе 12 нұсқасы.
         - Red Hat Enterprise Linux/AlmaLinux/Oracle Linux/Rocky Linux 8 немесе 9 нұсқасы.

      - [Публичтік IP-адрестер пулынан](/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-internet-address-pool) IP-адрес немесе [Floating IP-адрес](/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip) арқылы сыртқы желіге қолжетімділік.

      Қалған параметрлерді өз қалауыңыз бойынша орнатыңыз.

1. ВМ-ға {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=қосылыңыз]}.
1. NVIDIA драйверін {linkto(../../instructions/driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=орнатыңыз]} немесе {linkto(../../instructions/driver-update-linux#gpu-instructions-driver-update-linux)[text=жаңартыңыз]}.

   {note:info}

   Егер сіздің жұмыс міндеттеріңіз үшін NVIDIA компоненттерінің белгілі бір нұсқалары қолданылса, орнатуға немесе жаңартуға қажетті драйвер нұсқасын [үйлесімділік матрицасы](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html) арқылы таңдаңыз.

   {/note}

## {heading({counter(toc-counter)}. ML-ортасын дайындаңыз)[id=gpu-how-to-guides-ml-ds-env-configure]}

ML-ортасын келесі тәсілдердің бірімен дайындауға болады:

- CUDA компоненттерін ОС-қа орнату арқылы;
- NVIDIA Container Toolkit көмегімен [дайын бейнеден](https://hub.docker.com/r/nvidia/cuda/tags) Docker-контейнерді іске қосу арқылы.

{tabs}

{tab(CUDA компоненттерін жүйеге орнату)}

Орта тікелей виртуалды машинаның ОС-ында дайындалады. Жүйелік компоненттерге қолжетімділік қажет болса және CUDA компоненттерінің қажетті нұсқаларын өз бетінше орнатып, баптау қажет болса, осы тәсілді қолданыңыз.

1. CUDA компоненттерін {linkto(../../instructions/cuda/install#gpu-instructions-cuda-install)[text=орнатыңыз]}.
1. Бұрын жасалмаса, Python орнатыңыз:

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

1. Miniconda орнатыңыз:

   ```console
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh &&
   bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda &&
   eval "$($HOME/miniconda/bin/conda shell.bash hook)" &&
   conda init bash && source ~/.bashrc
   ```

1. [Қолдану шарттарымен](https://www.anaconda.com/legal/terms/terms-of-service) танысыңыз. Келісімді растау үшін командаларды енгізіңіз:

   ```console
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
   conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
   ```

1. conda-ортасын жасап, белсендіріңіз:

   ```shell
   conda create -n ml-env python -y
   conda activate ml-env
   ```

1. CUDA 12.4 қолдауы бар PyTorch орнатыңыз:

   ```shell
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
   ```

1. PyTorch-тың GPU, CUDA және cuDNN-ді көретінін тексеріңіз:

   ```shell
   python -c "import torch; a=torch.cuda.is_available(); print('cuda',a,'cudnn',torch.backends.cudnn.is_available()); print('gpu', torch.cuda.get_device_name(0) if a and torch.cuda.device_count()>0 else 'none')"
   ```

1. Қажетті ML-жинақтарды орнатыңыз:

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

1. (Қалау бойынша) Ортаны және pip-тәуелділіктерді сақтаңыз:

   ```console
   conda env export > environment.yml
   pip freeze > requirements.txt
   ```

   Кейін бұл файлдарды мыналар үшін қолданыңыз:

   - ұқсас conda-ортасын жылдам жасау үшін:

      ```console
      conda env create -f environment.yml
      ```

   - pip-тәуелділіктерді қалпына келтіру үшін:

      ```console
      pip install -r requirements.txt
      ```

{/tab}

{tab(NVIDIA Container Toolkit + Docker)}

Docker контейнері оқшауланған ортаны қамтамасыз етеді, ал NVIDIA Container Toolkit осы контейнердің ішінде GPU мүмкіндіктерін қолдануға мүмкіндік береді.

1. NVIDIA Container Toolkit және Docker орнаттыңыз: {linkto(../../instructions/container-toolkit#gpu-instructions-container-toolkit)[text=орнатыңыз]}.
1. Dockerfile дайындаңыз:

   ```ini
   FROM <DOCKER_БЕЙНЕ>

   ENV DEBIAN_FRONTEND=noninteractive

   RUN apt-get update && apt-get install -y --no-install-recommends \
         python3 python3-pip python3-venv \
         git ca-certificates wget curl \
      && rm -rf /var/lib/apt/lists/* \
      && python3 -m pip install --upgrade pip \
      && python3 -m pip install \
         torch torchvision torchaudio --index-url https://download.pytorch.org/whl/<CUDA_ЖОЛЫ> \
      && python3 -m pip install \
         transformers accelerate peft bitsandbytes datasets sentencepiece einops

   WORKDIR /workspace
   CMD ["bash"]
   ```

   Мұнда:

   - `<DOCKER_БЕЙНЕ>` — [Docker Hub-тағы бейненің](https://hub.docker.com/r/nvidia/cuda/tags) `nvidia/cuda/<БЕЙНЕ_АТЫ>` форматындағы дәл атауы. Мысалы, `nvidia/cuda/12.4.0-devel-ubuntu22.04`.
   - `<CUDA_ЖОЛЫ>` — `<DOCKER_БЕЙНЕ>` мәніндегі нұсқаға сәйкес `cu<НЕГІЗГІ_НҰСҚА><КОШЫМША_НҰСҚА>` форматындағы CUDA нұсқасы. Мысалы, `cu124`.

   {cut(Dockerfile мысалы)}

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

1. GPU бар Docker-контейнерді іске қосыңыз:

   ```console
   docker run --gpus all -it --rm \
   -v $(pwd):/workspace \
   -p 8888:8888 \
   my-ml-image
   ```

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. LoRA бар LLM Llama-2-7B Fine-tuning конфигурациясын іске қосыңыз)[id=gpu-how-to-guides-ml-ds-env-fine-tuning]}

1. LoRA моделін оқытуға дайындайтын `llama.py` Python-скриптін жасаңыз:

   ```python
   from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, BitsAndBytesConfig
   from peft import LoraConfig, get_peft_model, TaskType
   from datasets import load_dataset
   import torch

   MODEL_NAME = "meta-llama/Llama-2-7b-hf"  # HF-та лицензияны қабылдауды талап етеді
   # 4-bit кванттау (28 GB орнына 16 GB VRAM-ға сыяды)
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
      device_map="auto"  # автоматты түрде GPU-ға бөледі
   )

   # LoRA конфигурациясы
   lora_config = LoraConfig(
      task_type=TaskType.CAUSAL_LM,
      r=16,               # адаптер рангі
      lora_alpha=32,
      target_modules=["q_proj", "v_proj"],  # тек attention қабаттары
      lora_dropout=0.05,
      bias="none"
   )

   model = get_peft_model(model, lora_config)
   model.print_trainable_parameters()

   # trainable params: 4,194,304 || all params: 3,504,607,232 || trainable%: 0.1197
   # Датасетті жүктеу (мысалы — alpaca)
   dataset = load_dataset("tatsu-lab/alpaca", split="train[:1000]")
   # Әрі қарай — transformers-тің стандартты Trainer-і
   # ... (өз TrainingArguments және Trainer.train() қосыңыз)
   print("LoRA моделі оқытуға дайын!")
   ```

1. Скриптті іске қосыңыз:

   {tabs}

   {tab(CUDA компоненттерін жүйеге орнату)}

   ```console
   export HF_TOKEN="<HF_ТОКЕН>"
   python llama.py
   ```

   Мұнда `<HF_ТОКЕН>` — [Hugging Face-тегі токен](https://huggingface.co/docs/hub/security-tokens). Бұл токенді қолданатын аккаунтта [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf) репозиторийіне қолжетімділік болуы керек.

   {/tab}

   {tab(NVIDIA Container Toolkit + Docker)}

   ```console
   docker run --rm --gpus all \
      -v "$PWD":/workspace \
      -v "$HOME/.cache/huggingface":/root/.cache/huggingface \
      -e HF_TOKEN="<HF_ТОКЕН>" \
      -w /workspace \
      <DOCKER_БЕЙНЕ> \
      python3 train_lora.py
   ```

   Мұнда:

   - `<HF_ТОКЕН>` — [Hugging Face-тегі токен](https://huggingface.co/docs/hub/security-tokens). Бұл токенді қолданатын аккаунтта [meta-llama/Llama-2-7b-hf](https://huggingface.co/meta-llama/Llama-2-7b-hf) репозиторийіне қолжетімділік болуы керек.
   - `<DOCKER_БЕЙНЕ>` — Dockerfile-да қолданылған бейненің атауы.

   {/tab}

   {/tabs}

   Сәтті орындалған жағдайда команданың шығысында мына хабарлама болады:

   ```txt
   LoRA моделі оқытуға дайын!
   ```