# {heading(Deployment of GitLab CE)[id=gitlab-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can store Git repositories, perform code reviews, and run CI/CD pipelines with the GitLab CE service. For more information, see the [official GitLab documentation](https://docs.gitlab.com/).

The service runs on a single VM. A runner for CI/CD pipelines is already connected and available to all projects.

{cut(Minimum VM specifications for the service)}

- **vCPU**: 4.
- **RAM**: 16 GB.
- Disk size:

  - **System disk**: at least 20 GB.
  - **Data disk**: at least 50 GB.

- **Network**:

  - The VM must have Internet access.
  - Private DNS must be disabled.

{/cut}

This guide will help you deploy the GitLab CE service on a VM in {var(cloud)}.

By using GitLab CE, you agree to the license agreements of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [GitLab CE](https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/LICENSE).

To deploy the GitLab CE service in a VK Cloud project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} and [go to](https://msk.cloud.vk.ru/app) your VK Cloud account.
1. Configure the network so that the service is accessible from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if you have not already done so.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the VMs with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **Application Store** section and click **All solutions**.
1. On the **GitLab CE** service card, click **Learn more**, then click **Connect**.
1. At the **Server parameters** step, specify the following:

   - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
   - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preconfigured VM flavor]}. For a pilot deployment and a small team, choose a template with 4 CPU cores and 16 GB of RAM. CI/CD jobs run on the same VM, so if you actively use pipelines, choose a template with 8 CPU cores and 32 GB of RAM or more.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.
   - **System disk type** and **System disk size**: keep the default values.
   - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]}: `HDD`, `SSD`, or `High-IOPS SSD`.
   - **Data disk size**: specify the required VM disk size in gigabytes. For a pilot deployment, 50 GB is enough. For a production workload, choose a value twice as large as the expected volume of repositories, artifacts, and images: before a version upgrade, the service stores a backup on this disk.

1. Click **Next step**.
1. At the **Access** step, specify the following:

   - **Domain, certificate, and public address**: keep this option enabled to open GitLab from the Internet by domain name with a trusted certificate. The public IP address is billed separately. If you disable the option, the service will be available only on the internal network by the VM IP address with a self-signed certificate. You cannot change this option after deployment.
   - **Client network**: enter `subnet` if the computers and servers that work with GitLab are in the same subnet as the VM with the deployed service. If they are in a different subnet, specify its address, for example `10.0.2.0/24`. You can {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=view]} the subnet address in your account. From the client network, Git over SSH and the Container Registry are available, and if **Domain, certificate, and public address** is disabled, the GitLab web interface is also available.
   - **Container Registry**: enable this option if you need to store Docker images in GitLab. The registry only works with a trusted certificate, so it requires **Domain, certificate, and public address** to be enabled.

1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Deployment will start. Its status is shown in **Application Store** → **My services**. When the status changes to **Active**, you will receive an email with a one-time link to the access data.

1. Follow the link from the email and save the access data:

   - `productURL`: GitLab web interface address.
   - `gitlabUser` and `gitlabPassword`: GitLab administrator username and password.
   - `registryURL`: Container Registry address, if the registry is enabled.
   - `internalIP` and `externalIP`: internal and public VM IP addresses.
   - `sshUser` and `sshKey`: username and private key for connecting to the VM over SSH.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

1. Open `productURL` in a browser and sign in to GitLab using `gitlabUser` and `gitlabPassword`.
