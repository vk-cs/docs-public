As part of the [add-on](../../../../concepts/addons-and-settings/addons#jaeger) there is [Jaeger collector](https://www.jaegertracing.io/docs/latest/architecture/#collector), which requires storage to work. As a [storage backend](https://www.jaegertracing.io/docs/latest/deployment/#span-storage-backends) the Jaeger add-on from VK Cloud uses Elasticsearch, which is deployed in the form of several replicas.

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes.

Jaeger add-on [system requirements](../../../../concepts/addons-and-settings/addons#jaeger) depend on the selected number of Elasticsearch replicas and the cluster environment. The minimum number of replicas is two, the default is three. Their number can be changed during the standard installation or installation on dedicated worker nodes.

If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) for groups of worker nodes or [configure automatic scaling](../../../scale#autoscale_worker_nodes) before install.

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
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click on the **Add addon** button.
   1. Click the **Install addon** button on the `jaeger` add-on card.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed.

   1. Edit the [add-on settings code](#editing_addon_settings_code_during_installation) if:

      - you need a non-standard number of Elasticsearch replicas;
      - the master nodes and worker nodes are located in different availability zones.

      <warn>

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. (Optional) [Connect to the Query UI](../../../../connect/addons-ui).
1. (Optional) [Get to know the practical guide](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) for using Jaeger with the Hot R.O.D. microservice application, the manual shows:

   - Integration of OpenTelemetry into a microservice application so that it sends the data needed for query tracing to Jaeger.
   - Visualization and interpretation of the data collected by Jaeger using the Query UI.

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
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `jaeger` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed.

   1. Edit the [add-on settings code](#editing_addon_settings_code_during_installation) if:

      - you need a non-standard number of Elasticsearch replicas;
      - the master nodes and worker nodes are located in different availability zones.

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

      Set this exception for fields:

      - `elasticsearch.tolerations`;
      - `agent.tolerations`;
      - `collector.tolerations`;
      - `query.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Set this selector for fields:

      - `elasticsearch.nodeSelector`;
      - `agent.nodeSelector`;
      - `collector.nodeSelector`;
      - `query.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

      </warn>

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. (Optional) [Connect to the Query UI](../../../../connect/addons-ui).
1. (Optional) [Get to know the practical guide](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) for using Jaeger with the Hot R.O.D. microservice application, the manual shows:

   - Integration of OpenTelemetry into a microservice application so that it sends the data needed for query tracing to Jaeger.
   - Visualization and interpretation of the data collected by Jaeger using the Query UI.

</tabpanel>
<tabpanel>

<info>

To install the add-on in this way, it is necessary that the master nodes and the worker nodes are in the same availability zone.

During quick installation, the add-on settings code is not edited. Three Elasticsearch replicas will be used as the storage backend.

If this does not suit you, perform a **standard installation** or **installation on dedicated worker nodes**.

</info>

1. Install the add-on:

   <tabs>
   <tablist>
   <tab>Management console</tab>
   </tablist>
   <tabpanel>

   1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
   1. Select [project](/en/tools-for-using-services/account/concepts/projects), where the cluster will be placed.
   1. Go to **Containers** → **Kubernetes clusters**.
   1. Click on the name of the required cluster.
   1. Go to **Addons** tab.
   1. If there are already installed add-ons in the cluster, click the **Add addon** button.
   1. Click the **Install addon** button on the `jaeger` add-on.
   1. Edit if necessary:

      - application name;
      - the name of the namespace where the add-on will be installed;

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   </tabs>

1. (Optional) [Connect to the Query UI](../../../../connect/addons-ui).
1. (Optional) [Get to know the practical guide](https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod) for using Jaeger with the Hot R.O.D. microservice application, the manual shows:

   - Integration of OpenTelemetry into a microservice application so that it sends the data needed for query tracing to Jaeger.
   - Visualization and interpretation of the data collected by Jaeger using the Query UI.

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for standard installation and installation on dedicated worker nodes.

The full add-on settings code along with the description of the fields is available on [GitHub](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger/values.yaml).

<err>

Do not delete the `podAnnotations.timestamp` fields or the values set in them. These fields are required for correct installation and operation of the add-on.

</err>

### Changing the number of Elasticsearch replicas

To set the required number of replicas, change the value of the field in the add-on settings code:

```yaml
elasticsearch:
  replicas: <number of replicas>
```

<warn>

Make sure that the number of worker nodes in the cluster is not less than the selected number of replicas.

</warn>

### Changing Elasticsearch storage settings

Elasticsearch replicas are hosted on the worker nodes of the cluster and use [persistent volumes](../../../../reference/pvs-and-pvcs) as a storage. By default, these persistent volumes are located in the same [availability zone](/en/intro/start/architecture#az) in which the cluster's master nodes are located. If the cluster worker nodes and persistent volumes are located in different availability zones, then replicas on these nodes will not be able to work with volumes.

To ensure that persistent volumes work with Elasticsearch replicas, set the [storage class](../../../../concepts/storage#pre_configured_storage_classes), the availability zone of which coincides with the availability zone of worker nodes:

```yaml
elasticsearch:
  volumeClaimTemplate:
    accessModes:
    - ReadWriteOnce
    storageClassName: "<name of the storage class>"
```

After editing the add-on code [continue installing the add-on](#installing_addon).
