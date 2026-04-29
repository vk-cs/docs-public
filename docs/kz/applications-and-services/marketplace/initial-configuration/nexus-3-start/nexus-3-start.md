{include(/kz/_includes/_translated_by_ai.md)}

Кітапханалар мен артефактілер репозиторийлерін модульдік әзірлеуде пайдалану үшін [Nexus 3](https://kz.cloud.vk.com/app/services/marketplace/v2/apps/service/73f3ac8a-5c6e-4ced-a2e3-6ed6caed0fb0/latest/info) сервисінің көмегімен өрістете аласыз. Бұл нұсқаулық VK Cloud-тағы ВМ-ге Nexus 3 сервисін өрістетуге, сервис консоліне кіруге және жаңа пайдаланушы құруға көмектеседі.

Nexus 3 сервисін пайдалану арқылы сіз [Marketplace](/kz/start/legal/vk/marketplace) және [Sonatype](https://sonatype.ru/prices) сервистерінің лицензиялық келісімдерімен келісесіз.

Жобада Nexus сервисін өрістету үшін:

1. VK Cloud-та [тіркеліңіз](/kz/intro/onboarding/account).
1. Егер ол бұрын жасалмаған болса, интернетке қолжетімді [желі жасаңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau).
1. Өрістетілген сервисі бар ВМ орналастырылатын [ішкі желі баптауларында](/kz/networks/vnet/instructions/net#zhelini_redakciyalau) **Приватный DNS** опциясын өшіріңіз.
1. Nexus 3 сервисін [өрістетіңіз](../../instructions/pr-instance-add):

   - Бұрын жасалған интернетке қолжетімді желіні және ішкі желіні таңдаңыз. Сыртқы IP-мекенжай автоматты түрде тағайындалады.
   - Қалған параметрлерді өз қалауыңыз бойынша таңдаңыз.

   Орнату аяқталғаннан кейін поштаға Nexus 3 консоліне (`nexus_url`) арналған бір реттік сілтеме және құпиясөз (`password`) келеді. Сервис `https://nexus-<ID>.xaas.msk.vkcs.cloud` түріндегі мекенжай бойынша өрістетіледі.

1. Nexus 3 консоліне өтіңіз.
1. **Sign in** батырмасын басыңыз.
1. Ашылған терезеде `admin` логинін және пошта арқылы алынған `admin_password` құпиясөзін енгізіңіз.
1. (Опционалды) [Ресми құжаттамадағы](https://help.sonatype.com/repomanager3/installation-and-upgrades/post-install-checklist) чек-парақтан өтіңіз.

{note:info}

Сервистің кеңейтілген конфигурациясы үшін [Sonatype Nexus Repository 3](https://help.sonatype.com/repomanager3) ресми нұсқаулығын пайдаланыңыз.

{/note}
