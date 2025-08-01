# {heading(Порядок действий)[id=ibservice_add_steps]}

Чтобы добавить image-based приложение в магазин:

1. [Создайте образ сервиса и загрузите его в магазин](../ib_image_create).

   Рекомендуемый способ — с помощью Packer.

   {note:err}

   Перед публикацией сервиса в магазине образ будет опубликован в облачной платформе (подробнее — в разделе {linkto(../ibservice_upload/ibservice_upload_publish_image#ibservice_upload_publish_image)[text=%text]}). На основе публичного образа будут развертываться инстансы сервиса у пользователей облачной платформы. Данные образа будут общедоступными.

   {/note}
1. [Создайте](../ib_structure) структуру файлов сервисного пакета.
1. [Подготовьте](../ibservice_configure) файлы, описывающие конфигурацию сервиса (тарифные планы, опции).
1. [Подготовьте](../tf_manifest) файлы, описывающие конфигурацию инфраструктуры сервиса.
1. [Загрузите и опубликуйте](../ibservice_upload) сервис в магазине.
