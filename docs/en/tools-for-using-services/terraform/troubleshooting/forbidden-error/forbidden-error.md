# {heading(403 error when creating a server)[id=terraform-forbidden-error]}

{include(/en/_includes/_translated_by_ai_en.md)}

The `Working with SDN=NEUTRON is not allowed` error when creating a server via Terraform means that your project uses the {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]} network architecture, while the Terraform configuration tries to address {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-neutron)[text=SDN Neutron]} resources.

### {heading(Solution)[id=terraform-forbidden-error-solution]}

1. Make sure that you are using the current version of the {var(cloud)} provider. Check the version in the `vkcs_provider.tf` file:

   ```hcl
   terraform {
     required_providers {
       vkcs = {
         source = "vk-cs/vkcs"
         version = ">= 0.18.0"
       }
     }
   }
   ```

   The current provider version is available in the [provider repository](https://github.com/vk-cs/terraform-provider-vkcs/releases).

1. If necessary, update the provider:

   ```console
   terraform init --upgrade
   ```

1. Validate the configuration and apply the changes:

   ```console
   terraform validate
   terraform plan
   terraform apply
   ```

If the problem persists, contact [technical support](mailto:support@mcs.mail.ru) and attach the output of the `terraform plan` command and the provider version.
