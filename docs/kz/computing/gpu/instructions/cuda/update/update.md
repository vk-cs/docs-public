# {heading(CUDA компоненттерін жаңарту)[id=gpu-instructions-cuda-update]}

{include(/kz/_includes/_translated_by_ai.md)}

1. GPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. Жаңартудан кейін [CUDA-мен үйлесімділік](https://docs.nvidia.com/deeplearning/cudnn/backend/latest/reference/support-matrix.html) үшін қажет болса, GPU драйверін {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=жаңартыңыз]}.
1. CUDA компоненттерінің нұсқасын тексеріңіз.

   1. CUDA Toolkit нұсқасын анықтаңыз:

      ```console
      /usr/local/cuda/bin/nvcc --version 2>/dev/null || /usr/local/cuda-*/bin/nvcc --version
      ```

      `No such file or directory` қатесі, әдетте, CUDA Toolkit орнатылмағанын білдіреді.

   1. CUDA Runtime, CUDA Libraries және cuDNN компоненттерінің нұсқасын анықтаңыз:

      ```console
      ldconfig -p | grep -E 'libcudart\.so|libcuda\.so|libcublas\.so|libcudnn\.so'
      ```

      - `libcudart.so` — CUDA Runtime.
      - `libcublas.so` — CUDA Libraries.
      - `libcuda.so` — драйвер кітапханасы. Драйвер дұрыс орнатылған болса, көрсетілуі тиіс. Қажет болса, драйвердің бар-жоғын {linkto(../../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]} бөлімінде тексеруге немесе қайта орнатуға болады.
      - `libcudnn.so` — cuDNN.

      Кітапхананың болмауы, әдетте, компоненттің жүйеде орнатылмағанын білдіреді.

   Егер компоненттердің бірі болмаса, сценарийлердің бірін таңдаңыз.
   
   - Қажетті нұсқадағы жетіспейтін компоненттерді {linkto(../install#gpu-instructions-cuda-install)[text=орнатыңыз]}, содан кейін жаңартуға қайта оралыңыз. Бұл тәсілді таза орнатудың қажеті болмаса пайдаланыңыз.
   - Барлық компоненттерді толығымен қайта орнатыңыз. Бұл үшін алдымен барлық компоненттерді толығымен {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=жойыңыз]}, содан кейін {linkto(../install#gpu-instructions-cuda-install)[text=орнатуға]} қайта оралыңыз. Бұл тәсілді нұсқаны төмендету немесе таза орнату қажет болғанда пайдаланыңыз.

1. CUDA компоненттерін орнату тәсілін анықтаңыз:

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

   Орнатылған, бірақ тізімде жоқ CUDA компоненттері осы компоненттің пакеттік менеджеріңізбен байланысы жоқтығын білдіреді. Әдетте бұл CUDA компоненті пакеттік менеджерсіз, өндіруші сайтындағы дайын `*.run` орнату пакетінің көмегімен орнатылғанын білдіреді.

   Мұндай компоненттердің нұсқасын жаңарту үшін оларды қайта орнату қажет. Ол үшін алдымен CUDA компоненттерін {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=жойыңыз]}, содан кейін {linkto(../install#gpu-instructions-cuda-install)[text=орнатыңыз]}.

1. Жаңарту көзі мен жаңартуға қолжетімді нұсқаларды анықтаңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>

   ```

   Мұнда `<МАЖОР_НҰСҚА>` және `<МИНОР_НҰСҚА>` — CUDA компоненттерінің мажорлық және минорлық нұсқаларының нөмірлері. Мысалы, CUDA Toolkit 12.4 үшін пакеттің атауы `cuda-toolkit-12-4` болады.

   Егер жауапта `Unable to locate package` қатесі шықса немесе `Candidate` немесе `Installed` өрісінде Ubuntu (`archive.ubuntu.com`) немесе Debian (`deb.debian.org` және `security.debian.org`) репозиторийлерінің нұсқасы көрсетілсе, жаңартудың орнына NVIDIA CUDA репозиторийіне (`developer.download.nvidia.com`) көшіп, CUDA компоненттерін қайта орнатқан жөн. Ол үшін алдымен CUDA Toolkit-ті {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=жойыңыз]}, содан кейін {linkto(../install#gpu-instructions-cuda-install)[text=орнатыңыз]}.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Қазір қандай пакеттер орнатылғанын анықтаңыз:

      ```console
      rpm -qa | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Бұл пакеттердің қай көзден орнатылғанын анықтаңыз:

      ```console
      dnf repoquery --installed --qf '%{name}.%{arch}\t%{version}-%{release}\t%{repoid}' | grep -E 'cuda-toolkit|cuda-runtime|cuda-libraries|cudnn9-cuda'
      ```

   1. Жаңарту қай көзден орнатылатынын тексеріңіз:

      ```console
      sudo dnf install --assumeno \
         cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
         cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
      ```

      `Repository` бағанында компоненттеріңіз үшін `cuda-rhel<НҰСҚА>-x86_64` репозиторийі көрсетілгеніне көз жеткізіңіз. Егер басқа репозиторий көрсетілсе, жаңартудың орнына NVIDIA CUDA репозиторийіне көшіп, CUDA компоненттерін қайта орнатқан жөн. Ол үшін алдымен CUDA компоненттерін {linkto(../uninstall#gpu-instructions-cuda-uninstall)[text=жойыңыз]}, содан кейін {linkto(../install#gpu-instructions-cuda-install)[text=орнатыңыз]}.

   {/tab}

   {/tabs}

1. CUDA компоненттерін жаңартыңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y \
      cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
   ```

   Мұнда `<МАЖОР_НҰСҚА>` және `<МИНОР_НҰСҚА>` — CUDA компоненттерінің мажорлық және минорлық нұсқаларының нөмірлері. Мысалы, CUDA Toolkit 12.4 үшін пакеттің атауы `cuda-toolkit-12-4` болады.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y \
      cuda-toolkit-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-runtime-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cuda-libraries-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА> \
      cudnn9-cuda-<МАЖОР_НҰСҚА>-<МИНОР_НҰСҚА>
   ```

   Мұнда `<МАЖОР_НҰСҚА>` және `<МИНОР_НҰСҚА>` — CUDA компоненттерінің мажорлық және минорлық нұсқаларының нөмірлері. Мысалы, CUDA Toolkit 12.4 үшін пакеттің атауы `cuda-toolkit-12-4` болады.

   {/tab}

   {/tabs}
