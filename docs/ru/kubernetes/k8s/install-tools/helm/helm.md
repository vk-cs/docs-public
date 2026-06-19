# {heading(Установка Helm)[id=k8s-helm]}

[Helm](https://helm.sh/docs/) — популярный менеджер пакетов для Kubernetes, который может быть использован в качестве надстройки над `kubectl` для быстрой установки и обновления приложений.

{ifndef(public)}
Helm доступен в созданных кластерах по умолчанию.
{/ifndef}

## {heading(Установка)[id=k8s-helm-install]}

1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключаться к кластеру с помощью `kubectl` с хоста, на который планируется установить клиент Helm.
1. Установите клиент Helm на хост любым из способов, описанных в [официальной документации Helm](https://helm.sh/docs/intro/install/).

   Выберите наиболее актуальную версию Helm, совместимую с кластером, в котором вы планируете использовать клиент. Таблица совместимости версий Helm и Kubernetes приведена в [официальной документации Helm](https://helm.sh/docs/topics/version_skew/#supported-version-skew).

1. При необходимости добавьте путь до исполняемого файла Helm в переменную окружения `PATH`, если этого не было сделано во время установки.

1. Убедитесь, что установлена нужная версия Helm, выполнив команду:

   ```console
   helm version
   ```

{ifdef(public)}
## {heading(Проверка работоспособности)[id=k8s-helm-check]}

1. Установите NGINX из репозитория Bitnami:

   {tabs}
   
   {tab(Windows (PowerShell))}

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami; `
   helm repo update; `
   helm install demo-helm-nginx bitnami/nginx
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   helm install demo-helm-nginx bitnami/nginx

   ```

   {/tab}

   {/tabs}

1. Проверьте работоспособность пода NGINX, выполнив команду:

   ```console
   kubectl get pods
   ```

   В выводе команды должен быть под `demo-helm-nginx-...` в статусе `Running`.

   Пример вывода:

   ```text
   NAME                               READY   STATUS    RESTARTS   AGE
   demo-helm-nginx-...                1/1     Running   0          ...
   ```

1. Удалите установленный с помощью Helm NGINX и отключите репозиторий Bitnami:

   {tabs}

   {tab(Windows (PowerShell))}

   ```console
   helm uninstall demo-helm-nginx; `
   helm repo remove bitnami
   ```

   {/tab}

   {tab(Linux (bash)/macOS (zsh))}

   ```console
   helm uninstall demo-helm-nginx
   helm repo remove bitnami

   ```

   {/tab}

   {/tabs}
{/ifdef}

## {heading(Удаление)[id=k8s-helm-delete]}

1. Удалите исполняемый файл клиента Helm.

1. При необходимости удалите записи, связанные с Helm, из переменной среды окружения `PATH`.

1. При необходимости удалите директории и файлы, созданные Helm:

   - Директория с кешем: соответствует переменной окружения `$XDG_CACHE_HOME`.
   - Директория с файлами конфигурации: соответствует переменной окружения `$XDG_CONFIG_HOME`.
   - Директория с данными: соответствует переменной окружения `$XDG_DATA_HOME`.

   Директории, соответствующие этим переменным для различных операционных систем, приведены в [официальной документации Helm](https://helm.sh/docs/faq/uninstalling/).