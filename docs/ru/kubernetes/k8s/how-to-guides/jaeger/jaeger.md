# {heading(Использование Jaeger)[id=k8s-jaeger]}

Изучите работу аддона [Jaeger](https://www.jaegertracing.io/) в кластерах Kubernetes на примере использования [HotROD](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) — официального демоприложения для Jaeger. HotROD состоит из нескольких микросервисов, с помощью которых вы сможете сгенерировать и просмотреть трассировки запросов в Jaeger через [OpenTelemetry SDK](https://opentelemetry.io/).

## {heading(Подготовительные шаги)[id=k8s-jaeger-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-jaeger#k8s-install-advanced-jaeger)[text=Установите аддон Jaeger]}, если это еще не сделано.

## {heading({counter(jaeger)}. Создайте приложение для HotROD)[id=k8s-jaeger-app]}

1. Создайте пространство имен `example-hotrod`, в котором будут расположены ресурсы тестового приложения `example-hotrod`:

   ```console
   kubectl create ns example-hotrod
   ```

1. Создайте файл манифеста для приложения `example-hotrod` и сервис, чтобы обращаться к приложению.

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

   Здесь: 

   - `OTEL_EXPORTER_OTLP_ENDPOINT` — эндпоинт для отправки данных телеметрии приложения (трассировок, метрик, логов) в формате [OTLP](https://opentelemetry.io/docs/specs/otlp/). Используется для подключения к бэкенду Jaeger. 
   - `OTEL_EXPORTER_OTLP_PROTOCOL` — протокол передачи данных, по умолчанию `grpc`.
   
   Подробнее об этих параметрах в [официальной документации OpenTelemetry](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/).

1. Примените созданный манифест в кластере для создания всех необходимых ресурсов:
   
   ```console
   kubectl apply -f example-hotrod.yaml
   ```

В результате работы этого манифеста будет запущен под с приложением `example-hotrod`, которое будет симулировать HTTP-запросы между сервисами, автоматически генерировать трассировки и отправлять их в Jaeger через OTLP.

## {heading({counter(jaeger)}. Сгенерируйте нагрузку и получите трассировки запросов)[id=k8s-jaeger-check]}

1. Запустите веб-интерфейс приложения HotROD через `port-forward`:

   ```console
   kubectl -n example-hotrod port-forward svc/example-hotrod 8080:8080
   ```

   Kubernetes создаст соединение между вашим локальным компьютером и сервисом `example-hotrod` в кластере. 

1. Перейдите в браузере в веб-интерфейс HotROD:

   ```console
   http://localhost:8080
   ```

1. Нажмите кнопку любого действия в веб-интерфейсе HotROD. Это сгенерирует цепочку запросов и трассировки, которые автоматически отправятся в Jaeger.

1. Запустите Query UI, веб-интерфейс Jaeger для просмотра трассировок, через `port-forward`:

   ```console
   kubectl -n jaeger port-forward svc/jaeger-query 8000:80
   ```

1. Перейдите в браузере в Query UI и просмотрите сгенерированные трассировки:

   ```console
   http://localhost:8000
   ```  
   
   Здесь будут доступны:

   - список всех трассировок;
   - длительность выполнения запроса;
   - спаны (spans);
   - ошибки и тайм-ауты.

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-jaeger-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы аддона Jaeger, вам больше не нужны, удалите их:

1. Удалите пространство имен `example-hotrod` и связанные с ним ресурсы:

   ```console
   kubectl delete ns example-hotrod
   ```

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}