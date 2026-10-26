# {heading(Service unavailable by IP address)[id=iaas-vm-ip-unavailable]}

{include(/en/_includes/_translated_by_ai_en.md)}

The service hosted on a virtual machine cannot be accessed by IP address.

The error can be caused by various reasons.

### {heading(Solution)[id=iaas-vm-ip-unavailable-decision]}

1. Check the VM status in [the {var(cloud)} management console](https://msk.cloud.vk.ru/app/) in the **Cloud Computing** → **Virtual Machines** section. Make sure the VM status is `Active`.
1. {linkto(../../../../intro/billing/instructions/payment#billing-payment-balance-view)[text=Check]} the project balance. If the balance is negative, service operation is suspended.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Check]} the security groups. Make sure there is a rule that allows incoming traffic to the required port.
1. Check the network services on the VM. Make sure the application is running and listening on the required port.
1. Check corporate access to the portal. Make sure connections from the corporate network to the cloud are not blocked.