# {heading(Установка аддона на выделенную группу узлов)[id=k8s-install-private-dedicated-workers]}

1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Убедитесь, что в кластере есть выделенная группа узлов, на которых будут размещаться аддоны. Если такой группы нет, {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.
1. Задайте для этой группы узлов, если это еще не сделано:

   * Метку (label): ключ `addonNodes`, значение `dedicated`.
   * Ограничение (taint): эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

1. Выберите для кластера необходимый аддон и задайте параметры для установки. В коде аддона установите следующие исключения для полей `tolerations` и селекторы узлов для полей `nodeSelector`:

   ```console
   tolerations:
     - key: "addonNodes"
       operator: "Equal"
       value: "dedicated"
       effect: "NoSchedule"

   nodeSelector:
     addonNodes: dedicated
   ```

1. Нажмите **Установить аддон**. Установка аддона может занять продолжительное время.