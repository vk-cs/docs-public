# {heading(Развертывание Grafana)[id=marketplace-grafana-start]}

Вы можете визуализировать данные мониторинга ресурсов с помощью сервиса [Grafana](https://msk.cloud.vk.com/app/services/marketplace/v2/apps/service/e9ec618a-ca38-483b-916c-0c1fce9620be/latest/info).

Инструкция поможет развернуть сервис Grafana 10 на ВМ в {var(cloud)}, зайти в консоль сервиса и создать нового пользователя.

Используя сервис Grafana, вы соглашаетесь с лицензионными соглашениями сервисов [Marketplace](../../../../start/legal/vk/marketplace) и [Grafana Labs](https://grafana.com/legal/grafana-labs-license).

Чтобы развернуть сервис Grafana в проекте:

1. {linkto(../../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Зарегистрируйтесь]} в {var(cloud)}.
1. {linkto(../../../../networks/vnet/instructions/net#vnet-net-add)[text=Создайте]} сеть, если она не была создана ранее.
1. В {linkto(../../../../networks/vnet/instructions/net#vnet-net-subnet-edit)[text=настройках подсети]}, где будет размещена ВМ с развернутым сервисом, отключите опцию **Приватный DNS**.
1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Разверните]} сервис Grafana:

   - **Как будет размещена Grafana**: укажите `external` тип доступа к Grafana, чтобы иметь доступ к сервису через внешний IP-адрес.
   - **Резервное копирование**: выберите вариант `no`, чтобы не сохранять данные в объектное хранилище {linkto(../../../../storage/s3/concepts/about#s3-concepts-about)[text=VK Object Storage]}. При варианте `yes` будут скопированы данные за последние 7 дней.
   - **Сеть**: выберите ранее созданные сеть и подсеть.

   Остальные параметры укажите на свое усмотрение.

   Дождитесь завершения установки — на почту придет одноразовая ссылка с URL и паролем. Сервис будет развернут по адресу вида `https://grafana-<ID>.xaas.msk.vkcs.cloud` (консоль Grafana).

1. Перейдите в консоль Grafana по ссылке `grafana_url` из письма.
1. Нажмите кнопку **Sign in**.
1. В появившемся окне введите логин `admin` и пароль из письма. Рекомендуется поменять пароль после входа.
1. Укажите новый пароль.
1. (Опционально) Создайте дашборд согласно инструкции из [официальной документации](https://grafana.com/docs/grafana/v10.0/getting-started/build-first-dashboard).

{note:info}
Для расширенной конфигурации сервиса используйте официальную инструкцию [Grafana](https://grafana.com/docs/grafana/v10.0).
{/note}
