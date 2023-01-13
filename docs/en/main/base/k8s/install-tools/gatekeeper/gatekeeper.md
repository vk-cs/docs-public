Gatekeeper is a controller embedded between the Kubernetes API and the Open Policy Agent (OPA) policy engine to check that Kubernetes resources created, modified and deleted are compliant with policies. For more information about Gatekeeper, see [Kubernetes reference](../../k8s-reference/gatekeeper/) and [official Gatekeeper documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/).

<warn>

Use these instructions if your cluster is version 1.20 or lower. Starting with Kubernetes 1.21, Gatekeeper is [already installed](../../concepts/architecture) in the cluster along with [preconfigured templates and restrictions](../../concepts/preconfigured-features/settings).

</warn>

## Installation

1. [Install Helm](../helm/) if the utility is not already installed.

1. Run the commands

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts; `
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
   helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace opa-gatekeeper --create-namespace

   ```

   </tabpanel>
   </tabs>

## Checking Gatekeeper operation

Check that the Gatekeeper pods have been created and are working by running the command:

```bash
kubectl -n opa-gatekeeper get pods
```

The output of the command should contain `gatekeeper-audit-...` and `gatekeeper-controller-manager-...` pods in `Running` status.

Example of the output:

```text
NAME                                             READY   STATUS    RESTARTS   AGE
gatekeeper-audit-...                             1/1     Running   0          ...
gatekeeper-controller-manager-...                1/1     Running   0          ...
```

## Deletion

1. To delete Gatekeeper, run the command:

   ```bash
   helm delete gatekeeper --namespace opa-gatekeeper
   ```

1. To delete the CRD objects created for Gatekeeper, run the command:

   ```bash
   kubectl delete crd -l gatekeeper.sh/system=yes
   ```

   <warn>

   This operation will also delete the constraints and their templates.

   </warn>
