VK Cloud поддерживает multiqueue (множества очередей) у образа ВМ и отдельной ВМ.

## Ограничения

Функция virtio-net multiqueue обеспечивает [повышение производительности](https://specs.openstack.org/openstack/nova-specs/specs/liberty/implemented/libvirt-virtiomq.html), но имеет некоторые ограничения:

- ОС ВМ ограничена ~ 200 векторами MSI. Для каждой очереди сетевого адаптера требуется вектор MSI, а также любое устройство virtio или назначенное устройство PCI. Определение экземпляра с несколькими сетевыми адаптерами virtio и виртуальными ЦП может привести к превышению лимита гостевого MSI.
- Multiqueue хорошо работает для входящего трафика, но иногда может вызвать снижение производительности для исходящего трафика.
- Включение multiqueue увеличивает общую пропускную способность сети, но одновременно увеличивает потребление ресурсов CPU.
- Если функция множества очередей была включена на хосте, но не была включена администратором в ОС ВМ, векторы MSI будут использоваться впустую.
- Если количество виртуальных сетевых адаптеров в экземпляре ВМ пропорционально количеству виртуальных ЦП, включение multiqueue значительно не влияет на производительность.

<warn>

На платформе VK Cloud недостаточно включить multiqueue только на уровне образа (в конфигурации QEMU). Администратору ОС необходимо вручную включить функциональность с помощью `ethtool` для ВМ, которые были созданы до включения multiqueue.

</warn>

## 1. Включите multiqueue

<tabs>
<tablist>
<tab>Для всех создаваемых ВМ</tab>
<tab>Для отдельной ВМ</tab>
</tablist>
<tabpanel>

Вариант включает multiqueue на уровне образа и будет работать для всех ВМ, созданных после выполнения инструкции.

1. [Создайте](../../instructions/vm-images/vm-images-manage) образ ВМ.
2. Получите список доступных образов:

    ```bash
    openstack image list
    ```

3. Скопируйте ID нужного образа.
4. Включите multiqueue:

    ```bash
    openstack image set <IMG_ID> --property hw_vif_multiqueue_enabled=true
    ```

</tabpanel>
<tabpanel>

Вариант применяется, когда ВМ уже была создана на момент включения multiqueue.

1. [Получите UUID виртуальной машины](../../instructions/vm/vm-manage#poluchenie-id-virtualnoy-mashiny) через CLI или личный кабинет VK Cloud.
1. Обратитесь в [техническую поддержку](/ru/contacts) с запросом на подключение multiqueue и указанием UUID целевой виртуальной машины.
1. После успешной обработки запроса из технической поддержки [выполните принудительную перезагрузку](../../instructions/vm/vm-manage#prinuditelnyy-perezapusk-vm) ВМ.

</tabpanel>
</tabs>

## 2. Проверьте подключение multiqueue

1. [Создайте](../../instructions/vm/vm-create) ВМ, в которой больше одного ЦП, и [подключитесь](../../instructions/vm/vm-connect) к ней.
2. Посмотрите все сетевые интерфейсы:

    ```bash
    sudo ip link show
    ```

    Пример вывода:

    ```bash
    ubuntu@dm-test:~$ sudo ip link show
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
        link/ether fa:16:3e:1d:3e:08 brd ff:ff:ff:ff:ff:ff
        altname enp0s3
    ```

    Здесь `ens3` — имя сетевого интерфейса, для которого нужно проверить подключение multiqueue.

3. Посмотрите текущее количество очередей:

    ```bash
    ethtool -l <имя_сетевого_интерфейса>
    ```

    Пример вывода:

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

Пример установки очередей:

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
