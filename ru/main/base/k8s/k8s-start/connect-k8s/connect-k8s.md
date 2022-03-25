Описание
--------

Инструмент командной строки Kubernetes kubectl позволяет запускать команды для кластеров Kubernetes. kubectl можно использовать для развертывания приложений, проверки и управления ресурсов кластера, а также для просмотра логов. Полный список операций kubectl доступен в [официальной документации kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).

Подготовка к работе
-------------------

Используемая мажорная версия kubectl не должна отличаться от той, которая используется в кластере. Например, версия v1.19 может работать с версиями v1.16 и v1.15. Использование последней версии kubectl поможет избежать непредвиденных проблем.

Установка kubectl
-----------------

Для Linux

**С помощью curl**

Загрузить последнюю версию:
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/\`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt\`/bin/linux/amd64/kubectl
```

Сделать двоичный файл kubectl исполняемым:

```
chmod +x ./kubectl
```

Переместить двоичный файл в директорию из переменной окружения PATH:

```
sudo mv ./kubectl /usr/local/bin/kubectl
```

Убедиться, что установлена последняя версия:

```
kubectl version --client
```

**С помощью пакетного менеджера**

Для Ubuntu, Debian и HypriotOS

```
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

Для CentOS, RHEL и Fedora

```
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

Для MacOS

**С помощью curl**

Загрузить последнюю версию:
```
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl"
```

Сделать двоичный файл kubectl исполняемым:

```
chmod +x ./kubectl
```

Переместить двоичный файл в директорию из переменной окружения PATH:

```
sudo mv ./kubectl /usr/local/bin/kubectl
```

Убедиться, что установлена последняя версия:

```
kubectl version --client
```

**С помощью Homebrew**

Выполнить команду установки:

```
brew install kubectl
```

Или:

```
brew install kubernetes-cli
```

Убедиться, что установлена последняя версия:

```
kubectl version --client
```

Для Windows

**С помощью стандартных средств**

1.  Загрузить последнюю версию v1.19.0 по [ссылке](https://storage.googleapis.com/kubernetes-release/release/v1.19.0/bin/windows/amd64/kubectl.exe).
2.  Указать директорию с двоичным файлом, куда произвелась установка, в переменную окружения PATH: "Пуск->Этот компьютер->Свойства->Дополнительные параметры системы->Переменные среды->Системные переменные->PATH"
3.  Убедиться, что версия kubectl совпадает загружённой:

```
kubectl version --client
```

**Примечание**

Docker Desktop for Windows добавляет собственную версию kubectl в переменную окружения PATH. Если установлен Docker Desktop, необходимо поместить путь к установленному двоичному файлу перед записью, добавленной установщиком Docker Desktop, либо же удалить вовсе kubectl, поставляемый вместе с Docker Desktop.

**С помощью PowerShell из PSGallery**

При использовании менеджера пакетов Powershell Gallery в Windows, можно установить и обновить kubectl с помощью Powershell.

Выполнить команды по установке (обязательно указать DownloadLocation):

```
Install-Script -Name install-kubectl -Scope CurrentUser -Force
install-kubectl.ps1 [-DownloadLocation <path>]
```

**Примечание**

Если вы не указать DownloadLocation, то kubectl будет установлен во временную директорию пользователя.

Установщик создаст $HOME/.kube вместе с конфигурационным файлом.

Убедиться, что установлена последняя версия:

```
kubectl version --client
```

**Примечание**

Обновить kubectl можно путём выполнения двух команд, перечисленных в шаге 1.

Импорт конфигурации
-------------------

Чтобы kubectl мог найти и получить доступ к кластеру Kubernetes, необходим конфигурационный файл kubeconfig, который создаётся автоматически при создании кластера и загружается на локальный компьютер из панели VK CS. Импорт конфигурационного файла \*.yaml осуществляется с помощью команды

```
export KUBECONFIG=<путь к файлу>
```

Для **Linux** это будет выглядеть так:

```
export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config
```

Для **Windows PowerShell** так: 

```
$Env:KUBECONFIG="$Env:KUBECONFIG;$HOME\.kube\config"
```

Подключение к кластеру
----------------------

Посмотреть на состояние кластера, чтобы убедиться, что kubectl правильно сконфигурирован можно при помощи команды:

```
kubectl cluster-info
```

Если в результате выполнения команды виден URL-ответ, значит kubectl корректно настроен для работы с кластером.

Если появляется следующее сообщение, то значит kubectl настроен некорректно или не может подключиться к кластеру Kubernetes:

```
The connection to the server <server-name:port> was refused - did you specify the right host or port?
```

Если команда kubectl cluster-info возвращает URL-ответ, но подключиться к своему кластеру не удается, следует воспользоваться командой:

```
kubectl cluster-info dump
```