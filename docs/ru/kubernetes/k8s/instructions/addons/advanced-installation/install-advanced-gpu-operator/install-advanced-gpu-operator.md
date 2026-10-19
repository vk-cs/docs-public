# {heading(GPU Operator)[id=k8s-install-advanced-gpu-operator]}

{ifndef(public)}
Аддон NVIDIA GPU Operator устанавливает в кластер Kubernetes драйверы NVIDIA, плагин устройств (device plugin) и метки узлов с GPU. Аддон используют для машинного обучения и обработки больших данных.
{/ifndef}

{ifdef(public)}
## {heading(Подготовительные шаги)[id=k8s-install-advanced-gpu-operator-prep]}

{include(/ru/_includes/_addon-prep.md)}
{/ifdef}

{ifdef(public)}
## {heading(Установка аддона)[id=k8s-install-advanced-gpu-operator-install]}

Аддон {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-gpu-operator)[text=GPU Operator]} работает на worker-узлах с GPU, поэтому для него доступна только {linkto(../../../../concepts/addons-and-settings/addons#k8s-addons-install-features)[text=установка на выделенные узлы]}. Чтобы иметь возможность добавлять в кластер worker-узлы с GPU, [подключите](https://cloud.vk.ru/cloud-gpu/) сервис Cloud GPU.
{/ifdef}
{ifndef(public)}
Аддон работает только на worker-узлах с GPU, поэтому его устанавливают на выделенную группу узлов.
{/ifndef}

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {ifdef(public)}
   {tabs}
   
   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   {/ifdef}
   {ifndef(public)}
   1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/ifndef}
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Найдите в списке нужный кластер.

   1. Убедитесь, что в кластере есть выделенная группа worker-узлов с GPU, на которых будут размещаться аддоны.

      Если такой группы нет — {linkto(../../../manage-node-group#k8s-manage-node-group-add-group)[text=добавьте ее]}.

   {ifdef(public)}
   1. (Опционально) Если на узлах с GPU должны выполняться только те процессы, которые требуют ресурсов GPU, {linkto(../../../manage-node-group#k8s-manage-node-group-labels-taints)[text=задайте]} ограничение (taint) для этой группы узлов:
   {/ifdef}
   {ifndef(public)}
   1. (Опционально) Если на узлах с GPU должны выполняться только те процессы, которые требуют ресурсов GPU, задайте ограничение (taint) для этой группы узлов:
   {/ifndef}

      - эффект `NoSchedule`;
      - ключ `nvidia.com`;
      - значение `gpu`.

   {ifdef(public)}
   {/tab}

   {/tabs}
   {/ifdef}

1. Установите аддон:

   {ifdef(public)}
   {tabs}
   
   {tab(Личный кабинет)}

   1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
   {/ifdef}
   {ifndef(public)}
   1. {linkto(../../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]} в личный кабинет {var(cloud)}.
   {/ifndef}
   1. Выберите проект, где находится нужный кластер.
   1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
   1. Нажмите на имя нужного кластера.
   1. Перейдите на вкладку **Аддоны**.
   {ifdef(public)}
   1. Нажмите кнопку **Установить** на карточке аддона `gpu-operator` и нажмите кнопку **Установить аддон**.
   1. (Опционально) Отредактируйте:

      - выбранную версию;
      - название приложения;
      - название пространства имен, куда будет установлен аддон;
      - {linkto(#k8s-install-advanced-gpu-operator-edit-code)[text=код настройки аддона]}.

        {note:warn}
        Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
        {/note}
   {/ifdef}
   {ifndef(public)}
   1. Нажмите кнопку **Установить** на карточке аддона `gpu-operator`.
   1. В поле **Версия** выберите необходимую версию аддона и нажмите **Установить аддон**.
   1. При необходимости измените название приложения и название пространства имен, куда будет установлен аддон.
   1. В поле **Код настройки аддона** укажите реестр образов инсталляции. В секции `node-feature-discovery` задайте параметры `repository` и `tag`:

      ```yaml
      node-feature-discovery:
        image:
          repository: "<АДРЕС_РЕЕСТРА_ИНСТАЛЛЯЦИИ>/nfd/node-feature-discovery"
          tag: "v0.16.6"
        enableNodeFeatureApi: true
        priorityClassName: system-node-critical
      ```

      Здесь: `<АДРЕС_РЕЕСТРА_ИНСТАЛЛЯЦИИ>` — адрес реестра образов инсталляции.

      {note:err}
      Не удаляйте поле `"mcs.mail.ru/gpu-exists"` и его значение `true`.

      Поле задает установку плагина `nfd-worker` только на узлы с GPU. Если удалить поле и значение, `nfd-worker` и сопутствующие плагины будут установлены на все узлы кластера, и потребление ресурсов вырастет.
      {/note}
   {/ifndef}

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
   {/ifdef}

1. (Опционально) [Познакомьтесь с официальной документацией NVIDIA по работе с аддоном](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html).

{ifdef(public)}
## {heading(Редактирование кода настройки аддона при установке)[id=k8s-install-advanced-gpu-operator-edit-code]}

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/NVIDIA/k8s-device-plugin?tab=readme-ov-file#nvidia-device-plugin-for-kubernetes).

{note:err}
Не удаляйте поле `"mcs.mail.ru/gpu-exists"` и его значение `true`.

Поле отвечает за установку плагина nfd-worker только на узлы с GPU. Если поле и значение удалить, nfd-worker и сопутствующие ему плагины будут установлены на все узлы кластера, что приведет к повышенному потреблению ресурсов.
{/note}

После редактирования кода {linkto(#k8s-install-advanced-gpu-operator-install)[text=продолжите установку аддона]}.
{/ifdef}