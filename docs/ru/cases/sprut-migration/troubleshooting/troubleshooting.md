## Проблема с именем группы безопасности Default

Если для миграции вы используете [OpenStack Terraform Provider](https://docs.comcloud.xyz/providers/terraform-provider-openstack/openstack/latest), может возникнуть проблема с именем группы безопасности **default**. Если в проекте будет две SDN (Neutron и Sprut), то будет две группы безопасности  - резолв секгруппы default по имени невозможен (т.к. у обоих сднов должна быть дефолтная сг), для работоспособности листингов сг из спрута на листинге на лету подменяет имя на "default-sprut". Это связано с тем, что OpenStack Terraform Provider может работать только через имена Групп безопасности. Эта проблема существует, когда в проекте есть 2 сдна, в нашем vkcs провайдере решена возможностью использовать Id для секгрупп

Мы рекомендуем использовать [terraform-provider](https://github.com/vk-cs/terraform-provider-vkcs) VK Cloud

### Как проявляет себя проблема:
- изменить имя группы безопасности на default-sprut в terraform коде
    ```bash
    security_groups = ["default-sprut"]
    ```

- при запуске terraform (terraform aply) выводится сообщение об ошибке
    ```bash
    {"conflictingRequest": {"message": "Multiple security_group matches found for name 'default-sprut', use an ID to be more specific.", "code": 409}}
    ```

    хотя группа безопасности default-sprut в проекте одна.

### Возможные пути решения:

1. Указать имя default
- если указать sg "default" (компонент OpenStack Nova автоматически подставит правильное имя) ВМ создасться успешно
- при обновлении terraform state (terraform plan) от OpenStack Nova вернётся "default-sprut" и терраформ не сможет стейт свести
- стейт можно починить, указав руками в манифесте после создания обратно "default-sprut"
1. использовать наш vkcs провайдер [terraform-provider](https://github.com/vk-cs/terraform-provider-vkcs) VK Cloud
1. Провести полнкую миграцию проект SDN Sprut и отключить SDN Neutron в проекте через обращение в ТП (проблема устранится)
1. Если на период одновременно работающих двух SDN не происходит постоянного создания виртуальных машин, то достаточно указать security group = default-sprut и обновить terraform state.  Тогда терраформ будет работать без ручных действий
1. Отказаться от использование группы безопасности по-умолчанию