# {heading(Jaeger пайдалану)[id=k8s-jaeger]}

{include(/kz/_includes/_translated_by_ai.md)}

Kubernetes кластерлеріндегі [Jaeger](https://www.jaegertracing.io/) аддонының жұмысын [HotROD](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) пайдалану мысалында зерттеңіз — Jaeger үшін ресми демо-қосымша. HotROD бірнеше микросервистерден тұрады, олардың көмегімен сіз [OpenTelemetry SDK](https://opentelemetry.io/) арқылы Jaeger-де сұраулар трассировкаларын генерациялап, көре аласыз.

## {heading(Дайындық қадамдары)[id=k8s-jaeger-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}
1. Егер бұл әлі жасалмаған болса, {linkto(../../connect/kubectl#k8s-kubectl)[text=`kubectl` орнатып, баптаңыз]}.
1. `kubectl` көмегімен кластерге {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=қосылыңыз]}.
1. Егер бұл әлі жасалмаған болса, {linkto(../../instructions/addons/advanced-installation/install-advanced-jaeger#k8s-install-advanced-jaeger)[text=Jaeger аддонын орнатыңыз]}.

## {heading({counter(jaeger)}. HotROD үшін қосымша жасаңыз)[id=k8s-jaeger-app]}

1. `example-hotrod` сынақ қосымшасының ресурстары орналасатын `example-hotrod` атаулар кеңістігін жасаңыз:

   ```console
   kubectl create ns example-hotrod
   ```

1. `example-hotrod` қосымшасы үшін манифест файлын және қосымшаға қатынау үшін сервисті жасаңыз.

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: example-hotrod
     namespace: example-hotrod
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: example-hotrod
     template:
       metadata:
         labels:
           app: example-hotrod
      spec:
        containers:
          - name: hotrod
            image: jaegertracing/example-hotrod:latest
            ports:
              - containerPort: 8080
            env:
              - name: OTEL_EXPORTER_OTLP_ENDPOINT
                value: "http://jaeger-collector.jaeger.svc.cluster.local:4317"
              - name: OTEL_EXPORTER_OTLP_PROTOCOL
                value: "grpc"
              - name: OTEL_SERVICE_NAME
                value: "hotrod"
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: example-hotrod
     namespace: example-hotrod
   spec:
     selector:
       app: example-hotrod
     ports: 
       - name: http 
         port: 8080 
         targetPort: 8080

   ```

   Мұнда:

    - `OTEL_EXPORTER_OTLP_ENDPOINT` — [OTLP](https://opentelemetry.io/docs/specs/otlp/) форматында қосымшаның телеметрия деректерін (трассировкалар, метрикалар, логтар) жіберуге арналған эндпоинт. Jaeger бэкендіне қосылу үшін пайдаланылады.
    - `OTEL_EXPORTER_OTLP_PROTOCOL` — деректерді беру протоколы, әдепкі бойынша `grpc`.

   Осы параметрлер туралы толығырақ [OpenTelemetry ресми құжаттамасында](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/).

1. Барлық қажетті ресурстарды жасау үшін құрылған манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f example-hotrod.yaml
   ```

Осы манифест жұмысының нәтижесінде `example-hotrod` қосымшасы бар pod іске қосылады, ол сервистер арасындағы HTTP-сұрауларды симуляциялайды, трассировкаларды автоматты түрде генерациялайды және оларды OTLP арқылы Jaeger-ге жібереді.

## {heading({counter(jaeger)}. Жүктемені генерациялаңыз және сұраулар трассировкаларын алыңыз)[id=k8s-jaeger-check]}

1. `port-forward` арқылы HotROD қосымшасының веб-интерфейсін іске қосыңыз:

   ```console
   kubectl -n example-hotrod port-forward svc/example-hotrod 8080:8080
   ```

   Kubernetes сіздің жергілікті компьютеріңіз бен кластердегі `example-hotrod` сервисі арасында қосылым жасайды.

1. Браузерде HotROD веб-интерфейсіне өтіңіз:

   ```console
   http://localhost:8080
   ```

1. HotROD веб-интерфейсіндегі кез келген әрекет батырмасын басыңыз. Бұл Jaeger-ге автоматты түрде жіберілетін сұраулар тізбегі мен трассировкаларды генерациялайды.

1. `port-forward` арқылы трассировкаларды көруге арналған Jaeger веб-интерфейсі Query UI-ді іске қосыңыз:

   ```console
   kubectl -n jaeger port-forward svc/jaeger-query 8000:80
   ```

1. Браузерде Query UI интерфейсіне өтіп, генерацияланған трассировкаларды қараңыз:

   ```console
   http://localhost:8000
   ```

   Мұнда мыналар қолжетімді болады:

    - барлық трассировкалар тізімі;
    - сұрауды орындау ұзақтығы;
    - спандар (spans);
    - қателер мен тайм-ауттар.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-jaeger-delete]}

Жұмыс істеп тұрған кластер тарификацияланады және есептеу ресурстарын тұтынады. Егер Jaeger аддонының жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. `example-hotrod` атаулар кеңістігін және онымен байланысты ресурстарды жойыңыз:

   ```console
   kubectl delete ns example-hotrod
   ```

{ifdef(public)}
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
