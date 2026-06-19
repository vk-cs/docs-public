{include(/kz/_includes/_translated_by_ai.md)}

Terraform арқылы серверді жасау кезінде `Working with SDN=NEUTRON is not allowed` қатесі жобаңыз [SDN Sprut](/kz/networks/vnet/concepts/sdn#vnet-sdn-sprut) желілік архитектурасын пайдаланатынын, ал Terraform конфигурациясы [SDN Neutron](/kz/networks/vnet/concepts/sdn#vnet-sdn-neutron) ресурстарына жүгінуге тырысатынын білдіреді.

### Шешім

VK Cloud провайдерінің өзекті нұсқасын және Sprut-пен үйлесімді ресурстарды (немесе әмбебап `vkcs_networking_*` ресурстарын) пайдаланып жатқаныңызға көз жеткізіңіз.
