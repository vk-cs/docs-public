# {heading(Automatic application recovery when external storage becomes unavailable)[id=mk8s-app]}

{include(/en/_includes/_translated_by_ai_en.md)}

Applications in Kubernetes often depend on external storage: NFS servers, file gateways, S3-compatible object storage, or volumes mounted via CSI. Temporary unavailability of such a resource can cause I/O operations to hang, errors to accumulate, and incorrect responses to be returned to users.

In Managed Containers, this problem can be solved with standard Kubernetes mechanisms: `readinessProbe`, `livenessProbe`, and `startupProbe`. They allow you to temporarily exclude a faulty application instance from load balancing and, if necessary, automatically restart the container.

## {heading(How the recovery scheme should work)[id=mk8s-app-schema]}

When access to storage is lost, the system's reaction must be split into two stages:

1. Stop sending traffic to the problematic pod. For this, `readinessProbe` is used. If the check fails, the pod gets the `NotReady` status and is excluded from the endpoints of the Kubernetes Service.

2. Restart the application if it cannot recover on its own. For this, `livenessProbe` is used. After several failed checks, kubelet restarts the container.

Readiness and liveness checks work independently: a failed readiness check removes the pod from load balancing, while a failed liveness check leads to a container restart.

{note:warn}
Restarting the container will not restore the external storage itself. Therefore, the liveness check should only trigger when the application remains hung or in an incorrect state after the storage has been restored. Otherwise, a prolonged storage outage will cause endless restarts.
{/note}

## {heading({counter(app)}. Create a script for checking file storage)[id=mk8s-app-script]}

Assume that the external storage is mounted to the container at the path `/mnt/storage`. Create a script that checks directory reading and the ability to perform a short write operation:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: storage-healthcheck
data:
  check-storage.sh: |
    #!/bin/sh
    set -eu

    STORAGE_PATH="${STORAGE_PATH:-/mnt/storage}"
    CHECK_FILE="${STORAGE_PATH}/.k8s-healthcheck-${HOSTNAME}"

# timeout prevents the check from hanging due to network or NFS issues.
    timeout 3 stat "${STORAGE_PATH}" >/dev/null 2>&1 || exit 1

# Remove this part if the volume is mounted read-only.
    timeout 3 sh -c "touch '${CHECK_FILE}' && rm -f '${CHECK_FILE}'" \
      >/dev/null 2>&1 || exit 1
```

For storage mounted read-only, a `stat` operation or reading a pre-created control file is sufficient.

## {heading({counter(app)}. Configure the Deployment)[id=mk8s-app-deployment]}

Add the script to the pod and configure the three types of checks:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: storage-dependent-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: storage-dependent-app
  template:
    metadata:
      labels:
        app: storage-dependent-app
    spec:
      containers:
        - name: application
          image: example-registry/app:1.0.0

          env:
            - name: STORAGE_PATH
              value: /mnt/storage

          ports:
            - name: http
              containerPort: 8080

          volumeMounts:
            - name: external-storage
              mountPath: /mnt/storage

            - name: healthcheck
              mountPath: /opt/health
              readOnly: true

          startupProbe:
            exec:
              command:
                - /bin/sh
                - /opt/health/check-storage.sh
            periodSeconds: 5
            timeoutSeconds: 4
            failureThreshold: 60

          readinessProbe:
            exec:
              command:
                - /bin/sh
                - /opt/health/check-storage.sh
            periodSeconds: 10
            timeoutSeconds: 4
            failureThreshold: 2
            successThreshold: 1

          livenessProbe:
            httpGet:
              path: /health/live
              port: http
            periodSeconds: 15
            timeoutSeconds: 3
            failureThreshold: 4

      volumes:
        - name: healthcheck
          configMap:
            name: storage-healthcheck
            defaultMode: 0555

        - name: external-storage
          persistentVolumeClaim:
            claimName: application-storage
```

{linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs)[text=PVC]} (`PersistentVolumeClaim`) allows an application to use persistent storage without knowing the details of its implementation in a specific cloud infrastructure.

## {heading({counter(app)}. Create a PVC)[id=mk8s-app-pvc]}

The example Deployment uses a PVC named `application-storage`:

```yaml
persistentVolumeClaim:
  claimName: application-storage
```

If such an object has not been created, the pod will remain in the `Pending` state, and an error will appear in the events:

```text
persistentvolumeclaim "application-storage" not found
```

To create a PVC:

1. Check the {linkto(../../concepts/storage#mk8s-storage-storage-classes)[text=storage classes]} available in the cluster:

   ```bash
   kubectl get storageclass
   ```

   Example output:

   ```text
   NAME                   PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE
   csi-ceph-ssd           cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   csi-ceph-ssd (default) cinder.csi.openstack.org       Delete          WaitForFirstConsumer
   ```

   Storage class names depend on the cluster configuration. Use the actual name from the output of the `kubectl get storageclass` command.

1. Create a manifest for the PVC `application-storage-pvc.yaml`:

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: application-storage
   spec:
     accessModes:
       - ReadWriteOnce
     storageClassName: csi-ceph-ssd
     resources:
       requests:
         storage: 10Gi
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f application-storage-pvc.yaml
   ```

1. Check the PVC status:

   ```bash
   kubectl get pvc application-storage
   ```
   
   After successful {linkto(../../reference/pvs-and-pvcs#mk8s-pvs-and-pvcs-life-cycle)[text=dynamic provisioning]} of the volume, the status should become `Bound`:

   ```text
   NAME                  STATUS   VOLUME                                     CAPACITY   ACCESS MODES
   application-storage   Bound    pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   10Gi       RWO
   ```

   If the cluster has a default storage class, the `storageClassName` field can be omitted:

   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: application-storage
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 10Gi
   ```

`ReadWriteOnce` access usually allows mounting the volume for writing to a single node. If multiple application replicas must use the same file system simultaneously, you will need storage with `ReadWriteMany` support, for example an NFS-compatible CSI driver. Not all storage classes support this mode.

## {heading({counter(app)}. Apply the manifests in the correct order)[id=mk8s-app-manifests]}

1. First create the ConfigMap and PVC, then the Deployment:

   ```bash
   kubectl apply -f storage-healthcheck.yaml
   kubectl apply -f application-storage-pvc.yaml
   kubectl apply -f deployment.yaml
   ```

1. Check the related resources:

   ```bash
   kubectl get pvc
   kubectl get pods -l app=storage-dependent-app
   kubectl describe pod <pod-name>
   ```

## {heading({counter(app)}. Test the recovery scenario)[id=mk8s-app-script-check]}

1. Make sure all application instances are ready:

   ```bash
   kubectl get pods -l app=storage-dependent-app
   ```

1. Temporarily block access to the test storage or change its network rules. After a while, the pod should transition to the `NotReady` state:

   ```bash
   kubectl describe pod <pod-name>
   kubectl get endpoints
   ```

   After access is restored, the readiness check should succeed again, and the pod should automatically return to load balancing.

1. Check the number of restarts:

   ```bash
   kubectl get pods \
     -l app=storage-dependent-app \
     -o custom-columns=NAME:.metadata.name,READY:.status.containerStatuses[0].ready,RESTARTS:.status.containerStatuses[0].restartCount
   ```

## {heading(Why the checks are configured this way)[id=mk8s-app-probes]}

### {heading(Startup probe)[id=mk8s-app-startup]}

`startupProbe` gives the application time to wait for the storage to connect at startup. Until it succeeds, Kubernetes does not run the liveness and readiness checks.

The maximum wait time in the example above:

```text
60 × 5 seconds = 300 seconds
```

This approach protects slow-starting containers from premature restart.

### {heading(Readiness probe)[id=mk8s-app-readiness]}

The readiness check directly monitors storage availability. After two failures, the pod is excluded from load balancing in about 20 seconds.

When the storage becomes available again, the check succeeds, the pod automatically gets the `Ready` status and returns to the Service. There is no need to recreate the Deployment manually.

### {heading(Liveness probe)[id=mk8s-app-liveness]}

Liveness should check not the storage itself, but the internal state of the process. For example, the `/health/live` endpoint can determine:

- whether the main application loop is running;
- whether the thread pool is exhausted;
- whether I/O operations are hung;
- whether the application is able to process a new request after the connection is restored.

If the application is hung, kubelet will restart the container. For Deployment containers, the `restartPolicy: Always` policy is used, so a terminated or recognized as faulty container is started again.

## {heading(Practical recommendations)[id=mk8s-app-recs]}

- Do not perform long operations in the `health check` and do not check large files.
- Limit the check time with `timeout`.
- Check only the operations that the application actually needs.
- Do not point the liveness check directly at the external resource.
- For read-only volumes, do not use `touch`, `mkdir`, or other write operations in the `probe`.
- Configure multiple application replicas.
- Add a `PodDisruptionBudget`.
- Distribute pods across different worker nodes.
- Test the application behavior with hung system calls to NFS.
- Add timeouts, retries, and a circuit breaker to the application itself.

Use different checks for different purposes:

| Check | Purpose                                            |
|---|-------------------------------------------------------|
| `readinessProbe` | Whether requests can be sent to the pod now              |
| `livenessProbe` | Whether the process can continue running without a restart |
| `startupProbe` | Whether the application has fully started            |

## {heading(Monitoring)[id=mk8s-app-monitoring]}

For regular monitoring, it is recommended to track:

- the number of pods in the `NotReady` state;
- growth of `restartCount`;
- storage connection errors;
- read and write operation timeouts;
- duration of I/O operations;
- Deployment status;
- Kubernetes events with the reasons `Unhealthy`, `FailedMount`, and `FailedAttachVolume`.

Example commands:

```bash
kubectl get events -A \
  --sort-by=.metadata.creationTimestamp
```

```bash
kubectl rollout status deployment/storage-dependent-app
```

```bash
kubectl get deployment storage-dependent-app \
  -o jsonpath='{.status.availableReplicas}'
```

## S3-compatible storage specifics

If the application uses object storage rather than a mounted file volume, the `stat` and `ls` checks should be replaced with a short read request to a pre-created object.

For example, the health check can:

1. check DNS resolution of the endpoint;
2. establish a TLS connection;
3. perform a `HEAD` request to the control object;
4. check the response code;
5. terminate by timeout.

It is not recommended to download or upload a large object in every check. This increases the load, request costs, and reaction time.

## Summary

The optimal strategy for application recovery in case of external storage failure is not to immediately restart all containers, but to react sequentially:

1. The readiness check excludes faulty pods from load balancing.
2. The application periodically checks whether the storage has been restored.
3. After restoration, the pod automatically returns to the Service.
4. The liveness check restarts only those processes that are actually hung and could not recover on their own.

This configuration works in Managed Containers without installing an additional operator and helps to avoid both serving requests by faulty instances and endless restarts during a prolonged external storage outage.