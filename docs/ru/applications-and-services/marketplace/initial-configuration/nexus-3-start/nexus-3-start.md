Вы можете разворачивать репозитории библиотек и артефактов, применяемые в модульной разработке, с помощью сервиса [Nexus 3](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/73f3ac8a-5c6e-4ced-a2e3-6ed6caed0fb0/latest/info/). Эта инструкция поможет развернуть сервис Nexus 3 на ВМ в VK Cloud, зайти в консоль сервиса и создать нового пользователя.

Используя сервис Nexus 3, вы соглашаетесь с лицензионными соглашениями сервисов [Marketplace](/ru/intro/start/legal/marketplace) и [Sonatype](https://sonatype.ru/prices).

Чтобы развернуть сервис Nexus в проекте:

1. [Зарегистрируйтесь](/ru/intro/start/account-registration) в VK Cloud.
1. [Создайте](/ru/networks/vnet/service-management/net#sozdanie_seti) сеть с доступом в интернет, если она не была создана ранее.
1. В [настройках подсети](/ru/networks/vnet/service-management/net#redaktirovanie_podseti), где будет размещена ВМ с развернутым сервисом, отключите опцию **Приватный DNS**.
1. [Разверните](../../service-management/pr-instance-add/) сервис Nexus 3:

   - Выберите ранее созданные сеть с доступом в интернет и подсеть. Внешний IP-адрес будет назначен автоматически.
   - Остальные параметры выберите на свое усмотрение.

   После завершения установки на почту придет одноразовая ссылка на консоль Nexus 3 (`nexus_url`) и пароль (`password`). Сервис будет развернут по адресу вида `https://nexus-<ID>.xaas.msk.vkcs.cloud`.

1. Перейдите в консоль Nexus 3.
1. Нажмите кнопку **Sign in**.
1. В открывшемся окне введите логин `admin` и полученный по почте пароль `admin_password`.
1. (Опционально) Пройдите чек-лист из [официальной документации](https://help.sonatype.com/repomanager3/installation-and-upgrades/post-install-checklist).

<info>

Для расширенной конфигурации сервиса используйте официальную инструкцию [Sonatype Nexus Repository 3](https://help.sonatype.com/repomanager3).

</info>
