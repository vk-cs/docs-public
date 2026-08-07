# {heading(Управление балансом проекта)[id=billing-payment]}

{note:info}
Просматривать детализацию расходов и пополнять лицевой счет могут пользователи, чья {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=роль]} в {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекте]} — владелец, суперадминистратор или администратор биллинга.
{/note}

## {heading(Просмотр баланса)[id=billing-payment-balance-view]}

{include(../../../../_includes/_balance-view.md)}

## {heading(Внесение средств)[id=billing-payment-balance-charge]}

Внести средства можно только на {linkto(../../concepts/balance#billing-balance)[text=баланс лицевого счета]} проекта.

Чтобы внести средства на баланс лицевого счета проекта:

1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
1. Откройте окно пополнения баланса одним из способов: 
   
   - Наведите курсор на значок ![balance](/ru/intro/billing/assets/balance.svg "inline") в шапке страницы и нажмите кнопку **Пополнить баланс**.
   - Перейдите в раздел **Баланс**, нажав на значок ![balance](/ru/intro/billing/assets/balance.svg "inline") в шапке страницы, и нажмите кнопку **Пополнить баланс**.

1. Укажите сумму пополнения.

   Минимальная сумма пополнения счета — 10 рублей для проектов в {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=регионе]} Москва и 100 тенге для проектов в регионе Казахстан.

1. Выберите один из {linkto(../../concepts/payment-methods#billing-payment-methods)[text=способов оплаты]}.

   Для оплаты банковской картой доступны следующие опции:

   - **Карта**: для оплаты картой, {linkto(../add-card#billing-add-card-bind)[text=привязанной]} к проекту. Вводить реквизиты карты не нужно.

   - **Банковская карта**: для добавления нового способа оплаты:

      - Новой картой.
      - Через систему быстрых платежей (СБП). Вы можете привязать оплату по СБП к проекту, установив флажок **Сохранить для оплаты**. 
      
         {note:info}
         Чтобы отвязать оплату по СБП от своего проекта, обратитесь в [техническую поддержку](/ru/contacts).
         {/note}
      
      - С помощью электронных платежей через SberPay или ЮMoney.
      
   - **Оплата по счету для юридических лиц**: для оплаты банковским переводом по сформированному счету. Перед формированием счета вы можете {linkto(../corporate#billing-corporate-registration-complete)[text=внести]} или {linkto(../corporate#billing-corporate-company-edit)[text=изменить]} данные о вашей компании.

   Для юридических лиц и ИП рекомендуется способ оплаты **Оплата по счету для юридических лиц**. Оплата сервисов способами, отличными от банковского перевода, не учитывается в {linkto(../../concepts/report#billing-report)[text=отчетных документах]} для юридических лиц и ИП.

## {heading(Уведомления о расходах)[id=billing-payment-expense-notifications]}

{include(../../../../_includes/_billing-settings.md)[tags=notifications]}