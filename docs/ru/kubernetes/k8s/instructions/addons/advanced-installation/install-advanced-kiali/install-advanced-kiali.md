# {heading(Kiali)[id=k8s-install-advanced-kiali]}

{ifndef(public)}
Kiali — консоль аддона Istio. Позволяет строить топологию сетевого взаимодействия в приложении, проводить трейсинг запросов, исследовать проблемы в приложении.
{/ifndef}

{ifdef(public)}

{note:info}
Этот аддон доступен только для кластеров {linkto(../../../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
{/note}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-kiali-prepare]}

{include(/ru/_includes/_addon-prep.md)}
1. {linkto(../install-advanced-istio#k8s-install-advanced-istio)[text=Установите аддон]} `istio`.
{/ifdef}

## {heading(Установка аддона)[id=k8s-install-advanced-kiali-install]}

{ifdef(public)}
Для аддона доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона **kiali**.
   {ifndef(public)}
   1. В поле **Версия** выберите необходимую версию аддона и нажмите **Установить аддон**.
   {/ifndef}
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      {ifdef(public)}
      - {linkto(#k8s-install-advanced-kiali-edit-code)[text=код настройки аддона]}.

        {note:warn}
        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
        {/note}
      {/ifdef}
      {ifndef(public)}
      - код настройки аддона.
        
        {note:info}
        Введите имя и пароль пользователя Grafana для аддона **kube-prometheus-stack** в поля `username` и `password`.
        {/note}
      {/ifndef}

   1. Нажмите кнопку **Установить аддон**.

      Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {ifndef(public)}
   1. На хосте в отдельной сессии терминала подключитесь к веб-интерфейсу Kiali, выполнив команду:

      ```console
      kubectl-auth_proxy -n <ПРОСТРАНСТВО_ИМЕН> https://kiali.svc
      ```
      Здесь `<ПРОСТРАНСТВО_ИМЕН>` — имя пространства имен.

      Подробнее о работе с аддоном — в официальной документации [Kiali](https://kiali.io/docs/features/).
   {/ifndef}

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

1. {linkto(../../../../connect/addons-ui#k8s-addons-ui)[text=Подключитесь к Kiali]}.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kiali`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-kiali-edit-code)[text=код настройки аддона]}.

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

      Задайте это исключение для поля `tolerations`.

      {/tab}
      
      {tab(Селекторы узлов)}
      
      ```yaml
      nodeSelector:
        addonNodes: dedicated
      ```

      Задайте этот селектор для поля `nodeSelector`.

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

1. {linkto(../../../../connect/addons-ui#k8s-addons-ui)[text=Подключитесь к Kiali]}.

{/tab}

{tab(Быстрая установка)}

{note:info}
При быстрой установке код настройки аддона не редактируется. Интеграция с Grafana будет недоступна.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `kiali`.
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

1. {linkto(../../../../connect/addons-ui#k8s-addons-ui)[text=Подключитесь к Kiali]}.

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-kiali-edit-code]}

{note:info}
Редактирование кода аддона применимо для стандартной установки и установки на выделенные worker-узлы.
{/note}

### {heading(Установка пароля для интеграции с Grafana)[id=k8s-install-advanced-kiali-set-password]}

При установке аддона с параметрами по умолчанию будет недоступна интеграция с Grafana.

Чтобы получить возможность интеграции, задайте пароль пользователя `admin` Grafana при установке аддона. Для этого измените значение поля в коде настройки аддона:

```yaml
external_services:
  grafana:
    auth:
      password: "<ПАРОЛЬ_АДМИНИСТРАТОРА_GRAFANA>"
```

После редактирования кода {linkto(#k8s-install-advanced-kiali-install)[text=продолжите установку аддона]}.
{/ifdef}