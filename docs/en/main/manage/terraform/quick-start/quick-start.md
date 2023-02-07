## Prepare for work

1. Install Terraform binaries from the official VK Cloud [mirror](https://hub.mcs.mail.ru/repository/terraform-binary/mirror/latest/).
1. Create a provider mirror file and paste it in the directory.

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Other OS</tab>
    </tablist>
    <tabpanel>

    1. Create the `terraform.rc` file.
    1. Add the following code to it.
    1. Copy file to the `%APPDATA%` directory.
    1. Open the directory by inserting `%APPDATA%` into the address bar of Windows.

    </tabpanel>
    <tabpanel>

    1. Create the `.terraformrc` file.
    1. Add the following code to it.
    1. Copy the file to the root of the user directory.

    </tabpanel>
    </tabs>

    ```yaml
    provider_installation {
        network_mirror {
            url = "https://hub.mcs.mail.ru/repository/terraform-providers/"
            include = ["vk-cs/*"]
        }
        direct {
            exclude = ["vk-cs/*"]
        }
    }
    ```

1. Create a `main.tf` file and describe the necessary terraform providers in it. File consists from the blocks:

    - The first terraform block describes which providers are required (`required_providers`). Inside is `vkcs` provider source and its versions. If you are going to use additional providers, add them in this block.

    ```bash
    terraform {
        required_providers {
            vkcs = {
                source = "vk-cs/vkcs"
            }
        }
    }
    ```

    - The `provider "vkcs"` block describes the settings for the provider from VK Cloud. Specify `user_name` and `password` for your personal account, also fill your account password to `password` parameter.

    ```bash
    provider "vkcs" {
        username="USER_NAME"
        password = "YOUR_PASSWORD"
        project_id = "111111111111111111111111111"
        region = "RegionOne"
    }
    ```

## Setting working directory

In the directory with the file `main.tf` run the command:

```bash
terraform init
```

Additional files necessary for working with Terraform will be created.

## 2FA and API access

[Enable two-factor authentication and enable](https://mcs.mail.ru/app/en/account/security) API access.

## Apply

1. Run the command:

    ```
    terraform apply
    ```

    The `apply` command applies your Terraform configuration (plan) to VK Cloud resources specified in the file `main.tf`.

2. Confirm the creation by typing `yes` in the terminal window.
