# {heading(Использование Kgateway)[id=k8s-kgateway]}

Используйте аддон {linkto(../../concepts/addons-and-settings/addons#k8s-addons-kgateway)[text=Kgateway]}, чтобы настроить маршрутизацию трафика в кластере Kubernetes через [Gateway API](https://gateway-api.sigs.k8s.io/) и направить запросы к тестовому приложению.

{note:info}
Kgateway доступен только для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-kgateway-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Создайте]} кластер актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-kgateway#k8s-install-advanced-kgateway)[text=Установите аддон Kgateway]}, если это еще не сделано.

## {heading({counter(kgateway)}. Создайте тестовое приложение)[id=k8s-kgateway-app]}
   
1. Создайте файл манифеста `httpbin.yaml` для тестового приложения `httpbin`:

   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: httpbin
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     ports:
       - port: 8000
         targetPort: 8080
     selector:
       app: httpbin
   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: httpbin
     template:
       metadata:
         labels:
           app: httpbin
       spec:
         containers:
           - name: httpbin
             image: docker.io/mccutchen/go-httpbin:v2.6.0
             ports:
               - containerPort: 8080
   ```

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f httpbin.yaml
   ```
   
В результате применения манифеста будет запущено тестовое приложение `httpbin` в виде `Deployment`, а также будет создан сервис для внутреннего доступа к этому приложению. Kgateway в дальнейшем будет принимать внешний HTTP-трафик, маршрутизировать его и перенаправлять в этот сервис.  

## {heading({counter(kgateway)}. Создайте объект Gateway)[id=k8s-kgateway-gateway]}

{note:warn}
Для объекта Gateway будут созданы {linkto(../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]} и {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-адрес]}. Их использование {linkto(../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

1. Создайте файл манифеста `my-gateway.yaml` для ресурса Gateway API [типа](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/) `Gateway`:

   ```yaml
   apiVersion: gateway.networking.k8s.io/v1
   kind: Gateway
   metadata:
     name: http
     namespace: httpbin
   spec:
     gatewayClassName: kgateway
     listeners:
       - name: http
         protocol: HTTP
         port: 8080
   ```

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f my-gateway.yaml
   ```

В результате применения манифеста Kgateway создаст сервис типа `LoadBalancer`. {var(cloud)} автоматически создаст стандартный балансировщик нагрузки и назначит ему публичный Floating IP-адрес для приема трафика.

## {heading({counter(kgateway)}. Создайте объект HTTPRoute)[id=k8s-kgateway-route]}

1. Создайте файл манифеста `my-route.yaml` для ресурса Gateway API [типа](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/) `HTTPRoute`, который описывает правило маршрутизации HTTP-трафика для Kgateway:

   ```yaml
   apiVersion: gateway.networking.k8s.io/v1
   kind: HTTPRoute
   metadata:
     name: httpbin
     namespace: httpbin
   spec:
     parentRefs:
       - name: http
     rules:
       - backendRefs:
           - name: httpbin
             port: 8000
   ```   

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f my-route.yaml
   ```   

В результате применения манифеста HTTP-запросы будут отправляться в сервис `httpbin`. 

## {heading({counter(kgateway)}. Проверьте работу Kgateway)[id=k8s-kgateway-check]}

1. Подождите несколько минут, пока балансировщик нагрузки получит внешний IP-адрес, и выполните команду, чтобы его узнать:

   ```console
   kubectl get svc -n httpbin
   ```

   Найдите для этого балансировщика значение `EXTERNAL-IP` в выведенной таблице:

   ```text
   NAME     TYPE             ...     EXTERNAL-IP        PORT(S)            ...
   http     LoadBalancer     ...     100.70.151.108     8080:30000/TCP     ...
   ```

1. Отправьте тестовый запрос на внешний IP-адрес балансировщика:

   ```console
   curl http://100.70.151.108:8080/get
   ```

   Успешный ответ на запрос означает, что Kgateway корректно обрабатывает ресурсы Gateway API и маршрутизирует трафик к сервису `httpbin`.

   {cut(Пример успешного ответа)}

   ```console
   {
    "args": {},
    "headers": {
     "Accept": ["*/*"],
     "Host": ["100.70.151.108:8080"]
     "User-Agent": ["curl/8.7.1"],
     "X-Envoy-Expected-Rq-Timeout-Ms": ["15000"],
     "X-Envoy-External-Address": ["10.0.1.71"],
     "X-Forwarded-For": ["10.0.1.71"],
     "X-Forwarded-Proto": ["http"],
     "X-Request-Id": ["f1e73d46-5470-4951-b71b-df37361ceb27"]
    },
    "origin": "10.0.1.71",
    "url": "http://100.70.151.108:8080/get"
   }
   ```
   {/cut}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-kgateway-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы аддона Kgateway, вам больше не нужны, удалите их:

1. Удалите пространство имен `httpbin` и связанные с ним ресурсы, включая созданный балансировщик и Floating IP-адрес:

   ```console
   kubectl delete namespace httpbin
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}
