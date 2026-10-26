
{include(/en/_includes/_translated_by_ai_en.md)}

When attempting to log in through the identity federation, the following message is displayed:

```plaintext
Forbidden: role mapping misconfiguration: mapping is not configured for any of the IdP groups: [group1, group2]
```

The error occurs if role mapping between groups in the identity provider (IdP) and in the VK Cloud identity federation is not configured. The roles of at least one group in the IdP must be mapped to roles in the federation group.

## Solution

1. [Go to](https://cloud.vk.ru/account) your VK Cloud account.
1. Go to the **Identity Federation** section.
1. Go to the **Groups** tab.
1. Click the name of the project for which the identity federation is being configured.
1. Add the groups that you use in your IdP:

   1. Click the **Add** button. If there are already created groups on the page, click the **Add group** button.
   1. Configure the group:

      - **Group name**: specify the group name. The name of the group being created must match the group name in your IdP, but it must be in lowercase.
      - **Permissions**:

        - Select **Project** to link the group and roles within a single project. In different projects, you can link the same group to different roles, which allows you to differentiate the federated user's level of access to projects.
        - Select **Domain** to link the group and roles in all projects of a single owner and provide the federated user with a unified level of access to them. The **Domain** permission is available only to the project owner.

      - **Group roles**: select the [VK Cloud roles](/en/access/iam/concepts/rolesandpermissions) that correspond to your access matrix for the group being created.

   1. Click the **Add** button.
   1. If the problem persists, contact [technical support](/en/contacts).