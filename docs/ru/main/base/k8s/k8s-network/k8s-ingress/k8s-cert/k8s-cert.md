Ingress Controllers в Kubernetes позволяют использовать SSL-сертификаты для терминации TLS-трафика. Возможно применение как Let's Encrypt сертификатов, так и заранее выпущенных сертификатов.

В этой статье рассмотрим процесс интеграции существующих SSL-сертификатов в Ingress.

1\. Получите внешний IP-адрес Ingress-контроллера командой:

```
kubectl get svc -n ingress-nginx | grep ingress | grep LoadBalancer
```

2\. Заделегируйте A-запись вашего домена на внешний IP-адрес Ingress Controller.

3\. Создайте Secret для хранения данных SSL-сертификата. В поля tls.crt и tls.key нужно вставить код сертификата и закрытого ключа в формате base64.

```
kubectl apply -f tls-secret.yaml
```

Ниже пример файла tls-secret.yaml.

```
---
apiVersion: v1
kind: Secret
metadata:
  name: testsecret-tls
  namespace: default
data:
  tls.crt: base64 encoded cert
  tls.key: base64 encoded key
type: kubernetes.io/tls
```

4\. Создайте целевое приложение и сервис. Пример ниже создает Replication Controller на базе nginx и ассоциированный с ним сервис.

```
kubectl apply -f service-rc.yaml
```

Ниже пример файла service-rc.yaml.

```
---
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
      spec:
        containers:
       - name: nginx
         image: nginx
         ports:
         - containerPort: 80
 ---
 apiVersion: v1
 kind: Service
 metadata:
   labels:
     name: nginx
   name: nginx
 spec:
   ports:
     # The port that this service should serve on.
     - port: 80
   # Label keys and values that must match in order to receive traffic for this service.
   selector:
     app: nginx
```

5\. Создайте Ingress:

```
kubectl apply -f ingress-custom-ssl.yaml
```

В нем нужно заменить ingress.example.com на ваше доменное имя.

Также обратите внимание на аннотацию «ingress.kubernetes.io/ssl-redirect: "true"», которая делает обязательный редирект с http на https.

Если вы используете несколько разных Ingress Controller и хотите использовать для этого экземпляра Ingress Nginx Ingress Controller, то вам нужно раскомментировать аннотацию «kubernetes.io/ingress.class: nginx» .

Ниже пример файла ingress-custom-ssl.yaml. 

```
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-custom-ssl
  annotations:
    ingress.kubernetes.io/ssl-redirect: "true"
#    kubernetes.io/ingress.class: nginx
 
spec:
  tls:
  - hosts:
    - ingress.example.com
    secretName: testsecret-tls
  rules:
  - host: ingress.example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 80
```