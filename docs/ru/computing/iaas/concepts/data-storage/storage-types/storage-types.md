VK Cloud поддерживает следующие типы хранилищ:

- _Блочное (block-based)_. Хранит данные в виде логических блоков, аналогично жестким дискам. Блочное хранилище подходит для хранения данных ВМ и контейнеров, а также снимков дисков. В VK Cloud тип представлен [подключаемыми к ВМ дисками](../about/#diski) и [дисками в кластерах Kubernetes](/ru/kubernetes/k8s/concepts/storage).

    Блочные диски в VK Cloud могут быть сетевыми и локальными, различаться надежностью хранения, количеством копий реплицируемых данных и параметрами [производительности](../volume-sla). Подробнее — в разделе о [дисках блочного хранения](../disk-types).

- _Объектное (object-based)_. Хранит данные в виде независимых объектов с метаданными. Подходит для хранения данных большого объема (резервные копии, BigData, большие медиафайлы и т.п.), к которым не нужно часто обращаться. В VK Cloud тип представлен хранилищем с поддержкой S3 API [Cloud Storage](/ru/storage/s3).
- _Файловое (file-based)_. Виртуальная файловая система, которую можно подключить к нескольким виртуальным машинам. Реализует централизованный обмен файлами между клиентами, находящимися внутри приватной сети облака. Подходит для регулярных задач, требующих минимальной задержки при обращении к данным. Подробнее — в разделе о [файловом хранилище](../file-share).

У каждого из типов хранилищ есть свои преимущества и недостатки. Выбор типа зависит от потребностей приложения, а также требований к производительности, масштабируемости и управлению данными.

[cols="1,3,3,3", options="header"]
|===
| Тип
| Интерфейс
| Преимущества
| Особенности

| Блочное
| Предоставляет интерфейс для чтения/записи блоков данных.

Замена для Amazon EBS, Google Persistent Disk, Microsoft Azure Managed Disks

| Высокая производительность для операций ввода-вывода.

Простота интеграции с виртуальными машинами и контейнерами

| Низкая масштабируемость.

Для доступа к данным требуется подключить хранилище к ВМ или контейнеру

| Объектное
| Предоставляет интерфейс для доступа/управления объектами.

Замена для Amazon S3, Google Cloud Storage, Microsoft Azure Blob Storage

| Низкая стоимость.

Бесконечная масштабируемость и высокая доступность.

Простота интеграции с приложениями

| Относительно низкая производительность. Менее других типов подходит для работы с частыми изменениями данных.

Требует поддержки протокола S3 со стороны приложения.

Относительно высокая стоимость трафика для подключения к S3

| Файловое
| Предоставляет интерфейс для работы с файлами, по аналогии с файловыми системами. Оптимизировано для работы с файлами по протоколу NFS, SMB или CIFS.

Замена для Amazon EFS, Google Cloud Filestore, Microsoft Azure Files

| Привычный для пользователей интерфейс работы с файлами.

Поддержка сложной иерархии директорий.

Возможность быстрого доступа и изменения данных.

Интеграция с широким спектром приложений

| Более сложная настройка и администрирование по сравнению с другими типами.

Подключается в рамках только одной зоны доступности. Репликация в другие зоны доступности не предусмотрена

|===
