# {heading(API арқылы рұқсатты басқару)[id=rest-api-enable]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(cloud)} жүйесімен публичтік API және OpenStack CLI, Terraform, kubectl сияқты қосымша құралдар арқылы жұмыс істеу үшін API арқылы рұқсатты белсендіру қажет.

## {heading(API арқылы рұқсатты белсендіру)[id=rest-api-enable-activate]}

1. Егер бұрын жасалмаса, {linkto(../../../../access/iam/instructions/service-account-manage#service-account-create)[text=сервислік есептік жазбаны жасаңыз]}.
1. Егер бұрын алынбаса, API-ға қолжетімділік алыңыз:

   1. {linkto(../../../../access/iam/instructions/service-account-manage#service-account-download-rc-file)[text=OpenStack RC-файлды жүктеп алыңыз]}.
   1. {linkto(../../../../access/iam/instructions/service-account-manage#service-account-authorize)[text=СУЗ көмегімен OpenStack CLI-де авторизацияланңыз]}.

1. Беттың жоғарғы жағындағы пайдаланушы атын басып, API арқылы рұқсатты келесі тәсілдердің бірімен қосыңыз:

      {tabs}

      {tab(Жоба баптаулары)}

      1. Ашылмалы тізімнен **Жоба баптаулары** опциясын таңдаңыз.
      1. **API арқылы қолжетімділік** қойындысында **API арқылы қолжетімділікті белсендіру** түймесін басыңыз.

      {/tab}

      {tab(Аккаунт баптаулары)}

      1. Ашылмалы тізімнен **Аккаунт баптаулары** опциясын таңдаңыз.
      1. {var(cloud)} аккаунтының **Қауіпсіздік** бөліміне өтіңіз.
      1. **Қосымша рұқсаттар** блогында **API арқылы қолжетімділік** опциясын қосыңыз.

      {/tab}

      {/tabs}

## {heading(API арқылы рұқсатты өшіру)[id=rest-api-enable-deactivate]}

1. VK Cloud жеке кабинетіне [өтіңіз](https://msk.cloud.vk.ru/app/).
1. Беттың жоғарғы жағындағы пайдаланушы атын басып, **Аккаунт баптаулары** опциясын таңдаңыз.
1. **Қауіпсіздік** бөлімінде **API арқылы қолжетімділік** опциясын өшіріңіз.