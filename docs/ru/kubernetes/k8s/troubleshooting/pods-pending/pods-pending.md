# {heading(Поды кластера находятся в состоянии Pending слишком долго)[id=k8s-pods-pending]}

Под находится в состоянии `Pending`, если он уже создан, но еще не запущен, то есть еще не перешел в состояние `Running`. Под ожидает выполнения определенных условий, чтобы начать работу на узле, и если эти условия не выполняются, зависает в состоянии `Pending`.

У такого поведения может быть несколько причин. Последовательно выполните шаги, переходя от одного решения к другому, пока проблема не будет устранена.

{cut(На узле недостаточно ресурсов для запуска пода)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 Insufficient cpu, 2 Insufficient memory
   ```   
   
   Если есть, на узле кластера недостаточно свободных ресурсов (CPU и RAM) для размещения пода. 

1. Просмотрите подробную информацию о ресурсах узла с помощью команды:

   ```console
   kubectl describe node <ИМЯ_УЗЛА>
   ```

   В выводе команды:
   
   - `Capacity` — максимальное количество ресурсов, доступных на узле;
   - `allocatable` — количество ресурсов, реально доступное для подов с учетом системных нужд;
   - `Allocated resources` — количество уже занятых ресурсов;
   - `pods` — максимальное количество подов, которое может быть одновременно запущено на узле. 

1. Решите проблему одним из способов:

   - {linkto(../../instructions/scale#k8s-instructions-scale-vertical-worker-nodes)[text=Включите]} автоматическое масштабирование групп узлов или вручную {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=увеличьте]} количество узлов в группе, если существующих узлов недостаточно для размещения подов.
   - Скорректируйте запросы на ресурсы в манифесте пода в блоке `resources.requests`, если запрашивается больше ресурсов, чем доступно на узле. 
   
      Подробнее о ресурсах в разделе {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ограничение использования ресурсов]} и [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

{cut(На узле достигнуто максимальное количество подов)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 Insufficient pods
   ```   
   
   Если есть, у узла достигнут лимит на максимальное количество подов, которые на нем можно одновременно запустить.

1. Узнайте лимит мест для подов на узле и сколько из этих мест уже занято с помощью команды:

   ```console
   kubectl describe node <ИМЯ_УЗЛА> pods
   ```
   
   Пример вывода: 

   ```console
   pods:               110/110
   ```

1. Решите проблему одним из способов:

   - Удалите ненужные поды с помощью команды:
 
      ```console
      kubectl delete pod <ИМЯ_ПОДА> -n <ПРОСТРАНСТВО_ИМЕН>
      ``` 
   - Увеличьте лимит подов на узле в параметре `maxPods` в конфигурационном файле для Kubelet. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/).
   - Перераспределите поды по другим узлам. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). 

{/cut}   

{cut(В пространстве имен достигнут лимит ресурсов, установленный объектами ResourceQuota или LimitRange)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   Forbidden: exceeded quota
   Forbidden: container memory limit exceeds limit range
   ```   
   
   Если есть, в пространстве имен достигнут лимит ресурсов для подов, установленный объектами `ResourceQuota` и `LimitRange`.

1. Просмотрите информацию о квотах и ограничениях ресурсов для подов:

   {tabs}

   {tab(Для объекта ResourceQuota)}
   
   Выполните команду:

   ```console
   kubectl get resourcequota -n <ПРОСТРАНСТВО_ИМЕН>
   ```
   
   В выводе команды будут указаны:

   - имя объекта `ResourceQuota`;
   - общий (`hard`) лимит по каждому типу ресурсов;
   - количество ресурсов, которое уже израсходовано и еще доступно для использования.
   
   {/tab}

   {tab(Для объекта LimitRange)}
   
   Выполните команду: 
   
   ```console
   kubectl get limitrange -n <ПРОСТРАНСТВО_ИМЕН>
   ```

   В выводе команды будут указаны:
      
   - имя объекта `LimitRange`;
   - минимальные, максимальные и значения по умолчанию для каждого типа ресурса, если они заданы;
   - время существования объекта.
   
   {/tab}
   
   {/tabs}
   
1. Решите проблему одним из способов:

   - В манифесте пода скорректируйте значения в блоках `resources.requests` и `resources.limits` в соответствии с установленными квотами и ограничениями. 
   
      Подробнее о ресурсах и ограничениях в разделе {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ограничение использования ресурсов]} и [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). 
   - В манифесте объекта `ResourceQuota` увеличьте квоты в секции `spec.hard`. 
      
      Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/).
   - Удалите ненужные объекты `LimitRange` или в манифесте объекта `LimitRange` скорректируйте значения в секции `spec.limits`. 
     
      Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/policy/limit-range/).

{/cut}

{cut(У пода указаны требования и правила, которым не удовлетворяет ни один узел)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't match node selector.
   0/3 nodes are available: 3 node(s) didn't match pod affinity/anti-affinity rules.
   0/3 nodes are available: 3 node(s) had taint {key=value:NoSchedule}; that no tolerations are applied.
   ```

   Если есть, узлы не удовлетворяют правилам планирования, заданным с помощью селектора узлов (`nodeSelector`), правилам размещения узлов (`affinity`) или исключений (`tolerations`).

1. Решите проблему одним из способов: 

   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group-labels-taints)[text=Cогласуйте]} правила пода с указанными правилами и требованиями.
   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Добавьте]} новую группу узлов, соответствующую указанным требованиям.

{/cut}

{cut(У пода проблемы с постоянным томом (PV) или PVC)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 1 pod has unbound immediate PersistentVolumeClaims
   0/3 nodes are available: no persistent volumes available for this claim
   ```

   Если есть, у пода наблюдаются проблемы с {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PV или PVC]}. Примеры подобных проблем:

   - PVC не привязан к PV, потому что PV нет или он не подходит.
   - Нет подходящих PV, или компонент `Provisioner` не может создать подходящий PV.
   - Не настроен {linkto(../../concepts/storage#k8s-storage-storage-classes)[text=класс хранения]} (StorageClass) или он не совпадает с требованиями PVC. 

1. Решите проблему одним из способов:

   - Создайте PV вручную или скорректируйте параметры для его {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs-prepare)[text=динамической подготовки]}. Подробнее о работе с постоянными томами в {linkto(../../how-to-guides/storage#k8s-storage)[text=практическом руководстве]} и [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). 
   - Убедитесь, что класс хранения для PVC существует и указан, а также что его параметры соответствуют требованиям PVC (тип диска, зона доступности, размер и так далее).

{/cut}

{cut(У подов возникают конфликты при использовании настройки hostPort)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to create pod sandbox: networkPlugin cni failed
   Failed to allocate host port: address already in use
   ```

   Если есть, это вызвано проблемами с использованием настройки `hostPort`. Примеры подобных проблем: 

   - Два пода на одном узле пытаются использовать тот же `hostPort`, что вызывает их конфликт.
   - Порт, указанный в `hostPort`, уже занят системным процессом на узле. 
   - На узле нет свободных портов (например, слишком много подов используют `hostPort`).

1. Решите проблему одним из способов:

   - Не используйте `hostPort` в настройке подов, так как это существенно ограничивает их работу (нет возможности автоматического масштабирования, невозможно перенаправлять трафик, балансировать нагрузку и так далее). Вместо этого используйте [сервисы](https://kubernetes.io/docs/concepts/services-networking/service/) типов `LoadBalancer` или `NodePort`. 
   - Если нельзя избежать использования `hostPort`:
      - Ограничьте количество реплик до 1. Это гарантирует, что на одном узле будет только один под, и конфликтов по портам не будет. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).  
      - Если нужно запускать несколько реплик с `hostPort`, разместите каждую реплику на отдельном узле с помощью [правил размещения](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) (`affinity` или `anti-affinity`).

{/cut}

{cut(Под не может быть запланирован, потому что нарушается политика распределения подов по топологии)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   0/3 nodes are available: 3 node(s) didn't satisfy existing topology spread constraints
   ```

   Если есть, планировщик Kubernetes не может разместить под на каком-либо узле, потому что нарушается [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) — политика распределения подов по топологии (например, по узлам, регионам, зонам доступности и так далее).  

1. Просмотрите настройки политики в манифесте пода в блоке `spec.topologySpreadConstraints`.

1. Решите проблему одним из способов:

   - Скорректируйте значение параметра `maxSkew`. Он отвечает за максимально допустимое различие в количестве подов между узлами, чтобы ни в одной топологии не оказалось значительно больше подов, чем в другой.
   
      Например, если необходимо распределить четыре пода по двум зонам доступности, при значении `maxSkew: 1` в каждой из зон будут размещены два пода (а не три пода в первой зоне доступности, и один оставшийся — во второй).

   - Если вы хотите, чтобы поды запускались даже при неидеальном распределении по топологии, добавьте параметр `whenUnsatisfiable: ScheduleAnyway`. Так под будет запланирован на любом доступном узле даже в нарушение топологических ограничений (например, в топологии, где уже слишком много подов, и параметр `maxSkew` не позволяет добавить еще один).
   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Увеличьте]} количество узлов (добавьте их в существующую группу или создайте новую).

{/cut}

{cut(Под имеет низкий приоритет при высоком давлении на ресурсы)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   Preemption is not possible because the priority of the pod is the lowest
   ```

   Если есть, поды с низким приоритетом не могут быть запущены, если на узлах нет свободных ресурсов. 
   
   За приоритет пода отвечает параметр `PriorityClass`, который указывает планировщику Kubernetes, какие поды запускать в первую очередь, а какие могут быть вытеснены (preempted), если ресурсов недостаточно. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/). 

1. Просмотрите, какие уровни приоритета настроены в кластере, с помощью команды:
   
   ```console
   kubectl get priorityclass
   ```

   Пример вывода:

   ```text
   NAME               VALUE      GLOBAL-DEFAULT
   ...                ...        ...
   high-priority      20000000   false      
   medium-priority    1000000    true      
   low-priority       100000     false     
   ```

   Здесь:
   
   - `NAME` — название приоритета для подов.
   - `VALUE` — числовое значение приоритета. Чем оно выше, тем выше приоритет.  
   - `GLOBAL-DEFAULT` — параметр, который при значении `true` определяет, что этот приоритет будет указан для всех подов, приоритет которых не задан явно.

1. Узнайте приоритет пода с помощью команды:

   ```console
   kubectl describe pod <ИМЯ_ПОДА> | sed -n '/Priority/,+3p'
   ```

   Приоритет пода задается в манифесте в поле `PriorityClassName`. Если приоритет не указан или указан низкий, а под является критически важным для работы:

      1. Укажите для этого пода более высокий приоритет.
      1. (Опционально) Для подов, которые выполняют фоновые задачи, укажите более низкий приоритет и уменьшите запросы на ресурсы.  

{/cut}

{cut(У пода проблемы с доступом к Docker-образам)}

{include(/ru/_includes/_pod_events_diagnostics.md)}

   ```console
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: manifest for myrepo/myimage:latest not found: manifest unknown: manifest unknown
   Failed to pull image "myrepo/myimage:latest": rpc error: code = Unknown desc = Error response from daemon: unauthorized: authentication required
   Error: ErrImagePull
   Back-off pulling image "myrepo/myimage:latest"
   ```

   Если есть, Kubernetes не может скачать нужный Docker-образ для пода. У этого может быть несколько причин. Примеры подобных причин:

      - Такого образа не существует. 
      - У пода нет доступа к публичному Docker-реестру.
      - Секрет для скачивания образов из приватных Docker-реестров некорректно настроен, отсутствует или устарел.

1. Решите проблему одним из способов:

   {tabs}

   {tab(Публичный Docker-реестр)}

   Убедитесь, что в манифесте указаны корректный тег и имя образа. Для этого проверьте, существует ли указанный тег в соответствующем Docker-реестре, или используйте команду:
      
   ```console
   docker pull <ИМЯ_ОБРАЗА>:<ТЕГ>
   ```
      
   Если образ успешно скачивается, тег существует.

   По возможности вместо тега используйте дайджест — уникальный идентификатор (хеш) конкретной сборки образа в формате `<ХЕШ_ФУНКЦИЯ>:<ИДЕНТИФИКАТОР>`. Это гарантирует, что всегда будет скачиваться именно эта сборка образа, даже если образ будет обновлен или его тег изменится. 

   Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/containers/images/). 
   
   {/tab}
   
   {tab(Приватный Docker-реестр)}
      
   {linkto(../../connect/docker-registry#k8s-docker-registry-using)[text=Исправьте или укажите]} секрет для доступа к реестру в манифесте. 
   
   {/tab}
   {/tabs}

{/cut}

{cut(Ошибки интеграции с сетевыми сервисами (CNI) и сервисами хранения данных (CSI))}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.

1. Отобразите информацию о системных подах кластера в пространстве имен `kube-system` с помощью команды:

   ```console
   kubectl get pods -n kube-system 
   ```
  
   Если какие-либо системные поды находятся в состоянии `Pending` слишком долго, это может быть из-за проблем интеграции с {linkto(../../concepts/architecture#k8s-architecture-platform-integration)[text=сетевыми сервисами (CNI) и сервисами хранения данных (CSI)]}.

1. Отобразите информацию об узлах, поды которых находятся в состоянии `Pending`, с помощью команды:

   ```console
   kubectl describe node <ИМЯ_УЗЛА>
   ```

1. Просмотрите ошибки в блоке `Conditions` и исправьте их:

   [cols="1,2a,2a", options="header"]
   |===

   | Ошибка
   | Описание
   | Как исправить

   | `NetworkUnavailable`
   | Сеть узла недоступна, так как произошел сбой в работе {linkto(../../concepts/network#k8s-network-cni)[text=CNI]}
   | 
   1. Убедитесь, что CNI-плагин Calico корректно настроен и запущен. 
   1. Восстановите или перезапустите поды, обеспечивающие работу Calico

   | `DiskPressure`
   | На узле не хватает дискового пространства, поэтому Kubernetes не может новые запустить на нем новые поды
   | [Увеличьте размер](/ru/computing/iaas/instructions/volumes/volumes-manage) дисков, очистите дисковое пространство (например, удалите старые логи и неиспользуемые образы)

   | `PIDPressure`
   | На узле запущено слишком много процессов, поэтому Kubernetes не может новые запустить на нем новые поды
   | Увеличьте лимиты процессов, уменьшите количество одновременных процессов. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/policy/pid-limiting/)
   |===

{/cut}

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).