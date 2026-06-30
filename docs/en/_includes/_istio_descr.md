[Istio](https://istio.io/latest/) allows you to monitor and manage the network interaction between your services without having to change the application code. Istio uses the [service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh) approach, which means that all traffic between services goes through a managed proxy layer. The addon supports this as both a classic model with [sidecar proxies](https://istio.io/latest/docs/reference/config/networking/sidecar/) at the pod level and the [Ambient Mesh](https://istio.io/latest/docs/ambient/) mode, which doesn't use sidecar containers (node-level proxies). Use Istio to:

- set security and traffic management policies between services
- use TLS for communication between services
- expand monitoring of inter-service traffic (metrics collection, logging, distributed tracing)
- configure complex routing and balancing of traffic between services
- configure query replays, timeouts, and other means of fault tolerance control
- use Canary Deployment and Blue-Green Deployment for gradual deployment