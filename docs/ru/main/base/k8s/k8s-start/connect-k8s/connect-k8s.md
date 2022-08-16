## Описание

Инструмент командной строки Kubernetes `kubectl` позволяет запускать команды в кластерах Kubernetes.

`kubectl` можно использовать для развертывания приложений, проверки и управления ресурсами кластера, а также для просмотра логов.

Полный список операций, которые можно выполнить с помощью `kubectl`, доступен в [официальной документации](https://kubernetes.io/docs/reference/kubectl/overview/).

<warn>

При использовании версий kubectl v1.23 и выше, вам необходимо ввести пароль при подключении. Чтобы воспользоваться автоматическим вводом пароля, его можно указать в файле настройки подключения kubeconfig. Подробнее о файле kubeconfig можно узнать [здесь](https://mcs.mail.ru/docs/base/k8s/k8s-start/connect-k8s#import-konfiguracii).

</warn>

## Подключение к кластеру

Чтобы подключиться к кластеру с помощью `kubectl`:

1. [Установите](#kubectl-install) `kubectl`, если он еще не установлен.

   <warn>

   Убедитесь, что мажорная версия установленного `kubectl` не отличается от той, которая используется в кластере. Например, версия v1.19 может работать с версиями v1.16 и v1.15. Использование последней версии `kubectl` поможет избежать непредвиденных проблем при подключении.

   </warn>

1. Загрузите на локальный компьютер файл конфигурации кластера, к которому необходимо подключиться:

   1. Перейдите в раздел «Контейнеры» Панели VK Cloud.
   1. Выберите в контекстном меню требуемого кластера пункт «Получить Kubeconfig для доступа к кластеру».

   Такой файл автоматически создается для каждого нового кластера и имеет имя в формате `<имя кластера>_kubeconfig.yaml`.

   <info>

   В дальнейших шагах предполагается, что загруженный файл имеет имя `kubernetes-cluster-1234_kubeconfig.yaml` и находится в директории `~/Downloads`. Скорректируйте приведенные ниже команды при необходимости.

   </info>

1. Импортируйте загруженный файл конфигурации, чтобы `kubectl` мог найти кластер Kubernetes и получить к нему доступ:

   <tabs>
   <tablist>
   <tab>Linux, macOS (bash)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   1. Перейдите в директорию `.kube/`, которая находится в вашей домашней директории:

      ```bash
      cd ~/.kube
      ```

   1. Если такой директории не существует — создайте ее и назначьте минимально необходимые права:

      ```bash
      mkdir ~/.kube && \
      chmod -R 0600 ~/.kube && \
      cd ~/.kube
      ```

   1. Поместите файл конфигурации в директорию `~/.kube` под именем `config`:

      ```bash
      mv ~/Downloads/kubernetes-cluster-1234_kubeconfig.yaml ~/.kube/config
      ```

   1. Укажите `kubectl` использовать этот файл конфигурации, задав переменную среды окружения:

      ```bash
      export KUBECONFIG=$KUBECONFIG:$HOME/.kube/config
      ```

   </tabpanel>
   <tabpanel>

   1. Перейдите в директорию `.kube/`, которая находится в вашей домашней директории:

      ```powershell
      cd ~/.kube
      ```

   1. Если такой директории не существует — создайте ее:

      ```powershell
      mkdir ~/.kube; `
      cd ~/.kube
      ```

   1. Поместите файл конфигурации в директорию `~/.kube` под именем `config`:

      ```powershell
      mv ~/Downloads/kubernetes-cluster-1234_kubeconfig.yaml ./config
      ```

   1. Укажите `kubectl` использовать этот файл конфигурации, задав переменную среды окружения:

      ```powershell
      $Env:KUBECONFIG="$Env:KUBECONFIG;$HOME\.kube\config"
      ```

   </tabpanel>
   </tabs>

1. Выполните тестовое подключение к кластеру:

   ```bash
   kubectl cluster-info
   ```

   Могут быть выведены:

   - Краткая информация о том, что control plane кластера и CoreDNS функционируют, например:

     ```text
     Kubernetes control plane is running at https://NNN.NNN.NNN.NNN:6443
     CoreDNS is running at https://NNN.NNN.NNN.NNN:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

     ```

     Это означает, что `kubectl` правильно сконфигурирован и успешно подключился к кластеру.
     Теперь можно использовать `kubectl` для управления вашим кластером.

   - Иные сообщения, которые могут указывать на проблемы с подключением, например:

     ```text
     The connection to the server NNN.NNN.NNN.NNN:6443 was refused - did you specify the right host or port?
     ```

     ```text
     Unable to connect to the server: EOF
     ```

1. При проблемах с подключением:

   1. Проверьте, что:

      1. Кластер включен и работает.
      1. `kubectl` настроен корректно.

   1. Соберите вывод следующих команд:

      ```bash
      kubectl config view
      ```

      ```bash
      kubectl cluster-info dump
      ```

   1. Передайте собранную информацию в службу технической поддержки VK Cloud для диагностики и устранения проблемы.

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

<tabs>
<tablist>
<tab>Kubernetes v1.22 и ниже</tab>
<tab>Kubernetes v1.23+</tab>
</tablist>
<tabpanel>

Посмотреть на состояние кластера, чтобы убедиться, что kubectl правильно сконфигурирован можно при помощи команды:

```bash
kubectl cluster-info
```

Если в результате выполнения команды виден URL-ответ, значит kubectl корректно настроен для работы с кластером.

Если появляется следующее сообщение, то значит kubectl настроен некорректно или не может подключиться к кластеру Kubernetes:

```bash
The connection to the server <server-name:port> was refused - did you specify the right host or port?
```

Если команда `kubectl cluster-info` возвращает URL-ответ, но подключиться к своему кластеру не удается, следует воспользоваться командой:

```bash
kubectl cluster-info dump
```

</tabpanel>
<tabpanel>

1. Установите client-keystone-auth по [инструкции](https://mcs.mail.ru/docs/ru/base/k8s/k8s-clusters/client-keystone-auth).
2. При каждом запуске команды kubectl будет запрашивать ваш пароль для аутентификации в кластере Kubernetes. Чтобы каждый раз не вводить пароль, укажите пароль от ЛК в файле kubeconfig для переменной OS_PASSWORD.

Посмотреть на состояние кластера, чтобы убедиться, что kubectl правильно сконфигурирован можно при помощи команды:

```bash
kubectl cluster-info
```

Если в результате выполнения команды виден URL-ответ, значит kubectl корректно настроен для работы с кластером.

Если появляется следующее сообщение, то значит kubectl настроен некорректно или не может подключиться к кластеру Kubernetes:

```bash
The connection to the server <server-name:port> was refused - did you specify the right host or port?
```

Если команда `kubectl cluster-info` возвращает URL-ответ, но подключиться к своему кластеру не удается, следует воспользоваться командой:

```bash
kubectl cluster-info dump
```

</tabpanel>
</tabs>
