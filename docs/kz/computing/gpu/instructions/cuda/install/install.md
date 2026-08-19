# {heading(CUDA компоненттерін орнату)[id=gpu-instructions-cuda-install]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}

Бұл бөлімде тек [NVIDIA CUDA репозиторийінен](https://developer.download.nvidia.com/compute/cuda/repos/) CUDA Toolkit, CUDA Runtime, CUDA Libraries және cuDNN компоненттері орнатылады және жаңартылады. Сондай-ақ [басқа қажетті компоненттерді](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#meta-packages) қосуға болады.

{/note}

1. GPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]} немесе бұрын жасалмаған болса, жаңасын {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. Бұрын орнатылмаған болса, GPU драйверін {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=орнатыңыз]}.
1. CUDA Toolkit, CUDA Runtime, CUDA Libraries және cuDNN орнатылғанын тексеріңіз:

   - CUDA Toolkit:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      `No such file or directory` қатесі, әдетте, CUDA Toolkit орнатылмағанын білдіреді.

   - CUDA Runtime, CUDA Libraries және cuDNN:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — драйвер кітапханасы. Драйвер дұрыс орнатылған болса, ол көрсетілуі тиіс. Драйвердің бар-жоғын {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]} бөлімінде тексеруге немесе қайта орнатуға болады.
      - `libcudnn.so` — cuDNN.

      Егер кітапханалардың бірі көрсетілмесе, тиісті компонент жүйеде орнатылмаған.

   Егер барлық қажетті компоненттер орнатылған, бірақ олардың нұсқасы қажеттіден төмен болса, {linkto(../update#gpu-instructions-cuda-update)[text=%text]} бөліміне өтіңіз.

   Егер компоненттердің бірі орнатылмаған болса, сценарийлердің бірін таңдаңыз:
   
   - Тек жетіспейтін компоненттерді, бұрыннан орнатылғандармен бірдей нұсқада орнатыңыз. Бұл тәсілді бұрыннан орнатылған нұсқалар сіздің тапсырмаларыңызға сай келсе пайдаланыңыз. Қажет болса, оларды кейін {linkto(../update#gpu-instructions-cuda-update)[text=жаңартуға]} болады.
   - Барлық компоненттерді толығымен қайта орнатыңыз. Бұл үшін алдымен барлық компоненттерді толығымен {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=жойыңыз]}, содан кейін орнатуға қайта оралыңыз. Бұл тәсілді нұсқаны төмендету немесе таза орнату қажет болғанда пайдаланыңыз.

1. [NVIDIA CUDA репозиторийінен](https://developer.download.nvidia.com/compute/cuda/repos/) CUDA Toolkit, CUDA Runtime, CUDA Libraries және cuDNN орнатыңыз. Ол үшін:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. Дистрибутив нұсқасын анықтаңыз:

      ```console
      cat /etc/os-release
      ```

   1. Дистрибутивіңіздің тиісті нұсқасына арналған NVIDIA CUDA репозиторийінен `cuda-keyring_1.1-1_all.deb` пакетін жүктеп алып, орнатыңыз:

      ```console
      wget https://developer.download.nvidia.com/compute/cuda/repos/<ДИСТРИБУТИВ><НҰСҚА>/x86_64/cuda-keyring_1.1-1_all.deb && \
      sudo dpkg -i cuda-keyring_1.1-1_all.deb
      ```

      Мұнда:

      - `<ДИСТРИБУТИВ>` — дистрибутив атауы латын әліпбиімен.
      - `<НҰСҚА>` — дистрибутив нұсқасы. Тек сандар көрсетіледі, нүктесіз.

      Мысалдар: `debian13`, `ubuntu2404`.

   1. Пакеттік менеджердің индекстерін жаңартыңыз:

      ```console
      sudo apt update
      ```

   1. Орнату үшін CUDA компоненттерінің қажетті нұсқалары қолжетімді екеніне көз жеткізіңіз:

      ```console
      apt-cache policy -<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
      ```

      Мұнда `<МАЖОР_НҰСҚА>` және `<МИНОР_НҰСҚА>` — CUDA компоненттерінің мажорлық және минорлық нұсқаларының нөмірлері. Мысалы, CUDA Toolkit 12.4 үшін пакеттің атауы `cuda-toolkit-12-4` болады.

      Команда сәтті орындалған кезде шығыста көрсетілген пакеттің орнатылатын нұсқасын білдіретін `Candidate` өрісі болады.

   1. CUDA компоненттерін орнатыңыз:

      ```console
      sudo apt -y install \
         cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Дистрибутивіңіз негізделген Red Hat Enterprise Linux нұсқасын анықтаңыз:

      ```console
      rpm -E %rhel
      ```

   1. NVIDIA CUDA репозиторийін дереккөз ретінде қосыңыз:

      ```console
      sudo tee /etc/yum.repos.d/nvidia-cuda.repo >/dev/null <<EOF
      [cuda-rhel<НҰСҚА>-x86_64]
      name=NVIDIA CUDA Repository (rhel<НҰСҚА>/x86_64)
      baseurl=https://developer.download.nvidia.com/compute/cuda/repos/rhel<НҰСҚА>/x86_64/
      enabled=1
      gpgcheck=1
      repo_gpgcheck=0
      gpgkey=https://developer.download.nvidia.com/compute/cuda/repos/rhel<НҰСҚА>/x86_64/D42D0685.pub
      EOF
      ```

      Мұнда `<НҰСҚА>` — дистрибутивіңіз негізделген Red Hat Enterprise Linux нұсқасының нөмірі.

   1. Пакеттік менеджердің кешін жаңартыңыз:

      ```console
      sudo dnf clean all
      sudo dnf makecache --refresh
      ```

   1. Орнату үшін CUDA компоненттерінің қажетті нұсқалары қолжетімді екеніне көз жеткізіңіз:

      ```console
      dnf --disablerepo="*" --enablerepo="cuda*" list | grep -E '^cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>(\.|$)|^cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>(\.|$)|^cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>(\.|$)|^cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>(\.|$)'
      ```

      Мұнда `<МАЖОР_НҰСҚА>` және `<МИНОР_НҰСҚА>` — CUDA компоненттерінің мажорлық және минорлық нұсқаларының нөмірлері. Мысалы, CUDA Toolkit 12.4 үшін пакеттің атауы `cuda-toolkit-12-4` болады.

   1. CUDA компоненттерін орнатыңыз:

      ```console
      sudo dnf install -y \
         cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
      ```

   {/tab}

   {/tabs}

1. CUDA Toolkit жұмысқа қабілеттілігін тексеріңіз:

   ```console
   nvcc --version
   ```

1. Егер `nvcc --version` командасын орындау кезінде `command not found` қатесі шықса, CUDA Toolkit-ті орта айнымалыларына қолмен қосыңыз:

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

1. CUDA Toolkit жұмысқа қабілеттілігін қайта тексеріңіз:

   ```console
   nvcc --version
   ```

1. (Опционалды) CUDA Runtime, CUDA Libraries және cuDNN орнатылғанын қайта тексеріңіз:

   ```console
   ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
   ```
