## {heading(Before you begin)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Installing add-on)[id=installing_addon]}

{note:warn}
When installing the add-on, [standard load balancers](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created for them. You get charged for using them according to the [tariffs](/en/networks/vnet/tariffication) of the Cloud Networks service.
{/note}

[Several installation options](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

{tabs}

{tab(Standard installation)}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `ingress-nginx` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        {note:warn}

        Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

{/tab}

{tab(Installation on dedicated worker nodes)}

1. Prepare a dedicated group of worker nodes to install the add-on, if it has not already been done:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
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
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `ingress-nginx` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

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

      Set this toleration for fields:

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(nodeSelector)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      {/tab}
      
      {/tabs}

      {note:warn}

      Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

{/tab}

{tab(Quick installation)}

{note:info}

During quick installation, the add-on settings code is not edited. A load balancer with a floating IP address will be created, and the Ingress controller will be accessible from the Internet.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

{/note}

1. Install the add-on:

   {tabs}
   
   {tab(Management console)}
      
   1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
   1. Click the name of the required cluster.
   1. Go to the **Addons** tab.
   1. Click the **Install** button on the `ingress-nginx` add-on card, then click **Install addon**.
   1. (Optional) Edit:

      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   {/tab}
   
   <!-- удалена таба Terraform, при работе над задачей по TF забрать её из k8s и подставить нужные значения -->
   
   {/tabs}

1. [Get the IP address of the load balancer](#getting_the_ip_address_of_the_load_balancer).

{/tab}

{/tabs}

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

{note:info}

- Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.
- You can find the full add-on settings code along with the description of the fields on [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).

{/note}

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

Once done with editing the add-on code, continue with the installation process.

### Prohibition of deleting an Ingress controller node by the Autoscaler module

The Autoscaler module automatically scales the cluster: it adds nodes when the load increases, and removes when it decreases. To prevent a module from deleting the node on which the add-on is running, you need to specify a ban on deletion in the pod annotation:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

Once done with editing the add-on code, continue with the installation process.

## Getting the IP address of the load balancer

{note:info}

The following uses the service name `ingress-nginx` and the `ingress-nginx` namespace. If other parameters were selected when adding the add-on, adjust the commands.

{/note}

{tabs}

<!-- удалена таба Kubernetes Dashboard. раскомментировать для Headlamp: забрать шаги и k8s с заменой на Headlamp или удалить -->

{tab(kubectl)}

1. [Make sure](/en/kubernetes/mk8s/connect/kubectl#check_connection) that you can connect to the cluster using `kubectl`.

1. Run the command:

   ```console
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   The `EXTERNAL-IP` column will display the floating IP address assigned to the load balancer.

{/tab}

{/tabs}
