# {heading(Docker айнасын баптау)[id=k8s-docker-mirror]}

{include(/kz/_includes/_translated_by_ai.md)}

{note:warn}

Docker Hub үшін үшінші тарап айналарын абайлап пайдаланыңыз. Айна иелері жүктеу кезінде образдың мазмұнын ауыстыра алады.

VK Cloud командасы hub.docker.com үшін ресми айнаны ұсыну бағытында жұмыс істеп жатыр.

{/note}

Docker Hub-ты баптау үшін:

{tabs}

{tab(Docker Registry аддонымен бірге жеке реестр)}

  1. Егер бұл әлі жасалмаса, Docker Registry {linkto(../../../k8s/instructions/addons/advanced-installation/install-advanced-registry#k8s-install-advanced-registry)[text=аддонын орнатыңыз]}.
  1. Қажетті образды жергілікті компьютерге жүктеп алыңыз. Ол үшін команданы орындаңыз:

      ```console
      docker pull mirror.gcr.io/<имя_образа>
      ```

  1. Жүктеп алынған образды жеке репозиторийге {linkto(../../../k8s/quick-start#k8s-quick-start-upload-to-registry)[text=жүктеңіз]}.

  {/tab}

{tab(Cloud Containers үшін Daemonset)}

  Айна [CRI-O](https://cri-o.io/) конфигурациясында кластердің жұмысшы тораптарында пайдаланылады. Ол үшін келесі манифесті кластерде {linkto(../kubectl#k8s-kubectl)[text=`kubectl` көмегімен]} немесе {linkto(../../instructions/manage-resources#k8s-manage-resources)[text=жеке кабинетте]} қолданыңыз:

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
