# {heading(Жергілікті ВМ көмегімен образ жасау)[id=iaas-linux-image]}

{include(/kz/_includes/_translated_by_ai.md)}

Бұлттық ВМ образын жергілікті виртуалды машинаның көмегімен жасауға болады. 

Мысал ретінде Arch Linux ОС-ы бар ВМ образын жасау және баптау қарастырылады.

## {heading(Дайындық қадамдары)[id=iaas-linux-image-preparatory-steps]}

1. Жергілікті компьютерде қосымша логикалық бөлімдерсіз бір дискісі бар минималды конфигурациядағы виртуалды машинаны жасаңыз.
1. ВМ-ді интернетке қолжетімді желіге қосыңыз.
1. ВМ-ге SSH арқылы қосылуды баптаңыз.

## {heading(1. Мақсатты ОС орнатыңыз)[id=iaas-linux-image-custom-install]}

1. [Arch Linux ресми құжаттамасында](https://wiki.archlinux.org/title/Installation_guide_(Русский)) сипатталғандай, жергілікті ВМ-ге мақсатты ОС-ты орнатыңыз.
1. ВМ-ге SSH арқылы қосылыңыз.

## {heading(2. Бұлттық виртуализацияға арналған БҚ орнатыңыз)[id=iaas-linux-image-custom-install-po]}

1. Виртуалды машинаны бұлттық инициализациялауға арналған БҚ-ны орнатып, баптаңыз:

   1. [Arch Linux ресми құжаттамасында](https://wiki.archlinux.org/title/Cloud-init) сипатталғандай, ВМ-ге `cloud-init` бумасын орнатыңыз.
   1. Команданы орындап, `cloud-init` автожүктелуін қосыңыз:

      ```console
      systemctl enable cloud-init
      ```
   1. (Опционалды) `/etc/cloud/cloud.cfg` конфигурациялық файлындағы баптауларды өңдеңіз.

1. [QEMU guest agent](https://qemu-project.gitlab.io/qemu/about/index.html) орнатып, баптаңыз:

   1. `qemu-guest-agent` бумасын орнатыңыз:

      ```console
      apt-get install qemu-guest-agent
      ```

   1. Команданы орындап, ` qemu-guest-agent ` автожүктелуін қосыңыз:

      ```console
      systemctl enable qemu-guest-agent
      ```

## {heading(3. (Опционалды) Жергілікті ВМ-ге қосымша баптауларды орындаңыз)[id=iaas-linux-image-custom-settings]}

1. `cloud-init` ішінде OpenStack-тен басқа барлық ресурстарды өшіріңіз. Ол үшін `/etc/cloud/cloud.cfg.d/15_datasource.cfg` конфигурациялық файлын келесі мазмұнмен жасаңыз:

   ```txt
   datasource:
    OpenStack:
     max_wait: 180
   ```
1. Командаларды кезекпен орындап, ВМ-ді қажетсіз артефактілерден тазалаңыз:

   ```console
   rm /etc/udev/rules.d/*
   rm -rf /var/lib/cloud/*
   rm -rf /tmp/*
   find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
   sudo truncate -s 0 /etc/udev/rules.d/70-persistent-net.rules
   sed -i '/HWADDR/d' /etc/sysconfig/network-scripts/ifcfg-eth0
   sudo truncate -s 0 /etc/resolv.conf
   sudo rm -f /etc/NetworkManager/conf.d/99-cloud-init.conf
   rpm-ostree cleanup -b -p -r -m
   ```

## {heading(4. Жергілікті ВМ диск образын {var(cloud)} ішіне импорттаңыз)[id=iaas-linux-image-custom-import]}

1. Жергілікті ВМ қатты дискісінің көшірмесін жасаңыз:

   ```console
   dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
   ```

   RAW форматындағы ВМ образы бар `Arch.raw` файлы жасалады.

1. Жергілікті ВМ-ге OpenStack клиентін [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) және {var(cloud)} жобаңызда [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#openstack-authorize).
1. `Arch.raw` образын {var(cloud)} ішіне `Arch` атауымен жүктеңіз:

   ```console
   openstack image create        --progress        --private        --container-format bare        --disk-format raw        --file ~/Arch.raw        --property store=s3        --property hw_qemu_guest_agent=True        --property os_require_quiesce=yes        --property mcs_name='Arch'        Arch
   ```

   Мұнда `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` түріндегі аргументтер образға [метатегтерді](/kz/computing/iaas/instructions/images/image-metadata) тағайындау үшін қолданылады.

## {heading(5. Образдың сәтті жүктелгенін тексеріңіз)[id=iaas-linux-image-custom-download-success]}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cer)}{linkto(../../../../intro/authorization/lk_entry#prerequisites_vkc_ui)[text=Өтіңіз]}{/ifdef} в личный кабинет {var(cloud)}.
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. Тізімде `Arch` атауы бар образдың бар екеніне көз жеткізіңіз.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=iaas-linux-image-custom-delete]}

Егер жүктелген образ енді қажет болмаса, оны [жойыңыз](/kz/computing/iaas/instructions/images/images-manage#iaas-images-manage-delete).
