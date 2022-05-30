Безопасность образов в кластерах Kubernetes является важной частью общей безопасности инфраструктуры. Gatekeeper позволяет скачивать образы только с разрешенных репозиториев, что позволяет избежать запуска вредоносного кода.

Конфигурация будет состоять из двух файлов:

- `allowedrepos_template.yaml` — шаблон ограничений (constraint template), который описывает проверку репозитория и сообщения об ошибках.
- `allowedrepos_constraint.yaml` — ограничения (constraint), задающие перечень разрешенных репозиториев.

1. Создайте рабочую папку `allowedrepos`, где будут созданы необходимые конфигурационные файлы.
2. Создайте шаблон ограничения. Для этого создайте файл `allowedrepos_template.yaml` и добавьте в него нижеприведенный код. В шаблоне ограничения есть важные параметры:

- `kind: K8sAllowedRepos` — имя типа шаблона, на который будет ссылаться конфигурация ограничений;
- `properties: repos:` - массив разрешенных репозиториев, переданных из конфигурации ограничений;
- `rego:` - в этой секции описана проверка входящих контейнеров проверяемого секций `containers[_]` и `initContainers[_]` конфигурации пода. У каждого контейнера в массиве проверяется параметр `container.image` на совпадение с разрешенными репозиториями `repos[_]`. При отсутствии совпадения выводится ошибка `msg`. Сообщение об ошибки можно отредактировать в соответствии с вашими требованиями. Например: добавить ссылку на документацию с разрешенными репозиториями.

```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sallowedrepos
  annotations:
    description: >-
      Requires container images to begin with a string from the specified list.
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedRepos
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          properties:
            repos:
              description: The list of prefixes a container image is allowed to have.
              type: array
              items:
                type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8sallowedrepos
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          satisfied := [good | repo = input.parameters.repos[_] ; good = startswith(container.image, repo)]
          not any(satisfied)
          msg := sprintf("container <%v> has an invalid image repo <%v>, allowed repos are %v", [container.name, container.image, input.parameters.repos])
        }
        violation[{"msg": msg}] {
          container := input.review.object.spec.initContainers[_]
          satisfied := [good | repo = input.parameters.repos[_] ; good = startswith(container.image, repo)]
          not any(satisfied)
          msg := sprintf("initContainer <%v> has an invalid image repo <%v>, allowed repos are %v", [container.name, container.image, input.parameters.repos])
        }
```

3. Создайте файл `allowedrepos_constraint.yaml` в рабочей папке и добавьте в него следующий код конфигурации ограничения:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: repo-is-openpolicyagent
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
    namespaces:
      - "default"
  parameters:
    repos:
      - "openpolicyagent/"
      - "myregistry:5000/"
```

Конфигурация ограничения `constaint`, описывает:

- используемый шаблон ограничений `kind: K8sAllowedRepos`;
- проверяемый объект `kinds: ["Pod"]`;
- `namespaces:`, к которым будет применяться ограничение;
- `repos:` массив разрешенных репозиториев.

4. Выполните слудующие команды, чтобы применить последовательно шаблон ограничений и ограничения к кластеру:

```bash
kubectl apply -f template.yaml
```

```bash
kubectl apply -f samples/ingress-https-only/constraint.yaml
```
Ограничения применяются только к новым контейнерам. Текущие контейнеры продолжат работать без изменений, даже если они не соответствуют ограничениям.
