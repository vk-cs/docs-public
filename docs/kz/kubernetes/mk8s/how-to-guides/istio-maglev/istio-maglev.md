# {heading(LEAST_REQUEST және MAGLEV алгоритмдері бойынша жүктемені Istio аддоны арқылы теңгерімдеу)[id=mk8s-istio-balancing]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Бұл практикалық нұсқаулықта {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-istio)[text=Istio]} аддонының көмегімен бір Kubernetes Service-тің подтары арасындағы ішкі теңгерімдеу көрсетілген:

- `LEAST_REQUEST` — Envoy аяқталмаған сұраулар саны аз бэкэндті қалайды;
- `MAGLEV` — бірдей хэш кілті бар сұраулар негізінен бір бэкэндке түседі.

{note:info} 
Istio-да `LEAST_CONN` алгоритмі ескірген. HTTP/gRPC үшін `LEAST_REQUEST` пайдаланыңыз.
{/note}

## {heading(Дайындық қадамдар)[id=mk8s-im-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. Егер әлі жасалмаса, `kubectl` {linkto(../../connect/kubectl#mk8s-kubectl)[text=орнатыңыз және баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=қосылыңыз]}.
1. Егер әлі орнатылмаса, Istio аддонын {linkto(../../instructions/addons/advanced-installation/install-advanced-istio-mk8s#mk8s-install-advanced-istio-mk8s)[text=орнатыңыз]}. Аддон орнатылған болса, оны қайта орнатудың қажеті жоқ.

## {heading({counter(im)}. Istio-ны тексеріңіз)[id=mk8s-im-check]}

1. Командаларды орындаңыз:

   ```bash
   kubectl get pods -n istio-system
   kubectl get crd destinationrules.networking.istio.io
   kubectl get mutatingwebhookconfiguration | grep -i istio
   istioctl version
   ```

1. Командалардың нәтижесін қарап шығыңыз.

   `istioctl` диагностика үшін қажет. Негізгі ресурстарды `kubectl` арқылы жасауға болады. `istioctl` нұсқасын аддонның сәйкес нұсқасына сай алыңыз (мысалы, 1.29.2).

   `istio-system` нәтижесінде `ztunnel` подын көруіңіз мүмкін — аддон Istio-ны ambient-режимі қолдауымен орнатады. Бұл практикалық нұсқаулық үшін кедергі емес: sidecar-режимі де қолжетімді (`istio-sidecar-injector` webhook бар), ал `LEAST_REQUEST`/`MAGLEV` бар `DestinationRule` дәл sidecar-трафикке қолданылады.

## {heading({counter(im)}. Sidecar инъекциясы бар атаулар кеңістігін жасаңыз)[id=mk8s-im-sidecar]}

`istio-lb-demo` кеңістігін жасап, баптаңыз:

```bash
kubectl create namespace istio-lb-demo
kubectl label namespace istio-lb-demo istio-injection=enabled
kubectl get namespace istio-lb-demo --show-labels
```

Егер аддон revision-based injection пайдаланса, осы белгінің орнына орнатылған ревизияны көрсетіңіз:

```bash
kubectl label namespace istio-lb-demo istio.io/rev=<REVISION> --overwrite
```

Тек бір нұсқаны пайдаланыңыз: `istio-injection=enabled` немесе `istio.io/rev`.

## {heading({counter(im)}. Бэкэндті орнатыңыз)[id=mk8s-im-backend]}

1. `backend.yaml` манифестін жасаңыз:

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

   `hashicorp/http-echo:1.0` бейнесі — `distroless`, онда `/bin/sh` жоқ. Сондықтан бинарлы файл тікелей іске қосылады (`command: ["/http-echo"]`), ал под пен түйіннің атауларын `shell` емес, Kubernetes `$(VAR)` айнымалылар механизмі (downward API) қояды. `command: ["/bin/sh", "-ec"]` түріндегі орауыш `CreateContainerError` қатесіне әкелер еді (`exec: "/bin/sh": no such file or directory`).

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f backend.yaml
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

Әр подта `node-info` және `istio-proxy` болуы керек. Istio-ның 1.29 нұсқасында sidecar-контейнер native sidecar ретінде — яғни қарапайым контейнер емес, `restartPolicy: Always` бар `initContainer` ретінде инъекцияланады. Сондықтан екі тізімді де тексеріңіз:

```bash

# қосымшаның негізгі контейнері
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" containers="}{.spec.containers[*].name}{"\n"}{end}'

# istio-proxy (және istio-validation) — initContainers ішінде
kubectl get pods -n istio-lb-demo -l app=node-info   -o jsonpath='{range .items[*]}{.metadata.name}{" init="}{.spec.initContainers[*].name}{"\n"}{end}'
```

Тек `.spec.containers[*].name`-ге сүйенсек, `istio-proxy` нәтижеде көрінбейді (ол `initContainers` ішінде) — бұл инъекцияның жоқтығын білдірмейді. Подтың `2/2` дайындығы sidecar жұмыс істеп тұрғанын растайды.

## {heading({counter(im)}. Mesh ішінде клиентті орнатыңыз)[id=mk8s-im-mesh]}

1. `client.yaml` манифестін жасаңыз:

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

1. Манифестті қолданып, командаларды орындаңыз:

   ```bash
   kubectl apply -f client.yaml
   kubectl rollout status deployment/curl-client -n istio-lb-demo

   export CLIENT_POD=$(kubectl get pod -n istio-lb-demo   -l app=curl-client   -o jsonpath='{.items[0].metadata.name}')

   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.containers[*].name}'; echo
   kubectl get pod "$CLIENT_POD" -n istio-lb-demo   -o jsonpath='{.spec.initContainers[*].name}'; echo
   ```

Клиенттік подта да `istio-proxy` болуы керек — бэкэндтегідей, ол `initContainers` ішінде (native sidecar).

## {heading({counter(im)}. Бастапқы бөліністі тексеріңіз)[id=mk8s-im-distrib]}

Команданы орындаңыз:

```bash
kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 15); do
    curl -s -H "Connection: close" http://node-info/;
  done'
```

Команда нәтижесінде әр түрлі подтар көрсетілуі керек.

## {heading({counter(im)}. LEAST_REQUEST баптаңыз)[id=mk8s-im-least]}

1. `least-request.yaml` манифестін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f least-request.yaml
   kubectl get destinationrule -n istio-lb-demo
   ```

1. Envoy конфигурациясын тексеріңіз:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i LEAST_REQUEST
   ```

1. Параллель сұраулар жіберіңіз:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'seq 1 30 |
       xargs -P 10 -I {}     curl -s -H "Connection: close" http://node-info/'
   ```

`LEAST_REQUEST` CPU мен жадты ескермейді. Envoy нақты бір sidecar-rj контейнерге көрінетін аяқталмаған сұраулар санын салыстырады. Мүмкіндігінше анық көрсету үшін жауап беруі кешігетін бэкэндті немесе Fortio жүктеме генераторын пайдаланыңыз.

## {heading({counter(im)}. MAGLEV баптаңыз)[id=mk8s-im-maglev]}

1. `maglev.yaml` манифестін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f maglev.yaml
   ```

1. Envoy-ды тексеріңіз:

   ```bash
   istioctl proxy-config cluster "$CLIENT_POD"   -n istio-lb-demo   --fqdn node-info.istio-lb-demo.svc.cluster.local   -o json | grep -i MAGLEV
   ```

## {heading({counter(im)}. MAGLEV-ды тексеріңіз)[id=mk8s-im-maglev-check]}

1. Бірдей кілтпен жиырма сұрау орындаңыз:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for i in $(seq 1 20); do
       curl -s       -H "Connection: close"       -H "x-user-id: user-123"       http://node-info/;
     done'
   ```

   Эндпоинттер жиынтығы өзгермеген жағдайда жауаптар негізінен бір бэкэнд-подтан келуі керек.

1. Әр түрлі кілттерді тексеріңіз:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in user-1 user-2 user-3 user-4 user-5; do
       printf "%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: $user"       http://node-info/;
     done'
   ```

## {heading({counter(im)}. Под жойылған кездегі мінез-құлықты тексеріңіз)[id=mk8s-im-pod-delete]}

1. Пайдаланушылардың бэкэндтерге сәйкестігін сақтаңыз:

   ```bash
   kubectl exec -n istio-lb-demo "$CLIENT_POD" -c curl --   sh -c 'for user in $(seq 1 30); do
       printf "user-%s -> " "$user";
       curl -s       -H "Connection: close"       -H "x-user-id: user-$user"       http://node-info/;
     done'
   ```

1. Бір бэкэнд-подты жойыңыз:

   ```bash
   kubectl delete pod -n istio-lb-demo   $(kubectl get pod -n istio-lb-demo     -l app=node-info     -o jsonpath='{.items[0].metadata.name}')
   ```

1. Қалпына келуін күтіңіз:

   ```bash
   kubectl rollout status deployment/node-info -n istio-lb-demo
   kubectl get pods -n istio-lb-demo -l app=node-info -o wide
   ```

1. Тестті қайталаңыз. 
   Қалған эндпоинттермен байланысқан кілттердің басым бөлігі бұрынғы сәйкестігін сақтауы керек; жойылған эндпоинттің кілттері қайта бөлінеді.

MAGLEV жұмсақ affinity қамтамасыз етеді, кепілдік берілген тұрақты сессия емес.

## {heading({counter(im)}. Windows PowerShell ішінен тексеріңіз)[id=mk8s-im-win]}

VK Cloud платформасының `kubeconfig` файлы `OS_*` орта айнымалыларынан тіркелгі деректерін алатын `client-keystone-auth` exec-плагинін пайдаланады. `bash`-та оларды `openrc`-скрипті қояды, ал бөлек PowerShell сессиясында олар жоқ — әйтпесе командалар `Invalid user credentials` қатесімен аяқталады. Тексеруден бұрын айнымалыларды қойыңыз: мәндерді жобаңыздың RC-файлынан алыңыз; `OS_USER_DOMAIN_NAME` пайдаланушының нақты доменіне сәйкес болуы керек.

1. Командаларды орындаңыз:

   ```powershell
   $env:KUBECONFIG = "C:\path\to\kubeconfig.yaml"
   $env:OS_AUTH_URL = "https://infra.mail.ru/infra/identity/v3/"
   $env:OS_PROJECT_ID = "<project-id>"
   $env:OS_REGION_NAME = "RegionOne"
   $env:OS_USERNAME = "<username>"
   $env:OS_USER_DOMAIN_NAME = "<user-domain>"
   $env:OS_PASSWORD = "<password>"
   $env:OS_INTERFACE = "public"
   $env:OS_IDENTITY_API_VERSION = "3"
   ```

1. Командаларды орындаңыз:

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

1. Әр түрлі кілттерді тексеруді орындаңыз:

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

## {heading({counter(im)}. Диагностиканы жүргізіңіз)[id=mk8s-im-diagnostics]}

Командаларды орындаңыз:

```bash
kubectl get destinationrule -n istio-lb-demo -o yaml
kubectl get endpointslice -n istio-lb-demo   -l kubernetes.io/service-name=node-info
istioctl proxy-status
istioctl proxy-config endpoints "$CLIENT_POD"   -n istio-lb-demo   --cluster "outbound|80||node-info.istio-lb-demo.svc.cluster.local"
istioctl analyze -n istio-lb-demo
```

Егер саясат қолданылмаса, мыналарды тексеріңіз:

1. Клиенттік podта `istio-proxy` бар.
1. `DestinationRule` клиенттің көлемінде орналасқан.
1. `spec.host` ішінде дұрыс FQDN көрсетілген.
1. Service порты `http` деп аталады.
1. Клиент Service-ке жүгінеді, тікелей pod IP-ге емес.
1. Proxy Istiodпен синхрондалған.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=mk8s-im-delete]}

Жұмыс істеп тұрған кластер тарифтенеді және есептеу ресурстарын тұтынады. Егер осы практикалық нұсқаулықты орындау үшін жасалған Kubernetes ресурстары сізге қажет болмаса, оларды жойыңыз:

1. `istio-lb-demo` атаулар кеңістігін және онымен байланысты ресурстарды жойыңыз:

   ```bash
   kubectl delete namespace istio-lb-demo
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}

## {heading(Қорытынды)[id=mk8s-im-summary]}

Осы практикалық нұсқаулықты орындау мыналарды растайды:

- Теңгерімдеуді Envoy sidecar орындайды.
- Алгоритм нақты бір Service үшін бөлек белгіленеді.
- `LEAST_REQUEST` outstanding requests саны аз эндпоинттерді қалайды.
- `MAGLEV` сұрау кілті мен бэкэнд-под арасында тұрақты сәйкестік құрады.
- Istio аддонын қайта орнатудың қажеті жоқ.

## {heading(Шектеулер)[id=mk8s-im-restrictions]}

- Саясат тек Istio data plane арқылы өтетін трафикке әсер етеді.
- Әр sidecar шешімді тәуелсіз қабылдайды; жүктеменің глобалды санағышы жоқ.
- `LEAST_REQUEST` CPU, RAM немесе пайдаланушылық метрикаларды пайдаланбайды.
- Maglev сессияларды сақтамайды және абсолютті sticky-session кепілдік бермейді.
- Production үшін `readiness probes`, `outlierDetection` және `PodDisruptionBudget` қосыңыз.