{note:warn}
The add-on requires Kubernetes of [version 1.33](/en/kubernetes/mk8s/concepts/versions/version-support) or higher.
{/note}

## {heading(Before you begin)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

The [HAMi](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#hami) add-on only works on [worker nodes with GPU](/en/kubernetes/mk8s/concepts/flavors#gpu), so you can only install it on [dedicated worker nodes](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons). To be able to add worker nodes with GPU to the cluster, [connect](https://cloud.vk.com/cloud-gpu/) the Cloud GPU service first.

1. Prepare a dedicated group of worker nodes for installing the add-on, if not done so already:

   {tabs}
   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
    1. Select the project where the required cluster is located.
    1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
    1. Find the cluster you need in the list.

    1. Make sure that the cluster has a dedicated group of worker nodes with GPUs on which add-ons will be hosted.

       If there is no such group, [add it](/en/kubernetes/mk8s/instructions/manage-node-group#add_group).

    1. (Optional) If nodes with GPUs should only run processes that require GPU resources, [set](/en/kubernetes/mk8s/instructions/manage-node-group#labels_taints) a taint for this node group, specifying:

        - `NoSchedule` effect
        - `nvidia.com/gpu` key
        - `gpu` value

   {/tab}
   {/tabs}

1. Install the add-on:

   {tabs}
   {tab(Management console)}

    1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
    1. Select the project where the required cluster is located.
    1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
    1. Click the name of the required cluster.
    1. Go to the **Addons** tab.
    1. Click the **Install** button on the `hami` add-on card, then click **Install addon**.
    1. (Optional) Edit:

        - the selected version;
        - the application name;
        - the name of the namespace where the add-on will be installed;
        - the [add-on settings code](#editing_addon_code).

          {note:warn}
          Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.
          {/note}

    1. Click the **Install addon** button.

       The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   {/tabs}

1. (Optional) Learn more about HAMi in its [official documentation](https://project-hami.io/docs/).

## {heading(Editing add-on settings code during installation)[id=editing_addon_code]}

You can find the full add-on settings code along with the description of the fields on [GitHub](https://github.com/Project-HAMi/HAMi/blob/master/charts/hami/values.yaml).

{note:err}
Do not remove the `"mcs.mail.ru/gpu-exists"` field and its value `true`.
{/note}

Once done with editing the add-on code, continue with the installation process.
