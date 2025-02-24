<warn>

Используйте сторонние зеркала Docker Hub с осторожностью. Владельцы зеркал могут подменять содержимое образа при загрузке.

Команда VK Cloud работает над предоставлением официального зеркала hub.docker.com.

</warn>

Чтобы настроить Docker Hub:

<tabs>
<tablist>
<tab>Приватный реестр с аддоном Docker Registry</tab>
<tab>Daemonset для Cloud Containers</tab>
</tablist>
  <tabpanel>

  1. [Установите аддон](../../../k8s/service-management/addons/advanced-installation/install-advanced-registry) Docker Registry, если этого еще не сделано.
  1. Скачайте нужный образ на локальный компьютер. Для этого выполните команду:

      ```bash
      docker pull mirror.gcr.io/<имя_образа>
      ```
  
  1. [Загрузите](../../../k8s/quick-start#3_zagruzite_nuzhnye_obrazy_v_reestr_docker) скачанный образ в приватный репозиторий.

  </tabpanel>
  <tabpanel>

  Используйте зеркало в конфигурации [CRI-O](https://cri-o.io/) на рабочих узлах кластера. Для этого примените следующий манифест в кластере [с помощью kubectl](../kubectl) или в [личном кабинете](../../service-management/manage-resources):

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

  </tabpanel>
</tabs>
