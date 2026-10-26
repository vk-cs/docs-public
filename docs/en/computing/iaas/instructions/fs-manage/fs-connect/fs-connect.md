# {heading(Mounting and unmounting file storage)[id=iaas-fs-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

<!-- #todo на раздел есть ссылка в Руководстве администратора VK Private Cloud. -->

Mounting and unmounting file storage, as well as writing and reading data, are available only on virtual machines {var(cloud)}{ifdef(private,private-pg,private-pdf,private-pg-pdf)} of the Linux family {/ifdef}.

## {heading(Mounting file storage)[id=iaas-fs-connect-mount]}

The method of mounting file storage depends on the virtual machine operating system{ifdef(public)}, {linkto(#iaas-fs-connect-mount-windows)[text=Windows]} or {linkto(#iaas-fs-connect-mount-linux)[text=Linux]},{/ifdef} and the protocol selected when creating the storage.

{ifdef(public)}

### {heading(Windows)[id=iaas-fs-connect-mount-windows]}

{tabs}

{tab(NFS protocol)}

You can mount file storage via the NFS protocol in Windows using the Windows Server component — Client for NFS.

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Connect]} to the {var(cloud)} virtual machine.
1. Install the Client for NFS from the Server Manager interface or using PowerShell:

   {tabs}
    
   {tab(Server Manager)}
        
   1. Open Server Manager and in the **Manage** menu, select **Add Roles and Features**.
   1. Go to the **Installation Type** section, select the **Role-based or feature-based installation** option, and click **Next**.
   1. Go to the **Features** section and select **Client for NFS** from the list.
   1. In the same list, expand the options **Remote Server Administration Tools** → **Role Administration Tools** → **File Services Tools** and select **Services for NFS Management Tools**. Click **Next**.
   1. Verify that all necessary components are selected and click **Install**.
   1. Wait for the installation to complete and restart the server.

   {/tab}
    
   {tab(PowerShell)}
    
   1. Install the Client for NFS and the services for NFS management tools:

      ```console
      Install-WindowsFeature NFS-Client, RSAT-NFS-Admin
      ```

   1. Wait for the installation to complete and restart the server.

   {/tab}

   {/tabs}

1. Change the client settings using Server Manager:

   1. In the **Tools** menu, select **Services for NFS**.
   1. Select **Client for NFS** and click the **Display properties window** icon.
   1. Set the required settings.

1. Mount the file storage:

   ```console
   mount <МОНТ POINT> <DRIVE_LETTER>:
   ```

   Here:

   - `<MOUNT POINT>` — the file storage address. To find it out, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=view]} the file storage information.
   - `<DRIVE_LETTER>` — an uppercase Latin letter that is not used by other drives.

{/tab}

{tab(CIFS protocol)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Connect]} to the {var(cloud)} virtual machine.
1. Mount the file storage:

   ```console
   net use <DRIVE_LETTER>: <MOUNT POINT>
   ```
   
   Here:
   
   - `<MOUNT POINT>` — the file storage address. To find it out, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=view]} the file storage information.
   - `<DRIVE_LETTER>` — an uppercase Latin letter that is not used by other drives.

{/tab}

{/tabs}

### {heading(Linux)[id=iaas-fs-connect-mount-linux]}
{/ifdef}

{tabs}

{tab(NFS protocol)}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)} 
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go]} to the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where you need to create the file storage.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click the file storage name.
1. On the **General Information** tab, note the value of the **Mount Point** field.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the VM name.
1. Go to the **Console** tab.
   {/ifdef}
1. {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifdef} to the {var(cloud)} virtual machine.
1. Install the package for working with the NFS protocol:

   {tabs}
   {tab(apt)}

   ```console
   sudo apt-get install nfs-common
   ```
   {/tab}
   {tab(dnf)}

   ```console
   sudo dnf install nfs-utils
   ```
   {/tab}
   {/tabs}

1. Create a directory for mounting the storage:

   ```console
   mkdir <DIRECTORY_NAME>
   ```

1. Mount the file storage:

   ```console
   mount -t nfs <MOUNT POINT> ./<DIRECTORY_NAME>
   ```

   Here:

   - `<MOUNT POINT>` — the file storage address. To find it out, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=view]} the file storage information.
   - `<DIRECTORY_NAME>` — the name of the previously created directory.

{/tab}

{tab(CIFS protocol)}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go]} to the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where you need to create the file storage.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click the file storage name.
1. On the **General Information** tab, note the value of the **Mount Point** field.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the VM name.
1. Go to the **Console** tab.
   {/ifdef}
1. {ifdef(public)}{linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifdef} to the {var(cloud)} virtual machine.
1. Install the package for working with the CIFS protocol:

   {tabs}
   {tab(apt)}

   ```console
   sudo apt install -y cifs-utils
   ```
   {/tab}
   {tab(dnf)}

   ```console
   sudo dnf install cifs-utils
   ```
   {/tab}
   {/tabs}

1. Create a directory for mounting the storage:

   ```console
   mkdir <DIRECTORY_NAME>
   ```

1. Mount the file storage:

   ```console
   sudo mount -o user=,password= -t cifs <MOUNT POINT> ./<DIRECTORY_NAME>
   ```

   Here:

   - `<MOUNT POINT>` — the file storage address. To find it out, {linkto(../../../../../computing/iaas/instructions/fs-manage/fs-operations#iaas-fs-operations-info-view)[text=view]} the file storage information.
   - `<DIRECTORY_NAME>` — the name of the previously created directory.

{/tab}

{/tabs}

## {heading(Unmounting file storage)[id=iaas-fs-connect-unmount]}

The method of unmounting file storage depends on the virtual machine operating system and the protocol selected when creating the storage.

{ifdef(public)}
{tabs}

{tab(Windows)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-win#iaas-vm-connect-win)[text=Connect]} to the {var(cloud)} virtual machine.
1. Unmount the file storage by running the command:

   {tabs}
   
   {tab(NFS protocol)}
   
   ```console
   umount <DRIVE_LETTER>:
   ```
   
   {/tab}
   {tab(CIFS protocol)}
   
   ```console
   net use <DRIVE_LETTER>: /delete
   ```
   
   {/tab}
   
   {/tabs}

{/tab}

{tab(Linux)}

1. {linkto(../../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the {var(cloud)} virtual machine.
1. Unmount the file storage by running the command:

   {tabs}
   
   {tab(NFS/CIFS protocols)}
   
   ```console
   sudo umount <МОНТ POINT>
   ```
   Here `<МОНТ POINT>` — the directory where the file storage is mounted.
   {/tab}
   
   {/tabs}

{note:info}
After the VM is restarted, the system automatically mounts the file storages specified in the `/etc/fstab` configuration file. To prevent this, remove the entry for this file storage from the `/etc/fstab` file.
{/note}

{/tab}

{/tabs}

{/ifdef}

{ifdef(private,private-pg,private-pdf,private-pg-pdf)}

1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go]} to the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where you need to create the file storage.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click the file storage name.
1. On the **General Information** tab, note the value of the **Mount Point** field.
1. Go to the **Cloud Computing** → **Virtual Machines** section.
1. Click the VM name.
1. Go to the **Console** tab.
1. {linkto(../../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]} to the {var(cloud)} virtual machine.
1. Unmount the file storage by running the command:

   {tabs}

   {tab(NFS/CIFS protocols)}

   ```console
   sudo umount <МОНТ POINT>
   ```
   Here `<МОНТ POINT>` — the directory where the file storage is mounted.
   {/tab}

   {/tabs}

{note:info}
After the VM is restarted, the system automatically mounts the file storages specified in the `/etc/fstab` configuration file. To prevent this, remove the entry for this file storage from the `/etc/fstab` file.
{/note}

{/ifdef}