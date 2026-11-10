# {heading(Контейнерлермен типтік операциялар)[id=k8s-containers]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Конфигурациялармен жұмыс)[id=k8s-containers-configurations]}

Конфигурация `kubectl` қай Kubernetes-кластерімен өзара әрекеттесетінін түсінуге мүмкіндік береді. Конфигурациялық файл құрылымы туралы толық ақпарат [Kubernetes ресми құжаттамасындағы](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters) мақалада келтірілген.

### {heading(Біріктірілген Kubeconfig параметрлерін алу)[id=k8s-containers-kubeconfig-settings]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config
```

### {heading(Бірнеше Kubeconfig файлын бір мезгілде пайдалану)[id=k8s-containers-kubeconfig-files]}

```console
KUBECONFIG=~/.kube/kubconfig1:~/.kube/kubconfig2
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view
```

### {heading(Конфигурациядан параметр мәнін алу)[id=k8s-containers-parameters]}

Конфигурациядан параметр мәнін алу үшін, мысалы пайдаланушының құпиясөзін, `-о` кілтін пайдаланыңыз.

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config view -o jsonpath='{.users[?(@.name == "<ПАЙДАЛАНУШЫ>")].user.password}'
```
Мұнда `<ПАЙДАЛАНУШЫ>` — пайдаланушы аты.

### {heading(kubectl утилитасының орындалу нысандарының тізімін алу)[id=k8s-containers-objects]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config get-contexts
```

### {heading(Ағымдағы орындалу нысанын алу)[id=k8s-containers-current]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config current-context
```

### {heading(kubectl утилитасының әдепкі орындалу контексті ретінде басқа кластерді орнату)[id=k8s-containers-another-cluster]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml config use-context <КЛАСТЕР>
```
Мұнда `<КЛАСТЕР>` — кластер атауы.

## {heading(Контейнерлер журналын көру)[id=k8s-containers-logs]}

1. Ағымдағы контейнерлер тізімін алыңыз:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml get po -n <АТАУЛАР КЕҢІСТІГІ>
   ```
   Мұнда `<АТАУЛАР КЕҢІСТІГІ>` — атаулар кеңістігінің атауы.

1. Нақты бір контейнердің журналдар тізімін алыңыз:

   ```console
   kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n <АТАУЛАР КЕҢІСТІГІ> logs <КОНТЕЙНЕР>
   ```
   Мұнда:

   * `<АТАУЛАР КЕҢІСТІГІ>` — атаулар кеңістігінің атауы.
   * `<КОНТЕЙНЕР>` — контейнер атауы.

   Жүйелік контейнерлер `kube-system` атаулар кеңістігінде орналасқан. Ең сұранысқа ие контейнерлер:

   * `cluster-autoscaler-*` — контейнерлерді масштабтау оқиғаларының журналы.

     `cluster-autoscaler-*` журналын көру мысалы:

     ```console
     kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs cluster-autoscaler-7f754489f8-qxsqf
     ...
     I1230 08:33:58.952822       1 filter_out_schedulable.go:90] No schedulable pods
     I1230 08:33:58.952850       1 static_autoscaler.go:334] No unschedulable pods
     I1230 08:33:58.952877       1 static_autoscaler.go:381] Calculating unneeded nodes
     ....84c14039e967,Unschedulable:false,Taints:[]Taint{Taint{Key:CriticalAddonsOnly,Value:True,Effect:NoSchedule,TimeAdded:<nil>,},Taint{Key:dedicated,Value:master,Effect:NoSchedule,TimeAdded:<nil>,},},ConfigSource:nil,PodCIDRs:[],}
     ...
     ```

   * `openstack-cloud-controller-*` — виртуализация платформасының барлық компоненттерінің өзара әрекеттесу журналы. Мысалдар: дисктер жасау үшін Cinder, ВМ жасау үшін Nova, балансирлеушілер үшін Octavia және т.б.

     `openstack-cloud-controller-*` журналын көру мысалы:

     ```console
     kubectl  --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml -n kube-system logs openstack-cloud-controller-manager-nnrlx
     ...
     Ensuring load balancer for service ingress-nginx/nginx-ingress-controller
     E1222 08:23:53.451038       1 service_controller.go:255] error processing service ingress-nginx/nginx-ingress-controller (will retry): failed to ensure load balancer: there are no available nodes for LoadBalancer service ingress-nginx/nginx-ingress-controller
     I1222 08:23:53.451162       1 event.go:255] Event(v1.ObjectReference{Kind:"Service", Namespace:"ingress-nginx", Name:"nginx-ingress-controller", UID:"68bb8ac5-b7f4-4404-94b2-943e7e55ddc9", APIVersion:"v1", ResourceVersion:"953", FieldPath:""}): type: 'Normal' reason: 'EnsuringLoadBalancer' Ensuring load balancer
     ...
     ```