# {heading(ВМ жүйелік метрикалары)[id=ib_cloud_monitoring_vm]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

ВМ жүйелік метрикаларын жинау және оларды Cloud Monitoring жүйесіне жіберу үшін:

1. Сервис бейнесін жасау процесінде (толығырақ — [Сервис бейнесін жасау](../../ibservice_add/ib_image_create) бөлімінде) мониторинг агентін орнатыңыз:

   1. Бағдарламалық пакетті жүктеп, мақсатты ОС-ге орнатыңыз:

      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb) — Debian негізіндегі бейнелер үшін.
      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm) — RHEL негізіндегі бейнелер үшін.

   1. `/etc/telegraf/` каталогінде мониторинг агентінің `telegraf.conf` конфигурациялық файлын жасаңыз:

      ```txt
      # Жалпы баптаулар
      [agent]
        interval = "10s"
        round_interval = false
        metric_batch_size = 1000
        metric_buffer_limit = 10000
        collection_jitter = "2s"
        flush_interval = "10s"
        flush_jitter = "2s"
        logfile = ""
      # CPU-плагині
      [[inputs.cpu]]
        percpu = false
        totalcpu = true
        collect_cpu_time = false
        report_active = false
        fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest"]
      # Memory-плагині
      [[inputs.mem]]
        fieldpass = ["available_percent", "available", "used_percent", "used", "free", "cached", "dirty"]
      # Disk-плагині
      [[inputs.disk]]
        ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
        fieldpass = ["free", "used_percent", "inodes_free"]
      # DiskIO-плагині
      [[inputs.diskio]]
        fieldpass = ["reads", "writes", "read_bytes", "write_bytes", "read_time", "write_time", "io_time", "weighted_io_time"]
      # Net-плагині
      [[inputs.net]]
        fieldpass = ["bytes_sent", "bytes_recv", "packets_sent", "packets_recv", "err_in", "err_out", "drop_in", "drop_out"]
      # NetStat ақпараты
      [[inputs.netstat]]
          fieldpass = ["tcp_established"]
      ```

      Плагиндер туралы толығырақ — [Стандартты метрикалар](/kz/monitoring-services/monitoring/concepts/mon-metrics) бөлімінде.

1. Image-based қосымшасының сервис пакетінің құрамындағы `plans/<PLAN_NAME>/deployment/deploy.tf` манифестінде ВМ жүйелік метрикаларын Cloud Monitoring жүйесіне жібруді баптаңыз:

   1. Мониторинг агентінің output-плагинін баптау үшін деректерді алыңыз:

      ```hcl
      data "ivkcs_monitoring_user" "write" {}
      ```

   1. `/etc/telegraf/telegraf.d/` каталогінде мониторинг агентінің қосымша конфигурация параметрлері бар файлдарды жасап, оны қайта жүктеңіз:

      * `global_tags.conf` — глобальды тегтер.
      * `output.conf` — output-плагинінің баптаулары.

         `ivkcs_agent_exec` ресурсын пайдаланыңыз.

         {note:warn}

         Cloud Monitoring дұрыс жұмыс істеуін қамтамасыз ету үшін output-плагинін баптау кезінде `ivkcs_monitoring_user` деректер көзіндегі ақпаратты пайдаланыңыз.

         {/note}

         {caption(Мониторинг агентінің қосымша конфигурациясы және қайта жүктелуі)[align=left;position=above]}
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
         # global_tags.conf файлын жасау
         cat <<EOT > /etc/telegraf/telegraf.d/global_tags.conf

         # Глобальды тегтер
         [global_tags]

           # ВМ ID
           vm_uuid = "${vkcs_compute_instance.compute.id}"
         EOT

         # output.conf файлын жасау
         cat <<EOT > /etc/telegraf/telegraf.d/output.conf

         # ivkcs_monitoring_user деректер көзі арқылы output-плагинін баптау
         [[outputs.mcs_metrics]]
           user_id    = "${data.ivkcs_monitoring_user.write.user_id}"
           password   = "${data.ivkcs_monitoring_user.write.password}"
           project_id = "${data.ivkcs_monitoring_user.write.project_id}"
           auth_url   = "${data.ivkcs_monitoring_user.write.auth_url}"
           namespace = "${data.ivkcs_monitoring_user.write.namespace}"
           endpoint  = "${data.ivkcs_monitoring_user.write.endpoint}"
         EOT

         # telegraf.d каталогіне және ондағы файлдарға иеленуші мен топты тағайындау
         chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

         # Мониторинг агентін қайта жүктеу және оны хосттың автожүктемесіне қосу
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