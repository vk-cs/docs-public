# {heading(Настройка зеркала Docker)[id=k8s-docker-mirror]}

{note:warn}
Используйте сторонние зеркала Docker Hub с осторожностью. Владельцы зеркал могут подменять содержимое образа при загрузке.

Команда {var(cloud)} работает над предоставлением официального зеркала hub.docker.com.
{/note}

Чтобы настроить Docker Hub:

{tabs}

{tab(Приватный реестр с аддоном Docker Registry)}

  1. {linkto(../../../k8s/instructions/addons/advanced-installation/install-advanced-registry#k8s-install-advanced-registry)[text=Установите аддон]} Docker Registry, если этого еще не сделано.
  1. Скачайте нужный образ на локальный компьютер. Для этого выполните команду:

      ```console
      docker pull mirror.gcr.io/<ИМЯ_ОБРАЗА>
      ```
  
  1. {linkto(../../../k8s/quick-start#k8s-quick-start-upload-to-registry)[text=Загрузите]} скачанный образ в приватный репозиторий.

  {/tab}

{tab(Daemonset для Cloud Containers)}

  Используйте зеркало в конфигурации [CRI-O](https://cri-o.io/) на рабочих узлах кластера. Для этого примените следующий манифест в кластере {linkto(../kubectl#k8s-kubectl)[text=с помощью kubectl]} или в {linkto(../../instructions/manage-resources#k8s-manage-resources)[text=личном кабинете]}:

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