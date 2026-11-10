# {heading(Серверді жасау кезіндегі 403 қатесі)[id=terraform-forbidden-error]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Terraform арқылы серверді жасау кезіндегі `Working with SDN=NEUTRON is not allowed` қатесі сіздің жобаңыз {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]} желілік архитектурасын пайдаланатынын, ал Terraform конфигурациясы {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-neutron)[text=SDN Neutron]} ресурстарына жүгінуге тырысатынын көрсетеді.

### {heading(Шешім)[id=terraform-forbidden-error-solution]}

1. {var(cloud)} провайдерінің өзекті нұсқасын пайдаланып жүргеніңізге көз жеткізіңіз. Нұсқаны `vkcs_provider.tf` файлынан тексеріңіз:

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

   Провайдердің өзекті нұсқасы [провайдер репозиторийінде](https://github.com/vk-cs/terraform-provider-vkcs/releases) келтірілген.

1. Қажет болса, провайдерді жаңартыңыз:

   ```console
   terraform init --upgrade
   ```

1. Конфигурацияны тексеріп, өзгерістерді қолданыңыз:

   ```console
   terraform validate
   terraform plan
   terraform apply
   ```

Егер мәселе сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініп, `terraform plan` командасының нәтижесін және провайдердің нұсқасын тіркеп жіберіңіз.