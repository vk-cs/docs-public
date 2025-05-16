<warn>

При развертывании Ingress-контроллера для него будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

</warn>

Ingress-контроллер можно развернуть  [в связке с HTTP-балансировщиком нагрузки](../../../concepts/network) платформы VK Cloud. Далее для примера будут созданы простые демо-приложения и ресурс Ingress для проверки работоспособности контроллера.

Далее предполагается, что будет развернут NGINX Ingress Controller. Однако предложенные подходы можно адаптировать и под другие Ingress-контроллеры, например, Traefik. При таком развертывании Ingress нужно вручную добавлять worker-узлы в правила балансировщика нагрузки. Это верно как при ручном изменении размера worker-группы, так и при включении автомасштабирования.

## 1. Подготовительные шаги

1. [Создайте](../../../service-management/create-cluster) кластер Kubernetes самой актуальной версии.

   При создании кластера выберите опцию **Назначить внешний IP**.

   Прочие параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../service-management/addons/manage-addons#prosmotr_addonov), что аддон NGINX Ingress (`ingress-nginx`) **не установлен** в кластере. В демонстрационных целях Ingress-контроллер будет установлен вручную.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

1. [Установите](../../../install-tools/helm) Helm, если утилита еще не установлена.

1. Установите [curl](https://curl.se/docs/), если утилита еще не установлена.

## 2. Разверните демо-приложения

К этим приложениям будет организован доступ через Ingress-контроллер с помощью ресурса Ingress.

Для демонстрации будут использованы приложения `tea` и `coffee` из [примера Cafe от NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example). Каждое приложение состоит из ReplicaSet, Deployment и Service, соотвествующего этому Deployment.

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

## 3. Установите Ingress-контроллер

1. Добавьте Helm-репозиторий NGINX:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable
   helm repo update

   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm repo add nginx-stable https://helm.nginx.com/stable; `
   helm repo update
   ```

   </tabpanel>
   </tabs>

1. Установите Ingress-контроллер с сервисом `NodePort`, выполнив команду:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress \
    --create-namespace --namespace example-nginx-ingress-http \
    --set controller.service.type=NodePort \
    --set controller.service.httpsPort.enable=false \
    --set controller.service.externalTrafficPolicy=Local

   ```

   </tabpanel>
   <tabpanel>

   ```console
   helm install nginx-ingress-http nginx-stable/nginx-ingress `
    --create-namespace --namespace example-nginx-ingress-http `
    --set controller.service.type=NodePort `
    --set controller.service.httpsPort.enable=false `
    --set controller.service.externalTrafficPolicy=Local
   ```

   </tabpanel>
   </tabs>

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

## 4. Создайте HTTP-балансировщик нагрузки

HTTP-балансировщик нагрузки будет терминировать SSL/TLS-соединения и перенаправлять на Ingress-контроллер только HTTP-трафик.

Для настройки балансировщика:

1. Соберите нужные данные:

   - Имена сети и подсети, в которой располагаются узлы кластера.
   - Имена инстансов сервиса Cloud Servers, которые соответствуют master-узлам и worker-узлам кластера.
   - Номер порта, который был назначен Ingress-контроллеру на предыдущем шаге.

1. Создайте балансировщик:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Виртуальные сети → Балансировщики нагрузки**.
   1. Нажмите кнопку **Добавить**.
   1. В появившемся окне:
      1. Задайте **название балансировщика** (любое).
      1. Выберите сеть и подсеть, которые совпадают с таковыми у кластера.
      1. Задайте **DNS-имя** (любое).
      1. Убедитесь, что опция **Назначить внешний IP** включена.
      1. Задайте параметры обработки для каждого типа трафика:

         <tabs>
         <tablist>
         <tab>Для HTTP-трафика</tab>
         <tab>Для HTTPS-трафика</tab>
         </tablist>
         <tabpanel>

         1. В блоке **Правила балансировки** нажмите ссылку **+ Добавить правило**.
         1. Выберите **Протокол назначения** `HTTP`, задайте для него **порт**, который был назначен Ingress-контроллеру.
         1. В блоке **Разрешенные CIDR** нажмите ссылку **+ Добавить адрес**. Введите `0.0.0.0/0`.
         1. Выберите опцию **Отправлять заголовок X-Forwarded-For**.
         1. В блоке **Применить для следующих инстансов** добавьте все инстансы сервиса Cloud Servers, которые соответствуют master-узлам и worker-узлам кластера.

            Выставьте одинаковые веса для всех инстансов, равные `1`.

         1. Нажмите кнопку **Следующий шаг**.
         1. Нажмите кнопку **Добавить**.

         </tabpanel>
         <tabpanel>

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

               <details>
               <summary markdown="span">Публичная часть самоподписанного сертификата NGINX certificate.pub</summary>

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

               </details>

            1. Вставьте содержимое под спойлером в поле **Приватный ключ**.

               <details>
               <summary markdown="span">Приватная часть самоподписанного сертификата NGINX private.key</summary>

               ```text
               -----BEGIN RSA PRIVATE KEY-----
               <ЗНАЧЕНИЕ_ЗАКРЫТОГО_RSA_КЛЮЧА>
               -----END RSA PRIVATE KEY-----
               ```

               </details>

            <info>

            Самоподписанный сертификат NGINX используется для доступа к опубликованным приложениям на домене `cafe.example.com`.

            </info>

         1. Нажмите кнопку **Следующий шаг**.
         1. Нажмите кнопку **Добавить**.

         </tabpanel>
         </tabs>

   Начнется операция создания балансировщика, которая займет некоторое время.

1. После создания балансировщика скопируйте его публичный IP-адрес, он понадобится для доступа к опубликованным через Ingress ресурсам.

## 5. Создайте ресурс Ingress

Ресурс Ingress опубликует сервисы `coffee-svc` и `tea-svc` на домене `cafe.example.com` через Ingress-контроллер, таким образом предоставив доступ к приложениям.

Далее будет продемонстрировано, как создать ресурс Ingress, который работает исключительно с HTTP-трафиком, который приходит от HTTP-балансировщика, настроенного ранее:

1. Создайте файл манифеста `cafe-ingress.yaml` со следующим содержимым:

   <details>
   <summary markdown="span">cafe-ingress.yaml</summary>

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

   </details>

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

## 6. Проверьте доступность приложений

1. Проверьте, что поды с именами `tea` и `coffee` существуют, получив список всех подов в пространстве имен `default`:

   ```console
   kubectl get pods
   ```

1. Выполните команду:

   <tabs>
   <tablist>
   <tab>Coffee</tab>
   <tab>Tea</tab>
   </tablist>
   <tabpanel>

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

   - взаимодействует с HTTP-балансировщиком нагрузки VK Cloud (который терминирует SSL\TLS-сессии);
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   </tabpanel>
   <tabpanel>

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

   - взаимодействует с HTTP-балансировщиком нагрузки VK Cloud (который терминирует SSL\TLS-сессии);
   - обеспечивает доступ к сервисам, соответствующим развернутым приложениям.

   </tabpanel>
   </tabs>

## Удалите неиспользуемые ресурсы

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <info>

   HTTP-балансировщик нагрузки, созданный для Ingress-контроллера, не будет удален. При необходимости удалите его вручную из интерфейса личного кабинета VK Cloud.

   </info>

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```console
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http
   kubectl delete namespace example-nginx-ingress-http

   ```

   </tabpanel>
   <tabpanel>

   ```console
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http; `
   kubectl delete namespace example-nginx-ingress-http
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../service-management/manage-cluster#delete_cluster) его навсегда.
