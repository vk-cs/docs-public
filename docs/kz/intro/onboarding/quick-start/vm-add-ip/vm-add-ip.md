{include(/kz/_includes/_translated_by_ai.md)}

## Дайындық қадамдары

Linux негізіндегі виртуалды машинаны [жасаңыз](/kz/intro/onboarding/quick-start/create-vm#1_sozdayte_vm).

## {counter(add-ip)}. ВМ-ге сыртқы желіні қосыңыз

1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/)
1. **Бұлтты есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
1. Қажетті ВМ-ді таңдап, **Желілер** қойындысына өтіңіз.
1. **Қосылым қосу** түймесін басыңыз.
1. Ашылған терезеде:

    - **Атауы** өрісінде желі атауын беріңіз.
    - **Қосу үшін желі** өрісінде **Сыртқы желі (ext-net)** немесе **Сыртқы желі (internet)** мәнін таңдаңыз. Виртуалды машинаға IP-мекенжай автоматты түрде тағайындалады.
    - Басқа баптауларды талаптарыңызға қарай орнатыңыз немесе өзгеріссіз қалдырыңыз.

1. **Сақтау** түймесін басыңыз.

## {counter(add-ip)}. ВМ желілік интерфейсінің конфигурациясы туралы ақпарат алыңыз

1. VK Cloud жеке кабинетіне [өтіңіз](https://kz.cloud.vk.com/app/)
1. **Бұлтты есептеулер → Виртуалды машиналар** бөліміне өтіңіз.
1. Қажетті виртуалды машинаның атауын басыңыз.
1. **Желілер** қойындысына өтіңіз.
1. Желі туралы келесі ақпаратты жазып алыңыз:

   - желі мен ішкі желінің атауы;
   - ішкі желі шлюзі, мысалы `90.156.219.254`;
   - ішкі желінің CIDR-і, мысалы `90.156.216.0/22`;
   - IP-мекенжайы, мысалы `90.156.216.96`;
   - MAC-мекенжайы, мысалы `fa:16:3e:dd:cc:9b`.

## {counter(add-ip)}. ВМ операциялық жүйесінде желілік интерфейсті баптаңыз

1. [Виртуалды машинаның консоліне қосылып](/kz/intro/onboarding/quick-start/create-vm#2_podklyuchites_k_vm), авторизацияланыңыз.

1. `/etc/netplan/50-cloud-init.yaml` файлын өңдеп, оны келесі түрге келтіріңіз:

    ```yaml
    network:
        ethernets:
            ens3: # Имя интерфейса
                dhcp4: false
                addresses:
                    - 90.156.216.96/22 # IP-адрес + префикс из CIDR
                routes:
                    - to: 0.0.0.0/0
                      via: 90.156.219.254 # Адрес шлюза
                nameservers:
                    addresses:
                        - 5.61.237.120
                        - 5.61.237.127
                match:
                    macaddress: fa:16:3e:dd:cc:9b # MAC-адрес
                set-name: ens3
        version: 2
    ```

   Қажет болса, `networks.ethernets.ens3.nameservers.addresses` параметрінде басқа DNS-серверлерді көрсетіңіз.

1. Команданы орындаңыз:

    ```console
    sudo netplan apply
    ```

1. Өңделген конфигурациялық файлға автоматты өзгерістер енгізуге тыйым салыңыз:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

## {counter(add-ip)}. Желілік интерфейс баптауларын тексеріңіз

1. [Виртуалды машинаның консоліне қосылып](/kz/intro/onboarding/quick-start/create-vm#2_podklyuchites_k_vm), авторизацияланыңыз.

1. Команданы орындаңыз:

    ```console
    ip link show
    ```

   Шығыс мысалы:

    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

   Команда шығысынан `link\ether` параметрі бұрын алынған MAC-мекенжаймен сәйкес келетін интерфейс атауын табыңыз.
   Осы мысалда бұл `ens3` болады.

1. Алдыңғы қадамда алынған интерфейс атауын қойып, команданы орындаңыз:

    ```console
    ip address show ens3
    ```

    Шығыс мысалы:

    ```text
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
           valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
    ```

    Шығыста мыналар болуы керек:

   - Интерфейс күйі туралы мәліметтер: `state UP`.
   - Ішкі желінің CIDR-інен алынған `/24` префиксімен біріктірілген виртуалды машинаның IP-мекенжайы, `inet` параметрінде (`10.0.0.5/24`).

1. Команданы орындаңыз:

    ```console
    ip route show default
    ```

   Шығыс мысалы:

    ```text
    default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
    ```

   Шығыста мыналар бар екеніне көз жеткізіңіз:

   - Шлюздің IP-мекенжайы (`via 10.0.0.1`).
   - Бұрын алынған интерфейс атауы (`dev ens3`).
   - Виртуалды машинаның приват IP-мекенжайы (`src 10.0.0.5`).

   Егер `ip address show` және `ip route show` командаларының шығысында көрсетілген мәліметтер болса, онда желілік интерфейс баптаулары дұрыс. 

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған ВМ есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

- оны кейінірек пайдалану үшін [тоқтатыңыз](/kz/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm);
- оны біржола [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm).
