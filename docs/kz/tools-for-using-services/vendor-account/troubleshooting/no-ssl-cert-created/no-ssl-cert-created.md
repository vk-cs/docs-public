{include(/kz/_includes/_translated_by_ai.md)}

image-based қолданбасының инстансын өрістету кезінде инстанс ВМ-інде SSL-сертификат жасалмайды.

Мәселенің туындауының ықтимал себептері:

- Қолданбаның Terraform манифесінде `ivkcs_cert` ресурсы жоқ.
- `ivkcs_cert` ресурсының сипаттамасында көрсетілген домен қолжетімсіз.
- Осы домен үшін DNS дұрыс бапталмаған.

## Шешімі

1. Қолданбаның [Terraform манифесінде](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсы сипатталғанын тексеріңіз.
1. Егер ресурс сипатталмаған болса, қолданбаңыздың конфигурациясына [қажетті өзгерістерді енгізіңіз](/kz/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_manifest).
1. `ivkcs_cert` ресурсының сипаттамасында көрсетілген доменнің қолжетімді екенін тексеріңіз.
1. Осы домен үшін DNS баптауларының дұрыстығын тексеріңіз.
1. Егер мәселені өз бетіңізше шеше алмасаңыз, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).
