# {heading(Monitoring)[id=tf_manifest_monitoring]}

{include(/en/_includes/_translated_by_ai_en.md)}

Monitoring allows tracking the state of a service instance on a VM. The agent checks the availability of the service instance using `health check` and passes the result to the configuration management service. The default `health check` timeout is 5 minutes.

{note:info}

The `health check` timeout value cannot be configured in the Terraform manifest. If this value needs to be changed for the service to work correctly, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

{/note}

Use monitoring as a service health check after the scripts are executed. If the service did not start after the scripts, the agent will not receive a `health check` and the service deployment will fail.

To configure monitoring:

1. Make sure that the manifest describes the agent installation on the VM. If the agent installation is not described, describe it (for more details, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}).
1. Configure monitoring methods (`health check` types). Use the `ivkcs_agent_check` resource.

   The `health check` types are described in the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_check/#ivkcs_agent_check)[text=%text]}.

   {caption(Example of `health check` configuration)[align=left;position=above]}
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

       # Monitoring interval
       period  = "1m"
     }
   }  
   ```
   {/caption}

   At the specified interval, the agent on the VM will pass `health check` to the configuration management service.