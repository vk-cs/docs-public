Платформа VK Cloud позволяет создавать виртуальные машины с предустановленными лицензионными копиями операционных систем Microsoft Windows Server, а также использовать дополнительные программные продукты Microsoft — полный перечень доступен в [прайс-листе](https://cloud.vk.com/pricelist).

{note:warn}

VK Cloud предоставляет ПО Microsoft по лицензионному соглашению Service Provider License Agreement (SPLA). В рамках этого соглашения ПО Microsoft можно эксплуатировать только на виртуальных машинах в облаке VK Cloud.

{/note}

## Условия использования

При возникновении вопросов по лицензированию и прав на использование ПО Microsoft обратитесь к своему юридическому отделу или торговым представителям Microsoft.

Используя данный продукт, вы соглашаетесь с условиями использования следующих продуктов: [Microsoft](https://www.microsoft.com/licensing/docs/view/Services-Provider-Use-Rights-SPUR?lang=1).

## Цена

Цену за месяц использования ПО можно узнать:

- в [прайс-листе](https://cloud.vk.com/pricelist);
- при создании виртуальной машины (ВМ);
- в [настройках проекта](https://msk.cloud.vk.com/app/project/) на вкладке **Цены**.
- в разделе **Баланс** [личного кабинета](https://msk.cloud.vk.com/app/services/billing).

## {heading(Требования к ВМ для автоматической активации лицензий)[id=requirements]}

Для автоматической активации лицензий на продукты Microsoft Windows Server и Microsoft Office, приобретенные у VK Cloud:

- ВМ должна быть доступна через интернет. Если доступ осуществляется не по IP-адресу, предоставленному VK Cloud, необходимо сообщить IP-адрес виртуальной машины в [техническую поддержку](/ru/contacts).
- На ВМ должен быть открыт порт TCP 1688.

Поскольку ВМ с ОС Windows регулярно продлевает свою активацию, необходимо обеспечить связь ВМ с сервером активации в течение всего срока существования ВМ.

## Windows Server

При создании ВМ с ОС Microsoft Windows автоматически разворачивается лицензионная копия ОС выбранной редакции. Лицензия будет активирована автоматически при включении ВМ, если соблюдены [требования к ВМ](#requirements).

Доступные редакции Microsoft Windows Server отображаются в раскрывающемся списке **Операционная система** при создании ВМ через [личный кабинет](https://msk.cloud.vk.com/app/services/infra/servers/add) VK Cloud.

Каждые 2 vCPU виртуальной машины с ОС Windows требуют использования одной лицензии. Например, при создании ВМ с 5 vCPU понадобится 3 лицензии Windows Server. При изменении типа виртуальной машины количество лицензий будет изменено в соответствии с количеством виртуальных ядер измененной конфигурации.

{note:info}

Оплата лицензий не требует дополнительных действий и будет списываться автоматически в соответствии с конфигурацией созданной виртуальной машины.

{/note}

## Remote Desktop Services

По умолчанию после установки ОС Windows Server доступно только два одновременных подключения к виртуальной машине (консоль и RDP).

Эти два подключения могут использоваться только для настройки и администрирования сервера. Чтобы разрешить большее количество подключений (административных или подключений к нескольким пользователям):

1. Убедитесь, что соответствующие клиентские лицензии служб удаленных рабочих столов есть в наличии.
1. Установите роль узла сеансов удаленных рабочих столов на целевой ВМ.

Существует два типа лицензий клиентского доступа (CAL):

- На пользователя — предоставляет доступ одному пользователю на неограниченном количестве устройств. Этот тип лицензии доступен, только если RDS-сервер входит в домен Active Directory.
- На устройство — предоставляет доступ одному устройству, которое обращается к вашему серверу. Количество пользователей, работающих с устройством, не ограничено. Лицензии, выданные на устройство, позволяют снизить затраты и упростить администрирование в компаниях, где несколько сотрудников могут использовать одно устройство, например при работе в несколько смен.

Если RDS-сервер входит в домен Active Directory, доступны оба типа лицензии.

Лицензия потребуется для каждого пользователя ОС, который подключается с использованием протокола удаленных рабочих столов (RDP). Активация сервиса удаленных рабочих столов полностью замещает доступное по умолчанию подключение по RDP. Для активации лицензий клиентского доступа [воспользуйтесь инструкцией](/ru/computing/iaas/instructions/vm/vm-lic-manage).

{note:warn}
Лицензии на Remote Desktop Services могут быть предоставлены только на лицензионную копию операционной системы MS Windows, приобретенную в VK Cloud.
{/note}


## SQL Server

Система управления базами данных SQL Server доступна для установки в виде готового образа с предустановленной копией SQL Server. Сообщите в [техническую поддержку](/ru/contacts) идентификатор ВМ, на которой он используется.

Применяется способ лицензирования «на ядро»: цена повышается за каждые следующие два ядра, добавленные к ВМ. Минимальное количество ядер, на которое приобретается лицензия — четыре.

## {heading(Перенос в облако VK Cloud приобретенных ранее лицензий)[id=migrate_own_licenses]}

VK Cloud позволяет развертывать ряд серверных приложений Microsoft, используя ранее приобретенные лицензии. Это упрощает перенос рабочих нагрузок в облако VK Cloud, избавляя от новых расходов на покупку лицензий Microsoft. Такое преимущество доступно клиентам корпоративного лицензирования Microsoft с лицензиями соответствующих приложений по действующим договорам Microsoft Software Assurance (SA).

### Проверка приобретенной ранее лицензии

Для переноса лицензий по соглашению Software Assurance необходимо пройти процесс проверки лицензий, и компания Microsoft должна подтвердить, что вы обладаете правомочными лицензиями в соответствии с действующим договором Software Assurance (SA). Заполните форму проверки на [веб-сайте корпоративного лицензирования](https://www.microsoft.com/licensing/docs) и предоставьте ее своему представителю или партнеру Microsoft, который поможет отправить ее в Microsoft:

- адрес электронной почты: `support@mcs.mail.ru`;
- наименование партнера: `VK Cloud`;
- веб-сайт партнера: `cloud.vk.com`.

Получив форму, корпорация Microsoft проверит вашу лицензию и сообщит о результатах проверки вам и вашему партнеру Microsoft. Дальнейшие инструкции в руководстве [Перемещение лицензий в рамках Software Assurance](https://www.microsoft.com/ru-ru/licensing/licensing-programs/software-assurance-license-mobility) и в документе [License Mobility Verification Guide](http://download.microsoft.com/download/7/9/b/79bd917e-760b-48b6-a266-796b3e47c47a/License_Mobility_Customer_Verification_Guide.pdf "download") компании Microsoft (PDF).

По требованиям соглашения вы отвечаете за выполнение проверок и пролонгаций. Однако вы можете начать развертывать ПО сервера приложений, не дожидаясь завершения проверки. Развернуть ПО можно за десять дней до отправки формы.

После прохождения процесса проверки сообщите нам об этом в [службу поддержки](/ru/contacts) с указанием наименования проекта и типа используемой лицензии.

### Условия переноса лицензий

Чтобы воспользоваться переносом лицензий, обеспечьте соблюдение условий:

1. Все прикладные программные продукты Microsoft Server, перенесенные на VK Cloud с использованием переносимости лицензий по программе Software Assurance, должны подпадать под действующий договор Software Assurance (SA).

2. Серверные приложения должны входить в перечень правомочных продуктов:

    - Exchange Server;
    - SharePoint Server;
    - SQL Server Standard Edition;
    - SQL Server Enterprise Edition;
    - SQL Server Business Intelligence Edition;
    - Skype for Business Server;
    - System Center Server;
    - Dynamics CRM Server;
    - Dynamics AX Server;
    - Project Server;
    - Visual Studio Team Foundation Server;
    - BizTalk Server;
    - Forefront Identity Manager;
    - Forefront Unified Access Gateway;
    - Remote Desktop Services.

    Полный список правомочных программных продуктов размещен в [условиях использования продуктов Microsoft](https://www.microsoft.com/licensing/docs/view/Services-Provider-Use-Rights-SPUR?lang=1).

3. Правомочные программы корпоративного лицензирования включают Enterprise Agreement, Enterprise Subscription Agreement и Microsoft Open Value Agreement, в которые включено соглашение Software Assurance, а также другие программы корпоративного лицензирования Microsoft, в которых соглашение Software Assurance является дополнительной возможностью, например, Microsoft Open License или Select Plus.

4. Для доступа к серверам приложений вы должны иметь в договоре корпоративного лицензирования соответствующие лицензии клиентского доступа (CAL) вместе с соглашением Software Assurance.

5. Переносимость лицензий не распространяется на клиентские операционные системы Microsoft Windows, прикладные продукты для рабочего стола (например, Microsoft Office) и операционные системы Microsoft Windows Server.

6. В соответствии с правилами «серверной фермы» Microsoft лицензии, развернутые в конкретном регионе VK Cloud, не могут быть перенесены в другой регион VK Cloud в течение 90 дней. Подробнее в [условиях использования продуктов Microsoft](https://www.microsoft.com/licensing/docs/view/Services-Provider-Use-Rights-SPUR?lang=1).
