# {heading(Управление кластером)[id=k8s-manage-cluster]}

{ifdef(public)}
{note:warn}
Перед выполнением любой операции с кластером из Terraform ознакомьтесь с информацией в разделе {linkto(../helpers/terraform-howto#k8s-terraform-howto-features)[text=Использование Terraform]}.
{/note}
{/ifdef}

## {heading(Запустить или остановить кластер)[id=k8s-manage-cluster-start-stop]}

### {heading(Запустить кластер)[id=k8s-manage-cluster-start]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

Это групповая операция: при необходимости можно запустить сразу несколько остановленных кластеров, выбрав их с помощью флажков.

Для запуска кластера:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Выберите с помощью флажка нужный кластер.
1. Нажмите кнопку **Запустить**.
1. Подтвердите выполнение операции.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

### {heading(Остановить кластер)[id=k8s-manage-cluster-stop]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

Это групповая операция: при необходимости можно остановить сразу несколько активных кластеров, выбрав их с помощью флажков.

Для остановки кластера:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Выберите с помощью флажка нужный кластер.
1. Нажмите кнопку **Остановить**.
1. Подтвердите выполнение операции.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}

## {heading(Получить информацию о кластере)[id=k8s-manage-cluster-get-info]}

Для запущенного и остановленного кластеров доступна разная информация.
{ifdef(public)}
Terraform позволяет получить только часть информации о кластере.

{tabs}

{tab(Личный кабинет)}
{/ifdef}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Нажмите на имя нужного кластера. Откроется страница с информацией.

{ifdef(public)}
{/tab}

{tab(Terraform)}

{note:info}
Управление через Terraform доступно только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
{/note}

1. Выполните команду:

   ```console
   terraform state show vkcs_kubernetes_cluster.<имя ресурса кластера в файле конфигурации Terraform>
   ```

1. Посмотрите доступную информацию в выводе команды.

{/tab}

{/tabs}
{/ifdef}

## {heading(Получить реквизиты для подключения к кластеру)[id=k8s-manage-cluster-get-requisites]}

Доступные реквизиты:

- файл конфигурации `kubectl`;
- секрет для Kubernetes Dashboard (его можно получить только когда кластер запущен).

Операции по получению этих реквизитов подробно описаны в разделе {linkto(../../connect#k8s-connect)[text=Подключение к кластеру]}.

## {heading(Изменить тип виртуальной машины для master-узлов)[id=k8s-manage-cluster-change-master-type]}

Эта операция подробно описана в разделе {linkto(../scale#k8s-instructions-scale)[text=Масштабирование узлов кластера]}. Ее можно выполнить, только когда кластер запущен.

{ifdef(public)}
{note:info}
Эта операция доступна только для кластеров {linkto(../../concepts/cluster-generations#k8s-cluster-generations)[text=первого поколения]}.
{/note}
{/ifdef}

## {heading(Удалить кластер)[id=k8s-manage-cluster-delete]}

{ifdef(public)}
{tabs}

{tab(Личный кабинет)}
{/ifdef}

Это групповая операция: при необходимости можно удалить сразу несколько кластеров, выбрав их с помощью флажков.

Для удаления кластера:

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Выберите проект, где находится нужный кластер.
1. Перейдите в раздел **Кластеры Kubernetes** → **Кластеры Kubernetes**.
1. Выполните одно из действий для нужного кластера:
   - Выберите с помощью флажка кластер, затем нажмите кнопку **Удалить**.
   - Нажмите ![](../../../../assets/more-icon.svg "inline") для кластера и выберите пункт **Удалить кластер**.
1. В появившемся окне:
   1. Выберите соответствующую опцию, если необходимо удалить кластер вместе с его дисками.
   1. Нажмите кнопку **Удалить кластер**.

{ifdef(public)}
{/tab}

{/tabs}
{/ifdef}