# {heading(Создание образа с помощью локальной ВМ)[id=iaas-linux-image]}

Образ облачной ВМ можно создать с помощью локальной виртуальной машины. 

В качестве примера рассматривается создание и настройка образа ВМ с ОС Arch Linux.

## {heading(Подготовительные шаги)[id=iaas-linux-image-preparatory-steps]}

1. Создайте на локальном компьютере виртуальную машину в минимальной конфигурации с одним диском без дополнительных логических разделов.
1. Подключите ВМ к сети с доступом в интернет.
1. Настройте подключение к ВМ по SSH.

## {heading(1. Установите целевую ОС)[id=iaas-linux-image-custom-install]}

1. Установите на локальную ВМ целевую ОС, как описано в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Installation_guide_(Русский)).
1. Подключитесь к ВМ по SSH.

## {heading(2. Установите ПО для облачной виртуализации)[id=iaas-linux-image-custom-install-po]}

1. Установите и настройте ПО для облачной инициализации виртуальной машины:

   1. Установите на ВМ пакет `cloud-init`, как описано в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Cloud-init).
   1. Включите автозапуск `cloud-init`, выполнив команду:

      ```console
      systemctl enable cloud-init
      ```
   1. (Опционально) Отредактируйте настройки в конфигурационном файле `/etc/cloud/cloud.cfg`.

1. Установите и настройте [гостевой агент QEMU](https://qemu-project.gitlab.io/qemu/about/index.html):

   1. Установите пакет `qemu-guest-agent`:

      ```console
      apt-get install qemu-guest-agent
      ```

   1. Включите автозапуск ` qemu-guest-agent `, выполнив команду:

      ```console
      systemctl enable qemu-guest-agent
      ```

## {heading(3. (Опционально) Выполните дополнительные настройки локальной ВМ)[id=iaas-linux-image-custom-settings]}

1. Выключите в `cloud-init` все ресурсы, кроме OpenStack. Для этого создайте конфигурационный файл `/etc/cloud/cloud.cfg.d/15_datasource.cfg` с содержимым:

   ```txt
   datasource:
    OpenStack:
     max_wait: 180
   ```
1. Очистите ВМ от ненужных артефактов, последовательно выполнив команды:

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

## {heading(4. Импортируйте образ диска локальной ВМ в {var(cloud)})[id=iaas-linux-image-custom-import]}

1. Сделайте копию жесткого диска локальной ВМ:

   ```console
   dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
   ```

   Будет создан файл `Arch.raw` с образом ВМ в формате RAW.

1. {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=Установите]} на локальную ВМ клиент OpenStack и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в вашем проекте {var(cloud)}.
1. Загрузите образ `Arch.raw` в {var(cloud)} под именем `Arch`:

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

   Здесь аргументы вида `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` используются для присвоения образу {ifdef(public)}{linkto(../../../../computing/iaas/instructions/images/image-metadata#iaas-image-metadata)[text=метатегов]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}метатегов{/ifdef}.

## {heading(5. Проверьте успешность загрузки образа)[id=iaas-linux-image-custom-download-success]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Образы**.
1. Убедитесь, что в списке есть образ с именем `Arch`.

## {heading(Удалите неиспользуемые ресурсы)[id=iaas-linux-image-custom-delete]}

Если загруженный образ вам больше не нужен, {linkto(../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-delete)[text=удалите его]}.
