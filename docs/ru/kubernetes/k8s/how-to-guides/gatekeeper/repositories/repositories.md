# {heading(Настройка разрешенных репозиториев)[id=k8s-repositories]}

С помощью {linkto(../../../reference/gatekeeper#k8s-gatekeeper)[text=Gatekeeper]} можно задать ограничение, которое будет требовать использования только разрешенных репозиториев для загрузки образов. Например, это ограничение может быть полезно, если политики компании требуют загружать образы только из доверенных репозиториев, чтобы операторы кластера случайно не запустили недоверенное приложение из непроверенного источника.

Для демонстрации работы Gatekeeper будут созданы:

* Шаблон ограничений и соответствующее ему ограничение. Оно будет разрешать загрузку образов только из репозитория Docker Hub.
* Несколько ресурсов Kubernetes для проверки работы ограничения.

{note:info}
В кластерах Kubernetes {var(cloud)} версий 1.23 и выше можно {linkto(../../../instructions/manage-security#k8s-manage-security-add-policy)[text=создать]} нужную {linkto(../../../concepts/security-policies#k8s-security-policies-allowed-repos)[text=политику безопасности]} через личный кабинет.

В этом случае работать с ресурсами Gatekeeper напрямую не обязательно.
{/note}

## {heading(Подготовительные шаги)[id=k8s-repositories-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}

   Параметры кластера выберите на свое усмотрение.

1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

## {heading(Создайте ограничение, проверяющее репозитории)[id=k8s-repositories-create-constraint]}

1. Создайте шаблон ограничения:

   1. Создайте манифест шаблона ограничения.

      Воспользуйтесь [содержимым этого файла](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/allowedrepos/template.yaml). Это уже готовый шаблон `K8sAllowedRepos` из [библиотеки Gatekeeper](https://github.com/open-policy-agent/gatekeeper-library), который проверяет, что образы загружаются только из доверенных репозиториев.

   1. Создайте шаблон ограничения на основе манифеста шаблона:

      ```yaml
      kubectl apply -f template.yaml
      ```

1. Создайте ограничение:

   1. Создайте манифест ограничения на основе шаблона, созданного ранее:

      {cut(constraint.yaml)}

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

      {/cut}

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

   {tabs}

   {tab(Под, удовлетворяющий ограничению)}

   1. Создайте манифест для пода:

      {cut(example-allowed.yaml)}

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

      {/cut}

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

   {/tab}

   {tab(Под, не удовлетворяющий ограничению)}

   1. Создайте манифест для пода:

      {cut(example-disallowed.yaml)}

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

      {/cut}

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

   {/tab}

   {/tabs}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-repositories-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если ресурсы Kubernetes, созданные для проверки работы ограничения, вам больше не нужны, удалите их:

1. Удалите созданный под `allowed-pod`, шаблон ограничения и само ограничение:

   {tabs}

   {tab(Linux/macOS)}

   ```console
   kubectl delete pod allowed-pod
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos

   ```

   {/tab}

   {tab(Windows)}

   ```console
   kubectl delete pod allowed-pod; `
   kubectl delete k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub; `
   kubectl delete constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos
   ```

   {/tab}

   {/tabs}

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}