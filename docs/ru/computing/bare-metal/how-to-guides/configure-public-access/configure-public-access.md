# {heading(Настройка публичного доступа через продвинутый маршрутизатор)[id=bare-metal-configure-public-access]}

Настроить доступ к серверу Bare Metal через IP-адрес {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]} можно с помощью {linkto(../../../../networks/vnet/concepts/router#vnet-router-advanced)[text=продвинутых маршрутизаторов]}.

## {heading(Подготовительные шаги)[id=bare-metal-router-preparatory-steps]}

1. Если у вас нет сервера Bare Metal, {linkto(../../../../computing/bare-metal/instructions/manage-service#bare-metal-manage-service-order)[text=закажите]} его.
1. {linkto(../../../../networks/vnet/instructions/advanced-router/manage-advanced-routers#vnet-manage-advanced-routers-add)[text=Создайте]} продвинутый маршрутизатор.

## {heading({counter(TOC)}. Получите информацию о сети сервера)[id=bare-metal-router-get-info]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Bare Metal**.
1. В списке серверов Bare Metal нажмите на имя нужного сервера.
1. Перейдите на вкладку **Сеть**.

   Сохраните параметры сети вашего сервера Bare Metal, они потребуются позже. Для примера будут использованы следующие значения:

   - Имя сети: `my-net`;
   - Шлюз: `10.0.0.1`;
   - CIDR: `10.0.0.0/24`;
   - IP-адрес: `10.0.0.2`.

## {heading({counter(TOC)}. Настройте продвинутый маршрутизатор)[id=bare-metal-router-settings]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.
1. Нажмите на название нужного маршрутизатора.
1. Перейдите на вкладку **Интерфейсы**.
1. Добавьте интерфейс для внутренней сети:

   1. Нажмите **Добавить интерфейс**.
   1. Введите имя интерфейса. Далее в качестве примера используется имя `my-private-interface`.
   1. Выберите подсеть `10.0.0.0/24` из внутренней сети `my-net`, к которой подключен сервер Bare Metal.
   1. Нажмите **Добавить**.
   1. Запишите внутренний IP-адрес добавленного интерфейса.

      В качестве примера будет использоваться внутренний IP-адрес `10.0.0.3`.

1. Добавьте интерфейс для внешней сети:

   1. Нажмите **Добавить интерфейс**.
   1. Введите имя интерфейса.
   1. Выберите любую подсеть из {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]} `internet`.
   1. Нажмите **Добавить**.
   1. Запишите внешний IP-адрес добавленного интерфейса.

      В качестве примера будет использоваться внешний IP-адрес `95.163.182.106`.

1. Перейдите на вкладку **DNAT**.
1. Настройте правила DNAT:

   1. Нажмите **Добавить правило DNAT**.
   1. Введите имя правила `my-dnat-rule`.
   1. Выберите интерфейс `my-private-interface`, подключенный к внутренней сети.
   1. В поле **Протокол** выберите `Все протоколы и порты`.
   1. В качестве **IP после трансляции** укажите внутренний IP-адрес сервера Bare Metal `10.0.0.2`.
   1. Нажмите **Добавить**.

## {heading({counter(TOC)}. Настройте доступ по паролю)[id=bare-metal-router-assets]}

Настройте доступ по паролю, если это еще не сделано:

1. {linkto(../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=Подключитесь]} к серверу Bare Metal по SSH с помощью внутреннего IP-адреса.

   Для выполнения этого шага понадобится создать промежуточный хост в виде {linkto(../../../../computing/iaas/concepts/vm#iaas-concepts-vm)[text=виртуальной машины]} с {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адресом]}.

1. Если вы пользуетесь учетной записью `root`, создайте отдельного пользователя с группой `sudo`:

   {tabs}
    
   {tab(Ubuntu/Debian)}

   ```shell
   sudo useradd -m <ИМЯ_ПОЛЬЗОВАТЕЛЯ> \
   sudo usermod -aG sudo <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
   ```

   {/tab}

   {tab(CentOS/RHEL/AlmaLinux)}

   ```shell
   sudo useradd -m <ИМЯ_ПОЛЬЗОВАТЕЛЯ> \
   sudo usermod -aG wheel <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
   ```

   {/tab}

   {/tabs}

1. Установите пароль:

   ```shell
   sudo passwd <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
   ```

   Здесь `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя вашей учетной записи. Если ОС устанавливалась из образов {var(cloud)}, можно использовать имя {linkto(../../../../computing/iaas/concepts/oper-system#iaas-oper-system-default-account)[text=учетной записи по умолчанию]}.

   {note:info}

   Заданный пароль может быть использован только для доступа через VNC-консоль. Подключение по SSH по-прежнему выполняется только через ключевую пару.

   {/note}

1. Завершите SSH-сессию:

   ```shell
   quit
   ```

## {heading({counter(TOC)}. Настройте сеть в ОС)[id=bare-metal-router-settings-os]}

1. {linkto(../../../../computing/bare-metal/connect/console#bare-metal-console)[text=Подключитесь]} к серверу через VNC-консоль.
1. Введите имя пользователя и нажмите ENTER.
1. Введите пароль.

   При вводе пароля вводимые символы не отображаются в консоли.

1. Настройте сеть в ОС для работы с продвинутым маршрутизатором.

   1. Проверьте конфигурацию маршрутов и узнайте имя интерфейса в ОС:

      ```shell
      sudo ip route | grep default
      ```

      Пример вывода:

      ```shell
      default via 10.0.0.1 dev eth0 proto kernel
      ```

      Здесь `eth0` — название интерфейса, которое необходимо для создания нового маршрута.

   1. Удалите текущий `default` маршрут:

      ```shell
      sudo ip route delete default
      ```

   1. Добавьте новый `default` маршрут через продвинутый маршрутизатор:

      ```shell
      sudo ip route add default via <IP-АДРЕС_ВНУТРЕННЕГО_ИНТЕРФЕЙСА> dev <ИНТЕРФЕЙС>
      ```

      Здесь:

      - `<IP-АДРЕС_ВНУТРЕННЕГО_ИНТЕРФЕЙСА>` — адрес, присвоенный внутреннему интерфейсу при настройке продвинутого маршрутизатора.
      - `<ИНТЕРФЕЙС>` — название интерфейса в системе.

      Пример:

      ```shell
      sudo ip route add default via 10.0.0.3 dev eth0
      ```

   {note:info}

   Измененный маршрут сохраняется до перезагрузки сервера. После перезагрузки настройку сети нужно будет выполнить повторно.

   Чтобы маршрут не сбрасывался, {linkto(../../../../computing/iaas/how-to-guides/interface-settings-check#iaas-interface-settings-check)[text=настройте]} конфигурацию сетевого интерфейса в ОС, используя параметры сети, полученные на первом шаге. Для шлюза укажите IP-адрес, присвоенный внутреннему интерфейсу.

   {/note}

1. {linkto(../../../../computing/bare-metal/connect/connect-nix#bare-metal-connect-nix)[text=Подключитесь]} к серверу по SSH по внешнему адресу.

## {heading(Удалите неиспользуемые ресурсы)[id=bare-metal-router-clean-up]}

Созданные ресурсы тарифицируются и потребляют вычислительные ресурсы. Если они вам больше не нужны:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=Остановите]} промежуточный хост, чтобы воспользоваться им позже, или {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=удалите]} его навсегда.
- {linkto(../../../../computing/bare-metal/instructions/manage-service#bare-metal-manage-service-delete)[text=Откажитесь]} от аренды сервера Bare Metal.
- {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Удалите Floating IP-адрес]}, назначенный промежуточному хосту. Присутствующие в проекте Floating IP-адреса тарифицируются, даже если не привязаны к какому-либо сервису.
