[Helm](https://helm.sh/docs/) — популярный менеджер пакетов для Kubernetes, который может быть использован в качестве надстройки над `kubectl` для быстрой установки и обновления приложений.

## Установка

1. [Убедитесь](../../connect/kubectl#proverka-podklyucheniya-k-klasteru), что вы можете подключаться к кластеру с помощью `kubectl` с хоста, на который планируется установить клиент Helm.
1. Установите клиент Helm на хост любым из способов, описанных в [официальной документации Helm](https://helm.sh/docs/intro/install/).

   Выберите наиболее актуальную версию Helm, совместимую с кластером, в котором вы планируете использовать клиент. Таблица совместимости версий Helm и Kubernetes приведена в [официальной документации Helm](https://helm.sh/docs/topics/version_skew/#supported-version-skew).

1. При необходимости добавьте путь до исполняемого файла Helm в переменную окружения `PATH`, если этого не было сделано во время установки.

1. Убедитесь, что установлена нужная версия Helm, выполнив команду:

   ```bash
   helm version
   ```

## Проверка работоспособности

1. Установите NGINX из репозитория Bitnami:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm repo add bitnami https://charts.bitnami.com/bitnami; `
   helm repo update; `
   helm install demo-helm-nginx bitnami/nginx
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   helm install demo-helm-nginx bitnami/nginx

   ```

   </tabpanel>
   </tabs>

1. Проверьте работоспособность пода NGINX, выполнив команду:

   ```bash
   kubectl get pods
   ```

   В выводе команды должен быть под `demo-helm-nginx-...` в статусе `Running`.

   Пример вывода:

   ```text
   NAME                               READY   STATUS    RESTARTS   AGE
   demo-helm-nginx-...                1/1     Running   0          ...
   ```

1. Удалите установленный с помощью Helm NGINX и отключите репозиторий Bitnami:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm uninstall demo-helm-nginx; `
   helm repo remove bitnami
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm uninstall demo-helm-nginx
   helm repo remove bitnami

   ```

   </tabpanel>
   </tabs>

## Удаление

1. Удалите исполняемый файл клиента Helm.

1. При необходимости удалите записи, связанные с Helm, из переменной среды окружения `PATH`.

1. При необходимости удалите директории и файлы, созданные Helm:

   - Директория с кешем: соответствует переменной окружения `$XDG_CACHE_HOME`.
   - Директория с файлами конфигурации: соответствует переменной окружения `$XDG_CONFIG_HOME`.
   - Директория с данными: соответствует переменной окружения `$XDG_DATA_HOME`.

   Директории, соответствующие этим переменным для различных операционных систем, приведены в [официальной документации Helm](https://helm.sh/docs/faq/uninstalling/).
