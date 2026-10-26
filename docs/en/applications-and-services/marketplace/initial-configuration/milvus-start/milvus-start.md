# {heading(Milvus deployment)[id=marketplace-milvus-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

Milvus is a flexible platform for analyzing unstructured data. With its help, you can quickly find similar vectors in a large database. This is especially relevant in the fields of artificial intelligence, computer vision, natural language processing, and recommendation systems.

Milvus features:

- storage and management of large volumes of vector data;
- fast comparison and nearest neighbor search (ANN) in high-dimensional spaces;
- integration with popular machine learning frameworks such as TensorFlow, PyTorch, and ONNX;
- convenient filtering and sorting mechanisms by attributes in addition to vector search;
- support for flexible horizontal scalability and distributed storage.

Milvus provides a RESTful API and client libraries for various languages, simplifying integration with your applications, and includes Attu — a web interface for interacting with Milvus.

By using Milvus, you agree to the license agreements of [Marketplace](../../../../start/legal/offer/private-special-conditions/policy-marketplace) and [Milvus](https://github.com/milvus-io/milvus/blob/master/LICENSE).

To deploy the Milvus service in your {var(cloud)} project:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Sign up]} and [go to](https://msk.cloud.vk.ru/app) the {var(cloud)} management console.
1. To have access to the VM with the deployed service and to the Milvus web interface from the Internet:

   1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Create]} a network with Internet access if it has not been created earlier.
   1. In the {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=subnet settings]}, where the VM with the deployed service will be located, disable the **Private DNS** option.

1. Go to the **App Store** section.
1. On the **Milvus** service card, click the **Learn more** button.
1. On the service description page, click the **Connect** button.
1. Enter the data on the **Server parameters** page.

   1. Specify the Milvus parameters:

      - **How Milvus will be deployed**: select the service placement type.

        - `external` — with an external IP address and a domain name provided by {var(cloud)}. Choose this placement type to access the VM with the deployed Milvus service from the Internet.
        - `internal` — accessible only via an internal IP address.

      - **Enable S3 backup**: enable the option to create daily backups of Milvus data in the {var(cloud)} {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=object storage]}. The storage is created automatically. The last 7 copies are kept.
      - **Enable monitoring**: enable the option to automatically send metrics of the virtual machine where Milvus is deployed to the {linkto(../../../../monitoring-services/monitoring#monitoring)[text=Cloud Monitoring]} service. These metrics will be available in the **Monitoring** section of the management console.

   1. Specify the parameters of the virtual machine where the service instance will be deployed:

      - **Network**: select the network where the VM with the deployed service will be located. If you selected the `external` placement type, choose a network with Internet access and a subnet for which the **Private DNS** option is disabled.
      - **Availability zone**: select the {linkto(../../../../start/concepts/architecture#architecture-az)[text=availability zone]} where the VM will be launched.
      - **Virtual machine type**: select a {linkto(../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=preset VM configuration]}.

   1. Specify the parameters of the system disk and the data disk.

      - **Disk size**: specify the required VM disk size in gigabytes.
      - **Disk type**: select {linkto(../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types-list)[text=one of the disk types]} — `HDD`, `SSD`, or `High-IOPS SSD`.

1. Click the **Next step** button.
1. Review the cost of the infrastructure for deploying the service and click the **Connect plan** button.

   The cloud infrastructure deployment will begin, and the service properties page will open. The process status will also be displayed in the **App Store** → **My services** section.

   After a successful deployment, messages will be sent to the email associated with your {var(cloud)} account:

   - a notification with a link to the service instance in the {var(cloud)} management console;
   - an email with a one-time link to the service access data.

1. Follow the one-time link from the email and save the service access data:

   - `milvus_url` — link to the Milvus web interface;
   - `milvus_default_user` — login for connection;
   - `milvus_root_pass` — password for connection;
   - `keypair` — private key for connecting via SSH to the virtual machine where the service is deployed.

   {note:info}
   If the access data is lost, {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-update-access)[text=generate]} new ones.
   {/note}

1. Go to the Milvus service web interface via the link from `milvus_url` and fill in the fields:

   - **Milvus Address** — by default, the field displays a value of the form `<MILVUS_ADDRESS>:19515`, where `<MILVUS_ADDRESS>` is the domain or address of the VM with the deployed Milvus instance, and `19515` is the connection port.

     Instead of `<MILVUS_ADDRESS>`, specify one of the following values of your choice:

     - the domain name from the `milvus_url` link (without the `/attu` postfix);
     - the public address of the VM where the service is deployed;
     - the private address of the VM where the service is deployed.

     You can view the public and private VM addresses on the VM page in the **Cloud Computing** → **Virtual Machines** section, on the **Networks** tab.
     
     {note:warn}
     Do not change the port number.
     {/note}

   - **Authentication** — enable this option to authenticate to the service using a login and password.
   - **token** — leave the field empty.
   - **username** — enter the value from the `milvus_default_user` parameter obtained when deploying the service.
   - **password** — enter the value from the `milvus_root_pass` parameter obtained when deploying the service.

   Click the **Connect** button to connect to the service.

1. (Optional) Use the [bootcamp guide](https://milvus.io/bootcamp) to get started with the service. If necessary, explore the [official Milvus documentation](https://milvus.io/docs).