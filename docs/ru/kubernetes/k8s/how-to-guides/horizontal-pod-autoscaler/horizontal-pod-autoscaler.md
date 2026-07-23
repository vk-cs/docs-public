# {heading(Горизонтальное масштабирование приложений)[id=k8s-hpa]}

Horizontal Pod Autoscaler (HPA) автоматически изменяет количество реплик `Deployment` или `StatefulSet` в соответствии с текущей нагрузкой.

В этом практическом руководстве рассматриваются три варианта:

- масштабирование по CPU;
- масштабирование по памяти;
- масштабирование по пользовательской метрике из Prometheus.

Для HPA используйте API `autoscaling/v2`: он поддерживает несколько метрик и настраиваемое поведение scale-up/scale-down.

{note:info}
Это практическое руководство предназначено для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-hpa-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Создайте]} кластер актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. [Установите](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring) аддон Kube Prometheus Stack версии 68.3.3, если это еще не сделано.
   
   {note:warn}
   Аддоны потребляют ресурсы worker-узлов. [Kube Prometheus Stack](/ru/kubernetes/k8s/concepts/addons-and-settings/addons/#k8s-addons-kube-prometheus-stack) требует ориентировочно CPU 850m–2500m CPU и 968Mi–3804Mi RAM, а также диски HDD 2 ГБ и SSD 10 ГБ под данные Prometheus). Убедитесь, что в группе worker-узлов достаточно ресурсов, и [включите](/ru/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-worker-nodes) для нее автомасштабирование — иначе под Prometheus и масштабируемые по HPA поды могут зависнуть в состоянии`Pending`. Рекомендуется устанавливать ресурсоемкие аддоны на выделенную автомасштабируемую группу узлов.
   {/note}

1. Установите `jq` для форматирования JSON, если это еще не сделано:

   ```console
   apt-get install jq
   ```

## {heading({counter(hpa)}. Проверьте доступ к кластеру)[id=k8s-hpa-access]}

1. Проверьте доступ к кластеру, выполнив команды:

   ```bash
   kubectl cluster-info
   kubectl get nodes
   kubectl version
   ```

1. Создайте пространство имен `hpa-demo`:

   ```bash
   kubectl create namespace hpa-demo
   ```
   
## {heading({counter(hpa)}. Проверьте Metrics Server)[id=k8s-hpa-metrics-server]}

CPU и RAM поступают в HPA через API `metrics.k8s.io`, который обычно предоставляет Metrics Server. Выполните команды:

```bash
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods -A
```

В выводе команды должен быть похожий ответ:

```text
v1beta1.metrics.k8s.io   kube-system/metrics-server   True
```

В сервисе Cloud Containers Metrics Server предустановлен — `apiservice v1beta1.metrics.k8s.io` находится в состоянии `True`, а `kubectl top` работает из коробки. Не устанавливайте второй экземпляр, если API работает.

{note:warn}
Не полагайтесь на `kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes` как на индикатор. В кластере VK Cloud эта команда возвращает `Error from server (NotFound)`, хотя metrics API рабочий (`kubectl top` и HPA функционируют, `metrics.k8s.io/v1beta1` присутствует в `kubectl api-versions`). Надежные проверки готовности metrics API — это состояние `apiservice … True` и работающий `kubectl top nodes`/`kubectl top pods`.
{/note}

Если компонент отсутствует, установите совместимую с версией Kubernetes версию Metrics Server согласно документации вашего провайдера. После установки дождитесь доступности API:

```bash
kubectl wait --for=condition=Available \
  deployment/metrics-server \
  -n kube-system \
  --timeout=180s

kubectl top nodes
```

Metrics Server предназначен для autoscaling и `kubectl top`, а не для долговременного мониторинга.

## {heading({counter(hpa)}. Разверните тестовое приложение)[id=k8s-hpa-test-app]}

1. Создайте манифест `app.yaml`:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: web
     template:
       metadata:
         labels:
           app: web
       spec:
         containers:
           - name: web
             image: registry.k8s.io/hpa-example:latest
             ports:
               - name: http
                 containerPort: 80
             resources:
               requests:
                 cpu: 100m
                 memory: 64Mi
               limits:
                 cpu: 500m
                 memory: 256Mi
             readinessProbe:
               httpGet:
                 path: /
                 port: http
               initialDelaySeconds: 3
               periodSeconds: 5
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     selector:
       app: web
     ports:
       - name: http
         port: 80
         targetPort: http
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f app.yaml
   kubectl rollout status deployment/web -n hpa-demo
   kubectl get pods -n hpa-demo
   ```

### {heading(Почему обязательно указывать requests)[id=k8s-hpa-test-app]}

HPA с `target.type: Utilization` вычисляет загрузку относительно `resources.requests`.

Например:

```text
CPU usage = 75m
CPU request = 100m
Utilization = 75%
```

Если у контейнера не задан соответствующий `request`, процент использования CPU или RAM для него не определяется корректно, и HPA может не масштабировать рабочую нагрузку.

## {heading({counter(hpa)}. Настройте HPA по CPU)[id=k8s-hpa-cpu]}

1. Создайте манифест `hpa-cpu.yaml`:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: web
     minReplicas: 1
     maxReplicas: 10
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 50
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f hpa-cpu.yaml
   kubectl get hpa -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

HPA будет стремиться удерживать среднее использование CPU около `50%` от CPU `request`.

## {heading({counter(hpa)}. Проверьте масштабирование по CPU)[id=k8s-hpa-cpu-check]}

1. Запустите генератор нагрузки:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://web; done'
   ```

   {note:info}
   Если запускать `kubectl` из Git Bash (MSYS), путь `/bin/sh` автоматически преобразуется в `C:/Program Files/Git/usr/bin/sh`, и под падает с `CreateContainerError` (`stat .../sh: no such file or directory`). Обходные пути: указать `//bin/sh` (двойной слэш MSYS не преобразует, Linux трактует его как `/bin/sh`), либо выставить `MSYS_NO_PATHCONV=1`, либо запускать команду из PowerShell. В Linux/macOS команда работает как есть.
   {/note}

1. Наблюдайте:

   ```bash
   # watch (-w) поддерживает только один тип ресурса за раз,
   # поэтому смотрим поды:
   kubectl get pods -n hpa-demo -w
   ```

   Вызов команды `kubectl get hpa,pods -n hpa-demo -w` завершится ошибкой `error: you may only specify a single resource type`, так как с флагом `-w` нельзя указывать несколько типов ресурсов. Чтобы видеть и HPA, и поды одновременно, используйте утилиту `watch` (периодический снимок без `-w`): `watch kubectl get hpa,pods -n hpa-demo` — либо следите за HPA в отдельном окне командой `kubectl get hpa -n hpa-demo -w`.

1. Дополнительно выполните команды:

   ```bash
   kubectl top pods -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

   После увеличения нагрузки число реплик должно вырасти.

1. Остановите тест:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

Scale-down произойдет не сразу из-за `stabilizationWindowSeconds`.

## {heading({counter(hpa)}. Добавьте масштабирование по памяти)[id=k8s-hpa-ram]}

1. Измените HPA так, чтобы он учитывал CPU и RAM:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: web
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: web
     minReplicas: 1
     maxReplicas: 10
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 50
       - type: Resource
         resource:
           name: memory
           target:
             type: Utilization
             averageUtilization: 70
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Примените манифест:
 
   ```bash
   kubectl apply -f hpa-cpu-memory.yaml
   kubectl get hpa web -n hpa-demo
   ```

При нескольких метриках HPA вычисляет рекомендуемое число реплик для каждой и выбирает максимальное значение. Пример:

```text
CPU рекомендует 4 pod
RAM рекомендует 7 pod
Итог HPA: 7 pod
```

### {heading(Процент или абсолютное значение RAM)[id=k8s-hpa-percent]}

Процент от `memory request`:

```yaml
target:
  type: Utilization
  averageUtilization: 70
```

Абсолютное среднее потребление на поде:

```yaml
target:
  type: AverageValue
  averageValue: 180Mi
```

Для памяти scale-down следует настраивать осторожно: приложения часто удерживают память после завершения нагрузки.

## {heading({counter(hpa)}. Ознакомьтесь с архитектурой масштабирования по пользовательским метрикам)[id=k8s-hpa-custom]}

Для пользовательских метрик требуется дополнительный metrics pipeline:

```text
Приложение
  │ /metrics
  ▼
Prometheus
  │ PromQL
  ▼
Prometheus Adapter
  │ custom.metrics.k8s.io
  ▼
HPA
  ▼
Deployment replicas
```

Потребуются:

- приложение, публикующее Prometheus-метрики;
- Prometheus и Prometheus Operator (CRD `ServiceMonitor`/`PodMonitor`), которые предоставляются аддоном **Kube Prometheus Stack**;
- Prometheus Adapter;
- API aggregation layer Kubernetes;
- HPA `autoscaling/v2`.

Пример метрики приложения:

```text
http_requests_total{namespace="hpa-demo",pod="web-7c9d..."} 12345
```

Для HPA счетчик обычно преобразуют в скорость:

```promql
sum(rate(http_requests_total[2m])) by (namespace, pod)
```

Не масштабируйтесь непосредственно по накопительному значению `counter`: оно постоянно растет и не уменьшается при снижении нагрузки.

## {heading({counter(hpa)}. Установите и проверьте аддон Kube Prometheus Stack)[id=k8s-hpa-kube]}

В VK Cloud Prometheus разворачивается аддоном Kube Prometheus Stack. 

1. [Установите](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring#k8s-install-advanced-monitoring) аддон при создании кластера или в существующий кластер — через Terraform или веб-интерфейс. Пример установки через Terraform:

   ```hcl
   data "vkcs_kubernetes_addon_v2" "kps" {
     name    = "kube-prometheus-stack"
     version = "68.3.3"
   }

   resource "vkcs_kubernetes_cluster_addon_v2" "kps" {
     cluster_id       = vkcs_kubernetes_cluster_v2.k8s.id
     addon_id         = data.vkcs_kubernetes_addon_v2.kps.addon_id
     addon_version_id = data.vkcs_kubernetes_addon_v2.kps.id
     namespace        = "monitoring"
     values           = data.vkcs_kubernetes_addon_v2.kps.values_template
     addon_name       = "kube-prometheus-stack"
   }
   ```

1. После установки проверьте компоненты (пространство имен аддона по умолчанию — `monitoring`):

   ```bash
   kubectl get pods -n monitoring
   kubectl get svc -n monitoring | grep -i prometheus
   ```

1. Убедитесь, что установлены CRD Prometheus Operator (нужны для `ServiceMonitor`):

   ```bash
   kubectl get crd servicemonitors.monitoring.coreos.com
   kubectl get crd podmonitors.monitoring.coreos.com
   ```

   DNS-имя сервиса Prometheus в аддоне Kube Prometheus Stack:

   ```text
   prometheus-prometheus.monitoring.svc.cluster.local:9090
   ```

   Имя сервиса именно `prometheus-prometheus` (не `kube-prometheus-stack-prometheus`). Всегда проверяйте фактические имена с помощью команды: 
   
   ```console
   kubectl get svc -n monitoring
   ```

1. Проверьте доступность из кластера:

   ```bash
   kubectl run prometheus-check \
     -n hpa-demo \
     --rm -it \
     --restart=Never \
     --image=curlimages/curl:8.12.1 \
     -- curl -fsS \
     http://prometheus-prometheus.monitoring.svc.cluster.local:9090/-/ready
   ```

Под Prometheus запрашивает заметные CPU/RAM и монтирует PVC. На кластере из одного небольшого worker-узла (или при уже запущенных по HPA репликах) он может остаться в состоянии `Pending` (`Insufficient cpu` или  `unbound PersistentVolumeClaims`). [Включите](/ru/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-autoscaling-worker-nodes) автомасштабирование группы worker-узлов — [Cluster Autoscaler](/ru/kubernetes/k8s/concepts/cluster-autoscaler#k8s-cluster-autoscaler) добавит узел автоматически.

## {heading({counter(hpa)}. Подключите метрики приложения к Prometheus)[id=k8s-hpa-enable]}

1. Приложение должно публиковать метрики на HTTP endpoint, например:

   ```text
   GET /metrics
   ```

1. Service должен иметь именованный metrics-порт:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
     labels:
       app: custom-metrics-app
   spec:
     selector:
       app: custom-metrics-app
     ports:
       - name: http
         port: 80
         targetPort: 8080
       - name: metrics
         port: 9090
         targetPort: 9090
   ```

1. Если используется Prometheus Operator, создайте манифест `servicemonitor.yaml` для `ServiceMonitor`:

   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
   spec:
     selector:
       matchLabels:
         app: custom-metrics-app
     namespaceSelector:
       matchNames:
         - hpa-demo
     endpoints:
       - port: metrics
         path: /metrics
         interval: 15s
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f servicemonitor.yaml
   ```

   В аддоне Kube Prometheus Stack на платформе VK Cloud Prometheus сконфигурирован с пустыми `serviceMonitorSelector: {}` и `serviceMonitorNamespaceSelector: {}` — то есть подхватываются все `ServiceMonitor` во всех пространствах имен, дополнительная [метка](/ru/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints) (label) (например `release: kube-prometheus-stack`) не требуется. В классических Helm-установках `kube-prometheus-stack` это не так — там `ServiceMonitor` обычно должен иметь метку `release`, совпадающую с именем релиза. Чтобы проверить фактический селектор, используйте команду:

   ```console
   kubectl get prometheus -n monitoring -o yaml | grep -A3 serviceMonitorSelector
   ```

   Prometheus Operator автоматически добавляет к собранным `series` целевые метки `namespace`, `pod`, `service`, `container` — именно они нужны для `by (namespace, pod)` и для сопоставления метрики с подами в Prometheus Adapter. Отдельно настраивать relabeling для этого не нужно.

   `endpoints.port` в `ServiceMonitor` — это имя порта Service (не номер). Оно должно указывать на порт, за которым отдается `/metrics` (в примере выше — `metrics`, ведущий на порт метрик контейнера).

1. Проверьте в Prometheus запрос:

   ```promql
   http_requests_total{namespace="hpa-demo"}
   ```

1. Выполните команду:

   ```promql
   sum(rate(http_requests_total{namespace="hpa-demo"}[2m])) by (namespace, pod)
   ```

До установки адаптера запрос должен стабильно возвращать данные с метками `namespace` и `pod`.

## {heading({counter(hpa)}. Установите Prometheus Adapter)[id=k8s-hpa-adapter]}

1. Проверьте, установлен ли адаптер:

   ```bash
   kubectl get apiservice | grep custom.metrics
   kubectl get deployment -A | grep prometheus-adapter
   ```

   Если API уже существует и доступен, не устанавливайте второй адаптер.

1. Добавьте Helm-репозиторий:

   ```bash
   helm repo add prometheus-community \
     https://prometheus-community.github.io/helm-charts
   helm repo update
   ```

1. Создайте манифест `prometheus-adapter-values.yaml`:

   ```yaml
   prometheus:
     # Сервис Prometheus из аддона Kube Prometheus Stack
     url: http://prometheus-prometheus.monitoring.svc.cluster.local
     port: 9090

   rules:
     default: false
     custom:
       - seriesQuery: 'http_requests_total{namespace!="",pod!=""}'
         resources:
           overrides:
             namespace:
               resource: namespace
             pod:
               resource: pod
         name:
           matches: '^http_requests_total$'
           as: 'http_requests_per_second'
         metricsQuery: >-
           sum(
             rate(
               http_requests_total{
                 <<.LabelMatchers>>
               }[2m]
             )
           )
           by (<<.GroupBy>>)

   replicas: 2
   ```

1. Установите:

   ```bash
   helm upgrade --install prometheus-adapter \
     prometheus-community/prometheus-adapter \
     --namespace monitoring \
     --create-namespace \
     -f prometheus-adapter-values.yaml
   ```

1. Проверьте:

   ```bash
   kubectl rollout status deployment/prometheus-adapter \
     -n monitoring
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   ```

В выводе команд ожидается `AVAILABLE=True`.

Для аддона Kube Prometheus Stack на платформе VK Cloud используйте `url: http://prometheus-prometheus.monitoring.svc.cluster.local` и `port: 9090`. Если аддон установлен в другое пространство имен или имя сервиса отличается — проверьте их командой:

```console
kubectl get svc -n monitoring
```

Prometheus Adapter удобно ставить в то же пространство имен `monitoring`, где расположен аддон. И адаптер, и Prometheus потребляют ресурсы worker-узлов.

## {heading({counter(hpa)}. Проверьте Custom Metrics API)[id=k8s-hpa-api]}

1. Просмотрите список доступных метрик:

   ```bash
   kubectl get --raw \
     /apis/custom.metrics.k8s.io/v1beta1 | jq
   ```

1. Найдите:

   ```text
   pods/http_requests_per_second
   ```

   На проверенном кластере VK Cloud запрос корня `/apis/custom.metrics.k8s.io/v1beta1` возвращает `Error from server (NotFound)`, хотя API рабочий: `apiservice v1beta1.custom.metrics.k8s.io` в состоянии `True`, `custom.metrics.k8s.io/v1beta1` есть в `kubectl api-versions`, а конкретный запрос значения метрики отдает данные. Для проверки регистрации API используйте команду `kubectl get apiservice v1beta1.custom.metrics.k8s.io` и точечный запрос значения метрики, а не листинг корня.

1. Получите значения для подов:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. Если метрика не появляется, проверьте:

   ```bash
   kubectl logs deployment/prometheus-adapter \
     -n monitoring \
     --tail=200
   kubectl get apiservice v1beta1.custom.metrics.k8s.io -o yaml
   ```

   Частые причины:

   - Prometheus не видит исходную метрику.
   - У `series` отсутствуют метки `namespace` или `pod`.
   - Указан неверный URL Prometheus.
   - Окно `rate()` меньше `scrape interval`.
   - Адаптер еще не выполнил `relist`.
   - Ошибка TLS или API aggregation layer.

## {heading({counter(hpa)}. Создайте HPA по пользовательской метрике)[id=k8s-hpa-custom-create]}

Предположим, приложение называется `custom-metrics-app`, а целевое значение — в среднем 20 запросов в секунду на под.

1. Создайте манифест `hpa-custom.yaml`:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: custom-metrics-app
     namespace: hpa-demo
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: custom-metrics-app
     minReplicas: 2
     maxReplicas: 20
     metrics:
       - type: Pods
         pods:
           metric:
             name: http_requests_per_second
           target:
             type: AverageValue
             averageValue: "20"
     behavior:
       scaleUp:
         stabilizationWindowSeconds: 0
         policies:
           - type: Percent
             value: 100
             periodSeconds: 60
           - type: Pods
             value: 4
             periodSeconds: 60
         selectPolicy: Max
       scaleDown:
         stabilizationWindowSeconds: 300
         policies:
           - type: Percent
             value: 25
             periodSeconds: 60
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f hpa-custom.yaml
   kubectl describe hpa custom-metrics-app -n hpa-demo
   ```

   В статусе должна появиться метрика:

   ```text
   http_requests_per_second on pods: 8 / 20
   ```

## {heading({counter(hpa)}. Объедините CPU, RAM и пользовательскую метрику)[id=k8s-hpa-all]}

Один HPA может одновременно учитывать все три показателя:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: custom-metrics-app
  namespace: hpa-demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: custom-metrics-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 75
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second
        target:
          type: AverageValue
          averageValue: "20"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 60
        - type: Pods
          value: 4
          periodSeconds: 60
      selectPolicy: Max
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 25
          periodSeconds: 60
```

HPA рассчитает требуемое число реплик отдельно по CPU, RAM и RPS и выберет наибольшее.

## {heading({counter(hpa)}. Проведите нагрузочное тестирование)[id=k8s-hpa-test]}

1. Запустите нагрузку из отдельного пода:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://custom-metrics-app; done'
   ```

1. Наблюдайте:

   ```bash
   # watch (-w) работает только с одним типом ресурса:
   kubectl get pods -n hpa-demo -w
   ```

   Как и в [шаге 5](#k8s-hpa-cpu-check), команда `kubectl get hpa,pods -n hpa-demo -w` выдаст `error: you may only specify a single resource type`. Для одновременного наблюдения используйте команду:

   ```console
   watch kubectl get hpa,pods -n hpa-demo
   ```

1. В другом окне запустите:

   ```bash
   kubectl describe hpa custom-metrics-app -n hpa-demo
   kubectl top pods -n hpa-demo
   ```

1. Проверьте пользовательскую метрику:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. Остановите нагрузку:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

## {heading({counter(hpa)}. Проведите диагностику HPA)[id=k8s-hpa-diagnostics]}

- Общая проверка:

   ```bash
   kubectl get hpa -A
   kubectl describe hpa <HPA_NAME> -n <NAMESPACE>
   kubectl get events -n <NAMESPACE> --sort-by='.lastTimestamp'
   ```

- `Metrics not available`:

   ```bash
   kubectl top pods -n <ПРОСТРАНСТВО_ИМЕН>
   kubectl get apiservice v1beta1.metrics.k8s.io
   ```

- `FailedGetResourceMetric`:

   Убедитесь, что у всех контейнеров workload заданы `resources.requests`.

- `FailedGetPodsMetric`:

   ```bash
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1
   ```

- HPA не масштабируется вверх:

   Проверьте, что:

   - Текущая метрика превышает `target`.
   - `maxReplicas` еще не достигнут.
   - Новые поды помещаются на узлы.
   - В кластере достаточно CPU и RAM.
   - Cluster Autoscaler может увеличить группу узлов.
   - Нет quota, affinity, taints или PVC-ограничений. 
  
- HPA постоянно меняет количество реплик:

   Увеличьте окно стабилизации scale-down:

   ```yaml
   behavior:
     scaleDown:
       stabilizationWindowSeconds: 300
   ```

   Также используйте устойчивую метрику и достаточное окно PromQL, например `[2m]` вместо `[30s]`.

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-hpa-remove]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для прохождения этого практического руководства, вам больше не нужны, удалите их:

1. Удалите пространство имен `hpa-demo` и связанные с ним ресурсы:

   ```bash
   kubectl delete namespace hpa-demo
   ```

1. Удалите Prometheus Adapter:

   ```bash
   helm uninstall prometheus-adapter -n monitoring
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}

Не удаляйте Metrics Server (он предустановлен платформой VK Cloud), Prometheus или Adapter, если они являются общими компонентами.

## {heading(Итог)[id=k8s-hpa-summary]}

Для горизонтального масштабирования используются два `metrics pipeline`:

```text
CPU/RAM:
Kubelet → Metrics Server → metrics.k8s.io → HPA

Custom metrics:
Application → Prometheus → Prometheus Adapter
→ custom.metrics.k8s.io → HPA
```

`autoscaling/v2` позволяет объединять CPU, RAM и кастомные метрики в одном HPA. Итоговое число реплик определяется по метрике, которая в данный момент требует наибольшего масштабирования.

## {heading(Практические рекомендации)[id=k8s-hpa-recs]}

- Всегда задавайте корректные CPU и RAM в `requests`.
- Используйте `autoscaling/v2`.
- Настраивайте `readiness/startup probes`.
- Ограничивайте скорость scale-up и scale-down через `behavior`.
- Не используйте накопительные `counters` напрямую — применяйте `rate()` или `increase()`.
- Выбирайте метрику, которая уменьшается при добавлении подов: RPS на под, глубина очереди на worker-узел, число активных задач.
- Учитывайте задержки: scrape interval Prometheus, relist adapter, HPA sync period и запуск новых подов.
- Проверяйте, что группа узлов может масштабироваться вслед за HPA.
- Для production используйте минимум две реплики `metrics adapter`.
- Не создавайте два HPA, управляющих одним `Deployment`.
- Не изменяйте `spec.replicas` вручную или через GitOps без учета HPA.
- Для очередей и облачных сервисов рассмотрите `External` metrics или KEDA.
