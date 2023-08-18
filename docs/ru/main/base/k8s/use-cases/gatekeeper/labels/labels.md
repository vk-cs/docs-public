С помощью [Gatekeeper](../../../k8s-reference/gatekeeper) можно задать ограничение, которое будет требовать наличие определенной метки у создаваемых ресурсов Kubernetes. Например, это ограничение может быть полезно, если политики компании требуют указывать имя создателя любых ресурсов Kubernetes, чтобы облегчить аудит и разбор потенциальных инцидентов.

Для демонстрации работы Gatekeeper будут созданы:

- Шаблон ограничений и соответствующее ему ограничение. Оно будет требовать наличия метки (label) `creator-name` в ресурсах Kubernetes, которые создаются в любых пространствах имен (кроме системных)
- Несколько ресурсов Kubernetes для проверки работы ограничения.

## Подготовительные шаги

1. [Создайте](../../../operations/create-cluster) кластер Kubernetes самой актуальной версии.

   Параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

## Создайте ограничение, проверяющее метки

1. Создайте шаблон ограничения:

   1. Создайте манифест шаблона ограничения.

      Воспользуйтесь [содержимым этого файла](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/requiredlabels/template.yaml). Это уже готовый шаблон `K8sRequiredLabels` из [библиотеки Gatekeeper](https://github.com/open-policy-agent/gatekeeper-library), который проверяет наличие указанных меток у ресурса Kubernetes.

   1. Создайте шаблон ограничения на основе манифеста шаблона:

      ```yaml
      kubectl apply -f template.yaml
      ```

1. Создайте ограничение:

   1. Создайте манифест ограничения на основе шаблона, созданного ранее:

      <details>
      <summary markdown="span">constraint.yaml</summary>

      ```yaml
      apiVersion: constraints.gatekeeper.sh/v1beta1
      kind: K8sRequiredLabels
      metadata:
        name: require-creator-label
      spec:
        match:
          kinds:
            - apiGroups: [""]
              kinds: ["Namespace"]
          excludedNamespaces: ["kube-system"]
        parameters:
          labels:
            - key: creator-name
              allowedRegex: "(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?"
      ```

      </details>

   1. Создайте ограничение на основе манифеста ограничения:

      ```yaml
      kubectl apply -f constraint.yaml
      ```

1. Убедитесь, что шаблон ограничения и ограничение успешно созданы, выполнив команду:

   ```yaml
   kubectl get constraints,constrainttemplates
   ```

   Должна быть выведена похожая информация:

   ```text
   NAME                                                              ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label ...                ... 

   NAME                                                              AGE
   ...
   constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels      ...
   ```

1. Проверьте работу ограничения, попробовав создать несколько пространств имен (namespaces):

   <tabs>
   <tablist>
   <tab>Пространство, удовлетворяющее ограничению</tab>
   <tab>Пространство, не удовлетворяющее ограничению</tab>
   </tablist>
   <tabpanel>

   1. Создайте манифест пространства имен:

      <details>
      <summary markdown="span">example-allowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: allowed-namespace
        labels:
          creator-name: john.doe
      ```

   1. Попытайтесь создать пространство имен на основе манифеста:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      Операция должна завершиться успешно.

   1. Убедитесь, что пространство имен успешно создано, выполнив команду:

      ```yaml
      kubectl get ns allowed-namespace
      ```

      Должна быть выведена похожая информация:

      ```text
      NAME                STATUS   AGE
      allowed-namespace   Active   ...
      ```

   </tabpanel>
   <tabpanel>

   1. Создайте манифест пространства имен:

      <details>
      <summary markdown="span">example-disallowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Namespace
      metadata:
        name: disallowed-namespace
        labels:
          my-label: sample
      ```

   1. Попытайтесь создать пространство имен на основе манифеста:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      Операция должна завершиться с ошибкой:

      ```text
      Error from server (Forbidden): error when creating ".\\example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-creator-label] you must provide labels: {"creator-name"}
      ```

   1. Убедитесь, что пространство имен не было создано, выполнив команду:

      ```yaml
      kubectl get ns disallowed-namespace
      ```

      Должна быть выведена похожая информация:

      ```text
      Error from server (NotFound): namespaces "disallowed-namespace" not found
      ```

   </tabpanel>
   </tabs>

## Проконтролируйте использование ресурсов

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete ns allowed-namespace
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete ns allowed-namespace; `
   kubectl delete k8srequiredlabels.constraints.gatekeeper.sh/require-creator-label; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8srequiredlabels
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../operations/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../operations/manage-cluster#udalit_klaster) его навсегда.
