## Preparatory steps

1. [Create](/en/base/s3/quick-start/create-bucket) in the object storage bucket, which will be used to store Docker images.

   When creating, select:

   - **Storage class:** `Hotbox`.
   - **Default ACL:** `private`.

   Write down the bucket's name.

1. Add a key to access this bucket:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects).
   1. Go to **Object storage → Buckets**.
   1. Click on the name of the created bucket.
   1. Go to **Keys** tab.
   1. Click the **Add key** button.
   1. Specify any key name.
   1. Leave the other settings unchanged.
   1. Click the **Create** button.

   </tabpanel>
   </tabs>

   Write down the values **Access Key ID** and **Secret Key**.

1. Create an encrypted login/password pair for authorization in the Docker registry by running the command:

   ```bash
   docker run --entrypoint htpasswd registry:2.7.0 -Bbn <login> <password>
   ```

   Write down the output of the command (in the format `<login>:<encrypted password>`).

1. [Add](/en/networks/vnet/operations/manage-floating-ip#adding_floating_ip_address_to_the_project) floating IP or [find](/en/networks/vnet/operations/manage-floating-ip#viewing_a_list_of_floating_ip_addresses) an existing unbound floating IP address.

   Write down this IP address. It will be used to access the Docker registry.

## Installing the addon

<warn>

When installing the addon, [standard load balancers](/en/networks/vnet/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffs).

</warn>

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the addon:

- standard installation;
- installation on dedicated worker nodes.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of addons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#do_manual_scaling) for groups of worker nodes or [configure automatic scaling](../../../scale#configure_automatic_scaling_only_for_worker_node_groups) before install.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
</tablist>
<tabpanel>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `docker-registry` addon card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed.

   1. Edit the [addon setup code](#editing_the_addon_setup_code_during_installation).

      <warn>

      An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the provider](/en/manage/tools-for-using-services/terraform/quick-start) if it hasn't been done yet.
   1. Create a Terraform configuration file with data about the addon being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation_467c6636) list of addons available for installation.
      - Get the addon settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the addon parameters (for example, via CI), add the addon settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the desired values.

      <details>
         <summary>Example of specifying an addon</summary>

         ```hcl
         resource "vkcs_kubernetes_addon" "docker-registry" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.docker-registry.id
            namespace = "kube-system"
            configuration_values = templatefile("./docker-registry-all.yaml",{htpasswd = "<htpasswd password>", accessKey = "<access key for S3 account>", secretKey = "<secret key for S3 accoutn>", loadBalancerIP = "<floating IP>"})
         
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

1. [Get the data to access the registry](#connecting_to_registry).

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

      If there is no such group — [add it](../../../manage-node-group#add_worker_node_group).

   1. [Customise](../../../manage-node-group#customise_labels_and_taints) for this node group, if it hasn't already been done:

      - **Kubernetes labels**: key `addonNodes`, value `dedicated`.
      - **Node taints**: effect `NoSchedule`, key `addonNodes`, value `dedicated`.

   </tabpanel>
   </tabs>

1. Install the addon:

   <tabs>
   <tablist>
   <tab>Personal account</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Go to [VK Cloud personal account](https://mcs.mail.ru/app/en).
   1. Select [project](/en/base/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the desired cluster.
   1. Go to **Addons** tab.
   1. If there are already installed addons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `docker-registry` addon card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the addon will be installed.

   1. Edit the [addon setup code](#editing_the_addon_setup_code_during_installation).

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

      Set this exception for the `tolerations` field.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for the `nodeSelector` field.

      </tabpanel>
      </tabs>

      <warn>

      An incorrectly set configuration code can lead to errors during installation or the addon is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the addon in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard addon installation. In the addon settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. [Get the data to access the registry](#connecting_to_registry).

</tabpanel>
</tabs>

## Editing the addon setup code during installation

<info>

- When editing the addon setup code, use the information [obtained earlier](#preparatory_steps).
- The full addon setup code along with the description of the fields is available on [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml).

</info>

Specify:

1. Details for authorization in the Docker registry:

   ```yaml
   secrets:
     htpasswd: "<login>:<encrypted password>"
   ```

1. Details for accessing the bucket for storing Docker images:

   ```yaml
   secrets:
     s3:
       secretRef: ""
       accessKey: "<Access Key ID>"
       secretKey: "<Secret Key>"
   ```

   ```yaml
   s3:
     bucket: <bucket name>
   ```

1. IP address for the load balancer through which access to the service will be provided:

   ```yaml
   service:
     name: registry
     type: LoadBalancer
     loadBalancerIP: <selected floating IP address>
   ```

After editing the addon code [continue installing the addon](#installing_the_addon).

## Connecting to registry

1. Write down the data that was used in the addon setup code when installing it:

   - Login.
   - Password.
   - The IP address of the registry. The Docker registry URL will look like this: `<IP address>:5000`.

1. [Connect](../../../../connect/docker-registry) to Docker Registry.
