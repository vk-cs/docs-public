
{include(/kz/_includes/_translated_by_ai_kz.md)}

`image-based` қосымша инстансын орнатқан кезде инстанс ВМ-де SSL-сертификат жасалмайды.

Мәселенің туындауының мүмкін себептері:

- Қосымшаның Terraform манифестінде `ivkcs_cert` ресурсы жоқ.
- `ivkcs_cert` ресурсы сипаттамасында көрсетілген домен қолжетімсіз.
- Бұл домен үшін DNS дұрыс бапталмаған.

## Шешім

1. [Terraform манифестінде](/kz/tools-for-using-services/vendor-account/manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) қосымшаның [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсы сипатталғанын тексеріңіз.
1. Ресурс сипатталмаса, қосымшаңыздың конфигурациясына қажетті [өзгерістер енгізіңіз](/kz/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_manifest).
1. `ivkcs_cert` ресурсы сипаттамасында көрсетілген доменнің қолжетімділігін тексеріңіз.
1. Бұл домен үшін DNS баптауларының дұрыстығын тексеріңіз.
1. Мәселені өз бетінше шешу мүмкін болмаса, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).