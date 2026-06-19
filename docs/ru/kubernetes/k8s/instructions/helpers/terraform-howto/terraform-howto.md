# {heading(Использование Terraform)[id=k8s-terraform-howto]}

## {heading(Как начать пользоваться Terraform)[id=k8s-terraform-howto-begin]}

1. {linkto(../../../../../tools-for-using-services/terraform/quick-start#terraform-quick-start)[text=Установите Terraform и настройте окружение]}, если это еще не сделано.
1. {linkto(../../create-cluster/create-terraform#k8s-create-terraform)[text=Создайте]} новый кластер с одной или несколькими группами worker-узлов.
1. Управляйте созданными ресурсами с помощью Terraform.

Подробная информация о работе с сервисом Cloud Containers приведена в [документации Terraform-провайдера](https://github.com/vk-cs/terraform-provider-vkcs/tree/master/docs).

## {heading(Особенности использования Terraform для управления сервисом Cloud Containers)[id=k8s-terraform-howto-features]}

- Некоторые операции с кластером выполняются только в {linkto(../../../../../tools-for-using-services/account#tools-account)[text=личном кабинете]}. Для каждой операции в {linkto(../../../instructions#k8s-instructions)[text=пошаговых инструкциях]} указано, можно ли ее выполнить также с помощью Terraform.

- Изменение некоторых параметров уже существующего кластера приведет к созданию **нового кластера**. В документации сервиса Cloud Containers приводятся только те операции, которые можно выполнить над существующим кластером, не создавая при этом новый.

  Подробнее в [документации Terraform-провайдера](https://github.com/vk-cs/terraform-provider-vkcs/blob/master/docs/resources/kubernetes_cluster.md#argument-reference).

- Если изменить в личном кабинете настройки кластера, который управляется с помощью Terraform, то эти изменения не будут отражены в конфигурационном файле Terraform.

  В этом случае текущая конфигурация Terraform устареет, и ее применение с помощью `terraform apply` приведет к откату сделанных настроек или даже к неработоспособности кластера.

  Чтобы снова управлять таким кластером с помощью Terraform:

  1. Обновите локальное состояние инфраструктуры (хранится в файле с расширением `.tfstate`):

     1. Выполните команду:

        ```console
        terraform apply -refresh-only
        ```

        Вам будет предложено ознакомиться с изменениями в инфраструктуре, которыми будет перезаписано локальное состояние.

     1. Если вас устраивают эти изменения, подтвердите их.

  1. Актуализируйте файл конфигурации, чтобы он соответствовал состоянию Terraform. Эта процедура подробно описана в разделе [Create configuration](https://learn.hashicorp.com/tutorials/terraform/state-import?in=terraform/state#create-configuration) документации Terraform.