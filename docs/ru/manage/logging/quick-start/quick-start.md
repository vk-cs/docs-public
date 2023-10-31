1. Создайте ВМ из публичного образа Linux. В примере используется образ Ubuntu 18.04.
2. [Подключитесь к ВМ по SSH](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix).
3. Установите на ВМ:

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

4. [Подключите fluent-bit плагин](/ru/manage/logging/start/connect-plugin).
