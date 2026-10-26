# {heading(Using scripts)[id=tf_manifest_script]}

{include(/en/_includes/_translated_by_ai_en.md)}

Scripts allow performing various operations during service deployment, for example synchronizing nodes when combining them into a cluster.

There are two ways to use scripts:

- via [cloud-init](https://cloudinit.readthedocs.io/en/latest);
- via the [Marketplace agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent).

## {heading(Executing scripts via Cloud-init)[id=tf_script_userdata]}

Cloud-init allows configuring the order of script execution and specifying the moment they are launched on a single server. For example, a script can run at every OS boot or only once.

Disadvantages of this approach:

- If a script fails, this will stop the instance deployment, meaning that not all the required settings will be applied.
- You cannot set the script launch dependency relative to other Terraform resources: the script may still be running, but the Marketplace will already mark the instance deployment as completed.

To use scripts via Cloud-init:

1. (Optional) In the input variables, describe the contents of the scripts. Bash and Python are supported.
1. Describe the order and settings of script execution in the `user_script` argument of the `ivkcs_user_data` resource. For more information, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}.
1. Describe the contents of the scripts using variables or directly in the resource.

The section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#user_script)[text=%text]} provides an example of describing scripts in the `ivkcs_user_data` resource of the manifest.

## {heading(Executing scripts via the agent)[id=tf_script_agentexec]}

The agent allows setting the script launch dependency relative to other Terraform resources, setting a timeout, monitoring exit codes, and stopping the application deployment when errors occur.

During service deployment, the agent passes the hash of the executed scripts to the configuration management service. This makes it possible to evaluate the current state of the VM with the service instance (which scripts have been executed so far) and bring it to the state described in the Terraform manifest.

The agent passes the script status to the configuration management service. Possible statuses:

- `ok` — the script completed successfully.
- `running` — the script is running.
- `failed` — the script terminated with an error. [Review](../../ibservice_upload/ibservice_upload_deploysystemtest#agent_log) the agent logs to determine its cause.

   If the `failed` status is received, the deployment system will restart the service deployment process. Retries can take up to an hour and a half and can be disabled in the `settings.yaml` file (for more information, see the section {linkto(../tf_manifest_settings/#tf_manifest_settings)[text=%text]}).

Script execution results can be passed to the configuration management service in a formatted form and used when executing other scripts.

Disadvantages of this approach:

- The agent must be installed.
- It is impossible to restart scripts on OS reboot.

To use scripts via the agent:

1. Make sure the manifest describes the agent installation on the VM. If the agent installation is not described, describe it (for more information, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}).
1. (Optional) In the input variables, describe the contents of the scripts. Bash and Python are supported.
1. Describe the order and settings of script execution. Use the [ivkcs_agent_exec resource](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec) or the `locals` block.

   For example, for a script you can define the execution timeout and the number of script execution attempts before assigning it the `failed` status.

   For each script, you can define the options described in the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec/#ivkcs_agent_exec)[text=%text]} (for example, the execution timeout, the number of script execution attempts before its status is set to `failed`).
1. Describe the contents of the scripts using variables or directly in the resource.
1. (Optional) If you need to obtain the script results to use them in output parameters (for more information, see the section {linkto(../tf_manifest_output/#tf_manifest_output)[text=%text]}) or in other manifest resources, use the `ivkcs_agent_script_result` data source.

The section {linkto(../tf_manifest_steps/#tf_manifest_example)[text=%text]} provides an example of a manifest using scripts in the `ivkcs_agent_exec` resource.

{note:info}

Resources and data sources are described in the section [VK CS Infra (iVK CS) Provider Reference](../../../ivkcs).

{/note}