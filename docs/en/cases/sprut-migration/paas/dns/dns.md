
{include(/en/_includes/_translated_by_ai_en.md)}

During network infrastructure migration, the Floating IP address and the load balancer IP address change, so after migrating the load balancer, you need to update the A-records of the public DNS:

1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud account.
1. Go to the **DNS** → **DNS zones** section.
1. Click on the name of the required DNS zone.
1. Click ![Menu](/en/assets/more-icon.svg "inline") for the A-record of the required load balancer and select **Edit**.
1. In the **IP address** parameter, select the IP address of the required load balancer created in SDN Sprut during migration.
1. Click the **Save changes** button.
1. Click ![Menu](/en/assets/more-icon.svg "inline") for the A-record of the required web server and select **Edit**.
1. In the **IP address** parameter, select the Floating IP address of SDN Sprut.
1. Click the **Save changes** button.

{note:info}
If your project uses an external DNS service, change the A-records in it.
{/note}