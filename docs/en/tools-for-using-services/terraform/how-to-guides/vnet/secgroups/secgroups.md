The article provides examples of creating and setting security groups in the Cloud Network service using Terraform:

- allow traffic by specified protocol via specified ports
- allow traffic by specified protocol via all ports
- allow all incoming traffic

When creating and setting security groups the following is used:

- Resources:

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup.md)
  - [vkcs_networking_secgroup_rule](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_secgroup_rule.md)
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port.md)
  - [vkcs_networking_port_secgroup_associate](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/networking_port_secgroup_associate.md)

- Data sources:

  - [vkcs_networking_secgroup](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_secgroup.md)
  - [vkcs_networking_port](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/networking_port.md)

## Preperation steps

1. Review the available resources and [quotas](/en/tools-for-using-services/account/concepts/quotasandlimits) for the [region](/en/tools-for-using-services/account/concepts/regions) where you want to create security groups and rules. Different regions may have different quotas configured.

   To increase your quotas, please contact [technical support](/en/contacts).

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.

## 1. Create a net manifest file

[Create](../network) a Terraform configuration file `network.tf` to descride network infrasructure:

- Create a net with the Internet access if you need to set restrictions for all ports.
- Create a net with the Internet access and a port if you need to set restrictions for several ports.

## 2. Create a security manifest file

Create a Terraform configuration file `secgroup.tf`.  The content depends on the security groups you need.

<tabs>
<tablist>
<tab>By protocol via several ports</tab>
<tab>By protocol via all ports</tab>
<tab>Incoming traffic</tab>
</tablist>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `security_group` security group.
  1. In the group, create the rule that allows incoming traffic by TCP via the 22 port.
  1. Allow the rule with the port, added in `network.tf`.

  {include(/en/_includes/_secgroups_tf.md)[tags=secgroup,ruleoneport,ruleassoc]}

</tabpanel>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `security_group` security group.
  1. In the group, create the rule that allows incoming traffic by TCP via all ports.

  {include(/en/_includes/_secgroups_tf.md)[tags=secgroup,alludp]}

</tabpanel>
<tabpanel>

In the file, the following configuration is described:

  1. Create the `security_group` security group.
  1. In the group, create the rule that allow all incoming traffic.

  {include(/en/_includes/_secgroups_tf.md)[tags=secgroup,ingress]}

</tabpanel>
</tabs>

Here:

- `enforce` — whether to replace or append the list of security groups:

  - `true` — the security groups that the port already has will be replaced with those specified in the manifest.
  - (by default) `false` — security groups that the port already has will not be deleted. New groups will be added.

- `direction` — traffic direction: incoming `ingress` or outgoing `egress`.

- `port_id` — the port ID, which will be allocated a floating IP address. You can specify ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `port_id = vkcs_networking_port.example.id`: the port ID will be taken after creating the `vkcs_networking_port` resource.
  - `port_id = data.vkcs_networking_port.example.id`: the port ID is taken from the `vkcs_networking_port` data source.
  - `port_id = "bb76507d-aaaa-aaaa-aaaa-2bca1a4c4cfc"`: the port ID is taken from the [list of ports](/en/networks/vnet/service-management/ports#viewing_a_list_of_ports_and_port_information) in the VK Cloud account or via the Openstack CLI.

  </details>

- `port_range_max` — the upper limit of the allowed port range, an integer from 1 to 65535. To select all ports, omit the `port_range_min` and `port_range_max` arguments.

- `port_range_min`— the lower limit of the allowed port range, an integer from 1 to 65535. To select all ports, omit the `port_range_min` and `port_range_max` arguments.

- `protocol` — the data transfer protocol. Possible values: `tcp`, `udp`, `icmp`, `ah`, `dccp`, `egp`, `esp`, `gre`, `igmp`, `ospf`, `pgm`, `rsvp`, `sctp`, `udplite`, `vrrp`.

- `remote_ip_prefix` — the remote CIDR, the value must be valid.

- `security_group_id` — the ID of the security group for which the rule is being created. You can specify ID in the manifest or get it from the data source or resource.

  <details>
    <summary>Examples</summary>

  - `port_id = vkcs_networking_port.example.id`: the security group ID will be taken after creating the `vkcs_networking_secgroup` resource.
  - `port_id = data.vkcs_networking_port.example.id`: the security group ID is taken from the `vkcs_networking_secgroup` data source.
  - `port_id = "bb76507d-bbbb-bbbb-bbbb-2bca1a4c4cfc"`: the security group ID is taken from the [list of security groups](/en/networks/vnet/service-management/secgroups#view_a_list_of_security_groups_and_information_about_them) in the VK Cloud account or via the Openstack CLI.

  </details>

- `security_group_ids` — the array of the security group IDs.

## 3. Create the necessary resources using Terraform

1. Put the Terraform configuration files in one directory:

   - `vkcs_provider.tf`;
   - `network.tf`;
   - `secgroup.tf`.

1. Open this directory.
1. Make sure that the configuration files are correct and contain the required changes:

   ```bash
   terraform validate && terraform plan
   ```

1. Apply the changes:

   ```bash
   terraform apply
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.

## 4. Check configuration application

Verify that the security rules and groups were successfully created:

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Virtual networks** → **Firewall settings**. Make sure the security group is created and includes all rules added in the example.

## Delete unused resources

If you no longer need the Terraform resources, delete them:

1. Open the directory that contains the Terraform configuration files.
1. Run the command:

   ```bash
   terraform destroy
   ```

   Enter `yes` to confirm.

1. Wait for the operation to complete.
