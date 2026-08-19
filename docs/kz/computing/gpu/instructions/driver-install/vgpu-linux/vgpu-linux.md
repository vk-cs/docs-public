# {heading(Лицензиялау токенін баптаумен бірге Linux-жүйесіне арналған vGPU драйверін орнату)[id=gpu-instructions-driver-install-vgpu-linux]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:info}
{var(cloud)} компаниясының vGPU-ге арналған арнайы Linux-бейнесінен {linkto(../../../../iaas/instructions/vm/vm-create#iaas-vm-create)[text=жасалған]} ВМ үшін vGPU драйверін қосымша орнатудың және лицензиялау токенін баптаудың қажеті жоқ.
{/note}

Нұсқаулықты орындағаннан кейін vGPU драйвері орнатылады, ал лицензиялау токені бапталады.

vGPU драйвері жаңартуды қолдамайды. Оның нұсқасын өзгерту үшін алдымен оны {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=жойыңыз]}, содан кейін осы нұсқаулықтың қадамдарын қайтадан орындап, оны қайта орнатыңыз.

## {heading(Дайындық қадамдары)[id=gpu-instructions-driver-install-vgpu-linux-preparation]}

1. ВМ-ыңыздың конфигурация түрін тексеріңіз:

   1. {ifdef(public)}{var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{var(cloud)} жеке кабинетіне {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=өтіңіз]}{/ifdef}.
   1. **Бұлттық есептеулер** → **Виртуалды машиналар** бөліміне өтіңіз.
   1. Шыққан тізімнен vGPU драйверін орнату қажет ВМ-ды табыңыз. **Түрі** бағанында {linkto(../../../concepts/about#gpu-about-vgpu-flavors)[text=vGPU конфигурациясының шаблоны]} көрсетілгеніне көз жеткізіңіз.

1. ВМ-ды бұрын жасалмаған болса, сыртқы желіге {linkto(../../../../iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=қосыңыз]}.
1. vGPU бар ВМ-ге {linkto(../../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=қосылыңыз]}.

## {heading({counter(TOC)}. vGPU драйверін орнатыңыз)[id=gpu-instructions-vgpu-linux-install]}

1. vGPU драйвері орнатылған-орнатылмағанын тексеріңіз:

   ```console
   nvidia-smi --query-gpu=driver_version,virtualization.mode,virtualization.virtualized,name --format=csv,noheader
   ```

   Келесі нәтижелер мүмкін:

   - `No such file or directory` қатесі драйвердің орнатылмағанын білдіреді.
   - Команда шығысында драйвер нұсқасы көрсетіледі, ал виртуализация түрі vGPU ретінде көрсетіледі. Бұл драйвердің орнатылғанын және NVIDIA стегінің сәтті іске қосылғанын білдіреді. Бұдан кейінгі әрекеттер қажет емес.
   - `nvidia-smi` орындалады, бірақ команда шығысында `... couldn't communicate with the NVIDIA driver` қатесі шығады. Бұл драйвердің зақымдалғанын немесе оның дұрыс емес нұсқасы пайдаланылатынын білдіреді (мысалы, {linkto(../../../concepts/about#gpu-about-flavors-model)[text=бөлінген GPU]} үшін). Драйверді қайта орнату қажет, ол үшін алдымен оны {linkto(../../driver-uninstall#gpu-instructions-driver-uninstall-vgpu-linux)[text=жойыңыз]}, содан кейін осы нұсқаулықтың қадамдарын қайтадан орындап, оны қайта орнатыңыз.

1. ОЖ-нің алдын ала баптауын орындаңыз:

   {tabs}

   {tab(Ubuntu/Debian)}

   1. (Опционалды) Үйлесімділік мәселелерін болдырмау үшін жүйелік компоненттерді жаңартып, ВМ-ды қайта іске қосыңыз.

      {note:warn}
      Компоненттермен бірге Linux ядросының нұсқасы да жаңаруы мүмкін. Егер ОЖ-де қазіргі ядро нұсқасын қажет ететін бағдарламалық қамтылым бұрыннан пайдаланылып жатса, бұл қадамды өткізіп жіберген жөн.
      {/note}

      Командаларды орындаңыз:

      ```shell
      sudo apt update &&
      sudo apt upgrade -y &&
      sudo reboot
      ```

   1. Драйверді орнату үшін қажетті қосымша пакеттерді орнатыңыз:

      ```shell
      sudo apt install -y build-essential dkms perl pkg-config libelf-dev linux-headers-$(uname -r)
      ```

   {/tab}

   {tab(Red Hat Enterprise Linux)}

   1. (Опционалды) Үйлесімділік мәселелерін болдырмау үшін жүйелік компоненттерді жаңартып, ВМ-ды қайта іске қосыңыз.

      {note:warn}
      Компоненттермен бірге Linux ядросының нұсқасы да жаңаруы мүмкін. Егер ОЖ-де қазіргі ядро нұсқасын қажет ететін бағдарламалық қамтылым бұрыннан пайдаланылып жатса, бұл қадамды өткізіп жіберген жөн.
      {/note}

      Командаларды орындаңыз:

      ```shell
      sudo dnf update -y &&
      sudo reboot
      ```

   1. Драйверді орнату үшін қажетті қосымша пакеттерді орнатыңыз:

      ```shell
      sudo dnf -y install gcc make perl dkms pkgconf-pkg-config elfutils-libelf-devel "kernel-devel-uname-r == $(uname -r)" "kernel-headers-uname-r == $(uname -r)"
      ```

   {/tab}

   {/tabs}

1. NVIDIA® GRID драйверін тәсілдердің бірімен жүктеп алыңыз:

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

1. Жүктеп алынған файлға орындау құқығын беріңіз:

   ```shell
   chmod +x vgpu_driver_linux.run
   ```

1. Файлды іске қосып, орнатушының нұсқауларын орындаңыз:

   ```shell
   sudo ./vgpu_driver_linux.run
   ```

1. ВМ-ды қайта іске қосыңыз.

## {heading({counter(TOC)}. Лицензиялау токенін баптаңыз)[id=gpu-instructions-vgpu-linux-token]}

1. Лицензиялау скриптін тәсілдердің бірімен жүктеп алыңыз:

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

1. Скриптке орындау құқығын беріңіз:

   ```shell
   chmod +x nvidia_token_fetcher
   ```

1. Скриптті іске қосыңыз:

   ```shell
   sudo ./nvidia_token_fetcher
   ```

1. Лицензиялау баптауларын тексеріңіз:

   1. Лицензиялау токенінің файлы бар-жоғын тексеріңіз:

      ```shell
      sudo ls /etc/nvidia/ClientConfigToken/
      ```

   1. Лицензия мәртебесін анықтаңыз:

      ```shell
      nvidia-smi -q | grep -i license
      ```

      Лицензиялау дұрыс бапталғандағы шығыс:

      ```shell
      vGPU Software Licensed Product
          License Status: Licensed
      ```

1. (Опционалды) Жүйе іске қосылған кезде лицензиялау токенін автоматты тексеруді баптаңыз.

   ВМ жасалған кезде [дайындалған OpenStack-бейнесі](https://docs.openstack.org/image-guide/obtain-images.html) пайдаланылған болса, автоматтандыруды [cloud-init](https://cloudinit.readthedocs.io/) арқылы баптауға болады. Сондай-ақ systemd мүмкіндіктерін пайдалануға болады.

   {tabs}

   {tab(cloud-init-ге кіріктіру)}

   Скрипт файлын арнайы директорияға көшіріңіз:

   ```shell
   sudo cp nvidia_token_fetcher /var/lib/cloud/scripts/per-boot/
   ```

   {/tab}

   {tab(systemd үшін unit-файл жасау)}

   1. Скрипт файлын жалпыға қолжетімді директорияда сақтаңыз:

      ```shell
      sudo cp nvidia_token_fetcher /usr/local/bin/
      ```

   1. systemd ішкі жүйесі үшін жаңа unit-файл жасаңыз. `nano` мәтіндік редакторына арналған мысал:

      ```shell
      sudo nano /etc/systemd/system/nvidia-token.service
      ```

      Командада `nano` орнына кез келген басқа редакторды, мысалы `vi`, пайдалануға болады.

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

   1. Жүйе іске қосылғанда автоматты түрде іске қосылу үшін команданы орындаңыз:

      ```shell
      sudo systemctl enable nvidia-token.service
      ```

   {/tab}

   {/tabs}
