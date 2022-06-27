[Terraform Command Line](https://www.terraform.io/cli/commands) is a terraform command that accepts many subcommands.

The main commands used are:

- `terraform init` — initializes the Terraform working directory.
- `terraform validate` — confirms the correctness of the syntax of the Terraform file.
- `terraform plan` — generates a file of changes and shows what will change at startup. We recommend running this command before running the apply command to make sure that the results will match the intent.
- `terraform apply` — builds or modifies the infrastructure. The command will show the execution plan and will require a "yes" or "no" response (unless the --auto-approve flag is used, which will cause it to be executed automatically).
- `terraform refresh` — updates the local status file relative to real resources. This ensures that Terraform has an accurate idea of what is in the current environment.
- `terraform destroy` — removes the infrastructure managed by Terraform. This will permanently delete everything that was created and saved in the status file from the cluster.

Before using the commands, move to the working folder with the configuration files (.tf).

In cases where commands are used in automation scripts, for convenience, the `-chdir=` option is used to change the working folder before using the command:

```bash
terraform -chdir=terraform/configuration apply
```
