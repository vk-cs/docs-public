{includetag(terraform-install-prepare)}
1. Install Terraform from the official {var(cloud)} [mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. {ifdef(public)}[Go to](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Go to]}{/ifndef} your {var(cloud)} management console.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {/includetag}
   {includetag(terraform-install-prepare)}
   {ifdef(public)}
1. [Configure two-factor authentication](/en/access/iam/instructions/manage-2fa) and [enable API access](/en/tools-for-using-services/api/rest-api/enable-api), if this has not already been done.
   {/ifdef}
1. Click the username in the page header, and select **Project settings** from the drop-down list.
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. Go to the **Terraform** tab. Download the main {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-provider-config)[text=Terraform configuration file]} and the {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-mirror-config)[text=Terraform mirror configuration file]} by clicking the buttons of the same name.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
1. Go to the **Terraform** tab. Download the main {linkto(../reference/configuration#terraform-provider-config)[text=Terraform configuration file]} and the {linkto(../reference/configuration#terraform-mirror-config)[text=Terraform mirror configuration file]} by clicking the buttons of the same name.
   {/includetag}
   {includetag(terraform-install-prepare)}
   Files named `vkcs_provider.tf` and `terraform.rc` will be downloaded.

1. Perform the following actions with the files:

   {tabs}

   {tab(Windows)}

   1. Paste `%APPDATA%` into the Windows Explorer address bar and copy `terraform.rc` to the directory that opens.
   1. Copy the `vkcs_provider.tf` file to the working directory from which you plan to work with {var(cloud)}.

      It is recommended to create a separate working directory for each {var(cloud)} project.

   {/tab}

   {tab(Other OS)}

   1. Rename the Terraform mirror configuration file from `terraform.rc` to `.terraformrc`.
   1. Copy the `.terraformrc` file to the root of the user's home directory.
   1. Copy the `vkcs_provider.tf` file to the working directory from which you plan to work with {var(cloud)}.

      It is recommended to create a separate working directory for each {var(cloud)} project.

   {/tab}

   {/tabs}
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
   {note:info}
   You can create both configuration files yourself. You can also edit the downloaded files — for example, to add an additional Terraform provider. The contents of the files are described in the {linkto(../../../tools-for-using-services/terraform/reference/configuration#tools-terraform-config)[text=%text]} article.
   {/note}
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {note:info}
   You can create both configuration files yourself. You can also edit the downloaded files — for example, to add an additional Terraform provider. The contents of the files are described in the {linkto(../reference/configuration#tools-terraform-config)[text=%text]} article.
   {/note}
{/includetag}

{includetag(terraform-install-init)}
In the directory from which you plan to work with the project, run the command:

```console
terraform init
```

Additional files required for Terraform to work will be created.
{/includetag}

{includetag(terraform-install-create)}
1. Create a resource configuration in the working directory — for example, a configuration for {ifdef(public)}{linkto(../how-to-guides/iaas/create#terraform-iaas-create)[text=creating a virtual machine]}{/ifdef}{ifndef(public)}creating a virtual machine{/ifndef}.

   {ifndef(public)}
   {note:info}
   {linkto(../../reference/configuration#terraform-resource-config)[text=Configuration files]} for creating resources are located in the {var(cloud)} distribution. Contact your administrator to get them.
   {/note}
   {/ifndef}

1. Run the command:

   ```console
   terraform apply
   ```

   When prompted for confirmation, enter `yes`.

1. Wait for the operation to complete.

The created resources will appear in your management console.
{/includetag}

{includetag(terraform-install-update)}
If the provider version in the `vkcs_provider.tf` file is lower than the one required to create the resource, a validation error will occur when validating the configuration. To avoid this, update the provider to the [latest version](https://github.com/vk-cs/terraform-provider-vkcs) or the version specified in the resource description:

1. Open the `vkcs_provider.tf` file and change the version to the required one, for example: `version = "~> 0.8.0"`.
1. Run the command in the terminal:

   ```console
   terraform init --upgrade
   ```
{/includetag}
