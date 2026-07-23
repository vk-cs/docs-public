# {heading(Cloud Databases: алғашқы басқарылатын дерекқорды жасаңыз)[id=onboarding-db-create]}

{include(/kz/_includes/_translated_by_ai.md)}

[Cloud Databases](/kz/dbs/dbaas/concepts/about) — басқарылатын дерекқорлармен жұмыс істеуге мүмкіндік беретін сервис.

Cloud Databases сервисімен [жұмысты](/kz/dbs/dbaas/concepts/about) кез келген ыңғайлы тәсілмен бастаңыз:

- [Нұсқаулықты](#onboarding-db-create-postgre) пайдаланып, алғашқы басқарылатын PostgreSQL дерекқорын жасаңыз, оған қосылыңыз және тестілік сұрауларды орындаңыз.
- Single конфигурациясындағы MySQL, PostgreSQL және ClickHouse басқарылатын дерекқорлары жасалатын [бейнелерді](#onboarding-db-create-video) қараңыз.
- [Тегін оқыту курсынан](https://cloud.vk.com/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/) өтіңіз. Курстың теориялық бөлігінде дерекқор мен дерекқорды басқару жүйесі деген не, БД-ның қандай түрлері мен конфигурациялары бар екені түсіндіріледі. Практикалық бөлікте сіз [PostgreSQL кластерін](https://cloud.vk.com/cloud-native-courses/advanced/postgresql/#sozdanieclastera) және [MySQL БД-сын](https://cloud.vk.com/cloud-native-courses/advanced/mysql/#praktikamysql) жасайсыз, содан кейін жасалған MySQL БД-сын виртуалды машинада орнатылған қосымшаға қосасыз.

{note:info}БД инстансы есептеу ресурстарын тұтынады және [тарифтеледі](/kz/dbs/dbaas/tariffication).{/note}

## {heading(Басқарылатын PostgreSQL БД-сын жасаңыз)[id=onboarding-db-create-postgre]}

Осы нұсқаулықтың барлық қадамдарынан өткен соң, сіз:

1. Single конфигурациясындағы PostgreSQL БД [инстансын](#instance_create) жасайсыз.
1. Жасалған БД инстансының [сыртқы IP-мекенжайын](#instance_ip) аласыз.
1. БД инстансына [TimescaleDB](https://docs.timescale.com) [кеңейтімін](#install_timescaledb) орнатасыз.
1. БД-ға [қосыласыз](#db_connect).
1. БД-да [кестелер](#tables_create) жасайсыз.
1. Кестелерді [деректермен толтырасыз](#tables_fill).
1. БД-ға [тестілік сұрауларды](#db_select) орындайсыз.
1. (Қосымша) БД инстансы жұмыс істеген уақыт ішінде жиналған мониторинг деректерімен [танысасыз](#db_monitoring).

Тестілік деректердің мысалы ретінде температура мен CPU жүктемесі туралы ақпаратты қамтитын заттар интернеті (IoT) сенсорларынан келетін автоматты түрде жасалатын деректер жиыны пайдаланылады. Тестілік деректер жиыны туралы толығырақ [Timescale құжаттамасынан](https://docs.timescale.com/tutorials/latest/simulate-iot-sensor-data/) оқыңыз. Осындай деректер жиындарын жасау процедурасы [Timescale блогында](https://www.timescale.com/blog/how-to-create-lots-of-sample-time-series-data-with-postgresql-generate_series/) егжей-тегжейлі қарастырылады.

{include(../../../../_includes/_db-create.md)[tags=db_onboarding; level=+1]}

## {heading(Бейненұсқаулықтар)[id=onboarding-db-create-video]}

{tabs}

{tab(MySQL)}
Бұл бейнеде Single конфигурациясындағы MySQL басқарылатын дерекқоры жасалады, резервтік көшіру мен мониторинг бапталады, содан кейін жасалған БД-ға қосылу орындалады. 

MySQL көбінесе веб-қосымшалар мен шағын жобалар үшін пайдаланылады.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239409&hash=c7f0ae9350b0f51c&hd=3)[type=vkvideo]}
{/tab}

{tab(PostgreSQL)}
Бұл бейнеде Single конфигурациясындағы PostgreSQL басқарылатын дерекқоры жасалады, мониторинг бапталады, содан кейін жасалған БД-ға қосылу орындалады. 

PostgreSQL жоғары қолжетімділік пен деректер тұтастығы қажет болатын аса маңызды қолданбаларға сай келеді.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239411&hash=297f56a0664e28de&hd=3)[type=vkvideo]}
{/tab}

{tab(ClickHouse)}
Бұл бейнеде Single конфигурациясындағы ClickHouse басқарылатын дерекқоры жасалады, резервтік көшіру мен мониторинг бапталады, содан кейін жасалған БД-ға қосылу орындалады. 

ClickHouse көбінесе нақты уақыт режимінде үлкен көлемдегі деректер аналитикасы мен есептер құру үшін пайдаланылады.

{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239410&hash=5dd6bfe20d0e063e&hd=4)[type=vkvideo]}
{/tab}

{/tabs}

## {heading(Оқыту курсы)[id=onboarding-db-create-courses]}

[Тегін оқыту курсынан](https://cloud.vk.com/cloud-native-courses/advanced/obschaya-teoriya-o-bazah-dannyh-i-tipah-hranilisch/) өтіңіз.

Курстың теориялық бөлігінде дерекқор мен дерекқорды басқару жүйесі деген не, БД-ның қандай түрлері мен конфигурациялары бар екені түсіндіріледі. Практикалық бөлікте сіз [PostgreSQL кластерін](https://cloud.vk.com/cloud-native-courses/advanced/postgresql/#sozdanieclastera) және [MySQL БД-сын](https://cloud.vk.com/cloud-native-courses/advanced/mysql/#praktikamysql) жасайсыз, содан кейін жасалған MySQL БД-сын виртуалды машинада орнатылған қосымшаға қосасыз.

## {heading(Сұрақтар мен жауаптар)[id=onboarding-db-create-faq]}

{cut(Бұлтта қандай СУБД қолжетімді?)}

Қолдау көрсетілетін СУБД-лардың толық [тізімі](/kz/dbs/dbaas/concepts/types) және олардың [конфигурациялары](/kz/dbs/dbaas/concepts/work-configs).

{/cut}

{cut(Дерекқорды қалай масштабтауға болады?)}

Сіз дерекқорлар орналастырылған виртуалды машинаның түрін өзгерте аласыз немесе диск көлемін ұлғайта аласыз. ВМ түрі өзгерген кезде өзгерістер ВМ қайта жүктелгеннен кейін күшіне енеді.

Сондай-ақ дерекқор дискісінің өлшемін автоматты масштабтауды қоса аласыз. Онда деректер көлемі ұлғайған кезде диск өлшемі автоматты түрде артады.

БД инстансын масштабтау бойынша нұсқаулықтар [БД инстансын басқару](/kz/dbs/dbaas/instructions/manage-instance) бөлімінде берілген.

{/cut}

{cut(БД инстансына қандай кеңейтімдер мен плагиндерді орнатуға болады?)}

Әртүрлі СУБД үшін қолжетімді кеңейтімдер мен плагиндердің [тізімі](/kz/dbs/dbaas/concepts/extensions).

{/cut}
