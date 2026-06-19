# {heading(Проблемы в работе приложений)[id=iaas-app-problems]}

Появились проблемы в работе приложения, которое размещено на ВМ. Пример: перестали загружаться файлы.

Проблемы могут быть вызваны различными причинами.

### {heading(Решение)[id=iaas-app-problems-decision]}

1. Проверьте статус ВМ в {ifdef(public)}[личном кабинете {var(cloud)}](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=личном кабинете {var(cloud)}]}{/ifdef} в разделе **Облачные вычисления** → **Виртуальные машины**. Убедитесь, что статус ВМ — `Активный`.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Проверьте]} группы безопасности. Убедитесь, что есть правило, которое разрешает входящий трафик на нужный порт.
1. Проанализируйте логи приложения.
1. Проверьте, достаточно ли у ВМ ресурсов: свободное место на диске, CPU и RAM.
1. Проверьте права доступа к каталогам.