# {heading(HAMi)[id=mk8s-install-advanced-hami]}

{note:warn}
Для работы аддона требуется Kubernetes {linkto(../../../../concepts/versions/version-support#mk8s-version-support)[text=версии 1.33]} или новее.
{/note}

## {heading(Подготовительные шаги)[id=mk8s-install-advanced-hami-prep]}

{include(/ru/_includes/_addon-prep.md)}

## {heading(Установка аддона)[id=mk8s-install-advanced-hami-install]}

Аддон {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-hami)[text=HAMi]} работает на {linkto(../../../../concepts/flavors#mk8s-flavors-gpu)[text=worker-узлах с GPU]} , поэтому для него доступна только {linkto(../../../../concepts/addons-and-settings/addons#mk8s-addons-install-features)[text=установка на выделенные узлы]}. Чтобы добавить worker-узлы с GPU в кластер, сначала подключите сервис {linkto(../../../../../../computing/gpu/concepts/about#gpu-about)[text=Cloud GPU]}.

1. Подготовьте выделенную группу worker-узлов для установки аддона, если это еще не сделано:

   {tabs}
   {tab(Личный кабинет)}

    1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
    1. Найдите в списке нужный кластер.

    1. Убедитесь, что в кластере есть выделенная группа worker-узлов с GPU, на которых будут размещаться аддоны.

       Если такой группы нет — {linkto(../../../manage-node-group#mk8s-manage-node-group-add-group)[text=добавьте ее]}.

    1. (Опционально) Если на узлах с GPU должны выполняться только те процессы, которые требуют ресурсов GPU, {linkto(../../../manage-node-group#mk8s-manage-node-group-labels-taints)[text=задайте]} ограничение (taint) для этой группы узлов, указав:

        - эффект `NoSchedule`;
        - ключ `nvidia.com/gpu`;
        - значение `gpu`.

   {/tab}
   {/tabs}

1. Установите аддон:

   {tabs}
   {tab(Личный кабинет)}

    1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет {var(cloud)}.
    1. Выберите проект, где находится нужный кластер.
    1. Перейдите в раздел **Кластеры Kubernetes → Кластеры Kubernetes**.
    1. Нажмите на имя нужного кластера.
    1. Перейдите на вкладку **Аддоны**.
    1. Нажмите кнопку **Установить** на карточке аддона `hami` и нажмите кнопку **Установить аддон**.
    1. (Опционально) Отредактируйте:

        - выбранную версию;
        - название приложения;
        - название пространства имен, куда будет установлен аддон;
        - {linkto(#mk8s-install-advanced-hami-edit-code)[text=код настройки аддона]}.
       
          {note:warn}
          Некорректно заданный код настройки может привести к ошибкам при установке или неработоспособности аддона.
          {/note}

    1. Нажмите кнопку **Установить аддон**.

       Начнется установка аддона в кластер. Этот процесс может занять длительное время.

   {/tab}
   {/tabs}

1. (Опционально) [Познакомьтесь с официальной документацией по работе с HAMi](https://project-hami.io/docs/).

## {heading(Редактирование кода настройки аддона при установке)[id=mk8s-install-advanced-hami-edit-code]}

Полный код настройки аддона вместе с описанием полей доступен на [GitHub](https://github.com/Project-HAMi/HAMi/blob/master/charts/hami/values.yaml). 

{note:err}
Не удаляйте поле `"mcs.mail.ru/gpu-exists"` и его значение `true`.
{/note}

После редактирования кода продолжите установку аддона.
