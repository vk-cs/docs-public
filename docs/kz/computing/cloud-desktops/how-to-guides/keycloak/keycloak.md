{include(/kz/_includes/_translated_by_ai.md)}

[Keycloak](https://www.keycloak.org/) — бұл сәйкестендіру және қолжетімділікті басқару жүйесі. Сіз Keycloak-ты Cloud Desktop сервисінде SAML куәлік жеткізушісі ретінде пайдалана аласыз.

Төменде Keycloak-ты Cloud Desktop сервисімен жұмысқа қалай дайындау көрсетілген.

## Дайындық қадамдары

1. [Ресми құжаттамадағы](https://www.keycloak.org/getting-started/getting-started-docker) нұсқауларға сәйкес Keycloak орнатыңыз.
1. Keycloak әкімші консолінде авторизациялаңыз.
1. Жаңа рилм (realm) жасаңыз.

   1. Сол жақ бүйірлік мәзірде рилмдер тізімін ашып, **Create realm** түймесін басыңыз.
   1. **Realm name** өрісінде жаңа рилмнің атын беріп, **Create** түймесін басыңыз.

## 1. LDAP-провайдерді қосып, баптаңыз

1. Бүйірлік мәзірде **User federation** бөліміне өтіңіз.
1. **Add Ldap providers** түймесін басыңыз.
1. **General options** блогында **Vendor** параметрі үшін `Active Directory` мәнін таңдаңыз.
1. **Connection and authentication settings** блогында келесі баптауларды орындаңыз:

   1. LDAP-серверіңізге қосылу үшін **Connection URL** көрсетіңіз, мысалы `ldap://125.125.125.125:389`.
   1. Қосылымды тексеру үшін **Test connection** түймесін басыңыз.
   1. **Bind type** параметрі үшін `simple` мәнін қалдырыңыз.
   1. **Bind DN** өрісінде AD-ны оқу құқықтары бар есептік жазбаның ерекшеленетін атын (DN) көрсетіңіз, мысалы `CN=ServiceUser,CN=Users,DC=test,DC=local`. Keycloak осы есептік жазбаны LDAP-серверіңізге қол жеткізу үшін пайдаланады.
   1. **Bind credentials** өрісінде есептік жазбаның құпиясөзін көрсетіңіз.
   1. LDAP-серверге қолжетімділікті тексеру үшін **Test authentication** түймесін басыңыз.

1. **LDAP searching and updating** блогында параметр мәндерін орнатыңыз:

   - **Edit mode**: `READ_ONLY`.
   - **Users DN**: AD-та пайдаланушылардың есептік жазбаларын іздеу жолын көрсетіңіз, мысалы `CN=users,DC=rcad3,DC=local`.
   - **Username LDAP attribute**: `sAMAccountName`.
   - **RDN LDAP attribute**: `cn`.
   - **UUID LDAP attribute**: `objectGUID`.
   - **User object classes**: `person, organizationalPerson, user`.
   - **User LDAP filter**: өрісті бос қалдырыңыз.
   - **Search scope**: `Subtree`.
   - **Read timeout**: өрісті бос қалдырыңыз.
   - **Pagination**: `Off`.
   - **Referral**: таңдалмаған.

1. **Synchronization settings** блогында параметр мәндерін орнатыңыз:

   - **Import users**: `On`.
   - **Sync Registrations**: `On`.
   - **Batch size**: өрісті бос қалдырыңыз.
   - **Periodic full sync**: `On`.
   - **Periodic changed users sync**: `On`.

1. **Kerberos integration** блогында барлық параметр үшін `Off` мәнін таңдаңыз.
1. **Cache settings** блогында **Cache policy** параметрі үшін `DEFAULT` мәнін қалдырыңыз.
1. **Advanced settings** блогында барлық параметр үшін `Off` мәнін таңдаңыз.
1. Баптауларды сақтаңыз.

## 2. Мапперлерді (mapper) баптаңыз

1. **User federation** бөлімінде жасалған LDAP-провайдердің атауын басып, **Mappers** қойындысына өтіңіз.
1. **Add mapper** түймесін басыңыз.
1. Жаңа маппердің атын беріп, тізімнен `group-ldap-mapper` түрін таңдаңыз.
1. Маппер параметрлерін орнатыңыз:

   - **LDAP Groups DN**: AD-та топтарды іздеу жолын көрсетіңіз, мысалы `CN=Groups,DC=test,DC=local`.
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

1. Баптауларды сақтаңыз.
1. **Add mapper** түймесін басыңыз.
1. Жаңа маппердің атын беріп, тізімнен `user-attribute-ldap-mapper` түрін таңдаңыз.
1. Маппер параметрлерін орнатыңыз:

   - **User Model Attribute**: `username`.
   - **LDAP Attribute**: `cn`.
   - **Read Only**: `On`.
   - **Always Read Value From LDAP**: `Off`.
   - **Is Mandatory In LDAP**: `Off`.
   - **Force a Default Value**: `Off`.
   - **Is Binary Attribute**: `Off`.

1. Баптауларды сақтаңыз.
1. Бұрын жасалған `group-ldap-mapper` түріндегі маппер атауын басыңыз.
1. **Action** тізімінен **Sync LDAP groups to Keycloak** тармағын таңдаңыз.
1. Бүйірлік мәзірде **Groups** бөліміне өтіп, топтар жүктелгеніне және пайдаланушыларды қамтитынына көз жеткізіңіз.

## 3. Keycloak үшін клиент жасаңыз

1. Бүйірлік мәзірде **Clients** бөліміне өтіңіз.
1. **Create client** түймесін басып, параметрлерді орнатыңыз:

   - **Client type**: `SAML`.
   - **Client ID**: SAML аутентификация сервисіндегі қолданбаңыздың бірегей идентификаторын көрсетіңіз.
   - **Name**, **Description**: өрістерді бос қалдырыңыз.
   - **Always display in UI**: `Off`.

1. **Next** түймесін басыңыз.
1. **Valid redirect URIs** параметрі үшін `*` мәнін көрсетіңіз, қалған өрістерді бос қалдырыңыз.
1. Баптауларды сақтаңыз.

## 4. Клиент үшін мапперлерді баптаңыз

1. Жасалған клиент бетінде **Keys** қойындысына өтіңіз.
1. **Client signature required** параметрі үшін `Off` мәнін орнатыңыз.
1. **Client scopes** қойындысына өтіңіз.
1. Тізімде атауына `-dedicated` постфиксі қосылған жасалған клиенттің атын басыңыз.
1. **Configure a new mapper** түймесін басыңыз.
1. **Group List** түймесін басып, параметрлерді орнатыңыз:

   - **Name**: жаңа маппердің атын беріңіз.
   - **Group attribute name**: `memberOf`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Single Group Attribute**: `On`.
   - **Full group path**: `Off`.

1. Баптауларды сақтаңыз.

1. Тағы бір маппер қосу үшін артқа көрсеткіні басыңыз.
1. **Add mapper** тізімінен **By configuration** тармағын таңдаңыз.
1. **User Attribute** түймесін басып, параметрлерді орнатыңыз:

   - **Name**: жаңа маппердің атын беріңіз.
   - **User Attribute**: `LDAP_ID`.
   - **SAML Attribute Name**: `ldapUUID`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Aggregate attribute values**: `Off`.

1. Баптауларды сақтаңыз.

## 5. Keycloak баптауын аяқтаңыз

1. Бүйірлік мәзірде **Realm Settings** бөліміне өтіңіз.
1. **Require SSL** параметрі үшін `None` мәнін орнатыңыз.
1. **Endpoints** блогында **SAML 2.0 Identity Provider Metadata** сілтемесін көшіріңіз. [SAML сервисі арқылы екі факторлы аутентификацияны](../../instructions/config/setup-saml) баптау кезінде оны **URL метаданных** параметрінің мәні ретінде көрсету керек.
1. Бүйірлік мәзірде **User Federation** бөліміне өтіп, жасалған LDAP-провайдердің атын басыңыз.
1. **Action** тізімінен **Sync all users** тармағын таңдаңыз.

Keycloak баптауы аяқталды.
