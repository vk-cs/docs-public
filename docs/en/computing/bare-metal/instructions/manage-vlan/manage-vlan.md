# {heading(VLAN management)[id=bare-metal-vlan]}

{include(/en/_includes/_translated_by_ai_en.md)}

On {var(cloud)} Bare Metal servers, you can assign your own VLAN to network interfaces and LAG interfaces.

## {heading(Creating a VLAN)[id=bare-metal-vlan-add]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. If the VLAN will be used for connectivity with other {var(cloud)} services in the Cloud Networks network, {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=prepare]} the network if this has not been done earlier. It will be bound to a specific VLAN; you cannot assign one network to several VLANs.
1. Go to the **Bare Metal** → **VLAN** section.
1. Click **Add**.
1. Set the VLAN parameters:

   - **VLAN**: the VLAN number in the range from `2` to `3999`; it must be unique within the project.

   - **Name**: the VLAN name.
   - **Description**: an arbitrary VLAN description.
   - **Type**: the VLAN type.

     - `Sprut`: the VLAN is bound to a {var(cloud)} cloud network. Servers in such a VLAN can exchange traffic with Cloud Servers virtual machines in the selected network.
     - `L2Only`: the VLAN is not bound to a cloud network, and no subnet is set for it. In such a VLAN, only Bare Metal servers exchange traffic with each other at the L2 level. All Bare Metal servers in one project are connected to a common L2 network. Such a VLAN has no internet access. This type is suitable if you build your own network infrastructure on top of the servers that is independent of the cloud network.

   - **Network and subnet**: the network and subnet to which the VLAN is bound. The field is available only for the `Sprut` type. It must be unique for each VLAN.

   {note:info}
   {linkto(../../../../networks/vnet/concepts/traffic-limiting#secgroups)[text=Security groups]} are not supported in the Bare Metal network.
   {/note}

1. Click **Add**.

{/tab}

{/tabs}

## {heading(Changing the VLAN name and description)[id=bare-metal-vlan-edit-meta]}

For a created VLAN, you can change only the name and description. To use a different number, type, or network binding, {linkto(#bare-metal-vlan-add)[text=create]} a new VLAN.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Bare Metal** → **VLAN** section.
1. In the VLAN list, click ![ ](../../../../assets/more-icon.svg "inline") for the desired VLAN.
1. Select **Editing**.
1. Change the values of the **Name** and **Description** fields.
1. Click **Save**.

{/tab}

{/tabs}

## {heading(Deleting a VLAN)[id=bare-metal-vlan-delete]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Bare Metal** → **VLAN** section.
1. In the VLAN list, click ![ ](../../../../assets/more-icon.svg "inline") for the desired VLAN.
1. Select **Delete** and confirm the action.

   If at least one server is connected to this VLAN, a window with the list of such servers opens. In this case, first {linkto(../manage-net#bare-metal-network-config-nic-or-bond)[text=remove]} the VLAN from the network configuration of the specified servers and try deleting again.

{/tab}

{/tabs}
