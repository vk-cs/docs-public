При создании PaaS кластера Kubernetes есть возможность выбрать среди предустановленных сервисов NGINX Ingress Controller. Если он был выбран, то после создания кластера, Ingress Controller будет развернут автоматически.

Ingress Controller состоит из двух компонентов:
1. Контроллера, взаимодействующего с API-сервером Kubernetes. 
2. Реверсивного прокси-сервера. 

Контроллер получает данные об ingress-объектах от API-сервера и на основании их настраивает работу реверсивного прокси. 

<warn>

Для работы ingress, как объектов Kubernetes, в кластере обязательно наличие Ingress Controller. Без него объекты ingress работать не будут.

</warn>

После создания кластера Ingress Controller поднимается в нем в виде пода, находящегося в неймспейсе ingress-nginx. Его наличие можно проверить командой:

```bash
kubectl get pods -n ingress-nginx
NAME                                             READY   STATUS    RESTARTS   AGE
nginx-ingress-controller-8696859596-74fwj        1/1     Running   0          7d21h
nginx-ingress-default-backend-7c57f78d75-nmq5f   1/1     Running   0          7d21h
```

Доступность Ingress Controllerа извне осуществляется через сервис nginx-ingress-controller,, имеющей тип LoadBalancer. Его можно найти в списке сервисов в неймспейсе ingress-nginx, его «белый» адрес можно найти там же:

```bash
kubectl get svc -n ingress-nginx
NAME                               TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)                      AGE
nginx-ingress-controller           LoadBalancer   10.254.23.44     89.208.85.23   80:30080/TCP,443:30443/TCP   61d
nginx-ingress-controller-metrics   ClusterIP      10.254.101.237   <none>         9913/TCP                     61d
nginx-ingress-default-backend      ClusterIP      10.254.33.216    <none>         80/TCP                       61d
```

## Ingress

Ingress — это объект Kubernetes, описывающий правила проксирования трафика от внешнего источника до сервисов внутри кластера K8S. 

<warn>

Добавление или изменение правил проксирования трафика происходит путем переконфигурирования Ingress — путем правки манифеста и его файла ConfigMap.

</warn>

Рассмотрим на примере:

1. Создадим в кластере под*nginx-pod с веб-сервером Nginx, который будет отдавать надпись "Hello World!".

2. Создадим сервис test-service который будет направлять трафик в под nginx-pod.

3. Создадим ингресс test-ingress который будет проксировать трафик до сервиса test-service. 

Манифест для пода и его ConfigMap, который выступит конфигурационным файлом для веб-сервера:

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

В ConfigMap опишем конфигурацию для nginx-веб-сервера, а в поде смонтируем этот ConfigMap в /etc/nginx/conf.d/. Для пода зададим лэйбл app: my-app. 

Манифест для сервиса:

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

Создадим сервис, слушающий на 80-м порту и направляющий трафик на 80-й порт по TCP. В качестве селектора укажем лэйбл нашего пода app: my-app. 

Манифест для ингресса:

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

Опишем ингресс, указав чтобы при переходе по пути /testpath трафик направлялся на сервис  test-service по 80-му порту. 

Создадим все описанные объекты, выполнив для каждого манифеста команду:

```bash
kubectl apply -f <object.yaml>
```

После чего проверим их:

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

Теперь для проверки выполним запрос до публичного адреса сервиса nginx-ingress-controller по пути /testpath:

```bash
curl -k https://89.208.85.23/testpath

'Hello World!'
```

<info>

В данном примере все создавалось для http-трафика, но в предустановленном Ingress Controller есть редирект с http на https, поэтому при проверке использовался https.

</info>