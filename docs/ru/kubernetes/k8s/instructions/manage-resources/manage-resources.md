Вы можете управлять ресурсами кластера Kubernetes в сервисе Cloud Containers через веб-интерфейс личного кабинета VK Cloud. Эта функциональность выступает альтернативой для выполнения тех же действий через `kubectl` и Kubernetes Dashboard. Примеры команд для создания, изменения и удаления ресурса через `kubectl` доступны в личном кабинете.

## {heading(Просмотр информации о ресурсах)[id=view-resources]}

{include(/ru/_includes/_open-cluster.md)}

1. Перейдите на вкладку **Ресурсы кластера**. На ней перечислены все ресурсы Kubernetes, использующиеся в кластере, созданные через личный кабинет или через `kubectl`.

{include(/ru/_includes/_cluster-resources.md)}

## {heading(Создание ресурса)[id=create-resources]}

{include(/ru/_includes/_open-cluster.md)}

1. Перейдите на вкладку **Ресурсы кластера** и нажмите кнопку **Создать ресурс**.
1. Добавьте манифест ресурса в формате YAML. Примеры доступны в [официальной документации Kubernetes](https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/). 
1. Подтвердите создание ресурса. 
   
Добавленный ресурс распознается автоматически и будет доступен в списке ресурсов в соответствующей категории. Например, если вы добавили манифест для PV, он будет доступен в категории **Хранилище** в блоке **Persistent Volumes**.

## {heading(Скачивание манифеста ресурса)[id=download-yaml]}

{include(/ru/_includes/_open-cluster.md)}

1. Перейдите на вкладку **Ресурсы кластера**.

{include(/ru/_includes/_cluster-resources.md)}

1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного ресурса и выберите пункт **Скачать yaml**. Будет скачан YAML-файл манифеста ресурса.

## {heading(Редактирование информации о ресурсе)[id=edit-resources]}

{note:warn}
Изменение информации о ресурсах может привести к проблемам в работе кластера.
{/note}

{include(/ru/_includes/_open-cluster.md)}

1. Перейдите на вкладку **Ресурсы кластера**.

{include(/ru/_includes/_cluster-resources.md)}

1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного ресурса и выберите пункт **Изменить**.
1. В открывшемся окне внесите изменения в манифест ресурса и сохраните их.

## {heading(Удаление ресурса)[id=delete-resources]}

{note:warn}
Удаление ресурса может привести к проблемам в работе кластера.
{/note}

{include(/ru/_includes/_open-cluster.md)}

1. Перейдите на вкладку **Ресурсы кластера**.

{include(/ru/_includes/_cluster-resources.md)}

1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного ресурса и выберите пункт **Удалить**.
1. Подтвердите удаление. 