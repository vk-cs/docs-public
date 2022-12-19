## Install Terraform

To install Terraform binaries, use the official [mirror](https://hub.mcs.mail.ru/repository/terraform-binary/mirror/latest/) from VK Cloud.

## Provider configuration files

To get started with Terraform, create a `main.tf` file and describe the necessary terraform providers in it. This description tells Terraform where and with what credentials to connect to create the required resources.

You can download the already completed `main.tf` in [personal account](https://mcs.mail.ru/app/project/terraform/).

The first terraform block describes which providers are required (`required_providers`). Inside are two providers `openstack` and `mcs`, their source and versions. If you are going to use additional providers, add them in this block.

``` bash
terraform {
     required_providers {
         open stack = {
             source="terraform-provider-openstack/openstack"
             version="1.33.0"
         }
        
         mcs = {
             source = "MailRuCloudSolutions/mcs"
         }
     }
}

```

The `provider "openstack"` block specifies the settings for the `openstack` provider. The VK Cloud infrastructure is built on `openstack`. This provider is used to create networks, balancers and other components. Specify `user_name` and `password` for your personal account, leave the rest of the fields unchanged.

``` bash
provider "openstack" {
     user_name = "USER_NAME"
     password = "YOUR_PASSWORD"
     tenant_id = "111111111111111111111111111"
     user_domain_id = "users"
     auth_url = "https://infra.mail.ru:35357/v3/"
     use_octavia = true
     region = "RegionOne"
}
```

The `provider "mcs"` block describes the settings for the provider from VK Cloud. All required fields have already been filled in. Specify `user_name` and `password` for your personal account, leave the rest of the fields unchanged.

``` bash
provider "mcs" {
     username="USER_NAME"
     password = "YOUR_PASSWORD"
     project_id = "111111111111111111111111111"
     region = "RegionOne"
}
```
