{includetag(manage-roles-all)}

Участник проекта не может изменить роль для:

- владельца проекта;
- самого себя;
- участника с такой же ролью, как у него самого.

Назначить или снять роль `Суперадминистратор` может только владелец проекта.

Чтобы настроить права доступа для пользователя:

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Управление доступами** на вкладку **Пользователи**.
   {/includetag}
   {includetag(file-manage-roles)}
1. Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного участника проекта и выберите пункт **Редактировать**.
1. (Опционально) Выберите одну из {linkto(../../concepts/roles-reference#iam-roles-reference-basic)[text=базовых ролей]}:
   {/includetag}
   {includetag(file-access-manage)}
1. Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного участника проекта и выберите пункт **Редактировать**.
1. (Опционально) Выберите одну из {linkto(../../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базовых ролей]}:
   {/includetag}
   {includetag(manage-roles-all)}
   - `Суперадминистратор`,
   - `Администратор проекта`,
   - `Администратор безопасности`,
   - `Наблюдатель`.
   {/includetag}

{includetag(file-manage-roles)}
1. Раскройте нужные группы {linkto(../../concepts/roles-reference#iam-roles-reference)[text=ролей]} и {linkto(../../concepts/permissions-reference#iam-permissions-reference)[text=разрешений]}, после этого:
{/includetag}
{includetag(file-access-manage)}
1. Раскройте нужные группы {linkto(../../../../../access/iam/concepts/roles-reference#iam-roles-reference)[text=ролей]} и {linkto(../../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]}, после этого:
{/includetag}

   - отметьте флажками роли или разрешения, которые вы хотите выдать пользователю;
   - снимите флажки с ролей или разрешений, которые вы хотите отозвать у пользователя.

   При необходимости воспользуйтесь поиском, чтобы найти нужное разрешение.

1. Нажмите кнопку **Сохранить**.

{includetag(file-manage-roles)}
Если участник проекта, которому вы настраиваете права доступа, будет работать с ресурсами через личный кабинет, назначьте ему одну из базовых ролей. Рекомендуется использовать роль `Наблюдатель`. Вы также можете назначить такому пользователю {linkto(../../concepts/permissions-reference#base_project_view)[text=разрешение]} `base_project_view`.
{/includetag}
{includetag(file-access-manage)}
Если участник проекта, которому вы настраиваете права доступа, будет работать с ресурсами через личный кабинет, назначьте ему одну из базовых ролей. Рекомендуется использовать роль `Наблюдатель`. Вы также можете назначить такому пользователю {linkto(../../../../../access/iam/concepts/permissions-reference#base_project_view)[text=разрешение]} `base_project_view`.
{/includetag}
{/tab}

{/includetag}
{/tabs}