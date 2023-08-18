Velero is a client-server utility for backing up and restoring Kubernetes cluster resources.

## Installation

1. Make sure that:

   - Either the worker node groups have at least 2 vCPUs available;
   - Or [automatic scaling is enabled](../../operations/scale#configure_automatic_scaling_only_for_worker_node_groups).

1. [Make sure](../../connect/kubectl#checking_the_connection_to_the_cluster) that you can connect to the cluster with `kubectl`.
1. [Install](../../../account/project/cli/setup) OpenStack CLI if it is not already installed. [Make sure](../../../account/project/cli/authorization) that you can authorize in the cloud using it.
1. [Create a Hotbox bucket](/en/base/s3/buckets/bucket#bucket_creation) to store backups in the [Object Storage](../../../s3) service.
1. [Create an account](/en/base/s3/access-management/s3-account#create_an_account) in the [Object Storage](/en/base/s3) service.

    Save the account's key ID and secret to the `s3_creds` file:

   ```text
   [default]
   aws_access_key_id=<Access Key ID>
   aws_secret_access_key=<Secret Key>
   ```

1. Determine which version of Velero [is compatible with the Kubernetes cluster version](https://github.com/vmware-tanzu/velero#velero-compatibility-matrix) you want to install Velero in.
1. [Download the correct version](https://github.com/vmware-tanzu/velero/releases) of the Velero client.
1. Determine the version of the AWS plugin that [is compatible](https://github.com/vmware-tanzu/velero-plugin-for-aws#compatibility) with Velero version.
1. Add the path to the client to the environment variable:

   - `Path` for Windows.
   - `PATH` for Linux/macOS.

1. Install the server part of Velero in the Kubernetes cluster. In the command, specify the name of the bucket created for Velero and the path to the `s3_creds` file with the account data:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   velero install \
   --plugins \
     velero/velero-plugin-for-aws:v<selected AWS plugin version>,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.2 \
   --provider aws \
   --bucket <Velero bucket name> \
   --secret-file <path to s3_creds file> \
   --use-volume-snapshots=false \
   --backup-location-config \
     region=ru-msk,s3ForcePathStyle="true",s3Url=https://hb.bizmrg.com:443

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   velero install `
   --plugins `
     velero/velero-plugin-for-aws:v<selected AWS plugin version>,registry.infra.mail.ru:5010/velero/velero-plugin-mcs:v1.2.2 `
   --provider aws `
   --bucket <Velero bucket name> `
   --secret-file <path to s3_creds file> `
   --use-volume-snapshots=false `
   --backup-location-config `
     region=ru-msk,s3ForcePathStyle="true",s3Url=https://hb.bizmrg.com:443
   ```

   </tabpanel>
   </tabs>

   After the installation is complete, a message will be displayed:

   ```text
   Velero is installed! ⛵ Use 'kubectl logs deployment/velero -n velero' to view the status.
   ```

1. Create a Kubernetes secret so that the server part of Velero can authorize in the VK Cloud:

   <tabs>
   <tablist>
   <tab>Linux/macOS</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   ```bash
   kubectl -n velero create secret generic openstack-cloud-credentials \
     --from-literal OS_PROJECT_ID=$OS_PROJECT_ID \
     --from-literal OS_REGION_NAME=$OS_REGION_NAME \
     --from-literal OS_IDENTITY_API_VERSION=$OS_IDENTITY_API_VERSION \
     --from-literal OS_PASSWORD=$OS_PASSWORD \
     --from-literal OS_AUTH_URL=$OS_AUTH_URL \
     --from-literal OS_USERNAME=$OS_USERNAME \
     --from-literal OS_INTERFACE=$OS_INTERFACE \
     --from-literal OS_FILE_OPERATION_TIMEOUT=$OS_FILE_OPERATION_TIMEOUT \
     --from-literal OS_DOMAIN_NAME=$OS_USER_DOMAIN_NAME \
     -o yaml

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   kubectl -n velero create secret generic openstack-cloud-credentials `
     --from-literal OS_PROJECT_ID=$env:OS_PROJECT_ID `
     --from-literal OS_REGION_NAME=$env:OS_REGION_NAME `
     --from-literal OS_IDENTITY_API_VERSION=$env:OS_IDENTITY_API_VERSION `
     --from-literal OS_PASSWORD=$env:OS_PASSWORD `
     --from-literal OS_AUTH_URL=$env:OS_AUTH_URL `
     --from-literal OS_USERNAME=$env:OS_USERNAME `
     --from-literal OS_INTERFACE=$env:OS_INTERFACE `
     --from-literal OS_FILE_OPERATION_TIMEOUT=$env:OS_FILE_OPERATION_TIMEOUT `
     --from-literal OS_DOMAIN_NAME=$env:OS_USER_DOMAIN_NAME `
     -o yaml
   ```

   </tabpanel>
   </tabs>

   Output should contain a similar information:

   ```yaml
   apiVersion: v1
   data:
     OS_AUTH_URL: ...
     OS_DOMAIN_NAME: ...
     ...
   kind: Secret
   metadata:
     creationTimestamp: ...
     name: openstack-cloud-credentials
     namespace: velero
     resourceVersion: ...
     selfLink: ...
     uid: ...
   type: Opaque
   ```

1. Patch the Velero deployment in the cluster. This is needed for:

   - limiting resource consumption by Velero plugins for AWS and VK Cloud;
   - specifying the secret with variables for authorization in VK Cloud.

   1. Create a file with the patch:

      <details>
      <summary markdown="span">velero-patch.yaml</summary>

      ```yaml
      spec:
        template:
          spec:
            containers:
              - name: velero
                envFrom:
                  - secretRef:
                      name: openstack-cloud-credentials
            initContainers:
              - name: velero-velero-plugin-for-aws
                resources:
                  limits:
                    cpu: "1"
                    memory: 512Mi
                  requests:
                    cpu: 500m
                    memory: 256Mi
              - name: velero-velero-plugin-mcs
                resources:
                  limits:
                    cpu: "1"
                    memory: 512Mi
                  requests:
                    cpu: 500m
                    memory: 256Mi
      ```

      </details>

   1. Apply the patch to the Velero deployment:

      ```bash
      kubectl patch deployment velero -n velero --patch-file velero-patch.yaml
      ```

      The Velero deployment will be patched and restarted.

1. Create a default snapshot location by running the command:

   ```bash
   velero snapshot-location create default --provider openstack --config region=ru-msk
   ```

## Checking Velero operation

1. Run the command to check the configured plugins:

   ```bash
   velero plugin get
   ```

   The output of the command should contain the following plugins:

   ```text
   NAME                                        KIND
   ...                                         ...
   velero.io/aws                               VolumeSnapshotter
   velero.io/openstack                         VolumeSnapshotter
   ```

1. Run the command to check the configured backup locations:

   ```bash
   velero backup-location get
   ```

   A similar information should be displayed:

   ```text
   NAME      PROVIDER   BUCKET/PREFIX   PHASE       LAST VALIDATED                  ACCESS MODE   DEFAULT
   default   aws        ...             Available   ...                             ReadWrite     true
   ```

1. Run the command to check the configured snapshot locations:

   ```bash
   velero snapshot-location get
   ```

   A similar information should be displayed:

   ```text
   NAME      PROVIDER
   default   openstack
   ```

## Deletion

Run the command:

```bash
velero uninstall
```
