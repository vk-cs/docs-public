## About tariffication

The cost of using the service instance depends on the selected tariff plan and options. It is reflected in the [service configuration wizard](../instructions/pr-instance-add/) and consists of two parts:

- The cost of using the service, it is reflected in the **Tariff plans** tab.
- For Image Based services — the cost of the infrastructure, it is reflected in the section **Details**.

The total cost will be displayed at the last step of connecting the service.

There are two types of tariff plans available for charging services:

<tabs>
<tablist>
<tab>Prepaid</tab>
<tab>Postpaid</tab>
</tablist>
<tabpanel>

- The cost is fixed.
- Payment is debited once in the reporting period on the date of activation of the service.

If there are not enough funds when debiting, the instance status changes:

- If a free promo tariff is available for an instance, the instance is forcibly transferred to it.
- If a free promo tariff is not available for an instance, the instance is blocked for use until funds are replenished.

</tabpanel>
<tabpanel>

- The cost is calculated based on the amount of service resources actually used (for example, the amount of storage used).
- The frequency and day of debiting depend on the specific service.

If there are not enough funds when debiting, the instance status changes:

1. Soft Limit. The beginning of the period is considered the first unsuccessful attempt to write off funds. The maximum duration of the period is up to 10 days, the balance is checked daily. If there were no successful write-offs during this period, the Hard Limit period begins.
1. Hard Limit. Compulsory cancellation of all debts on the service. The instance of the service is blocked until the full payment of the debt for 10 days:

   - If the balance remains positive after debiting, the period is reset to zero, a notification is received about the need for [manual activation](../instructions/pr-instance-manage#updating_access_to_a_service_instance) for the service instance.
   - If there are not enough funds, after the expiration of the period, the service instance is deleted without the possibility of recovery.

</tabpanel>
</tabs>

<info>

For information on how to pay for the use of the service instance, see the section [Billing](/en/additionals/billing).

</info>

## Charged

For SaaS and Image Based services:

- Application of paid tariff plan options. Tariff option — a specific parameter of the tariff plan.
- Virtual project resources used for backup or recovery.
- Other services provided within the service (the final set depends on the vendor's service).

For Image Based services, VK Cloud virtual resources deployed to maintain the service infrastructure are charged: VMs, disks, networks, routers. The full list of required resources is available when [connecting](../instructions/pr-instance-add/) the service instance.

## Not charged

- Use of the personal account of any of the vendor's services.
- Performing basic operations with the service instance: restart, delete.
- Network traffic to maintain infrastructure.
- Use of the service when choosing a promotional tariff.
