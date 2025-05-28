
На производительность работы диска могут влиять факторы:

- фоновые процессы операционной системы;
- механизмы работы резервного копирования;
- автоматические обновления (актуально для Windows);
- запущенное стороннее программное обеспечение.

### Решение

1. Убедитесь, что перечисленные выше факторы отсутствуют.

1. Соберите статистику производительности диска одним из способов:

   - `disk utilization` — с использованием [утилиты](https://www.cyberciti.biz/tips/linux-disk-performance-monitoring-howto.html) `iostat`;
   - `load average` — c [использованием](https://www.digitalocean.com/community/tutorials/load-average-in-linux) `top`.

1. Сравните полученные показатели с [гарантированной производительностью диска](../../concepts/volume-sla), предоставляемой платформой VK Cloud. Если наблюдаются значительные отклонения, обратитесь в [техническую поддержку](/ru/contacts).

   <info>
   
   Чтобы увеличить производительность, можно [увеличить размер](../../service-management/volumes#uvelichenie_razmera_diska_s_perezagruzkoy_vm) или [изменить тип](../../service-management/volumes#izmenenie_tipa_diska) диска.
   
   </info>