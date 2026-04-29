{include(/kz/_includes/_translated_by_ai.md)}

image-based қолданбасының инстанс ВМ-інде SSL-сертификатты жасау кезінде қол жеткізу қатесі туындайды.

Мәселенің туындауының ықтимал себебі: қолданбаның Terraform манифесіндегі `ivkcs_cert` ресурсында қолданба инстансының ВМ ОС-інде жоқ пайдаланушы немесе пайдаланушылар тобы көрсетілген.

## Шешімі

1. Инстанс ВМ-інің ОС-інде [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсының `cert_files_owner` аргументінде көрсетілген пайдаланушының бар екенін тексеріңіз.
1. Инстанс ВМ-інің ОС-інде [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсының `cert_files_group` аргументінде көрсетілген пайдаланушылар тобының бар екенін тексеріңіз.
1. Егер мұндай пайдаланушы немесе топ болмаса, қолданбаңыздың конфигурациясына [қажетті өзгерістерді енгізіңіз](/kz/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_vm_image).
1. Егер мәселені өз бетіңізше шеше алмасаңыз, [техникалық қолдау қызметіне хабарласыңыз](/kz/contacts).
