В кластерах Cloud Containers доступно [несколько версий](../../concepts/versions/components) аддона [Kube Prometheus Stack](../../concepts/addons-and-settings/addons#kube_prometheus_stack_2926e986). Обновление этого аддона средствами VK Cloud недоступно, но можно обновить аддон вручную.

Для обновления аддона Kube Prometheus Stack с версии `36.2.0` на версию `54.2.2` необходимо удалить текущую версию аддона и затем установить новую версию. Поэтому процесс обновления включает в себя подготовку окружения текущей версии аддона, чтобы сохранить его и затем переиспользовать с новой версией аддона.

<warn>

Далее предполагается, что аддон установлен в пространство имен (например, `kube-prometheus-stack`), которое содержит только те ресурсы Kubernetes, которые относятся к аддону.

Если в пространстве имен есть и другие ресурсы Kubernetes, скорректируйте команды и скрипт так, чтобы они не затрагивали не относящиеся к аддону ресурсы.

</warn>

## Подготовительные шаги

1. Если у вас уже есть существующий кластер Cloud Containers с аддоном Kube Prometheus Stack, который нужно обновить, пропустите этот шаг.

   В противном случае создайте тестовый кластер, в котором будет выполняться обновление аддона:

   1. [Создайте](../../operations/create-cluster) кластер Cloud Containers версии `1.26.5`.

      При создании кластера выберите опцию **Назначить внешний IP**. Прочие параметры кластера выберите на свое усмотрение.

   1. [Установите в кластер](../../operations/addons/advanced-installation/install-advanced-monitoring) аддон Kube Prometheus Stack версии `36.2.0`.

      Выполните **быструю установку** аддона (без редактирования кода настройки аддона).

1. [Убедитесь](../../connect/kubectl), что вы можете подключиться к кластеру с помощью `kubectl`.

   Для подключения используйте файл конфигурации кластера (kubeconfig), загруженный из личного кабинета VK Cloud.

1. Проверьте, что аддон доступен и работает. Для этого [получите доступ к веб-интерфейсу Grafana](../../monitoring#ispolzovanie_grafana).

   <warn>

   Запишите пароль для доступа к Grafana, даже если он хранится в виде секрета Kubernetes. В процессе обновления аддона пространство имен, где размещены аддон и секрет, будет удалено вместе со всем содержимым.

   </warn>

1. [Установите](../../install-tools/helm) Helm версии 3.0.0 или выше, если утилита еще не установлена.

   Выберите для установки версию Helm, которая [совместима](https://helm.sh/docs/topics/version_skew/) с кластером.

1. Задайте переменную среды окружения, указывающую на kubeconfig для кластера. Это упростит работу с `kubectl` и `helm` при обновлении аддона.

   Путь к вашим файлам kubeconfig может отличаться от примера ниже.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export KUBECONFIG="/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $Env:KUBECONFIG="C:\Users\user\.kube\kubernetes-cluster-1234_kubeconfig.yaml"
   ```

   </tabpanel>
   </tabs>

## 1. Получите информацию, необходимую для обновления аддона

1. [Перейдите в режим редактирования кода настройки аддона](../../operations/addons/manage-addons).

   Не изменяйте код настройки аддона.

   Запишите следующие сведения:

   1. Название приложения (по умолчанию `kube-prometheus-stack`).
   1. Название пространства имен (по умолчанию `prometheus-monitoring`).
   1. Полный код настройки аддона.

1. Задайте переменные среды окружения, указывающие на эти названия приложения и пространства имен. Это упростит дальнейшую работу при обновлении аддона.

   Значения ваших переменных могут отличаться от примера ниже.

   <tabs>
   <tablist>
   <tab>Linux (bash)/macOS (zsh)</tab>
   <tab>Windows (PowerShell)</tab>
   </tablist>
   <tabpanel>

   ```bash
   export CHART_NAME="kube-prometheus-stack"
   export NAMESPACE="prometheus-monitoring"

   ```

   </tabpanel>
   <tabpanel>

   ```powershell
   $CHART_NAME="kube-prometheus-stack"
   $NAMESPACE="prometheus-monitoring"
   ```

   </tabpanel>
   </tabs>

1. Получите информацию о используемых аддоном [Persistent Volume Claims (PVCs) и постоянных томах (persistent volumes, PVs)](../../k8s-reference/pvs-and-pvcs). Они используются для хранения собираемых метрик, а также других данных, необходимых для работы аддона.

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   В выводе команды будет содержаться список PVCs (`NAME`) и соответствующих им PVs (`VOLUMES`) с указанием размера томов (`CAPACITY`). Запишите эту информацию, она понадобится позднее.

   <details>
   <summary>Пример частичного вывода команды</summary>

   ```text
   NAME                                                                             STATUS   VOLUME                                     CAPACITY   ...
   alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0   Bound    pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...
   kube-prometheus-stack-grafana                                                    Bound    pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...
   prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0           Bound    pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ... 
   ```

   </details>

## 2. Подготовьте окружение аддона к обновлению

Тома для аддона по умолчанию создаются с применением [политики освобождения](../../k8s-reference/pvs-and-pvcs) `Retain`, если в код настройки аддона не было внесено изменений, связанных с классом хранения. Поэтому, если просто удалить аддон, то постоянные тома с данными будут удалены. Это приведет к потере накопленных за время работы аддона метрик, а также других данных, необходимых для работы аддона.

Кроме того, следующие ресурсы Kubernetes, которые также используются аддоном, могут препятствовать установке новой версии аддона:

- Набор Custom Resource Definitions (CRDs), необходимый для работы аддона.
- Набор Persistent Volume Claims (PVCs), позволяющий аддону использовать постоянные тома.

Перед обновлением аддона защитите от удаления постоянные тома, которые он использует, а также удалите упомянутые ресурсы Kubernetes одним из приведенных ниже способов.

<tabs>
<tablist>
<tab>Готовый bash-скрипт для Linux</tab>
<tab>Отдельные команды для Linux/macOS/Windows</tab>
</tablist>
<tabpanel>

1. Создайте файл с кодом скрипта:

   <details>
   <summary>prepare-for-addon-update.sh</summary>

   ```bash
   #!/bin/sh

   set -e

   DEFAULT_NAMESPACE=prometheus-monitoring
   : "${NAMESPACE:=prometheus-monitoring}"
   : "${CHART_NAME:=kube-prometheus-stack}"
   : "${DRY_RUN:=none}"

   usage() {
   cat <<EOF
   Usage:
   -h help
   -k kubeconfig           "${KUBECONFIG}"
   -c kubeconfig context   ""
   -n namespace            "${NAMESPACE}"
   -r chart                "${CHART_NAME}"
   -d dry run              "${DRY_RUN}". [none, server,client]
   EOF
   exit 1
   }

   while getopts 'k:c:n:r:hd' opt; do
     case $opt in
       h)
           usage
           ;;
       k) KUBECONFIG=$OPTARG
           ;;
       c) CONTEXT=$OPTARG
           ;;
       n) NAMESPACE=$OPTARG
           ;;
       r) CHART_NAME=$OPTARG
           ;;
       d) DRY_RUN=server
           ;;
       *) usage ;;
     esac
   done

   shift "$((OPTIND-1))"

   # set k8s params as array
   set -- "--namespace=${NAMESPACE}"
   [ -n "${CONTEXT}" ] && {
       set -- "--context=${CONTEXT}" "${@}"
       # for helm
       set -- "--kube-context=${CONTEXT}" "${@}"
   }
   [ -n "${KUBECONFIG}" ] && set -- "--kubeconfig=${KUBECONFIG}" "${@}"

   get_prometheus_pv() {
       kubectl "${@}" get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{"pv/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_crd() {
       kubectl "${@}" get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{"crd/"}{.metadata.name}{"\n"}{end}'
   }

   get_prometheus_pvc() {
       kubectl "${@}" get pvc -o jsonpath='{range .items[*]}{"pvc/"}{.metadata.name}{"\n"}{end}'
   }

   set_prometheus_pv_retain_reclaim_policy() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   }

   clear_prometheus_pv_claim_reference() {
       pvs=$(get_prometheus_pv "${@}")
       [ -z "${pvs}" ] && return
       for pv in ${pvs}; do
           set -- "${pv}" "${@}"
       done
       kubectl patch "${@}" --dry-run="${DRY_RUN}" --type json -p='[{"op": "remove", "path": "/spec/claimRef"}]'
   }

   delete_prometheus_crd() {
       crds=$(get_prometheus_crd "${@}")
       [ -z "${crds}" ] && return
       for crd in ${crds}; do
           set -- "${crd}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_pvc() {
       pvcs=$(get_prometheus_pvc "${@}")
       [ -z "${pvcs}" ] && return
       for pvc in ${pvcs}; do
           set -- "${pvc}" "${@}"
       done
       kubectl delete "${@}" --dry-run="${DRY_RUN}"
   }

   delete_prometheus_chart() {
       dry_run=""
       [ "${DRY_RUN}" != "none" ] && dry_run="--dry-run"
       if helm get manifest "${@}" "${CHART_NAME}" >/dev/null 2>&1; then
           helm uninstall "${@}" "${CHART_NAME}" --wait --timeout 600s "${dry_run}" >/dev/null 2>&1 || true
       fi
       helm list "${@}" -aA -f "${CHART_NAME}" -q
   }

   delete_prometheus_namespace() {
       if kubectl get "${@}" ns "${NAMESPACE}" >/dev/null 2>&1; then
           kubectl delete "${@}" ns "${NAMESPACE}" --dry-run="${DRY_RUN}" --wait --timeout 600s --force --grace-period=0 --cascade=foreground
       fi
   }

   echo "Setting retain policy for the Prometheus PVs..."
   set_prometheus_pv_retain_reclaim_policy "${@}"
   echo "Deleting Prometheus chart..."
   delete_prometheus_chart "${@}"
   echo "Deleting Prometheus PVCs..."
   delete_prometheus_pvc "${@}"
   echo "Clearing Prometheus PV claim references..."
   clear_prometheus_pv_claim_reference "${@}"
   echo "Clearing Prometheus CRDs..."
   delete_prometheus_crd "${@}"
   [ "${NAMESPACE}" = "${DEFAULT_NAMESPACE}" ] && {
       echo "Deleting Prometheus namespace..."
       delete_prometheus_namespace "${@}"
   }
   echo "Completed!"
   ```

   </details>

   Скрипт выполняет следующие действия:

   1. Обнаруживает постоянные тома, которые связаны с PVCs, созданными в пространстве имен, в котором установлен аддон. Для этих постоянных томов скрипт задает политику освобождения `Retain`. Это нужно, чтобы эти тома не были удалены при удалении текущей версии аддона.
   1. Удаляет Helm-чарт (chart) текущей версии аддона. Это нужно, чтобы успешно удалить наборы PVCs и CRDs, которые используются аддоном.
   1. Удаляет набор PVCs из пространства имен, в котором был установлен аддон. Это нужно, чтобы можно было отвязать PVs от PVCs и потом переиспользовать эти PVs с новой версией аддона.
   1. Очищает ссылки на удаленные PVCs у постоянных томов, которые были связаны с этими PVCs. Эти постоянные тома станут доступны для связывания (статус PVs: `Available`) и будут переиспользованы новой версией аддона после ее установки.
   1. Удаляет набор CRDs, который использовался аддоном.
   1. Удаляет пространство имен `prometheus-monitoring`, если скрипт был запущен для этого пространства имен.

1. Сделайте файл с кодом скрипта исполняемым:

   ```bash
   chmod +x prepare-for-addon-update.sh
   ```

1. Определите, с какими параметрами будет выполнен скрипт:

   ```bash
   bash prepare-for-addon-update.sh -h
   ```

   Будет выведена справка, в которой будут указаны доступные параметры и их значения по умолчанию:

   - `-h`: вывод справки.
   - `-k`: путь к файлу kubeconfig. Значение по умолчанию извлекается из переменной среды окружения `$KUBECONFIG`, если она задана.
   - `-c`: название контекста kubeconfig, который нужно использовать при работе с кластером. Значение по умолчанию: пустая строка.
   - `-n`: название пространства имен, в котором установлен аддон. Значение по умолчанию: `prometheus-monitoring`.
   - `-r`: название приложения, с которым установлен аддон. Совпадает с именем Helm-чарта для аддона. Значение по умолчанию: `kube-prometheus-stack`.
   - `-d`: значение аргумента [--dry-run](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands) для `kubectl`. Значение по умолчанию: `none`. Используйте `server` или `client` для тестового запуска скрипта: в кластер не будет внесено никаких изменений.

   <details>
   <summary>Пример вывода справки</summary>

   ```text
   Usage:
   -h help
   -k kubeconfig           "/home/user/.kube/kubernetes-cluster-1234_kubeconfig.yaml"
   -c kubeconfig context   ""
   -n namespace            "prometheus-monitoring"
   -r chart                "kube-prometheus-stack"
   -d dry run              "none". [none, server,client]
   ```

   </details>

1. Выполните скрипт.

   <warn>

   При выполнении скрипта с явно (параметр `-n`) или неявно заданным пространством имен `prometheus-monitoring` это пространство имен будет удалено.

   При выполнении скрипта для другого пространства имен оно удалено не будет.

   </warn>

   Выполните команду, указав нужные параметры. Если вас устраивает значение параметра по умолчанию, то параметр можно опустить.

   ```bash
     bash prepare-for-addon-update.sh \
       -k <путь к файлу kubeconfig> \
       -c <название контекста kubeconfig> \
       -n <название пространства имен> \
       -r <название приложения> \
       -d <значение аргумента --dry-run для kubectl>

   ```

   Будут выведены подробные сообщения о работе скрипта. В том числе в выводе должны содержаться следующие сообщения:

   ```text
   Setting retain policy for the Prometheus PVs...
   Deleting Prometheus chart...
   Deleting Prometheus PVCs...
   Clearing Prometheus PV claim references...
   Clearing Prometheus CRDs...
   Deleting Prometheus namespace...
   Completed!
   ```

   <details>
   <summary>Пример вывода команды</summary>

   ```text
   Settings retain policy for the prometheus PVs...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Deleting prometheus chart...
   Deleting prometheus PVCs...
   persistentvolumeclaim "prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0" deleted
   persistentvolumeclaim "alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0" deleted
   Clearing prometheus PV claim references...
   persistentvolume/pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX patched
   persistentvolume/pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY patched
   persistentvolume/pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ patched
   Clearing prometheus CRDs...
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   customresourcedefinition.apiextensions.k8s.io "thanosrulers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "servicemonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheusrules.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "prometheuses.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "probes.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "podmonitors.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagers.monitoring.coreos.com" deleted
   customresourcedefinition.apiextensions.k8s.io "alertmanagerconfigs.monitoring.coreos.com" deleted
   Deleting prometheus namespace...
   Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
   Warning: deleting cluster-scoped resources, not scoped to the provided namespace
   namespace "prometheus-monitoring" force deleted
   Completed!
   ```

   </details>

</tabpanel>
<tabpanel>

1. Получите список PVs, которые используются аддоном через PVCs в пространстве имен аддона:

   ```bash
   kubectl get pv -o jsonpath='{range .items[?(@.spec.claimRef.namespace=="'"${NAMESPACE}"'")]}{.metadata.name}{"\n"}{end}'
   ```

   Список PVs должен совпадать со списком PVs, [полученным ранее](#1_poluchite_informaciyu_neobhodimuyu_dlya_obnovleniya_addona).

1. Пропатчите эти PVs так, чтобы они использовали политику освобождения `Retain`. Это необходимо для того, чтобы эти тома не были удалены при удалении текущей версии аддона.

   Эта команда патчит отдельный PV. Выполните ее для всех PVs из списка.

   ```bash
   kubectl patch pv <имя PV> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
   ```

1. Получите список всех PVs в кластере и убедитесь, что те PVs, с которыми работает аддон, используют политику освобождения `Retain` и связаны с PVC (`Bound`):

   ```bash
   kubectl get pv
   ```

   <details>
   <summary>Пример частичного вывода команды</summary>

   ```
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS  CLAIM    ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Bound   prometheus-monitoring/alertmanager-prometheus-alertmanager-db-alertmanager-prometheus-alertmanager-0 ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Bound   prometheus-monitoring/kube-prometheus-stack-grafana ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Bound   prometheus-monitoring/prometheus-prometheus-prometheus-db-prometheus-prometheus-prometheus-0 ...
   ```

   </details>

1. Удалите Helm-чарт (chart) текущей версии аддона. Это необходимо для того, чтобы успешно удалить наборы PVCs и CRDs, которые используются аддоном.

   ```bash
   helm uninstall -n $NAMESPACE $CHART_NAME --wait --timeout 600s
   ```

1. Получите список PVCs, которые использовались аддоном:

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   Итоговый список может отличаться от [полученного ранее](#1_poluchite_informaciyu_neobhodimuyu_dlya_obnovleniya_addona): часть PVCs была удалена при удалении Helm-чарта.

1. Удалите PVCs, которые использовались аддоном. Это нужно, чтобы можно было отвязать PVs от PVCs и потом переиспользовать эти PVs с новой версией аддона.

   Эта команда удаляет отдельный PVC. Выполните ее для всех PVCs из списка.

   ```bash
   kubectl -n $NAMESPACE delete pvc <имя PVC>
   ```

1. Пропатчите PVs, которые использовались аддоном, так, чтобы отвязать их от PVCs, которые были удалены. Эти постоянные тома станут доступны для связывания (статус PVs: `Available`) и будут переиспользованы новой версией аддона после ее установки.

   Эта команда патчит отдельный PV. Выполните ее для всех PVs из списка, полученного ранее.

   ```bash
   kubectl patch pv <имя PV> --type json -p '[{"op": "remove", "path": "/spec/claimRef"}]'
   ```

1. Получите список всех PVs в кластере и убедитесь, что те PVs, с которыми работал аддон, используют политику освобождения `Retain` и доступны для связывания (`Available`):

   ```bash
   kubectl get pv
   ```

   <details>
   <summary>Пример частичного вывода команды</summary>

   ```text
   NAME                                       CAPACITY   ...   RECLAIM POLICY   STATUS      ...
   pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        ...   Retain           Available   ...
   pvc-YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY   1Gi        ...   Retain           Available   ...
   pvc-ZZZZZZZZ-ZZZZ-ZZZZ-ZZZZ-ZZZZZZZZZZZZ   10Gi       ...   Retain           Available   ...
   ```

   </details>

1. Получите список CRDs, с которыми работал аддон:

   ```bash
   kubectl get crd -o jsonpath='{range .items[?(@.spec.group=="monitoring.coreos.com")]}{.metadata.name}{"\n"}{end}'
   ```

1. Удалите все CRDs, с которыми работал аддон.

   Эта команда удаляет отдельный CRD. Выполните ее для всех CRDs из списка, полученного ранее.

   ```bash
   kubectl delete crd <имя CRD>
   ```

1. Удалите пространство имен, в котором был установлен аддон.

   ```bash
   kubectl delete ns $NAMESPACE
   ```

</tabpanel>
</tabs>

## 3. Обновите аддон на новую версию

1. [Удалите текущую версию аддона](../../operations/addons/manage-addons#udalenie_addona), пользуясь интерфейсами VK Cloud.
1. [Установите в кластер](../../operations/addons/advanced-installation/install-advanced-monitoring) аддон Kube Prometheus Stack версии `54.2.2`.

   Выполните **стандартную установку** следующим образом:

   1. Задайте те же названия приложения и пространства имен, которые использовались при установке аддона предыдущей версии.

   1. Изучите код настройки аддона предыдущей версии, [полученный ранее](#1_poluchite_informaciyu_neobhodimuyu_dlya_obnovleniya_addona). Найдите фрагменты кода, которые отвечают за настройку хранилища для следующих компонентов аддона:

      <tabs>
      <tablist>
      <tab>Grafana</tab>
      <tab>Alert Manager</tab>
      <tab>Prometheus</tab>
      </tablist>
      <tabpanel>

      ```yaml
      grafana:

        ...

        persistence:
          enabled: true
          storageClassName: "csi-ceph-hdd-gz1"
          accessModes:
          - ReadWriteOnce
          size: 1Gi

        ...
      ```

      </tabpanel>
      <tabpanel>

      ```yaml
      alertmanager:

        ...

        alertmanagerSpec:

        ...

          storage:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-hdd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 1Gi
      ```

      </tabpanel>
      <tabpanel>

      ```yaml
      prometheus:
      
        ...
      
        prometheusSpec:
      
          ...
      
          storageSpec:
            volumeClaimTemplate:
              spec:
                storageClassName: "csi-ceph-ssd-gz1"
                accessModes:
                - ReadWriteOnce
                resources:
                  requests:
                    storage: 10Gi
      ```

      </tabpanel>
      </tabs>

   1. Изучите код настройки новой версии аддона, которую планируется установить.

      Если фрагменты кода, которые отвечают за настройку хранилища, отличаются от полученных ранее, то скорректируйте их. Настройки хранилища для Grafana, Alert Manager и Prometheus должны в точности совпадать с аналогичными настройками, которые использовались для аддона предыдущей версии.

   1. (Опционально) Внесите иные изменения в код настройки аддона.

      Если вы указали пароль для доступа к Grafana в поле `grafana.adminPassword` при установке аддона предыдущей версии, указывать его повторно не нужно. Новая версия аддона будет использовать прежние PVs в качестве хранилища, поэтому пароль останется прежним. Установка новой версии аддона не поменяет пароль для доступа к Grafana, даже если оставить это поле пустым: будет сгенерирован секрет с паролем для Grafana, но он не будет использован.

      <warn>

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      </warn>

   1. Установите аддон.

      Процесс установки может занять длительное время. Дождитесь его завершения.

1. Получите информацию о используемых аддоном [Persistent Volume Claims (PVCs) и постоянных томах (persistent volumes, PVs)](../../k8s-reference/pvs-and-pvcs):

   ```bash
   kubectl -n $NAMESPACE get pvc
   ```

   Вывод команды должен быть аналогичен выводу команды, которая [выполнялась ранее](#1_poluchite_informaciyu_neobhodimuyu_dlya_obnovleniya_addona) для аддона предыдущей версии. Так, PVC `alertmanager...` должен быть связан с тем же PV, который использовался Alert Manager ранее. Для Prometheus и Grafana — аналогично.

## 4. Проверьте работоспособность аддона после обновления

[Получите доступ к веб-интерфейсу Grafana](../../monitoring#ispolzovanie_grafana). Для подключения используйте тот же пароль, который использовался с аддоном предыдущей версии. Если вы забыли пароль от Grafana, [сбросьте его](../../operations/addons/advanced-installation/install-advanced-monitoring#sbros_parolya_dlya_grafana).

Успешное подключение к Grafana свидетельствует об успешном обновлении аддона.

## Удалите неиспользуемые ресурсы

Работающий кластер Cloud Containers тарифицируется и потребляет вычислительные ресурсы. Если вы создали кластер в тестовых целях и он вам больше не нужен:

- [остановите](../../operations/manage-cluster#zapustit_ili_ostanovit_klaster) его, чтобы воспользоваться им позже;
- [удалите](../../operations/manage-cluster#udalit_klaster) его навсегда.
