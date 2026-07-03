# {heading(Диск баяу жұмыс істейді)[id=iaas-slow-disk]}

{include(/kz/_includes/_translated_by_ai.md)}

Диск жұмысының өнімділігіне келесі факторлар әсер етуі мүмкін:

- операциялық жүйенің фондық процестері;
- резервтік көшіру жұмысының механизмдері;
- автоматты жаңартулар (Windows үшін өзекті);
- іске қосылған бөгде бағдарламалық қамтамасыз ету.

### {heading(Шешім)[id=iaas-slow-disk-decision]}

1. Жоғарыда аталған факторлардың жоқ екеніне көз жеткізіңіз.
1. Диск өнімділігінің статистикасын келесі тәсілдердің бірімен жинаңыз:

   - `disk utilization` — `iostat` [утилитасын](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) пайдаланып;
   - `load average` — `top` [утилитасын](https://www.digitalocean.com/community/tutorials/load-average-in-linux) пайдаланып.

1. Алынған көрсеткіштерді {var(cloud)} платформасы ұсынатын [дискінің кепілдендірілген өнімділігімен](../../concepts/data-storage/volume-sla) салыстырыңыз. Егер елеулі ауытқулар байқалса, [техникалық қолдауға](/kz/contacts) хабарласыңыз.

   {note:info}
   Өнімділікті арттыру үшін дискінің [өлшемін үлкейтуге](../../instructions/volumes/volumes-manage#change_disk_size) немесе [түрін өзгертуге](../../instructions/volumes/volumes-manage#iaas-volumes-manage-chance-disk-type) болады.
   {/note}
