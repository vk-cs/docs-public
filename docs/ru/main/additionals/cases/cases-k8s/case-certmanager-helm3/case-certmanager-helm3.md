С помощью инструмента [cert-manager](https://cert-manager.io/) можно управлять сертификатами в кластерах Kubernetes:

- Выпускать сертификаты (в том числе самоподписанные, self-signed) путем отправки запросов к источникам, которые выступают в роли Certificate Authority (CA).

  Примеры источников:

  - провайдеры решений по кибербезопасности, такие как [Venafi](https://www.venafi.com/);
  - провайдеры сертификатов, такие как [Let’s Encrypt](https://letsencrypt.org/);
  - хранилища секретов, такие как [HashiCorp Vault](https://www.vaultproject.io/);
  - локальные контейнеры, содержащие внутри себя публичную часть сертификата и приватный ключ.

- Автоматически перевыпускать сертификаты с истекающим сроком действия.

Выпущенный с помощью `cert-manager` сертификат будет доступен другим ресурсам Kubernetes. Например, его можно использовать для Ingress.

Далее будет показано, как с помощью [Helm 3](https://helm.sh/) выполняются установка и обновление `cert-manager` в кластерах Kubernetes. Также будет выпущен самоподписанный сертификат для проверки работоспособности `cert-manager`.

## Подготовительные шаги

1. Если у вас еще нет кластера Kubernetes, создайте его.

   <info>

   Для экономии времени вы можете за несколько минут [создать кластер Kubernetes](../../../../base/k8s/operations/create-cluster) в VK Cloud.

   </info>

1. Определите версию кластера.

1. На хосте, с которого планируется подключаться к кластеру, [установите](https://kubernetes.io/docs/tasks/tools/#kubectl) `kubectl`, если утилита еще не установлена.

   Выберите для установки версию `kubectl`, которая [совместима](https://kubernetes.io/releases/version-skew-policy/#kubectl) с кластером.

1. Убедитесь, что вы можете подключиться к кластеру с помощью `kubectl`.

1. На хосте, с которого планируется подключаться к кластеру, [установите](https://helm.sh/docs/intro/install/) Helm версии 3.0.0 или выше, если утилита еще не установлена.

   Выберите для установки версию Helm, которая [совместима](https://helm.sh/docs/topics/version_skew/) с кластером.

## 1. Добавьте репозиторий и выберите версию для установки

1. Добавьте репозиторий `cert-manager`:

   ```bash
   helm repo add jetstack https://charts.jetstack.io
   ```

1. Обновите кеш чартов (charts):

   ```bash
   helm repo update
   ```

1. Получите список доступных чартов `cert-manager` и их версий:

   ```bash
   helm search repo jetstack -l
   ```

1. Выберите версию `cert-manager`, которую нужно установить в кластер.

   Таблица совместимости версий `cert-manager` и Kubernetes [приведена в официальной документации cert-manager](https://cert-manager.io/docs/installation/supported-releases/).

   <info>

   Далее будет устанавливаться `cert-manager` версии `1.11.3`, чтобы дополнительно продемонстрировать [обновление](#5_obnovite_cert_manager) до версии `1.12.3`.

   Вы можете выбрать любую подходящую вам версию. Скорректируйте приведенные ниже команды, чтобы они соответствовали выбранной версии.

   </info>

## 2. Установите cert-manager

1. Установите Custom Resource Definitions (CRDs), необходимые для работы `cert-manager`.

   Установка CRDs будет выполнена вручную с помощью `kubectl`. [Рекомендуется](https://cert-manager.io/docs/installation/helm/#crd-considerations) использовать этот метод, поскольку он наиболее безопасный.

   Выполните команду:

   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.3/cert-manager.crds.yaml
   ```

1. Установите выбранную версию `cert-manager`.

   Эта команда установит релиз с именем `cert-manager` указанной версии в пространство имен (namespace) `cert-manager`. Если такого пространства в кластере не существует, то оно будет создано автоматически.

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   helm install cert-manager jetstack/cert-manager \
     --version v1.11.3 \
     --namespace cert-manager \
     --create-namespace
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   helm install cert-manager jetstack/cert-manager `
     --version v1.11.3 `
     --namespace cert-manager `
     --create-namespace
   ```

   </tabpanel>
   </tabs>

   При успешном завершении установки в сообщении от Helm будет выведено:

   - `STATUS`: `deployed`;
   - `NOTES`: `cert-manager v1.11.3 has been deployed successfully!`.

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:06:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   cert-manager v1.11.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   </details>

## 3. Проверьте работоспособность cert-manager

1. Проверьте, что в пространстве имен `cert-manager` были успешно созданы необходимые поды, и что они находятся в состоянии `Running`:

   ```bash
   kubectl get pods -n cert-manager
   ```

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   NAME                                       READY   STATUS    RESTARTS   AGE
   cert-manager-...                           1/1     Running   0          3m20s
   cert-manager-cainjector-...                1/1     Running   0          3m20s
   cert-manager-webhook-...                   1/1     Running   0          3m20s
   ```

   </details>

1. В тестовых целях выпустите самоподписанный сертификат:

   1. Создайте файл манифеста:

      <details>
      <summary>cert-manager-test-resources.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: cert-manager-test
      ---
      apiVersion: cert-manager.io/v1
      kind: Issuer
      metadata:
        name: test-selfsigned
        namespace: cert-manager-test
      spec:
        selfSigned: {}
      ---
      apiVersion: cert-manager.io/v1
      kind: Certificate
      metadata:
        name: selfsigned-cert
        namespace: cert-manager-test
      spec:
        dnsNames:
          - example.com
        secretName: selfsigned-cert-tls
        issuerRef:
          name: test-selfsigned
      ```

      </details>

      В этом манифесте описаны:

      - пространство имен `cert-manager-test`, в которое будут помещены ресурсы `Issuer` и `Certificate`;
      - ресурс `Issuer`, который отвечает за выпуск самоподписанных сертификатов;
      - ресурс `Certificate` с параметрами самоподписанного сертификата.

   1. Примените файл манифеста.

      ```bash
      kubectl apply -f cert-manager-test-resources.yaml
      ```

      Будут созданы описанные в манифесте ресурсы. Также `cert-manager` автоматически создаст другие необходимые ресурсы.

   1. Проверьте, что были созданы все необходимые ресурсы:

      ```bash
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges,secrets -n cert-manager-test
      ```

      В выводе должны присутствовать:
      - `Issuer` и `Certificate`, конфигурация которых описана в манифесте, в статусе `READY: True`;
      - `CertificateRequest` в статусе `READY: True`;
      - `Secret`, содержащий в себе данные сертификата.

      <details>
      <summary>Пример вывода команды</summary>

      ```text
      NAME                                     READY   AGE
      issuer.cert-manager.io/test-selfsigned   True    39m
      
      NAME                                          READY   SECRET                AGE
      certificate.cert-manager.io/selfsigned-cert   True    selfsigned-cert-tls   39m
      
      NAME                                                       APPROVED   DENIED   READY   ISSUER            REQUESTOR                                         AGE
      certificaterequest.cert-manager.io/selfsigned-cert-...     True                True    test-selfsigned   system:serviceaccount:cert-manager:cert-manager   39m
      
      NAME                         TYPE                DATA   AGE
      secret/selfsigned-cert-tls   kubernetes.io/tls   3      39m
      ```
      </details>

   1. Проверьте статус сертификата:

      ```bash
      kubectl describe certificate selfsigned-cert -n cert-manager-test
      ```

      В случае успешного выпуска сертификата:

      - Информация о статусе (`Status`) будет содержать строку `Certificate is up to date and has not expired`.
      - В списке событий (`Events`) будет событие c сообщением `The certificate has been successfully issued`.

      <details>
      <summary>Пример части вывода команды</summary>

      ```text
      ...

      Status:
        Conditions:
          Last Transition Time:  2023-08-17T08:11:27Z
          Message:               Certificate is up to date and has not expired
          Observed Generation:   1
          Reason:                Ready
          Status:                True
          Type:                  Ready
        Not After:               2023-11-15T08:11:27Z
        Not Before:              2023-08-17T08:11:27Z
        Renewal Time:            2023-10-16T08:11:27Z
        Revision:                1
      Events:
        Type    Reason     Age    From                                       Message
        ----    ------     ----   ----                                       -------
        Normal  Issuing    3m16s  cert-manager-certificates-trigger          Issuing certificate as Secret does not exist
        Normal  Generated  3m16s  cert-manager-certificates-key-manager      Stored new private key in temporary Secret resource "selfsigned-cert-..."
        Normal  Requested  3m16s  cert-manager-certificates-request-manager  Created new CertificateRequest resource "selfsigned-cert-..."
        Normal  Issuing    3m16s  cert-manager-certificates-issuing          The certificate has been successfully issued
      ```

      </details>

   Если сертификат был выпущен успешно, то `cert-manager` корректно установлен и работает.

## 4. (Опционально) Создайте резервную копию ресурсов cert-manager

<info>

Создание резервной копии [рекомендовано](https://cert-manager.io/docs/tutorials/backup) в целях безопасности перед [обновлением](#5_obnovite_cert_manager) `cert-manager`.

</info>

Будет создана резервная копия ресурсов `Issuer`, `ClusterIssuer` и `Certificate`. В нее не входят:

- Ресурсы `CertificateRequests`. [Не рекомендуется](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration) включать такие ресурсы в резервную копию, поскольку это может усложнить восстановление из резервной копии.

- Секреты, которые непосредственно хранят в себе данные сертификатов и в том числе содержат приватный ключ.

  <warn>

  Если при восстановлении из резервной копии для ресурса `Cerificate` не будет найдено соответствующего секрета, то [сертификат будет перевыпущен](https://cert-manager.io/docs/tutorials/backup/#backing-up-cert-manager-resource-configuration).

  </warn>

Чтобы создать резервную копию, выполните команду:

<tabs>
<tablist>
<tab>Linux (bash) / macOS (zsh)</tab>
<tab>Windows (PowerShell)</tab>
</tablist>
<tabpanel>

```bash
kubectl get -o yaml \
  --all-namespaces \
  issuer,clusterissuer,certificate \
> cert-manager-backup.yaml
```

</tabpanel>
<tabpanel>

```powershell
kubectl get -o yaml `
  --all-namespaces `
  issuer,clusterissuer,certificate `
> cert-manager-backup.yaml
```

</tabpanel>
</tabs>

О продвинутом резервном копировании и восстановлении из резервной копии читайте в [официальной документации cert-manager](https://cert-manager.io/docs/tutorials/backup).

## 5. Обновите cert-manager

1. Посмотрите версию установленного релиза `cert-manager`:

   ```bash
   helm list --namespace cert-manager
   ```

1. Обновите кеш чартов:

   ```bash
   helm repo update
   ```

1. Получите список доступных чартов `cert-manager` и их версий:

   ```bash
   helm search repo jetstack -l
   ```

1. Изучите официальную документацию `cert-manager`, [посвященную обновлению](https://cert-manager.io/docs/installation/upgrading/). Она содержит рекомендации по обновлению, список критичных изменений (breaking changes) и другую полезную информацию.

   В частности [рекомендуется](https://cert-manager.io/docs/installation/upgrading/) обновляться на одну минорную версию за раз (например, 1.**11**.3 → 1.**12**.3).

1. Выберите версию, на которую нужно обновиться.

   Таблица совместимости версий `cert-manager` и Kubernetes [приведена в официальной документации cert-manager](https://cert-manager.io/docs/installation/supported-releases/).

   <info>

   Далее будет выполнено обновление с версии `1.11.3` на версию `1.12.3`.

   Если ранее была установлена другая версия `cert-manager`, выберите нужную версию для обновления с учетом рекомендаций выше.

   </info>

1. Обновите установленные в кластере CRDs.

   Поскольку ранее эти CRDs были [установлены вручную](#2_ustanovite_cert_manager), обновите их также вручную перед обновлением самого `cert-manager`.

   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
   ```

1. Обновите релиз `cert-manager` до выбранной версии:

   <tabs>
   <tablist>
   <tab>Linux (bash) / macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   helm upgrade cert-manager jetstack/cert-manager \
     --version v1.12.3 \
     --namespace cert-manager
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   helm upgrade cert-manager jetstack/cert-manager `
     --version v1.12.3 `
     --namespace cert-manager
   ```

   </tabpanel>
   </tabs>

   При успешном завершении обновления в сообщении от Helm будет выведено:
   - `Release "cert-manager" has been upgraded. Happy Helming!`;
   - `STATUS`: `deployed`;
   - `NOTES`: `cert-manager v1.12.3 has been deployed successfully!`.

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   Release "cert-manager" has been upgraded. Happy Helming!
   NAME: cert-manager
   LAST DEPLOYED: Thu Aug 17 15:17:35 2023
   NAMESPACE: cert-manager
   STATUS: deployed
   REVISION: 2
   TEST SUITE: None
   NOTES:
   cert-manager v1.12.3 has been deployed successfully!
   
   In order to begin issuing certificates, you will need to set up a ClusterIssuer
   or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).
   
   More information on the different types of issuers and how to configure them
   can be found in our documentation:
   
   https://cert-manager.io/docs/configuration/
   
   For information on how to configure cert-manager to automatically provision
   Certificates for Ingress resources, take a look at the `ingress-shim`
   documentation:
   
   https://cert-manager.io/docs/usage/ingress/
   ```

   </details>

## Удалите неиспользуемые ресурсы

1. Если ресурсы Kubernetes, [созданные для проверки работоспособности](#3_proverte_rabotosposobnost_cert_manager) `cert-manager`, были созданы в тестовых целях и больше вам не нужны, удалите их:

   ```bash
   kubectl delete -f cert-manager-test-resources.yaml
   ```

   <warn>

   Будет удалено пространство имен `cert-manager-test` со всем содержимым, включая дополнительные ресурсы, автоматически созданные `cert-manager`.

   </warn>

1. Если `cert-manager` был [установлен](#2_ustanovite_cert_manager) в тестовых целях и больше вам не нужен, удалите все связанные с ним ресурсы:

   1. Убедитесь, что в кластере больше нет ресурсов, созданных `cert-manager`:

      ```bash
      kubectl get issuers,clusterissuers,certificates,certificaterequests,orders,challenges --all-namespaces
      ```

      Если такие ресурсы есть — удалите их.

   1. Удалите релиз `cert-manager`:

      ```bash
      helm delete cert-manager --namespace cert-manager
      ```

   1. Удалите пространство имен `cert-manager`:

      ```bash
      kubectl delete ns cert-manager
      ```

   1. Удалите установленные в кластер CRDs для `cert-manager`:

      ```bash
      kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.3/cert-manager.crds.yaml
      ```
