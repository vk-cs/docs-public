# {heading(Метрики image-based приложения)[id=ib_cloud_monitoring_app]}

## {heading(Сбор метрик)[id=collect_metrics]}

Чтобы дополнительно к системным метрикам ВМ собирать метрики image-based приложения:

1. Настройте сбор системных метрик ВМ (подробнее — в разделе {linkto(../ib_cloud_monitoring_telegraf#ib_cloud_monitoring_telegraf)[text=%text]}).
1. В манифесте `plans/<PLAN_NAME>/deployment/deploy.tf` из состава сервисного пакета image-based приложения настройте prometheus-плагин:

   1. В директории `/etc/telegraf/telegraf.d` создайте файл `metrics.conf` и задайте настройки prometheus-плагина.
   1. Если на директорию `/etc/telegraf/telegraf.d/` (вместе со всеми файлами) не назначены владелец `telegraf` и группа `telegraf`, назначьте их.

      {caption(Настройка prometheus-плагина)[align=left;position=above]}
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

   Здесь:

   * `<NAME>` — префикс метрик. Значение не может быть пустым. Если параметр `name_override` не задан, будет применено значение по умолчанию — `prometheus`.
   * `<METRICS_URL>` — URL-адрес, по которому image-based приложение отдает метрики. Например, `http://localhost:8428/metrics`.

## {heading(Пример собранных метрик)[id=collected_metrics_example]}

Например, image-based приложение отдает метрики по адресу `http://localhost:8428/metrics` в формате:

```txt
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 8.4326e-05
vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
vm_allowed_memory_bytes 4933135564
```

В файле `metrics.conf` настроен prometheus-плагин:

```txt
[[inputs.prometheus]]
  name_override = "victoria"
  urls = ["http://localhost:8428/metrics"]
  # Представление метрик через field key с сохранением тегов
  metric_version = 2
```

В этом случае агент мониторинга передаст метрики в Cloud Monitoring в формате:

```txt
victoria_go_gc_duration_seconds{quantile="0"} 0
victoria_go_gc_duration_seconds{quantile="0.25"} 0
victoria_go_gc_duration_seconds{quantile="0.5"} 0
victoria_go_gc_duration_seconds{quantile="0.75"} 0
victoria_go_gc_duration_seconds{quantile="1"} 8.4326e-05
victoria_vm_app_version{version="victoria-metrics-20240301-000115-tags-v1.93.13-0-g26266a463", short_version="v1.93.13"} 1
victoria_vm_allowed_memory_bytes 4933135564
```
