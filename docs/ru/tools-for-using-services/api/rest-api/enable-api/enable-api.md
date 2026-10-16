# {heading(Управление доступом по API)[id=rest-api-enable]}

Активация доступа по API необходима для работы c {var(cloud)} при помощи публичного API и дополнительных инструментов, таких как OpenStack CLI, Terraform, kubectl и другие.

## {heading(Активация доступа по API)[id=rest-api-enable-activate]}

1. {linkto(../../../../access/iam/instructions/service-account-manage#service-account-create)[text=Создайте]} сервисную учетную запись, если это еще не сделано.
1. Получите доступ к API, если это еще не сделано:

   1. {linkto(../../../../access/iam/instructions/service-account-manage#service-account-download-rc-file)[text=Скачайте OpenStack RC-файл]}.
   1. {linkto(../../../../access/iam/instructions/service-account-manage#service-account-authorize)[text=Авторизуйтесь в OpenStack CLI с помощью СУЗ]}.

1. Нажмите на имя пользователя в шапке страницы и включите доступ по API одним из способов:

      {tabs}

      {tab(Настройки проекта)}

      1. Из выпадающего списка выберите **Настройки проекта**.
      1. На вкладке **Доступ по API** нажмите **Активировать доступ по API**.

      {/tab}

      {tab(Настройки аккаунта)}

      1. Из выпадающего списка выберите **Настройки аккаунта**.
      1. Перейдите в раздел **Безопасность** аккаунта {var(cloud)}.
      1. В блоке **Дополнительные доступы** включите опцию **Доступ по API**.

      {/tab}

      {/tabs}

## {heading(Деактивация доступа по API)[id=rest-api-enable-deactivate]}

1. [Перейдите](https://msk.cloud.vk.ru/app/) в личный кабинет VK Cloud.
1. Нажмите на имя пользователя в шапке страницы и выберите **Настройки аккаунта**.
1. В разделе **Безопасность** отключите опцию **Доступ по API**.
