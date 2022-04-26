Using Velero, you can create a backup copy of a Kubernetes cluster to the VK Cloud Solutions cloud and deploy this copy to a new cluster. This operation is useful when you want to replicate a custom cluster.

For this you will need:

- Kubernetes cluster deployed in VK CS;
- Velero client;
- OpenStack Plugin.

## Description

Velero is a handy Kubernetes backup tool that compresses and backs up Kubernetes objects to object storage.

It can take a snapshot from a persistent volume cluster using the cloud provider's block device snapshot capabilities. As a result, Velero can deploy Persistent Volumes from a backup in its original form.

Every Velero operation — on-demand backup, scheduled backup, restore from backup - is a custom resource defined using Custom Resource Definition. Velero also contains its own controllers for tracking backup operations.

Velero is ideal for a disaster recovery plan and for preparing a Kubernetes cluster for an upgrade by taking snapshots of the state of the cluster resources. In this scenario, we will install and configure Velero to interact with the Kubernetes cluster on VK Cloud Solutions and make a backup of the namespace with all content to the VK Cloud Storage S3 cloud storage using the Openstack plugin.

## Installing Velero client

Velero consists of:

- a client that is installed on the local Kubernetes cluster administrator computer;
- a server that runs on the kubernetes cluster itself.

Additionally, you may need an Openstack client with a block storage API package. Read more [here](https://mcs.mail.ru/help/ru_RU/user-account/mgmt-interfaces#section-3).

Install the Velero client on Ubuntu 20.04. Use project version — [1.2.0.](https://github.com/vmware-tanzu/velero/releases/tag/v1.2.0)

Then download the archive with the client to the local Kubernetes admin machine, unpack and install:

```
wget https://github.com/vmware-tanzu/velero/releases/download/v1.2.0/velero-v1.2.0-linux-amd64.tar.gz
tar -zxvf velero-v1.2.0-linux-amd64.tar.gz
sudo cp velero-v1.2.0-linux-amd64/velero /usr/local/bin
```

To check if the Velero is working, call the help information:

```
velero --help
```

## Creating a bucket for backups

Since Velero saves its backups to S3 storage, it is necessary to create a bucket in S3 storage before installing the server into the cluster.

Create a my-velero-backup bucket in the Object Storage service using the VK CS Panel.

![](./assets/1635260240187-unnamed.png)

You also need to create an account to access the bucket in the Object Storage service and get access keys:

![](<./assets/1635260480209-unnamed-(1).png>)

Write the obtained access keys to the s3_creds file:

```
[default]
aws_access_key_id=<Access Key ID>
aws_secret_access_key=<Secret Key>
```

## Installing the velero server

A Velero installation consists of multiple Kubernetes objects that work together to create, schedule, and manage backups.

The velero install command will take the preliminary steps to set up your cluster, in particular:

- will create a namespace velero;
- add a velero service account;
- configures rbac to access the Velero account service;
- will install CRD for Velero specific resources — Backup, Schedule, Restore, Config.

Run the command:

```
velero install \
--plugins velero/velero-plugin-for-aws:v1.0.0 \
--provider aws \
--bucket my-velero-backup \
--secret-file ./s3_cred \
--use-volume-snapshots=true \
--backup-location-config region=mail,s3ForcePathStyle="true",s3Url=https://hb.bizmrg.com:443
```

Let's dwell on the arguments in detail:

- \--plugins velero / velero-plugin-for-aws: v1.0.0 — plugin for interacting with S3 storage for backups.
- \--provider aws — protocol for interacting with S3 storage.
- \--bucket my-velero-backup — bucket for backups.
- \--secret-file ./s3_cred — file with keys for connecting to S3 storage.
- \--use-volume-snapshots = true — we will use PV snapshots for the current provider.
- \--backup-location-config region = mail, s3ForcePathStyle = "true", s3Url = https: //hb.bizmrg.com: 443 — endpoint of connection to VK CS Object Storage.

After executing the command, you can see similar output:

```
CustomResourceDefinition/backups.velero.io: attempting to create resource
CustomResourceDefinition/backups.velero.io: already exists, proceeding
CustomResourceDefinition/backups.velero.io: created
...
Deployment/velero: attempting to create resource
Deployment/velero: already exists, proceeding
Deployment/velero: created
Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
```

Check the status with the command:

```
kubectl logs deployment/velero -n velero
```

The output should be free of errors.

## Installing the VK CS plugin

Next, you need to install the VK CS plugin to work with block storage.

First, you need to get an openstack rc file containing the environment variables required to access the Openstack API. You can get the file in the " [Project settings](https://mcs.mail.ru/app/project/keys/) " menu in your VK CS personal account. To do this, go to the " API Keys " section and click "Download openrc version 3".

Save the file as openrc.sh. Next, add execute permissions:

```
. openrc.sh
```

Enter the password for your VK Cloud Solutions account. After that, the openstack access parameters will be set in the environment variables.

Create a credential file for the plugin using your account settings:

```
kubectl -n velero create secret generic openstack-cloud-credentials \
--from-literal OS_PROJECT_ID=$OS_PROJECT_ID \
--from-literal OS_REGION_NAME=$OS_REGION_NAME \
--from-literal OS_IDENTITY_API_VERSION=$OS_IDENTITY_API_VERSION \ --from-literal OS_PASSWORD=$OS_PASSWORD \
--from-literal OS_AUTH_URL=$OS_AUTH_URL \
--from-literal OS_USERNAME=$OS_USERNAME \
--from-literal OS_INTERFACE=$OS_INTERFACE \
--from-literal OS_FILE_OPERATION_TIMEOUT=$OS_FILE_OPERATION_TIMEOUT \ --from-literal OS_DOMAIN_NAME=$OS_USER_DOMAIN_NAME -o yaml
```

The command output should look like this:

```
apiVersion: v1
data:
OS_AUTH_URL: aHR0cHM6Ly9pbmZyYS5tYWlsLnJ1OjM1MzU3L3YzLw==
OS_DOMAIN_ID: ""
OS_FILE_OPERATION_TIMEOUT: ""
OS_IDENTITY_API_VERSION: Mw==
OS_INTERFACE: cHVibGslj
OS_PASSWORD: xxxxxxxxxxxxxx
OS_PROJECT_DOMAIN_ID: MmY4NDhkYWY3xMWY1NDQ0ZfmIzOWVlZDVdmYmZkOTFiMmI=
OS_PROJECT_ID: MGNkYldrWFhNjQwMmQ0NDI0ZTk2NzZjNzVhNzIwYWZhODU=
OS_REGION_NAME: UmVnsdaW9uT25l
OS_USERNAME: cm9tYW5lbmtvZGVueXNAZ21haWwuYas29t
kind: Secret
metadata:
creationTimestamp: "2020-04-14T10:38:33Z"
name: openstack-cloud-credentials
namespace: velero
resourceVersion: "5976669"
selfLink: /api/v1/namespaces/velero/secrets/openstack-cloud-credentials
uid: 923ad314-b870-476f-9da7-4b2a526d9bbb
type: Opaque
```

Edit Deployment Velero. To do this, run the command:

```
kubectl edit deployment/velero -n velero
```

In the opened editor window find the section:

```
spec:
  containers:
  - args:
    - server
    command:
    - /velero
```

And bring it to the following form:

```
spec:
  containers:
  - args:
    - server
    envFrom:
    - secretRef:
        name: openstack-cloud-credentials
    command:
    - /velero
```

Save Deployment. Then install the plugin:

```
velero plugin add registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.0
```

Configured locations for storing snapshots can be viewed using the command:

```
velero get snapshot-locations
```

Restart deployment:

```
kubectl rollout restart deployment/velero -n velero
```

## Creating a backup

You can check creation and restoration from backups using the nginx server as an example.

Create a manifest, in which we describe the deployment and Persistent Volume Claim, indicating that the volume should be created through the VK Cloud Solutions block storage.

Create an nginx-app.yml file, in which we describe the deployment and Persistent Volume Vlaim, indicating that the volume should be created through the VK Cloud Solutions block storage.

```
---
apiVersion: v1
kind: Namespace
metadata:
 name: nginx-example
 labels:
   app: nginx

---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
 name: cinder
provisioner: kubernetes.io/cinder

---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
 name: mypvc
 namespace: nginx-example
spec:
 storageClassName: cinder
 accessModes:
   - ReadWriteOnce
 resources:
   requests:
     storage: 3Gi


---
apiVersion: apps/v1
kind: Deployment
metadata:
 name: nginx-deployment
 namespace: nginx-example
spec:
 replicas: 1
 selector:
   matchLabels:
     app: nginx
 template:
   metadata:
     labels:
       app: nginx
   spec:
     volumes:
       - name: nginx-logs
         persistentVolumeClaim:
          claimName: mypvc
     containers:
     - image: nginx:1.21.3
       name: nginx
       ports:
       - containerPort: 80
       volumeMounts:
         - mountPath: "/var/log/nginx"
           name: nginx-logs
           readOnly: false

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
```

Apply the manifest:

```
kubectl apply -f nginx-app.yml
```

The nginx-example namespace with a running nginx server will appear in the cluster. Look at what IP address the nginx loadbalancer kubernetes service will issue and navigate to this IP in the browser:

```
kubectl get svc -n nginx-example
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
my-nginx   LoadBalancer   10.254.244.134   95.163.250.147     80:31545/TCP   2m54s
```

Make sure persistent volume has been created:

```
kubectl get pv
NAME                                   	CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             	STORAGECLASS   REASON   AGE
pvc-47587acc-8ec0-413a-b0c0-9a1d3848672f   3Gi    	RWO        	Delete       	Bound	nginx-example/mypvc   cinder              	11s

kubectl describe  pv pvc-47587acc-8ec0-413a-b0c0-9a1d3848672f
Name:        	pvc-47587acc-8ec0-413a-b0c0-9a1d3848672f
Labels:      	<none>
Annotations: 	pv.kubernetes.io/provisioned-by: cinder.csi.openstack.org
Finalizers:  	[kubernetes.io/pv-protection]
StorageClass:	cinder
Status:      	Bound
Claim:       	nginx-example/mypvc
Reclaim Policy:  Delete
Access Modes:	RWO
VolumeMode:  	Filesystem
Capacity:    	3Gi
Node Affinity:   <none>
Message:
Source:
	Type:   	Cinder (a Persistent Disk resource in OpenStack)
	VolumeID:   76bcc859-dea5-4b44-ba8c-46c4bd664e97
	FSType: 	ext4
	ReadOnly:   false
	SecretRef:  nil
Events:     	<none>
```

Verify that the appropriate disk has been created in the block storage:

```
openstack volume show 76bcc859-dea5-4b44-ba8c-46c4bd664e97
```

Velero offers a wide variety of backup options. You can specify objects with specific labels through the selector, or specify the entire namespace as a whole.

Create a backup for the entire nginx-example namespace by running the following command:

```
velero backup create nginx-example --include-namespaces nginx-example
```

To view existing backups, velero has the velero get backups command:

```
velero get backups
NAME            STATUS      CREATED                         EXPIRES   STORAGE LOCATION   SELECTOR
nginx-example   Completed   2020-02-07 16:02:26 +0300 MSK   29d       default            <none>
```

It is also possible to study the contents of the backup in more detail with the describe command:

```
velero backup describe nginx-example --details

Name:         nginx-example

Namespace:    velero

Labels:       velero.io/storage-location=default
Annotations:  <none>

Phase:  Completed

Namespaces:
 Included:  nginx-example
 Excluded:  <none>
Resources:
 Included:        \*
 Excluded:        <none>
 Cluster-scoped:  auto

Label selector:  <none>

Storage Location:  default

Snapshot PVs:  auto

TTL:  720h0m0s

Hooks:  <none>

Backup Format Version:  1

Started:    2020-02-07 16:02:26 +0300 MSK
Completed:  2020-02-07 16:02:27 +0300 MSK

Expiration:  2020-03-08 16:02:26 +0300 MSK

Resource List:
 apps/v1/Deployment:
    - nginx-example/nginx-deployment
 apps/v1/ReplicaSet:
    - nginx-example/nginx-deployment-5754944d6c
    - nginx-example/nginx-deployment-7bfb85948d
 v1/Endpoints:
    - nginx-example/my-nginx
 v1/Namespace:
    - nginx-example
 v1/Pod:
    - nginx-example/nginx-deployment-7bfb85948d-jfzh9
    - nginx-example/nginx-deployment-7bfb85948d-x7h7t
 v1/Secret:
    - nginx-example/default-token-9svxb
 v1/Service:
    - nginx-example/my-nginx
 v1/ServiceAccount:
    - nginx-example/default

Persistent Volumes: <none included>
```

The list of resources reflects each of the Kubernetes objects that were backed up. First, make sure there is a backup in S3 storage, then that a backup was also created in block storage:

```
openstack volume backup list
```

## Restore from backup

Simulate the crash and remove the namespace with the test application:

```
kubectl delete ns nginx-example
```

Make sure the namespace is removed:

```
kubectl get ns
NAME              STATUS   AGE
default           Active   21h
ingress-nginx     Active   21h
kube-node-lease   Active   21h
kube-public       Active   21h
kube-system       Active   21h
magnum-tiller     Active   21h
velero            Active   3h16m
```

Now proceed to restore from backup. Set the command:

```
velero restore create --from-backup nginx-example
Restore request "nginx-example-20200207171734" submitted successfully.
Run \`velero restore describe nginx-example-20200207171734\` or \`velero restore logs nginx-example-20200207171734\` for more details.
```

The namespace with all resources has been successfully restored. Verify this by running the following command:

```
kubectl get pods -n nginx-example
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-7bfb85948d-jfzh9   1/1     Running   0          62s
nginx-deployment-7bfb85948d-x7h7t   1/1     Running   0          62s
```

As you can see, the namespace and pods of the web server have been restored. Also, make sure that the block storage disk has been recovered:

```
openstack volume list
```

If you restore to another cluster, then before restoring from a backup, you must repeat the Velero configuration for the new cluster (repeat the Installing velero to a Kubernetes cluster and Installing the VK CS plugin). The bucket and the keys to access the bucket are used by the existing ones (Bucket where the created backup of the Kubernetes cluster is located).

## Deleting a backup

To remove the backup, use the command

```
velero backup delete nginx-example
```

Velero backups and block storage backups will be deleted.

## Creating a backup on a schedule

Velero has a mechanism for creating scheduled backups. A scheduler is responsible for this, which is similar in functionality to cron.

Create a schedule for an hourly backup of the test namespace nginx-example. To do this, run the command:

```
velero schedule create daily --schedule="@every 1h" --include-namespaces nginx-example --ttl 24h0m0s
Schedule "daily" created successfully.
```

At the stage of creating a schedule, you need to specify the name of the schedule - in our case, daily and pass the parameters through the arguments:

- \--schedule="@every 1h"  - create 1 time per hour. As arguments, this parameter can accept various options for setting the schedule, including using the cron scheme, for example, \--schedule="0 \*/6 \* \* \*". Details of use can be found in the help:

  ```
  velero --help
  ```

- \--include-namespaces nginx-example — which namespace we include in the backup.
- \--ttl — how long the backup version will live before deleting.

To see what schedules are available, run the command:

```
velero get schedule
NAME STATUS CREATED SCHEDULE BACKUP TTL LAST BACKUP SELECTOR
daily   Enabled   2020-04-14 11:43:46 +0000 UTC   @every 1h   24h0m0s      2m ago        <none>
```

In the list of backups, a scheduled backup will have a prefix with the name of the schedule:

```
velero get backups
NAME STATUS CREATED EXPIRES STORAGE LOCATION SELECTOR
daily-20200414114346 Completed 2020-04-14 11:43:46 +0000 UTC 23h default
nginx-example          Completed   2020-04-14 11:25:46 +0000 UTC   29d       default            <none>
```

## Removing Velero from a Kubernetes cluster

If Velero is no longer needed, then removal is performed with the following command:

```
kubectl delete namespace/velero clusterrolebinding/velero
```

Velero, as well as all created backups will be deleted.
