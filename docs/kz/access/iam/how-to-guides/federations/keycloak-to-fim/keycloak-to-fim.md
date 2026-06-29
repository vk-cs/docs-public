{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} жүйесіне өзіңіздің куәландыру жеткізушіңізді (Identity Provider, IdP) қосуға болады. Бұл қызметкерлеріңізге куәландыру жеткізушісінің корпоративтік аутентификация деректерін пайдаланып, логин мен құпиясөзді енгізбей-ақ {var(cloud)} жүйесіне кіруге мүмкіндік береді. Мұндай режим куәліктер федерациясы деп аталады.

Федерация режимінде жұмыс істеу үшін куәландыру жеткізушісі SAML 2.0 стандартын қолдауы тиіс.

Әрі қарай {var(cloud)} жүйесіне кіру үшін куәліктер федерациясын [Keycloak](https://www.keycloak.org) куәландыру жеткізушісі ретінде пайдаланып баптау көрсетіледі.

{note:info}
{var(cloud)} техникалық қолдау порталына куәліктер федерациясы арқылы кіруді баптау үшін [нұсқаулықпен](/kz/access/iam/instructions/support-fim) танысыңыз.
{/note}

## Дайындық қадамдары

1. Егер бұл куәландыру жеткізушісін әлі пайдаланбасаңыз, [Keycloak серверін орнатып, баптаңыз](https://www.keycloak.org/guides).
1. Keycloak метадеректерін алыңыз:

    1. Keycloak әкімші консоліне [кірііңіз](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console).
    1. Keycloak-та realm [құрыңыз](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-a-realm_server_administration_guide) немесе барын пайдаланыңыз.
    1. **Realm settings** қойындысына өтіп, **SAML 2.0 Identity Provider Metadata** түймесін басыңыз. Keycloak метадеректері бар XML-файл жүктеледі.

## 1. {var(cloud)} жүйесінде куәліктер федерациясын жасаңыз

{include(/kz/_includes/_create-fim.md)[tags=keycloak]}

## 2. Keycloak-ты баптаңыз

1. Keycloak әкімші консоліне [кірііңіз](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console).
1. **Clients** қойындысына өтіңіз.
1. **Import client** түймесін басып, федерацияны жасау кезінде алынған метадеректерді жүктеңіз. Параметрлерді өзгертпей қалдырыңыз:

    * **Type**: `saml`.
    * **Encrypt assertions**: `On`.
    * **Client signature required**: `Off`.

1. **Save** түймесін басыңыз.
1. Жасалған клиенттің **Client scopes** қойындысына өтіп, клиент үшін әдепкі бойынша жасалған scope-ты таңдаңыз.
1. **Configure a new mapper** түймесін басып, **User Property** таңдаңыз және параметрлерді толтырыңыз:

    * **Name**: `email`.
    * **Property**: `email`.
    * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.
    * **SAML Attribute NameFormat**: `URI Reference`.

1. **Group list** таңдаңыз және тағы бір mapper қосыңыз:

    * **Name**: `groups`.
    * **Group attribute name**: `http://schemas.xmlsoap.org/claims/Group`.
    * **SAML Attribute NameFormat**: `URI Reference`.
    * **Single Group Attribute**: `On`.
    * **Full group path**: `Off`.

1. (Қосымша) **Configure a new mapper** түймесін басып, **User Property** таңдаңыз және пайдаланушы туралы ақпаратты жеке кабинетпен синхрондау үшін екі атрибут қосыңыз:

    * Пайдаланушының аты:

        * **Name**: `firstName`.
        * **Property**: `firstName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`.
        * **SAML Attribute NameFormat**: `URI Reference`.

    * Пайдаланушының тегі:

        * **Name**: `lastName`.
        * **User Attribute**: `lastName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.
        * **SAML Attribute NameFormat**: `URI Reference`.

## 3. {var(cloud)} жүйесінде топтар мен рөлдер арасындағы байланысты баптаңыз

{note:info}

{var(cloud)} жүйесінде топтар мен рөлдер арасындағы байланысты баптау операциялары жеке кабинеттің келесі [рөлдеріне](/kz/access/iam/concepts/rolesandpermissions) ғана қолжетімді: иесіне, суперадминистраторға және пайдаланушылар әкімшісіне (IAM).

{/note}

1. {var(cloud)} аккаунтына [өтіңіз](https://cloud.vk.com/account).
1. **Куәліктер федерациясы** бөліміне өтіңіз.
1. **Топтар** қойындысына өтіңіз.
1. Куәліктер федерациясы бапталатын жоба атауын басыңыз.
1. Keycloak-та пайдаланатын топтарды қосыңыз:

    1. **Қосу** түймесін басыңыз. Егер бетте бұрыннан жасалған топтар болса, **Топ қосу** түймесін басыңыз.
    1. Топты баптаңыз:

        * **Топ атауы**: топ атауын көрсетіңіз. Жасалатын топ атауы Keycloak-тағы [топтың](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide) атауына сәйкес келуі тиіс.
        * **Рұқсаттар**:
           * Бір жоба шеңберінде топ пен рөлдерді байланыстыру үшін **Жоба** таңдаңыз. Әртүрлі жобаларда бір топты әртүрлі рөлдермен байланыстыруға болады, бұл федеративті пайдаланушының жобаларға қол жеткізу деңгейін шектеуге мүмкіндік береді.
           * Бір иенің барлық жобаларында топ пен рөлдерді байланыстырып, федеративті пайдаланушыға оларға бірдей қол жеткізу деңгейін беру үшін **Домен** таңдаңыз. **Домен** рұқсаты тек жоба иесіне қолжетімді.
        * **Топ рөлдері**: жасалатын топқа арналған қол жеткізу матрицаңызға сәйкес келетін [рөлдерді {var(cloud)}](/kz/access/iam/concepts/rolesandpermissions) таңдаңыз.

    1. **Қосу** түймесін басыңыз.

## 4. Федерация арқылы кіру мүмкіндігін тексеріңіз

1. Keycloak-та пайдаланушы [жасаңыз](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-user_server_administration_guide) және оны қажетті топқа [қосыңыз](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide).
1. Браузер жолына федеративті пайдаланушыларға арналған кіру URL мекенжайын енгізіңіз. Сіз Keycloak аутентификация бетіне қайта бағытталасыз.
1. Пайдаланушының аутентификация деректерін енгізіңіз. Сәтті авторизациядан кейін {var(cloud)} жеке кабинетінің басты бетіне қайта бағытталасыз.
1. {var(cloud)} пайдаланушысына автоматты түрде тағайындалған рөл [топты қосу](#3_vk_cloud_zhuyesinde_toptar_men_rolder_arasyndagy_baylanysty_baptanyz) кезінде таңдалған рөлге сәйкес келетінін тексеріңіз.
