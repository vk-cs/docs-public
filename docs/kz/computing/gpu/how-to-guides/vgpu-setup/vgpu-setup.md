# {heading(vGPU бар ВМ баптауы)[id=vgpu-setup]}

{include(/kz/_includes/_translated_by_ai.md)}

Егер vGPU-мен жұмыс істеу үшін өз бейнеңізден виртуалды машина құрған болсаңыз, ОЖ-ны қосымша баптау қажет: GPU драйверлерін және лицензиялау токенін орнатыңыз.

Егер VK Cloud бейнесі пайдаланылса, қосымша әрекеттер талап етілмейді.

## {heading(Дайындық қадамдары)[id=vgpu-setup-preparatory-steps]}

1. {linkto(../../../../computing/gpu/connect#gpu-connect)[text=Қосыңыз]} Cloud GPU сервисін, егер ол әлі қосылмаған болса.
1. [Техникалық қолдаудан](/kz/contacts) vGPU негізіндегі ВМ конфигурациясы үлгісіне квоталар сұратыңыз.
1. <!---{linkto(../../../../computing/iaas/concepts/image-vm#)[text=бейнені]}--> келесі тәсілдердің бірімен дайындаңыз:

   - Бұрыннан бар <!---{linkto(../../../../computing/iaas/concepts/vm#)[text=виртуалды машинадан]}--> {linkto(../../../../computing/iaas/instructions/images/images-manage#sozdanie_obraza)[text=жасаңыз]}.
   - Бейне файлынан {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттаңыз]}.

     [cloud-init](https://cloudinit.readthedocs.io/) (Linux) немесе [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) (Windows) қолдауы бар [дайындалған бейнені](https://docs.openstack.org/image-guide/obtain-images.html) пайдалану ұсынылады. Бұл бұлттық платформаға қатысты ОЖ параметрлерін баптауды автоматтандыруға мүмкіндік береді.

     Мұндай бейнелерді жасаудың кейбір тәсілдері <!---{linkto(../../../../computing/iaas/how-to-guides#)[text=Cloud Servers практикалық нұсқаулықтарында]}--> келтірілген.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#create_vm)[text=Жасаңыз]} {linkto(../../../../computing/gpu/concepts/about#gpu-about-vgpu-flavors)[text=vGPU конфигурация үлгілері]} және жасалған бейне негізіндегі виртуалды машинаны.

   Виртуалды машина интернетке қосылған болуы тиіс.

1. <!---{linkto(../../../../computing/iaas/instructions/vm/vm-connect#)[text=Қосылыңыз]}--> ВМ-ге.

## {heading({counter(toc-counter)}. GPU драйверін орнатыңыз)[id=vgpu-setup-driver-install]}

{tabs}

{tab(Linux)}

1. ОЖ-ны алдын ала баптауды орындаңыз:

   {tabs}

   {tab(apt)}

   1. Жүйелік компоненттерді жаңартыңыз:

      ```shell
      sudo apt update &&
      sudo apt upgrade -y
      ```

   1. ВМ-ді қайта жүктеңіз.
   1. Драйверді орнатуға қажетті қосымша пакеттерді орнатыңыз:

      ```shell
      sudo apt install linux-headers-$(uname -r) gcc make
      ```

   {/tab}

   {tab(dnf)}

   1. Жүйелік компоненттерді жаңартыңыз:

      ```shell
      sudo dnf update
      ```

   1. ВМ-ді қайта жүктеңіз.
   1. Драйверді орнатуға қажетті қосымша пакеттерді орнатыңыз:

      ```shell
      sudo dnf install -y kernel-devel kernel-headers gcc make
      ```

   {/tab}

   {/tabs}

1. NVIDIA® GRID драйверін келесі тәсілдердің бірімен жүктеп алыңыз:

   {tabs}

   {tab(wget)}

   ```shell
   wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {tab(curl)}

   ```shell
   curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_linux.run
   ```

   {/tab}

   {/tabs}

1. Жүктеп алынған файлға орындау құқықтарын беріңіз:

   ```shell
   chmod +x vgpu_driver_linux.run
   ```

1. Орнатуды іске қосыңыз:

   ```shell
   sudo ./vgpu_driver_linux.run
   ```

1. Орнатушының нұсқауларын орындаңыз.
1. ВМ-ді қайта іске қосыңыз.

{/tab}

{tab(Windows)}

1. NVIDIA® GRID драйверін [жүктеп алыңыз](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/guest-drivers/latest/vgpu_driver_windows.exe).
1. Файлды іске қосып, орнатушының нұсқауларын орындаңыз.
1. ВМ-ді қайта жүктеңіз.

{note:warn}
Драйверлер орнатылғаннан кейін VNC-консоль ВМ-ді басқару үшін қолжетімсіз болады. Одан әрі жұмыс істеу үшін RDP-қосылымын пайдаланыңыз немесе қашықтан басқаруға арналған баламалы БҚ орнатыңыз.
{/note}

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. Лицензиялауды баптаңыз)[id=vgpu-setup-license-setup]}

{tabs}

{tab(Linux)}

1. Лицензиялау скриптін келесі тәсілдердің бірімен жүктеп алыңыз:

   {tabs}

   {tab(wget)}

   ```shell
   wget https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
   ```

   {/tab}

   {tab(curl)}

   ```shell
   curl -O https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher
   ```

   {/tab}

   {/tabs}

1. Скриптке орындау құқықтарын беріңіз:

   ```shell
   chmod +x nvidia_token_fetcher
   ```

1. Скриптті іске қосыңыз:

   ```shell
   sudo ./nvidia_token_fetcher
   ```

1. (Опция бойынша) Жүйе іске қосылған кезде лицензиялау токенін автоматты тексеруді баптаңыз. Әрекеттер тәртібі ВМ жасалған бейнеде [cloud-init](https://cloudinit.readthedocs.io/) қолдауының болуына байланысты.

   {tabs}

   {tab(Cloud-init қолдауы бар бейне)}

   Скрипт файлын арнайы директорияға көшіріңіз: 

   ```shell
   sudo cp nvidia_token_fetcher /var/lib/cloud/scripts/per-boot/
   ```

   {/tab}

   {tab(Cloud-init қолдауы жоқ бейне)}     

   1. Скрипт файлын ортақ қолжетімді директорияға сақтаңыз:

      ```shell
      sudo cp nvidia_token_fetcher /usr/local/bin/
      ```

   1. systemd ішкі жүйесі үшін жаңа unit-файл жасаңыз:

      ```shell
      sudo nano /etc/systemd/system/nvidia-token.service
      ```

      Көрсетілген мысалда `nano` мәтіндік редакторы пайдаланылады, бірақ `vi` сияқты кез келген басқа редакторды да қолдана аласыз. 

   1. Мазмұнды файлға көшіріп, сақтаңыз:

      ```txt
      [Unit]
      Description=NVIDIA Licensing Script
      After=network.target

      [Service]
      Type=oneshot
      ExecStart=/usr/local/bin/nvidia_token_fetcher
      TimeoutStartSec=15
      RemainAfterExit=false

      [Install]
      WantedBy=multi-user.target
      ```

   1. Қызмет жүйе іске қосылғанда басталуы үшін оны қосыңыз:

      ```shell
      sudo systemctl enable nvidia-token.service
      ```
   {/tab}

   {/tabs}

{/tab}

{tab(Windows)}

1. Лицензиялау скриптін [жүктеп алыңыз](https://hub.mcs.mail.ru/repository/gpu-drivers-raw/bin/nvidia/nvidia-token-fetcher/latest/nvidia_token_fetcher.exe) және оны іске қосыңыз.

   Командалық интерфейсі бар терезе пайда болып, бірден дерлік жабылады. Осыдан кейін скрипт жұмысы аяқталады.

1. (Опция бойынша) Жүйе іске қосылған кезде лицензиялау токенін автоматты тексеруді баптаңыз. Әрекеттер тәртібі ВМ жасалған бейнеде [Cloudbase-Init](https://cloudbase.it/cloudbase-init/) қолдауының болуына байланысты.

   {tabs}

   {tab(Cloudbase-Init қолдауы бар бейне)}

   1. Скрипт файлын арнайы директорияға көшіріңіз:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\LocalScripts
      ```

   1. `cloudbase-init.conf` конфигурация файлын мәтіндік редакторда ашыңыз:

      ```plaintext
      C:\Program Files\Cloudbase Solutions\Cloudbase-Init\conf\cloudbase-init.conf
      ```

   1. `plugins` өрісінде жергілікті скрипттер плагині бар екенін тексеріңіз:

      ```plaintext
      plugins = cloudbaseinit.plugins.windows.localscripts.LocalScriptsPlugin
      ```

      Егер ол жоқ болса, қосыңыз. Егер плагиндер бірнешеу болса, олар үтір арқылы тізіледі.

   1. Файлды сақтап, `cloudbase-init` қызметін қайта іске қосыңыз. Ол үшін пәрмен жолында немесе PowerShell-де мына пәрменді орындаңыз:

      ```shell
      net stop cloudbase-init
      net start cloudbase-init
      ```

   {/tab}

   {tab(Cloudbase-Init қолдауы жоқ бейне)}

   1. Файлды қолжетімді жерге сақтаңыз. Мысал:

      ```plaintext
      C:\NVIDIA Token
      ```

   1. Скрипт файлын тышқанның оң жақ батырмасымен шертіп, **Жарлық жасау** пәрменін таңдаңыз.

      `<НАЗВАНИЕ_ФАЙЛА> - ярлык` форматындағы атауы бар файл жасалады.

   1. Алынған файлды мына директорияға көшіріңіз:

      ```plaintext
      C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
      ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading({counter(toc-counter)}. Жұмысқа қабілеттілігін тексеріңіз)[id=vgpu-setup-diagnostics]}

{tabs}

{tab(Linux)}

1. Қосылған құрылғыларды тексеріңіз:

   ```shell
   lspci | grep -i nvidia
   ```

   Конфигурацияңыздағы GPU атауы көрсетіледі.

1. Драйвер күйін біліңіз:

   ```shell
   nvidia-smi
   ```

   Егер драйвер дұрыс жұмыс істесе, шығыста конфигурацияңыздағы GPU көрсетіледі.

1. Лицензиялау баптауларын тексеріңіз:

   1. Лицензиялау токені файлының бар екеніне көз жеткізіңіз:

      ```shell
      sudo ls /etc/nvidia/ClientConfigToken/
      ```

   1. Лицензия күйін біліңіз:

      ```shell
      nvidia-smi -q | grep -i license
      ```

      Лицензиялау дұрыс бапталған кездегі шығыс:

      ```shell
      vGPU Software Licensed Product
          License Status: Licensed
      ```

{/tab}

{tab(Windows)}

1. GPU құрылғы менеджерінде көрсетілетінін тексеріңіз:

   1. WIN + X пернелер тіркесімін басыңыз.
   1. **Құрылғы менеджері** тармағын таңдаңыз.
   1. **Бейнеадаптерлер** тармағын екі рет шертіңіз.
   1. GPU құрылғысы көрсетілетініне көз жеткізіңіз.

1. Драйвердің жұмысын тексеріңіз. Ол үшін пәрмен жолында немесе PowerShell-де мына пәрменді орындаңыз:

   ```shell
   nvidia-smi
   ```

   Егер драйвер дұрыс жұмыс істесе, шығыста конфигурацияңыздағы GPU көрсетіледі.

1. Лицензиялау баптауларын тексеріңіз:

   1. Лицензиялау токені файлының бар екеніне көз жеткізіңіз. Ол үшін пәрмен жолында немесе PowerShell-де мына пәрменді орындаңыз:

      ```shell
      dir "C:\Program Files\NVIDIA Corporation\vGPU Licensing\ClientConfigToken\"
      ```

   1. Лицензия күйін тексеріңіз:

      ```shell
      nvidia-smi -q | grep -i license
      ```

      Лицензиялау дұрыс бапталған кездегі шығыс:

      ```shell
      vGPU Software Licensed Product
          License Status: Licensed
      ```

{/tab}

{/tabs}
