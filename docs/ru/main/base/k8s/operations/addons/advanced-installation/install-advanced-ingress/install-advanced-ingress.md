## Установка аддона

<warn>

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/networks/vnet/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffs).

</warn>

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#vypolnit_ruchnoe_masshtabirovanie) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#nastroit_avtomaticheskoe_masshtabirovanie_tolko_dlya_grupp_worker_uzlov) перед установкой.

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

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
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

   1. [Установите Terraform и настройте провайдер](/ru/manage/tools-for-using-services/terraform/quick-start), если этого еще не сделано.
   1. Создайте конфигурационный файл Terraform с данными об устанавливаемом аддоне в блоке `vkcs_kubernetes_addon`:

      - [Получите](../../manage-addons#dostupnye_dlya_ustanovki_addony_7c850197) список доступных для установки аддонов.
      - Получите настройки аддона из параметра `configuration_values`, используя источник данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_addon.md).
      - (Опционально) Чтобы динамически изменять параметры аддона (например, через CI), добавьте настройки аддона в отдельный yaml-файл. Используйте функцию [templatefile](https://developer.hashicorp.com/terraform/language/functions/templatefile), чтобы добавить нужные значения.

      <details>
         <summary>Пример указания аддона</summary>

         ```hcl
         resource "vkcs_kubernetes_addon" "kube-ingress" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.kube-ingress.id
            namespace = "kube-ingress"
            configuration_values = templatefile("./ingress-all.yaml",{openstack-internal-load-balancer= "false"})
         
            depends_on = [
               vkcs_kubernetes_node_group.default_ng
            ]
         }
         ```

      </details>

   1. Проверьте конфигурационный файл Terraform на корректность:

      ```bash
      terraform validate
      ```

   1. Ознакомьтесь с планируемыми изменениями:

      ```bash
      terraform plan
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

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
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

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
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

   Воспользуйтесь инструкцией из стандартной установки аддона. В настройках аддона задайте нужные исключения (tolerations) и селекторы узлов (nodeSelector).

   </tabpanel>
   </tabs>

1. [Получите IP-адрес балансировщика](#poluchenie_ip_adresa_balansirovshchika).

</tabpanel>
<tabpanel>

<info>

При быстрой установке аддона создается балансировщик нагрузки с плавающим IP-адресом, и Ingress-контроллер будет доступен из интернета.

Если необходимо, чтобы Ingress-контроллер не был доступен из интернета, выполните **стандартную установку** или **установку на выделенные worker-узлы**. В процессе установки [измените](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke) тип балансировщика для Ingress-контроллера.

</info>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `ingress-nginx`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   Воспользуйтесь инструкцией из стандартной установки аддона.

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

## Получение IP-адреса балансировщика

<info>

Если при [установке](#ustanovka_addona) аддона были выбраны имя сервиса, отличное от `ingress-nginx`, или пространство имен, отличное от `ingress-nginx`, скорректируйте приведенные ниже шаги.

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
