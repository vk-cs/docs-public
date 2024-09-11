You can visualize resource monitoring data collected by Cloud Monitoring:

- in the **Monitoring → Dashboards** section of your VK Cloud management console, as described in the article [Installing monitoring in a new VM](../mon-setup-new);
- using the Grafana service.

To use the Grafana service, [deploy](/en/applications-and-services/marketplace/initial-configuration/grafana-start) it from the [App store](https://msk.cloud.vk.com/app/en/services/marketplace) to your project.

When deploying the service, it will be automatically integrated with Cloud Monitoring:

- A connection will be established that allows Grafana to receive monitoring data from the Cloud Monitoring service.
- The following data sources related to Cloud Monitoring will be configured in Grafana:

  - `[VK Cloud] Базы данных`;
  - `[VK Cloud] Виртуальные машины` (default data source);
  - `[VK Cloud] Контейнеры (K8S)`;
  - `[VK Cloud] Приложения из Marketplace`;
  - `[VK Cloud] Резервное копирование`;
  - `[VK Cloud] Сервис JupiterHub`;
  - `[VK Cloud] Сервис MLFlow`;
  - `[VK Cloud] Сервис MLflow Deploy`;
  - `[VK Cloud] Сервис Spark в k8s`.
  
<info>

Monitoring data can only be obtained from the project in which the Grafana service is deployed.

</info>
