Для всех сервисов Kubernetes типа «балансировщик нагрузки» (`spec.type: LoadBalancer`) платформа VK Cloud может автоматически создавать соответствующий TCP-балансировщик нагрузки с заданным поведением.

<warn>

При развертывании таких сервисов для каждого из них будет создан [стандартный балансировщик нагрузки](/ru/main/networks/vnet/concepts/load-balancer#tipy-balansirovshchikov-nagruzki).

Использование балансировщиков [тарифицируется](/ru/main/networks/vnet/tariffs).

</warn>

Балансировщик может:

- Иметь публичный IP-адрес, который доступен из интернета, или иметь приватный IP-адрес, который недоступен из интернета. IP-адрес можно назначить балансировщику вручную или автоматически.

- Использовать разные алгоритмы балансировки соединений между экземплярами приложения:

  - Случайный выбор реплики (по умолчанию).

    Балансировщик ведет себя так, потому что `kube-proxy` в кластерах Kubernetes VK Cloud [работает](../../concepts/preconfigured-features/settings#rezhim-raboty-kube-proxy) в режиме `iptables`.
    Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-iptables).

  - Закрепление реплики за конкретным IP-адресом.

    В этом случае балансировщик закрепит за IP-адресом, с которого пришел первый запрос, конкретную реплику приложения. Пока эта реплика остается доступной, все запросы с этого адреса будут пересылаться на нее.

- Разрешать доступ только с определенных IP-адресов.

## Подготовительные шаги

1. Создайте кластер Kubernetes самой актуальной версии.

   Параметры кластера выберите на свое усмотрение.

1. Убедитесь, что вы можете подключиться к кластеру с помощью `kubectl`.

## 1. Создайте приложение

Запросы к этому приложению будут обслуживаться балансировщиком нагрузки. Чтобы продемонстрировать поведение балансировщика, приложение будет развернуто в виде StatefulSet из двух реплик. В этом случае все поды приложения будут пронумерованы, и можно будет легко определить, на какую реплику балансировщик направит запрос.

Чтобы создать такое приложение:

1. Создайте файл манифеста:

   <details>
   <summary markdown="span">coffee.yaml</summary>

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

   </details>

1. Создайте нужный ресурс Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f coffee.yaml
   ```

## 2. Создайте балансировщики нагрузки

Создайте несколько балансировщиков нагрузки с разным поведением, которые обслуживают развернутое приложение `coffee`:

<tabs>
<tablist>
<tab>Ручное назначение статического публичного адреса, случайный выбор реплики</tab>
<tab>Автоматическое назначение динамического публичного адреса, закрепление реплики</tab>
<tab>Автоматическое назначение динамического публичного адреса, случайный выбор реплики, ограничение доступа</tab>
<tab>Автоматическое назначение динамического приватного адреса, случайный выбор реплики</tab>
</tablist>
<tabpanel>

1. Выберите публичный IP-адрес, который нужно назначить балансировщику или создайте новый. Это можно сделать в [личном кабинете VK Cloud](../../../../networks/vnet/networks/fip).

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

1. Создайте нужный ресурс Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f lb-static-public-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```bash
   kubectl get svc coffee-svc-public-static-ip
   ```

   Дождитесь, когда сервису будет назначен статический публичный IP-адрес, заданный вручную: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

</tabpanel>
<tabpanel>

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

1. Создайте нужный ресурс Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f lb-session-affinity.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```bash
   kubectl get svc coffee-svc-session-affinity
   ```

   Дождитесь, когда сервису будет автоматически назначен динамический публичный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

</tabpanel>
<tabpanel>

1. Определите публичный IP-адрес для хоста, которому должен быть разрешен доступ к приложению.

   Например, выполните команду:

   ```bash
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

1. Создайте нужный ресурс Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f lb-restrict-access-by-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```bash
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Дождитесь, когда сервису будет автоматически назначен динамический публичный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

</tabpanel>
<tabpanel>

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

1. Создайте нужный ресурс Kubernetes на основе манифеста:

   ```bash
   kubectl apply -f lb-private-ip.yaml
   ```

1. Периодически проверяйте статус сервиса командой:

   ```bash
   kubectl get svc coffee-svc-private-ip
   ```

   Дождитесь, когда сервису будет назначен приватный IP-адрес: в столбце таблицы `EXTERNAL-IP` вместо `<pending>` появится IP-адрес.

</tabpanel>
</tabs>

Подробнее о сервисах и балансировщиках нагрузки в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/services-networking/).

## 3. Проверьте работу балансировщиков нагрузки

<tabs>
<tablist>
<tab>Балансировщик со статическим публичным адресом и случайным выбором реплики</tab>
<tab>Балансировщик с динамическим публичным адресом и закреплением реплики</tab>
<tab>Балансировщик с динамическим публичным адресом, случайным выбором реплики и ограничением доступа</tab>
<tab>Балансировщик с динамическим приватным адресом и случайным выбором реплики</tab>
</tablist>
<tabpanel>

1. Получите IP-адрес, назначенный балансировщику:

   ```bash
   kubectl get svc coffee-svc-public-static-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:
   ```bash
   curl http://<IP-адрес балансировщика>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

</tabpanel>
<tabpanel>

1. Получите IP-адрес, назначенный балансировщику:

   ```bash
   kubectl get svc coffee-svc-session-affinity
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:

   ```bash
   curl http://<IP-адрес балансировщика>
   ```

   На все запросы будет отвечать один выбранный под: либо `coffee-0`, либо `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы с конкретного IP-адреса на одну и ту же реплику приложения.

</tabpanel>
<tabpanel>

1. Получите IP-адрес, назначенный балансировщику:

   ```bash
   kubectl get svc coffee-svc-restrict-access-by-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки (c IP-адреса, с которого разрешен доступ):

   ```bash
   curl http://<IP-адрес балансировщика>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

1. Попытайтесь выполнить аналогичный запрос с хоста с другим IP-адресом. Запрос завершится неудачно.

</tabpanel>
<tabpanel>

1. Получите IP-адрес, назначенный балансировщику:

   ```bash
   kubectl get svc coffee-svc-private-ip
   ```

   Нужный адрес содержится в столбце таблицы `EXTERNAL-IP`.

1. [Создайте виртуальную машину Linux](../../../iaas/vm-start/vm-quick-create) в той же подсети, где находится IP-адрес балансировщика.

1. [Подключитесь к этой виртуальной машине](../../../iaas/vm-start/vm-connect/vm-connect-nix) по SSH.

1. Выполните несколько раз запрос к приложению через балансировщик нагрузки:
   ```bash
   curl http://<IP-адрес балансировщика>
   ```

   Могут отвечать разные поды: и `coffee-0`, и `coffee-1`. Такое поведение означает, что балансировщик отправляет запросы на случайные реплики приложения.

</tabpanel>
</tabs>

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <warn>

   Вместе с сервисами будут удалены соответствующие им балансировщики. Этот процесс может занять длительное время.

   </warn>

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete svc coffee-svc-public-static-ip
   kubectl delete svc coffee-svc-session-affinity
   kubectl delete svc coffee-svc-restrict-access-by-ip
   kubectl delete svc coffee-svc-private-ip
   kubectl delete statefulset coffee

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete svc coffee-svc-public-static-ip; `
   kubectl delete svc coffee-svc-session-affinity; `
   kubectl delete svc coffee-svc-restrict-access-by-ip; `
   kubectl delete svc coffee-svc-private-ip; `
   kubectl delete statefulset coffee
   ```

   </tabpanel>
   </tabs>

1. Если статический публичный IP-адрес, который был назначен сервису `coffee-svc-public-static-ip`, вам больше не нужен, [удалите его](../../../../networks/vnet/operations/manage-floating-ip#udalenie-plavayushchego-ip-adresa-iz-proekta).

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../operations/manage-cluster#zapustit-ili-ostanovit-klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../operations/manage-cluster#udalit-klaster) его навсегда.
