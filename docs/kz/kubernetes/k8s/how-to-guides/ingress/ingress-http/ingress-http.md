{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Ingress-контроллерін жайып орналастырған кезде ол үшін [стандартты жүктеме балансировщигі](/kz/networks/balancing/concepts/load-balancer#zhukteme_tengergishterinin_turleri) жасалады.

Балансировщикті пайдалану [тарифтеледі](/kz/networks/vnet/tariffication).

{/note}

Ingress-контроллерін VK Cloud платформасының [HTTP жүктеме балансировщигімен бірге](../../../concepts/network) жайып орналастыруға болады. Төменде мысал ретінде контроллердің жұмысқа қабілеттілігін тексеру үшін қарапайым демо-қосымшалар мен Ingress ресурсы жасалады.

Төменде NGINX Ingress Controller жайып орналастырылады деп болжанады. Алайда ұсынылған тәсілдерді басқа Ingress-контроллерлерге, мысалы, Traefik-ке де бейімдеуге болады. Мұндай жайып орналастыру кезінде Ingress үшін жүктеме балансировщигінің ережелеріне worker-түйіндерді қолмен қосу қажет. Бұл worker-топ өлшемін қолмен өзгерткенде де, автомасштабтауды қосқанда да дұрыс.

## 1. Дайындық қадамдары

1. [Жасаңыз](../../../instructions/create-cluster) ең өзекті нұсқадағы Kubernetes кластерін.

   Кластерді жасаған кезде **Сыртқы IP тағайындау** опциясын таңдаңыз.

   Кластердің қалған параметрлерін өз қалауыңыз бойынша таңдаңыз.

1. [Тексеріңіз](../../../instructions/addons/manage-addons#addondardy_karau), кластерде NGINX Ingress (`ingress-nginx`) аддоны **орнатылмаған** болуы керек. Көрсету мақсатында Ingress-контроллері қолмен орнатылады.

1. [Тексеріңіз](../../../connect/kubectl), `kubectl` көмегімен кластерге қосыла алуыңыз керек.

1. Утилита әлі орнатылмаған болса, [Helm орнатыңыз](../../../install-tools/helm).

1. Утилита әлі орнатылмаған болса, [curl](https://curl.se/docs/) орнатыңыз.

## 2. Демо-қосымшаларды жайып орналастырыңыз

Осы қосымшаларға қолжетімділік Ingress-контроллері арқылы Ingress ресурсының көмегімен ұйымдастырылады.

Көрсету үшін [NGINX-тен Cafe мысалындағы](https://github.com/nginxinc/kubernetes-ingress/tree/v2.4.0/examples/ingress-resources/complete-example) `tea` және `coffee` қосымшалары пайдаланылады. Әр қосымша ReplicaSet-тен, Deployment-тен және осы Deployment-ке сәйкес келетін Service-тен тұрады.

Демо-қосымшаларды жайып орналастыру үшін:

1. Загрузите манифест [cafe.yaml](https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/v2.4.0/examples/ingress-resources/complete-example/cafe.yaml).

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

## 3. Ingress-контроллерін орнатыңыз

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

1. Команданы орындап, `NodePort` сервисімен Ingress-контроллерін орнатыңыз:

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

1. Ingress-контроллерінің орнатылуы аяқталғанын және контроллерге порт тағайындалғанын күтіңіз.

   Ingress-контроллерінің күйін тексеру үшін команданы орындаңыз:

   ```console
   kubectl get svc -n example-nginx-ingress-http
   ```

   Команданың шығысы мынаған ұқсас болуы керек:

   ```text
   NAME                               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                     AGE
   nginx-ingress-http-nginx-ingress   NodePort   ...            <none>        80:<назначенный порт>/TCP   ...
   ```

## 4. HTTP жүктеме балансировщигін жасаңыз

HTTP жүктеме балансировщигі SSL/TLS қосылыстарын терминирлейді және тек HTTP-трафикті Ingress-контроллеріне қайта бағыттайды.

Балансировщикті баптау үшін:

1. Қажетті деректерді жинаңыз:

   - Кластер түйіндері орналасқан желі мен ішкі желінің атаулары.
   - Кластердің master-түйіндері мен worker-түйіндеріне сәйкес келетін Cloud Servers сервисі инстанстарының атаулары.
   - Алдыңғы қадамда Ingress-контроллеріне тағайындалған порт нөмірі.

1. Балансировщикті жасаңыз:

   1. [өтіңіз](https://kz.cloud.vk.com/app/) VK Cloud жеке кабинетіне.
   1. Қажетті кластер орналасқан жобаны таңдаңыз.
   1. **Виртуалды желілер → Жүктеме балансировщиктері** бөліміне өтіңіз.
   1. **Қосу** батырмасын басыңыз.
   1. Ашылған терезеде:
      1. **Балансировщик атауын** орнатыңыз (кез келген).
      1. Кластердегілермен бірдей желі мен ішкі желіні таңдаңыз.
      1. **DNS атауын** орнатыңыз (кез келген).
      1. **Сыртқы IP тағайындау** опциясының қосулы екеніне көз жеткізіңіз.
      1. Әрбір трафик түрі үшін өңдеу параметрлерін орнатыңыз:

         {tabs}

         {tab(Для HTTP-трафика)}

         1. **Балансировка ережелері** блогында **+ Ереже қосу** сілтемесін басыңыз.
         1. **Тағайындау протоколы** ретінде `HTTP` таңдаңыз, оған Ingress-контроллеріне тағайындалған **портты** орнатыңыз.
         1. **Рұқсат етілген CIDR** блогында **+ Мекенжай қосу** сілтемесін басыңыз. `0.0.0.0/0` енгізіңіз.
         1. **X-Forwarded-For тақырыбын жіберу** опциясын таңдаңыз.
         1. **Келесі инстанстарға қолдану** блогында кластердің master-түйіндері мен worker-түйіндеріне сәйкес келетін барлық Cloud Servers сервисі инстанстарын қосыңыз.

            Барлық инстанстар үшін `1` мәніне тең бірдей салмақтарды орнатыңыз.

         1. **Келесі қадам** батырмасын басыңыз.
         1. **Қосу** батырмасын басыңыз.

         {/tab}

         {tab(Для HTTPS-трафика)}

         1. **Балансировка ережелері** блогында **+ Ереже қосу** сілтемесін басыңыз.
         1. **Балансировка протоколы** ретінде `HTTPS` таңдаңыз.
         1. **Тағайындау протоколы** ретінде `HTTP` таңдаңыз, оған Ingress-контроллеріне тағайындалған **портты** орнатыңыз.
         1. **Рұқсат етілген CIDR** блогында **+ Мекенжай қосу** сілтемесін басыңыз. `0.0.0.0/0` енгізіңіз.
         1. **X-Forwarded-For тақырыбын жіберу** опциясын таңдаңыз.
         1. **Келесі инстанстарға қолдану** блогында кластердің master-түйіндері мен worker-түйіндеріне сәйкес келетін барлық Cloud Servers сервисі инстанстарын қосыңыз.

            Барлық инстанстар үшін `1` мәніне тең бірдей салмақтарды орнатыңыз.

         1. **Сертификат** блогында:

            1. **Жаңа сертификатты жүктеу** тармағын таңдаңыз.
            1. **сертификат атауын** орнатыңыз (кез келген).

            1. Спойлер астындағы мазмұнды **Сертификат немесе сертификаттар тізбегі** өрісіне қойыңыз.

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

            1. Спойлер астындағы мазмұнды **Жабық кілт** өрісіне қойыңыз.

               {cut(Приватная часть самоподписанного сертификата NGINX private.key)}

               ```text
               -----BEGIN RSA PRIVATE KEY-----
               <ЗНАЧЕНИЕ_ЗАКРЫТОГО_RSA_КЛЮЧА>
               -----END RSA PRIVATE KEY-----
               ```

               {/cut}

            {note:info}

            NGINX өздігінен қол қойылған сертификаты `cafe.example.com` доменінде жарияланған қосымшаларға қол жеткізу үшін пайдаланылады.

            {/note}

         1. **Келесі қадам** батырмасын басыңыз.
         1. **Қосу** батырмасын басыңыз.

         {/tab}

         {/tabs}

   Балансировщикті жасау операциясы басталады, ол біраз уақыт алады.

1. Балансировщик жасалғаннан кейін оның жария IP-мекенжайын көшіріп алыңыз, ол Ingress арқылы жарияланған ресурстарға қол жеткізу үшін қажет болады.

## 5. Ingress ресурсін жасаңыз

Ingress ресурсы `coffee-svc` және `tea-svc` сервистерін `cafe.example.com` доменінде Ingress-контроллері арқылы жариялап, осылайша қосымшаларға қолжетімділік ұсынады.

Төменде бұған дейін бапталған HTTP жүктеме балансировщигінен келетін тек HTTP-трафикпен жұмыс істейтін Ingress ресурсын қалай жасау керегі көрсетіледі:

1. `cafe-ingress.yaml` манифест файлын келесі мазмұнмен жасаңыз:

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

1. Осы манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f ./cafe-ingress.yaml
   ```

   `cafe-ingress` Ingress ресурсы жасалады.

1. Келесі команданы орындап, ресурс сәтті жасалғанын тексеріңіз:

   ```console
   kubectl describe ingress cafe-ingress
   ```

   Команданың шығысы мынаған ұқсас болуы керек:

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

## 6. Қосымшалардың қолжетімділігін тексеріңіз

1. `default` аттар кеңістігіндегі барлық подтар тізімін алып, `tea` және `coffee` атаулары бар подтардың бар екеніне көз жеткізіңіз:

   ```console
   kubectl get pods
   ```

1. Команданы орындаңыз:

   {tabs}

   {tab(Coffee)}

   ```console
   curl -k --resolve cafe.example.com:443:<публичный IP-адрес HTTP-балансировщика> https://cafe.example.com/coffee
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

   - VK Cloud HTTP жүктеме балансировщигімен өзара әрекеттеседі (ол SSL/TLS-сессияларын терминирлейді);
   - жайып орналастырылған қосымшаларға сәйкес келетін сервистерге қолжетімділік береді.

   {/tab}

   {tab(Tea)}

   ```console
   curl -k --resolve cafe.example.com:443:<публичный IP-адрес HTTP-балансировщика> https://cafe.example.com/tea
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

   - VK Cloud HTTP жүктеме балансировщигімен өзара әрекеттеседі (ол SSL/TLS-сессияларын терминирлейді);
   - жайып орналастырылған қосымшаларға сәйкес келетін сервистерге қолжетімділік береді.

   {/tab}

   {/tabs}

## Пайдаланылмайтын ресурстарды жойыңыз

1. Манифест файлдарында сипатталған ресурстарды, `example-nginx-ingress-http` қосымшасын, сондай-ақ `example-nginx-ingress-http` аттар кеңістігін және онымен байланысты ресурстарды жойыңыз:

   {note:info}

   Ingress-контроллері үшін жасалған HTTP жүктеме балансировщигі жойылмайды. Қажет болса, оны VK Cloud жеке кабинетінің интерфейсінен қолмен жойыңыз.

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

1. Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

   - [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu), кейінірек пайдалану үшін;
   - [жойыңыз](../../../instructions/manage-cluster#delete_cluster) оны біржола.
