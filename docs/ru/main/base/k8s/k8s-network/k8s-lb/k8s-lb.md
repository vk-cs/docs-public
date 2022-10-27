## Описание

Балансировщик нагрузки - это метод распределения заданий (трафика) между несколькими серверами с целью оптимизации использования ресурсов, сокращения времени обслуживания запросов, горизонтального масштабирования кластера (динамическое добавление и удаление устройств), а также обеспечения отказоустойчивости.

Kubernetes как сервис от VK Cloud интегрирован с облачной платформой VK Cloud, так что платформа предоставляет Load Balancer как сервис и может сама создавать балансировщики. Для сравнения, если пользователь настраивает Kubernetes (например, в он премисе), нужно самостоятельно поднимать и настраивать софтверные балансеры. На платформе VK Cloud балансировщики поднимаются сразу в отказоустойчивом режиме active-standby. Когда поднимается основной балансер (на HAProxy), у него всегда есть standby, спящий балансер. Между ними настроен VRRP. Если основной балансер отказывает, весь трафик мгновенно переключается на standby, при этом IP-адрес не меняется.

В настройке балансировки для Kubernetes помогает VK Cloud Cloud Provider. Нужно создать манифест, в котором пользователь указывает тип манифеста «сервис» и тип сервиса «Load Balancer». После деплоя этого манифеста Kubernetes (точнее, Cloud Provider, который работает в Kubernetes) обращается к OpenStack API, создаёт балансировщик и внешний IP-адрес, если это необходимо. Если внешний адрес не нужен, нужно поставить аннотацию, что требуется внутренний балансировщик, и можно пускать трафик на кластер, не открывая публичный IP-адрес на каждой ноде.

## Балансировщик с внутренним IP адресом

Этот пример показывает, как создать сервис, доступный с помощью LoadBalancer, но без внешнего IP-адреса. Аннотация service.beta.kubernetes.io/openstack-internal-load-balancer: true активирует данное поведение: вместо публичного IP-адреса, будет выделен внутренний. Это может быть полезно в гибридных сценариях, когда потребителями сервиса являются приложения во внутренней сети за рамками кластера Kubernetes.

```
kubectl create -f load-balancer-internal/service-internal-lb.yaml
```

**Манифест**

```
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-internal-lb
  labels:
    k8s-app: nginx-backend
  annotations:
    service.beta.kubernetes.io/openstack-internal-load-balancer: true
spec:
  type: LoadBalancer
  externalTrafficPolicy: Cluster
  selector:
    k8s-app: nginx-backend
  ports:
  - port: 80
    name: http
    targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-webservice
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: nginx-webservice
    spec:
      containers:
      - name: nginx
        image: library/nginx:1.15-alpine
        ports:
        - containerPort: 80
```

После установки манифеста:

```
watch kubectl get service
NAME                 CLUSTER-IP     EXTERNAL-IP       PORT(S)        AGE
nginx-internal-lb   10.0.0.10      192.168.0.181     80:30000/TCP   5m
```

## Балансировщик со статичным IP-адресом

Этот пример показывает как создать сервис, доступный с помощью LoadBalancer, использующий зарезервированный публичный IP-адрес.

**Манифест**

```
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-existing-lb-ip-2
  labels:
    k8s-app: nginx-backend
spec:
  type: LoadBalancer
  externalTrafficPolicy: Cluster
  loadBalancerIP: 95.163.250.115
  selector:
    k8s-app: nginx-backend
  ports:
  - port: 80
    name: http
    targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-webservice
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: nginx-webservice
    spec:
      containers:
      - name: nginx
        image: library/nginx:1.15-alpine
        ports:
        - containerPort: 80
```

## Балансировщик с использованием сессий

Этот пример показывает как создать сервис, доступный с помощью LoadBalancer, который перенаправляет трафик на целевые поды не с помощью Round-Robin балансировки, а с учетом предыдущих запросов одного и того же клиента. Это может помочь для решения многих проблем с традиционными stafetul веб-приложениями. Параметр sessionAffinity: ClientIP активирует так называемый Session Affinity, т.е. все запросы одного и того же пользователя будут идти на один и тот же под до тех пор пока этот под жив.

```
kubectl create -f load-balancer-sticky/service-sticky-lb.yaml
```

**Манифест**

```
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-internal-lb
  labels:
    k8s-app: nginx-backend
  annotations:
    service.beta.kubernetes.io/openstack-internal-load-balancer: false
spec:
  type: LoadBalancer
  sessionAffinity: ClientIP
  externalTrafficPolicy: Cluster
  selector:
    k8s-app: nginx-backend
  ports:
  - port: 80
    name: http
    targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-webservice
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: nginx-webservice
    spec:
      containers:
      - name: nginx
        image: library/nginx:1.15-alpine
        ports:
        - containerPort: 80
```

После установки манифеста

```
watch kubectl get service NAME CLUSTER-IP EXTERNAL-IP PORT(S) AGE nginx-internal-lb 10.0.0.10 192.168.0.181 80:30000/TCP 5m
```

## Ограничение доступа к лоадбалансеру по IP

Чтобы ограничить IP-адреса клиентов, которые могут получить доступ к балансировщику сетевой нагрузки, укажите:

```
spec: 
  loadBalancerSourceRanges: "143.231.0.0/16"
```
