# {heading(Deploying n8n)[id=marketplace-n8n-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

n8n is a process automation platform with integration of external services and building chains of actions without programming. In n8n, you assemble a process from two types of nodes: triggers and actions. A trigger starts the process, then action nodes receive and transform data, send requests to external APIs, or interact with connected services.

n8n features:

- Workflow automation: creation of processes of any complexity using nodes and connections between them.
- No-code operation: managing workflows with a visual editor.
- Scheduler and recurring tasks: periodic data synchronization between services connected to the process, regular data collection from these services, their aggregation, and sending reports to email or messengers.
- Execution history and process debugging: viewing events, logs, input and output data, re-running processes in debug mode.
- Integration with external services: support for REST API, webhooks, as well as popular services such as Google Sheets, Slack, Telegram, etc.
- Export and import: convenient transfer of configured processes between instances.

By using n8n, you agree to the [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [n8n Sustainable Use License](https://docs.n8n.io/sustainable-use-license) license agreements.

## {heading(1. Deploy n8n in your {var(cloud)} project)[id=marketplace-n8n-start-install]}

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Sign up]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Go to the **Application Store** section, and on the section page click the **All solutions** button.
1. Click on the **n8n** service card.
1. On the page with the service description, click the **Connect** button.
1. Enter the data on the **Server parameters** page.

   1. Specify how the service will be hosted:

      - `external` — with a public IP address and a name in the `*.xaas.msk.bizmrg.com` domain for accessing the service from the internet.
      - `internal` — with access only via a private IP address.

   1. Enable S3 backup to create daily backup copies of n8n data in the {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(cloud)} object storage]}. The storage is created automatically. The last 7 copies are kept.
   1. Specify the public IP address from which you plan to connect to the n8n interface, in the format `XXX.XXX.XXX.XXX`. For access from any addresses, specify `0.0.0.0`. Adding a mask is not required.

      Later, you can {linkto(#marketplace-n8n-start-edit-access)[text=change the access settings]}.

   1. Enable monitoring so that virtual machine metrics are automatically sent to {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} and are available in the {var(cloud)} management console in the **Monitoring** section.
   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: create a new network or select an existing network with internet access and a subnet with **Private DNS** disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=pre-installed VM configuration]}. For pilot scenarios, the default configuration template is sufficient. As the number of processes and launch frequency grows, you can increase resources by {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-edit)[text=editing the plan]}.

   1. Specify the parameters of the system disk and the data disk:

      - **Disk size**: specify the desired VM disk size in gigabytes.
      - **Disk type**: {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Review the infrastructure cost and click the **Connect plan** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The status will be displayed in the **Application Store** → **My services** section.

   After successful deployment, a notification of successful service connection and an email with a one-time link to the service access data will be sent to your email address linked to {var(cloud)}.

1. Follow the one-time link from the email and save the connection parameters:

   - `ingress_ip` — the IP address from which access to the service is allowed;
   - `keypair` — the private key for connecting via SSH to the virtual machine where the service is deployed;
   - `n8n_db_admin` — the administrator login for accessing the n8n database;
   - `n8n_db_admin_pass` — the administrator password for accessing the n8n database;
   - `n8n_db_user` — the user login for accessing the n8n database;
   - `n8n_db_user_pass` — the user password for accessing the n8n database;
   - `n8n_url` — the link to the n8n web interface;  
   - `os_user` — the name of the system user for connecting via SSH to the virtual machine where the service is deployed.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

## {heading(2. Start working with the service)[id=marketplace-n8n-start-start-work]}

1. Go to the service web interface at `http://<SERVICE_ADDRESS>`, where `<SERVICE_ADDRESS>` is the URL or IP address of the n8n web interface.
1. On first sign-in, create an owner account — this is a user with maximum privileges of the n8n instance.
1. Create your first process:

   1. Click **Create workflow**.
   1. Click **Add first step** and add a trigger (for example, **Trigger manually** or **On a schedule**).
   1. Add an action. For example, select **Core** → **HTTP request** to add an HTTP request to any server.
   1. Click **Execute workflow** to perform a test run of the process and make sure the data flows through the created chain.
   1. Click **Activate** to activate and save the process if it should run continuously.

1. (Optional) Invite users and set up collaboration using the [official n8n documentation](https://docs.n8n.io/hosting/configuration/user-management-self-hosted).

   {note:info}
   To invite users and reset passwords, it is recommended to configure SMTP. You can also send invitations manually, but in that case password reset will be unavailable.
   {/note}

1. (Optional) Use the [official guides](https://docs.n8n.io) to get started with n8n:

   - [Quick start](https://docs.n8n.io/try-it-out/quickstart).
   - [Creating your first process](https://docs.n8n.io/try-it-out/tutorial-first-workflow).
   - [User management](https://docs.n8n.io/user-management).
   - [Configuring the service for webhook operation behind reverse proxies](https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url).

## {heading(3. (Optional) Change network access settings)[id=marketplace-n8n-start-edit-access]}

If you want to change the service access settings from specific IP addresses, edit the security group rules:

1. [Go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. Go to the **Virtual networks** → **Firewall settings** section.
1. Click on the name of the security group of your service instance. The name will look like `8f9b4adf-n8n`, where `8f9b4adf` is the first part of the {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-view)[text=instance identifier]}.
1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=Add new rules]} to the security group or {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-delete-rule)[text=remove outdated ones]}. If you plan to use webhooks, allow access for the IP addresses or address ranges of external services that will send requests to n8n.