# {heading(Перенос рабочей нагрузки до миграции ресурсов)[id=k8s-pre-migration]}

Это руководство поможет вам заранее подготовиться к {linkto(/ru/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=миграции]} ресурсов кластера между {linkto(/ru/start/concepts/architecture#architecture-az)[text=зонами доступности]}, которую проведут сотрудники {var(cloud)}. Вы выполните следующие шаги:

1. Определите, зависит ли ваша рабочая нагрузка (workload) от текущей зоны доступности.
1. Создадите новую группу worker-узлов в зоне доступности, куда будет происходить миграция, и перенесете туда свою рабочую нагрузку.
1. Перенесете [stateful-нагрузку](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) на новые {linkto(/ru/kubernetes/k8s/reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=PVC]}. 
1. Дождетесь окончания работ по миграции ресурсов со стороны {var(cloud)}.
1. Если привязка к зоне доступности была установлена в helm-чартах или при настройке аддонов, обновите эти значения на новую зону доступности. 

{include(/ru/_includes/_az-migration-magnum.md)[tags=warn]}

## {heading(Подготовительные шаги)[id=k8s-pre-migration-prepare]}

1. Определите, какой кластер Kubernetes необходимо перенести на новую зону доступности.
{include(/ru/_includes/_az-migration-magnum.md)[tags=prep]}

## {heading({counter(az)}. Определите зависимость рабочей нагрузки от зоны доступности)[id=k8s-pre-migration-check]}

Определите, повлияет ли миграция на рабочую нагрузку ([workload](https://kubernetes.io/docs/concepts/workloads/)) ваших кластеров. Для этого узнайте, указана ли зона доступности:

{include(/ru/_includes/_az-migration-magnum.md)[tags=check]}

## {heading({counter(az)}. Перенесите рабочую нагрузку на новые группы узлов)[id=k8s-workload-migration-new-node-groups]}

1. {linkto(/ru/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-add-group)[text=Добавьте]} группу worker-узлов и укажите для нее зону доступности, куда выполняется миграция.
1. Последовательно перенесите свою рабочую нагрузку на эту группу узлов. Подробнее в [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/workloads/).
1. {linkto(/ru/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-delete-node-group)[text=Удалите]} группу узлов со старой зоной доступности или {linkto(/ru/kubernetes/k8s/instructions/scale#k8s-instructions-scale-horizontal-worker-nodes)[text=уменьшите]} количество узлов в ней до нуля, чтобы воспользоваться ей позже.

## {heading({counter(az)}. Перенесите stateful-нагрузку на новый PVC)[id=k8s-pre-migration-stateful]}

Так как ресурсы кластера еще не перенесены, физически и по своим метаданным тот PVC, который используется stateful-нагрузкой, находится в старой зоне доступности.

Чтобы перенести stateful-нагрузку на PVC в новой зоне доступности:

1. [Подготовьте PVC](#k8s-pre-migration-pvc-check).
1. [Перенесите нагрузку одним из предложенных способов](#k8s-pre-migration-pvc).

### {heading(3.1. Подготовьте PVC к переносу)[id=k8s-pre-migration-pvc-check]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=pvc-prep]}

### {heading(3.2. Выберите способ переноса)[id=k8s-pre-migration-pvc]}

Доступны несколько способов переноса PVC: 

- с помощью снимка диска (через личный кабинет {var(cloud)} или через плагин Cinder CSI);
- с помощью утилиты `pv-migrate`.

{tabs}

{include(/ru/_includes/_az-migration-magnum.md)[tags=snap]}
{include(/ru/_includes/_az-migration-magnum.md)[tags=pv-migrate]}

{/tabs}

## {heading({counter(az)}. Завершите миграцию ресурсов)[id=k8s-pre-migration-finish]}

1. Дождитесь окончания {linkto(/ru/kubernetes/k8s/concepts/az-migration-magnum#k8s-az-migration)[text=работ по миграции]} ресурсов со стороны {var(cloud)}.
1. Запустите рабочую нагрузку и убедитесь, что после миграции она работает корректно.

## {heading({counter(az)}. Обновите Helm-чарты и настройки аддонов)[id=k8s-pre-migration-helm-addons]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=helm-addons]}

## {heading(Удалите неиспользуемые ресурсы)[id=k8s-pre-migration-delete]}

{include(/ru/_includes/_az-migration-magnum.md)[tags=delete]}