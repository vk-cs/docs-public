
{include(/kz/_includes/_translated_by_ai_kz.md)}

SSL-сертификатты image-based қосымшаның ВМ инстансында жасау кезінде рұқсат қатесі пайда болады.

Мәселенің пайда болу мүмкін себебі: қосымшаның Terraform манифестіндегі `ivkcs_cert` ресурсында ВМ инстансының ОС-інде жоқ пайдаланушы немесе пайдаланушылар тобы көрсетілген.

## Шешім

1. ВМ инстансының ОС-інде [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсының `cert_files_owner` аргументінде көрсетілген пайдаланушы бар екенін тексеріңіз.
1. ВМ инстансының ОС-інде [ivkcs_cert](/kz/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) ресурсының `cert_files_group` аргументінде көрсетілген пайдаланушылар тобы бар екенін тексеріңіз.
1. Егер мұндай пайдаланушы немесе топ болмаса, қосымшаңыздың конфигурациясына [қажетті өзгерістерді енгізіңіз](/kz/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_vm_image).
1. Егер мәселені өз бетінше шешу мүмкін болмаса, [техникалық қолдау қызметіне жүгініңіз](/kz/contacts).