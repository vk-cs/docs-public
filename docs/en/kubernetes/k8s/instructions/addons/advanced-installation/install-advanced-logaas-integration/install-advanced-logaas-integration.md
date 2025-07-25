## Preparatory steps

Connect the [Cloud Logging](/en/monitoring-services/logging) service to the project, if it has not been done yet. To do this, [contact technical support](mailto:support@mcs.mail.ru).

## {heading(Installing add-on)[id=installing_addon]}

[Several installation options](../../../../concepts/addons-and-settings/addons#features_of_installing_addons) are available for the add-on:

- standard installation;
- quick installation.

Regardless of the selected installation option, the add-on will be installed as [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) to all nodes of the cluster, including the master nodes.

Take into account the total [maximum system requirements](../../../../concepts/addons-and-settings/addons) of add-ons that will be placed on groups of worker nodes. If necessary, [perform manual scaling](../../../scale#scale_worker_nodes) groups of worker nodes or [set up automatic scaling](../../../scale#autoscale_worker_nodes) before installation.

<tabs>
<tablist>
<tab>Standard installation</tab>
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
   1. Click the **Install addon** button on the `logaas-integration` add-on card.
   1. Select the required add-on version from the drop-down list.
   1. Edit if necessary:

      - the selected version;
      - application name;
      - the name of the namespace where the add-on will be installed;
      - [add-on settings code](#editing_addon_settings_code_during_installation).

        {note:warn}

        An incorrectly specified settings code can lead to errors during installation or the add-on is inoperable.

        {/note}

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   [Documentation of the Terraform provider VK Cloud](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/index.md) contains an example of using the resource [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md), which describes a single add-on. Data sources related to add-ons are also documented:

   - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
   - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   For more information about working with the provider, see [Terraform](/en/tools-for-using-services/terraform).

   </tabpanel>
   </tabs>

1. (Optional) [View logs](/en/monitoring-services/logging/instructions/view-logs) in the Cloud Logging service to make sure that the add-on is working properly.

</tabpanel>
<tabpanel>

{note:info}

During quick installation, the add-on settings code is not edited.

If this does not suit you, perform the **standard installation**.

{/note}

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
   1. Click the **Install** button on the `logaas-integration` add-on card.
   1. Select the necessary add-on version from the drop-down list.
   1. Click the **Install addon** button.
   1. Edit if necessary:

      - selected version;
      - application name;
      - the name of the namespace where the add-on will be installed.

   1. Click the **Install addon** button.

      The installation of the add-on in the cluster will begin. This process can take a long time.

   </tabpanel>
   <tabpanel>

   [Documentation of the Terraform provider VK Cloud](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/index.md) contains an example of using the resource [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md), which describes a single add-on. Data sources related to add-ons are also documented:

   - [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
   - [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   For more information about working with the provider, see [Terraform](/en/tools-for-using-services/terraform).

   </tabpanel>
   </tabs>

1. (Optional) [View logs](/en/monitoring-services/logging/instructions/view-logs) in the Cloud Logging service to make sure that the add-on is working properly.

</tabpanel>
</tabs>

## {heading(Editing add-on settings code during installation)[id=editing_addon_settings_code_during_installation]}

Editing the add-on code is applicable for a standard installation.

The full add-on settings code along with the description of the fields is available:

- in your management console;
- in the `configuration_values` attribute from the data source [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md) if Terraform is used.

Also on [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml ) the Fluent Bit settings code is available, which serves as the basis for this add-on.

{note:warn}

Do not delete the fields that are required for the correct installation and operation of the add-on, or the values specified in these fields.

There are comments in the add-on settings code that allow you to find such fields.

{/note}

Read more about [pipeline](https://docs.fluentbit.io/manual/pipeline) and [configuration file settings](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file) in the official documentation of Fluent Bit.

### Fine-tuning the behavior of the add-on when working with different severity levels

Before sending logs to the Cloud Logging service, the add-on performs the following actions:

1. Determines the severity level of individual log entries. This is done using Fluent Bit [parsers](https://docs.fluentbit.io/manual/pipeline/filters/parser).

   {cut(Table of supported levels)}

   The levels are sorted in ascending order of severity.

   <!-- prettier-ignore -->
   | Level | The numerical equivalent | Decoding                     |
   | ------- | ------------------- | ------------------------------- |
   | `DEBUG` | 4                   | Debugging messages            |
   | `INFO`  | 3                   | Informational messages        |
   | `WARN`  | 2                   | Warning messages       |
   | `ERROR` | 1                   | Error messages            |
   | `FATAL` | 0                   | Critical error messages |

   {/cut}

1. Adds additional metadata to the logs, which makes it easier to work with Cloud Containers cluster logs (for example, searching for the necessary logs in Cloud Logging). Special Fluent Bit filters are used for this, [written in Lua](https://docs.fluentbit.io/manual/pipeline/filters/lua). This metadata contains, among other things, the severity level of logged events.

   {cut(Learn more about metadata for determining the source of logs)}

   For each log entry, identifiers are set that allow you to determine the source of logs when using Cloud Logging:

   - Resource group ID (`group-id`): the name of the cluster.
   - The resource ID (`stream-id`) in one of the formats:

     - For [kubelet component](https://kubernetes.io/docs/concepts/overview/components/#kubelet): `<cluster node name>.<full component name>`.

       **Example:**

       ```text
       my-cluster-node-0.kubelet.service
       ```

     - For [pod](../../../../reference/pods): `<namespace>.<name>`.

       First, the name is searched in the following labels:

       - `app.kubernetes.io/instance` ([more about label](https://kubernetes.io/docs/reference/labels-annotations-taints/#app-kubernetes-io-instance));
       - `app.kubernetes.io/name` ([more about label](https://kubernetes.io/docs/reference/labels-annotations-taints/#app-kubernetes-io-name));
       - `app`;
       - `k8s-app`.

       If there are no such labels, then the name of the pod is used.

       **Example:**

       Let:

       - In the namespace `kube-system` there is a pod named `kube-controller-manager-my-cluster-master-0`.
       - The label `k8s-app=kube-controller-manager` is set for this pod.

       Then the resource identifier will look like:

       ```text
       kube-system.kube-controller-manager
       ```

   {/cut}

   {cut(Learn more about other metadata with additional information about logs)}

   Metadata fields with additional information about the logged event are added to log entries, which allows you to search in Cloud Logging, including by log metadata:

   - `node_name`: the name of the cluster node where the kubelet service or pod is located.
   - `severity`: the severity level of the logged event in text form.
   - `severity_num`: the severity level of the logged event in number form.
   - All fields of the JSON message: if logs are written in JSON format, then all fields of the JSON message, except `msg`, are added as metadata.

   {/cut}

You can fine-tune the behavior of the add-on when working with severity levels using:

<tabs>
<tablist>
<tab>Custom filters</tab>
<tab>Custom patterns</tab>
</tablist>
<tabpanel>

Set one or more rules for custom `CustomFilter` filters in the add-on code so that only logs with the specified minimum severity level get into Cloud Logging. These rules can be configured at the level of a specific namespace and at the level of specific pods in the namespace:

<!-- prettier-ignore -->
```yaml
customFilter:
  - namespace: <namespace>
    rules: # One rule for the namespace
      - min_level: <letter designation of the minimum severity level>
  - namespace: <the name of another namespace>
    rules: # A few rules for the pods in the namespace
      - podprefix: <the prefix of the pod name>
        min_level: <letter designation of the minimum severity level>
      - podprefix: <the name of another namespace>
        min_level: <letter designation of the minimum severity level>
  - namespace: <the name of another namespace>
    rules: # A combination of namespace rules and pod rules
      - min_level: <letter designation of the minimum severity level>
      - podprefix: <the prefix of the pod name>
        min_level: <letter designation of the minimum severity level>
      - podprefix: <the prefix of the pod name>
        min_level: <letter designation of the minimum severity level>
```

It is the prefix that is configured for the pods so that you can receive logs from several replica pods that relate to the same [workload](https://kubernetes.io/docs/concepts/workloads/controllers/).

{cut(Examples)}

1. The only rule applies at the level of the `kube-system` namespace.

   Only those logs from this namespace that have a severity level of `WARN` or higher (`ERROR`, `FATAL`) will get into Cloud Logging.

1. The only rule applies at the level of the pods that are in the `default` namespace, and whose names begin with the prefix `test-pod`.

   Only those logs from these pods that have a severity level of `ERROR` or higher (`FATAL`) will get into Cloud Logging. Logs are not filtered at the `default` namespace level.

1. Several rules apply at the level of the `my-namespace` namespace and at the level of the `example-pod` prefixed pods that are located in this namespace.

   Only the listed logs will be included in Cloud Logging:

   - Logs from the namespace that do not belong to pods with the prefix `example-pod` and have a severity level of `ERROR` or higher (`FATAL`).
   - Logs from the pods with the prefix `example-pod`, which have a severity level of `WARN` or higher (`ERROR`, `FATAL`).

<!-- prettier-ignore -->
```yaml
customFilter:
  - namespace: kube-system
    rules:
      - min_level: WARN
  - namespace: default
    rules:
      - podprefix: test-pod
        min_level: ERROR
  - namespace: my-namespace
    rules:
      - min_level: ERROR
      - podprefix: example-pod
        min_level: WARN
```

{/cut}

</tabpanel>
<tabpanel>

Set one or more rules for custom `customRegexp` pattern in the add-on code to set the required severity level for logs bypassing the standard add-on mechanisms. If part of the log entry matches the specified Lua [pattern](https://www.lua.org/manual/5.4/manual.html#6.4.1), then this record is assigned the severity level specified in the rule. If there are no matches, then the record is assigned a severity level determined using the Fluent Bit parsers. This can be useful if the automatic level detection mechanism used in the add-on incorrectly determines the log level of a particular application.

These rules apply at the level of a certain namespace and at the level of certain pods in the namespace:

<!-- prettier-ignore -->
```yaml
customRegexp:
  - namespace: <namespace>
    rules:
    - levels: # One rule for a namespace: setting up multiple levels
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
  - namespace: <the name of another namespace>
    rules: # Several rules for the pods in the namespace: setting up multiple levels
    - podprefix: <the prefix of the pod name> # The first rule for pods
      levels:
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
    - podprefix: <prefix of the name of another pod> # The second rule for pods
      levels:
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
  - namespace: <the name of another namespace>
    rules:
    - levels: # The first rule for a namespace is to set up multiple levels
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
    - podprefix: <the prefix of the pod name> # The second rule for pods: setting up multiple levels
      levels:
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
      - level: <letter designation of the required severity level>
        reg_exp: "<Lua pattern>"
```

It is the prefix that is configured for the pods so that you can receive logs from several replica pods that relate to the same [workload](https://kubernetes.io/docs/concepts/workloads/controllers/).

{cut(Examples)}

1. The only rule applies at the level of the `kube-system` namespace.

   If part of the log entry from this namespace matches the specified pattern `[Ww]%d%d%d%d%s+`, then this entry will be assigned the `ERROR` severity level.

1. The only rule applies at the level of the pods that are in the `default` namespace, and whose names begin with the prefix `test-pod`.

   If a part of the log entry from these pods matches the specified pattern `this is a plain text message`, then this entry will be assigned the `WARN` severity level.

1. Several rules apply at the level of the `my-namespace` namespace and at the level of the `example-pod` prefixed pods that are located in this namespace.

   The severity levels will be assigned according to the following rules:

   - If a part of the log record from this namespace (which does not belong to the pods with the prefix `example-pod`) matches the specified pattern `[Ww]%s+`, then this record will be assigned the `ERROR` severity level.
   - If a part of the log record from the pods with the prefix `example-pod` matches the specified pattern `Debug trace`, then this record will be assigned the `DEBUG` severity level.

If no part of the log record matches the specified patterns, then such a record is assigned a severity level determined using Fluent Bit parsers.

<!-- prettier-ignore -->
```yaml
customRegexp:
  - namespace: kube-system
    rules:
    - levels:
      - level: ERROR
        reg_exp: "[Ww]%d%d%d%d%s+"
  - namespace: default
    rules:
    - podprefix: test-pod
      levels:
      - level: WARN
        reg_exp: "this is a plain text message"
  - namespace: my-namespace
    rules:
    - levels:
      - level: ERROR
        reg_exp: "[Ww]%s+"
    - podprefix: example-pod
      levels:
      - level: DEBUG
        reg_exp: "Debug trace"
```

{/cut}

</tabpanel>
</tabs>
