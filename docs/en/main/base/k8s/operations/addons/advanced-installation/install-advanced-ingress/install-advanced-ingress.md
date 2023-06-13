## Installing the addon

<warn>

When installing the addon, [standard load balancers](/en/main/networks/vnet/concepts/load-balancer#types-of-load-balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

[Several installation options](../../../../concepts/addons-and-settings/addons#features-of-installing-addons) are available for the addon.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of addons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#do-manual-scaling) for groups of worker nodes or [configure automatic scaling](../../../scale#configure-automatic-scaling--only-for-worker-node-groups-) before install.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
<tab>Quick installation</tab>
</tablist>
<tabpanel>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` addon card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;
      - [addon settings code](#editing-the-addon-setup-code-during-installation).

        <warn>

        An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting-the-ip-address-of-the-load-balancer).

</tabpanel>
<tabpanel>

1. Prepare a dedicated group of worker nodes to install the addon, if it has not already been done:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Find the cluster you need in the list.

   1. Make sure that the cluster has a dedicated group of worker nodes that will host addons.

      If there is no such group — [add it](../../../manage-node-group#add-worker-node-group).

   1. [Customise](../../../manage-node-group#customise-labels-and-taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` addon.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;
      - [addon settings code](#editing-the-addon-setup-code-during-installation).

   1. Set the necessary tolerations and nodeSelector in the addon setup code:

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

      An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting-the-ip-address-of-the-load-balancer).

</tabpanel>
<tabpanel>

<info>

When the addon is installed quickly, a load balancer with a floating IP address is created, and the Ingress controller will be accessible from the Internet.

If it is necessary that the Ingress controller is not accessible from the Internet, perform a **standard installation** or **installation on dedicated worker nodes**. During the installation process, [change](#editing-the-addon-setup-code-during-installation) load balancer type for Ingress controller.

</info>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `ingress-nginx` addon.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed;

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. [Get the IP address of the load balancer](#getting-the-ip-address-of-the-load-balancer).

</tabpanel>
</tabs>

## Editing the addon setup code during installation

<info>

- Editing the addon code is applicable for standard installation and installation on dedicated worker nodes.
- The full addon setup code along with the description of the fields is available on [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).

</info>

### Changing the load balancer type for the Ingress controller

When installing an addon with default parameters, a load balancer with a floating IP address is created, and the Ingress controller will be accessible from the Internet.

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

After editing the addon code [continue installing the addon](#installing-the-addon).

## Getting the IP address of the load balancer

<info>

If you [selected](#installing-the-addon) a service name other than `ingress-nginx` or a namespace other than `ingress-nginx` when installing the addon, adjust the steps below.

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

1. [Make sure](../../../../connect/kubectl#checking-the-connection-to-the-cluster) that you can connect to the cluster using `kubectl`.

1. Run the command:

   ```bash
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   The `EXTERNAL-IP` column will display the floating IP address assigned to the load balancer.

</tabpanel>
</tabs>
