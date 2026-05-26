Сразу после создания [проекта](/ru/tools-for-using-services/account/concepts/projects) в нем присутствует только один пользователь — его [владелец](/ru/access/iam/concepts/roles-reference#mcs_owner). Этот пользователь может [приглашать](/ru/tools-for-using-services/account/instructions/project-settings/invite) в проект других участников, назначая им роли и разрешения. Роли и разрешения определяют доступные пользователю права при работе с функциональностью личного кабинета и с облачными сервисами.

*Роль* — это определенный набор разрешений на выполнение операций с ресурсами VK Cloud.

*Разрешение* позволяет пользователю выполнять только одну операцию в определенном сервисе или компоненте.

С полным списком ролей и разрешений вы можете ознакомиться в справочниках:

- [Справочник ролей](../../../../access/iam/concepts/roles-reference).
- [Справочник разрешений](../../../../access/iam/concepts/permissions-reference).

У каждой роли и каждого разрешения есть:

- название в личном кабинете, которое используется для назначения или удаления роли через графический интерфейс;
- техническое название, которое используется для управления проектом и сервисами через [API](/ru/tools-for-using-services/api) и [Terraform](/ru/tools-for-using-services/terraform).

{cut(Примеры)}

[cols="1,1", options="header"]
|===
| Название в личном кабинете
| Техническое название

| Владелец проекта
| `mcs_owner`

| Администратор биллинга
| `mcs_admin_billing`

| Управление группами домена
| `domain_groups_modify`

| Просмотр свойства инстанса Kafka
| `dp_kafka_instances_view`

|===

{/cut}

Один и тот же пользователь может быть участником нескольких проектов и иметь в них разные роли и разрешения. Одному участнику может быть назначено несколько ролей и разрешений в одном проекте, в этом случае права суммируются.

Кроме пользователей, в проект также могут быть добавлены [сервисные учетные записи](/ru/access/iam/concepts/service-accounts) (СУЗ), предназначенные для взаимодействия между программами и сервисами. Для СУЗ назначаются любые роли и разрешения, за исключением роли `Владелец проекта`.

Список участников проекта и назначенных им ролей и разрешений можно [посмотреть](/ru/access/iam/instructions/access-manage) на странице **Управление доступами** личного кабинета.

Для некоторых сервисов существуют особые наборы прав. Далее приведены такие наборы прав и то, как они соотносятся с  ролями VK Cloud.

## {heading(Права в сервисе Cloud Logging)[id=roles_logging]}

[cols="2,1,1,1", options="header"]
|===
|Роли
|Просмотр логов и конфигурации сервиса
|Изменение настроек логов
|Создание сервисных пользователей и названий сервисов

|Владелец проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Суперадминистратор
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор биллинга
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Наблюдатель
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор, младший администратор, оператор ВМ
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор сети
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор сетевой безопасности
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор внутренних сетей
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

## {heading(Права в сервисе Cloud Monitoring)[id=roles_monitoring]}

[cols="2,1,1,1,1", options="header"]
|===
|Роли
|Просмотр дашбордов
|Просмотр метрик Prometheus
|Запись в систему мониторинга
|Создание и редактирование дашбордов

|Владелец проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Суперадминистратор
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор биллинга
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Наблюдатель
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор, младший администратор
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Оператор ВМ
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор сети
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор сетевой безопасности
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор внутренних сетей
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

## {heading(Права в сервисе Cloud Audit)[id=roles_audit]}

[cols="2,2,1,1", options="header"]
|===
|Роли
|Просмотр событий
|Выгрузка данных
|Настройка сервиса

|Владелец проекта
| Все события проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Суперадминистратор
| Все события проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор проекта
| Все события проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Администратор пользователей (IAM)
| Все события сервиса IAM и все свои действия
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор биллинга
| Все события сервиса Billing и все свои действия
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Наблюдатель
| Все события проекта
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор, младший администратор
| Все события проекта
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Оператор ВМ
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор сети
| Все события сервиса Cloud Network и все свои действия
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор сетевой безопасности
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор внутренних сетей
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| Все события сервиса Cloud Containers и все свои действия
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
|===

## {heading(Права для ролей сервиса Cloud Containers)[id=roles_permissions_kubernetes]}

В личном кабинете доступны специализированные роли для работы с [сервисом Cloud Containers](/ru/kubernetes/k8s):

- [администратор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_admin),
- [оператор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_editor),
- [аудитор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_viewer).

Операции, доступные администратору Kubernetes, доступны также [владельцу проекта](/ru/access/iam/concepts/roles-reference#mcs_owner), [суперадминистратору](/ru/access/iam/concepts/roles-reference#mcs_co_owner) и [администратору проекта](/ru/access/iam/concepts/roles-reference#mcs_admin).

Для остальных ролей эти операции недоступны.

Для кластеров Kubernetes версии 1.23 и выше роль администратора, оператора или аудитора Kubernetes также определяет доступную пользователю внутреннюю [роль Kubernetes](/ru/kubernetes/k8s/concepts/access-management#vzaimosvyaz_roley_lichnogo_kabineta_i_kubernetes).

{note:info}

Некоторые действия доступны только в определенном состоянии кластера. Например, установка и удаление аддонов возможны, только если кластер запущен.

{/note}

[cols="2,1,1,1,1"]
|===
.2+| Операции
4+| Роли

| Администратор Kubernetes
| Оператор Kubernetes
| Аудитор Kubernetes
| Наблюдатель

| Создать кластер
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удалить кластер
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Запустить кластер
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Остановить кластер
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Отобразить информацию о кластере, нод-группах
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Получить kubeconfig
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Получить секрет для доступа в Kubernetes Dashboard
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

| Обновить версию
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Изменить тип виртуальной машины
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Изменить размер диска Prometheus
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Добавить группу узлов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Удалить группу узлов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Изменить настройки масштабирования
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Изменить Labels и Taints
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

| Установить и удалить аддон
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|===

## {heading(Права в сервисе Security Gate)[id=roles_security_gate]}

Сервис [Security Gate](https://cloud.vk.com/security-gate) в личном кабинете доступен для следующих ролей:

- владелец проекта,
- суперадминистратор,
- администратор проекта,
- администратор сетевой безопасности,
- администратор внутренних сетей,
- администратор виртуальных машин,
- младший администратор ВМ,
- оператор ВМ,
- наблюдатель.

Для остальных ролей сервис Security Gate не доступен.
