# {heading(Connection termination in the load balancer)[id=mk8s-lb-timeout]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {linkto(../../concepts/network#mk8s-network-loadbalancer-integration)[text=network load balancer]} created via the Managed Containers service uses its own timeout settings. If your application works with long-lived sessions, the default timeout may terminate the connection prematurely.

### {heading(Solution)[id=mk8s-lb-timeout-solution]}

To change the timeouts, [contact technical support](/en/contacts).