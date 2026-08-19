# {heading(CUDA компоненттерін жою)[id=gpu-instructions-cuda-uninstall]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Орнатылған барлық CUDA компоненттерін толығымен жою орындалады.

{/note}

1. GPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. Пакеттік менеджерден орнатылған CUDA компоненттерін жойыңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt remove --purge -y "*cuda*" "*cublas*" "*cufft*" "*cufile*" "*curand*" "*cusolver*" "*cusparse*" "*gds-tools*" "*npp*" "*nvjpeg*" "nsight*" "*nvvm*"
   sudo apt autoremove --purge -y
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf remove "cuda*" "*cublas*" "*cufft*" "*cufile*" "*curand*" "*cusolver*" "*cusparse*" "*gds-tools*" "*npp*" "*nvjpeg*" "nsight*" "*nvvm*"
   sudo dnf autoremove -y
   ```
   {/tab}

   {/tabs}

1. Кеңейтілімі `*.run` файлынан орнатылған компоненттерді жою үшін `cuda-uninstaller` іске қосыңыз.

   ```console
   sudo /usr/local/cuda-*/bin/cuda-uninstaller 2>/dev/null || sudo cuda-uninstaller
   ```

   Егер бұрын кеңейтілімі `*.run` файлынан орнату орындалмаған болса, жою процесі іске қосылмайды. Бұдан кейінгі әрекеттер қажет емес.
