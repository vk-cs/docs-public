## Adding a user

Accounts (access keys) increase the security of the service. You can create and manage accounts (keys) in the "Access Management" section of the navigation bar. Additional project participants will have access to work with cloud services.

To add a new user:

1. Click the "Add Participant" button.
2. Enter the user's Email address and select a role from the list.
3. Click "Add User".

The new user will appear in the list.

To delete an account, click "Delete" in the user's line. Or select the desired accounts by ticks and click "Delete" at the top of the panel. Confirm the deletion with the button of the same name.

<warn>

If you delete the user on whose behalf the Kubernetes cluster was created, a malfunction will occur after restarting it. To restore the work of the added user on whose behalf the cluster was created, restart the cluster.

</warn>

## Changing account data

To edit your account, go to the "Access Management" section in the VK Cloud panel. In the user row, in the drop-down menu, click "Edit". Select a new role for the user and click Save Changes.

<warn>

You can't change the user's email address. Delete the user and create a new one with the correct email address.

</warn>
