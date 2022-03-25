Helm - популярный менеджер пакетов для Kubernetes, который может быть использован для быстрой установки сложных приложений, таких как CRM, e-commerce, базы данных и т.д.

Так как кластеры Kubernetes, устанавливаемые VK CS, используют ролевую модель безопасности, необходимо инициализировать Helm следующим образом:

```
kubectl create serviceaccount --namespace kube-system tiller
helm init --service-account tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```

Мы рекомендуем использовать Helm версии не ниже 2.8.1. Проверить какая версия у вас установлена можно командой:

```
helm version
```

Для того, чтобы обновить и клиентские и серверные компоненты Helm до самой последней версии, инициализируйте Helm с помощью следующих команд:

```
kubectl create serviceaccount --namespace kube-system tiller
helm init --service-account tiller --upgrade
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```