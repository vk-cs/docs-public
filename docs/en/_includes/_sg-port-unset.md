{tabs}

{tab(OpenStack CLI)}

1. Make sure the OpenStack client {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=is installed]}, and {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. {linkto(../../../../networks/vnet/instructions/ports#vnet-ports-view)[text=Get the name or ID]} of the desired port.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Get the name or ID]} of the desired security group.
1. Detach from the port:

   {tabs}

   {tab(One security group)}

   ```console
   openstack port unset --security-group <GROUP_NAME_OR_ID> <PORT_NAME_OR_ID>
   ```

   {/tab}

   {tab(All security groups)}

   ```console
   openstack port set --no-security-group <PORT_NAME_OR_ID>
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}
