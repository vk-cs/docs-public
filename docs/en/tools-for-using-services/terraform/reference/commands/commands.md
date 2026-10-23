[Terraform command line](https://www.terraform.io/cli/commands) is the `terraform` command that accepts a variety of subcommands.

Main commands used:

- `terraform init` — initializes the Terraform working directory.
- `terraform validate` — validates the syntax of the Terraform file.
- `terraform plan` — shows what will change when the `apply` command runs. The `plan` command itself does not save the plan: to save it to a file, use the `-out=<PLAN_FILE>` option, then apply the saved plan with the `terraform apply <PLAN_FILE>` command. It is recommended that you always run `plan` before `apply` to ensure that the results are as intended.
- `terraform apply` — builds or changes the infrastructure. The command will show the execution plan and require a "yes" or "no" answer (unless the `--auto-approve` flag is used, which will cause the command to be executed automatically).
- `terraform apply -refresh-only` — syncs the state file with the real resources without changing the infrastructure. The deprecated `terraform refresh` command performs the same action without asking for confirmation and is kept for compatibility.
- `terraform fmt` — formats the `.tf` configuration files to the canonical format.
- `terraform import <RESOURCE_ADDRESS_IN_CONFIGURATION> <RESOURCE_ID>` — binds an existing infrastructure resource to a resource in the Terraform configuration.
- `terraform output` — outputs the values of the output variables declared by the `output` blocks in the configuration.
- `terraform state list` — outputs the list of resources stored in the state file.
- `terraform destroy` — deletes infrastructure managed by Terraform. This will permanently remove everything created and stored in the state file from the cluster.

Before using the commands, switch to the working directory that contains the `.tf` configuration files.

In cases where commands are used in automation scripts, for convenience, the `-chdir=` option is used to change the working directory before applying the command:

```console
terraform -chdir=terraform/configuration apply
```
