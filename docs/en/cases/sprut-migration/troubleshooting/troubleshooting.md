
{include(/en/_includes/_translated_by_ai_en.md)}

## Issue with the Default security group name

If you use [OpenStack Terraform Provider](https://docs.comcloud.xyz/providers/terraform-provider-openstack/openstack/latest) for migration, an issue with the `default` security group name may occur.

### How the issue manifests

In a project with two SDNs (Neutron and Sprut), networks have a default security group named `default`.

OpenStack Terraform Provider works only with security group names, not IDs. This causes a conflict because the provider cannot uniquely determine which `default` security group to use.

### Possible solutions

- Use the VK Cloud [terraform-provider](https://github.com/vk-cs/terraform-provider-vkcs) as it allows using IDs for security groups.
- Change the security group name in the Terraform code:

  1. When creating a VM, specify the `default` security group in the manifest. The VM will be created successfully, but when executing the `terraform plan` command, the `default-sprut` security group will be returned, and the state file will not be able to update. 
  1. Manually change the security group to `default-sprut` in the manifest.

- Fully migrate the project to the Sprut SDN, then disable the Neutron SDN in the project by contacting [technical support](mailto:support@mcs.mail.ru).
- If virtual machines are rarely created, change the state file manually. Specify `security group = "default-sprut"` in the state file and save it.
- Do not use default security groups.