### Перед началом работы

1. Создайте ВМ из публичного образа Linux. В пример образ Ubuntu 18.04.
2. Подключитесь к ВМ по SSH.
3. Установите на ВМ:

- [Go не ниже версии 1.17](https://go.dev/doc/install):

```yaml
wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz
tar -xzf go1.17.6.linux-amd64.tar.gz
export PATH=$PWD/go/bin:$PATH
```

- Git:

```yaml
sudo apt install git
```

- [Fluent-bit](https://docs.fluentbit.io/manual/installation/linux/ubuntu):

```yaml
sudo apt install ca-certificates
sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
Build-essential
sudo apt install build-essential
```

4. [Подключите fluent-bit плагин](/manage/logging/start/connect-plugin).
