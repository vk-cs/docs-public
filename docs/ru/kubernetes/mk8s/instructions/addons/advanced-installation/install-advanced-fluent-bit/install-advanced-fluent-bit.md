# {heading(Fluent Bit)[id=mk8s-install-advanced-fluent-bit]}

## {heading(Подготовительные шаги)[id=mk8s-install-advanced-fluent-bit-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=mk8s-install-advanced-fluent-bit-install]}

Для аддона {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-fluent-bit)[text=Fluent Bit]} доступен только {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=стандартный вариант установки]}.

Аддон будет установлен в виде контроллера [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) на все узлы кластера, включая master-узлы.

{tabs}

{tab(Личный кабинет)}

 1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
 1. Выберите проект, где находится нужный кластер.
 1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
 1. Нажмите на имя нужного кластера.
 1. Перейдите на вкладку **Аддоны**.
 1. Нажмите кнопку **Установить** на карточке аддона `fluent-bit` и нажмите кнопку **Установить аддон**.
 1. (Опционально) Отредактируйте:

     - выбранную версию;
     - название приложения;
     - название пространства имен, куда будет установлен аддон.

 1. Отредактируйте {linkto(#mk8s-install-advanced-fluent-bit-edit-code)[text=код настройки аддона]}: в секции `Output` задайте параметры доставки логов в выбранный сервис. Другие параметры оставьте на свое усмотрение.

     {note:warn}
     Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
     {/note}

 1. Нажмите кнопку **Установить аддон**.

    Начнется установка аддона в кластер. Этот процесс может занять длительное время.

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=mk8s-install-advanced-fluent-bit-edit-code]}

Полный код настройки аддона вместе с описанием полей доступен в личном кабинете.

Установка аддона невозможна без редактирования кода настройки — обязательно нужно задать параметры доставки логов:

1. В секции `Output` кода задайте параметры доставки в выбранный сервис.

   {cut(Пример для настройки доставки логов в Elasticsearch)}

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

   {/cut}

   {cut(Пример для настройки доставки логов в Loki )}

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

   {/cut}

1. (Опционально) Отредактируйте другие параметры кода настройки. Подробнее о параметрах  конфигурационного файла читайте в [официальной документации Fluent Bit](https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file). Также на [GitHub](https://github.com/fluent/helm-charts/blob/main/charts/fluent-bit/values.yaml) доступен пример кода настройки Fluent Bit.

   {note:warn}
   Не удаляйте поля, которые требуются для корректной установки и работы аддона, или заданные в этих полях значения.

   В коде настройки аддона есть комментарии, позволяющие найти такие поля.
   {/note}

1. По завершении редактирования кода {linkto(#mk8s-install-advanced-fluent-bit-install)[text=продолжите установку аддона]}.

Подробнее о пайплайне можно прочитать в [официальной документации](https://docs.fluentbit.io/manual/pipeline).