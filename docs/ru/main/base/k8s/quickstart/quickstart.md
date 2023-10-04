Быстрый старт поможет вам начать работу с сервисом и познакомиться с его возможностями.

Пройдя все шаги быстрого старта, вы:

1. Создадите небольшой кластер Kubernetes.
1. Научитесь подключаться к нему.
1. Познакомитесь с Kubernetes и [аддонами для него](../concepts/addons-and-settings/addons/):
   1. Подключите инструменты для управления и мониторинга.
   1. Загрузите Docker-образы в реестр Docker.
   1. Развернете простые приложения на основе загруженных образов, с возможностью использовать хранилище VK Cloud.
   1. Предоставите доступ к развернутым приложениям с помощью Ingress-контроллера.
   1. Убедитесь, что эти приложения действительно работают.

<warn>

Работающий кластер Kubernetes потребляет вычислительные ресурсы.

После прохождения быстрого старта [остановите или удалите кластер](#prokontroliruyte_ispolzovanie_resursov), если он вам больше не нужен.

</warn>

## 1. Подготовительные шаги

### 1.1. Создайте кластер

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите [проект](../../../base/account/concepts/projects), где будет размещен кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Если в выбранном проекте пока нет ни одного кластера, нажмите кнопку **Создать кластер**.

   Иначе нажмите кнопку **Добавить**.

1. На шаге «Конфигурация»:

   1. Выберите конфигурацию кластера **Dev-среда** с самой новой версией Kubernetes.

      <info>

      Обратите внимание на выбранную версию Kubernetes. Это важно при дальнейшей установке `kubectl`.

      </info>

   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Создание кластера» задайте:

   1. **Имя кластера:** например, `vk-cloud-k8s-quickstart`.
   1. **Тип виртуальной машины Master:** `Standard-2-8`.
   1. **Зона доступности:** `Москва (MS1)`.

      <info>

      Конфигурационные файлы для создания и настройки ресурсов в кластере рассчитаны на использование именно этой зоны.

      При выборе другой зоны скорректируйте конфигурационные файлы.

      </info>

   1. **Сеть:** `Создать новую сеть`.
   1. **Назначить внешний IP:** убедитесь, что эта опция выбрана.
   1. Другие настройки оставьте без изменений.
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Группы узлов» задайте:

   1. **Тип Node-узлов:** `Standard-4-4`.
   1. **Зона доступности:** `Москва (MS1)`.

      <info>

      Конфигурационные файлы для создания и настройки ресурсов в кластере рассчитаны на использование именно этой зоны.

      При выборе другой зоны скорректируйте конфигурационные файлы.

      </info>

   1. Другие настройки оставьте без изменений.
   1. Нажмите кнопку **Создать кластер**.

Дождитесь завершения создания кластера, этот процесс может занять длительное время.

### 1.2. Установите аддоны в кластер

<warn>

При установке аддонов Docker Registry и Ingress NGINX для них будут созданы [стандартные балансировщики нагрузки](/ru/networks/vnet/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщиков [тарифицируется](/ru/networks/vnet/tariffs).

</warn>

1. [Установите аддон](../operations/addons/advanced-installation/install-advanced-registry) `docker-registry`.

   Запишите данные для доступа к реестру Docker.

1. [Установите аддон](../operations/addons/advanced-installation/install-advanced-monitoring/) `kube-prometheus-stack`.

   Запишите пароль для доступа к веб-интерфейсу Grafana.

1. [Установите аддон](../operations/addons/advanced-installation/install-advanced-ingress/) `ingress-nginx` с параметрами по умолчанию.

   Запишите плавающий IP-адрес для балансировщика нагрузки.

Далее в командах и конфигурационных файлах для примера будут использоваться следующие значения. Замените их на актуальные для вас.

| Параметр                                                    | Значение                   |
| ----------------------------------------------------------- | -------------------------- |
| IP-адрес балансировщика нагрузки<br>для Ingress-контроллера | `192.0.2.2`                |
| URL эндпоинта реестра Docker                                | `192.0.2.22:5000`          |
| Логин пользователя реестра Docker                           | `registry`                 |
| Пароль пользователя реестра Docker                          | `registry-password-123456` |
| Пароль пользователя `admin` для Grafana                     | `grafana-password-123456`  |

### 1.3. Настройте окружение для работы с кластером

Настройте хост, с которого вы будете работать с кластером.
Это может быть как реальный компьютер, так и виртуальная машина.

Установите на хост следующие инструменты:

- Браузер.
- Утилиту [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).

  <warn>

  Загрузите версию `kubectl`, совпадающую с версией кластера, либо отличающуюся на одну минорную версию в любую сторону.

  Например, для кластера версии 1.23.6 подходит `kubectl` версий 1.22, 1.23 и 1.24.

  Подробнее в разделе [Подключение к кластеру с помощью kubectl](../connect/kubectl/).

  </warn>

- Утилиту [kauthproxy](https://github.com/int128/kauthproxy/releases). Подробнее в разделе [Подключение к кластеру с помощью Kubernetes Dashboard](../connect/k8s-dashboard).
- Утилиту `client-keystone-auth`. Подробнее в разделе [Подключение к кластеру с помощью kubectl](../connect/kubectl).
- Утилиту [curl](https://curl.se/download.html).
- [Docker Engine](https://docs.docker.com/engine/install/):
  - Для Windows и macOS: Docker Desktop.
  - Для Linux также рекомендуется Docker Desktop, однако вы можете установить и использовать Docker из командной строки.

### 1.4. Подключитесь к кластеру

1. Добавьте в личном кабинете роль **Администратор Kubernetes** для пользователя, от имени которого будет выполняться подключение к кластеру:

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится созданный ранее кластер.
   1. Перейдите в раздел **Управление доступами**.
   1. Раскройте меню нужного пользователя и выберите пункт **Редактировать**.
   1. Выберите роль **Администратор Kubernetes** из выпадающего списка.
   1. Сохраните изменения.

1. [Активируйте доступ по API](https://mcs.mail.ru/docs/additionals/api/api-account/api-access#aktivaciya-dostupa-po-api) для этого пользователя.

1. Получите kubeconfig для кластера в [личном кабинете VK Cloud](https://mcs.mail.ru/app/):

   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер, затем в его меню выберите пункт **Получить Kubeconfig для доступа к кластеру**.

1. Переместите kubeconfig в директорию `~/.kube`, чтобы при использовании `kubectl` не указывать дополнительные аргументы.

   В приведенных ниже командах предполагается, что kubeconfig был загружен в директорию `~/Downloads` под именем `mycluster_kubeconfig.yaml`.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   mkdir ~/.kube && \
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   mkdir ~/.kube; `
   mv ~/Downloads/mycluster_kubeconfig.yaml ~/.kube/config
   ```

   </tabpanel>
   </tabs>

1. Проверьте, что `kubectl` может подключиться к кластеру:

   1. Выполните команду:

      ```bash
      kubectl cluster-info
      ```

   1. Введите пароль пользователя от личного кабинета VK Cloud.

   Если кластер работает нормально и `kubectl` настроен на работу с ним, будет выведена похожая информация:

   ```text
   Kubernetes control plane is running at...
   CoreDNS is running at...

   To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
   ```

## 2. Получите доступ к средствам мониторинга кластера

В кластере был установлен аддон со [средствами мониторинга](../monitoring) на базе Prometheus и Grafana. Также для всех кластеров Kubernetes VK Cloud доступен [Kubernetes Dashboard](../connect/k8s-dashboard/), который позволяет не только управлять кластером, но и осуществлять его мониторинг.

<tabs>
<tablist>
<tab>Prometheus + Grafana</tab>
<tab>Kubernetes Dashboard</tab>
</tablist>
<tabpanel>

1. В отдельной сессии терминала выполните команду:

   ```
   kubectl -n prometheus-monitoring port-forward service/kube-prometheus-stack-grafana 8001:80
   ```

   <warn>

   - Не закрывайте эту сессию, иначе доступ к веб-интерфейсу Grafana пропадет.
   - Если порт `8001` уже используется другим приложением, скорректируйте команду, указав свободный порт.

   </warn>

1. Откройте веб-интерфейс Grafana:

   1. В браузере перейдите по URL `http://127.0.0.1:8001/`.
   1. Авторизуйтесь с помощью пары логин/пароль `admin`/`grafana-password-123456`.
   1. Если будет запрошена смена пароля, смените его.

1. Выберите в боковом меню **Dashboards → Browse** любой преднастроенный дашборд для получения информации о ресурсах кластера.

</tabpanel>
<tabpanel>

1. В отдельной сессии терминала выполните команду:

   ```bash
   kauthproxy -n kubernetes-dashboard https://kubernetes-dashboard.svc
   ```

   <warn>

   Не закрывайте эту сессию, иначе доступ к веб-интерфейсу Kubernetes Dashboard пропадет.

   </warn>

1. Введите пароль пользователя от личного кабинета VK Cloud, если пароль будет запрошен.

Откроется браузер, и вы будете направлены в веб-интерфейс Kubernetes Dashboard. Далее выберите для просмотра любую доступную категорию для получения информации о ресурсах кластера.

</tabpanel>
</tabs>

## 3. Загрузите нужные образы в реестр Docker

В кластере был установлен аддон [реестра Docker](../connect/docker-registry/), в котором будут храниться Docker-образы.

<info>

Чтобы наиболее полно продемонстрировать возможности кластера, далее будет собран особый Docker-образ с веб-сервером NGINX.
Образ основан на plaintext-версии [демо-образа](https://github.com/nginxinc/NGINX-Demos/tree/master/nginx-hello-nonroot) от NGINX.

</info>

Чтобы поместить собственные образы в реестр Docker кластера:

1. Добавьте реестр Docker в список доверенных реестров:

   1. Добавьте в конфигурационный файл Docker `daemon.json` следующий параметр c URL эндпоинта реестра Docker:

      ```json
      {
        ...

        "insecure-registries": [
          "192.0.2.22:5000"
        ],

        ...
      }
      ```

      Расположение этого файла для разных инсталляций Docker Engine приведено в [официальной документации Docker](https://docs.docker.com/config/daemon/#configure-the-docker-daemon).

   1. Перезапустите Docker Engine.

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
      <tab>macOS</tab>
      </tablist>
      <tabpanel>

      Выполните одно из следующих действий:

      - Используйте одну из команд для перезапуска:

        ```bash
        sudo systemd restart docker
        ```

        ```bash
        sudo service docker restart
        ```

      - [Перезапустите Docker Engine](https://docs.docker.com/desktop/settings/linux/#docker-engine) из графического интерфейса Docker Desktop (если он установлен).

      </tabpanel>
      <tabpanel>

      [Перезапустите Docker Engine](https://docs.docker.com/desktop/settings/windows/#docker-engine) из графического интерфейса Docker Desktop.

      </tabpanel>
      <tabpanel>

      [Перезапустите Docker Engine](https://docs.docker.com/desktop/settings/mac/#docker-engine) из графического интерфейса Docker Desktop.

      </tabpanel>
      </tabs>

1. Соберите Docker-образ:

   1. Создайте директорию для файлов и перейдите в нее:

      <tabs>
      <tablist>
      <tab>Linux/macOS</tab>
      <tab>Windows</tab>
      </tablist>
      <tabpanel>

      ```bash
      mkdir ~/image-build && cd ~/image-build
      ```

      </tabpanel>
      <tabpanel>

      ```powershell
      mkdir ~/image-build; cd ~/image-build
      ```

      </tabpanel>
      </tabs>

   1. Поместите в эту директорию следующие файлы:

      <details>
      <summary markdown="span">Dockerfile</summary>

      ```ini
      FROM nginx:mainline-alpine

      RUN chmod -R a+w /var/cache/nginx/ \
              && touch /var/run/nginx.pid \
              && chmod a+w /var/run/nginx.pid \
              && rm /etc/nginx/conf.d/*

      COPY nginx-config.conf /etc/nginx/conf.d/
      USER nginx
      ```

      </details>

      <details>
      <summary markdown="span">nginx-config.conf</summary>

      ```ini
      server {
          listen 8080;

          location / {

              set $k8s_pv "not present";

              if (-d /etc/nginx/k8s_demo_pv/) {
                set $k8s_pv "present";
              }

              default_type text/plain;
              expires -1;
              return 200 'Server address: $server_addr:$server_port\nServer name: $hostname\nDate: $time_local\nURI: $request_uri\nRequest ID: $request_id\nRemote address (NGINX Ingress Controller): $remote_addr\nX-Forwarded-For (Request source): $http_x_forwarded_for\n\nK8S Persistent Volume status: $k8s_pv\n';
          }
      }
      ```

      </details>

   1. Запустите сборку образа:

      ```bash
      docker build . -t 192.0.2.22:5000/nginx-k8s-demo:latest
      ```

   Дождитесь завершения сборки образа.

1. Разместите собранный образ в реестре Docker:

   1. Выполните вход в реестр:

      ```bash
      docker login 192.0.2.22:5000 --username registry --password registry-password-123456
      ```

   1. Запушьте образ в реестр:

      ```bash
      docker push 192.0.2.22:5000/nginx-k8s-demo:latest
      ```

   1. Проверьте, что образ находится в реестре:

      ```bash
      curl -k -X GET -u registry:registry-password-123456 https://192.0.2.22:5000/v2/_catalog
      ```

      Должна быть выведена похожая информация:

      ```text
      {"repositories":["nginx-k8s-demo"]}
      ```

   1. Создайте секрет Kubernetes, чтобы можно было получить доступ к загруженному образу из Kubernetes:

      ```bash
      kubectl create secret docker-registry k8s-registry-creds --docker-server=192.0.2.22:5000 --docker-username=registry --docker-password=registry-password-123456
      ```

## 4. Разверните демо-приложения

На основе загруженного в реестр Docker образа `nginx-k8s-demo` будет развернуто два приложения: `tea` и `coffee`.
Для каждого из приложений будут созданы:

- [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), чтобы внутрь приложения можно было монтировать тома с данными.
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), в котором будут заданы:
  - Количество реплик.
  - Том для монтирования в под.
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/) для обеспечения доступа к приложению. В дальнейшем Ingress-контроллер будет пересылать входящие запросы к этому Service.

Чтобы развернуть приложения:

1. Создайте директорию для файлов и перейдите в нее:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   mkdir ~/k8s-deployments && cd ~/k8s-deployments
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   mkdir ~/k8s-deployments; cd ~/k8s-deployments
   ```

   </tabpanel>
   </tabs>

1. Поместите в эту директорию следующие файлы:

   <details>
   <summary markdown="span">deploy-coffee.yaml</summary>

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-coffee
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: coffee
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: coffee
     template:
       metadata:
         labels:
           app: coffee
       spec:
         volumes:
           - name: k8s-pv-coffee
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-coffee
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: coffee
             image: 192.0.2.22:5000/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-coffee
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: coffee
   ```

   </details>

   <details>
   <summary markdown="span">deploy-tea.yaml</summary>

   ```yaml
   kind: PersistentVolumeClaim
   apiVersion: v1
   metadata:
     name: k8s-demo-pvc-tea
   spec:
     storageClassName: "csi-ceph-hdd-ms1"
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi

   ---
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: tea
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: tea
     template:
       metadata:
         labels:
           app: tea
       spec:
         volumes:
           - name: k8s-pv-tea
             persistentVolumeClaim:
               claimName: k8s-demo-pvc-tea
         imagePullSecrets:
           - name: k8s-registry-creds
         containers:
           - name: tea
             image: 192.0.2.22:5000/nginx-k8s-demo:latest
             imagePullPolicy: Always
             ports:
               - containerPort: 8080
             volumeMounts:
               - name: k8s-pv-tea
                 mountPath: /etc/nginx/k8s_demo_pv

   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: tea-svc
   spec:
     ports:
       - port: 80
         targetPort: 8080
         protocol: TCP
         name: http
     selector:
       app: tea
   ```

   </details>

   <warn>

   Обратите внимание, что в конфигурационных файлах `deploy-coffee.yaml` и `deploy-tea.yaml` для Persistent Volume Claim указывается класс хранения, соответствующий зоне доступности узла (MS1), на котором планируется развернуть приложения.

   Попытка разместить на узле в одной зоне доступности приложение, к которому примонтирован том из другой зоны доступности, завершится неудачей.

   </warn>

1. Разверните приложения:

   ```bash
   kubectl apply -f deploy-coffee.yaml -f deploy-tea.yaml
   ```

1. Проверьте корректность развертывания:

   <tabs>
   <tablist>
   <tab>Постоянных томов</tab>
   <tab>Рабочей нагрузки</tab>
   <tab>Сервисов</tab>
   </tablist>
   <tabpanel>

   Воспользуйтесь одним из способов:

   - `kubectl`: выполните команду.

     ```bash
     kubectl get pv
     ```

   - Grafana: откройте дашборд **Kubernetes → Compute Resources → Persistent Volumes**.

   - Kubernetes Dashboard: откройте дашборд **Cluster → Persistent Volumes**.

   Будет видна информация о том, что присутствуют постоянные тома объемом 1 ГБ, созданные при помощи Persistent Volume Claim для deployments `tea` и `coffee`.

   </tabpanel>
   <tabpanel>

   Воспользуйтесь одним из способов:

   - `kubectl`: выполните команду.

     ```bash
     kubectl get deployment
     ```

   - Grafana: откройте дашборд **Kubernetes → Compute Resources → Namespace (Workloads)**.

   - Kubernetes Dashboard: откройте дашборд **Workloads → Deployments**.

   Будет видна информация о том, что есть deployment `coffee` из трех подов, и deployment `tea` из двух подов.

   </tabpanel>
   <tabpanel>

   Воспользуйтесь одним из способов:

   - `kubectl`: выполните команду.

     ```bash
     kubectl get svc
     ```

   - Kubernetes Dashboard: откройте дашборд **Service → Services**.

   Будет видна информация о том, что есть два сервиса `coffee-svc` и `tea-svc` типа `ClusterIP`.

   </tabpanel>
   </tabs>

## 5. Настройте Ingress для демо-приложений

В кластере был установлен аддон [Ingress-контроллера](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) NGINX, позволяющий маршрутизировать входящие запросы пользователей к развернутым в кластере приложениям.

Чтобы Ingress-контроллер маршрутизировал запросы к соответствующим ресурсам Service, через которые опубликованы демо-приложения `tea` и `coffee`:

1. Поместите в директорию `~/k8s-deployments` следующий файл:

   <details>
   <summary markdown="span">deploy-ingress.yaml</summary>

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     rules:
       - host: cafe.example.com
         http:
           paths:
             - path: /tea
               pathType: Prefix
               backend:
                 service:
                   name: tea-svc
                   port:
                     number: 80
             - path: /coffee
               pathType: Prefix
               backend:
                 service:
                   name: coffee-svc
                   port:
                     number: 80
   ```

   <details>

1. Разверните ресурс [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/):

   ```bash
   kubectl apply -f deploy-ingress.yaml
   ```

1. Проверьте корректность развертывания с помощью `kubectl`, выполнив команду:

   ```bash
   kubectl get ingress
   ```

   Будет видна информация о том, что есть работающий ресурс Ingress.

## 6. Проверьте работоспособность всех созданных ресурсов в кластере

Чтобы проверить работоспособность примера, выполните с помощью `curl` запросы к IP-адресу `192.0.2.2` балансировщика нагрузки. Связанный с балансировщиком Ingress-контроллер затем доставит эти запросы нужным приложениям.

Запросы:

<tabs>
<tablist>
<tab>Для приложения tea</tab>
<tab>Для приложения coffee</tab>
</tablist>
<tabpanel>

```bash
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/tea
```

Должна быть выведена похожая информация:

```text
Server address: 10.100.109.3:8080
Server name: tea-8697dc7b86-s5vgn
Date: 24/Aug/2022:09:27:34 +0000
URI: /tea
Request ID: ed83bd555afd25c103bfa05ee12cbfff
Remote address (NGINX Ingress Controller): <IP-адрес Ingress-контроллера>
X-Forwarded-For (Request source): <IP-адрес хоста, с которого выполнялся запрос>

K8S Persistent Volume status: present
```

</tabpanel>
<tabpanel>

```bash
curl --resolve cafe.example.com:80:192.0.2.2 http://cafe.example.com/coffee
```

Должна быть выведена похожая информация:

```text
Server address: 10.100.109.0:8080
Server name: coffee-5f48899848-4q97z
Date: 24/Aug/2022:09:35:57 +0000
URI: /coffee
Request ID: 35e93a2538be8843c1c1fcd65b5aac4c
Remote address (NGINX Ingress Controller): <IP-адрес Ingress-контроллера>
X-Forwarded-For (Request source): <IP-адрес хоста, с которого выполнялся запрос>

K8S Persistent Volume status: present
```

</tabpanel>
</tabs>

Такой результат демонстрирует, что:

1. Можно запускать приложения, использующие Docker-образы из кластерного реестра Docker.
1. Можно монтировать хранилище VK Cloud к подам с помощью Persistent Volume Claim.
1. Предоставляемый с кластером Ingress-контроллер настроен корректно, т. к. показывает реальный IP-адрес источника запроса.

## Проконтролируйте использование ресурсов

Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [остановите](../operations/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
- [удалите](../operations/manage-cluster#udalit_klaster) его навсегда.

## Что дальше?

- [Познакомьтесь со сценариями использования](../use-cases/) кластера.
- [Познакомьтесь с концепциями](../concepts/) сервиса контейнеров.
- [Познакомьтесь с подробными инструкциями](../connect) по подключению к кластеру.
