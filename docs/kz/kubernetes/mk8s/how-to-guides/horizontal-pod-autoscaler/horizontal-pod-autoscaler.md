# {heading(Қосымшаларды көлденең масштабтау)[id=mk8s-hpa]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Horizontal Pod Autoscaler (HPA) `Deployment` немесе `StatefulSet` репликаларының санын ағымдағы жүктемеге сәйкес автоматты түрде өзгертеді.

Осы практикалық нұсқаулықта үш нұсқа қарастырылады:

- CPU бойынша масштабтау;
- жады бойынша масштабтау;
- Prometheus-тағы пайдаланушы метрикасы бойынша масштабтау.

HPA үшін `autoscaling/v2` API пайдаланыңыз: ол бірнеше метриканы және теңшелетін scale-up/scale-down мінез-құлқын қолдайды.

## {heading(Дайындық қадамдары)[id=mk8s-hpa-prepare]}

{include(/kz/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Орнатыңыз және теңшеңіз]} `kubectl`, егер бұрын жасалмаса.
1. {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=Кластерге]} `kubectl` көмегімен {linkto(../../connect/kubectl#mk8s-kubectl-check-connection)[text=қосылыңыз]}.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=Орнатыңыз]} Kube Prometheus Stack аддонының 68.3.3 нұсқасын, егер бұрын жасалмаса.

   {note:warn}
   Аддондар worker-түйіндердің ресурстарын тұтынады. {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-kube-prometheus-stack)[text=Kube Prometheus Stack]} шамамен CPU 850m–2500m CPU және 968Mi–3804Mi RAM, сондай-ақ Prometheus деректері үшін HDD 2 ГБ және SSD 10 ГБ дискілерді қажет етеді. Worker-түйіндер тобында жеткілікті ресурс бар екеніне көз жеткізіңіз және ол үшін {linkto(../../instructions/scale#mk8s-instructions-scale-horizontal-worker-nodes)[text=автомасштабтауды қосыңыз]} — әйтпесе Prometheus подтары және HPA бойынша масштабталатын подтар `Pending` күйінде қалуы мүмкін. Ресурсқа қанық аддондарды бөлек автомасштабталатын түйіндер тобына орнату ұсынылады.
   {/note}

1. JSON пішімдеу үшін `jq` орнатыңыз, егер бұрын жасалмаса:

   ```console
   apt-get install jq
   ```

## {heading({counter(hpa)}. Кластерге қол жетімділікті тексеріңіз)[id=mk8s-hpa-access]}

1. Кластерге қол жетімділікті мына командаларды орындап тексеріңіз:

   ```bash
   kubectl cluster-info
   kubectl get nodes
   kubectl version
   ```

1. `hpa-demo` аты кеңістігін жасаңыз:

   ```bash
   kubectl create namespace hpa-demo
   ```

## {heading({counter(hpa)}. Metrics Server-ді тексеріңіз)[id=mk8s-hpa-metrics-server]}

CPU және RAM HPA-ға `metrics.k8s.io` API арқылы түседі, оны әдетте Metrics Server ұсынады. Мына командаларды орындаңыз:

```bash
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods -A
```

Команда шығысында ұқсас жауап болуы керек:

```text
v1beta1.metrics.k8s.io   kube-system/metrics-server   True
```

Managed Containers қызметінде Metrics Server алдын ала орнатылған — `apiservice v1beta1.metrics.k8s.io` `True` күйінде тұр, ал `kubectl top` бірден жұмыс істейді. API жұмыс істеп тұрса, екінші данасын орнатпаңыз.

{note:warn}
`kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes` командасына көрсеткіш ретінде сенбеңіз. VK Cloud кластерінде бұл команда metrics API жұмыс істеп тұрса да (`kubectl top` және HPA жұмыс істейді, `metrics.k8s.io/v1beta1` `kubectl api-versions` құрамында бар) `Error from server (NotFound)` мәнін қайтарады. Metrics API дайындығының сенімді тексерулері — `apiservice … True` күйі және жұмыс істеп тұрған `kubectl top nodes`/`kubectl top pods`.
{/note}

Құрамдас болмаса, Kubernetes нұсқасына үйлесімді Metrics Server нұсқасын провайдеріңіздің құжаттамасына сәйкес орнатыңыз. Орнатқаннан кейін API қолжетімділігін күтіңіз:

```bash
kubectl wait --for=condition=Available \
  deployment/metrics-server \
  -n kube-system \
  --timeout=180s

kubectl top nodes
```

Metrics Server autoscaling және `kubectl top` үшін арналған, ұзақ мерзімді мониторинг үшін емес.

## {heading({counter(hpa)}. Тестілік қосымшаны орналастырыңыз)[id=mk8s-hpa-test-app]}

1. `app.yaml` манифесін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f app.yaml
   kubectl rollout status deployment/web -n hpa-demo
   kubectl get pods -n hpa-demo
   ```

### {heading(requests міндетті түрде көрсетілуінің себебі)[id=mk8s-hpa-test-app]}

`target.type: Utilization` бар HPA жүктемені `resources.requests`-ке қатысты есептейді.

Мысал:

```text
CPU usage = 75m
CPU request = 100m
Utilization = 75%
```

Контейнерде сәйкес `request` көрсетілмесе, оның CPU немесе RAM пайдалану пайызы дұрыс анықталмайды және HPA жүктемені масштабтамауы мүмкін.

## {heading({counter(hpa)}. CPU бойынша HPA теңшеріңіз)[id=mk8s-hpa-cpu]}

1. `hpa-cpu.yaml` манифесін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f hpa-cpu.yaml
   kubectl get hpa -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

HPA CPU пайдалануды `request` CPU-ның шамамен `50%` деңгейінде ұстауға тырысады.

## {heading({counter(hpa)}. CPU бойынша масштабтауды тексеріңіз)[id=mk8s-hpa-cpu-check]}

1. Жүктеме генераторын іске қосыңыз:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://web; done'
   ```

   {note:info}
   `kubectl`-ты Git Bash (MSYS) ішінде іске қосқанда, `/bin/sh` жолы автоматты түрде `C:/Program Files/Git/usr/bin/sh` түріне түрленеді және под `CreateContainerError` қатесімен құлайды (`stat .../sh: no such file or directory`). Айналма жолдар: `//bin/sh` көрсету (қосарлы қиғаш сызық MSYS-те түрленбейді, Linux оны `/bin/sh` деп қабылдайды), немесе `MSYS_NO_PATHCONV=1` орнату, немесе команданы PowerShell ішінде іске қосу. Linux/macOS-та команда өзгеріссіз жұмыс істейді.
   {/note}

1. Бақылаңыз:

   ```bash
   # watch (-w) бір мезгілде тек бір ресурс түрін қолдайды,
   # сондықтан подтарды қараймыз:
   kubectl get pods -n hpa-demo -w
   ```

   `kubectl get hpa,pods -n hpa-demo -w` командасы `error: you may only specify a single resource type` қатесімен аяқталады, себебі `-w` жалаушасымен бірнеше ресурс түрін көрсетуге болмайды. HPA-ны да, подтарды да бір мезгілде көру үшін `watch` утилитасын пайдаланыңыз (`-w`-сіз мерзімді түсірілім): `watch kubectl get hpa,pods -n hpa-demo` — немесе HPA-ны бөлек терезеде `kubectl get hpa -n hpa-demo -w` командасымен қадағалаңыз.

1. Қосымша мына командаларды орындаңыз:

   ```bash
   kubectl top pods -n hpa-demo
   kubectl describe hpa web -n hpa-demo
   ```

   Жүктеме артқаннан кейін репликалар саны ұлғаюы тиіс.

1. Тестті тоқтатыңыз:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

Scale-down `stabilizationWindowSeconds` себебінен бірден болмайды.

## {heading({counter(hpa)}. Жады бойынша масштабтауды қосыңыз)[id=mk8s-hpa-ram]}

1. HPA-ны CPU және RAM-ды ескеретіндей етіп өзгертіңіз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f hpa-cpu-memory.yaml
   kubectl get hpa web -n hpa-demo
   ```

Бірнеше метрика болғанда HPA әрқайсысы үшін ұсынылған репликалар санын есептеп, ең үлкен мәнді таңдайды. Мысал:

```text
CPU 4 pod ұсынады
RAM 7 pod ұсынады
HPA қорытындысы: 7 pod
```

### {heading(Пайыз немесе RAM-дың абсолюттік мәні)[id=mk8s-hpa-percent]}

`memory request`-тен пайыз:

```yaml
target:
  type: Utilization
  averageUtilization: 70
```

Подқа шаққандағы абсолюттік орташа тұтыну:

```yaml
target:
  type: AverageValue
  averageValue: 180Mi
```

Жады үшін scale-down-ды сақтықпен теңшеу қажет: қосымшалар жүктеме аяқталғаннан кейін де жадыны ұстап тұрады.

## {heading({counter(hpa)}. Пайдаланушы метрикалары бойынша масштабтау архитектурасымен танысыңыз)[id=mk8s-hpa-custom]}

Пайдаланушы метрикалары үшін қосымша metrics pipeline қажет:

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

Қажет болады:

- Prometheus-метрикаларын жариялайтын қосымша;
- **Kube Prometheus Stack** аддоны ұсынатын Prometheus және Prometheus Operator (CRD `ServiceMonitor`/`PodMonitor`);
- Prometheus Adapter;
- Kubernetes API aggregation layer;
- HPA `autoscaling/v2`.

Қосымша метрикасының мысалы:

```text
http_requests_total{namespace="hpa-demo",pod="web-7c9d..."} 12345
```

HPA үшін счетчик әдетте жылдамдыққа түрлендіріледі:

```promql
sum(rate(http_requests_total[2m])) by (namespace, pod)
```

`counter`-дің жинақталған мәні бойынша тікелей масштабтамаңыз: ол үнемі өсіп отырады және жүктеме азайғанда азаймайды.

## {heading({counter(hpa)}. Kube Prometheus Stack аддонын орнатыңыз және тексеріңіз)[id=mk8s-hpa-kube]}

VK Cloud-да Prometheus Kube Prometheus Stack аддоны ретінде орналастырылады. 

1.{linkto(../../instructions/addons/advanced-installation/install-advanced-monitoring#mk8s-install-advanced-monitoring)[text=Аддонды]} кластерді жасау кезінде немесе бар кластерге — Terraform немесе веб-интерфейс арқылы орнатыңыз. Terraform арқылы орнату мысалы:

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

1. Орнатқаннан кейін құрамдастарды тексеріңіз (аддонның әдепкі аты кеңістігі — `monitoring`):

   ```bash
   kubectl get pods -n monitoring
   kubectl get svc -n monitoring | grep -i prometheus
   ```

1. Prometheus Operator CRD-лері орнатылғанына көз жеткізіңіз (`ServiceMonitor` үшін қажет):

   ```bash
   kubectl get crd servicemonitors.monitoring.coreos.com
   kubectl get crd podmonitors.monitoring.coreos.com
   ```

   Kube Prometheus Stack аддонындағы Prometheus қызметінің DNS-аты:

   ```text
   prometheus-prometheus.monitoring.svc.cluster.local:9090
   ```

   Қызметтің аты дәл `prometheus-prometheus` (емес, `kube-prometheus-stack-prometheus`). Нақты атауларды әрқашан мына командамен тексеріңіз: 

   ```console
   kubectl get svc -n monitoring
   ```

1. Кластерден қолжетімділікті тексеріңіз:

   ```bash
   kubectl run prometheus-check \
     -n hpa-demo \
     --rm -it \
     --restart=Never \
     --image=curlimages/curl:8.12.1 \
     -- curl -fsS \
     http://prometheus-prometheus.monitoring.svc.cluster.local:9090/-/ready
   ```

Prometheus айтарлықтай CPU/RAM сұрайды және PVC-ті тіркейді. Бір кішкентай worker-түйіннен тұратын кластерде (немесе HPA бойынша іске қосылған репликалар болғанда) ол `Pending` күйінде қалуы мүмкін (`Insufficient cpu` немесе `unbound PersistentVolumeClaims`). Worker-түйіндер тобының автомасштабтауын {linkto(../../instructions/scale#mk8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=қосыңыз]} — {linkto(../../concepts/cluster-autoscaler#mk8s-cluster-autoscaler)[text=Cluster Autoscaler]} түйінді автоматты қосады.

## {heading({counter(hpa)}. Қосымша метрикаларын Prometheus-қа қосыңыз)[id=mk8s-hpa-enable]}

1. Қосымша метрикаларды HTTP endpoint-те жариялауы тиіс, мысалы:

   ```text
   GET /metrics
   ```

1. Service-те аталған metrics-порт болуы тиіс:

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

1. Prometheus Operator қолданылса, `ServiceMonitor` үшін `servicemonitor.yaml` манифесін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f servicemonitor.yaml
   ```

   VK Cloud платформасындағы Kube Prometheus Stack аддонында Prometheus бос `serviceMonitorSelector: {}` және `serviceMonitorNamespaceSelector: {}` параметрлерімен конфигурацияланған — яғни барлық аты кеңістіктеріндегі барлық `ServiceMonitor` қабылданады, қосымша {linkto(../../reference/labels-and-taints#mk8s-labels-and-taints)[text=белгі]} (label) (мысалы `release: kube-prometheus-stack`) қажет емес. Классикалық Helm-орнатуларда `kube-prometheus-stack` бұлай емес — онда `ServiceMonitor` әдетте релиз атауына сәйкес `release` белгісіне ие болуы тиіс. Нақты селекторды тексеру үшін мына команданы пайдаланыңыз:

   ```console
   kubectl get prometheus -n monitoring -o yaml | grep -A3 serviceMonitorSelector
   ```

   Prometheus Operator жиналған `series`-ке `namespace`, `pod`, `service`, `container` мақсатты белгілерін автоматты қосады — дәл олар `by (namespace, pod)` үшін және метриканы Prometheus Adapter-де подтармен салыстыру үшін қажет. Бұл үшін relabeling-ті бөлек теңшеудің қажеті жоқ.

   `ServiceMonitor` ішіндегі `endpoints.port` — бұл Service портының аты (нөмірі емес). Ол `/metrics` берілетін портқа (жоғарыдағы мысалда — контейнердің метрика портына апаратын `metrics`) нұсқауы тиіс.

1. Prometheus-та сұранысты тексеріңіз:

   ```promql
   http_requests_total{namespace="hpa-demo"}
   ```

1. Команданы орындаңыз:

   ```promql
   sum(rate(http_requests_total{namespace="hpa-demo"}[2m])) by (namespace, pod)
   ```

Адаптерді орнатпас бұрын сұраныс `namespace` және `pod` белгілері бар деректерді тұрақты қайтаруы тиіс.

## {heading({counter(hpa)}. Prometheus Adapter орнатыңыз)[id=mk8s-hpa-adapter]}

1. Адаптер орнатылғанын тексеріңіз:

   ```bash
   kubectl get apiservice | grep custom.metrics
   kubectl get deployment -A | grep prometheus-adapter
   ```

   API бұрыннан бар және қолжетімді болса, екінші адаптерді орнатпаңыз.

1. Helm-репозиторийін қосыңыз:

   ```bash
   helm repo add prometheus-community \
     https://prometheus-community.github.io/helm-charts
   helm repo update
   ```

1. `prometheus-adapter-values.yaml` манифесін жасаңыз:

   ```yaml
   prometheus:

     # Kube Prometheus Stack аддонындағы Prometheus қызметі
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

1. Орнатыңыз:

   ```bash
   helm upgrade --install prometheus-adapter \
     prometheus-community/prometheus-adapter \
     --namespace monitoring \
     --create-namespace \
     -f prometheus-adapter-values.yaml
   ```

1. Тексеріңіз:

   ```bash
   kubectl rollout status deployment/prometheus-adapter \
     -n monitoring
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   ```

Командалардың шығысында `AVAILABLE=True` болуы күтіледі.

VK Cloud платформасындағы Kube Prometheus Stack аддоны үшін `url: http://prometheus-prometheus.monitoring.svc.cluster.local` және `port: 9090` пайдаланыңыз. Аддон бөлек аты кеңістігіне орнатылса немесе қызметтің аты өзгеше болса — оларды мына командамен тексеріңіз:

```console
kubectl get svc -n monitoring
```

Prometheus Adapter-ді аддон орналасқан `monitoring` аттас кеңістігіне орнату ыңғайлы. Адаптер де, Prometheus да worker-түйіндердің ресурстарын тұтынады.

## {heading({counter(hpa)}. Custom Metrics API тексеріңіз)[id=mk8s-hpa-api]}

1. Қолжетімді метрикалар тізімін қарап шығыңыз:

   ```bash
   kubectl get --raw \
     /apis/custom.metrics.k8s.io/v1beta1 | jq
   ```

1. Табыңыз:

   ```text
   pods/http_requests_per_second
   ```

   Тексерілген VK Cloud кластерінде `/apis/custom.metrics.k8s.io/v1beta1` түбіріне жасалған сұрау `Error from server (NotFound)` қатесін қайтарады, алайда API жұмыс істейді: `apiservice v1beta1.custom.metrics.k8s.io` күйі `True`, `custom.metrics.k8s.io/v1beta1` `kubectl api-versions` тізімінде бар, ал метриканың мәніне жасалған нақты сұрау деректерді береді. API тіркелуін тексеру үшін `kubectl get apiservice v1beta1.custom.metrics.k8s.io` командасын және метрика мәніне нысаналы сұрауды қолданыңыз, түбірді тізімдеуді емес.

1. Подтар үшін мәндерді алыңыз:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. Егер метрика пайда болмаса, тексеріңіз:

   ```bash
   kubectl logs deployment/prometheus-adapter \
     -n monitoring \
     --tail=200
   kubectl get apiservice v1beta1.custom.metrics.k8s.io -o yaml
   ```

   Жиі кездесетін себептер:

   - Prometheus бастапқы метриканы көрмейді.
   - `series`-те `namespace` немесе `pod` белгілері жоқ.
   - Prometheus URL-ы дұрыс көрсетілмеген.
   - `rate()` терезесі `scrape interval`-ден кіші.
   - Адаптер әлі `relist` орындамады.
   - TLS немесе API aggregation layer қатесі.

## {heading({counter(hpa)}. Пайдаланушы метрикасы бойынша HPA жасаңыз)[id=mk8s-hpa-custom-create]}

Қолданбаның атауы `custom-metrics-app`, ал мақсатты мән — әр подқа орта есеппен секундына 20 сұрау деп есептейік.

1. `hpa-custom.yaml` манифестін жасаңыз:

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

1. Манифестті қолданыңыз:

   ```bash
   kubectl apply -f hpa-custom.yaml
   kubectl describe hpa custom-metrics-app -n hpa-demo
   ```

   Статуста метрика пайда болуы тиіс:

   ```text
   http_requests_per_second on pods: 8 / 20
   ```

## {heading({counter(hpa)}. CPU, RAM және пайдаланушы метрикасын біріктіріңіз)[id=mk8s-hpa-all]}

Бір HPA үш көрсеткішті де бір мезгілде ескере алады:

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

HPA қажетті репликалар санын CPU, RAM және RPS бойынша бөлек есептеп, ең үлкен мәнді таңдайды.

## {heading({counter(hpa)}. Жүктеме тестілеуін жүргізіңіз)[id=mk8s-hpa-test]}

1. Жүктемені бөлек подтан іске қосыңыз:

   ```bash
   kubectl run load-generator \
     -n hpa-demo \
     --image=busybox:1.36 \
     --restart=Never \
     -- /bin/sh -c \
     'while true; do wget -q -O- http://custom-metrics-app; done'
   ```

1. Бақылаңыз:

   ```bash
   # watch (-w) тек бір ресурс түрімен жұмыс істейді:
   kubectl get pods -n hpa-demo -w
   ```

   [5-қадамдағы](#mk8s-hpa-cpu-check) сияқты, `kubectl get hpa,pods -n hpa-demo -w` командасы `error: you may only specify a single resource type` қатесін береді. Бір мезгілде бақылау үшін мына команданы қолданыңыз:

   ```console
   watch kubectl get hpa,pods -n hpa-demo
   ```

1. Басқа терезеде іске қосыңыз:

   ```bash
   kubectl describe hpa custom-metrics-app -n hpa-demo
   kubectl top pods -n hpa-demo
   ```

1. Пайдаланушы метрикасын тексеріңіз:

   ```bash
   kubectl get --raw \
     '/apis/custom.metrics.k8s.io/v1beta1/namespaces/hpa-demo/pods/*/http_requests_per_second' |
     jq
   ```

1. Жүктемені тоқтатыңыз:

   ```bash
   kubectl delete pod load-generator -n hpa-demo
   ```

## {heading({counter(hpa)}. HPA диагностикасын жүргізіңіз)[id=mk8s-hpa-diagnostics]}

- Жалпы тексеру:

   ```bash
   kubectl get hpa -A
   kubectl describe hpa <HPA_NAME> -n <NAMESPACE>
   kubectl get events -n <NAMESPACE> --sort-by='.lastTimestamp'
   ```

- `Metrics not available`:

   ```bash
   kubectl top pods -n <НЕМЕСЕККЕ_ӨРІС>
   kubectl get apiservice v1beta1.metrics.k8s.io
   ```

- `FailedGetResourceMetric`:

   Барлық workload контейнерлерінде `resources.requests` көрсетілгеніне көз жеткізіңіз.

- `FailedGetPodsMetric`:

   ```bash
   kubectl get apiservice v1beta1.custom.metrics.k8s.io
   kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1
   ```

- HPA жоғары масштабталмайды:

   Мыналарды тексеріңіз:

   - Ағымдағы метрика `target`-тан асады.
   - `maxReplicas` әлі жетілмеген.
   - Жаңа подтар түйіндерге орналасады.
   - Кластерде жеткілікті CPU және RAM бар.
   - Cluster Autoscaler түйіндер тобын үлкейте алады.
   - Quota, affinity, taints немесе PVC шектеулері жоқ. 

- HPA репликалар санын үздіксіз өзгертеді:

   Scale-down тұрақтандыру терезесін ұлғайтыңыз:

   ```yaml
   behavior:
     scaleDown:
       stabilizationWindowSeconds: 300
   ```

   Сондай-ақ тұрақты метриканы және жеткілікті PromQL терезесін қолданыңыз, мысалы `[30s]` орнына `[2m]`.

## {heading(Қолданылмайтын ресурстарды жойыңыз)[id=mk8s-hpa-remove]}

Жұмыс істеп тұрған кластер тарифтеленеді және есептеу ресурстарын тұтынады. Егер осы практикалық нұсқаулықты өту үшін жасалған Kubernetes ресурстары сізге қажет болмаса, оларды жойыңыз:

1. `hpa-demo` аттар кеңістігін және оған байланысты ресурстарды жойыңыз:

   ```bash
   kubectl delete namespace hpa-demo
   ```

1. Prometheus Adapter жойыңыз:

   ```bash
   helm uninstall prometheus-adapter -n monitoring
   ```

{include(/kz/_includes/_delete-test-cluster-short.md)}

Егер Metrics Server (ол VK Cloud платформасымен алдын ала орнатылған), Prometheus немесе Adapter жалпы компоненттер болса, оларды жоймаңыз.

## {heading(Қорытынды)[id=mk8s-hpa-summary]}

Горизонтальды масштабтау үшін екі `metrics pipeline` қолданылады:

```text
CPU/RAM:
Kubelet → Metrics Server → metrics.k8s.io → HPA

Custom metrics:
Application → Prometheus → Prometheus Adapter
→ custom.metrics.k8s.io → HPA
```

`autoscaling/v2` CPU, RAM және кастомды метрикаларды бір HPA-да біріктіруге мүмкіндік береді. Репликалардың қорытынды саны осы мезетте ең көп масштабтауды қажет ететін метрика бойынша анықталады.

## {heading(Практикалық ұсыныстар)[id=mk8s-hpa-recs]}

- `requests`-те дұрыс CPU және RAM әрқашан көрсетіңіз.
- `autoscaling/v2` қолданыңыз.
- `readiness/startup probes` дұрыс баптаңыз.
- Scale-up және scale-down жылдамдығын `behavior` арқылы шектеңіз.
- Жинақтайтын `counters`-терді тікелей қолданбаңыз — `rate()` немесе `increase()` қолданыңыз.
- Подтар қосылғанда азаятын метриканы таңдаңыз: подқа шыққан RPS, worker-түйіндегі кезек тереңдігі, белсенді тапсырмалар саны.
- Кешікімдерді ескеріңіз: Prometheus scrape interval, адаптердің relist-і, HPA sync period және жаңа подтардың іске қосылуы.
- Түйіндер тобының HPA соңынан масштабтала алатынын тексеріңіз.
- Production үшін `metrics adapter` репликаларының кемінде екеуін қолданыңыз.
- Бір `Deployment`-ті басқаратын екі HPA жасамаңыз.
- `spec.replicas`-ті қолмен немесе HPA-ны ескермей GitOps арқылы өзгертпеңіз.
- Кезектер мен бұлттық сервистер үшін `External` metrics немесе KEDA қарастырыңыз.