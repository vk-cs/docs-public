# {heading(Scheduled backup)[id=mk8s-backup-schedule-managed]}

{include(/en/_includes/_translated_by_ai_en.md)}

Use the {linkto(../../../concepts/addons-and-settings/addons#mk8s-addons-velero)[text=Velero]} add-on to configure cluster backups on a given schedule in [cron](https://crontab.guru/every-1-minute) format and to restore a cluster based on that schedule.

## {heading(Preparation steps)[id=mk8s-backup-schedule-managed-prepare]}

{include(/en/_includes/_create-test-cluster.md)[tags=managed]}
1. {linkto(../../../connect/kubectl#mk8s-kubectl)[text=Make sure]} that you can connect to the cluster using `kubectl`.
1. {linkto(../../../instructions/addons/advanced-installation/install-advanced-velero#mk8s-install-advanced-velero)[text=Install the Velero add-on]}, if this has not been done yet.

## {heading({counter(managed-velero-schedule)}. Create an application)[id=mk8s-velero-backup-schedule-managed-create-app]}

{include(/en/_includes/_velero-magnum-how-to.md)[tags=create-app]}

## {heading({counter(managed-velero-schedule)}. Create a backup schedule)[id=mk8s-backup-schedule-managed-create-schedule]}

1. Create the `coffee-schedule.yaml` manifest:

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

   Here:

   - `coffee-schedule` — the name of the schedule, which you will later be able to find in the list of backup schedules.
   - `velero` — the cluster namespace for which you are configuring the schedule.

      {cut(How to use multiple namespaces in backup)}
   
      Specify the required namespaces in the `includedNamespaces` block. Example:
      
      ```yaml
      includedNamespaces:
        - example-app
        - another-namespace
        - logging
      ```
   
      {/cut}

      {cut(How to exclude specific namespaces from backup)}
   
      Add the `excludedNamespaces` block and specify the required namespaces in it. Example:
   
      ```yaml
      excludedNamespaces:
       - example-app-test
      ```
   
      {/cut}
   
   - `schedule` — the parameter that sets the backup creation time in [cron](https://crontab.guru/every-1-minute) format, for example `*/10 * * * *` — every 10 minutes. Each character is responsible for a specific time value.
    
      {cut(How to set the backup creation time)}  
      
      ```txt
      ┌───────────── minutes (0 - 59)
      │ ┌───────────── hours (0 - 23)
      │ │ ┌───────────── day of month (1 - 31)
      │ │ │ ┌───────────── month (1 - 12)
      │ │ │ │ ┌───────────── day of week (0 - 6) — from Sunday to Saturday; 7 — also Sunday on some systems
      │ │ │ │ │                                   
      │ │ │ │ │
      │ │ │ │ │
      * * * * *
      ```
      {/cut} 

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f coffee-schedule.yaml
   ```

As a result of this schedule, backups will be created every 10 minutes. The name of each backup will be in the format `<SCHEDULE_NAME>-<TIMESTAMP>`, where `<TIMESTAMP>` is its creation time. Example name: `daily-backup-20260805070000`.

The default backup retention period is 72 hours. After this time, the backup will be deleted.

## {heading({counter(managed-velero-schedule)}. View the created schedule)[id=mk8s-backup-schedule-managed-view-schedule]}

Check the parameters of the created schedule using the command:

```bash
kubectl -n velero describe schedule coffee-schedule
```

Example of the command output:

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

## {heading({counter(managed-velero-schedule)}. Perform data restoration from a backup created by schedule)[id=mk8s-backup-schedule-managed-perform-backup]}

1. Create the `coffee-schedule-restore.yaml` manifest:

   ```yaml
   apiVersion: velero.io/v1
   kind: Restore
   metadata:
     name: coffee-schedule-restore
     namespace: velero
   spec:
     scheduleName: coffee-schedule
   ```

1. Apply the manifest in the cluster:

   ```console
   kubectl apply -f coffee-schedule-restore.yaml
   ```

## {heading(Delete unused resources)[id=mk8s-backup-schedule-managed-delete]}

{include(/en/_includes/_velero-magnum-how-to.md)[tags=delete-managed]}