В Kubernetes aaS от VK Cloud новые версии обычно добавляются через 1 месяц после официального релиза.

В данный момент в Kubernetes aaS от VK Cloud доступны следующие версии Kubernetes:

- 1.30.5
- 1.29.7
- 1.28.9
- 1.27.6

При [создании нового кластера](../../../service-management/create-cluster) выбирайте последнюю доступную [версию Kubernetes](#podderzhka_versiy_kubernetes). По возможности [обновляйте кластер](../../../service-management/update) до последней доступной версии. Процедура обновления описана в [соответствующем разделе концепций](../../update).

Если кластер использует устаревшую [версию Kubernetes](#podderzhka_versiy_kubernetes), то:

- его корректная работа не гарантируется;
- служба технической поддержки не сможет помочь с решением возникающих проблем.

## Поддержка версий Kubernetes <a id="k8s-versions-list"></a>

Версии Kubernetes поддерживаются на протяжении 14 месяцев с даты релиза в Kubernetes aaS от VK Cloud.

За 30 дней до прекращения поддержки версии Kubernetes пользователи получат сообщение об этом по электронной почте и в центре уведомлений личного кабинета.

[cols="1,2,1,1", options="header"]
|===
|Версия Kubernetes
|Официальная дата релиза
|Kubernetes aaS от VK релиз
|Kubernetes aaS от VK завершение поддержки

|1.30.x
|10 сентября 2024
|10.12.2024
|10.02.2026

| 1.29.x
| 17 июля 2024
| 30.08.2024
| 30.10.2025

| 1.28.x
| 16 апреля 2024
| 30.06.2024
| 30.08.2025

| 1.27.x  
| 13 сентября 2023
| 11.12.2023
| 11.02.2025

| 1.26.x  
| 17 мая 2023
| 14.08.2023
| 17.10.2024

| 1.25.x  
| 17 мая 2023
| 14.06.2023
| 14.08.2024

| 1.24.x  
| 8 декабря 2022  
| 06.03.2023
| 06.05.2024

| 1.23.x  
| 13 апреля 2022  
| 15.08.2022
| 15.10.2023

| 1.22.x  
| 19 января 2022  
| 18.02.2022
| 18.04.2023

| 1.21.4  
| 8 апреля 2021
| 12.10.2021
| 12.12.2022

| 1.20.4  
| 8 декабря 2020  
| 01.03.2021
| 01.05.2022

| 1.19.4
| 26 августа 2020
| 23.12.2020
| 23.02.2022

| 1.18.12
| 23 марта 2020
| 23.12.2020
| 23.02.2022

| 1.17.8  
| 9 декабря 2019  
| 09.08.2020
| 09.12.2021
|===

Историю изменений версий можно посмотреть в разделе [История версий Kubernetes](../version-changelog).

## Поддержка функций сервиса в версиях Kubernetes <a id="k8s-features-list"></a>

Новые функции добавляются во все версии Kubernetes, за исключением случаев несовместимости функции и версии.

[cols="2,1,1,1,1", options="header"]
|===
|Название
|1.17.x–1.20.x
|1.21.4–1.23.х
|1.24.x–1.26.х
|1.27.x–1.30.х

|Настройки масштабирования групп узлов
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Инвалидация ключевой пары
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|Изменение размера диска Prometheus
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Изменение типа виртуальной машины Master
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Обновление версии кластера
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Метки и ограничения
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Узлы кластера на AlmaLinux
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Интеграция с IAM облака VK Cloud
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/check.svg "inline")

|Автоматическое масштабирование master-узлов кластера
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/check.svg "inline")
|===

## История версий Kubernetes

[cols="1,1,2", options="header"]
|===
|Версия
|Изменения в Kubernetes
|Изменения в сервисе Kubernetes aaS

|**Kubernetes 1.30.5**
|[Kubernetes v1.30: Uwubernetes](https://kubernetes.io/blog/2024/04/17/kubernetes-v1-30-release/)
|![](/en/assets/no.svg "inline")

|**Kubernetes 1.29.7**
|[Kubernetes v1.29: Mandala](https://kubernetes.io/blog/2023/12/13/kubernetes-v1-29-release/)
| ![](/en/assets/no.svg "inline")

|**Kubernetes 1.28.9**
|[Kubernetes v1.28: Planternetes](https://kubernetes.io/blog/2023/08/15/kubernetes-v1-28-release/)
| ![](/en/assets/no.svg "inline")

|**Kubernetes 1.27.6**
|[Kubernetes v1.27: Chill Vibes](https://kubernetes.io/blog/2023/04/11/kubernetes-v1-27-release/)
|Реализовано [автоматическое масштабирование](/kubernetes/k8s/concepts/scale#autoscaling) master-узлов кластера.

|**Kubernetes 1.26.5**
|[Kubernetes v1.26: Electrifying](https://kubernetes.io/blog/2022/12/09/kubernetes-v1-26-release/)
|Обновление пакетов:

- Calico обновлено до 3.26.1.
- Helm обновлен до 3.12.2.
- Gatekeeper обновлен до 3.12.0.

|**Kubernetes 1.25.1**
|[Kubernetes v1.25: Combiner](https://kubernetes.io/blog/2022/08/23/kubernetes-v1-25-release/)
| ![](/en/assets/no.svg "inline")

|**Kubernetes 1.24.9**
|[Kubernetes 1.24: Stargazer](https://kubernetes.io/blog/2022/05/03/kubernetes-1-24-release-announcement/)
|Calico обновлено до 3.25.0

|**Kubernetes 1.23.6**
|[Kubernetes 1.23: The Next Frontier](https://kubernetes.io/blog/2021/12/07/kubernetes-1-23-release-announcement/)
|Добавлена [интеграция с IAM облака VK Cloud](/ru/kubernetes/k8s/concepts/access-management)

|**Kubernetes 1.22.6**
|[Kubernetes 1.22: Reaching New Peaks](https://kubernetes.io/blog/2021/08/04/kubernetes-1-22-release-announcement/)
|На узлах кластера используется операционная система [AlmaLinux](https://wiki.almalinux.org) версии 9.

По умолчанию устанавливается ограничение на потребляемые вычислительные ресурсы ([limit ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)) для пространств имен (namespace)

|**Kubernetes 1.21.4**
|[Kubernetes 1.21: Power to the Community](https://kubernetes.io/blog/2021/04/08/kubernetes-1-21-release-announcement/)
|На узлах кластера используется операционная система [AlmaLinux](https://wiki.almalinux.org) версии 8

|**Kubernetes 1.20.4**
|[Kubernetes 1.20: The Raddest Release](https://kubernetes.io/blog/2020/12/08/kubernetes-1-20-release-announcement/)
|[Среда исполнения](https://kubernetes.io/docs/setup/production-environment/container-runtimes/) (runtime) кластера заменена на [CRI-O](https://cri-o.io/).

Изменен [формат хранения логов](/ru/cases/cases-logs/case-fluent-bit)
|===
