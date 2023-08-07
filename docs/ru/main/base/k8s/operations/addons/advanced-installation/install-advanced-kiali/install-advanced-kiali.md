## Подготовительные шаги

[Установите аддон](../install-advanced-istio/) `istio`.

## Установка аддона

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti-ustanovki-addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#vypolnit-ruchnoe-masshtabirovanie) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#nastroit-avtomaticheskoe-masshtabirovanie--tolko-dlya-grupp-worker-uzlov-) перед установкой.

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

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kiali`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - [код настройки аддона](#redaktirovanie-koda-nastroyki-addona-pri-ustanovke).

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
         resource "vkcs_kubernetes_addon" "kiali-server" {
            cluster_id = vkcs_kubernetes_cluster.k8s-cluster.id
            addon_id = data.vkcs_kubernetes_addon.kiali-server.id
            namespace = "istio-system"
            configuration_values = templatefile("./kiali-server-all.yaml",{grafana_username = "<имя пользователя аддона Grafana>", grafana_password = "<пароль пользователя аддона Grafana>", istio_namespace = "istio-system"})
         
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

1. [Подключитесь к Kiali](../../../../connect/kiali-server).

</tabpanel>
<tabpanel>

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   </tablist>
   <tabpanel>

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов, на которых будут размещаться аддоны.

      Если такой группы нет — [добавьте ее](../../../manage-node-group#dobavit-gruppu-worker-uzlov).

   1. [Задайте](../../../manage-node-group#nastroit-metki-i-ogranicheniya) для этой группы узлов, если это еще не сделано:

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

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kiali`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - [код настройки аддона](#redaktirovanie-koda-nastroyki-addona-pri-ustanovke).

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

      Задайте это исключение для поля `tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для поля `nodeSelector`.

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

1. [Подключитесь к Kiali](../../../../connect/kiali-server).

</tabpanel>
<tabpanel>

<info>

При быстрой установке будет недоступна интеграция с Grafana.

Чтобы указать пароль для аутентификации в Grafana и получить возможность интеграции, выполните **стандартную установку** или **установку на выделенные worker-узлы**.

</info>

1. Установите аддон:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   <tab>Terraform</tab>
   </tablist>
   <tabpanel>

   1. Перейдите в [личный кабинет](https://mcs.mail.ru/app/) VK Cloud.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите на кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kiali`.
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

1. [Подключитесь к Kiali](../../../../connect/kiali-server).

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

<info>

Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.

</info>

### Установка пароля для интеграции с Grafana

При установке аддона с параметрами по умолчанию будет недоступна интеграция с Grafana.

Чтобы получить возможность интеграции, задайте пароль пользователя `admin` Grafana при установке аддона. Для этого измените значение поля в коде настройки аддона:

```yaml
external_services:
  grafana:
    auth:
      password: "<пароль пользователя admin Grafana>"
```

После редактирования кода [продолжите установку аддона](#ustanovka-addona).
