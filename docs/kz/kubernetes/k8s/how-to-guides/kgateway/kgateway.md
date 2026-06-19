# {heading(Kgateway пайдалану)[id=k8s-kgateway]}

{include(/kz/_includes/_translated_by_ai.md)}

{linkto(../../concepts/addons-and-settings/addons#k8s-addons-kgateway)[text=Kgateway]} аддонын Kubernetes кластеріндегі трафикті [Gateway API](https://gateway-api.sigs.k8s.io/) арқылы бағыттау және сұрауларды тестілік қолданбаға жіберу үшін пайдаланыңыз.

{note:info}
Kgateway тек {linkto(/kz/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=екінші буын]} кластерлері үшін қолжетімді.
{/note}

## {heading(Дайындық қадамдары)[id=k8s-kgateway-prepare]}

1. Егер әлі жасалмаған болса, өзекті нұсқадағы кластерді {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=жасаңыз]}.
1. Егер әлі жасалмаған болса, `kubectl` утилитасын {linkto(../../connect/kubectl#k8s-kubectl)[text=орнатып, баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=қосылыңыз]}.
1. Егер әлі жасалмаған болса, {linkto(../../instructions/addons/advanced-installation/install-advanced-kgateway#k8s-install-advanced-kgateway)[text=Kgateway аддонын орнатыңыз]}.

## {heading({counter(kgateway)}. Тестілік қолданбаны жасаңыз)[id=k8s-kgateway-app]}

1. `httpbin` тестілік қолданбасы үшін `httpbin.yaml` манифест файлын жасаңыз:

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

1. Жасалған манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f httpbin.yaml
   ```

Манифесті қолдану нәтижесінде `httpbin` тестілік қолданбасы `Deployment` түрінде іске қосылады, сондай-ақ осы қолданбаға ішкі қолжетімділік үшін сервис жасалады. Kgateway кейіннен сыртқы HTTP-трафикті қабылдап, оны бағыттап, осы сервиске қайта жібереді.

## {heading({counter(kgateway)}. Gateway объектісін жасаңыз)[id=k8s-kgateway-gateway]}

{note:warn}
Gateway объектісі үшін {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме теңгергіші]} және {linkto(/kz/networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайы]} жасалады. Оларды пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.
{/note}

1. Gateway API [түріндегі](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/) `Gateway` ресурсы үшін `my-gateway.yaml` манифест файлын жасаңыз:

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

1. Жасалған манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f my-gateway.yaml
   ```

Манифесті қолдану нәтижесінде Kgateway `LoadBalancer` түріндегі сервисті жасайды. {var(cloud)} трафикті қабылдау үшін стандартты жүктеме теңгергішін автоматты түрде жасап, оған жария Floating IP-мекенжайын тағайындайды.

## {heading({counter(kgateway)}. HTTPRoute объектісін жасаңыз)[id=k8s-kgateway-route]}

1. Kgateway үшін HTTP-трафикті бағыттау ережесін сипаттайтын Gateway API [түріндегі](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/) `HTTPRoute` ресурсы үшін `my-route.yaml` манифест файлын жасаңыз:

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

1. Жасалған манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f my-route.yaml
   ```   

Манифесті қолдану нәтижесінде HTTP-сұраулар `httpbin` сервисіне жіберіледі.

## {heading({counter(kgateway)}. Kgateway жұмысын тексеріңіз)[id=k8s-kgateway-check]}

1. Жүктеме теңгергіші сыртқы IP-мекенжайын алғанша бірнеше минут күтіңіз және оны білу үшін келесі команданы орындаңыз:

   ```console
   kubectl get svc -n httpbin
   ```

   Шығарылған кестеден осы теңгергіш үшін `EXTERNAL-IP` мәнін табыңыз:

   ```text
   NAME     TYPE             ...     EXTERNAL-IP        PORT(S)            ...
   http     LoadBalancer     ...     100.70.151.108     8080:30000/TCP     ...
   ```

1. Жүктеме теңгергішінің сыртқы IP-мекенжайына тестілік сұрау жіберіңіз:

   ```console
   curl http://100.70.151.108:8080/get
   ```

   Сұрауға сәтті жауап Kgateway Gateway API ресурстарын дұрыс өңдеп, трафикті `httpbin` сервисіне бағыттайтынын білдіреді.

   {cut(Сәтті жауап үлгісі)}

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

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-kgateway-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер Kgateway аддонының жұмысын тексеру үшін жасалған Kubernetes ресурстары енді қажет болмаса, оларды жойыңыз:

1. `httpbin` атаулар кеңістігін және онымен байланысты ресурстарды, соның ішінде жасалған теңгергіш пен Floating IP-мекенжайын жойыңыз:

   ```console
   kubectl delete namespace httpbin
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}