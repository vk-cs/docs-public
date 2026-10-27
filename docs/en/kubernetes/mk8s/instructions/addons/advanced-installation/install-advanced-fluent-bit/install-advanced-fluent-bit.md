## {heading(Before you start)[id=prep]}

{include(/en/_includes/_addon-prep.md)}

## {heading(Install the add-on)[id=installing_addon]}

For the [Fluent Bit](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#fluent_bit) add-on, only the [standard installation option](/en/kubernetes/mk8s/concepts/addons-and-settings/addons#features_of_installing_addons) is available.

The add-on is installed as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) to all nodes of the cluster, including the master nodes.

{tabs}

{tab(Management console)}

 1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
 1. Select the project where the required cluster is located.
 1. Go to **Kubernetes Clusters → Kubernetes Clusters**.
 1. Click the name of the required cluster.
 1. Go to the **Addons** tab.
 1. Click the **Install** button on the `fluent-bit` add-on card, then click **Install addon**.
 1. (Optional) Edit:

     - the selected version
     - the application name
     - the namespace to install the add-on in

 1. Edit the [add-on settings code](#edit-code): in the `Output` section, specify the parameters for log delivery to the selected service. Leave the other parameters unchanged or edit them as needed.

     {note:warn}
     If you configure the add-on code incorrectly, the installation might fail or the add-on might not work.
     {/note}

 1. Click the **Install addon** button.

    Installation of the add-on in the cluster starts. This process can take a while.

{/tab}

{/tabs}

## {heading(Edit the add-on settings code during installation)[id=edit-code]}

The full add-on settings code with field descriptions is available in the management console.

Before you install the add-on, edit the settings code: you must specify the log delivery parameters.

1. In the `Output` section of the code, specify the delivery parameters for the selected service.

   {cut(Example of log delivery configuration for Elasticsearch)}

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
   For details on Elasticsearch parameters, see the [official documentation](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch).

   {/cut}

   {cut(Example of log delivery configuration for Loki)}

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

   For details on Loki parameters, see the [official Fluent Bit documentation](https://docs.fluentbit.io/manual/pipeline/outputs/loki).

   {/cut}

1. (Optional) Edit other parameters of the settings code. For details on configuration file parameters, see the [official Fluent Bit documentation](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file). An example of the Fluent Bit settings code is also available on [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml).

   {note:warn}
   Do not delete the fields required for the correct installation and operation of the add-on, or the values set in these fields.

   The add-on settings code contains comments that help you find such fields.
   {/note}

1. After you edit the code, [continue the installation](#installing_addon).

For details on the pipeline, see the [official documentation](https://docs.fluentbit.io/manual/pipeline).
