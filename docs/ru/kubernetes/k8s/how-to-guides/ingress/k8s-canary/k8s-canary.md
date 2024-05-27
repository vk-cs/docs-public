Эта статья поможет вам развернуть кластер Kubernetes и настроить на нем [Canary Deployment](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary) при помощи Nginx Ingress Annotations: выполнить сценарий Canary Deployment для echo-сервера и убедиться, что трафик распределяется в соответствии с конфигурационным файлом.

## Подготовительные шаги

1. [Создайте](/ru/base/k8s/operations/create-cluster/create-webui) кластер Kubernetes в VK Cloud.
1. [Подключитесь](/ru/base/k8s/connect/kubectl) к кластеру с помощью kubectl.
1. Создайте тестовое приложение:

   1. Создайте новое пространство имен (namespace) для проекта:

      ```bash
      kubectl create ns echo-production
      ```

   1. Создайте ресурс Kubernetes на основе манифеста, например, [http-svc](https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml):

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-production
   ```

## 1. Создайте ресурс Ingress

1. Создайте файл манифеста `http-svc.ingress` со следующим содержимым:

   <details>
    <summary>http-svc.ingress</summary>

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

   </details>

1. Примените манифест в кластере:

   ```bash
   kubectl apply -f http-svc.ingress -n echo-production
   ```

   В результате будет создано приложение и сервер станет реагировать на все запросы от `echo.com`.

## 2. Создайте копию развернутого приложения

1. Создайте Canary-версию пространства имен для приложения:

   ```bash
   kubectl create ns echo-canary
   ```

1. Разверните Canary-версию приложения:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/docs/examples/http-svc.yaml -n echo-canary
   ```

1. Создайте Canary-версию файла конфигурации Ingress:

   <details>
    <summary>http-svc.ingress.canary</summary>

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

   </details>

1. Примените манифест в кластере:

   ```bash
   kubectl apply -f http-svc.ingress.canary -n echo-canary
   ```

## 3. Проверьте работоспособность распределения трафика

1. [Подключитесь к кластеру](../../../connect/k8s-dashboard/) с помощью Kubernetes Dashboard.
1. Перейдите в раздел **Namespaces**.
1. Переключите фильтр **Namespace** на `All`.
1. В нижней части бокового меню выберите **Ingresses**.

   Отобразится список всех доступных Ingresses.

1. Убедитесь, что у `http-svc` указан один IP-адрес в столбце **Endpoints**.
1. Проверьте распределение запросов в соответствии с установленной конфигурацией, выполнив скрипт `count.rb`:

   <details>
    <summary>count.rb</summary>

   ```ruby
   counts = Hash.new(0)
   1000.times do
     output = \`curl -s -H "Host: echo.com" http://<внешний_ip_адрес> | grep 'pod namespace'\`
     counts[output.strip.split.last] += 1
   end
   puts counts
   ```

   </details>

   ```bash
   ruby count.rb
   ```

Пример успешного результата:

```bash
{"echo-production"=>896, "echo-canary"=>104}
```

## Удалите неиспользуемые ресурсы

Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

- [остановите](../../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
- [удалите](../../../service-management/manage-cluster#udalit_klaster) его навсегда.
