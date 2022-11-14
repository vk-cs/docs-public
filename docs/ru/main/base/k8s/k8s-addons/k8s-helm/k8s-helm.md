Helm - популярный менеджер пакетов для Kubernetes, который может быть использован для быстрой установки сложных приложений, таких как CRM, e-commerce, базы данных и т.д.

## Установка Helm v2

Так как кластеры Kubernetes, устанавливаемые VK Cloud, используют ролевую модель безопасности, необходимо инициализировать Helm следующим образом:

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

## Установка Helm v3

В Helm v3 был удалён компонент tiller, поэтому инициализация Helm для ролевой модели безопасности не нужна.

Вы можете установить helm v3 при помощи [документации с официального сайта](https://helm.sh/docs/intro/install/).
Установка при помощи скрипта:

```bash
sudo curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
sudo chmod 700 get_helm.sh
sudo ./get_helm.sh
```

[Инструкция по миграции с Helm v2 на Helm v3](https://helm.sh/docs/topics/v2_v3_migration/#migration-use-cases)