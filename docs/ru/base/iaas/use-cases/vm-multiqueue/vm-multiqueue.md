VK Cloud поддерживает множества очередей (multiqueue) у образа ВМ и отдельной ВМ для операционных систем семейства Linux.

## Ограничения

Функция множества очередей virtio-net обеспечивает [повышение производительности](https://specs.openstack.org/openstack/nova-specs/specs/liberty/implemented/libvirt-virtiomq.html), но имеет некоторые ограничения:

- ОС ВМ ограничена ~ 200 векторами MSI. Для каждой очереди сетевого адаптера требуется вектор MSI, а также любое устройство virtio или назначенное устройство PCI. Определение экземпляра с несколькими сетевыми адаптерами virtio и виртуальными ЦП может привести к превышению лимита гостевого MSI.
- Множества очередей хорошо работают для входящего трафика, но иногда могут вызвать снижение производительности для исходящего трафика.
- Включение множества очередей увеличивает общую пропускную способность сети, но одновременно увеличивает потребление ресурсов CPU.
- Если функция множества очередей была включена на хосте, но не была включена администратором в ОС ВМ, векторы MSI будут использоваться впустую.
- Если количество виртуальных сетевых адаптеров в экземпляре ВМ пропорционально количеству виртуальных ЦП, включение множества очередей значительно не влияет на производительность.

<warn>

В VK Cloud недостаточно включить множества очередей только на уровне образа (в конфигурации QEMU). Администратору ОС необходимо вручную включить функциональность с помощью `ethtool` для ВМ, которые были созданы до включения множества очередей.

</warn>

## 1. Включите множества очередей

<tabs>
<tablist>
<tab>Для новых ВМ из образа</tab>
<tab>Для отдельной ВМ</tab>
</tablist>
<tabpanel>

Вариант включает множества очередей на уровне образа и будет работать для всех ВМ, созданных на базе этого образа после выполнения инструкции.

1. [Создайте](../../instructions/vm-images/vm-images-manage) образ ВМ.
1. Получите список доступных образов:

    ```bash
    openstack image list
    ```

1. Скопируйте ID нужного образа.
1. Включите множества очередей:

    ```bash
    openstack image set <IMG_ID> --property hw_vif_multiqueue_enabled=true
    ```

</tabpanel>
<tabpanel>

Вариант применяется, когда ВМ уже была создана на момент включения множества очередей.

1. [Получите UUID виртуальной машины](../../instructions/vm/vm-manage#poluchenie_id_virtualnoy_mashiny) через CLI или личный кабинет VK Cloud.
1. Обратитесь в [техническую поддержку](/ru/contacts) с запросом на подключение множества очередей и указанием UUID целевой виртуальной машины.
1. После успешной обработки запроса из технической поддержки [выполните принудительную перезагрузку](../../instructions/vm/vm-manage#prinuditelnyy_perezapusk_vm) ВМ.

</tabpanel>
</tabs>

## 2. Проверьте подключение множества включения

1. [Создайте](../../instructions/vm/vm-create) ВМ, в которой больше одного ЦП, и [подключитесь](../../instructions/vm/vm-connect) к ней.
1. Посмотрите все сетевые интерфейсы:

    ```bash
    sudo ip link show
    ```

    <details>
     <summary>Пример вывода</summary>

    ```bash
    ubuntu@dm-test:~$ sudo ip link show
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
        link/ether fa:16:3e:1d:3e:08 brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

    Здесь `ens3` — имя сетевого интерфейса, для которого нужно проверить подключение множества очередей.

    </details>

1. Посмотрите текущее количество очередей:

    ```bash
    ethtool -l <имя_сетевого_интерфейса>
    ```

   <details>
     <summary>Пример вывода</summary>

   ```bash
    ubuntu@dm-test:~$ ethtool -l ens3
    Channel parameters for ens3:
    Pre-set maximums:
    RX:             n/a
    TX:             n/a
    Other:          n/a
    Combined:       1
    Current hardware settings:
    RX:             n/a
    TX:             n/a
    Other:          n/a
    Combined:       1
    ```

   </details>

## 3. Установите нужное количество очередей для ВМ

<info>

Количество очередей не может быть больше количества виртуальных ЦП.

</info>

1. [Создайте](../../instructions/vm/vm-create) ВМ и [подключитесь](../../instructions/vm/vm-connect) к ней.
1. Выполните команду:

    ```bash
    sudo ethtool -L <имя_сетевого_интерфейса> combined <число_очередей>
    ```
1. Проверьте новое количество очередей (параметр `Combined`):

    ```bash
    ethtool -l <имя_сетевого_интерфейса>
    ```

<details>
  <summary>Пример установки очередей</summary>

```bash
ubuntu@dm-test:~$ sudo ethtool -L ens3 combined 2
ubuntu@dm-test:~$ ethtool -l ens3
Channel parameters for ens3:
Pre-set maximums:
RX:             n/a
TX:             n/a
Other:          n/a
Combined:       4
Current hardware settings:
RX:             n/a
TX:             n/a
Other:          n/a
Combined:       2
```

</details>
