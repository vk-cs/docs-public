Ingress-контроллер можно развернуть  [в связке с HTTP-балансировщиком нагрузки](../../../concepts/network) платформы VK Cloud. Далее для примера будут созданы простые демо-приложения и ресурс Ingress для проверки работоспособности контроллера.

<info>

- Далее предполагается, что будет развернут NGINX Ingress Controller. Однако предложенные подходы можно адаптировать и под другие Ingress-контроллеры, например, Traefik.

- При таком развертывании Ingress нужно вручную добавлять worker-узлы в правила балансировщика нагрузки. Это верно как при ручном изменении размера worker-группы, так и при включении автомасштабирования.

</info>

## 1. Подготовительные шаги

1. [Создайте](../../../operations/create-cluster) кластер Kubernetes самой актуальной версии.

   При создании кластера:

   - Снимите выбор с предустановленного сервиса NGINX Ingress Controller. В демонстрационных целях Ingress-контроллер будет установлен вручную.
   - Выберите опцию **Назначить внешний IP**.

   Прочие параметры кластера выберите на свое усмотрение.

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

1. Установите Ingress-контроллер с сервисом `NodePort`, выполнив команду:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   helm install nginx-ingress-http nginx-stable/nginx-ingress \
    --create-namespace --namespace example-nginx-ingress-http \
    --set controller.service.type=NodePort \
    --set controller.service.httpsPort.enable=false \
    --set controller.service.externalTrafficPolicy=Local

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
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

   ```
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
   - Имена инстансов сервиса облачных вычислений VK Cloud, которые соответствуют master-узлам и worker-узлам кластера.
   - Номер порта, который был назначен Ingress-контроллеру на предыдущем шаге.

1. Создайте балансировщик:

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
   1. Выберите проект и регион, где находится нужный кластер.
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
         1. В блоке **Применить для следующих инстансов** добавьте все инстансы сервиса облачных вычислений VK Cloud, которые соответствуют master-узлам и worker-узлам кластера.

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
         1. В блоке **Применить для следующих инстансов** добавьте все инстансы сервиса облачных вычислений VK Cloud, которые соответствуют master-узлам и worker-узлам кластера.

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
               MIIEowIBAAKCAQEAqeip+7MvNadI7if3MpPrwgJpbH47RTNprmTStCrXnKhtn41k
               G+ecUNWBQNlzksBwGL0ncCNo2a7lvKl1wi9q2+AmQhccKVRAq3MXY5t7XlYkV1bG
               CJpiRzz0skIKYqG7Pcew5S3OiAQNGY1DspdD6hvUiXsTFe91iCGuaw1Uhdq+JEpG
               wI+A3I+y13hZVVx9iOV8FwqbQp+uyQoONn/pPMIM3EVafF2ZGVmVY8KvUVCg15hQ
               dmMjdVxFnWdHsEbimFCZbJuvdrJDqykI9L5KD5+NRBP/k2lRKai00aFGN684Ow5H
               c33QYsxTtnbDzRcdgltI15DS7yqNuQmazoVwBwIDAQABAoIBAQCPSdSYnQtSPyql
               FfVFpTOsoOYRhf8sI+ibFxIOuRauWehhJxdm5RORpAzmCLyL5VhjtJme223gLrw2
               N99EjUKb/VOmZuDsBc6oCF6QNR58dz8cnORTewcotsJR1pn1hhlnR5HqJJBJask1
               ZEnUQfcXZrL94lo9JH3E+Uqjo1FFs8xxE8woPBqjZsV7pRUZgC3LhxnwLSExyFo4
               cxb9SOG5OmAJozStFoQ2GJOes8rJ5qfdvytgg9xbLaQL/x0kpQ62BoFMBDdqOePW
               KfP5zZ6/07/vpj48yA1Q32PzobubsBLd3Kcn32jfm1E7prtWl+JeOFiOznBQFJbN
               4qPVRz5hAoGBANtWyxhNCSLu4P+XgKyckljJ6F5668fNj5CzgFRqJ09zn0TlsNro
               FTLZcxDqnR3HPYM42JERh2J/qDFZynRQo3cg3oeivUdBVGY8+FI1W0qdub/L9+yu
               edOZTQ5XmGGp6r6jexymcJim/OsB3ZnYOpOrlD7SPmBvzNLk4MF6gxbXAoGBAMZO
               0p6HbBmcP0tjFXfcKE77ImLm0sAG4uHoUx0ePj/2qrnTnOBBNE4MvgDuTJzy+caU
               k8RqmdHCbHzTe6fzYq/9it8sZ77KVN1qkbIcuc+RTxA9nNh1TjsRne74Z0j1FCLk
               hHcqH0ri7PYSKHTE8FvFCxZYdbuB84CmZihvxbpRAoGAIbjqaMYPTYuklCda5S79
               YSFJ1JzZe1Kja//tDw1zFcgVCKa31jAwciz0f/lSRq3HS1GGGmezhPVTiqLfeZqc
               R0iKbhgbOcVVkJJ3K0yAyKwPTumxKHZ6zImZS0c0am+RY9YGq5T7YrzpzcfvpiOU
               ffe3RyFT7cfCmfoOhDCtzukCgYB30oLC1RLFOrqn43vCS51zc5zoY44uBzspwwYN
               TwvP/ExWMf3VJrDjBCH+T/6sysePbJEImlzM+IwytFpANfiIXEt/48Xf60Nx8gWM
               uHyxZZx/NKtDw0V8vX1POnq2A5eiKa+8jRARYKJLYNdfDuwolxvG6bZhkPi/4EtT
               3Y18sQKBgHtKbk+7lNJVeswXE5cUG6EDUsDe/2Ua7fXp7FcjqBEoap1LSw+6TXp0
               ZgrmKE8ARzM47+EJHUviiq/nupE15g0kJW3syhpU9zZLO7ltB0KIkO9ZRcmUjo8Q
               cpLlHMAqbLJ8WYGJCkhiWxyal6hYTyWY4cVkC0xtTl/hUE9IeNKo
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

   ```bash
   kubectl apply -f ./cafe-ingress.yaml
   ```

   Будет создан ресурс Ingress `cafe-ingress`.

1. Проверьте, что ресурс успешно создался, выполнив команду:

   ```bash
   kubectl describe ingress cafe-ingress
   ```

   Вывод команды должен быть похож на этот:

   ```bash
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

   ```bash
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

## Проконтролируйте использование ресурсов

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

   ```bash
   kubectl delete -f ./cafe-ingress.yaml
   kubectl delete -f ./cafe.yaml
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http
   kubectl delete namespace example-nginx-ingress-http

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete -f ./cafe-ingress.yaml; `
   kubectl delete -f ./cafe.yaml; `
   helm uninstall nginx-ingress-http -n example-nginx-ingress-http; `
   kubectl delete namespace example-nginx-ingress-http
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../operations/manage-cluster#zapustit-ili-ostanovit-klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../operations/manage-cluster#udalit-klaster) его навсегда.
