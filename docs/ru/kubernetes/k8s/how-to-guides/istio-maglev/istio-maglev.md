# {heading(Балансировка нагрузки по алгоритмам LEAST_REQUEST и MAGLEV с помощью аддона Istio)[id=k8s-istio-balancing]}

В этом практическом руководстве показана внутренняя балансировка между подами одного Kubernetes Service с помощью аддона [Istio](/ru/kubernetes/k8s/concepts/addons-and-settings/addons#k8s-addons-istio):

- `LEAST_REQUEST` — Envoy предпочитает бэкэнд с меньшим числом незавершенных запросов;
- `MAGLEV` — запросы с одинаковым ключом хеширования преимущественно попадают в один бэкэнд.

{note:info} 
В Istio алгоритм `LEAST_CONN` устарел. Для HTTP/gRPC используйте `LEAST_REQUEST`.
{/note}

## {heading(Подготовительные шаги)[id=k8s-im-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Создайте]} кластер актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. [Установите](/ru/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-istio/install-advanced-istio-mk8s#k8s-install-advanced-istio-mk8s) аддон Istio, если это еще не сделано. Если аддон установлен, переустанавливать его не нужно.

## {heading({counter(im)}. Проверьте Istio)[id=k8s-im-check]}

1. Выполните команды:

   ```bash
   kubectl get pods -n istio-system
   kubectl get crd destinationrules.networking.istio.io
   kubectl get mutatingwebhookconfiguration | grep -i istio
   istioctl version
   ```

1. Просмотрите вывод команд.

   `istioctl` нужен для диагностики. Основные ресурсы можно создать через `kubectl`. Версию `istioctl` берите соответствующей версии аддона (например, 1.29.2).

   В выводе `istio-system` вы можете увидеть под `ztunnel` — аддон разворачивает Istio с поддержкой ambient-режима. Для этого практического руководства это не мешает: sidecar-режим также доступен (есть webhook `istio-sidecar-injector`), а `DestinationRule` с `LEAST_REQUEST`/`MAGLEV` применяется именно к sidecar-трафику.

## {heading({counter(im)}. Создайте пространство имен с инъекцией sidecar)[id=k8s-im-sidecar]}

Создайте и настройте пространство `istio-lb-demo`:

```bash
kubectl create namespace istio-lb-demo
kubectl label namespace istio-lb-demo istio-injection=enabled
kubectl get namespace istio-lb-demo --show-labels
```

Если аддон использует revision-based injection, вместо этой метки задайте установленную ревизию:

```bash
kubectl label namespace istio-lb-demo istio.io/rev=<REVISION> --overwrite
```

Используйте только один вариант: `istio-injection=enabled` или `istio.io/rev`.

## {heading({counter(im)}. Разверните бэкэнд)[id=k8s-im-backend]}

1. Создайте манифест `backend.yaml`:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: node-info
     template:
       metadata:
         labels:
           app: node-info
       spec:
         topologySpreadConstraints:
           - maxSkew: 1
             topologyKey: kubernetes.io/hostname
             whenUnsatisfiable: ScheduleAnyway
             labelSelector:
               matchLabels:
                 app: node-info
         containers:
           - name: node-info
             image: hashicorp/http-echo:1.0
             ports:
               - name: http
                 containerPort: 8080
             env:
               - name: NODE_NAME
                 valueFrom:
                   fieldRef:
                     fieldPath: spec.nodeName
               - name: POD_NAME
                 valueFrom:
                   fieldRef:
                     fieldPath: metadata.name
             command: ["/http-echo"]
             args:
               - "-listen=:8080"
               - "-text=pod=$(POD_NAME) node=$(NODE_NAME)"
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     selector:
       app: node-info
     ports:
       - name: http
         port: 80
         targetPort: http
   ```

   Образ `hashicorp/http-echo:1.0` — `distroless`, в нем нет `/bin/sh`. Поэтому бинарный файл запускается напрямую (`command: ["/http-echo"]`), а имена пода и узла подставляются механизмом переменных Kubernetes `$(VAR)` (downward API), а не `shell`. Обертка вида `command: ["/bin/sh", "-ec"]` привела бы к ошибке `CreateContainerError` (`exec: "/bin/sh": no such file or directory`).

1. Примените манифест:

   ```bash
   kubectl apply -f backend.yaml
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

У каждого пода должны быть `node-info` и `istio-proxy`. В Istio версии 1.29 sidecar-контейнер инъектируется как native sidecar — то есть как `initContainer` с `restartPolicy: Always`, а не как обычный контейнер. Поэтому проверьте оба списка:

```bash
# основной контейнер приложения
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" containers="}{.spec.containers[*].name}{"\n"}{end}'

# istio-proxy (и istio-validation) — в initContainers
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" init="}{.spec.initContainers[*].name}{"\n"}{end}'
```

Если ориентироваться только на `.spec.containers[*].name`, `istio-proxy` в выводе не появится (он в `initContainers`) — это не значит, что инъекции нет. Готовность пода `2/2` подтверждает, что sidecar работает.

## {heading({counter(im)}. Разверните клиент внутри mesh)[id=k8s-im-mesh]}

1. Создайте манифест `client.yaml`:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: curl-client
     namespace: istio-lb-demo
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: curl-client
     template:
       metadata:
         labels:
           app: curl-client
       spec:
         containers:
           - name: curl
             image: curlimages/curl:8.12.1
             command: ["/bin/sh", "-c", "sleep infinity"]
   ```

1. Примените манифест и выполните команды:

   ```bash
   kubectl apply -f client.yaml
   kubectl rollout status deployment/curl-client -n istio-lb-demo

   export CLIENT_POD=$(kubectl get pod -n istio-lb-demo   -l app=curl-client   -o jsonpath='{.items[0].metadata.name}')

   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.containers[*].name}'; echo
   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.initContainers[*].name}'; echo
   ```

В клиентском поде также должен присутствовать `istio-proxy` — как и в бэкэнде, он находится в `initContainers` (native sidecar).

## {heading({counter(im)}. Проверьте исходное распределение)[id=k8s-im-distrib]}

Выполните команду:

```bash
kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 15); do
    curl -s -H "Connection: close" http://node-info/;
  done'
```

В выводе команды должны быть указаны разные поды.

## {heading({counter(im)}. Настройте LEAST_REQUEST)[id=k8s-im-least]}

1. Создайте манифест `least-request.yaml`:

   ```yaml
   apiVersion: networking.istio.io/v1
   kind: DestinationRule
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     host: node-info.istio-lb-demo.svc.cluster.local
     trafficPolicy:
       loadBalancer:
         simple: LEAST_REQUEST
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f least-request.yaml
   kubectl get destinationrule -n istio-lb-demo
   ```

1. Проверьте конфигурацию Envoy:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i LEAST_REQUEST
   ```

1. Отправьте параллельные запросы:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'seq 1 30 |
       xargs -P 10 -I {}     curl -s -H "Connection: close" http://node-info/'
   ```

`LEAST_REQUEST` не учитывает CPU и память. Envoy сравнивает число незавершенных запросов, видимое конкретному sidecar-rj контейнеру. Для максимально наглядной демонстрации используйте бэкенд с задержкой ответа или нагрузочный генератор Fortio.

## {heading({counter(im)}. Настройте MAGLEV)[id=k8s-im-maglev]}

1. Создайте манифест `maglev.yaml`:

   ```yaml
   apiVersion: networking.istio.io/v1
   kind: DestinationRule
   metadata:
     name: node-info
     namespace: istio-lb-demo
   spec:
     host: node-info.istio-lb-demo.svc.cluster.local
     trafficPolicy:
       loadBalancer:
         consistentHash:
           httpHeaderName: x-user-id
           maglev:
             tableSize: 65537
   ```

1. Примените манифест:

   ```bash
   kubectl apply -f maglev.yaml
   ```

1. Проверьте Envoy:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i MAGLEV
   ```

## {heading({counter(im)}. Проверьте MAGLEV)[id=k8s-im-maglev-check]}

1. Выполните двадцать запросов с одинаковым ключом:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 20); do
       curl -s       -H "Connection: close"       -H "x-user-id: user-123"       http://node-info/;
     done'
   ```

   При неизменном наборе эндпоинтов ответы должны преимущественно приходить от одного бэкэнд-пода.

1. Проверьте разные ключи:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in user-1 user-2 user-3 user-4 user-5; do
       printf "%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: $user"       http://node-info/;
     done'
   ```

## {heading({counter(im)}. Проверьте поведение при удалении пода)[id=k8s-im-pod-delete]}

1. Сохраните соответствие пользователей бэкэндам:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in $(seq 1 30); do
       printf "user-%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: user-$user"       http://node-info/;
     done'
   ```

1. Удалите один бэкэнд-под:

   ```bash
   kubectl delete pod -n istio-lb-demo   $(kubectl get pod -n istio-lb-demo     -l app=node-info     -o jsonpath='{.items[0].metadata.name}')
   ```

1. Дождитесь восстановления:

   ```bash
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

1. Повторите тест. 
   Большая часть ключей, связанных с оставшимися эндпоинтами, должна сохранить прежнее соответствие; ключи удаленного эндпоинта будут перераспределены.

MAGLEV обеспечивает мягкую affinity, а не гарантированную постоянную сессию.

## {heading({counter(im)}. Выполните проверку из Windows PowerShell)[id=k8s-im-win]}

Файл `kubeconfig` платформы VK Cloud использует exec-плагин `client-keystone-auth`, который берет учетные данные из переменных окружения `OS_*`. В `bash` их задает `openrc`-скрипт, а в отдельной сессии PowerShell их нет — иначе команды падают с `Invalid user credentials`. Перед проверкой задайте переменные: значения возьмите из RC-файла вашего проекта; `OS_USER_DOMAIN_NAME` должен совпадать с реальным доменом пользователя.

1. Выполните команды:

   ```powershell
   $env:KUBECONFIG = "C:\path\to\kubeconfig.yaml"
   $env:OS_AUTH_URL = "https://infra.mail.ru:35357/v3/"
   $env:OS_PROJECT_ID = "<project-id>"
   $env:OS_REGION_NAME = "RegionOne"
   $env:OS_USERNAME = "<username>"
   $env:OS_USER_DOMAIN_NAME = "<user-domain>"
   $env:OS_PASSWORD = "<password>"
   $env:OS_INTERFACE = "public"
   $env:OS_IDENTITY_API_VERSION = "3"
   ```

1. Выполните команды:

   ```powershell
   $ClientPod = kubectl get pod -n istio-lb-demo `
     -l app=curl-client `
     -o jsonpath='{.items[0].metadata.name}'

   1..20 | ForEach-Object {
       kubectl exec -n istio-lb-demo $ClientPod -c curl -- `
         curl -s `
         -H "Connection: close" `
         -H "x-user-id: user-123" `
         http://node-info/
   }
   ```

1. Выполните проверку разных ключей:

   ```powershell
   1..10 | ForEach-Object {
       $User = "user-$_"

       $Result = kubectl exec -n istio-lb-demo $ClientPod -c curl -- `
         curl -s `
         -H "Connection: close" `
         -H "x-user-id: $User" `
         http://node-info/

       Write-Host "$User -> $Result"
   }
   ```

## {heading({counter(im)}. Проведите диагностику)[id=k8s-im-diagnostics]}

Выполните команды:

```bash
kubectl get destinationrule -n istio-lb-demo -o yaml
kubectl get endpointslice -n istio-lb-demo   -l kubernetes.io/service-name=node-info
istioctl proxy-status
istioctl proxy-config endpoints "$CLIENT_POD"   -n istio-lb-demo   --cluster "outbound|80||node-info.istio-lb-demo.svc.cluster.local"
istioctl analyze -n istio-lb-demo
```

Если политика не применяется, убедитесь, что:

1. У клиентского pod есть `istio-proxy`.
1. `DestinationRule` находится в области видимости клиента.
1. В `spec.host` указан корректный FQDN.
1. Порт Service называется `http`.
1. Клиент обращается к Service, а не напрямую к pod IP.
1. Proxy синхронизирован с Istiod.

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-im-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для прохождения этого практического руководства, вам больше не нужны, удалите их:

1. Удалите пространство имен `istio-lb-demo` и связанные с ним ресурсы:

   ```bash
   kubectl delete namespace istio-lb-demo
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}

## {heading(Итог)[id=k8s-im-summary]}

Прохождение этого практического руководства подтверждает:

- Балансировка выполняется Envoy sidecar.
- Алгоритм задается отдельно для конкретного Service.
- `LEAST_REQUEST` предпочитает эндпоинты с меньшим числом outstanding requests.
- `MAGLEV` создает устойчивое соответствие между ключом запроса и бэкэнд-подом.
- Переустановка Istio-аддона не требуется.

## {heading(Ограничения)[id=k8s-im-restrictions]}

- Политика действует только на трафик через Istio data plane.
- Каждый sidecar принимает решение независимо; глобального счетчика нагрузки нет.
- `LEAST_REQUEST` не использует CPU, RAM или пользовательские метрики.
- Maglev не хранит сессии и не гарантирует абсолютную sticky-session.
- Для production добавьте `readiness probes`, `outlierDetection` и `PodDisruptionBudget`.
