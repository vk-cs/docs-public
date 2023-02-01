## Install Terraform

To install Terraform binaries, use the official [mirror](https://hub.mcs.mail.ru/repository/terraform-binary/mirror/latest/) from VK Cloud.

## Provider mirror installation

Create a provider mirror file and paste it in the directory.

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

## Provider configuration files

To get started with Terraform, create a `main.tf` file and describe the necessary terraform providers in it. This description tells Terraform where and with what credentials to connect to create the required resources.

You can download the already completed `main.tf` in [personal account](https://mcs.mail.ru/app/project/terraform/).

The first terraform block describes which providers are required (`required_providers`). Inside is `vkcs` provider source and its versions. If you are going to use additional providers, add them in this block.

```bash
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
        }
    }
}
```

The `provider "vkcs"` block describes the settings for the provider from VK Cloud. All required fields have already been filled in. Specify `user_name` and `password` for your personal account, leave the rest of the fields unchanged.

```bash
provider "vkcs" {
    username="USER_NAME"
    password = "YOUR_PASSWORD"
    project_id = "111111111111111111111111111"
    region = "RegionOne"
}
```
