## {heading(Использование IP Source Guard)[id=source_guard]}

Для портов OpenStack можно указать список IP-адресов, которые будут использоваться [IP Source Guard](/ru/networks/vnet/instructions/source-guard).
Через порт будет проходить только тот трафик, IP-адрес источника которого содержится в этом списке. Это помогает защититься от атак с подменой IP-адреса.

Например, можно разрешить:

- Только трафик с виртуальной машины, которая использует порт OpenStack.
- Весь трафик, который проходит через виртуальную машину (`0.0.0.0\0`). Это может быть полезно, когда виртуальная машина участвует в обработке трафика и является промежуточным узлом сети (например, маршрутизатором, файерволом или VPN-шлюзом).

## {heading(Использование файервола и групп безопасности)[id=secgroups]}

Файервол ограничивает трафик в виртуальных сетях в соответствии с заданными группами безопасности. Эти группы содержат правила обработки входящего и исходящего трафика и работают по принципу «все, что не разрешено, запрещено».

При создании сущностей в личном кабинете для каждого порта назначается группа безопасности. Это обеспечивает безопасность трафика внутри платформы.

Автоматически назначается группа безопасности для следующих портов:

- Порты виртуальных машин — группа безопасности по умолчанию.
- Служебные порты (например, для маршрутизатора или балансировщика нагрузки) — группа безопасности по умолчанию.
- Инстансы PaaS-сервисов — специальные группы безопасности, которые создаются автоматически. 

Для портов виртуальных машин, включая инстансы PaaS-сервисов, можно назначить несколько групп безопасности. Вы можете использовать другие преднастроенные группы или создать свои группы.

OpenStack CLI и Terraform предоставляют более широкие возможности управления портами: вы можете назначить свои группы безопасности на любые порты или создать и использовать порт вообще без группы безопасности.

## {heading(Группа безопасности default)[id=default_sg]}

По умолчанию в проекте доступна только группа безопасности **default**. Эта группа разрешает следующий трафик:

- Весь входящий трафик с других портов, у которых настроена такая же группа безопасности. Это правило обеспечивает обмен данными между сущностями внутри VK Cloud.
- Весь исходящий трафик.

Например, к ВМ с этой группой безопасности вы можете подключиться из VK Cloud, в том числе через VNC-консоль или с другой ВМ внутри облака, у которой также подключена группа **default**. Но вы не сможете подключиться к ней по SSH, даже если она подключена к внешней сети и имеет публичный IP-адрес.

Группа **default** доступна в личном кабинете, через OpenStack CLI и Terraform.

## {heading(Преднастроенные группы безопасности)[id=preset_sg]}

В личном кабинете вы можете использовать преднастроенные группы безопасности со следующими правилами:

[cols="1,2,3", options="header"]
|===
|Имя группы
|Описание
|Правила файервола

|**ssh**
|Разрешает SSH-трафик
|Разрешен входящий трафик с любых IP-адресов на TCP-порт `22`

|**ssh+www**
|Разрешает SSH- и HTTP(S)-трафик
|Разрешен входящий трафик с любых IP-адресов на TCP-порты:

- `22`
- `80`
- `443`

|**rdp**
|Разрешает RDP-трафик
|Разрешен входящий трафик с любых IP-адресов на TCP-порт `3389`

|**rdp+www**
|Разрешает RDP- и HTTP(S)-трафик
|Разрешен входящий трафик с любых IP-адресов на TCP-порты:

- `3389`
- `80`
- `443`

|**all**
|Разрешает весь трафик
|Разрешен любой входящий трафик с любых IP-адресов
|===

Чтобы использовать преднастроенную группу безопасности, [создайте ВМ](/ru/computing/iaas/instructions/vm/vm-create) с этой группой. После этого группа появится в проекте и будет доступна даже после удаления ВМ.

Преднастроенные группы безопасности, которые можно назначить ВМ, зависят от образа OC:

- Для ВМ с OC Linux доступны группы: **ssh**, **ssh+www**, **all** (**Все разрешено**).
- Для ВМ с OC Windows доступны группы: **rdp**, **rdp+www**, **all** (**Все разрешено**).

{note:info}

При работе через OpenStack CLI и Terraform преднастроенных групп нет. Вы можете создать группы с такими же правилами и использовать их.

{/note}

## {heading(Пользовательские группы безопасности)[id=custom_sg]}

Вы можете создавать любые другие ограничения трафика. Для этого [создайте](../../instructions/secgroups#sozdanie_gruppy_bezopasnosti) группы безопасности с определенными правилами файервола и [назначьте](../../instructions/secgroups#naznachenie_gruppy_pravil_na_instans) их на порты инстансов.

Для корректной работы пользовательских групп безопасности:

- Либо настройте для них не только входящие, но и исходящие правила.
- Либо используйте их в комбинации с группой безопасности по умолчанию, разрешающей любой исходящий трафик.

Управление пользовательскими группами безопасности доступно в личном кабинете, через OpenStack CLI или Terraform.

В личном кабинете нельзя создать группы с такими же названиями, как у [преднастроенных групп](#preset_sg). Вы можете добавить эти группы в проект только через создание ВМ. Через OpenStack CLI и Terraform таких ограничений нет: вы можете создать группы безопасности с такими названиями и использовать их в проекте.

