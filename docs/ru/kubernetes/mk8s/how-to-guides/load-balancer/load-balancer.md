# {heading(Использование балансировщиков нагрузки)[id=mk8s-load-balancer]}

Для всех сервисов Kubernetes типа «балансировщик нагрузки» (`spec.type: LoadBalancer`) платформа {var(cloud)} может автоматически создавать соответствующий TCP-балансировщик нагрузки с заданным поведением.

{note:warn}
При развертывании для каждого из сервисов будет создан {linkto(../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}.

Использование балансировщиков {linkto(../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Балансировщик может:

- Иметь публичный IP-адрес, который доступен из интернета, или иметь приватный IP-адрес, который недоступен из интернета. IP-адрес можно назначить балансировщику вручную или автоматически.

- Использовать разные алгоритмы балансировки соединений между экземплярами приложения:

  - Случайный выбор реплики (по умолчанию).

    Балансировщик ведет себя так, потому что `kube-proxy` в кластерах Kubernetes в сервисе Managed Containers {linkto(../../concepts/addons-and-settings/settings#mk8s-settings-kube-proxy-mode)[text=работает]} в режиме `iptables`.
    Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-iptables).

  - Закрепление реплики за конкретным IP-адресом.

    В этом случае балансировщик закрепит за IP-адресом, с которого пришел первый запрос, конкретную реплику приложения. Пока эта реплика остается доступной, все запросы с этого адреса будут пересылаться на нее.

- Разрешать доступ только с определенных IP-адресов.

## {heading(Подготовительные шаги)[id=mk8s-load-balancer-prepare]}

{include(/ru/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

## {heading(1. Создайте приложение)[id=mk8s-load-balancer-create-app]}

Запросы к этому приложению будут обслуживаться балансировщиком нагрузки. Чтобы продемонстрировать поведение балансировщика, приложение будет развернуто в виде StatefulSet из двух реплик. В этом случае все поды приложения будут пронумерованы, и можно будет легко определить, на какую реплику балансировщик направит запрос.

Чтобы создать такое приложение:

1. Создайте файл манифеста:

   {cut(coffee.yaml)}

   ```yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: coffee
   spec:
     serviceName: coffee 
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

   {/cut}

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f coffee.yaml
   ```

## {heading(2. Создайте балансировщики нагрузки)[id=mk8s-load-balancer-create-balancer]}

Создайте несколько балансировщиков нагрузки с разным поведением, которые обслуживают развернутое приложение `coffee`.

На вкладках ниже описаны различные сценарии создания балансировщиков:

- Сценарий 1 — ручное назначение статического публичного адреса со случайным выбором реплики.
- Сценарий 2 — aвтоматическое назначение динамического публичного адреса с закреплением реплики.
- Сценарий 3 — автоматическое назначение динамического публичного адреса, случайный выбор реплики, ограничение доступа.
- Сценарий 4 — автоматическое назначение динамического приватного адреса со случайным выбором реплики.

{tabs}

{tab(Сценарий 1)}

1. Выберите публичный IP-адрес, который нужно назначить балансировщику или создайте новый. Это можно сделать в {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add)[text=личном кабинете {var(cloud)}]}.

   К IP-адресу не должно быть привязано внутреннего IP-адреса.

1. Создайте файл манифеста `lb-static-public-ip.yaml`.

   В параметре `spec.loadBalancerIP` укажите выбранный IP-адрес.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-public-static-ip
   spec:
     type: LoadBalancer
     loadBalancerIP: <выбранный IP-адрес>
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f lb-static-public-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```console
   kubectl get svc coffee-svc-public-static-ip
   ```

   Дождитесь, когда сервису будет назначен статический публичный IP-адрес, заданный вручную: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

{/tab}

{tab(Сценарий 2)}

1. Создайте файл манифеста `lb-session-affinity.yaml`.

   В параметре `spec.sessionAffinity` укажите значение `ClientIP`. Оно отвечает за закрепление сессии пользователя за конкретной репликой.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-session-affinity
   spec:
     type: LoadBalancer
     sessionAffinity: ClientIP
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f lb-session-affinity.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```console
   kubectl get svc coffee-svc-session-affinity
   ```

   Дождитесь, когда сервису будет автоматически назначен динамический публичный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

{/tab}

{tab(Сценарий 3)}

1. Определите публичный IP-адрес для хоста, которому должен быть разрешен доступ к приложению.

   Например, выполните команду:

   ```console
   curl icanhazip.com
   ```

1. Создайте файл манифеста `lb-restrict-access-by-ip.yaml`.

   В параметре `spec.loadBalancerSourceRanges` укажите список IP-адресов, в которых разрешен доступ в формате `IP-адрес/префикс`. Доступ с других IP-адресов будет запрещен.

   Укажите IP-адрес, полученный на предыдущем шаге:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-restrict-access-by-ip
   spec:
     type: LoadBalancer
     loadBalancerSourceRanges: 
       - <публичный IP-адрес>/32
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f lb-restrict-access-by-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```console
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Дождитесь, когда сервису будет автоматически назначен динамический публичный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

{/tab}

{tab(Сценарий 4)}

1. Создайте файл манифеста `lb-private-ip.yaml`.

   В метаданных сервиса укажите аннотацию `service.beta.kubernetes.io/openstack-internal-load-balancer: "true"`. Эта аннотация отвечает за создание балансировщика нагрузки с приватным IP-адресом.

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: coffee-svc-private-ip
     annotations:
       service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 8080
       protocol: TCP
       name: http
     selector:
       app: coffee
   ```

1. Создайте ресурс Kubernetes на основе манифеста:

   ```console
   kubectl apply -f lb-private-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```console
   kubectl get svc coffee-svc-private-ip
   ```

   Дождитесь, когда сервису будет назначен приватный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

{/tab}

{/tabs}

Подробнее о сервисах и балансировщиках нагрузки в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/services-networking/).

## {heading(3. Проверьте работу балансировщиков нагрузки)[id=mk8s-load-balancer-check]}

На вкладках ниже описаны различные сценарии проверки работы балансировщиков:

- Сценарий 1 — балансировщик со статическим публичным адресом и случайным выбором реплики.
- Сценарий 2 — балансировщик с динамическим публичным адресом и закреплением реплики.
- Сценарий 3 — балансировщик с динамическим публичным адресом, случайным выбором реплики и ограничением доступа.
- Сценарий 4 — балансировщик с динамическим приватным адресом и случайным выбором реплики.

{tabs}

{tab(Сценарий 1)}

1. Получите IP-адрес, назначенный балансировщику:

   ```console
   kubectl get svc coffee-svc-public-static-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:
   ```console
   curl http://<IP-АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

{/tab}

{tab(Сценарий 2)}

1. Получите IP-адрес, назначенный балансировщику:

   ```console
   kubectl get svc coffee-svc-session-affinity
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:

   ```console
   curl http://<IP-АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   На все запросы будет отвечать один выбранный под: либо `coffee-0`, либо `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы с конкретного IP-адреса на одну и ту же реплику приложения.

{/tab}

{tab(Сценарий 3)}

1. Получите IP-адрес, назначенный балансировщику:

   ```console
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки (c IP-адреса, с которого разрешен доступ):

   ```console
   curl http://<IP-АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

1. Попытайтесь выполнить аналогичный запрос с хоста с другим IP-адресом. Запрос завершится неудачно.

{/tab}

{tab(Сценарий 4)}

1. Получите IP-адрес, назначенный балансировщику:

   ```console
   kubectl get svc coffee-svc-private-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-create#iaas-vm-create)[text=Создайте виртуальную машину Linux]} в той же подсети, где находится IP-адрес балансировщика.

1. {linkto(../../../../computing/iaas/instructions/vm/vm-connect/vm-connect-nix#iaas-vm-connect-nix)[text=Подключитесь к этой виртуальной машине]} по SSH.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:
   ```console
   curl http://<IP-АДРЕС_БАЛАНСИРОВЩИКА>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

{/tab}

{/tabs}

## {heading(Удалите неиспользуемые ресурсы)[id=mk8s-load-balancer-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы балансировщиков нагрузки, вам больше не нужны, удалите их:

1. Удалите созданные сервисы и StatefulSet:

   {note:warn}
   Вместе с сервисами будут удалены соответствующие им балансировщики. Этот процесс может занять длительное время.
   {/note}

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete svc coffee-svc-public-static-ip
   kubectl delete svc coffee-svc-session-affinity
   kubectl delete svc coffee-svc-restrict-access-by-ip
   kubectl delete svc coffee-svc-private-ip
   kubectl delete statefulset coffee

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete svc coffee-svc-public-static-ip; `
   kubectl delete svc coffee-svc-session-affinity; `
   kubectl delete svc coffee-svc-restrict-access-by-ip; `
   kubectl delete svc coffee-svc-private-ip; `
   kubectl delete statefulset coffee
   ```

   {/tab}

   {/tabs}

1. {linkto(../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-delete)[text=Удалите]} статический публичный IP-адрес, который был назначен сервису `coffee-svc-public-static-ip`.

{include(/ru/_includes/_delete-test-cluster-short.md)}
