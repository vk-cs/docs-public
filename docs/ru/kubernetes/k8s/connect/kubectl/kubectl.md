Утилита `kubectl` позволяет выполнять весь спектр операций по управлению кластером Kubernetes из командной строки. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/kubectl/).

Способ подключения к кластеру зависит от его IP-адреса:

- Если кластеру назначен внешний IP-адрес, то можно подключиться к нему с любого хоста, имеющего доступ в интернет.
- Если кластеру назначен только внутренний IP-адрес, то можно подключиться к нему только с хоста в VK Cloud — виртуальной машины, которая находится в той же подсети, что и кластер.

## Подготовительные шаги

1. На хосте, с которого планируется подключаться к кластеру, установите `kubectl`, если утилита еще не установлена.

   <warn>

   Убедитесь, что минорная версия `kubectl` отличается не более чем на единицу от минорной версии кластера, к которому вы подключаетесь. Например, `kubectl` версии 1.23 корректно работает с кластерами версий 1.**22**, 1.**23** и 1.**24**.

   Подробнее в [официальной документации Kubernetes](https://kubernetes.io/releases/version-skew-policy/#kubectl).

   </warn>

   <tabs>
   <tablist>
   <tab>Linux (curl)</tab>
   <tab>Linux (apt)</tab>
   <tab>Linux (yum)</tab>
   <tab>macOS (curl)</tab>
   <tab>macOS (Homebrew)</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Загрузите нужную версию `kubectl`.

      Пример команды для загрузки утилиты `kubectl`, совместимой с кластером версии 1.23.6:

      ```bash
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/linux/amd64/kubectl
      ```

   1. Сделайте двоичный файл `kubectl` исполняемым:

      ```bash
      sudo chmod +x ./kubectl
      ```

   1. Поместите этот файл в директорию, которая содержится в переменной окружения `PATH`, например, в `/usr/local/bin`:

      ```bash
      sudo mv ./kubectl /usr/local/bin/kubectl
      ```

   1. Проверьте версию `kubectl`, выполнив команду:

      ```bash
      kubectl version --short
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

   1. Установите нужную версию `kubectl`.

      Пример команды для установки утилиты `kubectl`, совместимой с кластером версии 1.23.6:

      ```bash
      sudo apt-get install -y kubectl=1.23.6-00
      ```

      <info>

      Получить список всех доступных для установки версий можно с помощью команды `sudo apt-cache policy kubectl`.

      </info>

   1. Проверьте версию `kubectl`, выполнив команду:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Подключите репозиторий Kubernetes:

      ```bash
      cat << EOF > /etc/yum.repos.d/kubernetes.repo
      [kubernetes]
      name=Kubernetes
      baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
      enabled=1
      gpgcheck=1
      repo_gpgcheck=1
      gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
      EOF
      ```

   1. Установите нужную версию `kubectl`.

      Пример команды для установки утилиты `kubectl`, совместимой с кластером версии 1.23.6:

      ```bash
      yum install -y kubectl-1.23.6-0
      ```

      <info>

      Получить список всех доступных для установки версий можно с помощью команды `yum --showduplicates list kubectl`.

      </info>

   1. Проверьте версию `kubectl`, выполнив команду:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Загрузите нужную версию `kubectl`.

      Пример команды для загрузки утилиты `kubectl`, совместимой с кластером версии 1.23.6:

      ```bash
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/darwin/amd64/kubectl
      ```

   1. Сделайте двоичный файл `kubectl` исполняемым:

      ```bash
      sudo chmod +x ./kubectl
      ```

   1. Поместите этот файл в директорию, которая содержится в переменной окружения `PATH`, например, в `/usr/local/bin`:

      ```bash
      sudo mv ./kubectl /usr/local/bin/kubectl
      ```

   1. Проверьте версию `kubectl`, выполнив команду:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Выполните одну из команд установки:

      ```bash
      brew install kubectl
      ```

      Или:

      ```bash
      brew install kubernetes-cli
      ```

   1. Проверьте версию `kubectl`, выполнив команду:

      ```bash
      kubectl version --short
      ```

   </tabpanel>
   <tabpanel>

   1. Загрузите нужную версию `kubectl`.

      Пример команды для загрузки утилиты `kubectl`, совместимой с кластером версии 1.23.6:

      ```powershell
      curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/windows/amd64/kubectl.exe
      ```

   1. В переменной окружения `PATH` укажите директорию, куда был загружен файл `kubectl.exe`:

      1. Перейдите в раздел меню **Пуск -> Этот компьютер -> Свойства -> Дополнительные параметры системы -> Переменные среды -> Системные переменные**.
      1. Измените значение переменной `PATH`, добавив путь к директории с файлом `kubectl.exe`.

      <info>

      Docker Desktop for Windows добавляет собственную версию `kubectl` в переменную окружения `PATH`. Если установлен Docker Desktop:

      - либо укажите путь к загруженному файлу перед записью, добавленной установщиком Docker Desktop;
      - либо удалите `kubectl`, поставляемый вместе с Docker Desktop.

      </info>

   1. Проверьте версию `kubectl`, выполнив команду:

      ```powershell
      kubectl version --short
      ```

   </tabpanel>
   </tabs>

1. Подготовьте все необходимое для подключения с использованием [Single Sign-On (SSO)](../../concepts/access-management).

   1. На хосте, с которого планируется подключаться к кластеру, установите `client-keystone-auth`, если плагин еще не установлен:

      {include(/ru/_includes/_client-keystone-auth.md)}

   1. Определите, от имени какого пользователя будет выполняться подключение к кластеру. Затем:

      - [Добавьте](../../../../tools-for-using-services/account/account/adduser) этому пользователю [необходимую роль](../../concepts/access-management).
      - [Активируйте доступ по API](/ru/tools-for-using-services/rest-api/enable-api#aktivaciya_dostupa_po_api) для этого пользователя.

## Подключение к кластеру

{include(/ru/_includes/_kubeconfig.md)}

## Проверка подключения к кластеру

<tabs>
<tablist>
<tab>Версия Kubernetes 1.23 и выше</tab>
<tab>Версия Kubernetes 1.22 и ниже</tab>
</tablist>
<tabpanel>

На хосте:

1. Выполните команду:

   ```bash
   kubectl cluster-info
   ```

1. Введите пароль пользователя от личного кабинета VK Cloud.

   Это необходимо для [аутентификации](../../concepts/access-management) при подключении к кластеру.

</tabpanel>
<tabpanel>

Выполните команду на хосте:

```bash
kubectl cluster-info
```

</tabpanel>
</tabs>

Если кластер работает нормально и `kubectl` настроен на работу с ним, будет выведена похожая информация:

```text
Kubernetes control plane is running at...
CoreDNS is running at...
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
