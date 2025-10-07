К VK Cloud можно подключить ваш поставщик удостоверений (Identity Provider, IdP). Это позволит вашим сотрудникам заходить в VK Cloud без ввода логина и пароля, используя корпоративные аутентификационные данные поставщика удостоверений. Такой режим называется федерация удостоверений.

Для работы в режиме федерации поставщик удостоверений должен поддерживать стандарт SAML 2.0.

Далее будет показана настройка федерации удостоверений c [Keycloak](https://www.keycloak.org) в качестве поставщика удостоверений.

## Подготовительные шаги

1. [Установите и настройте](https://www.keycloak.org/guides) сервер Keycloak, если вы еще не пользуетесь этим поставщиком удостоверений.
1. Получите метаданные Keycloak:

    1. [Войдите](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console) в консоль администратора Keycloak.
    1. [Создайте](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-a-realm_server_administration_guide) рилм (realm) в Keycloak или используйте существующий.
    1. Перейдите на вкладку **Realm settings** и нажмите **SAML 2.0 Identity Provider Metadata**. Будет скачан XML-файл с метаданными Keycloak.

## 1. Создайте федерацию удостоверений в VK Cloud

{include(/ru/_includes/_create-fim.md)[tags=keycloak]}

## 2. Настройте Keycloak

1. [Войдите](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console) в консоль администратора Keycloak.
1. Перейдите на вкладку **Clients**.
1. Нажмите **Import client** и загрузите метаданные, полученные при создании федерации. Параметры оставьте без изменений:

    * **Type**: `saml`.
    * **Encrypt assertions**: `On`.
    * **Client signature required**: `Off`.

1. Нажмите кнопку **Save**.
1. Перейдите на вкладку **Client scopes** созданного клиента и нажмите на скоуп (scope), созданный для клиента по умолчанию.
1. Нажмите **Configure a new mapper**, выберите **User Property** и заполните параметры:

    * **Name**: `email`.
    * **Property**: `email`.
    * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.
    * **SAML Attribute NameFormat**: `URI Reference`.

1. Выберите **Group list** и добавьте еще один маппер:

    * **Name**: `groups`.
    * **Group attribute name**: `http://schemas.xmlsoap.org/claims/Group`.
    * **SAML Attribute NameFormat**: `URI Reference`.
    * **Single Group Attribute**: `On`.
    * **Full group path**: `Off`.

1. (Опционально) Нажмите **Configure a new mapper**, выберите **User Property** и добавьте два атрибута для синхронизации информации о пользователе с личным кабинетом:

    * Имя пользователя:

        * **Name**: `firstName`.
        * **Property**: `firstName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`.
        * **SAML Attribute NameFormat**: `URI Reference`.

    * Фамилия пользователя:

        * **Name**: `lastName`.
        * **User Attribute**: `lastName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.
        * **SAML Attribute NameFormat**: `URI Reference`.

## 3. Настройте связь групп и ролей в VK Cloud

{note:info}

Операции по настройке связи групп и ролей в VK Cloud доступны только следующим [ролям](../../../account/concepts/rolesandpermissions) личного кабинета: владельцу, суперадминистратору и администратору пользователей (IAM).

{/note}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Федерация удостоверений**.
1. Перейдите на вкладку **Группы**.
1. Нажмите на название проекта, для которого настраивается федерация удостоверений.
1. Добавьте группы, которые вы используете в Keycloak:

    1. Нажмите кнопку **Добавить**. Если на странице уже есть созданные группы, нажмите кнопку **Добавить группу**.
    1. Настройте группу:

        * **Имя группы**: укажите название группы. Название создаваемой группы должно соответствовать имени [группы](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide) в Keycloak.
        * **Разрешения**:
           * Выберите **Проект**, чтобы связать группу и роли в рамках одного проекта. В разных проектах можно связать одну и ту же группу с разными ролями, что позволит разграничить уровень доступа федеративного пользователя к проектам.
           * Выберите **Домен**, чтобы связать группу и роли во всех проектах одного владельца и предоставить федеративному пользователю единый уровень доступа к ним. Разрешение **Домен** доступно только владельцу проекта.
        * **Роли группы**: выберите те [роли VK Cloud](../../../account/concepts/rolesandpermissions), которые соответствуют вашей матрице доступа для создаваемой группы.

    1. Нажмите кнопку **Добавить**.

## 4. Проверьте возможность входа через федерацию

1. [Создайте](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-user_server_administration_guide) пользователя в Keycloak и [добавьте](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide) его в нужную группу.
1. Введите в строку браузера URL для входа федеративных пользователей. Вы будете перенаправлены на страницу аутентификации Keycloak.
1. Введите аутентификационные данные пользователя. После успешной авторизации вы будете перенаправлены на главную страницу личного кабинета VK Cloud.
1. Проверьте, что автоматически назначенная роль пользователя VK Cloud соответствует выбранной при [добавлении группы](#3_nastroyte_svyaz_grupp_i_roley_v_vk_cloud).