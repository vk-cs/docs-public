A security group is a set of custom traffic rules that can be assigned to instances ports.

## View a list of security groups and information about them

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.

A list of security groups will be displayed.

1. Click on the security group name.

A page with detailed information about it will open.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. To view the list of security groups, run the command:

```bash
open stack security group list
```

1. To view detailed information about a security group, run the command:

```bash
openstack security group show <security group ID>
```

1. To view security group rules:

```bash
openstack security group rule list --long <security group ID>
```

</tabpanel>
</tabs>

## Create a security group

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click the **Add** button.
1. Enter a name for the security group.
1. Add a description.
1. Click **Create Group**.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. View the security groups in the project:

```bash
open stack security group list
```

1. Get information about the security group:

```bash
openstack security group show <group ID>
```

1. Create a security group:

```bash
openstack security group create --description <group description> <new group name>
```

</tabpanel>
</tabs>

## Editing the name and description of the security group

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click on the security group name.

A page with detailed information about it will open.

1. Click the pencil icon next to the security group name.

Edit the name and (if necessary) the name of the security group.

1. Click the **Save** button.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. To change the description and name of a security group, run the command:

```bash
openstack security group set --description <description> --name <name> <group ID>
```

</tabpanel>
</tabs>

## Adding a rule

A security group rule is a set of parameters that define the conditions for traffic to pass through. Rules are combined into groups, which in turn apply to instance ports.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click on the security group name.
1. In the **Incoming traffic** and **Outgoing traffic** section , click **+ Add rule**.
1. Select the type of traffic (SSH, HTTP, HTTPS, etc.)
1. Select the required protocol.
1. In the **Remote address** section , specify the address for which the selected type of traffic will be allowed:

   - All IP addresses;
   - Range of IP addresses;
   - Security team.

1. Click **Add description** and in the field that appears, describe the new rule.
1. Click **Save Rule**.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. View the list of group rules:

```bash
openstack security group rule list --long <group ID>
```

1. Create a rule:

```bash
openstack security group rule create <arguments> <security group ID>
```

Available arguments for the rule creation command:

- `--remote-ip` - specifies the address from which connections can be made (in CIDR format).
- `--remote-group` - specifies a group whose instances can be a source of traffic.
- `--dst-port` - destination port, required for TCP and UDP protocols.
- `--protocol` - protocol, it is possible to specify the name, number or permission of all protocols (any).
- `--description` is an arbitrary description.
- `--icmp-type` — ICMP type.
- `--icmp-code` — ICMP code.
- `--ingress` - apply the rule for incoming traffic.
- `--egress` - apply the rule for outgoing traffic.
- `--ethertype` - EtherType value (IPv4, IPv6).

</tabpanel>
</tabs>

## Deleting a rule

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click on the security group name.
1. Click the trash icon in the line with the required rule.
1. Click the menu icon on the row of the rule you want to delete.
1. In the menu that opens, click the **Delete** button.
1. Press the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. To view detailed information for a rule, run the command:

```bash
openstack security group rule show <rule ID>
```

1. To delete a rule, run the command:

```bash
openstack security group rule delete <rule ID>
```

</tabpanel>
</tabs>

## Assign a rule group to an instance

To apply a rule set to a virtual machine, the security group that contains the rule set must be applied to the virtual machine.

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click on the security group name.
1. In the **Virtual machines with rule group** section , click **Add virtual machine**.
1. Select the instances to which the group will be added.
1. Click **Add Rule Group**.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. Run the command:

```bash
openstack server add security group <instance ID> <security group ID>
```

</tabpanel>
</tabs>

## Detach a group from an instance

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Select the project and region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click on the security group name.
1. In the **Virtual Machines with Rule Group** section , hover your mouse over the instance row.
1. Click the trash can icon.
1. Press the **Confirm** button.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. Run the command:

```bash
openstack server remove security group <instance ID> <security group ID>
```

</tabpanel>
</tabs>

## Deleting a security group

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
</tablist>
<tabpanel>

<warn>

A group cannot be removed as long as there are ports that use this group. Also, the `default` security group and other preset groups cannot be removed.

</warn>

This is a group operation: if necessary, you can delete several security groups at once by selecting them using the checkboxes.

1. Go to [personal account](https://mcs.mail.ru/app/) VK Cloud.
1. Select a project and a region.
1. Go to **Virtual networks** → **Firewall settings**.
1. Click the menu icon on the row of the security group you want to delete.
1. In the menu that opens, click the **Delete** button.

</tabpanel>
<tabpanel>

1. Make sure OpenStack CLI is [installed](../../../../additionals/account/project/cli/setup). Also check that you can [log in](../../../../additionals/account/project/cli/authorization) in the OpenStack CLI.

1. Run the command:

```bash
openstack security group delete <security group ID>
```

</tabpanel>
</tabs>
