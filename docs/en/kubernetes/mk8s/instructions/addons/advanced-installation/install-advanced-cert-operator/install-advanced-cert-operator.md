# {heading(Cert-operator)[id=mk8s-install-advanced-cert-operator]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Before you start)[id=mk8s-install-advanced-cert-operator-prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing the add-on)[id=mk8s-install-advanced-cert-operator-install]}

The {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-cert-operator)[text=cert-operator]} add-on runs one pod on each worker node of the cluster. The pods synchronize CA certificates on the nodes. {linkto(../../../../concepts/addons-and-settings/addons#features_of_installing_addons)[text=Standard and quick installation]} are available.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
    1. Select the project where the required cluster is located.
    1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
    1. Click the name of the required cluster.
    1. Go to the **Add-ons** tab.
    1. Click the **Install** button on the `cert-operator` add-on card, then click the **Install add-on** button.
    1. (Optional) Edit:

        - the selected version
        - the application name
        - the name of the namespace where the add-on will be installed (`cert-operator` by default)
        - the {linkto(#mk8s-install-advanced-cert-operator-edit-code)[text=add-on configuration code]}

          {note:warn}
          An incorrectly specified configuration code may cause errors during installation or make the add-on inoperable.
          {/note}

    1. Click the **Install add-on** button.

       The add-on installation in the cluster will start. This process may take a long time.

   {/tab}

   {/tabs}

1. (Optional) {linkto(../../../../how-to-guides/cert-operator#mk8s-cert-operator)[text=Review the how-to guide on using cert-operator]}.

{/tab}

{tab(Quick installation)}

{note:info}
The add-on configuration code cannot be edited during quick installation.
{/note}

1. Install the add-on:

   {tabs}

   {tab(Management console)}

    1. [Navigate](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
    1. Select the project where the required cluster is located.
    1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
    1. Click the name of the required cluster.
    1. Go to the **Add-ons** tab.
    1. Click the **Install** button on the `cert-operator` add-on card, then click the **Install add-on** button.
    1. (Optional) Edit:

        - the selected version
        - the application name
        - the name of the namespace where the add-on will be installed (`cert-operator` by default)

    1. Click the **Install add-on** button.

       The add-on installation in the cluster will start. This process may take a long time.

   {/tab}

   {/tabs}

1. (Optional) {linkto(../../../../how-to-guides/cert-operator#mk8s-cert-operator)[text=Review the how-to guide on using cert-operator]}.

{/tab}

{/tabs}

## {heading(Editing the add-on configuration code during installation)[id=mk8s-install-advanced-cert-operator-edit-code]}

You can edit the add-on code only during standard installation.

In the code, you can change the `reconcileInterval` parameter. It sets the interval at which the add-on synchronizes CA certificates on the worker nodes of the cluster. The default value is `30s`.

You set other parameters of the add-on pods (`tolerations`, `nodeSelector`, `affinity`, `priorityClassName`, and others) in the same way as for other Kubernetes resources. To limit the nodes on which the add-on synchronizes CA certificates, use `nodeSelector`, `affinity`, or `tolerations`.

After editing the code, continue the add-on installation.
