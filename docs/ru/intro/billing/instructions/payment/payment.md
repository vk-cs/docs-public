# {heading(Управление балансом проекта)[id=billing-payment]}

{note:info}
Просматривать детализацию расходов и пополнять лицевой счет могут пользователи, чья {linkto(../../../../tools-for-using-services/account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=роль]} в {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекте]} — владелец, суперадминистратор или администратор биллинга.
{/note}

## {heading(Просмотр баланса)[id=billing-payment-balance-view]}

{include(../../../../_includes/_balance-view.md)}

## {heading(Внесение средств)[id=billing-payment-balance-charge]}

Внести средства можно только на {linkto(../../concepts/balance#billing-balance)[text=баланс лицевого счета]} проекта.

Чтобы внести средства на баланс лицевого счета проекта:

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Нажмите на значок ![Пополнить](./assets/icon_plus.svg "inline") в шапке странице личного кабинета или нажмите кнопку **Пополнить баланс** на {linkto(#billing-payment-balance-view)[text=странице баланса]}.
1. Укажите сумму пополнения.

   Минимальная сумма пополнения счета — 10 рублей для проектов в {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионе]} Москва и 100 тенге для проектов в регионе Казахстан.

1. Выберите один из {linkto(../../concepts/payment-methods#billing-payment-methods)[text=способов оплаты]}.

   Для оплаты банковской картой доступны две опции:

   - **Карта**: для оплаты картой, которая {linkto(../add-card#billing-add-card-bind)[text=привязана]} к проекту.

      При выборе этой опции не нужно вводить реквизиты карты.

   - **Банковская карта**: для оплаты картой, которая не привязана к проекту.
   - **Оплата по счету для юридических лиц**: для оплаты банковским переводом по сформированному счету. Перед формированием счета вы можете {linkto(../corporate#billing-corporate-registration-complete)[text=внести]} или {linkto(../corporate#billing-corporate-company-edit)[text=изменить]} данные о вашей компании.

   {note:info}
   Для юридических лиц и ИП рекомендуется способ оплаты **Оплата по счету для юридических лиц**. Оплата сервисов способами, отличными от банковского перевода, не учитывается в {linkto(../../concepts/report#billing-report)[text=отчетных документах]} для юридических лиц и ИП.
   {/note}

## {heading(Уведомления о расходах)[id=billing-payment-expense-notifications]}

{include(../../../../_includes/_billing-settings.md)[tags=notifications]}