# {heading(Подключение к {var(s3)} без интернета)[id=vnet-s3-service-net]}

{linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-service-net)[text=Сервисная сеть]} позволяет работать с объектным хранилищем {var(s3)} без доступа в интернет. Вы можете подключить к объектному хранилищу серверы, которые находятся в приватной облачной сети или подключены к {var(cloud)} через {linkto(../../../../networks/directconnect/connect#directconnect-connect)[text=Direct Connect]}.

В статье показан пример настройки сервисной сети для доступа к {var(s3)} из ВМ.

Для простоты настройки ВМ будет подключена к публичной сети, чтобы иметь доступ по SSH. Подключение к сервисной сети может быть настроено и без доступа по SSH. В этом случае все настройки производятся через VNC-консоль.

{note:info}
Если вы настраиваете подключение к сервисной сети через Direct Connect, доступ к ВМ по SSH доступен без публичной сети.
{/note}

## {heading(Подготовительные шаги)[id=vnet-s3-service-net-prep]}

1. Обратитесь в [техническую поддержку](/ru/contacts), чтобы добавить сервисную сеть в свой проект.

   Запишите имя и IP-адрес сети. В этом примере — `s3-ephn` и `198.18.0.0/20`.

1. {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Создайте бакет]} в сервисе {var(s3)}, если этого еще не сделано.
1. {linkto(../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys)[text=Создайте аккаунт]} в сервисе {var(s3)}, если этого еще не сделано. Сохраните идентификатор ключа и секретный ключ.
1. Подготовьте ВМ, из которой нужно подключить доступ к {var(s3)}:

   1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте ВМ]} со следующими параметрами:

      - **Операционная система**: в этом примере используется ОС Ubuntu. Вы можете использовать другую ОС, но настройка сети в ней будет отличаться.
      - **Сеть**: любая сеть с доступом в интернет.
      - **Настройки Firewall**: `default`, `ssh`.
      - **Назначить внешний IP**: включите опцию.
      - **Использовать резервное копирование**: отключите опцию для экономии средств.
      - Остальные настройки выберите по своему усмотрению.
      
   1. {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-connect)[text=Подключите]} сервисную сеть к ВМ. Выберите сервисную сеть, которая была добавлена в ваш проект. В этом примере — `s3-ephn`. Остальные параметры оставьте по умолчанию.
   1. На вкладке **Сети** посмотрите IP-адрес и MAC-адрес подключения сервисной сети к ВМ. Запишите их. В этом примере — `198.18.14.1` и `fa:16:3e:d8:86:43`.
   1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь]} к ВМ по SSH.
   1. Обновите пакеты до актуальной версии и перезагрузите ВМ с помощью команд:

      ```console
      sudo apt update && sudo apt upgrade -y
      sudo reboot
      ```

   1. (Опционально) Установите утилиту [Netplan](https://www.altlinux.org/Netplan) для работы с сетевыми настройками. В виртуальных машинах с ОС Ubuntu 18 и выше эта утилита установлена по умолчанию.
   1. {linkto(../../../../storage/s3/connect/s3-cli#s3-connect-cli)[text=Настройте AWS CLI]} для работы с {var(s3)}.

## {heading(1. Настройте подключение к сервисной сети)[id=vnet-s3-service-net-service-network-connection]}

После подключения сервисной сети к ВМ у нее появится новый сетевой интерфейс. В сервисной сети нет DHCP, поэтому интерфейс нужно настроить вручную.

Чтобы настроить сетевой интерфейс ВМ, направленный в сервисную сеть:

1. Откройте сессию терминала с ВМ и получите права root-пользователя:

   ```console
   sudo bash
   ```

1. Посмотрите список сетевых интерфейсов ВМ:

   ```console
   ip a
   ```

   В списке найдите интерфейс, MAC-адрес которого совпадает с MAC-адресом интерфейса подключения к сервисной сети в личном кабинете.

   Пример ответа:

   ```console
   ens7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
   link/ether fa:16:3e:d8:86:43 brd ff:ff:ff:ff:ff:ff
   altname enp0s7
   ```
1. Создайте новый файл конфигурации сетевого интерфейса для Netplan:

   ```console
   nano /etc/netplan/service.yaml
   ```

1. Укажите и сохраните следующие сетевые настройки в файле конфигурации:

   ```yaml
   network:
   version: 2
   ethernets:
       ens7:
           addresses:
           - 198.18.14.1/20
           match:
               macaddress: fa:16:3e:d8:86:43
           mtu: 1500
           set-name: ens7
   ```

   Здесь:

   - `ens7` — название интерфейса ВМ, который направлен в сервисную сеть;
   - `addresses` — IP-адрес сервисной сети;
   - `macaddress` — MAC-адрес сервисной сети.

1. Примените настройки, выполнив команду:

   ```console
   netplan apply
   ```

1. Перенаправьте трафик {var(s3)} через сервисную сеть. Для этого укажите соответствие между доменом сервиса и его IP-адресом в сервисной сети:

   1. Откройте файл `hosts`:

      ```console
      nano /etc/hosts
      ```

   1. Добавьте в файл строку и сохраните изменения:

      ```txt
      198.18.0.1   hb.ru-msk.vkcloud-storage.ru
      ```

1. Проверьте, что подключение к {var(s3)} устанавливается через сервисную сеть:

   ```console
   curl hb.ru-msk.vkcloud-storage.ru -v
   ```

   В ответе должна быть строка:

   ```console
   Connected to hb.ru-msk.vkcloud-storage.ru (198.18.0.1) port 80 (#0)
   ```

## {heading(2. (Опционально) Отключите публичную сеть)[id=vnet-s3-service-net-disconnect-public-network]}

Если доступ к ВМ по SSH вам больше не нужен, {linkto(../../../../computing/iaas/instructions/vm/vm-add-net#iaas-vm-add-net-delete)[text=отключите]} сеть с доступом в интернет, которая была добавлена при создании ВМ.

## {heading(3. Проверьте подключение к сервису {var(s3)})[id=vnet-s3-service-net-check]}

1. Подключитесь к ВМ:
   
   - {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console)[text=Через VNC-консоль]}, если публичная сеть была отключена.
   - {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=По SSH]}, если публичная сеть не была отключена.
   
1. Выполните команду:

   ```console
   aws s3 ls --endpoint-url https://hb.ru-msk.vkcloud-storage.ru
   ```

   Здесь `--endpoint-url` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта. Возможные значения:

   - `https://hb.ru-msk.vkcloud-storage.ru` — домен региона Москва;
   - `https://hb.kz-ast.bizmrg.com` — домен региона Казахстан.

   В ответе должен вернуться список бакетов {var(s3)}.

## {heading(Удалите неиспользуемые ресурсы)[id=vnet-s3-service-net-delete]}

Если созданные ресурсы вам больше не нужны, удалите их:

1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=Удалите]} виртуальную машину.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-delete)[text=Удалите]} сети, в которых была размещена ВМ.
