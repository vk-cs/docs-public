Вы можете визуализировать данные мониторинга ресурсов с помощью сервиса [Grafana](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info/).

Инструкция поможет развернуть сервис Grafana 10 на ВМ в VK Cloud, зайти в консоль сервиса и создать нового пользователя.

Используя сервис Grafana, вы соглашаетесь с лицензионными соглашениями сервисов [Marketplace](/ru/additionals/start/legal/marketplace) и [Grafana Labs](https://grafana.com/legal/grafana-labs-license/).

Чтобы развернуть сервис Grafana в проекте:

1. [Зарегистрируйтесь](/ru/additionals/start/account-registration) в VK Cloud.
1. [Разверните](../../instructions/pr-instance-add/) сервис Grafana:

   - **Как будет размещена Grafana**: укажите тип доступа `external` к Grafana, чтобы иметь доступ к сервису через внешний IP-адрес.
   - **Резервное копирование**: выберите вариант `no`, чтобы не сохранять данные в объектное хранилище [Cloud Storage](/ru/base/s3). При варианте `yes` будут скопированы данные за последние 7 дней.

   Остальные параметры укажите на свое усмотрение.

   Дождитесь завершения установки — на почту придет одноразовая ссылка с URL и паролем. Сервис будет развернут по адресу вида `https://grafana-<ID>.xaas.msk.vkcs.cloud` (консоль Grafana).

1. Перейдите в консоль Grafana по ссылке `grafana_url` из письма.
1. Нажмите кнопку **Sign in**.
1. В появившемся окне введите логин `admin` и пароль `admin`.
1. Укажите новый пароль.
1. (Опционально) Создайте дашборд согласно инструкции из [официальной документации](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard/).

<info>

Для расширенной конфигурации сервиса используйте официальную инструкцию [Grafana](https://grafana.com/docs/grafana/v10.0/).

</info>
