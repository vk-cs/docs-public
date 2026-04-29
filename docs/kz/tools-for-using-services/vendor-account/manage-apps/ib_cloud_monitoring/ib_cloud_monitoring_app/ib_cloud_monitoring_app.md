{include(/kz/_includes/_translated_by_ai.md)}

# {heading(Image-based қолданбаның метрикалары)[id=ib_cloud_monitoring_app]}

## {heading(Метрикаларды жинау)[id=collect_metrics]}

ВМ-нің жүйелік метрикаларына қосымша image-based қолданбаның метрикаларын жинау үшін:

1. ВМ-нің жүйелік метрикаларын жинауды баптаңыз (толығырақ — {linkto(../ib_cloud_monitoring_telegraf#ib_cloud_monitoring_telegraf)[text=%text]} бөлімінде).
1. Image-based қолданбаның сервистік пакетінің құрамындағы `plans/<PLAN_NAME>/deployment/deploy.tf` манифестінде prometheus-плагинін баптаңыз:

   1. `/etc/telegraf/telegraf.d` директориясында `metrics.conf` файлын жасап, prometheus-плагинінің баптауларын көрсетіңіз.
   1. Егер `/etc/telegraf/telegraf.d/` директориясына (ондағы барлық файлдармен бірге) `telegraf` иесі мен `telegraf` тобы тағайындалмаған болса, оларды тағайындаңыз.

      {caption(prometheus-плагинін баптау)[align=left;position=above]}
      ```hcl
      resource "ivkcs_agent_exec" "monitoring" {
      ...
      step {
          index   = 1
          type    = "bash"
          content = <<-EOC
      #!/bin/bash
      ...
      # Создание файла metrics.conf
      cat <<EOT > /etc/telegraf/telegraf.d/metrics.conf

      # Prometheus-плагин
      [[inputs.prometheus]]
        name_override = "<NAME>"
        urls = ["<METRICS_URL>"]
        # Представление метрик через field key с сохранением тегов
        metric_version = 2
      EOT

      # Назначение владельца и группы на директорию telegraf.d и файлы в ней
      chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

      EOC
      ...
        }
      ...
      }
      ```
      {/caption}

   Мұнда:

   * `<NAME>` — метрикалар префиксі. Мән бос болмауы тиіс. Егер `name_override` параметрі көрсетілмесе, әдепкі мән — `prometheus` қолданылады.
   * `<METRICS_URL>` — image-based қолданба метрикаларды беретін URL-мекенжай. Мысалы, `http://localhost:8428/metrics`.

## {heading(Жиналған метрикалардың мысалы)[id=collected_metrics_example]}

Мысалы, image-based қолданба `http://localhost:8428/metrics` мекенжайы бойынша метрикаларды мына форматта береді:

```txt
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 8.4326e-05
vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
vm_allowed_memory_bytes 4933135564
```

`metrics.conf` файлында prometheus-плагині бапталған:

```txt
[[inputs.prometheus]]
  name_override = "victoria"
  urls = ["http://localhost:8428/metrics"]
  # Представление метрик через field key с сохранением тегов
  metric_version = 2
```

Бұл жағдайда мониторинг агенті метрикаларды Cloud Monitoring-ке мына форматта жібереді:

```txt
victoria_go_gc_duration_seconds{quantile="0"} 0
victoria_go_gc_duration_seconds{quantile="0.25"} 0
victoria_go_gc_duration_seconds{quantile="0.5"} 0
victoria_go_gc_duration_seconds{quantile="0.75"} 0
victoria_go_gc_duration_seconds{quantile="1"} 8.4326e-05
victoria_vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
victoria_vm_allowed_memory_bytes 4933135564
```
