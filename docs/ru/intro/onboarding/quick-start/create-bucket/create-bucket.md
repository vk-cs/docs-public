# {heading(VK Object Storage: создайте бакет в объектном хранилище и загрузите в него данные)[id=onboarding-create-bucket]}

[VK Object Storage](/ru/storage/s3/concepts/about) — объектное хранилище с поддержкой S3 API, которое обеспечивает надежное масштабируемое хранение и стабильную скорость раздачи любых объектов независимо от числа одновременных обращений. VK Object Storage можно использовать для потоковой раздачи мультимедиа, хостинга сайтов и хранения самых разнообразных данных.

Начните работу с сервисом [VK Object Storage](https://cloud.vk.com/storage/) любым удобным способом:

- Воспользуйтесь {linkto(#create_bucket)[text=инструкцией]}, создайте бакет, загрузите в него объект и предоставьте доступ к загруженному объекту по ссылке.
- Посмотрите короткое {linkto(#video_create_bucket)[text=видео]}, в котором будет создан аккаунт, позволяющий управлять бакетом по API, создан бакет и настроен доступ к нему, продемонстрированы настройки бакета.
- Пройдите [урок](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) бесплатного курса. В теоретической части урока рассмотрены общие характеристики, компоненты и функции VK Object Storage. В практической части вы создадите бакет и подключите его к Wordpress для хранения медиафайлов.
- Посмотрите {linkto(#webinars_bucket)[text=вебинары]} о работе с VK Object Storage.

{note:info}
Интерфейс личного кабинета может отличаться от продемонстрированного в видео и уроке. 
{/note}

## {heading(Создайте бакет и разместите в нем объект)[id=create_bucket]}

Пройдя все шаги этой инструкции, вы:

1. [Создадите](#create_account) аккаунт для сервиса VK Object Storage.
1. [Создадите](#create_bucket) бакет.
1. [Добавите](#create_public_object) объект с публичными настройками ACL и предоставите доступ к нему по ссылке.
1. [Проверите](#access_check) доступ к объекту.

{include(/ru/_includes/_create-bucket.md)[tags=bucket_onboarding_only; level=+1]}

## {heading(Видеоинструкция)[id=video_bucket]}

В этом видео будет создан аккаунт, позволяющий управлять бакетом по API, создан бакет и настроен доступ к нему, продемонстрированы настройки бакета в личном кабинете VK Cloud.

{caption()[id=position=above;align=right;id=video_create_bucket]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239414&hd=3)[type=vkvideo]}
{/caption}

## {heading(Обучающий курс)[id=courses_bucket]}

Пройдите [урок](https://cloud.vk.com/cloud-native-courses/advanced/cloud-storage-s3/) бесплатного курса.

В теоретической части урока рассмотрены общие характеристики, компоненты и функции VK Object Storage. В практической части вы создадите бакет и подключите его к Wordpress для хранения медиафайлов.

## {heading(Вебинары)[id=webinars_bucket]}

### Как начать работать с объектным хранилищем

Вы узнаете, как создавать бакеты, управлять доступами, защищать информацию с помощью встроенных механизмов безопасности и интегрировать VK Object Storage с другими облачными продуктами.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_begin]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239395&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### Как построить эффективное и устойчивое объектное хранилище

Вебинар поможет разобраться в технических особенностях, архитектуре, защите данных и интеграции VK Object Storage с другими сервисами.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_effective]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239686&hd=3)[type=vkvideo]}
{/caption}
{/cut}

### Как использовать объектное хранилище для хранения данных 1С

На вебинаре раскрыты технические детали интеграции VK Object Storage с 1С. Освещены вопросы надежности, защиты данных и снижения затрат на инфраструктуру.

{cut(Запись вебинара)}
{caption()[id=position=above;align=right;id=video_bucket_1c]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239701&hd=3)[type=vkvideo]}
{/caption}
{/cut}