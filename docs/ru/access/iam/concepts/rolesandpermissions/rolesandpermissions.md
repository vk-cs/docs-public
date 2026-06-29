# {heading(Ролевая модель управления доступом)[id=iam-concepts-rolesandpermissions]}

Сразу после создания {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=проекта]} в нем присутствует только один пользователь — его владелец. Этот пользователь может {linkto(../../../../tools-for-using-services/account/instructions/project-settings/invite#tools-account-project-invite)[text=приглашать]} в проект других участников, назначив им роли и разрешения. Роли и разрешения определяют доступные пользователю права при работе с функциональностью личного кабинета и с облачными сервисами.

*Роль* — это определенный набор разрешений на выполнение операций с ресурсами VK Cloud.

*Разрешение* позволяет пользователю выполнять только одну операцию в определенном сервисе или компоненте.

С полным списком ролей и разрешений вы можете ознакомиться в справочниках:

- {linkto(../access/iam/concepts/roles-reference#iam-roles-reference)[text=Справочник ролей]}.
- {linkto(../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=Справочник разрешений]}.

У каждой роли и каждого разрешения есть:

- название в личном кабинете, которое используется для назначения или удаления роли через графический интерфейс;
- техническое название, которое используется для управления проектом и сервисами через {linkto(../../../api#tools-api)[text=API]} и {linkto(../../../terraform#tools-terraform)[text=Terraform]}.

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

Кроме пользователей, в проект также могут быть добавлены {linkto(../service-accounts#iam-concepts-service-accounts)[text=сервисные учетные записи]} (СУЗ), предназначенные для взаимодействия между программами и сервисами. Для СУЗ назначаются любые роли и разрешения, за исключением роли `Владелец проекта`.

Список участников проекта и назначенных им ролей и разрешений можно {linkto(../access/iam/instructions/access-manage#iam-access-manage)[text=посмотреть]} на странице **Управление доступами** личного кабинета.

Для некоторых сервисов существуют особые наборы прав. Далее приведены такие наборы прав и то, как они соотносятся с  ролями VK Cloud.

## {heading(Права в сервисе Cloud Logging)[id=rolesandpermissions-logging]}

[cols="2,1,1,1", options="header"]
|===
|Роли
|Просмотр логов и конфигурации сервиса
|Изменение настроек логов
|Создание сервисных пользователей и названий сервисов

|Владелец проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперадминистратор
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор биллинга
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Наблюдатель
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор, младший администратор, оператор ВМ
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор сети
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор сетевой безопасности
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор внутренних сетей
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

## {heading(Права в сервисе Cloud Monitoring)[id=rolesandpermissions-monitoring]}

[cols="2,1,1,1,1", options="header"]
|===
|Роли
|Просмотр дашбордов
|Просмотр метрик Prometheus
|Запись в систему мониторинга
|Создание и редактирование дашбордов

|Владелец проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперадминистратор
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор пользователей (IAM)
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор биллинга
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Наблюдатель
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор, младший администратор
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Оператор ВМ
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор сети
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор сетевой безопасности
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор внутренних сетей
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
|===

## {heading(Права в сервисе Cloud Audit)[id=rolesandpermissions-audit]}

[cols="2,2,1,1", options="header"]
|===
|Роли
|Просмотр событий
|Выгрузка данных
|Настройка сервиса

|Владелец проекта
| Все события проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Суперадминистратор
| Все события проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор проекта
| Все события проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

|Администратор пользователей (IAM)
| Все события сервиса IAM и все свои действия
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор биллинга
| Все события сервиса Billing и все свои действия
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Наблюдатель
| Все события проекта
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор, младший администратор
| Все события проекта
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Оператор ВМ
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор сети
| Все события сервиса Cloud Network и все свои действия
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор сетевой безопасности
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор внутренних сетей
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

|Администратор, оператор, аудитор Kubernetes
| Все события сервиса Cloud Containers и все свои действия
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===

## {heading(Права для ролей сервиса Cloud Containers)[id=rolesandpermissions-k8s]}

В личном кабинете доступны специализированные роли для работы с {linkto(../../../../kubernetes/k8s#k8s-k8s)[text=сервисом Cloud Containers]}:

- администратор Kubernetes,
- оператор Kubernetes,
- аудитор Kubernetes.

Операции, доступные администратору Kubernetes, доступны также владельцу проекта, суперадминистратору и администратору проекта.

Для остальных ролей эти операции недоступны.

Для кластеров Kubernetes версии 1.23 и выше роль администратора, оператора или аудитора Kubernetes также определяет доступную пользователю внутреннюю {linkto(../../../../kubernetes/k8s/concepts/access-management#k8s-access-management-kubernetes-roles)[text=роль Kubernetes]}.

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
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Удалить кластер
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Запустить кластер
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Остановить кластер
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Отобразить информацию о кластере, нод-группах
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Получить kubeconfig
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Получить секрет для доступа в Kubernetes Dashboard
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Обновить версию
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Изменить тип виртуальной машины
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Изменить размер диска Prometheus
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Добавить группу узлов
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Удалить группу узлов
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Изменить настройки масштабирования
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Изменить Labels и Taints
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")

| Установить и удалить аддон
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===

## {heading(Права в сервисе Security Gate)[id=rolesandpermissions-security-gate]}

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
