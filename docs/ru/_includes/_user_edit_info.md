{includetag(edit_info)}
{ifdef(public)}
## {heading(Редактирование профиля пользователя)[id=account-manage-editinfo-profile]}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Личная информация**.
   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки аккаунта**.
1. На вкладке **Профиль пользователя** ознакомьтесь с информацией.
   {/ifdef}

1. {ifdef(public)}Заполните поля{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Измените следующие данные{/ifdef}:

   - **Имя и фамилия**{ifdef(public)}: введите ваши имя и фамилию{/ifdef};
   - **Компания**{ifdef(public)}: укажите название компании, где вы работаете{/ifdef};
   - **Должность**{ifdef(public)}: укажите вашу должность{/ifdef}.

   {note:info}
   Чтобы изменить номер телефона {ifdef(public)}или email, {linkto(../../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=обратитесь в техническую поддержку]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}, адрес электронной почты или пароль, обратитесь к администратору {var(cloud)}{/ifdef}.
   {/note}

1. Нажмите кнопку **Сохранить изменения**.

{ifdef(public)}
## {heading(Смена пароля)[id=account-manage-editinfo-password]}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Безопасность**.
1. Нажмите на значок ![pencil-icon](../../../../../assets/pencil-icon.svg "inline"), чтобы отредактировать пароль.
1. Заполните поля:

   - **Старый пароль**: введите текущий пароль от аккаунта;
   - **Новый пароль**: задайте новый пароль для аккаунта;
   - **Повторите пароль**: введите новый пароль еще раз.

1. Нажмите **Сохранить**.
   {/ifdef}

{/includetag}