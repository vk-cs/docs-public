# {heading(Подключение к кластеру с помощью kubectl)[id=k8s-kubectl]}

{ifdef(public)}
Утилита `kubectl` позволяет выполнять весь спектр операций по управлению кластером Kubernetes из командной строки. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/kubectl/).
{/ifdef}

{ifndef(public)}
`kubectl` — это инструмент командной строки для управления кластерами Kubernetes. `kubectl` используется для развертывания приложений, проверки ресурсов кластера и просмотра логов. Полный список операций `kubectl` приведен в [официальной документации](https://kubernetes.io/docs/reference/kubectl/overview/).
{/ifndef}

Способ подключения к кластеру зависит от его IP-адреса:

* Если кластеру назначен внешний IP-адрес, можно подключиться к нему с любого хоста, имеющего доступ в интернет.
* Если кластеру назначен только внутренний IP-адрес, то можно подключиться к нему только с хоста в {var(cloud)} — виртуальной машины, которая находится в той же подсети, что и кластер.

## {heading(Подготовительные шаги)[id=k8s-kubectl-before-work]}

1. На хосте, с которого планируется подключаться к кластеру, установите `kubectl`, если утилита еще не установлена.

   {ifdef(public)}
   {note:warn}
   Убедитесь, что минорная версия `kubectl` отличается не более чем на единицу от минорной версии кластера, к которому вы подключаетесь. Например, `kubectl` версии 1.32 корректно работает с кластерами версий 1.**31**, 1.**32** и 1.**33**.

   Подробнее в [официальной документации Kubernetes](https://kubernetes.io/releases/version-skew-policy/#kubectl).
   {/note}
   {/ifdef}

   {ifndef(public)}
   {note:warn}
   Убедитесь, что минорная версия `kubectl` отличается не более чем на единицу от минорной версии кластера, к которому вы подключаетесь. Пример: `kubectl` версии 1.23 корректно работает с кластерами версий 1.22, 1.23 и 1.24.
   {/note}
   {/ifndef}

   {ifdef(public)}
   {tabs}

   {tab(Linux (curl))}

    1. Загрузите нужную версию `kubectl`.

       Пример команды для загрузки утилиты `kubectl`, совместимой с кластером версии 1.33.0:

       ```console
       curl -LO https://dl.k8s.io/release/v1.33.0/bin/linux/amd64/kubectl
       ```

    1. Сделайте двоичный файл `kubectl` исполняемым:

       ```console
       sudo chmod +x ./kubectl
       ```

    1. Поместите этот файл в директорию, которая содержится в переменной окружения `PATH`, например, в `/usr/local/bin`:

       ```console
       sudo mv ./kubectl /usr/local/bin/kubectl
       ```

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(Linux (apt))}

    1. Подключите репозиторий Kubernetes:

        1. Установите пакеты, необходимые для использования `apt`:

           ```console
           sudo apt-get update
           sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
           ```

        1. Создайте файл с настройками репозитория. Пример команд для кластеров версии 1.33.0:

           ```console
           curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.33/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
           sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
           echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.33/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
           sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list
           ```

        1. Обновите список пакетов:

           ```console
           sudo apt-get update
           ```

    1. Установите `kubectl`:

       ```console
       sudo apt-get install -y kubectl
       ```

       {note:info}
       Получить список всех доступных для установки версий можно с помощью команды `sudo apt-cache policy kubectl`.
       {/note}

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(Linux (yum))}

    1. Подключите репозиторий Kubernetes. Пример команд для кластеров версии 1.33.0:

       ```console
       cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
       [kubernetes]
       name=Kubernetes
       baseurl=https://pkgs.k8s.io/core:/stable:/v1.33/rpm/
       enabled=1
       gpgcheck=1
       gpgkey=https://pkgs.k8s.io/core:/stable:/v1.33/rpm/repodata/repomd.xml.key
       EOF
       ```

    1. Установите `kubectl`:

       ```console
       sudo yum install -y kubectl
       ```

       {note:info}
       Получить список всех доступных для установки версий можно с помощью команды `yum --showduplicates list kubectl`.
       {/note}

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(macOS (curl))}

    1. Загрузите нужную версию `kubectl`.

       Примеры команд для загрузки утилиты `kubectl`, совместимой с кластером версии 1.33.0:

       * Intel:

         ```console
         curl -LO https://dl.k8s.io/release/v1.33.0/bin/darwin/amd64/kubectl
         ```

       * Apple Silicon:

         ```console
         curl -LO https://dl.k8s.io/release/v1.33.0/bin/darwin/arm64/kubectl
         ```

    1. Сделайте двоичный файл `kubectl` исполняемым:

       ```console
       sudo chmod +x ./kubectl
       ```

    1. Поместите этот файл в директорию, которая содержится в переменной окружения `PATH`, например, в `/usr/local/bin`:

       ```console
       sudo mv ./kubectl /usr/local/bin/kubectl
       ```

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```

   {/tab}

   {tab(macOS (Homebrew))}

    1. Выполните одну из команд установки:

       ```console
       brew install kubectl
       ```

       Или:

       ```console
       brew install kubernetes-cli
       ```

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```
   {/tab}

   {tab(Windows)}

    1. Загрузите нужную версию `kubectl`.

       Пример команды для загрузки утилиты `kubectl`, совместимой с кластером версии 1.33.0:

       ```console
       curl -LO https://dl.k8s.io/release/v1.33.0/bin/windows/amd64/kubectl.exe
       ```

    1. В переменной окружения `PATH` укажите директорию, куда был загружен файл `kubectl.exe`:

       1. Перейдите в раздел меню **Пуск -> Этот компьютер -> Свойства -> Дополнительные параметры системы -> Переменные среды -> Системные переменные**.
       1. Измените значение переменной `PATH`, добавив путь к директории с файлом `kubectl.exe`.

       {note:info}
       Docker Desktop for Windows добавляет собственную версию `kubectl` в переменную окружения `PATH`. Если установлен Docker Desktop:

       * либо укажите путь к загруженному файлу перед записью, добавленной установщиком Docker Desktop;
       * либо удалите `kubectl`, поставляемый вместе с Docker Desktop.
       {/note}

    1. Проверьте версию `kubectl`, выполнив команду:

       ```console
       kubectl version
       ```

   {/tab}

   {/tabs}
   {/ifdef}

   {ifndef(public)}
   {tabs}

   {tab(Ubuntu, Debian и HypriotOS)}
   ```console
   sudo apt-get update && sudo apt-get install -y apt-transport-https
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
   sudo apt-get update
   sudo apt-get install -y kubectl
   ```
   {/tab}
   
   {tab(CentOS, Red Hat Enterprise Linux и Fedora)}
   ```console
   sudo yum install -y kubectl
   ```
   {/tab}
   
   {tab(РЕД ОС)}
   ```console
   sudo yum install kubernetes-client
   ```
   {/tab}

   {tab(macOS)}
   ```console
   brew install kubernetes-cli
   ```
   {/tab}

   {/tabs}
   {/ifndef}

{ifdef(public)}
1. Подготовьте все необходимое для подключения с использованием {linkto(../../concepts/access-management#k8s-access-management)[text=Single Sign-On (SSO)]}.

    1. На хосте, с которого планируется подключаться к кластеру, установите `client-keystone-auth`, если плагин еще не установлен:

       {include(/ru/_includes/_client-keystone-auth.md)}

    1. Проверьте, что у вас есть {linkto(../../../../access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=необходимая роль]} для работы с кластерами Kubernetes. Если такой роли нет, попросите владельца или суперадминистратора проекта добавить ее вам.
    1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Активируйте]} доступ по API.
{/ifdef}

{ifndef(public)}
1. Для подключения к кластеру Kubernetes версии 1.27 и выше с использованием Single Sign-On (SSO) установите утилиту `keystone-auth`.

   {note:warn}
   Установка утилиты `keystone-auth` необходима, только если для {var(cloud)} отключена двухфакторная аутентификация.
   {/note}

   1. Скачайте архив из дистрибутива, расположенный по адресу `<ДЕПЛОЙ_НОДА>:<ПОРТ>/repository/share/kubernetes/client-keystone-auth.zip`.

      Здесь:

      * `<ДЕПЛОЙ_НОДА>` — IP-адрес деплой-ноды с запущенным Nexus.
      * `<ПОРТ>` — название или идентификатор порта.
   
   1. Распакуйте архив. Выберите тип операционной системы — `$GOOS` и используемую архитектуру — `$GOARCH`.
   1. Установите `keystone-auth`:
   
      ```console
      chmod -R +x client-keystone-auth/$GOOS/$GOARCH
      sudo mv client-keystone-auth/$GOOS/$GOARCH/* /usr/bin/
      ```

   1. Определите, от имени какого пользователя будет выполняться подключение к кластеру:

      * Обратитесь к администратору {var(cloud)}, чтобы добавить пользователю роль `mcs_k8s_admin`.
      * В личном кабинете {linkto(../../../../tools-for-using-services/api/rest-api/case-keystone-token#rest-api-keystone-token)[text=получите токен]} для доступа к API для пользователя.
{/ifndef}

{ifdef(public)}
## {heading(Подключение к кластеру)[id=k8s-kubectl-connect]}

{include(/ru/_includes/_kubeconfig.md)}
{/ifdef}

{ifndef(public)}
## {heading(Подготовка файла kubeconfig)[id=k8s-kubectl-kubeconfig]}

1. Конфигурационный файл автоматически сохраняется на устройство при создании кластера. Если этого не произошло, выполните следующие шаги:

   1. {linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Получить Kubeconfig для доступа к кластеру**. Будет загружен файл с расширением `.yaml`.
   
      {note:warn}
      Далее предполагается, что загруженный файл имеет имя `kubernetes-cluster-1234_kubeconfig.yaml` и находится в директории `C:\Users\user\.kube` (для Windows) или `/home/user/.kube` (для Linux и macOS). Скорректируйте приведенные ниже команды при необходимости.
      {/note}
   
1. Ограничьте права доступа к файлу `kubeconfig`:

   {tabs}

   {tab(Linux)}
   ```console
   sudo chmod 0600 /home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml
   ```
   {/tab}

   {tab(Windows)}
   ```console
   icacls.exe 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml' `
   /c /t `
   /Inheritance:d `
   /Remove:g BUILTIN\Administrators Everyone Users `
   /Grant:r ${env:UserName}:RW
   ```
   {/tab}

   {/tabs}

1. Добавьте токен доступа в файл `kubeconfig`:

   1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
   1. Перейдите на вкладку **Доступ по API** и скопируйте значение **Токен для доступа к API**.
   1. Откройте файл `kubeconfig` и в раздел `users` добавьте токен.
   
      Пример файла Kubeconfig:
   
      ```console
      apiVersion: v1
      clusters:
      - cluster:
          certificate-authority-data: LS0tLS1CRUdJTiBDR.......0tLS0K
          server: https://10.31.1.9:6443
        name: kubernetes-cluster-5109
      contexts:
      - context:
          cluster: kubernetes-cluster-1234
          user: kubernetes-cluster-1234
        name: default/kubernetes-cluster-1234
      current-context: default/kubernetes-cluster-1234
      kind: Config
      preferences: {}
      users:
      - name: kubernetes-cluster-1234
        user:
          token: {{ <ТОКЕН> }}

      ```

      Здесь `<ТОКЕН>` — токен для доступа к API.

1. Экспортируйте файл `kubeconfig`:

   {tabs}
   
   {tab(Linux)}
   ```console
   export KUBECONFIG=<ПУТЬ>
   ```
   
   Здесь `<ПУТЬ>` — путь к файлу конфигурации `kubeconfig`.
   {/tab}

   {tab(Windows)}
   ```console
   env:KUBECONFIG = 'C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml'
   ```
   {/tab}

   {/tabs}
{/ifndef}

## {heading(Проверка подключения к кластеру)[id=k8s-kubectl-check-connection]}

{ifdef(public)}
{tabs}

{tab(Версия Kubernetes 1.23 и выше)}

На хосте:

1. Выполните команду:

   ```console
   kubectl cluster-info
   ```

1. Введите пароль пользователя от личного кабинета {var(cloud)}.

   Это необходимо для {linkto(../../concepts/access-management#k8s-access-management)[text=аутентификации]} при подключении к кластеру.

{/tab}

{tab(Версия Kubernetes 1.22 и ниже)}

Выполните команду на хосте:

```console
kubectl cluster-info
```

{/tab}

{/tabs}

Если кластер работает нормально и `kubectl` настроен на работу с ним, будет выведена похожая информация:

```text
Kubernetes control plane is running at...
CoreDNS is running at...
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
{/ifdef}

{ifndef(public)}
Проверьте подключение к кластеру:

```console
kubectl cluster-info
```

Пример ожидаемого результата:

```console
Kubernetes control plane is running at https://192.168.24.118:6443
Heapster is running at https://192.168.24.118:6443/api/v1/namespaces/kube-system/services/heapster/proxy
CoreDNS is running at https://192.168.24.118:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```
{/ifndef}