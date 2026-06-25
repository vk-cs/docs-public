Для каждого нового {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} автоматически создаются несколько счетов:

- Лицевой счет — счет, на который зачисляются внесенные реальные денежные средства:

  - {ifdef(public)}Его можно пополнить, воспользовавшись одним из доступных {linkto(../../../../intro/billing/concepts/payment-methods#billing-payment-methods)[text=способов оплаты]}{/ifdef}{ifndef(public)}Его пополняет владелец проекта {var(cloud)}{/ifndef}.
  - С него {ifdef(public)}можно {linkto(../../../../intro/billing/instructions/refund#billing-refund)[text=вернуть денежные средства]}{/ifdef}{ifndef(public)}владелец проекта может вернуть денежные средства{/ifndef}.
  - Неизрасходованные средства на нем никогда не сгорают.

- Бонусный счет — специализированный счет для хранения бонусов:

  - Его нельзя пополнить{ifdef(public)}, бонусы может начислить только {var(cloud)}{/ifdef}. {ifndef(public)}Бонусы выдаются администратором {var(cloud)} для тестирования сервиса или начисляются по результатам акций, например за подключение продукта или прохождение всех шагов настройки сервиса.{/ifndef}
  - С него нельзя вернуть денежные средства.
  - Неизрасходованные средства на нем могут сгореть.
  - Бонусных счетов может быть несколько. Бонусы разделены на несколько типов, и для каждого типа создается свой бонусный счет.{ifdef(public)} Подробности в подразделе {linkto(#billing-balance-bonuses)[text=Бонусы]}.{/ifdef}

Для пользователей, работающих по {linkto(/ru/intro/billing/concepts/physical-corporate#billing-physical-corporate-prepay)[text=предоплате]}, состояние лицевого счета и баланс всех бонусных счетов {ifdef(public)}{linkto(../../../../intro/billing/instructions/payment#billing-payment)[text=доступны]} в шапке [личного кабинета](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}доступны в шапке личного кабинета{/ifndef}. Сумму средств на лицевом счете отражает **Лицевой баланс**, сумму бонусов по всем бонусным счетам отражает **Бонусный баланс**.
