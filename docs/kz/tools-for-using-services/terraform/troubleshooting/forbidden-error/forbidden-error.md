{include(/kz/_includes/_translated_by_ai.md)}

Terraform арқылы серверді жасау кезінде `Working with SDN=NEUTRON is not allowed` қатесі жобаңыз [SDN Sprut](/kz/networks/vnet/concepts/sdn#vnet-sdn-sprut) желілік архитектурасын пайдаланатынын, ал Terraform конфигурациясы [SDN Neutron](/kz/networks/vnet/concepts/sdn#vnet-sdn-neutron) ресурстарына жүгінуге тырысатынын білдіреді.

### Шешім

1. {var(cloud)} провайдерінің өзекті нұсқасын пайдаланып жатқаныңызға көз жеткізіңіз. Нұсқаны `vkcs_provider.tf` файлынан тексеріңіз:

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

Егер мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts) және `terraform plan` командасының нәтижесі мен провайдер нұсқасын қосыңыз.
