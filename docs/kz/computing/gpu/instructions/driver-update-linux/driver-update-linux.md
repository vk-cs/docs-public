# {heading(Linux-жүйесіне арналған GPU драйверін жаңарту)[id=gpu-instructions-driver-update-linux]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
Мақалада {linkto(../../concepts/about#gpu-about-flavors-model)[text=GPU конфигурациясының шаблоны]} бар ВМ үшін Linux-драйверін жаңарту сипатталған, {linkto(../../concepts/vgpu#gpu-vgpu)[text=vGPU]} үшін жаңарту қолдау көрсетілмейді.

vGPU драйверінің нұсқасын өзгерту үшін оны {linkto(../driver-uninstall#gpu-instructions-driver-uninstall)[text=жойып]}, қайта {linkto(../driver-install#gpu-instructions-driver-install)[text=орнатыңыз]}.
{/note}

1. ВМ-ыңыздың конфигурация түрін тексеріңіз:

   1. {ifdef(public)}{var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{var(cloud)} жеке кабинетіне {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}{/ifdef}.
   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. Шыққан тізімнен GPU драйверін жаңарту қажет ВМ-ды табыңыз. **Түрі** бағанында {linkto(../../concepts/about#gpu-about-flavors-model)[text=бөлінген GPU конфигурациясының шаблоны]} көрсетілгеніне көз жеткізіңіз.

1. GPU бар ВМ-ге {linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.
1. Орнатылған драйвер нұсқасын анықтаңыз:

   ```console
   /usr/bin/nvidia-smi --query-gpu=driver_version --format=csv,noheader| head -n1
   ```

   `No such file or directory` қатесі драйвердің орнатылмағанын білдіреді. {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=%text]} бөліміне өтіңіз.

1. Драйверді орнату тәсілін анықтаңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   dpkg -S "$(command -v nvidia-smi)" 2>/dev/null
   ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   rpm -qf "$(command -v nvidia-smi)" 2>/dev/null
   ```
   {/tab}

   {/tabs}

   Бос жауап `nvidia-smi` командасының пакеттік менеджеріңізбен байланысы жоқтығын білдіреді. Әдетте бұл драйвердің пакеттік менеджерсіз, өндіруші сайтындағы дайын `*.run` орнату пакетінің көмегімен орнатылғанын білдіреді.

   Нұсқаны жаңарту үшін драйверді қайта орнату қажет. Ол үшін алдымен драйверді {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=жойыңыз]}, содан кейін қайта {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=орнатыңыз]}.

1. Жаңарту көзі мен жаңартуға қолжетімді нұсқаларды анықтаңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   apt-cache policy nvidia-driver-<ТАРМАҚ_НҰСҚАСЫ>
   ```

   `<ТАРМАҚ_НҰСҚАСЫ>` — `nvidia-smi` болуын тексеру кезінде алынған драйвердің мажорлық нұсқасының нөмірі. Мысалы, `550`.

   Команда сәтті орындалғанда шығыстағы `Candidate` немесе `Installed` өрістері `developer.download.nvidia.com`-нан басқа жүйелік немесе басқа сыртқы репозиторийлердегі нұсқаны көрсетсе, жаңартудың орнына NVIDIA CUDA репозиторийіне көшіп, драйверді қайта орнатқан жөн.

   Қайта орнату үшін алдымен драйверді {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=жойыңыз]}, содан кейін оны қайта {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=орнатыңыз]}.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. Қазір қандай пакеттер орнатылғанын анықтаңыз:

      ```console
      rpm -qa | grep -iE 'nvidia|akmod|kmod'
      ```

   1. Бұл пакеттің қай көзден орнатылғанын анықтаңыз:

      ```console
      dnf repoquery --installed --info <ПАКЕТ>
      ```

      Мұнда `<ПАКЕТ>` — жоғарыдағы тізімнен алынған кез келген пакеттің атауы. Мысалы, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   1. Жаңарту қай көзден орнатылатынын тексеріңіз:

      ```console
      sudo dnf install --assumeno cuda-drivers
      ```

      Команда сәтті орындалғанда `cuda-drivers` пакеті үшін `Repository` бағанында `cuda-rhel<НҰСҚА>-x86_64`-тен өзгеше мән көрсетілсе, жаңартудың орнына NVIDIA CUDA репозиторийіне көшіп, драйверді қайта орнатқан жөн.

      Қайта орнату үшін алдымен драйверді {linkto(../driver-uninstall#gpu-instructions-driver-uninstall-gpu-linux)[text=жойыңыз]}, содан кейін оны қайта {linkto(../driver-install/gpu-linux#gpu-instructions-driver-install-gpu-linux)[text=орнатыңыз]}.

   {/tab}

   {/tabs}

1. Драйверді жаңартыңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt install --only-upgrade -y cuda-driver-<ТАРМАҚ_НҰСҚАСЫ>
      ```

   Мұнда `<ТАРМАҚ_НҰСҚАСЫ>` — драйверді жаңарту қажет мажорлық нұсқаның нөмірі. Мысалы, `550`.

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf upgrade -y <ПАКЕТ>
   ```

   Мұнда `<ПАКЕТ>` — жоғарыда алынған тізімнен жаңарту қажет драйвер пакетінің атауы. Мысалы, `nvidia-driver-3:550.127.05-1.el9.x86_64`.

   {/tab}

   {/tabs}
