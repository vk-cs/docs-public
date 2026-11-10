# {heading(Тарификация)[id=s3-tariffication]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

## {heading(Тарификация туралы)[id=s3-tariffication-about]}

{include(/kz/_includes/_tariffication.md)[tags=pay]}

{include(/kz/_includes/_tariffication.md)[tags=prices]}

{include(/kz/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарификацияланады)[id=s3-tariffication-list]}

{var(s3)} қызметтерінің тарификациясы деректердің {linkto(../concepts/about#s3-concepts-about-storage-class)[text=сақтау класына]} байланысты.

Hotbox және Icebox ішінде тарификацияланады:

- Сақталатын деректердің көлемі (ГБ).
- Шығатын трафик (ГБ).

  Шығатын трафикке бакеттен ақпаратты жүктеп алудың кез келген түрі жатады: {var(cloud)} ішінен жасалған сұраулар да (мысалы, ВМ-ден), сонымен қатар {var(cloud)} сыртынан да (мысалы, пайдаланушының ПК-ден). Екі жағдайда да бакетке өту сыртқы IP-мекенжайы арқылы жүзеге асады.

Backup ішінде тек сақталатын деректердің көлемі (ГБ) ғана тарификацияланады.

## {heading(Тарификацияланбайды)[id=s3-tariffication-not-list]}

- Кіретін трафик.
- {linkto(../concepts/features#s3-concepts-features-s3-api)[text=API]}. пайдалану