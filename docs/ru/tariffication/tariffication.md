# {heading(Тарификация)[id=s3-tariffication]}

## {heading(О тарификации)[id=s3-tariffication-about]}

{include(/ru/_includes/_tariffication.md)[tags=pay]}

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицируется)[id=s3-tariffication-list]}

Тарификация услуг в {var(s3)} зависит от {linkto(../concepts/about#s3-concepts-about-storage-class)[text=класса хранения]} данных.

В Hotbox и Icebox тарифицируется:

- Объем хранимых данных (в ГБ).
- Исходящий трафик (в ГБ).

  Исходящим трафиком считается любое скачивание информации из бакета: как по запросу из {var(cloud)}, например от ВМ, так и извне {var(cloud)}, например от ПК пользователя. В обоих случаях обращение к бакету происходит по внешнему IP-адресу.

В Backup тарифицируется только объем хранимых данных (в ГБ).

## {heading(Не тарифицируется)[id=s3-tariffication-not-list]}

- Входящий трафик.
- Использование {linkto(../concepts/features#s3-concepts-features-s3-api)[text=API]}.
