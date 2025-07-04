В кластере Kubernetes вы можете управлять ресурсами Kubernetes, используя веб-интерфейс личного кабинета VK Cloud. Эта функциональность служит альтернативой для `kubectl` и Kubernetes Dashboard.

## Просмотр информации о ресурсах кластера

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Ресурсы кластера**.

   Здесь перечислены ресурсы Kubernetes в кластере. Они сгруппированы в **Разделы**.

1. Выберите раздел из выпадающего списка и нажмите на нужную категорию.

Дополнительно вы можете:

- Просмотреть данные ресурсов в разделе **Конфигурации**, нажав на соответствующий элемент в параметре **Data**.

- Задать поисковый запрос в поле **Поиск**.

  Заданный поисковый запрос сохраняется при переходе между разделами.

- Отфильтровать ресурсы по **Пространствам имен**.

  Установленный фильтр сохраняется при переходе между разделами.

  К некоторым ресурсам Kubernetes фильтр по пространствам имен неприменим. Информация об этом размещена в списке доступных ресурсов.

{cut(Список доступных ресурсов)}

<!--prettier-ignore-->
| Ресурс                                              | Комментарий                                   |
| --------------------------------------------------- | --------------------------------------------- |
| **Раздел Кластер**                                  |                                               |
| Ноды (Nodes)                                        |                                               |
| Пространства имен (Namespaces)                      | Фильтр по пространствам имен неприменим       |
| События (Events)                                    |                                               |
| **Раздел Рабочая нагрузка**                         |                                               |
| Поды (Pods)                                         |                                               |
| Deployments                                         |                                               |
| DaemonSets                                          |                                               |
| StatefulSets                                        |                                               |
| ReplicaSets                                         |                                               |
| HPA                                                 |                                               |
| Задачи (Jobs)                                       |                                               |
| Cron Задачи (Cron Jobs)                             |                                               |
| **Раздел Конфигурации**                             |                                               |
| ConfigMaps                                          |                                               |
| Секреты (Secrets)                                   |                                               |
| **Раздел Сеть**                                     |                                               |
| Сервисы (Services)                                  |                                               |
| Endpoins                                            |                                               |
| Ingresses                                           |                                               |
| **Раздел Хранилище**                                |                                               |
| Persistent Volume Claims                            |                                               |
| Persistent Volumes                                  | Фильтр по пространствам имен неприменим       |
| Классы хранилищ (Storage Classes)                   | Фильтр по пространствам имен неприменим       |
| **Раздел Управление доступом**                      |                                               |
| Сервисные аккаунты (Service Accounts)               |                                               |
| Роли кластера (Cluster Roles)                       | Фильтр по пространствам имен неприменим       |
| Роли (Roles)                                        |                                               |
| Привязки ролей кластера<br>(Cluster Role Bindings)  | Фильтр по пространствам имен неприменим       |
| Привязки ролей (Role Bindings)                      |                                               |

{/cut}
