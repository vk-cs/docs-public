# {heading(ВМ трафикті қайта бағыттамайды)[id=iaas-vm-no-traffic]}

{include(/kz/_includes/_translated_by_ai.md)}

Виртуалды машина желінің аралық торабы (маршрутизатор немесе VPN-шлюз) болып табылады, бірақ трафикті қайта бағыттамайды.

Мәселе трафикті өткізуге рұқсат етілген IP мекенжайлары бапталмаған болса туындауы мүмкін ([IP Source Guard](/kz/networks/vnet/concepts/traffic-limiting#vnet-traffic-limiting-source-guard)).

### {heading(Шешімі)[id=iaas-vm-no-traffic-decision]}

1. ВМ порттарының және осы порттар үшін рұқсат етілген IP мекенжайларының тізімін алыңыз:

   ```console
   openstack port list --server <ID_ВМ>
   ```

1. Өз желілерінен трафик өткізуі тиіс порттар үшін [IP Source Guard параметрін баптаңыз](/kz/networks/vnet/instructions/ports#vnet-ports-ip-source-guard-manage).

   Егер порт арқылы өтетін бүкіл трафикке рұқсат беру қажет болса, командада порт ішкі желісінің IP мекенжайын CIDR форматында көрсетіңіз. 

   `10.0.0.0/24` ішкі желісі және `09a44805-3bb9-422d-bd86-82afcd17b9d6` порты үшін мысал:

   ```console
   openstack port set 09a44805-3bb9-422d-bd86-82afcd17b9d6 --allowed-address ip-address=10.0.0.0/24
   ```

1. Егер рұқсат етілген IP мекенжайларын баптағаннан кейін мәселе сақталса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).
