## Preparatory steps

1. Install Terraform from the official VK Cloud [mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
1. Open your VK CLoud [personal account](https://mcs.mail.ru/app/).

1. Enable [two-factor authentication](/en/base/account/instructions/account-manage/security#enable-2fa) and [API access](/en/base/account/instructions/account-manage/security#accessing-api), if not enabled yet.

1. Click on your login at the top of the page, select **Project settings** from the drop-down menu.

1. Go to the **Terraform** tab. Download the main [Terraform config](../reference/configuration#the-terraform-provider-config-file) and the [Terraform mirror config](../reference/configuration#the-terraform-mirror-config-file) files by clicking on the corresponding buttons.

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

    <info>

    You can create both configuration files yourself. You can also edit the downloaded files — for example, add other Terraform providers. The contents of the files are described in section [Configuration files](../reference/configuration).

    </info>

## Terraform initialization

In the directory from which you are going to work with the project, run the command:

```bash
terraform init
```

Supplementary files necessary for working with Terraform will be created.

## Creating resources via Terraform

1. Create a configuration of resources in the working directory — for example, a configuration for [creating a virtual machine](../use-cases/iaas/create).

1. Run the command:

    ```bash
    terraform apply
    ```

    Confirm the creation by typing `yes` in the terminal window.

1. Wait until the operation is completed.

The created resources will be available in your personal account.
