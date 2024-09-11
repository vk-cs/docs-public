Визуализировать данные мониторинга ресурсов, собранные сервисом Cloud Monitoring, можно двумя способами:

- в разделе **Мониторинг → Дашборды** личного кабинета, как описано в статье [Установка мониторинга в новую ВМ](../mon-setup-new);
- с помощью сервиса Grafana.

Чтобы использовать сервис Grafana, [разверните](/ru/applications-and-services/marketplace/initial-configuration/grafana-start) его из [Магазина приложений](https://msk.cloud.vk.com/app/services/marketplace) в вашем проекте.

При развертывании сервиса он будет автоматически интегрирован с Cloud Monitoring:

- Будет установлена связь, позволяющая Grafana получать данные мониторинга из сервиса Cloud Monitoring.
- В Grafana будут настроены следующие источники данных (data sources), связанные с Cloud Monitoring:

  - `[VK Cloud] Базы данных`;
  - `[VK Cloud] Виртуальные машины` (источник данных по умолчанию);
  - `[VK Cloud] Контейнеры (K8S)`;
  - `[VK Cloud] Приложения из Marketplace`;
  - `[VK Cloud] Резервное копирование`;
  - `[VK Cloud] Сервис JupiterHub`;
  - `[VK Cloud] Сервис MLFlow`;
  - `[VK Cloud] Сервис MLflow Deploy`;
  - `[VK Cloud] Сервис Spark в k8s`.
  
<info>

Получить можно только данные мониторинга того проекта, в котором развернут сервис Grafana.

</info>
