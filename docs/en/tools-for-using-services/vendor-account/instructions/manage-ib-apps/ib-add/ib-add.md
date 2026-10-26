
{include(/en/_includes/_translated_by_ai_en.md)}

To add your image-based application to the Marketplace service, complete the [preparatory steps](#preparatory_steps). Then:

1. [Create the basis for the file structure of the service package](#service_pack_structure).
1. [Describe the service configuration (tariff plans, options)](#service_config).
1. [Create Terraform manifests describing the infrastructure configuration for your service](#service_infrastructure).
1. (Optional) [Verify that existing resources are correctly specified in the Terraform manifests](#check_existing_resources).
1. (Optional) [Test the Terraform manifests locally](#test_manifest_locally).
1. (Optional) [Test the Terraform manifests with the deployment system](#test_manifest_with_deploy_system).
1. (Optional) [Review the logs and results of the Marketplace agent](#agent_log).
1. [Upload the service package to Marketplace](#upload_package).
1. [Test the uploaded service before publication](#upload_test).
1. [Publish the service image](#publish_service_image).
1. [Publish the service in Marketplace](#publish_service).

## {heading(Preparatory steps)[id=preparatory_steps]}

1. Make sure your application meets the [Marketplace service requirements](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/image_based).
1. [Create and upload](../create-ib-app-image) the image-based application image to VK Cloud.
1. Decide on the [billing type](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/billing) for your application, and develop tariff [plans](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) and [options](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types).
1. [Connect](../../../connect) to the vendor account.

## {heading({counter(H2)}. Create the basis for the file structure of the service package)[id=service_pack_structure]}

All information required to upload an image-based application to Marketplace is prepared as a service package with a specific file structure.

{cut(Example of the service package file structure)}

```text
image_based_service
├── images
│   └── icon.png
├── parameters
│   ├── api_requests_daily_limit.yaml
│   ├── checklists_per_product.yaml
│   ├── export_issues.yaml
│   ├── groups.yaml
│   ├── members.yaml
│   └── report_notifications.yaml
├── plans
│   ├── advanced
│   ├── basic
│   └── free
│       └── deployment
│           ├── deploy.tf
│           ├── settings.yaml
│       ├── display.yaml
│       └── plan.yaml
├── full_description.md
├── service.yaml
└── version.yaml
```

{/cut}

{note:warn}
Use only Latin letters and the `_` character for the names of files and directories in the service package.
{/note}

To prepare the file structure:

1. Create a service directory named `<SERVICE_NAME>`.
1. In the service directory, create a `version.yaml` file. In this file, specify:

   ```yaml
   version: 0.0.1
   ```

1. In the `<SERVICE_NAME>` directory, create the `images`, `parameters` and `plans` directories.
1. Place a service icon file in `.png` or `.svg` format into the `images` directory. The file size must not exceed 1 MB. The image resolution must be at least 62 × 62 pixels.

   The service icon will be displayed on the service card:

   - in the Marketplace catalog;
   - on the **Service description** tab of the service page.

## {heading({counter(H2)}. Describe the service configuration (tariff plans, options))[id=service_config]}

The service configuration is described using `.yaml` and `.md` format files.

1. In the `<SERVICE_NAME>` directory, create a `service.yaml` file and fill it in.

   The `service.yaml` file contains:
   - general service parameters;
   - names of tariff plans (hereinafter `<PLAN_NAME>`) as a `plans` array;
   - names of tariff options (hereinafter `<OPTION_NAME>`) as a `parameters` array in the `preview` section.
   
   `<PLAN_NAME>` and `<OPTION_NAME>` are used only inside the service package and are not displayed in the Marketplace interface.

   File structure:

   ```yaml

# General service parameters
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <SERVICE_NAME>
   short_description: <SHORT_DESCRIPTION>
   singleton: <FLAG>                        # true | false
   auto_bind: <FLAG>                        # true | false
   icon: <FILE>                             # Name of the file with the service icon
   help: <URL>                              # Link to the service documentation
   bindable: <FLAG>                         # true | false
   plan_updateable: <FLAG>                  # true | false
   deactivatable: <FLAG>                    # true | false
   bindings_retrievable: <FLAG>             # true | false
   instances_retrievable: <FLAG>            # true | false

# plans array
   plans:
   - name: <PLAN_NAME_1>
   - name: <PLAN_NAME_2>

# preview section
   preview:
   parameters:
   - name: <OPTION_NAME_1>
   - name: <OPTION_NAME_2>
   - name: <OPTION_NAME_3>
   ```

   {cut(General service parameters)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=service.yaml-common-param]}

   {/cut}

   {cut(plans array)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=service.yaml-plans]}

   {/cut}

   {cut(preview section)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=service.yaml-preview]}

   {/cut}

   {cut(Example of the service.yaml file)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=service.yaml-example]}

   {/cut}

1. In the `<SERVICE_NAME>` directory, create a `full_description.md` file and fill it in with a description of the service in Markdown format. The file content will be displayed on the service page in Marketplace.

   File structure:

    ```md
   <!--A brief general description of the service in 2-3 sentences-->

   <!--Vendor name-->

## Tasks solved

   <!--What tasks the service can be used to solve-->

## Service characteristics:
   
   <!--Technical specifications, preferably in the form of a table-->

   <!--Infrastructure requirements, which resources can be used-->

# Billing rules

   <!--Which model the service is billed under, what tariff plans are available-->

# Useful links

   <!--Link to the Marketplace section in the VK Cloud documentation + link to the documentation on the vendor portal-->

# Technical support

   <!--Information about the service technical support, VK Cloud technical support, service technical support contacts-->

# License agreement
   <!--Link to the legal documents of VK Cloud and the vendor's service-->
    ```

   {cut(Service information)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-general]}

   {/cut}

   {cut(Billing rules)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-tariff]}

   {/cut}

   {cut(Useful links)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=full_description-links]}

   {/cut}

   {cut(Technical support)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=full_description-ib-support]}

   {/cut}

   {cut(License agreement)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=full_description-legal]}

   {/cut}

1. In the `parameters` directory, for each [tariff option](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_option_types), create a `<OPTION_NAME>.yaml` file and fill it in according to the [examples](/en/tools-for-using-services/vendor-account/reference/ib-apps-reference/tariff-options-examples).

   For paid tariff options during the testing period, specify the minimum service cost to avoid excessive spending.

1. In the `plans` directory, for each tariff plan, create a `<PLAN_NAME>` directory. In each `<PLAN_NAME>` directory, create and fill in a `plan.yaml` file:

   File structure:

   ```yaml

# General tariff plan parameters
   id: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   revision: v. X.X
   name: <PLAN_NAME>
   description: <SHORT_DESCRIPTION>
   free: <FLAG> # true | false

# billing section
   billing:
   cost: <COST>
   refundable: <FLAG> # true | false
   billing_cycle_flat: <BILLING_PERIOD_LENGTH>

# parameters_patch section
   parameters_patch:
   users:
      schema.const: 5000
   volume_data_size:
      schema.default: 550
      schema.minimum: 550
   ```

   {cut(General tariff plan parameters)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-common-param]}

   (Optional) If the tariff plan is free, list the postpaid tariff options in the [resource_usage section](../../../reference/ib-apps-reference/ib-plan#plan_parameters).

      Within a single tariff plan, only options of one [billing type](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing) are allowed: a tariff plan with prepaid options or a tariff plan with postpaid options.

   {/cut}

   {cut(billing section of the tariff plan)}
   
   Specify the tariff plan cost per billing period excluding paid tariff options.

   A non-zero tariff plan cost can be specified only for the prepaid [billing type](/en/tools-for-using-services/vendor-account/manage-apps/concepts/about#xaas_billing). To make efficient use of the [allocated bonus funds](#preparatory_steps), specify a test cost for the tariff plan during the service testing period in Marketplace.

   {note:warn}

   The cost of using VK Cloud platform computing resources is not included in the cost of the service tariff plan.

   {/note}

   {include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-billing]}

   {/cut}

   {cut(parameters_patch section)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-parameters_patch]}

   (Optional) In the [parameters_patch section](../../../reference/ib-apps-reference/ib-plan#plan_options), override the required tariff option parameters for the `<PLAN_NAME>` tariff plan.

   {/cut}

   {cut(Example of the plan.yaml file)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=plan.yaml-example]}

   {/cut}

1. In the `<PLAN_NAME>` directory, create and fill in a `display.yaml` file describing the tariff plan configuration wizard. The tariff plan configuration wizard will be displayed in Marketplace when connecting the service or updating the tariff plan.

   {cut(pages array)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-pages]}

   {/cut}

   {cut(entities array)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-common]}

   {cut(VM)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-vm]}

   {/cut}

   {cut(Load balancer)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-lb]}

   {/cut}

   {cut(Public IP address)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-entities-ip]}

   {/cut}

   {/cut}

   {cut(when construct)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-common]}

   {cut(when construct in the pages array)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-pages]}

   {/cut}

   {cut(when construct in the entities array)}

   {include(/en/_includes/_xaas_ib_params.md)[tags=display.yaml-when-entities]}

   {/cut}

   {/cut}

## {heading({counter(H2)}. Create Terraform manifests describing the infrastructure configuration for the service)[id=service_infrastructure]}

   1. In the `plans/<PLAN_NAME>` directory, create a `deployment` directory.
   1. In the `deployment` directory, create and fill in:

      - A `deploy.tf` file with a [Terraform manifest](../../../reference/ib-apps-reference/tf-manifest) describing the infrastructure and the process of deploying the `<PLAN_NAME>` tariff plan in Marketplace.

         {note:info}

         Working with multiple manifests is also supported.

         {/note}

      - (Optional) A [settings.yaml file](../../../reference/ib-apps-reference/tfmanifest_settings) with the manifest execution settings. If the service package does not contain a `settings.yaml` file, default parameter values will be applied to the Terraform manifests.

## {heading({counter(H2)}. (Optional) Verify that existing resources are correctly specified in the Terraform manifests)[id=check_existing_resources]}

To reduce the time for testing the Terraform manifests and to avoid attempts to create resources with an incorrect configuration, before testing the manifests it is recommended to verify that the parameters of already existing VK Cloud resources are correctly specified in them, for example: the VM type, the service image, etc.

1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start), if this has not been done earlier.
1. In the working directory, run the command:

   ```console
   terraform init
   ```

1. In the working directory, create a `main.tf` file.
1. Place in the `main.tf` file the requests to the required [VK CS provider data sources](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources).

   Example of a request to the [vkcs_compute_flavor](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs/data-sources) data source:

   ```hcl
   data "vkcs_compute_flavor" "compute" {
   flavor_id = "4e115a9b-XXXX-95cf130d63c7"
   }
   ```

   In this example, it is verified that a VM type with ID `4e115a9b-XXXX-95cf130d63c7` exists in VK Cloud.

1. In the working directory, run the command:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete. Make sure that no errors occurred when requesting the data sources.

## {heading({counter(H2)}. (Optional) Test the Terraform manifests locally)[id=test_manifest_locally]}

Test the Terraform manifests `plans/<PLAN_NAME>/deployment/deploy.tf` locally for each tariff plan of your application, using the [instruction](../local-tfmanifest-testing).

## {heading({counter(H2)}. (Optional) Test the Terraform manifests with the deployment system)[id=test_manifest_with_deploy_system]}

Before uploading the service package to Marketplace, test each Terraform manifest `plans/<PLAN_NAME>/deployment/deploy.tf` for each plan of your application using the deployment system API:

1. [Activate](/en/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate) API access, if this has not been done earlier.
1. [Obtain](/en/tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token-gen) an API access token.
1. [Upload](../../../reference/ib-apps-reference/test-tfmanifest#upload_terraform_manifest) one of the `plans/<PLAN_NAME>/deployment/deploy.tf` manifests to the deployment system.
1. [Check](../../../reference/ib-apps-reference/test-tfmanifest#check_terraform_configuration) the current configuration of the uploaded manifest.
1. [Create](../../../reference/ib-apps-reference/test-tfmanifest#create_service_instance) a service instance.
1. During creation and after creating the instance, [check](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status) its status. If the status is `failed`, [find](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log) the error description in the instance logs.
1. [Delete](../../../reference/ib-apps-reference/test-tfmanifest#delete_service_instance) the service instance.
1. [Check](../../../reference/ib-apps-reference/test-tfmanifest#check_instance_status) the status of the deleted service instance. If the status is `failed`, [find](../../../reference/ib-apps-reference/test-tfmanifest#deploysystemtest_log) the error description in the instance logs.

Similarly, test the manifests for the remaining tariff plans of your application.

## {heading({counter(H2)}. (Optional) Review the logs and results of the Marketplace agent)[id=agent_log]}

You can identify errors when deploying a service instance by reviewing the logs and results of the Marketplace agent. They are available if [scripts](../../../reference/ib-apps-reference/tfmanifest_script) executed using the [ivkcs_agent_exec](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec) resource are used when deploying your application.

To view the agent logs and results:

1. [Connect to the VM](/en/computing/iaas/instructions/vm/vm-connect) where the agent is installed using a remote access protocol or via the VNC console in the VK Cloud management console.

   The name of the VM where the agent was installed is specified in the `ivkcs_agent_init` or `ivkcs_user_data` resource in the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest.

1. To view the logs, run the command `journalctl -u sower`.
1. To view the results, go to the `/etc/sower/result` directory.

## {heading({counter(H2)}. Upload the service package to Marketplace)[id=upload_package]}

1. Pack the service package, i.e. the `<SERVICE_NAME>` directory with the service configuration files and Terraform manifests, into a zip archive. The archive size must not exceed 30 MB.
1. Upload the archive to Marketplace in one of the following ways:

   {tabs}

   {tab(Vendor account)}

   1. [Go](https://msk.cloud.vk.ru/app/) to the VK Cloud management console.
   1. In the **Application store** section, click the **Go to vendor account** button.
   1. On the **Service management** tab, click the **Add service** button.
   1. Select the zip archive on your device for uploading to the system.
   1. Click the **Add** button.

   After that, the added service will appear in the list of services with the `Hidden` status. The uploaded archive file will be sent for validation.

   {/tab}

   {tab(Infra API)}

   Send a request to the Infra API service with the following parameters:

   - Request method: `POST`.
   - Request path: `https://<VK_CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/product`.

      Here `<VK_CLOUD_HOST>` is the domain name of the VK CLOUD platform `https://cloud.vk.ru`.

   - Request body: zip archive.
   - `x-service-token`: `<SERVICE_KEY>` — the service key received from Marketplace at the [preparation stage](#preparatory_steps).

   Example of a request to upload a service package to Marketplace:

   {tabs}

   {tab(Linux (bash))}

   ```console
   curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product \
   -H 'x-service-token: <SERVICE_TOKEN>' \
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {tab(Windows (cmd))}

   ```console
   curl -v -X POST https://cloud.vk.ru/marketplace/api/infra-api/api/v1-public/product ^
   -H "x-service-token: <SERVICE_TOKEN>" ^
   -F "upload=@/home/VKservice.zip"
   ```

   {/tab}

   {/tabs}

   HTTP response codes:

      - `204` — the service package has been uploaded.
      - `400`, `404`, `500` — request execution error.
      - `401` — authorization error.

   The configuration files describing the tariff plans and service options will be passed to the image-based broker, and the Terraform manifests — to the deployment system.

   {/tab}

   {/tabs}

   A service package uploaded to Marketplace will first go to a test namespace, and after publication — to a public one.

1. After the service upload is complete, log in to the VK Cloud management console and make sure the service is displayed in Marketplace. The uploaded service will be available only to users of the Marketplace test namespaces specified in the [service key](#preparatory_steps).

   If the service is not displayed in Marketplace after uploading, log out of the management console and log in again.

## {heading({counter(H2)}. Test the uploaded service before publication)[id=upload_test]}

{note:info}
To test the service, use the bonuses received from Marketplace at the [preparation stage](#preparatory_steps).
{/note}

To check how the service will function in the Marketplace test namespace:

1. [Go to](https://msk.cloud.vk.ru/app/services/marketplace) the **App Store** section of the VK Cloud management console.
1. Click the **All solutions** button.
1. Click on your service card and go to the **Tariff plans** tab.
1. Make sure that the configuration wizard of each tariff plan is displayed correctly.
1. Connect the service. Make sure that the service instance deployment is completed successfully.

   If during service instance deployment the resource described in the manifest failed to be created, the deployment system will restart the service deployment process. Repeated attempts may take up to 1.5 hours and can be disabled in the [settings.yaml file](../../../reference/ib-apps-reference/tfmanifest_settings).

   {note:warn}

   Each new attempt to deploy the service deletes all existing resources and creates them anew.

   {/note}

1. If an error occurred when connecting the service, view the logs using the [instructions](../service-logs).
1. Update the service instance:

   1. Change the values of the tariff options of the current tariff plan.
   1. Switch to a new tariff plan.

   Changing the parameters of resources described in the manifest will start the service instance reinstallation process.

   {note:warn}

   When updating the service instance configuration, the deployment system updates only the changed resources.

   {/note}

   If the deployment system fails to update the resources, it will retry. The process of updating the service instance configuration, taking retries into account, may take up to 1.5 hours. Retries can be disabled in the [settings.yaml file](../../../reference/ib-apps-reference/tfmanifest_settings).

1. Test the main user scenarios of the service.
1. [Delete](/en/applications-and-services/marketplace/instructions/pr-instance-manage#marketplace-pr-instance-manage-delete) the service instance.
1. (Optional) [Update](/en/tools-for-using-services/vendor-account/instructions/manage-ib-apps/update-ib-app) the service configuration.

   1. Change the service configuration if testing revealed such a need.
   1. If test values for the service cost were set in the service configuration for the time of testing and debugging, edit them.

   {note:warn}

   If you updated the service package, make sure that the service revision ([revision parameter](../../../reference/ib-apps-reference/ib-apps-param)) is also updated.

   {/note}

## {heading({counter(H2)}. Publish the service image)[id=publish_service_image]}

1. Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

   Specify the service image ID in the email.

   The specified image will be published and available to all users of the cloud platform. A reply email will contain the ID of the public service image.

1. In the [Terraform manifests](../../../reference/ib-apps-reference/tf-manifest) `plans/<PLAN_NAME>/deployment/deploy.tf`, replace the service image ID with the public service image ID.
1. In the [service.yaml file](../../../reference/ib-apps-reference/ib-apps-param), specify a new service revision.
1. [Upload](#upload_package) the service package with the public service image ID to Marketplace via the vendor dashboard or using a request to the Infra API service.

## {heading({counter(H2)}. Publish the service in Marketplace)[id=publish_service]}

Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). Specify the service ID and its revision in the email.

The service package will be moderated. After that, the service will be published on Marketplace.

The service revision being published will be moved from the Marketplace test namespace to the open one specified in the [service key](#preparatory_steps). The service will become available to all users who have access to this open namespace.

{note:warn}

In open namespaces, only the last published service revision is available.

{/note}