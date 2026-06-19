# {heading(Не добавляются новые узлы при автоматическом масштабировании)[id=k8s-cluster-does-not-scale-up]}

Новые узлы не добавляются, несмотря на работу {linkto(../../concepts/cluster-autoscaler#k8s-cluster-autoscaler)[text=агента автоматического масштабирования (Cluster Autoscaler)]}, и поды находятся в состоянии `Pending`. 

У такого поведения может быть несколько причин. Последовательно выполните шаги, переходя от одного решения к другому, пока проблема не будет устранена. 

{cut(У подов не заданы запросы на желаемые вычислительные ресурсы)}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
1. Выведите манифест пода, в котором наблюдается проблема, с помощью команды:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```
1. Если в манифесте пода отсутствует блок `resources.requests`, добавьте его и укажите в нем запрашиваемые вычислительные ресурсы. Пример: 
   
   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: frontend
   spec:
     containers:
     - name: app
       image: images.my-company.example/app:v4
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
           cpu: "500m"
     - name: log-aggregator
       image: images.my-company.example/log-aggregator:v6
       resources:
         requests:
           memory: "64Mi"
           cpu: "250m"
         limits:
           memory: "128Mi"
         cpu: "500m"
   ```
   
Подробнее о ресурсах в разделе {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ограничение использования ресурсов]} и [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/). 

{/cut}

{cut(Целевая группа узлов уже имеет максимальное количество узлов)}

1. Просмотрите количество узлов в группе узлов. 

   {tabs}
   {tab(Личный кабинет)}
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите нужный кластер и группу узлов в нем.
   1. Нажмите ![](../../../../assets/more-icon.svg "inline") для нужной группы узлов, выберите пункт **Настройки масштабирования** и включите опцию **Включить автомасштабирование**.
   1. В появившемся окне сравните значения полей **Максимальное количество узлов** и **Количество узлов**. Если они одинаковы, значит, в группе достигнуто максимальное количество узлов.
   {/tab}

   {tab(kubectl)}
   1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
   1. Проверьте, есть ли в {linkto(../../how-to-guides/autoscaler-logs#k8s-autoscaler-logs)[text=логах агента автоматического масштабирования]} предупреждения, содержащие `max size reached`. Если есть, то в группе достигнуто максимальное количество узлов.
   {/tab}
   {/tabs}

1. {linkto(../../instructions/scale#k8s-instructions-scale-horizontal-autoscaling-worker-nodes)[text=Увеличьте]} максимальное количество узлов до нужного значения.

Подробнее в разделе {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Управление группой worker-узлов]}. 

{/cut}

{cut(В проекте {var(cloud)} закончились квоты на vCPU, RAM или виртуальные машины)}

1. Просмотрите квоты на vCPU, RAM и виртуальные машины.

   {tabs}
   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   
   {include(/ru/_includes/_project_quotas.md)[tags=cluster-does-not-scale-up]}
   
   {/tab}
   
   {tab(kubectl)}

   1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
   1. Проверьте, есть ли в {linkto(../../how-to-guides/autoscaler-logs#k8s-autoscaler-logs)[text=логах агента автоматического масштабирования]} предупреждения, содержащие `quota exceeded`. Если есть, то в проекте закончились квоты на соответствующие ресурсы.
   
   {/tab}
   {/tabs}

1. Если квоты исчерпаны и проекту требуются дополнительные, выберите один из вариантов:

   - Удалите неиспользуемые ресурсы, чтобы освободить квоты.
   - {linkto(../../../../tools-for-using-services/account/instructions/project-settings/manage#project-increase-quota)[text=Увеличьте]} квоты. 

Подробнее о квотах в статье {linkto(../../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=Квоты и лимиты]}.

{/cut}

{cut(Ограничения планировщика: у пода указаны требования и правила, которым не удовлетворяет ни один существующий или потенциальный новый узел)}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
1. Проверьте, есть ли в {linkto(../../how-to-guides/autoscaler-logs#k8s-autoscaler-logs)[text=логах агента автоматического масштабирования]} предупреждения, содержащие `predicate failed`. Если есть, то проблема в правилах планирования.
1. Выведите манифест пода, в котором наблюдается проблема, с помощью команды:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```

1. В выводе манифеста просмотрите правила планирования. Они могут быть заданы с помощью селектора узлов (`nodeSelector`), правил размещения узлов (`affinity`) или исключений (`tolerations`). Если существующие или потенциальные новые узлы не удовлетворяют ни одним из существующих правил планирования, выберите один из вариантов:

   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group-labels-taints)[text=Cогласуйте]} правила пода с указанными правилами и требованиями.
   - {linkto(../../instructions/manage-node-group#k8s-manage-node-group)[text=Добавьте]} новую группу узлов, соответствующую указанным требованиям. 
   
Подробнее о метках, ограничениях и исключениях в разделе {linkto(../../reference/labels-and-taints#k8s-labels-and-taints)[text=Метки и ограничения]}.

{/cut}

{cut(Под привязан к постоянному тому в другой зоне доступности, что вызывает конфликт)}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
1. Выведите манифест пода, в котором наблюдается конфликт, с помощью команды:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```
   
1. В выводе манифеста ищите предупреждения, которые начинаются с `volume node affinity conflict`. Такие предупреждения указывают на то, что под привязан к тому в другой зоне доступности и не может быть запланирован на узел, где этот том доступен.

   Если такие предупреждения есть: 
   1. Измените значение `volumeBindingMode` в манифесте класса хранения (StorageClass) вашего кластера на `WaitForFirstConsumer`. С этим параметром Kubernetes сначала дождется, пока первый под будет запланирован, и затем привяжет том к конкретному узлу. 
   1. Примените изменения в манифесте класса хранения кластера:

      ```console
      kubectl apply -f <ИМЯ_ФАЙЛА_МАНИФЕСТА_КЛАССА_ХРАНЕНИЯ>
      ```

Подробнее о томах в разделе {linkto(../../reference/pvs-and-pvcs#k8s-pvs-and-pvcs)[text=Постоянные тома и PVC]}.

{/cut}

{cut(Под запрашивает больше ресурсов, чем может предоставить любой тип виртуальной машины в доступных группах узлов)}

1. {linkto(../../connect/kubectl#k8s-kubectl)[text=Подключитесь к кластеру]} с помощью `kubectl`.
1. Выведите манифест пода, в котором наблюдается проблема, с помощью команды:

   ```console
   kubectl describe pod <ИМЯ_ПОДА>
   ```
   
1. Сравните ресурсы, указанные в блоке `resources.requests`, с характеристиками виртуальных машин в соответствующих {linkto(../../instructions/helpers/node-group-settings#k8s-node-group-settings)[text=группах узлов]}. 

1. Если ресурсов недостаточно, {linkto(/ru/kubernetes/k8s/instructions/manage-node-group#k8s-manage-node-group-add-group)[text=создайте]} новую группу узлов с {linkto(../../concepts/flavors#k8s-flavors-vm-flavor)[text=шаблоном виртуальной машины]}, подходящим по количеству ресурсов.

Подробнее о ресурсах в разделе {linkto(../../reference/resource-limiting#k8s-resource-limiting)[text=Ограничение использования ресурсов]} и [официальной документации Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).

{/cut}

Если проблема сохраняется, обратитесь в [техническую поддержку](/ru/contacts).