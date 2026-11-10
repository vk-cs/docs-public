# {heading(Мониторинг)[id=tf_manifest_monitoring]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Мониторинг сервис инстансының күйін ВМ-де бақылауға мүмкіндік береді. Агент `health check` көмегімен сервис инстансының қолжетімділігін тексеріп, нәтижесін конфигурацияларды басқару сервисіне жібереді. `health check` алу тайм-ауты әдепкі бойынша 5 мин-қа тең.

{note:info}

`health check` тайм-аут мәнін Terraform манифестінде баптауға болмайды. Егер сервистің дұрыс жұмыс істеуі үшін бұл мәнді өзгерту қажет болса, [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз.

{/note}

Мониторингті скрипттер орындалғаннан кейінгі сервис жұмыс істеуін тексеру ретінде пайдаланыңыз. Егер скрипттерден кейін сервис іске қосылмаса, агент `health check` ала алмайды және сервисді орналастыру қатеден аяқталады.

Мониторингті баптау үшін:

1. Манифестте ВМ-ге агент орнату сипатталғанына көз жеткізіңіз. Егер агент орнатуы сипатталмаса, оны сипаттаңыз (көбірек ақпарат — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]} бөлімінде).
1. Мониторинг тәсілдерін баптаңыз (`health check` түрлері). `ivkcs_agent_check` ресурсын пайдаланыңыз.

   `health check` түрлері {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_check/#ivkcs_agent_check)[text=%text]} бөлімінде келтірілген.

   {caption(`health check` баптау мысалы)[align=left;position=above]}
   ```hcl
   resource "ivkcs_agent_check" "health" {
     hosts = ["HOST"]
     uuid  = var.instance_uuid
     # Порт арқылы сервис мониторингі
     port_health {
       # IP-мекенжай
       host = "127.0.0.1"
       # Порт
       port    = 9092
       # Мониторинг жиілігі
       period  = "1m"
     }
   }  
   ```
   {/caption}

Көрсетілген жиілікпен ВМ-дегі агент конфигурацияларды басқару сервисіне `health check` жібереді.