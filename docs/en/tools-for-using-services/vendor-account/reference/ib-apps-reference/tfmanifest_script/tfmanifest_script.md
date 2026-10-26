Scripts allow performing various operations during service deployment, for example, synchronizing nodes when combining them into a cluster.

There are two ways to use scripts:

- via the [cloud-init package](https://cloudinit.readthedocs.io/en/latest);
- via the [Marketplace agent](/en/tools-for-using-services/vendor-account/manage-apps/concepts/vendor-preconditions/ib_image_agent).

## {heading(Executing scripts via Cloud-init)[id=tf_script_userdata]}

{include(/en/_includes/_translated_by_ai_en.md)}

### Advantages of this method

Cloud-init allows configuring the order in which scripts are executed and specifying the moment of their launch on a single server. For example, a script can be executed at every OS boot or only once.

### Disadvantages of this method

- An error during script execution will stop the instance deployment. This means that not all the required settings will be applied.
- It is impossible to set a dependency between the script execution and the operation of other Terraform resources: the script may still be running, but the Marketplace will already indicate that the instance deployment is complete.

### Required Terraform manifest components

- (Optional) Description of the script contents in [input variables](../tfmanifest_variable). Bash and Python languages are supported.
- Description of the script execution order and settings in the `user_script` argument of the [ivkcs_user_data](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#user_script) resource.
- Description of the script contents in the `ivkcs_user_data` resource directly or using variables.

The [VK CS Infra (iVK CS) provider reference](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data#user_script) provides an example of describing scripts in the `ivkcs_user_data` resource of a Terraform manifest.

## {heading(Executing scripts via the Marketplace agent)[id=tf_script_agentexec]}

### Advantages of this method

The Marketplace agent allows setting the dependency of script execution relative to the operation of other Terraform resources, setting a timeout, monitoring exit codes, and stopping the application deployment on errors.

During service deployment, the agent transmits the hash of the executed scripts to the configuration management service. This makes it possible to assess the current state of the VM with the service instance (which scripts have been executed at the current moment) and bring it to the state described in the Terraform manifest.

The Marketplace agent transmits the script status to the configuration management service. Possible statuses:

- `ok` — the script completed successfully.
- `running` — the script is being executed.
- `failed` — the script completed with an error. The cause of the error can be determined by [viewing the agent logs](../../../instructions/manage-ib-apps/ib-add#agent_log).

   Upon receiving the `failed` status, the deployment system restarts the service deployment process. Retries can take up to an hour and a half. They can be disabled in the [settings.yaml file](../tfmanifest_settings).

The script execution results can be transmitted to the configuration management service in a formatted form and used when executing other scripts.

### Disadvantages of this method

- Installation of the Marketplace agent is required.
- It is impossible to restart scripts on OS reboot.

### Required Terraform manifest components

- Description of the Marketplace agent installation on the instance VM. For more details, see the [VK CS Infra (iVK CS) provider reference](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data).
- (Optional) Description of the script contents in [input variables](../tfmanifest_variable). Bash and Python languages are supported.
- Description of the script execution order and settings using the [ivkcs_agent_exec](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_exec) resource or a `locals` block.

   For example, using the `ivkcs_agent_exec` resource, you can set a execution timeout and the number of script execution attempts before it is assigned the `failed` status for each script.

- Description of the script contents in the `ivkcs_user_data` resource directly or using variables.
- (Optional) Retrieving the script execution results using the `ivkcs_agent_script_result` data source. The script execution results can be transmitted in [output parameters](../tfmanifest_output) or used in other Terraform manifest resources.

The section [Terraform manifest](../tf-manifest) provides an example of a manifest using scripts in the `ivkcs_agent_exec` resource.

{note:info}

Resources and data sources are described in the [VK CS Infra (iVK CS) provider reference](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs).

{/note}