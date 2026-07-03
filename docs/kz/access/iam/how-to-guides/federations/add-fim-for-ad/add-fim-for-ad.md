# {heading(Active Directory арқылы куәліктер федерациясын баптау)[id=iam-ad-fim]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} жүйесіне өзіңіздің куәландыру жеткізушіңізді (Identity Provider) қосуға болады. Бұл қызметкерлеріңізге куәландыру жеткізушісінің корпоративтік аутентификация деректерін пайдаланып, логин мен құпиясөзді енгізбей-ақ {var(cloud)} жүйесіне кіруге мүмкіндік береді. Мұндай режим куәліктер федерациясы деп аталады.

Федерация режимінде жұмыс істеу үшін куәландыру жеткізушісі SAML 2.0 стандартын қолдауы тиіс.

Әрі қарай {var(cloud)} жүйесіне кіру үшін куәліктер федерациясын [Active Directory федерация қызметі](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-overview) (AD FS) мысалында баптау көрсетіледі.

{note:info}
{var(cloud)} техникалық қолдау порталына куәліктер федерациясы арқылы кіруді баптау үшін [нұсқаулықпен](/kz/access/iam/instructions/support-fim) танысыңыз.
{/note}

## Дайындық қадамдары

1. AD FS-ті [баптаңыз](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-deployment), пайдаланушылар мен топтарды [жасаңыз](https://learn.microsoft.com/en-us/powershell/module/activedirectory/add-adgroupmember?view=windowsserver2022-ps).
1. AD FS метадеректері бар XML-файлды [экспорттаңыз](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/troubleshooting/ad-fs-tshoot-endpoints#federation-metadata-test).

## 1. {var(cloud)} жүйесінде куәліктер федерациясын жасаңыз

{include(/kz/_includes/_create-fim.md)[tags=ad-fs]}

{note:info}

Active Directory домені өзгерген кезде бар федерацияны жойып, жаңасын баптаңыз.

{/note}

## 2. AD FS-ті баптаңыз

1. Федерация метадеректерінің көмегімен [сенім қатынасын жасаңыз](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/operations/create-a-relying-party-trust#to-create-a-claims-aware-relying-party-trust-using-federation-metadata). Федерацияны жасау кезінде алынған метадеректері бар XML-файлды пайдаланыңыз.
1. Пайдаланушы атрибуттары мен AD FS шығыс мәлімдемелері түрлерінің (Claims Mapping) арасындағы сәйкестікті баптаңыз, ол үшін келесі ережелерді [қосыңыз](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/checklist--creating-claim-rules-for-a-relying-party-trust):

    - Кіріс мәлімдемесін түрлендіру ([Transform an Incoming Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-transform-an-incoming-claim)):

        - **Type**: `Transform an Incoming Claim`.
        - **Claim rule name**: `Name ID`.
        - **Incomming claim type**: `Windows account name`.
        - **Outgoing claim type**: `Name ID`.
        - **Outgoing name ID format**: `Windows Qualified Domain Name`.
    - Пайдаланушы атрибуттарын жіберу ([Send LDAP Attributes as Claims](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-ldap-attributes-as-claims)):

        - **Type**: `Send LDAP Attributes as Claims`.
        - **Claim rule name**: `Attributes`.
        - **Attribute store**: `Active Directory`.
        - **Mapping of LDAP attributes to outgoing claim types**: келесі сәйкестіктерді орнатыңыз:

            - `E-Mail-Adresses` → `E-Mail Address`.
            - `SAM-Account-Name` → `Subject Name`.
            - `Given-Name` → `Name`.
            - `Surname` → `Surname`.
            - `Telephone-Number` → `phone_number`.
    - Топтардағы мүшелікті жіберу ([Send Group Membership as a Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-group-membership-as-a-claim)):

        - **Type**: `Send Group Membership as a Claim`.
        - **Claim rule name**: `<НАЗВАНИЕ_ГРУППЫ>` (мысалы, `Domain Users`).
        - **User’s group**: `<ДОМЕН>\<НАЗВАНИЕ_ГРУППЫ>`.
        - **Outgoing claim type**: `Group`.
        - **Outgoing claim value**: `<НАЗВАНИЕ_ГРУППЫ>`.

## 3. {var(cloud)} жүйесінде топтар мен рөлдер арасындағы байланысты баптаңыз

{var(cloud)} жүйесінде AD FS топтары мен рөлдері арасындағы байланысты баптау операциялары жеке кабинеттің келесі [рөлдеріне](/kz/access/iam/concepts/rolesandpermissions) ғана қолжетімді: иесіне, суперадминистраторға және пайдаланушылар әкімшісіне (IAM). Байланыстарды қарау жоба әкімшісі мен бақылаушыға да қолжетімді.

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **Куәліктер федерациясы** бөліміне өтіңіз.
1. **Топтар** қойындысына өтіңіз.
1. Куәліктер федерациясы бапталатын жоба атауын басыңыз.
1. Active Directory-де пайдаланатын топтарды қосыңыз:

    1. **Қосу** түймесін басыңыз. Егер бетте бұрыннан жасалған топтар болса, **Топ қосу** түймесін басыңыз.
    1. Топты баптаңыз:

        - **Топ атауы**: пайдаланушы мүше болып табылатын Active Directory тобының атауын көрсетіңіз. Атауы бұрын бапталған AD FS ережелеріндегі **Outgoing claim value** өрісімен сәйкес келуі тиіс.
        - **Рұқсаттар**:
            - Бір жоба шеңберінде топ пен рөлдерді байланыстыру үшін **Жоба** таңдаңыз. Әртүрлі жобаларда бір топты әртүрлі рөлдермен байланыстыруға болады, бұл федеративті пайдаланушының жобаларға қол жеткізу деңгейін шектеуге мүмкіндік береді.
            - Бір иенің барлық жобаларында топ пен рөлдерді байланыстырып, федеративті пайдаланушыға оларға бірдей қол жеткізу деңгейін беру үшін **Домен** таңдаңыз. **Домен** рұқсаты тек жоба иесіне қолжетімді.
        - **Топ рөлдері**: жасалатын топқа арналған қол жеткізу матрицаңызға сәйкес келетін [рөлдерді {var(cloud)}](/kz/access/iam/concepts/rolesandpermissions) таңдаңыз.

    1. **Қосу** түймесін басыңыз.

## 4. Федерация арқылы кіру мүмкіндігін тексеріңіз

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **Куәліктер федерациясы** бөліміне өтіп, **Федерациялар** қойындысын ашыңыз.
1. **Федеративті пайдаланушыларға арналған кіру URL** параметрінің мәнін көшіріп алыңыз.
1. Алынған URL мекенжайын браузер жолына қойыңыз. Сіз AD FS аутентификация бетіне қайта бағытталасыз.
1. Өз корпоративтік аутентификация деректеріңізді енгізіңіз. Сәтті авторизациядан кейін {var(cloud)} жеке кабинетінің басты бетіне қайта бағытталасыз.
1. {var(cloud)} пайдаланушысына автоматты түрде тағайындалған рөл [топты қосу](#3_vk_cloud_zhuyesinde_toptar_men_rolder_arasyndagy_baylanysty_baptanyz) кезінде таңдалған рөлге сәйкес келетінін тексеріңіз.

{note:warn}

Active Directory {var(cloud)} жүйесімен автоматты түрде синхрондалмайды. Пайдаланушы Active Directory-де бұғатталғаннан кейін оны {var(cloud)} жеке кабинетінде жобалардан [жойыңыз](/kz/access/iam/instructions/access-manage#iam-access-manage-delete-user).

{/note}
