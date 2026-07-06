# {heading(Развертывание Ingress-контроллера с HTTP-балансировщиком)[id=k8s-ingress-http]}

{note:warn}
При развертывании Ingress-контроллера для него будет создан {linkto(../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщика {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Ingress-контроллер можно развернуть  {linkto(../../../concepts/network#k8s-network)[text=в связке с HTTP-балансировщиком нагрузки]} платформы {var(cloud)}. Далее для примера будут созданы простые демо-приложения и ресурс Ingress для проверки работоспособности контроллера.

Далее предполагается, что будет развернут NGINX Ingress Controller. Однако предложенные подходы можно адаптировать и под другие Ingress-контроллеры, например, Traefik. При таком развертывании Ingress нужно вручную добавлять worker-узлы в правила балансировщика нагрузки. Это верно как при ручном изменении размера worker-группы, так и при включении автомасштабирования.

## {heading(1. Подготовительные шаги)[id=k8s-ingress-http-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}

   При создании кластера выберите опцию **Назначить внешний IP**.

   Прочие параметры кластера выберите на свое усмотрение.

1. {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Убедитесь]}, что аддон NGINX Ingress (`ingress-nginx`) **не установлен** в кластере. В демонстрационных целях Ingress-контроллер будет установлен вручную.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. {linkto(../../../install-tools/helm#k8s-helm)[text=Установите]} Helm, если утилита еще не установлена.

1. Установите [curl](https://curl.se/docs/), если утилита еще не установлена.

## {heading(2. Разверните демо-приложения)[id=k8s-ingress-http-deploy-demo]}

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

## {heading(3. Установите Ingress-контроллер)[id=k8s-ingress-http-install-ingress]}

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

1. Установите Ingress-контроллер с сервисом `NodePort`, выполнив команду:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress \
    --create-namespace --namespace example-nginx-ingress-http \
    --set controller.service.type=NodePort \
    --set controller.service.httpsPort.enable=false \
    --set controller.service.externalTrafficPolicy=Local

   ```

   {/tab}

   {tab(Windows)}

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress `
    --create-namespace --namespace example-nginx-ingress-http `
    --set controller.service.type=NodePort `
    --set controller.service.httpsPort.enable=false `
    --set controller.service.externalTrafficPolicy=Local
   ```

   {/tab}

   {/tabs}

1. Дождитесь завершения установки Ingress-контроллера и назначения контроллеру порта.

   Для проверки состояния Ingress-контроллера выполните команду:

   ```console
   kubectl get svc -n example-nginx-ingress-http
   ```

   Вывод команды должен быть похож на этот:

   ```text
   NAME                               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                     AGE
   nginx-ingress-http-nginx-ingress   NodePort   ...            <none>        80:<назначенный порт>/TCP   ...
   ```

## {heading(4. Создайте HTTP-балансировщик нагрузки)[id=k8s-ingress-http-create-http-balancer]}

HTTP-балансировщик нагрузки будет терминировать SSL/TLS-соединения и перенаправлять на Ingress-контроллер только HTTP-трафик.

Для настройки балансировщика:

1. Соберите нужные данные:

   - Имена сети и подсети, в которой располагаются узлы кластера.
   - Имена инстансов сервиса Cloud Servers, которые соответствуют master-узлам и worker-узлам кластера.
   - Номер порта, который был назначен Ingress-контроллеру на предыдущем шаге.

1. Создайте балансировщик:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Виртуальные сети → Балансировщики нагрузки**.
   1. Нажмите кнопку **Добавить**.
   1. В появившемся окне:
      1. Задайте **название балансировщика** (любое).
      1. Выберите сеть и подсеть, которые совпадают с таковыми у кластера.
      1. Задайте **DNS-имя** (любое).
      1. Убедитесь, что опция **Назначить внешний IP** включена.
      1. Задайте параметры обработки для каждого типа трафика:

         {tabs}

         {tab(Для HTTP-трафика)}

         1. В блоке **Правила балансировки** нажмите ссылку **+ Добавить правило**.
         1. Выберите **Протокол назначения** `HTTP`, задайте для него **порт**, который был назначен Ingress-контроллеру.
         1. В блоке **Разрешенные CIDR** нажмите ссылку **+ Добавить адрес**. Введите `0.0.0.0/0`.
         1. Выберите опцию **Отправлять заголовок X-Forwarded-For**.
         1. В блоке **Применить для следующих инстансов** добавьте все инстансы сервиса Cloud Servers, которые соответствуют master-узлам и worker-узлам кластера.

            Выставьте одинаковые веса для всех инстансов, равные `1`.

         1. Нажмите кнопку **Следующий шаг**.
         1. Нажмите кнопку **Добавить**.

         {/tab}

         {tab(Для HTTPS-трафика)}

         1. В блоке **Правила балансировки** нажмите ссылку **+ Добавить правило**.
         1. Выберите **Протокол балансировки** `HTTPS`.
         1. Выберите **Протокол назначения** `HTTP`, задайте для него **порт**, который был назначен Ingress-контроллеру.
         1. В блоке **Разрешенные CIDR** нажмите ссылку **+ Добавить адрес**. Введите `0.0.0.0/0`.
         1. Выберите опцию **Отправлять заголовок X-Forwarded-For**.
         1. В блоке **Применить для следующих инстансов** добавьте все инстансы сервиса Cloud Servers, которые соответствуют master-узлам и worker-узлам кластера.

            Выставьте одинаковые веса для всех инстансов, равные `1`.

         1. В блоке **Сертификат**:

            1. Выберите пункт **Загрузить новый сертификат**.
            1. Задайте **название сертификата** (любое).

            1. Вставьте содержимое под спойлером в поле **Сертификат или цепочка сертификатов**.

               {cut(Публичная часть самоподписанного сертификата NGINX certificate.pub)}

               ```text
               -----BEGIN CERTIFICATE-----
               MIIDLjCCAhYCCQDAOF9tLsaXWjANBgkqhkiG9w0BAQsFADBaMQswCQYDVQQGEwJV
               UzELMAkGA1UECAwCQ0ExITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0
               ZDEbMBkGA1UEAwwSY2FmZS5leGFtcGxlLmNvbSAgMB4XDTE4MDkxMjE2MTUzNVoX
               DTIzMDkxMTE2MTUzNVowWDELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMSEwHwYD
               VQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxGTAXBgNVBAMMEGNhZmUuZXhh
               bXBsZS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp6Kn7sy81
               p0juJ/cyk+vCAmlsfjtFM2muZNK0KtecqG2fjWQb55xQ1YFA2XOSwHAYvSdwI2jZ
               ruW8qXXCL2rb4CZCFxwpVECrcxdjm3teViRXVsYImmJHPPSyQgpiobs9x7DlLc6I
               BA0ZjUOyl0PqG9SJexMV73WIIa5rDVSF2r4kSkbAj4Dcj7LXeFlVXH2I5XwXCptC
               n67JCg42f+k8wgzcRVp8XZkZWZVjwq9RUKDXmFB2YyN1XEWdZ0ewRuKYUJlsm692
               skOrKQj0vkoPn41EE/+TaVEpqLTRoUY3rzg7DkdzfdBizFO2dsPNFx2CW0jXkNLv
               Ko25CZrOhXAHAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAKHFCcyOjZvoHswUBMdL
               RdHIb383pWFynZq/LuUovsVA58B0Cg7BEfy5vWVVrq5RIkv4lZ81N29x21d1JH6r
               jSnQx+DXCO/TJEV5lSCUpIGzEUYaUPgRyjsM/NUdCJ8uHVhZJ+S6FA+CnOD9rn2i
               ZBePCI5rHwEXwnnl8ywij3vvQ5zHIuyBglWr/Qyui9fjPpwWUvUm4nv5SMG9zCV7
               PpuwvuatqjO1208BjfE/cZHIg8Hw9mvW9x9C+IQMIMDE7b/g6OcK7LGTLwlFxvA8
               7WjEequnayIphMhKRXVf1N349eN98Ez38fOTHTPbdJjFA/PcC+Gyme+iGt5OQdFh
               yRE=
               -----END CERTIFICATE-----
               ```

               {/cut}

            1. Вставьте содержимое под спойлером в поле **Приватный ключ**.

               {cut(Приватная часть самоподписанного сертификата NGINX private.key)}

               ```text
               -----BEGIN RSA PRIVATE KEY-----
               <ЗНАЧЕНИЕ_ЗАКРЫТОГО_RSA_КЛЮЧА>
               -----END RSA PRIVATE KEY-----
               ```

               {/cut}

            {note:info}
            Самоподписанный сертификат NGINX используется для доступа к опубликованным приложениям на домене `cafe.example.com`.
            {/note}

         1. Нажмите кнопку **Следующий шаг**.
         1. Нажмите кнопку **Добавить**.

         {/tab}

         {/tabs}

   Начнется операция создания балансировщика, которая займет некоторое время.

1. После создания балансировщика скопируйте его публичный IP-адрес, он понадобится для доступа к опубликованным через Ingress ресурсам.

## {heading(5. Создайте ресурс Ingress)[id=k8s-ingress-http-create-ingress]}

Ресурс Ingress опубликует сервисы `coffee-svc` и `tea-svc` на домене `cafe.example.com` через Ingress-контроллер, таким образом предоставив доступ к приложениям.

Далее будет продемонстрировано, как создать ресурс Ingress, который работает исключительно с HTTP-трафиком, который приходит от HTTP-балансировщика, настроенного ранее:

1. Создайте файл манифеста `cafe-ingress.yaml` со следующим содержимым:

   {cut(cafe-ingress.yaml)}

   ```text
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

   {/cut}

1. Примените этот манифест в кластере:

   ```console
   kubectl apply -f ./cafe-ingress.yaml
   ```

   Будет создан ресурс Ingress `cafe-ingress`.

1. Проверьте, что ресурс успешно создался, выполнив команду:

   ```console
   kubectl describe ingress cafe-ingress
   ```

   Вывод команды должен быть похож на этот:

   ```console
   Name:             cafe-ingress-http
   Labels:           <none>
   Namespace:        default
   Address:
   Ingress Class:    nginx
   Default backend:  <default>
   Rules:
     Host              Path  Backends
     ----              ----  --------
     cafe.example.com
                       /tea      tea-svc:80 (10.100.54.15:8080,10.100.54.16:8080,10.100.54.17:8080)
                       /coffee   coffee-svc:80 (10.100.54.13:8080,10.100.54.14:8080)
   ```

## {heading(6. Проверьте доступность приложений)[id=k8s-ingress-http-check-apps]}

1. Проверьте, что поды с именами `tea` и `coffee` существуют, получив список всех подов в пространстве имен `default`:

   ```console
   kubectl get pods
   ```

1. Выполните команду:

   {tabs}

   {tab(Coffee)}

   ```console
   curl -k --resolve cafe.example.com:443:<публичный IP-адрес HTTP-балансировщика> https://cafe.example.com/coffee
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

   - взаимодействует с HTTP-балансировщиком нагрузки {var(cloud)} (который терминирует SSL/TLS-сессии);
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   {/tab}

   {tab(Tea)}

   ```console
   curl -k --resolve cafe.example.com:443:<публичный IP-адрес HTTP-балансировщика> https://cafe.example.com/tea
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

   - взаимодействует с HTTP-балансировщиком нагрузки {var(cloud)} (который терминирует SSL/TLS-сессии);
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   {/tab}

   {/tabs}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-ingress-http-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы Ingress-контроллера, вам больше не нужны, удалите их:

1. Удалите ресурсы, описанные в файлах манифестов, приложение `example-nginx-ingress-http`, а также пространство имен `example-nginx-ingress-http` и связанные с ним ресурсы:

   {note:info}
   HTTP-балансировщик нагрузки, созданный для Ingress-контроллера, не будет удален. При необходимости удалите его вручную из интерфейса личного кабинета {var(cloud)}.
   {/note}

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http
   kubectl delete namespace example-nginx-ingress-http
   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http; `
   kubectl delete namespace example-nginx-ingress-http
   ```

   {/tab}

   {/tabs}

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}