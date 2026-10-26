# {heading(Cannot delete a security group)[id=vnet-secgroups-delete-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When deleting a security group, an error occurs:

```text
Failed to delete group with name or ID 'f4ad1825-XXXX-XXXX-XXXX': ConflictException: 409:
Client Error for url: https://infra.mail.ru:9696/v2.0/security-groups/f4ad1825-XXXX-XXXX-XXXX,
Security Group f4ad1825-XXXX-XXXX-XXXX in use.
1 of 1 groups failed to delete.
```

The problem occurs if the security group is in use and attached to ports.

### {heading(Solution)[id=vnet-secgroups-delete-problem-resolve]}

1. Make sure the OpenStack client is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure the additional `neutron` package is {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Get a list of port IDs associated with the security group:

   ```console
   neutron port-list -c id -c name -c security_groups | grep <SECURITY_GROUP_ID> | awk '{print $2}'
   ```
   Here, `<SECURITY_GROUP_ID>` is the {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=security group ID]} that could not be deleted.

1. Detach the security group from each port:

   ```console
   openstack port unset --security-group <SECURITY_GROUP_ID> <PORT_ID>
   ```
   Here:

   - `<SECURITY_GROUP_ID>` — the ID of the security group that could not be deleted.
   - `<PORT_ID>` — the port ID from the list obtained earlier.

1. Delete the security group:

   ```console
   openstack security group delete <SECURITY_GROUP_ID>
   ```

1. If the problem persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.