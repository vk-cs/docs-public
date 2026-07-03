{includetag(create,create-from-disk)}
1. Задайте параметры ВМ в блоке **Конфигурация**:
   {/includetag}
   {ifdef(public)}
   {includetag(create)}
   - **Операционная система**: выберите {linkto(../../../../../computing/iaas/concepts/oper-system#iaas-oper-system)[text=версию операционной системы]} или образ, который вы ранее {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=создали]} или {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импортировали]} в {var(cloud)}.
   {/includetag}
   {includetag(create,create-from-disk)}
   - **Категория виртуальной машины**: выберите {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor-vm-categories)[text=категорию]} предустановленных конфигураций ВМ.
   - **Тип виртуальной машины**: выберите предустановленную конфигурацию ВМ.
     {/includetag}
     {includetag(create)}
     Для создания ВМ с графическим ускорителем нужен {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=шаблон конфигурации Cloud GPU]}. Если в списке нет необходимого шаблона, {linkto(../../../../../computing/gpu/connect#gpu-connect)[text=запросите]} его.
     {/includetag}
   {/ifdef}

   {includetag(create)}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   - **Имя виртуальной машины**: используйте только латинские буквы, цифры или спецсимволы `-`, `_` и `.`.
   - **Тип виртуальной машины**: выберите предустановленный {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=шаблон конфигурации ВМ]}.

     {ifndef(private-cert)}
     Если для работы требуются {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=шаблоны конфигурации ВМ с GPU или vGPU]}, обратитесь к администратору {var(cloud)} с просьбой добавить их в проект.
     {/ifndef}
     {/ifdef}

   - **Зона доступности**: выберите {ifndef(private-cert)}{linkto(../../../../../computing/iaas/concepts/avail-zone#iaas-avail-zone)[text=зону доступности]}{/ifndef}{ifdef(private-cert)}зону доступности{/ifdef}, где будет запущена ВМ.
   - **Количество машин в конфигурации**: укажите нужное число ВМ.
   {/includetag}
   {includetag(create-from-disk)}
   - **Зона доступности**: значение соответствует зоне доступности диска, из которого создается ВМ.
   {/includetag}
   {includetag(create,create-from-disk)}
   {ifdef(public)}
1. Заполните блок **Общая информация**:

   - **Имя виртуальной машины**: используйте только латинские буквы, цифры или спецсимволы `-`, `_` и `.`.
     {/ifdef}
   - **Теги**: при необходимости {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-tags)[text=укажите тег]} для ВМ или создайте новый.
   - **Настроить скрипты при запуске ВМ**: включите опцию, чтобы добавить bash-скрипт или [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) сценарий, который будет выполнен при первом запуске ВМ. {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Введите код скрипта вручную или загрузите файл скрипта с расширением `.txt` или `.sh`.{/ifdef}
   {/includetag}
   {includetag(create)}
   {ifdef(public)}
1. Укажите параметры диска в блоке **Размер и скорость диска**.
   {/ifdef}
    - **Размер диска**: укажите нужный размер диска ВМ в гигабайтах.
      {ifdef(public)}
      Максимальный размер диска {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-vm-no-quotas-limits)[text=ограничен]}. Для создания ВМ с диском большего объема используйте {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]}.
      {/ifdef}
    - **Тип диска**: выберите {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=тип диска]}.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Нажмите кнопку **Следующий шаг**.
   {/ifdef}
   {/includetag}
   {includetag(create,create-from-disk)}
1. Задайте настройки сети в блоке {ifdef(public)}**Сеть и настройки firewall**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Настройка сети**{/ifdef}.

    - **Сеть**: выберите существующую сеть или создайте новую. При создании новой сети {ifdef(public)}появятся дополнительные поля:

        - **SDN**: выберите {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=систему управления виртуальными сетями]}. Для новых аккаунтов опция недоступна и по умолчанию используется {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]}.

          {note:info}
          Сети, созданные в разных SDN, недоступны друг другу, но вы можете их связать с помощью {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адресов]}.
          {/note}
          {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}задайте параметр:{/ifdef}

        - **Адрес подсети**: укажите CIDR в формате `XXX.XXX.XXX.XXX/XX`, например, `10.0.0.0/24`.

    - **Использовать конфигурационный диск**: включите опцию, если нужно настроить сеть на виртуальной машине при отсутствии в сети DHCP-сервера. Опция включается автоматически, если выбрана {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешняя сеть]} или сеть с выключенным {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP]}.
    - **DNS-имя**: укажите доменное имя для {ifdef(public)}{linkto(../../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=приватного DNS]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../networks/vnet/instructions/private-dns#vnet-private-dns)[text=приватного DNS]}{/ifdef}. По нему во внутренней сети можно будет обращаться к инстансам.
    - **Ключ виртуальной машины**: выберите ключ для подключения по SSH или создайте новый.

      При выборе `Создать новый ключ` после создания ВМ автоматически скачается файл приватного ключа `*.pem`. Сохраните его, позже он потребуется для подключения к серверу по SSH.

      Открытая часть ключа будет автоматически добавлена на сервер.

    - **Настройки Firewall**: выберите нужные группы безопасности.

      Чтобы подключиться по SSH, добавьте группу `ssh` или `ssh+www`. Подробнее про настройку правил сетевого доступа в разделе {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Группы безопасности]}.

    - (Опционально) **Назначить внешний IP**: включите опцию, чтобы назначить для ВМ новый или имеющийся {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]}. Опция доступна, если для {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-standard-net)[text=сети]} включен доступ в интернет.

      {note:info}
      Опция всегда включена, если ранее для ВМ была выбрана {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешняя сеть]}.
      {/note}

   {ifdef(public)}
    - (Опционально) **Привязать домен к внешнему IP**: включите опцию и укажите домен для привязки FQDN к внешнему IP-адресу. В DNS-зону будет добавлена {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records)[text=A-запись]} для выбранного IP-адреса. Опция доступна, если включена опция **Назначить внешний IP**.

      {note:warn}
      Нельзя привязать внешний IP-адрес к домену, совпадающему с CNAME-записью DNS-зоны. ВМ в этом случае будет создана, но A-запись не будет добавлена.
      {/note}
      {/ifdef}

    {ifndef(private-cert)}
    - **Включить мониторинг**: включите, чтобы установить агент для отправки метрик в {linkto(../../../../../monitoring-services/monitoring/concepts#monitoring-concepts)[text=сервис мониторинга]}.
    {/ifndef}

1. Укажите нужные параметры в блоке {ifdef(public)}**Резервное копирование**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Настройка резервного копирования**{/ifdef}.

   По умолчанию резервное копирование включено и для него указаны рекомендуемые настройки, но вы можете их изменить:

    - **Название плана**: укажите произвольное название для плана резервного копирования.
    - **Включить стратегию хранения полных бэкапов (GFS)**: включите, чтобы резервные копии автоматически удалялись по истечении срока хранения.

        - **Хранить недельные полные бэкапы**: укажите сколько недель нужно хранить резервную копию.
        - **Хранить месячные полные бэкапы**: укажите сколько месяцев нужно хранить резервную копию.
        - **Хранить годовые полные бэкапы**: укажите сколько лет нужно хранить резервную копию.

      {note:info}
      Если опция **Включить стратегию хранения полных бэкапов (GFS)** отключена, будут храниться только самые последние резервные копии, их количество указывается в поле **Макс. количество полных бэкапов**. При достижении указанного лимита, старые резервные копии будут удаляться автоматически.
      {/note}

    - **Включить инкрементальные бекапы**: включите опцию, чтобы полная резервная копия создавалась раз в неделю. Во все остальные дни недели будут создаваться инкрементальные резервные копии.
    - **Расписание резервного копирования**: выберите дни недели и время запуска резервного копирования. Время указывается во временной зоне GMT+03:00.

   {ifdef(public)}
    - **Включить неудаляемые бэкапы**: включите опцию, чтобы защитить резервные копии от удаления с помощью {linkto(../../../../../storage/s3/concepts/objects-lock#s3-concepts-object-lock)[text=блокировки объектов]}. Доступно два типа блокировки:

        - `Временная защита`: защищает копии от удаления и перезаписи на заданное количество дней. Имеет два режима:

            - `Compliance`: строгая блокировка. Не может быть снята или изменена в течение указанного периода хранения.
            - `Governance`: гибкая блокировка с возможностью снятия администратором проекта.

        - `Бессрочная защита`: защищает копию от удаления, пока блокировка не будет снята.
          {/ifdef}

1. Нажмите кнопку {ifdef(public)}**Создать**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Создать инстанс**{/ifdef}.
1. Дождитесь создания ВМ. Этот процесс может занять некоторое время. Когда создание будет завершено, откроется страница с характеристиками ВМ и инструкцией по подключению.
{/includetag}