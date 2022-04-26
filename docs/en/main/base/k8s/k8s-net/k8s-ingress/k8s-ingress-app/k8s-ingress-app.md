## Access to services using Ingress

\>Kubernetes clusters installed in VK CS contain a pre-configured Ingress Controller based on the Nginx load balancer, which can provide access to your services using the same dedicated OpenStack load balancer. Detailed instructions on Nginx Ingress Controller settings can be found in the [official manual](https://kubernetes .github.io/ingress-nginx/).

To activate access to the service using Ingress, you need to have:

- at least one running Service that will be accessed;
- the domain name that Ingress will work with.

Ingress supports two types of routing:

1. Name-based routing (distribution of traffic to different domains by their DNS name).
2. Path-based routing (distribution of traffic within one domain according to relative paths).

The example below creates Ingress and uses 2 routing options at once:

1. Name-based for domain cafe.example.com .
2. Path-based for /tea and /coffee paths.

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
