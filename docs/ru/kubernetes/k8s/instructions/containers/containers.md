# {heading(Типовые операции с контейнерами)[id=k8s-containers]}

## {heading(Работа с конфигурациями)[id=k8s-containers-configurations]}

Конфигурация позволяет понять, с каким Kubernetes-кластером взаимодействует `kubectl`. Подробная информация о структуре конфигурационного файла приведена в статье [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters).

### {heading(Получение объединенных настроек Kubeconfig)[id=k8s-containers-kubeconfig-settings]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config
```

### {heading(Использование нескольких файлов Kubeconfig одновременно)[id=k8s-containers-kubeconfig-files]}

```console
KUBECONFIG=~/.kube/kubconfig1:~/.kube/kubconfig2
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view
```

### {heading(Получение значения параметра из конфигурации)[id=k8s-containers-parameters]}

Чтобы получить значение параметра из конфигурации, например пароль для пользователя, используйте ключ `-о`.

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view -o jsonpath='{.users[?(@.name == "<ПОЛЬЗОВАТЕЛЬ>")].user.password}'
```
Здесь `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя.

### {heading(Получение списка объектов выполнения утилиты kubectl)[id=k8s-containers-objects]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config get-contexts
```

### {heading(Получение текущего объекта выполнения)[id=k8s-containers-current]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config current-context
```

### {heading(Установка другого кластера в качестве контекста выполнения утилиты kubectl по умолчанию)[id=k8s-containers-another-cluster]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config use-context <КЛАСТЕР>
```
Здесь `<КЛАСТЕР>` — название кластера.

## {heading(Просмотр журналов контейнеров)[id=k8s-containers-logs]}

1. Получите список текущих контейнеров:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml get po -n <ПРОСТРАНСТВО_ИМЕН>
   ```
   Здесь `<ПРОСТРАНСТВО_ИМЕН>` — название пространства имен.

1. Получите список журналов конкретного контейнера:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n <ПРОСТРАНСТВО_ИМЕН> logs <КОНТЕЙНЕР>
   ```
   Здесь:

   * `<ПРОСТРАНСТВО_ИМЕН>` — название пространства имен.
   * `<КОНТЕЙНЕР>` — название контейнера.

   Системные контейнеры расположены в пространстве имен `kube-system`. Наиболее востребованные контейнеры:

   * `cluster-autoscaler-*` — журнал событий масштабирования контейнеров.
     
     Пример просмотра журнала `cluster-autoscaler-*`:

     ```console
     kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs cluster-autoscaler-7f754489f8-qxsqf
     ...
     I1230 08:33:58.952822       1 filter_out_schedulable.go:90] No schedulable pods
     I1230 08:33:58.952850       1 static_autoscaler.go:334] No unschedulable pods
     I1230 08:33:58.952877       1 static_autoscaler.go:381] Calculating unneeded nodes
     ....84c14039e967,Unschedulable:false,Taints:[]Taint{Taint{Key:CriticalAddonsOnly,Value:True,Effect:NoSchedule,TimeAdded:<nil>,},Taint{Key:dedicated,Value:master,Effect:NoSchedule,TimeAdded:<nil>,},},ConfigSource:nil,PodCIDRs:[],}
     ...
     ```

   * `openstack-cloud-controller-*` — журнал взаимодействия всех компонентов платформы виртуализации. Примеры: с Cinder для создания дисков, с Nova для создания ВМ, Octavia для балансировщиков и так далее.

     Пример просмотра журнала `openstack-cloud-controller-*`:
   
     ```console
     kubectl  --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs openstack-cloud-controller-manager-nnrlx
     ...
     Ensuring load balancer for service ingress-nginx/nginx-ingress-controller
     E1222 08:23:53.451038       1 service_controller.go:255] error processing service ingress-nginx/nginx-ingress-controller (will retry): failed to ensure load balancer: there are no available nodes for LoadBalancer service ingress-nginx/nginx-ingress-controller
     I1222 08:23:53.451162       1 event.go:255] Event(v1.ObjectReference{Kind:"Service", Namespace:"ingress-nginx", Name:"nginx-ingress-controller", UID:"68bb8ac5-b7f4-4404-94b2-943e7e55ddc9", APIVersion:"v1", ResourceVersion:"953", FieldPath:""}): type: 'Normal' reason: 'EnsuringLoadBalancer' Ensuring load balancer
     ...
     ```