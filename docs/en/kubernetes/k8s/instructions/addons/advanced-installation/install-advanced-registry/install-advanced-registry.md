## Preparatory steps

1. [Create](/en/storage/s3/instructions/buckets/create-bucket) in the object storage bucket, which will be used to store Docker images.

   When creating, select:

   - **Storage class:** `Hotbox`.
   - **Default ACL:** `private`.

   Write down the bucket's name.

1. Add a key to access this bucket:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects).
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

   ```console
   docker run --entrypoint htpasswd registry:2.7.0 -Bbn <login> <password>
   ```

   Write down the output of the command (in the format `<login>:<encrypted password>`).

1. [Add](/en/networks/vnet/instructions/ip/floating-ip#adding_floating_ip_address_to_the_project) floating IP or [find](/en/networks/vnet/instructions/ip/floating-ip#viewing_a_list_of_floating_ip_addresses) an existing unbound floating IP address.

   Write down this IP address. It will be used to access the Docker registry.

## {heading(Installing add-on)[id=installing_addon]}

{note:warn}

When installing the add-on, [standard load balancers](/en/networks/balancing/concepts/load-balancer#types_of_load_balancers) will be created for them.

Usage of this load balancer is [charged](/en/networks/vnet/tariffication).

{/note}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on:

- standard installation;
- installation on dedicated worker nodes.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

<tabs>
<tablist>
<tab>Standard installation</tab>
<tab>Installation on dedicated worker nodes</tab>
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
   1. Click the **Install addon** button on the `docker-registry` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed.

   1. Edit the [add-on settings code](#editing_addon_settings_code_during_installation).

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start) if it is not already done.
   1. Create a Terraform configuration file with data about the add-on being installed in the `vkcs_kubernetes_addon` block:

      - [Get](../../manage-addons#addons_available_for_installation) list of add-ons available for installation.
      - Get the add-on settings from the `configuration_values` parameter using the data source [vcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Optional) To dynamically change the add-on parameters (for example, via CI), add the add-on settings to a separate yaml file. Use the [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile) function to add the required values.

      {cut(Example of specifying an add-on)}

         ```hcl
         resource "vkcs_kubernetes_addon" "docker-registry" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.docker-registry.id
            namespace = "kube-system"
            configuration_values = templatefile("./docker-registry-all.yaml",{htpasswd = "<htpasswd password>", accessKey = "<access key for S3 account>", secretKey = "<secret key for S3 account>", loadBalancerIP = "<floating IP>"})

            depends_on = [
               vkcs_kubernetes_node_group.default_ng
            ]
         }
         ```

      {/cut}

   1. Check the Terraform configuration file for correctness:

      ```console
      terraform validate
      ```

   1. Check out the planned changes:

      ```console
      terraform plan
      ```

   1. Apply the changes:

      ```console
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. [Get the data to access the registry](#connecting_to_registry).

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

   1. [Customise](../../../manage-node-group#labels_taints) for this node group, if it hasn't already been done:

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
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `docker-registry` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed.

   1. Edit the [add-on settings code](#editing_addon_settings_code_during_installation).

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

      {note:warn}

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   Use the instructions from the standard add-on installation. In the add-on settings, set the necessary exceptions (tolerations) and node selectors (nodeSelector).

   </tabpanel>
   </tabs>

1. [Get the data to access the registry](#connecting_to_registry).

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

{note:info}

- When editing the add-on settings code, use the information [obtained earlier](#preparatory_steps).
- The full add-on settings code along with the description of the fields is available on [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml).

{/note}

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

After editing the add-on code [continue installing the add-on](#installing_addon).

## Connecting to registry

1. Write down the data that was used in the add-on settings code when installing it:

   - Login.
   - Password.
   - The IP address of the registry. The Docker registry URL will look like this: `<IP address>:5000`.

1. [Connect](../../../../connect/docker-registry) to Docker Registry.
