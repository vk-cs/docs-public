Выходные параметры - это данные, которые генерируются в процессе выполнения манифеста Terraform и развертывания сервиса и которые необходимы пользователю для работы с вашим приложением. Выходные параметры можно передать пользователю по электронной почте.

{note:warn}
Если выходной параметр содержит чувствительные данные, его описание должно содержать атрибут `sensitive`. В этом случае данные выходного параметра будут переданы пользователю, но не будут сохранены в логах Terraform.
{/note}

С помощью выходных параметров пользователю можно передать:

* IP-адрес созданной ВМ инстанса сервиса.

   {cut(Пример выходного параметра)}
   ```hcl
   # Вывод IP-адреса ВМ
   output "address" {
     description = "The host IP-address"
     value = vkcs_compute_instance.compute.access_ip_v4
   }
   ```
   {/cut}

* Пароли для первичной настройки инстанса сервиса, сгенерированные скриптом.

   {cut(Пример выходного параметра)}
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
   {/cut}

* Пароли для первичной настройки инстанса сервиса, сгенерированные с помощью ресурса `random_password`.

   {cut(Пример выходного параметра)}
   ```hcl
   output "default_password" {
     value     = random_password.user.result
     sensitive = true
   }
   ```
   {/cut}

* Закрытый SSH-ключ для доступа к ВМ инстанса сервиса.

   {cut(Пример выходного параметра)}
   ```hcl
   output "private_key" {
     value     = ivkcs_ssh_keypair.key.private_key
     sensitive = true
   }
   ```
   {/cut}

   {note:err}

   Выводить закрытый SSH-ключ в `output` без атрибута `sensitive` запрещено.

   {/note}
