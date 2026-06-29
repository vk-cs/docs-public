# {heading(Создание ВМ)[id=iaas-vm-create]}

В Cloud Servers можно создавать виртуальные машины через личный кабинет, OpenStack CLI или Terraform. Для создания виртуальной машины с помощью Terraform воспользуйтесь {ifdef(public)}{linkto(../../../../../tools-for-using-services/terraform/how-to-guides/iaas/create#terraform-iaas-create)[text=инструкцией в разделе Terraform]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/terraform/how-to-guides/iaas/create-private#terraform-iaas-create-private)[text=инструкцией в разделе Terraform]}{/ifdef}.

Командой {var(cloud)} подготовлены образы некоторых ОС. Список готовых образов доступен в личном кабинете в {ifdef(public)}[окне создания новой виртуальной машины](https://msk.cloud.vk.com/app/services/infra/servers/add){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}окне создания новой виртуальной машины{/ifdef}. Также вы можете {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импортировать образ]} ОС самостоятельно.

{note:info}
Доступные для настройки параметры ВМ могут отличаться для разных операционных систем.
{/note}

Чтобы создать ВМ:

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifdef} в личный кабинет {var(cloud)}.
1. Проверьте, что баланс счета положителен и {ifdef(public)}{linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-view-quotas)[text=квот]}{/ifdef} достаточно для создания желаемой конфигурации виртуальной машины.
1. Перейдите в раздел **Облачные вычисления** → **Виртуальные машины**.
1. Нажмите кнопку **Создать инстанс** или **Добавить**.

{include(../../../../../_includes/_vm-create-lk.md)}

{ifdef(private-cert)}
Для корректного создания ВМ рекомендуется не выходить из личного кабинета.
{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
При создании ВМ в правом нижнем углу страницы отобразится значок прогресса создания. Нажмите на значок и на название процесса, чтобы посмотреть процент и стадию выполнения (подготовка, создание, настройка).

После завершения процесса значок будет отображаться в одном из статусов:

- `Все процессы завершены` (зеленый значок) — инстанс создан и готов к работе.
- `Все процессы завершены` (желтый значок) — инстанс создан, но на одной из стадий возникла ошибка. Приведено описание ошибки и код, с которым можно обратиться к администратору {var(cloud)} для выяснения причины ее появления.
- `Возникла ошибка` (красный значок) — инстанс не создан, возникла ошибка. Приведено описание ошибки и код, с которым можно обратиться к администратору {var(cloud)} для выяснения причины ее появления.

Процесс создания инстанса не блокирует параллельные действия в {var(cloud)}.
{/ifdef}

{/tab}

{tab(OpenStack CLI)}

   {ifdef(public)}
1. Подготовьтесь к работе с OpenStack CLI:

   1. {linkto(../../../../../access/iam/instructions/manage-2fa#vk-cloud-account-manage-2fa-on)[text=Включите]} двухфакторную аутентификацию.
   1. {linkto(../../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable)[text=Активируйте]} доступ по API для текущего пользователя.
   1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.

   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. Убедитесь, что клиент OpenStack {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=установлен]}, и {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=пройдите аутентификацию]} в проекте.
   {/ifdef}
1. Соберите данные:

   1. Получите список доступных типов ВМ и сохраните нужный идентификатор:

      ```console
      openstack flavor list
      ```

   1. Получите список доступных образов ВМ и сохраните нужный идентификатор:

      ```console
      openstack image list
      ```

   1. Получите список групп безопасности:

      ```console
      openstack security group list
      ```

      - Для создания ВМ Linux и подключения к ней по SSH сохраните идентификатор группы `ssh` или `ssh+www`.
      - Для создания ВМ Windows и подключения к ней по RDP сохраните идентификатор группы `rdp` или `rdp+www`.

      Подробнее про настройку правил сетевого доступа в разделе {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Группы безопасности]}.

   1. Получите список доступных сетей и сохраните нужный идентификатор:

      ```console
      openstack network list
      ```

      - Если выбрана сеть `ext-net`, то виртуальной машине будет автоматически назначен внешний IP-адрес.
      - Если выбрана приватная сеть, то виртуальной машине после создания можно {linkto(../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip)[text=назначить Floating IP-адрес]}.

   1. Получите список доступных ключевых пар и сохраните имя нужной ключевой пары:

      ```console
      openstack keypair list
      ```

      Чтобы создать новую ключевую пару:

      1. Сгенерируйте ключ:

         ```console
         ssh-keygen -t rsa -b 2048 -f ~/.ssh/my_key -N ""
         ```

      1. Загрузите ключ:

         ```console
         openstack keypair create --public-key ~/.ssh/my_key.pub --type ssh <ИМЯ_КЛЮЧЕВОЙ_ПАРЫ>
         ```

1. Создайте загрузочный диск:

   ```console
   openstack volume create root-volume --size <ОБЪЕМ_ДИСКА> --image <ID_ОБРАЗА> --availability-zone MS1 --bootable
   ```

   Здесь:
   
   - `<ОБЪЕМ_ДИСКА>` — размер диска в ГБ.

     {ifdef(public)}
     Максимальный размер ограничен. Подробнее — в разделе {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-images-volumes-no-quotas-limits)[text=Квоты и лимиты]}.
     {/ifdef}
   
   - `<ID_ОБРАЗА>` — идентификатор образа, полученный ранее.

1. Создайте ВМ:

   ```console
   openstack server create <ИМЯ_ВМ> \
                           --volume <ID_ДИСКА> \
                           --network <ID_СЕТИ> \
                           --flavor <ID_ШАБЛОНА_КОНФИГУРАЦИИ> \
                           --security-group <ГРУППА_БЕЗОПАСНОСТИ> \
                           --key-name <ИМЯ_КЛЮЧЕВОЙ_ПАРЫ> \
                           --availability-zone <ЗОНА_ДОСТУПНОСТИ>
   ```

   {note:warn}
   Если в опции `--network` указана внешняя сеть (`ext-net`), добавьте опцию `--use-config-drive` в команду создания ВМ.
   {/note}

   После создания виртуальной машины отобразится информация о ней. Найдите поле `adminPass` и сохраните его значение. Оно понадобится для входа на сервер через консоль VNC.

1. Проверьте состояние созданной ВМ:

   ```console
   openstack server list
   ```

   Созданная машина должна появиться в списке доступных ВМ и иметь статус `ACTIVE`.

{note:info}
Некоторые особенности создания ВМ через CLI:

- Если не указать зону доступности, будет выбрана случайная.
- Если не указать диск, будет создан «эфемерный диск» (с ограничениями).
{/note}

{/tab}

{/tabs}
