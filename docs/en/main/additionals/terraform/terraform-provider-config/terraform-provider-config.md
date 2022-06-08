Before you start configuring the Terraform provider, you need to [install the Terraform executables](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-installation ).

To get started with Terraform, create a provider mirror file and place it in the directory.

<tabs>
<tablist>
<tab>For Windows</tab>
<tab>For other OS</tab>
</tablist>
<tabpanel>

1. Create the _terraform.rc_ file.
2. Add the following code to it.
3. Copy the file to the '%APPDATA%` directory.
3. Open the directory by inserting `%APPDATA%` into the address bar of Windows Explorer.

</tabpanel>
<tabpanel>

1. Create the _.terraformrc_ file.
2. Add the following code to it.
3. Copy the file to the root of the user directory.

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
Next, to work with Terraform, download the already completed file _main.tf_ in [personal account](https://mcs.mail.ru/app/project/terraform /) and describe the necessary providers in it. The description of providers tells Terraform which providers you need to download, where and with what credentials to connect to create the resources you need.

The `terraform` block describes which providers are needed (required_providers). Two providers are listed inside: `vkcs` and its source. If you are going to use additional providers, add them to the block.

``` yaml
terraform {
  required_providers {
    vkcs = {
      source = "vk-cs/vkcs"
    }
  }
}
```

The `provider "vkcs"` block describes the settings for the provider from VK Cloud Solutions. Specify `user_name`, `password` and `project_id` for your personal account. The project values for `project_id` and `region` are available on the [API keys in the personal account] page (https://mcs.mail.ru/app/project/keys ).

``` yaml
provider "vkcs"  {
    username = "USER_NAME"
    password = "YOUR_PASSWORD"
    project_id = "89382346912619466469164"
    region = "RegionOne"
}
```

After creating the file `main.tf` and its filling, you can proceed to the description of the creation of resources:

- [Creating a Kubernetes Cluster](https://mcs.mail.ru/docs/ru/base/k8s/k8s-terraform/k8s-terraform-create );
- [Creating a database instance with Terraform for DBaaS](https://mcs.mail.ru/docs/dbs/dbaas/api/working-with-terraform );
- [Creating a database and a user with Terraform for DBaaS](https://mcs.mail.ru/docs/ru/dbs/dbaas/api/terraform-provider-vk-cs ).
