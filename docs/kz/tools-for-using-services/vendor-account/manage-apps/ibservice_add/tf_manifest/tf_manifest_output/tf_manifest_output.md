# {heading(Шығыс параметрлерінің сипаттамасы)[id=tf_manifest_output]}

{include(/kz/_includes/_translated_by_ai.md)}

Пайдаланушыға манифест орындалып, сервис deployed болғаннан кейін email арқылы жіберу үшін шығыс параметрлерін сипаттаңыз.

Егер шығыс параметрінде сезімтал деректер болса, `sensitive` атрибутын орнатыңыз. Бұл жағдайда шығыс параметрінің деректері пайдаланушыға беріледі, бірақ Terraform журналдарында сақталмайды.

Шығыс параметрлерінде пайдаланушыға мыналарды беруге болады:

* Құрылған сервис инстансының ВМ IP-мекенжайы.

  {caption(ВМ IP-мекенжайы үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   # Вывод IP-адреса ВМ
   output "address" {
     description = "The host IP-address"
     value = vkcs_compute_instance.compute.access_ip_v4
   }
   ```
  {/caption}
* Скрипт жасаған сервис инстансын бастапқы баптауға арналған парольдер.

  {caption(Скрипт нәтижелері үшін шығыс параметрінің мысалы)[align=left;position=above]}
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
* `random_password` ресурсы арқылы жасалған сервис инстансын бастапқы баптауға арналған парольдер.

  {caption(`random_password` ресурсы арқылы жасалған пароль үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   output "default_password" {
     value     = random_password.user.result
     sensitive = true
   }
   ```
  {/caption}
* Сервис инстансының ВМ-ге қол жеткізуге арналған жабық SSH кілті.

  {caption(Жабық SSH кілті үшін шығыс параметрінің мысалы)[align=left;position=above]}
   ```hcl
   output "private_key" {
     value     = ivkcs_ssh_keypair.key.private_key
     sensitive = true
   }
   ```
  {/caption}

  {note:err}

  `output` атрибутынсыз `sensitive` ішінде жабық SSH кілтін шығаруға тыйым салынады.

  {/note}
