# {heading(Tariffication)[id=bare-metal-tariffication]}

{include(/en/_includes/_translated_by_ai_en.md)}

Tariffication when using the Bare Metal service depends on the cost of the selected configuration, as well as the cost of additional services, if they are used.

{include(/en/_includes/_tariffication.md)[tags=prices]}

## {heading(Paid resources)[id=bare-metal-tariffication-paid-resources]}

- Bare Metal server: every hour, based on the monthly cost of the selected configuration.
    
  If the balance is insufficient to pay for the next hour of rent, the server operation is suspended.

- {linkto(../../../computing/iaas/tariffication#iaas-tariffication)[text=Virtual machine]}: as an intermediate host (if used).
- {linkto(../../../networks/vnet/tariffication#vnet-tariffication)[text=Public IP address]}: for the intermediate host (if used).

## {heading(Non-paid resources)[id=bare-metal-non-tariffication-resources]}

- Incoming and outgoing traffic.
- Bare Metal images from {var(cloud)} that do not require an additional license.

## {heading(Example of rent cost calculation)[id=bare-metal-billing-example]}

Starting from the moment the server is leased, the rent cost for each hour of use is debited from the management console, based on 720 hours per month.

For example, a server costing 199919 ₽ per month is leased. The fee for each hour will be `199919 ÷ 720 = 277.66`.

If the lease is terminated, for example, after 360 hours, access to the server is terminated and debiting stops. The total cost will be `277.66 × 360 = 99957.6`.