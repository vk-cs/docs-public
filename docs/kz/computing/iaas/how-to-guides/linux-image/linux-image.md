{include(/kz/_includes/_translated_by_ai.md)}

Бұлттық ВМ образын жергілікті виртуалды машинаның көмегімен жасауға болады. 

## Дайындық қадамдары

1. Жергілікті компьютерде қосымша логикалық бөлімдерсіз бір дискісі бар минималды конфигурациядағы виртуалды машинаны жасаңыз.
1. ВМ-ді интернетке қолжетімді желіге қосыңыз.
1. ВМ-ге SSH арқылы қосылуды баптаңыз.

## 1. Мақсатты ОС орнатыңыз

1. [Arch Linux ресми құжаттамасында](https://wiki.archlinux.org/title/Installation_guide_(Русский)) сипатталғандай, жергілікті ВМ-ге мақсатты ОС-ты орнатыңыз.
1. ВМ-ге SSH арқылы қосылыңыз.

## 2. Бұлттық виртуализацияға арналған БҚ орнатыңыз

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

## 3. (Опционалды) Жергілікті ВМ-ге қосымша баптауларды орындаңыз

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

## 4. Жергілікті ВМ диск образын VK Cloud ішіне импорттаңыз

1. Жергілікті ВМ қатты дискісінің көшірмесін жасаңыз:

    ```console
    dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
    ```

   RAW форматындағы ВМ образы бар `Arch.raw` файлы жасалады.

1. Жергілікті ВМ-ге OpenStack клиентін [орнатыңыз](/kz/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) және VK Cloud жобаңызда [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu).
1. `Arch.raw` образын VK Cloud ішіне `Arch` атауымен жүктеңіз:

    ```console
    openstack image create \
        --progress \
        --private \
        --container-format bare \
        --disk-format raw \
        --file ~/Arch.raw \
        --property store=s3 \
        --property hw_qemu_guest_agent=True \
        --property os_require_quiesce=yes \
        --property mcs_name='Arch' \
        Arch
    ```

   Мұнда `--property <ключ>=<значение>` түріндегі аргументтер образға [метатегтерді](/kz/computing/iaas/instructions/images/image-metadata) тағайындау үшін қолданылады.

## 5. Образдың сәтті жүктелгенін тексеріңіз

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне өтіңіз.
1. **Бұлтты есептеулер → Образдар** бөліміне өтіңіз.
1. Тізімде `Arch` атауы бар образдың бар екеніне көз жеткізіңіз.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер жүктелген образ енді қажет болмаса, оны [жойыңыз](/kz/computing/iaas/instructions/images/images-manage#obrazdy_zhoyu).
