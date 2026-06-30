## Preparatory steps

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for [Istio](/en/kubernetes/k8s/concepts/addons-and-settings/addons#istio).

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Kubernetes clusters** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `istio` add-on card.
   1. Click the **Install addon** button.
   1. If necessary, edit the [add-on settings code](#edit-code) (for example, to changes the add-on operating mode).

      {note:warn}
      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.
      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   {/tabs}

1. (Optional) Learn more about Istio in its [official documentation](https://istio.io/latest/docs/).

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](../../../../manage-node-group#add_group).

   1. [Customise](../../../../manage-node-group#labels_taints) for this node group, if it hasn't already been done:

      - Kubernetes labels: key `addonNodes`, value `dedicated`.
      - Node taints: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   {/tab}
   
   {/tabs}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}

   1. [Go to](https://msk.cloud.vk.com/app/en/) your VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Kubernetes clusters** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `istio` add-on card.
   1. Click the **Install addon** button.
   1. If necessary, edit the [add-on settings code](#edit-code) (for example, to changes the add-on operating mode).

      {note:warn}
      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.
      {/note}
   
   1. Set the necessary tolerations and nodeSelector in the add-on settings code:

      {tabs}

      {tab(Tolerations)}
      Example of the `tolerations` block for the `pilot` component:
      ```yaml
      pilot:
         enabled: true
         k8s:
           replicaCount: 2
           imagePullPolicy: "IfNotPresent"
           tolerations:
             - key: "addonNodes"
               operator: "Equal"
               value: "dedicated"
               effect: "NoSchedule"
           nodeSelector: {}
           resources:
             requests:
               cpu: 250m
               memory: 512Mi
      ```

      {/tab}

      {tab(Node selectors)}
      Examples of the `nodeSelector` block for the `pilot` component: 
       
      ```yaml
      pilot:
        enabled: true
        k8s:
          replicaCount: 2
          imagePullPolicy: "IfNotPresent"
          tolerations:
          # - key: "Key"
          #   operator: "Exists"
          #   value: "Value"
          #   effect: "NoSchedule"
          nodeSelector:
            addonNodes: dedicated
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
      ```

   {/tab}
   
   {/tabs}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

{/tab}

{/tabs}

1. (Optional) Learn more about Istio in its [official documentation](https://istio.io/latest/docs/).

{/tab}

{tab(Quick installation)}

{note:info}
During quick installation, the add-on settings code is not edited.
{/note}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install** button on the `istio` add-on card.
   1. Click the **Install addon** button.
   1. Leave the parameters unchanged and click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
    
   {/tabs}

1. (Optional) Learn more about Istio in its [official documentation](https://istio.io/latest/docs/).

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=edit-code]}

The full add-on settings code along with the description of the fields is available in the [official Istio documentation](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/).

The add-on has two operating modes available which define methods for intercepting and routing traffic between pods in the [service mesh](https://istio.io/latest/about/service-mesh/#what-is-a-service-mesh):

- `default`: In this mode, Istio uses the classic sidecar architecture. It adds an `istio-proxy` container to each pod, which intercepts, encrypts, and routes traffic. Pod-level traffic interception is done using `iptables`.
- `ambient` (default): In this mode, Istio operates at the node level of the cluster, without sidecar containers. Traffic is intercepted using eBPF at the core level. The intercepted packages are passed to the `ztunnel` component, which runs on each node of the cluster, for encryption and L4 routing. You can configure L7-level policies by additionally setting up [waypoint proxies](https://istio.io/latest/docs/ambient/usage/waypoint/).

Mutual TLS (mTLS) encryption is used in both modes.

Depending on the mode, a set of components is installed in the service mesh. These components are specified in the `spec.components` block with the `enabled: true` value. For Istio to work in the `ambient` mode, it requires the `base`, `pilot`, `cni`, and `ztunnel` — they are already enabled, do not disable them. The rest of the components are optional. For more details on them, refer to the [official Istio documentation](https://istio.io/latest/docs/setup/additional-setup/config-profiles/#deployment-profiles).

If you want to use the `default` mode instead of `ambient`:

1. Set `default` in the `spec.profile` field:

   ```yaml
   ...
   kind: IstioOperator
   spec:
     profile: default
   ...
   ```

1. In the `spec.components` block, set:

   - For the `base` and `pilot` components: `enabled: true`.
   - For the `ztunnel` component: `enabled: false`.
   - The rest of the components are optional.

   Following is an example of an edited `spec.components` block:

   ```yaml
   components:
   base:
    enabled: true
    k8s:
      imagePullPolicy: "IfNotPresent"
      tolerations: []
      # - key: "Key"
      #   operator: "Exists"
      #   effect: "NoSchedule"

   pilot:
    enabled: true
    k8s:
      replicaCount: 2
      imagePullPolicy: "IfNotPresent"
      tolerations: []
      # - key: "Key"
      #   operator: "Exists"
      #   value: "Value"
      #   effect: "NoSchedule"
      nodeSelector: {}
      resources:
        requests:
          cpu: 250m
          memory: 512Mi
   
   ztunnel:
    enabled: false
    k8s:
      imagePullPolicy: "IfNotPresent"
      tolerations: []
        # - key: "Key"
        #   operator: "Exists"
        #   value: "Value"
        #   effect: "NoSchedule"
      nodeSelector: {}
      resources:
        requests:
          cpu: 250m
          memory: 512Mi

   ```

Once finished editing the code, continue with the add-on installation.