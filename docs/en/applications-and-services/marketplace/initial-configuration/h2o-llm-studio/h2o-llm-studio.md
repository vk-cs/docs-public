# {heading(Deploying H2O LLM Studio)[id=marketplace-h2o-llm-studio]}

{include(/en/_includes/_translated_by_ai_en.md)}

H2O LLM Studio is an open-source platform for training and fine-tuning large language models (LLM) through a convenient graphical interface. The platform allows you to run your own training pipelines, evaluate experiments, and manage model parameters without the need for programming. It is ideal for teams working with enterprise or scientific text data.

H2O LLM Studio features:

- LLM training and fine-tuning: support for HuggingFace models (LLaMA, Falcon, Mistral, etc.) with the ability to run training on your data.
- Visual interface: manage pipelines, hyperparameters, and experiments through a web interface.
- Integration with H2O Wave: display of training progress, logs, and charts with results.
- CPU and GPU support: select the desired VM instance configuration, from basic CPU to accelerated GPU training.
- Configuration management: configure the environment via variables, configuration files, or the interface.
- Compatibility with {var(cloud)} Monitoring: ability to connect instance system monitoring.

By using H2O LLM Studio, you agree to the license agreements:

- [Marketplace VK Cloud](../../../../start/legal/offer/private-special-conditions/policy-marketplace).
- [H2O LLM Studio](https://github.com/h2oai/h2o-llmstudio/blob/main/LICENSE).
- [H2O Wave](https://github.com/h2oai/wave/blob/master/LICENSE).

To deploy the H2O LLM Studio service on a VM in your {var(cloud)} project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Sign up]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. To have access to the VM with the deployed service and to the H2O LLM Studio web interface from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM with the deployed service will be placed, disable the **Private DNS** option.

1. Go to the **App Store** section.
1. If there is no **H2O LLM Studio** service card on the page, click the **All solutions** button and find the card in the catalog.
1. Click on the **H2O LLM Studio** service card.
1. On the page with the service description, click the **Connect** button.
1. Enter the data on the **Server parameters** page.

   1. Specify the H2O LLM Studio parameters:

      - **How H2O LLM Studio will be deployed**: select the service deployment type.

        - `external` — with an external IP address and a domain name provided by {var(cloud)}. Select this deployment type to access the VM with the deployed H2O LLM Studio service from the Internet.
        - `internal` — with access only within {var(cloud)}.

      - **Enable backup to S3**: enable the option to create daily backups of H2O LLM Studio data in the {var(cloud)} {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=object storage]}. The storage is created automatically. The last 7 copies are retained.
      - **IP for service access**: specify the external IP address from which you plan to connect to the service, in IPv4 format without a mask, for example `255.255.255.255`. The `/32` mask will be added to the address automatically. Do not specify other mask values.
      - **Enable monitoring**: enable the option to automatically send metrics of the virtual machine where H2O LLM Studio is deployed to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of the management console.

   1. Specify the parameters of the virtual machine on which the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will be placed. If you selected the `external` deployment type, choose a network with Internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will be launched.
      - **Virtual machine type**: for the full-fledged operation of the H2O LLM Studio service, it is recommended to select a VM configuration template with a GPU. If there is no such template in the project, {linkto(../../../../computing/gpu/connect#gpu-connect-flavor)[text=connect]} it.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the desired VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Review the cost of the infrastructure for deploying the service and click the **Connect plan** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The status of the process will also be displayed in the **App Store** → **My services** section.

   After successful deployment, messages will be sent to the email linked to your {var(cloud)} account:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link to the service access data.

1. Follow the one-time link from the email and save the service access data:

   - `h2o_url` — a link to the H2O LLM Studio web interface.
   - `ingress_ip` — the IP address from which access to the H2O LLM Studio web interface and to the VM with the deployed service is allowed. This is the address you specified when connecting the service in the management console.
   - `os_user` — the name of the system user of the service instance VM for SSH login;
   - `keypair` — a private SSH key for connecting to the instance VM.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. Go to the H2O LLM Studio service web interface using the link from `h2o_url`.

   If the page does not open, check whether the IP address from which you are trying to access the web interface matches the IP address from `ingress_ip`.

   - If the IP addresses match, contact [technical support](/en/contacts).
   - If the IP addresses do not match, specify the correct IP address in the security group settings for the service:

     1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-view)[text=Open the security group]} named `ХХХХ-h2o-llm-studio`, where `XXXX` is the first part of your service instance identifier.
     1. {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-delete-rule)[text=Delete]} the incoming traffic rules for unneeded IP addresses and {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups-add-rule)[text=add]} new rules for the needed ones.

1. (Optional) Use the [H2O LLM Studio quickstart guide](https://github.com/h2oai/h2o-llmstudio#quickstart) to get started with the service. If necessary, review the [instructions on configuring models and pipelines](https://github.com/h2oai/h2o-llmstudio/blob/main/documentation/docs/get-started/llm-studio-flow.md).