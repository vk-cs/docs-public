## Подготовительные шаги

[Создайте](/ru/intro/onboarding/quick-start/create-vm#1_sozdayte_vm) виртуальную машину на базе Linux.

## {counter(add-ip)}. Подключите внешнюю сеть к ВМ

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
1. Выберите нужную ВМ и перейдите на вкладку **Сети**.
1. Нажмите кнопку **Добавить подключение**.
1. В появившемся окне:

    - В поле **Имя** задайте имя сети.
    - В поле **Сеть для подключения** выберите значение **Внешняя сеть (ext-net)** или **Внешняя сеть (internet)**. Виртуальной машине будет автоматически назначен IP-адрес.
    - Другие настройки задайте в зависимости от ваших требований или оставьте без изменений.

1. Нажмите кнопку **Сохранить**.

## {counter(add-ip)}. Получите информацию о конфигурации сетевого интерфейса ВМ

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления → Виртуальные машины**.
1. Нажмите на имя нужной виртуальной машины.
1. Перейдите на вкладку **Сети**.
1. Запишите следующую информацию о сети:

   - имя сети и подсети;
   - шлюз подсети, например `90.156.219.254`;
   - CIDR подсети, например `90.156.216.0/22`;
   - IP-адрес, например `90.156.216.96`;
   - MAC-адрес, например `fa:16:3e:dd:cc:9b`.

## {counter(add-ip)}. Настройте сетевой интерфейс в операционной системе ВМ

1. [Подключитесь](/ru/intro/onboarding/quick-start/create-vm#2_podklyuchites_k_vm) к консоли виртуальной машины и авторизуйтесь.

1. Отредактируйте файл `/etc/netplan/50-cloud-init.yaml` и приведите его к следующему виду:

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

   При необходимости укажите другие DNS-серверы в параметре `networks.ethernets.ens3.nameservers.addresses`.

1. Выполните команду:

    ```console
    sudo netplan apply
    ```

1. Запретите вносить автоматические изменения в отредактированный конфигурационный файл:

    ```console
    echo 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
    ```

## {counter(add-ip)}. Проверьте настройки сетевого интерфейса

1. [Подключитесь](/ru/intro/onboarding/quick-start/create-vm#2_podklyuchites_k_vm) к консоли виртуальной машины и авторизуйтесь.

1. Выполните команду:

    ```console
    ip link show
    ```

   Пример вывода:

    ```text
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT                   group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode                   DEFAULT group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

   Найдите в выводе команды имя интерфейса, для которого параметр `link\ether` совпадает с MAC-адресом, полученным ранее.
   В данном примере это будет `ens3`.

3.  Выполните команду, подставив в нее полученное на предыдущем шаге имя интерфейса:

    ```console
    ip address show ens3
    ```

    Пример вывода:

    ```text
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
        link/ether fa:16:3e:aa:bb:cc brd ff:ff:ff:ff:ff:ff
        altname enp0s3
        inet 10.0.0.5/24 metric 100 brd 10.0.0.255 scope global dynamic ens3
           valid_lft 603373sec preferred_lft 603373sec
        inet6 fe80::f816:3eff:feb4:d70f/64 scope link
           valid_lft forever preferred_lft forever
    ```

    Вывод должен содержать:

   - Сведения о состоянии интерфейса: `state UP`.
   - IP-адрес виртуальной машины, скомбинированный с префиксом `/24` из CIDR подсети, в параметре `inet` (`10.0.0.5/24`).

4. Выполните команду:

    ```console
    ip route show default
    ```

   Пример вывода:

    ```text
    default via 10.0.0.1 dev ens3 proto dhcp src 10.0.0.5 metric 100
    ```

   Убедитесь, что вывод содержит:

   - IP-адрес шлюза (`via 10.0.0.1`).
   - Имя интерфейса, полученное ранее (`dev ens3`).
   - Приватный IP-адрес виртуальной машины (`src 10.0.0.5`).

   Если вывод команд `ip address show` и `ip route show` содержит в себе приведенные сведения, то настройки сетевого интерфейса корректны. 

## Удалите неиспользуемые ресурсы

Работающая ВМ потребляет вычислительные ресурсы. Если она вам больше не нужна:

- [остановите](/ru/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) ее, чтобы воспользоваться ею позже;
- [удалите](/ru/computing/iaas/instructions/vm/vm-manage#delete_vm) ее навсегда.