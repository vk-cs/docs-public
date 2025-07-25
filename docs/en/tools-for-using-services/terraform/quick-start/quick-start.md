## Preparatory steps

1. Install Terraform from the official VK Cloud [mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
1. Open your VK CLoud [management console](https://msk.cloud.vk.com/app/en/).

1. Enable [two-factor authentication](/en/tools-for-using-services/vk-cloud-account/instructions/account-manage/manage-2fa#enabling_2fa) and [API access](/en/tools-for-using-services/api/rest-api/enable-api#activate_api_access), if not enabled yet.

1. Click on your login at the top of the page, select **Project settings** from the drop-down menu.

1. Go to the **Terraform** tab. Download the main [Terraform configuration](../reference/configuration#the_terraform_provider_config_file) and the [Terraform mirror configuration](../reference/configuration#the_terraform_mirror_config_file) files by clicking the corresponding buttons.

    Files named `vkcs_provider.tf` and `terraform.rc` will be downloaded.

1. Perform the following actions with the files:

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Other OS</tab>
    </tablist>
    <tabpanel>

    1. Paste `%APPDATA%` into the address bar of Windows Explorer and copy the `terraform.rc` file to the directory that opens.

    1. Copy the `vkcs_provider.tf` file into the working directory from which you are going to work with the platform.

        Typically a separate working directory is created for each VK Cloud project.

    </tabpanel>
    <tabpanel>

    1. Rename the Terraform mirror configuration file from `terraform.rc` to `.terraformrc`.
    1. Copy the `.terraformrc` file to the user's home directory root.
    1. Copy the `vkcs_provider.tf` file into the working directory from which you are going to work with the platform.

        Typically a separate working directory is created for each VK Cloud project.

    </tabpanel>
    </tabs>

    {note:info}

    You can create both configuration files yourself. You can also edit the downloaded files — for example, add other Terraform providers. The contents of the files are described in section [Configuration files](../reference/configuration).

    {/note}

## Terraform initialization

In the directory from which you are going to work with the project, run the command:

```console
terraform init
```

This will create supplementary files needed for Terraform to work.

## Creating resources via Terraform

1. Create a configuration of resources in the working directory — for example, a configuration for [creating a virtual machine](../how-to-guides/iaas/create).

1. Run the command:

    ```console
    terraform apply
    ```

    In the terminal window, type `yes` to confirm the operation.

1. Wait until the operation is complete.

The created resources will be available in your management console.

## Update Terraform

If the provider version in the `vkcs_provider.tf` file is lower than the one needed to create the resource, an error will occur when checking the configuration. To avoid this, update your provider to the [latest version](https://github.com/vk-cs/terraform-provider-vkcs) or to the version specified in the resource description:

1. Open the `vkcs_provider.tf` file and edit the version as you need, for example: `version = "~> 0.6.0"`.
1. Run the command in the terminal:

  ```console
  terraform init --upgrade
  ```
