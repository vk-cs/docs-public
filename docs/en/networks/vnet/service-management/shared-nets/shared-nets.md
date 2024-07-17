[Shared networks](../../concepts/net-types#shared_net) allow you to work with one network in several projects.

## {heading(Sharing network)[id=share]}

Only a user with the [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) of the project owner can share the network with other projects.

To share a network with other projects:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/app/) you VK Cloud personal account.
1. Select the project.
1. Go to **Cloud Networks** → **Networks**.
1. Click ![more-icon](/ru/assets/more-icon.svg "inline") for the network and select ![sharing-icon](/ru/assets/sharing-icon.svg "inline") **Share network**.
1. In the window that opens select a type of the project that you want to share the network with:

   - **My projects**: allows to share a network with projects where you are also the owner.

     As you select this type, select the [unique identifier (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id) in the **ID of the project** field. PID looks like `mcsNNNNNNNNNN`. You can select several projects here.

   - **Other projects**: allows to share a network with any project.

     As you select this type, specify  the [Project ID](en/tools-for-using-services/api/rest-api/endpoints#getting_project_id) in the **Project ID in OpenStack** field. Project ID looks like `exampled4ef0547e5b222f445`, differs from unique identifier (PID). You can specify several projects here.
1. Click **Send**.

</tabpanel>
</tabs>

Users of the specified projects will receive a notification of an invitation to the shared network and will be able to accept or decline it. The user's decision applies to the entire project: if one user declines the offer to join the network, the network will be unavailable for the entire project.

## {heading(Viewing projects with shared network access)[id=view_shared]}

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/app/) you VK Cloud personal account.
1. Select the project.
1. Go to **Cloud Networks** → **Networks**.
1. Click the name of the required network.
1. Go to the **Information** tab.

The **Network owner** parameter specifies the PID of the project that shares its network.

The **Network users** parameter specifies the PIDs of projects that are allowed access to the network. The parameter is displayed only for the network owner.

</tabpanel>
</tabs>

## {heading(Unsharing network)[id=unshare]}

Only the [network owner](../../concepts/net-types#shared_net) can disconnect a project from the shared network.

Before unsharing, make sure that all VMs, [PaaS services](/en/intro/start/concepts/architecture), file storages, balancers and advanced routers that are connected to the shared network are deleted in the related project.

To disconnect a project from the shared network:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Go to](https://cloud.vk.com/app/) you VK Cloud personal account.
1. Select the project.
1. Go to **Cloud Networks** → **Networks**.
1. Click the name of the required network.
1. Go to the **Information** tab.
1. Click **Edit**.
1. The **Network users** parameter specifies the PIDs of projects that are allowed access to the network. Click ![cross-icon](/ru/assets/cross-icon.svg "inline") to deny the project access to the shared network.
1. A window will open to warn you that the corresponding ports will be disabled. Click **Unshare**.
1. Click **Save changes**.

</tabpanel>
</tabs>

## {heading(Deleting shared network)[id=delete_shared]}

Only [network owner](../../concepts/net-types#shared_net) can delete a shared network.

To delete a shared network:

<tabs>
<tablist>
<tab>Personal account</tab>
</tablist>
<tabpanel>

1. [Delete](../ports#deleting_a_port) all occupied shared network ports in your project. To remove some ports, you need to remove or disable the services that are connected to them: VMs, [PaaS services](/ru/intro/start/concepts/architecture), file storages, balancers, advanced router interfaces directed to the shared network.
1. Make sure that connected projects also have all services on the shared network removed or disabled.

 <warn>
 As long as there are occupied ports on the shared network, it is impossible to delete the network.
 </warn>

{include(/en/_includes/_delete_net.md)}

</tabpanel>
</tabs>
