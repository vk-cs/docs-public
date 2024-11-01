The Cloud Desktop service allows you to use the following subsystems of remote access to desktops:

- [Termidesk](https://termidesk.ru/products/) developed by UVEON. Used by default.
  
    Use this subsystem if users workstations are running Linux OS.
- VK developed by the VK company. Uses its own data transfer protocol, which ensures high-quality display of the virtual desktop and speed of interaction.

    Use this subsystem if users workstations are running Windows OS.

To select a remote desktop access subsystem:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop** → **Sevice settings**.
1. On the **Subsystem** tab, select **Termidesk** or **VK**.
1. Click **Save**.

<warn>

If you want to change the subsystem after creating a desktop pool, first delete all [desktop pools](../../desktops-pool/manage#deleting_a_desktop_pools) and the [service infrastructure](../../delete-vdi).

</warn>
