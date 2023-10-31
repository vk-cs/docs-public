Gatekeeper — это контроллер, встраиваемый между Kubernetes API и движком политик Open Policy Agent (OPA) для проверки создаваемых, изменяемых и удаляемых ресурсов Kubernetes на соответствие политикам. Более подробная информация о Gatekeeper приведена в [справочнике Kubernetes](../../k8s-reference/gatekeeper/) и в [официальной документации Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/).

<warn>

Используйте эту инструкцию, если ваш кластер версии 1.20 или ниже. Начиная с Kubernetes 1.21, Gatekeeper [уже установлен](../../concepts/architecture) в кластере вместе с [преднастроенными шаблонами и ограничениями](../../concepts/addons-and-settings/settings).

</warn>

## Установка

1. [Установите Helm](../helm/), если утилита еще не установлена.

1. Выполните команды:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts; `
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace

   ```

   </tabpanel>
   </tabs>

## Проверка работоспособности

Проверьте, что поды Gatekeeper создались и работают, выполнив команду:

```bash
kubectl -n opa-gatekeeper get pods
```

В выводе команды должны быть поды `gatekeeper-audit-...` и `gatekeeper-controller-manager-...` в статусе `Running`.

Пример вывода:

```text
NAME                                             READY   STATUS    RESTARTS   AGE
gatekeeper-audit-...                             1/1     Running   0          ...
gatekeeper-controller-manager-...                1/1     Running   0          ...
```

## Удаление

1. Чтобы удалить Gatekeeper, выполните команду:

   ```bash
   helm delete gatekeeper --namespace opa-gatekeeper
   ```

1. Чтобы удалить CRD-объекты, созданные для Gatekeeper, выполните команду:

   ```bash
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

   <warn>

   Эта операция приведет к удалению ограничений и их шаблонов.

   </warn>
