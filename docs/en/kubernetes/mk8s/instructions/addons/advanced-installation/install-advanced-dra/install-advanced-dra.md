# {heading(DRA Driver for NVIDIA GPUs)[id=mk8s-install-advanced-dra]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}
The add-on requires Kubernetes {linkto(../../../../concepts/versions/version-support#mk8s-version-support)[text=version 1.34]} or higher.
{/note}

## {heading(Preparation steps)[id=mk8s-install-advanced-dra-prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing the add-on)[id=mk8s-install-advanced-dra-install]}

The {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-dra)[text=DRA Driver for NVIDIA GPUs]} add-on runs on {linkto(../../../../concepts/flavors#mk8s-flavors-gpu)[text=worker nodes with GPUs]}, so only {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=installation on dedicated nodes]} is available for it. To add worker nodes with GPUs to the cluster, first {linkto(../../../../../../computing/gpu/connect#gpu-connect)[text=connect]} the Cloud GPU service.

1. Prepare a dedicated worker node group for the add-on installation, if not done yet:

   {tabs}
   {tab(Management console)}

    1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Find the desired cluster in the list.

    1. Make sure the cluster has a dedicated worker node group with GPUs where the add-ons will be deployed.

       If there is no such group, {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=add one]}.

    1. (Optional) If only processes that require GPU resources should run on the nodes with GPUs, {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=apply]} a taint to this node group:

        - the `NoSchedule` effect;
        - the `nvidia.com/gpu` key;
        - the `gpu` value.

   {/tab}
   {/tabs}

1. Install the add-on:

   {tabs}
   {tab(Management console)}

    1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
    1. Select the project where the desired cluster is located.
    1. Go to the **Kubernetes Clusters → Kubernetes Clusters** section.
    1. Click the name of the desired cluster.
    1. Go to the **Add-ons** tab.
    1. Click the **Install** button on the `dra-driver-nvidia-gpu` add-on card and click the **Install add-on** button.
    1. (Optional) Edit:

        - the selected version;
        - the application name;
        - the name of the namespace where the add-on will be installed;
        - the {linkto(#mk8s-install-advanced-dra-edit-code)[text=add-on configuration code]}.
       
          {note:warn}
          An incorrectly specified configuration code may cause errors during installation or make the add-on inoperable.
          {/note}

    1. Click the **Install add-on** button.

       The add-on installation in the cluster will start. This process may take a long time.

   {/tab}
   {/tabs}

1. (Optional) [Review the official documentation on working with the DRA driver for GPUs](https://dra-driver-nvidia-gpu.sigs.k8s.io/docs/).

## {heading(Editing the add-on configuration code during installation)[id=mk8s-install-advanced-dra-edit-code]}

The full add-on configuration code along with field descriptions is available on [GitHub](https://github.com/kubernetes-sigs/dra-driver-nvidia-gpu/blob/v0.5.0/deployments/helm/dra-driver-nvidia-gpu/values.yaml). 

{note:err}
Do not delete the `"mcs.mail.ru/gpu-exists"` field or its `true` value.

This field is responsible for installing the nfd-worker plugin only on nodes with GPUs. If the field and value are deleted, nfd-worker will be installed on all cluster nodes, which will lead to increased resource consumption.
{/note}

After editing the code, continue the add-on installation.