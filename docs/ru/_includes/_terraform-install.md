{includetag(terraform-install-prepare)}
1. Установите Terraform c официального [зеркала](https://hashicorp-releases.mcs.mail.ru/terraform) от {var(cloud)}.
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {/includetag}
   {includetag(terraform-install-prepare)}
   {ifdef(public)}
1. [Настройте двухфакторную аутентификацию](/ru/access/iam/instructions/manage-2fa) и [активируйте доступ по API](/ru/tools-for-using-services/api/rest-api/enable-api), если это еще не сделано.
   {/ifdef}
1. Нажмите на имя пользователя в шапке страницы, из выпадающего списка выберите **Настройки проекта**.
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
1. Перейдите на вкладку **Terraform**. Скачайте основной {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-provider-config)[text=файл конфигурации Terraform]} и {linkto(../../../tools-for-using-services/terraform/reference/configuration#terraform-mirror-config)[text=файл конфигурации зеркала Terraform]}, нажав одноименные кнопки.
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
1. Перейдите на вкладку **Terraform**. Скачайте основной {linkto(../reference/configuration#terraform-provider-config)[text=файл конфигурации Terraform]} и {linkto(../reference/configuration#terraform-mirror-config)[text=файл конфигурации зеркала Terraform]}, нажав одноименные кнопки.
   {/includetag}
   {includetag(terraform-install-prepare)}
   Будут скачаны файлы с именами  `vkcs_provider.tf` и  `terraform.rc`.

1. Выполните с файлами следующие действия:

   {tabs}

   {tab(Windows)}

   1. Вставьте `%APPDATA%` в адресную строку проводника Windows и скопируйте в открывшуюся директорию `terraform.rc`.
   1. Скопируйте файл `vkcs_provider.tf` в рабочую директорию, из которой вы планируете работать с {var(cloud)}.

      Под каждый проект {var(cloud)} рекомендуется создавать отдельную рабочую директорию.

   {/tab}

   {tab(Другие ОС)}

   1. Переименуйте файл конфигурации зеркала Terraform из `terraform.rc` в `.terraformrc`.
   1. Скопируйте файл `.terraformrc` в корень домашней директории пользователя.
   1. Скопируйте файл `vkcs_provider.tf` в рабочую директорию, из которой вы планируете работать с {var(cloud)}.

      Под каждый проект {var(cloud)} рекомендуется создавать отдельную рабочую директорию.

   {/tab}

   {/tabs}
   {/includetag}
   {includetag(prerequisites-terraform-install-prepare)}
   {note:info}
   Вы можете создать оба конфигурационных файла самостоятельно. Вы также можете отредактировать скачанные файлы — например, чтобы добавить дополнительного Terraform-провайдера. Содержимое файлов описано в статье {linkto(../../../tools-for-using-services/terraform/reference/configuration#tools-terraform-config)[text=%text]}.
   {/note}
   {/includetag}
   {includetag(tools-terraform-install-prepare)}
   {note:info}
   Вы можете создать оба конфигурационных файла самостоятельно. Вы также можете отредактировать скачанные файлы — например, чтобы добавить дополнительного Terraform-провайдера. Содержимое файлов описано в статье {linkto(../reference/configuration#tools-terraform-config)[text=%text]}.
   {/note}
{/includetag}

{includetag(terraform-install-init)}
В директории, из которой вы планируете работать с проектом, выполните команду:

```console
terraform init
```

Будут созданы дополнительные файлы, необходимые для работы Terraform.
{/includetag}

{includetag(terraform-install-create)}
1. Создайте конфигурацию ресурсов в рабочей директории — например, конфигурацию для {ifdef(public)}{linkto(../how-to-guides/iaas/create#terraform-iaas-create)[text=создания виртуальной машины]}{/ifdef}{ifndef(public)}создания виртуальной машины{/ifndef}.

   {ifndef(public)}
   {note:info}
   {linkto(../../reference/configuration#terraform-resource-config)[text=Файлы конфигурации]} для создания ресурсов расположены в дистрибутиве {var(cloud)}. Обратитесь к администратору, чтобы получить их.
   {/note}
   {/ifndef}

1. Выполните команду:

   ```console
   terraform apply
   ```

   При запросе подтверждения введите `yes`.

1. Дождитесь завершения операции.

Созданные ресурсы появятся в вашем личном кабинете.
{/includetag}

{includetag(terraform-install-update)}
Если версия провайдера в файле `vkcs_provider.tf` ниже той, которая нужна для создания ресурса, при валидации конфигурации возникнет ошибка. Чтобы ее избежать, обновите провайдер до [последней версии](https://github.com/vk-cs/terraform-provider-vkcs) или версии, указанной в описании ресурса:

1. Откройте файл `vkcs_provider.tf` и измените версию на нужную, например: `version = "~> 0.8.0"`.
1. В терминале выполните команду:

   ```console
   terraform init --upgrade
   ```
{/includetag}