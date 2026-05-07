# {heading(ВМ жүйелік метрикалары)[id=ib_cloud_monitoring_vm]}

{include(/kz/_includes/_translated_by_ai.md)}

ВМ жүйелік метрикаларын жинап, оларды Cloud Monitoring-ке жіберу үшін:

1. Сервис образын жасау барысында (толығырақ — [Сервис образын жасау](../../ibservice_add/ib_image_create) бөлімінде) мониторинг агентін орнатыңыз:

   1. Мақсатты ОС-қа бағдарламалық пакетті жүктеп, орнатыңыз:

      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb) — Debian негізіндегі образдар үшін.
      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm) — RHEL негізіндегі образдар үшін.

   1. `/etc/telegraf/` директориясында мониторинг агентінің `telegraf.conf` конфигурациялық файлын жасаңыз:

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

      Плагиндер туралы толығырақ — [Стандартты метрикалар](/kz/monitoring-services/monitoring/concepts/mon-metrics) бөлімінде.

1. Image-based қолданбаның сервистік пакетінің құрамындағы `plans/<PLAN_NAME>/deployment/deploy.tf` манифестінде ВМ жүйелік метрикаларын Cloud Monitoring-ке жіберуді баптаңыз:

   1. Мониторинг агентінің output-плагинін баптауға арналған деректерді алыңыз:

      ```hcl
      data "ivkcs_monitoring_user" "write" {}
      ```

   1. `/etc/telegraf/telegraf.d/` директориясында мониторинг агентіне арналған конфигурацияның қосымша параметрлері бар файлдарды жасап, оны қайта жүктеңіз:

      * `global_tags.conf` — жаһандық тегтер.
      * `output.conf` — output-плагин баптаулары.

         `ivkcs_agent_exec` ресурсін пайдаланыңыз.

         {note:warn}

         Cloud Monitoring-тің дұрыс жұмыс істеуін қамтамасыз ету үшін output-плагинді баптау кезінде `ivkcs_monitoring_user` дереккөзінен алынған ақпаратты пайдаланыңыз.

         {/note}

         {caption(Қосымша конфигурация және мониторинг агентін қайта жүктеу)[align=left;position=above]}
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
