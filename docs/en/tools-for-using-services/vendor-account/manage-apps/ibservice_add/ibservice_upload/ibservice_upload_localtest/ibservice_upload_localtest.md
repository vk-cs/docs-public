# {heading(Local testing of the Terraform manifest)[id=ibservice_upload_localtest]}

{include(/en/_includes/_translated_by_ai_en.md)}

Before local testing, make sure the OpenStack PID is included in the list of providers (for more details, see the section {linkto(../ibservice_upload_prepare#ibservice_upload_prepare)[text=%text]}).

For local testing, use subnets of existing networks or create a new network and use its subnet (for more details, see the section [Networks and subnets](/en/networks/vnet/instructions/net)).

{note:err}

Using external networks (such as `ext-net` or `internet`) and their subnets is prohibited.

{/note}

To locally test the Terraform manifest `plans/<PLAN_NAME>/deployment/deploy.tf`:

1. Install Terraform locally:

   1. Download Terraform from [the official {var(cloud)} mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
   1. Extract the archive and add the path to the extracted file to the `Path` environment variable.
   1. Run the command `terraform -help` to verify that Terraform has been installed successfully.

1. In the management console of the cloud platform, enable two-factor authentication (2FA) and API access (for more details, see the section [2FA management](/en/access/iam/instructions/manage-2fa)).
1. Edit the CLI configuration file for Terraform: for Windows — `terraform.rc`, for other OSes — `.terraformrc` (for more details, see [the official Terraform documentation](https://developer.hashicorp.com/terraform/cli/config/config-file)):

   1. To make Terraform work with both mirrors and local providers at the same time, add the following information:

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

   1. If it is not required for Terraform to work with both mirrors and local providers at the same time, clear the file.
   1. If there is no such file on the local computer, skip this step.

1. Download the VK CS provider plugin from [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases).
1. Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) to obtain the iVK CS provider plugin. In the email, specify the OS of the computer on which you will locally test the manifest and its architecture (for example, Linux on the amd64 architecture).
1. If the CLI configuration file for Terraform is missing on the local computer or has been cleared, download the null provider plugin from [the official Terraform website](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/).

   {note:info}

   If the CLI configuration file for Terraform is configured to work with both mirrors and local providers at the same time, Terraform will download the null provider plugin automatically.

   {/note}
1. In the `terraform.d` directory, create a `plugins` directory. The `terraform.d` directory is created on the computer automatically after Terraform installation; its path depends on the OS (for more details, see [the official Terraform documentation](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories)).
1. In the `plugins` directory, create the following directory structure:

   * `ivk-cs.local`.

      * `ivk-cs`.

         * `ivkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   * `registry.terraform.io`.

      * `hashicorp`.

         * `null`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   * `vk-cs.local`.

      * `vk-cs`.

         * `vkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.

   Here:

   * `<PROVIDER_VERSION>` — the provider plugin version. The value is determined from the plugin file name. For example, for the `terraform-provider-vkcs_0.4.2` plugin the version is `0.4.2`, and for the `terraform-provider-null_v3.2.1_x5` plugin it is `3.2.1`.
   * `<OPERATING_SYSTEM>` — the OS of the computer. To determine the value, run the command `terraform --version`. The command output displays the current Terraform version and the OS with its architecture.

      {caption(Example output)[align=left;position=above]}
      ```console
      Terraform v1.5.4
      on linux_amd64
      ```
      {/caption}

      In the example above, the value of `<OPERATING_SYSTEM>` is `linux_amd64`.

1. Place the downloaded provider plugins in the corresponding `<OPERATING_SYSTEM>` directories.

   {caption(Example of the `/home/user_name/.terraform.d/plugins` directory structure for Linux on the amd64 architecture)[align=left;position=above]}
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
   {/caption}
1. Create a working directory for testing the manifest.
1. In the working directory, create the `auth.tf` file.
1. In the `auth.tf` file, describe the providers to be used.

   1. Specify the VK CS and iVK CS providers. If the CLI configuration file for Terraform is missing on the local computer or has been cleared, additionally specify the null provider.

      ```hcl
      terraform {
          required_providers {
              vkcs = {

                  # Path to the local provider plugin. The part of the path after terraform.d/plugins is specified
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

   1. For the VK CS and iVK CS providers, specify the information about the account and project of the cloud platform under which you will test the manifest:

      ```hcl
      provider "vkcs" {

          # User Domain ID
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "PROJECT_ID"

          # Region Name
          region = "RegionOne"
      }

      provider "ivkcs" {

          # URL of the Keystone component of the cloud platform
          auth_url = "https://cloud.vk.ru/infra/identity/v3/"
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "OPENSTACK_PROJECT_ID"
          region = "RegionOne"

          # URL of the Infra API service
          infra_url = "https://cloud.vk.ru/marketplace/api/infra-api/api/v1/"
      }
      ```

      The information about the account and project is displayed in the management console of the cloud platform.

1. Copy the file `plans/<PLAN_NAME>/deployment/deploy.tf` to the working directory.
1. If additional entities that are not described in the `deploy.tf` manifest (for example, a VM with an external IP) need to be created for local testing, create the `extended.tf` file in the working directory.
1. In the `extended.tf` file, describe the additional entities using the resources and data sources of the providers.
1. In the working directory, run the command `terraform init` to initialize the providers.
1. In the working directory, run the command `terraform apply` to start creating the resources described in the `deploy.tf` and `extended.tf` files.
1. Enter `yes` to confirm the creation of the resources.
1. After the manifests have finished executing, log in to the management console of the cloud platform and verify that the resources have been created.