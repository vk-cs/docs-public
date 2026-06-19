# {heading(Перенос рабочей нагрузки после миграции ресурсов)[id=k8s-post-migration]}

Это руководство поможет вам завершить перенос своей рабочей нагрузки (workload) после того, как сотрудники {var(cloud)} завершат {linkto(/ru/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=работы по миграции]} ресурсов кластера {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]} между {linkto(/ru/start/concepts/architecture#architecture-az)[text=зонами доступности]}. Вы выполните следующие шаги:

1. Определите, зависит ли ваша рабочая нагрузка (workload) от старой зоны доступности, так как в таком случае метаданные вашей рабочей нагрузки продолжат ссылаться на нее.
1. Адаптируете рабочую нагрузку на уже смигрированных группах worker-узлов под новую зону доступности.
1. Перенесете [stateful-нагрузку](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) на новые {linkto(/ru/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PVC]}.
1. Если привязка к зоне доступности была установлена в helm-чартах или при настройке аддонов, обновите эти значения на новую зону доступности.

{include(/ru/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Подготовительные шаги)[id=k8s-post-migration-prepare]}

1. Перейдите в кластер {linkto(/ru/kubernetes/k8s/concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}, ресурсы которого были перенесены на другую зону доступности.
{include(/ru/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Определите зависимость рабочей нагрузки от зоны доступности)[id=k8s-post-migration-check]}

Определите, повлияет ли миграция на рабочую нагрузку ([workload](https://kubernetes.io/docs/concepts/workloads/)) ваших кластеров. Для этого узнайте, указана ли зона доступности:

{include(/ru/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Обновите конфигурации смигрированных групп узлов)[id=k8s-post-migration-update]}

1. Дождитесь окончания работ по миграции ресурсов со стороны {var(cloud)}.

   Узлы смигрированных групп worker-узлов (то есть тех, которые были созданы до миграции) будут иметь следующие {linkto(/ru/kubernetes/k8s/reference/labels-and-taints#k8s-labels-and-taints)[text=метки]}, указывающие на старую зону доступности:

    - `topology.kubernetes.io/zone`,
    - `failure-domain.beta.kubernetes.io/zone`.

   Эти метки необходимо обновить, так как сам узел физически будет находиться уже в новой зоне доступности.

   Метку `topology.cinder.csi.openstack.org/zone` обновлять не нужно: в ней новая зона доступности будет установлена для узлов, созданных как до, так и после миграции.

1. Обновите зоны доступности в метках:

   {tabs}

   {tab(Для отдельных узлов)}

   ```console
      kubectl label node ≠ \
          topology.kubernetes.io/zone=<НОВАЯ_ЗОНА_ДОСТУПНОСТИ> \
          failure-domain.beta.kubernetes.io/zone=<НОВАЯ_ЗОНА_ДОСТУПНОСТИ> \
          --overwrite
   ```

   Здесь `<НОВАЯ_ЗОНА_ДОСТУПНОСТИ>` — зона доступности после миграции.

   {/tab}

   {tab(Для всех узлов)}

   ```console
      kubectl label nodes -l topology.kubernetes.io/zone=<СТАРАЯ_ЗОНА_ДОСТУПНОСТИ>,failure-domain.beta.kubernetes.io/zone=<СТАРАЯ_ЗОНА_ДОСТУПНОСТИ> \
          topology.kubernetes.io/zone=<НОВАЯ_ЗОНА_ДОСТУПНОСТИ> \
          failure-domain.beta.kubernetes.io/zone=<НОВАЯ_ЗОНА_ДОСТУПНОСТИ> \
          --overwrite
   ```

   Здесь:

   - `<СТАРАЯ_ЗОНА_ДОСТУПНОСТИ>` — зона доступности до миграции;
   - `<НОВАЯ_ЗОНА_ДОСТУПНОСТИ>` — зона доступности после миграции.

   Новая зона доступности для обеих меток должна быть одна и та же.

   {/tab}
   {/tabs}

## {heading({counter(az)}. Перенесите stateful-нагрузку на новый PVC)[id=k8s-post-migration-stateful]}

Так как работы по {linkto(/ru/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=миграции ресурсов]} со стороны {var(cloud)} уже завершены, диски, на которых расположены PV, уже физически изменили свою зону. Теперь вам нужно актуализировать их метаданные в кластере. 

Чтобы перенести stateful-нагрузку на PVC в новой зоне доступности,

1. [Подготовьте PVC](#k8s-post-migration-pvc-check).
1. [Перенесите нагрузку одним из предложенных способов](#k8s-post-migration-pvc).

### {heading(3.1. Подготовьте PVC к переносу)[id=k8s-post-migration-pvc-check]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Выберите способ переноса)[id=k8s-post-migration-pvc]}

Доступны несколько способов переноса PVC:

- с помощью снимка диска (через личный кабинет {var(cloud)} или через плагин Cinder CSI);
- с помощью утилиты `pv-migrate`;
- с помощью ID диска.

{tabs}

{include(/ru/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/ru/_includes/_az-migration-magnum.md)[tags=pv-migrate]}
{include(/ru/_includes/_az-migration-magnum.md)[tags=volume-id]}

{/tabs}

## {heading({counter(az)}. Обновите Helm-чарты и настройки аддонов)[id=k8s-post-migration-helm-addons]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-post-migration-delete]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=delete]}