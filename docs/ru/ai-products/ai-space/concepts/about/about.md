# {heading(О сервисе)[id=ai-space-concepts-about]}

VK AI Space — сервис доступа к генеративным {linkto(../models#ai-space-concepts-models)[text=моделям]} через API без необходимости покупать GPU и обслуживать модели самостоятельно.

## {heading(Для каких задач подходит сервис)[id=ai-space-about-tasks]}

VK AI Space помогает встроить генеративные модели в продукты и рабочие процессы компании. С помощью сервиса можно:

- Создавать чат-ботов и ассистентов технической поддержки.
- Автоматизировать обработку документов: извлекать данные, пересказывать и классифицировать тексты.
- Распознавать и анализировать изображения: сканы, скриншоты и фотографии.
- Подключать модели к средам разработки (IDE), чтобы писать и проверять код.
- Решать задачи, которые требуют расчетов и рассуждений.
- Встраивать модели в интеграции и автоматические процессы: модели могут возвращать ответы в строгом формате JSON.

## {heading(Возможности сервиса)[id=ai-space-about-features]}

- Единый {linkto(../../instructions/models/search-and-view#ai-space-instructions-models-view)[text=каталог моделей]} разных провайдеров. В каталоге показаны цены за 1 млн токенов, размер контекста, форматы входных и выходных данных, а также результаты бенчмарков.

- {linkto(../../instructions/models/test#ai-space-instructions-models-test)[text=Тестирование моделей]} в интерфейсе, без подключения к приложению. Один и тот же запрос можно отправить нескольким моделям и {linkto(../../instructions/models/comparison#ai-space-instructions-models-comparison)[text=сравнить]} их ответы, скорость и стоимость, чтобы выбрать модель для своей задачи.

- {linkto(../../instructions/models/api#ai-space-instructions-api)[text=Подключение моделей через API]}, совместимый с API OpenAI, с готовыми примерами кода для каждой модели. Приложения, которые уже работают с API OpenAI, можно перевести в VK AI Space без переписывания кода: достаточно заменить базовый URL, API-ключ и идентификатор модели.

- Раздельный {linkto(../api-keys#ai-space-concepts-api-keys)[text=доступ к API]} для сотрудников и внешних систем. Сотрудники отправляют запросы по личным ключам, а приложения и интеграции — по ключам {linkto(../organization#ai-space-concepts-organization-users)[text=виртуальных пользователей]}.

- Управление проектами и пользователями. Проекты используются для разделения работы команд, а {linkto(../roles#ai-space-concepts-roles)[text=роли]} определяют, что каждый пользователь может делать в {linkto(../organization#ai-space-concepts-organization-org)[text=организации]} и в {linkto(../organization#ai-space-concepts-organization-project)[text=проекте]}.

- Контроль расходов. {linkto(../billing#ai-space-concepts-balance-control)[text=Лимиты расходов]} ограничивают сумму, которую могут потратить организация, проект, пользователь или внешняя система.

- Оплата по факту потребления токенов с {linkto(../billing#ai-space-concepts-billing)[text=лицевого счета организации]}, без подписок и фиксированных пакетов.

- {linkto(../../instructions/billing/statistics#ai-space-instructions-billing-statistics)[text=Статистика потребления]} по проектам, пользователям и моделям с выгрузкой в XLSX.

## {heading(Что дальше)[id=ai-space-about-next]}

- {linkto(../../quick-start#ai-space-quick-start)[text=Пройдите быстрый старт]}.
- {linkto(../models#ai-space-concepts-models)[text=Познакомьтесь с типами моделей]}.
- {linkto(../roles#ai-space-concepts-roles)[text=Познакомьтесь с ролевой моделью доступа]}.
- {linkto(../billing#ai-space-concepts-balance-control)[text=Познакомьтесь с лимитами расходов]}.
