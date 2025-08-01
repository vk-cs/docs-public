<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где нужно создать инстанс БД.
1. Перейдите в раздел **Базы данных → Инстансы баз данных**.
1. Нажмите кнопку **Создать базу данных** или **Добавить**.
1. На шаге **Конфигурация**:

   1. Выберите нужный тип базы данных.
   1. Выберите нужную версию.
   1. Выберите конфигурацию **Single** или **Master-Replica**. Конфигурация **Master-Replica** доступна не для всех [типов СУБД](../../../concepts/work-configs#dostupnye_konfiguracii_dlya_tipov_subd).
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге **Создание инстанса**:

   1. Задайте общие параметры инстанса:

      - **Имя инстанса базы данных**: может содержать только латинские буквы, цифры и спецсимволы `.`, `-`, `_`.

        Имена хостов инстанса будут состоять из указанного имени и суффикса. Суффикс будет различаться для разных СУБД.

        {note:info}

        В конфигурации **Master-Replica** к имени инстанса добавится суффикс `-1`, не влияющий на имена хостов. Например, если задано имя инстанса `my-instance`, то итоговое имя инстанса примет вид `my-instance-1`, а хосты получат имена вида `my-instance-...`, но не `my-instance-1-...`.

        {/note}

      - **Категория виртуальной машины**: выберите [категорию](/ru/computing/iaas/concepts/vm/flavor) предустановленных конфигураций ВМ.

      - **Тип виртуальной машины:** шаблон конфигурации для инстанса БД.

        Шаблоны с высокопроизводительными CPU доступны [по запросу в службу поддержки](/ru/contacts). Чтобы воспользоваться этими шаблонами, выберите опцию **Показывать только высокопроизводительные CPU**.

      - **Зона доступности:** [зона доступности](/ru/intro/start/concepts/architecture#az) для инстанса БД.

      - **Тип диска:** [тип диска](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) для инстанса БД.

      - **Размер диска, GB:** размер диска (в гигабайтах).

        Чем больше размер диска, тем выше его производительность в некоторых дисковых операциях.

      - **Включить автомасштабирование диска:** выберите эту опцию, чтобы размер диска автоматически увеличивался при заполнении диска данными. Поддержка функциональности зависит от [типа и версии СУБД](../../../concepts/disks-autoscaling#subd_s_podderzhkoy_avtomasshtabirovaniya). При выборе этой опции также укажите **Максимальный размер диска, GB**.

      - **Сеть:** сеть, в которой будет размещаться инстанс БД. Если нужной сети нет в списке, [создайте ее](/ru/networks/vnet/instructions/net#sozdanie_seti).

      - **Назначить внешний IP:** выберите эту опцию, чтобы назначить Floating IP-адрес инстансу БД.

        Такой инстанс БД будет доступен из интернета.

        {note:warn}

        Использование Floating IP-адреса [тарифицируется](/ru/networks/vnet/tariffication#tarificiruetsya).

        {/note}

      - **Настройки Firewall:** список групп безопасности для инстанса БД.

        Добавьте в список группу безопасности `ssh`, чтобы получить возможность [подключаться к инстансу по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

      - **Создать реплику:** эта опция влияет на конфигурацию инстанса и определяет, будет ли добавлена реплика.

        Опция доступна для следующих типов СУБД:

        - MySQL,
        - PostgreSQL,
        - PostgresPro Enterprise,
        - PostgresPro Enterprise 1C.

        Опция действует так:

        - Если эта опция не выбрана, то будет создан инстанс БД в конфигурации **Single**: с одним хостом с ролью `Master`.
        - Если эта опция выбрана, то будет создан инстанс БД в конфигурации **Master-Repica**: с одним хостом в роли `Master` и другим хостом в роли `Replica`.

        {note:info}

        Имя каждой реплики состоит из имени инстанса и суффикса с порядковым номером хоста (например, `my-instance-3`). Нумерация хостов инстанса начинается с `1`.

        {/note}

      - **Ключ для доступа по SSH:** выберите существующий ключ или создайте новый.

        Ключ используется для [подключения к хостам инстанса по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).

   1. Настройте резервное копирование. При необходимости параметры резервного копирования можно [задать](/ru/storage/backups/instructions/create-backup-plan#create_db_backup_plan) или [изменить](/ru/storage/backups/instructions/manage-backup-plan#edit_backup_plan) после создания инстанса БД.

      Для Tarantool резервное копирование недоступно.

      <tabs>
      <tablist>
      <tab>Отключено</tab>
      <tab>Point-in-time recovery</tab>
      <tab>Полное</tab>
      </tablist>
      <tabpanel>

      Выберите эту опцию, чтобы не использовать резервное копирование для инстанса БД.

      </tabpanel>
      <tabpanel>

      Опция доступна только для PostgreSQL, PostgresPro Enterprise и PostgresPro Enterprise 1C. Эта опция позволяет выполнять резервное копирование по схеме Point-In-Time-Recovery (PITR).

      Если опция выбрана, задайте параметры резервного копирования:

      - **Время начала:** время начала резервного копирования в формате `ЧЧ:ММ`. Указанный в подсказке часовой пояс соответствует часовому поясу вашего устройства. Формат времени — 24 часа.

      - **Хранить, кол-во копий:** количество копий, которое необходимо хранить.

      - **Интервал резервного копирования**: периодичность создания резервных копий.

      </tabpanel>
      <tabpanel>

      Задайте параметры резервного копирования:

      - Укажите **Периодичность резервного копирования**.
      - При необходимости включите резервное копирование по [стратегии GFS](/ru/storage/backups/concepts/retention-policy/gfs-backup) и настройте параметры хранения.
      - Если резервное копирование по стратегии GFS не включено, задайте максимальное количество полных резервных копий.

      </tabpanel>
      </tabs>

   1. Нажмите кнопку **Следующий шаг**.

1. На шаге **Инициализация**:

   1. Укажите параметры инициализации баз данных. Доступные параметры зависят от выбранного **Типа создания**:

      <tabs>
      <tablist>
      <tab>Новая база данных</tab>
      <tab>Восстановить из копии</tab>
      </tablist>
      <tabpanel>

      Будет создана новая пустая база данных.

      Для Redis параметров инициализации не предусмотрено.

      Для Tarantool: задайте имя пользователя и пароль.

      Для других типов СУБД:

      - Задайте имя базы данных.
      - Задайте имя пользователя и пароль.

      </tabpanel>
      <tabpanel>

      Эта опция неактивна, если:

      - нет резервных копий, соответствующих выбранному типу и версии СУБД.
      - резервное копирование не поддерживается (для Tarantool).

      Базы данных будут восстановлены из резервной копии.

      Для PostreSQL, PostgresPro Enterprise и PostgresPro Enterprise 1C выберите **Тип бэкапа**:

      - **Point-in-time recovery:**

        - Из выпадающего списка **Бэкап** выберите резервную копию, начиная с которой должно выполняться восстановление.
        - При необходимости выберите **Дату и время**. Базы данных будут восстановлены в состояние на указанный момент времени.

          Если не выбирать дату и время, то восстановление будет выполнено на последний доступный момент времени.

      - **Полный:** из выпадающего списка **Бэкап** выберите резервную копию, из которой необходимо выполнить восстановление.

      Для других типов СУБД из выпадающего списка **Бэкап** выберите резервную копию, из которой необходимо выполнить восстановление.

      </tabpanel>
      </tabs>

   1. Нажмите кнопку **Создать базу данных**.

      Дождитесь завершения операции. Создание инстанса БД может занять длительное время.

</tabpanel>
</tabs>
