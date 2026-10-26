
{include(/en/_includes/_translated_by_ai_en.md)}

To locally test the Terraform manifest describing the cloud infrastructure for your image-based application and its deployment procedure:

1. Prepare a [network and subnet](/en/networks/vnet/instructions/net): use subnets of existing networks or create a new network and use its subnet.

   {note:err}

   It is forbidden to use external networks (such as `ext-net` or `internet`) and their subnets for local testing.

   {/note}

1. Install Terraform locally:

   1. Download Terraform from the [official VK Cloud mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
   1. Extract the archive and add the path to the extracted file to the `Path` environment variable.
   1. Run the `terraform -help` command to verify that Terraform has been installed successfully.

1. [Enable](/en/tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate) API access.
1. Edit the CLI configuration file for Terraform: `terraform.rc` for Windows, `.terraformrc` for other OSes.

   1. To make Terraform work with both mirrors and local providers simultaneously, add the following information:

      ```hcl
      provider_installation {
          filesystem_mirror {

              # Full path to the plugins directory
              path    = "/home/user_name/.terraform.d/plugins"
              include = ["vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }

          network_mirror {
              url = "https://terraform-mirror.mcs.mail.ru"
              include = ["registry.terraform.io/*/*"]
          }

          direct {
              exclude = ["registry.terraform.io/*/*", "vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }
      }
      ```

   1. If Terraform does not need to work with both mirrors and local providers simultaneously, clear the file contents.
   1. If your local computer does not have such a file, skip this step.

   For more information, see [the official Terraform documentation](https://developer.hashicorp.com/terraform/cli/config/config-file).

1. Download the VK CS provider plugin from [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases).
1. Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) to receive the iVK CS provider plugin. In the email, specify the OS of the computer on which you will locally test the manifest, as well as the OS architecture. Example: Linux on the amd64 architecture.
1. If the CLI configuration file for Terraform is missing on your local computer or has been cleared, download the Null provider plugin from the [official Terraform website](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/).

   {note:info}

   If the CLI configuration file for Terraform is configured for simultaneous work with mirrors and local providers, Terraform will download the Null provider plugin automatically.

   {/note}

1. In the `terraform.d` directory, create a `plugins` directory. The `terraform.d` directory is created on the computer automatically after Terraform installation; its path depends on the OS. For more information, see [the official Terraform documentation](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories).
1. In the `plugins` directory, create the following directory structure:

   ```txt
       ├── ivk-cs.local
       │   └── ivk-cs
       │       └── ivkcs
       │           └── <PLUGIN_VERSION>
       │               └── <OS>
       ├── registry.terraform.io
       │   └── hashicorp
       │       └── null
       │           └── <PLUGIN_VERSION>
       │               └── <OS>
       └── vk-cs.local
           └── vk-cs
               └── vkcs
                   └── <PLUGIN_VERSION>
                       └── <OS>
   ```

   Here:

   - `<PLUGIN_VERSION>` is the provider plugin version. The value is determined from the plugin file name. For example, for the `terraform-provider-vkcs_0.4.2` plugin the version is `0.4.2`, and for the `terraform-provider-null_v3.2.1_x5` plugin it is `3.2.1`.
   - `<OS>` is the OS of the computer. To determine the value, run the `terraform --version` command. The command output shows the current Terraform version and the OS name with its architecture.

      Example command output:

      ```console
      Terraform v1.5.4
      on linux_amd64
      ```

      In this example, the `<OS>` value is `linux_amd64`.

1. Place the downloaded provider plugins in the corresponding `<OS>` directories.

   Example directory structure for `/home/user_name/.terraform.d/plugins` for the Linux OS on the amd64 architecture:

   ```txt
   /home/user_name/.terraform.d
   │
   └── plugins
       ├── ivk-cs.local
       │   └── ivk-cs
       │       └── ivkcs
       │           └── 0.0.4
       │               └── linux_amd64
       │                   └── terraform-provider-ivkcs_0.0.4
       ├── registry.terraform.io
       │   └── hashicorp
       │       └── null
       │           └── 3.2.1
       │               └── linux_amd64
       │                   └── terraform-provider-null_v3.2.1
       └── vk-cs.local
           └── vk-cs
               └── vkcs
                   └── 0.4.2
                       └── linux_amd64
                           └── terraform-provider-vkcs_0.4.2
   ```

1. Create a working directory for testing the manifest.
1. In the working directory, create the `auth.tf` file.
1. In the `auth.tf` file, describe the providers you will use.

   1. Specify the VK CS and iVK CS providers. If the CLI configuration file for Terraform is missing on your local computer or has been cleared, additionally specify the Null provider.

      ```hcl
      terraform {
          required_providers {
              vkcs = {

                  # Path to the local provider plugin. The path part after terraform.d/plugins is specified
                  source  = "vk-cs.local/vk-cs/vkcs"

                  # Provider version
                  version = "0.2.2"
              }
              ivkcs = {
                  source  = "ivk-cs.local/ivk-cs/ivkcs"
                  version = "0.1.15"
              }
              null = {
                  source  = "registry.terraform.io/hashicorp/null"
                  version = "3.2.1"
              }
          }
      }
      ```

   1. For the VK CS and iVK CS providers, specify information about the VK Cloud account and project on behalf of which you will test the manifest:

      ```hcl
      provider "vkcs" {

          # User Domain ID
          user_domain_name = "users"
          username = "<USER_NAME>"
          password = "<PASSWORD>"
          project_id = "<PROJECT_ID>"

          # Region Name
          region = "RegionOne"
      }

      provider "ivkcs" {

          # URL of the Keystone component of the VK Cloud platform
          auth_url = "https://cloud.vk.ru/infra/identity/v3/"
          user_domain_name = "users"
          username = "<USER_NAME>"
          password = "<PASSWORD>"
          project_id = "<PROJECT_ID>"
          region = "RegionOne"

          # URL of the Infra API service
          infra_url = "https://cloud.vk.ru/marketplace/api/infra-api/api/v1/"
      }
      ```

      Here:

      - `<PROJECT_ID>` is the project ID (Project ID) that you provided in the email [at the preparation stage](../../manage-ib-apps/ib-add#preparatory_steps).
      - `<USER_NAME>` is the name of a user of this VK Cloud project.
      - `<PASSWORD>` is the user password.

1. Copy the `plans/<PLAN_NAME>/deployment/deploy.tf` file to the working directory.
1. If local testing requires creating additional entities that are not described in the `deploy.tf` manifest (for example, a VM with an external IP):

   1. In the working directory, create the `extended.tf` file.
   1. In the `extended.tf` file, describe the additional entities using provider resources and data sources.

1. To initialize the providers, run the `terraform init` command in the working directory.
1. To start creating the resources described in the `deploy.tf` and `extended.tf` files, run the `terraform apply` command in the working directory.
1. To confirm resource creation, enter `yes`.
1. After the manifests have finished running, log in to the VK Cloud management console and verify that the resources have been created.