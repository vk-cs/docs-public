{include(/kz/_includes/_translated_by_ai.md)}

# {heading(Мониторинг)[id=tf_manifest_monitoring]}

Мониторинг ВМ-дегі сервис инстансының күйін бақылауға мүмкіндік береді. Агент `health check` көмегімен сервис инстансының қолжетімділігін тексереді және нәтижені конфигурацияларды басқару сервисіне жібереді. `health check` алу тайм-ауты әдепкі бойынша 5 минутқа тең.

{note:info}

`health check` тайм-аутының мәні Terraform манифесінде бапталмайды. Егер сервистің дұрыс жұмыс істеуі үшін бұл мәнді өзгерту қажет болса, [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) мекенжайына хат жіберіңіз.

{/note}

Мониторингті скрипттер орындалғаннан кейін сервистің жұмысқа қабілеттілігін тексеру ретінде пайдаланыңыз. Егер сервис скрипттерден кейін іске қосылмаса, агент `health check` алмайды және сервисті deploy ету қате арқылы аяқталады.

Мониторингті баптау үшін:

1. Манифестте агентті ВМ-ге орнату сипатталғанына көз жеткізіңіз. Егер агентті орнату сипатталмаса, оны сипаттаңыз (толығырақ — {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]} бөлімінде).
1. Мониторинг тәсілдерін (`health check` түрлерін) баптаңыз. `ivkcs_agent_check` ресурсын пайдаланыңыз.

   `health check` түрлері {linkto(/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_agent_check/#ivkcs_agent_check)[text=%text]} бөлімінде келтірілген.

   {caption(`health check` баптауының мысалы)[align=left;position=above]}
   ```hcl
   resource "ivkcs_agent_check" "health" {
     hosts = ["HOST"]
     uuid  = var.instance_uuid

     # Мониторинг сервиса по порту
     port_health {
       # IP-адрес
       host = "127.0.0.1"
       # Порт
       port    = 9092
       # Периодичность мониторинга
       period  = "1m"
     }
   }  
   ```
   {/caption}

   Көрсетілген мерзімділікпен ВМ-дегі агент `health check` нәтижесін конфигурацияларды басқару сервисіне жіберіп отырады.
