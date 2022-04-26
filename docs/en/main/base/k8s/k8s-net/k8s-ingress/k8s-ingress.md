When creating a Kubernetes PaaS cluster, it is possible to choose among the pre-installed NGINX Ingress Controller services. If it was selected, then after creating the cluster, the Ingress Controller will be deployed automatically.

Ingress Controller consists of two components:

1. The controller interacting with the Kubernetes API server.
2. Reverse proxy server.

The controller receives data about ingress objects from the API server and, based on them, configures the operation of the reverse proxy.

<warn>

For ingress to work as Kubernetes objects, an Ingress Controller must be present in the cluster. Ingress objects will not work without it.

</warn>

After the cluster is created, the Ingress Controller rises in it in the form of a pod located in the ingress-nginx namespace. Its presence can be checked by the command:

```bash
kubectl get pods -n ingress-nginx
NAME                                             READY   STATUS    RESTARTS   AGE
nginx-ingress-controller-8696859596-74fwj        1/1     Running   0          7d21h
nginx-ingress-default-backend-7c57f78d75-nmq5f   1/1     Running   0          7d21h
```

Ingress Controller is accessible from the outside via the nginx-ingress-controller service, which has the LoadBalancer type. It can be found in the list of services in the ingress-nginx namespace, its "white" address can be found there:

```bash
kubectl get svc -n ingress-nginx
NAME                               TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)                      AGE
nginx-ingress-controller           LoadBalancer   10.254.23.44     89.208.85.23   80:30080/TCP,443:30443/TCP   61d
nginx-ingress-controller-metrics   ClusterIP      10.254.101.237   <none>         9913/TCP                     61d
nginx-ingress-default-backend      ClusterIP      10.254.33.216    <none>         80/TCP                       61d
```

## Ingress

Ingress is a Kubernetes object that describes the rules for proxying traffic from an external source to services inside the K8S cluster.

<warn>

Adding or changing traffic proxying rules occurs by reconfiguring Ingress — by editing the manifest and its ConfigMap file.

</warn>

Let 's take an example:

1. Create a cluster under \*nginx-pod with an Nginx web server that will give the inscription "Hello World!".

2. Create a test-service that will direct traffic to the nginx-pod.

3. Create an ingress test-ingress that will proxy traffic to the test-service.

The manifest for the pod and its ConfigMap, which will act as a configuration file for the web server:

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-configmap
  data:default.conf: |
    server {
      listen       80 default_server;
      server_name  _;
      default_type text/plain;
      location / {
        return 200 "\n'Hello World!'\n";
      }
    }
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: my-app
spec:
  containers:
  - image: nginx:1.12
    name: nginx
    ports:
    - containerPort: 80
    volumeMounts:
    - name: config
      mountPath: /etc/nginx/conf.d/
  volumes:
  - name: config
    configMap:
      name: my-configmap
```

In ConfigMap, we will describe the configuration for the nginx web server, and in the pod, we will mount this ConfigMap in /etc/nginx/conf.d/. For the pod, we will set the app label: my-app.

Manifest for the service:

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: test-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

Let's create a service that listens on the 80th port and directs traffic to the 80th port over TCP. As a selector, we will specify the label of our app pod: my-app.

Manifesto for Ingress:

```yaml
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: test-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - http:
      paths:
      - path: /testpath
        backend:
          serviceName: test-service
          servicePort: 80
```

Let's describe the ingress, specifying that when passing along the path / testpath, traffic is directed to the test-service service on the 80th port.

Let's create all the described objects by executing the command for each manifest:

```bash
kubectl apply -f <object.yaml>
```

Then we will check them:

```bash
kubectl get configmap
NAME           DATA   AGE
my-configmap   1      173m
```

```bash
kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          173m
```

```bash
kubectl get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
kubernetes     ClusterIP   10.254.0.1       <none>        443/TCP   62d
test-service   ClusterIP   10.254.175.104   <none>        80/TCP    3h58m
```

```bash
kubectl get ing
NAME           HOSTS   ADDRESS   PORTS   AGE
test-ingress   \*                 80      3h27m
```

Now, for verification, we will execute a request to the public address of the nginx-ingress-controller service along the path /testpath:

```bash
curl -k https://89.208.85.23/testpath

'Hello World!'
```

<info>

In this example, everything was created for http traffic, but in the pre-installed Ingress Controller there is a redirect from http to https, so https was used when checking.

</info>
