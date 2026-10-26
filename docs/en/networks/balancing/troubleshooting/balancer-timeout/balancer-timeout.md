# {heading(Load balancer returns 504 Gateway Timeout error)[id=balancing-balancer-timeout]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(public)}Issues are observed with a {linkto(../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=standard-type]} load balancer. {/ifdef}The load balancer returns the `504 Gateway Timeout` error.

The issue occurs with poor connectivity, when timeouts are triggered on the load balancer. The response delay causing the error is approximately 60 seconds.

### {heading(Solution)[id=balancing-balancer-timeout-solving]}

Increase the load balancer timeouts:

1. Make sure the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Get the list of the load balancer listeners:

   ```console
   openstack loadbalancer listener list --loadbalancer <BALANCER_ID>
   ```

1. For each load balancer listener, set new timeouts:

   ```console
   openstack loadbalancer listener set --timeout-member-data <TIMEOUT_1> --timeout-member-connect <TIMEOUT_2> --timeout-client-data <TIMEOUT_3> --timeout-tcp-inspect <TIMEOUT_4> <LISTENER_ID>
   ```
   Here:

   - `<LISTENER_ID>` — the ID of the load balancer listener.
   - `<TIMEOUT_1>` — the server inactivity timeout. The default value is `50000`.
   - `<TIMEOUT_2>` — the server connection timeout. The default value is `5000`.
   - `<TIMEOUT_3>` — the frontend inactivity timeout. The default value is `50000`.
   - `<TIMEOUT_4>` — the wait time for additional TCP packets for content inspection. The default value is `0`.