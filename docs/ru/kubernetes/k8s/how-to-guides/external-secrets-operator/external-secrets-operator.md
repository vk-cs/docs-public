# {heading(Использование External Secrets Operator)[id=k8s-external-secrets-operator]}

Используйте аддон {linkto(../../concepts/addons-and-settings/addons#k8s-addons-eso)[text=External Secrets Operator]}, чтобы настроить синхронизацию с секретами Kubernetes, которые хранятся в {linkto(../../../../security/secret-manager/concepts/about#sm-about)[text=менеджере секретов {var(cloud)}]}.

{note:info}
External Secrets Operator доступен только для кластеров {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=второго поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-eso-prepare]}

1. {linkto(../../instructions/create-cluster/create-webui-gen-2#k8s-create-webui-gen-2)[text=Создайте]} кластер актуальной версии, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Установите и настройте]} `kubectl`, если это еще не сделано.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Подключитесь]} к кластеру при помощи `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-eso#k8s-install-advanced-eso)[text=Установите аддон External Secrets Operator]}, если это еще не сделано.
1. {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=Включите доступ по API]}, если это еще не сделано.

## {heading({counter(eso)}. Создайте секрет в менеджере секретов)[id=k8s-eso-kms]}

{linkto(../../../../security/secret-manager/instructions/manage-secret#sm-manage-create)[text=Создайте]} секрет с идентификатором `external-secret` в менеджере секретов {var(cloud)} и добавьте в него произвольные ключи.

## {heading({counter(eso)}. Создайте секрет Kubernetes)[id=k8s-eso-create]}

1. Создайте пространство имен `external-secrets-operator`, если это еще не сделано:

   ```console
   kubectl create namespace external-secrets-operator
   ```
   
1. Создайте манифест `password.yaml`, который будет хранить пароль для доступа к менеджеру секретов {var(cloud)}:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: password
     namespace: external-secrets-operator
   type: Opaque
   data:
     password: <ПАРОЛЬ_ОТ_ЛК>
   ```
   
   Здесь `<ПАРОЛЬ_ОТ_ЛК>` — пароль от вашего личного кабинета {var(cloud)} в кодировке base64. 

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f password.yaml
   ```

## {heading({counter(eso)}. Создайте SecretStore)[id=k8s-eso-store]}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API** и скопируйте следующие значения:

   - **Project ID**;
   - **User Domain Name**;
   - **Username**.

1. Создайте манифест `secretstore.yaml` — объект типа `SecretStore`, который описывает, как подключиться к менеджеру секретов {var(cloud)}:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: SecretStore
   metadata:
     name: secret-store
     namespace: external-secrets-operator
   spec:
     provider:
       vk:
         projectID: <PROJECT_ID>
         url: <AUTH_URL>
         auth:
           domain: <USER_DOMAIN_NAME>
           username: <USERNAME>
           password:
             key: password
             name: password
      ```

   Здесь:

   - `<PROJECT_ID>`, `<USER_DOMAIN_NAME>` и `<USERNAME>` — значения, которые вы скопировали из настроек проекта. 
   - `<AUTH_URL>` — адрес в зависимости от региона:
      - `https://msk.cloud.vk.com` для региона Москва;
      - `https://kz.cloud.vk.com` для региона Казахстан.

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f secretstore.yaml
   ```

## {heading({counter(eso)}. Создайте ExternalSecret)[id=k8s-eso-external]}
   
1. Создайте манифест `externalsecret.yaml` — объект типа `ExternalSecret`, который описывает, из какого `SecretStore` загружать секрет и как его обновлять:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret
       creationPolicy: Owner
     data:
       - secretKey: <ИМЯ_КЛЮЧА_В_СЕКРЕТЕ>
         remoteRef:
           key: <ID_СЕКРЕТА>
           property: <КЛЮЧ_СЕКРЕТА>
   ```   
   
   Здесь:

   - `<ИМЯ_КЛЮЧА_В_СЕКРЕТЕ>` — имя ключа в создаваемом секрете Kubernetes. Пример: `password`.
   - `<ID_СЕКРЕТА>` — идентификатор секрета, который вы [создали](#k8s-eso-kms) ранее в менеджере секретов {var(cloud)}.
   - `<КЛЮЧ_СЕКРЕТА>` — ключ в секрете в менеджере секретов {var(cloud)}, значение которого необходимо синхронизировать с секретом Kubernetes. 
   
   Например, в менеджере секретов {var(cloud)} с идентификатором `external-secret` хранятся такие пары значений: `key1: value1`, `key2: value2`, `key3: value3`. Если вы хотите, чтобы в секрете Kubernetes обновлялось значение `value2`, в поле `property` укажите `key2`: 

   ```yaml
   key: external-secret
   property: key2
   ```

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f externalsecret.yaml
   ```

В Kubernetes будет создан новый объект типа `Secret` с именем `external-secret`. Аддон будет каждые пять минут проверять значение указанного поля в секрете в менеджере секретов {var(cloud)}. Если значение изменится, аддон автоматически обновит его в секрете Kubernetes. 

## {heading({counter(eso)}. Создайте ExternalSecret для синхронизации всех ключей секрета)[id=k8s-eso-secrets-all]}

1. Создайте манифест `externalsecretall.yaml`. С его помощью вы сможете синхронизовать все пары значений из секрета, который вы создали в менеджере секретов {var(cloud)}.

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: external-secret-all
     namespace: external-secrets-operator
   spec:
     refreshInterval: 5m
     secretStoreRef:
       name: secret-store
       kind: SecretStore
     target:
       name: external-secret-all
       creationPolicy: Owner
     dataFrom:
       - extract:
           key: <ID_СЕКРЕТА>
   ```
   
1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f externalsecretall.yaml
   ```

В Kubernetes будет создан новый объект типа `Secret` с именем `external-secret-all`. Аддон будет каждые пять минут проверять значение всех ключей секрета в менеджере секретов {var(cloud)}. Если их значения изменятся, аддон автоматически обновит их в секрете Kubernetes.

## {heading({counter(eso)}. Проверьте работу аддона)[id=k8s-eso-check]}

1. Убедитесь, что External Secrets Operator синхронизировал секреты, выполнив команду:

   ```console
   kubectl -n external-secrets-operator get secret
   ```
   
   В выводе команды должны быть ранее созданные секреты с именами `external-secret` и `external-secret-all`:
   
   ```text
   NAME                       TYPE     DATA    AGE
   external-secret            Opaque   1       ...
   external-secret-all        Opaque   2       ...
   external-secrets-webhook   Opaque   4       ...
   password                   Opaque   1       ...
   ```
 
1. Просмотрите содержимое секретов:

   ```console
   kubectl -n external-secrets-operator get secret external-secret -o yaml
   kubectl -n external-secrets-operator get secret external-secret-all -o yaml
   ``` 

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-eso-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы аддона External Secrets Operator, вам больше не нужны, удалите их:

1. Удалите пространство имен `external-secrets-operator` и связанные с ним ресурсы:

   ```console
   kubectl delete namespace external-secrets-operator
   ```

{include(/ru/_includes/_delete-test-cluster-short.md)}
