Description
-----------

Velero is a handy backup tool for kubernetes that compresses and backs up kubernetes objects to object storage.

It can also take a snapshot of a persistent volume cluster using the cloud provider's block device snapshot capabilities.

As a result, Velero can deploy persistent volumes from a backup in their original form.

Each Velero operation - On-Demand Backup, Scheduled Backup, Restore from Backup - is a custom resource defined using Custom Resource Defenition (CRD). Velero also contains its own controllers to track backup operations.

Velero is ideal for a disaster recovery plan and for preparing a kubernetes cluster for upgrade by taking snapshots of the cluster resource state.

In this scenario, we will install and configure the velero to interact with the kubernetes cluster from VK Cloud Solutions and make a backup of the namespace with all the content to the S3 cloud storage.

Installing Velero client
------------------------

Velero consists of a client that is installed on the local computer of the administrator of the kubernetes cluster and a server that runs in the kubernetes cluster itself.

Install the Velero client on Ubuntu 18.04 from the project's release list on GitHub [https://github.com/vmware-tanzu/velero/releases](https://github.com/vmware-tanzu/velero/releases)

We will use the current stable version of the project - 1.2.0

Download the archive with the client to the local kubernetes administrator machine:

 wget https://github.com/vmware-tanzu/velero/releases/download/v1.2.0/velero-v1.2.0-linux-amd64.tar.gz

Unpack the archive and transfer the binary file to the directory of executable programs

 tar -xvf velero-v1.2.0-linux-amd64.tar.gz
mv velero / usr / bin /

Let's make sure the Velero is working - let's call the reference information:

 velero --help

Creating a bucket for backups
-----------------------------

Since velero saves its backups to s3 storage, it is necessary to create a bucket in s3 storage VK CS before installing the server into the cluster.

Let's create a veleromail bucket via VK CS Panel in the "Object Storage" section.

![](./assets/1602114313386-1602114313386.png)

Velero communicates with s3 repositories through the AWS S3 plugin, so the communication protocol will operate in terms of AWS Object Storage.

Since we need keys to access the bucket, let's create a s3\_creds file in the directory with the following content:

 \[default\]
aws\_access\_key\_id = <AWS\_ACCESS\_KEY\_ID>
aws\_secret\_access\_key = <AWS\_SECRET\_ACCESS\_KEY>

Access keys can be obtained when creating an account in the VK CS Panel in the "Object storage" section.

Installing the velero server
----------------------------

A Velero installation consists of several kubernetes objects that work together to create, schedule, and manage backups.

The velero install command will take the preliminary steps to set up your cluster, in particular:

*   will create namespace velero
*   add velero service account
*   configures rbac to access the velero account service
*   will install CRD for specific velero resources - Backup, Schedule, Restore, Config

Let's execute the command:

 velero install \\
--plugins velero / velero-plugin-for-aws: v1.0.0 \\
--provider aws \\
--bucket veleromail \\
--secret-file ./s3\_cred \\
--use-volume-snapshots = false \\
--backup-location-config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443

Let's dwell on the arguments in detail:

*   \--plugins velero / velero-plugin-for-aws: v1.0.0 - plugin for interacting with s3 storage for backups
*   \--provaider aws - protocol for interacting with s3 storage
*   \--bucket veleromail - bucket for backups
*   \--secret-file ./s3\_cred - file with keys for connecting to s3 storage
*   \--use-volume-snapshots = false - we will not use pv snapshots for the current provider
*   \--backup-location-config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443 - endpoint of connection to VK CS Object Storage

After executing the command, we should see similar output:

 CustomResourceDefinition / backups.velero.io: attempting to create resource
CustomResourceDefinition / backups.velero.io: created
CustomResourceDefinition / backupstoragelocations.velero.io: attempting to create resource
CustomResourceDefinition / backupstoragelocations.velero.io: created
CustomResourceDefinition / deletebackuprequests.velero.io: attempting to create resource
CustomResourceDefinition / deletebackuprequests.velero.io: created
CustomResourceDefinition / downloadrequests.velero.io: attempting to create resource
CustomResourceDefinition / downloadrequests.velero.io: created
CustomResourceDefinition / podvolumebackups.velero.io: attempting to create resource
CustomResourceDefinition / podvolumebackups.velero.io: created
CustomResourceDefinition / podvolumerestores.velero.io: attempting to create resource
CustomResourceDefinition / podvolumerestores.velero.io: created
CustomResourceDefinition / resticrepositories.velero.io: attempting to create resource
CustomResourceDefinition / resticrepositories.velero.io: created
CustomResourceDefinition / restores.velero.io: attempting to create resource
CustomResourceDefinition / restores.velero.io: created
CustomResourceDefinition / schedules.velero.io: attempting to create resource
CustomResourceDefinition / schedules.velero.io: created
CustomResourceDefinition / serverstatusrequests.velero.io: attempting to create resource
CustomResourceDefinition / serverstatusrequests.velero.io: created
CustomResourceDefinition / volumesnapshotlocations.velero.io: attempting to create resource
CustomResourceDefinition / volumesnapshotlocations.velero.io: created
Waiting for resources to be ready in cluster ...
Namespace / velero: attempting to create resource
Namespace / velero: created
ClusterRoleBinding / velero: attempting to create resource
ClusterRoleBinding / velero: created
ServiceAccount / velero: attempting to create resource
ServiceAccount / velero: created
Secret / cloud-credentials: attempting to create resource
Secret / cloud-credentials: created
BackupStorageLocation / default: attempting to create resource
BackupStorageLocation / default: created
Deployment / velero: attempting to create resource
Deployment / velero: created
Velero is installed! ⛵ Use 'kubectl logs deployment / velero -n velero' to view the status.

Check the status with the command:

 kubectl logs deployment / velero -n velero

The output should not contain errors.

Creating backups
----------------

We will check the creation and restoration from backups using the nginx server as an example.

Let's create an nginx-app.yml file with the following content:

 ---
apiVersion: v1
kind: Namespace
metadata:
name: nginx-example
labels:
app: nginx
---
apiVersion: apps / v1
kind: Deployment
metadata:
name: nginx-deployment
namespace: nginx-example
spec:
replicas: 2
selector:
matchLabels:
app: nginx
template:
metadata:
labels:
app: nginx
spec:
containers:
- image: nginx
name: nginx
ports:
- containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
labels:
app: nginx
name: my-nginx
namespace: nginx-example
spec:
ports:
- port: 80
targetPort: 80
selector:
app: nginx
type: LoadBalancer

Let's apply this manifest:

 kubectl apply -f nginx-app.yaml

We should see the following in the command output:

 namespace / nginx-example created
deployment.apps / nginx-deploy created
service / nginx-svc created

A nginx-example namespace with a running nginx server will appear in our cluster.

Let's see what IP address will be issued to the nginx loadbalancer kubernetes service and go to this IP in the browser:

 kubectl get svc -n nginx-example 
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT (S) AGE
my-nginx LoadBalancer 10.254.3.81 95.163.208.41 80: 32626 / TCP 4h3m

![](./assets/1589308344318-1589308344318.png)

Velero offers a wide variety of backup options. We can specify objects with specific labels via selector, or specify the entire namespace as a whole.

Create a backup for the entire nginx-example namespace by running the following command:

 velero backup create nginx-example --include-namespaces nginx-example

To view existing backups, velero has the velero get backups command:

 # velero get backups 
NAME STATUS CREATED EXPIRES STORAGE LOCATION SELECTOR
nginx-example Completed 2020-02-07 16:02:26 +0300 MSK 29d default <none>

We also have the opportunity to study the contents of the backup in more detail with the describe command:

 velero backup describe nginx-backup --details

 Name: nginx-example

Namespace: velero

Labels: velero.io/storage-location=default
Annotations: <none>

Phase: Completed

Namespaces:
Included: nginx-example
Excluded: <none>
Resources:
Included: \*
Excluded: <none>
Cluster-scoped: auto

Label selector: <none>

Storage Location: default

Snapshot PVs: auto

TTL: 720h0m0s

Hooks: <none>

Backup Format Version: 1

Started: 2020-02-07 16:02:26 +0300 MSK
Completed: 2020-02-07 16:02:27 +0300 MSK

Expiration: 2020-03-08 16:02:26 +0300 MSK

Resource List:
apps / v1 / Deployment:
- nginx-example / nginx-deployment
apps / v1 / ReplicaSet:
- nginx-example / nginx-deployment-5754944d6c
- nginx-example / nginx-deployment-7bfb85948d
v1 / Endpoints:
- nginx-example / my-nginx
v1 / Namespace:
- nginx-example
v1 / Pod:
- nginx-example / nginx-deployment-7bfb85948d-jfzh9
- nginx-example / nginx-deployment-7bfb85948d-x7h7t
v1 / Secret:
- nginx-example / default-token-9svxb
v1 / Service:
- nginx-example / my-nginx
v1 / ServiceAccount:
- nginx-example / default

Persistent Volumes: <none included>

The list of resources reflects each of the Kubernetes objects that got into the backup.

Make sure there is a backup in s3 storage

![](./assets/1589308366322-1589308366319.png)

Restore from backup
-------------------

Let's simulate a disaster and remove the namespace with our test application:

 kubectl delete ns nginx-example

Make sure the namespace is removed

 kubectl get ns 
NAME STATUS AGE
default Active 21h
ingress-nginx Active 21h
kube-node-lease Active 21h
kube-public Active 21h
kube-system Active 21h
magnum-tiller Active 21h
velero Active 3h16m

Now let's start restoring from a backup. Let's set the command:

 velero restore create --from-backup nginx-example
Restore request "nginx-example-20200207171734" submitted successfully.
Run \`velero restore describe nginx-example-20200207171734\` or\` velero restore logs nginx-example-20200207171734\` for more details.

The namespace with all resources has been successfully restored.

We will verify this by running the following command:

 k get po -n nginx-example 
NAME READY STATUS RESTARTS AGE
nginx-deployment-7bfb85948d-jfzh9 1/1 Running 0 62s
nginx-deployment-7bfb85948d-x7h7t 1/1 Running 0 62s

As you can see, the namespace and web server pods have been restored.

Creating a backup on a schedule
-------------------------------

Velero has a mechanism for creating scheduled backups. A scheduler is responsible for this, which is similar in functionality to cron.

Let's create a schedule for an hourly backup of the test namespace nginx-example. To do this, run the command:

 velero schedule create daily --schedule = "@ every 1h" --include-namespaces nginx-example --ttl 24h0m0s

At the stage of creating a schedule, you need to specify the name of the schedule - in our case, daily and set parameters through the arguments.

\--schedule = "@ every 1h" - create once per hour. This parameter can take various options for setting the schedule as arguments - including the cron scheme.

For example, the help for this parameter looks like this:

 velero schedule create NAME --schedule \[flags\]
Examples:
# Create a backup every 6 hours
velero create schedule NAME --schedule = "0 \* / 6 \* \* \*"


# Create a backup every 6 hours with the @every notation
velero create schedule NAME --schedule = "@ every 6h"


# Create a daily backup of the web namespace
velero create schedule NAME --schedule = "@ every 24h" --include-namespaces web


# Create a weekly backup, each living for 90 days (2160 hours)
velero create schedule NAME --schedule = "@ every 168h" --ttl 2160h0m0s

*   \--include-namespaces nginx-example - which namespace we include in the backup
*   \--ttl - how long the backup version will live before deleting

To see what the schedules are, run the command:

 velero get schedule 
NAME STATUS CREATED SCHEDULE BACKUP TTL LAST BACKUP SELECTOR
daily Enabled 2020-02-07 17:27:00 +0300 MSK @every 1h 24h0m0s 8m ago <none>

In the list of backups, a scheduled backup will have a prefix with the name of the schedule.

 velero get backups 
NAME STATUS CREATED EXPIRES STORAGE LOCATION SELECTOR
daily-20200207142700 Completed 2020-02-07 17:27:00 +0300 MSK 23h default <none>
nginx-example Completed 2020-02-07 16:02:26 +0300 MSK 29d default <none>