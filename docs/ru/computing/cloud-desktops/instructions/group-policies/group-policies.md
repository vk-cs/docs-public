{note:info}

Инструкция предназначена для системных администраторов, обслуживающих в вашей компании инфраструктуру службы Active Directory.

{/note}

Чтобы конечные пользователи могли подключаться к виртуальным рабочим столам под управлением ОС Windows, настройте групповые политики контроллера домена Active Directory.

## Подготовительные шаги

Запустите оснастку Group Policy Management на контроллере домена Active Directory.

## 1. Добавьте правило для Windows Defender Firewall

Для работы агента Cloud Desktop, установленного на виртуальных рабочих столах, активируйте Windows Defender Firewall и разрешите в нем входящие подключения для групп портов TCP 16002–16005 и UDP 14010–14012.

1. Перейдите в раздел **Computer Configuration → Policies → Windows Security → Security Settings → Windows Defender Firewall with Advanced Security – Local Group Police Object**.
1. Перейдите по ссылке **Windows Defender Firewall Properties**.
1. На вкладке **Domain Profile** в списке **Firewall state** выберите значение `On (recommended)` и нажмите кнопку **OK**.
1. Перейдите по ссылке **Inbound Rules**.
1. В контекстном меню раздела выберите пункт **New Rule…**.
1. Выберите опцию **Port** и нажмите кнопку **Next**.
1. Выберите опции **TCP** и **Specific local ports**.
1. Укажите диапазон значений `16002–16005` и нажмите кнопку **Next**.
1. Выберите опцию **Allow the connection** и нажмите кнопку **Next**.
1. Выберите опцию **Domain** и нажмите кнопку **Next**.
1. Укажите имя для правила (например, `Cloud Desktop API Inbound TCP`) и нажмите кнопку **Finish**.
1. Аналогичным образом добавьте второе правило. Для него выберите опцию **UDP** вместо **TCP**, укажите диапазон значений `14010–14012` для портов и имя правила `Cloud Desktop API Inbound UDP`.

## 2. Настройте механизм согласования безопасности для RDP-сеанса подключения к виртуальным рабочим столам

Чтобы подключаться к виртуальным рабочим столам через шлюз TLS, измените стандартные настройки уровня защиты терминального сеанса на стороне агента Cloud Desktop.

1. Перейдите в раздел **Computer Configuration → Policies → Administrative Templates → Windows Components → Remote Desktop Services → Remote Desktop Session Host → Security**.
1. В контекстном меню пункта **Require use of specific security layer for remote (RDP) connections** выберите пункт **Edit**.
1. Выберите опцию **Enabled**.
1. Для параметра **Security Layer** выберите значение `RDP`.
1. Нажмите кнопку **ОК**.

## 3. Разрешите конечным пользователям подключение к виртуальным рабочим столам

Разрешите пользователям, входящим в вашу доменную группу для сервиса Cloud Desktop, подключаться к виртуальным рабочим столам по протоколу RDP.

1. Перейдите в раздел **Computer Configuration → Policies → Windows Security → Security Settings → Restricted Groups**.
1. Добавьте группу `<имя вашего домена>\<имя группы пользователей AD>` в члены стандартной группы `BUILTIN\Remote Desktop Users`.
1. Перейдите в раздел **Configuration → Policies → Administrative Templates → Windows Components → Remote Desktop Services → Remote Desktop Session Host → Connections**.
1. В контекстном меню пункта **Allow users to connect remotely using Remote Desktop Services** выберите пункт **Edit**.
1. Выберите опцию **Enabled** и нажмите кнопку **ОК**.
