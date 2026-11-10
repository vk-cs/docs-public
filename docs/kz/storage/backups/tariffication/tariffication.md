# {heading(Тарификация)[id=backup-backup-cost]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Тарификация туралы)[id=backup-tariffication]}

Cloud Backup-тағы {linkto(/kz/storage/backups/concepts/about#backup-about)[text=резервтік көшірмелеу]} құны дискінің уақытша суретін (snapshot) сақтау және одан кейінгі резервтік көшірмені сақтау құнынан құралады:

1. Резервтік көшірме жасау үшін жүйе дискінің уақытша суретін (snapshot) құрады, ол {linkto(/kz/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=дискілік жадта]} сақталады және минут сайын тарифицирленеді (орташа есеппен бір сағат).

2. Диск суреті негізінде сығылған резервтік көшірме жасалады, ол {linkto(/kz/storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]} объектілік жадында `BackupBucket` {linkto(/kz/storage/s3/concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} бар бакеттерде сақталады.

   {cut(Резервтік көшірмелердегі деректер қалай сығылады)}

   Дискідегі файлдардың түріне байланысты оларға әртүрлі сығу дәрежесі қолданылады:

      - жоғары: мәтіндік құжаттар, дерекқорлар;
      - төмен: бұрыннан сығылған форматтар (суреттер, бейне жазбалар, архивтер).

   Деректерді сығудың нақты коэффициенті алдын ала белгісіз, сондықтан олардың қорытынды көлемін резервтік көшірмені жасау аяқталғаннан кейін ғана анықтауға болады.
   {/cut}

Резервтік көшірмені сақтаудың қорытынды құны деректер көлеміне, жиілікке және таңдалған резервтік көшірмелеу стратегиясына байланысты. Сервисді пайдалану шығындарын азайту үшін {linkto(/kz/storage/backups/concepts/best-practices#backup-cost-manage)[text=резервтік көшірмелеуді баптаудың үздік тәжірибелерін]} пайдаланыңыз.

{include(/kz/_includes/_tariffication.md)[tags=prices]}

{include(/kz/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицирленеді)[id=backup-tariffication-yes]}

- Диск суреттері (snapshot) дискілік кеңістіктің әрбір 1 ГБ үшін. Баға барлық {linkto(/kz/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=диск түрі]} үшін бірдей және **Виртуалды серверлер** бөліміндегі [бағалық тізімде](https://cloud.vk.ru/pricelist) көрсетілген.
- Сақталатын деректер көлемі әрбір 1 ГБ үшін `BackupBucket` сақтау класы бойынша {var(s3)} {linkto(/kz/storage/s3/tariffication#s3-tariffication)[text=тарифтері]} бойынша.

## {heading(Тарифицирленбейді)[id=backup-tariffication-no]}

- {var(s3)} сұраулары.
- Резервтік көшірмелер жасау операциялары.
- Кіріс және шығыс трафик.
- Мониторинг.