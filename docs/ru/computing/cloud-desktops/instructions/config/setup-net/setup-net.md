# {heading(Настройка сети для инфраструктуры сервиса)[id=desktops-setup-net]}

Сетевую конфигурацию сервиса Cloud Desktop можно настроить {linkto(../../../../../computing/cloud-desktops/concepts/nets-config#desktops-nets-config-automatic)[text=автоматически]} или {linkto(../../../../../computing/cloud-desktops/concepts/nets-config#desktops-nets-config-manual)[text=вручную]}.

## {heading(Подготовительные шаги)[id=desktops-net-preparatory-steps]}

При автоматической настройке сетевой конфигурации подготовительных действий не требуется.

Чтобы использовать ручной режим, подготовьте сеть для размещения инфраструктуры сервиса:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите на имя нужной сети. Если сети еще нет, {linkto(../../../../../networks/vnet/instructions/net#vnet-net-add)[text=создайте]} ее.
1. Нажмите на имя нужной подсети. Если нужной подсети еще нет, {linkto(../../../../../networks/vnet/instructions/net#vnet-net-subnet-add)[text=создайте]} ее с учетом {linkto(../../../../../computing/cloud-desktops/concepts/nets-config#desktops-nets-config-ports)[text=требований к количеству портов]}.
1. На вкладке **Порты** скопируйте IP-адреса {ifdef(private,private-pg,private-pdf,private-pg-pdf)}DHCP-портов.{/ifdef}{ifdef(public)}портов в зависимости от {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} сети:

   - для `Neutron` — IP-адреса DHCP-портов;
   - для `Sprut` — IP-адрес DNS-порта.
   {/ifdef}
   
1. Убедитесь, что в подсети имеется не менее 16 свободных портов. Если их меньше, используйте другую подсеть.
1. Вернитесь на страницу со списком подсетей выбранной сети.
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужной подсети и выберите пункт **Редактировать подсеть**.
1. Отключите опцию **Приватный DNS**.
1. В поле **DNS-серверы** на первых позициях в списке укажите IP-адреса ваших DNS-серверов, каждый адрес с новой строки.
1. Под IP-адресами ваших DNS-серверов укажите ранее скопированные IP-адреса {ifdef(private,private-pg,private-pdf,private-pg-pdf)}DHCP-портов.{/ifdef}{ifdef(public)}портов:

   - для `Neutron` — IP-адреса DHCP-портов;
   - для `Sprut` — IP-адрес DNS-порта.
   {/ifdef}
   
1. Сохраните изменения.

## {heading(1. Настройте сеть)[id=desktops-net-step_setup]}

1. Перейдите в раздел **Cloud Desktop** → **Настройки сервиса**.
1. На вкладке **Настройка сети** задайте параметры:

   - **Режим доступа к рабочим столам**: выберите вариант из списка.

     - `Внешний доступ` — подключение к рабочим столам через интернет, используя внешний IP-адрес сервиса Cloud Desktop.
     - `Внутренний доступ` — подключение к рабочим столам через вашу локальную сеть, используя внутренний IP-адрес сервиса Cloud Desktop.

     Выбранный режим доступа будет распространяться на все пулы рабочих столов в вашем проекте. Если необходимо, режим доступа можно изменить в любой момент.

     Выбрать режим `Внутренний доступ` не получится, если используется SSL-сертификат, подписанный публичным центром сертификации. Чтобы перейти на внутренний доступ, {linkto(../../../../../computing/cloud-desktops/instructions/config/ssl-certificates#desktops-vkcloud-certificate)[text=используйте базовый SSL-сертификат]} от {var(cloud)} или {linkto(../../../../../computing/cloud-desktops/instructions/config/ssl-certificates#desktops-own-certificate)[text=подключите собственный]}.

   - **Сеть для VDI**: выберите режим настройки сети.

     {tabs}

     {tab(Автоматическая настройка)}

     - **Роутер**: выберите маршрутизатор из списка.
     - **Пространство IP-адресов**: укажите диапазон IP-адресов для тех подсетей, в которых будут развернуты ресурсы сервиса. Требования к параметру: формат — CIDR, минимальный префикс сети — `/7`, максимальный — `/22`.
     - **Адрес DNS сервера вашего домена**: укажите IP-адрес сервера DNS. Чтобы добавить несколько адресов, нажмите **Добавить DNS** и укажите дополнительный IP-адрес.

     {/tab}

     {tab(Ручная настройка)}

     - **Сеть**: выберите ранее {linkto(#desktops-net-preparatory-steps)[text=подготовленную сеть]}.

     {/tab}

     {/tabs}

     {note:warn}
     Вы можете менять режим настройки сети до момента, когда запустите создание какого-либо пула рабочих столов. После этого будет развернут инстанс Cloud Desktop и изменение режима станет недоступно.
     {/note}

   - **Зона доступности**: выберите {ifdef(public)}{linkto(../../../../../start/concepts/architecture#architecture-az)[text=зону доступности]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}зону доступности{/ifdef} для сервиса Cloud Desktop из списка.

     {note:info}
     При создании пула для него можно указать другую зону доступности.
     {/note}

1. Нажмите кнопку **Сохранить**.

## {heading(2. Проверьте настройки сети)[id=desktops-net-step-check]}

Чтобы проверить настройки сети, необязательно сохранять изменения в настройках.

{note:warn}
Для проверки будет развернута виртуальная машина, ее название начинается с `vdi-checker`. Использование этой ВМ {ifdef(public)}{linkto(../../../../../computing/iaas/tariffication#iaas-tariffication)[text=тарифицируется]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}тарифицируется{/ifdef}.
{/note}

Чтобы проверить корректность настроек сети для сервиса:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Desktop** → **Настройки сервиса**.
1. На вкладке **Настройка сети** активируйте опцию **Проверка настроек сети**.
1. Нажмите **Проверить подключение**.
1. Дождитесь завершения выполнения операции.

Чтобы увидеть детализированный результат проверки, нажмите **Подробнее**.
