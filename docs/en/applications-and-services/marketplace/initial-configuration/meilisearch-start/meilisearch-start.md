# {heading(Deploying Meilisearch)[id=marketplace-meilisearch-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Meilisearch is a RESTful search API. With its help, you can provide users of your website, blog, or online store with fast search of relevant text data.

Meilisearch capabilities:

- interactive suggestions as you type a query;
- fast filtering by categories, tags, or other parameters in a large data set;
- support for various word forms and synonyms for more accurate search results;
- instant display of search results without page reload.

Meilisearch provides a web interface so that you can test search settings without embedding a frontend into your website.

By using Meilisearch, you agree to the license agreements of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Meilisearch](https://www.meilisearch.com/terms-of-use).

To deploy the Meilisearch service on a VM in your {var(cloud)} project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Sign up]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. To have access to the VM with the deployed service and to the Meilisearch web interface from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **App Store** section.
1. On the **Meilisearch** service card, click the **More details** button.
1. On the service description page, click the **Connect** button.
1. Enter the data on the **Server Parameters** page.

   1. Specify the Meilisearch parameters:

      - **How Meilisearch will be deployed**: select the service deployment type.

        - `external` — with an external IP address and a domain name provided by {var(cloud)}. Select this deployment type to access the VM with the deployed Meilisearch service from the Internet.
        - `internal` — with access only within {var(cloud)}.

      - **Operating mode**: to have access to the Meilisearch web interface, select the `development` mode.
      - **Enable S3 backup**: enable the option to create daily backups of Meilisearch data in the {var(cloud)} {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=object storage]}. The storage is created automatically. The last 7 copies are kept.
      - **Enable monitoring**: enable the option to automatically send metrics of the virtual machine where Meilisearch is deployed to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of the management console.

   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will be located. If you specified the `external` deployment type, select a network with Internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will be launched.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preset VM configuration]}.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the required VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Review the cost of the infrastructure for deploying the service and click the **Connect plan** button.

   The deployment of the cloud infrastructure will begin, and the service properties page will open. The status of the process will also be displayed in the **App Store** → **My Services** section.

   After a successful deployment, messages will be sent to the email linked to your {var(cloud)} account:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link to the service access data.

1. Follow the one-time link from the email and save the service access data:

   - `meilisearch_url` — link to the Meilisearch web interface (only for the `development` mode);
   - `master_key` — service master key;
   - `keypair` — private key for SSH connection to the virtual machine where the service is deployed.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. Go to the Meilisearch service web interface via the link from `meilisearch_url`.
1. (Optional) Use the [guide](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch#add-documents) to get started with the service. If necessary, refer to the [official Meilisearch documentation](https://www.meilisearch.com/docs).