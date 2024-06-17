Образ облачной ВМ можно создать с помощью локальной виртуальной машины. В качестве примера рассматривается создание и настройка образа ВМ с ОС Arch Linux.

## Подготовительные шаги

1. Создайте на локальном компьютере виртуальную машину в минимальной конфигурации с одним диском без дополнительных логических разделов.
1. Подключите ВМ к сети с доступом в интернет.
1. Настройте подключение к ВМ по SSH.

## 1. Установите целевую ОС

1. Установите на локальную ВМ целевую ОС, как описано в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Installation_guide_(Русский)).
1. Подключитесь к ВМ по SSH.

## 2. Установите ПО для облачной виртуализации

1. Установите и настройте ПО для облачной инициализации виртуальной машины:

   1. Установите на ВМ пакет `cloud-init`, как описано в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Cloud-init).
   1. Включите автозапуск `cloud-init`, выполнив команду:

      ```bash
      systemctl enable cloud-init
      ```
   1. (Опционально) Отредактируйте настройки в конфигурационном файле `/etc/cloud/cloud.cfg`.

1. Установите и настройте [гостевой агент QEMU](https://qemu-project.gitlab.io/qemu/about/index.html):

   1. Установите пакет `qemu-guest-agent`:

      ```bash
      apt-get install qemu-guest-agent
      ```

   1. Включите автозапуск ` qemu-guest-agent `, выполнив команду:

      ```bash
      systemctl enable qemu-guest-agent
      ```

## 3. (Опционально) Выполните дополнительные настройки локальной ВМ

1. Выключите в `cloud-init` все ресурсы, кроме OpenStack. Для этого создайте конфигурационный файл `/etc/cloud/cloud.cfg.d/15_datasource.cfg` с содержимым:

    ```txt
    datasource:
     OpenStack:
      max_wait: 180
    ```
1. Очистите ВМ от ненужных артефактов, последовательно выполнив команды:

    ```bash
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

## 4. Импортируйте образ диска локальной ВМ в VK Cloud

1. Сделайте копию жесткого диска локальной ВМ:

    ```bash
    dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
    ```

    Будет создан файл `Arch.raw` с образом ВМ в формате RAW.

1. [Установите](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack) на локальную ВМ клиент OpenStack и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в вашем проекте VK Cloud.
1. Загрузите образ `Arch.raw` в VK Cloud под именем `Arch`:

    ```bash
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

    Здесь аргументы вида `--property <ключ>=<значение>` используются для присвоения образу [метатегов](/ru/computing/iaas/service-management/images/image-metadata).

## 5. Проверьте успешность загрузки образа

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления → Образы**.
1. Убедитесь, что в списке есть образ с именем `Arch`.

## Удалите неиспользуемые ресурсы

Если загруженный образ вам больше не нужен, [удалите его](/ru/computing/iaas/service-management/images/images-manage#udalenie_obraza).
