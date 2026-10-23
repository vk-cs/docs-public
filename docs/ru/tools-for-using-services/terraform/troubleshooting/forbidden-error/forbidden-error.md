# {heading(Ошибка 403 при создании сервера)[id=terraform-forbidden-error]}

Ошибка `Working with SDN=NEUTRON is not allowed` при создании сервера через Terraform указывает на то, что ваш проект использует сетевую архитектуру {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]}, а конфигурация Terraform пытается обратиться к ресурсам {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-neutron)[text=SDN Neutron]}.

### {heading(Решение)[id=terraform-forbidden-error-solution]}

1. Убедитесь, что вы используете актуальную версию провайдера {var(cloud)}. Проверьте версию в файле `vkcs_provider.tf`:

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

   Актуальная версия провайдера приведена в [репозитории провайдера](https://github.com/vk-cs/terraform-provider-vkcs/releases).

1. При необходимости обновите провайдер:

   ```console
   terraform init --upgrade
   ```

1. Проверьте конфигурацию и примените изменения:

   ```console
   terraform validate
   terraform plan
   terraform apply
   ```

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts) и приложите вывод команды `terraform plan` и версию провайдера.