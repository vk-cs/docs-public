{include(/kz/_includes/_translated_by_ai.md)}

[Vertical Pod Autoscaler](/kz/kubernetes/k8s/concepts/addons-and-settings/addons#vpa) (VPA) — Kubernetes контейнерлері үшін ресурстарды (CPU және RAM) автоматты түрде баптауға арналған құрал. Оның жұмысын толық көлемде зерделеу үшін оны Updater компонентімен `Recreate` режимінде пайдаланыңыз. Бұл режимде VPA:

1. Бар подтар үшін [ресурстар сұрауы](/kz/kubernetes/k8s/reference/resource-limiting) бойынша ұсынымдар жасайды.
1. Осы подтарды жояды және оларды ұсынылған мәндермен қайта жасайды.

## {heading(Дайындық қадамдары)[id=prepare]}

1. [Жасаңыз](../../instructions/create-cluster) кластерді, егер бұл әлі жасалмаса.
1. [Орнатып, баптаңыз](../../connect/kubectl) `kubectl`, егер бұл әлі жасалмаса.
1. [Қосылыңыз](../../connect/kubectl#check_connection) `kubectl` көмегімен кластерге.
1. [VPA аддонын орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-vpa), егер бұл әлі жасалмаса.
1. (Опционалды) [Kube Prometheus Stack аддонын орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring), егер бұл әлі жасалмаса. Оны VPA дашбордтарын қарау үшін пайдалана аласыз.

   Аддонды орнату кезінде [өңдеңіз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-monitoring#ornatu_kezinde_addondy_baptau_kodyn_ondeu) оның кодын, `kube-state-metrics` компонентіне VPA дашбордтарын баптауға арналған метрикаларды қосып:

   {cut(VPA дашбордтарын баптауға арналған метрикалар)}

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

## {heading(1. Deployment жұмыс жүктемесі контроллерін жасаңыз)[id=create_deployment]}

1. `nginx` қосымшасы үшін `Deployment` түріндегі [жұмыс жүктемесі](https://kubernetes.io/docs/concepts/workloads/) контроллеріне арналған манифест файлын жасаңыз: 

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
   Мұнда подтар үшін `resources` блогында [50 мебибайт RAM және 50m CPU сұралады](/kz/kubernetes/k8s/reference/resource-limiting), ал шектеу 100 мебибайт RAM және 100m CPU болып орнатылады. 

1. `Deployment` контроллері үшін `LoadBalancer` түрін көрсетіңіз:

   ```console
   kubectl expose deployment nginx --type=LoadBalancer --port 80
   ```

1. Жүктеме теңгергіші қосылғанша бірнеше минут күтіңіз де, оның сыртқы IP-мекенжайын алу үшін команданы орындаңыз:

   ```console
   kubectl get services nginx
   ```

   Шығарылған кестеден `EXTERNAL-IP` мәнін табыңыз:

   ```text
   NAME     TYPE             ...          EXTERNAL-IP             ...
   nginx    LoadBalancer     ...          100.70.146.28           ...
   ```

## {heading(2. Recreate режиміндегі Updater компоненті бар VPA аддонының объектісін жасаңыз және тестілеуді іске қосыңыз)[id=create_vpa]}

1. `Recreate` жұмыс режиміндегі Updater компоненті бар VPA аддоны үшін манифест файлын жасаңыз (`updateMode: "Recreate"`):

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

1. Бұрын жасалған қосымша үшін жүктеме теңгергішінің IP-мекенжайын пайдаланып, жүктемелік тестілеуді іске қосыңыз:

   ```console
   hey -z 300s -c 1000 http://100.70.146.28
   ```

## {heading(3. Нәтижелерді қараңыз)[id=create_vpa]}

1. VPA ұсынымдарын келесі командамен қараңыз:

   ```console
   kubectl describe vpa nginx-vpa
   ```

   Команда шығысының `Recommendation` блогында `Deployment` объектісі үшін VPA ұсынымдарын көресіз, олар подтарды кейін қолмен немесе VPA арқылы жасау кезінде ресурстарды қалай өзгертуге болатынын көрсетеді. Шығыс мысалы:

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

   Мұнда `Recommendation` блогында:

   - `Lower Bound` (төменгі шекара) — подтың жұмысқа қабілеттілігін кепілдендіруге болатын ресурстардың ең төменгі ұсынылған мәні. Төменгі шекара подты ресурстардың жетіспеуінен қорғайды, бұл тұрақсыз жұмысқа немесе қателерге әкелуі мүмкін.
   - `Target` (мақсат) — ресурстарды нақты тұтынуды көрсететін мән. 
   - `Uncapped Target` (көрсетілген шектеулерсіз мақсат) — VPA подтың нақты тұтынуы негізінде есептеген ресурстың оңтайлы мәні. `Target` мәнімен сәйкес келуі мүмкін. 
   - `Upper Bound` (жоғарғы шекара) — под үшін ұсынылатын ресурстардың ең жоғары мүмкін мәні. Жоғарғы шекара бөлінген ресурстардың шамадан тыс артуын болдырмайды.

   VPA Updater компонентімен `Recreate` режимінде жұмыс істеген кезде подты жою және кейін қайта жасау мына шарттар бір уақытта орындалса болады:

   - Подтың тұтынуы `Lower Bound` мәнінен төмен және `Target` мәнінен 10% жоғары немесе төмен.
   - Подтың тұтынуы `Upper Bound` мәнінен жоғары және `Target` мәнінен 10% жоғары немесе төмен.

1. Келесі команданы орындап, подтардың күйін нақты уақыт режимінде бақылаңыз:

   ```console
   kubectl get po --watch
   ```

   Команда шығысында `updateMode: "Recreate"` параметрімен VPA жұмысының нәтижесін көресіз: VPA ресурс сұрауына арналған ұсынымдарды өзгертті, соның нәтижесінде `Deployment` объектісі ескі подты жойып, оны жаңа параметрлермен қайта жасады. Шығыс мысалы:

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

1. Updater компоненті жойған под қайта жасалған кезде Admission Controller компоненті қосатын мета-ақпаратты қараңыз. Ол үшін келесі команданы орындаңыз:

   ```console
   kubectl describe po nginx-76894897bc-mskzl
   ```

   Шығыс мысалы:

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

1. (Опционалды) Аддон жұмысының нәтижелерін Grafana дашбордында қараңыз:

   1. [Қосылыңыз](/kz/kubernetes/k8s/connect/addons-ui#web-ui) Kube Prometheus Stack аддоны құрамына кіретін Grafana веб-интерфейсіне. 
   1. **Home → Dashboards → General → VPA Recommendations** бөліміндегі дашбордтарды қараңыз. 

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол енді қажет болмаса:

- [тоқтатыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#stop) оны, кейінірек пайдалану үшін;
- [жойыңыз](../../instructions/manage-cluster#delete_cluster) оны біржола.
