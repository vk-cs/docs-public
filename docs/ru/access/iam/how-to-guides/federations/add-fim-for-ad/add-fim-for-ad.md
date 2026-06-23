# {heading(Настройка федерации удостоверений через Active Directory)[id=vk-cloud-account-ad-fim]}

К {var(cloud)} можно подключить ваш поставщик удостоверений (Identity Provider). Это позволит вашим сотрудникам заходить в {var(cloud)} без ввода логина и пароля, используя корпоративные аутентификационные данные поставщика удостоверений. Такой режим называется федерация удостоверений.

Для работы в режиме федерации поставщик удостоверений должен поддерживать стандарт SAML 2.0.

Далее будет показана настройка федерации удостоверений для входа в {var(cloud)} на примере [службы федерации Active Directory](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-overview) (AD FS).

{note:info}
Чтобы настроить вход на портал технической поддержки {var(cloud)} с помощью федерации удостоверений, ознакомьтесь с {linkto(../../../../access/iam/instructions/support-fim#vk-cloud-account-support-fim)[text=инструкцией]}.
{/note}

## {heading(Подготовительные шаги)[id=vk-cloud-account-ad-fim-prepare]}

1. [Настройте](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-deployment) AD FS, [создайте](https://learn.microsoft.com/en-us/powershell/module/activedirectory/add-adgroupmember?view=windowsserver2022-ps) пользователей и группы.
1. [Экспортируйте](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/troubleshooting/ad-fs-tshoot-endpoints#federation-metadata-test) XML-файл с метаданными вашей AD FS.

## {heading({counter(ad-fim)}. Создайте федерацию удостоверений в {var(cloud)})[id=vk-cloud-account-ad-fim-create]}

{include(../../../../../_includes/_create-fim.md)[tags=ad-fs]}

{note:info}

При смене домена Active Directory удалите существующую федерацию и настройте новую.

{/note}

## {heading({counter(ad-fim)}. Настройте AD FS)[id=vk-cloud-account-ad-fim-set]}

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

## {heading({counter(ad-fim)}. Настройте связь групп и ролей в {var(cloud)})[id=vk-cloud-account-ad-fim-connect]}

Операции по настройке связи групп AD FS и ролей {var(cloud)} доступны только следующим {linkto(../../../account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=ролям]} личного кабинета: владельцу, суперадминистратору и администратору пользователей (IAM). Просмотр связей доступен также администратору проекта и наблюдателю.

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Федерация удостоверений**.
1. Перейдите на вкладку **Группы**.
1. Нажмите на название проекта, для которого настраивается федерация удостоверений.
1. Добавьте группы, которые используете в Active Directory:

   1. Нажмите кнопку **Добавить**. Если на странице уже есть созданные группы, нажмите кнопку **Добавить группу**.
   1. Настройте группу:

      - **Имя группы**: укажите название группы Active Directory, в которой состоит пользователь. Название должно совпадать с полем **Outgoing claim value** правил AD FS, настроенных ранее, но обязательно должно быть в нижнем регистре.
      - **Разрешения**:

        - Выберите **Проект**, чтобы связать группу и роли в рамках одного проекта. В разных проектах можно связать одну и ту же группу с разными ролями, что позволит разграничить уровень доступа федеративного пользователя к проектам.
        - Выберите **Домен**, чтобы связать группу и роли во всех проектах одного владельца и предоставить федеративному пользователю единый уровень доступа к ним. Разрешение **Домен** доступно только владельцу проекта.

      - **Роли группы**: выберите те {linkto(../../../account/concepts/rolesandpermissions#tools-account-concepts-rolesandpermissions)[text=роли {var(cloud)}]}, которые соответствуют вашей матрице доступа для создаваемой группы.

   1. Нажмите кнопку **Добавить**.

## {heading({counter(ad-fim)}. Проверьте возможность входа через федерацию)[id=vk-cloud-account-ad-fim-check]}

1. [Перейдите](https://cloud.vk.com/account) в аккаунт {var(cloud)}.
1. Перейдите в раздел **Федерация удостоверений** на вкладку **Федерации**.
1. Скопируйте значение из параметра **URL для входа федеративных пользователей**.
1. Вставьте в строку браузера полученный URL. Вы будете перенаправлены на страницу аутентификации AD FS.
1. Введите свои корпоративные аутентификационные данные. После успешной авторизации вы будете перенаправлены на главную страницу личного кабинета {var(cloud)}.
1. Проверьте, что автоматически назначенная роль пользователя {var(cloud)} соответствует выбранной при {linkto(#vk-cloud-account-ad-fim-connect)[text=добавлении группы]}.

{note:warn}
Active Directory автоматически не синхронизируется с {var(cloud)}. После блокировки пользователя в Active Directory {linkto(../../../account/instructions/project-settings/access-manage#project-access-delete-user)[text=удалите]} его из проектов в личном кабинете {var(cloud)}.
{/note}
