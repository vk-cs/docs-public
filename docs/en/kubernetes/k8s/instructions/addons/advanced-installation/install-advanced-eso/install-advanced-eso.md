{note:info}
This add-on is only available for [second-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## {heading(Preparatory steps)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the [External Secrets Operator](/en/kubernetes/k8s/concepts/addons-and-settings/addons#eso) add-on.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
    1. Select the project that contains the required cluster.
    1. Go to **Containers** → **Kubernetes clusters**.
    1. Click the name of the required cluster.
    1. Go to **Addons** tab.
    1. If there are already installed add-ons in the cluster, click the **Add addon** button.
    1. Click the **Install** button on the `external-secrets-operator` add-on card.
    1. Click the **Install addon** button.
    1. If necessary, edit the following:
   
       - the selected version 
       - the application name
       - the name of the namespace where the add-on will be installed
       - the [add-on settings code](#editing_addon_settings_code_during_installation)

         {note:warn}
         Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.
         {/note}

    1. Click the **Install addon** button.

       The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}

   {/tabs}

1. (Optional) Learn more about External Secrets Operator in its [official documentation](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Optional) Review the [Using External Secrets Operator](/en/kubernetes/k8s/how-to-guides/external-secrets-operator) section for the details on working with the add-on.

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
    1. Select the project that contains the required cluster.
    1. Go to **Containers** → **Kubernetes clusters**.
    1. Find the cluster you need in the list.

    1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

       If there is no such group — [add it](../../../manage-node-group#add_group).

    1. [Customise](../../../manage-node-group#labels_taints) for this node group, if it hasn't already been done:

        - Kubernetes labels: key `addonNodes`, value `dedicated`.
        - Node taints: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}

   {/tabs}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
    1. Select the project that contains the required cluster.
    1. Go to **Containers** → **Kubernetes clusters**.
    1. Click the name of the required cluster.
    1. Go to **Addons** tab.
    1. If there are already installed add-ons in the cluster, click the **Add addon** button.
    1. Click the **Install** button on the `external-secrets-operator` add-on card.
    1. Select the required version from the drop-down list.
    1. Click the **Install addon** button.
    1. If necessary, edit the following:

       - the selected version
       - the application name
       - the name of the namespace where the add-on will be installed
       - the [add-on settings code](#editing_addon_settings_code_during_installation)

    1. Set the necessary tolerations and nodeSelector in the add-on settings code:

       {tabs}

       {tab(Tolerations)}

       ```yaml
       tolerations:
         - key: "addonNodes"
           operator: "Equal"
           value: "dedicated"
           effect: "NoSchedule"
       ```

       Set this exception for the `tolerations` field.

       {/tab}

       {tab(nodeSelector)}

       ```yaml
       nodeSelector:
         addonNodes: dedicated
       ```

       Set this selector for the `nodeSelector` field.

       {/tab}

       {/tabs}

       {note:warn}
       Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.
       {/note}

    1. Click the **Install addon** button.

       The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}

   {/tabs}

1. (Optional) Learn more about External Secrets Operator in its [official documentation](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Optional) Review the [Using External Secrets Operator](/en/kubernetes/k8s/how-to-guides/external-secrets-operator) section for the details on working with the add-on.

{/tab}

{tab(Quick installation)}

{note:info}

When installing the add-on this way, its code cannot be edited.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
    1. Select the project that contains the required cluster.
    1. Go to **Containers** → **Kubernetes clusters**.
    1. Click the name of the required cluster.
    1. Go to **Addons** tab.
    1. If there are already installed add-ons in the cluster, click the **Add addon** button.
    1. Click the **Install** button on the `external-secrets-operator` add-on card.
    1. Select the required version from the drop-down list.
    1. Click the **Install addon** button.
    1. If necessary, edit the following:

       - the selected version
       - the application name
       - the name of the namespace where the add-on will be installed

    1. Click the **Install addon** button.

       The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}

   {/tabs}

1. (Optional) Learn more about External Secrets Operator in its [official documentation](https://external-secrets.io/v2.5.0/guides/introduction/).
1. (Optional) Review the [Using External Secrets Operator](/en/kubernetes/k8s/how-to-guides/external-secrets-operator) section for the details on working with the add-on.

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on settings code along with the description of the fields is available on [GitHub](https://github.com/external-secrets/external-secrets/blob/v2.5.0/deploy/charts/external-secrets/values.yaml).

After editing the add-on code, continue with the installation process.

## {heading(Removing add-on)[id=delete]}

1. Remove all created instances of resources related to the Custom Resource Definitions (CRDs) of the add-on from all namespaces:

   ```console
   kubectl -n <NAMESPACE> delete <RESOURCE_TYPE> <INSTANCE_NAME>
   ```

   Here:

    - `<NAMESPACE>` is the namespace where the created resource instance is located.
    - `<RESOURCE_TYPE>` is the type of the resource created for the add-on. Examples: `ExternalSecret`, `SecretStore`, `ClusterSecretStore`.
    - `<INSTANCE_NAME>` is the name of the instance you want to remove.

   For more details on this process, refer to the [official documentation](https://external-secrets.io/v2.5.0/introduction/getting-started/#uninstalling) of the add-on.

1. [Remove](/en/kubernetes/k8s/instructions/addons/manage-addons#removing_addon) the add-on. 