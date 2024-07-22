There are [multiple versions](../../concepts/versions/components) of the [Kube Prometheus Stack](../../concepts/addons-and-settings/addons#kube_prometheus_stack) add-on available in the Cloud Containers clusters. Update of this add-on using VK Cloud interfaces is not available, but you can update the add-on manually.

To upgrade the Kube Prometheus Stack add-on from version `36.2.0` to version `54.2.2`, it is necessary to uninstall the current version of the add-on and then install the new one. Therefore, the upgrade process includes preparing the environment of the current version of the add-on for saving and further re-using it with the new version.

<warn>

It is further assumed that the add-on is installed in the namespace (e.g., `kube-prometheus-stack`) that contains only those Kubernetes resources that relate to the add-on.

If there are other Kubernetes resources in the namespace, modify the commands and script so that they do not affect resources not related to the add-on.

</warn>

## Preparation steps

1. If you already have an existing Cloud Containers cluster with the Kube Prometheus Stack add-on that needs to be upgraded, skip this step.

   Otherwise, create a test cluster where the add-on update will be performed:

   1. [Create](../../service-management/create-cluster) a Cloud Containers cluster version `1.26.5`.

      When you create the cluster, select the **Assign external IP** option. Other cluster parameters can be set at your discretion.

   1. [Install](../../service-management/addons/advanced-installation/install-advanced-monitoring) the Kube Prometheus Stack add-on version `36.2.0` in the cluster.

      Perform a **quick installation** of the add-on (without editing the add-on configuration code).

1. [Verify](../../connect/kubectl) that you can connect to the cluster via `kubectl`.

   To connect, use the cluster configuration file (kubeconfig) downloaded from the VK Cloud management console.

1. Make sure the add-on is available and working. To do this, [access the Grafana web interface](../../monitoring#using_grafana).

   <warn>

   Write down the password to access Grafana, even if it is stored as a Kubernetes secret. During the add-on upgrade process, the namespace where the add-on and the secret are located will be deleted along with all contents.

   </warn>

1. [Install](../../install-tools/helm) Helm version 3.0.0 or higher if the utility has not been already installed.

   To install, select the Helm version that is [compatible](https://helm.sh/docs/topics/version_skew/) with the cluster.

1. Set an environment variable pointing to kubeconfig for the cluster. This will simplify your work with `kubectl` and `helm` when updating the add-on.

   The path to your kubeconfig files may differ from the example below.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $Env:KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   </tabs>

## {heading(1. Get information you need to update your add-on)[id=1_get_information_you_need_to_update_your_addon]}

1. [Go to editing the add-on configuration code](../../service-management/addons/manage-addons#editing_addon_code).

   Do not modify the code.

   Write down the following information:

   1. Application name (`kube-prometheus-stack` by default).
   1. Namespace name (`prometheus-monitoring` by default).
   1. Full add-on configuration code.

1. Set the environment variables that point to these application and namespace names. This will simplify further updating the add-on.

   The values of your variables may differ from the example below.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export CHART_NAME="kube-prometheus-stack"
   export NAMESPACE="prometheus-monitoring"

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $CHART_NAME="kube-prometheus-stack"
   $NAMESPACE="prometheus-monitoring"
   ```

   </tabpanel>
   </tabs>

1. Get information about [Persistent Volumes (PVs) and Persistent Volume Claims (PVCs)](../../k8s-reference/pvs-and-pvcs). They are used to store the collected metrics, as well as other data necessary for the add-on to work.

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   The output of the command will contain a list of PVCs (`NAME`) and their corresponding PVs (`VOLUMES`) with the size of the volumes (`CAPACITY`). Write this information down, you will need it later.

   <details>
   <summary>Example of the command partial output</summary>

   ```text
   NAME                                                                             STATUS   VOLUME                                     CAPACITY   ...
   alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0   Bound    pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...
   kube-prometheus-stack-grafana                                                    Bound    pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...
   prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0           Bound    pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...
   ```

   </details>

## {heading(2. Prepare add-on environment for update)[id=2_prepare_addon_environment_for_update]}

Volumes for the add-on are created by default using the `Retain` [reclaim policy](../../concepts/storage#available_reclaim_policies_for_persistent_volumes) if no changes related to the storage class have been made to the add-on configuration code. So, deleting the add-on will cause the deletion of the persistent volumes of data as well. This will result in the loss of metrics accumulated during the add-on operation, as well as other data necessary for the add-on to work.

In addition, the following Kubernetes resources, which are also used by the add-on, may prevent you from installing a new version of the add-on:

- A set of Custom Resource Definitions (CRDs) required for the add-on to work.
- A set of Persistent Volume Claims (PVCs) that allows the add-on to use persistent volumes.

Before you update the add-on, protect the persistent volumes used by this add-on from deletion, and remove the mentioned Kubernetes resources using one of the methods below.

<tabs>
<tablist>
<tab>Ready-to-use bash script for Linux</tab>
<tab>Separate commands for Linux/macOS/Windows</tab>
</tablist>
<tabpanel>

1. Create a file with the script code:

   <details>
   <summary>prepare-for-addon-update.sh</summary>

   ```bash
   #!/bin/sh

   set -e

   DEFAULT_NAMESPACE=prometheus-monitoring
   : "${NAMESPACE:=prometheus-monitoring}"
   : "${CHART_NAME:=kube-prometheus-stack}"
   : "${DRY_RUN:=none}"

   usage() {
   cat <<EOF
   Usage:
   -h help
   -k kubeconfig           "${KUBECONFIG}"
   -c kubeconfig context   ""
   -n namespace            "${NAMESPACE}"
   -r chart                "${CHART_NAME}"
   -d dry run              "${DRY_RUN}". [none, server,client]
   EOF
   exit 1
   }

   while getopts 'k:c:n:r:hd' opt; do
     case $opt in
       h)
           usage
           ;;
       k) KUBECONFIG=$OPTARG
           ;;
       c) CONTEXT=$OPTARG
           ;;
       n) NAMESPACE=$OPTARG
           ;;
       r) CHART_NAME=$OPTARG
           ;;
       d) DRY_RUN=server
           ;;
       *) usage ;;
     esac
   done

   shift "$((OPTIND-1))"

   # set k8s params as array
   set -- "--namespace=${NAMESPACE}"
   [ -n "${CONTEXT}" ] && {
       set -- "--context=${CONTEXT}" "${@}"
       # for helm
       set -- "--kube-context=${CONTEXT}" "${@}"
   }
   [ -n "${KUBECONFIG}" ] && set -- "--kubeconfig=${KUBECONFIG}" "${@}"

   get_prometheus_pv() {
       kubectl "${@}" get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{"pv/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_crd() {
       kubectl "${@}" get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{"crd/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_pvc() {
       kubectl "${@}" get pvc -o jsonpath='{range .items[*]}{"pvc/"}{.metadata.name}{"\n"}{end}'
   }

   set_prometheus_pv_retain_reclaim_policy() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   }

   clear_prometheus_pv_claim_reference() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" --type json -p='[{"op": "remove", "path": "/spec/claimRef"}]'
   }

   delete_prometheus_crd() {
       crds=$(get_prometheus_crd "${@}")
       [ -z "${crds}" ] && return
       for crd in ${crds}; do
           set -- "${crd}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_pvc() {
       pvcs=$(get_prometheus_pvc "${@}")
       [ -z "${pvcs}" ] && return
       for pvc in ${pvcs}; do
           set -- "${pvc}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_chart() {
       dry_run=""
       [ "${DRY_RUN}" != "none" ] && dry_run="--dry-run"
       if helm get manifest "${@}" "${CHART_NAME}" >/dev/null 2>&1; then
           helm uninstall "${@}" "${CHART_NAME}" --wait --timeout 600s "${dry_run}" >/dev/null 2>&1 || true
       fi
       helm list "${@}" -aA -f "${CHART_NAME}" -q
   }

   delete_prometheus_namespace() {
       if kubectl get "${@}" ns "${NAMESPACE}" >/dev/null 2>&1; then
           kubectl delete "${@}" ns "${NAMESPACE}" --dry-run="${DRY_RUN}" --wait --timeout 600s --force --grace-period=0 --cascade=foreground
       fi
   }

   echo "Setting retain policy for the Prometheus PVs..."
   set_prometheus_pv_retain_reclaim_policy "${@}"
   echo "Deleting Prometheus chart..."
   delete_prometheus_chart "${@}"
   echo "Deleting Prometheus PVCs..."
   delete_prometheus_pvc "${@}"
   echo "Clearing Prometheus PV claim references..."
   clear_prometheus_pv_claim_reference "${@}"
   echo "Clearing Prometheus CRDs..."
   delete_prometheus_crd "${@}"
   [ "${NAMESPACE}" = "${DEFAULT_NAMESPACE}" ] && {
       echo "Deleting Prometheus namespace..."
       delete_prometheus_namespace "${@}"
   }
   echo "Completed!"
   ```

   </details>

   The script performs the following actions:

   1. Detects persistent volumes that are associated with PVCs created in the namespace in which the add-on is installed. For these persistent volumes, the script defines the `Retain` reclaim policy. This is necessary to prevent these volumes from being deleted when the current version of the add-on is uninstalled.
   1. Deletes the Helm chart of the current version of the add-on. This is necessary for successfully removing the PVCs and CRDs sets that are used by the add-on.
   1. Removes a set of PVCs from the namespace where the add-on has been installed. This is necessary for unbinding PVs from PVCs and then reusing these PVs with a new version of the add-on.
   1. Removes references to the deleted PVCs from persistent volumes that have been linked to these PVCs. These persistent volumes will become available for linking (PVs status becomes `Available`) and will be reused by the new version of the add-on after it is installed.
   1. Deletes the set of CRDs that have been used by the add-on.
   1. Deletes the `prometheus-monitoring` namespace if the script has been run for this namespace.

1. Make the script code file executable:

   ```bash
   chmod +x prepare-for-addon-update.sh
   ```

1. Define the parameters to run the script with:

   ```bash
   bash prepare-for-addon-update.sh -h
   ```

   Help will be displayed, showing the available parameters and their default values:

   - `-h`: show the help.
   - `-k`: path to the kubeconfig file. The default value is retrieved from the `$KUBECONFIG` environment variable if specified.
   - `-c`: name of the kubeconfig context that should be used when working with the cluster. Default value: empty string.
   - `-n`: name of the namespace in which the add-on is installed. Default value is `prometheus-monitoring`.
   - `-r`: name of the application with which the add-on is installed. It matches the name of the Helm-chart for the add-on. Default value is `kube-prometheus-stack`.
   - `-d`: value of the [--dry-run](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) argument for `kubectl`. Default value is `none`. Use `server` or `client` for test running of the script: no changes will be made to the cluster.

   <details>
   <summary>Help output example</summary>

   ```text
   Usage:
   -h help
   -k kubeconfig           "/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   -c kubeconfig context   ""
   -n namespace            "prometheus-monitoring"
   -r chart                "kube-prometheus-stack"
   -d dry run              "none". [none,server,client]
   ```

   </details>

1. Run the script.

   <warn>

   If you run the script with the `prometheus-monitoring` namespace explicitly (the `-n` parameter) or implicitly specified, this namespace will be removed.

   If you run the script for a different namespace, it will not be removed.

   </warn>

   Run the command, specifying the required parameters. You can omit the parameter if you are satisfied with its default value.

   ```bash
     bash prepare-for-addon-update.sh \
       -k <path to the kubeconfig file> \
       -c <name of the kubeconfig context> \
       -n <name of the namespace> \
       -r <name of the application> \
       -d <value of the --dry-run argument for kubectl>

   ```

   Detailed messages about the script operation will be displayed. The output must include the following messages:

   ```text
   Setting retain policy for the Prometheus PVs...
   Deleting Prometheus chart...
   Deleting Prometheus PVCs...
   Clearing Prometheus PV claim references...
   Clearing Prometheus CRDs...
   Deleting Prometheus namespace...
   Completed!
   ```

   <details>
   <summary>Command output example</summary>

   ```text
   Settings retain policy for the prometheus PVs...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Deleting prometheus chart...
   Deleting prometheus PVCs...
   persistentvolumeclaim "prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0" deleted
   persistentvolumeclaim "alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0" deleted
   Clearing prometheus PV claim references...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Clearing prometheus CRDs...
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   customresourcedefinition.apiextensions.k8s.io "thanosrulers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "servicemonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheusrules.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheuses.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "probes.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "podmonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagerconfigs.monitoring.coreos.com" deleted
   Deleting prometheus namespace...
   Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   namespace "prometheus-monitoring" force deleted
   Completed!
   ```

   </details>

</tabpanel>
<tabpanel>

1. Get the list of PVs that are used by the add-on via PVCs in the add-on namespace:

   ```bash
   kubectl get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{.metadata.name}{"\n"}{end}'
   ```

   The list of PVs must match the list of PVs [received earlier](#1_get_information_you_need_to_update_your_addon).

2. Patch these PVs so that they use the `Retain` reclaim policy. This is necessary to prevent these volumes from being deleted when the current version of the add-on is uninstalled.

   This command patches an individual PV. Run it for all PVs in the list.

   ```bash
   kubectl patch pv <PV name> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   ```

3. Get a list of all PVs in the cluster and make sure that the PVs, which the add-on is working with, use the `Retain` reclaim policy and are associated with a PVC (`Bound`):

   ```bash
   kubectl get pv
   ```

   <details>
   <summary>Example of partial command output</summary>

   ```text
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS  CLAIM    ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Bound   prometheus-monitoring/alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0 ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Bound   prometheus-monitoring/kube-prometheus-stack-grafana ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Bound   prometheus-monitoring/prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0 ...
   ```

   </details>

4. Delete the Helm chart of the current version of the add-on. This is necessary for successfully removing the PVCs and CRDs sets that are used by the add-on.

   ```bash
   helm uninstall -n $NAMESPACE $CHART_NAME --wait --timeout 600s
   ```

5. Get a list of PVCs that have been used by the add-on:

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   The final list may differ from [previously obtained](#1_get_information_you_need_to_update_your_addon): part of the PVCs has been deleted during the Helm chart deletion.

6. Delete the PVCs that are used by the add-on. This is necessary for unbinding PVs from PVCs and then reusing these PVs with a new version of the add-on.

   This command deletes a separate PVC. Run it for all PVCs from the list.

   ```bash
   kubectl -n $NAMESPACE delete pvc <PVC name>
   ```

7. Patch the PVs that are used by the add-on to unbind them from the PVCs that have been deleted. These persistent volumes will become available for binding (the PVs status becomes `Available`) and will be reused by the new version of the add-on after its installation.

   This command patches an individual PV. Run it for all PVs in the list you received earlier.

   ```bash
   kubectl patch pv <PV name> --type json -p '[{"op": "remove", "path": "/spec/claimRef"}]'
   ```

8. Get a list of all PVs in the cluster and make sure that the PVs, which the add-on is working with, use the `Retain` reclaim policy and are available for binding (`Available`):

   ```bash
   kubectl get pv
   ```

   <details>
   <summary>Example of partial command output</summary>

   ```text
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS      ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Available   ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Available   ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Available   ...
   ```

   </details>

9. Get a list of CRDs that the add-on has worked with:

   ```bash
   kubectl get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{.metadata.name}{"\n"}{end}'
   ```

10. Delete all CRDs that the add-on has worked with.

   This command deletes an individual CRD. Execute it for all CRDs in the list obtained earlier.

   ```bash
   kubectl delete crd <CRD name>
   ```

11. Delete the namespace in which the add-on has been installed.

   ```bash
   kubectl delete ns $NAMESPACE
   ```

</tabpanel>
</tabs>

## {heading(3. Update add-on version)[id=3_update_addon_version]}

1. [Uninstall the current version of the add-on](../../service-management/addons/manage-addons#removing_addon) using VK Cloud interfaces.
1. [Install](../../service-management/addons/advanced-installation/install-advanced-monitoring) the Kube Prometheus Stack add-on version `54.2.2` in the cluster.

   Perform **standard installation** as follows:

   1. Set the same application and namespace names that have been used when installing the previous version of the add-on.

   1. Review the previous version of the add-on configuration code, [obtained earlier](#1_get_information_you_need_to_update_your_addon). Find code fragments that are responsible for setting up the storage for the following add-on components:

      <tabs>
      <tablist>
      <tab>Grafana</tab>
      <tab>Alert Manager</tab>
      <tab>Prometheus</tab>
      </tablist>
      <tabpanel>

      ```yaml
      grafana:

        ...

        persistence:
          enabled: true
          storageClassName: "csi-ceph-hdd-gz1"
          accessModes:
          - ReadWriteOnce
          size: 1Gi

        ...
      ```

      </tabpanel>
      <tabpanel>

      ```yaml
      alertmanager:

        ...

        alertmanagerSpec:

        ...

          storage:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-hdd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 1Gi
      ```

      </tabpanel>
      <tabpanel>

      ```yaml
      prometheus:

        ...

        prometheusSpec:

          ...

          storageSpec:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-ssd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 10Gi
      ```

      </tabpanel>
      </tabs>

   1. Review the configuration code for the new version of the add-on that you plan to install.

      If the code fragments that are responsible for setting up the storage are different from those obtained earlier, correct them. The storage settings for Grafana, Alert Manager and Prometheus should exactly match the same settings used for the previous version of the add-on.

   1. (Optional) Make other changes to the add-on configuration code.

      If you specified the password for access to Grafana in the `grafana.adminPassword` field when installing the previous version of the add-on, you do not need to specify it again. The new version of the add-on will use the previous PVs as a storage, so the password will remain the same. Installing a new version of the add-on will not change the password for accessing Grafana, even if you leave this field empty: a secret with the password for Grafana will be generated, but it will not be used.

      <warn>

      Incorrectly specified configuration code may cause errors during installation or inoperability of the add-on.

      </warn>

   1. Install the add-on.

      The installation process may take a long time. Wait until it is completed.

1. Get information about the [Persistent Volume Claims (PVCs) and persistent volumes (PVs)](../../k8s-reference/pvs-and-pvcs) used by the add-on:

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   The output of the command should be similar to the output of the [previously executed](#1_get_information_you_need_to_update_your_addon) command for the add-on of the previous version. Thus, the `alertmanager...` PVC must be associated with the same PV that Alert Manager used earlier. Similarly for Prometheus and Grafana.

## {heading(4. Verify add-on operability after updating)[id=4_verify_addon_operability_after_updating]}

[Get access to the Grafana web interface](../../monitoring#using_grafana). To connect, use the same password that was used with the previous version of the add-on. If you forgot your Grafana password, [reset it](../../service-management/addons/advanced-installation/install-advanced-monitoring#resetting_grafana_password).

A successful connection to Grafana indicates a successful add-on update.

## Delete unused resources

A running Cloud Containers cluster is being charged and consumes computing resources. If you have created a cluster for testing purposes and no longer need it, do as follows:

- [stop](../../service-management/manage-cluster) it, so you can use it later;
- [delete](../../service-management/manage-cluster#delete_cluster) it permanently.
