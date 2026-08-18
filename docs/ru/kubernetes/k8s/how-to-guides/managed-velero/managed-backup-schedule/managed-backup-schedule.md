# {heading(Резервное копирование по расписанию)[id=k8s-backup-schedule-managed]}

Используйте аддон {linkto(../../../concepts/addons-and-settings/addons#k8s-addons-velero)[text=Velero]}, чтобы настраивать резервное копирование кластеров по заданному расписанию в формате [cron](https://crontab.guru/every-1-minute) и восстанавливать кластер на основании этого расписания.

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=note-managed]}

## {heading(Подготовительные шаги)[id=k8s-backup-schedule-managed-prepare]}

{include(/ru/_includes/_create-test-cluster.md)}
1. {linkto(../../../connect/kubectl#k8s-kubectl)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.
1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#k8s-install-advanced-velero)[text=Установите аддон Velero]}, если это еще не сделано.

## {heading({counter(managed-velero-schedule)}. Создайте приложение)[id=k8s-velero-backup-schedule-managed-create-app]}

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero-schedule)}. Создайте расписание резервного копирования)[id=k8s-backup-schedule-managed-create-schedule]}

1. Создайте манифест `coffee-schedule.yaml`:

   ```bash
   apiVersion: velero.io/v1
   kind: Schedule
   metadata:
     name: coffee-schedule
     namespace: velero
   spec:
     schedule: "*/10 * * * *"
     template:
       includedNamespaces:
         - example-app
   ```

   Здесь:

   - `coffee-schedule` — название расписания, по которому вы сможете в дальнейшем найти его в списке расписаний резервного копирования. 
   - `velero` — пространство имен кластера, для которого вы настраиваете расписание.

      {cut(Как в резервном копировании использовать несколько пространств имен)}
   
      Укажите необходимые пространства имен в блоке `includedNamespaces`. Пример:
      
      ```yaml
      includedNamespaces:
        - example-app
        - another-namespace
        - logging
      ```
   
      {/cut}

      {cut(Как из резервного копирования исключить определенные пространства имен)}
   
      Добавьте блок `excludedNamespaces` и укажите в нем необходимые пространства имен. Пример:
   
      ```yaml
      excludedNamespaces:
       - example-app-test
      ```
   
      {/cut}
   
   - `schedule` — параметр, который задает время создания резервных копий в формате [cron](https://crontab.guru/every-1-minute), например `*/10 * * * *` — каждые 10 минут. Каждый символ отвечает за конкретное значение времени.
    
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

1. Примените манифест в кластере: 

   ```console
   kubectl apply -f coffee-schedule.yaml
   ```

В результате работы такого расписания резервные копии будут создаваться каждые 10 минут. Название каждой резервной копии будет в формате `<НАЗВАНИЕ_РАСПИСАНИЯ>-<TIMESTAMP>`, где `<TIMESTAMP>` — время ее создания. Пример названия: `daily-backup-20260805070000`.

Время жизни резервной копии по умолчанию — 72 часа. По истечении этого времени резервная копия будет удалена.

## {heading({counter(managed-velero-schedule)}. Просмотрите созданное расписание)[id=k8s-backup-schedule-managed-view-schedule]}

Проверьте параметры созданного расписания с помощью команды:

```bash
kubectl -n velero describe schedule coffee-schedule
```

Пример вывода команды:

```text
Name:         coffee-schedule
Namespace:    velero
Labels:       <none>
Annotations:  <none>
API Version:  velero.io/v1
Kind:         Schedule
Metadata:
  Creation Timestamp:  2026-08-03T09:25:46Z
  Generation:          2
  Resource Version:    19702
  UID:                 b77cc369-5430-48d0-831c-df057b5e0277
Spec:
  Schedule:          */10 * * * *
  Skip Immediately:  false
  Template:
    Included Namespaces:
      example-app
Status:
  Phase:  Enabled
Events:   <none>
```

## {heading({counter(managed-velero-schedule)}. Выполните восстановление данных из копии, созданной по расписанию)[id=k8s-backup-schedule-managed-perform-backup]}

1. Создайте манифест `coffee-schedule-restore.yaml`:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-schedule-restore
     namespace: velero
   spec:
     scheduleName: coffee-schedule
   ```

1. Примените манифест в кластере: 

   ```console
   kubectl apply -f coffee-schedule-restore.yaml
   ```

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-backup-schedule-managed-delete]}

{include(/ru/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}
