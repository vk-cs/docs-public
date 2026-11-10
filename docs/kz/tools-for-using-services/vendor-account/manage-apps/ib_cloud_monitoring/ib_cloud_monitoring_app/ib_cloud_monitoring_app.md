# {heading(Image-based қосымшаның метрикалары)[id=ib_cloud_monitoring_app]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Метрикаларды жинау)[id=collect_metrics]}

ВМ жүйелік метрикаларына қоса image-based қосымшаның метрикаларын жинау үшін:

1. ВМ жүйелік метрикаларын жинауды баптаңыз (толығырақ — {linkto(../ib_cloud_monitoring_telegraf#ib_cloud_monitoring_telegraf)[text=%text]} бөлімінде).
1. Image-based қосымшаның сервистік пакетінің құрамындағы `plans/<PLAN_NAME>/deployment/deploy.tf` манифестінде prometheus-плагинді баптаңыз:

   1. `/etc/telegraf/telegraf.d` каталогінде `metrics.conf` файлын жасап, prometheus-плагинінің баптауларын көрсетіңіз.
   1. Егер `/etc/telegraf/telegraf.d/` каталогіне (барлық файлдарымен бірге) `telegraf` иесі мен `telegraf` тобы тағайындалмаса, оларды тағайындаңыз.

      {caption(Prometheus-плагинді баптау)[align=left;position=above]}
      ```hcl
      resource "ivkcs_agent_exec" "monitoring" {
      ...
      step {
          index   = 1
          type    = "bash"
          content = <<-EOC
      #!/bin/bash
      ...

      # metrics.conf файлын жасау
      cat <<EOT > /etc/telegraf/telegraf.d/metrics.conf

      # Prometheus-плагині
      [[inputs.prometheus]]
        name_override = "<NAME>"
        urls = ["<METRICS_URL>"]
        # Метрикаларды тегтерді сақтай отырып field key арқылы көрсету
        metric_version = 2
      EOT

      # telegraf.d каталогіне және ондағы файлдарға ие мен топты тағайындау
      chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

      EOC
      ...
        }
      ...
      }
      ```
      {/caption}

   Мұнда:

   * `<NAME>` — метрикалардың префиксі. Мән бос болмауы керек. Егер `name_override` параметрі көрсетілмесе, әдепкі мән — `prometheus` қолданылады.
   * `<METRICS_URL>` — image-based қосымша метрикаларды береді URL-мекенжайы. Мысалы, `http://localhost:8428/metrics`.

## {heading(Жиналған метрикалардың мысалы)[id=collected_metrics_example]}

Мысалы, image-based қосымша метрикаларды `http://localhost:8428/metrics` мекенжайы бойынша келесі форматта береді:

```txt
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 8.4326e-05
vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
vm_allowed_memory_bytes 4933135564
```

`metrics.conf` файлында prometheus-плагіні бапталған:

```txt
[[inputs.prometheus]]
  name_override = "victoria"
  urls = ["http://localhost:8428/metrics"]

# Метрикаларды тегтерді сақтай отырып field key арқылы көрсету
  metric_version = 2
```

Бұл жағдайда мониторинг агенті метрикаларды Cloud Monitoring-ке келесі форматта жібереді:

```txt
victoria_go_gc_duration_seconds{quantile="0"} 0
victoria_go_gc_duration_seconds{quantile="0.25"} 0
victoria_go_gc_duration_seconds{quantile="0.5"} 0
victoria_go_gc_duration_seconds{quantile="0.75"} 0
victoria_go_gc_duration_seconds{quantile="1"} 8.4326e-05
victoria_vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
victoria_vm_allowed_memory_bytes 4933135564
```