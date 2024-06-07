## Установка аддона

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov).

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#masshtabirovanie_grupp_worker_uzlov_3e7a5fdf) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#nastroyka_avtomaticheskogo_masshtabirovaniya_grupp_worker_uzlov_1f8b2c54) перед установкой.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kube-prometheus-stack`.
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

   1. [Подготовьтесь к работе с Terraform](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
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

1. При необходимости [измените размер диска Prometheus](#izmenenie_razmera_diska_prometheus).
1. При необходимости [получите пароль для Grafana из секрета Kubernetes](#poluchenie_parolya_dlya_grafana_iz_sekreta_kubernetes).

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kube-prometheus-stack`.
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

      - `grafana.tolerations`;
      - `alertmanager.alertmanagerSpec.tolerations`;
      - `prometheusOperator.tolerations`;
      - `prometheusOperator.admissionWebhooks.patch.tolerations`;
      - `prometheus.prometheusSpec.tolerations`;
      - `kube-state-metrics.tolerations`.

      </tabpanel>
      <tabpanel>

      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для полей:

      - `grafana.nodeSelector`;
      - `alertmanager.alertmanagerSpec.nodeSelector`;
      - `prometheusOperator.nodeSelector`;
      - `prometheusOperator.admissionWebhooks.patch.nodeSelector`;
      - `prometheus.prometheusSpec.nodeSelector`;
      - `kube-state-metrics.nodeSelector`.

      </tabpanel>
      </tabs>

      <warn>

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      </warn>

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Подготовьтесь к работе с Terraform](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
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

1. При необходимости [измените размер диска Prometheus](#izmenenie_razmera_diska_prometheus).
1. При необходимости [получите пароль для Grafana из секрета Kubernetes](#poluchenie_parolya_dlya_grafana_iz_sekreta_kubernetes).

</tabpanel>
<tabpanel>

<info>

При быстрой установке код настройки аддона не редактируется. Будет создан секрет Kubernetes, содержащий постоянный пароль для входа в веб-интерфейс Grafana.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kube-prometheus-stack`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   </tabpanel>
   <tabpanel>

   1. [Подготовьтесь к работе с Terraform](/ru/tools-for-using-services/terraform/quick-start), если это еще не сделано.
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

1. При необходимости [измените размер диска Prometheus](#izmenenie_razmera_diska_prometheus).
1. [Получите пароль для Grafana из секрета Kubernetes](#poluchenie_parolya_dlya_grafana_iz_sekreta_kubernetes).

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

<info>

- Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).

</info>

### Установка временного пароля для веб-интерфейса Grafana

При установке аддона с параметрами по умолчанию будет создан секрет Kubernetes, содержащий постоянный пароль для входа в веб-интерфейс Grafana.

Также при установке аддона можно указать временный пароль пользователя. В этом случае первый вход в веб-интерфейс Grafana выполняется в этим паролем, затем будет предложено его сменить. Для этого измените значение поля в коде настройки аддона:

```yaml
grafana:
  adminPassword: "<временный пароль>"
```

После редактирования кода [продолжите установку аддона](#ustanovka_addona).

## Изменение размера диска Prometheus

Эта операция доступна, если в кластере [установлен](#ustanovka_addona) аддон мониторинга `kube-prometheus-stack`.

На диске Prometheus хранятся данные мониторинга кластера. Если для них недостаточно места, или вы хотите увеличить производительность диска Prometheus, увеличьте размер диска.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Раскройте меню аддона `kube-prometheus-stack` и выберите пункт **Изменить размер диска Prometheus**.
1. Задайте нужный размер диска. Операция работает только в сторону увеличения.
1. Нажмите кнопку **Подтвердить**.

</tabpanel>
</tabs>

## Получение пароля для Grafana из секрета Kubernetes

Если аддон был установлен без указания временного пароля, значение пароля для входа в веб-интерфейс Grafana можно получить из секрета Kubernetes.

<info>

Далее используется имя сервиса `kube-prometheus-stack` и пространство имен `prometheus-monitoring`. Если при добавлении аддона были выбраны другие параметры, скорректируйте шаги и команды.

</info>

<tabs>
<tablist>
<tab>Kubernetes Dashboard</tab>
<tab>kubectl</tab>
</tablist>
<tabpanel>

1. [Подключитесь к кластеру](../../../../connect/k8s-dashboard) с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `prometheus-monitoring`.
1. Перейдите в раздел меню **Config and Storage → Secrets**.
1. Найдите в списке секретов `kube-prometheus-stack-grafana` и нажмите на имя секрета.
1. В блоке **Data** нажмите на иконку глаза рядом с параметром `admin-password`.

   Будет отображен пароль.

</tabpanel>
<tabpanel>

1. [Убедитесь](../../../../connect/kubectl#proverka_podklyucheniya_k_klasteru), что вы можете подключиться к кластеру с помощью `kubectl`.

1. Получите пароль для входа в Grafana из секрета Kubernetes:

   <tabs>
   <tablist>
   <tab>Windows (PowerShell)</tab>
   <tab>Linux (bash)/macOS (zsh)</tab>
   </tablist>
   <tabpanel>

   ```powershell
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   </tabpanel>
   <tabpanel>

   ```bash
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Сброс пароля для Grafana

Если аддон был установлен без указания временного пароля, значение пароля для входа в веб-интерфейс Grafana хранится в секрете Kubernetes. Если этот секрет был утерян, вы можете сбросить пароль, чтобы снова получить доступ к Grafana.

<info>

Далее используется имя сервиса `kube-prometheus-stack` и пространство имен `prometheus-monitoring`. Если при добавлении аддона были выбраны другие параметры, скорректируйте команды.

</info>

1. Получите имя пода Grafana:

   ```bash
   kubectl -n prometheus-monitoring get pod -l app.kubernetes.io/name=grafana
   ```

   **Формат имени пода из вывода команды:**

   ```text
   kube-prometheus-stack-grafana-XXXXXXXXX-XXXXX
   ```

1. Сбросьте пароль, выполнив команду внутри пода Grafana:

   ```bash
   kubectl -n prometheus-monitoring exec <имя пода Grafana> -- sh -c "grafana cli --debug admin reset-admin-password <новый пароль>"
   ```

   Если пароль успешно сброшен, в выводе команды будет сообщение `Admin password changed successfully ✔`.
