# {heading(Управление лицензиями Microsoft RDS)[id=iaas-vm-lic-manage]}

По умолчанию после установки ОС Windows Server доступно только два одновременных подключения к виртуальной машине (консоль или RDP). Чтобы разрешить большее количество подключений, используйте {linkto(../../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=Remote Desktop Services]}.

## {heading(Активация лицензий клиентского доступа)[id=iaas-vm-lic-manage-activation]}

Обратитесь в [техническую поддержку](/ru/contacts) и укажите:

- {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=идентификатор проекта (PID)]};
- идентификатор ВМ с Microsoft Windows Server;
- нужное количество лицензий;
- параметры подключения к удаленному рабочему столу.

## {heading(Изменение количества лицензий клиентского доступа)[id=iaas-vm-lic-manage-edit-licenses]}

Обратитесь в [техническую поддержку](/ru/contacts) и укажите:

- {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=идентификатор проекта (PID)]};
- идентификатор ВМ с Microsoft Windows Server;
- новое количество лицензий;
- параметры подключения к удаленному рабочему столу.

## {heading(Изменение типа лицензии клиентского доступа)[id=iaas-vm-lic-manage-edit-type]}

{note:warn}
{linkto(../../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=Лицензии на пользователя]} доступны, только если RDS-сервер входит в домен Active Directory.
{/note}

{include(../../../../../_includes/_vm-lic-manage.md)}

1. Обратитесь в [техническую поддержку](/ru/contacts) для изменения типа лицензий, указав данные:

   - {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=идентификатор проекта (PID)]};
   - идентификатор ВМ с Microsoft Windows Server;
   - параметры подключения к удаленному рабочему столу;
   - необходимый тип лицензий, соответствующий типу политики.

   Дождитесь, когда заявка будет обработана.

1. Перезагрузите RDS-сервер.