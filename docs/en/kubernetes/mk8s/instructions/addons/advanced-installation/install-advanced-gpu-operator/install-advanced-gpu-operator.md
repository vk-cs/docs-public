## {heading(Before you begin)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

The [GPU Operator](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#gpu_operator) addon works on worker nodes with GPU, so only [installation on dedicated nodes](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons) is available for it. To be able to add worker nodes with GPU to the cluster, [connect](https://cloud.vk.com/cloud-gpu/) the Cloud GPU service.

1. Prepare a dedicated group of worker nodes for installing the addon, if it is not already done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the cluster.
   1. Make sure that the cluster has a dedicated group of worker nodes with GPUs on which addons will be hosted. 
   
      If there is no such group, [add it](/en/kubernetes/mk8s/instructions/manage-node-group#add_group).

   1. (Optional) If nodes with GPUs should only run processes that require GPU resources, [set](/en/kubernetes/mk8s/instructions/manage-node-group#labels_taints) a taint for this node group:

      - effect `NoSchedule`
      - key `nvidia.com`
      - value `gpu`

   {/tab}
   
   {/tabs}

1. Install add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the cluster.
   1. Go to the **Addons** tab.
   1. If the cluster already has add-ons installed, click **Add Addon**.
   1. Click **Install** on the `gpu-operator` add-on card.
   1. Select the required add-on version from the drop-down list.
   1. Click **Install addon**.
   1. (Optional) Edit the following:

      - the selected version
      - the application name
      - the namespace where the add-on will be installed
      - the [add-on settings code](#editing_addon_code)

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}
      
   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. (Optional) [Read](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) the official NVIDIA documentation about working with the add-on.

## {heading(Editing add-on settings code during installation)[id=editing_addon_code]}

The full addon setup code with descriptions is available on [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

{note:err}

Do not delete the `"mcs.mail.ru/gpu-exists"` parameter and its `true` value.

The parameter is responsible for installing the nfd-worker plugin only on nodes with a GPU. If you delete the parameter and value, nfd-worker and its accompanying plugins will be installed on all cluster nodes, which will lead to increased resource consumption.

{/note}

After editing the code, [continue installing the addon](#installing_addon).
