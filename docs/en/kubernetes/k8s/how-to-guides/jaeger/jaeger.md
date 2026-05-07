Learn how the [Jaeger](https://www.jaegertracing.io/) add-on works in Kubernetes clusters based on [HotROD](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod ) — the official demo application for Jaeger. HotROD consists of several microservices that you can use to generate and view query traces in Jaeger via the [OpenTelemetry SDK](https://opentelemetry.io/).

## Preparatory steps

1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a Kubernetes cluster of the latest version, if not done so already.
1. [Install and configure](../../connect/kubectl) `kubectl`, if not done so already.
1. [Connect](../../connect/kubectl#connect) to the cluster via `kubectl`.
1. [Install the Jaeger add-on](/en/kubernetes/k8s/instructions/addons/advanced-installation/install-advanced-jaeger), if not done so already.

## {counter(jaeger)}. Create an application for HotROD

1. Create the `example-hotrod` namespace that will contain all resources of the `example-hotrod` test application:

   ```console
   kubectl create ns example-hotrod
   ```

1. Create a manifest for the `example-hotrod` application and a service to address the application:

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

   Here: 

   - `OTEL_EXPORTER_OTLP_ENDPOINT` — the endpoint for sending application telemetry data (traces, metrics, logs) in the [OTLP](https://opentelemetry.io/docs/specs/otlp/) format. This endpoint is used to connect to the Jaeger backend.
   - `OTEL_EXPORTER_OTLP_PROTOCOL` — data transfer protocol. By default, it is `grpc`.
   
   For more details on these parameters, refer to the [official OpenTelemetry documentation](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/).

1. Create the required Kubernetes resources based on the manifest:
   
   ```console
   kubectl apply -f example-hotrod.yaml
   ```

As a result of this manifest, a pod with the `example-hotrod` application will be launched, which will simulate HTTP requests between services, automatically generate traces, and send them to Jaeger via OTLP.

## {counter(jaeger)}. Generate the load and get the query traces

1. Launch the web UI of the HotROD application via `port-forward`:

   ```console
   kubectl -n example-hotrod port-forward svc/example-hotrod 8080:8080
   ```

   Kubernetes will create a connection between your local computer and the `example-hotrod` service in the cluster. 

1. In your browser, go to the HotROD web UI:

   ```console
   http://localhost:8080
   ```

1. Click any button in the HotROD UI. This will generate a chain of requests and traces that will be automatically sent to Jaeger.

1. Launch Query UI, the Jaeger web UI for viewing traces, via `port-forward`:

   ```console
   kubectl -n jaeger port-forward svc/jaeger-query 8000:80
   ```

1. In your browser, go to Query UI and review the generated traces:

   ```console
   http://localhost:8000
   ```  
   
   Here, the following information will be available:

   - a list of all traces
   - query duration
   - spans
   - errors and timeouts

## Delete unused resources

A running cluster consumes computing resources and is charged accordingly. If you no longer need the Velero tool and the Kubernetes resources you created to test the Jaeger add-on, delete them:

1. Delete the `example-hotrod` namespace and the resources associated with it:

   ```console
   kubectl delete ns example-hotrod
   ```

1. [Stop](/en/kubernetes/k8s/instructions/manage-cluster#start_or_stop_cluster) the cluster you created to use it later or [delete](/en/kubernetes/k8s/instructions/manage-cluster#delete_cluster) it permanently.