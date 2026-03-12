Ошибка `Working with SDN=NEUTRON is not allowed` при создании сервера через Terraform указывает на то, что ваш проект использует сетевую архитектуру [SDN Sprut](/ru/networks/vnet/concepts/sdn#sprut), а конфигурация Terraform пытается обратиться к ресурсам [SDN Neutron](/ru/networks/vnet/concepts/sdn#neutron).

### Решение

Убедитесь, что вы используете актуальную версию провайдера VK Cloud и ресурсы, совместимые со Sprut (или универсальные ресурсы `vkcs_networking_*`).