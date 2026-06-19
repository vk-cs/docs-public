# {heading(Просмотр логов)[id=logging-view-logs]}

Чтобы просматривать логи, воспользуйтесь удобным способом:

{tabs}

{tab(Личный кабинет)}

1. {ifdef(public)}[Перейдите](https://msk.cloud.vk.com/app/){/ifdef}{ifndef(public)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Перейдите]}{/ifndef} в личный кабинет {var(cloud)}.
1. Перейдите в раздел **Мониторинг** → **Логирование**.
1. (Опционально) Выберите значения для фильтров.
1. (Опционально) Введите значение для поиска или сформулируйте запрос с использованием {linkto(../../concepts/search-tools#logging-search-tools)[text=языка поисковых запросов]}.

   Примеры поисковых выражений:

   {include(../../../../_includes/_logs_query.md)}

{/tab}

{tab(API)}

Воспользуйтесь {ifdef(public)}{linkto(../../../../tools-for-using-services/api/api-spec/logging#api-spec-logging)[text=методами API]}{/ifdef}{ifndef(public)}методами API Cloud Logging{/ifndef}.

Чтобы уточнить результаты поиска, в параметре `like` укажите выражение для поиска в поле `message`. Для записи поискового выражения используйте {linkto(../../concepts/search-tools#logging-search-tools)[text=язык поисковых запросов]}.

Примеры поисковых выражений:

{include(../../../../_includes/_logs_query.md)}

{/tab}

{tab(Grafana)}

1. {linkto(../../../../applications-and-services/marketplace/instructions/pr-instance-add#marketplace-pr-instance-add)[text=Разверните]} сервис Grafana из [Магазина приложений](https://msk.cloud.vk.com/app/services/marketplace) в вашем проекте.

   При развертывании сервиса он будет автоматически интегрирован с Cloud Logging:

   - Будет установлена связь, позволяющая Grafana получать логи приложений из сервиса Cloud Logging.
   - В Grafana будут настроены источники данных (data sources), связанные с Cloud Logging.

1. Перейдите в консоль Grafana и авторизуйтесь в ней.
1. Создайте дашборд и добавьте в него визуализацию.
1. Выберите источник данных, связанный с `{var(cloud)} Logging`.
1. Выберите визуализацию `Logs` из списка в правом верхнем углу.
1. (Опционально) Настройте параметры визуализации:

   - **Time**: отображать столбец времени. Он содержит временные отметки системы Cloud Logging, связанные с записями логов.
   - **Unique Labels**: отображать столбцы с параметрами `group_id` и `stream_id`.
   - **Common Labels**: группировать логи по значениям параметров `group_id` и `stream_id`.
   - **Wrap Lines**: включить перенос строк.
   - **Prettify JSON**: включить улучшение визуализации логов в формате JSON.
   - **Enable log details**: отображать расширяемую область с детальным содержанием лога.

1. В поле **Service** укажите идентификатор сервиса, логи которого вы хотите отображать на дашборде. Используйте идентификаторы сервисов, преднастроенные в системе логирования {var(cloud)}, или {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=собственные идентификаторы]}.

   {tabs}
    
   {tab(Преднастроенные идентификаторы)}
        
   - `default` — идентификатор, который не имеет привязанных к нему сервисов и предназначен для тестирования и отладки.
   - `containers` — Cloud Containers.
   - `databases` — Cloud Databases.
   - `vdi` — Cloud Desktop.
   - `mlplatform` — Cloud ML Platform.

   {/tab}
    
   {tab(Собственные идентификаторы)}
    
   Собственные идентификаторы (`service_ID`) находятся на вкладке **Прочие ресурсы** в настройках раздела **Мониторинг → Логирование**. Они состоят из строчных латинских букв, цифр и символов `-`, например `a01bc23-d456-7890-a1bc-d2e3f45g6789`.

   {/tab}
    
   {/tabs}

1. Нажмите кнопку **Apply**.
1. (Опционально) В поле **Group** укажите идентификатор группы логов (`group_id`). Используйте значение `group_id`, указанное в {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=настройках плагина логирования]} при его установке. Если включена опция **Unique Labels**, `group_id` отображается в логах нужного сервиса на создаваемом дашборде.
1. (Опционально) В поле **Stream** укажите идентификатор источника логов (`stream_id`). Используйте значение `stream_id`, указанное в {linkto(../../concepts/logging-plugin#logging-conf-parameters)[text=настройках плагина логирования]} при его установке. Если включена опция **Unique Labels**, `stream_id` отображается в логах нужного сервиса на создаваемом дашборде.
1. Сохраните внесенные изменения.

{/tab}

{/tabs}
