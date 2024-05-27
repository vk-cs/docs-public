При [подключении с помощью kubectl](../../connect/kubectl) к кластеру Cloud Containers используется [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/), файл конфигурации кластера. Обычно для работы с кластером используется kubeconfig из личного кабинета VK Cloud, который настроен на использование [технологии единого входа](../../concepts/access-management). Поэтому при работе с `kubectl` периодически нужно вводить пароль пользователя.

Такой процесс аутентификации неудобен при работе с автоматизированными инструментами, которым нужен доступ к кластеру. Для работы с ними удобнее использовать файл kubeconfig для сервисного аккаунта. Этот kubeconfig позволяет аутентифицироваться с помощью токена с бесконечным временем жизни, без ввода пароля.

## Подготовительные шаги

1. [Создайте](../../service-management/create-cluster) кластер Cloud Containers самой актуальной версии.

   При создании кластера выберите опцию **Назначить внешний IP**. Прочие параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../connect/kubectl), что вы можете подключиться к созданному кластеру с помощью `kubectl`.

   При этом будет использоваться kubeconfig, загруженный из личного кабинета VK Cloud.

1. Задайте переменные среды окружения, указывающие на kubeconfig:

   - `VKCLOUD_KUBECONFIG`: путь к kubeconfig, загруженному из личного кабинета VK Cloud.
   - `SA_KUBECONFIG`: путь к kubeconfig для сервисного аккаунта (сам файл будет создан позднее).

   Это упростит дальнейшую работу с `kubectl`.

   <info>

   Путь к вашим файлам kubeconfig может отличаться от примера ниже.

   </info>

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export VKCLOUD_KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   export SA_KUBECONFIG="/home/user/.kube/sa_kubeconfig.yaml"

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $VKCLOUD_KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   $SA_KUBECONFIG="C:\Users\user\.kube\sa_kubeconfig.yaml"

   ```

   </tabpanel>
   </tabs>

1. Убедитесь, что после подключения к кластеру есть права на создание необходимых ресурсов Kubernetes:

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create serviceaccount
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create secret
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG auth can-i create clusterrolebinding

   ```

   Для каждой из команд должен быть выведен ответ `yes`.

   Если нет прав на создание любого из этих ресурсов (ответ `no`), [скорректируйте роль пользователя VK Cloud](/ru/tools-for-using-services/account/service-management/project-settings/access-manage#izmenenie_roli_uchastnika), от имени которого выполняется подключение к кластеру.

   Подробнее о ролевой модели и доступных ролях читайте в разделе [Управление доступом](../../concepts/access-management).

## 1. Создайте сервисный аккаунт и свяжите его с ролью

1. Создайте сервисный аккаунт `example-sa` в пространстве имен `kube-system`:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

   Пример вывода команды:

   ```text
   serviceaccount/example-sa created
   ```

1. Выберите кластерную роль, которую нужно назначить сервисному аккаунту.

   Чтобы получить список всех кластерных ролей с подробным описанием, выполните команду:

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG describe clusterroles
   ```

   При выборе роли следуйте [принципу наименьших привилегий](https://ru.wikipedia.org/wiki/Принцип_минимальных_привилегий), чтобы повысить безопасность при работе с кластером. Подробнее о ролевой модели читайте в [официальной документации Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

   В качестве примера далее будет назначена роль `edit`. Она [соответствует](../../concepts/access-management#vzaimosvyaz_roley_lichnogo_kabineta_i_kubernetes) роли `Оператор Kubernetes` в личном кабинете.

1. Свяжите созданный сервисный аккаунт с выбранной кластерной ролью. Для этого создайте ресурс `ClusterRoleBinding` с именем `example-binding`.

   Сервисный аккаунт должен указываться вместе с пространством имен, к которому он принадлежит.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     create clusterrolebinding example-binding \
       --serviceaccount=kube-system:example-sa \
       --clusterrole=edit
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     create clusterrolebinding example-binding `
       --serviceaccount=kube-system:example-sa `
       --clusterrole=edit

   ```

   </tabpanel>
   </tabs>

   Пример вывода команды:

   ```text
   clusterrolebinding.rbac.authorization.k8s.io/example-binding created
   ```

## 2. Получите токен для сервисного аккаунта

1. Создайте секрет `example-token`, содержащий токен для сервисного аккаунта:

   1. Создайте файл манифеста:

      <details>
      <summary>example-token.yaml</summary>

      <!-- prettier-ignore -->
      ```yaml
      apiVersion: v1
      kind: Secret
      type: kubernetes.io/service-account-token
      metadata:
        name: example-token
        namespace: kube-system
        annotations:
          kubernetes.io/service-account.name: example-sa
      ```

      </details>

      Пояснения к полям манифеста:

      - `type`: специальный тип секрета `kubernetes.io/service-account-token`. Такой секрет хранит в себе токен для сервисного аккаунта.
      - `metadata.namespace`: пространство имен для секрета. Секрет должен размещаться в том же пространстве имен, что и сервисный аккаунт.
      - `metadata.annotations`: специальная аннотация `kubernetes.io/service-account.name` с именем сервисного аккаунта. Токен из созданного секрета будет связан с этим аккаунтом.

   1. Примените файл манифеста:

      ```bash
      kubectl --kubeconfig $VKCLOUD_KUBECONFIG apply -f example-token.yaml
      ```

      Будет создан секрет с заданными параметрами. Пример вывода команды:

      ```text
      secret/example-token created
      ```

1. Убедитесь, что сервисному аккаунту был назначен токен из созданного секрета:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     describe serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     describe serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

   В выводе должно содержаться указание на секрет в поле `Tokens`.

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   Name:                example-sa
   Namespace:           kube-system
   Labels:              <none>
   Annotations:         <none>
   Image pull secrets:  <none>
   Mountable secrets:   <none>
   Tokens:              example-token
   Events:              <none>
   ```

   </details>

1. Получите значение токена.

   Секрет хранит в себе токен в закодированном виде (схема кодирования [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)). Токен необходимо декодировать, чтобы его можно было использовать в kubeconfig:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     get secret example-token -n kube-system \
     --template={{.data.token}} | base64 --decode

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   [System.Text.Encoding]::UTF8.GetString( `
     [System.Convert]::FromBase64String( `
       (kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
          get secret example-token -n kube-system -o json `
          | ConvertFrom-Json).data.token))

   ```

   </tabpanel>
   </tabs>

   Будет выведено значение токена. Сохраните его.

   <err>

   Значение токена — конфиденциальная информация. При его компрометации [отзовите токен](#otzovite_skomprometirovannyy_token).

   </err>

## 4. Создайте kubeconfig для сервисного аккаунта

1. Создайте основу для этого kubeconfig путем копирования kubeconfig, загруженного из личного кабинета VK Cloud.

   ```bash
   cp $VKCLOUD_KUBECONFIG $SA_KUBECONFIG
   ```

1. (Опционально) Познакомьтесь со структурой kubeconfig:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   Будет выведено содержимое kubeconfig в сжатом виде: значения некоторых полей будут опущены.

   <details>
   <summary>Упрощенный пример kubeconfig</summary>

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters: # Кластеры
     - cluster: <информация о кластере>
       name: <имя кластера>
   contexts: # Контексты, в рамках которых идет работа с кластером
     - context:
         cluster: <имя кластера>
         user: <имя пользователя>
       name: <имя контекста>
   current-context: <имя текущего контекста>
   kind: Config
   preferences: {}
   users: # Пользователи
     - name: <имя пользователя>
       user: <данные для аутентификации>
   ```

   </details>

   Kubeconfig содержит в себе все параметры, необходимые для работы с кластером:

   - `clusters`: перечень кластеров и данных для подключения к ним.

     Kubeconfig для кластера Cloud Containers содержит запись о единственном кластере.

   - `users`: перечень пользователей и данных для их аутентификации в кластере.

     Kubeconfig для кластера Cloud Containers содержит запись о единственном пользователе, который аутентифицируется с помощью `keystone-auth`.

   - `contexts`: контекст, в рамках которого работает `kubectl`. В самом простом случае контекст — это комбинация имени кластера и имени пользователя.

     Kubeconfig для кластера Cloud Containers содержит запись о единственном контексте. Этот контекст использует запись о кластере и пользователе, которые уже определены в kubeconfig.

   Когда `kubectl` работает в указанном контексте, он работает с заданным в контексте кластером от имени указанного пользователя.

1. Измените содержимое kubeconfig для сервисного аккаунта, чтобы этот файл содержал в себе параметры, связанные с настроенным ранее сервисным аккаунтом:

   1. Удалите существующего пользователя.

      Этот пользователь соответствует пользователю VK Cloud и не должен фигурировать в kubeconfig, который будет использоваться автоматизированными инструментами.

      1. Получите список пользователей:

         <tabs>
         <tablist>
         <tab>Linux (bash)/macOS (zsh)</tab>
         <tab>Windows (PowerShell)</tab>
         </tablist>
         <tabpanel>

         ```bash
         kubectl --kubeconfig $SA_KUBECONFIG \
           config get-users

         ```

         </tabpanel>
         <tabpanel>

         ```powershell
         kubectl --kubeconfig $SA_KUBECONFIG `
           config get-users

         ```

         </tabpanel>
         </tabs>

      1. Удалите пользователя, используя нужное имя из списка:

         <tabs>
         <tablist>
         <tab>Linux (bash)/macOS (zsh)</tab>
         <tab>Windows (PowerShell)</tab>
         </tablist>
         <tabpanel>

         ```bash
         kubectl --kubeconfig $SA_KUBECONFIG \
           config delete-user <имя пользователя>

         ```

         </tabpanel>
         <tabpanel>

         ```powershell
         kubectl --kubeconfig $SA_KUBECONFIG `
           config delete-user <имя пользователя>

         ```

         </tabpanel>
         </tabs>

         Пример частичного вывода команды:

         ```text
         deleted user kubernetes-cluster-1234 from ...sa_kubeconfig.yaml
         ```

   1. Добавьте нового пользователя `example-sa`.

      Этот пользователь соответствует созданному ранее сервисному аккаунту. Для аутентификации будет использоваться полученный ранее токен.

      <tabs>
      <tablist>
      <tab>Linux (bash)/macOS (zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-credentials example-sa --token="<значение токена>"

      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-credentials example-sa --token="<значение токена>"

      ```

      </tabpanel>
      </tabs>

      Пример вывода команды:

      ```text
      User "example-sa" set.
      ```

   1. Настройте текущий контекст на использование добавленного пользователя:

      <tabs>
      <tablist>
      <tab>Linux (bash)/macOS (zsh)</tab>
      <tab>Windows (PowerShell)</tab>
      </tablist>
      <tabpanel>

      ```bash
      kubectl --kubeconfig $SA_KUBECONFIG \
        config set-context --current --user="example-sa"

      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      kubectl --kubeconfig $SA_KUBECONFIG `
        config set-context --current --user="example-sa"

      ```

      </tabpanel>
      </tabs>

      Пример вывода:

      ```text
      Context "default/kubernetes-cluster-1234" modified.
      ```

1. (Опционально) Проверьте обновленное содержимое kubeconfig для сервисного аккаунта:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG config view
   ```

   Этот kubeconfig не должен содержать других пользователей, кроме добавленного ранее `example-sa`. Единственный контекст должен использовать этого пользователя.

   <details>
   <summary>Пример вывода команды</summary>

   <!-- prettier-ignore -->
   ```yaml
   apiVersion: v1
   clusters:
   - cluster:
       certificate-authority-data: DATA+OMITTED
       server: https://203.0.113.123:6443
     name: kubernetes-cluster-1234
   contexts:
   - context:
       cluster: kubernetes-cluster-1234
       user: example-sa
     name: default/kubernetes-cluster-1234
   current-context: default/kubernetes-cluster-1234
   kind: Config
   preferences: {}
   users:
   - name: example-sa
     user:
       token: REDACTED
   ```

   </details>

## 5. Проверьте работу созданного kubeconfig

Используйте команды `kubectl` и созданный ранее kubeconfig для сервисного аккаунта, чтобы получить информацию о кластере и его ресурсах, например:

1. Получите информацию о кластере:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG cluster-info
   ```

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   Kubernetes control plane is running at https://203.0.113.123:6443
   CoreDNS is running at https://203.0.113.123:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   ```

   </details>

1. Получите список основных ресурсов в пространстве имен `default`:

   ```bash
   kubectl --kubeconfig $SA_KUBECONFIG get all -n default
   ```

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
   service/kubernetes   ClusterIP   10.254.0.1   <none>        443/TCP   3d1h
   ```

   </details>

Если при выполнении команд пароль не был запрошен, то полученный kubeconfig можно использовать в комбинации с автоматизированными инструментами для доступа к кластеру Cloud Containers.

<err>

Обеспечьте необходимые меры по защите файла kubeconfig. Он содержит конфиденциальную информацию: значение токена в открытом виде.

При компрометации kubeconfig [отзовите токен](#otzovite_skomprometirovannyy_token).

</err>

## Отзовите скомпрометированный токен

Если созданный ранее токен или содержащий его kubeconfig были скомпрометированы, отзовите токен, чтобы предотвратить несанкционированный доступ к кластеру.

Для этого удалите секрет, который используется для хранения токена:

```bash
kubectl --kubeconfig $VKCLOUD_KUBECONFIG delete secret example-token -n kube-system
```

## Удалите неиспользуемые ресурсы

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их:

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG \
     delete serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete clusterrolebinding example-binding
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete secret example-token -n kube-system
   kubectl --kubeconfig $VKCLOUD_KUBECONFIG `
     delete serviceaccount example-sa -n kube-system

   ```

   </tabpanel>
   </tabs>

1. Работающий кластер Cloud Containers тарифицируется и потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../service-management/manage-cluster#udalit_klaster) его навсегда.
