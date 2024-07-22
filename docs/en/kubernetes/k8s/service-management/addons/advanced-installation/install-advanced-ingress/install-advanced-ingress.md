## {heading(Installing add-on)[id=installing_addon]}

<warn>

When installing the add-on, [standard load balancers](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
<tab>Quick installation</tab>
</tablist>
<tabpanel>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        <warn>

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Create a Terraform configuration file with data about the add-on being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation) list of add-ons available for installation.
      - Get the add-on settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the add-on parameters (for example, via CI), add the add-on settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the required values.

      <details>
         <summary>Example of specifying an add-on</summary>

         ```hcl
         resource "vkcs_kubernetes_addon" "kube-ingress" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.kube-ingress.id
            namespace = "kube-ingress"
            configuration_values = templatefile("./ingress-all.yaml",{openstack-internal-load-balancer= "false"})

            depends_on = [
               vkcs_kubernetes_node_group.default_ng
            ]
         }
         ```

      </details>

   1. Check the Terraform configuration file for correctness:

      ```bash
      terraform validate
      ```

   1. Check out the planned changes:

      ```bash
      terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

</tabpanel>
<tabpanel>

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host add-ons.

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#customise_labels_and_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

   1. Set the necessary tolerations and nodeSelector in the add-on settings code:

      <tabs>
      <tablist>
      <tab>Tolerations</tab>
      <tab>nodeSelector</tab>
      </tablist>
      <tabpanel>

      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Set this toleration for fields:

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation. In the add-on settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

</tabpanel>
<tabpanel>

<info>

During quick installation, the add-on settings code is not edited. A load balancer with a floating IP address will be created, and the Ingress controller will be accessible from the Internet.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

</info>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation.

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

<info>

- Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.
- The full add-on settings code along with the description of the fields is available on [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).

</info>

### Changing the load balancer type for the Ingress controller

When installing an add-on with default parameters, a load balancer with a floating IP address is created, and the Ingress controller will be accessible from the Internet.

To prevent the Ingress controller from being accessible from the Internet, specify an annotation according to which an internal load balancer will be created:

```yaml
---
service:
  annotations:
    {
      "loadbalancer.openstack.org/proxy-protocol": "true",
      "service.beta.kubernetes.io/openstack-internal-load-balancer": "true",
    }
```

After editing the add-on code [continue installing the add-on](#installing_addon).

### Prohibition of deleting an Ingress controller node by the Autoscaler module

The Autoscaler module automatically scales the cluster: it adds nodes when the load increases, and removes when it decreases. To prevent a module from deleting the node on which the add-on is running, you need to specify a ban on deletion in the pod annotation:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

After editing the add-on code [continue installing the add-on](#installing_addon).

## Getting the IP address of the load balancer

<info>

The following uses the service name `ingress-nginx` and the `ingress-nginx` namespace. If other parameters were selected when adding the add-on, adjust the commands.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Connect to the cluster](../../../../connect/k8s-dashboard) using Kubernetes Dashboard.
1. In the drop-down list next to the left of the search bar, select a namespace `ingress-nginx`.
1. Go to **Service → Services**.
1. Find in the list of services `ingress-nginx-controller` type `LoadBalancer`.

   The **External Endpoints** column will display the floating IP address assigned to the load balancer.

</tabpanel>
<tabpanel>

1. [Make sure](../../../../connect/kubectl#checking_the_connection_to_the_cluster) that you can connect to the cluster using `kubectl`.

1. Run the command:

   ```bash
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   The `EXTERNAL-IP` column will display the floating IP address assigned to the load balancer.

</tabpanel>
</tabs>
