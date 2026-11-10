# {heading(Диск баяу жұмыс істейді)[id=iaas-slow-disk]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Диск жұмысының өнімділігіне келесі факторлар әсер етуі мүмкін:

- операциялық жүйенің фондық процестері;
- резервтік көшіру жұмысының механизмдері;
- автоматты жаңартулар (Windows үшін өзекті);
- іске қосылған бөгде бағдарламалық қамтамасыз ету.

### {heading(Шешім)[id=iaas-slow-disk-decision]}

1. Жоғарыда келтірілген факторлардың жоқ екеніне көз жеткізіңіз.
1. Диск өнімділігінің статистикасын мына тәсілдердің бірімен жинаңыз:

   - `disk utilization` — `iostat` [утилитасын](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) пайдалану арқылы;
   - `load average` — `top` [командасын](https://www.digitalocean.com/community/tutorials/load-average-in-linux) пайдалану арқылы.

1. Алынған көрсеткіштерді {var(cloud)} ұсынатын {linkto(../../../../computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla)[text=дискінің күтілетін өнімділігі]}мен салыстырыңыз. Айтарлықтай ауытқулар байқалса, [техникалық қолдау қызметіне](/kz/contacts) жүгініңіз.

   {note:info}
   Өнімділікті арттыру үшін дискінің {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-chance-disk-type)[text=түрін өзгертуге]} болады.
   {/note}