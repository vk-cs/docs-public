# {heading(Бакетті жою мүмкін болмай тұр)[id=s3-bucket-delete-problem]}

{include(/kz/_includes/_translated_by_ai.md)}

Жеке кабинетте немесе AWS CLI көмегімен бакетті жою мүмкін болмай тұр.

Мәселе бакетте объектілер болған жағдайда туындауы мүмкін.

{ifdef(public)}

{note:warn}
`Backup` сақтау класы бар бакетті жоюға болмайды, бірақ Cloud Backup сервисі арқылы {linkto(../../../backups/instructions/manage-backup-copy#backup-copy-delete)[text=бакеттегі объектілерді жоюға болады]}.
{/note}

{/ifdef}

### {heading(Шешімі)[id=s3-bucket-delete-problem-resolve]}

1. {linkto(../../instructions/objects/object-lock#s3-instructions-object-lock)[text=Объектілерді жоюды бұғаттау өшірілгеніне көз жеткізіңіз]}.
1. Бакеттен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=барлық объектілерді жойыңыз]}.
1. Егер бар болса, бакеттен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-parts-delete)[text=аяқталмаған құрамдас жүктеулерді жойыңыз]}.
1. {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=Бакетті жойыңыз]}.