Access control operations are available only to the following [roles](../../../concepts/rolesandpermissions) of personal account: owner, superadministrator and user Administrator (IAM). Viewing of project members is also available to the project administrator and viewer.

## Viewing project members

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page.
1. From the drop-down list, select **Manage access**.

Login, assigned roles and status are displayed for each member (**Yes** — the user has joined the project, **No** — the user did not accept the invitation sent to him).

</tabpanel>
</tabs>

## Viewing the roles involved in the project

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page, from the drop-down list, select **Manage access**.
1. On the access management page, go to the tab **Roles**.

    The project owner sees in the list all roles except his own, the superadministrator — everything except his own and the owner, the user administrator (IAM) — everything except his own, the owner and the superadministrator.

1. Click on the role to see who it was assigned to.

    The list shows all the members invited to the role, including those who did not accept the invitation.

</tabpanel>
</tabs>

## Inclusion of mandatory 2FA in the project

For security reasons, you can make two-factor authentication (2FA) mandatory for project members:

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. [Enable](../../account-manage/manage-2fa/) 2FA for your account, if it is not already enabled.
1. Click on the user's name in the header of the page, from the drop-down list, select **Manage access**.
1. On the access management page, enable the option **Mandatory two-factor authentication**.

The option can be turned on and off at any stage of the project's life.

## Inviting a new member to the project

You can invite both a user who already has an account in VK Cloud, and an unregistered user.

If the user enters the project by invitation, he does not need to confirm the phone number and link the card.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page, from the drop-down list, select **Manage access**.
1. On the access management page, click **Add member**.
1. Enter the email address of the member and select from the list the role you want to assign to him.

    The role of superadministrator can be assigned only by the project owner. The role of User Administrator (IAM) can be assigned only by the project owner or superadministrator. You cannot invite a member to the role of the project owner.

    If a member is assigned multiple roles, their permissions are summed up.

1. Click the **Add user** button.

</tabpanel>
</tabs>

An invitation will be sent to the specified email address, it is valid for 24 hours.

After [logging in to the project](../../project-invitation/) the new member's status in the column **Activated** will change to **Yes**.

<info>

The member's email is not editable, and the invitation cannot be resent to it. If you have entered an incorrect email address or the invitation has expired, [delete](#deleting-member) the member and invite him again.

</info>

## Changing member role

A project member cannot change the role for:

- the owner of the project;
- myself;
- a member with the same role as himself.

Only the project owner can assign another role to the superadministrator.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page, from the drop-down list, select **Manage access**.
1. Expand the menu of the desired project member and select **Edit**.
1. In the window that opens, specify the list of new roles in the field **User role**.

    At least one role should remain in the list.

1. Click the **Save changes** button.

</tabpanel>
</tabs>

## Deleting member

The member cannot delete:

- the owner of the project;
- myself;
- a member with the same role as himself.

Only the project owner can delete the superadministrator.

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

This is a group operation: if necessary, you can delete several members at once by selecting them using the checkboxes.

1. Go to VK Cloud [personal account](https://mcs.mail.ru/app/en).
1. Click on the user's name in the header of the page, from the drop-down list, select **Manage access**.
1. Expand the menu of the desired project member and select **Delete**.
1. Confirm the deletion.

</tabpanel>
</tabs>
