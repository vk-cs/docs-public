{include(/kz/_includes/_translated_by_ai.md)}

Желілік интерфейстердің өнімділік көрсеткіштері өзара әрекеттесетін ВМ орналасқан [аймаққа](/kz/start/concepts/architecture#az) байланысты. Сондықтан желілік өзара әрекеттесу параметрлерін алдымен бір аймақтың ішіндегі ВМ арасында, содан кейін әртүрлі аймақтардағы ВМ арасында салыстыру қажет.

Тестілеу үшін [iPerf](https://iperf.fr/) утилитасы пайдаланылады және үш ВМ жасалады:

- негізгі тестілік ВМ — клиент;
- тестілік ВМ-мен бір қолжетімділік аймағындағы қосымша ВМ — сервер;
- басқа қолжетімділік аймағындағы қосымша ВМ — тағы бір сервер.

## Дайындық қадамдары

{include(/kz/_includes/_testing_preparatory.md)}

## 1. Қосымша ВМ жасаңыз

Желілік өзара әрекеттесуді тестілеу кезінде қосымша виртуалды машиналар сервер рөлін атқарады.

1. [Жасаңыз](/kz/computing/iaas/instructions/vm/vm-create) келесі параметрлері бар виртуалды машинаны:

    * **Қолжетімділік аймағы**: негізгі тестіленетін ВМ-дегімен бірдей қолжетімділік аймағын таңдаңыз.
    * **Желі**: негізгі тестіленетін ВМ-дегімен бірдей SDN Sprut таңдаңыз.

   Қалған параметрлерді негізгі тестіленетін ВМ-дегідей таңдаңыз.

1. [Жасаңыз](/kz/computing/iaas/instructions/vm/vm-create) келесі параметрлері бар тағы бір виртуалды машинаны:

    * **Қолжетімділік аймағы**: негізгі тестіленетін ВМ-дегіден басқа қолжетімділік аймағын таңдаңыз.
    * **Желі**: негізгі тестіленетін ВМ-дегімен бірдей SDN Sprut таңдаңыз.

   Қалған параметрлерді негізгі тестіленетін ВМ-дегідей таңдаңыз.

1. [Қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix) қосымша ВМ-дерге.

## 2. Барлық ВМ-нің IP-мекенжайларын анықтаңыз

1. [Өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
1. **Бұлттық есептеулер → Виртуалды машиналар** бөлімінде қажетті ВМ атауын басыңыз.
1. ВМ бетінде **Желілер** қойындысына өтіңіз.
1. Негізгі тестілік және қосымша ВМ-дердің IP-мекенжайларын жазып алыңыз. Олар сізге кейін қажет болады.

## 3. ВМ-ді тестілеуге дайындаңыз

1. Тестілік және қосымша виртуалды машиналарға iPerf утилитасын келесі команданың көмегімен орнатыңыз:

    ```console
    sudo apt install iperf3
    ```

1. Қосымша ВМ-дерде iPerf утилитасының серверлік бөлігін іске қосу үшін келесі команданы орындаңыз:

    ```console
    iperf3 -s
    ```

## 4. Бір ағынды желілік өзара әрекеттесуді тестілеуді орындаңыз

Сіз бір ағынды желілік өзара әрекеттесуді VK Cloud ұсынған дайын `iperf3_single` скриптінің көмегімен тестілей аласыз.

{cut(iperf3_single.sh)}

```console
#!/bin/bash

# List of values for bs
thread_values=(1)

# Output file
output_file="<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>.txt"

# Servers
sprut_vm2_AZ1=<IP_ТЕСТОВОЙ_ВМ>
sprut_vm1_AZ2=<IP_СЕРВЕРНОЙ_ВМ>

for thread in "${thread_values[@]}"
do
# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do
# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
for thread in "${thread_values[@]}"
do
# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do
# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
```

{/cut}

1. Бір аймақтың ішінде өзара әрекеттесуді тестілеңіз. Ол үшін тестілік ВМ-де `iperf3_single` скриптін іске қосып,
   скрипт кодындағы келесі параметрлерді ауыстырыңыз:

    * `<НӘТИЖЕ_ФАЙЛЫНЫҢ_АТАУЫ>` — тестілеу нәтижесін сақтауға арналған файл атауы, мысалы,
      бір аймақ ішіндегі бір ағынды іске қосу үшін `test_collection_output_single1`. Әдепкі бойынша файл
      скрипт іске қосылған директорияда сақталады.
    * `<ТЕСТІЛІК_ВМ_IP>` — скрипт іске қосылатын тестілік ВМ-нің IP-мекенжайы.
    * `<СЕРВЕРЛІК_ВМ_IP>` — сервер рөлін атқаратын қосымша ВМ-нің (сол аймақтағы) IP-мекенжайы.

3. Әртүрлі аймақтар арасындағы өзара әрекеттесуді тестілеңіз. Ол үшін тестілік ВМ-де `iperf3_single` скриптін іске қосып,
   скрипт кодындағы келесі параметрлерді ауыстырыңыз:

    * `<НӘТИЖЕ_ФАЙЛЫНЫҢ_АТАУЫ>` — тестілеу нәтижесін сақтауға арналған файл атауы, мысалы,
       әртүрлі аймақтар арасындағы бір ағынды іске қосу үшін `test_collection_output_single2`. Әдепкі бойынша файл
       скрипт іске қосылған директорияда сақталады.
    * `<СЕРВЕРЛІК_ВМ_IP>` — сервер рөлін атқаратын қосымша ВМ-нің (басқа аймақтағы) IP-мекенжайы.

## 5. Көп ағынды желілік өзара әрекеттесуді тестілеуді орындаңыз

Сіз көп ағынды желілік өзара әрекеттесуді VK Cloud ұсынған дайын `iperf3_multi` скриптінің көмегімен тестілей аласыз.

{cut(iperf3_multi.sh)}

```console
#!/bin/bash

# List of values for bs
thread_values=(2 4 8 16)

# Output file
output_file="<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>.txt"

# Servers
sprut_vm2_AZ1=<IP_ТЕСТОВОЙ_ВМ>
sprut_vm1_AZ2=<IP_СЕРВЕРНОЙ_ВМ>

for thread in "${thread_values[@]}"
do
# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do
# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm2_AZ1 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
for thread in "${thread_values[@]}"
do
# Transmit from AZ1 to AZ2
echo "Executing transmit test from AZ1 to AZ2 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done

for thread in "${thread_values[@]}"
do
# Receive from AZ2 to AZ1
echo "Executing receive test from AZ2 to AZ1 in $thread thread(s)" >> "$output_file"
iperf3 -c $sprut_vm1_AZ2 -P $thread -t 10 -R --logfile "$output_file"
echo "#" >> "$output_file"
echo "#" >> "$output_file"
done
```

{/cut}

1. Бір аймақтың ішінде өзара әрекеттесуді тестілеңіз. Ол үшін тестілік ВМ-де `iperf3_multi` скриптін іске қосып,
   скрипт кодындағы келесі параметрлерді ауыстырыңыз:

    * `<НӘТИЖЕ_ФАЙЛЫНЫҢ_АТАУЫ>` — тестілеу нәтижесін сақтауға арналған файл атауы, мысалы,
       бір аймақ ішіндегі көп ағынды іске қосу үшін `test_collection_output_multi1`. Әдепкі бойынша файл
       скрипт іске қосылған директорияда сақталады.
    * `<ТЕСТІЛІК_ВМ_IP>` — скрипт іске қосылатын тестілік ВМ-нің IP-мекенжайы.
    * `<СЕРВЕРЛІК_ВМ_IP>` — сервер рөлін атқаратын қосымша ВМ-нің (сол аймақтағы) IP-мекенжайы.

1. Әртүрлі аймақтар арасындағы көп ағынды өзара әрекеттесуді тестілеңіз. Ол үшін тестілік ВМ-де
   `iperf3_multi` скриптін іске қосып, скрипт кодындағы келесі параметрлерді ауыстырыңыз:

    * `<НӘТИЖЕ_ФАЙЛЫНЫҢ_АТАУЫ>` — тестілеу нәтижесін сақтауға арналған файл атауы, мысалы,
       әртүрлі аймақтар арасындағы көп ағынды іске қосу үшін `test_collection_output_multi2`. Әдепкі бойынша файл
       скрипт іске қосылған директорияда сақталады.
    * `<СЕРВЕРЛІК_ВМ_IP>` — сервер рөлін атқаратын қосымша ВМ-нің (басқа аймақтағы) IP-мекенжайы.

## 6. Тестілеу нәтижелерін тіркеңіз

Алынған нәтижелерді [кестеге](../assets/network_testing.xlsx "download") енгізіңіз және бір аймақтағы және әртүрлі аймақтардағы екі ВМ арасындағы
деректерді беру жылдамдығын (`Bitrate (Gbit/s)` параметрі) салыстырыңыз.

Енді сіз бұл деректерді басқа бұлттық платформалардың өнімділігімен салыстыра аласыз.

{note:warn}

Өнімділікті салыстыру объективті болуы үшін, сізді қызықтыратын барлық
платформаларда бірдей тестілеу әдістемелерін пайдаланыңыз.

{/note}

## Пайдаланылмайтын ресурстарды жойыңыз

Жасалған ресурстар тарифтелмейді. Егер олар енді қажет болмаса, оларды жойыңыз:

1. [Жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm) тестілік және қосымша ВМ-дерді.
1. ВМ орналастырылған [ішкі желілерді](/kz/networks/vnet/instructions/net#ishki_zhelini_zhoyu) және [желілерді](/kz/networks/vnet/instructions/net#zhelini_zhoyu) жойыңыз.
