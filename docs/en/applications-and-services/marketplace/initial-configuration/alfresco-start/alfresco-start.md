Alfresco is an open-source enterprise content management (ECM) system. It provides tools for document management, process automation, and access control. The system enables efficient information handling, business process automation, and integration with other enterprise systems.

Alfresco capabilities:

- Centralized file storage (PDFs, documents, images, and videos).
- Document and digital asset management with metadata, tags, and versioning.
- Workflow automation for document approvals and task management.
- Advanced search by content, meta-tags, and document relationships.
- Functionality extension through modules and integrations with enterprise systems (ERP, CRM, BI).  
- User, role, and access rights management.
- Support for multi-channel access (web interface, mobile applications, file protocols).  

By using Alfresco, you agree to the [Marketplace](/ru/intro/start/legal/digital-cloud/marketplace "change-lang") and [Alfresco](https://github.com/Alfresco/acs-deployment/blob/master/LICENSE) license agreements.

To deploy the Alfresco service in a VK Cloud project:

1. [Register](/en/intro/start/account-registration) and [go to](https://msk.cloud.vk.com/app) to your VK Cloud management console.
1. To have access to the VM with deployed service and to the Alfresco web interface from the internet:

    1. [Create](/en/networks/vnet/instructions/net#creating_network) a network with internet access, if it has not been created earlier.
    1. In [subnet settings](/en/networks/vnet/instructions/net#editing_network) where the VM with deployed service will be located, disable the **Private DNS** option.

1. Go to the **Marketplace** section, on the section page, click **All Solutions** button.
1. On the **Alfresco** service card, click the **Details** button.
1. On the service description page, click the **Connect** button.
1. Enter data on the **Параметры сервера** page:
    1. Specify how the Alfresco service will be hosted:
    - `external` — with public IP address and domain name in `*.xaas.msk.bizmrg.com`. Choose this deployment type for internet access to the VM with the deployed Alfresco service.
    - `internal` — with access only via internal IP address.

    1. **Включить резервное копирование на S3**: enable this option to create daily backups of Alfresco data in a VK Cloud object storage. The storage is created automatically. The last 7 copies are stored.

    1. **Включить мониторинг**: enable this option to automatically send metrics from the VM running Alfresco to the [Cloud Monitoring](/en/monitoring-services/monitoring) service. These metrics will be available in the **Monitoring** section of your management console.
    1. Specify the parameters of the VM on which the service instance will be deployed:

        - **Сеть**: select the network where the VM with the deployed service will be located. If you specified `external` deployment type, select a network with internet access and a subnet with the **Private DNS** option disabled.
        - **Availability zone**: select the [data center](/en/intro/start/concepts/architecture#az) where the VM will run.
        - **Type of virtual machine**: select a [VM preset configuration](/en/computing/iaas/concepts/about#flavors).

    1. Specify the parameters of the system disk and data disk:

        - **Disk size**: enter the required VM disk size in gigabytes.
        - **Disk Type**: select [one of the disk types](/en/computing/iaas/concepts/about#disks) — `HDD`, `SSD` or `High-IOPS SSD`.

1. Click the **Next Step** button.
1. Review the infrastructure cost for service deployment and click the **Connect the tariff** button.

    Cloud infrastructure deployment will begin, and the service properties page will open. The process status will also be displayed in the **Marketplace → My Services** section.

    After successful deployment, you will receive the following messages to your VK Cloud-associated email:

    - A notification with a link to the service instance in your VK Cloud management console.
    - An email with a one-time link containing service access credentials.

1. Follow the one-time link from the email and save the details to access the service:

    - `alfresco_admin_url` — link to the Alfresco admin panel.
    - `alfresco_default_user` — administrator login to connect.
    - `alfresco_admin_pass` — administrator password for the connection.
    - `alfresco_db_user` — user login to connect to the database.
    - `alfresco_db_pass` — user password to connect to the database.
    - `keypair` — private key to connect via SSH to the VM where the service is deployed.

   <info>

   If the access data is lost, [generate](../../instructions/pr-instance-manage#updating_access_to_a_service_instance) new one.

   </info>

1. Go to the web interface of the service at `http://<YOUR_DOMAIN_OR_IP>`, where `<YOUR_DOMAIN_OR_IP>` is the address of the server where Alfresco is deployed.

    Additionally, the following interfaces are available:

    - `/alfresco/` — interface for Alfresco management and access to REST API.
    - `/admin/` — Alfresco administration panel (system configuration, monitoring, user and rights management).
    - `/share/` — web interface for collaborative work with documents (viewing, editing, commenting, task management).
    - `/content-app/` — simplified web interface for working with content (viewing, downloading, file management).
    - `/solr/` — Alfresco search service control panel (indexing, search and monitoring settings).

    An example of using the interface to access the Alfresco administration panel via the address bar: `http://<YOUR_DOMAIN_OR_IP>/admin/`.
    
1. (Optional) Use the [guide](https://support.hyland.com/r/Alfresco/Alfresco-Content-Services-Community-Edition/23.3/Alfresco-Content-Services-Community-Edition/Install/Install-with-zip/Install-additional-software/Test-installation/Post-installation-checks), to get started with the service. If necessary, review the [Alfresco official documentation](https://support.hyland.com/r/Alfresco/Alfresco-Content-Services-Community-Edition/23.3/Alfresco-Content-Services-Community-Edition).


