# {heading(Шардирование инстанса БД)[id=dbaas-db-sharding]}

{note:warn}
Управление шардами доступно только в {linkto(../../concepts/work-configs#dbaas-work-configs)[text=конфигурации]} **Кластер** для СУБД ClickHouse{ifdef(public)} и MongoDB{/ifdef}.
{/note}

## {heading(Добавление шарда)[id=dbaas-db-sharding-add]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Добавить шард**.
1. Задайте для добавляемого шарда:

   - название шарда;
   - количество реплик в шарде;
   - тип виртуальной машины;
   - зону доступности;
   - тип диска;
   - размер диска;
   - ключ для доступа по SSH.

1. При необходимости:

   - Только для ClickHouse: включите мониторинг.
   - Включите и настройте автомасштабирование диска.

1. Нажмите кнопку **Расширить кластер**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Масштабирование шарда)[id=dbaas-db-sharding-scaling]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного шарда инстанса БД и выберите пункт **Масштабировать шард**.
1. Задайте количество хостов в шарде в параметре **Количество узлов**.
1. Нажмите кнопку **Подтвердить**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Удаление хоста из шарда)[id=dbaas-db-sharding-delete-host]}

Операция доступна только для ClickHouse.

{note:info}
Единственный хост шарда удалить невозможно.
{/note}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного хоста шарда инстанса БД и выберите пункт **Удалить инстанс**.
1. Нажмите кнопку **Подтвердить**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Удаление шарда)[id=dbaas-db-sharding-delete-shard]}

Операция доступна только для ClickHouse.

{note:warn}
Шард будет удален вместе со всеми хостами, входящими в него.
{/note}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного шарда инстанса БД и выберите пункт **Удалить шард**.
1. Нажмите кнопку **Подтвердить**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}