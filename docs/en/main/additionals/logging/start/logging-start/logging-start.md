### Before starting work

1. Create a VM from a public Linux image.
2. Connect to the VM via SSH.
3. Install on the VM:

- [Go at least version 1.17](https://go.dev/doc/install):

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

4. [Connect fluent-bit plugin](/additionals/logging/start/connect-plugin).
