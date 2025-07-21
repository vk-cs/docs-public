По умолчанию после установки ОС Windows Server доступно только два одновременных подключения к виртуальной машине (консоль или RDP). Чтобы разрешить большее количество подключений, используйте [Remote Desktop Services](/ru/computing/vm-licenses/ms-lic#remote_desktop_services).

## Активация лицензий клиентского доступа

Обратитесь в [техническую поддержку](/ru/contacts) и укажите:

- [идентификатор проекта (PID)](/ru/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#poluchenie_identifikatora_proekta);
- идентификатор ВМ с Microsoft Windows Server;
- нужное количество лицензий;
- параметры подключения к удаленному рабочему столу.

## Изменение количества лицензий клиентского доступа

Обратитесь в [техническую поддержку](/ru/contacts) и укажите:

- [идентификатор проекта (PID)](/ru/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#poluchenie_identifikatora_proekta);
- идентификатор ВМ с Microsoft Windows Server;
- новое количество лицензий;
- параметры подключения к удаленному рабочему столу.

## Изменение типа лицензии клиентского доступа

{note:warn}
[Лицензии на пользователя](/ru/computing/vm-licenses/ms-lic#remote_desktop_services) доступны, только если RDS-сервер входит в домен Active Directory.
{/note}

{include(/ru/_includes/_vm-lic-manage.md)}

1. Обратитесь в [техническую поддержку](/ru/contacts) для изменения типа лицензий, указав данные:

    - [идентификатор проекта (PID)](/ru/tools-for-using-services/vk-cloud-account/instructions/project-settings/manage#poluchenie_identifikatora_proekta);
    - идентификатор ВМ с Microsoft Windows Server;
    - параметры подключения к удаленному рабочему столу;
    - необходимый тип лицензий, соответствующий типу политики.

    Дождитесь, когда заявка будет обработана.

1. Перезагрузите RDS-сервер.