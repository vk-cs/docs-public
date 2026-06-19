# {heading(Подключите блочный диск к виртуальной машине)[id=onboarding-vm-add-disk]}

Эта инструкция познакомит вас с одной из возможностей сервиса [Cloud Servers](/ru/computing/iaas) — управлением [дисками блочного хранения](/ru/computing/iaas/concepts/data-storage/disk-types).

Пройдя все шаги этой инструкции, вы создадите блочный диск и подключите его к виртуальной машине.

## {heading(Подготовительные шаги)[id=onboarding-vm-add-disk-prepare]}

1. {linkto(../../../../intro/onboarding/quick-start/create-vm#onboarding-create-vm)[text=Cоздайте]} виртуальную машину.
1. Убедитесь, что баланс лицевого счета положительный, а {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]} достаточно для создания диска.

## {heading({counter(disk)}. Создайте диск)[id=onboarding-vm-add-disk-add]}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Облачные вычисления** → **Диски**.
1. Над списком дисков нажмите кнопку **Создать диск**.

{include(../../../../_includes/_disk_params.md)[tags=quick-start]}

1. Нажмите кнопку **Создать диск**.

## {heading(Удалите неиспользуемые ресурсы)[id=onboarding-vm-add-disk-delete]}

Работающие ВМ и диски потребляют вычислительные ресурсы. Если они вам больше не нужны:

- {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-start-stop-restart)[text=остановите]} созданную ВМ, чтобы воспользоваться ею позже, или {linkto(../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-delete)[text=удалите]} ее навсегда;
- {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-delete)[text=удалите]} созданный диск.