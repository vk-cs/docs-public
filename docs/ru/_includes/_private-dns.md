Приватный DNS в {var(cloud)} — функциональность DNS-сервера, работающего в проектных сетях {var(cloud)}. Позволяет обращаться к инстансам по DNS-именам.

Сервис поддерживает настройку приватной зоны и имен портов виртуальных машин. DNS-сервер отвечает по тем же адресам, что и порты DHCP в сети. Для работы приватного DNS в сети должен быть включен DHCP-сервер.

{ifndef(public)}
{note:warn}
IP-адреса серверов пересылки запросов приватного DNS — `8.8.8.8` и `8.8.4.4`. Изменение этих адресов не поддерживается.
{/note}
{/ifndef}

{ifdef(public)}
{note:warn}
В {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]} для подсетей с включенным приватным DNS есть лимит на количество DNS-запросов — не более 200 запросов в секунду (QPS). Все запросы сверх этого лимита будут отклонены.
{/note}
{/ifdef}

## {heading(Редактирование имени зоны для сети)[id=dns-private-dns-zone]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Откройте карточку сети, нажав на ее имя в общем списке.
1. Перейдите на вкладку **Настройка сети**.
1. Введите имя зоны в поле **Зона**.
1. Нажмите кнопку **Сохранить изменения**.

{note:warn}
Максимальная длина имени зоны — 253 символа. Состоит из блоков вида `[a-z0-9-]+\\.`. Максимальная длина блока — 63 символа. Блок не может начинаться и заканчиваться на `-`.
{/note}

## {heading(Настройка DNS-имени)[id=dns-private-dns-name]}

{tabs}

{tab(Личный кабинет)}

Есть несколько способов настройки DNS-имени:

Через ВМ:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Начните {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=создавать новую виртуальную машину]}. На шаге **Настройки сети** укажите имя в поле **DNS-имя**.

Через настройки порта:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект.
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Откройте карточку сети, нажав на ее имя в общем списке.
1. Откройте карточку подсети, нажав на ее имя в общем списке.
1. Перейдите на вкладку **Порты**.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного порта и выберите пункт **Редактировать порт**.
1. Укажите имя в поле **DNS-имя**.
1. Нажмите кнопку **Сохранить изменения**.

{/tab}

{tab(OpenStack CLI)}

1. Убедитесь, что клиент OpenStack {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

1. Получите список портов инстанса, выполнив команду:

   ```console
   openstack port list --server <ID_СЕРВЕРА>
   ```

1. Выполните команду:

   ```console
   openstack port set --dns-name <DNS-ИМЯ> <ID_ПОРТА>
   ```

{/tab}

{/tabs}

{note:warn}
Максимальная длина имени — 63 символа. Допустимы только цифры, маленькие латинские буквы и тире `-`.
{/note}
