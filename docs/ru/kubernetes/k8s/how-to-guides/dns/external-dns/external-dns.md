[ExternalDNS](https://github.com/kubernetes-sigs/external-dns) позволяет автоматизировать управление DNS-записями при работе с ресурсами [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) или [Service](https://kubernetes.io/docs/concepts/services-networking/service/). Если эти ресурсы настроены согласно требованиям ExternalDNS, то они будут доступны по доменному имени сразу после создания.

ExternalDNS интегрируется с [сервисом DNS](/ru/networks/dns/publicdns) в VK Cloud с помощью плагина. Далее будет показано, как установить ExternalDNS в кластер, и как использовать этот инструмент с ресурсами `Ingress` и `Service`.

## Подготовительные шаги

1. [Создайте](/ru/networks/dns/publicdns#sozdanie_dns_zony) DNS-зону, с которой будет работать ExternalDNS, если этого еще не сделано.

   Для примера далее используется зона `example.com`.

1. [Создайте](../../../service-management/create-cluster) кластер Cloud Containers самой актуальной версии, который имеет внешний IP-адрес и доступен из интернета.

   Прочие параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

   Для подключения используйте файл конфигурации кластера (kubeconfig), загруженный из личного кабинета VK Cloud.

1. [Установите](../../../install-tools/helm) Helm версии 3.0.0 или выше, если утилита еще не установлена.

   Выберите для установки версию Helm, которая [совместима](https://helm.sh/docs/topics/version_skew/) с кластером.

1. Задайте переменную среды окружения, указывающую на kubeconfig для кластера. Это упростит работу с утилитами `kubectl` и `helm` при установке ExternalDNS.

   Путь к вашему файлу kubeconfig может отличаться от примера ниже.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $Env:KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   </tabs>

## 1. Подготовьте пользователя для ExternalDNS

ExternalDNS будет использовать реквизиты этого пользователя VK Cloud, чтобы взаимодействовать с API VK Cloud и управлять ресурсными записями DNS.

Подготовьте пользователя и получите все необходимые реквизиты:

1. [Выберите](/tools-for-using-services/account/service-management/project-settings/access-manage#prosmotr_uchastnikov_proekta) существующего пользователя или [пригласите в проект](/ru/tools-for-using-services/account/service-management/project-settings/access-manage#priglashenie_v_proekt_novogo_uchastnika) нового пользователя.

   Требования к пользователю:

   - Должен быть [активирован](/ru/tools-for-using-services/api/rest-api/enable-api) доступ по API.
   - Должна быть [назначена](/ru/tools-for-using-services/account/service-management/project-settings/access-manage#izmenenie_roli_uchastnika) одна из следующих ролей, чтобы ExternalDNS мог оперировать ресурсными записями в рамках DNS-зоны:

     - Администратор сети (минимально необходимая [роль](/ru/tools-for-using-services/account/concepts/rolesandpermissions#roles_permissions)).
     - Администратор проекта.
     - Суперадминистратор.
     - Владелец проекта.

     <info>

     Для работы с ExternalDNS рекомендуется выделить отдельного пользователя с ролью Администратор сети. Это минимизирует возможный ущерб, если злоумышленник получит доступ к реквизитам этого пользователя.

     </info>

1. Получите реквизиты, нужные для доступа к API VK Cloud:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud, используя реквизиты пользователя, выделенного для ExternalDNS.
   1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
   1. Перейдите на вкладку **Доступ по API** и запишите значения следующих параметров:

      - Project ID (Project ID для OpenStack);
      - User Domain Name (имя домена пользователя);
      - Username (имя пользователя);
      - Region Name (название региона);
      - Auth URL (URL для аутентификации).

1. Запишите пароль этого пользователя: он также необходим для доступа к API.

## 2. Установите ExternalDNS

1. Создайте пространство имен, в которое будет установлен ExternalDNS:

   ```bash
   kubectl create ns external-dns
   ```

1. Создайте в этом пространстве имен секрет, который содержит в себе реквизиты для доступа к API VK Cloud, [полученные при подготовке пользователя](#1_podgotovte_polzovatelya_dlya_externaldns):

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl -n external-dns create secret generic vkcs-auth \
     --from-literal=ProjectID="<Project ID>" \
     --from-literal=UserDomainName="<User Domain Name>" \
     --from-literal=Username="<Username>" \
     --from-literal=RegionName="<Region Name>" \
     --from-literal=AuthURL="<Auth URL>" \
     --from-literal=Password="<пароль пользователя>"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl -n external-dns create secret generic vkcs-auth `
     --from-literal=ProjectID="<Project ID>" `
     --from-literal=UserDomainName="<User Domain Name>" `
     --from-literal=Username="<Username>" `
     --from-literal=RegionName="<Region Name>" `
     --from-literal=AuthURL="<Auth URL>" `
     --from-literal=Password="<пароль пользователя>"
   ```

   </tabpanel>
   </tabs>

1. Добавьте Helm-репозиторий Bitnami:

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   ```

1. Создайте файл, который содержит в себе значения ([values](https://helm.sh/docs/chart_template_guide/values_files/)), нужные для установки ExternalDNS с помощью Helm:

   <details>
   <summary>external-dns-vkcs-values.yaml</summary>

   ```yaml
   policy: upsert-only
   txtPrefix: externaldns-

   provider: webhook
   
   extraArgs:
     webhook-provider-url: http://localhost:8888
   
   sidecars:
     - name: vkcs-plugin
       image: registry.infra.mail.ru:5010/external-dns-vkcs-plugin:latest
       imagePullPolicy: Always
       ports:
         - name: http
           containerPort: 8888
       livenessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       readinessProbe:
         httpGet:
           path: /healthz
           port: http
         initialDelaySeconds: 10
         timeoutSeconds: 5
       env:
         - name: OS_AUTH_URL
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: AuthURL
         - name: OS_USERNAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Username
         - name: OS_PASSWORD
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: Password
         - name: OS_PROJECT_ID
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: ProjectID
         - name: OS_DOMAIN_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: UserDomainName
         - name: OS_REGION_NAME
           valueFrom:
             secretKeyRef:
               name: vkcs-auth
               key: RegionName
         - name: SERVER_HOST
           value: "0.0.0.0"
         - name: SERVER_PORT
           value: "8888"
   ```

   </details>

   На поведение Helm-чарта (chart) ExternalDNS влияет множество значений. В созданном файле задан минимальный набор значений, достаточный для начала работы с ExternalDNS. Ниже описаны наиболее важные значения, которые влияют на работу ExternalDNS с DNS VK Cloud. Описания значений, которые не относятся к плагину VK Cloud (все значения, кроме `sidecars[]`), приведены в [README.md](https://github.com/kubernetes-sigs/external-dns/tree/master/charts/external-dns#values) для чарта.

   <warn>

   Не изменяйте и не удаляйте обязательные значения, приведенные ниже. Это может привести к некорректной работе ExternalDNS.

   </warn>

   <details>
   <summary>Описание важных значений, влияющих на поведение ExternalDNS</summary>

   - (**Обязательное значение**) `provider`: значение `webhook` указывает, что нужно использовать внешний плагин с поддержкой механизма вебхуков (webhooks), чтобы работать с DNS.

   - (**Обязательное значение**) `extraArgs:webhook-provider-url`: URL, который должен использоваться для взаимодействия с плагином.

   - `policy`: политика синхронизации ресурсных записей. По умолчанию используется политика `upsert-only`: ExternalDNS будет только добавлять ресурсные записи, но не удалять их.

     Если нужно, чтобы ExternalDNS удалял ресурсные записи при удалении ресурсов Kubernetes, для которых были созданы эти записи, используйте политику `sync`.

   - `txtPrefix`: префикс для TXT-записей, которые создаются ExternalDNS.

     ExternalDNS может автоматически добавлять для ресурсов Kubernetes как A-записи, так и CNAME-записи.

     ExternalDNS отслеживает, какими ресурсными записями DNS-зоны он управляет, путем размещения служебной информации в TXT-записях. В частности, с настройками по умолчанию он создаст служебную TXT-запись с тем же именем, что и у добавляемой записи: например, для A-записи `example.com` будет создана соответствующая TXT-запись с таким же именем `example.com`.

     Но согласно [RFC 1912](https://www.rfc-editor.org/rfc/rfc1912), CNAME-записи не могут сосуществовать с другими записями с таким же именем. Поэтому ExternalDNS настраивается так, чтобы к имени TXT-записей добавлялся префикс, заданный в `txtPrefix`. Это позволяет избежать возможных коллизий при работе с CNAME-записями: например, для CNAME-записи `example.com` будет создана соответствующая TXT-запись с именем `externaldns-example.com`.

     Вы можете задать другой префикс, который отличается от `externaldns-`, если это необходимо.

   </details>

   Плагин для ExternalDNS, который обеспечивает интеграцию с DNS VK Cloud, имеет множество настроек, влияющих на поведение плагина. Настройки задаются с помощью переменных среды окружения в `sidecars[].env`. В созданном файле заданы только обязательные настройки. При необходимости вы можете задать дополнительные настройки для плагина, добавив соответствующие переменные среды окружения.

   <warn>

   Не изменяйте и не удаляйте обязательные настройки плагина, перечисленные ниже. Это может привести к некорректной работе ExternalDNS.

   </warn>

   <details>
   <summary>Описание значений, влияющих на поведение плагина</summary>

   - (**Обязательные настройки**) Настройки, соответствующие переменным с префиксом `OS_` используются для аутентификации плагина при взаимодействии с API VK Cloud.

     Значения этих переменных хранятся в секрете Kubernetes, который был создан ранее.

   - (**Обязательные настройки**) Настройки, соответствующие переменным `SERVER_HOST` и `SERVER_PORT` имеют фиксированные значения и необходимы для корректной работы плагина.

   - Настройки фильтрации DNS-зон:

     - Фильтры для DNS-зон, в которых разрешено создавать ресурсные записи:

       - `DOMAIN_FILTERS`: строка с перечнем доменных имен через запятую. Например, `example.com,contoso.com`.
       - `REGEX_DOMAIN_FILTER`: строка с регулярным выражением ([синтаксис RE2](https://github.com/google/re2/wiki/Syntax)). Например, `.*.com$`.

       Если сконфигурированы оба фильтра, то фильтр `REGEX_DOMAIN_FILTER` имеет приоритет над `DOMAIN_FILTERS`. По умолчанию фильтрация не производится.

     - Фильтры для DNS-зон, в которых запрещено создавать ресурсные записи:

       - `EXCLUDE_DOMAINS`: строка с перечнем доменных имен через запятую. Например, `example.org,foo.bar.com`.
       - `REGEX_DOMAIN_FILTER_EXCLUSION`: строка с регулярным выражением ([синтаксис RE2](https://github.com/google/re2/wiki/Syntax)). Например, `^stage-.*.com$`.

       Если сконфигурированы оба фильтра, то фильтр `REGEX_DOMAIN_FILTER_EXCLUSION` имеет приоритет над `EXCLUDE_DOMAINS`. По умолчанию фильтрация не производится.

     - `SERVER_READ_TIMEOUT`: тайм-аут на чтение при открытом соединении к серверу (в секундах). Значение по умолчанию: `30`.
     - `SERVER_WRITE_TIMEOUT`: тайм-аут на запись при открытом соединении к серверу (в секундах). Значение по умолчанию: `30`.

     - `LOG_LEVEL`: уровень логирования событий, возникающих при работе плагина.

       Поддерживаются уровни `error`, `warn`, `info`, `debug`, `trace`. Значение по умолчанию: `info`.

     - `DRY_RUN`: флаг, позволяющий запустить плагин в режиме «dry run» («пробный запуск»).

       - `false` (по умолчанию): режим «dry run» **выключен**. Плагин работает и манипулирует ресурсными записями в DNS-зоне в соответствии с настройками.
       - `true`: режим «dry run» **включен**. Плагин работает, но не манипулирует ресурсными записями в DNS-зоне: не будет создано или удалено никаких ресурсных записей.

   </details>

1. Установите ExternalDNS:

   ```bash
   helm -n external-dns install external-dns-vkcs bitnami/external-dns -f external-dns-vkcs-values.yaml
   ```

1. Убедитесь, что Helm-чарт был успешно развернут:

   ```bash
   helm -n external-dns list && kubectl -n external-dns get all
   ```

   <details>
   <summary>Пример части вывода команды</summary>

   ```text
   NAME                    NAMESPACE       ...        ...   STATUS          CHART                 ...
   external-dns-vkcs       external-dns    ...        ...   deployed        external-dns-6.32.1   ...

   NAME                                     READY   STATUS    RESTARTS   AGE
   pod/external-dns-vkcs-NNNNNNNNNN-MMMMM   2/2     Running   0          ...
   
   NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
   service/external-dns-vkcs   ClusterIP   10.254.169.195   <none>        7979/TCP   ...
   
   NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
   deployment.apps/external-dns-vkcs   1/1     1            1           87s
   
   NAME                                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/external-dns-vkcs-NNNNNNNNNN   1         1         1       ...
   ```

   </details>

## 3. Проверьте работу External DNS

Далее будет развернуто несколько демо-приложений, основанных на [примере Cafe от NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example). Эти приложения будут опубликованы (сделаны доступными из интернета) с использованием `Service` и `Ingress`, настроенных на работу с ExternalDNS.

### 3.1. Опубликуйте приложение, используя сервис типа LoadBalancer

1. Создайте манифест для приложения `tea`:

   <details>
   <summary>tea-app.yaml</summary>

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
     labels:
       app: tea
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         containers:
         - name: tea
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   </details>

1. Примените этот манифест в кластере для развертывания приложения:

   ```bash
   kubectl apply -f tea-app.yaml
   ```

1. Проверьте, что приложение было успешно развернуто в виде `ReplicaSet` из трех реплик:

   ```bash
   kubectl get rs,pod -l app==tea
   ```

   <details>
   <summary>Пример частичного вывода команды</summary>

   ```text
   NAME                           DESIRED   CURRENT   READY   AGE
   replicaset.apps/tea-XXXXXXXXX  3         3         3       ...

   NAME                      READY   STATUS    RESTARTS   AGE
   pod/tea-XXXXXXXXX-AAAAA   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-BBBBB   1/1     Running   0          ...
   pod/tea-XXXXXXXXX-CCCCC   1/1     Running   0          ...
   ```

   </details>

1. Создайте манифест `tea-service.yaml` для сервиса Kubernetes (`Service`).

   Этот сервис будет использован для того, чтобы опубликовать развернутое приложение. Приложение будет доступно по доменному имени `tea.example.com`.

   Чтобы ExternalDNS создал ресурсные записи для сервиса:

   - Для сервиса должна быть задана аннотация `external-dns.alpha.kubernetes.io/hostname`.
   - Сервис должен иметь тип [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer).

   Укажите аннотацию `external-dns.alpha.kubernetes.io/ttl`, если нужно задать нестандартный TTL для ресурсных записей (по умолчанию: 86400 секунд, 24 часа).

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     annotations:
       external-dns.alpha.kubernetes.io/hostname: "tea.example.com"
       external-dns.alpha.kubernetes.io/ttl: "3600"
     name: tea-svc
     labels:
       app: tea
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: tea
   ```

   Здесь:

   - Указана обязательная аннотация `external-dns.alpha.kubernetes.io/hostname`: доменное имя, которое нужно использовать для сервиса.
   - Указана опциональная аннотация `external-dns.alpha.kubernetes.io/ttl`: TTL в секундах для ресурсной записи, которая будет создана ExternalDNS.

   - Выбран тип сервиса `LoadBalancer`. Для такого сервиса будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki). Поскольку балансировщик по умолчанию создается с публичным IP-адресом, то связанное с сервисом приложение будет доступно из интернета.

     <warn>

     Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

     </warn>

1. Примените этот манифест в кластере для создания сервиса:

   ```bash
   kubectl apply -f tea-service.yaml
   ```

1. Проверьте статус сервиса:

   ```bash
   kubectl get svc tea-svc
   ```

   Дождитесь, когда сервису будет назначен публичный IP-адрес балансировщика. Создание балансировщика может занять длительное время.

   <details>
   <summary>Пример частичного вывода команды</summary>

   - Балансировщик в процессе создания:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   <pending>      80:32314/TCP   ...
     ```

   - Балансировщик успешно создан:

     ```text
     NAME      TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)        AGE
     tea-svc   LoadBalancer   10.254.170.195   203.0.113.111      80:32314/TCP   ...
     ```

   </details>

1. Убедитесь, что ExternalDNS создал необходимые ресурсные записи:

   1. [Получите список ресурсных записей](/ru/networks/dns/publicdns#prosmotr_spiska_resursnyh_zapisey) для зоны `example.com`.
   1. Найдите в списке записи, созданные ExternalDNS:

      - Одну A-запись `tea.example.com`.
      - Две TXT-записи `externaldns-tea.example.com` и `externaldns-a-tea.example.com`.

        Эти TXT-записи — служебные и используются ExternalDNS для отслеживания состояния созданной для сервиса `tea-svc` A-записи.

        <info>

        Такие записи легко отличить по префиксу `externaldns-` в имени. Их значения имеют стандартную структуру вида `heritage=.../owner=.../resource=...`.

        Если [при установке ExternalDNS](#2_ustanovite_externaldns) вы задали другое значение префикса, то имена служебных TXT-записей будут отличаться.

        </info>

      Если нужных ресурсных записей нет, подождите еще несколько минут. ExternalDNS начнет создание ресурсных записей после того, как сервису будет назначен IP-адрес. На это потребуется некоторое время.

1. Проверьте, что приложение доступно по доменному имени. Для этого перейдите в браузере по адресу `http://tea.example.com`.

   Должна открыться страница с ответом от приложения вида:

   ```text
   Server address: 10.100.184.219:8080
   Server name: tea-XXXXXXXXX-AAAAA
   Date: 09/Feb/2024:10:09:51 +0000
   URI: /
   Request ID: <уникальный идентификатор запроса>
   ```

   Успешное взаимодействие с приложением по этому адресу свидетельствует о корректной работе ExternalDNS c сервисом типа `LoadBalancer`.

### 3.2. Опубликуйте приложение, используя Ingress

1. [Установите](/ru/kubernetes/k8s/service-management/addons/advanced-installation/install-advanced-ingress) в кластер аддон Ingress NGINX самой актуальной версии.

   Выполните **стандартную установку**. Не изменяйте никакие параметры, только отредактируйте код настройки аддона:

   1. Убедитесь, что аннотация `service.beta.kubernetes.io/openstack-internal-load-balancer` имеет значение `false`:

      ```yaml
      controller:
        ...
        service:
          annotations: {"loadbalancer.openstack.org/proxy-protocol": "true", "service.beta.kubernetes.io/openstack-internal-load-balancer": "false"}
          ...
      ```

      Это необходимо, чтобы для Ingress-контроллера был создан балансировщик нагрузки с публичным IP-адресом. Тогда приложение, использующее Ingress, будет доступно из интернета.

   1. Задайте для поля `controller.publishService.enabled` значение `true`:

      ```yaml
      controller:
        ...
        publishService:
          enabled: true
          pathOverride: ""
          ...
      ```

      Это необходимо, чтобы ресурсу Ingress был назначен публичный IP-адрес Ingress-контроллера. Это позволит ExternalDNS создать корректные ресурсные записи для Ingress.

   Дождитесь завершения установки аддона. Этот процесс может занять длительное время.

1. Создайте манифест для приложения `coffee`:

   <details>
   <summary>coffee-app.yaml</summary>

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
     labels:
       app: coffee
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         containers:
         - name: coffee
           image: nginxdemos/nginx-hello:plain-text
           ports:
           - containerPort: 8080
   ```

   </details>

1. Создайте манифест для сервиса Kubernetes, который будет использоваться приложением.

   <details>
   <summary>coffee-service.yaml</summary>

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
     labels:
      app: coffee
   spec:
     type: ClusterIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

   </details>

   Здесь для сервиса задан тип [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip), его достаточно, поскольку приложение будет опубликовано с помощью Ingress. Такой сервис доступен только изнутри кластера и не имеет выделенного балансировщика нагрузки в отличие от сервиса, [созданного ранее](#31_opublikuyte_prilozhenie_ispolzuya_servis_tipa_loadbalancer_5cacf8cb).

1. Примените эти манифесты в кластере для создания всех необходимых ресурсов:

   ```bash
   kubectl apply -f coffee-app.yaml -f coffee-service.yaml
   ```

1. Проверьте, что приложение было успешно развернуто в виде `ReplicaSet` из двух реплик вместе с соответствующим сервисом:

   ```bash
   kubectl get rs,pod,svc -l app==coffee
   ```

   <details>
   <summary>Пример частичного вывода команды</summary>

   ```text
   NAME                                DESIRED   CURRENT   READY   AGE
   replicaset.apps/coffee-YYYYYYYYY    2         2         2       ...
   
   NAME                         READY   STATUS    RESTARTS   AGE
   pod/coffee-YYYYYYYYY-DDDDD   1/1     Running   0          ...
   pod/coffee-YYYYYYYYY-EEEEE   1/1     Running   0          ...
   
   NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
   service/coffee-svc   ClusterIP   10.254.243.13   <none>        80/TCP    ...
   ```

   </details>

1. Создайте манифест `cafe-ingress.yaml` для ресурса Ingress.

   Этот ресурс Ingress будет использован для того, чтобы опубликовать развернутое приложение. Приложение будет доступно на домене `cafe.example.com` по URL `http://cafe.example.com/coffee`.

   Чтобы ExternalDNS создал ресурсные записи для сервиса, не нужно указывать никаких дополнительных значений в манифесте: достаточно наличия Ingress-контроллера, настроенного нужным образом. Значения доменных имен будут взяты из полей `host` для правил Ingress `spec.rules[]`.

   Укажите аннотацию `external-dns.alpha.kubernetes.io/ttl`, если нужно задать нестандартный TTL для ресурсных записей (по умолчанию: 86400 секунд, 24 часа).

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
     annotations:
       external-dns.alpha.kubernetes.io/ttl: "3600"
   spec:
     ingressClassName: nginx
     rules:
     - host: cafe.example.com
       http:
         paths:
         - path: /coffee
           pathType: Prefix
           backend:
             service:
               name: coffee-svc
               port:
                 number: 80
   ```

   Здесь:

   - Указана опциональная аннотация `external-dns.alpha.kubernetes.io/ttl`: TTL в секундах для ресурсных записей, которые будут созданы ExternalDNS.
   - Указан хост `cafe.example.com` для правила Ingress. Поскольку указан только один хост, то будет создана одна ресурсная запись для этого доменного имени.
   - Согласно правилу Ingress, приложение `coffee`, которое находится за сервисом `coffee-svc`, будет доступно по URL `http://cafe.example.com/coffee`.

1. Примените этот манифест в кластере для создания ресурса:

   ```bash
   kubectl apply -f cafe-ingress.yaml
   ```

1. Проверьте статус Ingress:

   ```bash
   kubectl get ingress cafe-ingress
   ```

   Дождитесь, когда ресурсу Ingress будет назначен публичный IP-адрес. Этот адрес будет совпадать с адресом Ingress-контроллера.

   <details>
   <summary>Пример частичного вывода команды</summary>

   - Ingress пока не назначен IP-адрес:

     ```text
     NAME           CLASS   HOSTS               ADDRESS   PORTS   AGE
     cafe-ingress   nginx   cafe.example.com              80      ...
     ```

   - Ingress назначен IP-адрес:

     ```text
     NAME           CLASS   HOSTS               ADDRESS                PORTS   AGE
     cafe-ingress   nginx   cafe.example.com    203.0.113.222.nip.io   80      ...
     ```

   </details>

1. Убедитесь, что ExternalDNS создал необходимые ресурсные записи:

   1. [Получите список ресурсных записей](/ru/networks/dns/publicdns#prosmotr_spiska_resursnyh_zapisey) для зоны `example.com`.
   1. Найдите в списке записи, созданные ExternalDNS:

      - Одну CNAME-запись `cafe.example.com`.
      - Две TXT-записи `externaldns-cafe.example.com` и `externaldns-cname-cafe.example.com`.

        Эти TXT-записи — служебные и используются ExternalDNS для отслеживания состояния созданной для Ingress `cafe-ingress` CNAME-записи.

      Если нужных ресурсных записей нет, подождите еще несколько минут. ExternalDNS начнет создание ресурсных записей после того, как ресурсу Ingress будет назначен IP-адрес. На это потребуется некоторое время.

1. Проверьте, что приложение доступно по доменному имени. Для этого перейдите в браузере по адресу `http://cafe.example.com/coffee`.

   Должна открыться страница с ответом от приложения вида:

   ```text
   Server address: 10.100.184.220:8080
   Server name: coffee-YYYYYYYYY-DDDDD
   Date: 09/Feb/2024:13:07:11 +0000
   URI: /coffee
   Request ID: <уникальный идентификатор запроса>
   ```

   Успешное взаимодействие с приложением по этому адресу свидетельствует о корректной работе ExternalDNS c ресурсом Ingress.

## Удалите неиспользуемые ресурсы

1. Если созданные ресурсы Kubernetes, предназначенные для проверки работоспособности ExternalDNS, вам больше не нужны, удалите их:

   1. Удалите все ресурсы, связанные с приложением `tea`:

      ```bash
      kubectl delete -f cafe-ingress.yaml -f coffee-service.yaml -f coffee-app.yaml
      ```

      Удаление связанного с сервисом балансировщика нагрузки может занять длительное время.

   1. Удалите все ресурсы, связанные с приложением `coffee`:

      ```bash
      kubectl delete -f tea-service.yaml -f tea-app.yaml
      ```
  
   1. [Удалите аддон Ingress NGINX](../../../service-management/addons/manage-addons#udalenie_addona).

      Удаление аддона и связанных с ним ресурсов может занять длительное время.

   1. [Удалите ресурсные записи](/ru/networks/dns/publicdns#udalenie_resursnyh_zapisey), созданные ExternalDNS.

      Это необходимо сделать, если вы не изменяли файл `external-dns-vkcs-values.yaml` при [установке ExternalDNS](#2_ustanovite_externaldns): тогда ExternalDNS использует политику `upsert-only` и не удаляет ресурсные записи из DNS-зоны при удалении ресурсов Kubernetes. Если вы изменили этот файл и выбрали политику `sync`, то эти записи будут удалены автоматически.

      Перечень ресурсных записей:

      - A-запись `tea.example.com`.
      - TXT-записи `externaldns-tea.example.com` и `externaldns-a-tea.example.com`.
      - CNAME-запись `cafe.example.com`.
      - TXT-записи `externaldns-cafe.example.com` и `externaldns-cname-cafe.example.com`.

1. Если ExternalDNS вам больше не нужен, удалите его:

   1. Удалите Helm-чарт с ExternalDNS:

      ```bash
      helm -n external-dns uninstall external-dns-vkcs
      ```

   1. Удалите пространство имен `external-dns`.

      <warn>

      Также будет удален секрет `vkcs-auth`, который содержит в себе реквизиты для доступа к API VK Cloud.

      </warn>

      ```bash
      kubectl delete ns external-dns
      ```

1. Работающий кластер Cloud Containers тарифицируется и потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../service-management/manage-cluster#delete_cluster) его навсегда.

1. [Удалите DNS-зону](/ru/networks/dns/publicdns#udalenie_dns_zony) `example.com`, если она вам больше не нужна.
