# {heading(Файлы конфигурации)[id=tools-terraform-config]}

При создании ресурсов Terraform работает с файлами конфигурации. Они имеют расширение `.tf`.

Рекомендуется создавать отдельную рабочую директорию для каждого проекта {var(cloud)}. В рабочей директории размещаются следующие файлы:

- файл конфигурации провайдера (специфичный для проекта);
- файлы конфигурации ресурсов, которые вы планируете создать.

  {ifndef(public)}
  {note:info}
  Манифесты для создания ресурсов расположены в дистрибутиве {var(cloud)}. Обратитесь к администратору, чтобы получить их.
  {/note}
  {/ifndef}

Для корректной работы Terraform требуется дополнительный файл — файл конфигурации зеркала Terraform.

## {heading(Файл конфигурации провайдера Terraform)[id=terraform-provider-config]}

Файл содержит информацию о Terraform-провайдерах и данные для аутентификации пользователя в проекте.

Имя файла может быть любым. Рекомендуется использовать имя `provider.tf`, чтобы подчеркнуть, что в файле содержатся основные настройки подключения к {var(cloud)}.

Файл должен быть размещен во всех рабочих директориях Terraform.

Файл доступен для {ifdef(public)}{linkto(../../quick-start#terraform-quick-start-prepare)[text=скачивания]}{/ifdef}{ifndef(public)}{linkto(../../install#terraform-install-prepare)[text=скачивания]}{/ifndef} в личном кабинете, на странице {ifdef(public)}[Настройки проекта](https://msk.cloud.vk.com/app/project/terraform){/ifdef}{ifndef(public)}**Настройки проекта**{/ifndef} на вкладке **Terraform**. Скачанный файл имеет имя `vkcs_provider.tf` и содержит данные одного провайдера (`vkcs`). После скачивания отредактируйте файл — укажите в параметре `password` пароль от вашей учетной записи.

Пример содержимого файла:

```console
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
        }
    }
}

provider "vkcs" {
    # Your user account.
    username = "<user_email>"

    # The password of the account
    password = "<user_password>"

    # The tenant token can be taken from the project Settings tab - > API keys.
    # Project ID will be our token.
    project_id = "<project_ID>"

    # Region name
    region = "<Region>"

    auth_url = "<auth_url>"
}
```

Файл состоит из секций:

- `terraform.required_providers {}` — список используемых провайдеров. Для работы с {var(cloud)} должен быть указан провайдер `vkcs`, его источник и версии. Если вы собираетесь использовать дополнительные провайдеры, добавьте их в эту секцию.
- `provider "vkcs" {}` — настройки аутентификации в проекте:

  - `password`: укажите пароль от вашей учетной записи;
  - `username`, `project_id`, `region`: значения, указанные в скачанном через личный кабинет файле, валидны для работы с текущим проектом. Эти значения также указаны на странице {ifdef(public)}[Настройки проекта](https://msk.cloud.vk.com/app/project/terraform){/ifdef}{ifndef(public)}**Настройки проекта**{/ifndef} на вкладке **Terraform**.

{ifdef(public)}
Значения некоторых параметров зависят от {linkto(../../../account/concepts/regions#tools-account-concepts-regions)[text=региона]}:

- `region`:

  - для региона Москва: `RegionOne`;
  - для региона Казахстан: `kz`;

- `auth_url`:

  - для региона Москва: `https://infra.mail.ru:5000/v3/`;
  - для региона Казахстан: `https://kz.infra.mail.ru:5000/v3/`.
{/ifdef}

## {heading(Файлы конфигурации ресурсов)[id=terraform-resource-config]}

Файлы конфигурации ресурсов описывают ресурсы, которые создаются при помощи Terraform, их настройки и зависимости.

Файлы конфигурации могут иметь любые имена. В примерах в этой документации используются такие принципы именования:

- `variables.tf` — переменные, которые используются в конфигурации. Вынесение часто изменяемых параметров в переменные позволяет легко менять конфигурацию инфраструктуры для нового проекта.
- `main.tf` — содержит конфигурацию основного ресурса, который создается в том или ином {ifdef(public)}{linkto(../../how-to-guides#terraform-how-to)[text=сценарии]}{/ifdef}{ifndef(public)}сценарии{/ifndef}. Например, при {ifdef(public)}{linkto(../../how-to-guides/iaas/create#terraform-iaas-create)[text=создании виртуальной машины]}{/ifdef}{ifndef(public)}создании виртуальной машины{/ifndef} в файле `main.tf` рекомендуется размещать конфигурацию виртуальной машины.

Иногда файлы могут именоваться по типам ресурсов, например{ifdef(private-cert)} `network.tf` — описание облачной сети.{/ifdef}{ifndef(private-cert)}:

- `network.tf` — описание облачной сети.
- `kubernetes.tf` — описание ресурсов Kubernetes.
{/ifndef}

Обычно в конфигурации ресурсов используются:

- `resource "resource_type" "resource_name" {}` — создаваемый [ресурс](https://www.terraform.io/language/resources/syntax), например, сеть, подсеть{ifndef(private-cert)}, кластер Kubernetes или кластер базы данных{/ifndef}.
- `data "data_type" "data_name" {}` — позволяет использовать [данные](https://www.terraform.io/language/data-sources), указанные вне конфигурации Terraform, которые существуют в облаке или локально. Например, конфигурацию ВМ{ifndef(private-cert)}, шаблон/версию кластера и т.д{/ifndef}.
- `variable "parameter" {}` — [входные переменные](https://www.terraform.io/language/values/variables). Используются для объявления переменных, которые применяются в конфигурации (`variables.tf`).
- `output "parameter" {}` — [выходные переменные](https://www.terraform.io/language/values/outputs). Выводят данные в командную строку.

Для определения последовательности создания ресурсов и их зависимостей можно использовать мета-аргумент `depends_on`. Мета-аргумент указывает ресурс, от которого зависит создаваемый ресурс:

```console
depends_on = [
    vkcs_kubernetes_cluster.k8s-cluster,
]
```
Сначала будет создан ресурс, указанный при помощи мета-аргумента, затем — ресурс, для которого указана зависимость.

## {heading(Файл конфигурации зеркала Terraform)[id=terraform-mirror-config]}

Этот файл необходим для запуска Terraform, он содержит адрес зеркала Terraform от {var(cloud)}. Файл должен иметь имя `terraform.rc` для Windows и `.terraformrc` для других ОС. Содержимое файла одинаково для всех проектов и регионов.

Файл доступен для {ifdef(public)}{linkto(../../quick-start#terraform-quick-start-prepare)[text=скачивания]}{/ifdef}{ifndef(public)}{linkto(../../install#terraform-install-prepare)[text=скачивания]}{/ifndef} на странице {ifdef(public)}[Настройки проекта](https://msk.cloud.vk.com/app/project/terraform){/ifdef}{ifndef(public)}**Настройки проекта**{/ifndef} личного кабинета на вкладке **Terraform**. После скачивания вносить в файл какие-либо изменения не нужно.

Файл должен быть размещен:

- Для Windows — в директории **Application Data** текущего пользователя.
- Для других ОС — в домашней директории пользователя.

{ifdef(public)}
Содержимое файла для проектов {var(cloud)}:

```yaml
provider_installation {
    network_mirror {
        url = "https://terraform-mirror.mcs.mail.ru"
        include = ["registry.terraform.io/*/*"]
    }
    direct {
        exclude = ["registry.terraform.io/*/*"]
    }
}
```
{/ifdef}