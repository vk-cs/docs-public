# {heading(Kube Prometheus Stack)[id=k8s-install-advanced-monitoring]}

{ifndef(public)}
Аддон позволяет добавить систему мониторинга для кластера Kubernetes на базе Prometheus, Alertmanager и Grafana. Prometheus — собирает метрики ресурсов кластера Kubernetes и хранит на высокоскоростном диске pvc подключенного к кластеру. Grafana — имеет предустановленные дашборды для полноценного мониторинга всего кластера. Alertmanager — обрабатывает оповещения от Prometheus.
{/ifndef}

{ifdef(public)}
## {heading(Подготовительные шаги)[id=k8s-install-advanced-monitoring-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=k8s-install-advanced-monitoring-install]}

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
   1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
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
   1. Нажмите кнопку **Установить аддон** на карточке аддона **kube-prometheus-stack**.
   {ifndef(public)}
   1. В поле **Версия** выберите необходимую версию аддона и нажмите **Установить аддон**.
   {/ifndef}
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-monitoring-edit-code)[text=код настройки аддона]}.

        {note:warn}
        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
        {/note}

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

1. При необходимости {linkto(#k8s-install-advanced-monitoring-disk-change)[text=измените размер диска Prometheus]}.
1. При необходимости {linkto(#k8s-install-advanced-monitoring-get-password)[text=получите пароль для Grafana из секрета Kubernetes]}.
1. При необходимости в браузере {linkto(../../../../connect/addons-ui#k8s-addons-ui-web-ui)[text=подключитесь к веб-интерфейсу Grafana]}, входящему в состав аддона Kube Prometheus Stack.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kube-prometheus-stack`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-monitoring-edit-code)[text=код настройки аддона]}.

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

      - `grafana.tolerations`;
      - `alertmanager.alertmanagerSpec.tolerations`;
      - `prometheusOperator.tolerations`;
      - `prometheusOperator.admissionWebhooks.patch.tolerations`;
      - `prometheus.prometheusSpec.tolerations`;
      - `kube-state-metrics.tolerations`.

      {/tab}
      
      {tab(Селекторы узлов)}
      
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

1. При необходимости {linkto(#k8s-install-advanced-monitoring-disk-change)[text=измените размер диска Prometheus]}.
1. При необходимости {linkto(#k8s-install-advanced-monitoring-get-password)[text=получите пароль для Grafana из секрета Kubernetes]}.

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется. Будет создан секрет Kubernetes, содержащий постоянный пароль для входа в веб-интерфейс Grafana.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kube-prometheus-stack`.
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

1. При необходимости {linkto(#k8s-install-advanced-monitoring-disk-change)[text=измените размер диска Prometheus]}.
1. {linkto(#k8s-install-advanced-monitoring-get-password)[text=Получите пароль для Grafana из секрета Kubernetes]}.

{/tab}

{/tabs}
{/ifdef}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-monitoring-edit-code]}

{note:info}
- Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml).
{/note}

### {heading(Установка временного пароля для веб-интерфейса Grafana)[id=k8s-install-advanced-monitoring-temp-password]}

При установке аддона с параметрами по умолчанию будет создан секрет Kubernetes, содержащий постоянный пароль для входа в веб-интерфейс Grafana.

Также при установке аддона можно указать временный пароль пользователя. В этом случае первый вход в веб-интерфейс Grafana выполняется в этим паролем, затем будет предложено его сменить. Для этого измените значение поля в коде настройки аддона:

```yaml
grafana:
  adminPassword: "<ВРЕМЕННЫЙ_ПАРОЛЬ>"
```

{ifdef(public)}
После редактирования кода {linkto(#k8s-install-advanced-monitoring-install)[text=продолжите установку аддона]}.

## {heading(Изменение размера диска Prometheus)[id=k8s-install-advanced-monitoring-disk-change]}

Эта операция доступна, если в кластере {linkto(#k8s-install-advanced-monitoring-install)[text=установлен]} аддон мониторинга `kube-prometheus-stack`.

На диске Prometheus хранятся данные мониторинга кластера. Если для них недостаточно места, или вы хотите увеличить производительность диска Prometheus, увеличьте размер диска.

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера.
1. Перейдите на вкладку **Аддоны**.
1. Нажмите ![](../../../../../../assets/more-icon.svg "inline") для аддона `kube-prometheus-stack` и выберите пункт **Изменить размер диска Prometheus**.
1. Задайте нужный размер диска. Операция работает только в сторону увеличения.
1. Нажмите кнопку **Подтвердить**.

{/tab}

{/tabs}

## {heading(Получение пароля для Grafana из секрета Kubernetes)[id=k8s-install-advanced-monitoring-get-password]}

Если аддон был установлен без указания временного пароля, значение пароля для входа в веб-интерфейс Grafana можно получить из секрета Kubernetes.

{note:info}
Далее используется имя сервиса `kube-prometheus-stack` и пространство имен `prometheus-monitoring`. Если при добавлении аддона были выбраны другие параметры, скорректируйте шаги и команды.
{/note}

{tabs}

{tab(Kubernetes Dashboard)}

1. {linkto(../../../../connect/k8s-dashboard#k8s-k8s-dashboard)[text=Подключитесь к кластеру]} с помощью Kubernetes Dashboard.
1. В выпадающем списке рядом слева от строки поиска выберите пространство имен `prometheus-monitoring`.
1. Перейдите в раздел меню **Config and Storage → Secrets**.
1. Найдите в списке секретов `kube-prometheus-stack-grafana` и нажмите на имя секрета.
1. В блоке **Data** нажмите на иконку глаза рядом с параметром `admin-password`.

   Будет отображен пароль.

{/tab}

{tab(kubectl)}

1. {linkto(../../../../connect/kubectl#k8s-kubectl-check-connection)[text=Убедитесь]}, что вы можете подключиться к кластеру с помощью `kubectl`.

1. Получите пароль для входа в Grafana из секрета Kubernetes:

   {tabs}
   
   {tab(Windows (PowerShell))}
      
   ```console
   $ENCODED = kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}'; `
   [System.Text.Encoding]::Utf8.GetString([System.Convert]::FromBase64String($ENCODED)) | Write-Output
   ```

   {/tab}
   
   {tab(Linux (bash)/macOS (zsh))}
   
   ```console
   kubectl -n prometheus-monitoring get secret kube-prometheus-stack-grafana -o jsonpath='{.data.admin-password}' | base64 --decode
   ```

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Сброс пароля для Grafana)[id=k8s-install-advanced-monitoring-reset-password]}

Если аддон был установлен без указания временного пароля, значение пароля для входа в веб-интерфейс Grafana хранится в секрете Kubernetes. Если этот секрет был утерян, вы можете сбросить пароль, чтобы снова получить доступ к Grafana.

{note:info}
Далее используется имя сервиса `kube-prometheus-stack` и пространство имен `prometheus-monitoring`. Если при добавлении аддона были выбраны другие параметры, скорректируйте команды.
{/note}

1. Получите имя пода Grafana:

   ```console
   kubectl -n prometheus-monitoring get pod -l app.kubernetes.io/name=grafana
   ```

   **Формат имени пода из вывода команды:**

   ```text
   kube-prometheus-stack-grafana-XXXXXXXXX-XXXXX
   ```

1. Сбросьте пароль, выполнив команду внутри пода Grafana:

   ```console
   kubectl -n prometheus-monitoring exec <ИМЯ_ПОДА_GRAFANA> -- sh -c "grafana cli --debug admin reset-admin-password <НОВЫЙ_ПАРОЛЬ>"
   ```

   Если пароль успешно сброшен, в выводе команды будет сообщение `Admin password changed successfully ✔`.
{/ifdef}