{ifdef(private-cert)}
Чтобы получить доступ к личному кабинету {var(cloud)}, необходимо пройти двухфакторную аутентификацию. В {var(cloud)} для двухфакторной аутентификации используется пароль учетной записи и код, приходящий по электронной почте.
{/ifdef}

1. С помощью любого поддерживаемого веб-браузера откройте страницу с адресом:

   {ifndef(private-cert)}
    ```console
    lk.<ДОМЕННОЕ_ИМЯ>
    ```
   {/ifndef}

   {ifdef(private-cert)}
    ```console
    LK<ДОМЕННОЕ_ИМЯ>
    ```
   {/ifdef}

   Здесь `<ДОМЕННОЕ_ИМЯ>` — это доменное имя вашей компании, где развернут {var(cloud)}.

1. Введите логин и пароль своей учетной записи.

   {note:warn}
   Для получения учетных данных обратитесь к администратору {var(cloud)}.
   {/note}

   {ifdef(private-cert)}
1. Нажмите кнопку **Войти**. На электронную почту, которая используется в качестве логина, придет письмо с кодом.
1. Введите код из письма и нажмите кнопку **Войти**.
   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
1. Нажмите кнопку **Войти**.

   Если при развертывании {var(cloud)} была включена двухфакторная аутентификация, на электронную почту, которая используется в качестве логина, придет письмо с кодом. Введите код из письма и нажмите кнопку **Войти**.

   {note:info}
   Двухфакторная аутентификация может быть включена или отключена администратором при развертывании {var(cloud)}.
   {/note}

   {includetag(lk-entry)}
1. (Опционально) В шапке личного кабинета {linkto(../project-settings/manage#tools-account-project-select)[text=выберите]} проект для дальнейшей работы.
   {/ifdef}

При работе с личным кабинетом {var(cloud)} учитывайте особенности {linkto(../../concepts/user-session#tools-account-user-session)[text=сеанса доступа и блокировки пользователя]}.
{/includetag}
   {includetag(prerequisites-lk-entry)}
1. (Опционально) В шапке личного кабинета {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#tools-account-project-select)[text=выберите]} проект для дальнейшей работы.
   {/ifdef}

При работе с личным кабинетом {var(cloud)} учитывайте особенности {linkto(../../../tools-for-using-services/account/concepts/user-session#tools-account-user-session)[text=сеанса доступа и блокировки пользователя]}.
{/includetag}