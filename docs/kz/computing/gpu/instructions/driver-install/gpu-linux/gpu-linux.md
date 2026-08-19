# {heading(Linux-жүйесіне арналған GPU драйверін орнату)[id=gpu-instructions-driver-install-gpu-linux]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}

Windows ОЖ-і бар ВМ-ге GPU драйверін орнату [өндіруші сайтындағы](https://www.nvidia.com/en-us/drivers/) орнату файлының көмегімен интерактивті режимде орындалады.

{/note}

1. ВМ-ыңыздың конфигурация түрін тексеріңіз:

   1. {ifdef(public)}{var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}{/ifdef}.
   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. Шыққан тізімнен GPU драйверін орнату қажет ВМ-ды табыңыз. **Түрі** бағанында {linkto(../../../concepts/about#gpu-about-flavors-model)[text=бөлінген GPU конфигурациясының шаблоны]} көрсетілгеніне көз жеткізіңіз.

1. GPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]} немесе бұрын жасалмаған болса, жаңасын {linkto(../../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасаңыз]}.
1. GPU драйвері орнатылған-орнатылмағанын тексеріңіз:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   Келесі нәтижелер мүмкін:

   - `No such file or directory` қатесі драйвердің орнатылмағанын білдіреді.
   - Команда шығысында драйвер нұсқасы көрсетіледі. Бұл драйвердің орнатылғанын және NVIDIA стегінің сәтті іске қосылғанын білдіреді. {linkto(../../driver-update-linux#gpu-instructions-driver-update-linux)[text=%text]} бөліміне өтіңіз.
   - `nvidia-smi` орындалады, бірақ команда шығысында `... couldn't communicate with the NVIDIA driver` қатесі шығады. Бұл драйвердің зақымдалғанын немесе оның дұрыс емес нұсқасы пайдаланылатынын білдіреді (мысалы, {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=vGPU]} үшін). Драйверді қайта орнатыңыз: алдымен GPU драйверін {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=жойыңыз]}, содан кейін осы нұсқаулықтың қадамдарын қайтадан орындап, оны қайта орнатыңыз.

1. Драйверді орнатыңыз:

   {note:info}

   Драйвер [NVIDIA CUDA репозиторийінен](https://developer.download.nvidia.com/compute/cuda/repos/) орнатылады.

   {/note}

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

      - `<ДИСТРИБУТИВ>` — дистрибутив атауы латын әрпімен.
      - `<НҰСҚА>` — дистрибутив нұсқасы. Тек сандар көрсетіледі, нүктесіз.

      Мысалдар: `debian13`, `ubuntu2404`.

   1. Пакеттік менеджер индекстерін жаңартыңыз:

      ```console
      sudo apt update
      ```

   1. Орнату үшін қажетті немесе одан да жаңа драйвер нұсқасы қолжетімді екеніне көз жеткізіңіз:

      ```console
      apt-cache policy cuda-drivers
      ```

      Команда сәтті орындалғанда шығыста `cuda-drivers` метапакетінен орнатылатын нұсқаны көрсететін `Candidate` өрісі болады.

   1. Драйверді орнатыңыз:

      ```console
      sudo apt -y install cuda-drivers-<ТАРМАҚ_НҰСҚАСЫ>
      ```

      Мұнда `<ТАРМАҚ_НҰСҚАСЫ>` — драйверді орнату қажет мажорлық нұсқаның нөмірі. Мысалы, `550`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Дистрибутивіңіз негізделген Red Hat Enterprise Linux нұсқасын анықтаңыз:

      ```console
      rpm -E %rhel
      ```

   1. NVIDIA CUDA репозиторийін көз ретінде қосыңыз:

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

   1. Пакеттік менеджер кешін жаңартыңыз:

      ```console
      sudo dnf clean all
      sudo dnf makecache --refresh
      ```

   1. Орнату үшін қажетті немесе одан да жаңа драйвер нұсқасы қолжетімді екеніне көз жеткізіңіз:

      ```console
      dnf repoquery --show-duplicates --latest-limit=0 cuda-drivers
      ```

   1. Драйверді орнатыңыз:

      ```console
      sudo dnf install '<ДРАЙВЕР_ПАКЕТІ>'
      ```

      Мұнда `<ДРАЙВЕР_ПАКЕТІ>` — алдыңғы қадамда алынған тізімдегі пакет атауы. Мысалы, `cuda-drivers-3:570.211.01-1.el9.x86_64`.

   {/tab}

   {/tabs}

   1. Драйвердің орнатылғанын тексеріңіз:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. Команданы орындау кезінде `command not found` қатесі шықса, `nvidia-smi` командасын орта айнымалыларына қолмен қосыңыз:

      ```console
      echo 'export PATH="$PATH:/usr/bin"' | sudo tee /etc/profile.d/nvidia-smi-path.sh >/dev/null &&
      source /etc/profile.d/nvidia-smi-path.sh
      ```

   1. `nvidia-smi` жұмысқа қабілеттілігін қайта тексеріңіз:

      ```console
      nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
      ```

   1. ВМ-ды қайта іске қосыңыз.
