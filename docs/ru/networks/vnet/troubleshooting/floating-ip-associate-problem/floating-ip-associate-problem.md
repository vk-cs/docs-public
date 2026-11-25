# {heading(Не удается привязать Floating IP-адрес к порту)[id=vnet-floating-ip-associate-problem]}

Floating IP-адрес добавлен в проект, но его не удается привязать к порту инстанса.

Floating IP-адреса принадлежат {linkto(../../concepts/net-types#vnet-net-types-external-net)[text=внешним сетям]}, например `ext-net` или `internet`. Чтобы привязать Floating IP-адрес к порту, порт должен находиться в подсети, которая подключена к {linkto(../../concepts/router#vnet-router)[text=маршрутизатору]}, а маршрутизатор — к той же внешней сети, к которой относится Floating IP-адрес.

Если маршрутизатор, к которому подключены подсети, не имеет доступа к внешней сети, привязать Floating IP-адрес к объектам в его подсетях не удастся.

## {heading(Решение)[id=vnet-floating-ip-associate-problem-resolve]}

1. {linkto(../../instructions/ports#vnet-ports-view)[text=Убедитесь]}, что порт находится в подсети, подключенной к маршрутизатору.
1. {linkto(../../instructions/router#vnet-router-view)[text=Убедитесь]}, что этот маршрутизатор подключен к внешней сети, к которой относится нужный Floating IP-адрес. Если у маршрутизатора нет доступа к внешней сети, {linkto(../../instructions/router#vnet-router-edit)[text=отредактируйте]} маршрутизатор.
