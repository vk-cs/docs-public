## Получение идентификатора проекта

{include(/ru/_includes/_project_pid_common.md)}

Чтобы получить идентификатор проекта:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>VK Cloud Аккаунт</tab>
</tablist>
<tabpanel>
{include(/ru/_includes/_project_pid_tab_lk.md)}
</tabpanel>
<tabpanel>
{include(/ru/_includes/_project_pid_tab_account.md)}
</tabpanel>
</tabs>

## Изменение имени проекта

Имя проекта можно изменить на любом этапе жизни проекта.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>VK Cloud Аккаунт</tab>
</tablist>
<tabpanel>
{include(/ru/_includes/_project_rename_tab_lk.md)}
</tabpanel>
<tabpanel>
{include(/ru/_includes/_project_rename_tab_account.md)}
</tabpanel>
</tabs>

{include(/ru/_includes/_project_rename_common.md)}

## Смена владельца проекта

У проекта может быть только один владелец. После назначения владельцем другого пользователя вы поменяетесь с ним [ролями](../../../concepts/rolesandpermissions).

<info>

Смена владельца возможна при любом состоянии баланса проекта.

</info>

1. Выполните подготовительные шаги:

    1. При необходимости отвяжите от проекта карту оплаты, обратившись в [техническую поддержку](/ru/contacts/).

    1. Убедитесь, что пользователь, которого вы хотите сделать владельцем:

        - Добавлен в [список участников](../access-manage) и принял приглашение в проект.

            В этом случае он отображается в списке со статусом активации **Да**.

        - (Опционально) Имеет в проекте роль суперадминистратора, администратора проекта или администратора пользователей (IAM).

            Это позволит проконтролировать смену ролей после того, как вы перестанете быть владельцем.

        - Согласен принять проект.

            Передача проекта возможна только с согласия нового владельца.

1. Обратитесь в [техническую поддержку](/ru/contacts/) от имени текущего владельца, сообщите следующие данные:

    - [идентификатор](#poluchenie_identifikatora_proekta) проекта (PID);
    - почту нового владельца.

1. (Опционально) Проверьте смену ролей в [списке участников](../access-manage) проекта.

<info>

Новому владельцу может потребоваться [привязать карту оплаты](../../activation#privyazka_bankovskoy_karty), если у проекта нет привязанной карты, и [подтвердить номер телефона](../../activation).

</info>

## Консервация проекта

Если вы хотите приостановить работу в проекте, законсервируйте проект, чтобы прекратить списание средств. Если проект уйдет в минус, он будет [заморожен](../../../concepts/projects#avtomaticheskaya_zamorozka_proekta) с последующим удалением объектов и данных.

Чтобы законсервировать проект:

1. Определите, какие данные из проекта вы хотите сохранить:

    1. Нажмите на имя пользователя в шапке страницы личного кабинета, выберите **Баланс и платежи**.
    1. Раскройте содержимое каждого сервиса, чтобы увидеть объекты, в которых хранятся данные, и их стоимость.

1. Остановите все виртуальные машины, данные с которых вы хотите сохранить.

1. Перенесите или скопируйте все необходимые данные.

    Например, [создайте](/ru/computing/iaas/service-management/images/images-manage#sozdanie_obraza) и [экспортируйте](/ru/computing/iaas/service-management/images/images-manage#eksport_obraza) образы дисков виртуальных машин, остановленных на предыдущем шаге.

1. Удалите все объекты, которые тарифицируются или занимают дисковое пространство — плавающие IP-адреса, диски, бакеты, балансировщики нагрузки и другие.

    Полный список таких объектов — также на странице **Баланс и платежи**.

    Так как загрузочные диски виртуальных машин нельзя удалить отдельно, [удалите](/ru/computing/iaas/service-management/vm/vm-manage#delete_vm) виртуальные машины.

    Объекты, которые не потребляют ресурсы — например, сети и подсети — можно оставить в проекте.

Вы сможете расконсервировать проект спустя любой период времени, загрузив в него сохраненные данные и восстановив инфраструктуру.

## Передача объектов между проектами

Вы можете [переносить диски](/ru/computing/iaas/service-management/volumes#peremeshchenie_diskov_mezhdu_proektami) из проекта в проект. Это позволяет переносить между проектами виртуальные машины.

Перенос дисков возможен только в рамках одного региона. Если проекты находятся в разных регионах, [выгрузите](/ru/computing/iaas/service-management/images/images-manage#eksport_obraza) локально образ диска и [загрузите](/ru/computing/iaas/service-management/images/images-manage#import_obraza) его в новый проект.

В настоящее время перенос объектов PaaS-сервисов между проектами не поддерживается. Например, виртуальная машина, на которой была развернута база данных, может быть перенесена в другой проект только как обычная виртуальная машина. Перенести такую виртуальную машину как инстанс базы данных или создать инстанс базы данных с диском, перенесенным из другого проекта, невозможно.

По обращению в [техническую поддержку](/ru/contacts) возможен перенос объектов:

- плавающего IP-адресов (floating IP);
- адреса [внешней сети](/ru/networks/vnet/concepts/net-types#vneshnyaya_set).

## Просмотр квот проекта

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

Квоты на наиболее часто используемые ресурсы отображаются на главной странице [личного кабинета](https://msk.cloud.vk.com/app/).

Чтобы увидеть более полный список квот и узнать подробную информацию о каждой квоте из списка:

1. Нажмите на имя пользователя в шапке страницы личного кабинета, из выпадающего списка выберите **Управление квотами**. Откроется страница квот.

    Эта же страница доступна, если выбрать **Настройки проекта** и перейти на вкладку **Квоты**.

1. Нажмите на значок ![Информация](assets/i-icon.svg "inline") справа от нужной квоты. Отобразится информация о том, какими объектами и в каких сервисах расходуется квота.

Расширенный список квот для проекта можно получить через OpenStack CLI. Информация обо всех квотах и возможностях их увеличения в разделе [Квоты и лимиты](../../../concepts/quotasandlimits).

</tabpanel>
<tabpanel>

Чтобы получить расширенный список квот для проекта:

1. Убедитесь, что клиент OpenStack [установлен](/ru/tools-for-using-services/cli/openstack-cli#1_ustanovite_klient_openstack), и [пройдите аутентификацию](/ru/tools-for-using-services/cli/openstack-cli#3_proydite_autentifikaciyu) в проекте.
1. Введите в консоли команду:

    ```bash
    openstack quota show
    ```

    <details><summary>Пример вывода команды для региона Москва</summary>

    ```bash
    +----------------------------+--------------------------------------------------+
    | Field                      | Value                                            |
    +----------------------------+--------------------------------------------------+
    | backup-gigabytes           | -1                                               |
    | backups                    | 400                                              |
    | cores                      | 9                                                |
    | fixed-ips                  | -1                                               |
    | floating-ips               | 6                                                |
    | gigabytes                  | 200                                              |
    | gigabytes_ceph             | -1                                               |
    | gigabytes_ceph-hdd         | -1                                               |
    | gigabytes_ceph-ssd         | -1                                               |
    | gigabytes_dev-ceph         | -1                                               |
    | gigabytes_dp1              | -1                                               |
    | gigabytes_dp1-high-iops    | 200                                              |
    | gigabytes_dp1-local-ssd    | -1                                               |
    | gigabytes_dp1-ssd          | -1                                               |
    | gigabytes_ef-nvme          | -1                                               |
    | gigabytes_high-iops        | 200                                              |
    | gigabytes_ko1-high-iops    | 200                                              |
    | gigabytes_ko1-local-ssd    | -1                                               |
    | gigabytes_ko1-local-ssd-g2 | -1                                               |
    | gigabytes_ko1-ssd          | -1                                               |
    | gigabytes_local-ssd        | -1                                               |
    | gigabytes_manila           | -1                                               |
    | gigabytes_ms1              | -1                                               |
    | gigabytes_octavia-hdd      | -1                                               |
    | gigabytes_octavia-ssd      | -1                                               |
    | gigabytes_perf-test        | -1                                               |
    | gigabytes_ssd              | -1                                               |
    | health_monitors            | -1                                               |
    | injected-file-size         | 10240                                            |
    | injected-files             | 5                                                |
    | injected-path-size         | 255                                              |
    | instances                  | 6                                                |
    | key-pairs                  | 100                                              |
    | l7_policies                | -1                                               |
    | listeners                  | -1                                               |
    | load_balancers             | 12                                               |
    | location                   | ...                                              |
    | networks                   | 10                                               |
    | per-volume-gigabytes       | -1                                               |
    | pools                      | 30                                               |
    | ports                      | 120                                              |
    | project                    | b5b7ffd4ef0547e5b222f44555dfXXXX                 |
    | project_name               | mcsXXXXXXXXXX                                    |
    | properties                 | 128                                              |
    | ram                        | 10240                                            |
    | rbac_policies              | 10                                               |
    | routers                    | 12                                               |
    | secgroup-rules             | 200                                              |
    | secgroups                  | 12                                               |
    | server-group-members       | 100                                              |
    | server-groups              | 50                                               |
    | snapshots                  | 200                                              |
    | snapshots_ceph             | -1                                               |
    | snapshots_ceph-hdd         | -1                                               |
    | snapshots_ceph-ssd         | -1                                               |
    | snapshots_dev-ceph         | -1                                               |
    | snapshots_dp1              | -1                                               |
    | snapshots_dp1-high-iops    | -1                                               |
    | snapshots_dp1-local-ssd    | -1                                               |
    | snapshots_dp1-ssd          | -1                                               |
    | snapshots_ef-nvme          | -1                                               |
    | snapshots_high-iops        | -1                                               |
    | snapshots_ko1-high-iops    | -1                                               |
    | snapshots_ko1-local-ssd    | -1                                               |
    | snapshots_ko1-local-ssd-g2 | -1                                               |
    | snapshots_ko1-ssd          | -1                                               |
    | snapshots_local-ssd        | -1                                               |
    | snapshots_manila           | -1                                               |
    | snapshots_ms1              | -1                                               |
    | snapshots_octavia-hdd      | -1                                               |
    | snapshots_octavia-ssd      | -1                                               |
    | snapshots_perf-test        | -1                                               |
    | snapshots_ssd              | -1                                               |
    | subnet_pools               | -1                                               |
    | subnets                    | 10                                               |
    | volumes                    | 10                                               |
    | volumes_ceph               | -1                                               |
    | volumes_ceph-hdd           | -1                                               |
    | volumes_ceph-ssd           | -1                                               |
    | volumes_dev-ceph           | -1                                               |
    | volumes_dp1                | -1                                               |
    | volumes_dp1-high-iops      | 10                                               |
    | volumes_dp1-local-ssd      | -1                                               |
    | volumes_dp1-ssd            | -1                                               |
    | volumes_ef-nvme            | -1                                               |
    | volumes_high-iops          | 10                                               |
    | volumes_ko1-high-iops      | 10                                               |
    | volumes_ko1-local-ssd      | -1                                               |
    | volumes_ko1-local-ssd-g2   | -1                                               |
    | volumes_ko1-ssd            | -1                                               |
    | volumes_local-ssd          | -1                                               |
    | volumes_manila             | -1                                               |
    | volumes_ms1                | -1                                               |
    | volumes_octavia-hdd        | -1                                               |
    | volumes_octavia-ssd        | -1                                               |
    | volumes_perf-test          | -1                                               |
    | volumes_ssd                | -1                                               |
    +----------------------------+--------------------------------------------------+
    ```
    </details>

    Значение `-1` для квоты означает «не ограничено». О том, каким ресурсам соответствуют квоты из списка, читайте в разделе [Квоты и лимиты](../../../concepts/quotasandlimits).

    Вы можете вывести квоты отдельно для компонентов `nova` и `cinder`:

    <tabs>
    <tablist>
    <tab>nova</tab>
    <tab>cinder</tab>
    </tablist>
    <tabpanel>

    ```bash
    nova quota-show
    ```

    </tabpanel>
    <tabpanel>

    ```bash
    cinder quota-show <project_id>
    ```

    </tabpanel>
    </tabs>

    Чтобы посмотреть квоты по другим компонентам OpenStack, [установите](/ru/tools-for-using-services/cli/openstack-cli#2_opcionalno_ustanovite_dopolnitelnye_pakety) соответствующие пакеты клиента OpenStack (`manila`, `neutron` и другие) и используйте команду, специфичную для пакета. Чтобы узнать синтаксис команды, установите соответствующий пакет и выполните `<component> help quota-show`, например, `manila help quota-show`.

</tabpanel>
</tabs>

## Увеличение квот проекта

Если проекту не хватает [квот](../../../concepts/quotasandlimits), обратитесь в [техническую поддержку](/ru/contacts) от имени владельца проекта и предоставьте информацию:

- [идентификатор](#poluchenie_identifikatora_proekta) (PID) и [регион](../../../concepts/regions) проекта;
- какие квоты необходимо увеличить (например, количество CPU, доступный объем RAM) и на сколько.

<info>

Информацию об увеличении квот для участников программы GeekBrains можете найти в [Вопросах и ответах](../../../faq).

</info>

## {heading(Просмотр SDN проекта)[id=sdn_view]}

1. [Перейдите](https://cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Откройте настройки проекта одним из способов:

    - В шапке личного кабинета нажмите на имя проекта. Нажмите ![more-icon](/ru/assets/more-icon.svg "inline") для нужного проекта и выберите пункт **Настройки проекта**.

    - В шапке личного кабинета нажмите на имя пользователя и выберите пункт **Настройки проекта**.

1. Перейдите на вкладку **Виртуальные сети**.

На вкладке отображаются SDN по умолчанию и дополнительная [SDN](/ru/networks/vnet/concepts/architecture#ispolzuemye_sdn) проекта, если подключена. Чтобы изменить тип SDN, обратитесь в [техническую поддержку](/ru/contacts/).

## Удаление проекта

Удаление проекта возможно и при отрицательном балансе.

Чтобы удалить проект:

1. Убедитесь, что вы перенесли из проекта все необходимые данные.
1. Обратитесь в [техническую поддержку](/ru/contacts/) от имени владельца проекта и укажите:

   - [идентификатор](#poluchenie_identifikatora_proekta) (PID);
   - [регион](../../../concepts/regions) удаляемого проекта.
1. (Для юридических лиц) Укажите, за какой период нужны [отчетные документы](/ru/intro/billing/concepts/report#yuridicheskie_lica).

    С вами свяжутся для подтверждения удаления.

<err>

После подтверждения проект и его данные удаляются без возможности восстановления.

</err>
