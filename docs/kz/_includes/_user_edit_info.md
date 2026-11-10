{includetag(edit_info)}
{ifdef(public)}
## {heading(Пайдаланушы профилін өзгерту)[id=account-manage-editinfo-profile]}

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **Жеке ақпарат** бөліміне өтіңіз.
   {/ifdef}

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. {linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]} {var(cloud)} жеке кабинетіне.
1. Бет тақырыбындағы пайдаланушы атына басып, **Аккаунт баптаулары** тармағын таңдаңыз.
1. **Пайдаланушы профилі** қойындысында ақпаратпен танысыңыз.
   {/ifdef}

1. {ifdef(public)}Өрістерді толтырыңыз{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Мына деректерді өзгертіңіз{/ifdef}:

   - **Аты-жөні**{ifdef(public)}: атыңыз бен тегіңізді енгізіңіз{/ifdef};
   - **Компания**{ifdef(public)}: жұмыс істейтін компанияңыздың атауын көрсетіңіз{/ifdef};
   - **Лауазым**{ifdef(public)}: лауазымыңызды көрсетіңіз{/ifdef}.

   {note:info}
   Телефон нөмірін {ifdef(public)}немесе email-ды өзгерту үшін {linkto(../../../../../intro/onboarding/contact_support#onboarding-contact-support)[text=техникалық қолдауға хабарласыңыз]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}, электрондық пошта мекенжайын немесе құпиясөзді өзгерту үшін {var(cloud)} әкімшісіне хабарласыңыз{/ifdef}.
   {/note}

1. **Өзгерістерді сақтау** түймесін басыңыз.

{ifdef(public)}
## {heading(Құпиясөзді ауыстыру)[id=account-manage-editinfo-password]}

1. [Өтіңіз](https://cloud.vk.ru/account) {var(cloud)} аккаунтына.
1. **Қауіпсіздік** бөліміне өтіңіз.
1. Құпиясөзді өзгерту үшін ![pencil-icon](../../../../../assets/pencil-icon.svg "inline") белгішесін басыңыз.
1. Өрістерді толтырыңыз:

   - **Ескі құпиясөз**: аккаунттың ағымдағы құпиясөзін енгізіңіз;
   - **Жаңа құпиясөз**: аккаунт үшін жаңа құпиясөз орнатыңыз;
   - **Құпиясөзді қайталаңыз**: жаңа құпиясөзді қайтадан енгізіңіз.

1. **Сақтау** түймесін басыңыз.
   {/ifdef}

{/includetag}
