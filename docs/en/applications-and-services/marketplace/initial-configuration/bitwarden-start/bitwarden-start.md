# {heading(Bitwarden deployment)[id=marketplace-bitwarden-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Bitwarden is an enterprise password manager that provides secure storage and collaborative management of credentials and secrets.

Bitwarden features:

- Secure storage of passwords and secrets: a centralized repository of encrypted accounts, API keys, and other sensitive data in {var(cloud)}.
- Access and permission management: configuration of a role-based access model for employees.
- Generation of strong passwords: creation of unique complex passwords for each account.
- Autofill and synchronization: browser extensions and mobile applications, automatic insertion of logins and passwords.
- Auditing and reports: logging of account logins, password changes, and other user actions.
- Collaboration with secrets: secure sharing of credentials and secrets between teams and projects.

{cut(How the service works)}
The Bitwarden service is deployed on a VM in the {var(cloud)} cloud (self-host). With this solution, data is encrypted and stored on your own protected server.

A web interface is used to access the deployed Bitwarden server. When an advanced plan is connected, an administration portal becomes available in the web interface. When a user with administrator rights tries to log in as an administrator, a secure authorization link is sent to their email address. To enable this, when deploying the service with an advanced plan, you need to specify all the mail SMTP server details.

All service information: user profile data, organization composition, settings, event logs (events) — is stored in a separate MySQL database. If necessary, you can access it, for example, for backup, service migration, monitoring, or auditing.
{/cut}

{cut(Minimum server specifications for the service)}

- **vCPU**: 1.
- **RAM**: 2 GB.
- Disk size:

  - **System disk**: at least 20 GB.
  - **Data disk**: at least 15 GB.

- **Network**:

  - The VM must have Internet access.
  - Private DNS must be disabled.

{/cut}

By using the Bitwarden service, you agree to the license agreements of [Marketplace VK Cloud](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Bitwarden](https://bitwarden.com/help/article/open-source-license).

To deploy the Bitwarden service on a VM in your {var(cloud)} project:

1. Request an installation ID and key on the [official Bitwarden page](https://bitwarden.com/host). In the request, specify the email address to which you want to receive notifications from Bitwarden and the `EU` region.
1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. To have access to the VM with the deployed service and to the Bitwarden web interface from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **App Store** section.
1. Click on the **Bitwarden** service card.

   If there is no **Bitwarden** service card on the page, click the **All solutions** button and find the card in the catalog.

1. Click on the **Bitwarden** service card.
1. On the **Service description** tab, click the **Connect** button.
1. On the **Plan** tab, select the service version from the list.
1. Choose a suitable plan: `Basic` or `Advanced`.

   {tabs}
   {tab(Basic plan)}
   Designed for quick service launch with minimal settings.

   Features:

   - User registration via the web interface.
   - Ability to disable registration of new users (via the **Prohibit user registration via Web UI** option).

   Suitable for personal use, small teams, or testing without the need for centralized management.

   {/tab}
   {tab(Advanced plan)}

   Includes all the features of the basic plan, as well as:

   - access to the Bitwarden administrator portal, where you can view and delete users and organizations, as well as check the current configuration and version of the system;
   - SMTP configuration for sending emails (for example, password reset emails);
   - assignment of administrator users with access to the portal.

   Suitable for teams and organizations that value advanced management capabilities, access control, and integration with corporate infrastructure.
   {/tab}
   {/tabs}

1. Enter the data on the **Server parameters** page.
   1. Specify the Bitwarden parameters:

      - **How Bitwarden will be hosted**: select the service hosting type.

        - `external` — with an external IP address and a domain name provided by {var(cloud)}. Choose this hosting type to access the VM with the deployed Bitwarden service from the Internet.
        - `internal` — with access only within {var(cloud)}.

      - **Enable S3 backup**: enable the option to create daily backups of Bitwarden data in the {var(cloud)} {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=object storage]}. The storage is created automatically. The last 7 copies are retained.
      - **INSTALLATION ID**: specify the installation ID obtained on the [official Bitwarden website](https://bitwarden.com/host).
      - **INSTALLATION KEY**: specify the installation key obtained on the [official Bitwarden website](https://bitwarden.com/host).
      - **Prohibit user registration via Web UI**: disable the option to avoid blocking Bitwarden user registration at the first service launch after installation. You can enable this option later.
      - **Enable monitoring**: enable the option to automatically send metrics of the virtual machine where Bitwarden is deployed to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of the management console.

   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will be located. If you specified the `external` hosting type, select a network with Internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preset VM configuration]}.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the required VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. If you selected the `Advanced` plan, specify the advanced service parameters:

   - **SMTP User**: specify the user on behalf of whom emails will be sent to Bitwarden users.
   - **SMTP Password**: specify the password of the user on behalf of whom emails will be sent to Bitwarden users.
   - **SMTP Host**: specify the address of the SMTP server from which emails will be sent, for example `smtp.gmail.com`.
   - **SMTP Port**: specify the SMTP server port in accordance with the documentation of your SMTP provider, for example `587`.
   - **SMTP SSL**: enable or disable the option in accordance with the documentation of your SMTP provider.
   - **Administration**: specify, separated by commas, the email addresses of users who will be allowed to manage the Bitwarden service.

   SMTP settings can be obtained from your provider.

1. Review the cost of the infrastructure for deploying the service and click the **Connect plan** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The process status will also be displayed in the **App Store** → **My services** section.

   After a successful deployment, messages will be sent to the email address linked to your {var(cloud)} account:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link to the service access details.

1. Follow the one-time link from the email and save the service access details:

   - `bitwarden_admin_url` — the link for accessing the Bitwarden web interface.
   - `bitwarden_db_pass` — the password for accessing the Bitwarden database that stores the service's service information (user profile data, organization composition, settings, event logs).
   - `os_service_user` — the login for running and managing the Bitwarden service on the VM with the deployed service instance.
   - `bitwarden_os_service_user_pass` — the password for connecting to `os_service_user`.
   - `os_user` — the login for connecting via SSH to the VM where the service instance is deployed, since according to the Bitwarden security policy the default login (`ubuntu`) cannot be used. This may be needed for operating system updates, firewall configuration, monitoring, and other administration tasks on the VM with the deployed service.
   - `keypair` — the private SSH key for connecting to the VM where the service instance is deployed.

   {note:info}
   If the access details are lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. Use the appropriate option for the first login to the Bitwarden web interface after the service installation:

   {tabs}
   {tab(Logging in as a user)}

   1. Make sure that the **Prohibit user registration via Web UI** option is disabled in the settings of your Bitwarden service instance:

      1. In the {var(cloud)} management console, go to the **App Store** → **My services** section.
      1. Click on the name of your Bitwarden service instance.
      1. Go to the **Plans** tab and click the **Configure plan** button.
      1. Disable the **Prohibit user registration via Web UI** option if it is enabled, and save the changes.

   1. Follow the link from `bitwarden_admin_url`.
   1. Click the button for creating a new account.
   1. Specify the email and the master password.

   {/tab}
   {tab(Logging in to the administration portal)}

   {note:info}
   Access to the administration portal is possible only when the `Advanced` plan is connected.
   {/note}

   1. Follow the link from `bitwarden_admin_url`, adding `/admin` to the address, for example `https:/<bitwarden_admin_url>/admin`
   1. Specify the email that you provided in the **Administration** field.

      After that, an email from Bitwarden with a one-time invitation to go to the administration portal will arrive at the specified address.

   1. Follow the link from the email from Bitwarden.

   {/tab}
   {/tabs}

1. Configure the prohibition of user registration via the Web UI for the deployed Bitwarden service instance:

   1. In the {var(cloud)} management console, go to the **App Store** → **My services** section.
   1. Click on the name of your Bitwarden service instance.
   1. Go to the **Plans** tab and click the **Configure plan** button.
   1. Enable the **Prohibit user registration via Web UI** option and save the changes.

1. (Optional) Use the [official Bitwarden documentation](https://bitwarden.com/help/) to start working with the service.