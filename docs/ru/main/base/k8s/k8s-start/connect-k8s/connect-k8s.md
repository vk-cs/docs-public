## Описание

Инструмент командной строки Kubernetes kubectl позволяет запускать команды для кластеров Kubernetes. kubectl можно использовать для развертывания приложений, проверки и управления ресурсов кластера, а также для просмотра логов. Полный список операций kubectl доступен в [официальной документации kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).

## Подготовка к работе

Используемая мажорная версия kubectl не должна отличаться от той, которая используется в кластере. Например, версия v1.19 может работать с версиями v1.16 и v1.15. Использование последней версии kubectl поможет избежать непредвиденных проблем.

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

1. Загрузить последнюю версию:

    ```bash
    curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/kubectl
    ```

1. Сделать двоичный файл kubectl исполняемым:

    ```bash
    chmod +x ./kubectl
    ```

1. Переместить двоичный файл в директорию из переменной окружения PATH:

    ```bash
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```

</tabpanel>
<tabpanel>

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

</tabpanel>
<tabpanel>

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
yum install -y kubectl
```

</tabpanel>
<tabpanel>

1. Загрузить последнюю версию:

    ```bash
    curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
    ```

1. Сделать двоичный файл kubectl исполняемым:

    ```bash
    chmod +x ./kubectl
    ```

1. Переместить двоичный файл в директорию из переменной окружения PATH:

    ```bash
    sudo mv ./kubectl /usr/local/bin/kubectl
    ```

</tabpanel>
<tabpanel>

Выполнить одну из команд установки:

```bash
brew install kubectl
```

Или:

```bash
brew install kubernetes-cli
```

</tabpanel>
<tabpanel>

1.  Загрузить последнюю версию v1.24.2 по [ссылке](https://storage.googleapis.com/kubernetes-release/release/v1.24.2/bin/windows/amd64/kubectl.exe).

1.  Указать директорию с двоичным файлом, куда произвелась загрузка, в переменную окружения PATH: "Пуск->Этот компьютер->Свойства->Дополнительные параметры системы->Переменные среды->Системные переменные->PATH"

    <info>

    **Примечание**

    Docker Desktop for Windows добавляет собственную версию kubectl в переменную окружения PATH. Если установлен Docker Desktop, необходимо поместить путь к установленному двоичному файлу перед записью, добавленной установщиком Docker Desktop, либо же удалить вовсе kubectl, поставляемый вместе с Docker Desktop.

    </info>

</tabpanel>
<tabpanel>

При использовании менеджера пакетов Powershell Gallery в Windows, можно установить и обновить kubectl с помощью Powershell.

Выполнить команды по установке:

```powershell
Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>]
```

<info>

**Примечание**

-   Если не указать аргумент  `-DownloadLocation`, то kubectl будет установлен во временную директорию пользователя.
-   Установщик создаст директорию `$HOME/.kube` вместе с конфигурационным файлом.
-   Обновить kubectl можно путём выполнения двух команд, перечисленных в шаге 1.

</info>

</tabpanel>
</tabs>

Чтобы убедиться, что установлен kubectl требуемой версии, нужно выполнить команду:

```bash
kubectl version --client
```

## Импорт конфигурации

Чтобы kubectl мог найти и получить доступ к кластеру Kubernetes, необходим конфигурационный файл kubeconfig, который создаётся автоматически при создании кластера и загружается на локальный компьютер из панели VK CS. Чтобы импортировать конфигурационный файл \*.yaml, нужно выполнить команду:

<tabs>
<tablist>
<tab>Linux, macOS</tab>
<tab>Windows (PowerShell)</tab>
</tablist>
<tabpanel>

```bash
export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config
```

</tabpanel>
<tabpanel>

```powershell
$Env:KUBECONFIG="$Env:KUBECONFIG;$HOME\.kube\config"
```

</tabpanel>
</tabs>

## Подключение к кластеру

Посмотреть на состояние кластера, чтобы убедиться, что kubectl правильно сконфигурирован можно при помощи команды:

```
kubectl cluster-info
```

Если в результате выполнения команды виден URL-ответ, значит kubectl корректно настроен для работы с кластером.

Если появляется следующее сообщение, то значит kubectl настроен некорректно или не может подключиться к кластеру Kubernetes:

```
The connection to the server <server-name:port> was refused - did you specify the right host or port?
```

Если команда `kubectl cluster-info` возвращает URL-ответ, но подключиться к своему кластеру не удается, следует воспользоваться командой:

```
kubectl cluster-info dump
```
