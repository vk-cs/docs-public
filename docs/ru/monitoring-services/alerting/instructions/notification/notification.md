# {heading(Каналы уведомлений)[id=alerting-notification]}

## {heading(Создание канала уведомлений)[id=alerting-notification-add]}

Чтобы получать уведомления об инциденте, необходимо задать канал уведомлений. Канал уведомлений содержит информацию о получателе и методах отправки.

{note:info}
Вы можете указать несколько каналов уведомлений. Один канал может использоваться многократно в нескольких триггерах.
{/note}

Чтобы создать канал уведомлений:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Мониторинг → Алертинг**.
1. Перейдите на вкладку **Каналы уведомлений**.
1. Нажмите кнопку **Добавить**.
1. Укажите параметры канала уведомлений:

   - **Имя канала**: введите название для канала.
   {ifdef(public)}
   - **Тип уведомлений**: выберите опцию `Email` или `SMS`.
   {/ifdef}
   - **Получатель**: введите электронный адрес или телефон получателя уведомлений.

1. Нажмите кнопку **Создать канал**.

## {heading(Редактирование канала уведомлений)[id=alerting-notification-edit]}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Мониторинг → Алертинг**.
1. Перейдите на вкладку **Каналы уведомлений**.
1. Нажмите ![more-icon](../../../../assets/more-icon.svg "inline") для нужного канала и выберите пункт **Изменить**.
1. Внесите необходимые изменения.
1. Нажмите кнопку **Сохранить канал**.

## {heading(Удаление канала уведомлений)[id=alerting-notification-delete]}

{note:info}
Перед удалением канала {linkto(../triggers#alerting-triggers-delete)[text=удалите]} все связанные с ним триггеры.
{/note}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Мониторинг → Алертинг**.
1. Перейдите на вкладку **Каналы уведомлений**.
1. Нажмите ![more-icon](../../../../assets/more-icon.svg "inline") для нужного канала и выберите пункт **Удалить**.
1. Подтвердите удаление.