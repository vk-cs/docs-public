Use [Velero](https://velero.io/docs/main/) to configure cluster backups based on a schedule you set in the [cron](https://crontab.guru/every-1-minute) format, and then restore the cluster using this schedule.

{note:info}
Using Velero for backups is supported only in [first-generation](/en/kubernetes/k8s/concepts/cluster-generations) clusters.
{/note}

## Preparatory steps

1. [Create](/en/kubernetes/k8s/instructions/create-cluster) a Kubernetes cluster of the latest version, if not done so already.
1. [Make sure](/en/kubernetes/k8s/connect/kubectl) that you can connect to the cluster via `kubectl`.
1. [Install and configure](/en/kubernetes/k8s/install-tools/velero) Velero, if not done so already.

## 1. Create a schedule for backups

Create a schedule for backups for the required namespace:

```bash
velero schedule create <SCHEDULE_NAME> --schedule="0 7 * * *" --include-namespaces <NAMESPACE>
```
   
Here:

- `<SCHEDULE_NAME>` — the name of the schedule by which you can later find it in the list of backup schedules.
- `<NAMESPACE>` — the namespace of the cluster to configure the schedule for. You can specify multiple namespaces as a comma-separated list. Following is an example of such a list:

   ```console
   --include-namespaces test_namespace1,test_namespace2,test_namespace3
   ```

   You can also exclude individual resources from the backup, even if they correspond to the namespace specified when configuring the schedule. Following are examples of such exceptions: 
   
   ```console
   --exclude-resources secrets
   --exclude-namespaces test_namespace1,test_namespace2,test_namespace3
   ```

   For mor details, refer to the [official Velero documentation](https://velero.io/docs/main/resource-filtering/).
- `--schedule` — the parameter that sets the time when backups must be created in the [cron](https://crontab.guru/every-1-minute) format, for example, `0 7 * * *`. Each symbol corresponds to a specific time value.
    
   {cut(How to set up the time for creating backups)}
      
   ```txt
   ┌───────────── minutes (0 - 59)
   │ ┌───────────── hours (0 - 23)
   │ │ ┌───────────── day of the month (1 - 31)
   │ │ │ ┌───────────── month (1 - 12)
   │ │ │ │ ┌───────────── day of the week (0 - 6) — from Sunday to Saturday; 7 is also Sunday in some systems
   │ │ │ │ │                                   
   │ │ │ │ │
   │ │ │ │ │
   * * * * *
   ```
   {/cut} 

As a result of this schedule, backups will be created daily at 07:00. The name of each backup will be in the format of `<BACKUP_NAME>-<TIMESTAMP>`, where `<TIMESTAMP>` is the time the backup is created. Following is an example of a backup name: `daily-backup-20260318070000`.

{note:warn}
The default backup lifetime is 720 hours. After that time, the backup will be deleted.
{/note}

## 2. Review the created schedule

1. Make sure that the created schedule appears in the list of backup schedules available for the selected namespace:

   ```bash
   velero schedule get --namespace <NAMESPACE> <SCHEDULE_NAME>
   ```

   Here:

   * `<NAMESPACE>` — the namespace for which the backup schedule is created.
   * `<SCHEDULE_NAME>` — the name of the schedule.

   Output example:

   ```bash
   NAME                      STATUS   CREATED                         SCHEDULE    BACKUP TTL   LAST BACKUP   SELECTOR   PAUSED
   my-schedule               New      2024-11-11 15:35:32 +0600 +06   0 7 * * *   0s           n/a           <none>     false
   ```

2. Check the schedule parameters using the command:

   ```bash
   velero schedule describe <SCHEDULE_NAME>
   ```

   Output example:

   ```bash
   Name:         my_schedule
   Namespace:    test_namespace
   Labels:       <none>
   Annotations:  <none>

   Phase:  New

   Paused:  false
   ```

## 3. Restore data

Restore data from the backup that was created according to the schedule you configured.

```bash
velero restore create --namespace <NAMESPACE> --from-schedule <SCHEDULE_NAME>
```

## Delete unused resources

A running cluster consumes computing resources and is charged accordingly. If you no longer need the Velero tool and the Kubernetes resources you created to test the backup process, delete them:

1. Delete the `restore` resource:

   ```bash
   kubectl -n velero delete restore
   velero restore delete
   ```

1. Delete Velero:

   ```bash
   velero uninstall
   ```

1. [Delete](/ru/storage/s3/instructions/objects/manage-object#udalenie_obektov "change-lang") the backups from the bucket that Velero used.

   If necessary, also [delete](/en/storage/s3/instructions/buckets/bucket#removing_a_bucket) the bucket itself.

1. [Stop](/en/kubernetes/k8s/instructions/manage-cluster#start_or_stop_cluster) the cluster you created to use it later or [delete](/en/kubernetes/k8s/instructions/manage-cluster#delete_cluster) it permanently.