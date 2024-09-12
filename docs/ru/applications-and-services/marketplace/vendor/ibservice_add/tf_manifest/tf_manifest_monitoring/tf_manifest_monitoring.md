# {heading(Мониторинг)[id=tf_manifest_monitoring]}

Мониторинг позволяет отслеживать состояние инстанса сервиса на ВМ. Агент проверяет доступность инстанса сервиса с помощью `health check` и передает результат в сервис управления конфигурациями. Тайм-аут получения `health check` по умолчанию равен 5 мин.

<info>

Значение тайм-аута `health check` не настраивается в манифесте Terraform. Если для корректной работы сервиса требуется изменить это значение, отправьте письмо на [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

</info>

Используйте мониторинг как проверку работоспособности сервиса после выполнения скриптов. Если сервис не запустился после скриптов, агент не получит `health check` и развертывание сервиса завершится с ошибкой.

Чтобы настроить мониторинг:

1. Убедитесь, что в манифесте описана установка агента на ВМ. Если установка агента не описана, опишите ее (подробнее — в разделе {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_user_data/#ivkcs_user_data)[text=%text]}).
1. Настройте способы мониторинга (типы `health check`). Используйте ресурс `ivkcs_agent_check`.

   Типы `health check` приведены в разделе {linkto(/ru/applications-and-services/marketplace/vendor/ivkcs/ivkcs_resources/ivkcs_agent_check/#ivkcs_agent_check)[text=%text]}.

   {caption(Пример настройки `health check`)[align=left;position=above]}
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

   С указанной периодичностью агент на ВМ будет передавать `health check` в сервис управления конфигурациями.
