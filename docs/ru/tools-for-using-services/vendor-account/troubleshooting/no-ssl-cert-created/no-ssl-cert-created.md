При развертывании инстанса image-based приложения не создается SSL-сертификат на ВМ инстанса.

Возможные причины возникновения проблемы:

- В манифесте Terraform приложения отсутствует ресурс `ivkcs_cert`.
- Домен, указанный в описании ресурса `ivkcs_cert`, недоступен.
- Неправильно настроен DNS для этого домена.

## Решение

1. Проверьте, что в [манифесте Terraform](/ru/tools-for-using-services/vendor-account/manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) приложения описан ресурс [ivkcs_cert](/ru/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert).
1. Если ресурс не описан, [внесите](/ru/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_manifest) необходимые изменения в конфигурацию вашего приложения.
1. Проверьте, что домен, указанный в описании ресурса `ivkcs_cert`, доступен.
1. Проверьте корректность настроек DNS для этого домена.
1. Если проблему не удается решить самостоятельно, [обратитесь в техническую поддержку](/ru/contacts).
