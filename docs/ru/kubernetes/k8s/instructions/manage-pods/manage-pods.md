# {heading(Управление подами)[id=k8s-manage-pods]}

Под (pod) — группа из одного или нескольких контейнеров приложений, включающая общие используемые хранилище (тома), IP-адрес и информацию по их запуску.

Подробная информация о подах приведена в [официальной документации](https://kubernetes.io/docs/concepts/workloads/pods/) Kubernetes.

Каждый под представляет собой одиночный инстанс (экземпляр) запущенного приложения. Запускайте несколько подов на каждый инстанс приложения, если выполняете {linkto(../scale#k8s-instructions-scale-horizontal)[text=горизонтальное масштабирование]}.

Доступны операции с подами:

* {linkto(#k8s-manage-pods-create)[text=%text]}.
* {linkto(#k8s-manage-pods-connect)[text=%text]}.
* {linkto(#k8s-manage-pods-delete)[text=%text]}.

## {heading(Создание пода)[id=k8s-manage-pods-create]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Создайте файл `pod.yaml` и откройте его в режиме редактирования:
   
   ```console
   vi pod.yaml
   ```

1. Наполните файл манифестом пода и сохраните изменения.

   Пример манифеста для пода с веб-сервером NGINX:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. Внесите изменения в конфигурацию кластера из файла `pod.yaml`:
   
   ```console
   kubectl apply -f pod.yaml
   ```

   Вывод после успешного создания пода:

   ```console
   pod/nginx-pod created
   ```

1. Выведите информацию о поде для дальнейшего использования:
   
   ```console
   kubectl get pod -o wide
   ```

   Пример ожидаемого результата:

   ```console
   NAME        READY   STATUS    RESTARTS   AGE   IP             NODE                                      NOMINATED NODE   READINESS GATES
   nginx-pod   1/1     Running   0          29s   100.127.71.0   kubernetes-cluster-7779-default-group-0   <none>           <none>
   ```

## {heading(Подключение к поду)[id=k8s-manage-pods-connect]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Получите значения из столбцов `NAMESPACE` и `NAME` для целевого пода, выполнив команду:
   
   ```console
   kubectl get po -A
   ```

   Пример ожидаемого результата:

   ```console
   NAMESPACE   NAME        READY   STATUS    RESTARTS  AGE
   default     nginx-pod   1/1     Running   0         5m4s
   ```

1. Подключитесь к поду с помощью команды:
   
   ```console
   kubectl -n <ПРОСТРАНСТВО_ИМЕН> exec -it <ПОД> -- /bin/bash
   ```
   Здесь:

   * `<ПРОСТРАНСТВО_ИМЕН>` — значение параметра `NAMESPACE`, полученное на предыдущем шаге.
   * `<ПОД>` — значение параметра `NAME`, полученное на предыдущем шаге.

### {heading(Проверка работоспособности пода)[id=k8s-manage-pods-checking]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Создайте под конфигурации, пример которой приведен в разделе {linkto(#k8s-manage-pods-create)[text=%text]}. Если под уже создан, пропустите этот шаг.
1. Получите значения из столбца `IP` для созданного пода:

   ```console
   kubectl get pod nginx-pod
   ```

1. {linkto(#k8s-manage-pods-create)[text=Создайте под]} следующей конфигурации:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-pod
   spec:
     containers:
     - image: nginx:1.12
       name: nginx
       ports:
       - containerPort: 80
   ```

1. {linkto(#k8s-manage-pods-connect)[text=Подключитесь к поду]}.
1. Установите приложение curl:

   ```console
   apt update
   apt install curl
   ```

1. Выполните cURL-запрос по IP-адресу пода `nginx-pod` (создан на шаге 2):

   ```console
   curl 100.127.71.0
   ```

   Пример ожидаемого результата:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
   <title>Welcome to nginx!</title>
   <style>
       body {
           width: 35em;
           margin: 0 auto;
           font-family: Tahoma, Verdana, Arial, sans-serif;
       }
   </style>
   </head>
   <body>
   <h1>Welcome to nginx!</h1>
   <p>If you see this page, the nginx web server is successfully installed and
   working. Further configuration is required.</p>

   <p>For online documentation and support please refer to
   <a href="http://nginx.org/">nginx.org</a>.<br/>
   Commercial support is available at
   <a href="http://nginx.com/">nginx.com</a>.</p>

   <p><em>Thank you for using nginx.</em></p>
   </body>
   </html>
   ```

## {heading(Удаление пода)[id=k8s-manage-pods-delete]}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]}.
1. Получите значения из столбца `NAME` для целевого пода:
   
   ```console
   kubectl get po -A
   ```

1. Удалите под:
   
   ```console
   kubectl delete pod <ПОД>
   ```
   Здесь `<ПОД>` — значение параметра `NAME`, полученное на предыдущем шаге.