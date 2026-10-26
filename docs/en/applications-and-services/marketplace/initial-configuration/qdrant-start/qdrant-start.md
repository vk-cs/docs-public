# {heading(Deploying Qdrant)[id=marketplace-qdrant-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Qdrant is a universal vector DBMS and API service for searching and analyzing data represented as high-dimensional vectors. Qdrant is suitable for applications related to artificial intelligence, machine learning, recommendation systems, natural language processing, and multimodal data.

Qdrant features:

- storing and managing large volumes of vector data with high performance;  
- nearest neighbor search (ANN) using the HNSW algorithm in high-dimensional spaces;  
- integration with popular ML frameworks such as TensorFlow, PyTorch, Hugging Face, and OpenAI;  
- combined search with attribute-based filtering and sorting alongside vector search;  
- flexible horizontal scalability for working with large datasets.  

Qdrant provides a RESTful API and client libraries in popular programming languages, which simplifies integration with applications.

By using Qdrant, you agree to the license agreements of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Qdrant](https://github.com/qdrant/qdrant/blob/master/LICENSE).

To deploy the Qdrant service in your project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Sign up]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. To have access to the VM with the deployed service and to the Qdrant web interface from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **App Store** section.
1. On the **Qdrant** service card, click the **Learn more** button.
1. On the service description page, click the **Connect** button.
1. Enter the data on the **Server parameters** page.

   1. Specify the Qdrant parameters:

      - **How Qdrant will be hosted**: select the service hosting type.

        - `external` — with an external IP address and a domain name provided by {var(cloud)}. Choose this hosting type to access the VM with the deployed Qdrant service from the Internet.
        - `internal` — with access only within {var(cloud)}.

      - **Enable S3 backup**: enable the option to create daily backups of Qdrant data in the {var(cloud)} {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=object storage]}. The storage is created automatically. The last 7 copies are kept.
      - **Enable monitoring**: enable the option to automatically send metrics of the virtual machine where Qdrant is deployed to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of the management console.

   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will be located. If you selected the `external` hosting type, choose a network with Internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will be launched.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preinstalled VM configuration]}.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the required disk size of the VM in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Review the cost of the infrastructure for deploying the service and click the **Connect plan** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The process status will also be displayed in the **App Store** → **My services** section.

   After a successful deployment, messages will be sent to the email address associated with your {var(cloud)} account:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link to the service access data.

1. Follow the one-time link from the email and save the service access data:

   - `qdrant_url` — link to the Qdrant API;
   - `api_key` — key for connecting to the Qdrant API;
   - `keypair` — private key for connecting via SSH to the virtual machine where the service is deployed.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. Go to the Qdrant service web interface:

   1. Follow the link `<SERVICE_ADDRESS>/dashboard`, where `<SERVICE_ADDRESS>` is the link from `qdrant_url`.
   1. Enter the value from the `api_key` parameter as the API key.

1. (Optional) Use the [guide](https://qdrant.tech/documentation/interfaces) to get started with the service. If necessary, study the [official Qdrant documentation](https://qdrant.tech/documentation).