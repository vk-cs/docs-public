# {heading(Медленно работает диск)[id=iaas-slow-disk]}

На производительность работы диска могут влиять факторы:

- фоновые процессы операционной системы;
- механизмы работы резервного копирования;
- автоматические обновления (актуально для Windows);
- запущенное стороннее программное обеспечение.

### {heading(Решение)[id=iaas-slow-disk-decision]}

1. Убедитесь, что перечисленные выше факторы отсутствуют.
1. Соберите статистику производительности диска одним из способов:

   - `disk utilization` — с использованием [утилиты](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) `iostat`;
   - `load average` — с [использованием](https://www.digitalocean.com/community/tutorials/load-average-in-linux) `top`.

1. Сравните полученные показатели с {linkto(../../../../computing/iaas/concepts/data-storage/volume-sla#iaas-volume-sla)[text=гарантированной производительностью диска]}, предоставляемой {var(cloud)}. Если наблюдаются значительные отклонения, обратитесь в [техническую поддержку](/ru/contacts).

   {note:info}
   Чтобы увеличить производительность, можно {linkto(../../../../computing/iaas/instructions/volumes/volumes-manage#iaas-volumes-manage-chance-disk-type)[text=изменить тип]} или диска.
   {/note}