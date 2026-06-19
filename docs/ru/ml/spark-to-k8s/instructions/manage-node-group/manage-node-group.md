# {heading(Управление группой worker-узлов)[id=mlspark-instructions-manage-node-group]}

## {heading(Добавление группы worker-узлов)[id=mlspark-instructions-manage-node-group-add]}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного кластера и выберите пункт **Добавить группу узлов**.
1. Задайте [настройки](/ru/kubernetes/k8s/instructions/helpers/node-group-settings) для группы узлов.
1. Подтвердите выполнение операции.

{/tab}

{/tabs}

## {heading(Настройка параметров масштабирования)[id=mlspark-instructions-manage-node-group-scaling-params]}

Размер группы worker-узлов можно изменить вручную или настроить автоматическое масштабирование. Эти операции подробно описаны в разделе [Масштабирование узлов кластера](/ru/kubernetes/k8s/concepts/scale).
