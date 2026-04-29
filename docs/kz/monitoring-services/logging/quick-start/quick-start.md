{include(/kz/_includes/_translated_by_ai.md)}

1. Сервисті қосыңыз: егер сервис бета-тестілеу кезеңінде болса, [техникалық қолдауға](/kz/contacts) сұрау жіберіңіз.
1. Интернетке қолжетімділігі бар жария Linux бейнесінен [ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create). Мысалда Ubuntu 22.04 бейнесі қолданылады.
1. [ВМ-ге SSH арқылы қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. ВМ-ге 2.1.9 нұсқасындағы [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) орнатыңыз:

   ```console
   curl https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```

1. [Генерациялаңыз](../instructions/generate-userdata) сервиске қосылу үшін есептік деректерді.
1. [Орнатып, баптаңыз](../instructions/connect-plugin) `vkcloudlogs-fluent-bit-plugin` плагинін.
