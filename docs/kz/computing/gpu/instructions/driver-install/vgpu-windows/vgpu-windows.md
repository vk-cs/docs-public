# {heading(Лицензиялау токенін баптаумен бірге Windows-жүйесіне арналған vGPU драйверін орнату)[id=gpu-instructions-driver-install-vgpu-windows]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
{var(cloud)} компаниясының vGPU-ге арналған арнайы Windows-бейнесінен {linkto(../../../../iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасалған]} ВМ үшін бірінші іске қосу кезінде бір рет ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=қосылып]}, оны қайта іске қосу vGPU-дің барлық драйверлері мен қызметтерін толық инициализациялау үшін жеткілікті. vGPU драйверін бөлек орнатудың және лицензиялау токенін баптаудың қажеті жоқ.
{/note}

Нұсқаулықты орындағаннан кейін vGPU драйвері орнатылады, ал лицензиялау токені бапталады.

vGPU драйвері жаңартуды қолдамайды. Оның нұсқасын өзгерту үшін алдымен оны {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-windows)[text=жойыңыз]}, содан кейін осы нұсқаулықтың қадамдарын қайтадан орындап, оны қайта орнатыңыз.

## {heading(Дайындық қадамдары)[id=gpu-instructions-driver-install-vgpu-windows-preparation]}

1. ВМ-ыңыздың конфигурация түрін тексеріңіз:

   1. {ifdef(public)}{var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}{/ifdef}.
   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. Шыққан тізімнен vGPU драйверін орнату қажет ВМ-ды табыңыз. **Түрі** бағанында {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=vGPU конфигурациясының шаблоны]} көрсетілгеніне көз жеткізіңіз.

1. ВМ-ды бұрын жасалмаған болса, сыртқы желіге {linkto(../../../../iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=қосыңыз]}.
1. vGPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.

## {heading({counter(TOC)}. vGPU драйверін орнатыңыз)[id=gpu-instructions-vgpu-windows-install]}

1. NVIDIA® GRID драйверін [жүктеп алыңыз](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_windows.exe).
1. Файлды іске қосып, орнатушының нұсқауларын орындаңыз.

   {note:warn}
   Драйверді орнатқаннан кейін ВМ-ды басқару үшін VNC-консоль қолжетімсіз болады. Одан әрі жұмыс істеу үшін RDP-қосылымды пайдаланыңыз немесе қашықтан басқаруға арналған балама бағдарламалық қамтылымды орнатыңыз.
   {/note}

1. ВМ-ды қайта іске қосыңыз.
1. (Опционалды) Драйвердің жұмысқа қабілеттілігін тексеріңіз:

   1. WIN + X пернелер тіркесімін басыңыз.
   1. **Диспетчер устройств** тармағын таңдаңыз.
   1. **Видеоадаптеры** тармағын екі рет басыңыз.
   1. GPU құрылғысы көрсетіліп тұрғанына көз жеткізіңіз.
   1. Командалық жолда немесе PowerShell-де команданы орындаңыз:

      ```shell
      nvidia-smi
      ```

      Драйвер дұрыс жұмыс істесе, шығыста конфигурацияңыздың vGPU-і болады.

## {heading({counter(TOC)}. Лицензиялау токенін баптаңыз)[id=gpu-instructions-vgpu-windows-token]}

1. Лицензиялау скриптін [жүктеп алып](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher.exe), іске қосыңыз.

   Командалық интерфейсі бар терезе шығады, ол дерлік бірден жабылады. Осымен скрипттің жұмысы аяқталады.

1. Командалық жол немесе PowerShell көмегімен лицензиялау баптауларын тексеріңіз:

   1. Лицензиялау токенінің файлы бар-жоғын тексеріңіз:

      ```shell
      dir "C:\Program Files\NVIDIA Corporation\vGPU Licensing\ClientConfigToken\"
      ```

   1. `nvidia-smi` командасынан ақпарат сұраңыз:

      ```shell
      nvidia-smi -q
      ```

   1. `vGPU Software Licensed Product` бөліміндегі `License Status` мәні `Licensed` болатынына көз жеткізіңіз.

1. (Опционалды) Жүйе іске қосылған кезде лицензиялау токенін автоматты тексеруді баптаңыз.

   Автоматтандыруды [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) арқылы немесе Windows ОЖ-нің кірістірілген автоматты іске қосу тетігі арқылы баптауға болады.

   {tabs}

   {tab(Cloudbase-Init)}

   1. Скрипт файлын арнайы директорияға көшіріңіз:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\LocalScripts
      ```

   1. Мәтіндік редакторда `cloudbase-init.conf` конфигурация файлын ашыңыз:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\conf\cloudbase-init.conf
      ```

   1. `plugins` өрісінде жергілікті скрипттер плагині бар-жоғын тексеріңіз:

      ```plaintext
      plugins = cloudbaseinit.plugins.windows.localscripts.LocalScriptsPlugin
      ```

      Егер ол жоқ болса, қосыңыз. Плагиндер бірнешеу болса, оларды үтірмен бөліп тізіңіз.

   1. Файлды сақтап, `cloudbase-init` қызметін қайта іске қосыңыз. Ол үшін командалық жолда немесе PowerShell-де командаларды орындаңыз:

      ```shell
      net stop cloudbase-init
      net start cloudbase-init
      ```

   {/tab}

   {tab(Автоматты іске қосу)}

   1. Файлды қолжетімді жерге сақтаңыз. Мысал:

      ```plaintext
      C:\NVIDIA Token
      ```

   1. Скрипт файлын тінтуірдің оң жақ түймешігімен басып, **Создать ярлык** тармағын таңдаңыз.

      `<ФАЙЛ_АТАУЫ> - ярлык` форматындағы атауы бар файл жасалады.

   1. Алынған жарлықты директорияға көшіріңіз:

      ```plaintext
      C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
      ```

   {/tab}

   {/tabs}
