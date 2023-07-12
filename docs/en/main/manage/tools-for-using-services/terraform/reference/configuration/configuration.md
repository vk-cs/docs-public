When creating resources, Terraform works with configuration files, these files have the `.tf` extension.

It is recommended to create a separate working directory for each VK Cloud project. The following files are placed in the working directory:

- the provider config file (project-specific);
- the configuration files of the resources you are planning to create.

For correct Terraform operation, an additional file is required — the Terraform mirror config file.

## The Terraform provider config file

The file contains the settings of Terraform providers and user authentication details for the current project.

The file can have any name. It is recommended to name it `provider.tf`, to highlight that the file contains the key settings for connection to VK Cloud.

The file must be present in all Terraform working directories.

The file is available for [download](../../quick-start#preparatory-steps) in the personal account, on the [Project settings](https://mcs.mail.ru/app/project/terraform) page, on the **Terraform** tab. The downloaded file has the name `vkcs_provider.tf` and contains the settings of one provider (`vkcs`). After downloading the file, edit it — specify your account password in the `password` parameter.

An example of the file contents:

```bash
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
            version = "~> 0.1.12"
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

The file consists of the following sections:

- `terraform.required_providers {}` — a list of Terraform providers required for operation. To work with VK Cloud, the `vkcs` provider must be specified, its source and versions. If you are going to use additional providers, add them to the section.
- `provider "vkcs" {}` — settings for user authentication in the project:

  - `password`: specify your account password;
  - `username`, `project_id`, `region`: the values in the file that is downloaded from the personal account are valid for working with the current project. These values can also be obtained in the personal account, on the [Project settings](https://mcs.mail.ru/app/project/terraform) page, on the **Terraform** tab.

  The values of some parameters depend on the [region](/ru/base/account/concepts/regions):

  - `region`:

    - for Moscow region: `RegionOne`;
    - for Kazakhstan region: `kz`;

  - `auth_url`:

    - for Moscow region: `https://infra.mail.ru:35357/v3/`;
    - for Kazakhstan region: `https://kz.infra.mail.ru:35357/v3/`.

## Resources configuration files

Resource configuration files describe the resources created via Terraform, their settings and dependencies.

Resource configuration files can have any names. Examples in this documentation use the following naming standards:

- `variables.tf` — variables that are used in the configuration. Setting frequently changed parameters as variables makes it easy to change the infrastructure configuration for a new project.
- `main.tf` — contains a description of the main resource that is created in a [scenario](../../use-cases). For example, in the scenario for creating a [virtual machine](../../use-cases/iaas/create) the `main.tf` should typically contain the description of a virtual machine.

Sometimes files are named after the types of the resources they describe:

- `network.tf` — the description of the cloud network.
- `kubernetes.tf` — the description of Kubernetes resources.

A typical configuration contains:

- `resource "resource_type" "resource_name" {}` — describes the [resource](https://www.terraform.io/language/resources/syntax) being created, such as a network, a subnet, a Kubernetes cluster, or a database cluster.
- `data "data_type" "data_name" {}` — allows you to use [data](https://www.terraform.io/language/data-sources) specified outside the Terraform configuration that exists in the cloud or locally. For example, VM configuration, cluster template/version, etc.
- `variable "parameter" {}` — [input variables](https://www.terraform.io/language/values/variables). Used to declare variables that are used in the configuration (`variables.tf`).
- `output "parameter" {}` — [output variables](https://www.terraform.io/language/values/outputs). Output data to the command line.

    To determine the sequence of creating resources and their dependencies, you can use the `depends_on` meta-argument. The meta-argument indicates the resource on which the created resource depends:

    ```bash
    depends_on = [
     vkcs_kubernetes_cluster.k8s-cluster,
    ]
    ```

    First, the resource set by the meta-argument is created, then — the resource for which the dependency is specified.

## The Terraform mirror config file

The file is required for Terraform startup, it contains the address of the VK Cloud Terraform mirror. The file must be named `terraform.rc` on Windows and `.terraformrc` on other OS. The contents of the file is the same for all projects and regions.

The file is available for [download](../../quick-start#preparatory-steps) on the [Project settings](https://mcs.mail.ru/app/project/terraform) page in the personal account, on the **Terraform** tab. After download, the file can be used as is.

The file must be located:

- For Windows — in the **Application Data** directory of the user.
- For other OS — in the home directory of the user.

The file contents for VK Cloud projects:

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
