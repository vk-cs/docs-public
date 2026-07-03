# {heading(Управление доступом)[id=k8s-concepts-iam]}

Чтобы разграничить права для {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=приглашенных]} участников {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} или {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=сервисных учетных записей]}, в Cloud Containers используется единый сервис управления идентификацией и доступом — {linkto(../../../../access/iam#iam)[text=IAM]}. Управлять доступами можно централизованно из личного кабинета {var(cloud)}.

Список доступных участнику проекта действий в сервисе Cloud Containers определяет:

- Присвоенная {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference#iam-roles-reference-basic)[text=базовая роль]} — задает набор действий, доступных по умолчанию.

  Базовые роли `Владелец проекта`, `Суперадминистратор` и `Администратор проекта` получают полный доступ ко всем операциям во всех сервисах.

- Отдельная {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированная роль]} — {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначается]} дополнительно, если прав, входящих в базовую роль, недостаточно. Настройка отдельных {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=разрешений]} для Cloud Containers не поддерживается.

  {note:info}
  Доступы, предоставляемые вместе с базовой ролью, имеют приоритет над отдельными специализированными ролями.
  {/note}

При выдаче ролей придерживайтесь принципа минимальных привилегий: пользователь должен иметь только те права, без которых невозможно выполнить его задачи.

## {heading(Специализированные роли)[id=k8s-concepts-iam-special-roles]}

{note:info}
Специализированные роли могут {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=назначать]} только участники проекта с ролями `Владелец проекта`, `Суперадминистратор` и `Администратор пользователей (IAM)`.
{/note}

Для сервиса Cloud Containers доступно несколько {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=специализированных ролей]}, которые можно использовать дополнительно к {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=базовым ролям]} `Администратор пользователей (IAM)` или `Наблюдатель`. По умолчанию доступ к Cloud Containers у этих базовых ролей ограничен:

- `Администратор пользователей (IAM)`: нет доступа.
- `Наблюдатель`: просмотр информации о кластере и группах узлов, получение секрета для доступа в Kubernetes Dashboard.

### {heading(mcs_k8s_viewer)[id=k8s-concepts-iam_viewer]}

{include(/ru/_includes/_iam_k8s.md)[tags=k8s-viewer]}

### {heading(mcs_k8s_editor)[id=k8s-concepts-iam_editor]}

{include(/ru/_includes/_iam_k8s.md)[tags=k8s-editor]}

### {heading(mcs_k8s_admin)[id=k8s-concepts-iam_admin]}

{include(/ru/_includes/_iam_k8s.md)[tags=k8s-admin]}

## {heading(Взаимосвязь ролей личного кабинета и Kubernetes)[id=k8s-concepts-iam-k8s-roles]}

Пользователь {linkto(../access-management#k8s-access-management)[text=аутентифицируется]} в кластере Kubernetes с теми же реквизитами, что и при входе в личный кабинет {var(cloud)}, с помощью технологии единого входа (Single Sign-On, SSO). Каждая специализированная роль — администратора, оператора или аудитора Kubernetes — также определяет доступную пользователю внутреннюю [роль Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles). Роль Kubernetes отвечает за то, какие объекты кластера доступны пользователю, и какие действия разрешено выполнять над этими объектами.

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