## Доступ к сервисам при помощи Ingress

\>Кластеры Kubernetes, устанавливаемые в VK CS содержат преднастроенный Ingress Controller на базе балансировщика нагрузки Nginx, который может обеспечить доступ к вашим сервисам, используя один и тот же выделенный балансировщик нагрузки OpenStack. Подробную инструкцию по настройкам Nginx Ingress Controller вы можете найти в [официальном руководстве](https://kubernetes.github.io/ingress-nginx/).

Для активации доступа к сервису с помощью Ingress вам необходимо иметь:

- как минимум один работающий Service, к которому будет открываться доступ;
- доменное имя, с которым будет работать Ingress.

Ingress поддерживает два типа маршрутизации:

1.  Name-based routing (распределение трафика на разные домены по их DNS-имени).
2.  Path-based routing (распределение трафика внутри одного домена согласно относительных путей).

Пример ниже создает Ingress и использует сразу 2 варианта маршрутизации:

1.  Name-based для домена cafe.example.com.
2.  Path-based для путей /tea и /coffee.

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: cafe-ingress
spec:
  tls:
  - hosts:
    - cafe.example.com
    secretName: cafe-secret
  rules:
  - host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          serviceName: tea-svc
         servicePort: 80
```
