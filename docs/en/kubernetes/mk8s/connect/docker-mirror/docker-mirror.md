# {heading(Setting up a Docker mirror)[id=mk8s-docker-mirror]}

{include(/en/_includes/_translated_by_ai_en.md)}

{note:warn}
Use third-party Docker Hub mirrors with caution. Mirror owners may substitute image content during download.

The {var(cloud)} team is working on providing an official hub.docker.com mirror.
{/note}

To configure Docker Hub:

{tabs}

{tab(Private registry with the Docker Registry addon)}

  1. {linkto(../../../k8s/instructions/addons/advanced-installation/install-advanced-registry#mk8s-install-advanced-registry)[text=Install the]} Docker Registry addon, if this has not been done yet.
  1. Download the required image to your local computer. To do this, run the command:

      ```console
      docker pull mirror.gcr.io/<IMAGE_NAME>
      ```
  
  1. {linkto(../../../mk8s/quick-start#mk8s-quick-start-upload-to-registry)[text=Upload]} the downloaded image to the private repository.

  {/tab}

{tab(Daemonset for Managed Containers)}

  Use the mirror in the [CRI-O](https://cri-o.io/) configuration on the cluster worker nodes. To do this, apply the following manifest in the cluster {linkto(../kubectl#mk8s-kubectl)[text=using kubectl]} or in the {linkto(../../instructions/manage-resources#mk8s-manage-resources)[text=management console]}:

  ```yaml

  ---
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: vkcs-mirror
    namespace: kube-system
  data:
    100-vkcs-mirrors.conf: |
      [[registry]]
      location = "docker.io"
      insecure = false
      blocked = false
      mirror-by-digest-only = false
      prefix = ""

      [[registry.mirror]]
      location = "mirror.gcr.io"
  ---
  apiVersion: apps/v1
  kind: DaemonSet
  metadata:
    name: vkcs-mirror-ds
    namespace: kube-system
    labels:
      k8s-app: vkcs-mirror-ds
      kubernetes.io/name: "VKCS-Mirror-DS"
  spec:
    selector:
      matchLabels:
        k8s-app: vkcs-mirror-ds
    template:
      metadata:
        labels:
          k8s-app: vkcs-mirror-ds
      spec:
        hostPID: true
        affinity:
          nodeAffinity:
            requiredDuringSchedulingIgnoredDuringExecution:
              nodeSelectorTerms:
              - matchExpressions:
                - key: mcs.mail.ru/mcs-nodepool
                  operator: Exists
        priorityClassName: system-node-critical
        containers:
        - name: vkcs-mirror-installer
          image: registry.infra.mail.ru:5010/busybox:1.31.1
          securityContext:
            privileged: true
            runAsUser: 0
          command:
          - /bin/sh
          - -c
          - |
            cp /tmp/100-vkcs-mirrors.conf /etc/containers
            CRIO_BIN=/usr/bin/crio
            if kill -s SIGHUP "$(pgrep $CRIO_BIN)"; then
              printf '[%s]\tReload:%s\n' "$(date -uIs)" "$CRIO_BIN update config"
            else
              fail "$CRIO_BIN not a valid bin for get pid (\$CRIO_BIN)"
            fi
            sleep 10000000000
          volumeMounts:
          - name: vkcs-mirror
            mountPath: /tmp/
          - mountPath: /etc/containers
            name: registries-conf-d
          resources:
            requests:
              cpu: 50m
              memory: 50Mi
            limits:
              memory: 256Mi
        dnsPolicy: Default
        terminationGracePeriodSeconds: 30
        volumes:
          - name: vkcs-mirror
            configMap:
              name: vkcs-mirror
          - hostPath:
              path: /etc/containers/registries.conf.d
              type: Directory
            name: registries-conf-d
  ```

  {/tab}

{/tabs}