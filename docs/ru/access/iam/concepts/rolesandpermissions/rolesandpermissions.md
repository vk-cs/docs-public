# {heading(Роли и права пользователей личного кабинета)[id=tools-account-concepts-rolesandpermissions]}

Сразу после создания {linkto(../projects#tools-account-concepts-projects)[text=проекта]} в нем присутствует только один пользователь — его владелец. Владелец может пригласить в проект других участников, назначив им роли. Роль определяет список доступных {linkto(#rolesandpermissions-permissions)[text=прав]} при работе с функциональностью личного кабинета и с облачными сервисами.

*Роль* — это определенный набор разрешений на выполнение операций с ресурсами VK Cloud.

Кроме пользователей, в проект также могут быть добавлены {linkto(../service-accounts#tools-account-concepts-service-accounts)[text=сервисные учетные записи]} (СУЗ), предназначенные для взаимодействия между программами и сервисами. Для СУЗ назначаются любые из приведенных ниже ролей, за исключением роли `Владелец проекта`.

Список участников проекта и назначенных им ролей можно {linkto(../../instructions/project-settings/access-manage#tools-account-project-access-manage)[text=посмотреть]} на странице **Управление доступами** личного кабинета.

У каждой роли личного кабинета есть техническое название, которое используется для управления проектом и сервисами через {linkto(../../../api#tools-api)[text=API]} и {linkto(../../../terraform#tools-terraform)[text=Terraform]}.

Для более гибкого управления доступом используются роли с ограниченным набором прав и разрешения. С полным списком ролей и разрешений вы можете ознакомиться в разделе [IAM](../../../../access/iam):

- [Справочник ролей](../../../../access/iam/concepts/roles-reference).
- [Справочник разрешений](../../../../access/iam/concepts/permissions-reference).

## {heading(Роли для общего управления проектом)[id=rolesandpermissions-general]}

- название в личном кабинете, которое используется для назначения или удаления роли через графический интерфейс;
- техническое название, которое используется для управления проектом и сервисами через [API](/ru/tools-for-using-services/api) и [Terraform](/ru/tools-for-using-services/terraform).

{cut(Примеры)}

[cols="1,1", options="header"]
|===
| Роль
| Техническое название роли
| Описание

| Владелец проекта
| `mcs_owner`
| Пользователь с максимально широким набором прав.

Владельцем становится пользователь, который создал проект, либо для которого проект был создан платформой при регистрации аккаунта.

В проекте может быть только один владелец. Эту роль нельзя назначить или пригласить на нее

| Суперадминистратор
| `mcs_co_owner`
| Пользователь с тем же набором прав, что владелец, включая привязку карты и пополнение баланса

| Администратор проекта
| `mcs_admin`
| Пользователь с полным набором прав на создание и редактирование объектов во всех сервисах.

Администратор не может:

- активировать сервисы;
- пополнять баланс проекта (ему доступен только просмотр баланса);
- приглашать пользователей

| Администратор пользователей (IAM)
|`mcs_admin_security`
| Роль, предназначенная для {linkto(../../instructions/project-settings/access-manage#tools-account-project-access-manage)[text=работы с участниками проекта]} на странице управления доступами.

Администратор пользователей (IAM) может приглашать участников в проект и удалять их из проекта, редактировать назначенные участникам роли.

Сервисы и информация о балансе проекта этой роли недоступны

| Администратор биллинга
| `mcs_admin_billing`

| Управление группами домена
| `domain_groups_modify`

- {linkto(../../../../intro/billing/instructions/add-card#billing-add-card)[text=привязать]} к проекту карту оплаты, если она еще не привязана;
- {linkto(../../../../intro/billing/instructions/payment#billing-payment)[text=пополнить]} баланс проекта или настроить автопополнение.

Сервисы и список участников проекта этой роли недоступны

| Наблюдатель
|`mcs_viewer`
| Пользователь, который имеет полные разрешения на просмотр информации в проекте, включая список участников, данные всех сервисов, баланс проекта и детализацию расходов.

Наблюдатель не может создавать объекты и редактировать что-либо, кроме настроек своего аккаунта
|===

## {heading(Специализированные роли)[id=rolesandpermissions-special]}

Один и тот же пользователь может быть участником нескольких проектов и иметь в них разные роли и разрешения. Одному участнику может быть назначено несколько ролей и разрешений в одном проекте, в этом случае права суммируются.

Кроме пользователей, в проект также могут быть добавлены [сервисные учетные записи](/ru/access/iam/concepts/service-accounts) (СУЗ), предназначенные для взаимодействия между программами и сервисами. Для СУЗ назначаются любые роли и разрешения, за исключением роли `Владелец проекта`.

Список участников проекта и назначенных им ролей и разрешений можно [посмотреть](/ru/access/iam/instructions/access-manage) на странице **Управление доступами** личного кабинета.

Подробные сведения о разрешениях этих ролей в разделе {linkto(#rolesandpermissions-permissions)[text=%text]}.

Все операции, доступные специализированным ролям, доступны также владельцу проекта, суперадминистратору и администратору проекта.

[cols="1,1,3", options="header"]
|===
| Роль
| Техническое название роли
| Описание

| Администратор виртуальных машин
| `mcs_admin_vm`
| Пользователь с этой ролью может выполнять основные операции в сервисе Cloud Servers.

При этом ему доступен только просмотр для:

- планов резервного копирования;
- файловых хранилищ.

В сервисе виртуальных сетей он может создавать и редактировать группы безопасности

| Младший администратор ВМ
| `mcs_admin_vm_junior`
| Пользователь с этой ролью может выполнять те же операции, что и администратор виртуальных машин, за исключением создания, редактирования и удаления правил и групп безопасности

| Оператор виртуальных машин
| `mcs_operator_vm`
| Пользователь с этой ролью может работать на виртуальной машине, но не может управлять ее настройками.

Оператор ВМ может:

- запустить или остановить ВМ;
- работать в ВМ через {linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=VNC-консоль]};
- подключаться к ВМ через {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=SSH]} или {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=RDP]};
- просматривать конфигурацию и сетевые настройки ВМ.

Оператор ВМ не может создавать резервные копии

| Администратор сети
| `mcs_admin_network`
| Пользователь с этой ролью может выполнять полный набор операций в сервисах виртуальных сетей и DNS

| Администратор сетевой безопасности
| `mcs_admin_network_security`
| Пользователь с этой ролью может просматривать все данные в сервисах виртуальных сетей и DNS.

Кроме этого, пользователь может только создавать и редактировать группы безопасности

| Администратор внутренних сетей
| `mcs_admin_network_objects`
| Пользователь с этой ролью может:

- просматривать все данные в сервисах виртуальных сетей и DNS;
- создавать и редактировать виртуальные сети и подсети, маршрутизаторы;
- добавлять в проект Floating IP

| Администратор Kubernetes
| `mcs_k8s_admin`
| Подробная информация о роли в разделе {linkto(#rolesandpermissions-k8s)[text=%text]}

| Оператор Kubernetes
| `mcs_k8s_editor`
| Подробная информация о роли в разделе {linkto(#rolesandpermissions-k8s)[text=%text]}

| Аудитор Kubernetes
| `mcs_k8s_viewer`
| Подробная информация о роли в разделе {linkto(#rolesandpermissions-k8s)[text=%text]}
|===

## {heading(Права для всех ролей)[id=rolesandpermissions-permissions]}

Каждой роли соответствует определенный набор прав на выполнение операций.

![Схема ролей и разрешений](assets/roles_and_permissions_full.png){params[noBorder=true]}

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

- [администратор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_admin),
- [оператор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_editor),
- [аудитор Kubernetes](/ru/access/iam/concepts/roles-reference#mcs_k8s_viewer).

Операции, доступные администратору Kubernetes, доступны также [владельцу проекта](/ru/access/iam/concepts/roles-reference#mcs_owner), [суперадминистратору](/ru/access/iam/concepts/roles-reference#mcs_co_owner) и [администратору проекта](/ru/access/iam/concepts/roles-reference#mcs_admin).

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
