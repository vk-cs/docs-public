1. Подключите сервис: если сервис на этапе бета-тестирования, отправьте запрос в [техническую поддержку](/ru/contacts).
1. [Создайте ВМ](/ru/computing/iaas/instructions/vm/vm-create) из публичного образа Linux с доступом в интернет. В примере используется образ Ubuntu 22.04.
1. [Подключитесь к ВМ по SSH](/ru/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Установите на ВМ [Fluent Bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu) версии 2.1.9:

   ```console
   curl https://cloudlogging.hb.ru-msk.vkcloud-storage.ru/fluent-bit-install-scripts/install.sh | FLUENT_BIT_RELEASE_VERSION=2.1.9 sh
   ```

1. [Сгенерируйте](../instructions/generate-userdata) учетные данные для подключения к сервису.
1. [Установите и настройте](../instructions/connect-plugin) плагин `vkcloudlogs-fluent-bit-plugin`.
