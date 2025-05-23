Data LakeHouse — это гибридная архитектура управления данными, которую можно организовать на патформе VK Cloud. Она объединяе объединяет масштабируемость и гибкость [Data Lake](../compare/data-lake) с надёжностью и структурированностью [Data Warehouse](../compare/dwh), обеспечивая единое пространство для хранения, обработки и анализа данных любого объёма и формата с поддержкой ACID-транзакций, версионного контроля и совместимостью с современными аналитическими инструментами (Spark, Trino, BI-системами).

Архитектура сервиса позволяет упростить хранение «сырых» неструктурированных данных, удешевить инфраструктуру для них и при этом эффективно выполнять аналитические SQL-запросы без потери качества результатов. Таким образом сервис сочетает в себе преимущества Data Lake и Data Warehouse.

В Data LakeHouse слой хранения данных реализован на базе S3-объектного хранилища, а для доступа к данным используется привычный SQL-интерфейс. Физически оба слоя разнесены и могут горизонтально масштабироваться независимо друг от друга.

Неструктурированные данные сохраняются в S3-хранилище из различных источников: TSV, CSV, XML, syslog, JSON и т.д. Например, такими данными могут быть:

- видеозаписи с камер наружного наблюдения;
- телеметрия с датчиков и устройств;
- графические файлы;
- данные о поведении пользователей сайтов;
- логи из информационных систем.

В «сыром» виде такие данные непригодны для ежедневной аналитики в BI-системах, но могут быть использованы для быстрой отработки новых бизнес-гипотез с помощью алгоритмов машинного обучения или других методов Data Science.

Чтобы организовать полноценный доступ аналитических сервисов к данным Data LakeHouse, необходимо разметить и каталогизировать информацию об объектах в S3-хранилище в одном из общепринятых открытых форматов (например, с помощью сервиса [Iceberg Metastore]()). Затем к размеченным данным через API-интерфейс подключается движок выполнения SQL-запросов на базе [Cloud Trino](/ru/data-processing/trino) или [Cloud Spark](/ru/data-platform/spark), чтобы организовать сквозную потоковую передачу событий в реальном времени.

Таким образом DLH позволяет использовать инструменты бизнес-аналитики непосредственно в исходных данных, повышая их актуальность, а также уменьшая задержку и затраты, связанные с необходимостью выполнения ETL-операций.

Преимущества сервиса Data LakeHouse относительно [существующих технологий](../compare):

- поддержка различных форматов данных;
- независимое хранение и обработка данных;
- гибкость подключения источников данных;
- поддержка BI- и ML-задач;
- поддержка SQL и различных топологий DWH;
- согласованность ACID и минимум дублирования;
- четкая структура и происхождение данных;
- низкий порог входа для инженеров и аналитиков;
- динамическое масштабирование всех компонентов.
