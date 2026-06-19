# {heading(Справочник разрешений)[id=iam-permissions-reference]}

Разрешения используются для тонкой настройки доступа, когда предустановленных [ролей доступа](/ru/access/iam/concepts/roles-reference) недостаточно.

Разрешение представляет собой гранулярную роль, которая позволяет пользователю в определенном сервисе или наборе компонентов выполнять конкретное действие:

- просматривать информацию о сервисе,
- создавать и изменять компоненты и ресурсы,
- удалять компоненты и ресурсы.

## {heading(Платформенные компоненты)[id=iam-permissions-platform]}

Управление основными компонентами VK Cloud, обеспечивающими работу [PaaS и IaaS-сервисов](/ru/start/concepts/architecture).

### {heading(cdn_delete)[id=cdn_delete]}

Название в личном кабинете: `Удаление CDN`.

Позволяет удалять конфигурации и прекращать работу узлов CDN.

### {heading(cdn_modify)[id=cdn_modify]}

Название в личном кабинете: `Управление CDN`.

Позволяет настраивать зоны доставки контента и параметры кеширования CDN.

### {heading(cdn_view)[id=cdn_view]}

Название в личном кабинете: `Просмотр CDN`.

Позволяет просматривать настройки CDN и статистику проходящего трафика.

### {heading(containers_delete)[id=containers_delete]}

Название в личном кабинете: `Удаление контейнеров`.

Предоставляет возможность удалять кластеры контейнеров и связанные с ними ресурсы.

### {heading(containers_modify)[id=containers_modify]}

Название в личном кабинете: `Управление контейнерами`.

Позволяет создавать кластеры контейнеров и связанные с ними ресурсы.

### {heading(containers_view)[id=containers_view]}

Название в личном кабинете: `Просмотр контейнеров`.

Позволяет просматривать список кластеров контейнеров и детальной информации о них.

### {heading(daas_delete)[id=daas_delete]}

Название в личном кабинете: `Удаление рабочих столов (DaaS)`.

Позволяет удалять инстансы виртуальных рабочих столов.

### {heading(daas_modify)[id=daas_modify]}

Название в личном кабинете: `Управление рабочими столами (DaaS)`.

Позволяет создавать и администрировать виртуальные рабочие столы пользователей.

### {heading(daas_view)[id=daas_view]}

Название в личном кабинете: `Просмотр рабочих столов (DaaS)`.

Позволяет просматривать список виртуальных рабочих столов и информацию об их состоянии.

### {heading(databases_delete)[id=databases_delete]}

Название в личном кабинете: `Удаление баз данных`.

Позволяет удалять базы данных и очищать хранилища данных.

### {heading(databases_modify)[id=databases_modify]}

Название в личном кабинете: `Управление базами данных`.

Позволяет создавать базы и хранилища данных.

### {heading(databases_view)[id=databases_view]}

Название в личном кабинете: `Просмотр баз данных`.

Позволяет просматривать список доступных баз данных и их характеристики.

### {heading(gpu_delete)[id=gpu_delete]}

Название в личном кабинете: `Удаление графических ускорителей (GPU)`.

Позволяет освобождать и удалять ресурсы графических ускорителей.

### {heading(gpu_modify)[id=gpu_modify]}

Название в личном кабинете: `Управление графическими ускорителями (GPU)`.

Позволяет подключать графические ускорители и изменять их параметры.

### {heading(gpu_view)[id=gpu_view]}

Название в личном кабинете: `Просмотр графических ускорителей (GPU)`.

Позволяет просматривать наличие и состояние ресурсов графических ускорителей.

### {heading(grm_delete)[id=grm_delete]}

Название в личном кабинете: `Удаление компонента GRM`.

Позволяет удалять глобальные модели разрешений и сбрасывать настройки управления ролями.

### {heading(grm_modify)[id=grm_modify]}

Название в личном кабинете: `Управление компонентом GRM`.

Позволяет настраивать глобальные модели разрешений и права доступа в них.

### {heading(grm_view)[id=grm_view]}

Название в личном кабинете: `Просмотр компонента GRM`.

Позволяет просматривать текущую структуру прав и ролей платформы.

### {heading(hotbox_delete)[id=hotbox_delete]}

Название в личном кабинете: `Удаление компонента Hotbox`.

Позволяет удалять данные и очищать пространства в хранилище горячих данных Hotbox.

### {heading(hotbox_modify)[id=hotbox_modify]}

Название в личном кабинете: `Управление компонентом Hotbox`.

Позволяет управлять настройками и объектами в хранилище горячих данных Hotbox.

### {heading(hotbox_view)[id=hotbox_view]}

Название в личном кабинете: `Просмотр компонента Hotbox`.

Позволяет просматривать содержимое и структуру хранилища горячих данных Hotbox.

### {heading(Infra_delete)[id=Infra_delete]}

Название в личном кабинете: `Удаление инфраструктуры`.

Позволяет безвозвратно удалять ресурсы и объекты инфраструктуры (компонент `infra`).

### {heading(Infra_modify)[id=Infra_modify]}

Название в личном кабинете: `Управление инфраструктурой`.

Позволяет изменять параметры ресурсов и объектов инфраструктуры (компонент `infra`).

### {heading(Infra_view)[id=Infra_view]}

Название в личном кабинете: `Просмотр инфраструктуры`.

Позволяет просматривать текущее состояние ресурсов и объектов инфраструктуры (компонент `infra`).

### {heading(marketplace_delete)[id=marketplace_delete]}

Название в личном кабинете: `Удаление из магазина приложений (Marketplace)`.

Позволяет удалять предложения и позиции из каталога магазина приложений.

### {heading(marketplace_modify)[id=marketplace_modify]}

Название в личном кабинете: `Управление магазином приложений (Marketplace)`.

Позволяет добавлять позиции в магазин приложений и изменять параметры доступных сервисов в каталоге магазина.

### {heading(marketplace_view)[id=marketplace_view]}

Название в личном кабинете: `Просмотр компонентов магазина приложений (Marketplace)`.

Позволяет просматривать доступные услуги и приложения.

### {heading(mlplatform_delete)[id=mlplatform_delete]}

Название в личном кабинете: `Удаление из ML-платформы`.

Позволяет удалять модели из сервиса машинного обучения Cloud ML Platform.

### {heading(mlplatform_modify)[id=mlplatform_modify]}

Название в личном кабинете: `Управление ML-платформой`.

Позволяет настраивать среды обучения в сервисе машинного обучения Cloud ML Platform.

### {heading(mlplatform_view)[id=mlplatform_view]}

Название в личном кабинете: `Просмотр ML-платформы`.

Позволяет просматривать состояние проектов в сервисе машинного обучения и результатов обучения моделей.

### {heading(nord_delete)[id=nord_delete]}

Название в личном кабинете: `Удаление компонента Nord`.

Позволяет удалять объекты и настройки компонента Nord.

### {heading(nord_modify)[id=nord_modify]}

Название в личном кабинете: `Управление компонентом Nord`.

Позволяет управлять расширенными функциями платформы в части развертывания ресурсов.

### {heading(nord_view)[id=nord_view]}

Название в личном кабинете: `Просмотр компонента Nord`.

Позволяет отслеживать состояние служб компонента Nord.

### {heading(service_delete)[id=service_delete]}

Название в личном кабинете: `Удаление компонентов`.

Позволяет отключать и удалять сервисные компоненты.

### {heading(service_modify)[id=service_modify]}

Название в личном кабинете: `Управление компонентами`.

Позволяет изменять настройки внутренних сервисных служб платформы.

### {heading(service_view)[id=service_view]}

Название в личном кабинете: `Просмотр компонентов`.

Позволяет просматривать список всех служб и статусов их работоспособности.

### {heading(sqs_delete)[id=sqs_delete]}

Название в личном кабинете: `Удаление очередей SQS`.

Позволяет удалять очереди сообщений и очищать сообщения в них.

### {heading(sqs_modify)[id=sqs_modify]}

Название в личном кабинете: `Управление очередями SQS`.

Позволяет создавать и настраивать параметры очередей сообщений.

### {heading(sqs_view)[id=sqs_view]}

Название в личном кабинете: `Просмотр очередей SQS`.

Позволяет просматривать количество и состояние сообщений в очередях сообщений.

### {heading(vision_delete)[id=vision_delete]}

Название в личном кабинете: `Удаление компонента компьютерного зрения (Vision)`.

Позволяет останавливать сервисы и удалять данные компьютерного зрения.

### {heading(vision_modify)[id=vision_modify]}

Название в личном кабинете: `Управление компьютерным зрением (Vision)`.

Позволяет настраивать параметры сервисов компьютерного зрения и запускать задачи обработки.

### {heading(vision_view)[id=vision_view]}

Название в личном кабинете: `Просмотр компонента компьютерного зрения (Vision)`.

Позволяет просматривать результаты аналитики и историю работы сервисов компьютерного зрения.

### {heading(xaas_delete)[id=xaas_delete]}

Название в личном кабинете: `Удаление компонентов XaaS`.

Позволяет удалять партнерские сервисы, предоставляемые как услуга.

### {heading(xaas_modify)[id=xaas_modify]}

Название в личном кабинете: `Управление компонентами XaaS`.

Позволяет конфигурировать параметры партнерских сервисов, предоставляемых как услуга.

### {heading(xaas_view)[id=xaas_view]}

Название в личном кабинете: `Просмотр компонентов XaaS`.

Позволяет просматривать список и описание всех активных партнерских сервисов, предоставляемых как услуга.

## {heading(Управление организацией и доступом)[id=iam-permissions-organization-access]}

Управление проектами, доменом, пользователями и их группами, партнерами, а также квотами и лимитами.

### {heading(base_project_delete)[id=base_project_delete]}

Название в личном кабинете: `Удаление базового проекта`.

Позволяет удалять из отображения в левой панели [личного кабинета](/ru/tools-for-using-services/account) структурные элементы проекта (разделы личного кабинета).

### {heading(base_project_modify)[id=base_project_modify]}

Название в личном кабинете: `Управление базовым проектом`.

Позволяет изменять конфигурацию структурных элементов проекта (разделов) в левой панели [личного кабинета](/ru/tools-for-using-services/account).

### {heading(base_project_view)[id=base_project_view]}

Название в личном кабинете: `Просмотр базового проекта`.

Позволяет просматривать информацию о структурных элементах проекта. Используется для предоставления доступа к интерфейсу [личного кабинета](/ru/tools-for-using-services/account) и его разделам.

### {heading(domain_delete)[id=domain_delete]}

Название в личном кабинете: `Удаление домена`.

Позволяет полностью удалять доменную структуру.

### {heading(domain_groups_delete)[id=domain_groups_delete]}

Название в личном кабинете: `Удаление групп домена`.

Позволяет удалять группы пользователей в домене.

### {heading(domain_groups_modify)[id=domain_groups_modify]}

Название в личном кабинете: `Управление группами домена`.

Позволяет создавать группы пользователей и управлять их составом на уровне домена.

### {heading(domain_groups_view)[id=domain_groups_view]}

Название в личном кабинете: `Просмотр групп домена`.

Позволяет просматривать иерархию и состав групп в домене.

### {heading(domain_modify)[id=domain_modify]}

Название в личном кабинете: `Управление доменом`.

Позволяет изменять глобальные настройки и параметры изоляции домена.

### {heading(domain_users_delete)[id=domain_users_delete]}

Название в личном кабинете: `Удаление пользователей домена`.

Позволяет удалять учетные записи пользователей домена.

### {heading(domain_users_modify)[id=domain_users_modify]}

Название в личном кабинете: `Управление пользователями домена`.

Позволяет создавать и изменять учетные записи пользователей в рамках домена.

### {heading(domain_users_view)[id=domain_users_view]}

Название в личном кабинете: `Просмотр пользователей домена`.

Позволяет просматривать список всех пользователей домена.

### {heading(domain_view)[id=domain_view]}

Название в личном кабинете: `Просмотр домена`.

Позволяет просматривать общие параметры и идентификаторов домена.

### {heading(partners_delete)[id=partners_delete]}

Название в личном кабинете: `Удаление партнеров`.

Позволяет удалять записи из списка партнеров.

### {heading(partners_modify)[id=partners_modify]}

Название в личном кабинете: `Управление партнерами`.

Позволяет регистрировать партнеров и изменять их данные.

### {heading(partners_view)[id=partners_view]}

Название в личном кабинете: `Просмотр партнеров`.

Позволяет просматривать список и условия сотрудничества партнеров.

### {heading(project_delete)[id=project_delete]}

Название в личном кабинете: `Удаление проекта`.

Позволяет полностью удалять [проект](/ru/tools-for-using-services/account/concepts/projects) со всеми вложенными ресурсами.

### {heading(project_modify)[id=project_modify]}

Название в личном кабинете: `Управление проектом`.

Позволяет изменять настройки [проекта](/ru/tools-for-using-services/account/concepts/projects).

### {heading(projects_delete)[id=projects_delete]}

Название в личном кабинете: `Удаление проектов`.

Позволяет массово или выборочно удалять проекты из списка.

### {heading(projects_modify)[id=projects_modify]}

Название в личном кабинете: `Управление проектами`.

Позволяет изменять список проектов и их глобальные настройки.

### {heading(projects_quota_delete)[id=projects_quota_delete]}

Название в личном кабинете: `Удаление квот проектов`.

Позволяет сбрасывать ограничения ресурсов для выбранных проектов.

### {heading(projects_quota_modify)[id=projects_quota_modify]}

Название в личном кабинете: `Управление квотами проектов`.

Позволяет массово изменять лимиты ресурсов для группы проектов.

### {heading(projects_quota_view)[id=projects_quota_view]}

Название в личном кабинете: `Просмотр квот проектов`.

Позволяет просматривать квоты, лимиты и данные о потреблении ресурсов во всех проектах.

### {heading(projects_view)[id=projects_view]}

Название в личном кабинете: `Просмотр проектов`.

Позволяет просматривать список всех проектов в облаке.

### {heading(project_view)[id=project_view]}

Название в личном кабинете: `Просмотр проекта`.

Позволяет просматривать детальную информацию о параметрах и статусе [проекта](/ru/tools-for-using-services/account/concepts/projects).

### {heading(quota_delete)[id=quota_delete]}

Название в личном кабинете: `Удаление квот`.

Позволяет сбрасывать или удалять установленные в проекте ограничения ресурсов.

### {heading(quota_modify)[id=quota_modify]}

Название в личном кабинете: `Управление квотами`.

Позволяет изменять квоты и лимиты потребления ресурсов для проекта.

### {heading(quota_view)[id=quota_view]}

Название в личном кабинете: `Просмотр квот`.

Позволяет просматривать текущие квоты и лимиты, а также объем потребляемых ресурсов.

### {heading(users_delete)[id=users_delete]}

Название в личном кабинете: `Удаление пользователей`.

Позволяет удалять пользователей с платформы.

### {heading(users_modify)[id=users_modify]}

Название в личном кабинете: `Управление пользователями`.

Позволяет создавать и редактировать данные учетных записей пользователей платформы.

### {heading(users_view)[id=users_view]}

Название в личном кабинете: `Просмотр пользователей`.

Позволяет просматривать общий список пользователей платформы.

## {heading(Контейнеры и оркестрация)[id=iam-permissions-k8s]}

Управление сервисом оркестрации на базе Kubernetes.

### {heading(ics_agent_delete)[id=ics_agent_delete]}

Название в личном кабинете: `Удаление агента ICS`.

 Позволяет отключать и удалять агенты инвентаризации и сбора данных.

### {heading(ics_agent_modify)[id=ics_agent_modify]}

Название в личном кабинете: `Управление агентом ICS`.

Позволяет настраивать параметры работы агентов инвентаризации и сбора данных.

### {heading(ics_agent_view)[id=ics_agent_view]}

Название в личном кабинете: `Просмотр агента ICS`.

Позволяет просматривать статусы и активности агентов ICS.

### {heading(k8s_cluster_delete)[id=k8s_cluster_delete]}

Название в личном кабинете: `Удаление кластеров Kubernetes`.

Позволяет полностью удалять кластеры Kubernetes.

### {heading(k8s_cluster_management_delete)[id=k8s_cluster_management_delete]}

Название в личном кабинете: `Действие по удалению администрирования Kubernetes`.

Позволяет отзывать административные полномочия в Kubernetes.

### {heading(k8s_cluster_management_modify)[id=k8s_cluster_management_modify]}

Название в личном кабинете: `Администрирование кластеров Kubernetes`.

Позволяет изменять настройки управления средами Kubernetes.

### {heading(k8s_cluster_management_view)[id=k8s_cluster_management_view]}

Название в личном кабинете: `Просмотр администрирования Kubernetes`.

Позволяет просматривать настройки управления и прав в кластерах Kubernetes.

### {heading(k8s_cluster_modify)[id=k8s_cluster_modify]}

Название в личном кабинете: `Управление кластерами Kubernetes`.

Позволяет создавать кластеры Kubernetes.

### {heading(k8s_cluster_view)[id=k8s_cluster_view]}

Название в личном кабинете: `Просмотр кластеров Kubernetes`.

Позволяет просматривать статусы и параметры всех кластеров Kubernetes.

## {heading(Мониторинг, трассировка и администрирование)[id=iam-permissions-monitor-trace]}

Управление трассировкой, маршрутизацией и безопасностью пользователей.

### {heading(router_without_internet_delete)[id=router_without_internet_delete]}

Название в личном кабинете: `Удаление роутера без интернета`.

Позволяет удалять маршрутизаторы в изолированных сетях.

### {heading(router_without_internet_modify)[id=router_without_internet_modify]}

Название в личном кабинете: `Управление роутером без интернета`.

Позволяет настраивать маршрутизацию внутри изолированных сетей.

### {heading(router_without_internet_view)[id=router_without_internet_view]}

Название в личном кабинете: `Просмотр роутера без интернета`.

Позволяет просматривать параметры локальной маршрутизации в изолированных сетях.

### {heading(tracing_trace_delete)[id=tracing_trace_delete]}

Название в личном кабинете: `Удаление трассировок`.

Позволяет удалять накопленные данные трассировки.

### {heading(tracing_trace_modify)[id=tracing_trace_modify]}

Название в личном кабинете: `Управление трассировкой`.

Позволяет настраивать параметры и запускать процессы отладочной трассировки запросов.

### {heading(tracing_trace_view)[id=tracing_trace_view]}

Название в личном кабинете: `Просмотр трассировок`.

Позволяет просматривать информацию о путях прохождения запросов и мониторинг трассировок.

### {heading(users_protect_delete)[id=users_protect_delete]}

Название в личном кабинете: `Отключение защиты пользователей`.

Позволяет снимать ограничения безопасности с пользователей.

### {heading(users_protect_modify)[id=users_protect_modify]}

Название в личном кабинете: `Управление защитой пользователей`.

Позволяет настраивать политики безопасности и защиты пользователей.

### {heading(users_protect_view)[id=users_protect_view]}

Название в личном кабинете: `Просмотр защиты пользователей`.

Позволяет просматривать данные аудита для статусов безопасности пользователей.

## {heading(Базовая инфраструктура)[id=iam-permissions-basic-infrastructure]}

Управление компонентами Openstack и другими инфраструктурными компонентами, которые обеспечивают работу платформы.

### {heading(barbican_delete)[id=barbican_delete]}

Название в личном кабинете: `Удаление секретов (Barbican)`.

Позволяет безвозвратно удалять секреты и ключи доступа.

### {heading(barbican_modify)[id=barbican_modify]}

Название в личном кабинете: `Управление секретами (Barbican)`.

Позволяет создавать и изменять криптографические ключи.

### {heading(barbican_view)[id=barbican_view]}

Название в личном кабинете: `Просмотр секретов (Barbican)`.

Позволяет просматривать список и метаданные существующих секретов.

### {heading(cinder_delete)[id=cinder_delete]}

Название в личном кабинете: `Удаление дисков (Cinder)`.

Позволяет удалять диски и очищать блочные устройства.

### {heading(cinder_modify)[id=cinder_modify]}

Название в личном кабинете: `Управление дисками (Cinder)`.

Позволяет создавать диски и управлять ими.

### {heading(cinder_view)[id=cinder_view]}

Название в личном кабинете: `Просмотр дисков (Cinder)`.

Позволяет просматривать список дисков и их характеристик.

### {heading(cloudkitty_delete)[id=cloudkitty_delete]}

Название в личном кабинете: `Удаление данных тарификации (Cloudkitty)`.

Позволяет удалять записи о расчете стоимости.

### {heading(cloudkitty_modify)[id=cloudkitty_modify]}

Название в личном кабинете: `Управление тарификацией (Cloudkitty)`.

Позволяет изменять правила расчета стоимости и тарифные планы.

### {heading(cloudkitty_view)[id=cloudkitty_view]}

Название в личном кабинете: `Просмотр тарификации (Cloudkitty)`.

Позволяет просматривать детализацию расходов и текущих тарифов.

### {heading(freezer_delete)[id=freezer_delete]}

Название в личном кабинете: `Удаление резервных копий`.

Позволяет удалять архивы и резервные копии данных.

### {heading(freezer_modify)[id=freezer_modify]}

Название в личном кабинете: `Управление резервными копиями (Freezer)`.

Позволяет настраивать расписания резервного копирования и управлять созданием резервных копий.

### {heading(freezer_view)[id=freezer_view]}

Название в личном кабинете: `Просмотр резервных копий`.

Позволяет просматривать список доступных резервных копий и статусы их создания.

### {heading(glance_delete)[id=glance_delete]}

Название в личном кабинете: `Удаление образов`.

Позволяет удалять шаблоны дисков и образы ОС.

### {heading(glance_modify)[id=glance_modify]}

Название в личном кабинете: `Управление образами (Glance)`.

Позволяет загружать образы ОС.

### {heading(glance_publish_delete)[id=glance_publish_delete]}

Название в личном кабинете: `Отмена публикации образов`.

Позволяет удалять образы из списка опубликованных. Образ становится недоступен для пользователей.

### {heading(glance_publish_modify)[id=glance_publish_modify]}

Название в личном кабинете: `Управление публикацией образов`.

Позволяет изменять права доступа других пользователей к образам.

### {heading(glance_publish_view)[id=glance_publish_view]}

Название в личном кабинете: `Просмотр публикации образов`.

Позволяет просматривать права доступа к общим образам систем.

### {heading(glance_view)[id=glance_view]}

Название в личном кабинете: `Просмотр образов`.

Позволяет просматривать каталог доступных образов ОС.

### {heading(heat_delete)[id=heat_delete]}

Название в личном кабинете: `Удаление шаблонов оркестрации (Heat)`.

Позволяет удалять стеки ресурсов.

### {heading(heat_modify)[id=heat_modify]}

Название в личном кабинете: `Управление оркестрацией (Heat)`.

Позволяет развертывать инфраструктуру по шаблонам и изменять параметры стеков ресурсов.

### {heading(heat_view)[id=heat_view]}

Название в личном кабинете: `Просмотр оркестрации (Heat)`.

Позволяет отслеживать статусы развертывания инфраструктуры.

### {heading(keystone_delete)[id=keystone_delete]}

Название в личном кабинете: `Удаление из Keystone`.

Позволяет удалять {linkto(/ru/access/iam/concepts/roles-reference/#organization_access_modify)[text=субъекты доступа и организационные единицы]}.

### {heading(keystone_modify)[id=keystone_modify]}

Название в личном кабинете: `Управление идентификацией (Keystone)`.

Позволяет управлять пользователями в проекте.

### {heading(keystone_view)[id=keystone_view]}

Название в личном кабинете: `Просмотр идентификации (Keystone)`.

Позволяет просматривать данные аудита ролей в проекте.

### {heading(magnum_delete)[id=magnum_delete]}

Название в личном кабинете: `Удаление кластеров Kubernetes (Magnum)`.

Позволяет удалять среды контейнеризации Kubernetes на уровне инфраструктуры.

### {heading(magnum_modify)[id=magnum_modify]}

Название в личном кабинете: `Управление кластерами Kubernetes (Magnum)`.

Позволяет управлять сервисной инфраструктурой Kubernetes, создавать кластеры и изменять их конфигурацию.

### {heading(magnum_view)[id=magnum_view]}

Название в личном кабинете: `Просмотр кластеров Kubernetes (Magnum)`.

Позволяет просматривать состояние кластеров Kubernetes в инфраструктуре.

### {heading(manila_delete)[id=manila_delete]}

Название в личном кабинете: `Удаление файловых хранилищ`.

Позволяет удалять общие сетевые файловые хранилища.

### {heading(manila_modify)[id=manila_modify]}

Название в личном кабинете: `Управление файловыми хранилищами (Manila)`.

Позволяет создавать и настраивать общие сетевые файловые хранилища.

### {heading(manila_view)[id=manila_view]}

Название в личном кабинете: `Просмотр файловых хранилищ`.

Позволяет просматривать список и параметры общих сетевых файловых хранилищ.

### {heading(mcs_service_id_property_delete)[id=mcs_service_id_property_delete]}

Название в личном кабинете: `Удаление свойств ID компонента`.

Позволяет очищать реестр идентификаторов служб платформы.

### {heading(mcs_service_id_property_modify)[id=mcs_service_id_property_modify]}

Название в личном кабинете: `Управление свойствами ID компонента`.

Позволяет редактировать метаданные и идентификаторы служб платформы.

### {heading(mcs_service_id_property_view)[id=mcs_service_id_property_view]}

Название в личном кабинете: `Просмотр свойств ID компонента`.

Позволяет просматривать реестр и идентификаторы всех служб платформы.

### {heading(murano_delete)[id=murano_delete]}

Название в личном кабинете: `Удаление из каталога приложений (Murano)`.

Позволяет удалять прикладное ПО из каталога сервисов.

### {heading(murano_modify)[id=murano_modify]}

Название в личном кабинете: `Управление каталогом приложений (Murano)`.

Позволяет добавлять и настраивать прикладное ПО в каталоге сервисов.

### {heading(murano_view)[id=murano_view]}

Название в личном кабинете: `Просмотр каталога приложений (Murano)`.

Позволяет выбирать и просматривать готовые прикладные решения в каталоге сервисов.

### {heading(network_delete)[id=network_delete]}

Название в личном кабинете: `Удаление сети (Общее)`.

Позволяет полностью очищать сетевые объекты.

### {heading(network_modify)[id=network_modify]}

Название в личном кабинете: `Управление сетью (Общее)`.

Позволяет изменять общие параметры сетевой связности облака.

### {heading(network_view)[id=network_view]}

Название в личном кабинете: `Просмотр сети (Общее)`.

Позволяет просматривать данные общего аудита сетевой инфраструктуры.

### {heading(neutron_common_delete)[id=neutron_common_delete]}

Название в личном кабинете: `Удаление общих настроек сети`.

Позволяет сбрасывать глобальные сетевые конфигурации.

### {heading(neutron_common_modify)[id=neutron_common_modify]}

Название в личном кабинете: `Управление общими настройками сети`.

Позволяет изменять общие параметры сетевой инфраструктуры.

### {heading(neutron_common_view)[id=neutron_common_view]}

Название в личном кабинете: `Просмотр общих настроек сети`.

Позволяет просматривать общую сетевую модель облака.

### {heading(neutron_delete)[id=neutron_delete]}

Название в личном кабинете: `Удаление сетей (Neutron)`.

Позволяет удалять виртуальные сети из сетевой инфраструктуры.

### {heading(neutron_modify)[id=neutron_modify]}

Название в личном кабинете: `Управление сетями (Neutron)`.

Позволяет создавать виртуальные сети, настраивать сетевую топологию.

### {heading(neutron_view)[id=neutron_view]}

Название в личном кабинете: `Просмотр сетей (Neutron)`.

Позволяет просматривать визуализацию и данные аудита сетевой инфраструктуры.

### {heading(neutron_mtu_delete)[id=neutron_mtu_delete]}

Название в личном кабинете: `Удаление MTU (Neutron)`.

Позволяет сбрасывать настройки производительности пакетов.

### {heading(neutron_mtu_modify)[id=neutron_mtu_modify]}

Название в личном кабинете: `Управление MTU (Neutron)`.

Позволяет изменять размер пакетов данных для оптимизации сети.

### {heading(neutron_mtu_view)[id=neutron_mtu_view]}

Название в личном кабинете: `Просмотр MTU (Neutron)`.

Позволяет просматривать сетевые параметры производительности.

### {heading(neutron_network_delete)[id=neutron_network_delete]}

Название в личном кабинете: `Удаление сетей (Neutron)`.

Позволяет удалять отдельные виртуальные сети.

### {heading(neutron_network_modify)[id=neutron_network_modify]}

Название в личном кабинете: `Управление сетями (Neutron)`.

Позволяет изменять параметры виртуальных сетей и адресного пространства.

### {heading(neutron_network_view)[id=neutron_network_view]}

Название в личном кабинете: `Просмотр сетей (Neutron)`.

Позволяет просматривать список и характеристики виртуальных сетей.

### {heading(neutron_security_delete)[id=neutron_security_delete]}

Название в личном кабинете: `Удаление групп безопасности`.

Позволяет удалять [группы безопасности](/ru/networks/vnet/concepts/traffic-limiting).

### {heading(neutron_security_modify)[id=neutron_security_modify]}

Название в личном кабинете: `Управление группами безопасности`.

Позволяет создавать и редактировать [правила фильтрации трафика](/ru/networks/vnet/concepts/traffic-limiting).

### {heading(neutron_security_view)[id=neutron_security_view]}

Название в личном кабинете: `Просмотр групп безопасности`.

Позволяет просматривать [правила доступа и сетевые ограничения](/ru/networks/vnet/concepts/traffic-limiting).

### {heading(nova_delete)[id=nova_delete]}

Название в личном кабинете: `Удаление ВМ (Nova)`.

Позволяет удалять инстансы ВМ.

### {heading(nova_modify)[id=nova_modify]}

Название в личном кабинете: `Управление ВМ (Nova)`.

Позволяет управлять жизненным циклом [виртуальных машин](/ru/computing/iaas).

### {heading(nova_view)[id=nova_view]}

Название в личном кабинете: `Просмотр ВМ (Nova)`.

Позволяет просматривать список и состояние всех инстансов ВМ.

### {heading(nova_flavor_extra_specs_delete)[id=nova_flavor_extra_specs_delete]}

Название в личном кабинете: `Удаление доп. параметров Flavors`.

Позволяет удалять расширенные настройки [шаблонов конфигурации](/ru/computing/iaas/concepts/vm/flavor) ВМ.

### {heading(nova_flavor_extra_specs_modify)[id=nova_flavor_extra_specs_modify]}

Название в личном кабинете: `Управление доп. параметрами Flavors`.

Позволяет настраивать расширенные характеристики [шаблонов конфигурации](/ru/computing/iaas/concepts/vm/flavor) ВМ.

### {heading(nova_flavor_extra_specs_view)[id=nova_flavor_extra_specs_view]}

Название в личном кабинете: `Просмотр доп. параметров Flavors`.

Позволяет просматривать расширенные настройки [шаблонов конфигурации](/ru/computing/iaas/concepts/vm/flavor) ВМ.

### {heading(nova_migration_delete)[id=nova_migration_delete]}

Название в личном кабинете: `Удаление миграции`.

Позволяет принудительно останавливать процесс миграции ВМ.

### {heading(nova_migration_modify)[id=nova_migration_modify]}

Название в личном кабинете: `Управление миграцией ВМ`.

Позволяет инициировать перенос ВМ между хостами и управлять процессом переноса.

### {heading(nova_migration_view)[id=nova_migration_view]}

Название в личном кабинете: `Просмотр миграции ВМ`.

Позволяет просматривать статусы и историю переноса ВМ.

### {heading(nova_op_delete)[id=nova_op_delete]}

Название в личном кабинете: `Удаление операций ВМ (Nova)`.

Позволяет прерывать текущие операции над ВМ.

### {heading(nova_op_modify)[id=nova_op_modify]}

Название в личном кабинете: `Управление операциями ВМ (Nova)`.

Позволяет управлять питанием и состоянием ВМ.

### {heading(nova_op_view)[id=nova_op_view]}

Название в личном кабинете: `Просмотр операций ВМ (Nova)`.

Позволяет просматривать историю всех выполненных операций над ВМ.

### {heading(nova_vm_delete)[id=nova_vm_delete]}

Название в личном кабинете: `Удаление виртуальных машин`.

Позволяет безвозвратно удалять ВМ.

### {heading(nova_vm_modify)[id=nova_vm_modify]}

Название в личном кабинете: `Управление виртуальными машинами`.

Позволяет изменять параметры конфигурации и оборудования ВМ.

### {heading(nova_vm_view)[id=nova_vm_view]}

Название в личном кабинете: `Просмотр виртуальных машин`.

Позволяет отслеживать статусы ВМ и данные о работе ВМ.

### {heading(octavia_delete)[id=octavia_delete]}

Название в личном кабинете: `Удаление балансировщиков (Octavia)`.

Позволяет удалять [балансировщики нагрузки](/ru/networks/balancing).

### {heading(octavia_modify)[id=octavia_modify]}

Название в личном кабинете: `Управление балансировщиками (Octavia)`.

Позволяет создавать [балансировщики нагрузки](/ru/networks/balancing) и настраивать распределение трафика между инстансами.

### {heading(octavia_view)[id=octavia_view]}

Название в личном кабинете: `Просмотр балансировщиков (Octavia)`.

Позволяет просматривать параметры [балансировщиков нагрузки](/ru/networks/balancing).

### {heading(public_dns_delete)[id=public_dns_delete]}

Название в личном кабинете: `Удаление Public DNS`.

Позволяет удалять внешние [DNS-записи](/ru/networks/dns/instructions/publicdns/records).

### {heading(public_dns_modify)[id=public_dns_modify]}

Название в личном кабинете: `Управление Public DNS`.

Позволяет управлять доменными зонами и [DNS-записями](/ru/networks/dns/instructions/publicdns/records) во внешних сетях.

### {heading(public_dns_view)[id=public_dns_view]}

Название в личном кабинете: `Просмотр Public DNS`.

Позволяет просматривать публичные доменные имена.

### {heading(sdn_crossproject_port_delete)[id=sdn_crossproject_port_delete]}

Название в личном кабинете: `Удаление межпроектных портов`.

Позволяет разрывать сетевые связи между проектами.

### {heading(sdn_crossproject_port_modify)[id=sdn_crossproject_port_modify]}

Название в личном кабинете: `Управление межпроектными портами`.

Позволяет настраивать сетевое взаимодействие между разными проектами.

### {heading(sdn_crossproject_port_view)[id=sdn_crossproject_port_view]}

Название в личном кабинете: `Просмотр межпроектных портов`.

Позволяет просматривать данные аудита для интеграции независимых инфраструктур проектов.

### {heading(trove_datastore_delete)[id=trove_datastore_delete]}

Название в личном кабинете: `Удаление типов данных (Trove)`.

Позволяет ограничивать список доступных СУБД в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(trove_datastore_modify)[id=trove_datastore_modify]}

Название в личном кабинете: `Управление типами данных (Trove)`.

Позволяет управлять доступными версиями и типами СУБД в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(trove_datastore_view)[id=trove_datastore_view]}

Название в личном кабинете: `Просмотр типов данных (Trove)`.

Позволяет просматривать поддерживаемые технологии баз данных в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(trove_delete)[id=trove_delete]}

Название в личном кабинете: `Удаление СУБД (Trove)`.

Позволяет удалять экземпляры СУБД в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(trove_modify)[id=trove_modify]}

Название в личном кабинете: `Управление СУБД (Trove)`.

Позволяет создавать и изменять экземпляры СУБД в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(trove_view)[id=trove_view]}

Название в личном кабинете: `Просмотр СУБД (Trove)`.

Позволяет просматривать список и характеристики баз данных в сервисе [Cloud Databases](/ru/dbs/dbaas).

### {heading(tuareg_delete)[id=tuareg_delete]}

Название в личном кабинете: `Удаление компонента Tuareg`.

Позволяет удалять скрипты, запущенные на ВМ.

### {heading(tuareg_modify)[id=tuareg_modify]}

Название в личном кабинете: `Управление компонентом Tuareg`.

Позволяет управлять запуском скриптов на ВМ.

### {heading(tuareg_view)[id=tuareg_view]}

Название в личном кабинете: `Просмотр компонента Tuareg`.

Позволяет просматривать, какие скрипты запущены на ВМ.

### {heading(vdi_tuareg_delete)[id=vdi_tuareg_delete]}

Название в личном кабинете: `Удаление виртуального рабочего стола (Tuareg)`.

Позволяет удалять сессии и ресурсы [удаленных рабочих столов](/ru/computing/cloud-desktops).

### {heading(vdi_tuareg_modify)[id=vdi_tuareg_modify]}

Название в личном кабинете: `Управление виртуальными рабочими столами (Tuareg)`.

Позволяет настраивать [удаленные рабочие столы](/ru/computing/cloud-desktops) и управлять ими в рамках VDI-решения.

### {heading(vdi_tuareg_view)[id=vdi_tuareg_view]}

Название в личном кабинете: `Просмотр виртуального рабочего стола (Tuareg)`.

Позволяет отслеживать активность пользователей [удаленных рабочих столов](/ru/computing/cloud-desktops).

## {heading(Data Platform Kafka)[id=iam-permissions-dp-kafka]}

Управление сервисом [Cloud Kafka](/ru/data-platform/kafka) на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_cruisecontrol]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_mirrormaker_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_mirrormaker_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_mirrormaker_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_kafka_users_update]}

## {heading(Data Platform ClickHouse)[id=iam-permissions-dp-clickhouse]}

Управление сервисом [Cloud Clickhouse](/ru/data-platform/clickhouse) на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_backups_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_backups_download]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_backups_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_backups_restore]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_databases_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_databases_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_databases_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_killquery]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_listqueries]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_clickhouse_users_update]}

## {heading(Data Platform Redis)[id=iam-permissions-dp-redis]}

Управление БД Redis на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_redis_users_update]}

## {heading(Data Platform Airflow)[id=iam-permissions-dp-airflow]}

Управление сервисом [Cloud Airflow](/ru/data-platform/airflow) на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_airflow_monitoring_view]}

## {heading(Data Platform Jatoba)[id=iam-permissions-dp-jatoba]}

Управление БД Jatoba на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_backups_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_backups_download]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_backups_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_backups_restore]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_databases_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_databases_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_databases_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_killquery]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_listqueries]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_jatoba_users_update]}

## {heading(Data Platform NiFi)[id=iam-permissions-dp-nifi]}

Управление компонентом NiFi на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_nifi_monitoring_view]}

## {heading(Data Platform OpenSearch)[id=iam-permissions-dp-opensearch]}

Управление системой поиска OpenSearch на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_opensearch_settings_viewhistory]}

## {heading(Data Platform PostgreSQL)[id=iam-permissions-dp-postgresql]}

Управление БД PostgreSQL на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_backups_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_backups_download]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_backups_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_backups_restore]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_databases_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_databases_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_databases_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_killquery]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_listqueries]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_postgresql_users_update]}

## {heading(Data Platform Spark)[id=iam-permissions-dp-spark]}

Управление сервисом [Spark на платформе VK Data Platform](/ru/data-platform/spark).

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_spark_monitoring_view]}

## {heading(Data Platform Trino)[id=iam-permissions-dp-trino]}

Управление сервисом [Cloud Trino](/ru/data-platform/trino) на VK Data Platform.

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_install]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_extensions_uninstall]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_audit]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_execsql]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_maintenance]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_reboot]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_scaledisk]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_ui]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_versionupdate]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_instances_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_logs_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_monitoring_view]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_change]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_settings_viewhistory]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_create]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_delete]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_list]}

{include(/ru/_includes/_iam_dp.md)[tags=dp_trino_users_update]}