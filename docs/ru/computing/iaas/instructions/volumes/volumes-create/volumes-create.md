Чтобы создать диск типа Low Latency NVMe, [обратитесь в техподдержку](/ru/contacts) и запросите доступ к [высокопроизводительным конфигурациям](../../../concepts/vm/cpu-generation) и дискам. Создание остальных [типов диска](../../../concepts/data-storage/disk-types#disk_types) доступно по умолчанию во всех конфигурациях.

{note:info}

Создание диска для конкретной ВМ описано в разделе [Управление ВМ](/ru/computing/iaas/instructions/vm/vm-manage#mount_disk).

{/note}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. Над списком дисков нажмите кнопку **Создать диск**.

{include(/ru/_includes/_disk_params.md)[tags=disk]}

1. Нажмите кнопку **Создать диск**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.

2. [Выберите](../../../concepts/data-storage/disk-types#disk_types) тип диска, определите его название в API и зону доступности, подходящую для размещения.

3. Просмотрите доступные типы дисков и скопируйте ID типа, соответствующий названию в API.

   ```console
   openstack volume type list
   ```

4. Просмотрите зоны доступности и скопируйте имя выбранной зоны:

   ```console
   openstack availability zone list --volume
   ```

5. Создайте диск определенного типа и размера в выбранной зоне доступности:

   ```console
   openstack volume create --type <ID_ТИПА_ДИСКА> --size <РАЗМЕР> --availability-zone <ЗОНА_ДОСТУПНОСТИ> <НАЗВАНИЕ>
   ```

   Максимальный размер ограничен. Подробнее — в разделе [Квоты и лимиты](/ru/tools-for-using-services/account/concepts/quotasandlimits#limity_bez_kvot_b217dc78).

   Дополнительные параметры команды:

   - `--image <ID_ОБРАЗА>` — ID образа, из которого будет создан диск;
   - `--snapshot <ID_СНИМКА>` — ID снимка, из которого будет создан диск;
   - `--description <ОПИСАНИЕ>` — произвольное описание диска;
   - `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` — пользовательские свойства диска;
   - `--bootable` — создать загрузочный диск.

{/tab}

{/tabs}