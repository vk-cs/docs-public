You can invite both a user who already has a VK Cloud account and an unregistered user.

If a user joins a project by invitation, they do not need to confirm their phone number or link a card.

1. [Go to](https://msk.cloud.vk.com/app/) the VK Cloud management console.
1. Click the user name in the page header, and select **Access management** from the drop-down list.
1. On the access management page, click **Add participant**.
1. Enter the participant's email and select from the list the {linkto(/ru/access/iam/concepts/roles-reference#iam-roles-reference)[text=role]} or {linkto(/ru/access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permission]} that you want to assign to them.

   Only the project owner can assign the super administrator role. Only the project owner or a super administrator can assign the user administrator (IAM) role. You cannot invite a participant to the project owner role. If multiple roles are assigned to a participant, their permissions are combined.

   Later, you can {linkto(/ru/access/iam/instructions/access-manage#project-access-user-role-edit)[text=change]} the roles and permissions assigned to the participant.

1. Click **Add user**.

An invitation will be sent to the specified email address; it is valid for 24 hours.

{includetag(access-manage)}
After the new participant {linkto(../../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=joins the project]}, their status in the **Activated** column will change to **Yes**.

{note:info}
The participant's email cannot be edited, and you cannot resend the invitation to it. If you entered an incorrect email or the invitation has expired, {linkto(../../../../../access/iam/instructions/access-manage#project-access-delete-user)[text=delete]} the participant and invite them again.
{/note}
{/includetag}

{includetag(create-account)}
After the new participant {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=joins the project]}, their status in the **Activated** column will change to **Yes**.

{note:info}

The participant's email cannot be edited, and you cannot resend the invitation to it. If you entered an incorrect email or the invitation has expired, {linkto(../../../../access/iam/instructions/access-manage#project-access-delete-user)[text=delete]} the participant and invite them again.

{/note}
{/includetag}