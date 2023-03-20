## Установка аддона

При [установке](../../manage-addons#ustanovka-addona) аддона с настройками по умолчанию будет создан секрет Kubernetes, содержащий постоянный пароль для входа в веб-интерфейс Grafana.

Также при установке аддона можно указать временный пароль пользователя. В этом случае первый вход в веб-интерфейс Grafana выполняется в этим паролем, затем будет предложено его сменить. Для этого измените код настройки аддона при установке Kube Prometheus Stack:

```
grafana:
  resources:
  ...
  adminPassword: "<временный пароль>"
```

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

## Получение пароля для Grafana из секрета Kubernetes

Если аддон был установлен без указания временного пароля, значение пароля для входа в веб-интерфейс Grafana можно получить из секрета Kubernetes.

<info>

Если при добавлении аддона были выбраны имя сервиса, отличное от `kube-prometheus-stack`, или пространство имен, отличное от `prometheus-monitoring`, скорректируйте приведенные ниже шаги.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Подключитесь к кластеру](../../../../connect/k8s-dashboard) с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `prometheus-monitoring`.
1. Перейдите в раздел меню **Config and Storage → Secrets**.
1. Найдите в списке секретов `kube-prometheus-stack-grafana` и нажмите на имя секрета.
1. В блоке **Data** нажмите на иконку глаза рядом с параметром `admin-password`.

   Будет отображен пароль.

</tabpanel>
<tabpanel>

1. [Убедитесь](../../../../connect/kubectl#proverka-podklyucheniya-k-klasteru), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Получите пароль для входа в Grafana из секрета Kubernetes:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
