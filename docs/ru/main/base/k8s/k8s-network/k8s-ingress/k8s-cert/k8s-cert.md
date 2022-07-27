Ingress Controllers в Kubernetes позволяют использовать SSL-сертификаты для терминации TLS-трафика. Возможно применение как Let's Encrypt сертификатов, так и заранее выпущенных сертификатов.

В этой статье рассмотрим процесс интеграции существующих SSL-сертификатов в Ingress.

Подразумевается что Ingress, Service, Deployment будут находиться в одном неймспейсе кластера. По умолчанию это `default`.

1\. Получите внешний IP-адрес Ingress-контроллера командой:

```bash
kubectl get svc -n ingress-nginx | grep ingress | grep LoadBalancer
```

2\. Заделегируйте A-запись вашего домена на внешний IP-адрес Ingress-контроллера.

3\. Создайте Secret для хранения данных SSL-сертификата:

```bash
kubectl create secret tls testsecret-tls \
    --namespace default \
    --key privkey.pem \
    --cert fullchain.pem
```

4\. Создайте целевое приложение и сервис. Пример ниже создает Deployment и Service ассоциированный с ним.

```bash
kubectl apply -f application.yaml
```

Ниже пример файла application.yaml.

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-app
  namespace: default
spec:
  selector:
    matchLabels:
      app: hello
  replicas: 2
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
      - name: hello
        image: "gcr.io/google-samples/hello-app:2.0"
---
apiVersion: v1
kind: Service
metadata:
  name: hello-service
  namespace: default
  labels:
    app: hello
spec:
  type: ClusterIP
  selector:
    app: hello
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
```

5\. Создайте Ingress.

В нем нужно заменить ingress.example.com в полях `spec.tls.hosts` и `spec.rules.host` на доменное имя на которое выдан сертификат.

В последних версиях kubernetes по умолчанию включен редирект с http на https если в Ingress задан блок `tls`.

Ниже пример файла ingress-custom-ssl.yaml.

Вместо аннотации `kubernetes.io/ingress.class: "nginx"` в `spec:` можно указать класс `ingressClassName: nginx`.

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-custom-ssl
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  #ingressClassName: nginx
  tls:
  - hosts:
      - ingress.example.com
    secretName: testsecret-tls
  rules:
  - host: ingress.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: hello-service
            port:
              number: 80

```

Примените манифест:

```bash
kubectl apply -f ingress-custom-ssl.yaml
```

Логи Ingress-контроллера можно посмотреть в его поде.

Узнать имя пода можно командой:

```bash
kubectl -n ingress-nginx get pods -o wide | grep 'ingress-nginx-controller'
```

Далее нужно использовать полное имя пода, чтобы посмотреть логи пода Ingress-контроллера:

```bash
kubectl -n ingress-nginx logs pod/ingress-nginx-controller-<deployment_id>-<pod_id>
```

В выводе должно присутствовать `successfully validated configuration, accepting`. Это говорит об успешном применении манифеста и последующем создании ингресса с TLS.
