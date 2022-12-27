[Terraform Command Line](https://www.terraform.io/cli/commands) is a terraform command that accepts many subcommands.

Main commands used:

- `terraform init` — initializes the Terraform working directory.
- `terraform validate` — validates the syntax of the Terraform file.
- `terraform plan` — generates a change file and shows what will change on startup. It is recommended that you run this command before running the `apply` command to ensure that the results are as intended.
- `terraform apply` — builds or changes the infrastructure. The command will show the execution plan and require a yes or no answer (unless the `--auto-approve` flag is used, which will cause the command to be executed automatically).
- `terraform refresh` — updates the local state file with respect to real resources. This ensures that Terraform has an accurate idea of what is in the current environment.
- `terraform destroy` — deletes infrastructure managed by Terraform. This will permanently remove everything created and stored in the state file from the cluster.

Before using the commands, move to the working folder with the `.tf` configuration files.

In cases where commands are used in automation scripts, for convenience, the `-chdir=` option is used to change the working directory before applying the command:

```bash
terraform -chdir=terraform/configuration apply
```
