
{include(/en/_includes/_translated_by_ai_en.md)}

Monitoring allows you to track the state of a service instance on a VM, for example, to check the service's health after scripts are executed during deployment. The Marketplace agent periodically receives a `health check` (data on the availability of the service instance) and passes the result to the configuration management service. If the service did not start after the scripts were executed, the agent will not receive a `health check` and the service deployment will fail.

The default timeout for receiving a `health check` when checking service availability is 5 minutes. It cannot be configured in the Terraform manifest. If necessary, the timeout can be changed by sending an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

To use monitoring when deploying a service, the Terraform manifest must contain the following components:

1. A description of installing the Marketplace agent on the instance VM. For more information, see the [VK CS Infra provider (iVK CS) reference](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data).
1. A description of monitoring methods using the [ivkcs_agent_check](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_check) resource.

   Example monitoring configuration:

   ```hcl
   resource "ivkcs_agent_check" "health" {
     hosts = ["HOST"]
     uuid  = var.instance_uuid

     # Service monitoring by port
     port_health {

       # IP address
       host = "127.0.0.1"

       # Port
       port    = 9092

       # Monitoring frequency
       period  = "1m"
     }
   }  
   ```

   In this example, the Marketplace agent will receive data on the availability of the service at the IP address `http://127.0.0.1:9092/` every 1 minute and pass it to the configuration management service.