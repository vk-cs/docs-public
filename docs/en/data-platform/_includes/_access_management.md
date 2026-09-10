{includetag(dp_private_access_intro)}

To manage access for project members or service accounts, {var(data-p)} within {var(cloud)} uses an access control subsystem. Access can be managed through the Self-Service Portal. For details, see the {var(cloud)} Administrator Guide, section [User Roles](https://cloud.vk.ru/docs/on-premises/private-cloud/ru/4_3/admin-guide/users_and_access_control/users/users_and_roles).

{/includetag}

{includetag(dp_private_access_roles)}

The list of actions available to a project member is determined by:

- The assigned base role — defines the set of permissions available by default. There are no specialized roles.

   The `Project Owner` and `Project Co-owner` base roles grant full access to all operations; no separate permission configuration is needed.

- Individual permissions — assigned additionally if those included in the base role are insufficient.

  {note:info}
  Access granted with the base role takes priority over individual permissions.
  {/note}

When assigning roles and permissions, follow the principle of least privilege: a user should only have the permissions necessary to perform their tasks.

{/includetag}

{includetag(dp_private_access_observer)}

There are no specialized roles. The `Observer` base role with additional permissions can be used for access separation. By default, access to the service for this base role is limited: only viewing some information about previously created service instances.

You can grant any permissions, creating a role model that suits your needs.

{/includetag}

{includetag(dp_private_access_full_desc)}

All actions are allowed, including creating and deleting service instances. A project member with broad expertise and a high level of responsibility can use this access level. Creating new service instances may increase infrastructure costs, and deletion is an irreversible operation that can disrupt the operation of an application using your service instance.

{/includetag}

{includetag(dp_private_access_infra_desc)}

Has almost all permissions, except for creating and deleting service instances. Can be used by a project member acting as an infrastructure operator or DevOps engineer to manage already created service instances. Also implies an impact on service costs, but only through scaling of existing service instances.

{/includetag}

{includetag(dp_private_access_usage_desc)}

Has no access to managing service instances, can only view information about them (audit data is not accessible). Also has access to working with the service through the console in the Self-Service Portal. Can be used by project members who work with data, such as developers or analysts.

{/includetag}

{includetag(dp_private_access_audit_desc)}

Cannot change service instance parameters and has no access to the console in the Self-Service Portal. Used exclusively for auditing: examining logs and event history, as well as viewing the list of users. Typically suitable for security department staff.

{/includetag}
