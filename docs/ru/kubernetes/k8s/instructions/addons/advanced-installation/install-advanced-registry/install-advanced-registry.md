## Подготовительные шаги

1. [Создайте](/ru/storage/s3/instructions/buckets/create-bucket) в Cloud Storage бакет, который будет использоваться для хранения Docker-образов.

   При создании выберите:

   - **Класс хранения:** `Hotbox`.
   - **Настройка ACL по умолчанию:** `private`.

   Запишите имя бакета.

1. Добавьте ключ для доступа к этому бакету:

   <tabs>
   <tablist>
   <tab>Личный кабинет</tab>
   </tablist>
   <tabpanel>

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите проект.
   1. Перейдите в раздел **Объектное хранилище → Бакеты**.
   1. Нажмите на имя созданного бакета.
   1. Перейдите на вкладку **Ключи**.
   1. Нажмите кнопку **Добавить ключ**.
   1. Задайте любое имя ключа.
   1. Прочие настройки оставьте без изменений.
   1. Нажмите кнопку **Создать**.

   </tabpanel>
   </tabs>

   Запишите значения **Access Key ID** и **Secret Key**.

1. Создайте зашифрованную пару логин\пароль для авторизации в реестре Docker, выполнив команду:

   ```console
   docker run --entrypoint htpasswd registry:2.7.0 -Bbn <логин> <пароль>
   ```

   Запишите вывод команды (в формате `<логин>:<зашифрованный пароль>`).

1. [Добавьте](/ru/networks/vnet/instructions/ip/floating-ip#add) Floating IP-адрес или [найдите](/ru/networks/vnet/instructions/ip/floating-ip#view) существующий непривязанный Floating IP-адрес.

   Запишите этот IP-адрес. Он будет использоваться для доступа к реестру Docker.

## Установка аддона

{note:warn}

При установке аддона для него будет создан [стандартный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

{/note}

Для аддона доступно [несколько вариантов установки](../../../../concepts/addons-and-settings/addons#osobennosti_ustanovki_addonov):

- стандартная установка;
- установка на выделенные worker-узлы.

Примите во внимание суммарные [максимальные системные требования](../../../../concepts/addons-and-settings/addons) аддонов, которые будут размещены на группах worker-узлов. При необходимости [выполните ручное масштабирование](../../../scale#scale_worker_nodes) групп worker-узлов или [настройте автоматическое масштабирование](../../../scale#autoscale_worker_nodes) перед установкой.

<tabs>
<tablist>
<tab>Стандартная установка</tab>
<tab>Установка на выделенные worker-узлы</tab>
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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `docker-registry`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон.

   1. Отредактируйте [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

      {note:warn}

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      {/note}

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

   </tabpanel>
   </tabs>

1. [Получите данные для доступа к реестру](#podklyuchenie_k_reestru).

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

   1. [Задайте](../../../manage-node-group#labels_taints) для этой группы узлов, если это еще не сделано:

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
   1. Нажмите кнопку **Установить аддон** на карточке аддона `docker-registry`.
   1. При необходимости отредактируйте:

      - название приложения;
      - название пространства имен, куда будет установлен аддон;

   1. Отредактируйте [код настройки аддона](#redaktirovanie_koda_nastroyki_addona_pri_ustanovke).

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

      {note:warn}

      Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.

      {/note}

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

   </tabpanel>
   </tabs>

1. [Получите данные для доступа к реестру](#podklyuchenie_k_reestru).

</tabpanel>
</tabs>

## Редактирование кода настройки аддона при установке

{note:info}

- При редактировании кода настройки аддона воспользуйтесь сведениями, [полученными ранее](#podgotovitelnye_shagi).
- Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/twuni/docker-registry.helm/blob/main/values.yaml).

{/note}

Задайте:

1. Реквизиты для авторизации в реестре Docker:

   ```yaml
   secrets:
     htpasswd: "<логин>:<зашифрованный пароль>"
   ```

1. Реквизиты для доступа к бакету для хранения Docker-образов:

   ```yaml
   secrets:
     s3:
       secretRef: ""
       accessKey: "<значение Access Key ID>"
       secretKey: "<значение Secret Key>"
   ```

   ```yaml
   s3:
     bucket: <имя созданного бакета>
   ```

1. IP-адрес для балансировщика, через который будет предоставляться доступ к сервису:

   ```yaml
   service:
     name: registry
     type: LoadBalancer
     loadBalancerIP: <выбранный Floating IP-адрес>
   ```

После редактирования кода [продолжите установку аддона](#ustanovka_addona).

## Подключение к реестру

1. Запишите данные, которые использовались в коде настройки аддона при его установке:

   - Логин.
   - Пароль.
   - IP-адрес реестра. URL реестра Docker будет иметь следующий вид: `<IP-адрес>:5000`.

1. [Подключитесь](../../../../connect/docker-registry) к реестру Docker.
