The {ifdef(public)}{linkto(../../concepts/balance#billing-balance)[text=current account balance]}{/ifdef}{ifndef(public)}{linkto(../../../concepts/balance#account-balance)[text=current account balance]}{/ifndef} of the project is displayed in the header of the management console page.

To view the breakdown and expenses for services:

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifndef} the {var(cloud)} management console.

{include(/en/_includes/_balance_page.md)}

{note:info}
{ifdef(public)}{linkto(../detail#billing-detail)[text=Breakdown]}{/ifdef}{ifndef(public)}{linkto(../detail#account-detail)[text=Breakdown]}{/ifndef} is available for all projects in which your {ifdef(public)}{linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=role]}{/ifdef}{ifndef(public)}role{/ifndef} is owner, super administrator, or billing administrator. On the **Breakdown** and **Service expenses** tabs, data is filtered by the current project by default.
{/note}