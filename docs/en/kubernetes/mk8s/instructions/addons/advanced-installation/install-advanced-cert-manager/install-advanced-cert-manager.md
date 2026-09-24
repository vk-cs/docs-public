## {heading(Before you begin)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        {note:warn}

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](/en/kubernetes/mk8s/instructions/manage-node-group#add_group).

   1. [Customise](/en/kubernetes/mk8s/instructions/manage-node-group#labels_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}
   
   {/tabs}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.   
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

   1. Set the necessary tolerations and nodeSelector in the add-on setup code:

      {tabs}
      
      {tab(Tolerations)}
            
      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Set this toleration for fields:

      - `tolerations`;
      - `webhook.tolerations`;
      - `cainjector.tolerations`.

      {/tab}
      
      {tab(nodeSelector)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `nodeSelector`;
      - `webhook.nodeSelector`;
      - `cainjector.nodeSelector`.

      {/tab}
      
      {/tabs}

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

{/tab}

{tab(Quick installation)}

{note:info}

Editing the add-on settings code is not supported during the quick installation.

If this is not suitable for you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select the [project](/en/tools-for-using-services/account/concepts/projects) where the cluster will be placed.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `cert-manager` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. Verify that the add-on is installed correctly by [issuing a test self-signed certificate](https://cert-manager.io/docs/installation/kubectl/#2-optional-end-to-end-verify-the-installation).

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on setup code along with the description of the fields is available on [GitHub](https://github.com/cert-manager/cert-manager/blob/master/deploy/charts/cert-manager/values.yaml).

{note:err}

Do not delete the `podAnnotations.timestamp` fields or the values set in them. These fields are required for correct installation and operation of the add-on.

{/note}

After editing the add-on code [continue installing the add-on](#installing_addon).
