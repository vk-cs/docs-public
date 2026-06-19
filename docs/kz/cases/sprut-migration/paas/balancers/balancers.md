{include(/kz/_includes/_translated_by_ai.md)}

Жүктеме теңгергішінің желісін өзгерту мүмкін емес, сондықтан SDN Sprut-та жаңа теңгергіш жасап, оны баптау қажет. Жүктеме теңгергішін SDN Sprut-қа көшіру үшін:

1. [Жаңа теңгергіш жасаңыз](/kz/networks/balancing/instructions/manage-lb#balancing-manage-lb-add) және параметрлерді көрсетіңіз:

    - **Теңгергіш атауы**: теңгергіштің атауы, мысалы, егер бастапқы SDN Neutron-тағы теңгергіш `my-load-balancer` деп аталса, онда `my-load-balancer-sprut` атауын пайдалана аласыз.
    - **Желі**: мақсатты SDN Sprut атауы.
    - Қалған параметрлерді әдепкі мәндерде қалдырыңыз.

1. [Теңгерімдеу ережелерін жасаңыз](/kz/networks/balancing/instructions/manage-rules#balancing-manage-rules-add) және олардың параметрлерін SDN Neutron-тағы бастапқы теңгергіштен көшіріңіз.
1. [Бастапқы жүктеме теңгергішін жойыңыз](/kz/networks/balancing/instructions/manage-lb#balancing-manage-lb-delete), егер ол енді қажет болмаса.

Сондай-ақ теңгергіштерді келесі тәсілдермен көшіруге болады:

* Манифест сипаттамасында SDN Sprut-ты көрсетіп, Terraform көмегімен теңгергішті [қайта жасаңыз](/kz/tools-for-using-services/terraform/how-to-guides/vnet/lb#terraform-lb-create), ал виртуалды машиналарды олардың көші-қонынан кейін қосыңыз.
* Қажетті жобаға желі арқылы қолжетімділігі бар және сізде әкімші рөлі бар кез келген машинада теңгергіштерді көшіру үшін [VK Cloud скриптін](https://github.com/vk-cs/neutron-2-sprut/blob/guide_v3/copy-lb-to-sprut-net.sh) іске қосыңыз.
