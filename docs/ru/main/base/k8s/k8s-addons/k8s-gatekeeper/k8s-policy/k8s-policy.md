## Шаблоны ограничений

Перед началом использования ограничений нужно создать шаблон политики (ConstraintTemplate). Шаблон политики позволяет администраторам настроить поведение политик как аргументы у функций. Библиотека уже настроенных ограничений и шаблонов ограничений доступна по [ссылке](https://github.com/open-policy-agent/gatekeeper-library).

Ниже приведен пример шаблона политик, который требует наличие указанных меток:
``` yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        openAPIV3Schema:
          properties:
            labels:
              type: array
              items: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
 
        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("you must provide labels: %v", [missing])
        }
```
Чтобы установить шаблон ограничений, выполните команду:
``` bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/demo/basic/templates/k8srequiredlabels_template.yaml
```
Посмотреть существующие в кластере шаблоны можно по команде:
``` bash
kubectl get constrainttemplate
```
Для просмотра детальной информации по определенному шаблону ограничений выполните команду:
``` bash
kubectl describe constrainttemplate <NAME>
```

## Ограничения

Ограничения (constraints) используются для применения `ConstraintTemplate`. Нижеприведенное ограничение использует `K8sRequiredLabels` и требует указание метки (label) gatekeeper для всех пространств имен (namespace).
``` yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: ns-must-have-gk
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Namespace"]
  parameters:
    labels: ["gatekeeper"]
```
Вы можете установить ограничения с помощью команды:
``` bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/demo/basic/constraints/all_ns_must_have_gatekeeper.yaml
```
Чтобы посмотреть существующие ограничения в кластере, выполните команду:
``` bash
kubectl get constraints
```
Для просмотра детальной информации по определенному ограничению выполните следующую команду:
``` bash
kubectl describe constraints <NAME>
```

## Поля сопоставлений

Поле `match` указывает границы применения ограничений к объектам. Поддерживаются следующие поля:

- `kinds` принимает лист объектов с полями `apiGroups` и `kinds`. В них перечислены группы/виды объектов, к которым будет применяться ограничение. Если указано несколько объектов групп/видов, чтобы ресурс находился в области применения, требуется только одно совпадение.
- `scope` определяет, совпадают ли ресурсы с областью кластера и/или с пространством имен. Используются `*` (по умолчанию), `Cluster`, `Namespaced`.
- `namespaces` — список имен. Если указано, то ограничения применяются только к ресурсам в указанных пространствах имен. Поддерживаются префиксы имен. Например, `namespaces: [kube-*]` соответствует `kube-system` и `kube-public`.
- `excludedNamespaces` — список имен namespaces. Если указано, то ограничения применяются только к ресурсам, не относящимся к этим пространствам имен. Поддерживаются префиксы имен. Например, `excludedNamespaces: [kube-*]` соответствует `kube-system` и `kube-public`.
- `labelSelector` — is the combination of two optional fields: `matchLabels` и `matchExpressions`. Эти два поля предоставляют разные методы выбора или исключения объектов Kubernetes на основе ключей и значений меток, включенных в метаданные объекта.
- `namespaceSelector` является селектором меток для пространства имен, содержащего объект, или самого объекта, если объект является пространством имен.
- `name` — имя объекта.

## Поле parameters

Поле `parameters` описывает назначение ограничения. На него можно ссылаться как на `input.parameters` в исходном коде Rego ConstraintTemplate. Gatekeeper заполняет `input.parameter` значениями, переданными в поле `parameters` в файле Constraint.

Пример:
```
 rego: |
        package k8srequiredlabels

        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("you must provide labels: %v", [missing])
        }
```

Схема для входных параметров Constraint определяется в файле ConstraintTemplate. Сервер API отклонит Constraint с некорректным полем параметров, если типы данных не совпадают.

Пример:
```
# Apply the Constraint with incorrect parameters schema
$ cat << EOF | kubectl apply -f -
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: ns-must-have-gk
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Namespace"]
  parameters:
    # Note that "labels" is now an array item, rather than an object
    - labels: ["gatekeeper"]
EOF
The K8sRequiredLabels "ns-must-have-gk" is invalid: spec.parameters: Invalid value: "array": spec.parameters in body must be of type object: "array"
```

## Поле enforcementAction

Поле `enforcementAction` определяет действие для обработки нарушений Constraint. По умолчанию, для `enforcementAction` установлено значение `deny`, поскольку поведение по умолчанию — отклонять запросы на допуск с любым нарушением. Другие поддерживаемые значения включают пробный запуск (`dryrun`) и предупреждение(`warn`).
