# {heading(Проблема с лицензиями RDS)[id=iaas-vm-lic-problem]}

При подключении к ВМ по {linkto(../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=RDS]} появляется информационное окно о проблеме с лицензированием и о прекращении сеанса через 60 минут.

Проблема может возникать, если в групповых политиках неверно выставлен {linkto(../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=тип лицензии]} клиентского доступа.

### {heading(Решение)[id=iaas-vm-lic-problem-decision]}

Измените тип лицензии клиентского доступа в групповых политиках:

{include(../../../../_includes/_vm-lic-manage.md)}

1. Перезагрузите RDS-сервер.
1. Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).