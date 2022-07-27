## Roles

In the personal account of VK CS, you can add additional project participants who will have access to working with cloud services. When adding, the role of the participant is indicated.

## Role matrix

The VK CS platform supports the differentiation of access rights to project resources based on the role model. Following is the list of roles and their respective permission.

List of roles and permissions:

| Operation/Role | User admin (user_admin) | admin. billing | admin. project | Project owner | admin. networks | Observer | admin. internal networks | admin. network security | admin. VM | Super Administrator |
|------------------------------------------------- -------------------------------------------------- --------------------|------------------------------ ------------------|-----------------|-------------- --|------------|-------------|-------------| ------------------------|------------------------ -----|-----------|--------------------|
| Adding a user to a project | x | - | - | x | - | - | - | - | - | X |
| User Role Assignment | x | - | - | X | - | - | - | - | - | X |
| Billing / changing payment details | - | X | X | X | - | - | - | - | - | X |
| Create / delete VM | - | - | X | X | - | - | - | - | - | X |
| Connecting / disconnecting VMs, PaaS services, shared folders to a virtual network | - | - | X | X | - | - | - | - | - | X |
| VM management (enable/disable/mount images/reboot/change resources//access to monitoring and logs) | - | - | X | X | - | - | - | - | X | X |
| Virtual Disk Management (Create/Remove/Expand/Mount/Snapshots/Migrate) | - | - | X | X | - | - | - | - | X | X |
| Image management (adding / removing VM images) | - | - | X | X | - | - | - | - | - | X |
| Manage Shared Folders (Add/Remove/Resize) | - | - | X | X | - | - | - | - | - | X || Manage access rules for shared folders (add/delete/modify) | - | - | X | X | - | - | - | - | - | X |
| Creation modification removal of PaaS-services (K8S,DBaaS) | - | - | X | X | - | - | - | - | - | X |
| Creation, removal, modification, virtual networks. Connecting to a virtual router | - | - | X| X | X | - | X | - | - | X |
| Creating / deleting project virtual routers. | - | - | X | X | X | - | X | - | - | X |
| Connecting tenant routers to the ext-net network | - | - | X | X | X | - | X | - | - | X |
| Management of load balancers and rules in them (adding / removing / adjusting) | - | - | X | X | X | - | X | - | - | X |
| Working with the Security Group within the tenant (adding/removing groups/access rules) | - | - | X | X | X | - | - | X | - | X |
| Mapping Security groups to VM interfaces | - | - | X | X | X | - | - | X | - | X |
| VPN Management | - | - | X | X | X | - | - | - | - | X |
| FIP management | - | - | X | X | X | - | - | - | - | X |
| Managingoutboundrules for filtering traffic on external ports of the router (FWaaS) | - | - | - | - | - | - | - | - | - | X |
| Managingincomingrules for filtering traffic on external ports of the router (FWaaS) | - | - | X | X | X | - | - | - | - | X |
| Adding virtual networks to the BGP address scope (operation required for routing virtual networks) | - | - | - | - | - | - | - | - | - | X |
| Create zones and records in public DNS | - | - | x | x | x | - | - | - | - | X |
| View information about all services within a project | - | - | - | X | | X | - | - | - | X |

## Deleting a member

In your personal account in the "Users" and "Roles" tab, you can not only add, but also remove participants.

Select the desired member and click "Remove", then confirm your choice.

<warn>

Deleting the user under which the Kubernetes cluster was created will result in a health issue after the cluster is restarted. To restore the work of the added user, on behalf of which the cluster was created, restart the cluster.

</warn>
