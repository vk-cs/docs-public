Вы можете визуализировать данные из различных источников (базы данных, Google Sheets), а также строить интерактивные отчеты с помощью сервиса [Redash](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/7ee4cc28-6b2b-4595-b119-89c718af9e8b/latest/info/). Эта инструкция поможет развернуть сервис Redash 10.1.0 на ВМ в VK Cloud, зайти в консоль сервиса и создать нового пользователя.

Используя Redash 10.1.0, вы соглашаетесь с лицензионными соглашениями [Marketplace](/ru/additionals/start/legal/marketplace) и [Redash](https://redash.io/terms).

Чтобы развернуть сервис Redash в проекте:

1. [Зарегистрируйтесь](/ru/additionals/start/account-registration) в VK Cloud.
1. [Создайте](/ru/networks/vnet/operations/manage-net#sozdanie_seti) сеть с доступом в интернет, если она не была создана ранее.
1. В [настройках подсети](/ru/networks/vnet/operations/manage-net#redaktirovanie_podseti), где будет размещена ВМ с развернутым сервисом, отключите опцию **Приватный DNS**.
1. [Разверните](../../service-management/pr-instance-add/) сервис в проекте:

   - Выберите ранее созданные сеть с доступом в интернет и подсеть. Внешний IP-адрес будет назначен автоматически.
   - Остальные параметры выберите на свое усмотрение.

   После завершения установки на почту придет одноразовая ссылка с доступами.

1. Перейдите по ссылке из письма.
1. Сохраните данные для доступа к Redash, в том числе `redash_url` — имеет формат `https://redash-<ID>.xaas.msk.vkcs.cloud`.

   <info>

   Если вы не сохранили данные для доступа, [сгенерируйте](../../service-management/pr-instance-manage#obnovlenie_dostupa_k_instansu_servisa) новые.

   </info>

1. Перейдите в консоль Redash по ссылке из `redash_url`.
1. В открывшемся окне задайте регистрационные данные администратора и нажмите кнопку **Setup**.
1. (Опционально) Пройдите [руководство по началу работы](https://redash.io/help/user-guide/getting-started). При необходимости изучите [официальную документацию Redash](https://redash.io/help/).
