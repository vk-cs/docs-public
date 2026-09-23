# {heading(Управление доступом)[id=mk8s-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Managed Containers используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Managed Containers определяет:

- {linkto(#mk8s-concepts-iam-basic-roles)[text=Базовая роль]} — определяет права пользователя на уровне всех сервисов {var(cloud)}.
- {linkto(#mk8s-concepts-iam-special-roles)[text=Специализированная роль]} — определяет права пользователя на уровне отдельных сервисов {var(cloud)}.

Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Managed Containers не поддерживается.

Роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`. Выбирая роли, придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Базовые роли)[id=mk8s-concepts-iam-basic-roles]}

Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям Managed Containers, настраивать отдельные роли не нужно.

### {heading(mcs_owner)[id=mk8s-concepts-iam-basic-roles-mcs_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=mk8s-concepts-iam-basic-roles-mcs_co_owner]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=mk8s-concepts-iam-basic-roles-mcs_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=mk8s-concepts-iam-basic-roles-mcs_admin_security]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=mk8s-concepts-iam-basic-roles-mcs_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Специализированные роли)[id=mk8s-concepts-iam-special-roles]}

Для сервиса Managed Containers доступно несколько {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}, которые можно использовать вместе с {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базовой ролью]} или самостоятельно.

### {heading(mcs_k8s_viewer)[id=mk8s-concepts-iam_viewer]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=mk8s-concepts-iam_editor]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=mk8s-concepts-iam_admin]}

{include(/ru/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

## {heading(Взаимосвязь ролей личного кабинета и Kubernetes)[id=mk8s-concepts-iam-k8s-roles]}

Пользователь {linkto(../access-management#mk8s-access-management)[text=аутентифицируется]} в кластере Kubernetes с теми же реквизитами, что и при входе в личный кабинет {var(cloud)}, с помощью технологии единого входа (Single Sign-On, SSO). Каждая специализированная роль — администратора, оператора или аудитора Kubernetes — также определяет доступную пользователю внутреннюю [роль Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles). Роль Kubernetes отвечает за то, какие объекты кластера доступны пользователю, и какие действия разрешено выполнять над этими объектами.

Чтобы просмотреть список доступных ресурсов для роли, подключитесь к кластеру и выполните команду:

```console
kubectl describe clusterrole <РОЛЬ_В_KUBERNETES>
```

{tabs}

{tab(Аудитор Kubernetes)}

Роль в Kubernetes: `view`.

Роль предоставляет доступ на чтение к большинству объектов в пространстве имен.

Роль не предоставляет:

- Доступ на просмотр или изменение ролей и связывания ролей.
- Доступ к секретам.

  Пользователь с доступом к секретам может получить доступ к учетным данным любого сервисного аккаунта в пространстве имен. Это позволит получить доступ к API от имени любого сервисного аккаунта в пространстве имен. Для роли с правами «только чтение» это будет расцениваться как превышение привилегий (privilege escalation).

{/tab}

{tab(Оператор Kubernetes)}

Роль в Kubernetes: `edit`.

Роль предоставляет:

- Доступ на чтение и запись к большинству объектов в пространстве имен.
- Доступ к секретам, что позволяет запускать поды от имени любого сервисного аккаунта в пространстве имен. Роль может быть использована, например, чтобы получить доступ к API.

Роль не предоставляет:

- Доступ на просмотр или изменение ролей и связывания ролей.
- [Доступ на запись к эндпоинтам](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) кластеров Kubernetes версии 1.22 и выше.

{/tab}

{tab(Администратор Kubernetes)}

Роль в Kubernetes: `admin`.

Рекомендуется назначать роль `admin` в пределах пространства имен с помощью связывания ролей.

Роль предоставляет:

- Доступ на чтение и запись к большинству объектов в пространстве имен, включая возможность создавать другие роли и связывания ролей (role binding).
- Доступ к секретам, что позволяет запускать поды от имени любого сервисного аккаунта в пространстве имен. Роль может быть использована, например, чтобы получить доступ к API.

Роль не предоставляет:

- Доступ на запись к ресурсной квоте (resource quota) или к самому пространству имен.
- [Доступ на запись к эндпоинтам](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#write-access-for-endpoints) кластеров Kubernetes версии 1.22 и выше.

Если администратор Kubernetes отключит учетную запись пользователя или отзовет его роль в личном кабинете, права этого пользователя на доступ к кластерам Kubernetes будут также отозваны.

{/tab}

{/tabs}