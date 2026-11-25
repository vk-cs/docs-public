# {heading(Deployment of Harbor)[id=harbor-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can store container images, manage access to them, and scan them for vulnerabilities using the Harbor service in {var(cloud)}.

The Harbor service is available from the Internet by domain name with a trusted certificate, or only from the internal network by the VM IP address with a self-signed certificate.

{cut(Minimum VM specifications for the service)}

- **vCPU**: 4.
- **RAM**: 16 GB.
- Disk size:

  - **System disk**: at least 40 GB.
  - **Data disk**: at least 100 GB.

- **Network**:

  - The VM must have Internet access.
  - Private DNS must be disabled.

{/cut}

This guide will help you deploy the Harbor service on a VM in VK Cloud and, if necessary, configure Harbor certificate trust on computers with Docker.

By using the Harbor service, you agree to the license agreements of [Marketplace VK Cloud](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Harbor](https://github.com/goharbor/harbor/blob/main/LICENSE).

To deploy the Harbor service in a VK Cloud project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Register]} in {var(cloud)} and [go to](https://msk.cloud.vk.com/app) your account.
1. Configure the network for the Harbor VM:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if you have not already done so.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]} where the Harbor VM will be located, disable the **Private DNS** option.

1. Go to the **Application Store** section and click **All solutions**.
1. On the **Harbor** service card, click **Learn more**, then click **Connect**.
1. At the **Server parameters** step, specify the following:

   - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will run.
   - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preconfigured VM flavor]}. For testing and a small team, choose a template with 4 CPU cores and 16 GB of RAM. If you have many images or upload and scan them often, choose a template with 8 CPU cores and 32 GB of RAM.
   - **Network**: select the previously created network with Internet access and a subnet with **Private DNS** disabled.
   - **Data disk size**: specify the required VM disk size in gigabytes. For testing, keep the value `100`. For a production workload, specify the total volume of images you plan to store and add spare capacity.
   - **System disk type**, **System disk size**, and **Data disk type**: keep the default values.

1. Click **Next step**.
1. At the **Access** step, specify the following:

   - **Domain, certificate, and public address**: keep this option enabled if Harbor must be available from the Internet. The service will get a domain name, a trusted certificate, and a public IP address. If you disable the option, the service will be available only on the internal network by the VM IP address with a self-signed certificate.
   - **Client network**: enter `subnet` if the computers and servers that work with Harbor are in the same subnet as the VM with the deployed service. If they are in a different subnet, specify its address, for example `10.0.2.0/24`. You can {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=view]} the subnet address in your account. From the specified network, SSH access to the VM with the deployed service is available, and if **Domain, certificate, and public address** is disabled, access to the Harbor service itself is also available.

1. Click **Next step**.
1. Review the infrastructure cost for deploying the service and click **Connect tariff**.

   Cloud infrastructure deployment will start, and the service properties page will open. The process status is also displayed in **Application Store** → **My services**.

   When the status changes to **Active**, an email with a one-time link to the service access data will be sent to the email address associated with your {var(cloud)} account.

1. Follow the one-time link from the email and save the service access data:

   - `productURL`: Harbor web interface and registry address.
   - `harborAdminUser`, `harborAdminPassword`: Harbor administrator username and password.
   - `internalIP`: internal IP address of the VM where the service is deployed.
   - `externalIP`: public IP address of the VM with the deployed service, if **Domain, certificate, and public address** is enabled.
   - `sshUser`, `sshKey`: username and private key for connecting to the VM over SSH.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new credentials.
   {/note}

1. Open the service web interface using the address from the `productURL` parameter in the email.

   1. If **Domain, certificate, and public address** is disabled, open the address from a VM in the client network and confirm the transition when the browser warns about an insecure certificate.
   1. Sign in using `harborAdminUser` and `harborAdminPassword` from the email.

   The list of Harbor projects opens with the `library` project.

1. Configure trust for the Harbor certificate.

   If **Domain, certificate, and public address** is disabled, configure trust for the Harbor certificate on every VM with Docker from which you will upload and download images. Without this, the `docker login` command will fail with the error `x509: certificate signed by unknown authority`.

   1. Run the following commands on a Linux VM with Docker from the client network:

      ```bash
      openssl s_client -connect <HARBOR_ADDRESS>:443 </dev/null 2>/dev/null \
      | openssl x509 > ca.crt
      sudo mkdir -p /etc/docker/certs.d/<HARBOR_ADDRESS>
      sudo cp ca.crt /etc/docker/certs.d/<HARBOR_ADDRESS>/ca.crt
      docker login <HARBOR_ADDRESS>
      ```

      Here, `<HARBOR_ADDRESS>` is the `internalIP` value from the email.

   1. When prompted by `docker login`, enter `harborAdminUser` and `harborAdminPassword` from the email.

      Expected result: `Login Succeeded`.
