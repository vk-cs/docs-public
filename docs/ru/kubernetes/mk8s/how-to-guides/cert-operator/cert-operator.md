# {heading(Использование cert-operator)[id=mk8s-cert-operator]}

Используйте аддон {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=cert-operator]}, чтобы загружать образы из реестров контейнеров с самоподписанными сертификатами. Аддон самостоятельно обеспечивает доверие к реестру.

## {heading(Подготовительные шаги)[id=mk8s-cert-operator-prepare]}

{include(/ru/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../connect/kubectl#mk8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.
1. {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=Установите аддон cert-operator]}, если это еще не сделано.
1. Подготовьте CA-сертификат реестра в формате PEM. Если нужна цепочка, объедините несколько сертификатов подряд.

   Аддон работает только с CA-сертификатами и их цепочками. Клиентские сертификаты, приватные ключи и взаимная аутентификация TLS (mutual TLS, mTLS) не используются.

## {heading({counter(cert-operator)}. Создайте объект RegistryCertificate)[id=mk8s-cert-operator-create]}

1. Создайте манифест `registry-certificate.yaml` — объект типа `RegistryCertificate`, который описывает CA-сертификат реестра:

   ```yaml
   apiVersion: crio.registry/v1alpha1
   kind: RegistryCertificate
   metadata:
     name: <ИМЯ_ОБЪЕКТА>
   spec:
     host: <АДРЕС_РЕЕСТРА>
     certificate: |
       -----BEGIN CERTIFICATE-----
       <СОДЕРЖИМОЕ_СЕРТИФИКАТА>
       -----END CERTIFICATE-----
   ```

   Здесь:

   - `<ИМЯ_ОБЪЕКТА>` — любое уникальное имя. Объект относится ко всему кластеру, пространство имен не указывается.
   - `<АДРЕС_РЕЕСТРА>` — адрес реестра в формате `host[:port]`, например `registry.example.com:5000`.

      Если для одного адреса реестра создано несколько объектов, применяется первый по алфавиту. Если адрес реестра в объекте указан некорректно, объект не применяется.

   - `<СОДЕРЖИМОЕ_СЕРТИФИКАТА>` — содержимое CA-сертификата.

      Если сертификат в объекте некорректен, он не применяется. Если для этого реестра ранее был применен CA-сертификат, он остается без изменений.

1. Примените созданный манифест в кластере:

   ```console
   kubectl apply -f registry-certificate.yaml
   ```

   Аддон перенесет CA-сертификат на все worker-узлы. По умолчанию это занимает не более 30 секунд. Если позднее изменить CA-сертификат в объекте, аддон заменит прежний сертификат на узлах новым.

## {heading({counter(cert-operator)}. Проверьте работу аддона)[id=mk8s-cert-operator-check]}

Убедитесь, что аддон применил CA-сертификат, выполнив команду:

```console
kubectl describe regcert <ИМЯ_ОБЪЕКТА>
```

Состояние применения CA-сертификата для каждого worker-узла указано в поле `State`:

- `Synced` — CA-сертификат применен.
- `Failed` — CA-сертификат не применен. Причина указана в поле `Message`.

Подробнее об особенностях и ограничениях применения CA-сертификатов с помощью `cert-operator` в разделе {linkto(../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=Аддоны]}.

## {heading(Удалите неиспользуемые ресурсы)[id=mk8s-cert-operator-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы аддона cert-operator, вам больше не нужны, удалите их:

1. Удалите объект `RegistryCertificate`:

   ```console
   kubectl delete regcert <ИМЯ_ОБЪЕКТА>
   ```

   Аддон удалит CA-сертификат с worker-узлов. В результате CA-сертификат перестанет применяться, а реестр перестанет быть доверенным.

1. (Опционально) {linkto(../../instructions/addons/manage-addons#mk8s-manage-addons-delete)[text=Удалите аддон]}.
   
   CA-сертификаты, уже записанные на узлы, останутся, но синхронизация объектов `RegistryCertificate` прекратится. Чтобы возобновить синхронизацию, необходимо будет {linkto(../../instructions/addons/advanced-installation/install-advanced-cert-operator#mk8s-install-advanced-cert-operator)[text=установить]} аддон повторно.

{include(/ru/_includes/_delete-test-cluster-short.md)}
