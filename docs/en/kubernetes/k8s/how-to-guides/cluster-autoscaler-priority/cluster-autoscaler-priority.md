# {heading(Configuring node group scaling priorities)[id=k8s-hpa]}

{include(/en/_includes/_translated_by_ai_en.md)}

This how-to guide describes how to configure the `priority` expander for Cluster Autoscaler so that, when scaling, it first selects the preferred worker node group, and in case of equal priority — the group with the smallest amount of remaining resources.

{note:warn}
In Managed Containers, some Cluster Autoscaler parameters may be managed by the VK Cloud platform. First check whether the Cluster Autoscaler Deployment is available to you and whether you are allowed to change its arguments. If the component is fully managed by the service, the `--expander` setting must be coordinated with [VK Cloud technical support](/en/contacts).
{/note}

## Prerequisites

{include(/en/_includes/_create-test-cluster.md)[tags=magnum]}
1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Install and configure]} `kubectl` if this has not been done yet.
1. {linkto(../../connect/kubectl#k8s-kubectl-check-connection)[text=Connect]} to the cluster using `kubectl`.

## 1. Find the Cluster Autoscaler

1. Run the command:

   ```bash
   kubectl -n kube-system get deploy,pod | grep -i autoscaler
   ```

1. View the current arguments:

   ```bash
   kubectl -n kube-system get deploy cluster-autoscaler \
     -o jsonpath='{.spec.template.spec.containers[0].command}'
   ```

   If the Deployment name is different, substitute the name you found.

## 2. Determine the node group names

The `priority` expander matches rules against node group names, not the names of individual nodes.

1. View the node [labels](/en/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints) and find the label in which VK Cloud stores the group name:

   ```bash
   kubectl get nodes --show-labels
   ```

1. [Check](/en/kubernetes/k8s/instructions/helpers/node-group-settings#k8s-node-group-settings) the node groups in the VK Cloud management console and use their exact names in the regular expressions below.

## 3. Create a ConfigMap with priorities

1. Create a `cluster-autoscaler-priority.yaml` manifest for the `ConfigMap`. The higher the number, the higher the priority:

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: cluster-autoscaler-priority-expander
     namespace: kube-system
   data:
     priorities: |
       100:
         - ^production-on-demand$
       50:
         - ^production-spot$
       10:
         - ^fallback-pool$
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f cluster-autoscaler-priority.yaml
   ```

1. Verify the configuration:

   ```bash
   kubectl -n kube-system get configmap \
     cluster-autoscaler-priority-expander -o yaml
   ```

## 4. Enable the priority expander

1. Add the following to the Cluster Autoscaler arguments:

   ```text
   --expander=priority,least-waste
   ```

   It is safer to use the `priority,least-waste` chain: the business priority is applied first, and in case of a tie the group with the smallest remaining CPU and memory is selected.

1. If the Deployment is available for editing, run the command:

   ```bash
   kubectl -n kube-system edit deployment cluster-autoscaler
   ```

1. In the `command` or `args` section, replace the existing `--expander` parameter or add a new one:

   ```yaml
   - --expander=priority,least-waste
   ```

   Do not add a second `--expander` parameter if one is already present.

## 5. Verify that the configuration is loaded

1. Run the commands:

   ```bash
   kubectl -n kube-system rollout status deployment/cluster-autoscaler
   kubectl -n kube-system logs deployment/cluster-autoscaler --since=10m | \
     grep -Ei 'priority|expander|configmap|scale.?up'
   ```

1. Check the Cluster Autoscaler status:

   ```bash
   kubectl -n kube-system get configmap cluster-autoscaler-status -o yaml
   ```

## 6. Run a test

1. Make sure that at least two groups match the same pod in terms of resources, labels, taints, and affinity rules.
2. Create a workload for which the current capacity is insufficient.
3. Make sure the pod received the `Pending` status due to lack of resources.
4. [Check the Cluster Autoscaler logs](/en/kubernetes/k8s/how-to-guides/autoscaler-logs#k8s-autoscaler-logs) and the group size changes in the VK Cloud management console.

Example of checking a pod:

```bash
kubectl describe pod <pending-pod>
```

Example of viewing Cluster Autoscaler decisions:

```bash
kubectl -n kube-system logs deployment/cluster-autoscaler --since=15m | \
  grep -Ei 'expanding|scale.?up|node group|priority'
```

## Delete unused resources

A running cluster is billed and consumes compute resources. If you no longer need the Kubernetes resources created for completing this how-to guide, delete them:

1. Restore the previous expander settings, for example:

   ```yaml
   - --expander=least-waste
   ```

1. Delete the ConfigMap:

   ```bash
   kubectl -n kube-system delete configmap \
     cluster-autoscaler-priority-expander
   ```

{include(/en/_includes/_delete-test-cluster-short.md)}

## Important limitations

- Priority is applied only among groups that match the pod in terms of resources, `nodeSelector`, mandatory `nodeAffinity`, taints, and tolerations.
- Rules are matched against node group names using regular expressions.
- The soft `preferredDuringSchedulingIgnoredDuringExecution` does not define the order of group scaling.
- If a group has reached its maximum size or is temporarily unavailable from the cloud provider, switching to a lower-priority group depends on the behavior and version of Cluster Autoscaler.
- Changes to the platform-managed Deployment may be overwritten by VK Cloud. After a cluster update, verify the configuration again.