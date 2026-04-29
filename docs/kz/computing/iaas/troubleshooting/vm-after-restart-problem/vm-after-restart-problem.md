{include(/kz/_includes/_translated_by_ai.md)}

Виртуалды машинаны қайта жүктегеннен кейін желіге қолжетімділік жоғалды.

Қате әртүрлі себептерден туындауы мүмкін.

### Шешім

[Тексеріңіз](/kz/computing/iaas/how-to-guides/interface-settings-check#2_vm_zhelilik_interfeysin_baptanyz) ОС ішіндегі желілік интерфейс баптауларын (`netplan` немесе `ifcfg` конфигурация файлдары). Интерфейс DHCP арқылы IP мекенжайын алмауы немесе интерфейс атауы өзгеруі мүмкін.

Төтенше жағдайларда және желі арқылы виртуалды машинаға қосылу болмаған кезде [VNC-консольді](/kz/computing/iaas/instructions/vm/vm-console) пайдаланыңыз.
