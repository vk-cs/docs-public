The Terraform configuration consists of files with the `.tf` extension, which describe the settings of providers, resources, request and display data.

Usually, a separate working directory/folder is created for each project, in which files describing the infrastructure configuration are added. For convenience, files are divided into resource types:

- `main.tf` — contains settings for required Terraform providers.
- `variables.tf` — variables that are used in the configuration. Making frequently changed parameters into variables makes it easy to change the infrastructure configuration for a new project.
- `network.tf` — description of the cloud network.
- `kubernetes.tf` — description of Kubernetes resources.

The syntax of the Terraform language consists of several basic elements:

- Blocks — containers for the main content, usually describe the configuration of some object, for example, a resource. Blocks have types (block type), which can have labels (block labels) and a block body (block body), consisting of any number of arguments and nested blocks. Arguments consist of a name and a value. They are used inside blocks.

- Expressions (expressions) — the value is represented literally, or by referring and combining other values. They appear as values for arguments or inside other expressions.

```bash
resource "vkcs_kubernetes_cluster" "mycluster" {
       name="terracluster"
}

<BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
   # block body
   <IDENTIFIER> = <EXPRESSION> # Argument
}

```

The Terraform language is declarative; it describes the intended goal, not the steps to achieve that goal. The order of the blocks and the files they are organized into do not matter. When determining the order of operations, Terraform only considers the relationships between resources.

Usually in the configuration are used:

- `terraform and required_providers` — Terraform providers required for operation. More details in the section [Quick start](../../quick-start).
- `resource "resource_type" "resource_name" {}` — describes the [resource](https://www.terraform.io/language/resources/syntax) being created, such as a network, subnet, Kubernetes cluster, or database cluster.
- `data "data_type" "data_name"` — allows you to use [data](https://www.terraform.io/language/data-sources) specified outside the Terraform configuration that exists in the cloud or locally. For example, VM configuration, cluster template/version, etc.
- `variable "image_id" {}` — [input variables](https://www.terraform.io/language/values/variables). Used to move the parameters of the created resources outside the main configuration.
- `output "instance_ip_addr" {}` — [output variables](https://www.terraform.io/language/values/outputs). Output data to the command line.

To determine the sequence of creating resources and their dependencies, use the `depends_on` block, which indicates the resource on which the created resource depends:

```bash
depends_on = [
     vkcs_kubernetes_cluster.k8s-cluster,
]
```
