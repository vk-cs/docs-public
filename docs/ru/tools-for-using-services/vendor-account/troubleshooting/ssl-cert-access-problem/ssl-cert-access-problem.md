Возникает ошибка доступа при создании SSL-сертификата на ВМ инстанса image-based приложения.

Возможная причина возникновения проблемы: в ресурсе `ivkcs_cert` манифеста Terraform приложения указан пользователь или группа пользователей, которых нет в ОС ВМ инстанса приложения.

## Решение

1. Проверьте, что в ОС ВМ инстанса существует пользователь, указанный в аргументе `cert_files_owner` ресурса [ivkcs_cert](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert).
1. Проверьте, что в ОС ВМ инстанса существует группа пользователей, указанная в аргументе `cert_files_group` ресурса [ivkcs_cert](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert).
1. Если такого пользователя или группы нет, [внесите](/ru/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_vm_image) необходимые изменения в конфигурацию вашего приложения.
1. Если проблему не удается решить самостоятельно, [обратитесь в техническую поддержку](/ru/contacts).
