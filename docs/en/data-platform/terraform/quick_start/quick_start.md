# {heading(Quick start)[id=terraform_quick_start]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Preparatory steps)[id=terraform_quick_start_preparations]}

1. Install Terraform from the official [mirror](https://hashicorp-releases.mcs.mail.ru/terraform) provided by {var(cloud)}.
1. Go to the {var(data-p)} management console.
1. Configure two-factor authentication and enable API access if not done yet.

1. Click the username in the page header and select **Project settings** from the drop-down list.

1. Go to the **Terraform** tab. Download the main {linkto(../reference/configuration#terraform_configuration_provider)[text=Terraform configuration file]} and the {linkto(../reference/configuration#terraform_configuration_mirror)[text=Terraform mirror configuration file]} by clicking the respective buttons.

   Files named `vkcs_provider.tf` and `terraform.rc` will be downloaded.

1. Perform the following actions with the files:

   {tabs}

   {tab(Windows)}

    1. Paste `%APPDATA%` into the Windows Explorer address bar and copy `terraform.rc` to the opened directory.
    1. Copy the `vkcs_provider.tf` file to the working directory from which you plan to work with the platform.

       It is recommended to create a separate working directory for each {var(data-p)} project.

   {/tab}

   {tab(Other OS)}

    1. Rename the Terraform mirror configuration file from `terraform.rc` to `.terraformrc`.
    1. Copy the `.terraformrc` file to the root of the user's home directory.
    1. Copy the `vkcs_provider.tf` file to the working directory from which you plan to work with the platform.

       It is recommended to create a separate working directory for each {var(cloud)} project.

   {/tab}

   {/tabs}

   {note:info}
   You can create both configuration files yourself. You can also edit the downloaded files — for example, to add an additional Terraform provider. The file contents are described in the article [Configuration files](../reference/configuration).
   {/note}

## {heading(Terraform initialization)[id=terraform_quick_start_initialization]}

In the directory from which you plan to work with the project, run the command:

```console
terraform init
```

Additional files required for Terraform to operate will be created.

## {heading(Creating resources with Terraform)[id=terraform_quick_start_create_resource]}

1. Create a resource configuration in the working directory — for example, a configuration for [creating a Cloud Spark cluster](../tf-spark/).

1. Run the command:

    ```console
    terraform apply
    ```

   When asked for confirmation, enter `yes`.

1. Wait for the operation to complete.

The created resources will appear in your management console.

## {heading(Updating Terraform)[id=terraform_quick_start_update]}

If the provider version in the `vkcs_provider.tf` file is lower than the one required to create a resource, a configuration validation error will occur. To avoid it, update the provider to the [latest version](https://github.com/vk-cs/terraform-provider-vkcs) or to the version specified in the resource description:

1. Open the `vkcs_provider.tf` file and change the version to the required one, for example: `version = "~> 0.8.0"`.
1. Run the command in the terminal:

    ```console
    terraform init --upgrade
    ```