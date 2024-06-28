## Установка аддона

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/networks/vnet/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffs).

</warn>

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#scale_worker_nodes) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#autoscale_worker_nodes) перед установкой.

<tabs>
<tablist>
<tab>Стандартная установка</tab>
<tab>Установка на выделенные worker-узлы</tab>
<tab>Быстрая установка</tab>
</tablist>
<tabpanel>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

        <warn>

        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

        </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform. Например, вы можете отредактировать код настройки аддона, изменив ресурс `vkcs_kubernetes_addon`.

      <warn>
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      </warn>

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```bash
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. [Получите IP-адрес балансировщика](#poluchenie_ip_adresa_balansirovshchika).

</tabpanel>
<tabpanel>

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — [добавьте ее](../../../manage-node-group#dobavit_gruppu_worker_uzlov).

   1. [Задайте](../../../manage-node-group#nastroit_metki_i_ogranicheniya) для этой группы узлов, если это еще не сделано:

      - **Метку (label)**: ключ `addonNodes`, значение `dedicated`.
      - **Ограничение (taint)**: эффект `NoSchedule`, ключ `addonNodes`, значение `dedicated`.

   </tabpanel>
   </tabs>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона:

      <tabs>
      <tablist>
      <tab>Исключения</tab>
      <tab>Селекторы узлов</tab>
      </tablist>
      <tabpanel>

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

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `controller.nodeSelector`;
      - `defaultBackend.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

   1. Задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector) в коде настройки аддона, изменив ресурс `vkcs_kubernetes_addon`. При установке аддона все ресурсы Kubernetes с этими селекторами и исключениями будут размещены на выделенной группе узлов, подготовленной ранее.

      <tabs>
      <tablist>
      <tab>Исключения</tab>
      <tab>Селекторы узлов</tab>
      </tablist>
      <tabpanel>

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

      </tabpanel>
      <tabpanel>

       ```yaml
      nodeSelector:
         addonNodes: dedicated
      ```

      Задайте этот селектор узлов для полей:

         - `controller.nodeSelector`;
         - `defaultBackend.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>
      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
      </warn>

   1. (Опционально) Если вы используете примеры по ссылкам выше, адаптируйте их под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```bash
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. [Получите IP-адрес балансировщика](#poluchenie_ip_adresa_balansirovshchika).

</tabpanel>
<tabpanel>

<info>

При быстрой установке код настройки аддона не редактируется. Будет создан балансировщик нагрузки с плавающим IP-адресом, и Ingress-контроллер будет доступен из интернета.

Если это вам не подходит, выполните **стандартную установку** или **установку на выделенные worker-узлы**.

</info>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
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

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
   1. Добавьте в ваши конфигурационные файлы Terraform, которые описывают кластер:

      - ресурс [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md);
      - источник данных [vkcs_kubernetes_addons](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addons.md).

      При необходимости адаптируйте приведенные по ссылкам примеры использования ресурсов и источников под свою задачу и конфигурацию Terraform.

   1. Убедитесь, что конфигурационные файлы корректны и содержат нужные изменения:

      ```bash
      terraform validate && terraform plan
      ```

   1. Примените изменения:

      ```bash
      terraform apply
      ```

   </tabpanel>
   </tabs>

1. [Получите IP-адрес балансировщика](#poluchenie_ip_adresa_balansirovshchika).

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

<info>

- Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/kubernetes/ingress-nginx/blob/main/charts/ingress-nginx/values.yaml).

</info>

### Изменение типа балансировщика для Ingress-контроллера

При установке аддона с параметрами по умолчанию создается балансировщик нагрузки с плавающим IP-адресом, и Ingress-контроллер будет доступен из интернета.

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

После редактирования кода [продолжите установку аддона](#ustanovka_addona).

### Запрет удаления узла Ingress-контроллера модулем Autoscaler

Модуль Autoscaler автоматически масштабирует кластер: добавляет узлы при увеличении нагрузки, удаляет — при уменьшении. Чтобы запретить модулю удалять узел, на котором работает под аддона, нужно прописать запрет на удаление в аннотации пода:

```yaml
controller:
  podAnnotations:
    cluster-autoscaler.kubernetes.io/safe-to-evict: "false"
```

После редактирования кода [продолжите установку аддона](#ustanovka_addona).

## Получение IP-адреса балансировщика

<info>

Далее используется имя сервиса `ingress-nginx` и пространство имен `ingress-nginx`. Если при добавлении аддона были выбраны другие параметры, скорректируйте команды.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Подключитесь к кластеру](../../../../connect/k8s-dashboard) с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `ingress-nginx`.
1. Перейдите в раздел меню **Service → Services**.
1. Найдите в списке сервисов `ingress-nginx-controller` типа `LoadBalancer`.

   В столбце **External Endpoints** будет отображен плавающий IP-адрес, назначенный балансировщику.

</tabpanel>
<tabpanel>

1. [Убедитесь](../../../../connect/kubectl#proverka_podklyucheniya_k_klasteru), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Выполните команду:

   ```bash
   kubectl get svc ingress-nginx-controller -n ingress-nginx
   ```

   В столбце `EXTERNAL-IP` будет отображен плавающий IP-адрес, назначенный балансировщику.

</tabpanel>
</tabs>
