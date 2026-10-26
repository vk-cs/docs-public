# {heading(VM system metrics)[id=ib_cloud_monitoring_vm]}

{include(/en/_includes/_translated_by_ai_en.md)}

To collect VM system metrics and send them to Cloud Monitoring:

1. During the service image creation process (for more details, see the section [Creating a service image](../../ibservice_add/ib_image_create)), install the monitoring agent:

   1. Download and install the software package into the target OS:

      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf_1.28.5-vkcs.1-1_amd64.deb) — for Debian-based images.
      * [https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm](https://mcs-monitoring.hb.ru-msk.vkcloud-storage.ru/telegraf/telegraf-1.28.5-vkcs.1-1.x86_64.rpm) — for RHEL-based images.

   1. In the `/etc/telegraf/` directory, create the monitoring agent configuration file `telegraf.conf`:

      ```txt

# General settings
      [agent]
        interval = "10s"
        round_interval = false
        metric_batch_size = 1000
        metric_buffer_limit = 10000
        collection_jitter = "2s"
        flush_interval = "10s"
        flush_jitter = "2s"
        logfile = ""

# CPU plugin
      [[inputs.cpu]]
        percpu = false
        totalcpu = true
        collect_cpu_time = false
        report_active = false
        fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest"]

# Memory plugin
      [[inputs.mem]]
        fieldpass = ["available_percent", "available", "used_percent", "used", "free", "cached", "dirty"]

# Disk plugin
      [[inputs.disk]]
        ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
        fieldpass = ["free", "used_percent", "inodes_free"]

# DiskIO plugin
      [[inputs.diskio]]
        fieldpass = ["reads", "writes", "read_bytes", "write_bytes", "read_time", "write_time", "io_time", "weighted_io_time"]

# Net plugin
      [[inputs.net]]
        fieldpass = ["bytes_sent", "bytes_recv", "packets_sent", "packets_recv", "err_in", "err_out", "drop_in", "drop_out"]

# NetStat information
      [[inputs.netstat]]
          fieldpass = ["tcp_established"]
      ```

      For more information about the plugins, see the section [Standard metrics](/en/monitoring-services/monitoring/concepts/mon-metrics).

1. In the `plans/<PLAN_NAME>/deployment/deploy.tf` manifest included in the service package of the image-based application, configure sending VM system metrics to Cloud Monitoring:

   1. Obtain the data for configuring the monitoring agent output plugin:

      ```hcl
      data "ivkcs_monitoring_user" "write" {}
      ```

   1. In the `/etc/telegraf/telegraf.d/` directory, create files with additional configuration parameters for the monitoring agent and reload it:

      * `global_tags.conf` — global tags.
      * `output.conf` — output plugin settings.

         Use the `ivkcs_agent_exec` resource.

         {note:warn}

         To ensure correct operation of Cloud Monitoring, use the information from the `ivkcs_monitoring_user` data source to configure the output plugin.

         {/note}

         {caption(Additional configuration and reloading of the monitoring agent)[align=left;position=above]}
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

         # Creating the global_tags.conf file
         cat <<EOT > /etc/telegraf/telegraf.d/global_tags.conf

         # Global tags
         [global_tags]

           # VM ID
           vm_uuid = "${vkcs_compute_instance.compute.id}"
         EOT

         # Creating the output.conf file
         cat <<EOT > /etc/telegraf/telegraf.d/output.conf

         # Configuring the output plugin using the ivkcs_monitoring_user data source
         [[outputs.mcs_metrics]]
           user_id    = "${data.ivkcs_monitoring_user.write.user_id}"
           password   = "${data.ivkcs_monitoring_user.write.password}"
           project_id = "${data.ivkcs_monitoring_user.write.project_id}"
           auth_url   = "${data.ivkcs_monitoring_user.write.auth_url}"
           namespace = "${data.ivkcs_monitoring_user.write.namespace}"
           endpoint  = "${data.ivkcs_monitoring_user.write.endpoint}"
         EOT

         # Assigning the owner and group to the telegraf.d directory and the files in it
         chown -R telegraf:telegraf /etc/telegraf/telegraf.d/

         # Reloading the monitoring agent and adding it to the host autostart
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