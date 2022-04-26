Using the Velero software product, you can create a backup copy of a Kubernetes cluster to the VK Cloud Solutions cloud - and deploy this copy to a new cluster. This operation is useful when you want to replicate a custom cluster.

For this you will need:

- Kubernetes cluster deployed in VK CS
- Velero client
- OpenStack Plugin

## Description

Velero is a handy Kubernetes backup tool that compresses and backs up Kubernetes objects to object storage.

It can also take a snapshot from a persistent volume cluster using the cloud provider's block device snapshot capabilities.

As a result, Velero can deploy persistent volumes from a backup in their original form.

Every Velero operation - on-demand backup, scheduled backup, restore from backup - is a custom resource defined using a Custom Resource Definition (CRD). Velero also contains its own controllers for tracking backup operations.

Velero is ideal for a disaster recovery plan and for preparing a kubernetes cluster for an upgrade by taking snapshots of the cluster resource state.

In this scenario, we will install and configure velero to interact with the kubernetes cluster on VK Cloud Solutions and make a backup of the cluster with all its content to the S3 cloud storage VK Cloud Solutions Storage using the Openstack plugin.

## Installing Velero client

Velero consists of a client that is installed on the local computer of the administrator of the kubernetes cluster and a server that runs in the kubernetes cluster itself.

Install Velero client on Ubuntu 18.04 from the project's release list on GitHub

https://github.com/vmware-tanzu/velero/releases

We will use the current stable version of the project - 1.2.0.

Download the archive with the client to the local kubernetes administrator machine, unpack and install:

wget https://github.com/vmware-tanzu/velero/releases/download/v1.2.0/velero-v1.2.0-linux-amd64.tar.gz
tar -zxvf velero-v1.2.0-linux-amd64.tar.gz
sudo cp velero-v1.2.0-linux-amd64 / velero / usr / local / bin
velero version

## Creating a bucket for backups

Since Velero saves its backups to S3 storage, it is necessary to create a bucket in S3 storage before installing the server into the cluster.

Let's create a velero bucket in the Object Storage service using the VK CS Panel.

![](./assets/1602117205468-1602117205468.png)

You also need to create an account to access the bucket in the Object Storage service and get access keys:

![](./assets/1594616550506-1594616550506.png)

We will write the obtained access keys to the s3_creds file:

\[default\]
aws_access_key_id = <Access Key ID>
aws_secret_access_key = <Secret Key>

## Installing velero on a Kubernetes cluster

Let's execute the command:

velero install --plugins velero / velero-plugin-for-aws: v1.0.0 --provider aws --bucket my_velero_backup --secret-file ./s3_cred --use-volume-snapshots = false --backup-location-config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443

Let's dwell on the arguments in detail:

- \--plugins velero / velero-plugin-for-aws: v1.0.0 - plugin for interacting with S3 storage for backups
- \--provider aws - protocol for interacting with S3 storage
- \--bucket my_velero_backup - the backup bucket we created in the previous step.
- \--secret-file ./s3_cred - a file for secrets with keys to connect to the S3 storage
- \--use-volume-snapshots = false - we will not use pv snapshots for the current provider
- \--backup-location-config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443 - link to the VK Cloud Solutions Storage S3 storage.

After executing the command, you can see similar output:

CustomResourceDefinition / backups.velero.io: attempting to create resource
CustomResourceDefinition / backups.velero.io: already exists, proceeding
CustomResourceDefinition / backups.velero.io: created
...
Deployment / velero: attempting to create resource
Deployment / velero: already exists, proceeding
Deployment / velero: created
Velero is installed! ⛵ Use 'kubectl logs deployment / velero -n velero' to view the status.

Check the status with the command:

kubectl logs deployment / velero -n velero

The output should not contain errors.

## Installing the Openstack plugin

Now you need to install the openstack plugin to work with the openstack cinder repository.

The first step is to get an openstack rc file containing the environment variables required to access the Openstack API.

You can get the file in the ["Project Settings" menu](https://mcs.mail.ru/app/project/keys/) in your personal account[](https://mcs.mail.ru/app/project/keys/) VK CS

![](./assets/1601848462552-1601848462552.png)

Save the file as openrc.sh, add execute permissions and execute:

... openrc.sh

You must enter the password for your VK CS account. After that, the openstack access parameters will be set in the environment variables.

Let's create a credential file for the plugin using the account settings:

kubectl -n velero create secret generic openstack-cloud-credentials --from-literal OS_PROJECT_ID = $ OS_PROJECT_ID --from-literal OS_REGION_NAME = $ OS_REGION_NAME --from-literal OS_DOMAIN_ID = $ OS_USIDER_DOMAIN_ID = $ OS_USIDER_DOMAIN_VERT. from-literal OS_PASSWORD = $ OS_PASSWORD --from-literal OS_AUTH_URL = $ OS_AUTH_URL --from-literal OS_USERNAME = $ OS_USERNAME --from-literal OS_INTERFACE = $ OS_INTERFACE --from-literal OS_PROINAJECT_DOM $ OS_FILE_OPERATION_TIMEOUT -o yaml
apiVersion: v1
data:
OS_AUTH_URL: aHR0cHM6Ly9pbmZyYS5tYWlsLnJ1OjM1MzU3L3YzLw ==
OS_DOMAIN_ID: ""
OS_FILE_OPERATION_TIMEOUT: ""
OS_IDENTITY_API_VERSION: Mw ==
OS_INTERFACE: cHVibGslj
OS_PASSWORD: xxxxxxxxxxxxxx
OS_PROJECT_DOMAIN_ID: MmY4NDhkYWY3xMWY1NDQ0ZfmIzOWVlZDVdmYmZkOTFiMmI =
OS_PROJECT_ID: MGNkYldrWFhNjQwMmQ0NDI0ZTk2NzZjNzVhNzIwYWZhODU =
OS_REGION_NAME: UmVnsdaW9uT25l
OS_USERNAME: cm9tYW5lbmtvZGVueXNAZ21haWwuYas29t
kind: Secret
metadata:
creationTimestamp: "2020-04-14T10: 38: 33Z"
name: openstack-cloud-credentials
namespace: velero
resourceVersion: "5976669"
selfLink: / api / v1 / namespaces / velero / secrets / openstack-cloud-credentials
uid: 923ad314-b870-476f-9da7-4b2a526d9bbb
type: Opaque

Let's edit the velero deployment. To do this, run the command

kubectl edit deployment / velero -n velero

In the opened editor window, find the section:

spec:
containers:

- args:
- server
  command: - / velero

And we will bring it to the following form:

spec:
containers:

- args:
- server
  envFrom:
- secretRef:
  name: openstack-cloud-credentials
  command: - / velero

Let's save the deployment.

Let's install the plugin:

velero plugin add registry.infra.mail.ru:5010/test/velero-plugin-openstack:cinder

Let's create a location for storing snapshots:

velero snapshot-location create default --provider openstack \\

> --config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443, bucket = my_velero_backup, secret-file =. / s3_cred

The configured locations can be viewed using the command:

velero get snapshot-locations

Will restart the deployment:

kubectl rollout restart deployment / velero -n velero

## Creating backups

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

Let's apply the manifest:

kubectl apply -f nginx-app.yaml

The nginx-example namespace with a running nginx server will appear in the cluster
Let's see what IP address will be issued to the nginx loadbalancer kubernetes service and go to this IP in the browser:

kubectl get svc -n nginx-example
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT (S) AGE
my-nginx LoadBalancer 10.254.244.134 95.163.250.147 80: 31545 / TCP 2m54s

![](./assets/1594616601069-1594616601069.png)

Velero offers a wide variety of backup options. We can specify objects with specific labels through the selector, or specify the entire namespace as a whole.

Create a backup for the entire nginx-example namespace by running the following command:

velero backup create nginx-example --include-namespaces nginx-example

To view existing backups, velero has the velero get backups command:

velero get backups
NAME STATUS CREATED EXPIRES STORAGE LOCATION SELECTOR
nginx-example Completed 2020-04-14 11:25:46 +0000 UTC 29d default <none>

We also have the opportunity to study the contents of the backup in more detail with the describe command:

velero describe backups
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

Started: 2020-04-14 11:25:46 +0000 UTC
Completed: 2020-04-14 11:25:52 +0000 UTC

Expiration: 2020-05-14 11:25:46 +0000 UTC

Persistent Volumes: <none included>

The list of resources reflects each of the Kubernetes objects that got into the backup.

Make sure there is a backup in S3 storage

![](./assets/1594616614131-1594616614131.png)

## Restore from backup

Let's simulate a disaster and remove the namespace with our test application:

kubectl delete ns nginx-example

Now let's start restoring from a backup. Run the command:

velero restore create --from-backup nginx-example
Restore request "nginx-example-20200414114045" submitted successfully.
Run \`velero restore describe nginx-example-20200414114045\` or\` velero restore logs nginx-example-20200414114045\` for more details.

The namespace with all resources has been successfully restored. Verify this by running the following command:

kubectl get pods -n nginx-example
NAME READY STATUS RESTARTS AGE
nginx-deployment-85ff79dd56-qchn9 1/1 Running 0 95s
nginx-deployment-85ff79dd56-vgwwn 1/1 Running 0 95s

As you can see, the namespace and web server pods have been restored.

If you are restoring to another cluster, then before restoring from a backup, you must repeat the Velero configuration for the new cluster (repeat the Installing velero to a Kubernetes cluster and Installing the Openstack plugin steps). Bucket and bucket access keys are used by existing ones (Bucket where the created backup of the Kubernetes cluster is located).

## Creating a backup on a schedule

Velero has a mechanism for creating scheduled backups. A scheduler is responsible for this, which is similar in functionality to cron.

Let's create a schedule for an hourly backup of the test namespace nginx-example.

To do this, run the command:

velero schedule create daily --schedule = "@ every 1h" --include-namespaces nginx-example --ttl 24h0m0s
Schedule "daily" created successfully.

At the stage of creating a schedule, you need to specify the name of the schedule - in our case, daily and pass parameters through the arguments:

- \--schedule = "@ every 1h" - create once per hour. This parameter can accept various options for setting the schedule as arguments, including using the cron scheme, for example, - schedule = "0 \* / 6 \* \* \*". Details of use can be found in the help.
- \--include-namespaces nginx-example - which namespace we include in the backup
- \--ttl - how long the backup version will live before deleting

To see what schedules there are, run the command:

velero get schedule
NAME STATUS CREATED SCHEDULE BACKUP TTL LAST BACKUP SELECTOR
daily Enabled 2020-04-14 11:43:46 +0000 UTC @every 1h 24h0m0s 2m ago <none>

In the list of backups, a scheduled backup will have a prefix with the name of the schedule:

velero get backups
NAME STATUS CREATED EXPIRES STORAGE LOCATION SELECTOR
daily-20200414114346 Completed 2020-04-14 11:43:46 +0000 UTC 23h default <none>
nginx-example Completed 2020-04-14 11:25:46 +0000 UTC 29d default <none>

## Removing Velero from a Kubernetes cluster

If Velero is no longer needed, then removal is performed with the following command:

kubectl delete namespace / velero clusterrolebinding / velero
