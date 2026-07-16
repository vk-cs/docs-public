
{include(/en/_includes/_translated_by_ai_en.md)}

The network of a load balancer cannot be changed, so you need to create a new load balancer in the SDN Sprut and configure it. To migrate a load balancer to SDN Sprut:

1. [Create a new load balancer](/en/networks/balancing/instructions/manage-lb#balancing-manage-lb-add) and specify the parameters:

    - **Load balancer name**: the name of the load balancer, for example, if the original load balancer in SDN Neutron was named `my-load-balancer`, you can use the name `my-load-balancer-sprut`.
    - **Network**: the name of the target SDN Sprut.
    - Leave the remaining parameters as default.

1. [Create](/en/networks/balancing/instructions/manage-lb#balancing-manage-rules) load balancing rules and copy their parameters from the original load balancer in SDN Neutron.
1. [Delete](/en/networks/balancing/instructions/manage-lb#balancing-manage-lb-delete) the original load balancer if you no longer need it.

You can also migrate load balancers using the following methods:

* [Recreate](/en/tools-for-using-services/terraform/how-to-guides/vnet/lb) the load balancer using Terraform by specifying SDN Sprut in the manifest description, and connect the virtual machines after their migration.
* Run the [VK Cloud script](https://github.com/vk-cs/neutron-2-sprut/blob/guide_v3/copy-lb-to-sprut-net.sh) for migrating load balancers on any machine with network access to the required project where you have the administrator role.