# {heading(Terraform configuration files)[id=terraform_configuration]}

{include(/en/_includes/_translated_by_ai_en.md)}

When creating resources, Terraform works with configuration files. They have the `.tf` extension.

It is recommended to create a separate working directory for each {var(data-p)} project. The working directory contains the following files:

- the provider configuration file (specific to the project);
- the configuration files of the resources you plan to create.

For Terraform to work correctly, an additional file is required — the Terraform mirror configuration file.

## {heading(Terraform provider configuration file)[id=terraform_configuration_provider]}

The file contains information about Terraform providers and the data for user authentication in the project.

The file name can be anything. It is recommended to use the name `provider.tf` to emphasize that the file contains the main settings for connecting to {var(data-p)}.

The file must be placed in all Terraform working directories.

The file is available for {linkto(../../quick_start#terraform_quick_start_preparations)[text=download]} in the management console, on the **Project settings** page on the **Terraform** tab. The downloaded file is named `vkcs_provider.tf` and contains the data of one provider (`vkcs`). After downloading, edit the file — specify the password of your account in the `password` parameter.

Example of the file contents:

```console
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
        }
    }
}

provider "vkcs" {

# Your user account.
    username = "<user_email>"

# The password of the account
    password = "<user_password>"

# The tenant token can be taken from the project Settings tab - > API keys.

# Project ID will be our token.
    project_id = "<project_ID>"

# Region name
    region = "<Region>"

    auth_url = "<auth_url>"
}
```

The file consists of sections:

- `terraform.required_providers {}` — the list of providers in use. To work with {var(data-p)}, the `vkcs` provider must be specified, along with its source and versions. If you are going to use additional providers, add them to this section.
- `provider "vkcs" {}` — the authentication settings for the project:

    - `password`: specify the password of your account;
    - `username`, `project_id`, `region`: the values specified in the file downloaded via the management console are valid for working with the current project. These values are also specified on the **Project settings** page on the **Terraform** tab.

The values of some parameters depend on the region:

- `region`:

    - for the Moscow region: `RegionOne`;
    - for the Kazakhstan region: `kz`;

- `auth_url`:

    - for the Moscow region: `https://infra.mail.ru:35357/v3/`;
    - for the Kazakhstan region: `https://kz.infra.mail.ru:35357/v3/`.

## {heading(Resource configuration files)[id=terraform_configuration_resource]}

Resource configuration files describe the resources created with Terraform, their settings and dependencies.

Configuration files can have any names. The examples in this documentation use the following naming principles:

- `variables.tf` — the variables used in the configuration. Moving frequently changed parameters into variables makes it easy to modify the infrastructure configuration for a new project.
- `main.tf` — contains the description of the main resource created in a particular scenario. For example, when [creating a Spark cluster](../../tf-spark), it is recommended to place the cluster configuration in the `main.tf` file.

Sometimes files may be named after resource types, for example:

- `network.tf` — the description of a cloud network.
- `kubernetes.tf` — the description of Kubernetes resources.

Typically, resource configurations use:

- `resource "resource_type" "resource_name" {}` — the [resource](https://www.terraform.io/language/resources/syntax) being created, for example, a network, subnet, Kubernetes cluster, or database cluster.
- `data "data_type" "data_name" {}` — allows using [data](https://www.terraform.io/language/data-sources) specified outside the Terraform configuration that exists in the cloud or locally. For example, a VM configuration, a cluster template/version, etc.
- `variable "parameter" {}` — [input variables](https://www.terraform.io/language/values/variables). Used to declare variables that are used in the configuration (`variables.tf`).
- `output "parameter" {}` — [output variables](https://www.terraform.io/language/values/outputs). They output data to the command line.

To define the order of resource creation and their dependencies, you can use the `depends_on` meta-argument. The meta-argument specifies the resource on which the created resource depends:

```console
depends_on = [
    vkcs_kubernetes_cluster.k8s-cluster,
]
```
First, the resource specified via the meta-argument will be created, then the resource for which the dependency is specified.

## {heading(Terraform mirror configuration file)[id=terraform_configuration_mirror]}

This file is required to run Terraform; it contains the address of the {var(cloud)} Terraform mirror. The file must be named `terraform.rc` for Windows and `.terraformrc` for other operating systems. The file contents are the same for all projects and regions.

The file is available for {linkto(../../quick_start#terraform_quick_start_preparations)[text=download]} on the **Project settings** page of the management console on the **Terraform** tab. After downloading, no changes need to be made to the file.

The file must be placed:

- For Windows — in the **Application Data** directory of the current user.
- For other operating systems — in the user's home directory.

The file contents for {var(cloud)} projects:

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