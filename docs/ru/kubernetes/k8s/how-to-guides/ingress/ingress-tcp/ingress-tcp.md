# {heading(Развертывание Ingress-контроллера с TCP-балансировщиком)[id=k8s-ingress-tcp]}

{note:warn}
При развертывании Ingress-контроллера для него будет создан {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщика {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Ingress-контроллер можно развернуть {linkto(../../../concepts/network#k8s-network)[text=в связке с TCP-балансировщиком нагрузки]} платформы {var(cloud)}. Далее для примера будут созданы простые демо-приложения и ресурс Ingress для проверки работоспособности контроллера. Далее предполагается, что будет развернут NGINX Ingress Controller. Однако предложенные подходы можно адаптировать и под другие Ingress-контроллеры, например, Traefik.

## {heading(1. Подготовительные шаги)[id=k8s-ingress-tcp-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}

   При создании кластера выберите опцию **Назначить внешний IP**.

   Прочие параметры кластера выберите на свое усмотрение.

1. {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон NGINX Ingress (`ingress-nginx`) **не установлен** в кластере. В демонстрационных целях Ingress-контроллер будет установлен вручную.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. {linkto(../../../install-tools/helm#k8s-helm)[text=Установите]} Helm, если утилита еще не установлена.

1. Установите [curl](https://curl.se/docs/), если утилита еще не установлена.

## {heading(2. Разверните демо-приложения)[id=k8s-ingress-tcp-deploy-demo]}

К этим приложениям будет организован доступ через Ingress-контроллер с помощью ресурса Ingress.

Для демонстрации будут использованы приложения `tea` и `coffee` из [примера Cafe от NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example). Каждое приложение состоит из ReplicaSet, Deployment и Service, соответствующего этому Deployment.

Чтобы развернуть демо-приложения:

1. Загрузите манифест [cafe.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml).

1. Примените этот манифест в кластере:

   ```console
   kubectl apply -f ./cafe.yaml
   ```

Для проверки состояния компонентов приложений выполните команду:

```console
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

## {heading(3. Установите Ingress-контроллер)[id=k8s-ingress-tcp-install-ingress]}

При установке выберите режим работы c использованием [PROXY-протокола](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt), так как это необходимо для полноценного взаимодействия с TCP-балансировщиком нагрузки. Если установить Ingress-контроллер без поддержки этого протокола, то контроллер не сможет обрабатывать заголовки, содержащие информацию о непосредственном источнике запросов.

Чтобы установить NGINX Ingress Controller с поддержкой PROXY-протокола:

1. Добавьте Helm-репозиторий NGINX:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable
   helm repo update

   ```

   {/tab}

   {tab(Windows)}

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable; `
   helm repo update
   ```

   {/tab}

   {/tabs}

1. Установите Ingress-контроллер с поддержкой PROXY-протокола, выполнив команду:

   ```console
   helm install nginx-ingress-tcp nginx-stable/nginx-ingress --set-string 'controller.config.entries.use-proxy-protocol=true' --create-namespace --namespace example-nginx-ingress-tcp
   ```

1. Дождитесь завершения установки Ingress-контроллера и получения контроллером внешнего IP-адреса.

   Для проверки состояния Ingress-контроллера выполните команду:

   ```console
   kubectl get svc -n example-nginx-ingress-tcp
   ```

   Вывод команды должен быть похож на этот:

   ```text
   NAME                            TYPE     CLUSTER-IP    EXTERNAL-IP                PORT(S) AGE
   nginx-ingress-tcp-nginx-ingress LoadBalancer ... <IP-АДРЕС_БАЛАНСИРОВЩИКА> ... ...
   ```

Проверьте работоспособность Ingress-контроллера, перейдя в браузере по адресу `http://<IP-АДРЕС_БАЛАНСИРОВЩИКА>`. Если контроллер настроен корректно, отобразится страница со статусом `HTTP 404`.

## {heading(4. Создайте ресурс Ingress)[id=k8s-ingress-tcp-create-ingress]}

Ресурс Ingress опубликует сервисы `coffee-svc` и `tea-svc` через Ingress-контроллер, таким образом предоставив доступ к приложениям.

Далее будет продемонстрировано, как создать ресурс Ingress с терминированием SSL/TLS-сессий на Ingress-контроллере.

Чтобы создать ресурс Ingress:

1. Создайте секрет Kubernetes, который будет содержать в себе данные о сертификате. Он будет использоваться Ingress-контроллером при работе с HTTPS-трафиком.

   В этом секрете содержатся публичная и приватная части самоподписанного сертификата NGINX, который используется для доступа к опубликованным приложениям на домене `cafe.example.com`.

   {note:warn}
   Приватная часть этого сертификата публично доступна в интернете, поэтому не используйте этот сертификат для защиты реальных приложений, работающих в промышленном окружении (production environment).
   {/note}

1. Загрузите манифест [cafe-secret.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-secret.yaml).

1. Примените этот манифест в кластере:

   ```console
   kubectl apply -f ./cafe-secret.yaml
   ```

   Будет создан секрет `cafe-secret`.

1. Проверьте, что секрет успешно создался, выполнив команду:

   ```console
   kubectl describe secret cafe-secret
   ```

   Будет выведена основная информация о секрете.

1. Создайте ресурс Ingress, который будет обрабатывать входящие запросы к хосту `cafe.example.com`:

   1. Загрузите манифест [cafe-ingress.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-ingress.yaml).

   1. Примените этот манифест в кластере:

      ```console
      kubectl apply -f ./cafe-ingress.yaml
      ```

      Будет создан ресурс Ingress `cafe-ingress`.

   Проверьте, что ресурс успешно создался, выполнив команду:

   ```console
   kubectl describe ingress cafe-ingress
   ```

   Вывод команды должен быть похож на этот:

   ```console
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

   Обратите внимание, что назначенный Ingress IP-адрес должен совпадать с IP-адресом, назначенном Ingress-контроллеру. Этот адрес принадлежит TCP-балансировщику платформы {var(cloud)}, который направляет входящий трафик в Ingress-контроллер.

## {heading(5. Проверьте доступность приложений)[id=k8s-ingress-tcp-check]}

1. Проверьте, что поды с именами `tea` и `coffee` существуют, получив список всех подов в пространстве имен `default`:

   ```console
   kubectl get pods
   ```

1. Выполните команду:

   {tabs}

   {tab(Coffee)}

   ```console
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

   - взаимодействует с TCP-балансировщиком нагрузки {var(cloud)};
   - терминирует SSL/TLS-сессии;
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   {/tab}

   {tab(Tea)}

   ```console
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

   - взаимодействует с TCP-балансировщиком нагрузки {var(cloud)};
   - терминирует SSL/TLS-сессии;
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   {/tab}

   {/tabs}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-ingress-tcp-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы Ingress-контроллера, вам больше не нужны, удалите их:

1. Удалите ресурсы, описанные в файлах манифестов, приложение `example-nginx-ingress-tcp`, а также пространство имен `example-nginx-ingress-tcp` и связанные с ним ресурсы:

   {note:info}
   Также будет удален TCP-балансировщик нагрузки, созданный для Ingress-контроллера.
   {/note}

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe-secret.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp
   kubectl delete namespace example-nginx-ingress-tcp

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe-secret.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-tcp -n example-nginx-ingress-tcp; `
   kubectl delete namespace example-nginx-ingress-tcp
   ```

   {/tab}

   {/tabs}

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}