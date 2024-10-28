# {heading(Описание выходных параметров)[id=tf_manifest_output]}

Опишите выходные параметры, чтобы передать их пользователю по email после выполнения манифеста и развертывания сервиса.

Если выходной параметр содержит чувствительные данные, задайте атрибут `sensitive`. В этом случае данные выходного параметра будут переданы пользователю, но не будут сохранены в логи Terraform.

В выходных параметрах пользователю можно передать:

* IP-адрес созданной ВМ инстанса сервиса.

   {caption(Пример выходного параметра для IP-адреса ВМ)[align=left;position=above]}
   ```hcl
   # Вывод IP-адреса ВМ
   output "address" {
     description = "The host IP-address"
     value = vkcs_compute_instance.compute.access_ip_v4
   }
   ```
   {/caption}
* Пароли для первичной настройки инстанса сервиса, сгенерированные скриптом.

   {caption(Пример выходного параметра для результатов скрипта)[align=left;position=above]}
   ```hcl
   # Выполнение скрипта
   resource "ivkcs_agent_exec" "start" {
     hosts = [local.hosts_name]
     name  = "start"
     uuid  = var.instance_uuid
     step {
       index   = 1
       type    = "bash"
       content = pwgen 25 1
       options {
         timeout                = "10m"
         attempts               = 1
       }
     }

     depends_on = [
       vkcs_compute_instance.compute,
       vkcs_compute_volume_attach.attached,
     ]
   }

   # Запрос результатов скрипта
   data "ivkcs_agent_script_result" "password" {
     uuid  = var.instance_uuid
     host  = local.hosts_names[0]
     group = ivkcs_agent_exec.start.name
     index = 1

     depends_on = [
       ivkcs_agent_exec.start
     ]
   }

   # Вывод результатов скрипта
   output "password" {
     description = "password"
     value = data.ivkcs_agent_script_result.password.result
     sensitive = true
   }
   ```
   {/caption}
* Пароли для первичной настройки инстанса сервиса, сгенерированные с помощью ресурса `random_password`.

   {caption(Пример выходного параметра для пароля, сгенерированного с помощью ресурса `random_password`)[align=left;position=above]}
   ```hcl
   output "default_password" {
     value     = random_password.user.result
     sensitive = true
   }
   ```
   {/caption}
* Закрытый SSH-ключ для доступа к ВМ инстанса сервиса.

   {caption(Пример выходного параметра для закрытого SSH-ключа)[align=left;position=above]}
   ```hcl
   output "private_key" {
     value     = ivkcs_ssh_keypair.key.private_key
     sensitive = true
   }
   ```
   {/caption}

   <err>

   Выводить закрытый SSH-ключ в `output` без атрибута `sensitive` запрещено.

   </err>
