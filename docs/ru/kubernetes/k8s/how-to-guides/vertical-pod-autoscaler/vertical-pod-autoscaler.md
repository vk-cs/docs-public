[Vertical Pod Autoscaler](/ru/kubernetes/k8s/concepts/addons-and-settings/addons#vpa) (VPA) — инструмент для автоматической настройки ресурсов (CPU и RAM) для контейнеров Kubernetes. Чтобы изучить его работу в полном объеме, используйте его с компонентом Updater в режиме `Recreate`. В этом режиме VPA:

1. Создаст рекомендации по [запросу ресурсов](/ru/kubernetes/k8s/reference/resource-limiting) для уже существующих подов.
1. Удалит эти поды и пересоздаст их с рекомендованными значениями.

## {heading(Подготовительные шаги)[id=prepare]}

1. [Создайте](../../instructions/create-cluster) кластер, если это еще не сделано.
1. [Установите и настройте](../../connect/kubectl) `kubectl`, если это еще не сделано.
1. [Подключитесь](../../connect/kubectl#check_connection) к кластеру при помощи `kubectl`.
1. [Установите аддон VPA](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-vpa), если это еще не сделано.
1. (Опционально) [Установите аддон Kube Prometheus Stack](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring), если это еще не сделано. Вы сможете использовать его для просмотра дашбордов VPA.

   Во время установки аддона [отредактируйте](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring#redaktirovanie_koda_nastroyki_addona_pri_ustanovke) его код, добавив метрики для конфигурации дашбордов VPA в компонент `kube-state-metrics`:

   {cut(Метрики для конфигурации дашбордов VPA)}
   
   ```yaml
   # to kube-state-metrics
   # begin
     rbac:
       extraRules:
         - apiGroups: ["autoscaling.k8s.io"]
           resources: ["verticalpodautoscalers"]
           verbs: ["list", "watch"]
     customResourceState:
       enabled: true
       config:
         kind: CustomResourceStateMetrics
         spec:
           resources:
             - groupVersionKind:
                 group: autoscaling.k8s.io
                 kind: "VerticalPodAutoscaler"
                 version: "v1"
               labelsFromPath:
                 verticalpodautoscaler: [metadata, name]
                 namespace: [metadata, namespace]
                 target_api_version: [spec, targetRef, apiVersion]
                 target_kind: [spec, targetRef, kind]
                 target_name: [spec, targetRef, name]
               metrics:
                 # Labels
                 - name: "verticalpodautoscaler_labels"
                   help: "VPA container recommendations. Kubernetes labels converted to Prometheus labels"
                   each:
                     type: Info
                     info:
                       labelsFromPath:
                         name: [metadata, name]
                 # Memory Information
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_target"
                   help: "VPA container recommendations for memory. Target resources the VerticalPodAutoscaler recommends for the container."
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [target, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_lowerbound"
                   help: "VPA container recommendations for memory. Minimum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [lowerBound, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_upperbound"
                   help: "VPA container recommendations for memory. Maximum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [upperBound, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_uncappedtarget"
                   help: "VPA container recommendations for memory. Target resources the VerticalPodAutoscaler recommends for the container ignoring bounds"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [uncappedTarget, memory]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "memory"
                     unit: "byte"
                 # CPU Information
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_target"
                   help: "VPA container recommendations for cpu. Target resources the VerticalPodAutoscaler recommends for the container."
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [target, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_lowerbound"
                   help: "VPA container recommendations for cpu. Minimum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [lowerBound, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_upperbound"
                   help: "VPA container recommendations for cpu. Maximum resources the container can use before the VerticalPodAutoscaler updater evicts it"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [upperBound, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
                 - name: "verticalpodautoscaler_status_recommendation_containerrecommendations_uncappedtarget"
                   help: "VPA container recommendations for cpu. Target resources the VerticalPodAutoscaler recommends for the container ignoring bounds"
                   each:
                     type: Gauge
                     gauge:
                       path: [status, recommendation, containerRecommendations]
                       valueFrom: [uncappedTarget, cpu]
                       labelsFromPath:
                         container: [containerName]
                   commonLabels:
                     resource: "cpu"
                     unit: "core"
     selfMonitor:
       enabled: true
   # end
   ```
   {/cut}

## {heading(1. Создайте контроллер рабочей нагрузки Deployment)[id=create_deployment]}

1. Создайте файл манифеста для контроллера [рабочей нагрузки](https://kubernetes.io/docs/concepts/workloads/) типа `Deployment` для приложения `nginx`: 

   ```console
   kubectl apply -f -
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     labels:
       app: nginx
     name: nginx
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: nginx
    strategy: {}
    template:
      metadata:
        labels:
          app: nginx
     spec:
       containers:
       - image: nginx
         name: nginx
         resources:
           requests:
             cpu: 50m
             memory: 50Mi
           limits:
             cpu: 100m
             memory: 100Mi
   ```
   Здесь в блоке `resources` для подов [запрашивается](/ru/kubernetes/k8s/reference/resource-limiting) 50 мебибайт RAM и 50m CPU и устанавливается ограничение в 100 мебибайт RAM и 100m CPU. 

1. Укажите для контроллера `Deployment` тип `LoadBalancer`:

   ```console
   kubectl expose deployment nginx --type=LoadBalancer --port 80
   ```

1. Подождите несколько минут, пока включается балансировщик нагрузки, и выполните команду, чтобы получить его внешний IP-адрес:

   ```console
   kubectl get services nginx
   ```
   
   Найдите значение `EXTERNAL-IP` в выведенной таблице:

   ```text
   NAME     TYPE             ...          EXTERNAL-IP             ...
   nginx    LoadBalancer     ...          100.70.146.28           ...
   ```

## {heading(2. Создайте объект аддона VPA с компонентом Updater в режиме Recreate и запустите тестирование)[id=create_vpa]}

1. Создайте файл манифеста для аддона VPA с компонентом Updater в режиме работы `Recreate` (`updateMode: "Recreate"`):

   ```console
   kubectl apply -f -
   apiVersion: autoscaling.k8s.io/v1
   kind: VerticalPodAutoscaler
   metadata:
    name: nginx-vpa
   spec:
    targetRef:
      apiVersion: "apps/v1"
      kind:       Deployment
      name:       nginx
    updatePolicy:
      updateMode: "Recreate"
    resourcePolicy:
      containerPolicies:
        - containerName: "nginx"
          minAllowed:
            cpu: "250m"
            memory: "100Mi"
          maxAllowed:
            cpu: "2000m"
            memory: "2048Mi"
   ```
   
1. Запустите нагрузочное тестирование для созданного ранее приложения, используя IP-адрес балансировщика нагрузки:

   ```console
   hey -z 300s -c 1000 http://100.70.146.28
   ```
   
## {heading(3. Просмотрите результаты)[id=create_vpa]}

1. Просмотрите рекомендации от VPA с помощью команды:

   ```console
   kubectl describe vpa nginx-vpa
   ```

   В выводе команды в блоке `Recommendation` вы увидите рекомендации VPA для объекта `Deployment`, отображающие, как можно изменить ресурсы подов при их последующем создании вручную или через VPA. Пример вывода:

   ```console
   Name:         nginx-vpa
   Namespace:    default
   Labels:       <none>
   Annotations:  <none>
   API Version:  autoscaling.k8s.io/v1
   Kind:         VerticalPodAutoscaler
   Metadata:
     Creation Timestamp:  2025-09-16T12:02:45Z
     Generation:          1
     Resource Version:    10112725
     UID:                 35866c72-60b4-4b7c-87e3-f79de17c4263
   Spec:
     Resource Policy:
       Container Policies:
         Container Name:  nginx
         Max Allowed:
           Cpu:     2000m
           Memory:  2048Mi
         Min Allowed:
           Cpu:     250m
           Memory:  100Mi
     Target Ref:
       API Version:  apps/v1
       Kind:         Deployment
       Name:         nginx
     Update Policy:
       Update Mode:  Recreate
   Status:
     Conditions:
       Last Transition Time:  2025-09-16T12:03:38Z
       Status:                True
       Type:                  RecommendationProvided
    Recommendation:
      Container Recommendations:
        Container Name:  nginx
        Lower Bound:
          Cpu:     250m
          Memory:  104857600
        Target:
          Cpu:     250m
          Memory:  104857600
        Uncapped Target:
          Cpu:     15m
          Memory:  104857600
        Upper Bound:
          Cpu:     250m
          Memory:  104857600
   Events:
     Type    Reason      Age   From         Message
     ----    ------      ----  ----         -------
     Normal  EvictedPod  100s  vpa-updater  VPA Updater evicted Pod nginx-76894897bc-tmc44 to apply resource recommendation.
     Normal  EvictedPod  40s   vpa-updater  VPA Updater evicted Pod nginx-76894897bc-vfm9n to apply resource recommendation.
   ```

   Здесь в блоке `Recommendation`:

   - `Lower Bound` (нижняя граница) — минимальное рекомендованное значение ресурсов, при котором можно гарантировать работоспособность пода. Нижняя граница защищает под от недостатка ресурсов, который может привести к нестабильной работе или ошибкам.
   - `Target` (цель) — значение, которое отображает фактическое потребление ресурсов. 
   - `Uncapped Target` (цель без указанных ограничений) — оптимальное значение ресурса, которое VPA рассчитал, исходя из фактического потребления пода. Может совпадать со значением `Target`. 
   - `Upper Bound` (верхняя граница) — максимально возможное значение ресурсов, которое рекомендовано для пода. Верхняя граница предотвращает чрезмерное увеличение выделенных ресурсов.

   При работе VPA с компонентом Updater в режиме `Recreate` удаление и последующее пересоздание пода будет происходить, если одновременно:

   - Потребление пода ниже значения `Lower Bound` и на 10% выше или ниже значения `Target`.
   - Потребление пода выше значения `Upper Bound` и на 10% выше или ниже значения `Target`.

1. Отследите состояние подов в реальном времени, выполнив команду:

   ```console
   kubectl get po --watch
   ```

   В выводе команды вы увидите результат работы VPA с `updateMode: "Recreate"`: VPA изменил рекомендации для запроса ресурсов, в результате объект `Deployment` удалил старый под и повторно создал его с новыми параметрами. Пример вывода:

   ```console
   NAME                                        READY   STATUS              RESTARTS   AGE  
   metrics-scraper                             1/1     Running             0          29d  
   nginx-76894897bc-vfm9n                      1/1     Running             0          55s  
   nginx-76894897bc-wrbj7                      0/1     ContainerCreating   0          7s   
   vpa-admission-controller-5f84cf7bf5-9xr8p   1/1     Running             0          15m  
   vpa-recommender-8d8999979-8stct             1/1     Running             0          4d21h
   vpa-updater-6d48bdf676-p7vbj                1/1     Running             0          15m  
   nginx-76894897bc-wrbj7                      1/1     Running             0          12s
   nginx-76894897bc-vfm9n                      1/1     Running             0          108s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          108s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          108s
   nginx-76894897bc-mskzl                      0/1     Pending             0          0s  
   nginx-76894897bc-mskzl                      0/1     Pending             0          0s
   nginx-76894897bc-mskzl                      0/1     ContainerCreating   0          0s
   nginx-76894897bc-mskzl                      0/1     ContainerCreating   0          0s
   nginx-76894897bc-vfm9n                      1/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-vfm9n                      0/1     Terminating         0          109s
   nginx-76894897bc-mskzl                      1/1     Running             0          11s
   ```

1. Просмотрите мета-информацию, которую добавляет компонент Admission Controller при повторном создании пода, удаленного компонентом Updater. Для этого выполните команду:

   ```console
   kubectl describe po nginx-76894897bc-mskzl
   ```
   
   Пример вывода:

   ```console
   Name:             nginx-76894897bc-mskzl
   Namespace:        default
   Priority:         0
   Service Account:  default
   Node:             k8s-test-129-prometheus-0/192.168.1.27
   Start Time:       Tue, 16 Sep 2025 15:04:54 +0300
   Labels:           app=nginx
                     pod-template-hash=76894897bc
   Annotations:      cni.projectcalico.org/containerID: 161f4da190ec19f47c835ec3b2078e8c65750468c0eca310cec5f1e47f92a49e
                     cni.projectcalico.org/podIP: 10.100.124.114/32
                     cni.projectcalico.org/podIPs: 10.100.124.114/32
                     vpaObservedContainers: nginx
                     vpaUpdates: Pod resources updated by nginx-vpa: container 0: cpu request, memory request, cpu limit, memory limit
   Status:           Running
   IP:               10.100.124.114
   ```

1. (Опционально) Просмотрите результаты работы аддона в дашборде Grafana:

   1. [Подключитесь](/ru/kubernetes/k8s/connect/addons-ui#web-ui) к веб-интерфейсу Grafana, входящему в состав аддона Kube Prometheus Stack. 
   1. Просмотрите дашборды в разделе **Home → Dashboards → General → VPA Recommendations**. 

## Удалите неиспользуемые ресурсы

Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [остановите](/ru/kubernetes/k8s/instructions/manage-cluster#stop) его, чтобы воспользоваться им позже;
- [удалите](../../instructions/manage-cluster#delete_cluster) его навсегда.