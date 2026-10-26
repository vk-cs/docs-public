### {heading(Examples of specifying host names)[id=if-hosts-names-examples]}

- Using a local variable (recommended approach):

    ```hcl
    locals {
    hosts_name = "${substr(var.instance_uuid, 0, 8)}-myapp"
    }

    resource "ivkcs_agent_check" "health" {
    hosts = [local.hosts_name]  # Use the value from locals
    uuid  = var.instance_uuid
    # ...
    }
    ```

- Specifying the host name directly:

    ```hcl
    resource "ivkcs_agent_check" "health" {
    hosts = ["myapp-production-server"]  # Specify a fixed host name
    uuid  = var.instance_uuid
    # ...
    }
    ```

- Specifying the host name via a variable in the `vkcs_compute_instance` resource:

    ```hcl
    resource "vkcs_compute_instance" "app_server" {
    name = "app-production-vm"  # Define a variable containing the host name
    # ...
    }

    resource "ivkcs_agent_check" "health" {
    hosts = [vkcs_compute_instance.app_server.name]  # Use the value of the host name variable
    uuid  = var.instance_uuid
    # ...
    }
    ```
