[Keycloak](https://www.keycloak.org/) — это система идентификации и управления доступом. Вы можете использовать Keycloak в сервисе Cloud Desktop в качестве поставщика удостоверений SAML.

Далее показано, как подготовить Keycloak к работе с сервисом Cloud Desktop.

## Подготовительные шаги

1. Установите Keycloak, следуя указаниям [официальной документации](https://www.keycloak.org/getting-started/getting-started-docker).
1. Авторизуйтесь в консоли администратора Keycloak.
1. Создайте новый рилм (realm).

   1. Раскройте список римлов в левом боковом меню и нажмите кнопку **Create realm**.
   1. Задайте имя нового рилма в поле **Realm name** и нажмите кнопку **Create**.

## 1. Добавьте и настройте LDAP-провайдера

1. В боковом меню перейдите в раздел **User federation**.
1. Нажмите кнопку **Add Ldap providers**.
1. В блоке **General options** выберите для параметра **Vendor** значение `Active Directory`.
1. В блоке **Connection and authentication settings** выполните настройки:

   1. Укажите **Connection URL** для соединения с вашим LDAP-сервером, например `ldap://125.125.125.125:389`.
   1. Для проверки соединения нажмите кнопку **Test connection**.
   1. Для параметра **Bind type** оставьте значение `simple`.
   1. В поле **Bind DN** укажите отличительное имя (DN) учетной записи с правами чтения AD, например `CN=ServiceUser,CN=Users,DC=test,DC=local`. Эту учетную запись Keycloak будет использовать для доступа к вашему LDAP-серверу.
   1. В поле **Bind credentials** укажите пароль учетной записи.
   1. Для проверки доступа к LDAP-серверу нажмите кнопку **Test authentication**.

1. В блоке **LDAP searching and updating** задайте значения параметров:

   - **Edit mode**: `READ_ONLY`.
   - **Users DN**: укажите путь для поиска учетных записей пользователей в AD, например `CN=users,DC=rcad3,DC=local`.
   - **Username LDAP attribute**: `sAMAccountName`.
   - **RDN LDAP attribute**: `cn`.
   - **UUID LDAP attribute**: `objectGUID`.
   - **User object classes**: `person, organizationalPerson, user`.
   - **User LDAP filter**: оставьте поле пустым.
   - **Search scope**: `Subtree`.
   - **Read timeout**: оставьте поле пустым.
   - **Pagination**: `Off`.
   - **Referral**: не выбрано.

1. В блоке **Synchronization settings** задайте значения параметров:

   - **Import users**: `On`.
   - **Sync Registrations**: `On`.
   - **Batch size**: оставьте поле пустым.
   - **Periodic full sync**: `On`.
   - **Periodic changed users sync**: `On`.

1. В блоке **Kerberos integration** для всех параметров выберите значение `Off`.
1. В блоке **Cache settings** для параметра **Cache policy** оставьте значение `DEFAULT`.
1. В блоке **Advanced settings** для всех параметров выберите значение `Off`.
1. Сохраните настройки.

## 2. Настройте мапперы (mapper)

1. В разделе **User federation** нажмите на имя созданного LDAP-провайдера и перейдите на вкладку **Mappers**.
1. Нажмите кнопку **Add mapper**.
1. Задайте имя нового маппера и выберите из списка тип `group-ldap-mapper`.
1. Задайте параметры маппера:

   - **LDAP Groups DN**: укажите путь для поиска групп в AD, например `CN=Groups,DC=test,DC=local`.
   - **Group Name LDAP Attribute**: `samaccountname`.
   - **Group Object Classes**: `group`.
   - **Preserve Group Inheritance**: `Off`.
   - **Ignore Missing Groups**: `Off`.
   - **Membership LDAP Attribute**: `member`.
   - **Membership Attribute Type**: `DN`.
   - **Membership User LDAP Attribute**: `sAMAccountName`.
   - **Mode**: `READ_ONLY`.
   - **User Groups Retrieve Strategy**: `LOAD_GROUPS_BY_MEMBER_ATTRIBUTE`.
   - **Member-Of LDAP Attribute**: `memberOf`.
   - **Drop non-existing groups during sync**: `Off`.
   - **Groups Path**: `/`.

1. Сохраните настройки.
1. Нажмите кнопку **Add mapper**.
1. Задайте имя нового маппера и выберите из списка тип `user-attribute-ldap-mapper`.
1. Задайте параметры маппера:

   - **User Model Attribute**: `username`.
   - **LDAP Attribute**: `cn`.
   - **Read Only**: `On`.
   - **Always Read Value From LDAP**: `Off`.
   - **Is Mandatory In LDAP**: `Off`.
   - **Force a Default Value**: `Off`.
   - **Is Binary Attribute**: `Off`.

1. Сохраните настройки.
1. Нажмите на имя ранее созданного маппера типа `group-ldap-mapper`.
1. В списке **Action** выберите пункт **Sync LDAP groups to Keycloak**.
1. В боковом меню перейдите в раздел **Groups** и убедитесь, что группы загружены и содержат пользователей.

## 3. Создайте клиента для Keycloak

1. В боковом меню перейдите в раздел **Clients**.
1. Нажмите кнопку **Create client** и задайте параметры:

   - **Client type**: `SAML`.
   - **Client ID**: укажите уникальный идентификатор вашего приложения в сервисе аутентификации SAML.
   - **Name**, **Description**: оставьте поля пустыми.
   - **Always display in UI**: `Off`.

1. Нажмите кнопку **Next**.
1. Для параметра **Valid redirect URIs** укажите значение `*`, остальные поля оставьте пустыми.
1. Сохраните настройки.

## 4. Настройте мапперы для клиента

1. На странице созданного клиента перейдите на вкладку **Keys**.
1. Для параметра **Client signature required** установите значение `Off`.
1. Перейдите на вкладку **Client scopes**.
1. В списке нажмите на имя созданного клиента, к которому добавлен постфикс `-dedicated`.
1. Нажмите кнопку **Configure a new mapper**.
1. Нажмите **Group List** и задайте параметры:

   - **Name**: задайте имя нового маппера.
   - **Group attribute name**: `memberOf`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Single Group Attribute**: `On`.
   - **Full group path**: `Off`.

1. Сохраните настройки.

1. Чтобы добавить еще один маппер, нажмите стрелку назад.
1. В списке **Add mapper** выберите пункт **By configuration**.
1. Нажмите **User Attribute** и задайте параметры:

   - **Name**: задайте имя нового маппера.
   - **User Attribute**: `LDAP_ID`.
   - **SAML Attribute Name**: `ldapUUID`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Aggregate attribute values**: `Off`.

1. Сохраните настройки.

## 5. Завершите настройку Keycloak

1. В боковом меню перейдите в раздел **Realm Settings**.
1. Для параметра **Require SSL** установите значение `None`.
1. В блоке **Endpoints** скопируйте ссылку **SAML 2.0 Identity Provider Metadata**. При настройке [двухфакторной аутентификации с помощью сервиса SAML](../../instructions/config/setup-saml) ее нужно указать в качестве значения параметра **URL метаданных**.
1. В боковом меню перейдите в раздел **User Federation** и нажмите на имя созданного LDAP-провайдера.
1. В списке **Action** выберите пункт **Sync all users**.

Настройка Keycloak завершена.
