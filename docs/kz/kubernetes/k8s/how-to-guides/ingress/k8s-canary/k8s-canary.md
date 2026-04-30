{include(/kz/_includes/_translated_by_ai.md)}

Бұл мақала Kubernetes кластерін жайып орналастыруғал және онда [Canary Deployment](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary) баптауғал Nginx Ingress Annotations көмегімен көмектеседі: echo-сервер үшін Canary Deployment сценарийін орындауғал және трафиктің конфигурациялық файлғал сәйкес бөлінетініне көз жеткізуге мүмкіндік береді.

## Дайындық қадамдары

1. [Жасаңыз](/kz/kubernetes/k8s/instructions/create-cluster/create-webui) VK Cloud-та Kubernetes кластерін.
1. [қосылыңыз](/kz/kubernetes/k8s/connect/kubectl) кластерге `kubectl` көмегімен.
1. Тесттік қосымша жасаңыз:

   1. Жоба үшін жаңал аттар кеңістігін жасаңыз:

      ```console
      kubectl create ns echo-production
      ```

   1. Мысалы, [http-svc](https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml) манифесі негізінде Kubernetes ресурсін жасаңыз:

   ```console
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-production
   ```

## 1. Ingress ресурсін жасаңыз

1. `http-svc.ingress` манифест файлын келесі мазмұнмен жасаңыз:

   {cut(http-svc.ingress)}

   ```yaml
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: http-svc
      annotations:
        kubernetes.io/ingress.class: nginx
    spec:
      rules:
      - host: echo.com
        http:
          paths:
          - backend:
              serviceName: http-svc
              servicePort: 80
    ```

   {/cut}

1. Манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f http-svc.ingress -n echo-production
   ```

   Нәтижесінде қосымша жасалады және сервер `echo.com` адресінен келетін барлық сұрауларғал жауап бере бастайды.

## 2. Жайып орналастырылған қосымшаның көшірмесін жасаңыз

1. Қосымша үшін аттар кеңістігінің Canary-нұсқасын жасаңыз:

   ```console
   kubectl create ns echo-canary
   ```

1. Қосымшаның Canary-нұсқасын жайып орналастырыңыз:

   ```console
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-canary
   ```

1. Ingress конфигурация файлының Canary-нұсқасын жасаңыз:

   {cut(http-svc.ingress.canary)}

   ```yaml
   apiVersion: extensions/v1beta1
   kind: Ingress
   metadata:
     name: http-svc
     annotations:
       kubernetes.io/ingress.class: nginx
       nginx.ingress.kubernetes.io/canary: "true"
       nginx.ingress.kubernetes.io/canary-weight: "10"
   spec:
     rules:
     - host: echo.com
       http:
         paths:
         - backend:
             serviceName: http-svc
             servicePort: 80
   ```

   Кейбір параметрлердің түсіндірмесі:

   - `nginx.ingress.kubernetes.io/canary: "true"` — Kubernetes бұл Ingress-ті дербес ретінде қарастырмайды және оны негізгі Ingress-пен байланыстыра отырып, Canary ретінде белгілейді.
   - `nginx.ingress.kubernetes.io/canary-weight: "10"` — барлық сұраулардың шамамен 10%-ы Canary-ге түседі.

   {/cut}

1. Манифесті кластерде қолданыңыз:

   ```console
   kubectl apply -f http-svc.ingress.canary -n echo-canary
   ```

## 3. Трафиктің бөлінуінің жұмысқал қабілеттілігін тексеріңіз

1. [қосылыңыз](../../../connect/k8s-dashboard) көмегімен Kubernetes Dashboard.
1. **Namespaces** бөліміне өтіңіз.
1. **Namespace** сүзгісін `All` мәніне ауыстырыңыз.
1. Бүйірлік мәзірдің төменгі бөлігінде **Ingresses** таңдаңыз.

   Барлық қолжетімді Ingresses тізімі көрсетіледі.

1. `http-svc` үшін **Endpoints** бағанында бір IP-мекенжай көрсетілгеніне көз жеткізіңіз.
1. Орнатылған конфигурацияғал сәйкес сұраулардың бөлінуін `count.rb` скриптін орындап тексеріңіз:

   {cut(count.rb)}

   ```ruby
   counts = Hash.new(0)
   1000.times do
     output = \`curl -s -H "Host: echo.com" http://<внешний_ip_адрес> | grep 'pod namespace'\`
     counts[output.strip.split.last] += 1
   end
   puts counts
   ```

   {/cut}

   ```console
   ruby count.rb
   ```

Сәтті нәтиженің мысалы:

```console
{"echo-production"=>896, "echo-canary"=>104}
```

## Пайдаланылмайтын ресурстарды жойыңыз

Жұмыс істеп тұрған кластер есептеу ресурстарын тұтынады. Егер ол сізге енді қажет болмаса:

- [тоқтатыңыз](../../../instructions/manage-cluster#klasterdi_iske_kosu_nemese_toktatu), кейінірек пайдалану үшін;
- [жойыңыз](../../../instructions/manage-cluster#delete_cluster) оны біржола.
