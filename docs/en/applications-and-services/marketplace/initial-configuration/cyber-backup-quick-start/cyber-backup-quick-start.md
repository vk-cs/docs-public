# {heading(Service installation and configuration of Cyber Backup Cloud)[id=marketplace-cyber-backup-quick-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can back up and restore your virtual machines using the [Cyber Backup Cloud](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/630008e7-a649-4111-a21f-6d8461cd5f7a/latest/info) service.

{cut(How the service works)}

1. Service agents are installed on the target VMs.
1. Backup plans for the target VMs to the service cloud are configured.
1. If necessary, the state of the target VM is restored from a backup copy stored on the service side.

{/cut}

After completing all the steps in this guide, you will:

1. Connect the Cyber Backup Cloud service in your {var(cloud)} management console and create an account in the service.
1. Register a VM created in {var(cloud)} in the service.
1. Create a backup of this VM in the service.
1. Restore the VM in {var(cloud)} from a backup copy stored in the service.

By using the service, you agree to the Marketplace service [license agreement](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and to the [end-user license agreement](https://cyberprotect.ru/static/pdf/Cyberprotect_EULA_RUS.pdf) of the vendor LLC "Cyberprotect".

## {heading(Preparation steps)[id=marketplace-cyber-backup-quick-start-prepare-step]}

It is assumed that the project already contains a virtual machine (VM) whose data you plan to protect using the Cyber Backup Cloud service.

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=Configure]} two-factor authentication (2FA) for your account if it is not yet configured.
1. Make sure that the VM to be registered in the service:

   - Meets its [system requirements](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#supported-operating-systems-and-environments.html).
   - Is accessible via SSH connection:

     - Has an external IP address.
     - Has the `ssh` {linkto(../../../../networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-secgroups)[text=security group]} assigned to it.

       If the security group is not assigned, {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-instance-add-sg)[text=assign]} it.

     - You have the private SSH key from the {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix-key-pared)[text=key pair]} used to access the VM. The key pair name is displayed on the VM page in the **Cloud Computing** section.

   The example in this article describes the connection for a VM running Ubuntu 22.04 named `Ubuntu-CBC`.

   {note:info}
   If you increase the size of the VM boot disk or add new disks, these changes are automatically reflected in the service console.
   {/note}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the VM.
1. Place an arbitrary non-empty file in your home directory. For example, run the following in the console:

   ```console
   cp --help > /home/ubuntu/cp_help.txt
   ```

   The `cp_help.txt` file will be created in the home directory.

## {heading(1. Connect the Cyber Backup Cloud service)[id=marketplace-cyber-backup-quick-start-connect-service]}

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Go to the **App Store** section.
1. On the **Cyber Backup Cloud** service card, click the **Details** button.
1. On the service page, click the **Connect** button.
1. Select the **Per-device licensing** pricing plan.

   It involves charging a fixed monthly amount for each connected VM. The amount of data stored in the VM backups and the number of backups do not affect billing.

1. On the opened plan page, click **Connect plan**.
1. Wait for the installation to complete.

   An email for activating an account in the Cyber Backup Cloud service will be sent to the email address associated with your {var(cloud)} account.

1. Follow the link from the email. In the registration window, set a password for your account.

   Your login will match the {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=identifier (PID)]} of the project in {var(cloud)} in which you connected the service.

1. Confirm your agreement with the legal terms of service use: select all the agreements in the list and click the **Accept** button.

The Cyber Backup Cloud service console will open — a management console available at https://ru01-cloud.cyberprotect.ru.

## {heading(2. Install the Cyber Backup Cloud service agent on the VM)[id=marketplace-cyber-backup-quick-start-install-agent]}

Installing the agent is required:

- to synchronize VM data with a copy of this data in the service cloud;
- to manage the VM — for example, to reboot it.

1. [Log in](https://cloud.acronis-infoprotect.ru/login) to the console using the login and password of your Cyber Backup Cloud service account.
1. On the console home page, go to the **Devices** → **All devices** section and click the **Add** button in the upper right part of the screen.
1. In the window that opens, select the **Servers** → **Linux** option. The Linux agent distribution will be downloaded to your device.
1. Install the agent on the `Ubuntu-CBC` VM.

   1. In the service console, create a registration token:

      1. Go to the **Devices** → **All devices** section and click the **Add** button in the upper right part of the screen.
      1. In the window that opens, scroll down to the **Registration token** field group and click the **Create** button.
      1. In the creation window, set the token expiration period and click **Generate token**.

         A token will be created — a sequence of 12 letters and digits in the format `A1B2—C3D4—E5F6`.

      1. Copy and save the token value.

         Once the window is closed, it will be impossible to view the token value.

   1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the VM and upload the Linux service agent distribution to it.
   1. Install the `rpm` package on the VM:

      ```console
      sudo apt-get install rpm
      ```

   1. Run the distribution on the VM by executing the run command with the following parameters:

      ```console
      sudo ./<PATH_TO_LINUX_DISTRIBUTION> -i BackupAndRecoveryAgent --rain=https://cloud.acronis-infoprotect.ru --token=<REGISTRATION_TOKEN>
      ```

      Replace the variables:

      - `<PATH_TO_LINUX_DISTRIBUTION>` — the full path to the distribution, including the file name and extension, for example: `ubuntu/Backup_AgentForLinux_x86_64.bin`.
      - `<REGISTRATION_TOKEN>` — the token you generated in the Cyber Backup Cloud console.

      {note:info}
      In some cases, additional packages may need to be installed on Linux. For more details, see the [official service documentation](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#linux-packages.html).
      {/note}

   1. In the installer window that opens, select the **Agent for Linux** option and follow the installation wizard steps.

   For more information about installation, see the [for Linux OS](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#installing-agents.html) section in the service documentation.

After successful agent installation, the `Ubuntu-CBC` VM will be registered in the Cyber Backup Cloud service and will appear in the console in the **Devices** → **All devices** section. The VM will be displayed in the console with the name `ubuntu-cbc` and the **Unprotected** status.

## {heading(3. Create a protection plan for the VM and the first backup)[id=marketplace-cyber-backup-quick-start-create-plan]}

A protection plan allows you to configure a backup schedule for the VM. You can specify:

- what data to back up — the entire VM, individual disks/volumes, or files;
- how to store this data — encrypted or unencrypted;
- the automatic backup schedule;
- the retention period for backups.

You can apply a protection plan to a VM manually at any time, outside the schedule.

To create a protection plan and apply it:

1. [Log in](https://cloud.acronis-infoprotect.ru/login) to the Cyber Backup Cloud service console.
1. Go to the **Devices** → **All devices** section.
1. Select the `ubuntu-cbc` VM using the checkbox and click the **Protect** button in the side menu on the right.
1. In the window that opens, expand the **Create plan** list and select the **Protection** option.
1. Create a protection plan for the VM as described in the [official service documentation](https://docs.cyberprotect.ru/ru-RU/CyberBackupCloud/21.06/user/#backup.html). When creating the plan, keep the encryption option enabled and set a password.

   Wait for the plan to be created.

1. Apply the plan:

   1. Go to the **Devices** → **All devices** section, select the VM in the list, and click the **Protect** button in the side menu on the right.

      The plan card will open.

   1. Hover the cursor over the plan and run it.

The backup will start, and its progress will be shown on the VM card. When the backup is complete, the **OK** status will be displayed.

## {heading(4. Delete data from the VM)[id=marketplace-cyber-backup-quick-start-delete-data]}

{linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the `Ubuntu-CBC` VM and delete the `cp_help.txt` file from your home directory.

## {heading(5. Restore the VM from the backup)[id=marketplace-cyber-backup-quick-start-restore-vm]}

1. [Log in](https://cloud.acronis-infoprotect.ru/login) to the service console.
1. In the **Devices** → **All devices** section, click the **Restore** button on your VM card.
1. In the window that opens, configure the recovery settings:

   1. Click the **Recovery** button.
   1. Select the **Entire machine** recovery point.
   1. Enter the password you set when creating the plan.

1. In the window that opens, review the settings and click **Start recovery**.

   1. In the **Recover to** field, keep the **Physical machine** option selected.

      The Cyber Backup Cloud service treats VMs deployed on third-party platforms as physical machines.

   1. Leave the **Target machine** field unchanged.
   
1. In the confirmation window, review the information and click **Start recovery**.

   The window that opens will show the operation progress in percentages.

The data on the original VM in the {var(cloud)} cloud will be restored, and the VM will be rebooted. All changes that occurred on the VM since the last application of the protection plan will be lost. The VM name in {var(cloud)} will not change after recovery.

## {heading(6. Check the operability of the restored VM)[id=marketplace-cyber-backup-quick-start-check-vm]}

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Connect]} to the `Ubuntu-CBC` VM.
1. Check that the `cp_help.txt` file is present in the home directory.
1. {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage)[text=Perform]} arbitrary operations on the VM.