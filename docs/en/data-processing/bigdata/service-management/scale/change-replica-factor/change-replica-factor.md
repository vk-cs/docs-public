VK Cloud поддерживает изменение фактора репликации на разных уровнях:

<tabs>
<tablist>
<tab>Существующие файлы кластера</tab>
<tab>Новые файлы кластера</tab>
<tab>Новые кластера проекта</tab>
</tablist>
<tabpanel>

1. [Подключитесь к master-узлу](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix) с плавающем адресом с помощью SSH.
1. (Опционально) Уточните текущее число копий:

   ```bash
   hdfs dfs -stat
   ```

   Пример вывода команды:

   ```bash
   hdfs fsck /user/admin/data.csv
   /user/admin/data.csv:  Under replicated BP-1014754436-192.168.99.119-1532095262675:blk_1073743175_2396. Target Replicas is 3 but found 1 live replica(s), 0 decommissioned replica(s) and 0 decommissioning replica(s).
   Status: HEALTHY
    Total size: 2878934 B
    Total dirs: 0
    Total files:   1
    Total symlinks:             0
    Total blocks (validated):   1 (avg. block size 2878934 B)
    Minimally replicated blocks:   1 (100.0 %)
    Over-replicated blocks:     0 (0.0 %)
    Under-replicated blocks:    1 (100.0 %)
    Mis-replicated blocks:      0 (0.0 %)
    Default replication factor: 1
    Average block replication:  1.0
    Corrupt blocks:             0
    Missing replicas:           2 (66.666664 %)
    Number of data-nodes:       1
    Number of racks:            1
   FSCK ended at Mon Jul 23 17:20:46 UTC 2018 in 1 milliseconds
   The filesystem under path '/user/admin/data.csv' is HEALTHY 
   ```

1. Измените фактор репликации для отдельного файла с помощью команды:

   ```bash
   hdfs dfs -setrep 3 <путь к файлу>
   ```

   Чтобы изменить параметр рекурсивно, добавьте в команду флаг `-R`.

</tabpanel>
<tabpanel>

1. [Перейдите](../../../connect/) в интерфейс ADCM кластера.
1. Перейдите в раздел **CLUSTERS**.
1. Выберите из списка нужный кластер, нажав на его название.
1. Перейдите в раздел **Services**.
1. Выберите из списка компонент **HDFS**, нажав на его имя.
1. Перейдите в раздел **Configuration**.
1. Найдите параметр `dfs.replication` и укажите для него нужное значение.
1. Нажмите кнопку **Save**.

</tabpanel>
<tabpanel>

Обратитесь в [техническую поддержку](/ru/contacts).

</tabpanel>
</tabs>
