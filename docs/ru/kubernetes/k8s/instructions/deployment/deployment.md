# {heading(Работа с Deployment)[id=k8s-deployment]}

Deployment — это объект Kubernetes, представляющий набор множества идентичных контейнеров без уникальных номеров. Deployment позволяет запускать несколько реплик приложений и автоматически заменять экземпляры приложений в случае сбоя.

## {heading(Создание нового Deployment)[id=k8s-deployment-create]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml create deployment <DEPLOYMENT> --image=<ОБРАЗ>
```
Здесь:

* `<DEPLOYMENT>` — название Deployment.
* `<ОБРАЗ>` — название образа контейнера.

## {heading(Просмотр статуса текущего Deployment)[id=k8s-deployment-describe]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml describe deployment <DEPLOYMENT>
```

Здесь `<DEPLOYMENT>` — название Deployment.

Пример описания Deployment в формате YAML:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

В данном примере создается три идентичных контейнера с именем `nginx` на базе образа NGINX. Доступ к контейнерам осуществляется по 80-му порту.

При обновлении Deployment Kubernetes последовательно перезапускает контейнеры с новой конфигурацией, при этом прежние контейнеры не удаляются, пока не будут успешно запущено достаточное количество новых контейнеров.

## {heading(Обновление Deployment)[id=k8s-deployment-update]}

```console
kubectl --insecure-skip-tls-verify=true --kubeconfig kubeconfig.yaml apply -f <DEPLOYMENT>
```
Здесь `<DEPLOYMENT>` — название Deployment.