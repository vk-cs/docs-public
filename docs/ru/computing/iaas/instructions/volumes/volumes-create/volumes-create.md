# {heading(Создание диска)[id=iaas-volumes-create]}

{ifndef(private-cert)}
Чтобы создать диск типа Low Latency NVMe, обратитесь {ifdef(public)}в [техническую поддержку](/ru/contacts) и запросите доступ к {linkto(../../../../../computing/iaas/concepts/vm/cpu-generation#iaas-cpu-generation)[text=высокопроизводительным конфигурациям]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}к администратору {var(cloud)} и запросите доступ к высокопроизводительным конфигурациям{/ifdef} и дискам. Создание остальных {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=типов диска]} доступно по умолчанию во всех конфигурациях.
{/ifndef}

{note:info}
Создание диска для конкретной ВМ описано в разделе {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-mount-disk)[text=Управление ВМ]}.
{/note}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. Над списком дисков нажмите кнопку **Создать диск**.

{include(../../../../../_includes/_disk_params.md)[tags=disk]}

1. Нажмите кнопку **Создать диск**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=Выберите]} тип диска, определите его название в API и зону доступности, подходящую для размещения.
1. Просмотрите доступные типы дисков и скопируйте идентификатор типа, соответствующий названию в API.

   ```console
   openstack volume type list
   ```

1. Просмотрите зоны доступности и скопируйте имя выбранной зоны:

   ```console
   openstack availability zone list --volume
   ```

1. Создайте диск определенного типа и размера в выбранной зоне доступности:

   ```console
   openstack volume create --type <ID_ТИПА_ДИСКА> --size <РАЗМЕР> --availability-zone <ЗОНА_ДОСТУПНОСТИ> <НАЗВАНИЕ>
   ```

   {ifdef(public)}
   Максимальный размер ограничен. Подробнее — в разделе {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes-no-quotas-limits)[text=Квоты и лимиты]}.
   {/ifdef}

   Дополнительные параметры команды:

   - `--image <ID_ОБРАЗА>` — идентификатор образа, из которого будет создан диск;
   - `--snapshot <ID_СНИМКА>` — идентификатор снимка, из которого будет создан диск;
   - `--description <ОПИСАНИЕ>` — произвольное описание диска;
   - `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` — пользовательские свойства диска;
   - `--bootable` — создать загрузочный диск.

{/tab}

{/tabs}