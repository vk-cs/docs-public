С помощью [Gatekeeper](../../../reference/gatekeeper) можно задать ограничение, которое будет требовать использования только разрешенных репозиториев для загрузки образов. Например, это ограничение может быть полезно, если политики компании требуют загружать образы только из доверенных репозиториев, чтобы операторы кластера случайно не запустили недоверенное приложение из непроверенного источника.

Для демонстрации работы Gatekeeper будут созданы:

- Шаблон ограничений и соответствующее ему ограничение. Оно будет разрешать загрузку образов только из репозитория Docker Hub.
- Несколько ресурсов Kubernetes для проверки работы ограничения.

<info>

В кластерах Kubernetes VK Cloud версий 1.23 и выше можно [создать](../../../service-management/manage-security#dobavlenie_politiki_bezopasnosti) нужную [политику безопасности](../../../concepts/security-policies#razreshennye_repozitorii_bb3393ca) через личный кабинет.

В этом случае работать с ресурсами Gatekeeper напрямую не обязательно.

</info>

## Подготовительные шаги

1. [Создайте](../../../service-management/create-cluster) кластер Kubernetes самой актуальной версии.

   Параметры кластера выберите на свое усмотрение.

1. [Убедитесь](../../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Убедитесь, что [синхронизация политик безопасности](../../../concepts/security-policies#rabota_s_politikami_bezopasnosti_cherez_lichnyy_kabinet) с кластером [выключена](../../../service-management/manage-security#upravlenie_sinhronizaciey_politik_bezopasnosti_s_klasterom).

   В противном случае созданные ограничения и шаблоны будут удалены при очередной синхронизации политик.

## Создайте ограничение, проверяющее репозитории

1. Создайте шаблон ограничения:

   1. Создайте манифест шаблона ограничения.

      Воспользуйтесь [содержимым этого файла](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/allowedrepos/template.yaml). Это уже готовый шаблон `K8sAllowedRepos` из [библиотеки Gatekeeper](https://github.com/open-policy-agent/gatekeeper-library), который проверяет, что образы загружаются только из доверенных репозиториев.

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
      kind: K8sAllowedRepos
      metadata:
        name: require-docker-hub
      spec:
        match:
          kinds:
            - apiGroups: [""]
              kinds: ["Pod"]
          namespaces:
            - "default"
        parameters:
          repos:
            - "docker.io/"
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
   NAME                                                          ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub  ...                ...

   NAME                                                          AGE
   constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos    ...
   ```

1. Проверьте работу ограничения, попробовав создать несколько подов:

   <tabs>
   <tablist>
   <tab>Под, удовлетворяющий ограничению</tab>
   <tab>Под, не удовлетворяющий ограничению</tab>
   </tablist>
   <tabpanel>

   1. Создайте манифест для пода:

      <details>
      <summary markdown="span">example-allowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: allowed-pod
      spec:
        containers:
          - name: nginx
            image: docker.io/jitesoft/nginx:latest
      ```

   1. Попытайтесь создать под на основе манифеста:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      Операция должна завершиться успешно.

   1. Убедитесь, что под успешно создан, выполнив команду:

      ```yaml
      kubectl get pod allowed-pod
      ```

      Должна быть выведена похожая информация:

      ```text
      NAME          READY   STATUS    RESTARTS   AGE
      allowed-pod   1/1     Running   ...        ...
      ```

   </tabpanel>
   <tabpanel>

   1. Создайте манифест для пода:

      <details>
      <summary markdown="span">example-disallowed.yaml</summary>

      ```yaml
      apiVersion: v1
      kind: Pod
      metadata:
        name: disallowed-pod
      spec:
        containers:
          - name: nginx
            image: quay.io/jitesoft/nginx:latest
      ```

   1. Попытайтесь создать под на основе манифеста:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      Операция должна завершиться с ошибкой:

      ```text
      Error from server (Forbidden): error when creating "example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-docker-hub] container <nginx> has an invalid image repo <quay.io/jitesoft/nginx:latest>, allowed repos are ["docker.io/"]
      ```

   1. Убедитесь, что под не был создан, выполнив команду:

      ```yaml
      kubectl get pod disallowed-pod
      ```

      Должна быть выведена похожая информация:

      ```text
      Error from server (NotFound): pods "disallowed-pod" not found
      ```

   </tabpanel>
   </tabs>

## Удалите неиспользуемые ресурсы

1. Если созданные ресурсы Kubernetes вам больше не нужны, удалите их.

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl delete pod allowed-pod
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl delete pod allowed-pod; `
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos
   ```

   </tabpanel>
   </tabs>

1. Работающий кластер потребляет вычислительные ресурсы. Если он вам больше не нужен:

   - [остановите](../../../service-management/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
   - [удалите](../../../service-management/manage-cluster#udalit_klaster) его навсегда.
