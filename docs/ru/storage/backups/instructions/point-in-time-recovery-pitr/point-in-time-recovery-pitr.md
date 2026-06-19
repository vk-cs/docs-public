# {heading(Point-in-time recovery (PITR))[id=backup-pitr]}

{note:warn}
Функциональность доступна только для СУБД PostgreSQL.
{/note}

## {heading(Создание расписания)[id=backup-pitr-create]}

При создании расписания PITR будут скопированы журналы СУБД.

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Point-in-time recovery**.
1. Нажмите кнопку **Добавить**.
1. В открывшемся окне укажите:

   - **Название расписания**: введите название для создаваемого расписания.
   - **Время начала**: укажите время начала резервного копирования в часовом поясе, указанном ниже в окне.
   - **Хранить, кол-во копий**: укажите количество хранимых резервных копий.
   - **Интервал резервного копирования**: выберите подходящий интервал между запусками резервного копирования.
   - **База данных**: выберите развернутый инстанс с СУБД PostgreSQL.

1. Нажмите кнопку **Сохранить расписание**.

{/tab}

{/tabs}

## {heading(Редактирование существующего расписания)[id=backup-pitr-edit]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Point-in-time recovery**.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного расписания и выберите пункт **Редактировать расписание**.
1. Внесите нужные изменения и нажмите кнопку **Сохранить расписание**.

{/tab}

{/tabs}

## {heading(Просмотр резервных копий расписания)[id=backup-pitr-view]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Point-in-time recovery**.
1. Нажмите на название нужного расписания.

Будет отображен список резервных копий для выбранного расписания.

{/tab}

{/tabs}

## {heading(Создание инстанса базы данных из резервной копии)[id=backup-pitr-restore]}

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Cloud Backup → Резервное копирование**.
1. Перейдите на вкладку **Point-in-time recovery**.
1. Нажмите на название нужного расписания.
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужной резервной копии и выберите пункт **Восстановить из бэкапа**.
1. На шаге **Создание инстанса** укажите нужные параметры {ifdef(private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../dbs/dbaas/instructions/create#dbaas-create)[text=создаваемой БД]}{/ifdef}{ifndef(private-pdf,private-pg-pdf)}[создаваемой БД](../../../../dbs/dbaas/instructions/create){/ifndef} и нажмите кнопку **Следующий шаг**.

   {note:warn}
   Создаваемый инстанс может потребовать больше места на диске, чем объем резервной копии, так как сервис Cloud Backup использует сжатие данных.

   Указывайте размер диска, равный объему исходного инстанса, для которого была сделана резервная копия. Если он неизвестен, укажите размер диска в 2–3 раза больше объема резервной копии.
   {/note}

1. (Опционально) Укажите дату и время нужной резервной копии в одноименном поле. Если оставить поле пустым, автоматически будет выбрана последняя созданная резервная копия.
1. Нажмите кнопку **Создать базу данных**.

{/tab}

{/tabs}
