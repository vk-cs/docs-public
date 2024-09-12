# {heading(Системные метрики ВМ)[id=ib_cloud_monitoring_vm]}

## {heading(Агент мониторинга в образе сервиса)[id=ib_cloud_monitoring_telegraf_image]}

<info>

Создавайте образ сервиса с установленным агентом мониторинга, чтобы развертывание инстанса сервиса не зависело от доступности программного пакета агента.

</info>

Чтобы собирать системные метрики ВМ и отправлять их в Cloud Monitoring:

1. В процессе создания образа сервиса (подробнее — в разделе [Создание образа сервиса](../../ibservice_add/ib_image_create)) установите агент мониторинга:

   1. Скачайте и установите в целевую ОС программный пакет:

      * [https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb](https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb) — для образов на базе Debian.
      * [https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm](https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm) — для образов на базе RHEL.

   1. В директории `/etc/telegraf/` создайте конфигурационный файл агента мониторинга `telegraf.conf`:

      ```txt
      # Общие настройки
      [agent]
        interval = "10s"
        round_interval = false
        metric_batch_size = 1000
        metric_buffer_limit = 10000
        collection_jitter = "2s"
        flush_interval = "10s"
        flush_jitter = "2s"
        logfile = ""

      # CPU-плагин
      [[inputs.cpu]]
        percpu = false
        totalcpu = true
        collect_cpu_time = false
        report_active = false
        fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest"]

      # Memory-плагин
      [[inputs.mem]]
        fieldpass = ["available_percent", "available", "used_percent", "used", "free", "cached", "dirty"]

      # Disk-плагин
      [[inputs.disk]]
        ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
        fieldpass = ["free", "used_percent", "inodes_free"]

      # DiskIO-плагин
      [[inputs.diskio]]
        fieldpass = ["reads", "writes", "read_bytes", "write_bytes", "read_time", "write_time", "io_time", "weighted_io_time"]

      # Net-плагин
      [[inputs.net]]
        fieldpass = ["bytes_sent", "bytes_recv", "packets_sent", "packets_recv", "err_in", "err_out", "drop_in", "drop_out"]

      # Информация из NetStat
      [[inputs.netstat]]
          fieldpass = ["tcp_established"]
      ```

      Подробнее о плагинах — в разделе [Стандартные метрики](/ru/monitoring-services/monitoring/concepts/mon-metrics).

1. В манифесте `plans/<PLAN_NAME>/deployment/deploy.tf` из состава сервисного пакета image-based приложения настройте отправку системных метрик ВМ в Cloud Monitoring:

   1. Получите данные для настройки output-плагина агента мониторинга:

      ```hcl
      data "ivkcs_monitoring_user" "write" {}
      ```

   1. В директории `/etc/telegraf/telegraf.d/` создайте файлы с дополнительными параметрами конфигурации для агента мониторинга и перезагрузите его:

      * `global_tags.conf` — глобальные теги.
      * `output.conf` — настройки output-плагина.

         Используйте ресурс `ivkcs_agent_exec`.

         <warn>

         Чтобы обеспечить корректную работу Cloud Monitoring, для настройки output-плагина используйте информацию из источника данных `ivkcs_monitoring_user`.

         </warn>

         {caption(Дополнительная конфигурация и перезагрузка агента мониторинга)[align=left;position=above]}
         ```hcl
         resource "ivkcs_agent_exec" "monitoring" {
           hosts = [local.hosts_name]
           name  = "setup_monitoring"
           uuid  = var.instance_uuid

           step {
             index   = 1
             type    = "bash"
             content = <<-EOC
         #!/bin/bash

         # Создание файла global_tags.conf
         cat <<EOT > /etc/telegraf/telegraf.d/global_tags.conf

         # Глобальные теги
         [global_tags]
           # ID ВМ
           vm_uuid = "${vkcs_compute_instance.compute.id}"
         EOT

         # Создание файла output.conf
         cat <<EOT > /etc/telegraf/telegraf.d/output.conf

         # Настройка output-плагина с помощью источника данных ivkcs_monitoring_user
         [[outputs.mcs_metrics]]
           user_id    = "${data.ivkcs_monitoring_user.write.user_id}"
           password   = "${data.ivkcs_monitoring_user.write.password}"
           project_id = "${data.ivkcs_monitoring_user.write.project_id}"
           auth_url   = "${data.ivkcs_monitoring_user.write.auth_url}"
           namespace = "${data.ivkcs_monitoring_user.write.namespace}"
           endpoint  = "${data.ivkcs_monitoring_user.write.endpoint}"
         EOT

         # Назначение владельца и группы на директорию telegraf.d и файлы в ней
         chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

         # Перезагрузка агента мониторинга и включение его в автозагузку хоста
         systemctl restart telegraf
         systemctl enable telegraf

         EOC

             options {
               timeout  = "5m"
               attempts = 1
             }
           }

           timeouts {
             create = "10m"
           }
         }
         ```
         {/caption}

## {heading(Агент мониторинга в манифесте Terraform)[id=monitoring_agent]}

Установка агента мониторинга через манифест Terraform зависит от доступности программного пакета на момент развертывания инстанса сервиса.

<warn>

Устанавливать агент мониторинга через манифест Terraform не рекомендуется. При добавлении новых image-based приложений в {var(sys1)} устанавливайте агент мониторинга в образ сервиса (подробнее —  в разделе {linkto(#ib_cloud_monitoring_telegraf_image)[text=%text]}).

</warn>

Чтобы собирать системные метрики ВМ и отправлять их в Cloud Monitoring, в манифесте `plans/<PLAN_NAME>/deployment/deploy.tf` из состава сервисного пакета image-based приложения:

1. Получите данные для настройки output-плагина агента мониторинга:

   ```hcl
   data "ivkcs_monitoring_user" "write" {}
   ```

1. Установите агент мониторинга, задайте конфигурацию в файле `/etc/telegraf/telegraf.conf` и перезагрузите его. Используйте ресурс `ivkcs_agent_exec`.

   <warn>

   Чтобы обеспечить корректную работу Cloud Monitoring, для настройки output-плагина используйте информацию из источника данных `ivkcs_monitoring_user`.

   </warn>

   {caption(Установка, конфигурация и перезагрузка агента мониторинга)[align=left;position=above]}
   ```hcl
   resource "ivkcs_agent_exec" "monitoring" {
     hosts = [local.hosts_name]
     name  = "setup_monitoring"
     uuid  = var.instance_uuid

     step {
       index   = 1
       type    = "bash"
       content = <<-EOC
   #!/bin/bash

   # Установка агента мониторинга
   dnf install -y <TELEGRAF_URL>

   # Создание файла telegraf.conf
   cat <<EOT > /etc/telegraf/telegraf.conf

   # Общие настройки
   [agent]
     interval = "10s"
     round_interval = false
     metric_batch_size = 1000
     metric_buffer_limit = 10000
     collection_jitter = "2s"
     flush_interval = "10s"
     flush_jitter = "2s"
     logfile = ""

   # Глобальные теги
   [global_tags]
     # ID ВМ
     vm_uuid = "${vkcs_compute_instance.compute.id}"

   # CPU-плагин
   [[inputs.cpu]]
     percpu = false
     totalcpu = true
     collect_cpu_time = false
     report_active = false
     fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest"]

   # Memory-плагин
   [[inputs.mem]]
     fieldpass = ["available_percent", "available", "used_percent", "used", "free", "cached", "dirty"]

   # Disk-плагин
   [[inputs.disk]]
     ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
     fieldpass = ["free", "used_percent", "inodes_free"]

   # DiskIO-плагин
   [[inputs.diskio]]
     fieldpass = ["reads", "writes", "read_bytes", "write_bytes", "read_time", "write_time", "io_time", "weighted_io_time"]

   # Net-плагин
   [[inputs.net]]
     fieldpass = ["bytes_sent", "bytes_recv", "packets_sent", "packets_recv", "err_in", "err_out", "drop_in", "drop_out"]

   # Информация из NetStat
   [[inputs.netstat]]
       fieldpass = ["tcp_established"]

   # Настройка output-плагина с помощью источника данных ivkcs_monitoring_user
   [[outputs.mcs_metrics]]
     user_id    = "${data.ivkcs_monitoring_user.write.user_id}"
     password   = "${data.ivkcs_monitoring_user.write.password}"
     project_id = "${data.ivkcs_monitoring_user.write.project_id}"
     auth_url   = "${data.ivkcs_monitoring_user.write.auth_url}"
     namespace = "${data.ivkcs_monitoring_user.write.namespace}"
     endpoint  = "${data.ivkcs_monitoring_user.write.endpoint}"
   EOT

   # Назначение владельца и группы на файл
   chown telegraf:telegraf /etc/telegraf/telegraf.conf

   # Перезагрузка агента мониторинга и включение его в автозагузку хоста
   systemctl restart telegraf
   systemctl enable telegraf

   EOC

       options {
         timeout  = "5m"
         attempts = 1
       }
     }

     timeouts {
       create = "10m"
     }
   }
   ```
   {/caption}

   Здесь `<TELEGRAF_URL>` — URL-адрес программного пакета агента мониторинга. Укажите значение в зависимости от базовой ОС:

   * `https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb` — для образов на базе Debian.
   * `https://mcs-monitoring.hb.bizmrg.com/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm` — для образов на базе RHEL.

      Подробнее о плагинах — в разделе [Стандартные метрики](/ru/monitoring-services/monitoring/concepts/mon-metrics).

      <info>

      В манифесте выше описана установка агента мониторинга для образов с пакетным менеджером DNF.

      </info>

   Для остальных образов скачайте программный пакет агента мониторинга и затем установите его с помощью соответствующей команды:

   * `yum localinstall` — для образов с пакетным менеджером YUM.
   * `dpkg -i` — для образов на базе Debian.
