# {heading(DNS zones)[id=dns-global-balancer]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:info}
To get access to {linkto(../../../../../networks/dns/concepts/global-balancer#dns-global-balancer)[text=DNS load balancing]}, contact [technical support](/en/contacts).
{/note}

## {heading(Viewing the list of load balancing groups)[id=dns-global-balancer-list]}

{include(../../../../../_includes/_global-balancer.md)}

## {heading(Creating a load balancing group)[id=dns-global-balancer-add]}

{include(../../../../../_includes/_global-balancer.md)}

1. Click the **Add group** button.
1. Click **Configure** in the **Group settings** block.
1. Specify the group name and select a {linkto(../../../../../networks/dns/concepts/global-balancer#dns-global-balancer)[text=load balancing algorithm]}.
1. Click **Configure** in the **Group settings** block.
1. Click **Add A records**.
1. In the window that opens, select the desired records and click the **Done** button.
1. For each record, configure the weight and server health check parameters:

   - **Weight**: the higher the value, the more requests are sent to the server. This is only relevant for the Weighted Round Robin and Failover group algorithms.
   - **Monitoring type**: select the availability check method.
   
     {tabs}

     {tab(HTTP/HTTPS)}
      
     Availability check via HTTP/HTTPS protocols:
      
     - **Protocol**: select the check protocol **HTTP** or **HTTPS**.
     - **URL Path**: specify the full path to the desired resource, which will be appended to the host value of the A record. For example, if the host is `vkcs.cloud.ru` and `services/cdn/` is specified in **URL Path**, the request URL will be `vkcs.cloud.ru/services/cdn/`.
     - **Port**: the TCP port through which users connect to your application.
     - **Expected response code**: the response code that should be returned by the server if the check is successful.

     {/tab}

     {tab(ICMP)}

     Availability check via the ICMP protocol.
   
     {/tab}

     {tab(TCP)}
      
     Availability check via the TCP protocol. Specify the **TCP port** through which users connect to your application.

     {/tab}

     {/tabs}
      
   - **Interval between requests**: the time in seconds that must pass before the next check request is sent.
   - **Timeout**: the time in seconds during which the service will wait for a response from the server.
   - **Number of attempts**: the number of check attempts after which the server will be considered unhealthy.

1. Click the **Save** button.

## {heading(Editing a load balancing group)[id=dns-global-balancer-edit]}

{include(../../../../../_includes/_global-balancer.md)}

1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the load balancing group and select **Edit**.
1. Edit the {linkto(#dns-global-balancer-add)[text=group or record settings]}.
1. Click the **Save** button.

## {heading(Deleting a load balancing group)[id=dns-global-balancer-delete]}

This is a group operation: if necessary, you can delete several groups at once by selecting them using checkboxes.

{include(../../../../../_includes/_global-balancer.md)}

1. Delete the load balancing group in one of the following ways: 

   - Click ![ ](../../../../../assets/more-icon.svg "inline") for the group and select the **Delete** option.
   - Select the group using a checkbox, then click the **Delete** button above the table.

1. Confirm the deletion.