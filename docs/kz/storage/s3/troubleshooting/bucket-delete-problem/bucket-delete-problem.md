{include(/kz/_includes/_translated_by_ai.md)}

Жеке кабинетте немесе AWS CLI көмегімен бакетті жою мүмкін емес.

Егер бакетте объектілер болса, мәселе туындауы мүмкін.

{note:warn}
`Backup` сақтау класы бар бакетті жоюға болмайды, бірақ Cloud Backup сервисі арқылы [бакеттегі объектілерді жоюға](/kz/storage/backups/instructions/manage-backup-copy#delete_backup_copy) болады.
{/note}

### Шешім

1. [Көз жеткізіңіз](/kz/storage/s3/instructions/objects/object-lock), объектілерді жоюды бұғаттау өшірілген.
1. Бакеттен [барлық объектілерді жойыңыз](/kz/storage/s3/instructions/objects/manage-object#zhoyu_obektilerdin).
1. Егер бар болса, бакеттен [аяқталмаған құрама жүктеулерді жойыңыз](/kz/storage/s3/instructions/objects/manage-object#zhuktelmey_kalgan_obekt_bolikterin_zhoyu).
1. [Жойыңыз](/kz/storage/s3/instructions/buckets/manage-bucket#bucket_delete) бакет.
