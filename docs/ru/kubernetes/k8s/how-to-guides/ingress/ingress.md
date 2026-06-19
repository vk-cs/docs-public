# {heading(Использование Ingress)[id=k8s-ingress]}

{ifdef(public)}
Как предоставить доступ к развернутым в кластере сервисам с помощью Ingress.
{/ifdef}

{ifndef(public)}
При создании PaaS-кластера Kubernetes есть возможность выбрать среди предустановленных сервисов NGINX Ingress Controller. Ingress Controller будет развернут автоматически.

Ingress Controller состоит из следующих компонентов:

* Контроллера, взаимодействующего с API-сервером Kubernetes.
* Реверсивного прокси-сервера.

Контроллер получает данные об Ingress-объектах от API-сервера и на их основании настраивает работу реверсивного прокси-сервера.

{note:warn}
Для работы Ingress-объектов в кластере обязательно наличие Ingress Controller.
{/note}

После создания кластера Ingress Controller поднимается в нем в виде пода, находящегося в пространстве имен `ingress-nginx`.

Доступность Ingress Controller извне осуществляется через сервис `nginx-ingress-controller`, имеющей тип LoadBalancer. Чтобы получить «белый» IP-адрес сервиса, выполните команду:

```console
kubectl get svc -n ingress-nginx
```

Пример вывода команды получения информации о сервисе nginx-ingress-controller:

```console
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.254.196.100   85.192.35.195   80:30080/TCP,443:30443/TCP   4d1h
ingress-nginx-controller-admission   ClusterIP      10.254.182.36    <none>          443/TCP                      4d1h
ingress-nginx-controller-metrics     ClusterIP      10.254.25.208    <none>          9913/TCP                     4d1h
ingress-nginx-default-backend        ClusterIP      10.254.43.188    <none>          80/TCP                       4d1h
```

## {heading(Ingress)[id=k8s-ingress-about]}

Ingress — это объект Kubernetes, описывающий правила проксирования трафика от внешнего источника до сервисов внутри кластера Kubernetes.

{note:err}
Добавление или изменение правил проксирования трафика происходит через внесение правок в манифест Ingress.
{/note}

### {heading(Пример проксирования трафика)[id=k8s-ingress-example]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Создайте файл манифеста.

   ```console
   vi <ПУТЬ>
   ```
   Здесь `<ПУТЬ>` — путь к файлу манифеста.
   
1. Создайте в кластере под `nginx-pod-ingress` с веб-сервером NGINX, который будет отвечать сообщением **Hello World!**.

   Манифест Pod и его configmap:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: nginx-pod-configmap
   data:
     default.conf: |-
       server {
         listen       80 default_server;
         server_name  _;
         default_type text/plain;
         location / {
           return 200 "\n'Hello World!'\n";
         }
       }
   ---
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod-ingress
     labels:
       app: my-app
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
       volumeMounts:
       - name: config
         mountPath: /etc/nginx/conf.d/
     volumes:
     - name: config
       configMap:
         name: my-configmap
   ```

1. Создайте сервис `test-service`, который будет направлять трафик в под `nginx-pod-ingress`.

   Манифест сервиса:

   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: test-service
   spec:
     selector:
       app: my-app
     ports:
       - protocol: TCP
         port: 80
         targetPort: 80
   ```

1. Создайте Ingress `test-ingress`, который будет проксировать трафик до сервиса `test-service`.

   Пример манифеста Ingress:

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: test-ingress
     annotations:
       nginx.ingress.kubernetes.io/rewrite-target: /
   spec:
     ingressClassName: nginx
     defaultBackend:
       service:
         name: test-service
         port:
           number: 80
     rules:
     - http:
         paths:
         - path: /testpath
           pathType: Prefix
           backend:
             service:
               name: test-service
               port:
                 number: 80
   ```

1. Разверните все описанные объекты.

   ```console
   kubectl apply -f <ПУТЬ>
   ```
   
   Здесь `<ПУТЬ>` — путь к файлу манифеста.

1. Выполните cURL-запрос.

   ```console
   curl -k https://<АДРЕС>/testpath
   ```
   
   Здесь `<АДРЕС>` — внешний IP-адрес кластера.

   {note:warn}
   В данном примере все создавалось для HTTP-трафика, но в предустановленном Ingress Controller есть перенаправление с HTTP на HTTPS.
   {/note}

## {heading(Настройка доступа к сервису с помощью Ingress)[id=k8s-ingress-service-access]}

Чтобы настроить доступ к объекту типа `Service` в кластере Kubernetes c помощью Ingress:

1. Убедитесь, что в кластере развернут минимум один работающий объект типа `Service`.

1. Убедитесь, что подготовлено доменное имя, с которым будет работать Ingress.

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.

1. Создайте файл манифеста:

   ```console
   vi <ПУТЬ>
   ```
   Здесь `<ПУТЬ>` — путь к файлу манифеста.

1. Создайте в кластере объект Ingress c маршрутизацией:

   1. Name-based routing — распределение трафика на разные домены по их DNS-имени.
   1. Path-based routing — распределение трафика внутри одного домена согласно относительных путей.

   Пример манифеста Ingress с маршрутизацией Name-based routing и Path-based routing:

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: cafe-ingress
   spec:
     ingressClassName: nginx
     tls:
     - hosts:
       - cafe.app.example.com
       secretName: cafe-secret
     rules:
     - host: cafe.app.example.com
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

   В примере Ingress создает и использует оба варианта маршрутизации:

   * Name-based routing — для домена `cafe.example.com`.
   * Path-based routing — для путей `/tea` и `/coffee`.

1. Разверните объект Ingress:

   ```console
   kubectl apply -f <ПУТЬ>
   ```
   Здесь `<ПУТЬ>` — путь к файлу манифеста.

## {heading(Расширенное управление Ingress Controller)[id=k8s-ingress-advanced-management]}

{note:err}
Определенные параметры могут быть сконфигурированы только с помощью ConfigMap, либо только с помощью аннотаций.
{/note}

### {heading(Параметры NGINX Ingress Controller)[id=k8s-ingress-nginx-parameters]}

Управлять параметрами NGINX Ingress Controller можно с помощью ConfigMap или аннотаций. В случае использования ConfigMap, данные параметры будут применены глобально ко всем ресурсам Ingress, в случае аннотаций — только к тому Ingress, в котором используется эта аннотация.
{ifdef(private, private-pg)}
Соответствие между доступными аннотациями и ключами ConfigMap:
{/ifdef}
{ifdef(private-pdf, private-pg-pdf)}
Соответствие между доступными аннотациями и ключами ConfigMap представлено в {linkto(#tab_description_configmap_annotations)[text=таблице %number]}.
{/ifdef}

{ifdef(private-pdf, private-pg-pdf)}
{caption(Таблица {counter(table)[id=numb_tab_description_configmap_annotations]} — Описание аннотаций ConfigMap)[align=right;position=above;id=tab_description_configmap_annotations;number={const(numb_tab_description_configmap_annotations)}]}
{/ifdef}
[cols="1,1,1,1", options="header"]
|===
|Аннотация
|Ключ ConfigMap
|Описание
|Значение по умолчанию

|kubernetes.io/ingress.class
| ![](../../../assets/no.svg "inline")
|Определяет, какой контроллер Ingress должен обрабатывать ресурс Ingress. Установите значение `nginx`, чтобы NGINX Ingress Controller обрабатывал его
| ![](../../../assets/no.svg "inline")

|nginx.org/proxy-connect-timeout
|proxy-connect-timeout
|Устанавливает значение директивы `proxy_connect_timeout`
|60s

|nginx.org/proxy-read-timeout
|proxy-read-timeout
|Устанавливает значение директивы `proxy_read_timeout`
|60s

|nginx.org/client-max-body-size
|client-max-body-size
|Устанавливает значение директивы `client_max_body_size`
|1m

|nginx.org/proxy-buffering
|proxy-buffering
|Включает или отключает буферизацию ответов от прокси-сервера
|True

|nginx.org/proxy-buffers
|proxy-buffers
|Устанавливает значение директивы `proxy_buffers`
|Depends on the platform

|nginx.org/proxy-buffer-size
|proxy-buffer-size
|Устанавливает значение директивы `proxy_buffer_size`
|Depends on the platform

|nginx.org/proxy-max-temp-file-size
|proxy-max-temp-file-size
|Устанавливает значение директивы `proxy_max_temp_file_size`
|1024m

|nginx.org/proxy-hide-headers
|proxy-hide-headers
|Устанавливает значение одной или нескольких директив `proxy_hide_header`. Пример: `nginx.org/proxy-hide-headers: "header-a, header-b"`
| ![](../../../assets/no.svg "inline")

|nginx.org/proxy-pass-headers
|proxy-pass-headers
|Устанавливает значение одной или нескольких директив `proxy_pass_header`. Пример: `nginx.org/proxy-pass-headers: "header-a, header-b"`
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|server-names-hash-bucket-size
|Устанавливает значение директивы `server_names_hash_bucket_size`
|Depends on the size of the processor’s cache line

| ![](../../../assets/no.svg "inline")
|server-names-hash-max-size
|Устанавливает значение директивы `server_names_hash_max_size`
|512

| ![](../../../assets/no.svg "inline")
|http2
|Включает HTTP/2 на серверах с включенным SSL
|False

|nginx.org/redirect-to-https
|redirect-to-https
|Устанавливает правило перенаправления `301` на основе значения `http_x_forwarded_protoheader` в блоке сервера, чтобы заставить входящий трафик проходить через HTTPS. Полезно при завершении SSL в балансировщике нагрузки перед контроллером Ingress
|False

|ingress.kubernetes.io/ssl-redirect
|ssl-redirect
|Устанавливает безусловное правило перенаправления `301` для всего входящего HTTP-трафика, чтобы принудительно использовать входящий трафик по HTTPS
|True

| ![](../../../assets/no.svg "inline")
|log-format
|Устанавливает собственный формат журнала логирования
|See the template file

|nginx.org/hsts
|hsts
|Включает строгую транспортную безопасность HTTP (HSTS): заголовок HSTS добавляется к ответам от бэкендов. Директива `preload` включена в заголовок
|False

|nginx.org/hsts-max-age
|hsts-max-age
|Устанавливает значение директивы `max-age` заголовка HSTS
|2592000 (1 month)

|nginx.org/hsts-include-subdomains
|hsts-include-subdomains
|Добавляет директиву `includeSubDomains` в заголовок HSTS
|False

| ![](../../../assets/no.svg "inline")
|ssl-protocols
|Устанавливает значение директивы `ssl_protocols`
|TLSv1 TLSv1.1 TLSv1.2

| ![](../../../assets/no.svg "inline")
|ssl-prefer-server-ciphers
|Включает или отключает директиву `ssl_prefer_server_ciphers`
|False

| ![](../../../assets/no.svg "inline")
|ssl-ciphers
|Устанавливает значение директивы `ssl_ciphers`
|HIGH:!aNULL:!MD5

| ![](../../../assets/no.svg "inline")
|ssl-dhparam-file
|Устанавливает содержимое файла `dhparam`. Контроллер создаст файл и установит значение директивы `ssl_dhparam` с путем к файлу
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|set-real-ip-from
|Устанавливает значение директивы `set_real_ip_from`
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|real-ip-header
|Устанавливает значение директивы `real_ip_header`
|X-Real-IP

| ![](../../../assets/no.svg "inline")
|real-ip-recursive
|Включает или отключает директиву `real_ip_recursive`
|False

|nginx.org/server-tokens
|server-tokens
|Включает или отключает `server_tokensdirective`. Кроме того, с помощью NGINX Plus можно указать настраиваемое строковое значение, включая пустое строковое значение, которое отключает выдачу поля **Сервер**
|True

| ![](../../../assets/no.svg "inline")
|main-snippets
|Устанавливает настраиваемый фрагмент в основном контексте
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|http-snippets
|Устанавливает настраиваемый фрагмент в контексте HTTP
| ![](../../../assets/no.svg "inline")

|nginx.org/location-snippets
|location-snippets
|Устанавливает настраиваемый фрагмент в контексте местоположения
| ![](../../../assets/no.svg "inline")

|nginx.org/server-snippets
|server-snippets
|Устанавливает настраиваемый фрагмент в контексте сервера
| ![](../../../assets/no.svg "inline")

|nginx.org/lb-method
|lb-method
|Устанавливает метод балансировки нагрузки. По умолчанию `""` определяет метод циклического перебора
|""

|nginx.org/listen-ports
| ![](../../../assets/no.svg "inline")
|Настраивает HTTP-порты, которые NGINX будет прослушивать
|[80]

|nginx.org/listen-ports-ssl
| ![](../../../assets/no.svg "inline")
|Настраивает порты HTTPS, которые будет прослушивать NGINX
|[443]

| ![](../../../assets/no.svg "inline")
|worker-processes
|Устанавливает значение директивы `worker_processes`
|auto

| ![](../../../assets/no.svg "inline")
|worker-rlimit-nofile
|Устанавливает значение директивы `worker_rlimit_nofile`
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|worker-connections
|Устанавливает значение директивы `worker_connections`
|1024

| ![](../../../assets/no.svg "inline")
|worker-cpu-affinity
|Устанавливает значение директивы `worker_cpu_affinity`
| ![](../../../assets/no.svg "inline")

| ![](../../../assets/no.svg "inline")
|worker-shutdown-timeout
|Устанавливает значение директивы `worker_shutdown_timeout`
| ![](../../../assets/no.svg "inline")

|nginx.org/keepalive
|keepalive
|Устанавливает значение директивы `keepalive`. Обратите внимание, что `proxy_set_header Connection ""`; добавляется в сгенерированную конфигурацию, когда значение > 0
|0

| ![](../../../assets/no.svg "inline")
|proxy-protocol
|Включает протокол PROXY для входящих соединений
|False

|nginx.org/rewrites
| ![](../../../assets/no.svg "inline")
|Настройка перезаписи URL
| ![](../../../assets/no.svg "inline")

|nginx.org/ssl-services
| ![](../../../assets/no.svg "inline")
|Активирует HTTPS при подключении к конечным точкам сервисов
| ![](../../../assets/no.svg "inline")

|nginx.org/websocket-services
| ![](../../../assets/no.svg "inline")
|Активирует веб-сокеты для сервера
| ![](../../../assets/no.svg "inline")

|nginx.org/max-fails
|max-fails
|Устанавливает значение параметра `max_fails` директивы сервера
|1

|nginx.org/fail-timeout
|fail-timeout
|Устанавливает значение параметра `fail_timeout` директивы сервера
|10s
|===
{ifdef(private-pdf, private-pg-pdf)}
{/caption}
{/ifdef}

### {heading(Конфигурация с помощью ConfigMap)[id=k8s-ingress-configmap]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Создайте файл `nginx-config.yaml`:

   ```console
   vi nginx-config.yaml
   ```
1. Добавьте в файл манифест объекта ConfigMap, установив необходимые параметры.
1. Примените созданный файл:

   ```console
   kubectl apply -f nginx-config.yaml
   ```

   Конфигурация NGINX Ingress Controller будет изменена.

### {heading(Конфигурация с помощью аннотаций)[id=k8s-ingress-annotation]}

Чтобы настроить параметры для конкретного Ingress, используйте аннотации. Значения, используемые в аннотациях имеют больший приоритет, чем объекты ConfigMap.

Пример конфигурации объекта Ingress с помощью аннотаций:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cafe-ingress-with-annotations
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.org/proxy-connect-timeout: "30s"
    nginx.org/proxy-read-timeout: "20s"
    nginx.org/client-max-body-size: "4m"
    nginx.org/location-snippets: |-
        if ($ssl_client_verify = SUCCESS) {
            set $auth_basic off;
        }
        if ($ssl_client_verify != SUCCESS) {
            set $auth_basic "Restricted";
        }
        auth_basic $auth_basic;
        auth_basic_user_file "/var/run/secrets/nginx.org/auth-basic-file";
    nginx.org/server-snippets: |-
        ssl_verify_client optional;
spec:
  rules:
  - host: cafe.annotations.example.com
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

## {heading(Использование SSL-сертификатов в Ingress)[id=k8s-ingress-ssl]}

Ingress Controllers в Kubernetes позволяют использовать SSL-сертификаты для терминации TLS-трафика. Возможно применение заранее выпущенных сертификатов.

Чтобы интегрировать существующий SSL-сертификат в Ingress:

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Получите внешний IP-адрес Ingress-контроллера:

   ```console
   kubectl get svc -n ingress-nginx | grep ingress | grep LoadBalancer
   ```

1. Делегируйте A-запись вашего домена на внешний IP-адрес Ingress Controller.
1. Создайте файл с объектом типа Secret для хранения данных SSL-сертификата. В поля `tls.crt` и `tls.key` вставьте коды сертификата и закрытого ключа в формате Base64.

   Пример манифеста файла `tls-secret.yaml`:

   ```console
   apiVersion: v1
   kind: Secret
   metadata:
     name: test-secret-tls
     namespace: default
   data:
     tls.crt: <BASE64_ENCODED_CERTIFICATE>
     tls.key: <BASE64_ENCODED_KEY>
   type: kubernetes.io/tls
   ```

1. Разверните объект типа Secret:

   ```console
   kubectl apply -f tls-secret.yaml
   ```

1. Создайте файл с целевым приложением и сервисом.

   Пример манифеста файла `service-rc.yaml`:

   ```yaml
   apiVersion: v1
   kind: ReplicationController
   metadata:
     name: nginx
   spec:
     replicas: 2
     selector:
       app: nginx
     template:
       metadata:
         name: nginx
         labels:
           app: nginx
       spec:
         containers:
         - name: nginx
           image: nginx
           ports:
           - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     labels:
       name: nginx
     name: nginx
   spec:
     ports:
       - port: 80
     selector:
       app: nginx
   ```

1. Разверните объекты приложения и сервиса:

   ```console
   kubectl apply -f service-rc.yaml
   ```

1. Создайте файл с объектом типа Ingress.

   Пример манифеста файла `ingress-custom-ssl.yaml`:

   ```yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: ingress-custom-ssl
     annotations:
       ingress.kubernetes.io/ssl-redirect: "true"
       kubernetes.io/ingress.class: nginx
   spec:
     tls:
     - hosts:
       - <УЗЕЛ_INGRESS>
       secretName: test-secret-tls
     rules:
     - host: <УЗЕЛ_INGRESS>
       http:
         paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: nginx
               port:
                 number: 80
   ```

1. Разверните объект типа Ingress:

   ```console
   kubectl apply -f ingress-custom-ssl.yaml
   ```

{note:warn}
Аннотация `ingress.kubernetes.io/ssl-redirect: "true"` отвечает за перенаправление с HTTP на HTTPS.
{/note}
{/ifndef}