# {heading(Тарификация)[id=backup-backup-cost]}

## {heading(О тарификации)[id=backup-tariffication]}

Стоимость {linkto(/ru/storage/backups/concepts/about#backup-about)[text=резервного копирования]} в Cloud Backup складывается из стоимости хранения временного снимка диска и последующего хранения резервной копии:

1. Для создания резервной копии система формирует временный снимок диска (snapshot), который хранится в {linkto(/ru/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=дисковом хранилище]} и тарифицируется поминутно (в среднем один час).

2. На основе снимка диска создается сжатая резервная копия, которая хранится в объектном хранилище {linkto(/ru/storage/s3/concepts/about#s3-concepts-about)[text={var(s3)}]} в бакетах с {linkto(/ru/storage/s3/concepts/about#s3-concepts-about-storage-class)[text=классом хранения]} `BackupBucket`.

   {cut(Как сжимаются данные в резервных копиях)}

   В зависимости от типа файлов на диске к ним применяется разная степень сжатия:

      - высокая: текстовые документы, базы данных;
      - низкая: уже сжатые форматы (изображения, видеозаписи, архивы).

   Точный коэффициент сжатия данных заранее неизвестен, поэтому их итоговый объем можно определить только после завершения создания резервной копии.
   {/cut}
  
Итоговая стоимость хранения резервной копии зависит от объема данных, частоты и выбранной стратегии резервного копирования. Чтобы снизить затраты на использование сервиса, воспользуйтесь {linkto(/ru/storage/backups/concepts/best-practices#backup-cost-manage)[text=лучшими практиками по настройке резервного копирования]}.

{include(/ru/_includes/_tariffication.md)[tags=prices]}

{include(/ru/_includes/_tariffication.md)[tags=calculator]}

## {heading(Тарифицируется)[id=backup-tariffication-yes]}

- Снимки диска (snapshot) за каждый 1 ГБ дискового пространства. Цена одинакова для всех {linkto(/ru/computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=типов диска]} и приведена в [прайс-листе](https://cloud.vk.com/pricelist) в разделе **Виртуальные серверы**.
- Объем хранимых данных за каждый 1 ГБ по {linkto(/ru/storage/s3/tariffication#s3-tariffication)[text=тарифам]} {var(s3)} для класса хранения `BackupBucket`. 

## {heading(Не тарифицируется)[id=backup-tariffication-no]}

- Запросы в {var(s3)}.
- Операции создания резервных копий.
- Входящий и исходящий трафик.
- Мониторинг.
