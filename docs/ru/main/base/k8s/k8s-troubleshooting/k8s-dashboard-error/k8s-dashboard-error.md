### Проблема

После создания нового кластера Kubernetes, при попытке зайти в дашборд по ссылке *http://\*\*\*:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login*, возникает ошибка »404 the server could not find the requested resource».

### Решение

Для решения проблемы необходимо выполнить следующие шаги:

1. Установить и настроить kubectl согласно [инструкции](/base/k8s/k8s-start/connect-k8s).

2. Сохранить в текущий каталог файл [dashboard-19-fix.yaml](/docs/_docs/ru/main/base/k8s/k8s-troubleshooting/k8s-dashboard-error/assets/dashboard-19-fix.yaml "download").
3. Выполнить следующую последовательность команд:

```bash
kubectl apply -f dashboard-19-fix.yaml
kubectl-n kube-system set image deployment/kubernetes-dashboard kubernetes-dashboard:5010=registry.infra.mail.ru/dashboard:v2.0.5
```

4. Подождать несколько минут и перезагрузить страницу с дэшбордом.
