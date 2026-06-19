# {heading(Резервное копирование по расписанию)[id=k8s-backup-schedule]}

Используйте [Velero](https://velero.io/docs/main/), чтобы настраивать резервное копирование кластеров по заданному расписанию в формате [cron](https://crontab.guru/every-1-minute) и восстанавливать кластер на основании этого расписания.

{note:info}
Использование Velero для резервного копирования поддерживается только в кластерах {linkto(../../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-backup-schedule-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.
1. {linkto(../../../install-tools/velero#k8s-velero)[text=Установите и настройте]} Velero, если это еще не сделано.

## {heading(1. Создайте расписание резервного копирования)[id=k8s-backup-schedule-create-schedule]}

Создайте расписание резервного копирования для нужного пространства имен:

```bash
velero schedule create <НАЗВАНИЕ_РАСПИСАНИЯ> --schedule="0 7 * * *" --include-namespaces <ПРОСТРАНСТВО_ИМЕН>
```
   
Здесь:

- `<НАЗВАНИЕ_РАСПИСАНИЯ>` — название расписания, по которому вы сможете в дальнейшем найти его в списке расписаний резервного копирования.
- `<ПРОСТРАНСТВО_ИМЕН>` — пространство имен кластера, для которого нужно настроить расписание. Вы можете указать несколько пространств имен через запятую. Пример такого перечисления:

   ```console
   --include-namespaces test_namespace1,test_namespace2,test_namespace3
   ```
   
   Вы также можете исключить отдельные ресурсы из резервного копирования, даже если они соответствуют пространству имен, указанному при настройке расписания. Примеры такого исключения: 
   
   ```console
   --exclude-resources secrets
   --exclude-namespaces test_namespace1,test_namespace2,test_namespace3
   ```

   Подробнее в [официальной документации Velero](https://velero.io/docs/main/resource-filtering/).
- `--schedule` — параметр, который задает время создания резервных копий в формате [cron](https://crontab.guru/every-1-minute), например `0 7 * * *`. Каждый символ отвечает за конкретное значение времени.
    
   {cut(Как задать время создания резервных копий)}  
      
   ```txt
   ┌───────────── минуты (0 - 59)
   │ ┌───────────── часы (0 - 23)
   │ │ ┌───────────── день месяца (1 - 31)
   │ │ │ ┌───────────── месяц (1 - 12)
   │ │ │ │ ┌───────────── день недели (0 - 6) — от воскресенья до субботы; 7 — тоже воскресенье в некоторых системах
   │ │ │ │ │                                   
   │ │ │ │ │
   │ │ │ │ │
   * * * * *
   ```
   {/cut} 

В результате работы такого расписания резервные копии будут создаваться ежедневно в 07:00. Название каждой резервной копии будет в формате `<НАЗВАНИЕ_РАСПИСАНИЯ>-<TIMESTAMP>`, где `<TIMESTAMP>` — время ее создания. Пример названия: `daily-backup-20260318070000`.

{note:warn}
Время жизни резервной копии по умолчанию — 720 часов. По истечении этого времени резервная копия будет удалена.
{/note}

## {heading(2. Просмотрите созданное расписание)[id=k8s-backup-schedule-view-schedule]}

1. Убедитесь, что созданное расписание появилось в списке расписаний резервного копирования, доступных для выбранного пространства имен:

   ```bash
   velero schedule get --namespace <ПРОСТРАНСТВО_ИМЕН> <НАЗВАНИЕ_РАСПИСАНИЯ>
   ```

   Здесь:

   * `<ПРОСТРАНСТВО_ИМЕН>` — пространство имен, для которого создано расписание резервного копирования.
   * `<НАЗВАНИЕ_РАСПИСАНИЯ>` — название расписания.

   Пример вывода команды:

   ```bash
   NAME                      STATUS   CREATED                         SCHEDULE    BACKUP TTL   LAST BACKUP   SELECTOR   PAUSED
   my-schedule               New      2024-11-11 15:35:32 +0600 +06   0 7 * * *   0s           n/a           <none>     false
   ```

2. Проверьте параметры расписания с помощью команды:

   ```bash
   velero schedule describe <НАЗВАНИЕ_РАСПИСАНИЯ>
   ```

   Пример вывода команды:

   ```bash
   Name:         my_schedule
   Namespace:    test_namespace
   Labels:       <none>
   Annotations:  <none>

   Phase:  New

   Paused:  false
   ```

## {heading(3. Выполните восстановление данных)[id=k8s-backup-schedule-perform-backup]}

Выполните восстановление из резервной копии, которая была создана по указанному расписанию.

```bash
velero restore create --namespace <ПРОСТРАНСТВО_ИМЕН> --from-schedule <НАЗВАНИЕ_РАСПИСАНИЯ>
```

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-backup-schedule-delete]}

Работающий кластер тарифицируется и потребляет вычислительные ресурсы. Если инструмент Velero и ресурсы Kubernetes, созданные для проверки резервного копирования с его помощью, вам больше не нужны, удалите их:

1. Удалите ресурс `restore`:

   ```bash
   kubectl -n velero delete restore
   velero restore delete
   ```

1. Удалите Velero:

   ```bash
   velero uninstall
   ```

1. {linkto(/ru/storage/s3/instructions/objects/manage-object#s3-instructions-manage-object-delete)[text=Удалите]} резервные копии из бакета, который использовался Velero.

   При необходимости также {linkto(/ru/storage/s3/instructions/buckets/manage-bucket#s3-instructions-manage-bucket-delete)[text=удалите сам бакет]}.

{ifdef(public)}
{include(/ru/_includes/_delete-test-cluster-short.md)}
{/ifdef}