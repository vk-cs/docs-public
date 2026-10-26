# {heading(Velero)[id=mk8s-install-advanced-velero]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Preparatory steps)[id=mk8s-install-advanced-velero-prep]}

{include(/en/_includes/_addon-prep.md)}

1. Prepare storage in the {linkto(../../../../../../storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]} service where the backups created by Velero will be stored. To do this:
   1. {linkto(../../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=Create a bucket]} with the `Hotbox` storage class.
   1. {linkto(../../../../../../storage/s3/instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Create an account]} in {var(s3)} and save the key ID (**Access Key ID**) and the secret key (**Secret Key**) on your device.
   
   Use these credentials when installing the add-on.

## {heading(Installing the add-on)[id=mk8s-install-advanced-velero-install]}

The {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} add-on offers {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=several installation options]}.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click **Install** on the `velero` add-on card and click the **Install add-on** button.

   {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

    1. Click the **Install add-on** button.

       The add-on installation will begin in the cluster. This process may take a long time.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated worker node group for the add-on installation, if this has not been done yet:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Find the desired cluster in the list.

    1. Make sure the cluster has a dedicated worker node group where the add-ons will be placed.

       If there is no such group, {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=add one]}.

    1. {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=Set]} for this node group, if this has not been done yet:

        - A label: key `addonNodes`, value `dedicated`.
        - A taint: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}

   {/tabs}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click **Install** on the `velero` add-on card and click the **Install add-on** button.

    {include(../../../../../../_includes/_k8s_velero_configure.md)[tags=configure]}

    1. Specify the required tolerations and nodeSelectors in the add-on configuration code:

       {tabs}

       {tab(Tolerations)}

       ```yaml
       tolerations:
         - key: "addonNodes"
           operator: "Equal"
           value: "dedicated"
           effect: "NoSchedule"
       ```

       Set this toleration for the `tolerations` field.

       {/tab}

       {tab(Node selectors)}

       ```yaml
       nodeSelector:
         addonNodes: dedicated
       ```

       Set this selector for the `nodeSelector` field.

       {/tab}

       {/tabs}

    1. Click the **Install add-on** button.

       The add-on installation will begin in the cluster. This process may take a long time.

   {/tab}

   {/tabs}

{include(../../../../../../_includes/_k8s_velero_configure.md)[tags=optional]}

{/tab}

{/tabs}

## {heading(Editing the add-on configuration code during installation)[id=mk8s-install-advanced-velero-edit-code]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on configuration code along with field descriptions is available on [GitHub](https://github.com/vmware-tanzu/helm-charts/blob/velero-12.1.0/charts/velero/values.yaml).

After editing the code, continue the add-on installation.