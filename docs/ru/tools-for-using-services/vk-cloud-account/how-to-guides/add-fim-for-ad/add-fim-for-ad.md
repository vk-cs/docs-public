К VK Cloud можно подключить ваш поставщик удостоверений (Identity Provider). Это позволит вашим сотрудникам заходить в VK Cloud без ввода логина и пароля, используя корпоративные аутентификационные данные поставщика удостоверений. Такой режим называется федерация удостоверений.

Для работы в режиме федерации поставщик удостоверений должен поддерживать стандарт SAML 2.0.

Далее будет показана настройка федерации удостоверений на примере [службы федерации Active Directory](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-overview) (AD FS).

{note:info}

При смене домена Active Directory удалите существующую федерацию и настройте новую.

{/note}

## Подготовительные шаги

1. [Настройте](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-deployment) AD FS, [создайте](https://learn.microsoft.com/en-us/powershell/module/activedirectory/add-adgroupmember?view=windowsserver2022-ps) пользователей и группы.
1. [Экспортируйте](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/troubleshooting/ad-fs-tshoot-endpoints#federation-metadata-test) XML-файл с метаданными вашей AD FS.

## 1. Создайте федерацию удостоверений в VK Cloud

Операции по созданию федерации удостоверений VK Cloud доступны только пользователям с [ролью](../../../account/concepts/rolesandpermissions) владельца проекта.

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Федерация удостоверений**.
1. Перейдите на вкладку **Федерации**.
1. Нажмите кнопку **Создать**.
1. Загрузите XML-файл с метаданными вашей AD FS и нажмите кнопку **Создать**.
1. После создания федерации удостоверений будет сформирован XML-файл для настройки отношения доверия с проверяющей стороной (relying party trust). Скачайте файл для загрузки на стороне поставщика удостоверений.

На вкладке **Федерации** появятся данные федерации:

- URL для входа федеративных пользователей в личный кабинет VK Cloud, например: `https://cloud.vk.com/v1/federation/saml/54f0267b-31f6-XXXX-XXX-2a24c5f436fb/signin`.
- ID федерации, например: `54f0267b-31f6-XXXX-XXX-2a24c5f436fb`.

## 2. Настройте AD FS

1. [Создайте отношение доверия](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/operations/create-a-relying-party-trust#to-create-a-claims-aware-relying-party-trust-using-federation-metadata) с помощью метаданных федерации. Используйте XML-файл с метаданными, полученный при создании федерации.
1. Настройте соответствие между атрибутами пользователя и типами исходящих утверждений AD FS (Claims Mapping), для этого [добавьте](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/checklist--creating-claim-rules-for-a-relying-party-trust) правила:

   - Преобразование входящего утверждения ([Transform an Incoming Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-transform-an-incoming-claim)):

      - **Type**: `Transform an Incoming Claim`.
      - **Claim rule name**: `Name ID`.
      - **Incomming claim type**: `Windows account name`.
      - **Outgoing claim type**: `Name ID`.
      - **Outgoing name ID format**: `Windows Qualified Domain Name`.
   - Отправка атрибутов пользователя ([Send LDAP Attributes as Claims](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-ldap-attributes-as-claims)):

      - **Type**: `Send LDAP Attributes as Claims`.
      - **Claim rule name**: `Attributes`.
      - **Attribute store**: `Active Directory`.
      - **Mapping of LDAP attributes to outgoing claim types**: установите следующие соответствия:

         - `E-Mail-Adresses` → `E-Mail Address`.
         - `SAM-Account-Name` → `Subject Name`.
         - `Given-Name` → `Name`.
         - `Surname` → `Surname`.
         - `Telephone-Number` → `phone_number`.
   - Отправка членства в группах ([Send Group Membership as a Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-group-membership-as-a-claim)):

      - **Type**: `Send Group Membership as a Claim`.
      - **Claim rule name**: `<НАЗВАНИЕ_ГРУППЫ>` (например, `Domain Users`).
      - **User’s group**: `<ДОМЕН>\<НАЗВАНИЕ_ГРУППЫ>`.
      - **Outgoing claim type**: `Group`.
      - **Outgoing claim value**: `<НАЗВАНИЕ_ГРУППЫ>`.

## 3. Настройте связь групп и ролей в VK Cloud

Операции по настройке связи групп AD FS и ролей VK Cloud доступны только следующим [ролям](../../../account/concepts/rolesandpermissions) личного кабинета: владельцу, суперадминистратору и администратору пользователей (IAM). Просмотр связей доступен также администратору проекта и наблюдателю.

1. [Перейдите](https://cloud.vk.com/account) в аккаунт VK Cloud.
1. Перейдите в раздел **Федерация удостоверений**.
1. Перейдите на вкладку **Группы**.
1. Нажмите на название проекта, для которого настраивается федерация удостоверений.
1. Добавьте группы, которые используете в Active Directory:

   1. Нажмите кнопку **Добавить**. Если на странице уже есть созданные группы, нажмите кнопку **Добавить группу**.
   1. Настройте группу:

      - **Имя группы**: укажите название группы Active Directory, в которой состоит пользователь. Название должно совпадать с полем **Outgoing claim value** правил AD FS, настроенных ранее.
      - **Разрешения**:
         - Выберите **Проект**, чтобы связать группу и роли в рамках одного проекта. В разных проектах можно связать одну и ту же группу с разными ролями, что позволит разграничить уровень доступа федеративного пользователя к проектам.
         - Выберите **Домен**, чтобы связать группу и роли во всех проектах одного владельца и предоставить федеративному пользователю единый уровень доступа к ним. Разрешение **Домен** доступно только владельцу проекта.
      - **Роли группы**: выберите те [роли VK Cloud](../../../account/concepts/rolesandpermissions), которые соответствуют вашей матрице доступа для создаваемой группы.

   1. Нажмите кнопку **Добавить**.

## 4. Проверьте возможность входа через федерацию

1. Введите в строку браузера URL для входа федеративных пользователей. Вы будете перенаправлены на страницу аутентификации AD FS.
1. Введите свои корпоративные аутентификационные данные. После успешной авторизации вы будете перенаправлены на главную страницу личного кабинета VK Cloud.
1. Проверьте, что автоматически назначенная роль пользователя VK Cloud соответствует выбранной при [добавлении группы](#3_nastroyte_svyaz_grupp_i_roley_v_vk_cloud).

{note:warn}

Active Directory автоматически не синхронизируется с VK Cloud. После блокировки пользователя в Active Directory [удалите](/ru/tools-for-using-services/account/instructions/project-settings/access-manage#udalenie_uchastnika) его из проектов в личном кабинете VK Cloud.

{/note}
