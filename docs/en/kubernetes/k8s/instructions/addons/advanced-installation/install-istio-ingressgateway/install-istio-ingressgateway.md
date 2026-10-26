# {heading(Istio-ingressgateway)[id=k8s-install-istio-ingressgateway]}

{include(/en/_includes/_translated_by_ai_en.md)}

Istio Ingress Gateway is used as an L7 application-level load balancer.
It simplifies management of incoming traffic in complex microservice applications.

Capabilities:

* Load balancing, filtering, and routing.
* Advanced monitoring.
* Support for protection against cascading failures through automatic disconnection (circuit breaker).
* Limiting the maximum number of concurrent connections to the application.

## {heading(Installing the addon)[id=k8s-install-istio-ingressgateway-install]}

1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} your {var(cloud)} management console.
1. Select the project where the desired cluster is located.
1. Go to the **Kubernetes Clusters** → **Kubernetes Clusters** section.
1. Click on the name of the desired cluster.
1. Go to the **Addons** tab.
1. Click the **Install** button on the `istio-ingressgateway` addon card and click the **Install addon** button.
1. (Optional) Edit:

   - the application name;
   - the name of the namespace where the addon will be installed;
   - the addon configuration code.

     If the Kubernetes cluster is deployed on an external network, add the following annotation before the load balancer IP address in the addon code:

     ```console
     annotations:
       service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
     ```

1. Click the **Install addon** button.

   The addon will start installing into the cluster. This process may take a long time.

1. After the installation is complete, wait until the load balancer receives an IP address.

1. Get the load balancer IP address:

   ```console
   kubectl get svc -n <NAMESPACE>
   ```

   Here `<NAMESPACE>` is the name of the namespace.