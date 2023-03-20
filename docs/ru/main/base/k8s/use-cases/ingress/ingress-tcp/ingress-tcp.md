<warn>

При развертывании Ingress-контроллера для него будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщика [тарифицируется](/ru/main/networks/vnet/tariffs).

</warn>

Ingress-контроллер можно развернуть [в связке с TCP-балансировщиком нагрузки](../../../concepts/network) платформы VK Cloud. Далее для примера будут созданы простые демо-приложения и ресурс Ingress для проверки работоспособности контроллера. Далее предполагается, что будет развернут NGINX Ingress Controller. Однако предложенные подходы можно адаптировать и под другие Ingress-контроллеры, например, Traefik.

## 1. Подготовительные шаги

1. [Создайте](../../../operations/create-cluster) кластер Kubernetes самой актуальной версии.

   При создании кластера выберите опцию **Назначить внешний IP**.

   Прочие параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../operations/addons/manage-addons#prosmotr-addonov), что аддон NGINX Ingress (`ingress-nginx`) **не установлен** в кластере. В демонстрационных целях Ingress-контроллер будет установлен вручную.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

1. [Установите](../../../install-tools/helm) Helm, если утилита еще не установлена.

1. Установите [curl](https://curl.se/docs/), если утилита еще не установлена.

## 2. Разверните демо-приложения

К этим приложениям будет организован доступ через Ingress-контроллер с помощью ресурса Ingress.

Для демонстрации будут использованы приложения `tea` и `coffee` из [примера Cafe от NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example). Каждое приложение состоит из ReplicaSet, Deployment и Service, соотвествующего этому Deployment.

Чтобы развернуть демо-приложения:

1. Загрузите манифест [cafe.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml).

1. Примените этот манифест в кластере:

   ```bash
   kubectl apply -f ./cafe.yaml
   ```

Для проверки состояния компонентов приложений выполните команду:

```bash
kubectl get svc,rs,deployment -n default
```

Вывод команды должен быть похож на этот:

```text
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
service/coffee-svc   ClusterIP   ...              <none>        80/TCP    ...
service/tea-svc      ClusterIP   ...              <none>        80/TCP    ...

NAME                                DESIRED   CURRENT   READY   AGE
replicaset.apps/coffee-7c86d7d67c   2         2         2       ...
replicaset.apps/tea-5c457db9        3         3         3       ...

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/coffee   2/2     2            2           ...
deployment.apps/tea      3/3     3            3           ...
```

## 3. Установите Ingress-контроллер

При установке выберите режим работы c использованием [PROXY-протокола](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt), так как это необходимо для полноценного взаимодействия с TCP-балансировщиком нагрузки. Если установить Ingress-контроллер без поддержки этого протокола, то контроллер не сможет обрабатывать заголовки, содержащие информацию о непосредственном источнике запросов.

Чтобы установить NGINX Ingress Controller с поддержкой PROXY-протокола:

1. Добавьте Helm-репозиторий NGINX:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   helm repo add nginx-stable https://helm.nginx.com/stable
   helm repo update

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   helm repo add nginx-stable https://helm.nginx.com/stable; `
   helm repo update
   ```

   </tabpanel>
   </tabs>

1. Установите Ingress-контроллер с поддержкой PROXY-протокола, выполнив команду:

   ```bash
   helm install nginx-ingress-tcp nginx-stable/nginx-ingress --set-string 'controller.config.entries.use-proxy-protocol=true' --create-namespace --namespace example-nginx-ingress-tcp
   ```

1. Дождитесь завершения установки Ingress-контроллера и получения контроллером внешнего IP-адреса.

   Для проверки состояния Ingress-контроллера выполните команду:

   ```
   kubectl get svc -n example-nginx-ingress-tcp
   ```

   Вывод команды должен быть похож на этот:

   ```text
   NAME                              TYPE           CLUSTER-IP    EXTERNAL-IP                             PORT(S)    AGE
   nginx-ingress-tcp-nginx-ingress   LoadBalancer   ...           <назначенный балансирощику IP-адрес>    ...        ...
   ```

Проверьте работоспособность Ingress-контроллера, перейдя в браузере по адресу `http://<назначенный балансирощику IP-адрес>`. Если контроллер настроен корректно, отобразится страница со статусом `HTTP 404`.

## 4. Создайте ресурс Ingress

Ресурс Ingress опубликует сервисы `coffee-svc` и `tea-svc` через Ingress-контроллер, таким образом предоставив доступ к приложениям.

Далее будет продемонстрировано, как создать ресурс Ingress с терминированием SSL\TLS-сессий на Ingress-контроллере. Если вы планируете использовать HTTPS, терминирование сессий должно выполняться именно на контроллере, так как TCP-балансировщик нагрузки не имеет технической возможности терминировать SSL\TLS-сессии.

Чтобы создать ресурс Ingress:

1. Создайте секрет Kubernetes, который будет содержать в себе данные о сертификате. Он будет использоваться Ingress-контроллером при работе с HTTPS-трафиком.

   В этом секрете содержатся публичная и приватная части самоподписанного сертификата NGINX, который используется для доступа к опубликованным приложениям на домене `cafe.example.com`.

   <warn>

   Приватная часть этого сертификата публично доступна в интернете, поэтому не используйте этот сертификат для защиты реальных приложений, работающих в промышленном окружении (production environment).

   </warn>

1. Загрузите манифест [cafe-secret.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-secret.yaml).

1. Примените этот манифест в кластере:

   ```bash
   kubectl apply -f ./cafe-secret.yaml
   ```

   Будет создан секрет `cafe-secret`.

1. Проверьте, что секрет успешно создался, выполнив команду:

   ```bash
   kubectl describe secret cafe-secret
   ```

   Будет выведена основная информация о секрете.

1. Создайте ресурс Ingress, который будет обрабатывать входящие запросы к хосту `cafe.example.com`:

   1. Загрузите манифест [cafe-ingress.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-ingress.yaml).

   1. Примените этот манифест в кластере:

      ```bash
      kubectl apply -f ./cafe-ingress.yaml
      ```

      Будет создан ресурс Ingress `cafe-ingress`.

   Проверьте, что ресурс успешно создался, выполнив команду:

   ```bash
   kubectl describe ingress cafe-ingress
   ```

   Вывод команды должен быть похож на этот:

   ```bash
   Name:             cafe-ingress
   Labels:           <none>
   Namespace:        default
   Address:          <назначенный балансирощику IP-адрес>
   Ingress Class:    nginx
   Default backend:  <default>
   TLS:
     cafe-secret terminates cafe.example.com
   Rules:
     Host              Path  Backends
     ----              ----  --------
     cafe.example.com
                       /tea      tea-svc:80 (...)
                       /coffee   coffee-svc:80 (...)
   ```

   Обратите внимание, что назначенный Ingress IP-адрес должен совпадать с IP-адресом, назначенном Ingress-контроллеру. Этот адрес принадлежит TCP-балансировщику платформы VK Cloud, который направляет входящий трафик в Ingress-контроллер.

## 5. Проверьте доступность приложений

1. Проверьте, что поды с именами `tea` и `coffee` существуют, получив список всех подов в пространстве имен `default`:

   ```bash
   kubectl get pods
   ```

1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Coffee</tab>
   <tab>Tea</tab>
   </tablist>
   <tabpanel>

   ```bash
   curl -k --resolve cafe.example.com:443:<IP-адрес Ingress> https://cafe.example.com/coffee
   ```

   На запрос должен ответить один из двух подов `coffee`. В ответе будет содержаться имя пода, который ответил (`Server name`), например:

   ```text
   Server address: ...:8080
   Server name: coffee-7c86d7d67c-zsmwz
   Date: ...
   URI: /coffee
   Request ID: ...
   ```

   Получение подобных ответов означает, что Ingress-контроллер корректно настроен:

   - взаимодействует с TCP-балансировщиком нагрузки VK Cloud;
   - терминирует SSL\TLS-сессии;
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   </tabpanel>
   <tabpanel>

   ```bash
   curl -k --resolve cafe.example.com:443:<IP-адрес Ingress> https://cafe.example.com/tea
   ```

   На запрос должен ответить один из трех подов `tea`. В ответе будет содержаться имя пода, который ответил (`Server name`), например:

   ```text
   Server address: ...:8080
   Server name: tea-5c457db9-gjkgk
   Date: ...
   URI: /tea
   Request ID: ...
   ```

   Получение подобных ответов означает, что Ingress-контроллер корректно настроен:

   - взаимодействует с TCP-балансировщиком нагрузки VK Cloud;
   - терминирует SSL\TLS-сессии;
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   </tabpanel>
   </tabs>

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <info>

   Также будет удален TCP-балансировщик нагрузки, созданный для Ingress-контроллера.

   </info>

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe-secret.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp
   kubectl delete namespace example-nginx-ingress-tcp

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe-secret.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp; `
   kubectl delete namespace example-nginx-ingress-tcp
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../operations/manage-cluster#zapustit-ili-ostanovit-klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../operations/manage-cluster#udalit-klaster) его навсегда.
