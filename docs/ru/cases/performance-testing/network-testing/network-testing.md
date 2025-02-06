Показатели производительности сетевых интерфейсов зависят от [зоны](/ru/intro/start/concepts/architecture#az), в которой находятся взаимодействующие ВМ. Поэтому необходимо сравнивать параметры сетевого взаимодействия сначала между ВМ внутри одной зоны, а затем между ВМ в разных зонах.

Для тестирования будет использована утилита [iPerf](https://iperf.fr/) и будут созданы три ВМ:
- основная тестовая ВМ — клиент;
- дополнительная ВМ в той же зоне доступности, что и тестовая ВМ — сервер;
- дополнительная ВМ в другой зоне доступности  — еще один сервер.

Чтобы оценить максимальную производительность сети, включите механизм множества очередей (multiqueue), а также используйте SDN [Sprut](/ru/networks/vnet/concepts/sdn#sprut).

## Подготовительные шаги

{include(/ru/_includes/_testing_preparatory.md)}

## 1. Создайте дополнительные ВМ

При тестировании межсетевого взаимодействия дополнительные виртуальные машины выполняют роль серверов.

1. [Создайте](/ru/computing/iaas/service-management/vm/vm-create) виртуальную машину со следующими параметрами:

    * **Зона доступности**: выберите ту же зону доступности, что и у основной тестируемой ВМ.
    * **Сеть**: выберите ту же SDN Sprut, что и у основной тестируемой ВМ.

    Остальные параметры выберите такими же, как и у основной тестируемой ВМ.

1. [Создайте](/ru/computing/iaas/service-management/vm/vm-create) ещё одну виртуальную машину со следующими параметрами:

    * **Зона доступности**: выберите другую зону доступности, что и у основной тестируемой ВМ.
    * **Сеть**: выберите ту же SDN Sprut, что и у основной тестируемой ВМ.

    Остальные параметры выберите такими же, как и у основной тестируемой ВМ.

1. [Подключитесь](/ru/computing/iaas/service-management/vm/vm-connect/vm-connect-nix) к дополнительным ВМ.

## 2. Определите IP-адреса всех ВМ

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. В разделе **Облачные вычисления → Виртуальные машины** нажмите на имя нужной ВМ.
1. На странице ВМ перейдите на вкладку **Сети**.
1. Запишите IP-адреса основной тестовой и дополнительных ВМ. Они понадобятся вам позже.

## 3. Подготовьте ВМ к тестированию

1. Установите утилиту iPerf на тестовой и дополнительных виртуальных машинах с попомощью команды:
    
    ```bash
    sudo apt install iperf3
    ```

1. На тестовой ВМ [подключите](/ru/computing/iaas/how-to-guides/vm-multiqueue) механизм множества очередей самостоятельно, либо обратитесь в [техническую поддержку](/ru/contacts), указав в обращении [ID виртуальной машины](/ru/computing/iaas/service-management/vm/vm-manage#poluchenie_id_virtualnoy_mashiny).
1. На дополнительных ВМ выполните команду для запуска серверной части утилиты iPerf:

    ```bash
    iperf3 -s
    ```

## 4. Выполните тестирование однопоточного межсетевого взаимодействия

Вы можете протестировать однопоточное межсетевое взаимодействие с помощью готового скрипта `iperf3_single` от VK Cloud.

<details>
<summary>iperf3_single.sh</summary>

```bash
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
</details>

1. Протестируйте взаимодействие внутри одной зоны. Для этого на тестовой ВМ запустите скрипт `iperf3_single`, заменив следующие параметры в коде скрипта:

    * `<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>` — имя файла для сохранения результата тестирования, например `test_collection_output_single1` для однопоточного запуска внутри одной зоны. По умолчанию файл сохраняется в директории запуска скрипта.
    * `<IP_ТЕСТОВОЙ_ВМ>` — IP-адрес тестовой ВМ, на которой запускается скрипт.
    * `<IP_СЕРВЕРНОЙ_ВМ>` — IP-адрес дополнительной ВМ (в той же зоне), выполняющей роль сервера.

3. Протестируйте взаимодействие между различными зонами. Для этого на тестовой ВМ запустите скрипт `iperf3_single`, заменив следующие параметры в коде скрипта:

    * `<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>` — имя файла для сохранения результата тестирования, например `test_collection_output_single2` для однопоточного запуска между разными зонами. По умолчанию файл сохраняется в директории запуска скрипта.
    * `<IP_СЕРВЕРНОЙ_ВМ>` — IP-адрес дополнительной ВМ (в другой зоне), выполняющей роль сервера.

## 5. Выполните тестирование многопоточного межсетевого взаимодействия

Вы можете протестировать многопоточное межсетевое взаимодействие с помощью готового скрипта `iperf3_multi` от VK Cloud.

<details>
<summary>iperf3_multi.sh</summary>

```bash
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
</details>

1. Протестируйте взаимодействие внутри одной зоны. Для этого на тестовой ВМ запустите скрипт `iperf3_multi`, заменив следующие параметры в коде скрипта:

    * `<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>` — имя файла для сохранения результата тестирования, например `test_collection_output_multi1` для многопоточного запуска внутри одной зоны. По умолчанию файл сохраняется в директории запуска скрипта.
    * `<IP_ТЕСТОВОЙ_ВМ>` — IP-адрес тестовой ВМ, на которой запускается скрипт.
    * `<IP_СЕРВЕРНОЙ_ВМ>` — IP-адрес дополнительной ВМ (в той же зоне), выполняющей роль сервера.

1. Протестируйте многопоточное взаимодействие между различными зонами. Для этого на тестовой ВМ запустите скрипт `iperf3_multi`, заменив следующие параметры в коде скрипта:

    * `<ИМЯ_ФАЙЛА_С_РЕЗУЛЬТАТОМ>` — имя файла для сохранения результата тестирования, например `test_collection_output_multi2` для многопоточного запуска между разными зонами. По умолчанию файл сохраняется в директории запуска скрипта.
    * `<IP_СЕРВЕРНОЙ_ВМ>` — IP-адрес дополнительной ВМ (в другой зоне), выполняющей роль сервера.

## 6. Зафиксируйте результаты тестирования

Полученные результаты занесите в [таблицу](../assets/network_testing.xlsx "download") и сравните скорость передачи данных (параметр `Bitrate (Gbit/s)`) между двумя ВМ в одной и в разных зонах.

Теперь вы можете сравнить эти данные с производительностью других облачных платформ.

<warn>

Чтобы сравнение производительности было объективным, используйте одинаковые методики тестирования на всех интересующих платформах.

</warn>


## Удалите неиспользуемые ресурсы

Созданные ресурсы тарифицируются. Если они вам больше не нужны, удалите их:

1. [Удалите](/ru/computing/iaas/service-management/vm/vm-manage#delete_vm) тестовую и дополнительные ВМ.
1. Удалите [подсети](/ru/networks/vnet/service-management/net#udalenie_podseti) и [сети](/ru/networks/vnet/service-management/net#udalenie_seti), в которых были размещены ВМ.
