
{include(/kz/_includes/_translated_by_ai_kz.md)}

Шығу параметрлері — бұл Terraform манифестін орындау және сервисді орналастыру барысында жасалатын және пайдаланушыға сіздің қосымшаңызбен жұмыс істеу үшін қажет деректер. Шығу параметрлерін пайдаланушыға электрондық пошта арқылы жібере аласыз.

{note:warn}
Егер шығу параметрінде сезімтал деректер болса, оның сипаттамасында `sensitive` атрибуты болуы тиіс. Бұл жағдайда шығу параметрінің деректері пайдаланушыға жіберіледі, бірақ Terraform логтарында сақталмайды.
{/note}

Шығу параметрлері арқылы пайдаланушыға мыналарды жіберуге болады:

* Сервис инстансының жасалған ВМ IP-адресі.

   {cut(Шығу параметрінің мысалы)}
   ```hcl
   # ВМ IP-адресін шығару
   output "address" {
     description = "The host IP-address"
     value = vkcs_compute_instance.compute.access_ip_v4
   }
   ```
   {/cut}

* Скриптпен жасалған сервис инстансын алғашқы баптауға арналған құпиясөздер.

   {cut(Шығу параметрінің мысалы)}
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
   {/cut}

* `random_password` ресурсы арқылы жасалған сервис инстансын алғашқы баптауға арналған құпиясөздер.

   {cut(Шығу параметрінің мысалы)}
   ```hcl
   output "default_password" {
     value     = random_password.user.result
     sensitive = true
   }
   ```
   {/cut}

* Сервис инстансының ВМ-іне кіру үшін жабық SSH-кілті.

   {cut(Шығу параметрінің мысалы)}
   ```hcl
   output "private_key" {
     value     = ivkcs_ssh_keypair.key.private_key
     sensitive = true
   }
   ```
   {/cut}

   {note:err}

   Жабық SSH-кілтті `sensitive` атрибутысыз `output` ішінде шығаруға болмайды.

   {/note}