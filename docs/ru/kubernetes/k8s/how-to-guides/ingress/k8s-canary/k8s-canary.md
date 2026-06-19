# {heading(Настройка Canary Deployment Ingress)[id=k8s-k8s-canary]}

Эта статья поможет вам развернуть кластер Kubernetes и настроить на нем [Canary Deployment](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary) при помощи Nginx Ingress Annotations: выполнить сценарий Canary Deployment для echo-сервера и убедиться, что трафик распределяется в соответствии с конфигурационным файлом.

## {heading(Подготовительные шаги)[id=k8s-k8s-canary-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Подключитесь]} к кластеру с помощью `kubectl`.
1. Создайте тестовое приложение:

   1. Создайте новое пространство имен для проекта:

      ```console
      kubectl create ns echo-production
      ```

   1. Создайте ресурс Kubernetes на основе манифеста, например, [http-svc](https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml):

   ```console
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-production
   ```

## {heading(1. Создайте ресурс Ingress)[id=k8s-k8s-canary-create-ingress]}

1. Создайте файл манифеста `http-svc.ingress` со следующим содержимым:

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

1. Примените манифест в кластере:

   ```console
   kubectl apply -f http-svc.ingress -n echo-production
   ```

   В результате будет создано приложение и сервер станет реагировать на все запросы от `echo.com`.

## {heading(2. Создайте копию развернутого приложения)[id=k8s-k8s-canary-create-copy-app]}

1. Создайте Canary-версию пространства имен для приложения:

   ```console
   kubectl create ns echo-canary
   ```

1. Разверните Canary-версию приложения:

   ```console
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-canary
   ```

1. Создайте Canary-версию файла конфигурации Ingress:

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

   Расшифровка некоторых параметров:

   - `nginx.ingress.kubernetes.io/canary: "true"` — Kubernetes не будет рассматривать этот Ingress как самостоятельный и пометит его как Canary, связав с основным Ingress.
   - `nginx.ingress.kubernetes.io/canary-weight: "10"` — на Canary будет приходиться примерно 10% всех запросов.

   {/cut}

1. Примените манифест в кластере:

   ```console
   kubectl apply -f http-svc.ingress.canary -n echo-canary
   ```

## {heading(3. Проверьте работоспособность распределения трафика)[id=k8s-k8s-canary-check-traffic]}

1. {linkto(../../../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Подключитесь к кластеру]} с помощью Kubernetes Dashboard.
1. Перейдите в раздел **Namespaces**.
1. Переключите фильтр **Namespace** на `All`.
1. В нижней части бокового меню выберите **Ingresses**.

   Отобразится список всех доступных Ingresses.

1. Убедитесь, что у `http-svc` указан один IP-адрес в столбце **Endpoints**.
1. Проверьте распределение запросов в соответствии с установленной конфигурацией, выполнив скрипт `count.rb`:

   {cut(count.rb)}

   ```ruby
   counts = Hash.new(0)
   1000.times do
     output = \`curl -s -H "Host: echo.com" http://<ВНЕШНИЙ_IP-АДРЕС> | grep 'pod namespace'\`
     counts[output.strip.split.last] += 1
   end
   puts counts
   ```

   {/cut}

   ```console
   ruby count.rb
   ```

Пример успешного результата:

```console
{"echo-production"=>896, "echo-canary"=>104}
```

{ifdef(public)}
## {heading(Удалите неиспользуемые ресурсы)[id=k8s-k8s-canary-delete]}

{include(/ru/_includes/_delete-test-cluster.md)}
{/ifdef}