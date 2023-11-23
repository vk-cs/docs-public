1. Подключите сервис: если сервис на этапе бета-тестирования, отправьте запрос в [техническую поддержку](/ru/contacts).
1. Создайте ВМ из публичного образа Linux с доступом в интернет. В примере используется образ Ubuntu 18.04.
1. [Подключитесь к ВМ по SSH](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Установите на ВМ:

   - [Go не ниже версии 1.17](https://go.dev/doc/install):

     ```bash
     wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz
     tar -xzf go1.17.6.linux-amd64.tar.gz
     export PATH=$PWD/go/bin:$PATH
     ```

   - Git:

     ```bash
     sudo apt install git
     ```

   - [Fluent-bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu):

     ```bash
     sudo apt install ca-certificates
     sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
     Build-essential
     sudo apt install build-essential
     ```

1. Сгенерируйте учетные данные для подключения к сервису:

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Перейдите в раздел **Мониторинг** → **Логирование**.
   1. Нажмите кнопку **Настройки**.
   1. Перейдите на вкладку **Генерация учетных данных**.
   1. Нажмите кнопку **Сгенерировать**.
   1. Сохраните полученные учетные данные.

1. [Подключите](../instructions/connect-plugin/) плагин `cloudlogs-fluent-bit`.
