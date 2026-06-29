# {heading(Управление проектом)[id=tools-account-project-manage]}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
## {heading(Выбор проекта)[id=tools-account-project-select]}

1. {linkto(../../lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. В шапке личного кабинета нажмите на имя проекта.

   Откроется список проектов, в которых вы являетесь участником.

1. (Опционально) Если в {var(cloud)} больше пяти проектов, воспользуйтесь:

   * поиском по идентификатору или названию проекта;
   * фильтром по ролям пользователя.

1. Выберите проект.
{/ifdef}

## {heading(Получение идентификатора проекта)[id=project-pid-view]}

{include(../../../../../_includes/_project_pid_common.md)}

Чтобы получить идентификатор проекта:

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

{include(../../../../../_includes/_project_pid_tab_lk.md)}

{ifdef(public)}
{/tab}

{tab({var(cloud)} Аккаунт)}

{include(../../../../../_includes/_project_pid_tab_account.md)}

{/tab}

{/tabs}
{/ifdef}

## {heading(Изменение имени проекта)[id=project-name-edit]}

Имя проекта можно изменить на любом этапе жизни проекта.

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

{include(../../../../../_includes/_project_rename_tab_lk.md)}

{ifdef(public)}
{/tab}

{tab({var(cloud)} Аккаунт)}

{include(../../../../../_includes/_project_rename_tab_account.md)}

{/tab}

{/tabs}
{/ifdef}

{include(../../../../../_includes/_project_rename_common.md)}

{ifdef(public)}
## {heading(Смена владельца проекта)[id=project-owner-edit]}

У проекта может быть только один владелец. После назначения владельцем другого пользователя вы поменяетесь с ним {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=ролями]}.

{note:info}
Смена владельца возможна при любом состоянии баланса проекта.
{/note}

1. Выполните подготовительные шаги:

   1. При необходимости отвяжите от проекта карту оплаты, обратившись в [техническую поддержку](/ru/contacts).
   1. Убедитесь, что пользователь, которого вы хотите сделать владельцем:

      - Добавлен в {linkto(../../../../../access/iam/instructions/access-manage#iam-access-manage)[text=список участников]} и принял приглашение в проект.

        В этом случае он отображается в списке со статусом активации **Да**.

      - (Опционально) Имеет в проекте роль суперадминистратора, администратора проекта или администратора пользователей (IAM).

        Это позволит проконтролировать смену ролей после того, как вы перестанете быть владельцем.

      - Согласен принять проект.

        Передача проекта возможна только с согласия нового владельца.

1. Обратитесь в [техническую поддержку](/ru/contacts) от имени текущего владельца, сообщите следующие данные:

   - {linkto(#project-pid-view)[text=идентификатор]} проекта (PID);
   - почту нового владельца.

1. (Опционально) Проверьте смену ролей в {linkto(../../../../../access/iam/instructions/access-manage#iam-access-manage)[text=списке участников]} проекта.

{note:info}
Новому владельцу может потребоваться {linkto(../../../../../intro/billing/instructions/add-card#billing-add-card-bind)[text=привязать карту оплаты]}, если у проекта нет привязанной карты, и {linkto(../../../../../intro/onboarding/account/create-account#onboarding-create-account-confirm-phone)[text=подтвердить номер телефона]}.
{/note}
{/ifdef}

## {heading(Консервация проекта)[id=project-freeze]}

Если вы хотите приостановить работу в проекте, законсервируйте проект, чтобы прекратить списание средств.{ifdef(public)} Если проект уйдет в минус, он будет {linkto(../../../concepts/projects#projects-auto-freeze)[text=заморожен]} с последующим удалением объектов и данных.{/ifdef}

Чтобы законсервировать проект:

1. Определите, какие данные из проекта вы хотите сохранить:

   1. Нажмите на имя пользователя в шапке страницы личного кабинета, выберите пункт **Баланс и платежи**.
   1. Раскройте содержимое каждого сервиса, чтобы увидеть объекты, в которых хранятся данные, и их стоимость.

1. Остановите все виртуальные машины, данные с которых вы хотите сохранить.
1. Перенесите или скопируйте все необходимые данные.

   Например, {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=создайте]} и {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=экспортируйте]} образы дисков виртуальных машин, остановленных на предыдущем шаге.

1. Удалите все объекты, которые тарифицируются или занимают дисковое пространство — Floating IP-адреса, диски, {ifdef(public)}бакеты, {/ifdef}балансировщики нагрузки и другие.

   Полный список таких объектов — также на странице **Баланс и платежи**.

   Так как загрузочные диски виртуальных машин нельзя удалить отдельно, {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=удалите]} виртуальные машины.

   Объекты, которые не потребляют ресурсы — например, сети и подсети — можно оставить в проекте.

Вы сможете расконсервировать проект спустя любой период времени, загрузив в него сохраненные данные и восстановив инфраструктуру.

{ifdef(public)}
## {heading(Передача объектов между проектами)[id=project-object-transfer]}

Вы можете {linkto(../../../../../computing/iaas/instructions/volumes/volumes-transfer#iaas-volumes-transfer)[text=переносить диски]} из проекта в проект. Это позволяет переносить между проектами виртуальные машины.

Перенос дисков возможен только в рамках одного региона. Если проекты находятся в разных регионах, {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-export)[text=выгрузите]} локально образ диска и {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=загрузите]} его в новый проект.

В настоящее время перенос объектов PaaS-сервисов между проектами не поддерживается. Например, виртуальная машина, на которой была развернута база данных, может быть перенесена в другой проект только как обычная виртуальная машина. Перенести такую виртуальную машину как инстанс базы данных или создать инстанс базы данных с диском, перенесенным из другого проекта, невозможно.

По обращению в [техническую поддержку](/ru/contacts) возможен перенос объектов:

- Floating IP-адресов;
- адреса {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=внешней сети]}.
{/ifdef}

## {heading(Просмотр квот проекта)[id=project-view-quotas]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

Квоты на наиболее часто используемые ресурсы отображаются на главной странице {ifdef(public)}[личного кабинета](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../lk-entry#tools-account-lk-entry)[text=личного кабинета]}{/ifndef}.

Чтобы увидеть более полный список квот и узнать подробную информацию о каждой квоте из списка:

{include(../../../../../_includes/_project_quotas.md)[tags=manage]}

{ifdef(public)}
Расширенный список квот для проекта можно получить через OpenStack CLI. Информация обо всех квотах и возможностях их увеличения в разделе {linkto(../../../concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоты и лимиты]}.

{/tab}

{tab(OpenStack CLI)}

Чтобы получить расширенный список квот для проекта:

1. Убедитесь, что клиент OpenStack {linkto(../../../../cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
1. Введите в консоли команду:

   ```console
   openstack quota show
   ```

   {cut(Пример вывода команды для региона Москва)}

   ```console
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
   {/cut}

   Значение `-1` для квоты означает «не ограничено». О том, каким ресурсам соответствуют квоты из списка, читайте в разделе {linkto(../../../concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоты и лимиты]}.

   Вы можете вывести квоты отдельно для компонентов `nova` и `cinder`:

   {tabs}
    
   {tab(nova)}
        
   ```console
   nova quota-show
   ```

   {/tab}
    
   {tab(cinder)}
    
   ```console
   cinder quota-show <project_id>
   ```

   {/tab}
    
   {/tabs}

   Чтобы посмотреть квоты по другим компонентам OpenStack, {linkto(../../../../cli/openstack-cli#openstack-install-package)[text=установите]} соответствующие пакеты клиента OpenStack (`manila`, `neutron` и другие) и используйте команду, специфичную для пакета. Чтобы узнать синтаксис команды, установите соответствующий пакет и выполните `<component> help quota-show`, например, `manila help quota-show`.

{/tab}

{/tabs}
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}
{note:info}
Чтобы изменить квоты, обратитесь к администратору {var(cloud)}.
{/note}
{/ifdef}

{ifdef(public)}
## {heading(Увеличение квот проекта)[id=project-increase-quota]}

Увеличение квот выполняется через специальную форму от имени пользователя с {linkto(../../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=ролью]} владельца проекта:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. В шапке личного кабинета нажмите на имя проекта и выберите пункт **Управление квотами**.
1. Нажмите кнопку **Добавить квоты**. Откроется форма для увеличения квот.
1. Если для проекта разрешено автоматическое увеличение квот, будет доступен выбор типа запроса. Выберите один из них:

    - **Автоматическое увеличение квот** — квоты будут расширены автоматически, без запроса в техподдержку. Значение каждой квоты можно увеличить не более, чем на 30% от текущего значения.

        {cut(Условия для автоматического увеличения квот)}

        {include(../../../../../_includes/_quotas.md)[tags=autoquota-conditions]}

        {/cut}

    - **Дополнительные ресурсы** — запрос отправляется в техническую поддержку. Используйте, если автоматического увеличения квот недостаточно.

    Если выбор типа запроса отсутствует, запрос на увеличение квот будет отправлен в техническую поддержку.

1. Выберите ресурс, для которого необходимо увеличить квоты. Для увеличения квот на несколько типов ресурсов нажмите кнопку **Добавить еще**.

   Чтобы удалить ресурс из запроса увеличения квот, нажмите на значок ![delete-icon](../../../../../assets/delete-icon.svg "inline").

1. Подтвердите выбор одним из доступных способов:

   - Нажмите кнопку **Отправить**. Сформируется запрос в техническую поддержку. Статус обращения можно отслеживать на [портале технической поддержки](/ru/contacts) в разделе **Мои заявки**.
   - Нажмите кнопку **Увеличить**. Квоты будут увеличены автоматически. Доступно только для проектов с разрешенным автоматическим увеличением квот.

{note:info}
Информация об увеличении квот для участников программы GeekBrains приведена в {linkto(../../../faq#tools-account-faq)[text=Вопросах и ответах]}.
{/note}

## {heading(Просмотр SDN проекта)[id=project-sdn-view]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Откройте настройки проекта одним из способов:

   - В шапке личного кабинета нажмите на имя проекта. Нажмите ![more-icon](../../../../../assets/more-icon.svg "inline") для нужного проекта и выберите пункт **Настройки проекта**.
   - В шапке личного кабинета нажмите на имя пользователя и выберите пункт **Настройки проекта**.

1. Перейдите на вкладку **Виртуальные сети**.

На вкладке отображаются SDN по умолчанию и дополнительная {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=SDN]} проекта, если подключена. Если в проекте используется только SDN Neutron, обратитесь в [техническую поддержку](/ru/contacts), чтобы подключить SDN Sprut.
{/ifdef}

## {heading(Удаление проекта)[id=project-delete]}

{ifdef(public)}
Удаление проекта возможно и при отрицательном балансе.

Чтобы удалить проект:

1. Убедитесь, что вы перенесли из проекта все необходимые данные.
1. Обратитесь в [техническую поддержку](/ru/contacts) от имени владельца проекта и укажите:

   - {linkto(#project-pid-view)[text=идентификатор]} (PID);
   - {linkto(../../../concepts/regions#tools-account-concepts-regions)[text=регион]} удаляемого проекта.
1. (Для юридических лиц) Укажите, за какой период нужны {linkto(../../../../../intro/billing/concepts/report#billing-report-legal-entities)[text=отчетные документы]}.

    С вами свяжутся для подтверждения удаления.
{/ifdef}

{ifndef(public)}
1. Убедитесь, что отсутствуют привязанные автоматические способы оплаты.
1. Проверьте, что все необходимые данные экспортированы из проекта.
1. Обратитесь к администратору {var(cloud)} от имени владельца проекта с просьбой удалить проект.
{/ifndef}

{note:err}
После подтверждения проект и его данные удаляются без возможности восстановления.
{/note}
