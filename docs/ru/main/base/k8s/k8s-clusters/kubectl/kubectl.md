Инструмент командной строки Kubernetes `kubectl` позволяет запускать команды в кластерах Kubernetes.

`kubectl` можно использовать для развертывания приложений, проверки и управления ресурсами кластера, а также для просмотра логов.

Полный список операций, которые можно выполнить с помощью `kubectl`, доступен в [официальной документации](https://kubernetes.io/docs/reference/kubectl/overview/).

<warn>

При использовании версий kubectl v1.23 и выше, вам необходимо ввести пароль при подключении. Чтобы воспользоваться автоматическим вводом пароля, его можно указать в файле настройки подключения kubeconfig. Подробнее о файле kubeconfig можно узнать [здесь](/base/k8s/k8s-start/connect-k8s#import-konfiguracii).

</warn>

## Установка kubectl

<tabs>
<tablist>
<tab>Linux (curl)</tab>
<tab>Linux (apt)</tab>
<tab>Linux (yum)</tab>
<tab>macOS (curl)</tab>
<tab>macOS (Homebrew)</tab>
<tab>Windows (установка вручную)</tab>
<tab>Windows (Powershell Gallery)</tab>
</tablist>
<tabpanel>

1. Загрузите последнюю версию:

   ```bash
   curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/kubectl
   ```

1. Сделайте двоичный файл `kubectl` исполняемым:

   ```bash
   chmod +x ./kubectl
   ```

1. Поместите этот файл в директорию, которая пристуствует в переменной окружения `PATH`, например, в `/usr/local/bin`:

   ```bash
   sudo mv ./kubectl /usr/local/bin/kubectl
   ```

</tabpanel>
<tabpanel>

1. Подключите репозиторий Kubernetes:

   ```bash
   sudo apt-get update && sudo apt-get install -y apt-transport-https
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
   sudo apt-get update
   ```

1. Установите `kubectl`:

   ```bash
   sudo apt-get install -y kubectl
   ```

</tabpanel>
<tabpanel>

1. Подключите репозиторий Kubernetes:

   ```bash
   cat <<EOF > /etc/yum.repos.d/kubernetes.repo
   [kubernetes]
   name=Kubernetes
   baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
   EOF
   ```

1. Установите `kubectl`:

   ```bash
   yum install -y kubectl
   ```

</tabpanel>
<tabpanel>

1. Загрузите последнюю версию:

   ```bash
   curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
   ```

1. Сделайте двоичный файл `kubectl` исполняемым:

   ```bash
   chmod +x ./kubectl
   ```

1. Поместите этот файл в директорию, которая пристуствует в переменной окружения `PATH`, например, в `/usr/local/bin`:

   ```bash
   sudo mv ./kubectl /usr/local/bin/kubectl
   ```

</tabpanel>
<tabpanel>

Выполните одну из команд установки:

```bash
brew install kubectl
```

Или:

```bash
brew install kubernetes-cli
```

</tabpanel>
<tabpanel>

1. Загрузите последнюю версию v1.24.2 по [ссылке](https://storage.googleapis.com/kubernetes-release/release/v1.24.2/bin/windows/amd64/kubectl.exe).

1. В переменной окружения `PATH` укажите директорию, куда был загружен `kubectl.exe`:

   1. Перейдите **Пуск->Этот компьютер->Свойства->Дополнительные параметры системы->Переменные среды->Системные переменные**.
   1. Измените значение переменной `PATH`, добавив путь к директории с `kubectl.exe`.

   <info>

   **Примечание**

   Docker Desktop for Windows добавляет собственную версию kubectl в переменную окружения `PATH`. Если установлен Docker Desktop, необходимо поместить путь к установленному двоичному файлу перед записью, добавленной установщиком Docker Desktop, либо же удалить вовсе kubectl, поставляемый вместе с Docker Desktop.

   </info>

</tabpanel>
<tabpanel>

При использовании менеджера пакетов Powershell Gallery в Windows, можно установить и обновить `kubectl` с помощью Powershell.

Выполните следующие команды для установки:

```powershell
Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>]
```

<info>

**Примечание**

- Если не указать аргумент `-DownloadLocation`, то `kubectl` будет установлен во временную директорию пользователя.
- Установщик создаст директорию `$HOME/.kube` вместе с конфигурационным файлом.
- Обновить `kubectl` можно путём повторного выполнения указанных команд.

</info>

</tabpanel>
</tabs>

Чтобы убедиться, что установлен `kubectl` требуемой версии, выполните команду:

```bash
kubectl version --client
```
