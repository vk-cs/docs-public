To connect to a JupyterHub instance, you need to select its DNS name in your Dashboard and open it in a new browser tab. After that, the UI JupyterHub will be available.

Next, you need to enter the username and password from JupyterHub.

By default, the admin user is created, the password for it is set during the creation of the JupyterHub instance in the LC.

<warn>

When you connect for the first time, it is recommended that you change the administrator password.

A user with administrator rights has the ability to bring the service to an unhealthy state, destroy the data of all users in the JupyterHub instance. Therefore, it is recommended to use a user with administrative rights only to grant access to other users by creating non-administrative users.

If the data is deleted or the JupyterHub instance is rendered unhealthy by a user with administrative privileges, the instance cannot be restored.

</warn>
