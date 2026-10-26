# {heading(Connection termination in the load balancer)[id=k8s-lb-timeout]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../concepts/network#k8s-network-loadbalancer-integration)[text=Network load balancer]}, which is created through the Managed Containers service, uses its own timeout settings. If your application works with long sessions, the default timeout may terminate the connection prematurely.

### {heading(Solution)[id=k8s-lb-timeout-solution]}

To change the timeouts, [contact technical support](/en/contacts).