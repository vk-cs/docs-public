The Terraform configuration consists of files with the extension ".tf", which describe provider settings, resources, data are requested and output.

Usually, a separate working directory / folder is created for each project, to which files with a description of the infrastructure configuration are added. For convenience, files are divided by resource types:

- `main.tf` — contains the settings of the required Terraform providers.
- `variables.tf` — variables that are used in the configuration. Putting frequently changed parameters into variables makes it easy to change the infrastructure configuration for a new project.
- `network.tf` — description of the cloud network.
- `kubernetes.tf` — description of Kubernetes resources.

The syntax of the Terraform language consists of several basic elements:

```bash
resource "mcs_kubernetes_cluster" "mycluster" {
      name = "terracluster"
}

<BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
  # Block body
  <IDENTIFIER> = <EXPRESSION> # Argument
}

```

Blocks are containers for other content and usually describe the configuration of some object, for example, a resource.
Blocks have types (block type), which can have labels (block labels) and a block body (block body) consisting of any number of arguments (arguments) and nested blocks. The arguments consist of a name and a value. They are used inside blocks.

Expressions represent a value either literally or by referencing and combining other values. They are displayed as values for arguments or inside other expressions.

The Terraform language is declarative, describing the intended goal, not the steps to achieve this goal. The order of blocks and the files in which they are organized, as a rule, does not matter; Terraform takes into account only implicit and explicit relationships between resources when determining the order of operations.

Usually the configuration uses:

- `terraform and required_providers' are the providers required for Terraform to work. Setting up the necessary providers is described in this [article](https://mcs.mail.ru/docs/ru/additionals/terraform/terraform-provider-config).
- `resource "resource_type" "resource_rame" {}` — describes the [resource] being created(https://www.terraform.io/language/resources/syntax), for example: network, subnet, Kubernetes cluster or database cluster.
- `data "data_type" "data_name"` — allows you to use [data](https://www.terraform.io/language/data-sources) specified outside of the Terraform configuration that exist in the cloud or locally. For example, VM flavor, cluster template/version, and so on.
- `variable "image_id" {}` — [input variables](https://www.terraform.io/language/values/variables). They are used for rendering parameters of created resources outside the main configuration.
- `output "instance_ip_addr" {}` — [output variables](https://www.terraform.io/language/values/outputs). Output data to the command line.

To determine the sequence of creating resources and their dependencies, the `depends_on` block is used, which specifies the resource on which the created resource depends:

```bash
depends_on = [
    vkcs_kubernetes_cluster.k8s-cluster,
]
```
