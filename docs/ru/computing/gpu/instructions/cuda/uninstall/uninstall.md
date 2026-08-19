# {heading(Удаление компонентов CUDA)[id=gpu-instructions-cuda-uninstall]}

{note:warn}

Выполняется полное удаление всех установленных компонентов CUDA.

{/note}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Подключитесь]} к ВМ с GPU.
1. Удалите компоненты CUDA, установленные из пакетного менеджера:

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

1. Запустите `cuda-uninstaller`, чтобы удалить компоненты, установленные из файла с расширением `*.run`.

   ```console
   sudo /usr/local/cuda-*/bin/cuda-uninstaller 2>/dev/null || sudo cuda-uninstaller
   ```

   Если ранее не выполнялось установки из файла с расширением `*.run`, то процесс удаления не запустится. Дальнейшие действия не требуются.
