# {heading(Ошибка 403 при создании сервера)[id=terraform-forbidden-error]}

Ошибка `Working with SDN=NEUTRON is not allowed` при создании сервера через Terraform указывает на то, что ваш проект использует сетевую архитектуру {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=SDN Sprut]}, а конфигурация Terraform пытается обратиться к ресурсам {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-neutron)[text=SDN Neutron]}.

### {heading(Решение)[id=terraform-forbidden-error-solution]}

Убедитесь, что вы используете актуальную версию провайдера VK Cloud и ресурсы, совместимые со Sprut (или универсальные ресурсы `vkcs_networking_*`).