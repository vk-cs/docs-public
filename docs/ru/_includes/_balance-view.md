В шапке страницы личного кабинета отображается {ifdef(public)}{linkto(../../concepts/balance#billing-balance)[text=баланс лицевого счета]}{/ifdef}{ifndef(public)}{linkto(../../../concepts/balance#account-balance)[text=баланс лицевого счета]}{/ifndef} проекта.

Чтобы посмотреть детализацию и расходы на сервисы:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.

{include(/ru/_includes/_balance_page.md)}

{note:info}
{ifdef(public)}{linkto(../detail#billing-detail)[text=Детализация]}{/ifdef}{ifndef(public)}{linkto(../detail#billing-detail)[text=Детализация]}{/ifndef} доступна по всем проектам, в которых ваша {ifdef(public)}{linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=роль]}{/ifdef}{ifndef(public)}роль{/ifndef} — владелец, суперадминистратор или администратор биллинга. На вкладках **Детализация** и **Расходы на сервисы** данные по умолчанию отфильтрованы по текущему проекту.
{/note}