# {heading(Ingress-контроллерін TCP-балансировщикпен жайып орналастыру)[id=k8s-ingress-tcp]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Ingress-контроллерін жайып орналастырған кезде ол үшін {linkto(../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартты жүктеме балансировщигі]} жасалады.

Балансировщикті пайдалану {linkto(../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифтеледі]}.

{/note}

Ingress-контроллерін VK Cloud платформасының {linkto(../../../concepts/network#k8s-network)[text=TCP жүктеме балансировщигімен бірге]} жайып орналастыруға болады. Төменде мысал ретінде контроллердің жұмысқа қабілеттілігін тексеру үшін қарапайым демо-қосымшалар мен Ingress ресурсы жасалады. Төменде NGINX Ingress Controller жайып орналастырылады деп болжанады. Алайда ұсынылған тәсілдерді басқа Ingress-контроллерлерге, мысалы, Traefik-ке де бейімдеуге болады.

## {heading(1. Дайындық қадамдары)[id=k8s-ingress-tcp-prepare]}

{include(/kz/_includes/_create-test-cluster.md)}

   Кластерді жасаған кезде **Сыртқы IP тағайындау** опциясын таңдаңыз.

   Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. {linkto(../../../instructions/addons/manage-addons#k8s-manage-addons-view)[text=Тексеріңіз]}, кластерде NGINX Ingress (`ingress-nginx`) аддоны **орнатылмаған** болуы керек. Көрсету мақсатында Ingress-контроллері қолмен орнатылады.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Тексеріңіз]}, `kubectl` көмегімен кластерге қосыла алуыңыз керек.

1. Утилита әлі орнатылмаған болса, {linkto(../../../install-tools/helm#k8s-helm)[text=Helm орнатыңыз]}.

1. Утилита әлі орнатылмаған болса, [curl](https://curl.se/docs/) орнатыңыз.

## {heading(2. Демо-қосымшаларды жайып орналастырыңыз)[id=k8s-ingress-tcp-deploy-demo]}

Осы қосымшаларға қолжетімділік Ingress-контроллері арқылы Ingress ресурсының көмегімен ұйымдастырылады.

Көрсету үшін [NGINX-тен Cafe мысалындағы](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) `tea` және `coffee` қосымшалары пайдаланылады. Әр қосымша ReplicaSet-тен, Deployment-тен және осы Deployment-ке сәйкес келетін Service-тен тұрады.

Демо-қосымшаларды жайып орналастыру үшін:

1. [cafe.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml) манифесін жүктеп алыңыз.

1. Осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./cafe.yaml
   ```

Қосымшалар компоненттерінің күйін тексеру үшін команданы орындаңыз:

```console
kubectl get svc,rs,deployment -n default
```

Команданың шығысы мынаған ұқсас болуы керек:

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

## {heading(3. Ingress-контроллерін орнатыңыз)[id=k8s-ingress-tcp-install-ingress]}

Орнату кезінде [PROXY протоколын](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) пайдалану режимін таңдаңыз, өйткені бұл TCP жүктеме балансировщигімен толыққанды өзара әрекеттесу үшін қажет. Егер Ingress-контроллерін осы протоколды қолдамай орнатсаңыз, онда контроллер сұраулардың тікелей көзі туралы ақпаратты қамтитын тақырыптарды өңдей алмайды.

PROXY протоколын қолдайтын NGINX Ingress Controller орнату үшін:

1. NGINX үшін Helm-репозиторийін қосыңыз:

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

1. Команданы орындап, PROXY протоколын қолдайтын Ingress-контроллерін орнатыңыз:

   ```console
   helm install nginx-ingress-tcp nginx-stable/nginx-ingress --set-string 'controller.config.entries.use-proxy-protocol=true' --create-namespace --namespace example-nginx-ingress-tcp
   ```

1. Ingress-контроллерінің орнатылуы аяқталғанын және контроллердің сыртқы IP-мекенжай алғанын күтіңіз.

   Ingress-контроллерінің күйін тексеру үшін команданы орындаңыз:

   ```console
   kubectl get svc -n example-nginx-ingress-tcp
   ```

   Команданың шығысы мынаған ұқсас болуы керек:

   ```text
   NAME                            TYPE     CLUSTER-IP    EXTERNAL-IP                PORT(S) AGE
   nginx-ingress-tcp-nginx-ingress LoadBalancer ... <балансировщикке тағайындалған IP-мекенжай> ... ...
   ```

Браузерде `http://<балансировщикке тағайындалған IP-мекенжай>` адресіне өтіп, Ingress-контроллерінің жұмысын тексеріңіз. Егер контроллер дұрыс бапталса, `HTTP 404` күйі бар бет көрсетіледі.

## {heading(4. Ingress ресурсін жасаңыз)[id=k8s-ingress-tcp-create-ingress]}

Ingress ресурсы `coffee-svc` және `tea-svc` сервистерін Ingress-контроллері арқылы жариялап, осылайша қосымшаларға қолжетімділік ұсынады.

Төменде Ingress-контроллерінде SSL/TLS-сессияларды терминирлей отырып Ingress ресурсын қалай жасау керегі көрсетіледі.

Ingress ресурсін жасау үшін:

1. Сертификат туралы деректерді қамтитын Kubernetes секретін жасаңыз. Ол HTTPS-трафикпен жұмыс істеген кезде Ingress-контроллері тарапынан пайдаланылады.

   Бұл секретте `cafe.example.com` доменінде жарияланған қосымшаларға қол жеткізу үшін пайдаланылатын NGINX өздігінен қол қойылған сертификатының жария және жабық бөліктері бар.

   {note:warn}

   Бұл сертификаттың жабық бөлігі интернетте жария түрде қолжетімді, сондықтан оны өндірістік ортада (production environment) жұмыс істейтін нақты қосымшаларды қорғау үшін пайдаланбаңыз.

   {/note}

1. [cafe-secret.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-secret.yaml) манифесін жүктеп алыңыз.

1. Осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./cafe-secret.yaml
   ```

   `cafe-secret` секреті жасалады.

1. Келесі команданы орындап, секреттің сәтті жасалғанын тексеріңіз:

   ```console
   kubectl describe secret cafe-secret
   ```

   Секрет туралы негізгі ақпарат шығарылады.

1. `cafe.example.com` хостына келетін сұрауларды өңдейтін Ingress ресурсін жасаңыз:

   1. [cafe-ingress.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe-ingress.yaml) манифесін жүктеп алыңыз.

   1. Осы манифесті кластерде қолданыңыз:

      ```console
      kubectl apply -f ./cafe-ingress.yaml
      ```

      `cafe-ingress` Ingress ресурсы жасалады.

   Келесі команданы орындап, ресурс сәтті жасалғанын тексеріңіз:

   ```console
   kubectl describe ingress cafe-ingress
   ```

   Команданың шығысы мынаған ұқсас болуы керек:

   ```console
   Name:             cafe-ingress
   Labels:           <none>
   Namespace:        default
   Address:          <балансировщикке тағайындалған IP-мекенжай>
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

   Балансировщикке тағайындалған Ingress IP-мекенжайы Ingress-контроллеріне тағайындалған IP-мекенжаймен сәйкес келуі керек екеніне назар аударыңыз. Бұл мекенжай VK Cloud платформасының TCP-балансировщигіне тиесілі, ол кіріс трафикті Ingress-контроллеріне бағыттайды.

## {heading(5. Қосымшалардың қолжетімділігін тексеріңіз)[id=k8s-ingress-tcp-check]}

1. `default` аттар кеңістігіндегі барлық подтар тізімін алып, `tea` және `coffee` атаулары бар подтардың бар екеніне көз жеткізіңіз:

   ```console
   kubectl get pods
   ```

1. Команданы орындаңыз:

   {tabs}

   {tab(Coffee)}

   ```console
   curl -k --resolve cafe.example.com:443:<Ingress IP-мекенжайы> https://cafe.example.com/coffee
   ```

   Сұрауға `coffee` ішіндегі екі подтың бірі жауап беруі керек. Жауапта жауап берген подтың атауы (`Server name`) болады, мысалы:

   ```text
   Server address: ...:8080
   Server name: coffee-7c86d7d67c-zsmwz
   Date: ...
   URI: /coffee
   Request ID: ...
   ```

   Осындай жауаптардың алынуы Ingress-контроллерінің дұрыс бапталғанын білдіреді:

   - VK Cloud TCP жүктеме балансировщигімен өзара әрекеттеседі;
   - SSL/TLS-сессияларын терминирлейді;
   - жайып орналастырылған қосымшаларға сәйкес келетін сервистерге қолжетімділік береді.

   {/tab}

   {tab(Tea)}

   ```console
   curl -k --resolve cafe.example.com:443:<Ingress IP-мекенжайы> https://cafe.example.com/tea
   ```

   Сұрауға `tea` ішіндегі үш подтың бірі жауап беруі керек. Жауапта жауап берген подтың атауы (`Server name`) болады, мысалы:

   ```text
   Server address: ...:8080
   Server name: tea-5c457db9-gjkgk
   Date: ...
   URI: /tea
   Request ID: ...
   ```

   Осындай жауаптардың алынуы Ingress-контроллерінің дұрыс бапталғанын білдіреді:

   - VK Cloud TCP жүктеме балансировщигімен өзара әрекеттеседі;
   - SSL/TLS-сессияларын терминирлейді;
   - жайып орналастырылған қосымшаларға сәйкес келетін сервистерге қолжетімділік береді.

   {/tab}

   {/tabs}

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=k8s-ingress-tcp-delete]}

Жұмыс істеп тұрған кластер тарифтеледі және есептеу ресурстарын тұтынады. Егер Ingress-контроллерінің жұмысын тексеру үшін жасалған Kubernetes ресурстары сізге енді қажет болмаса, оларды жойыңыз:

1. Манифест файлдарында сипатталған ресурстарды, `example-nginx-ingress-tcp` қосымшасын, сондай-ақ `example-nginx-ingress-tcp` аттар кеңістігін және онымен байланысты ресурстарды жойыңыз:

   {note:info}

   Сондай-ақ Ingress-контроллері үшін жасалған TCP жүктеме балансировщигі де жойылады.

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
{include(/kz/_includes/_delete-test-cluster-short.md)}
{/ifdef}
