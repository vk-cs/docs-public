# {heading(Шығыс параметрлерінің сипаттамасы)[id=tf_manifest_output]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Шығыс параметрлерін сипаттаңыз, оларды манифест орындалып, сервис орналастырылғаннан кейін пайдаланушыға email арқылы жіберу үшін.

Егер шығыс параметр сезімтал деректерді құрамдаса, `sensitive` атрибутын көрсетіңіз. Бұл жағдайда шығыс параметрінің деректері пайдаланушыға жіберіледі, бірақ Terraform логтарында сақталмайды.

Шығыс параметрлері арқылы пайдаланушыға мыналарды жібруге болады:

* Сервис инстансының жасалған ВМ IP-адресі.

   {caption(ВМ IP-адресі үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   # ВМ IP-адресін шығару
   output "address" {
     description = "The host IP-address"
     value = vkcs_compute_instance.compute.access_ip_v4
   }
   ```
   {/caption}
* Скриптпен генерацияланған сервис инстансының бастапқы баптауына арналған құпиясөздер.

   {caption(Скрипт нәтижелері үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   # Скриптті орындау
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

   # Скрипт нәтижелерін сұрау
   data "ivkcs_agent_script_result" "password" {
     uuid  = var.instance_uuid
     host  = local.hosts_names[0]
     group = ivkcs_agent_exec.start.name
     index = 1

     depends_on = [
       ivkcs_agent_exec.start
     ]
   }

   # Скрипт нәтижелерін шығару
   output "password" {
     description = "password"
     value = data.ivkcs_agent_script_result.password.result
     sensitive = true
   }
   ```
   {/caption}
* `random_password` ресурсы көмегімен генерацияланған сервис инстансының бастапқы баптауына арналған құпиясөздер.

   {caption(`random_password` ресурсы көмегімен генерацияланған құпиясөз үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   output "default_password" {
     value     = random_password.user.result
     sensitive = true
   }
   ```
   {/caption}
* Сервис инстансының ВМ-не кіру үшін жабық SSH-кілті.

   {caption(Жабық SSH-кілт үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   output "private_key" {
     value     = ivkcs_ssh_keypair.key.private_key
     sensitive = true
   }
   ```
   {/caption}

   {note:err}

   `sensitive` атрибутысыз жабық SSH-кілтті `output` арқылы шығаруға болмайды.

   {/note}