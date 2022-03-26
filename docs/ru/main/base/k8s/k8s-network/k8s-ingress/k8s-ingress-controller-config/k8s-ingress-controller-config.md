При создании нового кластера Kubernetes уже имеется предустановленный Ingress Controller.

После выполнения шагов по созданию кластера в разделе «Виртуальные сети» → «Балансировщики нагрузки» автоматически создается балансировщик для Ingress Controller.
Такая возможность исключает отдельное действие по созданию балансировщика для кластера.

<info>

Определенные параметры могут быть сконфигурированы только с помощью ConfigMap, либо только с помощью аннотаций.

</info>

## Опции Nginx Ingress Controller
Можно управлять различными опциями NGINX Ingress Controller с помощью ConfigMap или аннотаций. В случае использования ConfigMap, данные параметры будут применены глобально ко всем ресурсам Ingress, в случае аннотаций - только к тому Ingress, в котором использована эту аннотацию. 

Следующая таблица показывает соответствие между доступными аннотациями и ключами ConfigMap.
### Соответствие аннотаций
<table>
   <tbody>
      <tr>
         <td>Аннотация</td>
         <td>Ключ ConfigMap</td>
         <td>Описание</td>
         <td>Значение по умолчанию</td>
      </tr>
      <tr>
         <td>kubernetes.io/ingress.class</td>
         <td>N/A</td>
         <td>Определяет, какой контроллер Ingress должен обрабатывать ресурс Ingress. Установите значение nginx, чтобы контроллер NGINX Ingress обрабатывал его.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-connect-timeout</td>
         <td>proxy-connect-timeout</td>
         <td>Устанавливает значение директивы proxy_connect_timeout.</td>
         <td>60s</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-read-timeout</td>
         <td>proxy-read-timeout</td>
         <td>Устанавливает значение директивы proxy_read_timeout.</td>
         <td>60s</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/client-max-body-size</td>
         <td>client-max-body-size</td>
         <td>Устанавливает значение директивы client_max_body_size.</td>
         <td>1m</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-buffering</td>
         <td>proxy-buffering</td>
         <td>Включает или отключает буферизацию ответов от прокси-сервера.</td>
         <td>True</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-buffers</td>
         <td>proxy-buffers</td>
         <td>Устанавливает значение директивы proxy_buffers.</td>
         <td>Depends on the platform.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-buffer-size</td>
         <td>proxy-buffer-size</td>
         <td>Устанавливает значение директивы proxy_buffer_size</td>
         <td>Depends on the platform.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-max-temp-file-size</td>
         <td>proxy-max-temp-file-size</td>
         <td>Устанавливает значение директивы proxy_max_temp_file_size.</td>
         <td>1024m</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-hide-headers</td>
         <td>proxy-hide-headers</td>
         <td>Устанавливает значение одной или нескольких директив proxy_hide_header. Пример: «nginx.ingress.kubernetes.io/proxy-hide-headers»: «header-a, header-b»</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/proxy-pass-headers</td>
         <td>proxy-pass-headers</td>
         <td>Устанавливает значение одной или нескольких директив proxy_pass_header. Пример: «nginx.ingress.kubernetes.io/proxy-pass-headers»: «header-a, header-b»</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>server-names-hash-bucket-size</td>
         <td>Устанавливает значение директивы server_names_hash_bucket_size.</td>
         <td>Depends on the size of the processor’s cache line.</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>server-names-hash-max-size</td>
         <td>Устанавливает значение директивы server_names_hash_max_size.</td>
         <td>512</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>http2</td>
         <td>Включает HTTP / 2 на серверах с включенным SSL.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/redirect-to-https</td>
         <td>redirect-to-https</td>
         <td>Устанавливает правило перенаправления 301 на основе значения http_x_forwarded_protoheader в блоке сервера, чтобы заставить входящий трафик проходить через HTTPS. Полезно при завершении SSL в балансировщике нагрузки перед контроллером Ingress - см. 115</td>
         <td>False</td>
      </tr>
      <tr>
         <td>ingress.kubernetes.io/ssl-redirect</td>
         <td>ssl-redirect</td>
         <td>Устанавливает безусловное правило перенаправления 301 для всего входящего HTTP-трафика, чтобы принудительно использовать входящий трафик по HTTPS.</td>
         <td>True</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>log-format</td>
         <td>Устанавливает собственный формат журнала логирования.</td>
         <td>See thetemplate file.</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts</td>
         <td>hsts</td>
         <td>Включает строгую транспортную безопасность HTTP (HSTS): заголовок HSTS добавляется к ответам от бэкэндов. Директива preload включена в заголовок.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts-max-age</td>
         <td>hsts-max-age</td>
         <td>Устанавливает значение директивы max-age заголовка HSTS.</td>
         <td>2592000(1 month)</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/hsts-include-subdomains</td>
         <td>hsts-include-subdomains</td>
         <td>Добавляет директиву includeSubDomains в заголовок HSTS.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-protocols</td>
         <td>Устанавливает значение директивы ssl_protocols.</td>
         <td>TLSv1 TLSv1.1 TLSv1.2</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-prefer-server-ciphers</td>
         <td>Включает или отключает директиву ssl_prefer_server_ciphers.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-ciphers</td>
         <td>Устанавливает значение директивы ssl_ciphers.</td>
         <td>HIGH:!aNULL:!MD5</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>ssl-dhparam-file</td>
         <td>Устанавливает содержимое файла dhparam. Контроллер создаст файл и установит значение директивы ssl_dhparam с путем к файлу.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>set-real-ip-from</td>
         <td>Устанавливает значение директивы set_real_ip_from.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>real-ip-header</td>
         <td>Устанавливает значение директивы real_ip_header.</td>
         <td>X-Real-IP</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>real-ip-recursive</td>
         <td>Включает или отключает директиву real_ip_recursive.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/server-tokens</td>
         <td>server-tokens</td>
         <td>Включает или отключает server_tokensdirective. Кроме того, с помощью NGINX Plus можно указать настраиваемое строковое значение, включая пустое строковое значение, которое отключает выдачу поля «Сервер».</td>
         <td>True</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>main-snippets</td>
         <td>Устанавливает настраиваемый фрагмент в основном контексте.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>http-snippets</td>
         <td>Устанавливает настраиваемый фрагмент в контексте http.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/location-snippets</td>
         <td>location-snippets</td>
         <td>Устанавливает настраиваемый фрагмент в контексте местоположения.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/server-snippets</td>
         <td>server-snippets</td>
         <td>Устанавливает настраиваемый фрагмент в контексте сервера.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/lb-method</td>
         <td>lb-method</td>
         <td>Устанавливает метод балансировки нагрузки. По умолчанию "" определяет метод циклического перебора.</td>
         <td>""</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/listen-ports</td>
         <td>N/A</td>
         <td>Настраивает HTTP-порты, которые NGINX будет прослушивать.</td>
         <td>[80]</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/listen-ports-ssl</td>
         <td>N/A</td>
         <td>Настраивает порты HTTPS, которые будет прослушивать NGINX.</td>
         <td>[443]</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-processes</td>
         <td>Устанавливает значение директивы worker_processes.</td>
         <td>auto</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-rlimit-nofile</td>
         <td>Устанавливает значение директивы worker_rlimit_nofile.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-connections</td>
         <td>Устанавливает значение директивы worker_connections.</td>
         <td>1024</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-cpu-affinity</td>
         <td>Устанавливает значение директивы worker_cpu_affinity.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>worker-shutdown-timeout</td>
         <td>Устанавливает значение директивы worker_shutdown_timeout.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/keepalive</td>
         <td>keepalive</td>
         <td>Устанавливает значение директивы keepalive. Обратите внимание, что proxy_set_header Connection ""; добавляется в сгенерированную конфигурацию, когда значение&gt; 0.</td>
         <td>0</td>
      </tr>
      <tr>
         <td>N/A</td>
         <td>proxy-protocol</td>
         <td>Включает протокол PROXY для входящих соединений.</td>
         <td>False</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/rewrites</td>
         <td>N/A</td>
         <td>Настройка перезаписи URL.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/ssl-services</td>
         <td>N/A</td>
         <td>Активирует HTTPS при подключении к конечным точкам сервисов.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/websocket-services</td>
         <td>N/A</td>
         <td>Активирует вебсокеты для сервера.</td>
         <td>N/A</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/max-fails</td>
         <td>max-fails</td>
         <td>Устанавливает значение параметра max_fails директивы сервера.</td>
         <td>1</td>
      </tr>
      <tr>
         <td>nginx.ingress.kubernetes.io/fail-timeout</td>
         <td>fail-timeout</td>
         <td>Устанавливает значение параметра fail_timeout директивы сервера.</td>
         <td>10s</td>
      </tr>
   </tbody>
</table>

## Конфигурация с помощью ConfigMaps

Есть два варианта применения ConfigMap:

<tabs>
<tablist>
<tab>Со своего компьютера</tab>
<tab>Напрямую в Kubernetes</tab>
</tablist>
<tabpanel>

Следует отредактировать файл nginx-config.yaml, установив необходимые параметры.
Далее следует применить данный файл на кластере Kubernetes:
``` bash
kubectl apply -f nginx-config.yaml
```

После этого конфигурация NGINX Ingress Controller будет изменена.
Если необходимо обновить некоторые параметры, надо изменить файл nginx-config.yaml и выполнить следующую команду еще раз:
``` bash
kubectl apply -f nginx-config.yaml
```

</tabpanel>
<tabpanel>

Развернутый Helm-ом Nginx-ingress берет параметры из ConfigMap находящегося в namespace в котором он развернут.
Чтобы получить namespace, выполните команду: 
``` bash
helm ls -A | grep nginx
```
``` yaml
NAME            NAMESPACE       REVISION   UPDATED                                   STATUS     CHART                  APP VERSION
ingress-nginx   ingress-nginx   1          2021-12-07 10:03:02.541220976 +0000 UTC   deployed   ingress-nginx-3.36.0   0.49.0
```
Для применения параметров к Ingress Controller необходимо добавить их в ConfigMap в соответствующем namespace. Чтобы добавить или изменить параметры к Nginx Ingress Controller выполните следующие шаги: 					
1. Получите список имеющихся ConfigMap:
``` bash
kubectl -n ingress-nginx get configmap
```
``` yaml
NAME                              DATA   AGE
ingress-controller-leader-nginx   0      35d
ingress-nginx-controller          7      35d
kube-root-ca.crt                  1      35d
```
Обратите внимание на `ingress-nginx-controller`.

2. Отредактируйте секцию `data`. Вы можете добавить или изменить необходимые параметры.
``` bash
kubectl -n ingress-nginx edit cm ingress-nginx-controller
```
``` yaml
data:
   ...
  proxy-buffer-size: "256k"
  proxy-buffers: "4 256k"
  proxy-connect-timeout: "1d"
  proxy-read-timeout: "1d"
```

Посмотреть полный список параметров можно [здесь](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/).

3. Сохраните изменения.

</tabpanel>
</tabs>

## Конфигурация с помощью аннотаций

Если необходимо настроить параметры для конкретного Ingress, проще всего использовать аннотации. Значения, используемые в аннотациях имеют больший приоритет, чем ConfigMap.

Например, cafe-ingress-with-annotations.yaml:

``` yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: nginx
spec:
  controller: k8s.io/ingress-nginx

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cafe-ingress-with-annotations
  annotations:
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "20"
    nginx.ingress.kubernetes.io/proxy-body-size: "4m"
spec:
  rules:
  - host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          service:
            name: tea-svc
            port:
              number: 80
      - path: /coffee
        backend:
          service:
            name: coffee-svc
            port:
              number: 80
  ingressClassName: nginx
```