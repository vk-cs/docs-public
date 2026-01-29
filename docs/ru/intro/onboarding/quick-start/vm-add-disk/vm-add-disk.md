Эта инструкция познакомит вас с одной из возможностей сервиса [Cloud Servers](/ru/computing/iaas) — управлением [дисками блочного хранения](/ru/computing/iaas/concepts/data-storage/disk-types).

Пройдя все шаги этой инструкции, вы создадите блочный диск и подключите его к виртуальной машине.

## Подготовительные шаги

1. [Создайте](/ru/intro/onboarding/quick-start/create-vm#1_sozdayte_vm) виртуальную машину.
1. Убедитесь, что баланс лицевого счета положительный, а [квот](/ru/tools-for-using-services/account/concepts/quotasandlimits) достаточно для создания диска.

## {counter(disk)}. Создайте диск

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. Над списком дисков нажмите кнопку **Создать диск**.

{include(/ru/_includes/_disk_params.md)[tags=quick-start]}

1. Нажмите кнопку **Создать диск**.

## Удалите неиспользуемые ресурсы

Работающие ВМ и диски потребляют вычислительные ресурсы. Если они вам больше не нужны:

- [остановите](/ru/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm) созданную ВМ, чтобы воспользоваться ею позже, или [удалите](/ru/computing/iaas/instructions/vm/vm-manage#delete_vm) ее навсегда;
- [удалите](/ru/computing/iaas/instructions/volumes/volumes-manage#delete_volume) созданный диск.