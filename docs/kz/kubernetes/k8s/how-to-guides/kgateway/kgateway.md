{include(/kz/_includes/_translated_by_ai.md)}

[Kgateway](/kz/kubernetes/k8s/concepts/addons-and-settings/addons#kgateway) аддонын Kubernetes кластерінде [Gateway API](https://gateway-api.sigs.k8s.io/) арқылы трафикті маршруттауды баптау және сұрауларды тестілік қолданбаға бағыттау үшін пайдаланыңыз.

{note:info}
Kgateway тек [екінші буын](/kz/kubernetes/k8s/concepts/cluster-generations) кластерлері үшін қолжетімді.
{/note}

## Дайындық қадамдары

1. Егер әлі жасалмаса, Kubernetes-тің өзекті нұсқасының кластерін [жасаңыз](/kz/kubernetes/k8s/instructions/create-cluster/create-webui-gen-2).
1. Егер әлі жасалмаса, `kubectl` құралын [орнатыңыз және баптаңыз](../../connect/kubectl).
1. `kubectl` көмегімен кластерге [қосылыңыз](../../connect/kubectl#check_connection).
1. Егер әлі жасалмаса, Kgateway аддонын [орнатыңыз](/kz/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-kgateway).

## {counter(kgateway)}. Тестілік қолданбаны жасаңыз

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

Манифестті қолдану нәтижесінде `httpbin` тестілік қолданбасы `Deployment` түрінде іске қосылады, сондай-ақ осы қолданбаға ішкі қолжетімділік үшін сервис жасалады. Kgateway кейіннен сыртқы HTTP-трафикті қабылдап, оны маршруттап, осы сервиске қайта бағыттайды.

## {counter(kgateway)}. Gateway объектісін жасаңыз

{note:warn}
Gateway объектісі үшін [стандартты жүктеме теңгергіші](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) және [Floating IP мекенжайы](/kz/networks/vnet/concepts/ips-and-inet#floating-ip) жасалады. Оларды пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).
{/note}

1. Gateway API ресурсының [түріне](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/) арналған `my-gateway.yaml` манифест файлын `Gateway` жасаңыз:

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

Манифестті қолдану нәтижесінде Kgateway `LoadBalancer` түріндегі сервисті жасайды. VK Cloud автоматты түрде стандартты жүктеме теңгергішін жасап, оған трафикті қабылдау үшін жария Floating IP мекенжайын тағайындайды.

## {counter(kgateway)}. HTTPRoute объектісін жасаңыз

1. Kgateway үшін HTTP-трафикті маршруттау ережесін сипаттайтын Gateway API ресурсының [түріне](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/) арналған `my-route.yaml` манифест файлын `HTTPRoute` жасаңыз:

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

Манифестті қолдану нәтижесінде HTTP сұраулары `httpbin` сервисіне жіберіледі.

## {counter(kgateway)}. Kgateway жұмысын тексеріңіз

1. Жүктеме теңгергіші сыртқы IP мекенжайын алғанша бірнеше минут күтіңіз және оны білу үшін келесі пәрменді орындаңыз:

   ```console
   kubectl get svc -n httpbin
   ```

   Шығарылған кестеден осы жүктеме теңгергіші үшін `EXTERNAL-IP` мәнін табыңыз:

   ```text
   NAME     TYPE             ...     EXTERNAL-IP        PORT(S)            ...
   http     LoadBalancer     ...     100.70.151.108     8080:30000/TCP     ...
   ```

1. Жүктеме теңгергішінің сыртқы IP мекенжайына тестілік сұрау жіберіңіз:

   ```console
   curl http://100.70.151.108:8080/get
   ```

   Сұрауға сәтті жауап Kgateway Gateway API ресурстарын дұрыс өңдейтінін және трафикті `httpbin` сервисіне маршруттайтынын білдіреді.

   {cut(Сәтті жауап мысалы)}

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

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер Kgateway аддонының жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. `httpbin` аттар кеңістігін және онымен байланысты ресурстарды, соның ішінде жасалған жүктеме теңгергіші мен Floating IP мекенжайын жойыңыз:

   ```console
   kubectl delete namespace httpbin
   ```
   
1. [Тоқтатыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#stop) жасалған кластерді, оны кейінірек пайдалану үшін, немесе [жойыңыз](/kz/kubernetes/k8s/instructions/manage-cluster#delete_cluster) оны біржола.
