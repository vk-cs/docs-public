## {heading(Installing add-on)[id=installing_addon]}

Only [standard installation](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) is available for the add-on.

The add-on will be installed as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) controller on all nodes in the cluster, including master nodes.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

<tabpanel>
   <tabs>
   <tablist>
   <tab>Management console</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/) your VK Cloud management console.
   1. Select the project where the required cluster is located.
   1. Go to **Containers → Kubernetes Clusters**.
   1. Click the name of the cluster.
   1. Go to the **Addons** tab.
   1. If the cluster already has add-ons installed, click **Add Addon**.
   1. Click **Install** on the `fluent-bit` add-on card.
   1. Select the required add-on version from the drop-down list.
   1. Click **Install addon**.
   1. (Optional) Edit:

      - The selected version
      - The application name
      - The namespace where the add-on will be installed

   1. Edit the [add-on settings code](#editing_addon_settings_code_during_installation): in the `Output` section set the parameters of logs delivery to the selected service. Leave other parameters at your discretion.

        <warn>

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   1. [Install Terraform and configure the environment](/en/tools-for-using-services/terraform/quick-start), if it is not already done.
   1. Add to your Terraform configuration files that describe the cluster the following resource and data sources:

      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md) resource
      - The [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source
      - The [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md) data source

      If necessary, adapt the given examples of the resource and the data sources usage to your task and Terraform configuration. For example, you can edit the add-on settings code by changing the `vkcs_kubernetes_addon` resource.

      <warn>
      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.
      </warn>

   1. Make sure the configuration files are correct and contain the necessary changes:

      ```bash
      terraform validate && terraform plan
      ```

   1. Apply the changes:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

</tabpanel>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

The full add-on settings code along with the description of the fields is available:

- In your management console.
- In the `configuration_values` attribute from the [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) data source if Terraform is used.

Installation of the add-on is impossible without editing the settings code. It is required to set the parameters of log delivery:

1. In the `Output` section of the code, set the delivery parameters to the selected service.

   <details>

   <summary>Example for configuring log delivery to Elasticsearch</summary>

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name es
         Match k8s.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix k8s
         Logstash_Prefix_Key $kubernetes['pod_name']
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On

      [OUTPUT]
         Name es
         Match host.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix host
         Logstash_Prefix_Key $_HOSTNAME
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On
   ```
   See the [official documentation](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch) for details on parameters for Elasticsearch.

   </details>

   <details>

   <summary>Example for configuring log delivery to Loki</summary>

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match k8s.*
         labels source=kubernetes, pod=$kubernetes['pod_name'], namespace=$kubernetes['namespace_name']

      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match host.*
         labels source=systemd, host=$_HOSTNAME, service=$_SYSTEMD_UNIT
   ```

   See the [official Fluent Bit documentation](https://docs.fluentbit.io/manual/pipeline/outputs/loki) for details on parameters for Loki.

   </details>

1. (Optional) Edit other parameters of the settings code. Read more about configuration file parameters in the [official Fluent Bit documentation](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file). Also, an example of the Fluent Bit settings code is available on [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml).

   <warn>

   Do not delete fields that are required for correct installation and operation of the add-on, as well as the values set in these fields.

   Comments in the add-on settings code allow you to find such fields.

   </warn>

1. When you have finished editing the code, [continue installing the add-on](#installing_addon).

You can read more about the pipeline in the [official documentation](https://docs.fluentbit.io/manual/pipeline).
