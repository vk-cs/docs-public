## Установка аддона

Для аддона доступен только [стандартный вариант установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Аддон будет установлен в виде контроллера [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) на все узлы кластера, включая master-узлы.

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#scale_worker_nodes) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#autoscale_worker_nodes) перед установкой.

<tabpanel>
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
   1. Нажмите кнопку **Установить** на карточке аддона `fluent-bit`.
   1. Выберите нужную версию аддона из выпадающего списка.
   1. Нажмите кнопку **Установить аддон**.
   1. (Опционально) Отредактируйте:

      - выбранную версию;
      - название приложения;
      - название пространства имен, куда будет установлен аддон.
   1. Отредактируйте [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke): в секции `Output` задайте параметры доставки логов в выбранный сервис. Другие параметры оставьте на свое усмотрение.

        <warn>

        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

        </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Установите Terraform и настройте окружение](/ru/manage/tools-for-using-services/terraform/quick-start), если это еще не сделано.
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

</tabpanel>

## Редактирование кода настройки аддона при установке

Полный код настройки аддона вместе с описанием полей доступен:

- в личном кабинете;
- в атрибуте `configuration_values` из источника данных [vkcs_kubernetes_addon](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/data-sources/kubernetes_addon.md), если используется Terraform.

Установка аддона невозможна без редактирования кода настройки — обязательно нужно задать параметры доставки логов:

1. В секции `Output` кода задайте параметры доставки в выбранный сервис.

   <details>

   <summary>Пример для настройки доставки логов в Elasticsearch</summary>

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name es
         Match k8s.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix k8s
         Logstash_Prefix_Key $kubernetes['pod_name']
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On

      [OUTPUT]
         Name es
         Match host.*
         Host XX.XX.XX.XX
         Logstash_Format On
         Logstash_Prefix host
         Logstash_Prefix_Key $_HOSTNAME
         Retry_Limit False
         TLS off
         TLS.debug 4
         TLS.verify off
         Suppress_Type_Name on
         Trace_Error On
         Trace_Output Off
         Replace_Dots On
   ```
   Подробно о параметрах для Elasticsearch читайте в [разделе официальной документации](https://docs.fluentbit.io/manual/pipeline/outputs/elasticsearch).

   </details>

   <details>

   <summary>Пример для настройки доставки логов в Loki </summary>

   <!-- prettier-ignore -->
   ```yaml
   outputs: |
      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match k8s.*
         labels source=kubernetes, pod=$kubernetes['pod_name'], namespace=$kubernetes['namespace_name']

      [OUTPUT]
         Name loki
         host XX.XX.XX.XX
         match host.*
         labels source=systemd, host=$_HOSTNAME, service=$_SYSTEMD_UNIT
   ```

   Подробно о параметрах для Loki читайте в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/pipeline/outputs/loki).

   </details>

1. (Опционально) Отредактируйте другие параметры кода настройки. Подробнее о параметрах  конфигурационного файла читайте в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file). Также на [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml) доступен пример кода настройки Fluent Bit.

   <warn>

   Не удаляйте поля, которые требуются для корректной установки и работы аддона, или заданные в этих полях значения.

   В коде настройки аддона есть комментарии, позволяющие найти такие поля.

   </warn>

1. По завершении редактирования кода [продолжите установку аддона](#ustanovka_addona).

Подробнее о пайплайне можно прочитать в [официальной документации](https://docs.fluentbit.io/manual/pipeline).
