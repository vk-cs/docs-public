# {heading(Docker Registry)[id=k8s-install-advanced-registry]}

## {heading(Подготовительные шаги)[id=k8s-install-advanced-registry-prepare]}

{include(/ru/_includes/_addon-prep.md)}

1. [Создайте](../../../../../../storage/s3/instructions/buckets/create-bucket) в VK Object Storage бакет, который будет использоваться для хранения Docker-образов.

   При создании выберите:

   - **Класс хранения:** `Hotbox`.
   - **Настройка ACL по умолчанию:** `private`.

   Запишите имя бакета.

1. Добавьте ключ для доступа к этому бакету:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект.
   1. Перейдите в раздел **Объектное хранилище → Бакеты**.
   1. Нажмите на имя созданного бакета.
   1. Перейдите на вкладку **Ключи**.
   1. Нажмите кнопку **Добавить ключ**.
   1. Задайте любое имя ключа.
   1. Прочие настройки оставьте без изменений.
   1. Нажмите кнопку **Создать**.

   {/tab}

   {/tabs}

   Запишите значения **Access Key ID** и **Secret Key**.

1. Создайте зашифрованную пару логин\пароль для авторизации в реестре Docker, выполнив команду:

   ```console
   docker run --entrypoint htpasswd registry:2.7.0 -Bbn <ЛОГИН> <ПАРОЛЬ>
   ```

   Запишите вывод команды (в формате `<ЛОГИН>:<ЗАШИФРОВАННЫЙ_ПАРОЛЬ>`).

1. {linkto(../../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-add)[text=Добавьте]} Floating IP-адрес или {linkto(../../../../../../networks/vnet/instructions/ip/floating-ip#vnet-floating-ip-view)[text=найдите]} существующий непривязанный Floating IP-адрес.

   Запишите этот IP-адрес. Он будет использоваться для доступа к реестру Docker.

## {heading(Установка аддона)[id=k8s-install-advanced-registry-install]}

{note:warn}
При установке аддона для него будет создан {linkto(../../../../../../networks/balancing/concepts/load-balancer#balancing-load-balancer-types)[text=стандартный балансировщик нагрузки]}. Использование балансировщика {linkto(../../../../../../networks/vnet/tariffication#vnet-tariffication)[text=тарифицируется]}.
{/note}

Для аддона доступно {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=несколько вариантов установки]}:

- стандартная установка;
- установка на выделенные worker-узлы.

{tabs}

{tab(Стандартная установка)}

1. Установите аддон:

   {tabs}
   
   {tab(Личный кабинет)}
      
   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет {var(cloud)}.
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Контейнеры → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   1. Если в кластере уже есть установленные аддоны, нажмите кнопку **Добавить аддон**.
   1. Нажмите кнопку **Установить аддон** на карточке аддона `docker-registry`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте {linkto(#k8s-install-advanced-registry-edit-code)[text=код настройки аддона]}.

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

1. {linkto(#k8s-install-advanced-registry-connect)[text=Получите данные для доступа к реестру]}.

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `docker-registry`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Отредактируйте {linkto(#k8s-install-advanced-registry-edit-code)[text=код настройки аддона]}.

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

1. {linkto(#k8s-install-advanced-registry-connect)[text=Получите данные для доступа к реестру]}.

{/tab}

{/tabs}

## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-registry-edit-code]}

{note:info}
- При редактировании кода настройки аддона воспользуйтесь сведениями, {linkto(#k8s-install-advanced-registry-prepare)[text=полученными ранее]}.
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml).
{/note}

Задайте:

1. Реквизиты для авторизации в реестре Docker:

   ```yaml
   secrets:
     htpasswd: "<ЛОГИН>:<ЗАШИФРОВАННЫЙ_ПАРОЛЬ>"
   ```

1. Реквизиты для доступа к бакету для хранения Docker-образов:

   ```yaml
   secrets:
     s3:
       secretRef: ""
       accessKey: "<ACCESS_KEY_ID>"
       secretKey: "<SECRET_KEY>"
   ```

   ```yaml
   s3:
     bucket: <ИМЯ_БАКЕТА>
   ```

1. IP-адрес для балансировщика, через который будет предоставляться доступ к сервису:

   ```yaml
   service:
     name: registry
     type: LoadBalancer
     loadBalancerIP: <FLOATING_IP-АДРЕС>
   ```

После редактирования кода {linkto(k8s-install-advanced-registry-install)[text=продолжите установку аддона]}.

## {heading(Подключение к реестру)[id=k8s-install-advanced-registry-connect]}

1. Запишите данные, которые использовались в коде настройки аддона при его установке:

   - Логин.
   - Пароль.
   - IP-адрес реестра. URL реестра Docker будет иметь следующий вид: `<IP-АДРЕС>:5000`.

1. {linkto(../../../../connect/docker-registry#k8s-docker-registry)[text=Подключитесь]} к реестру Docker.