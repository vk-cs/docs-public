With [Gatekeeper](../../../k8s-reference/gatekeeper) you can set a constraint that requires only allowed repositories to be used to download images. For example, this constraint can be useful if company policies require downloading images only from trusted repositories, so that cluster operators do not accidentally run an untrusted application from an untrusted source.

To demostrate how Gatekeeper works several objects will be created:

- A constraint template and its corresponding constraint. It will only allow images to be downloaded from the Docker Hub repository.
- A few Kubernetes resources to test how the constraint works.

## Preparatory steps

1. [Create](../../../operations/create-cluster) a Kubernetes cluster of the most current version.

   Choose the cluster parameters at your own discretion.

1. [Make sure](../../../connect/kubectl) that you can connect to the cluster with `kubectl`.

## Create a constraint that checks the repositories

1. Create a constraint template:

   1. Create a constraint template manifest.

      Use [the contents of this file](https://github.com/open-policy-agent/gatekeeper-library/blob/master/library/general/allowedrepos/template.yaml). This is a ready-made template `K8sAllowedRepos` from [the Gatekeeper library](https://github.com/open-policy-agent/gatekeeper-library), which checks that images are only downloaded from trusted repositories.

   1. Create a constraint template based on the template manifest:

      ``yaml
      kubectl apply -f template.yaml
      ```

1. Create a constraint:

   1. Create a constraint manifest constraint based on the template you created earlier:

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

   1. Create a constraint based on the constraint manifest:

      ```yaml
      kubectl apply -f constraint.yaml
      ```

1. Make sure that the constraint template and the constraint have been successfully created by running the command:

   ```yaml
   kubectl get constraints,constrainttemplates
   ```

   Output should give you the similar information:

   ```text
   NAME                                                          ENFORCEMENT-ACTION TOTAL-VIOLATIONS
   k8sallowedrepos.constraints.gatekeeper.sh/require-docker-hub  ...                ...

   NAME                                                          AGE
   constrainttemplate.templates.gatekeeper.sh/k8sallowedrepos    ...
   ```

1. Test the restriction by trying to create several pods:

   <tabs>
   <tablist>
   <tab>Pod that satisfies the constraint</tab>
   <tab>Pod that does not satisfy the constraint</tab>
   </tablist>
   <tabpanel>

   1. Create a manifest for the pod:

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

   1. Try to create a pod based on the manifest:

      ```yaml
      kubectl apply -f example-allowed.yaml
      ```

      The operation should be completed successfully.

   1. Make sure that the pod has been successfully created by running the command:

      ```yaml
      kubectl get pod allowed-pod
      ```

      Output should give you the similar information:

      ```text
      NAME          READY   STATUS    RESTARTS   AGE
      allowed-pod   1/1     Running   ...        ...
      ```

   </tabpanel>
   <tabpanel>

   1. Create a manifest for the pod:

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

   1. Try to create a pod based on the manifest:

      ```yaml
      kubectl apply -f example-disallowed.yaml
      ```

      The operation should end with an error:

      ```text
      Error from server (Forbidden): error when creating "example-disallowed.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [require-docker-hub] container <nginx> has an invalid image repo <quay.io/jitesoft/nginx:latest>, allowed repos are ["docker.io/"]
      ```

   1. Make sure that the pod has not been created by running the command:

      ```yaml
      kubectl get pod disallowed-pod
      ```

      Output should give you the similar information:

      ```text
      Error from server (NotFound): pods "disallowed-pod" not found
      ```

   </tabpanel>
   </tabs>

## Control the usage of resources

1. If the Kubernetes resources you created are no longer needed, delete them.

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

1. A running cluster consumes computing resources. If you no longer need it:

   - [stop](../../../operations/manage-cluster#start_or_stop_the_cluster) it to use it later;
   - [delete](../../../operations/manage-cluster#delete_cluster) it permanently.
