## Prepare for work

1. Install Terraform binaries from the official VK Cloud [mirror](https://hashicorp-releases.mcs.mail.ru/terraform).
1. Create a provider mirror file and paste it in the directory.

    <tabs>
    <tablist>
    <tab>Windows</tab>
    <tab>Other OS</tab>
    </tablist>
    <tabpanel>

    1. Create the `terraform.rc` file.
    1. Add the code to it.

       ```yaml
        provider_installation {
            network_mirror {
                url = "https://terraform-mirror.mcs.mail.ru"
                include = ["registry.terraform.io/*/*"]
            }
            direct {
                exclude = ["registry.terraform.io/*/*"]
            }
        }
        ```

    1. Paste `%APPDATA%` into the address bar of Windows Explorer and copy the file `terraform.rc` to the directory that opens.

    </tabpanel>
    <tabpanel>

    1. Create the `.terraformrc` file.
    1. Add the code to it.

       ```yaml
        provider_installation {
            network_mirror {
                url = "https://terraform-mirror.mcs.mail.ru"
                include = ["registry.terraform.io/*/*"]
            }
            direct {
                exclude = ["registry.terraform.io/*/*"]
            }
        }
        ```

    1. Copy the file to the root of the user directory.

    </tabpanel>
    </tabs>

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
