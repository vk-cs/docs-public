# {heading(Deployment of VK Security Gate)[id=secgate-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

VK Security Gate is a security analysis platform that is deployed on a dedicated virtual machine in your VK Cloud project and provides capabilities for automated code quality control:

* static application security testing (SAST),
* software composition analysis (SCA),
* secret detection,
* SBOM generation.

The service capabilities can be extended through integration with LLM models or your internal tools such as CodeQL or Jira. For more information, see the [official VK Security Gate documentation](https://cloud.vk.com/docs/on-premises/security-gate).

{cut(Minimum VM specifications for the service)}

   [cols="1,1", options="header"]
   |===

   |Parameter
   |Minimum value

   |vCPU
   |8 cores

   |RAM
   |32 GB

   |System disk
   |At least 65 GB

   |Data disk
   |At least 100 GB

   |===

{/cut}

By using the service, you agree to the license agreement of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and the license agreement of [VK Security Gate](https://vkcloud-cms-prod.s3.prodcloud.vk.team/EULA_Security_Gate_fin_1_2bec12401b.pdf).

To deploy the VK Security Gate service in a VK Cloud project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} and [go to](https://msk.cloud.vk.ru/app) your {var(cloud)} account.
1. Configure the network so that the service is accessible from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VM with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **Application Store** section and click **All solutions**.
1. On the **VK Security Gate** service card, click **Learn more**.
1. On the service description page, click **Connect**.
1. In the **Tariff plans** tab, select the service version from the list.
1. Choose the required tariff:

   - **VK Security Gate 10**: up to 10 repositories and up to 1,000,000 lines of code.
   - **VK Security Gate 50**: up to 50 repositories and up to 5,000,000 lines of code.
   - **VK Security Gate 200**: up to 200 repositories and up to 20,000,000 lines of code.
   - **VK Security Gate 500**: up to 500 repositories and up to 50,000,000 lines of code.

1. Fill in the fields on the **Server parameters** page.

   1. Specify the parameters of the virtual machine on which the service will be deployed:

      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preconfigured VM flavor]}. For **VK Security Gate 200** and **VK Security Gate 500** plans, keep `STD3-16-64`: these plans require at least 16 CPU cores and 64 GB of RAM.
      - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.

   1. Specify the system disk and data disk parameters.

      - **Disk size**: specify the required VM disk size in gigabytes. The disk stores the vulnerability database, Kafka, MinIO, and scan working directories, so the size must not be less than 100 GB.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]}: `HDD`, `SSD`, or `High-IOPS SSD`. For intensive workloads, choose `High-IOPS SSD`.

1. Click **Next step**.
1. At the **Product parameters** step, specify the following:

   - **Administrator email**: enter a work email address. It becomes the administrator login.
   - **Domain, certificate, and public address**: keep this option enabled if the product will be accessed from the Internet. If you disable the option, the service will be available only on the internal network by the VM IP address with a self-signed certificate.
   - **Monitoring network**: enter `subnet` to open the service only from the selected subnet, or specify a network range such as `10.20.0.0/16` where your applications run. You can {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=view]} the subnet address in your account. Metrics are exposed without a password, so it is better to narrow this range.
   - **Daily scanning of new repositories**: enable this option to track the security of all new repositories that appear in the connected GitLab. The option does not affect existing repositories. New repositories count against the tariff limit.

      Enabling this option increases the load on the compute resources of the VM with the deployed service in proportion to the number of new repositories. If necessary, you can {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-edit)[text=change]} the VM flavor later to increase performance.

1. Optionally, at the **Integrations** step, enable the integrations you need:

   - **Mail delivery**: enable this if you want to receive invitation emails and password reset emails. Without email, the invitation is a link that the administrator must pass to the user manually. Specify the following mail parameters:

      - **SMTP server**: enter the name or IP address of your SMTP server, for example `smtp.example.com`.
      - **SMTP port**: keep the value `465`. Only SSL (implicit TLS) with login and password is supported.
      - **SMTP login**: enter your account name for logging in to the SMTP server.
      - **SMTP password**: enter your account password without control characters. A backslash cannot appear at the end of the password or immediately before a single quote.
      - **Sender address**: enter the address from which emails are sent, for example `secgate@example.com`.

   - **CodeQL**: enable this option if you need the GitHub CodeQL analyzer. It is not included in the delivery, so you must obtain the license yourself.

      - **Link to the CodeQL archive**: provide a direct HTTPS link to a Linux CodeQL archive in `tar.gz` format: a GitHub release, your server, or a temporary link to an object in Object Storage. The server must have access to this address. The server downloads the archive itself.

   - **AI triage of findings**: enable this option if you want to analyze findings with a language model. Any model with an API compatible with OpenAI will work. The model analyzes detected secrets automatically, while other findings are analyzed by clicking a button in the finding card. The model receives code fragments from findings, so choose it with regard to where the code is sent.

      - **Model address**: enter the base address without `/v1`, for example `https://llm.example.com`.
      - **Model name**: enter the name exactly as the API accepts it, for example `gpt-4o-mini`.
      - **LLM project ID**: enter the project identifier in which access keys for the language model were created. The product automatically passes this ID to the gateway with each request for proper authentication. If you use a gateway not tied to a specific project, such as DeepSeek, keep the value `none`.
      - **Model API key**: enter the access key for the model. If the model does not require a key, keep the default value.
      - **Automatically analyze all SAST findings**: keep this option disabled. Enable it if you want the model to analyze every new SAST finding automatically: model request usage grows with the number of findings.

   - **Jira**: enable this option if you want to create issues from findings. Only Jira Data Center and Jira Server are supported; Jira Cloud is not.

      - **Jira address**: enter the base address without `/rest`, for example `https://jira.example.com`.
      - **Personal access token**: create a token in Jira under **Profile** → **Personal Access Tokens**. It is better to issue it for a separate account that has access only to the required projects so the product receives no more permissions than necessary.

1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Cloud infrastructure deployment will start, and the service properties page will open. The process status is also displayed in **Application Store** → **My services**.

   After successful deployment, messages will be sent to the email address associated with your {var(cloud)} account:

   - a notification with a link to the service instance in your {var(cloud)} account;
   - an email with a one-time link to the access data.

1. Follow the one-time link from the email and save the service access data:

   - `productURL`: service web interface address.
   - `adminEmail` and `adminPassword`: administrator login and password.
   - `statusURL`: integrations status page address.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

1. Open the VK Security Gate web interface at `productURL` and sign in using `adminEmail` and `adminPassword` from the email.
1. Optionally, check the status of the connected integrations:

   1. Open the `statusURL` address in a browser. You do not need to enter credentials.
   1. Review the JSON content shown on the page. For the `mail`, `codeql`, `ai`, and `jira` parameters, one of the following values must be displayed:

      - `ok`: the integration is connected.
      - `disabled`: the integration is disabled.
      - `downloading`: the server is downloading the CodeQL archive.
      - `error`: there is an error in the connection or in the specified parameters. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-edit)[text=Fix]} the connection parameter values in the service settings.

   Connected integrations are visible in the product:

   - Jira: in the web interface, open **Administration** → **Task managers** → **Jira**, create a configuration, and then link it to the project.
   - CodeQL: within a few minutes, new scans display tasks named `codeql-<LANGUAGE>`. Completed scans are not recalculated.
