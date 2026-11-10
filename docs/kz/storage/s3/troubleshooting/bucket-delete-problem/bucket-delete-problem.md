# {heading(Бакетті өшіру мүмкін болмай тұр)[id=s3-bucket-delete-problem]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Жеке кабинетте немесе AWS CLI көмегімен бакетті өшіру мүмкін болмай тұр.

Мәселе бакетте объектілер болған жағдайда орын алуы мүмкін.

{ifdef(public)}

{note:warn}
`Backup` сақтау класы бар бакетті өшіруге болмайды, бірақ Cloud Backup қызметі арқылы бакеттегі объектілерді {linkto(../../../backups/instructions/manage-backup-copy#backup-copy-delete)[text=өшіруге болады]}.
{/note}

{/ifdef}

### {heading(Шешу)[id=s3-bucket-delete-problem-resolve]}

1. {linkto(../../instructions/objects/object-lock#s3-instructions-object-lock)[text=Көз жеткізіңіз]}, объектілерді өшіруді блоктау өшірілген.
1. Бакеттен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=барлық объектілерді өшіріңіз]}.
1. Бакеттен {linkto(../../instructions/objects/manage-object#s3-instructions-manage-object-parts-delete)[text=аяқталмаған құрама жүктеулерді өшіріңіз]}, болса.
1. Бакетті {linkto(../../instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=өшіріңіз]}.