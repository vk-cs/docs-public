# {heading(Changing the payment model)[id=pp-payment-method]}

{include(/en/_includes/_translated_by_ai_en.md)}

1. Go to the VK Tech partner management console via the [link](https://partners.tech.vk.ru).
1. On the main page, click the **Partner Account** button in the {var(cloud)} card.
1. Go to the **Clients** section.
1. Click the client name.
1. Next to the payment model parameter, click ![Change payment model](../../../../../assets/pencil-icon.svg "inline").
1. Confirm the change.

The {linkto(../../../../../intro/billing/concepts/physical-corporate#billing-physical-corporate-payment-scheme)[text=payment model]} will be changed:

- If the client was on a prepaid model, a postpaid model will be enabled for them. The client's resource consumption will not be stopped if their account balance becomes negative.
- If the client was on a postpaid model, a prepaid model will be enabled for them. Resource consumption will be stopped when the balance is negative. Resources in the projects will be deleted after three days.

The payment model will change for all existing client projects. All new client projects will be created with the payment model set for the client.