Alfresco — это система управления корпоративным контентом (ECM) с открытым исходным кодом. Предоставляет инструменты для управления документами, автоматизации процессов и контроля доступа. Система позволяет эффективно работать с информацией, автоматизировать бизнес-процессы и интегрироваться с другими корпоративными системами.

Возможности Alfresco:

- централизованное хранение файлов (PDF, документы, изображения и видео); 
- управление документами и цифровыми активами с метаданными, тегами и версионностью;  
- автоматизация рабочих процессов для согласования документов и задач;  
- расширенный поиск по содержимому, метатегам и связям между документами;  
- расширение функциональности с помощью модулей и интеграций с корпоративными системами (ERP, CRM, BI);  
- управление пользователями, ролями и правами доступа;  
- поддержка многоканального доступа (веб-интерфейс, мобильные приложения, файловые протоколы).

Используя Alfresco, вы соглашаетесь с лицензионными соглашениями [Marketplace](/ru/intro/start/legal/digital-cloud/marketplace) и [Alfresco](https://github.com/Alfresco/acs-deployment/blob/master/LICENSE).

Чтобы развернуть сервис Alfresco в проекте VK Cloud:

1. [Зарегистрируйтесь](/ru/intro/start/account-registration) и [перейдите](https://msk.cloud.vk.com/app) в личный кабинет VK Cloud.
1. Чтобы иметь доступ к ВМ с развернутым сервисом и к веб-интерфейсу Alfresco из интернета:

    1. [Создайте](/ru/networks/vnet/instructions/net#sozdanie_seti) сеть с доступом в интернет, если она не была создана ранее.
    1. В [настройках подсети](/ru/networks/vnet/instructions/net#redaktirovanie_podseti), где будет размещена ВМ с развернутым сервисом, отключите опцию **Приватный DNS**.

1. Перейдите в раздел **Магазин приложений**, на странице раздела нажмите кнопку **Все решения**.
1. На карточке сервиса **Alfresco** нажмите кнопку **Подробнее**.
1. На странице с описанием сервиса нажмите кнопку **Подключить**.
1. Введите данные на странице **Параметры сервера**.
    1. Укажите, как будет размещен Alfresco:
    - `external` — с внешним IP-адресом и именем в домене `*.xaas.msk.bizmrg.com`. Выберите этот тип размещения для доступа к ВМ с развернутым сервисом Alfresco из интернета.
    - `internal` — с доступом только по внутреннему IP-адресу.

    1. **Включить резервное копирование на S3**: включите опцию, чтобы ежедневно создавать резервные копии данных Alfresco в объектном хранилище VK Cloud. Хранилище создается автоматически. Сохраняются последние 7 копий.

    1. **Включить мониторинг**: включите опцию, чтобы автоматически отправлять в сервис [Cloud Monitoring](/ru/monitoring-services/monitoring) метрики виртуальной машины, на которой развернут Alfresco. Эти метрики будут доступны в разделе **Мониторинг** личного кабинета.

    1. Укажите параметры виртуальной машины, на которой будет развернут инстанс сервиса:

        - **Сеть**: выберите сеть, где будет размещена ВМ с развернутым сервисом. Если вы указали тип размещения `external`, выберите сеть с доступом в интернет и подсеть, для которой отключена опция **Приватный DNS**.
        - **Зона доступности**: выберите [ЦОД](/ru/intro/start/concepts/architecture#az), где будет запущена ВМ.
        - **Тип виртуальной машины**: выберите [предустановленную конфигурацию ВМ](/ru/computing/iaas/concepts/vm/flavor).

    1. Укажите параметры системного диска и диска с данными.

        - **Размер диска**: укажите нужный размер диска ВМ в гигабайтах.
        - **Тип диска**: выберите [один из типов диска](/ru/computing/iaas/concepts/data-storage/disk-types#disk_types) — `HDD`, `SSD` или `High-IOPS SSD`.

1. Нажмите кнопку **Следующий шаг**.
1. Ознакомьтесь со стоимостью инфраструктуры для развертывания сервиса и нажмите кнопку **Подключить тариф**.

    Начнется развертывание облачной инфраструктуры, и откроется страница свойств сервиса. Статус процесса будет отображаться также в разделе **Магазин приложений → Мои сервисы**.

    После успешного развертывания на вашу почту, привязанную к VK Cloud, придут сообщения:

    - уведомление со ссылкой на инстанс сервиса в личном кабинете VK Cloud;
    - письмо с одноразовой ссылкой на данные для доступа к сервису.

1. Перейдите по одноразовой ссылке из письма и сохраните данные для доступа к сервису:

    - `alfresco_admin_url` — ссылка на панель администратора Alfresco;
    - `alfresco_default_user` — логин администратора для подключения;
    - `alfresco_admin_pass` — пароль администратора для подключения;
    - `alfresco_db_user` — логин пользователя для подключения к БД;
    - `alfresco_db_pass` — пароль пользователя для подключения к БД;
    - `keypair` — приватный ключ для подключения по SSH к виртуальной машине, где развернут сервис.

   {note:info}

   Если данные для доступа утрачены, [сгенерируйте](../../instructions/pr-instance-manage#update_access) новые.

   {/note}

1. Перейдите в веб-интерфейс сервиса по адресу `http://<ВАШ_ДОМЕН_ИЛИ_IP>`, где `<ВАШ_ДОМЕН_ИЛИ_IP>` — адрес сервера, на котором развернут Alfresco.

    Дополнительно доступны следующие интерфейсы:

    - `/alfresco/` — интерфейс для управления Alfresco и доступ к REST API;
    - `/admin/` — панель администрирования Alfresco (настройка системы, мониторинг, управление пользователями и правами);
    - `/share/` — веб-интерфейс для совместной работы с документами (просмотр, редактирование, комментирование, управление задачами);
    - `/content-app/` — упрощенный веб-интерфейс для работы с контентом (просмотр, загрузка, управление файлами);
    - `/solr/` — панель управления поисковым сервисом Alfresco (настройка индексации, поиска и мониторинг).

    Пример использования интерфейса для доступа в панель администрирования Alfresco через адресную строку: `http://<ВАШ_ДОМЕН_ИЛИ_IP>/admin/`.
    
1. (Опционально) Воспользуйтесь [руководством](https://support.hyland.com/r/Alfresco/Alfresco-Content-Services-Community-Edition/23.3/Alfresco-Content-Services-Community-Edition/Install/Install-with-zip/Install-additional-software/Test-installation/Post-installation-checks), чтобы начать работу с сервисом. При необходимости изучите [официальную документацию Alfresco](https://support.hyland.com/r/Alfresco/Alfresco-Content-Services-Community-Edition/23.3/Alfresco-Content-Services-Community-Edition).


