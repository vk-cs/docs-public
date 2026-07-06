# {heading(Ingress NGINX)[id=k8s-install-advanced-ingress]}

{ifndef(public)}
Аддон позволяет управлять трафиком, входящим в кластер, и маршрутизировать его в зависимости от настроенных правил.
{/ifndef}

{ifdef(public)}
## {heading(Подготовительные шаги)[id=k8s-install-advanced-ingress-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=k8s-install-advanced-ingress-install]}

{note:warn}
При установке аддона для него будет создан {linkto(../../../../../../networks/balancing/concepts/about#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}. Использование балансировщика {linkto(../../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Для аддона доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.
{/ifdef}

{ifdef(public)}
{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
{/ifdef}
      
   {ifdef(public)}
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   {/ifdef}
   {ifndef(public)}
   1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/ifndef}
   1. Выберите проект, где находится нужный кластер.
   {ifdef(public)}
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   {/ifdef}
   {ifndef(public)}
   1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
   {/ifndef}
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона **ingress-nginx**.
   {ifndef(public)}
   1. В поле **Версия** выберите необходимую версию аддона и нажмите **Установить аддон**.
   {/ifndef}
   {ifdef(public)}
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-ingress-edit-code)[text=код настройки аддона]}.

        {note:warn}
        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
        {/note}
   {/ifdef}
   {ifndef(public)}
   1. При необходимости измените название приложения и название пространства имен, куда будет установлен аддон.
   1. В поле **Код настройки аддона** в параметре `service.beta.kubernetes.io/openstack-internal-load-balancer` укажите значение `true`, чтобы установить аддон с внутренним IP-адресом на балансировщике.
   {/ifndef}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

{ifdef(public)}
   {/tab}
   
   {tab(Terraform)}
   
   1. [Установите Terraform и настройте окружение](../../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform. Например, вы можете отредактировать код настройки аддона, изменив ресурс `vkcs_kubernetes_addon`.

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

1. {linkto(#k8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{tab(Установка на выделенные worker-узлы)}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

   1. {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=Задайте]} для этой группы узлов, если это еще не сделано:

      - **Метку (label)**: ключ `addonNodes`, значение `dedicated`.
      - **Ограничение (taint)**: эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   {/tab}

   {/tabs}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-ingress-edit-code)[text=код настройки аддона]}.

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона:

      {tabs}
      
      {tab(Исключения)}
            
      ```yaml
      tolerations:
        - key: "addonNodes"
          operator: "Equal"
          value: "dedicated"
          effect: "NoSchedule"
      ```

      Задайте это исключение для полей:

      - `controller.tolerations`;
      - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Селекторы узлов)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}

   {tab(Terraform)}
   
   1. [Установите Terraform и настройте окружение](../../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона, изменив ресурс `vkcs_kubernetes_addon`. При установке аддона все ресурсы Kubernetes с этими селекторами и исключениями будут размещены на выделенной группе узлов, подготовленной ранее.

      {tabs}
      
      {tab(Исключения)}
            
      ```yaml
      tolerations:
         - key: "addonNodes"
            operator: "Equal"
            value: "dedicated"
            effect: "NoSchedule"
      ```

      Задайте это исключение для полей:

         - `controller.tolerations`;
         - `defaultBackend.tolerations`.

      {/tab}
      
      {tab(Селекторы узлов)}
      
       ```yaml
      nodeSelector:
         addonNodes: dedicated
      ```

      Задайте этот селектор узлов для полей:

         - `controller.nodeSelector`;
         - `defaultBackend.nodeSelector`.

      {/tab}

      {/tabs}

      {note:warn}
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      {/note}

   1. (Опционально) Если вы используете примеры по ссылкам выше, адаптируйте их под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

1. {linkto(#k8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется. Будет создан балансировщик нагрузки с Floating IP-адресом, и Ingress-контроллер будет доступен из интернета.

Если это вам не подходит, выполните **стандартную установку** или **установку на выделенные worker-узлы**.
{/note}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}
   
   {tab(Terraform)}
   
   1. [Установите Terraform и настройте окружение](../../../../../../tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```console
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```console
      terraform apply
      ```

   {/tab}

   {/tabs}

1. {linkto(#k8s-install-advanced-ingress-get-ip)[text=Получите IP-адрес балансировщика]}.

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-ingress-edit-code]}

{note:info}
- Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).
{/note}

### {heading(Изменение типа балансировщика для Ingress-контроллера)[id=k8s-install-advanced-ingress-change-balancer]}

При установке аддона с параметрами по умолчанию создается балансировщик нагрузки с Floating IP-адресом, и Ingress-контроллер будет доступен из интернета.

Чтобы Ingress-контроллер не был доступен из интернета, укажите аннотацию, согласно которой будет создан внутренний балансировщик нагрузки:

```yaml
---
service:
  annotations:
    {
      "loadbalancer.openstack.org/proxy-protocol": "true",
      "service.beta.kubernetes.io/openstack-internal-load-balancer": "true",
    }
```

После редактирования кода {linkto(#k8s-install-advanced-ingress-install)[text=продолжите установку аддона]}.

### {heading(Запрет удаления узла Ingress-контроллера модулем Autoscaler)[id=k8s-install-advanced-ingress-delete-prohibition]}

Модуль Autoscaler автоматически масштабирует кластер: добавляет узлы при увеличении нагрузки, удаляет — при уменьшении. Чтобы запретить модулю удалять узел, на котором работает под аддона, нужно прописать запрет на удаление в аннотации пода:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

После редактирования кода {linkto(#k8s-install-advanced-ingress-install)[text=продолжите установку аддона]}.
{/ifdef}

## {heading(Получение IP-адреса балансировщика)[id=k8s-install-advanced-ingress-get-ip]}

{note:info}
Далее используется имя сервиса `ingress-nginx` и пространство имен `ingress-nginx`. Если при добавлении аддона были выбраны другие параметры, скорректируйте команды.
{/note}

{ifdef(public)}
{tabs}

{tab(Kubernetes Dashboard)}

1. {linkto(../../../../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Подключитесь к кластеру]} с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `ingress-nginx`.
1. Перейдите в раздел меню **Service → Services**.
1. Найдите в списке сервисов `ingress-nginx-controller` типа `LoadBalancer`.

   В столбце **External Endpoints** будет отображен Floating IP-адрес, назначенный балансировщику.

{/tab}

{tab(kubectl)}
{/ifdef}

1. {linkto(../../../../connect/kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. Выполните команду:

   ```console
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   В столбце `EXTERNAL-IP` будет отображен Floating IP-адрес, назначенный балансировщику.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}