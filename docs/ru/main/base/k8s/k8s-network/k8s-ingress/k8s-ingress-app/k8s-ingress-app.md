В кластерах Kubernetes возможно организовать доступ к сервисам, работающим по протоколам HTTP и HTTPS, с помощью [Ingress](../../k8s-ingress), что может быть выгоднее, чем использование индивидуальных балансировщиков нагрузки для отдельно взятых сервисов. Подробнее здесь.

Для организации доступа к сервисам с помощью Ingress необходимы:

1. Ingress-контроллер.

   Вы можете [создать кластер Kubernetes](../../../k8s-clusters/create-k8s) с предустановленным Ingress-контроллером на базе NGINX или добавить Ingress-контроллер в кластер позднее.
   Контроллер интегрируется c VK Cloud, позволяя обеспечить доступ к вашим сервисам с использованием одного и того же выделенного балансировщика нагрузки OpenStack.

1. Возможность управления DNS-зоной для домена, который будет использоваться Ingress.
1. Один или несколько развернутых сервисов, работающих по HTTP или HTTPS.

Далее будет продемонстрировано, как настроить взаимодействие пользователей с сервисами через Ingress и Ingress Controller, который устанавливается вместе c кластером.
Будут использоваться сервисы из примера [Cafe от NGINX](https://github.com/nginxinc/kubernetes-ingress/tree/main/examples/complete-example). Этот пример предполагает:

1. Развертывание двух максимально простых сервисов: при обращении по HTTP сервис `tea-svc` возвращает строку `tea`, а сервис `coffee-svc` — `coffee`.
1. Выпуск самоподписанного SSL-сертификата, чтобы продемонстрировать возможность обращения к сервисам по HTTPS через Ingress.
1. Создание ресурса Ingress, который будет настроен так, чтобы выполнять маршрутизацию трафика:
   1. На домен `cafe.example.com` по его имени (name-based routing): в этом примере весь трафик будет попадать на один домен.
   1. Внутри домена в соответствии с заданными путями (path-based routing): путь `/tea` будет обслуживаться сервисом `tea-svc`, а `/coffee` — сервисом `coffee-svc`.
1. Отсутствие необходимости настраивать DNS-записи для реального домена `example.com`: для проверки работы примера будет использоваться `curl`, который при обращении к IP-адресу Ingress предоставит имя нужного домена в HTTP-заголовке `Host`.

   <info>

   При использовании Ingress в производственном окружении (production environment) потребуется настройка реальных DNS-записей для реального домена.

   </info>

## 1. Подготовка

1. [Создайте кластер Kubernetes](../../../k8s-clusters/create-k8s).

   При создании кластера:

   1. На шаге **Конфигурация** убедитесь, что в списке предустановленных сервисов выбран Ingress-контроллер на базе NGINX.
   1. На шаге **Создание кластера** убедитесь, что включена опция «Назначить внешний IP».

1. [Убедитесь, что вы можете подключиться к кластеру](../../../k8s-start/connect-k8s) с помощью `kubectl`.

1. Узнайте IP-адрес балансировщика нагрузки для Ingress-контроллера одним из способов:

   1. Посмотрев его в свойствах кластера в [панели VK Cloud](https://mcs.mail.ru/app/):

      1. Перейдите в раздел «Контейнеры».
      1. Нажмите на имя нужного кластера.

      Адрес будет указан в параметре «IP-адрес балансировщика нагрузки для Ingress Controller».

   1. Посмотрев его с помощью `kubectl`:

      ```bash
      kubectl get svc ingress-nginx-controller -n ingress-nginx
      ```

      Адрес будет указан в столбце `EXTERNAL-IP`.

1. На хосте, с которого выполняется подключение к кластеру с помощью `kubectl`:

   1. [Установите git](https://git-scm.com/downloads), если он еще не установлен.
   1. [Установите curl](https://curl.se/download.html), если он еще не установлен.
   1. Склонируйте репозиторий NGINX Ingress Controller:

      ```bash
      git clone https://github.com/nginxinc/kubernetes-ingress.git
      ```

      <info>

      Далее предполагается, что репозиторий был склонирован в директорию `~/kubernetes-ingress/`. Если вы выполнили клонирование в другую директорию — скоррректируйте команды ниже.

      </info>

## 2. Развертывание сервисов

1. Перейдите в директорию репозитория с примером Cafe:

   ```bash
   cd ~/kubernetes-ingress/examples/complete-example/
   ```

1. Разверните сервисы `tea-svc` и `coffee-svc`, а также связанные с ними деплойменты (deployments), используя файл конфигурации `cafe.yaml`:

   ```bash
   kubectl apply -f ./cafe.yaml
   ```

## 3. Развертывание ресурса Ingress

1. Перейдите в директорию репозитория с примером Cafe:

   ```bash
   cd ~/kubernetes-ingress/examples/complete-example/
   ```

1. Установите самоподписанный SSL-сертификат, чтобы Ingress мог обслуживать пользователей по протоколу HTTPS:

   ```bash
   kubectl apply -f ./cafe-secret.yaml
   ```

   Подробнее об установке SSL-сертификатов для Ingress см. [здесь](k8s-cert).

   <warn>

   Не используйте этот SSL-сертификат из примеров NGINX в производственном окружении (production environment), так как информация о сертификате публично доступна!
   Безопасность сайта, защищенного таким сертификатом, будет под угрозой.

   Вместо этого выпустите для использования в производственном окружении отдельные SSL-сертификаты любым удобным для вас способом.

   </warn>

1. Создайте ресурс Ingress, который будет маршрутизировать входящий трафик к развернутым ранее сервисам:

   ```bash
   kubectl apply -f ./cafe-ingress.yaml
   ```

## 4. Проверка работы сервисов

1. Убедитесь, что созданы требуемые сервисы и деплойменты:

   ```bash
   kubectl get services,deployments
   ```

   Вывод должен быть похож на такой:

   <!-- prettier-ignore -->
   ```text
    NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
    service/coffee-svc   ClusterIP   ...              <none>        80/TCP    27m
    service/tea-svc      ClusterIP   ...              <none>        80/TCP    27m

    NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/coffee   2/2     2            2           27m
    deployment.apps/tea      3/3     3            3           27m
    ```

1. Убедитесь, что создан ресурс Ingress с требуемой конфигурацией:

   ```bash
   kubectl describe ingress cafe-ingress
   ```

   Вывод должен быть похож на такой:

   <!-- prettier-ignore -->
   ```text
    Name:             cafe-ingress
    Labels:           <none>
    Namespace:        default
    Address:          ...
    Ingress Class:    nginx
    Default backend:  <default>
    TLS:
      cafe-secret terminates cafe.example.com
    Rules:
      Host              Path  Backends
      ----              ----  --------
      cafe.example.com
                        /tea      tea-svc:80 (...:8080,...:8080,...:8080)
                        /coffee   coffee-svc:80 (...:8080,...:8080)
    Annotations:        <none>
    Events:
      Type    Reason  Age                From                      Message
      ----    ------  ----               ----                      -------
      Normal  Sync    31m (x2 over 32m)  nginx-ingress-controller  Scheduled for sync
    ```

1. С помощью `curl` убедитесь, что при обращении к разным URL на домене `cafe.example.com`, вам отвечают разные сервисы.

   Это будет означать, что Ingress-контроллер выполняет маршрутизацию трафика в соответствии с настройками ресурса Ingress.

   Для этого выполните команду, указав [IP-адрес Ingress-контроллера](#1--podgotovka) вместо `NNN.NNN.NNN.NNN`:

   1. Для URL `/tea`:

      ```bash
      curl --insecure --resolve cafe.example.com:443:NNN.NNN.NNN.NNN https://cafe.example.com/tea
      ```

      Вывод должен быть похож на такой:

      <!-- prettier-ignore -->
      ```text
        Server address: 10.100.82.216:8080
        Server name: tea-6fb46d899f-xvd6f
        Date: 12/Jul/2022:12:53:44 +0000
        URI: /tea
        Request ID: 7b03334b7b3100637aa7e68458c49acd
        ```

   1. Для URL `/coffee`:

      ```bash
      curl --insecure --resolve cafe.example.com:443:NNN.NNN.NNN.NNN https://cafe.example.com/coffee
      ```

      Вывод должен быть похож на такой:

      <!-- prettier-ignore -->
      ```text
        Server address: 10.100.82.214:8080
        Server name: coffee-6f4b79b975-6rljv
        Date: 12/Jul/2022:12:55:56 +0000
        URI: /coffee
        Request ID: 5daa1cdb1d0772a2f502e288dec30a3f
        ```
