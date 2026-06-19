# {heading(Работа с пулом рабочих столов)[id=desktops-pool-manage]}

{note:info}
Вы также можете {linkto(../../../../../computing/cloud-desktops/instructions/manage-desktops#desktops-manage-desktops)[text=управлять всеми рабочими столами]}, созданными в системе для всех пулов.
{/note}

## {heading(Просмотр списка пулов рабочих столов)[id=desktops-pool-view]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Desktop** → **Пулы рабочих столов**.

   Отобразится список ранее созданных пулов рабочих столов.

   Статус пула отображается слева от его названия:

   - Зеленый — **Доступен** для подключения новых рабочих столов.
   - Серый — **Недоступен** для подключения рабочих столов.

## {heading(Редактирование параметров пула)[id=desktops-pool-edit]}

После создания пула вы можете изменить любые его параметры, кроме имени, типа и зоны доступности.

Чтобы изменить правила для группы безопасности пула, в личном кабинете или с помощью Openstack CLI {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=добавьте]} в группу новые правила и {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups-delete-rule)[text=удалите]} ненужные.

Для изменения остальных параметров:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Desktop** → **Пулы рабочих столов**.
1. Перейдите на страницу редактирования пула одним из способов:

   - Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного пула и выберите пункт **Редактировать пул**.
   - В списке пулов нажмите на имя нужного пула, перейдите на вкладку **Параметры пула** и нажмите кнопку **Редактировать пул**.

1. (Опционально) Измените {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-setup-configuration)[text=параметры конфигурации пула]}.
1. Нажмите кнопку **Следующий шаг**.
1. (Опционально) Измените {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-configure-vms)[text=настройки виртуальных машин пула]}.
1. Нажмите кнопку **Следующий шаг**.
1. (Опционально) Измените {linkto(../../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-configure-peripherals)[text=настройки периферии ВМ пула]}.
1. Нажмите кнопку **Сохранить изменения**.

## {heading(Отправка сообщения пользователям пула)[id=desktops-pool_manage-desktops-message]}

Это групповая операция: при необходимости можно отправить сообщение пользователям нескольких пулов, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Desktop** → **Пулы рабочих столов**.
1. Установите флажок для нужного пула.
1. Нажмите кнопку **Отправить сообщение**.
1. В появившемся окне заполните поля:

   - **Тип сообщения**: выберите одну из опций: **Предупреждение**, **Информационное** или **Ошибка**.
   - **Текст сообщения**: укажите информацию, которую хотите донести до пользователей пула.

1. Нажмите кнопку **Отправить сообщение**.

## {heading(Удаление пула рабочих столов)[id=desktops-pool-delete]}

{note:warn}
Удаленный пул невозможно восстановить. Если в пуле есть рабочие столы, они также будут удалены при удалении пула.
{/note}

Это групповая операция: при необходимости можно удалить сразу несколько пулов, выбрав их с помощью флажков.

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Desktop** → **Пулы рабочих столов**.
1. Удалите пул одним из способов:

   - Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного пула и выберите пункт **Удалить пул**.
   - Через страницу пула:

     1. В списке пулов выберите пул, который хотите удалить, и нажмите на его имя.
     1. Перейдите на вкладку **Параметры**.
     1. Нажмите ![Корзина](../../../../../assets/trash-icon.svg "inline") в правом верхнем углу вкладки.

1. Подтвердите удаление.

{note:warn}
Удаление пулов рабочих столов, включая последний, не приводит к удалению инфраструктуры сервиса Cloud Desktop. Она {ifdef(public)}{linkto(../../../../../computing/cloud-desktops/tariffication#desktops-tariffication)[text=тарифицируется]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}тарифицируется{/ifdef} и потребляет вычислительные ресурсы.

Если вы больше не используете Cloud Desktop, {linkto(../../../../../computing/cloud-desktops/instructions/delete-vdi#desktops-delete-vdi)[text=удалите]} его инфраструктуру.
{/note}