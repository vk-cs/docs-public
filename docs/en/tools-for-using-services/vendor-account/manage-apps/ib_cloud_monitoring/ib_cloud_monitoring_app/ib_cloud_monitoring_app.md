# {heading(Metrics of an image-based application)[id=ib_cloud_monitoring_app]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Collecting metrics)[id=collect_metrics]}

To collect metrics of an image-based application in addition to VM system metrics:

1. Configure collection of VM system metrics (for details, see the section {linkto(../ib_cloud_monitoring_telegraf#ib_cloud_monitoring_telegraf)[text=%text]}).
1. In the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest included in the service package of the image-based application, configure the prometheus plugin:

   1. In the `/etc/telegraf/telegraf.d` directory, create a `metrics.conf` file and set the prometheus plugin settings.
   1. If the `/etc/telegraf/telegraf.d/` directory (including all files) does not have the `telegraf` owner and the `telegraf` group assigned, assign them.

      {caption(Prometheus plugin configuration)[align=left;position=above]}
      ```hcl
      resource "ivkcs_agent_exec" "monitoring" {
      ...
      step {
          index   = 1
          type    = "bash"
          content = <<-EOC
      #!/bin/bash
      ...

      # Creating the metrics.conf file
      cat <<EOT > /etc/telegraf/telegraf.d/metrics.conf

      # Prometheus plugin
      [[inputs.prometheus]]
        name_override = "<NAME>"
        urls = ["<METRICS_URL>"]

        # Representing metrics via field key with tag preservation
        metric_version = 2
      EOT

      # Assigning the owner and group to the telegraf.d directory and its files
      chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

      EOC
      ...
        }
      ...
      }
      ```
      {/caption}

   Here:

   * `<NAME>` — the prefix of the metrics. The value cannot be empty. If the `name_override` parameter is not set, the default value `prometheus` will be applied.
   * `<METRICS_URL>` — the URL from which the image-based application provides metrics. For example, `http://localhost:8428/metrics`.

## {heading(Example of collected metrics)[id=collected_metrics_example]}

For example, an image-based application provides metrics at `http://localhost:8428/metrics` in the format:

```txt
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 8.4326e-05
vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
vm_allowed_memory_bytes 4933135564
```

The prometheus plugin is configured in the `metrics.conf` file:

```txt
[[inputs.prometheus]]
  name_override = "victoria"
  urls = ["http://localhost:8428/metrics"]

# Representing metrics via field key with tag preservation
  metric_version = 2
```

In this case, the monitoring agent will send the metrics to Cloud Monitoring in the format:

```txt
victoria_go_gc_duration_seconds{quantile="0"} 0
victoria_go_gc_duration_seconds{quantile="0.25"} 0
victoria_go_gc_duration_seconds{quantile="0.5"} 0
victoria_go_gc_duration_seconds{quantile="0.75"} 0
victoria_go_gc_duration_seconds{quantile="1"} 8.4326e-05
victoria_vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
victoria_vm_allowed_memory_bytes 4933135564
```