[Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/) is a [controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) that provides Rego constraints and controls their execution. A set of constraints forms a CRD-based policy. Gatekeeper checks all CRD operations for Kubernetes resources (creation, modification, deletion) for compliance with the specified constraints and decides whether to deny or allow a particular action.

The [Open Policy Agent](https://www.openpolicyagent.org/) (OPA) is responsible for applying constraints (in the form of policies).

## How Gatekeeper works

Compliance with policies is controlled via constraints. These constraints are created based on constraint templates and define:

- Scope of the constraint: which Kubernetes resources will be checked for compliance with the rules defined in the constraint template.
- Parameters that will be used when checking for compliance with the rules.

The constraint template, in turn, checks for compliance with the rules described in it with the scope and parameters specified in the constraint. These rules are described directly in the YAML file of the constraint template using [Rego language](https://www.openpolicyagent.org/docs/latest/policy-language/). There is also a check on the correctness of parameters passed from the constraint.

## Resource structure for Gatekeeper

### Constraint structure

Example of a constraint:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: <name of constraint template>

metadata:
  name: <name of constraint>

spec:
  match:
    <parameters defining the scope of the constraint>
  parameters:
    <parameters involved in checking the rules from the constraint template>
  enforcementAction: <action to take when handling a constraint violation: deny | dryrun | warn>
```

Here:

- `spec.match`: a group of parameters that together define the scope of the constraint.

  - `kinds`: contains a list of objects with fields `apiGroups` and `kinds`. These objects list the groups and types of resources to which the constraint will be applied. If several groups and kinds of resources are specified, one match is enough for the resource to fall within the scope of the constraint (a logical OR operation is applied).

  - `scope`: defines whether to check for matches for all resources at once (default), for cluster-scoped resources, namespace-scoped resources.

  - `namespaces`: a list of namespaces. If this option is given, constraints apply only to resources in the namespaces specified.

    This option may be configured as a prefix to select more than one namespace at a time. For example, `namespaces: [kube-*]` corresponds to `kube-system` and `kube-public`.

  - `excludedNamespaces`: a list of namespaces that serve as exceptions for `namespaces`. If this parameter is set, the constraints apply only to resources that do not belong to these namespaces.

    This option may be configured as a prefix to select multiple namespaces at once. For example, `namespaces: [kube-*]` corresponds to `kube-system` and `kube-public`.

  - `labelSelector`: a combination of two optional fields `matchLabels` and `matchExpressions`. These two fields provide different methods to select or exclude Kubernetes resources based on the keys and labels values included in the resource's metadata.

    For a resource to be selected, it must satisfy all the requirements specified here (the "logical AND" operation is applied).

  - `namespaceSelector`: a label selector for the namespace containing the resource, or the resource itself if it is a namespace.

  - `name`: the name of the resource. If this parameter is given, constraints apply only to resources with the specified name.

    This parameter can be specified as a prefix to select multiple resources at once. For example, `name: [pod-*]` corresponds to `pod-a` and `pod-b`.

- `spec.parameters`: parameters that will first be checked in the constraint template for type matching and then substituted in Rego rules.

- `spec.enforcementAction`: action when handling constraint violation. Possible values:

  - `deny` (default): prohibit creation of a Kubernetes resource.
  - `warn`: create Kubernetes resource and issue a warning. This can be useful for debugging constraints.
  - `dryrun`: do not create a Kubernetes resource, perform a test run (dry run). This can be useful for debugging constraints.

Read more about constraints in [Gatekeeper documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/howto#constraints).

### Constraint template structure

Example of a constraint template:

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate

metadata:
  name: <name of constraint>

spec:
  crd:
    spec:
      names:
        kind: <name of constraint, specified in the kind parameter for the Constraint resource>
      validation:
        openAPIV3Schema: <schema for checking the types of parameters passed from the Constraint resource>
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: <rules in Rego>
```

The `spec.crd.spec.validation.openAPIV3Schema` parameter provides a type correctness check on the parameters which are passed from the constraint to the constraint template to check the rules. Constraints with incorrectly passed parameters will not be created.

More about templates in [Gatekeeper documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/howto#constraint-templates).

## How to use Gatekeeper

To use Gatekeeper:

1. Create a constraint template manifest with the desired rules and input parameter checks.
1. Create a constraint template resource based on the manifest.
1. Create a constraint manifest based on the created constraint template. Set the scope and parameters in the constraint.

Examples of how to use Gatekeeper constraints are given in [use cases](../../use-cases/gatekeeper).
