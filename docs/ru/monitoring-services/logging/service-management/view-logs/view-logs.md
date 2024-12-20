Чтобы просматривать логи, воспользуйтесь удобным способом:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
<tab>Grafana</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/services/monitoring/logging) в раздел **Мониторинг** → **Логирование** личного кабинета.
1. (Опционально) Выберите значения для фильтров.
1. (Опционально) Введите значение для поиска или сформулируйте запрос с использованием [языка поисковых запросов](../../concepts/search-tools/).

    Примеры поисковых выражений:

      {include(/ru/_includes/_logs_query.md)}

</tabpanel>
<tabpanel>

Воспользуйтесь [методами API](/ru/tools-for-using-services/api/api-spec/logging).

Чтобы уточнить результаты поиска, в параметре `like` укажите выражение для поиска в поле `message`. Для записи поискового выражения используйте [язык поисковых запросов](../../concepts/search-tools/).

Примеры поисковых выражений:

  {include(/ru/_includes/_logs_query.md)}

</tabpanel>
<tabpanel>

1. [Разверните](/ru/applications-and-services/marketplace/initial-configuration/grafana-start) сервис Grafana из [Магазина приложений](https://msk.cloud.vk.com/app/services/marketplace) в вашем проекте.

    При развертывании сервиса он будет автоматически интегрирован с Cloud Logging:

      - Будет установлена связь, позволяющая Grafana получать логи приложений из сервиса Cloud Logging.
      - В Grafana будут настроены источники данных (data sources), связанные с Cloud Logging.

1. Перейдите в консоль Grafana и авторизуйтесь в ней.
1. Для просмотра логов создайте дашборд и выберите в нем источник данных, связанный с Cloud Logging.

</tabpanel>
</tabs>
